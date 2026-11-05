# Skill: Backend Node.js

## Objetivo
Desenvolver a API central do RMM com Node.js, Express e MySQL.

## Tecnologias
- Node.js com JavaScript.
- Express.
- MySQL.
- Sequelize ou outra camada de persistencia aprovada.
- Socket.io.
- Axios para integracoes quando necessario.

## Arquitetura
Separar rotas, controllers, services, repositories, middlewares, validacoes e configuracoes.

## Modulos
- Autenticacao e usuarios.
- Registro e identificacao de agentes.
- Inventario de equipamentos.
- Recebimento de heartbeat.
- Recebimento e processamento de telemetria.
- Alertas e incidentes.
- Gerenciamento de comandos autorizados.
- Integracao com n8n.

## APIs
Implementar contratos documentados pelo Tech Lead. Validar parametros, tipos, autenticacao, autorizacao e respostas de erro.

## Telemetria
- Validar identidade do agente.
- Validar estrutura e versao do payload.
- Registrar horario de recebimento e horario informado pela origem.
- Rejeitar dados invalidos.
- Controlar duplicidade e frequencia.
- Identificar agentes desconectados por timeout.

## Tempo real
Autenticar conexoes Socket.io, associar cada conexao ao agente correspondente e validar autorizacao antes de distribuir eventos.

## Qualidade
Implementar logs estruturados, tratamento centralizado de erros, testes automatizados e validacao de configuracoes.

## Restricoes
Nunca confiar em dados enviados pelo cliente sem validacao. Nunca expor segredos. Nunca permitir que o frontend decida sozinho a autorizacao de uma operacao.
