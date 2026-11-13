# Especificação Técnica e Análise do Plano de Execução — RMM Ipojuca

**Ciclo:** #01  
**Fase:** FASE 1 — Análise e Especificação  
**Orquestração:** `@lead`  
**Responsável pela Entrega:** `@pm` (com parecer preliminar de `@lead` e `@security`)  
**Documento Base Analisado:** `plano-execucao.md`

---

## 1. Análise Crítica do `plano-execucao.md` (`@lead` + `@pm` + `@security`)

O documento `plano-execucao.md` define uma visão clara e de alto valor operacional para o monitoramento proativo das unidades de saúde de Ipojuca (USFs, Policlínicas, CAPS). Contudo, ao confrontar o plano original com as diretrizes obrigatórias do projeto (`.agents/agents.md`, `startcycle.md` e Skills de segurança), identificamos **pontos de alinhamento e adequações obrigatórias** antes de iniciar a arquitetura e implementação:

### 1.1. Pontos Aprovados e Mantidos
1. **Stack Tecnológica Principal:**
   - **Frontend & Digital Twin:** React (JavaScript), Styled Components, Three.js / React Three Fiber (`@react-three/fiber`) e `@react-three/drei`.
   - **Backend & Tempo Real:** Node.js, Express, Socket.io, Axios.
   - **Banco de Dados:** MySQL.
   - **Automação:** n8n integrado via Webhooks e WhatsApp.
   - **Infraestrutura:** Docker e `docker-compose.yml`.
2. **Inovação A (Digital Twin 3D):** Representação espacial por Unidade de Saúde e Setor, refletindo estados em tempo real (Normal, Alerta, Crítico, Offline) com clique para diagnóstico detalhado.
3. **Inovação B (Abertura Autônoma de Tickets via n8n):** Monitoramento de limiares críticos no backend disparando webhooks para abertura automática de chamados e notificação via WhatsApp para a equipe de TI.

### 1.2. Adequações Obrigatórias de Segurança e Arquitetura (Bloqueios Preventivos `@security`)
1. **Substituição de "Terminal Remoto Irrestrito" por "Catálogo de Tarefas Autorizadas" (Inovação C):**
   - **Plano Original:** Previa envio livre de comandos PowerShell (`POST /api/command`) para execução remota.
   - **Regra Violada:** `startcycle.md` (Fase 3: *"Não permitir terminal irrestrito ou execução arbitrária de comandos. Priorizar catálogo de tarefas autorizadas"*) e Skill `engineer/remote_management.md`.
   - **Adequação na Especificação:** A rota e o fluxo WebSocket operarão com um **Catálogo Fechado de Tarefas Autorizadas** (`task_id` pré-homologados no agente, como `CLEAR_TEMP_CACHE`, `RESTART_SPOOLER`, `CHECK_DISK_HEALTH`, `INSTALL_APPROVED_PRINTER`, `COLLECT_FULL_DIAGNOSTICS`) com parâmetros tipados e validados, sem aceitar strings arbitrárias de PowerShell vindas da API.
2. **Substituição de "Executável `.exe` Invisível" por "Serviço Windows Identificado":**
   - **Plano Original:** Empacotamento como `.exe` invisível.
   - **Regra Violada:** Skill `security/endpoint_security.md` (*"Executar como serviço Windows identificado... Não ocultar o agente do administrador do equipamento"*).
   - **Adequação na Especificação:** O agente será empacotado e registrado como um **Serviço Oficial do Windows** (`IpojucaRMMService`), auditável pelos administradores locais, com proteção de arquivos de configuração e identidade única por máquina.
3. **Estrutura de Diretórios Padronizada:**
   - O workspace possui atualmente `agente/src/index.js` (vazio) e `backend/src/server.js` (vazio). Conforme `startcycle.md` (Seção 4), a estrutura oficial de código deve seguir `backend/`, `frontend/`, `agent/` e `infrastructure/` (além de `production_artifacts/`). A migração/unificação de `agente/` para `agent/` será tratada na Fase 2/Fase 6 caso aprovada.

---

## 2. Objetivos do Sistema e Perfis de Usuário

### 2.1. Objetivo Geral
Prover à equipe de TI da Saúde de Ipojuca visibilidade em tempo real, diagnóstico preventivo, abertura automatizada de chamados e manutenção remota controlada sobre os computadores das Unidades de Saúde da Família (USFs), Policlínicas e CAPS.

### 2.2. Perfis de Usuário e Permissões (RBAC)
| Perfil | Descrição | Permissões Principais |
| :--- | :--- | :--- |
| **Visualizador / Gestor (`VIEWER`)** | Coordenação de TI ou Gestão de Saúde | Visualizar dashboard geral, mapa 3D (Digital Twin), status de unidades, inventário e relatórios de disponibilidade. Sem permissão para executar tarefas remotas. |
| **Técnico de Suporte N1 (`TECH_N1`)** | Equipe de suporte operacional | Todas de `VIEWER` + visualizar diagnósticos detalhados, reconhecer alertas (Acknowledge) e executar tarefas remotas de **Risco Baixo e Médio** (ex.: limpar cache, reiniciar spooler de impressora). |
| **Analista / Administrador N2 (`ADMIN_N2`)** | Administradores de infraestrutura e segurança | Todas de `TECH_N1` + aprovar/executar tarefas de **Risco Alto**, cadastrar/alocar máquinas em Unidades e Setores no Digital Twin, provisionar ou revogar agentes Windows e configurar limiares de alerta. |

---

## 3. Requisitos Funcionais (RF)

### Módulo 1: Agente Windows (`agent/`)
- **RF-01 (Provisionamento e Identidade):** O agente deve possuir um identificador único persistente (`agent_uuid`) e credencial individual revogável, validada a cada conexão REST ou WebSocket.
- **RF-02 (Coleta de Inventário Estático):** Coletar na inicialização e periodicamente: Hostname, Fabricante/Modelo, Número de Série (BIOS/Placa-mãe), Endereços MAC e IP local, Modelo de CPU, Capacidade Total de RAM, Discos Físicos (Tipo SSD/HDD e Capacidade Total) e Versão/Build do Windows.
- **RF-03 (Heartbeat e Telemetria Leve: Boot + 4 Horas + Sob Demanda):** Enviar telemetria automaticamente assim que o computador for ligado (Boot), a cada **4 horas** (`14.400.000 ms`) via `POST /api/heartbeat` e **sob demanda imediata** quando solicitado pelo botão manual do painel (`POST /api/machines/:id/refresh-telemetry` / evento WebSocket `telemetry:request`), garantindo consumo zero de CPU entre coletas.
- **RF-04 (Execução de Tarefas Autorizadas via WebSocket):** Manter conexão Socket.io autenticada com o backend para receber ordens de tarefas pré-homologadas, validar assinatura/parâmetros e validade temporal (TTL), executar a rotina associada e devolver o código de saída e log sanitizado.

### Módulo 2: Backend API e Tempo Real (`backend/`)
- **RF-05 (Autenticação e RBAC):** Autenticar operadores do painel via JWT e validar permissões por perfil (`VIEWER`, `TECH_N1`, `ADMIN_N2`) em todas as rotas administrativas e eventos WebSocket.
- **RF-06 (Recepção e Processamento de Heartbeat):** Na rota `POST /api/heartbeat`, validar a credencial do agente, atualizar o estado atual da máquina (*Upsert*), persistir série histórica de telemetria e emitir atualização em tempo real via Socket.io para os dashboards conectados.
- **RF-07 (Detecção de Anomalias e Estados de Saúde):** Classificar automaticamente cada equipamento nos estados:
  - `NORMAL`: todas as métricas dentro dos parâmetros.
  - `WARNING` (Alerta): CPU > 80% sustentado, RAM > 85% ou Disco > 85%.
  - `CRITICAL` (Crítico): CPU > 95% sustentado, RAM > 95%, Disco > 95% ou falha de serviço essencial.
  - `OFFLINE`: ausência de heartbeat por período superior ao limite configurável (ex.: 3 minutos).
- **RF-08 (Despacho de Tarefas Remotas — `POST /api/command`):** Receber solicitação de tarefa remota do painel web, validar permissão do usuário, verificar se a tarefa consta no catálogo permitido, registrar trilha de auditoria no banco (`pending`), encaminhar ao agente via Socket.io e atualizar o registro com o resultado (`completed` / `failed` / `timeout`).
- **RF-09 (Gatilho de Automação com Desduplicação):** Ao detectar transição para estado `CRITICAL` ou `OFFLINE`, acionar o Webhook do n8n garantindo **idempotência/desduplicação** (não abrir múltiplos chamados ou enviar mensagens repetidas para o mesmo incidente enquanto ele já estiver aberto/ativo).

### Módulo 3: Frontend e Digital Twin 3D (`frontend/`)
- **RF-10 (Visão Geral e Filtros):** Exibir resumo executivo do parque tecnológico (Total de máquinas, Online, Offline, em Alerta e Críticas) com filtro por Unidade de Saúde (USF, Policlínica, CAPS) e por Setor (Recepção, Consultório, Farmácia, Triagem, Administração).
- **RF-11 (Digital Twin 3D Interativo):** Renderizar em Three.js / React Three Fiber a planta baixa simplificada da unidade selecionada, posicionando cada computador cadastrado em seu respectivo setor.
- **RF-12 (Feedback Visual em Tempo Real no 3D):** Alterar cor e animação do avatar 3D do computador em tempo real via Socket.io conforme seu estado (`NORMAL` = verde/estável, `WARNING` = âmbar, `CRITICAL` = vermelho pulsante, `OFFLINE` = cinza/desconectado), sem confundir telemetria antiga com o estado atual.
- **RF-13 (Painel de Diagnóstico e Ação Remota):** Ao clicar em um equipamento (na lista ou no mapa 3D), abrir gaveta/modal de diagnóstico exibindo inventário completo, gráficos recentes de CPU/RAM/Disco, alertas ativos, histórico de tarefas e botões de execução de tarefas remotas compatíveis com o perfil do usuário logado.

### Módulo 4: Automação e Notificações (`n8n`)
- **RF-14 (Fluxo de Abertura de Chamados e Alerta WhatsApp):** Receber payload estruturado do backend via Webhook, registrar o ticket de suporte e enviar notificação formatada no WhatsApp da equipe de TI contendo: Unidade de Saúde, Setor, Hostname, IP, Problema Detectado, Horário e Link direto para o equipamento no painel.
- **RF-15 (Tratamento de Falhas de Notificação):** Implementar retentativa (*retry com backoff*) no envio de mensagens e retorno de confirmação de abertura de chamado para o backend.

---

## 4. Requisitos Não Funcionais (RNF) e Regras de Negócio (RN)

- **RNF-01 (Segurança e Criptografia):** Toda comunicação entre Agente ↔ Backend e Frontend ↔ Backend deve prever suporte a HTTPS/WSS (TLS) em produção, com segredos gerenciados exclusivamente por variáveis de ambiente (`.env`).
- **RNF-02 (LGPD e Minimização de Dados):** O sistema deve coletar estritamente metadados técnicos da máquina. É proibido coletar nomes de arquivos de usuários, capturas de tela, histórico de navegação, documentos médicos/pacientes ou senhas digitadas.
- **RNF-03 (Performance da Telemetria):** O banco MySQL deve separar o estado atual da máquina (tabela enxuta para leitura rápida do Digital Twin) do histórico de telemetria (com política de retenção/expurgo planejada pelo `@dba`).
- **RNF-04 (Resiliência do Agente):** Caso o backend fique temporariamente indisponível, o agente Windows deve aplicar reconexão automática com *exponential backoff* sem consumir recursos excessivos da máquina da unidade de saúde.
- **RN-01 (Bloqueio de Comandos Arbitrários):** Qualquer requisição em `POST /api/command` cujo identificador de tarefa não pertença ao enum/catálogo homologado deve ser rejeitada com HTTP `403 Forbidden` e registrada no log de auditoria de segurança.
- **RN-02 (Janela de Cooldown de Alertas):** Um equipamento que já gerou chamado aberto para um mesmo tipo de incidente (ex.: `DISK_CRITICAL`) não deve disparar novas mensagens de WhatsApp até que o incidente seja resolvido ou que o prazo de *cooldown* de relembrete expire.

---

