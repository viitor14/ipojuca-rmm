-- =============================================================================
-- RMM IPOJUCA - MYSQL 8.0 SCHEMA & INITIAL SEED (PRODUCAO / VPS DOCKER)
-- Responsavel: @dba (Fase 4 / Fase 11)
-- =============================================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

CREATE DATABASE IF NOT EXISTS ipojuca_rmm
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ipojuca_rmm;
SET NAMES utf8mb4;

-- 1. Unidades de Saude (USFs, Policlinicas, CAPS)
CREATE TABLE IF NOT EXISTS health_units (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(32) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL,
  unit_type VARCHAR(32) NOT NULL DEFAULT 'USF',
  address VARCHAR(255) NOT NULL,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Setores de cada Unidade (com coordenadas de referencia 3D)
CREATE TABLE IF NOT EXISTS sectors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  unit_id INT NOT NULL,
  code VARCHAR(32) NOT NULL,
  name VARCHAR(100) NOT NULL,
  room_theme VARCHAR(16) DEFAULT NULL,
  bounds_x FLOAT NOT NULL DEFAULT 0,
  bounds_z FLOAT NOT NULL DEFAULT 0,
  width_3d FLOAT NOT NULL DEFAULT 6,
  depth_3d FLOAT NOT NULL DEFAULT 5,
  CONSTRAINT fk_sectors_unit FOREIGN KEY (unit_id) REFERENCES health_units(id) ON DELETE CASCADE,
  UNIQUE KEY uk_unit_sector_code (unit_id, code)
) ENGINE=InnoDB;

-- 3. Computadores e Agentes Monitorados (Estado Quente + Posicao 3D)
CREATE TABLE IF NOT EXISTS machines (
  id INT AUTO_INCREMENT PRIMARY KEY,
  agent_uuid VARCHAR(64) NOT NULL UNIQUE,
  agent_token_hash CHAR(64) NOT NULL,
  is_revoked TINYINT(1) NOT NULL DEFAULT 0,
  unit_id INT NOT NULL,
  sector_id INT NOT NULL,
  hostname VARCHAR(100) NOT NULL,
  manufacturer VARCHAR(100) DEFAULT 'Generic',
  model VARCHAR(100) DEFAULT 'Desktop PC',
  serial_number VARCHAR(100) NULL DEFAULT NULL,
  mac_address VARCHAR(32) NULL DEFAULT NULL,
  smbios_uuid CHAR(36) NULL DEFAULT NULL,
  hardware_key CHAR(64) NULL DEFAULT NULL,
  identity_confidence ENUM('HIGH', 'MEDIUM', 'LOW') NOT NULL DEFAULT 'LOW',
  inventory_collected_at DATETIME NULL DEFAULT NULL,
  ip_address VARCHAR(45) DEFAULT '0.0.0.0',
  cpu_model VARCHAR(120) DEFAULT 'Intel Core i5',
  cpu_cores TINYINT UNSIGNED NULL DEFAULT NULL,
  cpu_threads SMALLINT UNSIGNED NULL DEFAULT NULL,
  ram_total_mb INT NOT NULL DEFAULT 8192,
  disk_type VARCHAR(32) NOT NULL DEFAULT 'SSD',
  disk_total_gb INT NOT NULL DEFAULT 240,
  os_version VARCHAR(100) NOT NULL DEFAULT 'Windows 11 Pro',
  agent_version VARCHAR(32) NOT NULL DEFAULT '1.0.0',
  health_status ENUM('NORMAL', 'WARNING', 'CRITICAL', 'OFFLINE') NOT NULL DEFAULT 'NORMAL',
  cpu_usage_pct DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  ram_usage_pct DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  disk_usage_pct DECIMAL(5,2) NOT NULL DEFAULT 0.00,
  temperature_c DECIMAL(5,2) NOT NULL DEFAULT 45.00,
  uptime_seconds BIGINT NOT NULL DEFAULT 0,
  idle_seconds BIGINT NOT NULL DEFAULT 0,
  spooler_running TINYINT(1) NOT NULL DEFAULT 1,
  pos_x FLOAT NOT NULL DEFAULT 0,
  pos_y FLOAT NOT NULL DEFAULT 0.6,
  pos_z FLOAT NOT NULL DEFAULT 0,
  last_seen_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_machines_unit FOREIGN KEY (unit_id) REFERENCES health_units(id),
  CONSTRAINT fk_machines_sector FOREIGN KEY (sector_id) REFERENCES sectors(id),
  UNIQUE KEY uk_machines_hardware_key (hardware_key),
  INDEX idx_machines_serial (serial_number),
  INDEX idx_machines_mac (mac_address),
  INDEX idx_machines_unit_status (unit_id, health_status),
  INDEX idx_machines_last_seen (health_status, last_seen_at)
) ENGINE=InnoDB;

