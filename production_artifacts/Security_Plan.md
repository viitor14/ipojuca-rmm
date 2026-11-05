# Plano de Segurança, Modelo de Ameaças e Privacidade (LGPD) — RMM Ipojuca

**Ciclo:** #01  
**Fase:** FASE 3 — Segurança e Privacidade  
**Responsável:** `@security`  
**Skills Consultadas:** `.agents/skills/security/threat_modeling.md`, `.agents/skills/security/endpoint_security.md`, `.agents/skills/security/security_audit.md`

---

## 1. Modelo de Ameaças (Metodologia STRIDE)

| ID | Superfície de Ataque | Categoria STRIDE | Ameaça Identificada | Severidade | Mitigação Obrigatória no Código |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **TM-01** | `POST /api/heartbeat` e Socket `/agents` | **S**poofing (Falsificação de Identidade) | Atacante na rede local tenta se passar por um computador de uma USF para injetar telemetria falsa ou interceptar tarefas. | **Alta** | Identidade individual por agente (`agent_uuid` + `agent_secret` único armazenado como hash SHA-256 no banco). Possibilidade de revogação imediata (`is_revoked = 1`). |
| **TM-02** | Comunicação Agente ↔ Backend | **T**ampering (Adulteração) | Adulteração de ordens de manutenção em trânsito ou replay de comando antigo (Replay Attack). | **Crítica** | Uso de TLS (HTTPS/WSS) em produção + assinatura HMAC-SHA256 de cada payload `task:execute` incluindo `task_id` único e `expires_at` (TTL de 2 minutos). O agente mantém cache de `task_id` executados para bloquear repetição. |
| **TM-03** | Execução Remota (`POST /api/command`) | **R**epudiation (Repúdio) | Operador executa manutenção remota e nega autoria ou altera estado de máquina sem rastreabilidade. | **Média** | Tabela imutável `audit_logs` e `remote_tasks` registrando `requested_by_user_id`, IP de origem, `machine_id`, `task_code`, parâmetros validados, horário e resultado. |
| **TM-04** | Coleta de Inventário / Banco de Dados | **I**nformation Disclosure (Exposição de Dados / LGPD) | Coleta inadvertida de dados pessoais de cidadãos/pacientes atendidos nas USFs ou exposição de senhas em logs. | **Crítica** | Proibição estrita de coleta de arquivos de usuário, tela ou histórico web. Sanitização de logs e mascaramento de segredos. |
| **TM-05** | API REST e Webhooks | **D**enial of Service (Negação de Serviço) | Flood de requisições em `/api/heartbeat` ou `/api/auth/login` causando indisponibilidade do painel ou tempestade de mensagens no WhatsApp. | **Alta** | Rate Limiting por IP/Agente no Express, validação estrita de tamanho de JSON (`limit: '100kb'`) e janela de *cooldown* de alertas para o n8n. |
| **TM-06** | Execução de Tarefas no Endpoint Windows | **E**levation of Privilege (Elevação de Privilégio / RCE) | Injeção de comandos PowerShell arbitrários (`Command Injection`) através da rota `/api/command`. | **Crítica** | **Bloqueio arquitetural de terminal livre.** Uso exclusivo de dicionário estático (`TASK_CATALOG`) onde o código executado reside localmente no agente e apenas o identificador (`task_code`) e parâmetros validados por regex são aceitos. |

---

## 2. Autenticação, Autorização (RBAC) e Identidade dos Agentes

### 2.1. Autenticação de Operadores Humanos
- Senhas armazenadas com hash seguro (PBKDF2/Scrypt/Bcrypt com salt).
- Emissão de token JWT assinado com `JWT_SECRET` (expiração padrão de 8h para turno operacional).
- Autorização validada **no servidor** via middleware `requireRole(['TECH_N1', 'ADMIN_N2'])`.