## 5. Critérios de Aceitação (`@pm` — `pm/acceptance_criteria.md`)

| ID | Cenário | Dado que (Contexto) | Quando (Ação) | Então (Resultado Esperado) |
| :--- | :--- | :--- | :--- | :--- |
| **CA-01** | Recebimento de Heartbeat e atualização 3D | Um agente autenticado está associado à "USF Centro - Consultório 01" | O agente envia `POST /api/heartbeat` com `disk_usage: 96%` | O backend atualiza o status para `CRITICAL`, persiste a métrica e o avatar 3D da máquina passa a piscar em vermelho em menos de 2 segundos via WebSocket. |
| **CA-02** | Detecção de Máquina Offline | Um computador estava `NORMAL` e parou de enviar heartbeat | O tempo desde o último `last_seen` ultrapassa o limite (ex.: 180s) | O backend altera o estado para `OFFLINE`, emite evento para o painel 3D mudar o avatar para estado desconectado e aciona alerta se configurado. |
| **CA-03** | Abertura Autônoma de Ticket sem Duplicidade | Uma máquina entra em estado `CRITICAL` por disco > 95% | Ocorre o primeiro heartbeat crítico e, 60s depois, um segundo heartbeat com o mesmo problema | O backend dispara o webhook do n8n apenas na transição inicial; o chamado é aberto e notificado no WhatsApp uma única vez enquanto o incidente permanecer ativo. |
| **CA-04** | Execução de Tarefa Remota Autorizada | Um usuário `TECH_N1` autenticado seleciona uma máquina `ONLINE` | Solicita a tarefa `CLEAR_TEMP_CACHE` pelo painel | O backend valida a permissão, grava auditoria, envia ordem via Socket.io ao agente; o agente executa a rotina pré-definida e retorna o log de conclusão exibido na tela. |
| **CA-05** | Bloqueio de Comando Não Autorizado / Arbitrário | Um usuário ou cliente externo tenta enviar um script PowerShell livre ou `task_id` inexistente em `POST /api/command` | A requisição chega ao backend | O backend bloqueia a operação com HTTP `400`/`403`, não envia nada ao agente e grava alerta de auditoria. |
| **CA-06** | Controle de Acesso por Perfil (RBAC) | Um usuário com perfil `VIEWER` acessa o diagnóstico de um equipamento | Visualiza a aba de manutenção remota | Os botões de disparo de tarefas remotas estão desabilitados e qualquer chamada direta à API retorna `403 Forbidden`. |

---

## 6. Dependências, Limitações e Pontos Abertos

1. **Unificação da pasta do Agente:** O projeto possui `agente/src/index.js` vazio, enquanto a convenção do pipeline define `agent/`. Recomendamos padronizar para `agent/` (ou manter `agente/` caso haja preferência explícita).
2. **Provedor de WhatsApp no n8n:** A integração do n8n na Fase 8 será desenhada de forma desacoplada (Webhook HTTP padrão compatível com Evolution API, Z-API ou WhatsApp Cloud API Oficial).
3. **Modelagem 3D Procedural/Simplificada:** Para garantir desempenho nos navegadores da equipe de TI e não depender de arquivos `.glb` pesados externos, as plantas 3D das unidades e os avatares dos computadores serão construídos com geometrias otimizadas e componentes declarativos em `@react-three/fiber` e `@react-three/drei`.

---

## 7. Ciclo #03 — Especificação de Evolução do Digital Twin 3D & HUD Holográfico (`@pm` + `@designer`)

### 7.1. Escopo Aprovado pelo Usuário para o Ciclo #03
Elevar o nível de realismo arquitetônico 3D e a sofisticação do HUD Tático no painel RMM Ipojuca, preservando 100% da stack aprovada (`React`, `Styled Components`, `Three.js`, `@react-three/fiber`, `@react-three/drei`) e a integração real com a VPS:

1. **Arquitetura 3D Conectada & Corredores da Unidade (`RF-16`):**
   - Substituir as "ilhas isoladas" de setores por uma **planta arquitetônica integrada** com corredor central iluminado, faixas guia de piso hospitalar/técnico, portas/vãos de acesso com pórticos translúcidos, rodapés iluminados por estado do setor e sinalização suspensa (totens holográficos por setor).
   - Conduíte/Trilha de Fibra Óptica 3D no piso conectando o Rack Central de Telecomunicações (Switch Core da Unidade) a cada estação de trabalho ativa, com pulsos luminosos refletindo o tráfego/estado da máquina (`NORMAL`, `WARNING`, `CRITICAL`, `OFFLINE`).
2. **Mobiliário Médico/TI Detalhado & Estações de Trabalho Realistas (`RF-17`):**
   - **Estação de Trabalho Completa:** Mesa técnica chanfrada com passa-cabos, cadeira ergonômica detalhada (base estrela 5 pontas, pistão, assento, encosto e braços), gabinete workstation com janela lateral acrílica e LED de telemetria, monitores duplos com borda fina + suporte articulado, teclado luminoso, mouse + mousepad e impressora térmica/laser de prontuário na bancada (refletindo visualmente o status do `spooler_running`).
   - **Ambientação por Setor de Saúde:**
     - *Recepção / Triagem:* Balcão de atendimento chanfrado, totem de senha e cadeiras de espera.
     - *Consultório Médico / Enfermagem:* Maca clínica de exame com cabeceira, armário vitrine de insumos e biombo técnico.
     - *Farmácia / Vacina:* Estantes modulares de medicamentos e câmara fria de vacinas com display digital térmico.
     - *Administração / TI:* Rack Server de piso com leds piscantes de switch/patch panel.
3. **Iluminação Volumétrica, Atmosfera & Telemetria Holográfica 3D (`RF-18`):**
   - Feixes de iluminação volumétrica suave (spotlights arquitetônicos + grade de coordenadas polar/cartesiana com anéis de radar no perímetro da unidade).
   - **Anéis e Arcos Holográficos 3D no Piso e Acima da Estação:** Indicadores espaciais em tempo real exibindo carga de CPU/RAM e feixe de anomalia crítica com partículas/anéis pulsantes.
   - **Modo Raio-X / Fibra (`X-RAY / TOPOLOGIA DE REDE`):** Filtro tático no HUD para destacar o cabeamento estruturado e os fluxos de dados entre o Switch Central da Unidade e os computadores.
4. **HUD Holográfico & Telemetria Avançada (`RF-19`):**
   - **Bússola / Mini-Radar Tático e Seletor de Camadas 3D:** Controle rápido na tela para alternar camadas visuais (`MOBILIÁRIO CLÍNICO`, `MALHA DE REDE / FIBRA`, `ETIQUETAS HOLOGRÁFICAS`) e modos de câmera (`ISO 3D`, `PLANTA CAD`, `FOCO ESTAÇÃO`, `ORBITAL AUTOMÁTICO`).
   - **Gráfico de Pulso / Sparkline em Tempo Real e Telemetria Expandida** na lâmina direita (`DiagnosticDrawer`) e filtro rápido de busca/status no Dock inferior.

### 7.2. Critérios de Aceitação do Ciclo #03 (`@pm`)

| ID | Cenário | Dado que (Contexto) | Quando (Ação) | Então (Resultado Esperado) |
| :--- | :--- | :--- | :--- | :--- |
| **CA-07** | Renderização Arquitetônica e Mobiliário por Setor | O operador seleciona qualquer Unidade de Saúde no topo | O palco 3D carrega os setores da unidade | Os setores são exibidos conectados a uma circulação central com Rack de Rede, conduítes de fibra até as máquinas e mobiliário específico (maca em consultório, câmara fria/estantes na farmácia, balcão na recepção) mantendo taxa fluida de quadros. |
| **CA-08** | Topologia de Rede 3D e Estado do Spooler | Uma máquina real está conectada no setor da unidade | O operador ativa a camada de rede ou inspeciona a estação em foco | Uma linha/feixe de fibra óptica conecta o Switch Central da unidade até a mesa da máquina na cor do seu status, e a impressora 3D sobre a mesa indica visualmente se o serviço de Spooler está ativo ou em falha. |
| **CA-09** | Controles de Camadas Holográficas e Câmera | O operador utiliza a barra tática do HUD | Alterna entre `ISO 3D`, `CAD TOPO`, `FOCO`, `TOUR ORBITAL` ou ativa/desativa camadas (`MOBILIÁRIO`, `REDE`, `HUD 3D`) | A cena 3D responde instantaneamente sem recarregar a página e mantendo a seleção e telemetria ao vivo via Socket.io. |

---

## 8. Ciclo #04 — Sistema de Atualização Remota e Auto-Update OTA do Agente Windows (`@pm` + `@security` + `@engineer`)

### 8.1. Objetivo e Problema Resolvido
Eliminar a necessidade de ir fisicamente ou acessar manualmente cada computador das Unidades de Saúde sempre que uma nova versão do Agente (`IpojucaRMM-Setup.exe`) for lançada. O sistema permitirá tanto **atualização automática verificada pelo próprio agente** quanto **disparo de atualização sob demanda pelo painel web** (individual por máquina ou em lote para todas as máquinas da rede).

### 8.2. Requisitos Funcionais do Ciclo #04 (`@pm`)

1. **RF-20 (Manifesto Oficial de Versão e Integridade no Backend — `GET /api/agent/version`):**
   - O backend servirá o manifesto oficial da versão atual do Agente Windows contendo:
     - `latest_version` (ex.: `"2.1.0"`).
     - `download_url` (`/IpojucaRMM-Setup.exe`).
     - `sha256` (hash criptográfico SHA-256 calculado automaticamente pelo servidor sobre o binário `public/IpojucaRMM-Setup.exe` atual).
     - `released_at` e `mandatory: true`.
   - Toda resposta de `POST /api/heartbeat` e `GET /api/agent/pending-commands` também informará `latest_agent_version` e se há ordem de atualização pendente (`update_requested: true`).

2. **RF-21 (Auto-Update com Interface Visual para o Cliente no Agente Windows — OTA):**
   - **Verificação Automática:** Ao iniciar, a cada ciclo de comunicação e ao receber sinalização do servidor, o Agente compara sua `agent_version` local com a `latest_version` do servidor (ou atende ao comando forçado `UPDATE_AGENT_NOW`).
   - **Opção Manual na Bandeja do Windows:** No menu do ícone perto do relógio (System Tray) e na janela do Super Agente, haverá também o botão **"⬆ Verificar e Atualizar Agente Agora"**.
   - **Feedback Visual Claro para o Usuário da Máquina (Requisito Expresso do Cliente):**
     1. Quando a atualização iniciar, o Agente exibe uma **Janela Visual de Atualização (`UpdateProgressForm`)** moderna na tela do computador (junto com notificação na bandeja do sistema), informando: *"RMM Ipojuca — Atualizando Agente para a nova versão (v2.1.0)... Baixando e verificando pacote oficial da Central de TI"*.
     2. O Agente baixa o novo binário de `/api/agent/download` para `%LOCALAPPDATA%\IpojucaRMM\IpojucaRMM-Update.exe` atualizando a barra de progresso na tela.
     3. Valida o tamanho do arquivo e o hash **SHA-256** contra o manifesto do servidor.
     4. Inicia `IpojucaRMM-Update.exe --update-from=<versao_antiga>` e encerra a instância antiga.
     5. O instalador substitui `IpojucaRMM-Agent.exe`, **preserva integralmente o `agent-identity.json`** (`AgentUuid`, `AgentToken`, Unidade e Setor da máquina), reinicia o agente atualizado em segundo plano, envia um heartbeat imediato reportando a nova `agent_version` ao painel e **mostra o aviso de conclusão na tela do cliente** (*"Agente RMM Ipojuca atualizado com sucesso para a versão 2.1.0!"*).

3. **RF-22 (Comando de Atualização pelo Painel Web — Individual e Global):**
   - **Por Máquina (`DiagnosticDrawer`):**
     - Exibe a versão instalada no computador (`v2.0.0`, `v2.1.0`, etc.) e um indicador caso esteja desatualizada frente à versão atual do servidor.
     - Botão direto **"⬆ Enviar Atualização do Agente"** (e tarefa homologada `UPDATE_AGENT` no catálogo para `ADMIN_N2`), que ordena ao agente da máquina baixar e instalar a versão nova imediatamente.
   - **Em Lote / Todas as Máquinas (`POST /api/agent/trigger-update-all`):**
     - Botão no topo/radar do painel para `ADMIN_N2`: **"⬆ Atualizar Todos os Agentes"** que enfileira a ordem de atualização para todas as estações cadastradas na rede de uma só vez.

