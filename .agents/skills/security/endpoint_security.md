# Skill: Endpoint Security

## Objetivo
Proteger os computadores Windows monitorados e a comunicacao entre os agentes e o servidor.

## Identidade do agente
- Cada agente deve possuir identidade individual.
- Utilizar credenciais unicas e revogaveis.
- Implementar processo seguro de registro e provisionamento.
- Validar a identidade em cada conexao.
- Permitir revogacao de agentes comprometidos.

## Comunicacao
- Utilizar TLS nas conexoes.
- Validar certificados e identidade do servidor.
- Proteger tokens contra exposicao.
- Impedir conexoes nao autenticadas.
- Aplicar limites de requisicoes e protecao contra abuso.

## Principio de menor privilegio
O agente deve executar somente as tarefas necessarias para sua funcao. Separar coleta de monitoramento de operacoes administrativas.

## Protecao do Windows
- Executar como servico Windows identificado.
- Evitar privilegios administrativos permanentes.
- Proteger arquivos de configuracao.
- Validar atualizacoes e integridade dos binarios.
- Registrar erros e eventos de seguranca.
- Nao ocultar o agente do administrador do equipamento.

## Protecao de dados
Coletar somente dados necessarios ao monitoramento. Evitar coleta de documentos pessoais, conteudo de tela, senhas e dados de navegacao.

## LGPD
Documentar finalidade, necessidade, acesso, retencao e descarte dos dados. Submeter decisoes juridicas e bases legais aos responsaveis institucionais.

## Validacao
O agente deve continuar seguro mesmo quando perder comunicacao com o servidor. Nenhum comando pendente deve ser executado sem validacao de validade e autorizacao.
