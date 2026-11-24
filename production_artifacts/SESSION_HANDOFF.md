# SESSION HANDOFF — RMM Ipojuca (Contexto Completo para Continuar em Outro PC)

> **Como usar este arquivo em outro computador:**
> 1. Clone (ou atualize) o repositório:
>    - Novo PC: `git clone https://github.com/viitor14/ipojuca-rmm.git`
>    - PC já clonado: `git pull origin main`
> 2. Abra a pasta `ipojuca-rmm` no Antigravity.
> 3. Digite no chat:
>    `/startcycle Leia @production_artifacts/SESSION_HANDOFF.md e vamos continuar de onde paramos`

---

## 1. Status Atual do Projeto (Atualizado no Ciclo #51 — 2026-11-24)

1. **Implantação na VPS (`31.97.86.253` / `root@srv912524`):**
   - Repositório Oficial: `https://github.com/viitor14/ipojuca-rmm.git` (branch `main`, produção ativa no commit `ca896fd` após deploy bem-sucedido do Ciclo #48 + correção 3D da mesa e `docker-compose.yml`).
   - **Portas configuradas sem conflito com os outros containers da VPS:**
     - **Frontend (Dashboard 3D Digital Twin):** `http://31.97.86.253:8095`
     - **Backend (API Node.js + Socket.io):** `http://31.97.86.253:4005`
     - **MySQL 8.0:** Vinculado apenas ao loopback da VPS (`127.0.0.1:3309:3306`) no `docker-compose.yml` endurecido.
     - **n8n:** Integrado ao container existente na porta `5678` (`infrastructure/n8n/rmm_whatsapp_ticket_workflow.json` com validação HMAC-SHA256 e deduplicação por `x-idempotency-key`).
     - **TLS/HTTPS:** Template pronto de proxy reverso HTTPS/WSS em `infrastructure/nginx/vps-https.conf.example`.
2. **Autenticação Real Obrigatória e Hardening de Segurança (Ciclo #48 — em produção):**
   - **Frontend (`frontend/src/components/LoginScreen.jsx` e `frontend/src/App.jsx`):** Tela de login real obrigatória com `GET /api/auth/me` e sessão em `sessionStorage`. Zero credenciais/senhas embutidas no bundle de produção (`frontend/dist/`). Preenchimento rápido local só existe em modo `DEV` com `VITE_DEV_QUICK_LOGIN=true` e `.env.local` (não versionado).
   - **Backend (`backend/src/`):**
     - Fail-fast em produção (`validateProductionConfig()` em `env.js`) exigindo segredos fortes e `CORS_ORIGIN` explícito.
     - Hash de senha com salt aleatório individual (`scrypt$<salt>$<hex>`) e upgrade transparente de hashes legados no login.
     - Todos os endpoints de agente (`/api/agent/pending`, `/api/agent/task-result`, `/api/agent/disconnect`, `/api/agent/message`) protegidos por `requireAgentAuth` (`X-Agent-Uuid` + `X-Agent-Token` SHA-256 `timingSafeEqual` + `!is_revoked`) e validação de propriedade da tarefa (`machine_id`).
     - Fim da simulação falsa em `POST /api/command`: quando o agente não responde dentro do timeout, a tarefa permanece honestamente como `DISPATCHED` (`delivery_mode: "queued_for_agent"`) até confirmação real ou expiração automática (`EXPIRED`).
     - Chat bidirecional persistido em banco (`machine_messages`), envio restrito a `TECH_N1`/`ADMIN_N2`, alerta automático de inatividade `>24h` (`INACTIVITY_24H`) e auditoria completa em realocação/exclusão de máquinas, mensagens e desconexões.
3. **Agente Windows Nativo Oficial (`v2.5.0-native-exe` — Ciclos #50 e #51 prontos localmente):**
   - Código-fonte oficial: `agent/native/IpojucaAgent.cs` (`.NET Framework 4.x`, zero dependências externas).
   - Binário único versionado: `backend/public/IpojucaRMM-Setup.exe` (`88.576 B`, FileVersion `2.5.0.0`, SHA-256 `e71766a1d545d0009e111f8520d5b553ac69f98fa5126d20d95bb6250ff81bd2`, servido via `GET /api/agent/download` e `GET /api/agent/version`).
   - Evoluções dos Ciclos #50 e #51:
     - **Novo Layout Editorial Claro (`SuperAgentForm`, `EditorialMenuRenderer`, ícone de escudo verde `#2D6A4F`):** interface alinhada ao Design System do painel web (`#F4F5F2`/`#FFFFFF`/`#242925`), cabeçalho limpo exibindo apenas `v2.5.0`, 4 cartões de telemetria rápida (`CPU`, `RAM`, `DISCO C:`, `IPv4`), botão **Sincronizar Agora**, **Chat formatado (`RichTextBox`)** com saudação limpa (sem sufixo técnico) + envio via tecla `Enter` e botão `X` minimizando para a bandeja sem encerrar.
     - **Atualização OTA 100% Silenciosa + Proteção Anti-Downgrade SemVer:** removidos `UpdateProgressForm`, balões de OTA/boot/tarefas e `MessageBox` pós-OTA; download, conferência SemVer anti-downgrade (`IsRemoteVersionNewer` e `compareAgentSemVer`), verificação obrigatória SHA-256 (64 hex), substituição (`--ota-update --silent`) e reinício (`--background --silent-restart`) executados em segundo plano com log em `agent.log`. Balão de bandeja mantido exclusivamente para mensagens da Central de TI.
     - **Proteção de Encerramento via UAC Nativo do Windows (`WindowsAdminAuthenticator`):** encerrar pela bandeja (`Encerrar Agente`) dispara a tela nativa de **Controle de Conta de Usuário (UAC)** do Windows (`Verb = "runas"` + `--verify-admin-exit`), compatível nativamente com contas Administradoras **de rede/domínio (Active Directory / Entra ID)** e **locais**, sem senhas hardcoded; tarefa agendada configurada com `/RL LIMITED` (menor privilégio) e fallback nativo `credui.dll` (`CredUIPromptForWindowsCredentials`) caso o processo já tenha sido aberto elevado.
   - O diretório `agent/src/` permanece apenas como módulo de referência/testes automatizados.
4. **Banco de Dados & Migrations (`infrastructure/mysql/`):**
   - Migrations `02` a `08` aplicadas com sucesso em produção na VPS com controle em `schema_migrations` via `infrastructure/scripts/deploy_rmm_update.sh`.
5. **Frontend, Digital Twin 3D e Modo Pixel Art (`frontend/src/`):**
   - Lazy loading (`React.lazy` + `Suspense`) de `DigitalTwin3D` e `ModelShowcase` reduzindo o chunk inicial em 74%; modelo `workstation_pc.glb` corrigido (monitor orientado corretamente, sem impressora sobre a mesa, LED centralizado).
6. **Qualidade & Segurança Verificados (Ciclo #50):**
   - `npm --prefix backend test`: **18/18 aprovados** (`fail 0`, `3.83s`).
   - Compilação `csc.exe` (`v2.5.0.0`) + reflexão `WindowsAdminAuthenticator` + instanciação `AdminAuthDialog`/`SuperAgentForm`: **APROVADOS**.

---

## 2. Pendências Conhecidas / Próximos Passos (Requerem Autorização Explícita)

1. **Teste Manual Local do Novo Agente (`v2.5.0-native-exe`):** Executar `backend/public/IpojucaRMM-Setup.exe` em uma máquina Windows para validar o novo layout editorial claro, o envio de chat com `Enter`, o recolhimento no `X` e o bloqueio/liberação de encerramento por conta de Administrador do Windows.
2. **Commit, Push e Redeploy na VPS (`Gate Final`):** Somente após aprovação explícita do usuário, realizar `git commit`, `git push` e executar `bash infrastructure/scripts/deploy_rmm_update.sh` na VPS (os agentes `v2.4.0` já ativos atualizarão silenciosamente para `v2.5.0` quando acionado no painel).
3. **Ativar HTTPS/WSS e Rotacionar `AGENT_ENROLLMENT_KEY`:** Configurar domínio + certificado TLS usando `infrastructure/nginx/vps-https.conf.example`, atualizar o workflow do n8n com `N8N_WEBHOOK_SECRET` e planejar rotação da chave de enrollment.