### 8.3. Regras de Segurança (`@security`)
- **RN-03 (Verificação de Integridade SHA-256):** O agente jamais executará um binário baixado cujo hash SHA-256 divirja do manifesto autenticado do servidor ou cujo tamanho seja inválido (< 10 KB).
- **RN-04 (Controle de Acesso RBAC):** Apenas operadores com perfil `ADMIN_N2` podem disparar o comando forçado de atualização de agente (`UPDATE_AGENT` / atualização em massa), com registro obrigatório em `audit_logs`.

### 8.4. Critérios de Aceitação do Ciclo #04 (`@pm`)

| ID | Cenário | Dado que (Contexto) | Quando (Ação) | Então (Resultado Esperado) |
| :--- | :--- | :--- | :--- | :--- |
| **CA-10** | Manifesto de Versão e SHA-256 Dinâmico | O arquivo `public/IpojucaRMM-Setup.exe` está disponível no backend | O agente ou painel consulta `GET /api/agent/version` | O backend retorna HTTP `200` com `latest_version`, `sha256` real do executável, tamanho em bytes e URL de download. |
| **CA-11** | Disparo de Atualização pelo Painel (Individual ou Global) | Uma máquina está com agente ativo na rede | O administrador `ADMIN_N2` clica em **"⬆ Atualizar Agente"** na gaveta da máquina ou em **"⬆ Atualizar Todos"** | O backend registra a ordem de atualização, o agente detecta no próximo pulso (em até 3 segundos), baixa o novo `.exe`, valida o SHA-256, atualiza-se silenciosamente com `--silent` e volta a reportar a nova versão no painel sem perder seu `agent_uuid`. |
| **CA-12** | Auto-Update Automático por Diferença de Versão | O administrador publica uma nova versão do agente na VPS | Qualquer PC da rede faz comunicação com o backend | O backend sinaliza `update_available: true`, e o agente faz o auto-update silencioso em segundo plano sem nenhuma intervenção humana no PC. |

---

## 9. Ciclo #05 — Execução Real de Funções Remotas no Super Agente Windows (`v2.2.0`) & Interação Cliente-Servidor (`@pm` + `@security` + `@engineer`)

### 9.1. Objetivo e Problema Resolvido
Agora que o Agente Windows possui atualização automática OTA com aviso na tela, o próximo passo é fazer com que **todas as ações de manutenção do painel e novas funções de suporte executem de verdade dentro do Agente C# (`.exe`) na máquina Windows** (com retorno real do que foi limpo, reiniciado ou diagnosticado no PC) e integrar o **Chat / Aviso na Tela Cliente ↔ Central de TI** direto no painel.

### 9.2. Novas Funções Reais do Agente Windows (`v2.2.0-native-exe`)

1. **RF-23 (Motor Real de Execução de Tarefas Homologadas no Agente `.exe`):**
   Quando o operador clicar em qualquer cartão de manutenção no painel (`POST /api/command`), o backend enviará a tarefa assinada na fila do Agente (`/api/agent/pending`) e aguarda o **resultado real executado pelo `IpojucaAgent.exe` no Windows** (`POST /api/agent/task-result`):
   - **`CLEAR_TEMP_CACHE` (Limpar Arquivos Temporários Reais):** Varre `%TEMP%` do usuário e `C:\Windows\Temp`, remove arquivos temporários desbloqueados e retorna a quantidade exata de arquivos apagados e megabytes liberados no PC (ex.: `"Limpeza real concluída em DESKTOP-TCIIVHG: 148 arquivos removidos (84.6 MB liberados)."`).
   - **`RESTART_SPOOLER` (Reiniciar Fila de Impressão Real):** Executa `net stop spooler`, limpa arquivos travados em `C:\Windows\System32\spool\PRINTERS` e executa `net start spooler`, destravando impressoras nas USFs e atualizando o status do Spooler na hora.
   - **`FLUSH_DNS_WINSOCK` (Limpar Cache DNS e Rede):** Executa `ipconfig /flushdns` e `arp -d *` real no Windows e retorna a saída real do comando.
   - **`COLLECT_NETWORK_DIAG` (Diagnóstico Real de Rede e Latência):** Mede o ping real (`Ping` nativo .NET) para o Gateway da unidade, DNS (`8.8.8.8`) e Servidor VPS (`31.97.86.253`), listando IP, Máscara, Gateway, DNS ativos e velocidade do link em Mbps.
   - **`CHECK_DISK_HEALTH` (Saúde Real de Disco e Espaço Livre):** Consulta via WMI (`Win32_DiskDrive` Status SMART `OK`/`Pred Fail`) e `DriveInfo` o espaço total, livre e usado em GB de todas as partições (`C:`, `D:`, etc.).
   - **`LIST_TOP_PROCESSES` (NOVO — Listar Top Processos Consumindo CPU/RAM):** Coleta em tempo real os 8 processos do Windows que mais estão consumindo Memória RAM e CPU na máquina (ex.: `chrome.exe (1.2 GB)`, `esus-pec.exe (640 MB)`) para o técnico saber na hora o que está travando o PC.
   - **`SEND_SCREEN_ALERT` / Chat Bidirecional (NOVO — Mensagem / Pop-up na Tela do Usuário + Resposta):** Permite ao técnico digitar um aviso no painel (ex.: *"Olá Recepção, estamos reiniciando a fila da impressora, aguarde 1 minuto"*) que salta na tela do computador com alerta sonoro/visual e permite ao funcionário responder pelo Super Agente direto para a gaveta do painel.
   - **`REBOOT_WORKSTATION` (NOVO — Reiniciar ou Bloquear Computador Remotamente com Aviso):** Permite ao `ADMIN_N2` agendar reinicialização controlada (`shutdown /r /t 30 /c "Reinicialização programada pela Central de TI - RMM Ipojuca"`) mostrando contagem regressiva para o usuário salvar seu trabalho.

2. **RF-24 (Seletor de Unidade e Setor no Agente e no Painel):**
   - Permite alterar em qual **Unidade de Saúde** e **Setor** aquele computador está alocado diretamente pela gaveta do painel (`DiagnosticDrawer`) ou na janela local do Agente, posicionando a máquina no setor correto do mapa 3D.

### 9.3. Regras de Segurança (`@security`)
- **RN-05 (Assinatura HMAC-SHA256 e Lista Fechada):** O Agente `.exe` continuará executando **exclusivamente** códigos constantes no ` switch (taskCode)` interno compilado em C#, jamais executando comandos livres enviados pela rede.
- **RN-06 (Transparência ao Usuário Local):** Sempre que uma manutenção for executada na máquina, o Agente exibirá uma notificação clara na bandeja do Windows informando qual ação de suporte a Central de TI realizou.

### 9.4. Critérios de Aceitação do Ciclo #05 (`@pm`)

| ID | Cenário | Dado que (Contexto) | Quando (Ação) | Então (Resultado Esperado) |
| :--- | :--- | :--- | :--- | :--- |
| **CA-13** | Execução Real de Limpeza/Rede/Processos no PC | O Agente `v2.2.0` está rodando na máquina Windows | O técnico clica em `Limpar Cache Temporário`, `Diagnóstico de Rede` ou `Top Processos (CPU/RAM)` no painel | O Agente executa a rotina real no Windows em até 3 segundos e devolve ao terminal do painel os dados reais medidos naquela máquina (MB liberados, latência em ms, processos reais abertos). |
| **CA-14** | Chat e Alerta na Tela Cliente ↔ Servidor | O técnico seleciona a máquina no painel | Envia uma mensagem pela caixa de Chat/Aviso na gaveta direita | A mensagem salta na tela do PC do cliente e qualquer resposta enviada pelo cliente no Super Agente aparece em tempo real no painel web. |

---

## 10. Ciclo #06 — Monitoramento de Tempo de Ociosidade (Idle Time) e Tempo Desligado (Offline Duration) (`@pm` + `@security` + `@dba` + `@engineer` + `@frontend`)

### 10.1. Viabilidade Técnica e Objetivo
**Sim, é 100% possível!**
O objetivo deste ciclo é permitir que a equipe de TI e a Gestão da Secretaria de Saúde visualizem em tempo real:
1. **Tempo de Ociosidade da Máquina (`idle_seconds` — Usuário sem mexer no mouse/teclado):** Quando o computador está ligado (`ONLINE`), mostrar há quanto tempo ninguém utiliza o PC (ex.: *"Em uso ativo agora"*, *"Ocioso há 18 min"*, *"Ocioso há 2h 15m"*).
2. **Tempo Desligado / Sem Comunicação (`offline_duration`):** Quando o computador está desligado (`OFFLINE`), mostrar exatamente há quanto tempo ele foi desligado ou perdeu conexão e qual foi a data/hora exata do último contato (ex.: *"Desligado há 3h 42m (desde 09:30)"* ou *"Desligado há 2 dias"*).

### 10.2. Requisitos Funcionais do Ciclo #06 (`@pm`)

1. **RF-25 (Coleta Nativa de Ociosidade no Windows via Win32 API `user32.dll` — `GetLastInputInfo`):**
   - O Agente Windows (`v2.3.0-native-exe`) consultará a função nativa do Windows `GetLastInputInfo` (`user32.dll`) combinada com `Environment.TickCount`.
   - Essa API retorna o instante exato do último movimento de mouse ou tecla pressionada na sessão do usuário, permitindo calcular `idle_seconds` (segundos de ociosidade) com precisão de segundos e **sem capturar nenhuma tecla digitada (100% compatível com LGPD)**.
   - O valor `idle_seconds` será enviado tanto no `POST /api/heartbeat` quanto no poll rápido a cada `1.5s` (`GET /api/agent/pending?idle_seconds=...`), mantendo o status de uso atualizado em tempo real no painel.

2. **RF-26 (Persistência e Cálculo de Tempo Ocioso e Tempo Desligado no Backend/MySQL):**
   - Adição automática da coluna `idle_seconds INT NOT NULL DEFAULT 0` na tabela `machines` (com *auto-migration* segura no startup do MySQL para não exigir recriação de banco).
   - Classificação automática de atividade da estação quando `ONLINE`:
     - **🟢 Em Uso Ativo:** `idle_seconds < 300` (menos de 5 minutos sem interação).
     - **🟡 Ausente / Ocioso:** `300 <= idle_seconds < 1800` (entre 5 e 30 minutos sem uso).
     - **🟠 Ociosidade Prolongada:** `idle_seconds >= 1800` (mais de 30 minutos ligado sem ninguém usar).
   - Quando a máquina estiver `OFFLINE`, cálculo dinâmico do **Tempo Desligado** com base em `NOW() - last_seen_at` (ex.: `Desligado há 1h 25m`).

3. **RF-27 (Exibição no Painel Principal, Dock Inferior e Gaveta de Diagnóstico):**
   - **Na Gaveta de Diagnóstico (`DiagnosticDrawer`):**
     - Novo cartão dedicado **"Estado de Uso / Atividade"** mostrando:
       - Se **Ligado**: Tempo Ligado (`Uptime`) + Status de Uso (`🟢 Em uso agora` ou `🟡 Ocioso há X min / Xh`).
       - Se **Desligado (`OFFLINE`)**: Banner destacado em vermelho/âmbar mostrando **`🔌 Desligado há Xh Ym (Último sinal: DD/MM às HH:mm)`**.
   - **Nos Cartões da Barra Inferior (`BottomMatrixDock`):**
     - Exibição rápida do indicador de ociosidade (`ATIV` / `OCIOSO 25m`) ou do tempo desligado (`OFF há 3h`).
   - **No Diagnóstico Remoto:**
     - Inclusão do tempo de ociosidade e tempo ligado no relatório instantâneo da máquina.

### 10.3. Regras de Segurança e Privacidade LGPD (`@security`)
- **RN-07 (Proibição de Keylogging):** A detecção de ociosidade deve usar **exclusivamente** o contador de tempo `LASTINPUTINFO.dwTime` da API `GetLastInputInfo` (`user32.dll`), que informa apenas o timestamp do último evento de entrada sem ler qual tecla ou clique foi realizado.

