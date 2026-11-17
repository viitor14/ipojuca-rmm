#!/usr/bin/env bash
# =============================================================================
# RMM IPOJUCA - ATUALIZACAO DE CONTAINERS E MIGRATIONS (Ciclos #26 a #28)
# Executar na VPS (root@srv912524), dentro de /opt/ipojuca-rmm
# Uso: bash infrastructure/scripts/deploy_rmm_update.sh
# =============================================================================
set -euo pipefail

REPO_DIR="${REPO_DIR:-/opt/ipojuca-rmm}"
FRONTEND_PORT="${FRONTEND_PORT:-8095}"
BACKEND_PORT="${BACKEND_PORT:-4005}"
MYSQL_EXTERNAL_PORT="${MYSQL_EXTERNAL_PORT:-3309}"

cd "$REPO_DIR"

echo "[1/5] Atualizando codigo (git pull)..."
git pull origin main

echo "[2/5] Rebuild e subida dos containers (mysql, backend, frontend)..."
docker compose up -d --build

echo "[3/5] Aguardando o backend responder..."
for i in $(seq 1 30); do
  if curl -fsS "http://127.0.0.1:${BACKEND_PORT}/api/health" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "[4/5] Aplicando migration de identidade de hardware (idempotente)..."
docker compose exec -T mysql sh -c \
  'mysql -u"$DB_USER" -p"$DB_PASSWORD" "$DB_NAME"' \
  < infrastructure/mysql/02_hardware_identity_upsert.sql

echo "[5/5] Verificando capacidades publicadas..."
curl -fsS "http://127.0.0.1:${BACKEND_PORT}/api/health"
echo
curl -fsS -o /dev/null -w "frontend HTTP %{http_code}\n" "http://127.0.0.1:${FRONTEND_PORT}/"

echo ""
echo "Atualizacao concluida."
echo " - Painel: http://<IP_VPS>:${FRONTEND_PORT}/"
echo " - API   : http://<IP_VPS>:${BACKEND_PORT}/api/health"
echo " - MySQL : porta ${MYSQL_EXTERNAL_PORT}"
