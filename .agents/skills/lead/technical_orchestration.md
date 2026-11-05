# Skill: Technical Orchestration

## Objetivo
Coordenar os especialistas e garantir que o desenvolvimento aconteca na ordem correta.

## Regras de delegacao
- Consultar agents.md antes de delegar.
- Consultar a persona do especialista.
- Identificar a Skill correspondente.
- Definir objetivo, contexto e resultado esperado.
- Informar dependencias e restricoes.

## Ordem de trabalho
1. Requisitos com @pm.
2. Seguranca inicial com @security.
3. Arquitetura e contratos tecnicos.
4. Banco de dados com @dba.
5. Design com @designer.
6. Implementacao com @engineer, @frontend e @n8n.
7. Testes com @qa.
8. Auditoria final com @security.
9. Implantacao com @devops.

## Trabalho paralelo
Permitir atividades paralelas somente quando as dependencias estiverem resolvidas e os contratos entre modulos estiverem definidos.

## Controle de entregas
Toda entrega deve informar:
- Arquivos criados ou modificados.
- Objetivo da implementacao.
- Decisoes tecnicas.
- Dependencias.
- Testes realizados.
- Pendencias conhecidas.

## Tratamento de conflitos
Quando dois especialistas apresentarem solucoes incompatíveis, solicitar justificativas tecnicas, comparar riscos e selecionar a alternativa que respeite os requisitos aprovados.

## Gates
Nunca ultrapassar um ponto de aprovacao humana sem autorizacao explicita.
Nunca liberar producao sem validacao de QA, seguranca e autorizacao do utilizador.
