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

## 9. Gate de Aprovação — FASE 1 (Ciclo #04)

Conforme definido em `.agents/workflows/startcycle.md`:
- O pipeline encontra-se **pausado no Gate de Aprovação da Fase 1**.
- Responda **`Approved`** para aprovar esta especificação e autorizar o desenvolvimento imediato do sistema de Auto-Update OTA + Botão de Atualização Remota no Painel e no Agente Windows.


