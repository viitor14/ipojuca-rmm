
@echo off
chcp 65001 >nul
title RMM Ipojuca - Skills Fundamentais
setlocal
set "S=.agents\skills"

if not exist "%S%\lead" mkdir "%S%\lead"
if not exist "%S%\security" mkdir "%S%\security"
if not exist "%S%\engineer" mkdir "%S%\engineer"

echo Criando Skills do Tech Lead...

:: LEAD - SYSTEM ARCHITECTURE
> "%S%\lead\system_architecture.md" echo # Skill: System Architecture
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Objetivo
>> "%S%\lead\system_architecture.md" echo Definir uma arquitetura modular, segura, escalavel e sustentavel para o RMM Ipojuca.
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Stack principal
>> "%S%\lead\system_architecture.md" echo - Backend: Node.js e Express.
>> "%S%\lead\system_architecture.md" echo - Comunicacao: Socket.io e APIs REST.
>> "%S%\lead\system_architecture.md" echo - Banco: MySQL.
>> "%S%\lead\system_architecture.md" echo - Frontend: React.
>> "%S%\lead\system_architecture.md" echo - Ambiente 3D: Three.js, React Three Fiber e Drei.
>> "%S%\lead\system_architecture.md" echo - Automacao: n8n.
>> "%S%\lead\system_architecture.md" echo - Infraestrutura: Docker.
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Principios arquiteturais
>> "%S%\lead\system_architecture.md" echo 1. Separar claramente frontend, backend e agente Windows.
>> "%S%\lead\system_architecture.md" echo 2. Manter responsabilidades independentes por modulo.
>> "%S%\lead\system_architecture.md" echo 3. Definir contratos de comunicacao antes da implementacao.
>> "%S%\lead\system_architecture.md" echo 4. Evitar dependencias circulares.
>> "%S%\lead\system_architecture.md" echo 5. Priorizar seguranca, observabilidade e facilidade de manutencao.
>> "%S%\lead\system_architecture.md" echo 6. Projetar os componentes considerando crescimento do parque tecnologico.
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Modulos obrigatorios
>> "%S%\lead\system_architecture.md" echo - Windows Agent: inventario e telemetria dos equipamentos.
>> "%S%\lead\system_architecture.md" echo - Backend: autenticacao, regras de negocio e processamento.
>> "%S%\lead\system_architecture.md" echo - Realtime: comunicacao e distribuicao de eventos.
>> "%S%\lead\system_architecture.md" echo - Database: persistencia e historico.
>> "%S%\lead\system_architecture.md" echo - Frontend: painel administrativo e diagnostico.
>> "%S%\lead\system_architecture.md" echo - Digital Twin: representacao visual das unidades e equipamentos.
>> "%S%\lead\system_architecture.md" echo - Automation: notificacoes e integracoes externas.
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Contratos de integracao
>> "%S%\lead\system_architecture.md" echo Documentar os endpoints, eventos WebSocket, formatos JSON, autenticacao, codigos de erro e regras de compatibilidade.
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Digital Twin
>> "%S%\lead\system_architecture.md" echo O ambiente 3D deve consumir dados reais da API. Cada equipamento deve possuir identificador persistente e associacao com unidade e setor.
>> "%S%\lead\system_architecture.md" echo Estados visuais devem refletir a telemetria recebida, sem confundir dados antigos com estados atuais.
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Documentacao
>> "%S%\lead\system_architecture.md" echo Produzir diagramas de arquitetura, contratos de integracao, decisoes arquiteturais e dependencias entre modulos.
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Validacao
>> "%S%\lead\system_architecture.md" echo - Todos os modulos possuem responsabilidades definidas.
>> "%S%\lead\system_architecture.md" echo - Os contratos estao documentados.
>> "%S%\lead\system_architecture.md" echo - Os requisitos de seguranca foram considerados.
>> "%S%\lead\system_architecture.md" echo - As decisoes sao compativeis com a especificacao aprovada.
>> "%S%\lead\system_architecture.md" echo.
>> "%S%\lead\system_architecture.md" echo ## Restricoes
>> "%S%\lead\system_architecture.md" echo Nao alterar tecnologias ou contratos aprovados unilateralmente. Toda mudanca arquitetural relevante deve ser documentada e submetida a aprovacao.

