# Guia de Infraestrutura, Observabilidade e Implantação (Docker & VPS) — RMM Ipojuca

**Ciclo:** #01  
**Fase:** FASE 11 — Infraestrutura e Implantação  
**Responsável:** `@devops`  
**Skills Consultadas:** `.agents/skills/devops/docker_deployment.md`, `.agents/skills/devops/observability.md`

---

## 1. Arquitetura de Contêineres (`docker-compose.yml`)

A infraestrutura do RMM Ipojuca é orquestrada em rede isolada (`rmm_net`) contendo:

1. **`ipojuca-rmm-mysql` (`mysql:8.0`):**
   - Executa automaticamente o script `infrastructure/mysql/01_schema_and_seed.sql` no primeiro boot.
   - Porta externa **`3309`** (`3309:3306`), seguindo exatamente a sequência da VPS `srv912524` (`3306` = `db_mensageria`, `3307` = `visitas-db-novo`, `3308` = `db-chamados-mysql`).
2. **`ipojuca-rmm-backend` (`backend/Dockerfile`):**
   - Imagem enxuta `node:20-alpine` rodando sob usuário não-root (`node`).
   - Porta externa **`4005`** (`4005:4000`), evitando conflito com `api-chamados-node` que já ocupa a porta `4000` na VPS.
3. **Reuso do `n8n` e `Evolution API` já existentes na VPS (`srv912524`):**
   - A VPS já possui `bot-whatsapp-chamados-sms-n8n-1` (`:5678`) e `bot-whatsapp-chamados-sms-evolution-api-1` (`:8080`). Portanto, o `docker-compose.yml` do RMM **não duplica** o container do n8n (economizando RAM da VPS) e se conecta diretamente via `host.docker.internal:5678`.
4. **Frontend + Nginx Reverse Proxy (`frontend/Dockerfile`):**
   - Porta externa **`8095`** (`8095:80`), seguindo a convenção da VPS (`8082` = `relatorio-front`, `8090` = `mdm_frontend_prod`) e deixando as portas `80` e `443` (`QuickMessenger2.0`) intactas.

---

## 2. Procedimento de Execução em Desenvolvimento Local

### 2.1. Backend e Testes Automatizados
```powershell
# 1. Executar suíte de testes automatizados (QA)
node --test backend/tests/api.test.js

# 2. Instalar dependências e iniciar servidor Backend (Porta 4000)
cd backend
npm install
npm start
```

### 2.2. Frontend e Digital Twin 3D
```powershell
cd frontend
npm install
npm run dev
# Acesse: http://localhost:5173
```

### 2.3. Agente Windows (`IpojucaRMMService`)
```powershell
cd agent
npm install
# Teste de envio único de heartbeat:
npm run once
# Execução contínua do serviço:
npm start
```

---

## 3. Procedimento de Implantação em Produção (VPS)

> **ATENÇÃO (`GATE FINAL`):** A implantação em ambiente de produção somente deve ser executada após autorização explícita do responsável institucional.

1. **Configurar Variáveis de Ambiente Seguras (`.env` na raiz):**
   ```env
   MYSQL_ROOT_PASSWORD=<gerar_senha_forte>
   DB_NAME=ipojuca_rmm
   DB_USER=rmm_user
   DB_PASSWORD=<gerar_senha_forte>
   JWT_SECRET=<openssl_rand_hex_32>
   TASK_SIGNING_SECRET=<openssl_rand_hex_32>
   N8N_WEBHOOK_SECRET=<openssl_rand_hex_32>
   DASHBOARD_PUBLIC_URL=https://rmm.ipojuca.pe.gov.br
   ```
2. **Subir os Serviços via Docker Compose:**
   ```bash
   docker compose up -d --build
   ```
3. **Importar o Workflow no n8n:**
   - Acessar o painel do n8n e importar o arquivo `/workflows/rmm_whatsapp_ticket_workflow.json` (`infrastructure/n8n/rmm_whatsapp_ticket_workflow.json`), configurando as variáveis `WHATSAPP_API_URL`, `WHATSAPP_API_TOKEN` e `TI_SUPPORT_WHATSAPP_GROUP`.
