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
  unit_type ENUM('USF', 'POLICLINICA', 'CAPS') NOT NULL DEFAULT 'USF',
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
  serial_number VARCHAR(100) DEFAULT 'N/A',
  mac_address VARCHAR(32) DEFAULT '00:00:00:00:00:00',
  ip_address VARCHAR(45) DEFAULT '0.0.0.0',
  cpu_model VARCHAR(120) DEFAULT 'Intel Core i5',
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
  INDEX idx_machines_unit_status (unit_id, health_status),
  INDEX idx_machines_last_seen (health_status, last_seen_at)
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

INSERT IGNORE INTO sectors (id, unit_id, code, name, bounds_x, bounds_z, width_3d, depth_3d) VALUES
  (1, 1, 'REC', 'Recepção e Triagem', -5.5, -3.2, 7.5, 5.0),
  (2, 1, 'CONS-01', 'Consultório Médico 01', 4.0, -3.2, 6.5, 5.0),
  (3, 1, 'FARM', 'Farmácia e Vacinação', -5.5, 3.2, 7.5, 5.0),
  (4, 1, 'ADM', 'Coordenação / Enfermagem', 4.0, 3.2, 6.5, 5.0),
  (5, 2, 'REC-POLI', 'Recepção Central Policlínica', -4.8, -2.5, 8.0, 5.5),
  (6, 2, 'LAB-POLI', 'Laboratório e Exames', 4.5, -2.5, 7.0, 5.5),
  (7, 2, 'REG-POLI', 'Regulação Médica', 0.0, 3.5, 10.0, 4.5),
  (8, 3, 'ACOLH', 'Acolhimento e Prontuário CAPS', -3.5, 0.0, 7.0, 6.0),
  (9, 3, 'PSI-01', 'Consultório Multiprofissional', 4.0, 0.0, 6.5, 6.0);
