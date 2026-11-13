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

---

## 6. Auditoria de Segregação de Dados entre Unidades de Saúde (Ciclo #15)

- **Risco Mitigado:** Vazamento inadvertido de dados operacionais, inventário de hardware e endereços IP de estações de trabalho de uma unidade de saúde para outra através de canais de WebSocket compartilhados.
- **Controle Implementado:** Segregação estrita no listener WebSocket com verificação atômica de `unit_id` e descarte de dados fora do escopo da unidade ativa, somada à barreira defensiva no motor WebGL/Three.js (`DigitalTwin3D`).
- **Parecer `@security`:** **APROVADO**. Segregação de dados em conformidade com o princípio de necessidade e isolamento departamental na gestão de saúde pública.

---

## 7. Parecer de Segurança — Ciclo #17 (Modelagem 3D, Texturas Procedurais e Proteção de Endpoint)

- **Risco Avaliado:** Introdução de vulnerabilidades por deserialização de assets 3D (ex: arquivos GLTF/OBJ malformados, dependências de loaders externos inseguros) ou vazamento de dados confidenciais do endpoint no modelo tridimensional.
- **Controle Implementado:**
  1. A biblioteca 3D da Sala-Piloto utiliza exclusivamente primitivas geométricas e materiais nativos do Three.js e React Three Fiber em execução local no cliente.
  2. Todas as texturas são geradas proceduralmente via HTML5 Canvas em memória (`getHabblaudeTexture`), sem requisições de rede externas ou parsing de binários arbitrários.
  3. O avatar 3D consome apenas telemetria autorizada e sanitizada (status de saúde, CPU, RAM, Spooler). Dados sensíveis e permissões de diagnóstico permanecem resguardados pelo RBAC e pelas diretrizes da LGPD já aprovadas.
- **Parecer `@security`:** **APROVADO**. A implementação não introduz vetores de ataque nem compromete a segurança dos endpoints monitorados.

---

## 8. Parecer de Segurança — Ciclo #18 (Pipeline de Modelos GLB e Integridade de Assets Estáticos)

- **Risco Avaliado:** Execução de scripts maliciosos ou injeção de payload binário através de arquivos GLTF/GLB carregados dinamicamente no navegador (vulnerabilidades comuns em loaders 3D não sanitizados ou assets baixados de fontes públicas inseguras).
- **Controle Implementado:**
  1. Todos os arquivos `.glb` são compilados localmente com ferramentas oficiais controladas (`GLTFExporter` do Three.js) e empacotados como assets estáticos imutáveis em `frontend/public/models/`.
  2. Nenhum modelo é carregado de CDNs ou URLs externas não homologadas.
  3. A especificação glTF 2.0 padrão utilizada não contém scripts executáveis, shaders arbitrários ou extensões experimentais de código (apenas malhas, buffers de vértices e materiais PBR padrão).
  4. O mapeamento de telemetria é unidirecional: dados da VPS alteram apenas atributos visuais (cor/emissividade) de malhas pré-carregadas no cliente, sem parsing de dados não estruturados.
- **Parecer `@security`:** **APROVADO**. A pipeline de modelos GLB atende integralmente aos padrões de segurança e integridade estática de assets.

---

## 9. Parecer de Segurança — Ciclo #21 (Integridade e Sanitização Local da Biblioteca de Mobiliário via Blender)

- **Risco Avaliado:** Inclusão inadvertida de binários de terceiros não auditados, backdoors em scripts de malha ou sobrecarga de recursos locais por geometrias não otimizadas.
- **Controles Implementados:**
  1. **Geração 100% Local e Auditada:** Todos os 6 modelos (`office_desk.glb`, `ergonomic_chair.glb`, `reception_counter.glb`, `storage_cabinet.glb`, `thermal_printer.glb`, `waiting_bench.glb`) são gerados localmente por script determinístico na API Python (`bpy`) do Blender 4.2 LTS institucional.
  2. **Ausência de Dependências Externas:** Bloqueio absoluto do download de assets de repositórios públicos ou CDNs de terceiros.
  3. **Sanitização de Buffer e Validação glTF 2.0:** Malhas contêm apenas primitivas vetoriais com modificadores `Bevel` e materiais PBR nativos, livres de scripts embutidos ou metadados de rastreamento.
  4. **Proteção de VRAM e Prevenção de DoS no Navegador:** Orçamento poligonal controlado de 800 a 4.500 tris por asset, impedindo esgotamento de memória de vídeo nos postos de saúde.
- **Parecer `@security`:** **APROVADO PELO `@security`**. Pipeline seguro e em conformidade estrita com os requisitos de integridade do RMM Ipojuca.

---

## 10. Parecer de Segurança — Ciclo #22 (Calibração de Shaders e Sanitização de Parâmetros WebGL)

**Responsável:** `@security`  
**Skills Consultadas:** `.agents/skills/security/threat_modeling.md`, `.agents/skills/security/endpoint_security.md`, `.agents/skills/security/security_audit.md`

- **Risco Avaliado:** Modificação dos parâmetros de shaders de sombra (`shadow-bias`, `shadow-normalBias`) e introdução de layout dinâmico no WebGL causando estouro de precisão numérica de ponto flutuante (*float precision overflow*), travamento de GPU (*GPU hang*) ou vazamento de memória em placas integradas antigas nos terminais das UBSs.
- **Controles Implementados:**
  1. **Valores Numéricos Estáveis:** O `shadow-bias` foi definido como `-0.00004` e `shadow-normalBias` como `0.025`, situados bem dentro dos limites suportados por shaders WebGL 2.0 padrão (precisão `mediump`/`highp`), sem geração de NaNs ou infinitos.
  2. **Imutabilidade de Geometrias:** As malhas dos tapetes e móveis continuam sendo instâncias estáticas com geometrias reutilizadas via pool Drei/R3F, sem recriação contínua no loop de animação (`useFrame`), prevenindo vazamento de handles WebGL.
  3. **Preservação de RBAC e Isolamento de Contexto:** A reorganização espacial não altera o consumo de dados de telemetria nem expõe identificadores adicionais do host.
- **Parecer `@security`:** **APROVADO**. Mudança puramente visual e matemática nos parâmetros de renderização, sem introdução de riscos cibernéticos ou operacionais.

