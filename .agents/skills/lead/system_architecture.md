# Skill: System Architecture

## Objetivo
Definir uma arquitetura modular, segura, escalavel e sustentavel para o RMM Ipojuca.

## Stack principal
- Backend: Node.js e Express.
- Comunicacao: Socket.io e APIs REST.
- Banco: MySQL.
- Frontend: React.
- Ambiente 3D: Three.js, React Three Fiber e Drei.
- Automacao: n8n.
- Infraestrutura: Docker.

## Principios arquiteturais
1. Separar claramente frontend, backend e agente Windows.
2. Manter responsabilidades independentes por modulo.
3. Definir contratos de comunicacao antes da implementacao.
4. Evitar dependencias circulares.
5. Priorizar seguranca, observabilidade e facilidade de manutencao.
6. Projetar os componentes considerando crescimento do parque tecnologico.

## Modulos obrigatorios
- Windows Agent: inventario e telemetria dos equipamentos.
- Backend: autenticacao, regras de negocio e processamento.
- Realtime: comunicacao e distribuicao de eventos.
- Database: persistencia e historico.
- Frontend: painel administrativo e diagnostico.
- Digital Twin: representacao visual das unidades e equipamentos.
- Automation: notificacoes e integracoes externas.

## Contratos de integracao
Documentar os endpoints, eventos WebSocket, formatos JSON, autenticacao, codigos de erro e regras de compatibilidade.

## Digital Twin
O ambiente 3D deve consumir dados reais da API. Cada equipamento deve possuir identificador persistente e associacao com unidade e setor.
Estados visuais devem refletir a telemetria recebida, sem confundir dados antigos com estados atuais.

## Documentacao
Produzir diagramas de arquitetura, contratos de integracao, decisoes arquiteturais e dependencias entre modulos.

## Validacao
- Todos os modulos possuem responsabilidades definidas.
- Os contratos estao documentados.
- Os requisitos de seguranca foram considerados.
- As decisoes sao compativeis com a especificacao aprovada.

## Restricoes
Nao alterar tecnologias ou contratos aprovados unilateralmente. Toda mudanca arquitetural relevante deve ser documentada e submetida a aprovacao.