:: LEAD - TECHNICAL ORCHESTRATION

> "%S%\lead\technical_orchestration.md" echo # Skill: Technical Orchestration
>> "%S%\lead\technical_orchestration.md" echo.
>> "%S%\lead\technical_orchestration.md" echo ## Objetivo
>> "%S%\lead\technical_orchestration.md" echo Coordenar os especialistas e garantir que o desenvolvimento aconteca na ordem correta.
>> "%S%\lead\technical_orchestration.md" echo.
>> "%S%\lead\technical_orchestration.md" echo ## Regras de delegacao
>> "%S%\lead\technical_orchestration.md" echo - Consultar agents.md antes de delegar.
>> "%S%\lead\technical_orchestration.md" echo - Consultar a persona do especialista.
>> "%S%\lead\technical_orchestration.md" echo - Identificar a Skill correspondente.
>> "%S%\lead\technical_orchestration.md" echo - Definir objetivo, contexto e resultado esperado.
>> "%S%\lead\technical_orchestration.md" echo - Informar dependencias e restricoes.
>> "%S%\lead\technical_orchestration.md" echo.
>> "%S%\lead\technical_orchestration.md" echo ## Ordem de trabalho
>> "%S%\lead\technical_orchestration.md" echo 1. Requisitos com @pm.
>> "%S%\lead\technical_orchestration.md" echo 2. Seguranca inicial com @security.
>> "%S%\lead\technical_orchestration.md" echo 3. Arquitetura e contratos tecnicos.
>> "%S%\lead\technical_orchestration.md" echo 4. Banco de dados com @dba.
>> "%S%\lead\technical_orchestration.md" echo 5. Design com @designer.
>> "%S%\lead\technical_orchestration.md" echo 6. Implementacao com @engineer, @frontend e @n8n.
>> "%S%\lead\technical_orchestration.md" echo 7. Testes com @qa.
>> "%S%\lead\technical_orchestration.md" echo 8. Auditoria final com @security.
>> "%S%\lead\technical_orchestration.md" echo 9. Implantacao com @devops.
>> "%S%\lead\technical_orchestration.md" echo.
>> "%S%\lead\technical_orchestration.md" echo ## Trabalho paralelo
>> "%S%\lead\technical_orchestration.md" echo Permitir atividades paralelas somente quando as dependencias estiverem resolvidas e os contratos entre modulos estiverem definidos.
>> "%S%\lead\technical_orchestration.md" echo.
>> "%S%\lead\technical_orchestration.md" echo ## Controle de entregas
>> "%S%\lead\technical_orchestration.md" echo Toda entrega deve informar:
>> "%S%\lead\technical_orchestration.md" echo - Arquivos criados ou modificados.
>> "%S%\lead\technical_orchestration.md" echo - Objetivo da implementacao.
>> "%S%\lead\technical_orchestration.md" echo - Decisoes tecnicas.
>> "%S%\lead\technical_orchestration.md" echo - Dependencias.
>> "%S%\lead\technical_orchestration.md" echo - Testes realizados.
>> "%S%\lead\technical_orchestration.md" echo - Pendencias conhecidas.
>> "%S%\lead\technical_orchestration.md" echo.
>> "%S%\lead\technical_orchestration.md" echo ## Tratamento de conflitos
>> "%S%\lead\technical_orchestration.md" echo Quando dois especialistas apresentarem solucoes incompatíveis, solicitar justificativas tecnicas, comparar riscos e selecionar a alternativa que respeite os requisitos aprovados.
>> "%S%\lead\technical_orchestration.md" echo.
>> "%S%\lead\technical_orchestration.md" echo ## Gates
>> "%S%\lead\technical_orchestration.md" echo Nunca ultrapassar um ponto de aprovacao humana sem autorizacao explicita.
>> "%S%\lead\technical_orchestration.md" echo Nunca liberar producao sem validacao de QA, seguranca e autorizacao do utilizador.

