-- =============================================================================
-- RMM IPOJUCA - MIGRATION 04: IMPRESSORAS DESCOBERTAS NA LAN (Ciclo #30)
-- Responsavel: @dba | Idempotente e nao destrutiva (pode rodar varias vezes)
-- Uso: mysql -u <user> -p ipojuca_rmm < 04_discovered_printers.sql
-- =============================================================================

SET NAMES utf8mb4;
USE ipojuca_rmm;

CREATE TABLE IF NOT EXISTS discovered_printers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  machine_id INT NOT NULL,
  unit_id INT NULL DEFAULT NULL,
  ip_address VARCHAR(45) NOT NULL,
  name VARCHAR(64) NOT NULL,
  model VARCHAR(80) DEFAULT NULL,
  port SMALLINT UNSIGNED DEFAULT NULL,
  source ENUM('NETWORK','INSTALLED') NOT NULL DEFAULT 'NETWORK',
  last_seen_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_discovered_printers_machine FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE,
  UNIQUE KEY uk_discovered_printer_machine_ip (machine_id, ip_address),
  INDEX idx_discovered_printers_unit (unit_id, last_seen_at)
) ENGINE=InnoDB;

SELECT COUNT(*) AS impressoras_descobertas FROM discovered_printers;
