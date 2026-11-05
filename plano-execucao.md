# Plano de Execução: Sistema RMM (Remote Monitoring & Management) com Digital Twin

## 1. Visão Geral do Projeto

Desenvolver um sistema RMM proativo para o parque tecnológico das unidades de saúde (USFs, Policlínica, CAPS). O diferencial deste sistema será a integração de um "Digital Twin" (Mapa 3D) das unidades, automação de chamados de suporte via IA/WhatsApp e capacidade de execução remota de scripts (Command & Control).

## 2. Inovações e Arquitetura Avançada

### Inovação A: Digital Twin e Mapa 3D (Frontend)

- **Tecnologia:** React + React Three Fiber / Drei.
- **Descrição:** Em vez de apenas tabelas de dados, o painel deve renderizar uma planta 3D simplificada. Cada computador será um objeto/avatar 3D no mapa.
- **Comportamento:** Se a API detetar que um computador está com problemas (ex: CPU a 100% ou falha de disco), o objeto 3D dessa máquina piscará a vermelho em tempo real no mapa, permitindo clique para abrir o diagnóstico detalhado.

### Inovação B: Abertura Autônoma de Tickets (Backend + n8n)

- **Tecnologia:** Node.js, Axios, Webhooks.
- **Descrição:** O backend deve monitorizar as métricas de "saúde" recebidas do agente (uso de disco, memória, temperatura).
- **Comportamento:** Ao atingir níveis críticos (ex: HD > 95%), a API dispara um payload JSON para um Webhook do n8n. O n8n ficará encarregue de notificar a equipa de TI no WhatsApp (com a unidade, setor e problema) e registar o ticket automaticamente, sem o utilizador final precisar de ligar para o suporte.

### Inovação C: Terminal Remoto e Execução Silenciosa (Agente + Backend)

- **Tecnologia:** WebSockets (Socket.io) ligando o Frontend, Backend e o Agente Windows.
- **Descrição:** O agente no Windows não deve apenas "falar", mas também "ouvir".
- **Comportamento:** A partir do dashboard web, a equipa de TI poderá enviar comandos em PowerShell ou pequenos scripts de manutenção (ex: limpar cache, instalar impressora silenciosamente, reiniciar serviço). O backend reencaminha a ordem via WebSocket, o agente executa na máquina remota e devolve o log de sucesso ao painel.

## 3. Especificações Técnicas por Módulo

### Módulo 1: Agente (Client-Side - Windows)

- Empacotado como executável (.exe) invisível (via `pkg` ou similar).
- **Coleta Contínua:** Utiliza `child_process` para ler Hostname, Modelo, Serial, MAC, IP, Processador, RAM, Tipo/Tamanho de Disco e Versão do Windows.
- **Listener:** Conexão WebSocket aberta para receber e executar comandos do servidor (Inovação C).

### Módulo 2: Backend (API REST e WebSocket)

- **Tecnologias:** Node.js (Express), Socket.io, MySQL.
- **Rotas:**
  - `POST /api/heartbeat`: Recebe dados e atualiza (Upsert) o estado da máquina.
  - `POST /api/command`: Rota para o painel web disparar scripts para um agente específico.
- **Base de Dados:** MySQL para guardar o histórico de telemetria e o mapeamento de qual máquina pertence a qual Unidade/Setor no mapa 3D.

### Módulo 3: Infraestrutura (Docker)

- `docker-compose.yml` preparado para orquestrar o Backend Node.js e a base de dados MySQL de forma isolada e pronta para produção.