echo Criando Skills de Security...

:: SECURITY - THREAT MODELING

> "%S%\security\threat_modeling.md" echo # Skill: Threat Modeling
>> "%S%\security\threat_modeling.md" echo.
>> "%S%\security\threat_modeling.md" echo ## Objetivo
>> "%S%\security\threat_modeling.md" echo Identificar ameacas antes da implementacao e estabelecer controles de seguranca para o RMM.
>> "%S%\security\threat_modeling.md" echo.
>> "%S%\security\threat_modeling.md" echo ## Metodologia
>> "%S%\security\threat_modeling.md" echo Utilizar STRIDE como metodologia principal de identificacao de ameacas.
>> "%S%\security\threat_modeling.md" echo.
>> "%S%\security\threat_modeling.md" echo ## Superficies de ataque
>> "%S%\security\threat_modeling.md" echo - APIs REST.
>> "%S%\security\threat_modeling.md" echo - Conexoes WebSocket.
>> "%S%\security\threat_modeling.md" echo - Agentes Windows.
>> "%S%\security\threat_modeling.md" echo - Autenticacao e sessoes.
>> "%S%\security\threat_modeling.md" echo - Banco de dados.
>> "%S%\security\threat_modeling.md" echo - Painel administrativo.
>> "%S%\security\threat_modeling.md" echo - Webhooks e integracoes n8n.
>> "%S%\security\threat_modeling.md" echo - Execucao de tarefas remotas.
>> "%S%\security\threat_modeling.md" echo.
>> "%S%\security\threat_modeling.md" echo ## Ameacas obrigatorias
>> "%S%\security\threat_modeling.md" echo - Falsificacao de identidade de agentes.
>> "%S%\security\threat_modeling.md" echo - Roubo de credenciais e tokens.
>> "%S%\security\threat_modeling.md" echo - Elevacao de privilegios.
>> "%S%\security\threat_modeling.md" echo - Injecao de comandos.
>> "%S%\security\threat_modeling.md" echo - Interceptacao de comunicacao.
>> "%S%\security\threat_modeling.md" echo - Manipulacao de telemetria.
>> "%S%\security\threat_modeling.md" echo - Acesso indevido a equipamentos.
>> "%S%\security\threat_modeling.md" echo - Abuso de funcionalidades administrativas.
>> "%S%\security\threat_modeling.md" echo.
>> "%S%\security\threat_modeling.md" echo ## Controles
>> "%S%\security\threat_modeling.md" echo Definir autenticacao forte, autorizacao por funcao, validacao de entradas, protecao de segredos, criptografia em transito e auditoria.
>> "%S%\security\threat_modeling.md" echo.
>> "%S%\security\threat_modeling.md" echo ## Classificacao
>> "%S%\security\threat_modeling.md" echo Classificar riscos como criticos, altos, medios ou baixos. Informar impacto, probabilidade, superficie afetada e mitigacao.
>> "%S%\security\threat_modeling.md" echo.
>> "%S%\security\threat_modeling.md" echo ## Entrega
>> "%S%\security\threat_modeling.md" echo Criar Security_Architecture.md com diagramas de fluxo, ameacas identificadas, controles e riscos residuais.
>> "%S%\security\threat_modeling.md" echo.
>> "%S%\security\threat_modeling.md" echo ## Restricoes
>> "%S%\security\threat_modeling.md" echo Nenhuma operacao remota pode ser liberada sem modelo de ameacas e controles definidos.

