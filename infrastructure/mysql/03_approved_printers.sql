-- =============================================================================
-- RMM IPOJUCA - MIGRATION 03: CATALOGO DE IMPRESSORAS (Ciclo #29, revisado #30)
-- Responsavel: @dba | Idempotente e nao destrutiva (pode rodar varias vezes)
-- Uso: mysql -u <user> -p ipojuca_rmm < 03_approved_printers.sql
--
-- O catalogo NAO e mais semeado com IPs ficticios. As impressoras reais chegam
-- pela descoberta do agente na LAN (tabela discovered_printers, migration 04).
-- =============================================================================

SET NAMES utf8mb4;
USE ipojuca_rmm;

CREATE TABLE IF NOT EXISTS approved_printers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unit_id INT NULL DEFAULT NULL,
  name VARCHAR(64) NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  model VARCHAR(80) DEFAULT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_approved_printers_unit FOREIGN KEY (unit_id) REFERENCES health_units(id) ON DELETE CASCADE,
  UNIQUE KEY uk_approved_printer_unit_ip (unit_id, ip_address),
  INDEX idx_approved_printers_unit (unit_id, is_active)
) ENGINE=InnoDB;

-- Remove o seed ficticio criado no Ciclo #29
DELETE FROM approved_printers
 WHERE ip_address IN ('10.200.33.201', '10.200.33.202', '10.200.33.203', '10.200.33.204');

SELECT id, unit_id, name, ip_address, model, is_active FROM approved_printers ORDER BY id;