### 2.2. Matriz de Autorização do Catálogo de Tarefas Remotas
Nenhuma string de comando é enviada pela rede. O backend e o agente compartilham apenas os códigos homologados abaixo:

| `task_code` | Descrição Operacional | Risco | Perfil Mínimo | Validação de Parâmetros |
| :--- | :--- | :--- | :--- | :--- |
| `CLEAR_TEMP_CACHE` | Limpa pastas temporárias (`%TEMP%`) sem tocar em pastas de documentos do usuário | `LOW` | `TECH_N1` | Booleano opcional `include_system_temp` |
| `RESTART_SPOOLER` | Reinicia o serviço de Spooler de Impressão (`Spooler`) do Windows | `LOW` | `TECH_N1` | Sem parâmetros externos |
| `COLLECT_NETWORK_DIAG` | Coleta estatísticas de adaptadores, gateway e DNS local | `LOW` | `TECH_N1` | Sem parâmetros externos |
| `FLUSH_DNS_WINSOCK` | Executa `ipconfig /flushdns` para corrigir resolução de nomes na unidade | `MEDIUM` | `TECH_N1` | Sem parâmetros externos |
| `CHECK_DISK_HEALTH` | Consulta status SMART / integridade lógica de volume (somente leitura) | `MEDIUM` | `TECH_N1` | Drive letter validada (`/^[C-Z]$/`) |
| `INSTALL_APPROVED_PRINTER` | Mapeia impressora de rede homologada na unidade de saúde | `HIGH` | `ADMIN_N2` | `printer_ip` (IPv4 estrito da sub-rede interna) e `printer_name` (alfanumérico `^[a-zA-Z0-9_-]{3,32}$`) |

---

## 3. Segurança do Agente Windows (`endpoint_security.md`)

1. **Execução como Serviço Identificado:**
   - O agente roda como serviço Windows identificável (`IpojucaRMMService`), visível em `services.msc`, sem técnicas de rootkit ou ocultação.
2. **Proteção de Credenciais e Configuração:**
   - As credenciais do agente (`AGENT_UUID`, `AGENT_TOKEN`, `TASK_SIGNING_SECRET`) são lidas de variáveis de ambiente/arquivo de configuração protegido por ACL restrita ao `SYSTEM`/Administradores.
3. **Validação Anti-Replay e Offline Safety:**
   - Ao receber `task:execute`, o agente verifica:
     1. Se `task_code` existe no catálogo interno imutável.
     2. Se o timestamp atual é menor que `expires_at`.
     3. Se a assinatura HMAC-SHA256 (`signature`) confere com `task_id + task_code + expires_at`.
     4. Se `task_id` ainda não foi executado (prevenção de replay).
   - Se qualquer verificação falhar, a tarefa é recusada imediatamente e registrada no log de segurança.

---

## 4. Conformidade com a LGPD (Unidades de Saúde)

Como os computadores monitorados estão em **Unidades de Saúde (USFs, Policlínicas, CAPS)** onde transitam dados sensíveis de pacientes (Art. 5º, II e Art. 11 da LGPD):
- **Finalidade e Necessidade:** O RMM coleta exclusivamente telemetria de hardware e sistema operacional para continuidade do serviço público de saúde.
- **Bloqueio de Coleta de Dados Pessoais:** O coletor do agente **não lê** lista de processos com linhas de comando de usuários, **não lê** títulos de janelas abertas, **não captura** tela e **não acessa** diretórios `Desktop`/`Documents`/`Downloads`.
- **Retenção e Descarte:** Logs de telemetria bruta são descartados/expurgados após 30 dias; logs de auditoria administrativa são retidos por 180 dias para conformidade e responsabilização.

---

## 5. Parecer do Gate de Segurança — FASE 3

- **Status:** **APROVADO PELO `@security`**.
- Todos os riscos críticos identificados no plano original (especialmente RCE por PowerShell livre e ocultação de executável) foram mitigados por controles arquiteturais determinísticos antes do início da codificação.