:: SECURITY - ENDPOINT SECURITY

> "%S%\security\endpoint_security.md" echo # Skill: Endpoint Security
>> "%S%\security\endpoint_security.md" echo.
>> "%S%\security\endpoint_security.md" echo ## Objetivo
>> "%S%\security\endpoint_security.md" echo Proteger os computadores Windows monitorados e a comunicacao entre os agentes e o servidor.
>> "%S%\security\endpoint_security.md" echo.
>> "%S%\security\endpoint_security.md" echo ## Identidade do agente
>> "%S%\security\endpoint_security.md" echo - Cada agente deve possuir identidade individual.
>> "%S%\security\endpoint_security.md" echo - Utilizar credenciais unicas e revogaveis.
>> "%S%\security\endpoint_security.md" echo - Implementar processo seguro de registro e provisionamento.
>> "%S%\security\endpoint_security.md" echo - Validar a identidade em cada conexao.
>> "%S%\security\endpoint_security.md" echo - Permitir revogacao de agentes comprometidos.
>> "%S%\security\endpoint_security.md" echo.
>> "%S%\security\endpoint_security.md" echo ## Comunicacao
>> "%S%\security\endpoint_security.md" echo - Utilizar TLS nas conexoes.
>> "%S%\security\endpoint_security.md" echo - Validar certificados e identidade do servidor.
>> "%S%\security\endpoint_security.md" echo - Proteger tokens contra exposicao.
>> "%S%\security\endpoint_security.md" echo - Impedir conexoes nao autenticadas.
>> "%S%\security\endpoint_security.md" echo - Aplicar limites de requisicoes e protecao contra abuso.
>> "%S%\security\endpoint_security.md" echo.
>> "%S%\security\endpoint_security.md" echo ## Principio de menor privilegio
>> "%S%\security\endpoint_security.md" echo O agente deve executar somente as tarefas necessarias para sua funcao. Separar coleta de monitoramento de operacoes administrativas.
>> "%S%\security\endpoint_security.md" echo.
>> "%S%\security\endpoint_security.md" echo ## Protecao do Windows
>> "%S%\security\endpoint_security.md" echo - Executar como servico Windows identificado.
>> "%S%\security\endpoint_security.md" echo - Evitar privilegios administrativos permanentes.
>> "%S%\security\endpoint_security.md" echo - Proteger arquivos de configuracao.
>> "%S%\security\endpoint_security.md" echo - Validar atualizacoes e integridade dos binarios.
>> "%S%\security\endpoint_security.md" echo - Registrar erros e eventos de seguranca.
>> "%S%\security\endpoint_security.md" echo - Nao ocultar o agente do administrador do equipamento.
>> "%S%\security\endpoint_security.md" echo.
>> "%S%\security\endpoint_security.md" echo ## Protecao de dados
>> "%S%\security\endpoint_security.md" echo Coletar somente dados necessarios ao monitoramento. Evitar coleta de documentos pessoais, conteudo de tela, senhas e dados de navegacao.
>> "%S%\security\endpoint_security.md" echo.
>> "%S%\security\endpoint_security.md" echo ## LGPD
>> "%S%\security\endpoint_security.md" echo Documentar finalidade, necessidade, acesso, retencao e descarte dos dados. Submeter decisoes juridicas e bases legais aos responsaveis institucionais.
>> "%S%\security\endpoint_security.md" echo.
>> "%S%\security\endpoint_security.md" echo ## Validacao
>> "%S%\security\endpoint_security.md" echo O agente deve continuar seguro mesmo quando perder comunicacao com o servidor. Nenhum comando pendente deve ser executado sem validacao de validade e autorizacao.

:: SECURITY - SECURITY AUDIT