### 10.4. Critérios de Aceitação do Ciclo #06 (`@pm`)

| ID | Cenário | Dado que (Contexto) | Quando (Ação) | Então (Resultado Esperado) |
| :--- | :--- | :--- | :--- | :--- |
| **CA-15** | Medição de Ociosidade em Tempo Real | O computador está ligado com o Agente ativo | O usuário fica sem mexer no mouse/teclado | O painel exibe o tempo exato de ociosidade (`Ocioso há X min`) atualizado continuamente, e volta para `🟢 Em uso agora (0m)` assim que o usuário mexe no mouse ou teclado. |
| **CA-16** | Exibição de Tempo Desligado (`OFFLINE`) | O computador foi desligado ou o agente encerrado | O operador visualiza a máquina no painel ou na gaveta lateral | O painel exibe claramente há quanto tempo aquele PC está desligado (`Desligado há Xh Ym`) junto com o horário da última comunicação. |

---

## 11. Gate de Aprovação — FASE 1 (Ciclo #06)

Conforme definido em `.agents/workflows/startcycle.md`:
- O pipeline encontra-se **pausado no Gate de Aprovação da Fase 1**.
- Responda **`Approved`** para que eu inicie imediatamente a implementação no Agente Windows (`v2.3.0-native-exe`), Backend/MySQL e Painel React!





---

## 12. Ciclo #07 — Correção de Layout da Gaveta de Diagnóstico + Botão Recolher/Expandir da Barra Inferior (`@pm` + `@designer` + `@frontend`)

### 12.1. Problema Relatado
Na tela principal, a gaveta de diagnóstico (`DiagnosticDrawer`, à direita) é **cortada/sobreposta** pela barra inferior de computadores (`BottomMatrixDock`): os cartões do Catálogo de Tarefas (ex.: *"Reiniciar Computador (Aviso 30s)"*, *"Atualizar Agente Windows (OTA)"*) ficam truncados na borda da barra e o restante do conteúdo (console de retorno, chat, etc.) não fica acessível de forma adequada.

**Causa raiz (análise `@frontend`):**
- `BladeContainer` usa `max-height: calc(100vh - 172px)` — valor fixo que **não considera** a altura real da barra superior + barra inferior (cartões de máquina com ~95px + padding).
- O contêiner pai `MiddleWorkspace` tem `overflow: hidden`, então a parte excedente da gaveta é cortada, em vez de a gaveta rolar internamente.

### 12.2. Requisitos Funcionais (`@pm`)
1. **RF-28 (Gaveta ajustada ao espaço disponível):** A gaveta de diagnóstico deve ocupar no máximo a altura real disponível entre a barra superior e a barra inferior (`max-height: 100%` do `MiddleWorkspace`), com **rolagem interna** para acessar todo o conteúdo. Nenhum conteúdo pode ficar escondido atrás da barra inferior.
2. **RF-29 (Botão seta no meio da barra inferior):** Adicionar um botão com **seta para baixo (▼)** centralizado horizontalmente na borda superior da barra inferior de computadores.
   - Ao clicar: a barra **recolhe** (desliza para baixo, ficando visível apenas uma aba fina com o botão), liberando espaço vertical para o Digital Twin 3D e para a gaveta.
   - Quando recolhida: o botão passa a exibir **seta para cima (▲)** e um rótulo compacto com o total de computadores (ex.: `12 PCs`); ao clicar, a barra **reexpande**.
   - Transição animada suave (~0,25s), sem quebrar a busca/filtro nem a seleção de máquina.
   - Acessibilidade: `aria-label` ("Recolher/Expandir lista de computadores") e `aria-expanded`.
3. **RF-30 (Preferência persistida localmente):** O estado recolhido/expandido é salvo em `localStorage` do navegador (sem dados pessoais), mantendo a escolha após recarregar a página.

### 12.3. Fora do Escopo
- Sem mudanças no backend, banco de dados, agente Windows ou n8n.
- Sem alteração no conteúdo dos cartões de máquina.

### 12.4. Segurança / LGPD (`@security`)
- Alteração puramente visual. `localStorage` guarda apenas um booleano de preferência de UI (`rmm.dockCollapsed`). Sem impacto em autenticação, autorização ou dados sensíveis.

### 12.5. Critérios de Aceitação do Ciclo #07 (`@pm`)

| ID | Cenário | Dado que (Contexto) | Quando (Ação) | Então (Resultado Esperado) |
| :--- | :--- | :--- | :--- | :--- |
| **CA-17** | Gaveta não sobreposta | Uma máquina está selecionada e a gaveta aberta | O operador rola a gaveta até o final | Todo o conteúdo (tarefas, console, chat) fica visível acima da barra inferior, sem cortes, em resoluções 1366×768 e 1920×1080. |
| **CA-18** | Recolher barra | A barra inferior está expandida | O operador clica na seta ▼ no meio da barra | A barra recolhe animadamente, resta uma aba com ▲ e total de PCs, e a gaveta/3D ganham a área liberada. |
| **CA-19** | Expandir barra | A barra está recolhida | O operador clica na seta ▲ | A barra reaparece com todos os computadores, filtro e seleção preservados. |
| **CA-20** | Persistência | A barra foi recolhida | O operador recarrega a página | A barra permanece recolhida. |

### 12.6. Arquivos Previstos
- `frontend/src/App.jsx` (barra inferior + botão + estado).
- `frontend/src/components/DiagnosticDrawer.jsx` (`max-height` da gaveta).

---

## 13. Gate de Aprovação — FASE 1 (Ciclo #07)

O pipeline está **pausado no Gate de Aprovação da Fase 1**. Responda **`Approved`** para iniciar a implementação (`@frontend`) seguida da validação (`@qa`).


---

## 14. Ciclo #08 — Reformulação Completa de Identidade Visual Editorial e Gêmeo Digital Isométrico Habblaude (`@pm` + `@designer` + `@frontend` + `@qa` + `@security`)

### 14.1. Objetivo Principal e Justificativa de Produto
Atender à missão de reformulação completa da plataforma de monitoramento do parque tecnológico da Rede Municipal de Saúde de Ipojuca, **abandonando de forma definitiva e integral a estética futurista anterior** (neon, glow, hologramas, gradientes espaciais, feixes de luz, bordas cortadas angulares e visual de ficção científica).

A nova aplicação estabelece **duas experiências visuais complementares e integradas**:
1. **Interface Administrativa Minimalista & Editorial:** Focada em clareza, respiração visual, tipografia refinada, divisórias sutis e paleta neutra e contemporânea, orientada à tomada de decisão rápida e profissional pela equipe de TI da Prefeitura.
2. **Gêmeo Digital 3D Isométrico (Inspirado no Habblaude):** Uma maquete virtual interativa em miniatura com estética de escritório digital em pixel art/voxel estético, perspectiva isométrica rigorosa, paredes seccionadas (*cutaway*), mobiliários de saúde e escritório estilizados, pequenos computadores e servidores reais integrados às mesas, com micro-indicadores luminosos de estado operacional (sem lasers, sem partículas flutuantes e sem ruído decorativo).

---

### 14.2. Diretrizes de Design System & Identidade Visual (`@designer` + `@pm`)

#### 14.2.1. Nova Paleta Cromática Editorial Neutra
Substituição total do tema escuro "Obsidian/Acid Lime" por uma paleta clara, suave e ergonômica:
- **Canvas / Fundo Geral:** `#F4F5F2` (cinza-linho suave e acolhedor).
- **Superfícies Principais (Cards, Header, Dock, Drawer):** `#FFFFFF` com sombras suaves de elevação (`box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 8px 24px rgba(0, 0, 0, 0.04)`).
- **Superfícies Secundárias / Neutras:** `#ECEFEB` e `#E2E6E1`.
- **Bordas Estruturais:** `#E4E8E3` (discretas, sem brilho).
- **Tipografia Primária (Títulos e Dados):** `#242925` (preto carvão fosco de alto contraste).
- **Tipografia Secundária / Rótulos:** `#737B75` (ardósia neutra e legível).
- **Cor de Identidade Institucional:** `#52796B` (verde sálvia / pinho arquitetônico).
- **Cores Operacionais Estritas (Apenas Funcionais, Sem Decoração):**
  - **Online / Normal:** Verde moderado orgânico (`#2D6A4F` / `#38A169`).
  - **Atenção / Warning:** Âmbar suave (`#D97706`).
  - **Crítico / Critical:** Vermelho reservado para incidentes reais (`#DC2626`).
  - **Offline / Desligado:** Cinza ardósia neutro (`#718096`).

#### 14.2.2. Tipografia e Proporções
- **Família Sans-serif:** `Plus Jakarta Sans`, `Inter`, `-apple-system`, `sans-serif` para 95% da interface (cabeçalhos, abas, nomes de setores, relatórios e botões).
- **Família Monoespaçada:** `JetBrains Mono` reservada exclusivamente para dados técnicos que exigem alinhamento tabular (endereços IP, MAC address, percentuais de uso de CPU/RAM, portas e comandos).
- **Raio de Borda (Border Radius):** Abandonar os cortes poligonais futuristas (`clip-path`) e adotar bordas arredondadas modernas padronizadas (`6px`, `8px` e `12px`).

---

### 14.3. Especificação do Novo Gêmeo Digital 3D (Habblaude Aesthetic) (`@frontend` + `@designer`)

#### 14.3.1. Câmera e Projeção Espacial
- **Projeção:** Câmera ortográfica ou isométrica com inclinação de 35.264° e rotação de 45° (verdadeira perspectiva isométrica de videogame e maquete digital).
- **Suporte a Modos:**
  - `ISO 3D` (Modo padrão: maquete isométrica acolhedora e nítida).
  - `CAD TOPO` (Vista ortográfica superior dos setores e salas).
  - `FOCO ESTAÇÃO` (Transição suave de aproximação centrada na mesa do computador selecionado).
  - `ORBITAL 360°` (Rotação suave contínua em torno do centro da unidade de saúde).
  - `FREE` (Arrastar/Pan e Zoom com OrbitControls sem perda de foco).

#### 14.3.2. Arquitetura da Maquete & Ambientes Seccionados (*Cutaway*)
- Cada Unidade de Saúde (USF, Policlínica, CAPS) é representada como uma maquete arquitetônica em miniatura sobre uma base de madeira clara/concreto arquitetônico.
- **Setores Físicos:** Recepção, Consultórios Médicos, Farmácia, Sala de Vacinação, Coordenação, Enfermagem, Sala Administrativa e Sala de Servidores/Rack.
- **Paredes:** Paredes baixas estilizadas (*half-walls* ou paredes em L seccionadas) para permitir visibilidade interna sem oclusão visual.
- **Pisos:** Pisos em grade modular isométrica com tons suaves diferenciando setores de circulação e salas de atendimento.
- **Mobiliários em Estilo Voxel/Pixel Art 3D:**
  - Mesas de atendimento e escritórios com tampo de madeira clara e pés de metal estilizados.
  - Cadeiras ergonômicas em miniatura.
  - Armários e gaveteiros modulares.
  - Macas de atendimento clínico ou balcão de recepção nos respectivos setores.
  - Mini rack de infraestrutura de rede na sala de telecomunicações.

#### 14.3.3. Estações de Trabalho e Equipamentos
- Cada máquina cadastrada no banco de dados é instanciada sobre a mesa do seu respectivo setor.
- **Modelo em Miniatura:** Gabinete compacto, monitor slim, teclado e mouse estilizados com proporções coerentes.
- **Indicador de Estado Operacional Integrado:** Pequeno LED luminoso no monitor/gabinete da estação:
  - 🟢 Online (verde fixo).
  - 🟡 Atenção (âmbar suave).
  - 🔴 Crítico (vermelho com sutil pulso de alerta a cada 2s).
  - ⚫ Offline (cinza apagado).
- **Impressoras Homologadas:** Pequenas impressoras 3D estilizadas ao lado dos computadores que possuem serviço de spooler ativo.

#### 14.3.4. Interação com os Computadores
- **Hover (Passar o Mouse):** Sutil elevação/destaque no contorno da mesa e exibição de um tooltip discreto e elegante com `hostname`, `ip_address`, `setor` e `status`.
- **Clique:** Seleciona a máquina, destaca a estação com uma sutil moldura no piso, sincroniza com o painel lateral de diagnóstico e aciona o foco suave de câmera.

