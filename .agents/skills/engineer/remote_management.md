# Skill: Remote Management

## Objetivo
Implementar gerenciamento remoto seguro, rastreavel e controlado dos computadores autorizados.

## Principio central
Nenhum comando pode ser executado somente porque chegou ao agente. Toda operacao exige identidade valida, autorizacao, integridade e verificacao de politica.

## Fluxo de autorizacao
1. Operador autenticado solicita uma tarefa.
2. Backend verifica permissao e escopo.
3. Politica verifica tipo de tarefa e nivel de risco.
4. Operacao sensivel exige aprovacao adicional.
5. Backend cria tarefa com identificador unico.
6. Agente valida origem, validade e integridade.
7. Agente executa somente a tarefa permitida.
8. Resultado e registrado e devolvido ao backend.

## Catalogo de tarefas
Preferir operacoes predefinidas com parametros validados em vez de aceitar scripts livres.
Exemplos: consultar servico, verificar disco, limpar cache autorizado e reiniciar servico permitido.

## Controles obrigatorios
- Lista de tarefas permitidas.
- Validacao rigorosa de parametros.
- Autorizacao por usuario e equipamento.
- Expiracao de tarefas.
- Protecao contra repeticao de comandos.
- Limite de execucoes concorrentes.
- Registro de operador e resultado.
- Cancelamento quando tecnicamente possivel.

## Niveis de risco
Baixo: consultas sem alteracao no equipamento.
Medio: manutencao reversivel e autorizada.
Alto: alteracoes administrativas com aprovacao explicita.
Critico: operacoes destrutivas ou de alto impacto devem ser bloqueadas por padrao.

## Auditoria
Registrar solicitante, equipamento, tarefa, parametros permitidos, aprovacao, horario, status e resultado.
Nunca registrar senhas, tokens ou dados sensiveis nos logs.

## Restricoes
Nao implementar terminal irrestrito, execucao arbitraria de PowerShell ou mecanismos para contornar controles do Windows. Operacoes devem ocorrer somente em equipamentos institucionalmente autorizados.
