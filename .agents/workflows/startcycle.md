---
description: Inicia e coordena o pipeline autonomo de desenvolvimento do RMM Ipojuca utilizando os agentes especialistas e suas Skills.
---

# STARTCYCLE — RMM IPOJUCA

## Pipeline Autônomo de Desenvolvimento

### 1. Objetivo

Orquestrar o desenvolvimento do RMM Ipojuca utilizando os especialistas definidos em `.agents/agents.md` e suas respectivas Skills em `.agents/skills/`.

O sistema deve trabalhar por etapas, com entregas documentadas, validações e aprovações explícitas do usuário.

**Comando de inicialização:**

`/startcycle <ideia ou funcionalidade>`

Ao receber o comando, o @lead assume a orquestração.

---

### 2. Regras obrigatórias

1. Consultar `.agents/agents.md` antes de iniciar.
2. Consultar as Skills do especialista responsável antes de executar qualquer tarefa.
3. Não inventar requisitos ou funcionalidades sem justificativa.
4. Não iniciar implementação antes da aprovação da especificação.
5. Não avançar etapas que dependam de uma aprovação ainda não concedida.
6. Preservar a arquitetura e as tecnologias já aprovadas.
7. Documentar decisões técnicas e alterações importantes.
8. Não sobrescrever arquivos existentes sem antes analisar seu conteúdo.
9. Não criar funcionalidades fora do escopo aprovado.
10. Em caso de dúvida relevante, consultar o usuário.

---

### 3. Sequência oficial do pipeline

#### FASE 1 — Análise e especificação

**Responsável:** @pm  
**Skills:**

- `pm/product_requirements.md`
- `pm/acceptance_criteria.md`

Atividades:

- Analisar a ideia apresentada.
- Identificar objetivos e usuários.
- Definir funcionalidades e regras de negócio.
- Identificar requisitos funcionais e não funcionais.
- Definir critérios de aceitação.
- Identificar dependências e limitações.

Entrega:

`production_artifacts/Technical_Specification.md`

**GATE DE APROVAÇÃO:**

Após apresentar a especificação, interromper o pipeline.

Aguardar o usuário responder explicitamente `Approved`.

Se houver alterações solicitadas, revisar a especificação e aguardar nova aprovação.

Nenhuma implementação pode começar antes desse momento.

---

#### FASE 2 — Arquitetura e orquestração

**Responsável:** @lead  
**Skills:**

- `lead/system_architecture.md`
- `lead/technical_orchestration.md`

Atividades:

- Definir a arquitetura dos módulos.
- Identificar dependências.
- Definir comunicação entre frontend, backend, agente Windows, banco e n8n.
- Definir contratos de API e eventos Socket.io.
- Organizar a sequência de desenvolvimento.
- Identificar riscos arquiteturais.

Entrega:

`production_artifacts/System_Architecture.md`

---

#### FASE 3 — Segurança e privacidade

**Responsável:** @security  
**Skills:**

- `security/threat_modeling.md`
- `security/endpoint_security.md`
- `security/security_audit.md`

Atividades:

- Realizar análise de ameaças.
- Definir autenticação e autorização.
- Definir identidade individual para cada agente Windows.
- Proteger comunicação por TLS.
- Definir armazenamento e rotação de credenciais.
- Estabelecer permissões e limites para gerenciamento remoto.
- Definir auditoria das operações.
- Avaliar LGPD e minimização de dados.

Regras especiais:

- Não permitir terminal irrestrito ou execução arbitrária de comandos.
- Priorizar catálogo de tarefas autorizadas.
- Exigir autorização adequada para operações sensíveis.
- Prever revogação de agentes e credenciais.
- Registrar operações administrativas.

Entrega:

`production_artifacts/Security_Plan.md`

**GATE DE SEGURANÇA:**

O @security deve identificar e resolver riscos críticos antes da implementação dos módulos afetados.

---

#### FASE 4 — Modelagem do banco de dados

**Responsável:** @dba  
**Skills:**

- `dba/data_modeling.md`
- `dba/database_performance.md`

Atividades:

- Modelar unidades de saúde.
- Modelar computadores e agentes.
- Modelar inventário e telemetria.
- Modelar usuários e permissões.
- Modelar alertas e chamados.
- Modelar tarefas remotas e auditoria.
- Definir índices, relacionamentos e migrations.
- Planejar retenção e backups.

Entrega:

`production_artifacts/Database_Design.md`

---

#### FASE 5 — Design e experiência do usuário

**Responsável:** @designer  
**Skills:**

- `designer/design_system.md`
- `designer/ux_dashboard.md`

Atividades:

- Definir identidade visual.
- Criar design system.
- Projetar dashboard.
- Projetar visualização das unidades.
- Planejar telas de computadores e diagnósticos.
- Definir estados visuais de normalidade, alerta, criticidade e offline.
- Garantir responsividade e acessibilidade.

Entrega:

`production_artifacts/Design_Specification.md`

---

#### FASE 6 — Desenvolvimento do backend e agente Windows

**Responsável:** @engineer  
**Skills:**

- `engineer/backend_nodejs.md`
- `engineer/windows_agent.md`
- `engineer/remote_management.md`

Atividades:

- Implementar API Node.js e Express.
- Implementar integração com MySQL.
- Desenvolver comunicação Socket.io.
- Desenvolver agente Windows.
- Implementar inventário e telemetria.
- Implementar heartbeat.
- Implementar sistema de tarefas remotas autorizadas.
- Registrar operações e resultados.

Entregas:

