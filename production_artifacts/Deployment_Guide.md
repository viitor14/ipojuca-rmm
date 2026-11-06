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
cd /opt/ipojuca-rmm && git pull origin main && docker compose up -d --build frontend
```