> "%S%\security\security_audit.md" echo # Skill: Security Audit
>> "%S%\security\security_audit.md" echo.
>> "%S%\security\security_audit.md" echo ## Objetivo
>> "%S%\security\security_audit.md" echo Auditar a implementacao antes de homologacao e publicacao.
>> "%S%\security\security_audit.md" echo.
>> "%S%\security\security_audit.md" echo ## Areas de auditoria
>> "%S%\security\security_audit.md" echo - Autenticacao e gerenciamento de sessoes.
>> "%S%\security\security_audit.md" echo - Autorizacao e controle de acesso.
>> "%S%\security\security_audit.md" echo - APIs REST e WebSockets.
>> "%S%\security\security_audit.md" echo - Agentes Windows.
>> "%S%\security\security_audit.md" echo - Execucao remota.
>> "%S%\security\security_audit.md" echo - Banco de dados.
>> "%S%\security\security_audit.md" echo - Protecao de segredos.
>> "%S%\security\security_audit.md" echo - Logs e auditoria.
>> "%S%\security\security_audit.md" echo - Docker e infraestrutura.
>> "%S%\security\security_audit.md" echo.
>> "%S%\security\security_audit.md" echo ## Verificacoes obrigatorias
>> "%S%\security\security_audit.md" echo 1. Verificar autenticacao em todas as operacoes protegidas.
>> "%S%\security\security_audit.md" echo 2. Verificar autorizacao no servidor, nunca somente no frontend.
>> "%S%\security\security_audit.md" echo 3. Procurar credenciais e segredos expostos.
>> "%S%\security\security_audit.md" echo 4. Validar entradas e prevenir injecoes.
>> "%S%\security\security_audit.md" echo 5. Verificar protecao contra abuso de requisicoes.
>> "%S%\security\security_audit.md" echo 6. Verificar isolamento entre usuarios e equipamentos.
>> "%S%\security\security_audit.md" echo 7. Verificar integridade dos logs.
>> "%S%\security\security_audit.md" echo 8. Verificar protecao de dados armazenados e transmitidos.
>> "%S%\security\security_audit.md" echo.
>> "%S%\security\security_audit.md" echo ## Referencias
>> "%S%\security\security_audit.md" echo Utilizar OWASP ASVS, OWASP API Security Top 10 e boas praticas de seguranca de aplicacoes.
>> "%S%\security\security_audit.md" echo.
>> "%S%\security\security_audit.md" echo ## Relatorio
>> "%S%\security\security_audit.md" echo Criar Security_Audit_Report.md contendo:
>> "%S%\security\security_audit.md" echo - Vulnerabilidade.
>> "%S%\security\security_audit.md" echo - Severidade.
>> "%S%\security\security_audit.md" echo - Evidencia tecnica.
>> "%S%\security\security_audit.md" echo - Impacto.
>> "%S%\security\security_audit.md" echo - Correcao recomendada.
>> "%S%\security\security_audit.md" echo - Resultado da validacao.
>> "%S%\security\security_audit.md" echo.
>> "%S%\security\security_audit.md" echo ## Criterios de aprovacao
>> "%S%\security\security_audit.md" echo Vulnerabilidades criticas e altas devem ser corrigidas ou formalmente tratadas antes da liberacao. Riscos residuais devem ser documentados e aceitos pelo responsavel autorizado.
>> "%S%\security\security_audit.md" echo.
>> "%S%\security\security_audit.md" echo ## Restricoes
>> "%S%\security\security_audit.md" echo Executar auditorias somente em ambientes e equipamentos autorizados. Nao realizar testes destrutivos em producao.

echo Criando Skills do Engineer...

:: ENGINEER - BACKEND NODEJS

