# SESSION HANDOFF — RMM Ipojuca (Contexto Completo para Continuar em Outro PC)

> **Como usar este arquivo em outro computador:**
> 1. Clone (ou atualize) o repositório:
>    - Novo PC: `git clone https://github.com/viitor14/ipojuca-rmm.git`
>    - PC já clonado: `git pull origin main`
> 2. Abra a pasta `ipojuca-rmm` no Antigravity.
> 3. Digite no chat:
>    `/startcycle Leia @production_artifacts/SESSION_HANDOFF.md e vamos continuar de onde paramos`

---

## 1. Status Atual do Projeto (Atualizado no Ciclo #59 — 2026-11-26)

1. **Implantação na VPS (`31.97.86.253` / `root@srv912524`):**
   - Repositório Oficial: `https://github.com/viitor14/ipojuca-rmm.git` (privado, branch `main`, em produção na VPS no commit **`f9edd5e`** com `Pulso RMM` + `v2.6.1-native-exe` hardened; **Ciclo #59 — Módulos de Inventário com Quantitativos, Monitoramento/Auditoria e Configurações/Usuários pronto localmente** aguardando aprovação para commit/push/deploy).
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
3. **Agente Windows Nativo Oficial (`v2.6.1-native-exe` pronto localmente com Hardening Pré-Frota):**
   - Código-fonte oficial: `agent/native/IpojucaAgent.cs` (`.NET Framework 4.x`, zero dependências externas — compila com `/r:System.Security.dll` nativo).
   - Binário único versionado: `backend/public/IpojucaRMM-Setup.exe` (`101.888 B`, FileVersion `2.6.1.0`, SHA-256 `1d623c41a7cd6559d56c8e7bb605f27533a7b939ad09099cb2adf0462c8b6d43`, servido via `GET /api/agent/download` autenticado).
   - Evoluções do **Ciclo #58 (`v2.6.1` — Hardening Pré-Frota):** TLS 1.2 explícito no `.NET 4.x` (`ServicePointManager`), proteção anti-LPE usando `credui.dll` quando instalado em `%LocalAppData%` (nunca elevando binário de pasta gravável pelo usuário), `AgentToken` criptografado em disco com **Windows DPAPI** (`ProtectedData.Protect`), limpeza da `EnrollmentKey` após o 1º enrollment, suporte CLI `--enroll=<chave>`, OTA enviando `X-Agent-UUID`/`X-Agent-Token`, zero vazamento de `agent_token_hash` no backend/WebSocket, bloqueio `409` contra rebind de estação ativa online, `POST /api/machines/:id/revoke`, `POST /api/auth/logout` (revogação JWT), rate limiters dedicados e CSP no Nginx.
   - Evoluções dos Ciclos #50–#57 (`v2.6.0`):
     - **Design Editorial `Pulso RMM` no Agente (Ciclo #57):** ícone da bandeja e cabeçalho redesenhados com `PulsoGraphics.DrawBrandMark` (quadrado arredondado `#2D6A4F` + pulso ECG branco), pílula de status auto-ajustável (`PulsoStatusPill`), faixa única de 4 métricas (`CPU`, `RAM`, `Disco`, `Temp.`) sem caixas aninhadas, IPv4 copiável em 1 clique, **chat real em balões GDI+** (`BubbleChatPanel`) e botões arredondados (`PulsoButton`). Bump para `2.6.1-native-exe` garante atualização OTA silenciosa automática.
     - **Sensor de Temperatura Real sem Elevação (`v2.5.2`):** `ReadRealTemperatureC()` consulta `Win32_PerfFormattedData_Counters_ThermalZoneInformation` / `PerfRawData` em `root\CIMV2` (funciona em conta padrão sem `Acesso negado`), com fallback para `MSAcpi_ThermalZoneTemperature` e `Win32_TemperatureProbe`.
     - **Identificação do Usuário no Chat TI (`ResolveLoggedUserSender`, Ciclo #52):** mensagens enviadas pelo usuário exibem seu Nome de Exibição real do Windows/AD (`secur32.dll` `GetUserNameEx`, fallback `Environment.UserName`) em vez de `"Estação <HOSTNAME>"`, mantendo heartbeats/telemetria livres de dados pessoais (LGPD). Bump para `2.5.2-native-exe` aciona OTA silencioso automático nas máquinas em `2.5.0`/`2.5.1`.
     - **Novo Layout Editorial Claro (`SuperAgentForm`, `EditorialMenuRenderer`, ícone de escudo verde `#2D6A4F`):** interface alinhada ao Design System do painel web (`#F4F5F2`/`#FFFFFF`/`#242925`), cabeçalho limpo exibindo apenas `v2.5.0`, 4 cartões de telemetria rápida (`CPU`, `RAM`, `DISCO C:`, `IPv4`), botão **Sincronizar Agora**, **Chat formatado (`RichTextBox`)** com saudação limpa (sem sufixo técnico) + envio via tecla `Enter` e botão `X` minimizando para a bandeja sem encerrar.
     - **Atualização OTA 100% Silenciosa + Proteção Anti-Downgrade SemVer:** removidos `UpdateProgressForm`, balões de OTA/boot/tarefas e `MessageBox` pós-OTA; download, conferência SemVer anti-downgrade (`IsRemoteVersionNewer` e `compareAgentSemVer`), verificação obrigatória SHA-256 (64 hex), substituição (`--ota-update --silent`) e reinício (`--background --silent-restart`) executados em segundo plano com log em `agent.log`. Balão de bandeja mantido exclusivamente para mensagens da Central de TI.
     - **Proteção de Encerramento via UAC Nativo do Windows (`WindowsAdminAuthenticator`):** encerrar pela bandeja (`Encerrar Agente`) dispara a tela nativa de **Controle de Conta de Usuário (UAC)** do Windows (`Verb = "runas"` + `--verify-admin-exit`), compatível nativamente com contas Administradoras **de rede/domínio (Active Directory / Entra ID)** e **locais**, sem senhas hardcoded; tarefa agendada configurada com `/RL LIMITED` (menor privilégio) e fallback nativo `credui.dll` (`CredUIPromptForWindowsCredentials`) caso o processo já tenha sido aberto elevado.
   - O diretório `agent/src/` permanece apenas como módulo de referência/testes automatizados.
4. **Banco de Dados & Migrations (`infrastructure/mysql/`):**
   - Migrations `02` a `08` aplicadas com sucesso em produção na VPS com controle em `schema_migrations` via `infrastructure/scripts/deploy_rmm_update.sh`.
5. **Frontend Multimódulo, Digital Twin 3D e Modo Pixel Art (`frontend/src/` — Ciclo #59 pronto localmente):**
   - Lazy loading (`React.lazy` + `Suspense`) de `DigitalTwin3D`, `ModelShowcase`, `InventoryView`, `MonitoringAuditView` e `SettingsView`; modelo `workstation_pc.glb` corrigido.
   - **Navegação Unificada na `TopBar` (Ciclo #59 — pronto localmente):** alternância instantânea sem recarregar nem desconectar o WebSocket entre **`Mapa`** (Digital Twin atual intacto), **`Inventário`** (KPIs, **Quantitativo interativo de PCs por Unidade e por Setor** com clique filtrando a tabela, filtros avançados, exportação CSV anti-Formula Injection, ações rápidas e sub-aba **`Alterações de hardware`**), **`Monitoramento`** (`Alertas da frota` + **`Trilha de auditoria`** para `ADMIN_N2`) e **`Configurações`** (**`Minha conta e senha`**, **`Usuários e permissões`** com criação/edição/redefinição de senha/exclusão + proteção anti-lockout `ADMIN_N2`, e **`Agentes e segurança`** com revogação/reativação de estações e manifesto/download autenticado do agente `v2.6.1-native-exe`).
   - **Redesign Editorial `Pulso RMM` (Ciclos #53–#56 — em produção em `f9edd5e`):**
     - Barra superior unificada (`54px`), controles centralizados `Pixel Art / 3D`, trilho esquerdo contínuo recolhível, tela de Login editorial e Painel Inspetor (`DiagnosticDrawer.jsx`) em 4 zonas com catálogo de ações agrupado e cards/modais com stepper HMAC.
6. **Qualidade & Segurança Verificados (Ciclo #59):**
   - `npm --prefix backend test`: **20/20 aprovados** (`fail 0`, `7.69s`, incluindo Teste #20 de troca de senha, CRUD de usuários anti-lockout e histórico global de hardware).
   - `npm --prefix frontend run build`: **APROVADO** (`676` módulos, 3 chunks lazy novos, `SECRET_SCAN_HITS = 0`).
   - Inspeção visual em navegador headless real (`1440×900` e `1280×720`): **APROVADA** (`tableOverflowX = 0`, clique em unidade filtrando a tabela `5 → 3`, `headerScrollW = 1280/1280`, `JS_ERRORS = 0`).

---

## 2. Pendências Conhecidas / Próximos Passos (Requerem Autorização Explícita)

1. **Commit, Push e Redeploy do Ciclo #59 na VPS (`Gate Final`):** Somente após aprovação explícita do usuário, realizar `git commit`, `git push` e rodar `bash infrastructure/scripts/deploy_rmm_update.sh` na VPS (zero nova migration SQL necessária — `users`, `machines`, `machine_inventory_changes`, `alerts` e `audit_logs` já existem em produção).
2. **Trocar senhas iniciais pelo próprio painel:** Após o deploy do Ciclo #59, abrir **`Configurações` → `Usuários e permissões`** e redefinir as senhas das contas `admin`, `suporte` e `gestao` (ou excluir as que não forem utilizadas).
3. **Ativar HTTPS/WSS quando houver domínio:** Configurar domínio + certificado TLS usando `infrastructure/nginx/vps-https.conf.example`, fechar portas `4005`/`8095` em `127.0.0.1` e atualizar `AGENT_ENROLLMENT_KEY` no `.env` da VPS.
