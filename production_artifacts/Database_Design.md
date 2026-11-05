# Modelagem do Banco de Dados e Estratégia de Performance MySQL — RMM Ipojuca

**Ciclo:** #01  
**Fase:** FASE 4 — Modelagem do Banco de Dados  
**Responsável:** `@dba`  
**Skills Consultadas:** `.agents/skills/dba/data_modeling.md`, `.agents/skills/dba/database_performance.md`

---

## 1. Modelo Entidade-Relacionamento (ER)

A modelagem foi projetada para separar **estado quente** (consultado continuamente pelo Digital Twin 3D na tabela `machines`) de **séries temporais históricas** (`telemetry_history`) e **trilhas de auditoria** (`remote_tasks`, `alerts`, `audit_logs`).

```mermaid
erDiagram
    HEALTH_UNITS ||--o{ SECTORS : "possui"
    HEALTH_UNITS ||--o{ MACHINES : "aloja"
    SECTORS ||--o{ MACHINES : "posiciona_3d"
    MACHINES ||--o{ TELEMETRY_HISTORY : "registra_serie"
    MACHINES ||--o{ ALERTS : "gera"
    MACHINES ||--o{ REMOTE_TASKS : "executa"
    USERS ||--o{ REMOTE_TASKS : "solicita"
    USERS ||--o{ AUDIT_LOGS : "produz"

    HEALTH_UNITS {
        int id PK
         varchar code UK "Ex: USF-NSO"
        varchar name "Ex: USF Nossa Senhora do O"
        enum unit_type "USF, POLICLINICA, CAPS"
        varchar address
        boolean is_active
        datetime created_at
    }

    SECTORS {
        int id PK
        int unit_id FK
        varchar name "Ex: Recepcao, Consultorio 01"
        varchar code
        float bounds_x "Posicao base X no mapa 3D"
        float bounds_z "Posicao base Z no mapa 3D"
        float width_3d
        float depth_3d
    }

    MACHINES {
        int id PK
        varchar agent_uuid UK "UUID unico do Agente"
        varchar agent_token_hash "SHA-256 do token individual"
        boolean is_revoked "Permite revogacao imediata"
        int unit_id FK
        int sector_id FK
        varchar hostname
        varchar manufacturer
        varchar model
        varchar serial_number
        varchar mac_address
        varchar ip_address
        varchar cpu_model
        int ram_total_mb
        varchar disk_type "SSD, HDD, NVMe"
        int disk_total_gb
        varchar os_version
        varchar agent_version
        enum health_status "NORMAL, WARNING, CRITICAL, OFFLINE"
        decimal cpu_usage_pct
        decimal ram_usage_pct
        decimal disk_usage_pct
        decimal temperature_c
        bigint uptime_seconds
        boolean spooler_running
        float pos_x "Coordenada X no Digital Twin"
        float pos_y "Coordenada Y no Digital Twin"
        float pos_z "Coordenada Z no Digital Twin"
        datetime last_seen_at
        datetime updated_at
    }

    TELEMETRY_HISTORY {
        bigint id PK
        int machine_id FK
        decimal cpu_usage_pct
        decimal ram_usage_pct
        decimal disk_usage_pct
        decimal temperature_c
        bigint uptime_seconds
        boolean spooler_running
        enum health_status
        datetime recorded_at
    }

    USERS {
        int id PK
        varchar name
        varchar email UK
        varchar password_hash
        enum role "VIEWER, TECH_N1, ADMIN_N2"
        boolean is_active
        datetime created_at
    }

    ALERTS {
        bigint id PK
        varchar incident_key UK "Chave de idempotencia p/ n8n"
        int machine_id FK
        enum severity "WARNING, CRITICAL, OFFLINE"
        varchar metric_name "DISK, CPU, RAM, TEMPERATURE, HEARTBEAT"
        varchar message
        enum status "OPEN, ACKNOWLEDGED, RESOLVED"
        boolean n8n_notified
        varchar external_ticket_id
        datetime triggered_at
        datetime resolved_at
    }

    REMOTE_TASKS {
        varchar task_id PK "Ex: tsk_uuid"
        int machine_id FK
        int requested_by_user_id FK
        varchar task_code "Catalogo fechado"
        json parameters_json
        varchar reason
        enum status "PENDING, DISPATCHED, COMPLETED, FAILED, EXPIRED"
        int exit_code
        text output_summary
        datetime issued_at
        datetime expires_at
        datetime completed_at
    }

    AUDIT_LOGS {
        bigint id PK
        int user_id FK
        int machine_id FK
        varchar action_type
        varchar ip_address
        json details_json
        datetime created_at
    }
```

---

## 2. Estratégia de Indexação e Performance (`database_performance.md`)

1. **Leitura O(1) para o Digital Twin 3D:**
   - A tabela `machines` armazena as métricas mais recentes (`cpu_usage_pct`, `ram_usage_pct`, `disk_usage_pct`, `health_status`, `last_seen_at`) junto às coordenadas espaciais (`pos_x`, `pos_y`, `pos_z`).
   - Dessa forma, o carregamento do mapa 3D de uma Unidade (`SELECT * FROM machines WHERE unit_id = ?`) **não realiza `JOIN` nem `GROUP BY` na tabela de histórico de telemetria**, garantindo latência inferior a 5 ms.
2. **Índices Compostos Estratégicos:**
   - `idx_machines_unit_status (unit_id, health_status)`: acelera os filtros e contadores do dashboard por unidade.
   - `idx_machines_last_seen (health_status, last_seen_at)`: permite ao *worker* de detecção de máquinas `OFFLINE` localizar agentes silenciosos sem *full table scan*.
   - `idx_telemetry_machine_time (machine_id, recorded_at DESC)`: otimiza a abertura da gaveta de diagnóstico com as últimas leituras de um computador específico.
   - `idx_alerts_machine_status (machine_id, status, metric_name)`: garante verificação rápida de desduplicação antes de acionar o Webhook do n8n.

---

## 3. Política de Retenção, Expurgo e Backups

- **Retenção de Telemetria (`telemetry_history`):**
  - Mantém granularidade completa por **30 dias**.
  - Job diário de manutenção remove registros com `recorded_at < NOW() - INTERVAL 30 DAY` em lotes (`LIMIT 10000`) para evitar bloqueio de tabela (*table lock*).
- **Retenção de Auditoria (`audit_logs` e `remote_tasks`):**
  - Mantida por **180 dias** para rastreabilidade administrativa e conformidade com auditorias de segurança.
- **Estratégia de Backup:**
  - Dump lógico diário automatizado (`mysqldump --single-transaction --routines --triggers`) comprimido em `.sql.gz` com retenção rotativa de 14 dias locais e cópia externa.

---

## 4. Script de Migration e Seed Inicial

O script SQL completo de criação do banco, tabelas, índices e dados iniciais das unidades de saúde de Ipojuca encontra-se versionado em:
- `infrastructure/mysql/01_schema_and_seed.sql`

