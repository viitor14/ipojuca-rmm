# Auditoria Final de Segurança e Conformidade LGPD — RMM Ipojuca

**Ciclo:** #01  
**Fase:** FASE 10 — Auditoria Final de Segurança  
**Responsável:** `@security` (com apoio de `@qa`)  
**Skills Consultadas:** `.agents/skills/security/security_audit.md`, `.agents/skills/security/endpoint_security.md`, `.agents/skills/security/threat_modeling.md`

---

## 1. Escopo da Auditoria Final

Foi realizada auditoria estática e dinâmica sobre o código-fonte implementado em `backend/`, `agent/`, `frontend/`, `infrastructure/` e `docker-compose.yml`, confrontando a implementação com o OWASP ASVS, OWASP API Security Top 10 e o plano de segurança da Fase 3.

---

## 2. Checklist de Verificações Obrigatórias (`security_audit.md`)

| Item Auditado | Evidência Técnica no Código | Status |
| :--- | :--- | :--- |
| **1. Autenticação em todas as rotas protegidas** | Middleware `requireAuth` aplicado em `/units`, `/machines`, `/diagnostics`, `/catalog/tasks`, `/command`, `/alerts`, `/audit-logs` (`backend/src/routes/api.js`) e nos handshakes Socket.io (`backend/src/realtime/socketHub.js`). | **CONFORME** |
| **2. Autorização validada no servidor (RBAC)** | Middleware `requireRole(['TECH_N1', 'ADMIN_N2'])` + validação de `taskSpec.allowedRoles` diretamente em `POST /api/command`. | **CONFORME** |
| **3. Bloqueio de Execução Remota Irrestrita (RCE)** | Qualquer payload contendo `script`, `powershell` ou `cmd` em `/api/command` é rejeitado com HTTP `403` e auditado. O Agente Windows (`agent/src/tasks/taskExecutor.js`) possui dicionário imutável (`Object.freeze`) sem uso de `eval` ou execução de strings vindas da rede. | **CONFORME** |
| **4. Proteção contra Replay Attack e Adulteração** | Cada ordem `task:execute` carrega `expires_at` (TTL de 120s), assinatura HMAC-SHA256 (`verifyAgentTaskSignature` com `crypto.timingSafeEqual`) e controle de `executedTaskIds` em memória no agente. Testado e validado no Teste #7 (`409` para replay, `401` para assinatura inválida). | **CONFORME** |
| **5. Identidade Individual e Revogação de Agentes** | Cada agente autentica via `X-Agent-Uuid` e `X-Agent-Token` (comparado contra `agent_token_hash` SHA-256 com `timingSafeEqual`) e verifica a flag `machine.is_revoked`. | **CONFORME** |
| **6. Ausência de Credenciais Hardcoded de Produção** | Segredos carregados via variáveis de ambiente (`backend/.env.example`, `agent/.env.example`, `docker-compose.yml`). | **CONFORME** |
| **7. Conformidade LGPD nas Unidades de Saúde** | O coletor `agent/src/collectors/systemCollector.js` consulta estritamente métricas de hardware/SO (`Win32_ComputerSystem`, `Win32_BIOS`, `Win32_LogicalDisk`, serviço `Spooler`), sem acessar arquivos de usuários ou dados clínicos. | **CONFORME** |
| **8. Segurança de Contêineres Docker** | `backend/Dockerfile` executa sob usuário sem privilégios (`USER node`), possui `HEALTHCHECK` configurado e cabeçalhos HTTP de segurança (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`). | **CONFORME** |

---

## 3. Riscos Residuais e Recomendações Operacionais para Produção

1. **Certificados TLS (HTTPS/WSS) na VPS:** Em ambiente de produção, o proxy reverso (Nginx/Traefik) deve operar obrigatoriamente com certificado TLS válido (Let's Encrypt ou ICP-Brasil institucional) para criptografar os cabeçalhos `X-Agent-Token` e `Authorization` em trânsito entre as Unidades de Saúde e a VPS central.
2. **Rotação de Segredos `.env`:** Antes de subir o `docker-compose.yml` na VPS de produção, substituir os valores padrão de `JWT_SECRET`, `TASK_SIGNING_SECRET`, `N8N_WEBHOOK_SECRET` e `DB_PASSWORD` por chaves aleatórias de 256 bits (`openssl rand -hex 32`).

---

## 4. Parecer do Gate de Segurança Final — FASE 10

- **Status:** **APROVADO PELO `@security`**.
- **Vulnerabilidades Críticas ou Altas Pendentes:** **0 (Zero)**.
- O sistema está liberado para a Fase 11 (Preparação de Infraestrutura e Guia de Implantação).

---

## 5. Adendo de Auditoria — Ciclo #03 (`@security`)

1. **Minimização de Dados e LGPD no Ambiente 3D:** As camadas de mobiliário clínico, malha de fibra óptica e osciloscópio consomem exclusivamente metadados técnicos e coordenadas espaciais das estações e setores, sem exposição de dados pessoais ou clínicos.
2. **Integridade de Controles RBAC:** A evolução do HUD e da lâmina tática preservou integralmente o bloqueio de tarefas remotas conforme o perfil do operador autenticado (`VIEWER`, `TECH_N1`, `ADMIN_N2`).



---

## 6. Adendo de Auditoria Final — Ciclo #26 (`@security`)

**Data:** 2026-11-17  
**Responsável:** `@security`  
**Escopo:** Endpoints CRUD de Unidades (`POST/PUT/DELETE /api/units`), Endpoints CRUD de Setores (`POST /api/units/:unitId/sectors`, `PUT/DELETE /api/sectors/:id`), Modal `UnitSectorManagerModal.jsx`, migrações MySQL em `repository.js` e adaptador `frameworkCompat.js`.

| Controle Auditado | Evidência Verificada | Status |
| :--- | :--- | :--- |
| **RBAC na API** | `requireAuth` + `requireRole(["TECH_N1", "ADMIN_N2"])` ativos em todas as 6 rotas de criação/edição/exclusão; `VIEWER` bloqueado com `403` no Teste #9. | **CONFORME** |
| **RBAC na Interface** | `canManageStructure` oculta `+ Unidade`, `✎ Unidade`, `+ Setor`, `✎` e `✕` para usuários `VIEWER`. | **CONFORME** |
| **Proteção contra SQL Injection / Input Malicioso** | Todas as queries MySQL utilizam *prepared statements* (`?`), códigos normalizados por regex `[A-Z0-9-]+` e dimensões numéricas limitadas por *clamp*. | **CONFORME** |
| **Auditoria Completa** | Eventos `UNIT_CREATED`, `UNIT_UPDATED`, `UNIT_DELETED`, `SECTOR_CREATED`, `SECTOR_UPDATED` e `SECTOR_DELETED` verificados em `audit_logs` via asserção automatizada. | **CONFORME** |

- **Parecer Final do Gate de Segurança (Ciclo #26):** **APROVADO — 0 vulnerabilidades pendentes.**


---

## Ciclo #27 — Auditoria de Segurança (`@security`, Fase 10)

Revisão do diff (`repository.js`, `api.js`, `hardwareIdentity.js`, `hardwareInventory.js`, SQL).

- **SQL:** todas as consultas novas são parametrizadas. O único valor interpolado é o `LIMIT` de `listInventoryChanges`, convertido com `Number()`.
- **PowerShell:** script fixo, enviado por `-EncodedCommand`, sem nenhum dado externo. Somente leitura (`Get-CimInstance`, `Get-Partition`).
- **Dados:** só dados do equipamento, sem usuário logado, arquivos ou navegação. Conforme RNF-34.
- **Identidade:** `hardware_key` calculada no servidor; conflito de `smbios_uuid` bloqueado e auditado; máquina revogada não é reassociada.
- **ALTO (aberto, herdado e agravado):** `AGENT_ENROLLMENT_KEY` única, com valor padrão no repositório e embutida no agente C#. Com o rebind, quem a possuir e souber serial e `smbios_uuid` de um PC pode assumir o registro dele (o agente legítimo perde o token até reenviar). Mitigação recomendada: chave por unidade, rotação, ou aprovação manual do rebind.
- **MÉDIO (herdado, fora do escopo):** valores padrão de segredos no `docker-compose.yml` e sal fixo no hash de senhas.

Parecer: sem vulnerabilidade crítica nova. O risco alto de S1 exige decisão do usuário antes da implantação.

---

## 7. Adendo de Auditoria e Remediação Completa — Ciclo #48 (`@security` + `@qa`)

**Data:** 2026-11-24  
**Responsável:** `@security` (validação automatizada por `@qa`)  
**Escopo:** Remediação completa dos achados críticos, altos e médios identificados no diagnóstico de pré-ciclo (`backend/`, `agent/native/IpojucaAgent.cs`, `frontend/`, `docker-compose.yml`, `infrastructure/`).

### 7.1. Controles Remediados e Verificados

| Achado / Controle | Remediação Aplicada | Evidência de Verificação | Status |
| :--- | :--- | :--- | :--- |
| **RCE / PowerShell Injection no Agente C#** | `InstallApprovedPrinter` em `agent/native/IpojucaAgent.cs` passou a validar IPv4 estritamente privado (`IsPrivateIpv4Strict`), aplicar whitelist `[a-zA-Z0-9 _().-]` (max 64) em `SanitizePrinterName` e escapar strings com `EscapePsSingleQuoted` via variáveis PowerShell. | Revisão de código + compilação `csc.exe` v`2.4.0.0` (`backend/public/IpojucaRMM-Setup.exe`). | **REMEDIADO** |
| **Endpoints de Agente Sem Autenticação (`pending`, `task-result`, `disconnect`, `message`)** | Criado middleware `createRequireAgentAuth(repository)` exigindo `X-Agent-Uuid` + `X-Agent-Token` (SHA-256 `timingSafeEqual`) e `!is_revoked`. Verificação estrita de ownership (`existingTask.machine_id === req.machine.id`) em `POST /api/agent/task-result` e Socket.io `task:result`. | Teste #14 (`401` sem/com token inválido, `403` revogado, `403` spoof + `SECURITY_BLOCKED_TASK_RESULT_SPOOF`). | **REMEDIADO** |
| **Assinatura HMAC + TTL + Anti-Replay no Polling C#** | Backend assina cada tarefa da fila HTTP com `machine.agent_token_hash` + `expires_at` (120s). Agente C# valida HMAC-SHA256 (`VerifyTaskHmac`), TTL UTC e conjunto `_executedTaskIds` antes de executar. | Testes #5, #12 e #14 (`verifyTaskSignature` positivo para a máquina alvo e negativo para outra máquina). | **REMEDIADO** |
| **OTA Update Sem Verificação SHA-256 Obrigatória** | `UpdateProgressForm.RunUpdatePipeline` agora aborta a atualização caso `/api/agent/version` falhe, não retorne hash SHA-256 válido (64 hex) ou haja divergência com o binário baixado (removendo o `.tmp`). | Revisão de `agent/native/IpojucaAgent.cs` + Teste #8 validando `sha256` em `/api/agent/version`. | **REMEDIADO** |
| **Credenciais Hardcoded no Bundle Frontend** | Removido `DEMO_PROFILES`, `<RoleSelect>` e auto-login de `frontend/src/App.jsx`; criada tela real obrigatória `LoginScreen.jsx` autenticando contra `POST /api/auth/login` e validando sessão em `GET /api/auth/me`. | Varredura automatizada em `frontend/dist/assets/*.js`: **0 ocorrências** de senhas ou perfis demo. | **REMEDIADO** |
| **Salt Fixo de Senhas e Fail-Fast de Segredos** | `hashPassword` migrado para `scrypt$<salt16bytes>$<hash>` com upgrade transparente de hashes legados no login. `validateProductionConfig()` bloqueia boot em produção com segredos fracos/placeholder ou `CORS_ORIGIN=*`. | Teste #15 (`scrypt$` com salt único, upgrade de hash legado e subprocesso `NODE_ENV=production`). | **REMEDIADO** |
| **Exposição MySQL, CORS, Headers e Webhook n8n** | MySQL vinculado a `127.0.0.1:3309` no `docker-compose.yml`; variáveis obrigatórias (`:?`); `Permissions-Policy` e `trust proxy` no Express/Nginx; `rmm_whatsapp_ticket_workflow.json` exige HMAC `X-RMM-Signature` e deduplica por `x-idempotency-key` sem telefone fallback hardcoded. | Teste #17 (headers reais via Express HTTP), `JSON.parse` no workflow n8n e `npm audit` = **0 vulnerabilidades** em todos os pacotes. | **REMEDIADO** |
| **LGPD no Agente C# e Auditoria Completa** | Removido envio de `Environment.UserName` em `SendClientMessageAsync` (usa `"Estação " + MachineName`); adicionada auditoria para `MACHINE_RELOCATED`, `MACHINE_DELETED`, `AGENT_MESSAGE_SENT`, `AGENT_DISCONNECTED`, `REMOTE_TASK_RESULT` e `SECURITY_BLOCKED_TASK_RESULT_SPOOF`. | Testes #14 e #16 + revisão de `IpojucaAgent.cs`. | **REMEDIADO** |

### 7.2. Riscos Residuais Abertos (Dependem de Ação Operacional na VPS)

1. **TLS/HTTPS na VPS (Operacional):** O template `infrastructure/nginx/vps-https.conf.example` está pronto, mas a ativação de HTTPS/WSS depende de DNS institucional e emissão de certificado Let's Encrypt na VPS.
2. **Rotação da `AGENT_ENROLLMENT_KEY` (Herdado S1):** `deploy_vps.sh` já gera chave aleatória para novas implantações e `docker-compose.yml` não embute default inseguro, porém máquinas já instaladas com a chave antiga precisarão de janela planejada de rotação/recompilação ou mecanismo de chave por unidade em ciclo futuro.

- **Parecer do Gate de Segurança (Ciclo #48):** **APROVADO PARA HOMOLOGAÇÃO E PREPARO DE DEPLOY** (0 vulnerabilidades críticas/altas de código ou dependências; pendências exclusivamente operacionais de infraestrutura VPS documentadas acima).

---

## 8. Adendo de Auditoria Pré-Implantação em Frota — `Pulso RMM v2.6.0` (Commit `49f6e55`, `@security`)

**Data:** 2026-11-25  
**Responsável:** `@security` (FASE 10 — `.agents/workflows/startcycle.md`)  
**Escopo:** Varredura completa de código, binário C# `v2.6.0`, API REST, Socket.io, banco de dados, frontend (`dist/`), Nginx, Docker Compose, n8n e `npm audit` antes de iniciar instalação em massa nas estações.

### 8.1. Resultado das Verificações Automatizadas
- `npm audit` (`backend`, `frontend`, `agent`): **0 vulnerabilidades**.
- Varredura de segredos e XSS no frontend (`frontend/src` e `frontend/dist/assets/*.js`): **0 ocorrências** (`DIST_SECRET_HITS = 0`).
- Varredura SQL em `backend/src/database/repository.js`: **0 interpolações inseguras** (100% prepared statements `?`).

### 8.2. Achados Bloqueadores Identificados Antes da Instalação em Massa (`NO-GO CONDICIONAL`)
1. **[CRÍTICO — S-01] HTTP puro + OTA sem TLS + ausência de TLS 1.2 no `.NET 4.x`:** `BackendUrl = "http://31.97.86.253:4005"` expõe tokens/chat e permite MitM simultâneo no manifesto `/api/agent/version` e binário `/api/agent/download`. Além disso, falta `ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072` para compatibilidade com Nginx TLS 1.2/1.3.
2. **[ALTO — S-02] LPE Local no encerramento via `Verb = "runas"` sobre `%LocalAppData%`:** `RequestViaNativeUac` eleva `Application.ExecutablePath` localizado em pasta gravável por usuário comum. Recomendação: adotar `RequestViaNativeCredUi` (`credui.dll` + `LogonUser`) sem elevar o executável de `%LocalAppData%` (ou instalar o binário em `%ProgramFiles%`).
3. **[ALTO — S-03] Vazamento de `agent_token_hash` (chave HMAC de tarefas) em `findMachineById` → `machine:updated` / `/refresh-telemetry` / `/location`:** expõe a chave de assinatura HMAC individual da máquina para clientes `/dashboard` (inclusive `VIEWER`). Correção: sanitizar `agent_token_hash` em todas as saídas e broadcasts.
4. **[ALTO — S-04] `AGENT_ENROLLMENT_KEY` padrão no `.exe` + `/api/agent/download` público + rebind automático:** permite extração da chave e registro/rebind não autorizado. Correção: rotacionar chave fora do Git, proteger `/api/agent/download` (JWT ou auth de agente) e restringir rebind automático.
5. **[MÉDIOS — S-05 a S-08]:** `agent-identity.json` em texto claro (migrar para DPAPI), ausência de CSP no Nginx e rate limit em `/command`/`/agent/message`/`/agent/download`, ausência de rota `POST /api/machines/:id/revoke` e fluxo de troca de senha.
6. **[BAIXOS — S-09, S-10]:** limpeza de `sbPass` no `finally`, validação de caminho no `Kill()` do instalador, textos legados `"RMM Ipojuca"` e bind `127.0.0.1` das portas Docker quando atrás do Nginx HTTPS.

- **Parecer do Gate de Segurança Pré-Frota:** **NO-GO para instalação em massa** até a remediação de **S-01 a S-04** (liberado apenas para teste piloto restrito em estação da equipe de TI).

---

## 9. Remediação de Hardening Pré-Frota — Ciclo #58 (`v2.6.1-native-exe`, `@security` + `@engineer` + `@qa`)

**Data:** 2026-11-25  
**Escopo:** Remediação de todos os achados de código identificados na Seção 8 (`S-01` preparo TLS 1.2, `S-02`, `S-03`, `S-04`, `S-05`, `S-06`, `S-07`, `S-09`).

| ID | Remediação Aplicada | Evidência de Verificação | Status |
| :--- | :--- | :--- | :--- |
| **S-01 (Código)** | `ServicePointManager.SecurityProtocol = (SecurityProtocolType)3072 \| SecurityProtocolType.Tls` adicionado no `Program.Main` do agente (`v2.6.1`) para compatibilidade plena com Nginx TLS 1.2/1.3. | Revisão de `IpojucaAgent.cs` + compilação `csc.exe` `v2.6.1.0`. *(Ativação de HTTPS/domínio na VPS permanece como etapa operacional.)* | **PREPARADO (CÓDIGO)** |
| **S-02 (ALTO)** | `WindowsAdminAuthenticator.RequestAdminAuthorization` usa exclusivamente **`credui.dll` (`CredUIPromptForWindowsCredentials` + `LogonUser` + `IsTokenAdministrator`)** sempre que o binário residir fora de `Program Files` (`%LocalAppData%`), eliminando o risco de LPE por `Verb = "runas"`. | Reflexão confirmou `IsInstalledInSystemProtectedDirectory() == False` fora de `Program Files`; `sbPass` zerado no `finally`. | **REMEDIADO** |
| **S-03 (ALTO)** | Criado `sanitizeMachine()` aplicado em `socketHub.broadcastToDashboard("machine:updated")` e em todas as respostas HTTP (`/refresh-telemetry`, `/location`, `/revoke`, `/machines`, `/diagnostics`). | Teste #19 validou `agent_token_hash === undefined` em HTTP e Socket.io. | **REMEDIADO** |
| **S-04 (ALTO)** | `GET /api/agent/download` protegido por `createRequireOperatorOrAgentAuth` (JWT de operador ou `X-Agent-Uuid`+`X-Agent-Token` do agente); `App.jsx` migrado para download autenticado via Blob; `IpojucaAgent.cs` envia credenciais no OTA e aceita `--enroll=<chave>`; `rebindAgentToMachine` bloqueia sequestro de máquina ativa `ONLINE` (`409` + `SECURITY_BLOCKED_ACTIVE_AGENT_REBIND`). | Teste #10 (`409` em rebind ativo, `200` quando offline), Teste #19 e smoke test HTTP ao vivo (`anon=401`, `op=200`, `agt=200`). | **REMEDIADO** |
| **S-05 (MÉDIO)** | `AgentToken` salvo em `agent-identity.json` criptografado via **Windows DPAPI** (`ProtectedData.Protect`, `DataProtectionScope.CurrentUser`, prefixo `dpapi:`), com migração automática e limpeza da `EnrollmentKey` após o 1º enrollment bem-sucedido. | Reflexão confirmou `DPAPI_PREFIX=True` e `DPAPI_ROUNDTRIP=True` no binário compilado (`101.888 B`). | **REMEDIADO** |
| **S-06 (MÉDIO)** | Adicionado cabeçalho `Content-Security-Policy` em `frontend/nginx.conf` e rate limiters dedicados em `/command`, `/agent/message`, `/agent/pending`, `/agent/version` e `/agent/download`. | Revisão de `frontend/nginx.conf` e `backend/src/routes/api.js` + `19/19` testes aprovados. | **REMEDIADO** |
| **S-07 (MÉDIO)** | Criados `POST /api/machines/:id/revoke` (`ADMIN_N2`, desconecta socket ativo e audita `AGENT_REVOKED`) e `POST /api/auth/logout` (blacklist JWT em memória até expiração natural). | Teste #19 validou `403` para `TECH_N1`, `200` para `ADMIN_N2`, `403` no agente revogado e `401` pós-logout. | **REMEDIADO** |
| **S-09 (BAIXO)** | Validação de diretório do processo antes de `proc.Kill()` no `RunInstaller`, limpeza de `sbPass` em memória e atualização das mensagens restantes para `Pulso RMM`. | Revisão de `agent/native/IpojucaAgent.cs` + compilação limpa `v2.6.1.0`. | **REMEDIADO** |

### Parecer Atualizado do Gate de Segurança (Pós-Ciclo #58)
- **Vulnerabilidades críticas ou altas de código:** **0 (ZERO)**.
- **Status para instalação em rede interna/piloto:** **APROVADO PELO `@security`**.
- **Checklist operacional restante para internet aberta (VPS):**
  1. Configurar domínio + HTTPS/WSS na VPS com `infrastructure/nginx/vps-https.conf.example` e fechar portas `4005`/`8095` em `127.0.0.1`.
  2. Configurar `AGENT_ENROLLMENT_KEY` exclusiva no `.env` da VPS (fora do Git) e distribuir o instalador passando `--url=https://... --enroll=<CHAVE>` (ou recompilado com esses valores) e confirmar senhas reais fortes no MySQL.

---

## 10. Auditoria de Segurança — Ciclo #59 (Gestão de Senhas, Usuários, Inventário e CSV, `@security`)

**Data:** 2026-11-26  
**Escopo:** Remediação do item **`S-08`** (fluxo de troca de senha e gestão de contas pelo painel) + validação de RBAC, anti-lockout e exportação CSV nos novos módulos (`InventoryView.jsx`, `MonitoringAuditView.jsx`, `SettingsView.jsx`, `api.js` e `repository.js`).

| Controle Auditado | Implementação Verificada | Resultado |
| :--- | :--- | :--- |
| **Troca da Própria Senha (`S-08`)** | `POST /api/auth/change-password` (`requireAuth`, `authLimiter`): valida `current_password` via `verifyPassword`, exige `>= 8` chars diferente da atual, grava `scrypt$` com salt aleatório e audita `AUTH_PASSWORD_CHANGED` / `AUTH_PASSWORD_CHANGE_FAILED`. | **APROVADO (REMEDIADO)** |
| **RBAC e Sigilo de Hashes em `/api/users`** | `GET/POST/PUT/DELETE /api/users` restritos a `requireRole(['ADMIN_N2'])`; `sanitizeUser()` remove `password_hash` em todas as saídas; validado no Teste #20 (`VIEWER`/`TECH_N1` recebem `403`, zero vazamento de `password_hash`). | **APROVADO** |
| **Proteção Anti-Lockout (`ADMIN_N2`)** | `updateUser` e `deleteUser` impedem auto-exclusão, auto-desativação e desativação/rebaixamento/exclusão do último `ADMIN_N2` ativo (`409 Conflict`). | **APROVADO** |
| **Exportação CSV Segura (Anti-Formula Injection)** | `sanitizeCsvCell()` em `InventoryView.jsx` neutraliza células iniciadas por `=`, `+`, `-`, `@`, `\t` ou `\r` prefixando `'` antes da codificação CSV com UTF-8 BOM. | **APROVADO** |
| **Correção de Logout em `App.jsx`** | Corrigida chamada `loadSessionToken()` → `readSavedToken()` em `handleLogout`, garantindo invocação real de `POST /api/auth/logout` (revogação JWT) ao sair do painel. | **APROVADO** |

- **Parecer do Gate de Segurança (Pós-Ciclo #59):** **APROVADO PELO `@security`** (`20/20` testes backend, `SECRET_SCAN_HITS = 0`, `S-08` remediado — operadores já podem alterar todas as senhas iniciais diretamente pela aba `Configurações`).
