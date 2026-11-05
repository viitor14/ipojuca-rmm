
@echo off
chcp 65001 >nul
setlocal

echo Criando as Skills dos demais especialistas...

REM ==========================================
REM PM - PRODUCT MANAGER
REM ==========================================

mkdir ".agents\skills\pm" 2>nul

> ".agents\skills\pm\product_requirements.md" echo # Product Requirements
>> ".agents\skills\pm\product_requirements.md" echo.
>> ".agents\skills\pm\product_requirements.md" echo ## Objetivo
>> ".agents\skills\pm\product_requirements.md" echo Transformar necessidades do RMM em requisitos funcionais e nao funcionais.
>> ".agents\skills\pm\product_requirements.md" echo.
>> ".agents\skills\pm\product_requirements.md" echo ## Responsabilidades
>> ".agents\skills\pm\product_requirements.md" echo - Identificar usuarios e suas necessidades.
>> ".agents\skills\pm\product_requirements.md" echo - Definir funcionalidades do dashboard e dos agentes Windows.
>> ".agents\skills\pm\product_requirements.md" echo - Descrever fluxos de monitoramento e gerenciamento remoto.
>> ".agents\skills\pm\product_requirements.md" echo - Definir prioridades e regras de negocio.
>> ".agents\skills\pm\product_requirements.md" echo - Considerar autorizacao, LGPD e seguranca operacional.
>> ".agents\skills\pm\product_requirements.md" echo.
>> ".agents\skills\pm\product_requirements.md" echo ## Entrega
>> ".agents\skills\pm\product_requirements.md" echo Produzir especificacao funcional clara, organizada e validavel.

> ".agents\skills\pm\acceptance_criteria.md" echo # Acceptance Criteria
>> ".agents\skills\pm\acceptance_criteria.md" echo.
>> ".agents\skills\pm\acceptance_criteria.md" echo ## Objetivo
>> ".agents\skills\pm\acceptance_criteria.md" echo Definir criterios objetivos para validar cada funcionalidade do RMM.
>> ".agents\skills\pm\acceptance_criteria.md" echo.
>> ".agents\skills\pm\acceptance_criteria.md" echo ## Responsabilidades
>> ".agents\skills\pm\acceptance_criteria.md" echo - Criar criterios de aceite para cada requisito.
>> ".agents\skills\pm\acceptance_criteria.md" echo - Descrever cenarios de sucesso e falha.
>> ".agents\skills\pm\acceptance_criteria.md" echo - Definir regras de permissao e acesso.
>> ".agents\skills\pm\acceptance_criteria.md" echo - Considerar indisponibilidade de rede e falhas dos agentes.
>> ".agents\skills\pm\acceptance_criteria.md" echo - Garantir que cada requisito possa ser testado.
>> ".agents\skills\pm\acceptance_criteria.md" echo.
>> ".agents\skills\pm\acceptance_criteria.md" echo ## Entrega
>> ".agents\skills\pm\acceptance_criteria.md" echo Lista de criterios verificaveis para orientar desenvolvimento e QA.

REM ==========================================
REM DBA - DATABASE ARCHITECT
REM ==========================================

mkdir ".agents\skills\dba" 2>nul

> ".agents\skills\dba\data_modeling.md" echo # Data Modeling
>> ".agents\skills\dba\data_modeling.md" echo.
>> ".agents\skills\dba\data_modeling.md" echo ## Objetivo
>> ".agents\skills\dba\data_modeling.md" echo Projetar a estrutura de dados MySQL do sistema RMM.
>> ".agents\skills\dba\data_modeling.md" echo.
>> ".agents\skills\dba\data_modeling.md" echo ## Responsabilidades
>> ".agents\skills\dba\data_modeling.md" echo - Modelar unidades, computadores, agentes e usuarios.
>> ".agents\skills\dba\data_modeling.md" echo - Modelar metricas, alertas, tarefas e historico de eventos.
>> ".agents\skills\dba\data_modeling.md" echo - Definir chaves, relacionamentos e restricoes.
>> ".agents\skills\dba\data_modeling.md" echo - Criar migrations versionadas.
>> ".agents\skills\dba\data_modeling.md" echo - Aplicar principios de minimizacao e protecao de dados.
>> ".agents\skills\dba\data_modeling.md" echo.
>> ".agents\skills\dba\data_modeling.md" echo ## Entrega
>> ".agents\skills\dba\data_modeling.md" echo Modelo entidade relacionamento e estrutura SQL documentada.

