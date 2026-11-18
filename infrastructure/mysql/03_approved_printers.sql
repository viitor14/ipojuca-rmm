-- =============================================================================
-- RMM IPOJUCA - MIGRATION 03: CATALOGO DE IMPRESSORAS HOMOLOGADAS (Ciclo #29)
-- Responsavel: @dba | Idempotente e nao destrutiva (pode rodar varias vezes)
-- Uso: mysql -u <user> -p ipojuca_rmm < 03_approved_printers.sql
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

-- Catalogo global (unit_id NULL = disponivel em todas as unidades)
INSERT INTO approved_printers (unit_id, name, ip_address, model)
SELECT NULL, 'RECEPCAO-HP', '10.200.33.201', 'HP LaserJet Pro M404dn'
 WHERE NOT EXISTS (SELECT 1 FROM approved_printers WHERE ip_address = '10.200.33.201');

INSERT INTO approved_printers (unit_id, name, ip_address, model)
SELECT NULL, 'CONS-01-EPSON', '10.200.33.202', 'Epson EcoTank L3250'
 WHERE NOT EXISTS (SELECT 1 FROM approved_printers WHERE ip_address = '10.200.33.202');

INSERT INTO approved_printers (unit_id, name, ip_address, model)
SELECT NULL, 'FARM-ZEBRA', '10.200.33.203', 'Zebra ZD220 (etiquetas)'
 WHERE NOT EXISTS (SELECT 1 FROM approved_printers WHERE ip_address = '10.200.33.203');

INSERT INTO approved_printers (unit_id, name, ip_address, model)
SELECT NULL, 'ADM-BROTHER', '10.200.33.204', 'Brother HL-L2350DW'
 WHERE NOT EXISTS (SELECT 1 FROM approved_printers WHERE ip_address = '10.200.33.204');

SELECT id, unit_id, name, ip_address, model, is_active FROM approved_printers ORDER BY id;