> "%S%\engineer\backend_nodejs.md" echo # Skill: Backend Node.js
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## Objetivo
>> "%S%\engineer\backend_nodejs.md" echo Desenvolver a API central do RMM com Node.js, Express e MySQL.
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## Tecnologias
>> "%S%\engineer\backend_nodejs.md" echo - Node.js com JavaScript.
>> "%S%\engineer\backend_nodejs.md" echo - Express.
>> "%S%\engineer\backend_nodejs.md" echo - MySQL.
>> "%S%\engineer\backend_nodejs.md" echo - Sequelize ou outra camada de persistencia aprovada.
>> "%S%\engineer\backend_nodejs.md" echo - Socket.io.
>> "%S%\engineer\backend_nodejs.md" echo - Axios para integracoes quando necessario.
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## Arquitetura
>> "%S%\engineer\backend_nodejs.md" echo Separar rotas, controllers, services, repositories, middlewares, validacoes e configuracoes.
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## Modulos
>> "%S%\engineer\backend_nodejs.md" echo - Autenticacao e usuarios.
>> "%S%\engineer\backend_nodejs.md" echo - Registro e identificacao de agentes.
>> "%S%\engineer\backend_nodejs.md" echo - Inventario de equipamentos.
>> "%S%\engineer\backend_nodejs.md" echo - Recebimento de heartbeat.
>> "%S%\engineer\backend_nodejs.md" echo - Recebimento e processamento de telemetria.
>> "%S%\engineer\backend_nodejs.md" echo - Alertas e incidentes.
>> "%S%\engineer\backend_nodejs.md" echo - Gerenciamento de comandos autorizados.
>> "%S%\engineer\backend_nodejs.md" echo - Integracao com n8n.
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## APIs
>> "%S%\engineer\backend_nodejs.md" echo Implementar contratos documentados pelo Tech Lead. Validar parametros, tipos, autenticacao, autorizacao e respostas de erro.
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## Telemetria
>> "%S%\engineer\backend_nodejs.md" echo - Validar identidade do agente.
>> "%S%\engineer\backend_nodejs.md" echo - Validar estrutura e versao do payload.
>> "%S%\engineer\backend_nodejs.md" echo - Registrar horario de recebimento e horario informado pela origem.
>> "%S%\engineer\backend_nodejs.md" echo - Rejeitar dados invalidos.
>> "%S%\engineer\backend_nodejs.md" echo - Controlar duplicidade e frequencia.
>> "%S%\engineer\backend_nodejs.md" echo - Identificar agentes desconectados por timeout.
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## Tempo real
>> "%S%\engineer\backend_nodejs.md" echo Autenticar conexoes Socket.io, associar cada conexao ao agente correspondente e validar autorizacao antes de distribuir eventos.
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## Qualidade
>> "%S%\engineer\backend_nodejs.md" echo Implementar logs estruturados, tratamento centralizado de erros, testes automatizados e validacao de configuracoes.
>> "%S%\engineer\backend_nodejs.md" echo.
>> "%S%\engineer\backend_nodejs.md" echo ## Restricoes
>> "%S%\engineer\backend_nodejs.md" echo Nunca confiar em dados enviados pelo cliente sem validacao. Nunca expor segredos. Nunca permitir que o frontend decida sozinho a autorizacao de uma operacao.

:: ENGINEER - WINDOWS AGENT

