#!/usr/bin/env bash
# =============================================================================
# RMM IPOJUCA - SCRIPT DE DEPLOY PARA A VPS srv912524 (Hardening Ciclo #48)
# Portas calibradas conforme containers ativos da VPS:
#  - Frontend RMM : 8095 (8082=relatorios, 8090=mdm)
#  - Backend RMM  : 4005 (4000=api-chamados-node)
#  - MySQL RMM    : 127.0.0.1:3309 (restrito a loopback)
#  - n8n e Evolution API : Reutiliza os containers ja ativos (5678 e 8080)
# =============================================================================
set -eu

FRONTEND_PORT="${FRONTEND_PORT:-8095}"
BACKEND_PORT="${BACKEND_PORT:-4005}"
MYSQL_EXTERNAL_PORT="${MYSQL_EXTERNAL_PORT:-3309}"
PUBLIC_ORIGIN="${PUBLIC_ORIGIN:-http://31.97.86.253:${FRONTEND_PORT}}"

echo "======================================================================"
echo "  RMM IPOJUCA - DEPLOY NA VPS srv912524 (HARDENING COMPLETO)"
echo "======================================================================"

if [ ! -f ".env" ]; then
  echo "[1/3] Gerando arquivo .env com segredos fortes aleatorios..."
  umask 077
  cat <<EOF > .env
MYSQL_ROOT_PASSWORD=$(openssl rand -hex 20)
DB_NAME=ipojuca_rmm
DB_USER=rmm_user
DB_PASSWORD=$(openssl rand -hex 20)
JWT_SECRET=$(openssl rand -hex 32)
TASK_SIGNING_SECRET=$(openssl rand -hex 32)
N8N_WEBHOOK_SECRET=$(openssl rand -hex 32)
AGENT_ENROLLMENT_KEY=$(openssl rand -hex 24)
CORS_ORIGIN=${PUBLIC_ORIGIN}
TRUST_PROXY=1
OFFLINE_THRESHOLD_SECONDS=15000
FRONTEND_PORT=${FRONTEND_PORT}
BACKEND_PORT=${BACKEND_PORT}
MYSQL_EXTERNAL_PORT=${MYSQL_EXTERNAL_PORT}
N8N_WEBHOOK_URL=http://host.docker.internal:5678/webhook/rmm-alert
DASHBOARD_PUBLIC_URL=${PUBLIC_ORIGIN}
# Defina senhas iniciais fortes antes do primeiro boot se o banco estiver vazio:
SEED_ADMIN_PASSWORD=
SEED_TECH_PASSWORD=
SEED_VIEWER_PASSWORD=
EOF
  chmod 600 .env
  echo "Arquivo .env criado (permissao 600). Defina SEED_ADMIN_PASSWORD se for o primeiro boot."
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
echo "  - Dashboard & Digital Twin : ${PUBLIC_ORIGIN}"
echo "  - API & Socket.io Agentes  : porta ${BACKEND_PORT}"
echo "  - MySQL RMM                : 127.0.0.1:${MYSQL_EXTERNAL_PORT} (loopback)"
echo "  - HTTPS/WSS (Recomendado)  : infrastructure/nginx/vps-https.conf.example"
echo "======================================================================"