4. **Configurar Agendamento de Backup e Retenção:**
   - Adicionar ao `crontab` da VPS a execução diária de `infrastructure/scripts/backup_mysql.sh` às `02:00` da manhã.

---

## 4. Observabilidade e Monitoramento (`observability.md`)

- **Sonda de Disponibilidade (Liveness/Readiness):** `GET /api/health` retorna o estado da API, modo do banco (`mysql` / `memory`) e timestamp UTC.
- **Trilha de Auditoria de Segurança:** `GET /api/audit-logs` (restrito a `ADMIN_N2`) lista logins, falhas de autenticação, despachos de tarefas remotas e tentativas bloqueadas.

---

## 5. Atualização do Container Frontend — Ciclo #03 (`@devops`)

Para publicar a evolução do **Digital Twin 3D Arquitetônico & HUD Holográfico v3.0** na VPS (`31.97.86.253:8095`) após autorização no Gate Final:

```bash
git add .
git commit -m "feat(frontend): evolve 3D architectural digital twin, clinical furniture, fiber mesh and holographic HUD"
git push origin main

# Na VPS (root@srv912524):
cd /home/ipojuca-rmm && git pull origin main && docker compose up -d --build frontend
```


---

## 6. Atualização da VPS — Ciclos #26 a #28 (`@devops`, Fase 11)

**Diagnóstico em 17/11/2026 (produção `31.97.86.253`):**

| Verificação | Resultado |
| :--- | :--- |
| `GET /api/health` | 200, `db_mode: mysql` (backend no ar) |
| `PUT /api/units/1`, `POST /api/units/1/sectors`, `DELETE /api/sectors/999999` | **404 "Rota não encontrada"** — backend publicado não tem o CRUD do Ciclo #26 |
| Bundle do painel `:8095` (`index-DhQSi7Tb.js`) | Sem a interface de CRUD |
| Acesso SSH a `root@31.97.86.253` | **Bloqueado**: `Permission denied (publickey,password)`; não há chave em `~/.ssh` nem CI configurado |

Conclusão: os containers `backend` e `frontend` da VPS estão anteriores ao Ciclo #26. O código local está correto e testado; falta publicar.

**Comando de atualização (na VPS, como root, dentro do repositório):**

```bash
cd /home/ipojuca-rmm
git pull origin main
bash infrastructure/scripts/deploy_rmm_update.sh
```

O script detecta a raiz do repositório pelo próprio caminho (`dirname "$0"/../..`), então funciona em `/home/ipojuca-rmm`, `/opt/ipojuca-rmm` ou qualquer outro diretório, inclusive invocado de fora do repo. `REPO_DIR=/caminho` força outra raiz e `DRY_RUN=1` apenas imprime os passos, sem alterar nada.

O script faz `git pull`, `docker compose up -d --build`, aguarda o healthcheck, aplica `02_hardware_identity_upsert.sql` (idempotente) e valida as capacidades publicadas.

**Credenciais do MySQL:** elas existem **dentro** do container `mysql` (`MYSQL_USER`/`MYSQL_PASSWORD`/`MYSQL_DATABASE`), não no shell da VPS. O script executa a validação e o `mysql` dentro do container, passa a senha por `MYSQL_PWD` (fora da linha de comando) e remove o `USE` fixo da migration, selecionando o banco por argumento. Overrides do host (`DB_*` ou `MYSQL_*`) são opcionais e chegam por `-e`. Se o container não tiver as variáveis, aborta com mensagem clara em vez de tentar `mysql -u -p`.

**Validação pós-deploy:**

```bash
curl -s http://31.97.86.253:4005/api/health   # deve listar units:crud, sectors:crud, hardware:identity-upsert
curl -s -o /dev/null -w "%{http_code}\n" -X PUT http://31.97.86.253:4005/api/units/1   # 401 (rota existe, sem token)
```

`/api/health` passou a expor `capabilities`, permitindo detectar container desatualizado sem disparar requisições de escrita.

---

## 7. Hardening de Produção, Migrations Controladas e HTTPS/WSS — Ciclo #48 (`@devops` + `@security`)

### 7.1. Variáveis Obrigatórias no `.env` de Produção (Fail-Fast Ativo)