- Backend funcional.
- Agente Windows.
- Documentação dos endpoints.
- Contratos de comunicação.
- Testes básicos de integração.

---

#### FASE 7 — Desenvolvimento do frontend e Digital Twin

**Responsável:** @frontend  
**Skills:**

- `frontend/react_dashboard.md`
- `frontend/digital_twin_3d.md`

Atividades:

- Implementar dashboard React.
- Utilizar JavaScript e Styled Components.
- Integrar APIs.
- Implementar atualizações em tempo real.
- Criar ambiente 3D com React Three Fiber e Drei.
- Representar unidades, salas e computadores.
- Exibir alertas visuais.
- Criar telas de diagnóstico.

Entregas:

- Dashboard funcional.
- Digital Twin integrado.
- Componentes reutilizáveis.
- Integração com backend.

---

#### FASE 8 — Automações e notificações

**Responsável:** @n8n  
**Skills:**

- `n8n/workflow_automation.md`
- `n8n/whatsapp_integration.md`

Atividades:

- Integrar webhooks do backend.
- Criar fluxos de abertura de chamados.
- Configurar notificações de alertas.
- Integrar WhatsApp pelo provedor autorizado.
- Evitar chamados e notificações duplicadas.
- Implementar tratamento de falhas.

Entrega:

`production_artifacts/Automation_Documentation.md`

---

#### FASE 9 — Testes e auditoria

**Responsável:** @qa  
**Skills:**

- `qa/test_strategy.md`
- `qa/quality_audit.md`

Atividades:

- Testar backend e APIs.
- Testar banco de dados.
- Testar agente Windows.
- Testar dashboard e Digital Twin.
- Testar comunicação em tempo real.
- Testar automações.
- Verificar critérios de aceitação.
- Identificar falhas e vulnerabilidades.

Entrega:

`production_artifacts/QA_Report.md`

**GATE DE QUALIDADE:**

Se houver falhas, retornar ao especialista responsável.

O @qa deve repetir os testes após as correções.

Não avançar para produção enquanto existirem falhas críticas ou vulnerabilidades não resolvidas.

---

#### FASE 10 — Auditoria final de segurança

**Responsável:** @security  
**Apoio:** @qa

Atividades:

- Revisar autenticação e autorização.
- Auditar agente Windows.
- Auditar gerenciamento remoto.
- Verificar exposição de credenciais.
- Revisar logs e dados armazenados.
- Validar controles de acesso.
- Verificar correções das vulnerabilidades identificadas.

Entrega:

`production_artifacts/Final_Security_Audit.md`

**GATE DE SEGURANÇA FINAL:**

Bloquear implantação caso existam vulnerabilidades críticas ou riscos relevantes sem tratamento aprovado.

---

#### FASE 11 — Infraestrutura e implantação

**Responsável:** @devops  
**Skills:**

- `devops/docker_deployment.md`
- `devops/observability.md`

Atividades:

- Preparar Dockerfiles.
- Configurar Docker Compose.
- Preparar VPS.
- Configurar variáveis de ambiente.
- Configurar TLS e rede.
- Implantar backend e banco de dados.
- Configurar logs e monitoramento.
- Planejar backups e recuperação.
- Validar funcionamento em produção.

Entrega:

`production_artifacts/Deployment_Guide.md`

**GATE FINAL:**

Solicitar autorização do usuário antes da implantação em produção.

---

### 4. Organização dos artefatos

Todos os documentos técnicos devem ser armazenados em:

`production_artifacts/`

Organização sugerida:

- `Technical_Specification.md`
- `System_Architecture.md`
- `Security_Plan.md`
- `Database_Design.md`
- `Design_Specification.md`
- `Automation_Documentation.md`
- `QA_Report.md`
- `Final_Security_Audit.md`
- `Deployment_Guide.md`

Os códigos-fonte devem permanecer organizados nos diretórios próprios do projeto:

- `backend/`
- `frontend/`
- `agent/`
- `infrastructure/`

Não misturar documentação técnica com código-fonte.

---

### 5. Regras de delegação

- O @lead coordena todas as fases.
- Cada especialista executa apenas atividades do seu domínio.
- Especialistas podem colaborar quando houver dependências.
- Toda entrega deve indicar arquivos criados, modificados e decisões tomadas.
- Alterações de escopo devem passar pelo @pm e pelo usuário.
- O @security pode bloquear implementações inseguras.
- O @qa pode reprovar entregas incompletas.
- O @devops não deve implantar em produção sem autorização.

---

### 6. Tratamento de erros

Quando uma fase falhar:

1. Identificar a causa.
2. Identificar o especialista responsável.
3. Documentar o problema.
4. Encaminhar para correção.
5. Executar novamente as validações necessárias.
6. Somente avançar após aprovação.

Não ignorar falhas para acelerar o pipeline.

---

### 7. Encerramento do ciclo

Ao concluir o ciclo, o @lead deve apresentar:

- Resumo do que foi desenvolvido.
- Funcionalidades implementadas.
- Arquivos criados e modificados.
- Testes realizados.
- Pendências conhecidas.
- Riscos identificados.
- Status da segurança.
- Status da implantação.

O ciclo só pode ser considerado concluído quando todas as fases aplicáveis tiverem sido validadas.

---

### 8. Instrução de inicialização

Ao receber `/startcycle <ideia>`:

1. Ler este arquivo.
2. Consultar `.agents/agents.md`.
3. Identificar a ideia e o escopo.
4. Acionar o @lead.
5. Iniciar pela FASE 1 com o @pm.
6. Respeitar rigorosamente os gates de aprovação.
7. Nunca pular etapas obrigatórias.