> ".agents\skills\dba\database_performance.md" echo # Database Performance
>> ".agents\skills\dba\database_performance.md" echo.
>> ".agents\skills\dba\database_performance.md" echo ## Objetivo
>> ".agents\skills\dba\database_performance.md" echo Garantir desempenho, integridade e confiabilidade do MySQL.
>> ".agents\skills\dba\database_performance.md" echo.
>> ".agents\skills\dba\database_performance.md" echo ## Responsabilidades
>> ".agents\skills\dba\database_performance.md" echo - Avaliar indices e consultas SQL.
>> ".agents\skills\dba\database_performance.md" echo - Evitar consultas repetitivas e carregamento excessivo.
>> ".agents\skills\dba\database_performance.md" echo - Planejar retencao de metricas e historicos.
>> ".agents\skills\dba\database_performance.md" echo - Avaliar backups e restauracao.
>> ".agents\skills\dba\database_performance.md" echo - Prevenir acesso indevido e exposicao de dados.
>> ".agents\skills\dba\database_performance.md" echo.
>> ".agents\skills\dba\database_performance.md" echo ## Entrega
>> ".agents\skills\dba\database_performance.md" echo Relatorio de desempenho e recomendacoes tecnicas.

REM ==========================================
REM DESIGNER - UI UX
REM ==========================================

mkdir ".agents\skills\designer" 2>nul

> ".agents\skills\designer\design_system.md" echo # Design System
>> ".agents\skills\designer\design_system.md" echo.
>> ".agents\skills\designer\design_system.md" echo ## Objetivo
>> ".agents\skills\designer\design_system.md" echo Criar uma identidade visual consistente para o RMM.
>> ".agents\skills\designer\design_system.md" echo.
>> ".agents\skills\designer\design_system.md" echo ## Diretrizes
>> ".agents\skills\designer\design_system.md" echo - Criar identidade moderna, profissional e minimalista.
>> ".agents\skills\designer\design_system.md" echo - Evitar layouts genericos com aparencia de template de IA.
>> ".agents\skills\designer\design_system.md" echo - Definir cores, tipografia, espacamentos e componentes.
>> ".agents\skills\designer\design_system.md" echo - Garantir consistencia entre todas as telas.
>> ".agents\skills\designer\design_system.md" echo - Priorizar legibilidade e acessibilidade.
>> ".agents\skills\designer\design_system.md" echo.
>> ".agents\skills\designer\design_system.md" echo ## Entrega
>> ".agents\skills\designer\design_system.md" echo Guia visual e especificacao dos componentes da interface.

> ".agents\skills\designer\ux_dashboard.md" echo # UX Dashboard
>> ".agents\skills\designer\ux_dashboard.md" echo.
>> ".agents\skills\designer\ux_dashboard.md" echo ## Objetivo
>> ".agents\skills\designer\ux_dashboard.md" echo Projetar uma experiencia eficiente para a equipe de TI.
>> ".agents\skills\designer\ux_dashboard.md" echo.
>> ".agents\skills\designer\ux_dashboard.md" echo ## Responsabilidades
>> ".agents\skills\designer\ux_dashboard.md" echo - Organizar telas de unidades e computadores.
>> ".agents\skills\designer\ux_dashboard.md" echo - Facilitar identificacao de falhas e alertas.
>> ".agents\skills\designer\ux_dashboard.md" echo - Planejar navegacao e detalhes do equipamento.
>> ".agents\skills\designer\ux_dashboard.md" echo - Diferenciar estados normal, alerta, critico e offline.
>> ".agents\skills\designer\ux_dashboard.md" echo - Projetar para desktop e telas menores.
>> ".agents\skills\designer\ux_dashboard.md" echo.
>> ".agents\skills\designer\ux_dashboard.md" echo ## Entrega
>> ".agents\skills\designer\ux_dashboard.md" echo Fluxos de navegacao e especificacoes das telas.