---

### 14.4. Especificação da Nova Interface Administrativa (`@frontend` + `@pm`)

#### 14.4.1. Cabeçalho Minimalista (Top Bar)
- Identidade discreta: Logotipo institucional minimalista "RMM // Saúde Ipojuca".
- Seletor de Unidades em abas horizontais limpas com badges numéricos discretos de computadores.
- Seletor de Perfis de Acesso e botão de download do instalador do Agente (`.exe`).
- Agrupamento limpo de botões de controle de câmera (ISO, CAD, Foco, Órbita).

#### 14.4.2. Coluna Lateral Esquerda (Radar & Alertas Limpos)
- Card de Resumo Global: Matriz tipográfica com 4 colunas limpas (Online, Atenção, Crítico, Offline) sem gradientes ou caixas pesadas.
- Lista de Ocorrências e Alertas n8n/WhatsApp apresentados em lista limpa por ordem de criticidade.
- Lista de setores com navegação direta (clicar no setor move a câmera para a respectiva sala na maquete).

#### 14.4.3. Barra Inferior de Computadores (Dock Retrátil)
- Barra elegante com fundo branco translúcido, bordas suaves e botão central de recolher/expandir (▲/▼) com transição suave.
- Cartões de computadores limpos, exibindo: identificador, hostname, IP, setor, tempo ocioso/desligado e barras discretas de uso de CPU, RAM e Disco.
- Campo de pesquisa rápida e filtros integrados.

#### 14.4.4. Painel de Diagnóstico Lateral (Diagnostic Drawer)
- Design limpo com fundo branco e tipografia editorial:
  - Cabeçalho com hostname, status, IP e versão do agente.
  - Indicadores de atividade: Uptime, Tempo de Ociosidade em tempo real e Tempo Desligado.
  - Métricas de telemetria apresentadas em barras de progresso lineares limpas e gráfico minimalista de osciloscópio (sem mostradores circulares gigantes ou neon).
  - Catálogo de Ações Remotas Autorizadas organizado em botões elegantes e bem espaçados com confirmação visual clara.
  - Console de Retorno e Chat de Suporte estilizados como caixas de diálogo e log limpos em tom neutro.

---

### 14.5. Preservação Funcional Absoluta (`@lead` + `@engineer` + `@qa`)
Fica expressamente garantido que:
1. **Nenhum endpoint ou rota de backend será quebrado ou desativado.**
2. **A comunicação bidirecional Socket.io continua operando em tempo real** (telemetria, tasks, presença, chat).
3. **Os dados dos computadores são 100% reais**, originados do banco de dados MySQL e dos agentes Windows.
4. **O catálogo de tarefas remotas autorizadas permanece 100% funcional.**
5. **A responsividade e o comportamento em diferentes resoluções (1366x768 até 4K) são garantidos.**

---

### 14.6. Critérios de Aceitação do Ciclo #08 (`@pm` + `@qa`)

| ID | Cenário | Dado que (Contexto) | Quando (Ação) | Então (Resultado Esperado) |
| :--- | :--- | :--- | :--- | :--- |
| **CA-21** | Eliminação Total da Estética Neon/Futurista | O operador acessa a plataforma | Visualiza a tela principal | Não há qualquer elemento com brilho neon, glow, gradientes cósmicos, hologramas, polígonos cortados ou fundo preto sci-fi. A interface exibe paleta editorial neutra (`#F4F5F2`), tipografia legível e superfícies limpas. |
| **CA-22** | Maquete Isométrica Estilo Habblaude | A cena 3D é renderizada | O operador visualiza a Unidade de Saúde | A unidade é apresentada como uma maquete 3D em miniatura com perspectiva isométrica, paredes seccionadas, pisos modulares, mobiliários de escritório/saúde em voxel e computadores em miniatura. |
| **CA-23** | Indicadores Luminosos Discretos nos PCs | Existem máquinas com status Online, Atenção, Crítico e Offline | O operador observa a maquete | Cada computador possui um LED de status integrado discreto (verde, âmbar, vermelho suave ou cinza). O cenário geral não é banhado em luz colorida. |
| **CA-24** | Interação e Sincronização Maquete ↔ Drawer | O operador passa o mouse ou clica em um computador na maquete | Interage com a cena 3D | Ao hover: exibe tooltip discreto com hostname/IP/status. Ao clicar: o computador é destacado com sutil indicador no piso, a câmera foca suavemente e a gaveta lateral de diagnóstico abre sincronizada. |
| **CA-25** | Preservação de Recursos de Câmera | O operador alterna entre os modos ISO 3D, CAD TOPO, FOCO e ORBITAL | Clica nos botões correspondentes no topo | A maquete responde instantaneamente às mudanças de câmera, mantendo a navegação suave e o centro geométrico da unidade. |
| **CA-26** | Painel de Diagnóstico Lateral Minimalista | Uma máquina é selecionada | O operador examina a gaveta de diagnóstico | As métricas de telemetria, estado de ociosidade, catálogo de tarefas e console de retorno são exibidos de forma limpa, sem mostradores circulares exagerados e sem rolagem bloqueada. |
| **CA-27** | Integridade dos Dados Reais e Ações Remotas | O operador aciona uma tarefa remota (ex.: Limpar DNS) | Ação é despachada | O agente executa a ação normalmente, o retorno surge no console e o status em tempo real é refletido fielmente. |

---

### 14.7. Arquivos Previstos para a Implementação
- `frontend/src/styles/theme.js` (nova paleta editorial, tokens cromáticos e tipografia).
- `frontend/src/styles/GlobalStyles.js` (fundo neutro claro `#F4F5F2`, scrollbars limpas, remoção de retículas e overlays neon).
- `frontend/src/App.jsx` (reestruturação do cabeçalho editorial, cards laterais limpos, dock inferior minimalista e controles).
- `frontend/src/components/DigitalTwin3D.jsx` (reconstrução da maquete isométrica estilo Habblaude com materiais, pisos, paredes seccionadas e mobiliários em voxel/miniatura).
- `frontend/src/components/DiagnosticDrawer.jsx` (redesenho minimalista do painel de diagnóstico, telemetria linear e catálogo de ações).
- `production_artifacts/Design_Specification.md` (atualização completa do guia de design e tokens).
- `production_artifacts/QA_Report.md` (registro detalhado dos testes de regressão e aceitação).

---

## 15. Gate de Aprovação — FASE 1 (Ciclo #08)

O pipeline do Ciclo #08 encontra-se **pausado no Gate de Aprovação da Fase 1**.
Responda com **`Approved`** para que `@lead`, `@designer` e `@frontend` iniciem imediatamente a implementação em código-fonte de todas as etapas da reformulação!


---

## 16. Ciclo #09 — Iluminação e Cores Semânticas na Tela dos Monitores da Maquete 3D (`@pm` + `@designer` + `@frontend`)

### 16.1. Problema e Oportunidade Visual
Na visualização geral da maquete isométrica 3D, a carcaça e a tela do monitor dos computadores estavam em tom preto/cinza escuro (`#111827`), dependendo exclusivamente de uma pequena esfera LED de status no canto. Isso dificultava a identificação rápida, à distância, do estado de saúde dos equipamentos distribuídos pelas salas da Unidade de Saúde.

### 16.2. Requisitos Funcionais (`@pm` + `@designer`)
1. **RF-31 (Tela com Cor do Estado Operacional):**
   - O vidro/display frontal do monitor deixa de ser preto estático e passa a exibir a cor semântica do estado da máquina:
     - **🟢 Online / Normal:** Display em verde sutil com brilho suave emissivo (`#2D6A4F` / emissive: `#38A169`).
     - **🟡 Atenção / Warning:** Display em tom âmbar luminoso (`#D97706` / emissive: `#F59E0B`).
     - **🔴 Crítico / Critical:** Display em vermelho de alerta (`#DC2626` / emissive: `#EF4444`).
     - **⚫ Offline / Desligado:** Display em cinza escuro fosco apagado (`#374151` / sem emissão de luz).
2. **RF-32 (Bezel e Moldura Preservados):**
   - A moldura externa e a carcaça traseira do monitor permanecem em acabamento plástico fosco cinza escuro (`#1F242B`), simulando perfeitamente a tela acesa/ligada do computador em miniatura sem parecer um bloco monocromático sólido.
3. **RF-33 (Performance e Harmonia):**
   - A intensidade emissiva deve ser equilibrada (`emissiveIntensity: 0.35` quando ligado e `0` quando desligado), sem produzir glow excessivo nem ofuscar o restante da maquete.

### 16.3. Critérios de Aceitação do Ciclo #09 (`@pm` + `@qa`)

| ID | Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- | :--- |
| **CA-28** | Identificação Imediata à Distância | O operador observa a maquete 3D da unidade com vários PCs | Olha os ambientes na visão isométrica | Identifica visualmente de imediato quais computadores estão ligados normais (tela verde), com alerta (âmbar), críticos (vermelho) ou desligados (cinza escuro apagado). |
| **CA-29** | Máquina Desligada Apagada | Uma máquina está com status `OFFLINE` | O operador localiza o PC na maquete | A tela do monitor exibe aspecto de tela desligada (cinza escuro sem emissão luminosa). |
| **CA-30** | Preservação de Moldura e Base | A tela do monitor está acesa com cor de status | O operador aproxima a câmera | A borda/bezel, base e haste do monitor mantêm o acabamento cinza escuro, com proporção estética de miniatura de escritório. |

---

## 17. Gate de Aprovação — FASE 1 (Ciclo #09)

O pipeline do Ciclo #09 encontra-se **pausado no Gate de Aprovação da Fase 1**.
Responda com **`Approved`** para que eu aplique a alteração no componente 3D e recompile o frontend!


---

## 18. Ciclo #10 — Remoção do Card de Ocorrências/Chamados e Foco Estrito em RMM (`@pm` + `@designer` + `@frontend`)

### 18.1. Regra de Negócio & Motivação de Produto
O usuário e a equipe técnica definiram que o **RMM Ipojuca tem como propósito o monitoramento do parque tecnológico, telemetria em tempo real, saúde das estações e gerenciamento remoto autorizado**, e **não a abertura ou acompanhamento de chamados/tickets** (esta responsabilidade já pertence ao sistema oficial de helpdesk/chamados da Prefeitura).

A presença do card *"OCORRÊNCIAS & ALERTAS"* com protocolos no formato `#TCK-N8N-...` gera sobreposição desnecessária de responsabilidades, distrai o operador e polui a coluna lateral esquerda com caixas de alerta vermelhas.

### 18.2. Requisitos Funcionais (`@pm` + `@designer`)
1. **RF-34 (Remoção do Card de Ocorrências):**
   - Remover integralmente o bloco *"OCORRÊNCIAS & ALERTAS"* da coluna lateral esquerda (`LeftRadarColumn` no `frontend/src/App.jsx`).
   - Eliminar os estilos e componentes relacionados a itens de ocorrência (`IncidentItem`).
2. **RF-35 (Refinamento da Coluna Lateral Esquerda):**
   - A coluna lateral esquerda passará a conter estritamente informações essenciais de RMM:
     1. **Rede Global:** Matriz com o total de estações divididas em Online, Atenção, Crítico e Offline.
     2. **Camadas da Maquete:** Alternância rápida entre Mobiliário e Rótulos.
     3. **Setores da Unidade:** Mapeamento das salas com quantidade de computadores e estado geral.
   - Isso garante uma interface mais limpa, minimalista, focada e sem poluição visual.

### 18.3. Critérios de Aceitação do Ciclo #10 (`@pm` + `@qa`)

| ID | Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- | :--- |
| **CA-31** | Ausência de Ocorrências/Tickets | O operador acessa a aplicação | Observa a coluna lateral esquerda | Não há nenhum card ou lista de "OCORRÊNCIAS & ALERTAS" nem menção a números de ticket `#TCK-N8N-...`. |
| **CA-32** | Coluna Lateral Limpa e Funcional | O operador navega pelo painel | Examina a barra lateral | A coluna exibe apenas a Matriz Global, as Camadas da Maquete e a lista de Setores da Unidade, de forma minimalista e elegante. |

---

## 19. Gate de Aprovação — FASE 1 (Ciclo #10)

