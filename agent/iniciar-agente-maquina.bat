@echo off
chcp 65001 >nul
title RMM Ipojuca - Instalador do Super Agente Windows (v2.4.0)
cd /d "%~dp0"

set "OFFICIAL_EXE=%~dp0..\backend\public\IpojucaRMM-Setup.exe"

if exist "%OFFICIAL_EXE%" (
    echo [INFO] Iniciando o Instalador Oficial do Agente em Segundo Plano ^(backend\public\IpojucaRMM-Setup.exe^)...
    start "" "%OFFICIAL_EXE%"
    exit /b 0
)

echo [INFO] Compilando IpojucaRMM-Setup.exe nativo do Windows a partir de native\IpojucaAgent.cs...
if exist "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe" (
    "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe" /target:winexe /out:"%OFFICIAL_EXE%" /r:System.dll /r:System.Management.dll /r:System.Windows.Forms.dll /r:System.Drawing.dll /r:System.Web.Extensions.dll "%~dp0native\IpojucaAgent.cs"
    if exist "%OFFICIAL_EXE%" (
        start "" "%OFFICIAL_EXE%"
        exit /b 0
    )
)

echo [ERRO] Nao foi possivel localizar ou compilar IpojucaRMM-Setup.exe.
pause