-- 3.2 Catalogo de impressoras homologadas (Ciclo #29)
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

-- 3.1 Historico de mudancas de hardware (Ciclo #27)
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

-- 3.3 Impressoras descobertas na LAN pelos agentes (Ciclo #30)
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

-- 3.4 Mensagens persistidas entre Central de TI e Super Agente (Ciclo #48)
CREATE TABLE IF NOT EXISTS machine_messages (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  machine_id INT NOT NULL,
  agent_uuid VARCHAR(64) NOT NULL,
  direction ENUM('CLIENT_TO_SERVER', 'SERVER_TO_CLIENT') NOT NULL,
  sender VARCHAR(100) NOT NULL,
  message VARCHAR(500) NOT NULL,
  delivered_to_agent TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_machine_messages_machine FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE,
  INDEX idx_machine_messages_machine_time (machine_id, created_at DESC),
  INDEX idx_machine_messages_pending (agent_uuid, direction, delivered_to_agent)
) ENGINE=InnoDB;

-- 3.5 Controle de migrations aplicadas (evita re-execucao de migrations de layout)
CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(64) PRIMARY KEY,
  applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 4. Historico de Telemetria (Serie Temporal)
CREATE TABLE IF NOT EXISTS telemetry_history (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  machine_id INT NOT NULL,
  cpu_usage_pct DECIMAL(5,2) NOT NULL,
  ram_usage_pct DECIMAL(5,2) NOT NULL,
  disk_usage_pct DECIMAL(5,2) NOT NULL,
  temperature_c DECIMAL(5,2) NOT NULL,
  uptime_seconds BIGINT NOT NULL,
  spooler_running TINYINT(1) NOT NULL DEFAULT 1,
  health_status ENUM('NORMAL', 'WARNING', 'CRITICAL', 'OFFLINE') NOT NULL,
  recorded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_telemetry_machine FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE,
  INDEX idx_telemetry_machine_time (machine_id, recorded_at DESC)
) ENGINE=InnoDB;

-- 5. Usuarios Operadores (RBAC)
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(160) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('VIEWER', 'TECH_N1', 'ADMIN_N2') NOT NULL DEFAULT 'VIEWER',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 6. Alertas e Chamados Autonomos (Integracao n8n)
CREATE TABLE IF NOT EXISTS alerts (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  incident_key VARCHAR(128) NOT NULL UNIQUE,
  machine_id INT NOT NULL,
  severity ENUM('WARNING', 'CRITICAL', 'OFFLINE') NOT NULL,
  metric_name VARCHAR(32) NOT NULL,
  message VARCHAR(255) NOT NULL,
  status ENUM('OPEN', 'ACKNOWLEDGED', 'RESOLVED') NOT NULL DEFAULT 'OPEN',
  n8n_notified TINYINT(1) NOT NULL DEFAULT 0,
  external_ticket_id VARCHAR(64) DEFAULT NULL,
  triggered_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  resolved_at DATETIME DEFAULT NULL,
  CONSTRAINT fk_alerts_machine FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE,
  INDEX idx_alerts_machine_status (machine_id, status, metric_name)
) ENGINE=InnoDB;

-- 7. Tarefas Remotas Homologadas
CREATE TABLE IF NOT EXISTS remote_tasks (
  task_id VARCHAR(64) PRIMARY KEY,
  machine_id INT NOT NULL,
  requested_by_user_id INT NOT NULL,
  task_code VARCHAR(64) NOT NULL,
  parameters_json JSON DEFAULT NULL,
  reason VARCHAR(255) NOT NULL,
  status ENUM('PENDING', 'DISPATCHED', 'COMPLETED', 'FAILED', 'EXPIRED') NOT NULL DEFAULT 'PENDING',
  exit_code INT DEFAULT NULL,
  output_summary TEXT DEFAULT NULL,
  issued_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  completed_at DATETIME DEFAULT NULL,
  CONSTRAINT fk_tasks_machine FOREIGN KEY (machine_id) REFERENCES machines(id) ON DELETE CASCADE,
  CONSTRAINT fk_tasks_user FOREIGN KEY (requested_by_user_id) REFERENCES users(id),
  INDEX idx_tasks_machine_issued (machine_id, issued_at DESC)
) ENGINE=InnoDB;

-- 8. Logs Imutaveis de Auditoria
CREATE TABLE IF NOT EXISTS audit_logs (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  user_id INT DEFAULT NULL,
  machine_id INT DEFAULT NULL,
  action_type VARCHAR(64) NOT NULL,
  ip_address VARCHAR(45) NOT NULL,
  details_json JSON DEFAULT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_created (created_at DESC)
) ENGINE=InnoDB;

-- =============================================================================
-- SEED INICIAL - UNIDADES DE SAUDE E SETORES DE IPOJUCA
-- =============================================================================
INSERT IGNORE INTO health_units (id, code, name, unit_type, address) VALUES
  (1, 'USF-NSO', 'USF Nossa Senhora do Ó', 'USF', 'Av. Principal, Nossa Senhora do Ó, Ipojuca - PE'),
  (2, 'POLI-CEN', 'Policlínica Municipal de Ipojuca', 'POLICLINICA', 'Centro, Ipojuca - PE'),
  (3, 'CAPS-IPO', 'CAPS Porto de Galinhas / Ipojuca', 'CAPS', 'Porto de Galinhas, Ipojuca - PE');

INSERT IGNORE INTO sectors (id, unit_id, code, name, room_theme, bounds_x, bounds_z, width_3d, depth_3d) VALUES
  (1, 1, 'REC', 'Recepção e Triagem', 'REC', -4.5, -5.5, 9.0, 5.0),
  (2, 1, 'CONS-01', 'Consultório Médico 01', 'CONS', 4.5, -5.5, 9.0, 5.0),
  (3, 1, 'FARM', 'Farmácia e Vacinação', 'FARM', -4.5, 1.5, 9.0, 5.0),
  (4, 1, 'ADM', 'Coordenação / Enfermagem', 'ADM', 4.5, 1.5, 9.0, 5.0),
  (5, 2, 'REC-POLI', 'Recepção Central Policlínica', 'REC', -4.5, -5.5, 9.0, 5.0),
  (6, 2, 'LAB-POLI', 'Laboratório e Exames', 'ADM', 4.5, -5.5, 9.0, 5.0),
  (7, 2, 'REG-POLI', 'Regulação Médica', 'ADM', 0.0, 1.5, 18.0, 5.0),
  (8, 3, 'ACOLH', 'Acolhimento e Prontuário CAPS', 'TI', -4.5, 0.0, 9.0, 10.0),
  (9, 3, 'PSI-01', 'Consultório Multiprofissional', 'CONS', 4.5, 0.0, 9.0, 10.0);

-- Marca migrations ja incorporadas no schema inicial para bancos novos
INSERT IGNORE INTO schema_migrations (version) VALUES
  ('02_hardware_identity_upsert.sql'),
  ('03_approved_printers.sql'),
  ('04_discovered_printers.sql'),
  ('05_sector_layout_contiguous.sql'),
  ('06_sector_layout_compact.sql'),
  ('07_sector_layout_corridor.sql'),
  ('08_messages_and_migrations_control.sql');