O pipeline do Ciclo #10 encontra-se **pausado no Gate de Aprovação da Fase 1**.
Responda com **`Approved`** para que `@lead`, `@designer` e `@frontend` realizem a remoção do card, compilem e enviem para o repositório!


---

## 20. Ciclo #11 — Segunda Rodada de Refinamento: Maquete Habblaude Enriquecida, Ocupação Espacial, Foco por Setor e Drawer Compacto (`@pm` + `@designer` + `@frontend`)

### 20.1. Objetivo Principal e Diretrizes
Elevar a qualidade artística e a experiência de uso do Gêmeo Digital, **sem recomeçar a aplicação do zero e preservando rigorosamente todas as funcionalidades já desenvolvidas**.

O objetivo é transformar a cena 3D atual em uma **verdadeira maquete digital interativa inspirada no Habblaude**, rica em detalhes, acolhedora, com móveis estilizados reconhecíveis (em voxel/pixel-art 3D), proporções coerentes, menor espaço ocioso e navegação espacial por salas/setores.

---

### 20.2. Requisitos Funcionais do Ciclo #11 (`@pm` + `@designer` + `@frontend`)

1. **RF-36 (Otimização da Composição e Eliminação de Espaço Vazio):**
   - Redimensionar a base da maquete (`IsometricBoard`) para eliminar áreas mortas e fazer com que os ambientes da Unidade de Saúde preencham harmoniosamente a tela.
   - Calibrar o enquadramento padrão da câmera isométrica (`ISO 3D`) para uma visão aconchegante e sem perda de resolução.
   - Refinar paredes cortadas em L (*cutaway*): adicionar rodapés de madeira natural, batentes nas passagens entre salas e textura sutil de ladrilho/madeira no piso.