REM ==========================================
REM FRONTEND - REACT E DIGITAL TWIN
REM ==========================================

mkdir ".agents\skills\frontend" 2>nul

> ".agents\skills\frontend\react_dashboard.md" echo # React Dashboard
>> ".agents\skills\frontend\react_dashboard.md" echo.
>> ".agents\skills\frontend\react_dashboard.md" echo ## Objetivo
>> ".agents\skills\frontend\react_dashboard.md" echo Desenvolver o dashboard web utilizando React e JavaScript.
>> ".agents\skills\frontend\react_dashboard.md" echo.
>> ".agents\skills\frontend\react_dashboard.md" echo ## Responsabilidades
>> ".agents\skills\frontend\react_dashboard.md" echo - Utilizar componentes reutilizaveis.
>> ".agents\skills\frontend\react_dashboard.md" echo - Integrar a API Node.js e comunicacao em tempo real.
>> ".agents\skills\frontend\react_dashboard.md" echo - Implementar autenticacao e controle de permissao na interface.
>> ".agents\skills\frontend\react_dashboard.md" echo - Apresentar metricas, alertas e historicos.
>> ".agents\skills\frontend\react_dashboard.md" echo - Utilizar Styled Components para estilizacao.
>> ".agents\skills\frontend\react_dashboard.md" echo - Tratar carregamento, erros e indisponibilidade.
>> ".agents\skills\frontend\react_dashboard.md" echo.
>> ".agents\skills\frontend\react_dashboard.md" echo ## Entrega
>> ".agents\skills\frontend\react_dashboard.md" echo Dashboard funcional, responsivo e integrado ao backend.

> ".agents\skills\frontend\digital_twin_3d.md" echo # Digital Twin 3D
>> ".agents\skills\frontend\digital_twin_3d.md" echo.
>> ".agents\skills\frontend\digital_twin_3d.md" echo ## Objetivo
>> ".agents\skills\frontend\digital_twin_3d.md" echo Criar a representacao tridimensional das unidades e equipamentos.
>> ".agents\skills\frontend\digital_twin_3d.md" echo.
>> ".agents\skills\frontend\digital_twin_3d.md" echo ## Tecnologias
>> ".agents\skills\frontend\digital_twin_3d.md" echo React Three Fiber e Drei.
>> ".agents\skills\frontend\digital_twin_3d.md" echo.
>> ".agents\skills\frontend\digital_twin_3d.md" echo ## Responsabilidades
>> ".agents\skills\frontend\digital_twin_3d.md" echo - Representar unidades, salas e computadores em 3D.
>> ".agents\skills\frontend\digital_twin_3d.md" echo - Associar cada objeto ao equipamento real correspondente.
>> ".agents\skills\frontend\digital_twin_3d.md" echo - Exibir estados de saude e conectividade.
>> ".agents\skills\frontend\digital_twin_3d.md" echo - Destacar alertas criticos sem prejudicar a leitura.
>> ".agents\skills\frontend\digital_twin_3d.md" echo - Permitir selecionar equipamentos e abrir seus diagnosticos.
>> ".agents\skills\frontend\digital_twin_3d.md" echo - Otimizar renderizacao e consumo de memoria.
>> ".agents\skills\frontend\digital_twin_3d.md" echo.
>> ".agents\skills\frontend\digital_twin_3d.md" echo ## Entrega
>> ".agents\skills\frontend\digital_twin_3d.md" echo Ambiente 3D integrado aos dados reais do sistema.

REM ==========================================
REM QA - QUALITY ASSURANCE
REM ==========================================

mkdir ".agents\skills\qa" 2>nul

