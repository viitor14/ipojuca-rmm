# SESSION HANDOFF — RMM Ipojuca (Contexto Completo para Continuar em Outro PC)

> **Como usar este arquivo em outro computador:**
> 1. Clone (ou atualize) o repositório:
>    - Novo PC: `git clone https://github.com/viitor14/ipojuca-rmm.git`
>    - PC já clonado: `git pull origin main`
> 2. Abra a pasta `ipojuca-rmm` no Antigravity.
> 3. Digite no chat:
>    `/startcycle Leia @production_artifacts/SESSION_HANDOFF.md e vamos continuar de onde paramos`

---

## 1. Status Atual do Projeto (Atualizado no Ciclo #48 — 2026-11-24)

1. **Implantação na VPS (`31.97.86.253` / `root@srv912524`):**
   - Repositório Oficial: `https://github.com/viitor14/ipojuca-rmm.git` (branch `main`).
   - **Portas configuradas sem conflito com os outros containers da VPS:**
     - **Frontend (Dashboard 3D Digital Twin):** `http://31.97.86.253:8095`
     - **Backend (API Node.js + Socket.io):** `http://31.97.86.253:4005`
     - **MySQL 8.0:** Vinculado apenas ao loopback da VPS (`127.0.0.1:3309:3306`) no `docker-compose.yml` endurecido.
     - **n8n:** Integrado ao container existente na porta `5678` (`infrastructure/n8n/rmm_whatsapp_ticket_workflow.json` com validação HMAC-SHA256 e deduplicação por `x-idempotency-key`).
     - **TLS/HTTPS:** Template pronto de proxy reverso HTTPS/WSS em `infrastructure/nginx/vps-https.conf.example`.