> "%S%\engineer\windows_agent.md" echo # Skill: Windows Agent
>> "%S%\engineer\windows_agent.md" echo.
>> "%S%\engineer\windows_agent.md" echo ## Objetivo
>> "%S%\engineer\windows_agent.md" echo Criar um servico Windows responsavel por inventario, monitoramento e comunicacao segura com o RMM.
>> "%S%\engineer\windows_agent.md" echo.
>> "%S%\engineer\windows_agent.md" echo ## Requisitos de funcionamento
>> "%S%\engineer\windows_agent.md" echo - Executar como servico Windows identificado e administravel.
>> "%S%\engineer\windows_agent.md" echo - Iniciar conforme politica institucional.
>> "%S%\engineer\windows_agent.md" echo - Suportar reconexao automatica.
>> "%S%\engineer\windows_agent.md" echo - Operar com consumo reduzido de recursos.
>> "%S%\engineer\windows_agent.md" echo - Registrar logs locais de funcionamento.
>> "%S%\engineer\windows_agent.md" echo - Permitir atualizacao segura e controlada.
>> "%S%\engineer\windows_agent.md" echo.
>> "%S%\engineer\windows_agent.md" echo ## Inventario
>> "%S%\engineer\windows_agent.md" echo Coletar somente informacoes necessarias:
>> "%S%\engineer\windows_agent.md" echo - Hostname e identificador do equipamento.
>> "%S%\engineer\windows_agent.md" echo - Fabricante e modelo.
>> "%S%\engineer\windows_agent.md" echo - Numero de serie quando disponivel.
>> "%S%\engineer\windows_agent.md" echo - Processador.
>> "%S%\engineer\windows_agent.md" echo - Memoria RAM.
>> "%S%\engineer\windows_agent.md" echo - Discos e capacidade.
>> "%S%\engineer\windows_agent.md" echo - Interfaces de rede.
>> "%S%\engineer\windows_agent.md" echo - Sistema operacional.
>> "%S%\engineer\windows_agent.md" echo - Endereco IP quando disponivel.
>> "%S%\engineer\windows_agent.md" echo.
>> "%S%\engineer\windows_agent.md" echo ## Telemetria
>> "%S%\engineer\windows_agent.md" echo Monitorar CPU, memoria, armazenamento, disponibilidade e indicadores de temperatura quando houver suporte confiavel do hardware.
>> "%S%\engineer\windows_agent.md" echo.
>> "%S%\engineer\windows_agent.md" echo ## Heartbeat
>> "%S%\engineer\windows_agent.md" echo - Enviar sinal periodico ao backend.
>> "%S%\engineer\windows_agent.md" echo - Informar versao do agente.
>> "%S%\engineer\windows_agent.md" echo - Informar horario da ultima coleta.
>> "%S%\engineer\windows_agent.md" echo - Aplicar reconexao com intervalo progressivo.
>> "%S%\engineer\windows_agent.md" echo - Evitar multiplas conexoes concorrentes.
>> "%S%\engineer\windows_agent.md" echo.
>> "%S%\engineer\windows_agent.md" echo ## Comunicacao
>> "%S%\engineer\windows_agent.md" echo Utilizar protocolo autenticado e criptografado. Validar mensagens recebidas e rejeitar comandos fora do contrato aprovado.
>> "%S%\engineer\windows_agent.md" echo.
>> "%S%\engineer\windows_agent.md" echo ## Estrutura interna
>> "%S%\engineer\windows_agent.md" echo Separar coleta, inventario, telemetria, comunicacao, configuracao, atualizacao e logs em modulos independentes.
>> "%S%\engineer\windows_agent.md" echo.
>> "%S%\engineer\windows_agent.md" echo ## Restricoes
>> "%S%\engineer\windows_agent.md" echo Nao coletar senhas, documentos pessoais ou conteudo de tela. Nao utilizar mecanismos de ocultacao. Nao executar comandos remotos arbitrarios. Respeitar as politicas do Security Guardian.

:: ENGINEER - REMOTE MANAGEMENT

