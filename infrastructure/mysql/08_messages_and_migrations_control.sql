-- =============================================================================
-- RMM IPOJUCA - MIGRATION 08: PERSISTENCIA DE CHAT & CONTROLE DE MIGRATIONS
-- Responsavel: @dba | Idempotente e nao destrutiva (Ciclo #48)
-- Uso: mysql -u <user> -p ipojuca_rmm < 08_messages_and_migrations_control.sql
-- =============================================================================

SET NAMES utf8mb4;
USE ipojuca_rmm;

CREATE TABLE IF NOT EXISTS schema_migrations (
  version VARCHAR(64) PRIMARY KEY,
  applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

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

SELECT COUNT(*) AS mensagens_registradas FROM machine_messages;
