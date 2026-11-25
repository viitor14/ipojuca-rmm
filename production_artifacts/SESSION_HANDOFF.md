# SESSION HANDOFF — RMM Ipojuca (Contexto Completo para Continuar em Outro PC)

> **Como usar este arquivo em outro computador:**
> 1. Clone (ou atualize) o repositório:
>    - Novo PC: `git clone https://github.com/viitor14/ipojuca-rmm.git`
>    - PC já clonado: `git pull origin main`
> 2. Abra a pasta `ipojuca-rmm` no Antigravity.
> 3. Digite no chat:
>    `/startcycle Leia @production_artifacts/SESSION_HANDOFF.md e vamos continuar de onde paramos`

---

## 1. Status Atual do Projeto (Atualizado no Ciclo #57 — 2026-11-25)

1. **Implantação na VPS (`31.97.86.253` / `root@srv912524`):**
   - Repositório Oficial: `https://github.com/viitor14/ipojuca-rmm.git` (branch `main`, produção ativa no commit `985c7a4` com identidade **`Pulso RMM`** e agente **`v2.5.2-native-exe`**).
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
3. **Agente Windows Nativo Oficial (`v2.6.0-native-exe` pronto localmente; `v2.5.2` em produção na VPS):**
   - Código-fonte oficial: `agent/native/IpojucaAgent.cs` (`.NET Framework 4.x`, zero dependências externas).
   - Binário único versionado: `backend/public/IpojucaRMM-Setup.exe` (`99.840 B`, FileVersion `2.6.0.0`, SHA-256 `d97b4af851547f99a2be4e1d70c110f98bb035ad97ff1430fc978b93160e15ec`, servido via `GET /api/agent/download` e `GET /api/agent/version`).
   - Evoluções dos Ciclos #50–#57 (`v2.6.0`):
     - **Design Editorial `Pulso RMM` no Agente (Ciclo #57):** ícone da bandeja e cabeçalho redesenhados com `PulsoGraphics.DrawBrandMark` (quadrado arredondado `#2D6A4F` + pulso ECG branco), pílula de status auto-ajustável (`PulsoStatusPill`), faixa única de 4 métricas (`CPU`, `RAM`, `Disco`, `Temp.`) sem caixas aninhadas, IPv4 copiável em 1 clique, **chat real em balões GDI+** (`BubbleChatPanel`) e botões arredondados (`PulsoButton`). Bump para `2.6.0-native-exe` garante atualização OTA silenciosa automática em todas as estações na `v2.5.x`.
     - **Sensor de Temperatura Real sem Elevação (`v2.5.2`):** `ReadRealTemperatureC()` consulta `Win32_PerfFormattedData_Counters_ThermalZoneInformation` / `PerfRawData` em `root\CIMV2` (funciona em conta padrão sem `Acesso negado`), com fallback para `MSAcpi_ThermalZoneTemperature` e `Win32_TemperatureProbe`.
     - **Identificação do Usuário no Chat TI (`ResolveLoggedUserSender`, Ciclo #52):** mensagens enviadas pelo usuário exibem seu Nome de Exibição real do Windows/AD (`secur32.dll` `GetUserNameEx`, fallback `Environment.UserName`) em vez de `"Estação <HOSTNAME>"`, mantendo heartbeats/telemetria livres de dados pessoais (LGPD). Bump para `2.5.2-native-exe` aciona OTA silencioso automático nas máquinas em `2.5.0`/`2.5.1`.
     - **Novo Layout Editorial Claro (`SuperAgentForm`, `EditorialMenuRenderer`, ícone de escudo verde `#2D6A4F`):** interface alinhada ao Design System do painel web (`#F4F5F2`/`#FFFFFF`/`#242925`), cabeçalho limpo exibindo apenas `v2.5.0`, 4 cartões de telemetria rápida (`CPU`, `RAM`, `DISCO C:`, `IPv4`), botão **Sincronizar Agora**, **Chat formatado (`RichTextBox`)** com saudação limpa (sem sufixo técnico) + envio via tecla `Enter` e botão `X` minimizando para a bandeja sem encerrar.
     - **Atualização OTA 100% Silenciosa + Proteção Anti-Downgrade SemVer:** removidos `UpdateProgressForm`, balões de OTA/boot/tarefas e `MessageBox` pós-OTA; download, conferência SemVer anti-downgrade (`IsRemoteVersionNewer` e `compareAgentSemVer`), verificação obrigatória SHA-256 (64 hex), substituição (`--ota-update --silent`) e reinício (`--background --silent-restart`) executados em segundo plano com log em `agent.log`. Balão de bandeja mantido exclusivamente para mensagens da Central de TI.
     - **Proteção de Encerramento via UAC Nativo do Windows (`WindowsAdminAuthenticator`):** encerrar pela bandeja (`Encerrar Agente`) dispara a tela nativa de **Controle de Conta de Usuário (UAC)** do Windows (`Verb = "runas"` + `--verify-admin-exit`), compatível nativamente com contas Administradoras **de rede/domínio (Active Directory / Entra ID)** e **locais**, sem senhas hardcoded; tarefa agendada configurada com `/RL LIMITED` (menor privilégio) e fallback nativo `credui.dll` (`CredUIPromptForWindowsCredentials`) caso o processo já tenha sido aberto elevado.
   - O diretório `agent/src/` permanece apenas como módulo de referência/testes automatizados.
4. **Banco de Dados & Migrations (`infrastructure/mysql/`):**
   - Migrations `02` a `08` aplicadas com sucesso em produção na VPS com controle em `schema_migrations` via `infrastructure/scripts/deploy_rmm_update.sh`.
5. **Frontend, Digital Twin 3D e Modo Pixel Art (`frontend/src/` — Ciclos #55 e #56 prontos localmente):**
   - Lazy loading (`React.lazy` + `Suspense`) de `DigitalTwin3D` e `ModelShowcase`; modelo `workstation_pc.glb` corrigido (monitor orientado corretamente, sem impressora sobre a mesa, LED centralizado).
   - **Redesign Editorial `Pulso RMM` (Ciclos #53–#56 — skill `design-taste-frontend`):**
     - **Dashboard & Login (em produção no commit `985c7a4`):** barra superior unificada (`54px`) sob marca independente **`Pulso RMM`**, controles centralizados `Pixel Art / 3D`, trilho esquerdo contínuo recolhível, biblioteca SVG inline (`Icons.jsx`) e tela de Login em duas colunas com rótulo `E-mail`, diagrama vetorial de topologia e indicador real `/api/health`.
     - **Painel Inspetor, Catálogo de Ações e Cards de Execução (`DiagnosticDrawer.jsx` — Ciclos #55 e #56 prontos localmente):**
       - Estrutura em 4 zonas (`Header fixo enxuto` + `3 abas com filete 2px` + `Corpo rolável` + `Rodapé contextual fixo`), realocação sob demanda (`Mover`), métricas semânticas diretas sobre branco, gráfico de área gradiente sem distorção, 8 especificações em hairlines com cópia em 1 clique cabendo 100% sem corte em `1440×900`, e aba `Chat` em altura completa.
       - **Catálogo de Ações (Ciclo #56):** lista editorial agrupada em 3 categorias (`Diagnóstico`, `Manutenção`, `Sistema e periféricos`) com filtro rápido no topo, ícones SVG dedicados, subtítulos claros, selo de risco apenas para `Médio`/`Alto` e rodapé fixo **`Última ação`** com botão `Ver retorno`.
       - **Cards/Modais de Ação (Ciclo #56):** entrada animada + fechamento via `Esc`, ícone temático, **stepper de 3 fases** (`Assinada HMAC → Enviada ao agente → Retorno recebido`), formatação inteligente em tabela hairline ou narrativa limpa (fim definitivo de `"Item #1"`), botões **`Copiar resultado`** e **`Executar novamente`**, além de cards unificados para **Reiniciar estação**, **Instalar impressora** e **Remover equipamento**.
     - **Script de deploy (`infrastructure/scripts/deploy_rmm_update.sh` — pronto localmente):** atualizado para `docker compose build --no-cache backend frontend` + `docker compose up -d --force-recreate backend frontend`, evitando imagens em cache na VPS.
6. **Qualidade & Segurança Verificados (Ciclos #55 e #56):**
   - `npm --prefix frontend run build`: **APROVADO** (`673` módulos, `0` segredos vazados em `frontend/dist/`).
   - Inspeção visual em navegador headless real (`1440×900` e `1280×720`): **APROVADA** (`bodyOverflowY = 0` na aba `Visão geral`, catálogo agrupado, stepper + tabela estruturada sem `"Item #1"`, cópia 1-clique, fechamento por `Esc`, `JS_ERRORS = 0`, `0` overflow horizontal).
   - `npm --prefix backend test`: **18/18 aprovados** (`fail 0`).

---

## 2. Pendências Conhecidas / Próximos Passos (Requerem Autorização Explícita)

1. **Commit, Push e Redeploy dos Ciclos #55, #56 e #57 na VPS (`Gate Final`):** Somente após aprovação explícita do usuário, realizar `git commit`, `git push` (incluindo o novo `DiagnosticDrawer.jsx`, `Icons.jsx`, `frontend/dist/`, o novo agente `v2.6.0-native-exe` em `IpojucaAgent.cs` + `IpojucaRMM-Setup.exe` e o `deploy_rmm_update.sh` com `--no-cache`) e rodar `bash infrastructure/scripts/deploy_rmm_update.sh` na VPS.
2. **Ativar HTTPS/WSS e Rotacionar `AGENT_ENROLLMENT_KEY`:** Configurar domínio + certificado TLS usando `infrastructure/nginx/vps-https.conf.example`, atualizar o workflow do n8n com `N8N_WEBHOOK_SECRET` e planejar rotação da chave de enrollment.