2. **RF-37 (Enriquecimento Artístico dos Mobiliários — Habblaude Voxel):**
   - **Mesas:** Tampo de madeira em carvalho com espessura realista, pernas estruturadas e gaveteiros com puxadores.
   - **Cadeiras:** Estrutura ergonômica com assento, encosto e braços estilizados em tom cinza-chumbo ou azul marinho.
   - **Estações de Trabalho:** Telas iluminadas com a cor do status (mantidas do ciclo #09), teclado com teclas em relevo, mousepad e gabinete torre com aletas frontais de ventilação.
   - **Impressoras de Prontuário:** Bandeja de papel com folha branca de receituário, carcaça em dois tons e LED funcional do spooler.
   - **Mobiliário Clínico e Decoração:**
     - *Recepção:* Balcão de atendimento com divisória de atendimento, bebedouro de água com galão azul translúcido e vaso cerâmico com planta verde natural (*monstera/costela-de-adão* em voxel).
     - *Consultório / Enfermagem:* Maca de exame clínico acolchoada, biombo médico sanfonado em 3 folhas e suporte metálico com bolsa de soro.
     - *Farmácia / Sala de Vacina:* Armário vitrine de remédios com frascos/caixas em tons pastéis organizados nas prateleiras.
     - *Sala de Servidores / TI:* Rack de telecomunicações estilizado com organizador de cabos e portas de switch.

3. **RF-38 (Navegação Espacial por Setor com Foco Suave):**
   - Na lista *"SETORES DA UNIDADE"* da barra lateral esquerda (`SectorMiniRow`), permitir que o operador clique em qualquer setor.
   - Ao clicar em um setor: a câmera faz uma transição suave (*lerp*) aproximando-se do centro daquela sala específica, facilitando a inspeção dos equipamentos daquele ambiente.
   - Um botão discreto *"Visão Geral"* ou o botão `ISO 3D` retorna suavemente ao enquadramento global da unidade.

4. **RF-39 (Compactação e Hierarquia do Painel Lateral `DiagnosticDrawer`):**
   - Substituir a rolagem vertical longa por uma navegação segmentada em abas limpas no topo da gaveta:
     - **Aba 1: "Diagnóstico & Telemetria"** (Métricas lineares de CPU, RAM, Disco e Temperatura, Estado de Atividade/Ociosidade, Histórico no osciloscópio e Ficha Técnica).
     - **Aba 2: "Manutenção & Suporte"** (Catálogo de Tarefas Remotas Autorizadas, Console de Retorno dos Comandos e Chat com o usuário da máquina).
   - **Consistência de Estados:** Se a máquina estiver `OFFLINE`, exibir explicitamente *"Última telemetria coletada em DD/MM às HH:mm"*, deixando evidente que os dados mostrados refletem o último estado registrado antes do desligamento.

---

### 20.3. Critérios de Aceitação do Ciclo #11 (`@pm` + `@qa`)

| ID | Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- | :--- |
| **CA-33** | Composição Equilibrada da Maquete | O operador abre a visualização 3D | Observa o enquadramento geral | A maquete ocupa a tela de forma harmoniosa, sem excesso de espaço vazio cinza ao redor dos setores. |
| **CA-34** | Detalhamento Artístico Voxel Habblaude | O operador inspeciona as salas da unidade | Examina móveis e equipamentos | Identifica claramente mesas com gaveteiros, cadeiras estruturadas, bebedouro, plantas decorativas, macas hospitalares, biombos, armários de farmácia e mini-rack de TI. |
| **CA-35** | Navegação por Setor na Lateral | O operador clica em um setor (ex: "Farmácia") na lista esquerda | Clica na linha do setor | A câmera aproxima-se suavemente da sala selecionada, mantendo o ângulo isométrico agradável. |
| **CA-36** | Gaveta Lateral Segmentada e Compacta | Uma máquina é selecionada no painel | O operador navega pelas abas da gaveta lateral | Alterna com agilidade entre "Diagnóstico" e "Manutenção/Tarefas" sem necessidade de rolagem vertical exaustiva. |
| **CA-37** | Consistência de Leitura Offline | A estação selecionada está com status `OFFLINE` | O operador verifica o painel | Os indicadores e a ficha técnica destacam claramente a data e horário da última comunicação registrada. |

---

## 21. Gate de Aprovação — FASE 1 (Ciclo #11)

Aprovado pelo usuário e executado com sucesso nos Ciclos #11, #12 e #13.

---

## 22. Ciclo #14 — Reformulação Cromática e Arquitetônica: Pisos Texturizados, Paredes Acolhedoras, Tapetes e Entorno Habblaude (`@pm` + `@designer` + `@frontend`)

### 22.1. Diagnóstico da Situação Atual e Referência Visual Oficial

O usuário solicitou explicitamente a eliminação do aspecto monótono e cinzento da maquete 3D, fornecendo como referência direta a captura oficial do Habblaude (`media_1794508475555_4c47db04.jpg`).

Na implementação atual do `DigitalTwin3D.jsx`, as paredes são brancas/cinzas lisas (`#FFFFFF`), a base do diorama é um bloco de concreto neutro (`#D5D9D3`), e os pisos utilizam cores sólidas desbotadas com um gridHelper cinza genérico.

Na referência oficial do Habblaude (imagem enviada):
1. **Pisos com Texturas e Padrões Reais:**
   - Pisos de **madeira nobre / parquet / tábua corrida** (tons quentes de carvalho/mel).
   - Pisos **xadrez quadriculados (checkerboard)** em tons suaves (azul celeste e branco, ou cinza claro e bege) para áreas de serviços, copa e recepção.
   - **Tapetes decorativos e funcionais** (tapete azul marinho/royal na recepção, tapete verde musgo/sálvia no lounge/espera, passadeiras no corredor).
2. **Paredes com Identidade, Cores e Elementos Arquitetônicos:**
   - Cores acolhedoras e harmoniosas por setor (bege acolhedor, menta/verde sálvia suave, madeira clara e azul petróleo discreto).
   - **Rodapé inferior em madeira** (`#6D4C41` / `#8D6E63`) e moldura superior em madeira/rodateto.
   - **Elementos de parede Habblaude:** relógio de parede redondo com ponteiros, quadros decorativos com paisagens e murais/planners de avisos.
3. **Entorno Externo da Maquete (Jardim / Gramado Pixel-Art):**
   - Substituição do plinto cinza de concreto por um **gramado verde acolhedor com acabamento em terra e decks de madeira natural**, emoldurando o prédio como um diorama vivo e agradável.

---

### 22.2. Requisitos Funcionais do Ciclo #14 (`@pm` + `@designer` + `@frontend`)

1. **RF-40 (Pisos Ricos e Texturizados por Setor):**
   - Implementar padrões procedurais de piso em alta performance (Three.js CanvasTexture / geometrias modulares de ladrilho):
     - **Recepção & Triagem:** Piso de madeira clara acolhedora (`#D4A373` / `#C59B6D`) complementado por um tapete azul marinho/royal elegante na área de atendimento.
     - **Consultório Médico & Enfermagem:** Piso de cerâmica/porcelanato claro hospitalar com juntas nítidas e tapete suave sob a mesa clínica.
     - **Farmácia & Vacinação:** Piso xadrez quadriculado (checkerboard) em dois tons suaves (menta suave `#D1E7DD` e branco `#F8F9FA`).
     - **Coordenação / ADM / Servidores:** Piso amadeirado carvalho escovado com tapete corporativo.
   - Adicionar faixa/passadeira de circulação entre os ambientes para conectar os setores.

2. **RF-41 (Paredes Acolhedoras, Rodapés e Detalhes Arquitetônicos):**
   - Eliminar as paredes brancas/cinzas lisas genéricas.
   - Aplicar paleta de paredes diferenciada por ambiente:
     - Recepção: tom areia/bege acolhedor (`#F3EBDD`) com painel ripado em madeira.
     - Consultório/Enfermagem: tom menta suave pastel (`#D8E8E0`) com faixa sanitária lavável.
     - Farmácia: acabamento cerâmico/azulejado suave (`#E8F1F2`).
     - Sala de Servidores/TI: tom técnico suave azul petróleo/ardósia (`#E2E8F0` com divisória escura).
   - Incluir rodapé inferior contínuo de madeira natural de 0.12m de altura em todas as paredes.
   - Adicionar detalhes nas paredes traseiras:
     - **Relógio de parede redondo** com moldura de madeira e ponteiros.
     - **Quadros de arte emoldurados** com paisagens pixel-art.
     - **Mural de avisos / cortiça** para recados institucionais da saúde.

3. **RF-42 (Base Externa em Gramado e Deck de Madeira Estilo Diorama):**
   - Substituir o plinto cinza de concreto por uma base de diorama viva inspirada no Habblaude:
     - Gramado verde vibrante e acolhedor (`#588157` / `#4A7C59`) ao redor da unidade.
     - Pequenos arbustos e floreiras voxel nos cantos externos.
     - Passarela / deck de madeira natural (`#B08968`) nas entradas da unidade de saúde.

4. **RF-43 (Preservação de Performance, Câmera e Dados em Tempo Real):**
   - Garantir renderização fluida a 60 FPS utilizando texturas procedurais leves geradas no cliente (sem dependência de assets pesados externos).
   - Preservar integralmente as estações de trabalho, o monitor com LED de status, a câmera por setor/máquina e a sincronização com a telemetria da VPS.

---

### 22.3. Critérios de Aceitação do Ciclo #14 (`@pm` + `@qa`)

| ID | Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- | :--- |
| **CA-38** | Diversidade Cromática e Texturas de Piso | O operador abre o Gêmeo Digital 3D | Observa o piso dos setores | Não visualiza uma superfície cinza genérica; identifica pisos de madeira acolhedora, xadrez clássico, cerâmica polida e tapetes coloridos (azul royal, verde e bege) delimitando os espaços. |
| **CA-39** | Paredes com Identidade e Rodapé de Madeira | O operador visualiza as salas seccionadas | Examina as paredes traseiras e laterais | Observa cores acolhedoras (bege, menta, madeira, azul ardósia), rodapé de madeira nobre na base, relógio de parede redondo e quadros decorativos emoldurados. |
| **CA-40** | Entorno com Gramado e Deck de Madeira | O operador observa os limites externos da maquete | Analisa a base do diorama | Visualiza gramado verde com vegetação em miniatura e deck de madeira nas entradas, recriando fielmente o visual da referência Habblaude. |
| **CA-41** | Preservação de Performance e Funcionalidades RMM | O operador interage com a maquete e painel | Seleciona computadores e gira a câmera | A aplicação mantém taxa estável de 60 FPS, sem lentidão, e todas as métricas reais, CPU, status e ações do painel permanecem plenamente operacionais. |

---

## 23. Gate de Aprovação — FASE 1 (Ciclo #14) — [CONCLUÍDO E APROVADO]

Aprovado pelo usuário. Implementação de pisos, paredes acolhedoras, rodapés de madeira e entorno diorama concluída com sucesso no commit `0078384`.

---

# CICLO #15 — CORREÇÃO DE ISOLAMENTO DE UNIDADES NO WEBSOCKET & ELIMINAÇÃO DE MÁQUINAS FANTASMAS (FLICKER)

## 24. Diagnóstico e Arquitetura da Solução (`@lead` + `@engineer` + `@frontend` + `@security`)

### 24.1. Diagnóstico da Causa Raiz do Bug
1. **Vazamento Cross-Unit no Listener de Socket.io (`frontend/src/App.jsx`):**
   - O evento `machine:updated` é emitido pelo backend (`socketHub.broadcastToDashboard`) a cada heartbeat recebido de qualquer agente de qualquer unidade de saúde municipal.
   - O callback `onMachineUpdated` no frontend avaliava:
     ```javascript
     setMachines((prev) => {
       const exists = prev.some((m) => m.id === updatedMachine.id);
       if (exists) return prev.map(...);
       return [...prev, updatedMachine]; // <-- VAZAMENTO: adicionava qualquer máquina de outra unidade!
     });
     ```
   - Além disso, o drawer executava:
     ```javascript
     setDiagnostics((prev) => !prev || prev.machine?.id === updatedMachine.id ? { ...prev, machine: updatedMachine } : prev);
     ```
     Quando a unidade ativa não possuía computadores, `prev` era `null`, logo `!prev` resultava em `true`, forçando a abertura do drawer com dados de uma máquina estranha à unidade.
2. **Ciclo de Flicker Contínuo (Aparece e Some):**
   - A cada 12 segundos (ou na troca de unidades), `loadAllData` consultava a API REST (`GET /api/v1/machines?unitId=2`), retornando `[]`. O estado `machines` era redefinido para vazio (a máquina sumia).
   - Segundos depois, um novo heartbeat da máquina nativa de outra unidade chegava via WebSocket, re-inserindo a máquina no array local (a máquina reaparecia).
3. **Stale Closure no React Hook:**
   - O socket era aberto no `useEffect` indexado por `[selectedProfileIdx]`, mantendo na closure o valor inicial de `selectedUnitId`. Sem sincronização via `useRef`, qualquer leitura de unidade ativa no socket listener ficava desatualizada.
4. **Ausência de Filtro de Pertencimento no Digital Twin 3D (`DigitalTwin3D.jsx`):**
   - O componente 3D iterava sobre `machines.map(...)`. Ao receber uma máquina de outra unidade, caía no fallback de coordenadas `(pos_x, pos_z)`, renderizando a estação de trabalho dentro de salas da unidade errada.

---

### 24.2. Requisitos Funcionais do Ciclo #15 (`@pm`)

- **RF-44 (Isolamento Estrito por `unit_id` no Realtime Hub):**
  - O listener `onMachineUpdated` deve consultar `selectedUnitIdRef.current` dinamicamente.
  - Apenas máquinas cujo `Number(updatedMachine.unit_id) === Number(selectedUnitIdRef.current)` podem ser inseridas ou mantidas no estado `machines`.
  - Se a máquina pertencer a outra unidade, ela deve ser explicitamente removida do array local se já estiver presente.
  - O estado `diagnostics` só deve ser atualizado se pertencer à máquina já aberta E à unidade ativa; caso pertença a outra unidade, deve ser limpo (`null`).
- **RF-45 (Barreira Defensiva no Digital Twin 3D):**
  - O componente `DigitalTwin3D` deve filtrar `unitMachines` validando se o `sector_id` da máquina pertence aos setores da unidade ativa (`activeUnit.sectors`) ou se seu `unit_id` confere com `activeUnit.id`.
  - Máquinas fora da unidade ativa jamais devem ser renderizadas na cena 3D nem alocadas em grade.
- **RF-46 (Limpeza Imediata na Transição de Unidades):**
  - Ao clicar nas abas de unidades (`setSelectedUnitId`), resetar imediatamente `diagnostics` para `null` e `selectedMachineId` para `null`, evitando retenção visual antes da resolução da API.

---

### 24.3. Critérios de Aceitação do Ciclo #15 (`@pm` + `@qa`)

| ID | Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- | :--- |
| **CA-42** | Unidade Vazia sem Máquinas Fantasmas | O operador seleciona uma unidade sem computadores (ex: Policlínica Municipal - 0 PCs) | Agentes de outras unidades (ex: USF N. Sra. do Ó) enviam heartbeats periódicos via WebSocket | A maquete 3D permanece limpa sem nenhuma estação de trabalho; a contagem permanece estritamente "0 PCs"; o drawer de diagnósticos não abre sozinho; nenhum computador fica piscando ou surgindo na tela. |
| **CA-43** | Atualização em Tempo Real Preservada para a Unidade Correta | O operador seleciona uma unidade com computadores cadastrados (ex: USF N. Sra. do Ó - 4 PCs) | Um agente da própria unidade envia telemetria e métricas atualizadas | A estação de trabalho correspondente reflete as métricas de CPU, RAM e status instantaneamente via WebSocket sem necessidade de recarregar a página. |
| **CA-44** | Defesa em Camadas no Digital Twin 3D | Uma máquina com ID de setor desconhecido ou divergente é injetada no fluxo | O componente `DigitalTwin3D` processa o layout | O filtro defensivo descarta a máquina órfã, prevenindo crashes no cálculo de layout e impedindo coordenadas espaciais duplicadas ou sobrepostas. |

---

## 25. Gate de Aprovação — FASE 1 (Ciclo #15) — [CONCLUÍDO E APROVADO]

Aprovado pelo usuário. Correção de isolamento estrito por `unit_id` no WebSocket e barreira defensiva no Digital Twin 3D implementados com sucesso no commit `d10d112`.

---

# CICLO #16 — REFORMULAÇÃO ARQUITETÔNICA DA MAQUETE 3D: UNIDADE CONTÍGUA COM CORREDOR INTERNO, PAREDES INTEGRADAS COM PORTAS E ELIMINAÇÃO DE GRAMA INTERNA

## 26. Diagnóstico Arquitetônico e Especificação da Solução (`@lead` + `@designer` + `@frontend` + `@pm`)

### 26.1. Diagnóstico da Causa Raiz da Impressão de "Rua com Casas Isoladas"
1. **Dispersão Espacial dos Setores com Grama Interna:**
   - Atualmente, o diorama renderiza uma placa uniforme de grama verde (`22.6m x 17.2m`) por baixo de toda a cena.
   - Cada setor possuía dimensões isoladas com espaços vazios de até 2.5 metros entre as salas (`X = -1.75` até `X = +0.75`), revelando grama verde dentro da edificação entre as salas.
   - Em uma unidade de saúde real (e na referência Habblaude), a edificação é **um único bloco arquitetônico contíguo**. Toda a área interna é coberta por laje e piso hospitalar. A grama e o jardim pertencem exclusivamente ao exterior (perímetro da unidade).
2. **"Setor em Cima da Rua" (Sobreposição do Corredor):**
   - O corredor central de circulação foi desenhado de forma isolada na faixa `Z = -0.9` a `Z = +0.9`.
   - Os setores frontais (Farmácia e Coordenação) estavam configurados em `bounds_z = +3.2` com profundidade `depth_3d = 5.0m`, estendendo-se de `Z = +0.7` até `Z = +5.7`.
   - A parede traseira desses setores foi gerada em `Z = +0.7`, invadindo a faixa do corredor e bloqueando a passagem como uma barreira cega ("o setor está em cima da rua").
   - Além disso, a ausência de vãos de portas (portais de passagem) fazia com que os cômodos parecessem caixas fechadas sem ligação orgânica com a circulação.

---

### 26.2. Arquitetura da Edificação Unificada (Padrão Habblaude)

1. **Laje Estrutural Contígua (`BuildingFoundationSlab`):**
   - A unidade de saúde passa a ter uma fundação sólida contínua (ex: `18.0m x 12.0m`), elevando o piso interno a `+0.04m` em relação ao solo externo.
   - O gramado verde vivo, as cercas vivas e os decks de entrada ficam restritos ao perímetro externo da edificação (`|X| >= 9.0m` ou `|Z| >= 6.0m`).
   - Nenhuma área verde é visível no interior da clínica.
2. **Corredor Interno de Circulação Perfeito e Desobstruído:**
   - Faixa de circulação central interna linear de `2.0m` de largura (de `Z = -1.0m` a `Z = +1.0m`), conectando a recepção da entrada principal oeste (`X = -9.0m`) até o final da unidade (`X = +9.0m`).
   - Piso em porcelanato polido claro com passadeira central azul-ardósia e bordas de acabamento, perfeitamente embutida na laje.
3. **Planta Baixa Perfeitamente Encaixada (Grid Modular Contíguo):**
   - **Ala Norte (Fundos):**
     - **Recepção e Triagem (REC):** de `X = -9.0` a `X = 0.0` e `Z = -6.0` a `Z = -1.0` (Largura: `9.0m`, Profundidade: `5.0m`). Piso em madeira parquet carvalho e tapete azul royal.
     - **Consultório Médico 01 (CONS-01):** de `X = 0.0` a `X = +9.0` e `Z = -6.0` a `Z = -1.0` (Largura: `9.0m`, Profundidade: `5.0m`). Piso em porcelanato menta suave e maca clínica.
     - Ambas as salas compartilham a parede divisória central interna em `X = 0.0`.
   - **Ala Sul (Frente / Visão Cutaway):**
     - **Farmácia e Vacinação (FARM):** de `X = -9.0` a `X = 0.0` e `Z = +1.0` a `Z = +6.0` (Largura: `9.0m`, Profundidade: `5.0m`). Piso xadrez menta/marfim e prateleiras de medicamentos.
     - **Coordenação e Enfermagem (ADM):** de `X = 0.0` a `X = +9.0` e `Z = +1.0` a `Z = +6.0` (Largura: `9.0m`, Profundidade: `5.0m`). Piso em madeira parquet e tapete verde musgo.
     - Ambas as salas compartilham a parede divisória central interna em `X = 0.0`.
4. **Paredes com Portais de Passagem (Vãos de Portas):**
   - As paredes que separam as salas do corredor contam com **vãos de porta de 1.10m** com batente e soleira em madeira nobre, permitindo transitar visualmente do corredor para dentro de cada setor.
   - Nenhuma parede bloqueia o corredor.
5. **Mobiliário de Corredor e Enriquecimento Visual:**
   - Longarinas/bancos de espera hospitalares em metal e couro dispostos ao longo das paredes do corredor.
   - Bebedouro de galão azul na recepção/circulação.
   - Placas de sinalização hospitalar em relevo sobre os vãos de cada porta.
   - Fachada com deck de madeira e rampa de acessibilidade na entrada principal.

---

### 26.3. Requisitos Funcionais do Ciclo #16 (`@pm`)

- **RF-47 (Edificação Unificada e Eliminação de Grama Interna):** Implementar laje arquitetônica contígua para a unidade de saúde, confinando a grama e o jardim exclusivamente ao exterior da edificação.
- **RF-48 (Planta Baixa Contígua sem Invasão de Corredor):** Alinhar os setores em malha ortogonal contígua, com paredes compartilhadas e alinhamento milimétrico ao corredor interno (`Z = ±1.0m`), eliminando o bug de setor sobreposto à circulação.
- **RF-49 (Paredes Divisórias com Vãos de Portas e Batentes):** Renderizar aberturas de portas com batentes e soleiras conectando as salas ao corredor interno.
- **RF-50 (Detalhamento Arquitetônico Hospitalar Estilo Habblaude):** Incluir bancos de espera no corredor, sinalização das portas, piso unificado com transições suaves e fachada de entrada com deck.
- **RF-51 (Preservação de Telemetria e Desempenho 60 FPS):** Manter a distribuição automática de estações de trabalho nos setores, sincronização em tempo real de telemetria e taxa estável de 60 FPS sem assets pesados.

---

### 26.4. Critérios de Aceitação do Ciclo #16 (`@pm` + `@qa`)

| ID | Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- | :--- |
| **CA-45** | Edificação Integrada e Contígua | O operador visualiza a maquete 3D da unidade | Observa a estrutura do edifício | Identifica um prédio de unidade de saúde único e contíguo, com laje de piso contínua; não há grama ou vãos vazios entre as salas. |
| **CA-46** | Corredor Desobstruído sem Invasão de Salas | O operador observa o corredor central | Analisa o alinhamento das paredes | O corredor interno é 100% linear e desobstruído; nenhuma parede de setor sobrepõe ou bloqueia a circulação. |
| **CA-47** | Vãos de Portas e Acesso aos Cômodos | O operador inspeciona a transição corredor-sala | Examina as entradas de cada ambiente | Identifica aberturas de portas com batentes em madeira e soleiras de transição, conectando o corredor ao interior das salas. |
| **CA-48** | Detalhes Hospitalares no Corredor | O operador navega pelo diorama | Observa os detalhes da circulação | Visualiza bancos de espera para pacientes, bebedouro e tabuletas de identificação dos setores nas portas. |
| **CA-49** | Performance e Telemetria Intactas | O operador interage com computadores e gira a cena | Analisa FPS e dados reais | A aplicação renderiza fluidamente a 60 FPS e todos os computadores reais continuam conectados à telemetria da VPS. |

---

## 27. Gate de Aprovação — FASE 1 (Ciclo #16)

O pipeline do Ciclo #16 foi devidamente aprovado (`Approved`), implementado e integrado à branch `main` (commits `d10d112` e `c02cdee`).

---

## 28. Ciclo #17 — Missão de Refinamento Artístico: Sala-Piloto da Recepção (Padrão Habblaude Premium)

### 28.1. Diretriz e Contexto do Ciclo #17 (`@pm` + `@lead`)

A visualização do Gêmeo Digital do RMM necessita de um salto expressivo de qualidade artística e acabamento, migrando da estética de blocos procedurais simples para uma experiência isométrica premium de jogo em miniatura, tendo como referência estética central o Habblaude (https://www.habblaude.com/).

> [!IMPORTANT]
> **DIRETRIZ INEGOCIÁVEL (FASE PILOTO EXCLUSIVA):**
> Em conformidade estrita com a solicitação do usuário, **NÃO será realizada a reconstrução simultânea de todos os setores nesta etapa**.
> O desenvolvimento será concentrado **exclusivamente na SALA-PILOTO (RECEPÇÃO & TRIAGEM)**, que funcionará como laboratório e referência de excelência artística, arquitetônica, ergonômica e técnica para todo o Gêmeo Digital.
> Nenhuma outra sala receberá novas intervenções até que a Sala-Piloto seja apresentada, avaliada e expressamente aprovada pelo usuário.

### 28.2. Biblioteca de Modelos 3D Detalhados da Sala-Piloto (`@designer` + `@frontend`)

Em substituição aos cubos genéricos, a Sala-Piloto receberá modelos de alta fidelidade visual com proporção, volumetria, espessura e linguagem estilizada Habblaude:

1. **`ReceptionDeskHabblaude` (Balcão de Atendimento em L):**
   - Tampo espesso em madeira carvalho natural com cantos biselados/chanfrados.
   - Painel frontal estético com textura ripada em tom marfim/amadeirado e rodapé metálico recuado.
   - Divisória de atendimento em vidro acrílico translúcido de segurança com suportes de aço escovado.
   - Área interna do recepcionista estruturada com passa-cabos, nicho para impressora térmica de prontuário e nicho para torre de computador.
2. **`OfficeDeskHabblaude` (Mesa de Escritório Executiva):**
   - Tampo encorpado de madeira carvalho claro com bordas trabalhadas.
   - Gaveteiro lateral acoplado com 3 gavetas e puxadores metálicos horizontais escovados.
   - Estrutura de pernas de aço carbono em grafite fosco com travessa inferior de estabilidade.
3. **`ErgonomicChairHabblaude` (Cadeira Ergonômica de Escritório):**
   - Assento anatômico acolchoado com textura e curvatura frontal.
   - Encosto lombar anatômico alto com suporte dorsal.
   - Braços em T estruturados em poliuretano preto.
   - Coluna de pistão a gás com anel metálico e base aranha de 5 raios com mini-rodízios de nylon.
4. **`ComputerStationHabblaude` (Estação de Trabalho Completa):**
   - **Monitor Widescreen Slim:** Painel frontal widescreen com bordas ultrafinas, tela fosca com iluminação emissiva suave baseada no status de saúde do RMM (verde normal, amarelo alerta, vermelho crítico) e micro-LED de telemetria funcional no canto da moldura.
   - **Gabinete Torre Miniatura:** Gabinete estilizado com frentes de ventilação, botão power cilíndrico, entradas USB e LED de atividade do agente RMM.
   - **Periféricos:** Teclado slim com relevo de linhas de teclas, mousepad retangular e mouse óptico ergonômico.
5. **`ThermalPrinterHabblaude` (Impressora Térmica de Prontuário):**
   - Miniatura de impressora térmica hospitalar com tampa superior, fenda de emissão, mini-filamento de papel saindo e LED verde sincronizado ao serviço de spooler de impressão.
6. **`StorageCabinetHabblaude` (Armário de Prontuários e Arquivos):**
   - Armário vertical de escritório com duas portas de correr/abrir, prateleiras internas e puxadores verticais metálicos.
7. **`WaitingLoungeHabblaude` (Longarina de Espera para Pacientes):**
   - Estrutura metálica tubular de apoio e 3 assentos anatômicos acolchoados em azul hospitalar nobre, respeitando o fluxo de circulação.
8. **`WaterDispenserHabblaude` (Bebedouro de Coluna):**
   - Gabinete em aço esmaltado branco, torneiras azul e vermelha, bandeja pingadeira e galão de água mineral de 20L translúcido azul com refração suave e tampa protetora.
9. **`IndoorPlantHabblaude` (Planta Decorativa de Interior):**
   - Vaso em cerâmica esmaltada fosca, substrato de terra escura e folhas volumétricas estilizadas (estilo monstera/samambaia) com variação de tons de verde.
10. **`ArchitecturalWallDecor` (Elementos Arquitetônicos e de Parede):**
    - Relógio analógico redondo de parede em madeira escura com mostrador marfim e ponteiros marcados.
    - Quadro de arte contemporânea com moldura de madeira e vidro antirreflexo.
    - Janelas externas com moldura de madeira, vidros translúcidos duplos e peitoril de pedra.
    - Portal de acesso com batente e tabuleta de identificação em relevo.

### 28.3. Reformulação da Iluminação e Sombras Suaves (`@frontend` + `@designer`)

A iluminação atual exibe faixas diagonais duras e sombras artificiais que prejudicam a percepção de maquete. A reformulação estabelece:
- **Luz Ambiente Difusa:** Iluminação ambiente uniforme e acolhedora (`#FFFDF9`) garantindo leitura homogênea das paredes sem cantos escuros.
- **Luz Direcional Principal Suave:** Posicionamento de luz simulando iluminação de estúdio para maquetes físicas, com mapa de sombras em alta resolução (`2048x2048`), filtro de suavização de bordas (`shadow-radius = 3.5`), `shadow-bias` calibrado para anular artefatos de corte/acne e *frustum* ajustado perfeitamente ao diorama.
- **Luz Secundária de Preenchimento (*Fill Light*):** Proporciona luz de rebatimento suave nas faces traseiras das paredes e mobiliário sem gerar sombras conflitantes.

### 28.4. Enquadramento e Proporções da Maquete (`@frontend`)

- Redução da área de gramado externo ao redor do diorama, removendo o vazio excessivo.
- Centralização da edificação para ocupar 75% a 85% da área visível da viewport, com zoom equilibrado e ponto focal inicial na Recepção.
- Câmera em projeção isométrica suave com transições fluidas via `CameraRig`.

### 28.5. Integração com Dados Reais e Interatividade (`@engineer` + `@qa`)

- O computador da Recepção permanece 100% conectado ao agente real do sistema (`DESKTOP-32HK6KT`), recebendo telemetria da VPS em tempo real via WebSocket.
- O clique no computador:
  - Destaca o equipamento com sutil realce no piso.
  - Aproxima a câmera no posto de atendimento da recepção.
  - Abre o Drawer Lateral de Diagnósticos com CPU, RAM, Disco, Temperatura, Processador e Spooler.
  - Exibe o tooltip flutuante ao passar o mouse com hostname e IP.

---

### 28.6. Requisitos Funcionais do Ciclo #17 (`@pm`)

- **RF-52 (Biblioteca 3D de Mobiliário e Equipamentos da Recepção):** Implementar componentes 3D ricos e reutilizáveis (balcão em L ripado, mesa executiva, cadeira ergonômica com rodízios, computador miniatura completo com gabinete/teclado/mouse, impressora de prontuário, armário de arquivos, longarina, bebedouro e vaso de planta).
- **RF-53 (Acabamento Arquitetônico Refinado da Sala-Piloto):** Implementar piso de carvalho de alta definição sem ruído visual, rodapés nobres de madeira, rodateto, janelas com esquadrias e vidros translúcidos e portal de entrada com batente.
- **RF-54 (Reformulação de Iluminação e Sombras de Estúdio):** Configurar iluminação difusa uniforme, eliminar faixas diagonais duras, calibrar `shadow-bias` e aplicar sombras de contato suaves (*soft contact shadows*).
- **RF-55 (Enquadramento Isométrico e Otimização de Terreno):** Reduzir dimensões da área externa para que o diorama hospitalar preencha harmoniosamente a área útil de visualização.
- **RF-56 (Preservação de Dados Reais e Interatividade do RMM):** Manter o vínculo ativo com os computadores da telemetria, clique de seleção, foco de câmera e abertura do painel de diagnósticos.
- **RF-57 (Performance e Taxa Estável a 60 FPS):** Manter geometrias limpas e eficientes, garantindo 60 FPS sem engasgos ou sobrecarga de WebGL.

---

### 28.7. Critérios de Aceitação do Ciclo #17 (`@pm` + `@qa`)

| ID | Cenário | Dado que | Quando | Então |
| :--- | :--- | :--- | :--- | :--- |
| **CA-50** | Sala-Piloto da Recepção com Padrão Habblaude | O operador acessa o Gêmeo Digital | Observa a sala de Recepção & Triagem | Visualiza um ambiente rico, detalhado e acolhedor; todos os móveis e equipamentos têm volumetria, espessura e acabamento de miniatura premium. |
| **CA-51** | Estação de Computador Completa e Reconhecível | O operador examina o posto de trabalho da recepção | Inspeciona os periféricos | Identifica monitor slim com tela de status emissiva e micro-LED de saúde, gabinete torre com painel e botão power, teclado em relevo, mousepad com mouse e impressora de prontuário. |
| **CA-52** | Iluminação Suave sem Faixas Diagonais ou Artefatos | O operador analisa as sombras na maquete | Gira a visualização da cena | A iluminação é homogênea e as sombras são suaves (*soft shadows*); não há faixas diagonais duras, manchas pretas ou corte de superfície (shadow acne/bias). |
| **CA-53** | Edificação Preenche Harmoniosamente a Viewport | O operador abre a tela em modo ISO padrão | Analisa a proporção do diorama | A edificação ocupa o centro visual da tela com enquadramento otimizado; a borda de terreno externo funciona como base discreta sem desperdício de espaço. |
| **CA-54** | Interatividade e Telemetria Funcionais | O operador clica no computador da recepção | Observa a resposta da interface | O equipamento é selecionado com realce sutil, a câmera focaliza a estação e o Drawer Lateral de Diagnósticos se abre exibindo as métricas reais (CPU, RAM, Disco, Hardware, Spooler). |
| **CA-55** | Escopo Restrito à Sala-Piloto | O operador inspeciona os outros ambientes da clínica | Verifica o estado das demais salas | Constata que a Recepção foi a única reformulada com o novo padrão artístico nesta fase, mantendo os outros setores neutros/estáveis aguardando aprovação explícita. |

---

## 29. Gate de Aprovação — FASE 1 (Ciclo #17)

O pipeline do Ciclo #17 encontra-se **pausado no Gate de Aprovação da Fase 1**.
Responda com **`Approved`** para que `@lead`, `@designer`, `@frontend` e `@engineer` iniciem a implementação da Sala-Piloto da Recepção no código-fonte!
