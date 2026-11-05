
@echo off
chcp 65001 >nul
setlocal
title RMM Ipojuca - Criador de Estrutura de Agentes

echo.
echo ==========================================
echo    RMM IPOJUCA - ESTRUTURA DE AGENTES
echo ==========================================
echo.

set "BASE=.agents"

if not exist "%BASE%" mkdir "%BASE%"

echo [1/3] Criando pastas de personas...

for %%D in (personas skills workflows) do (
    if not exist "%BASE%\%%D" mkdir "%BASE%\%%D"
)

for %%D in (lead pm security dba designer engineer frontend qa devops n8n) do (
    if not exist "%BASE%\personas\%%D" mkdir "%BASE%\personas\%%D"
    if not exist "%BASE%\skills\%%D" mkdir "%BASE%\skills\%%D"
)

echo [2/3] Criando arquivos de personas...

for %%F in (lead pm security dba designer engineer frontend qa devops n8n) do (
    if not exist "%BASE%\personas\%%F.md" (
        type nul > "%BASE%\personas\%%F.md"
    )
)

echo [3/3] Criando arquivos de Skills...

call :skill lead system_architecture
call :skill lead technical_orchestration

call :skill pm product_planning
call :skill pm technical_specification

call :skill security threat_modeling
call :skill security endpoint_security
call :skill security security_audit

call :skill dba mysql_design
call :skill dba telemetry_database

call :skill designer ui_ux_design
call :skill designer digital_twin_design

call :skill engineer backend_nodejs
call :skill engineer windows_agent
call :skill engineer remote_management

call :skill frontend react_development
call :skill frontend threejs_digital_twin

call :skill qa testing_strategy
call :skill qa code_audit

call :skill devops docker_infrastructure
call :skill devops deployment

call :skill n8n workflow_automation
call :skill n8n webhook_integration

echo.
echo Criando workflows...

for %%F in (development_workflow security_review release_workflow) do (
    if not exist "%BASE%\workflows\%%F.md" (
        type nul > "%BASE%\workflows\%%F.md"
    )
)

echo.
echo ==========================================
echo ESTRUTURA CRIADA COM SUCESSO!
echo ==========================================
echo.
echo Os arquivos existentes foram preservados.
echo Os novos arquivos estao preparados.
echo.
pause
exit /b

:skill
if not exist "%BASE%\skills\%~1\%~2.md" (
    type nul > "%BASE%\skills\%~1\%~2.md"
)
exit /b