> "%S%\engineer\remote_management.md" echo # Skill: Remote Management
>> "%S%\engineer\remote_management.md" echo.
>> "%S%\engineer\remote_management.md" echo ## Objetivo
>> "%S%\engineer\remote_management.md" echo Implementar gerenciamento remoto seguro, rastreavel e controlado dos computadores autorizados.
>> "%S%\engineer\remote_management.md" echo.
>> "%S%\engineer\remote_management.md" echo ## Principio central
>> "%S%\engineer\remote_management.md" echo Nenhum comando pode ser executado somente porque chegou ao agente. Toda operacao exige identidade valida, autorizacao, integridade e verificacao de politica.
>> "%S%\engineer\remote_management.md" echo.
>> "%S%\engineer\remote_management.md" echo ## Fluxo de autorizacao
>> "%S%\engineer\remote_management.md" echo 1. Operador autenticado solicita uma tarefa.
>> "%S%\engineer\remote_management.md" echo 2. Backend verifica permissao e escopo.
>> "%S%\engineer\remote_management.md" echo 3. Politica verifica tipo de tarefa e nivel de risco.
>> "%S%\engineer\remote_management.md" echo 4. Operacao sensivel exige aprovacao adicional.
>> "%S%\engineer\remote_management.md" echo 5. Backend cria tarefa com identificador unico.
>> "%S%\engineer\remote_management.md" echo 6. Agente valida origem, validade e integridade.
>> "%S%\engineer\remote_management.md" echo 7. Agente executa somente a tarefa permitida.
>> "%S%\engineer\remote_management.md" echo 8. Resultado e registrado e devolvido ao backend.
>> "%S%\engineer\remote_management.md" echo.
>> "%S%\engineer\remote_management.md" echo ## Catalogo de tarefas
>> "%S%\engineer\remote_management.md" echo Preferir operacoes predefinidas com parametros validados em vez de aceitar scripts livres.
>> "%S%\engineer\remote_management.md" echo Exemplos: consultar servico, verificar disco, limpar cache autorizado e reiniciar servico permitido.
>> "%S%\engineer\remote_management.md" echo.
>> "%S%\engineer\remote_management.md" echo ## Controles obrigatorios
>> "%S%\engineer\remote_management.md" echo - Lista de tarefas permitidas.
>> "%S%\engineer\remote_management.md" echo - Validacao rigorosa de parametros.
>> "%S%\engineer\remote_management.md" echo - Autorizacao por usuario e equipamento.
>> "%S%\engineer\remote_management.md" echo - Expiracao de tarefas.
>> "%S%\engineer\remote_management.md" echo - Protecao contra repeticao de comandos.
>> "%S%\engineer\remote_management.md" echo - Limite de execucoes concorrentes.
>> "%S%\engineer\remote_management.md" echo - Registro de operador e resultado.
>> "%S%\engineer\remote_management.md" echo - Cancelamento quando tecnicamente possivel.
>> "%S%\engineer\remote_management.md" echo.
>> "%S%\engineer\remote_management.md" echo ## Niveis de risco
>> "%S%\engineer\remote_management.md" echo Baixo: consultas sem alteracao no equipamento.
>> "%S%\engineer\remote_management.md" echo Medio: manutencao reversivel e autorizada.
>> "%S%\engineer\remote_management.md" echo Alto: alteracoes administrativas com aprovacao explicita.
>> "%S%\engineer\remote_management.md" echo Critico: operacoes destrutivas ou de alto impacto devem ser bloqueadas por padrao.
>> "%S%\engineer\remote_management.md" echo.
>> "%S%\engineer\remote_management.md" echo ## Auditoria
>> "%S%\engineer\remote_management.md" echo Registrar solicitante, equipamento, tarefa, parametros permitidos, aprovacao, horario, status e resultado.
>> "%S%\engineer\remote_management.md" echo Nunca registrar senhas, tokens ou dados sensiveis nos logs.
>> "%S%\engineer\remote_management.md" echo.
>> "%S%\engineer\remote_management.md" echo ## Restricoes
>> "%S%\engineer\remote_management.md" echo Nao implementar terminal irrestrito, execucao arbitraria de PowerShell ou mecanismos para contornar controles do Windows. Operacoes devem ocorrer somente em equipamentos institucionalmente autorizados.

echo.
echo ==========================================
echo 8 SKILLS FUNDAMENTAIS CRIADAS!
echo ==========================================
echo.
echo Tech Lead: 2 Skills
echo Security: 3 Skills
echo Engineer: 3 Skills
echo.
echo Local: .agents\skills\
echo.
pause
