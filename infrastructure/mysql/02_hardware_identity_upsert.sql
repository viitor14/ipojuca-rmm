-- =============================================================================
-- RMM IPOJUCA - MIGRATION 02: IDENTIDADE DE HARDWARE E UPSERT (Ciclo #27)
-- Responsavel: @dba | Idempotente e nao destrutiva (pode rodar varias vezes)
-- Uso: mysql -u <user> -p ipojuca_rmm < 02_hardware_identity_upsert.sql
-- =============================================================================

SET NAMES utf8mb4;
USE ipojuca_rmm;

DROP PROCEDURE IF EXISTS rmm_add_column_if_missing;
DROP PROCEDURE IF EXISTS rmm_add_index_if_missing;

DELIMITER //

CREATE PROCEDURE rmm_add_column_if_missing(IN p_table VARCHAR(64), IN p_column VARCHAR(64), IN p_ddl TEXT)
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = p_table AND COLUMN_NAME = p_column
  ) THEN
    SET @rmm_sql = CONCAT('ALTER TABLE `', p_table, '` ADD COLUMN `', p_column, '` ', p_ddl);
    PREPARE rmm_stmt FROM @rmm_sql;
    EXECUTE rmm_stmt;
    DEALLOCATE PREPARE rmm_stmt;
  END IF;
END//

CREATE PROCEDURE rmm_add_index_if_missing(IN p_table VARCHAR(64), IN p_index VARCHAR(64), IN p_ddl TEXT)
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.STATISTICS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = p_table AND INDEX_NAME = p_index
  ) THEN
    SET @rmm_sql = CONCAT('ALTER TABLE `', p_table, '` ADD ', p_ddl);
    PREPARE rmm_stmt FROM @rmm_sql;
    EXECUTE rmm_stmt;
    DEALLOCATE PREPARE rmm_stmt;
  END IF;
END//

DELIMITER ;

-- 1. Colunas de identidade e inventario
ALTER TABLE machines MODIFY COLUMN serial_number VARCHAR(100) NULL DEFAULT NULL;
ALTER TABLE machines MODIFY COLUMN mac_address VARCHAR(32) NULL DEFAULT NULL;

CALL rmm_add_column_if_missing('machines', 'smbios_uuid', 'CHAR(36) NULL DEFAULT NULL');
CALL rmm_add_column_if_missing('machines', 'cpu_cores', 'TINYINT UNSIGNED NULL DEFAULT NULL');
CALL rmm_add_column_if_missing('machines', 'cpu_threads', 'SMALLINT UNSIGNED NULL DEFAULT NULL');
CALL rmm_add_column_if_missing('machines', 'hardware_key', 'CHAR(64) NULL DEFAULT NULL');
CALL rmm_add_column_if_missing('machines', 'identity_confidence', "ENUM('HIGH','MEDIUM','LOW') NOT NULL DEFAULT 'LOW'");
CALL rmm_add_column_if_missing('machines', 'inventory_collected_at', 'DATETIME NULL DEFAULT NULL');

-- 2. Valores sinteticos/placeholder antigos deixam de existir como se fossem reais
UPDATE machines SET serial_number = NULL
 WHERE serial_number IN ('N/A', 'SN-AUTO') OR serial_number LIKE 'SN-%';
UPDATE machines SET mac_address = NULL WHERE mac_address = '00:00:00:00:00:00';

-- 3. Indices (UNIQUE em hardware_key: o MySQL aceita varios NULL)
CALL rmm_add_index_if_missing('machines', 'uk_machines_hardware_key', 'UNIQUE KEY uk_machines_hardware_key (hardware_key)');
CALL rmm_add_index_if_missing('machines', 'idx_machines_serial', 'INDEX idx_machines_serial (serial_number)');
CALL rmm_add_index_if_missing('machines', 'idx_machines_mac', 'INDEX idx_machines_mac (mac_address)');

-- 4. Historico de mudancas de hardware
CREATE TABLE IF NOT EXISTS machine_inventory_changes (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  machine_id INT NOT NULL,
  field_name VARCHAR(32) NOT NULL,
  old_value VARCHAR(255) DEFAULT NULL,
  new_value VARCHAR(255) DEFAULT NULL,
  changed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_inv_changes_machine FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE,
  INDEX idx_inv_changes_machine_time (machine_id, changed_at)
) ENGINE=InnoDB;

DROP PROCEDURE IF EXISTS rmm_add_column_if_missing;
DROP PROCEDURE IF EXISTS rmm_add_index_if_missing;

-- 5. Relatorio de possiveis duplicatas ja existentes (nada e apagado automaticamente)
SELECT hostname, mac_address, COUNT(*) AS registros, GROUP_CONCAT(id) AS machine_ids
  FROM machines
 WHERE mac_address IS NOT NULL
 GROUP BY hostname, mac_address
HAVING COUNT(*) > 1;
