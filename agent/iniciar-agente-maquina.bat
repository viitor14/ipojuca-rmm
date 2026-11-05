@echo off
chcp 65001 >nul
title RMM Ipojuca - Instalador do Super Agente Windows
cd /d "%~dp0"

if exist "IpojucaRMM-Setup.exe" (
    echo [INFO] Iniciando o Instalador Nativo do Agente em Segundo Plano ^(IpojucaRMM-Setup.exe^)...
    start "" "%~dp0IpojucaRMM-Setup.exe"
    exit /b 0
)

echo [INFO] Compilando IpojucaRMM-Setup.exe nativo do Windows...
if exist "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe" (
    "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe" /target:winexe /out:"%~dp0IpojucaRMM-Setup.exe" /r:System.dll /r:System.Management.dll /r:System.Windows.Forms.dll /r:System.Drawing.dll /r:System.Web.Extensions.dll "%~dp0native\IpojucaAgent.cs"
    if exist "IpojucaRMM-Setup.exe" (
        start "" "%~dp0IpojucaRMM-Setup.exe"
        exit /b 0
    )
)

echo [FALLBACK] Iniciando via Node.js...
node src/index.js
pause
