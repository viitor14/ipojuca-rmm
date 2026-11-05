# Skill: Security Audit

## Objetivo
Auditar a implementacao antes de homologacao e publicacao.

## Areas de auditoria
- Autenticacao e gerenciamento de sessoes.
- Autorizacao e controle de acesso.
- APIs REST e WebSockets.
- Agentes Windows.
- Execucao remota.
- Banco de dados.
- Protecao de segredos.
- Logs e auditoria.
- Docker e infraestrutura.

## Verificacoes obrigatorias
1. Verificar autenticacao em todas as operacoes protegidas.
2. Verificar autorizacao no servidor, nunca somente no frontend.
3. Procurar credenciais e segredos expostos.
4. Validar entradas e prevenir injecoes.
5. Verificar protecao contra abuso de requisicoes.
6. Verificar isolamento entre usuarios e equipamentos.
7. Verificar integridade dos logs.
8. Verificar protecao de dados armazenados e transmitidos.

## Referencias
Utilizar OWASP ASVS, OWASP API Security Top 10 e boas praticas de seguranca de aplicacoes.

## Relatorio
Criar Security_Audit_Report.md contendo:
- Vulnerabilidade.
- Severidade.
- Evidencia tecnica.
- Impacto.
- Correcao recomendada.
- Resultado da validacao.

## Criterios de aprovacao
Vulnerabilidades criticas e altas devem ser corrigidas ou formalmente tratadas antes da liberacao. Riscos residuais devem ser documentados e aceitos pelo responsavel autorizado.

## Restricoes
Executar auditorias somente em ambientes e equipamentos autorizados. Nao realizar testes destrutivos em producao.
