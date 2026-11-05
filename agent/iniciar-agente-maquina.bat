@echo off
chcp 65001 >nul
title RMM Ipojuca - Agente Windows Leve (Boot + 4h + Sob Demanda)
echo ============================================================================
echo   RMM IPOJUCA - AGENTE DE MONITORAMENTO WINDOWS (MODO LEVE: BOOT + 4H)
echo ============================================================================
echo.

cd /d "%~dp0"

if not exist ".env" (
    echo [INFO] Criando arquivo .env padrao (Ciclo de 4 horas + Coleta no Boot)...
    (
        echo SERVICE_NAME=IpojucaRMMService
        echo BACKEND_URL=http://31.97.86.253:4005
        echo AGENT_UUID=auto
        echo AGENT_ENROLLMENT_KEY=rmm-ipojuca-enroll-2026
        echo UNIT_ID=1
        echo SECTOR_ID=1
        echo HEARTBEAT_INTERVAL_MS=14400000
    ) > .env
    echo [AVISO] Edite o arquivo agent\.env com o IP:PORTA da sua VPS em BACKEND_URL se desejar conectar remotamente.
    echo.
)

if not exist "node_modules" (
    echo [1/2] Instalando dependencias do Agente...
    call npm install --omit=dev
)

echo [2/2] Enviando telemetria inicial e aguardando solicitacoes manuais ou ciclo de 4h...
node src/index.js
pause