A partir do Ciclo #48, tanto o `docker-compose.yml` (sintaxe `${VAR:?...}`) quanto o backend (`env.validateProductionConfig()` em `NODE_ENV=production`) **recusam subir** se segredos forem ausentes/fracos ou se `CORS_ORIGIN` estiver aberto (`*`):

```env
MYSQL_ROOT_PASSWORD=<senha_forte_mysql_root>
DB_NAME=ipojuca_rmm
DB_USER=rmm_user
DB_PASSWORD=<senha_forte_mysql_app>
MYSQL_EXTERNAL_PORT=3309

JWT_SECRET=<openssl rand -hex 32>             # mínimo 24 chars
TASK_SIGNING_SECRET=<openssl rand -hex 32>    # mínimo 24 chars
N8N_WEBHOOK_SECRET=<openssl rand -hex 24>     # mínimo 16 chars
AGENT_ENROLLMENT_KEY=<openssl rand -hex 16>   # mínimo 12 chars

CORS_ORIGIN=https://rmm.ipojuca.pe.gov.br
TRUST_PROXY=1
DASHBOARD_PUBLIC_URL=https://rmm.ipojuca.pe.gov.br

# Apenas na primeira carga de usuários em banco vazio (opcional após seed inicial):
SEED_ADMIN_PASSWORD=<senha_inicial_admin>
SEED_TECH_PASSWORD=<senha_inicial_suporte>
SEED_VIEWER_PASSWORD=<senha_inicial_gestao>
```

> **Proteção de porta MySQL:** o serviço `mysql` no `docker-compose.yml` agora escuta apenas em `127.0.0.1:${MYSQL_EXTERNAL_PORT:-3309}:3306` (inacessível pela internet externa; usar túnel SSH se precisar de acesso administrativo).

### 7.2. Controle de Migrations (`schema_migrations`)

- **Banco novo:** `infrastructure/mysql/01_schema_and_seed.sql` foi corrigido (erro de sintaxe resolvido) e já inicializa todas as tabelas (`discovered_printers`, `machine_messages`, `schema_migrations`) e layout de corredor alinhado.
- **Banco existente na VPS:** o script `infrastructure/scripts/deploy_rmm_update.sh` aplica primeiro `08_messages_and_migrations_control.sql` e passa a registrar cada arquivo aplicado na tabela `schema_migrations`, evitando reaplicação de migrations de layout (`05`–`07`) sobre customizações feitas pelo usuário.

### 7.3. Ativação de HTTPS/WSS (Reverse Proxy na VPS)

1. Apontar DNS (ex.: `rmm.ipojuca.pe.gov.br`) para o IP da VPS (`31.97.86.253`).
2. Emitir certificado Let's Encrypt (`certbot certonly --nginx -d rmm.ipojuca.pe.gov.br`).
3. Copiar e ajustar o template [vps-https.conf.example](file:///C:/Users/vitor.franca/Desktop/Vitor/monitor/ipojuca-rmm/infrastructure/nginx/vps-https.conf.example) para `/etc/nginx/sites-available/ipojuca-rmm.conf`, ativar em `sites-enabled` e recarregar o Nginx (`nginx -t && systemctl reload nginx`).
4. Atualizar `CORS_ORIGIN` e `DASHBOARD_PUBLIC_URL` no `.env` para `https://rmm.ipojuca.pe.gov.br` e reiniciar o backend.

### 7.4. Backup Seguro e Retenção Automática

O script `infrastructure/scripts/backup_mysql.sh` foi atualizado para:
- Passar a credencial do MySQL via `MYSQL_PWD` (sem expor `-p<senha>` na tabela de processos `ps`).
- Executar a retenção real de banco recomendada pelo `@dba` (`telemetry_history` > `30` dias e `audit_logs` > `180` dias, configuráveis via `TELEMETRY_RETENTION_DAYS` e `AUDIT_RETENTION_DAYS`).

### 7.5. Validação Pós-Deploy (Ciclo #48)

```bash
curl -s http://127.0.0.1:4005/api/health
# Deve incluir: "auth:session-me", "agent:authenticated-poll", "tasks:honest-queue"

curl -s http://127.0.0.1:4005/api/agent/version
# Deve retornar latest_version: "2.4.0-native-exe" e sha256 (64 hex)

curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:4005/api/agent/pending
# Deve retornar 401 (autenticação de agente ativa)
```
