#!/usr/bin/env bash
# =============================================================================
# RMM IPOJUCA - SCRIPT DE DEPLOY PARA A VPS srv912524
# Portas calibradas conforme containers ativos da VPS:
#  - Frontend RMM : 8095 (8082=relatorios, 8090=mdm)
#  - Backend RMM  : 4005 (4000=api-chamados-node)
#  - MySQL RMM    : 3309 (3306=mensageria, 3307=visitas, 3308=chamados)
#  - n8n e Evolution API : Reutiliza os containers ja ativos (5678 e 8080)
# =============================================================================
set -e

FRONTEND_PORT="${FRONTEND_PORT:-8095}"
BACKEND_PORT="${BACKEND_PORT:-4005}"
MYSQL_EXTERNAL_PORT="${MYSQL_EXTERNAL_PORT:-3309}"

echo "======================================================================"
echo "  RMM IPOJUCA - DEPLOY NA VPS srv912524 (SEM CONFLITO DE PORTAS)"
echo "======================================================================"

if [ ! -f ".env" ]; then
  echo "[1/3] Gerando arquivo .env calibrado para a VPS 31.97.86.253..."
  PUBLIC_IP="31.97.86.253"
  cat <<EOF > .env
MYSQL_ROOT_PASSWORD=$(openssl rand -hex 16)
DB_NAME=ipojuca_rmm
DB_USER=rmm_user
DB_PASSWORD=$(openssl rand -hex 16)
JWT_SECRET=$(openssl rand -hex 32)
TASK_SIGNING_SECRET=$(openssl rand -hex 32)
N8N_WEBHOOK_SECRET=$(openssl rand -hex 32)
AGENT_ENROLLMENT_KEY=rmm-ipojuca-enroll-2026
OFFLINE_THRESHOLD_SECONDS=15000
FRONTEND_PORT=${FRONTEND_PORT}
BACKEND_PORT=${BACKEND_PORT}
MYSQL_EXTERNAL_PORT=${MYSQL_EXTERNAL_PORT}
N8N_WEBHOOK_URL=http://host.docker.internal:5678/webhook/rmm-alert
DASHBOARD_PUBLIC_URL=http://${PUBLIC_IP}:${FRONTEND_PORT}
EOF
  echo "Arquivo .env criado com sucesso."
else
  echo "[1/3] Arquivo .env existente preservado."
fi

echo "[2/3] Construindo e subindo containers (ipojuca-rmm-mysql, ipojuca-rmm-backend, ipojuca-rmm-frontend)..."
docker compose up -d --build

echo "[3/3] Verificando containers do RMM Ipojuca..."
docker compose ps

echo ""
echo "======================================================================"
echo "  DEPLOY CONCLUIDO COM SUCESSO NA VPS srv912524!"
echo "  - Dashboard & Digital Twin 3D : http://${PUBLIC_IP:-<IP_VPS>}:${FRONTEND_PORT}/"
echo "  - API & Socket.io Agentes     : http://${PUBLIC_IP:-<IP_VPS>}:${BACKEND_PORT}"
echo "  - MySQL RMM                   : Porta ${MYSQL_EXTERNAL_PORT}"
echo "  - Integrado ao n8n existente  : Porta 5678 (bot-whatsapp-chamados-sms-n8n-1)"
echo "======================================================================"