> ".agents\skills\qa\test_strategy.md" echo # Test Strategy
>> ".agents\skills\qa\test_strategy.md" echo.
>> ".agents\skills\qa\test_strategy.md" echo ## Objetivo
>> ".agents\skills\qa\test_strategy.md" echo Definir estrategias de testes para todos os modulos do RMM.
>> ".agents\skills\qa\test_strategy.md" echo.
>> ".agents\skills\qa\test_strategy.md" echo ## Responsabilidades
>> ".agents\skills\qa\test_strategy.md" echo - Criar testes unitarios e de integracao.
>> ".agents\skills\qa\test_strategy.md" echo - Testar API, banco, agente Windows e dashboard.
>> ".agents\skills\qa\test_strategy.md" echo - Validar comunicacao em tempo real.
>> ".agents\skills\qa\test_strategy.md" echo - Simular desconexao e recuperacao de agentes.
>> ".agents\skills\qa\test_strategy.md" echo - Testar permissoes e cenarios de acesso indevido.
>> ".agents\skills\qa\test_strategy.md" echo.
>> ".agents\skills\qa\test_strategy.md" echo ## Entrega
>> ".agents\skills\qa\test_strategy.md" echo Plano de testes e relatorios dos resultados.

> ".agents\skills\qa\quality_audit.md" echo # Quality Audit
>> ".agents\skills\qa\quality_audit.md" echo.
>> ".agents\skills\qa\quality_audit.md" echo ## Objetivo
>> ".agents\skills\qa\quality_audit.md" echo Auditar a qualidade antes de aprovar entregas.
>> ".agents\skills\qa\quality_audit.md" echo.
>> ".agents\skills\qa\quality_audit.md" echo ## Responsabilidades
>> ".agents\skills\qa\quality_audit.md" echo - Revisar legibilidade e organizacao do codigo.
>> ".agents\skills\qa\quality_audit.md" echo - Identificar bugs e problemas de integracao.
>> ".agents\skills\qa\quality_audit.md" echo - Verificar criterios de aceite.
>> ".agents\skills\qa\quality_audit.md" echo - Registrar falhas por severidade.
>> ".agents\skills\qa\quality_audit.md" echo - Bloquear entregas com falhas criticas ou vulnerabilidades.
>> ".agents\skills\qa\quality_audit.md" echo.
>> ".agents\skills\qa\quality_audit.md" echo ## Entrega
>> ".agents\skills\qa\quality_audit.md" echo Relatorio de auditoria com aprovacao ou reprovacao.

REM ==========================================
REM DEVOPS
REM ==========================================

mkdir ".agents\skills\devops" 2>nul

> ".agents\skills\devops\docker_deployment.md" echo # Docker Deployment
>> ".agents\skills\devops\docker_deployment.md" echo.
>> ".agents\skills\devops\docker_deployment.md" echo ## Objetivo
>> ".agents\skills\devops\docker_deployment.md" echo Preparar ambientes reproduziveis e implantacao do RMM.
>> ".agents\skills\devops\docker_deployment.md" echo.
>> ".agents\skills\devops\docker_deployment.md" echo ## Responsabilidades
>> ".agents\skills\devops\docker_deployment.md" echo - Configurar Dockerfiles e Docker Compose.
>> ".agents\skills\devops\docker_deployment.md" echo - Configurar backend e MySQL.
>> ".agents\skills\devops\docker_deployment.md" echo - Separar ambientes de desenvolvimento e producao.
>> ".agents\skills\devops\docker_deployment.md" echo - Gerenciar variaveis e segredos fora do codigo.
>> ".agents\skills\devops\docker_deployment.md" echo - Planejar atualizacao, backup e rollback.
>> ".agents\skills\devops\docker_deployment.md" echo - Aplicar TLS e configuracoes seguras de rede.
>> ".agents\skills\devops\docker_deployment.md" echo.
>> ".agents\skills\devops\docker_deployment.md" echo ## Entrega
>> ".agents\skills\devops\docker_deployment.md" echo Ambiente documentado e procedimento de implantacao.

