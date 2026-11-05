param(
    [Parameter(Mandatory=$false)]
    [string]$BackendUrl = "http://31.97.86.253:4005",

    [Parameter(Mandatory=$false)]
    [string]$EnrollmentKey = "rmm-ipojuca-enroll-2026",

    [Parameter(Mandatory=$false)]
    [int]$UnitId = 1,

    [Parameter(Mandatory=$false)]
    [int]$SectorId = 1,

    [Parameter(Mandatory=$false)]
    [switch]$RegisterStartupTask = $true
)

$ErrorActionPreference = "Stop"
$AgentDir = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "=====================================================================" -ForegroundColor Cyan
Write-Host "  INSTALADOR DO AGENTE RMM IPOJUCA (MODO LEVE: BOOT + 4H + MANUAL)" -ForegroundColor Cyan
Write-Host "=====================================================================" -ForegroundColor Cyan

Set-Location $AgentDir

# 1. Grava o arquivo .env com ciclo de 4 horas (14.400.000 ms)
@"
SERVICE_NAME=IpojucaRMMService
BACKEND_URL=$BackendUrl
AGENT_UUID=auto
AGENT_ENROLLMENT_KEY=$EnrollmentKey
UNIT_ID=$UnitId
SECTOR_ID=$SectorId
HEARTBEAT_INTERVAL_MS=14400000
"@ | Set-Content -Path (Join-Path $AgentDir ".env") -Encoding UTF8

Write-Host "[1/4] Configuração .env gravada (Envio ao ligar + a cada 4h) -> $BackendUrl" -ForegroundColor Green

# 2. Instala dependências se necessário
if (-not (Test-Path (Join-Path $AgentDir "node_modules"))) {
    Write-Host "[2/4] Instalando pacotes npm do Agente..." -ForegroundColor Yellow
    npm install --omit=dev
} else {
    Write-Host "[2/4] Pacotes npm já instalados." -ForegroundColor Green
}

# 3. Registra Tarefa Agendada do Windows para iniciar automaticamente quando o PC for ligado
if ($RegisterStartupTask) {
    try {
        $NodePath = (Get-Command node).Source
        $Action = New-ScheduledTaskAction -Execute $NodePath -Argument "src/index.js" -WorkingDirectory $AgentDir
        $TriggerBoot = New-ScheduledTaskTrigger -AtStartup
        $TriggerLogon = New-ScheduledTaskTrigger -AtLogOn
        $Settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -ExecutionTimeLimit ([TimeSpan]::Zero) -RestartCount 3 -RestartInterval (New-TimeSpan -Minutes 2)
        Register-ScheduledTask -TaskName "IpojucaRMMService_AutoStart" -Action $Action -Trigger @($TriggerBoot, $TriggerLogon) -Settings $Settings -Description "Envia telemetria do RMM Ipojuca ao ligar o PC, a cada 4h e sob demanda." -Force | Out-Null
        Write-Host "[3/4] Inicialização automática com o Windows registrada no Agendador de Tarefas!" -ForegroundColor Green
    } catch {
        Write-Host "[3/4] Aviso: Execute como Administrador se desejar registrar no Agendador do Windows ($($_.Exception.Message))." -ForegroundColor Yellow
    }
}

# 4. Testa conectividade e inicia o agente
Write-Host "[4/4] Enviando telemetria de inicialização e entrando em modo de escuta leve..." -ForegroundColor Green
node src/index.js
