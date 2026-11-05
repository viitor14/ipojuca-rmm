# Skill: Threat Modeling

## Objetivo
Identificar ameacas antes da implementacao e estabelecer controles de seguranca para o RMM.

## Metodologia
Utilizar STRIDE como metodologia principal de identificacao de ameacas.

## Superficies de ataque
- APIs REST.
- Conexoes WebSocket.
- Agentes Windows.
- Autenticacao e sessoes.
- Banco de dados.
- Painel administrativo.
- Webhooks e integracoes n8n.
- Execucao de tarefas remotas.

## Ameacas obrigatorias
- Falsificacao de identidade de agentes.
- Roubo de credenciais e tokens.
- Elevacao de privilegios.
- Injecao de comandos.
- Interceptacao de comunicacao.
- Manipulacao de telemetria.
- Acesso indevido a equipamentos.
- Abuso de funcionalidades administrativas.

## Controles
Definir autenticacao forte, autorizacao por funcao, validacao de entradas, protecao de segredos, criptografia em transito e auditoria.

## Classificacao
Classificar riscos como criticos, altos, medios ou baixos. Informar impacto, probabilidade, superficie afetada e mitigacao.

## Entrega
Criar Security_Architecture.md com diagramas de fluxo, ameacas identificadas, controles e riscos residuais.

## Restricoes
Nenhuma operacao remota pode ser liberada sem modelo de ameacas e controles definidos.
