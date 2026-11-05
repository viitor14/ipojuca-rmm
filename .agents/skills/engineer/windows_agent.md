# Skill: Windows Agent

## Objetivo
Criar um servico Windows responsavel por inventario, monitoramento e comunicacao segura com o RMM.

## Requisitos de funcionamento
- Executar como servico Windows identificado e administravel.
- Iniciar conforme politica institucional.
- Suportar reconexao automatica.
- Operar com consumo reduzido de recursos.
- Registrar logs locais de funcionamento.
- Permitir atualizacao segura e controlada.

## Inventario
Coletar somente informacoes necessarias:
- Hostname e identificador do equipamento.
- Fabricante e modelo.
- Numero de serie quando disponivel.
- Processador.
- Memoria RAM.
- Discos e capacidade.
- Interfaces de rede.
- Sistema operacional.
- Endereco IP quando disponivel.

## Telemetria
Monitorar CPU, memoria, armazenamento, disponibilidade e indicadores de temperatura quando houver suporte confiavel do hardware.

## Heartbeat
- Enviar sinal periodico ao backend.
- Informar versao do agente.
- Informar horario da ultima coleta.
- Aplicar reconexao com intervalo progressivo.
- Evitar multiplas conexoes concorrentes.

## Comunicacao
Utilizar protocolo autenticado e criptografado. Validar mensagens recebidas e rejeitar comandos fora do contrato aprovado.

## Estrutura interna
Separar coleta, inventario, telemetria, comunicacao, configuracao, atualizacao e logs em modulos independentes.

## Restricoes
Nao coletar senhas, documentos pessoais ou conteudo de tela. Nao utilizar mecanismos de ocultacao. Nao executar comandos remotos arbitrarios. Respeitar as politicas do Security Guardian.