2. **Autenticação Real Obrigatória e Hardening de Segurança (Ciclo #48):**
   - **Frontend (`frontend/src/components/LoginScreen.jsx` e `frontend/src/App.jsx`):** Tela de login real obrigatória com `GET /api/auth/me` e sessão em `sessionStorage`. Zero credenciais/senhas embutidas no bundle de produção (`frontend/dist/`). Preenchimento rápido local só existe em modo `DEV` com `VITE_DEV_QUICK_LOGIN=true` e `.env.local` (não versionado).
   - **Backend (`backend/src/`):**
     - Fail-fast em produção (`validateProductionConfig()` em `env.js`) exigindo segredos fortes e `CORS_ORIGIN` explícito.
     - Hash de senha com salt aleatório individual (`scrypt$<salt>$<hex>`) e upgrade transparente de hashes legados no login.
     - Todos os endpoints de agente (`/api/agent/pending`, `/api/agent/task-result`, `/api/agent/disconnect`, `/api/agent/message`) protegidos por `requireAgentAuth` (`X-Agent-Uuid` + `X-Agent-Token` SHA-256 `timingSafeEqual` + `!is_revoked`) e validação de propriedade da tarefa (`machine_id`).
     - Fim da simulação falsa em `POST /api/command`: quando o agente não responde dentro do timeout, a tarefa permanece honestamente como `DISPATCHED` (`delivery_mode: "queued_for_agent"`) até confirmação real ou expiração automática (`EXPIRED`).
     - Chat bidirecional persistido em banco (`machine_messages`), envio restrito a `TECH_N1`/`ADMIN_N2`, e auditoria completa em realocação/exclusão de máquinas, mensagens e desconexões.
3. **Agente Windows Nativo Oficial (`v2.4.0-native-exe`):**
   - Código-fonte oficial: `agent/native/IpojucaAgent.cs` (`.NET Framework 4.x`, zero dependências externas).
   - Binário único versionado: `backend/public/IpojucaRMM-Setup.exe` (servido exclusivamente via `GET /api/agent/download` e `GET /api/agent/version`).
   - Melhorias do Ciclo #48: correção de injeção PowerShell na instalação de impressoras, validação HMAC-SHA256 + TTL + anti-replay nas tarefas recebidas via polling, verificação SHA-256 obrigatória no OTA, polling calibrado para `5000ms`, paridade de inventário real (`smbios_uuid`, `cpu_cores`, `cpu_threads`, `disk_type`, temperatura ACPI sem valor fabricado, remoção de `Environment.UserName` por LGPD).
   - O diretório `agent/src/` permanece apenas como módulo de referência/testes automatizados.
4. **Banco de Dados & Migrations (`infrastructure/mysql/`):**
   - `01_schema_and_seed.sql` corrigido (erro de sintaxe na tabela `machine_inventory_changes` resolvido; inclui `discovered_printers`, `machine_messages`, `schema_migrations` e layout de corredor alinhado).
   - `07_sector_layout_corridor.sql` tornado seguro para unidades de 1 linha (CAPS) e 3+ linhas.
   - `08_messages_and_migrations_control.sql` adicionado com controle de migrations aplicadas (`schema_migrations`) integrado ao `infrastructure/scripts/deploy_rmm_update.sh`.
5. **Frontend, Digital Twin 3D e Modo Pixel Art (`frontend/src/`):**
   - Lazy loading (`React.lazy` + `Suspense`) de `DigitalTwin3D` e `ModelShowcase` reduzindo o chunk inicial em 74% (`326 kB` vs `1,257 kB`).
   - Card **Alertas Recentes** integrado à coluna lateral, modais de confirmação para **"↑ ATUALIZAR TODOS"** e **"Remover PC"**, remoção da onda senoidal fictícia no osciloscópio, exibição real de `disk_type`, MAC e selo `identity_confidence`.
   - Correções no Digital Twin 3D (corredor único derivado de `computeCorridorBands`, `hasRug: false`, tema `REC` isolado) e no `PixelArtTwin` (filtro por setor, remoção de hardcode de hostname, `wheel` listener estável, remoção de função duplicada).
   - Limpeza de legado concluída (removidos `agente/`, modelos antigos `furniture/tech/previews`, `.exe` duplicados, `RefinedFurniture.jsx`, `.bat` antigos e `axios` não utilizado).
6. **Qualidade & Segurança Verificados (Ciclo #48):**
   - `npm --prefix backend test`: **17/17 aprovados** (incluindo smoke test HTTP real com Express).
   - `npm --prefix frontend run build`: **Sucesso (Vite 6.4.6)**, 0 vulnerabilidades em `backend`, `agent` e `frontend`.
   - **MySQL 8.0.46 ao vivo (containers descartáveis na VPS):** `01_schema_and_seed.sql` validado em banco limpo (13 tabelas + 7 registros em `schema_migrations` + 9 setores) e `07`/`08` validados 2x em clone fiel do banco de produção (5 setores + 4 máquinas preservados).

---

## 2. Pendências Conhecidas / Próximos Passos (Requerem Autorização Explícita)

1. **Verificação Visual no Navegador & Commit:** Concluir revisão visual local (`npm run dev` em `http://localhost:5173`) e aprovar `git commit`.
2. **Revisar e Preparar `.env` de Produção na VPS:** Antes de subir o Ciclo #48 na VPS, garantir que `/home/ipojuca-rmm/.env` possua `JWT_SECRET` (>=24 chars), `TASK_SIGNING_SECRET` (>=24 chars), `N8N_WEBHOOK_SECRET` (>=16 chars), `AGENT_ENROLLMENT_KEY` (>=12 chars) e `CORS_ORIGIN` explícito (ex.: `http://31.97.86.253:8095` ou `https://rmm.ipojuca.pe.gov.br`), pois o backend agora bloqueia boot em produção com segredos fracos ou `CORS_ORIGIN=*`.
3. **Push e Redeploy na VPS (`Gate Final`):** Somente após aprovação explícita do usuário, realizar `git push` e executar `bash infrastructure/scripts/deploy_rmm_update.sh` na VPS.
4. **Ativar HTTPS/WSS e Rotacionar `AGENT_ENROLLMENT_KEY`:** Configurar domínio + certificado TLS usando `infrastructure/nginx/vps-https.conf.example`, atualizar o workflow do n8n com `N8N_WEBHOOK_SECRET` e planejar rotação da chave de enrollment.