> ".agents\skills\devops\observability.md" echo # Observability
>> ".agents\skills\devops\observability.md" echo.
>> ".agents\skills\devops\observability.md" echo ## Objetivo
>> ".agents\skills\devops\observability.md" echo Garantir visibilidade sobre a saude da infraestrutura do RMM.
>> ".agents\skills\devops\observability.md" echo.
>> ".agents\skills\devops\observability.md" echo ## Responsabilidades
>> ".agents\skills\devops\observability.md" echo - Centralizar logs de aplicacao e servicos.
>> ".agents\skills\devops\observability.md" echo - Monitorar disponibilidade da API e banco.
>> ".agents\skills\devops\observability.md" echo - Monitorar falhas de comunicacao.
>> ".agents\skills\devops\observability.md" echo - Definir alertas operacionais.
>> ".agents\skills\devops\observability.md" echo - Evitar registrar senhas, tokens e dados pessoais desnecessarios.
>> ".agents\skills\devops\observability.md" echo.
>> ".agents\skills\devops\observability.md" echo ## Entrega
>> ".agents\skills\devops\observability.md" echo Estrategia de logs, metricas, alertas e diagnostico.

REM ==========================================
REM N8N - AUTOMACAO
REM ==========================================

mkdir ".agents\skills\n8n" 2>nul

> ".agents\skills\n8n\workflow_automation.md" echo # Workflow Automation
>> ".agents\skills\n8n\workflow_automation.md" echo.
>> ".agents\skills\n8n\workflow_automation.md" echo ## Objetivo
>> ".agents\skills\n8n\workflow_automation.md" echo Automatizar processos operacionais usando n8n.
>> ".agents\skills\n8n\workflow_automation.md" echo.
>> ".agents\skills\n8n\workflow_automation.md" echo ## Responsabilidades
>> ".agents\skills\n8n\workflow_automation.md" echo - Criar fluxos acionados por webhooks.
>> ".agents\skills\n8n\workflow_automation.md" echo - Integrar alertas do backend ao sistema de chamados.
>> ".agents\skills\n8n\workflow_automation.md" echo - Tratar erros, repeticoes e falhas de integracao.
>> ".agents\skills\n8n\workflow_automation.md" echo - Evitar abertura duplicada de chamados.
>> ".agents\skills\n8n\workflow_automation.md" echo - Proteger credenciais e validar dados recebidos.
>> ".agents\skills\n8n\workflow_automation.md" echo.
>> ".agents\skills\n8n\workflow_automation.md" echo ## Entrega
>> ".agents\skills\n8n\workflow_automation.md" echo Fluxos documentados, testados e preparados para operacao.

> ".agents\skills\n8n\whatsapp_integration.md" echo # WhatsApp Integration
>> ".agents\skills\n8n\whatsapp_integration.md" echo.
>> ".agents\skills\n8n\whatsapp_integration.md" echo ## Objetivo
>> ".agents\skills\n8n\whatsapp_integration.md" echo Integrar notificacoes do RMM ao canal de atendimento da equipe de TI.
>> ".agents\skills\n8n\whatsapp_integration.md" echo.
>> ".agents\skills\n8n\whatsapp_integration.md" echo ## Responsabilidades
>> ".agents\skills\n8n\whatsapp_integration.md" echo - Definir o provedor autorizado de integracao.
>> ".agents\skills\n8n\whatsapp_integration.md" echo - Enviar notificacoes de alertas e chamados.
>> ".agents\skills\n8n\whatsapp_integration.md" echo - Incluir unidade, equipamento, horario e gravidade.
>> ".agents\skills\n8n\whatsapp_integration.md" echo - Evitar expor informacoes sensiveis nas mensagens.
>> ".agents\skills\n8n\whatsapp_integration.md" echo - Tratar falhas de envio e registrar resultados.
>> ".agents\skills\n8n\whatsapp_integration.md" echo.
>> ".agents\skills\n8n\whatsapp_integration.md" echo ## Entrega
>> ".agents\skills\n8n\whatsapp_integration.md" echo Integracao documentada e validada com o fluxo de alertas.

echo.
echo ==========================================
echo 14 SKILLS CRIADAS COM SUCESSO!
echo ==========================================
echo.
echo PM: 2 Skills
echo DBA: 2 Skills
echo Designer: 2 Skills
echo Frontend: 2 Skills
echo QA: 2 Skills
echo DevOps: 2 Skills
echo n8n: 2 Skills
echo.
echo Local: .agents\skills\
echo.
pause
