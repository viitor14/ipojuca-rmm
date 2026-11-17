#!/usr/bin/env bash
# =============================================================================
# RMM IPOJUCA - ATUALIZACAO DE CONTAINERS E MIGRATIONS (Ciclos #26 a #28)
# Executar na VPS, de qualquer diretorio: bash <repo>/infrastructure/scripts/deploy_rmm_update.sh
# A raiz do repositorio e detectada automaticamente a partir do script.
# Variaveis opcionais: REPO_DIR, FRONTEND_PORT, BACKEND_PORT, MYSQL_EXTERNAL_PORT, DRY_RUN=1
# =============================================================================
set -eu

# $0 funciona tanto em bash quanto em sh/ash (BASH_SOURCE nao existe em ash)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DETECTED_REPO_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
REPO_DIR="${REPO_DIR:-${DETECTED_REPO_DIR}}"
FRONTEND_PORT="${FRONTEND_PORT:-8095}"
BACKEND_PORT="${BACKEND_PORT:-4005}"
MYSQL_EXTERNAL_PORT="${MYSQL_EXTERNAL_PORT:-3309}"
MIGRATION_FILE="infrastructure/mysql/02_hardware_identity_upsert.sql"
DRY_RUN="${DRY_RUN:-0}"

run() {
  if [ "$DRY_RUN" = "1" ]; then
    echo "  [dry-run] $*"
  else
    "$@"
  fi
}

echo "[0/5] Repositorio: ${REPO_DIR}"
if [ ! -d "${REPO_DIR}/.git" ]; then
  echo "ERRO: ${REPO_DIR} nao e um repositorio git. Informe REPO_DIR=/caminho/do/repo." >&2
  exit 1
fi
cd "${REPO_DIR}"

if [ ! -f "${MIGRATION_FILE}" ]; then
  echo "ERRO: migration ${MIGRATION_FILE} nao encontrada. Rode 'git pull origin main' antes." >&2
  exit 1
fi

if [ "$DRY_RUN" != "1" ] && ! command -v docker >/dev/null 2>&1; then
  echo "ERRO: docker nao encontrado no PATH." >&2
  exit 1
fi

echo "[1/5] Atualizando codigo (git pull)..."
run git pull origin main

echo "[2/5] Rebuild e subida dos containers (mysql, backend, frontend)..."
run docker compose up -d --build

if [ "$DRY_RUN" = "1" ]; then
  echo "[3/5] [dry-run] aguardaria o backend em http://127.0.0.1:${BACKEND_PORT}/api/health"
  echo "[4/5] [dry-run] aplicaria ${MIGRATION_FILE} no container mysql"
  echo "[5/5] [dry-run] validaria healthcheck e painel"
  echo "Dry-run concluido sem alterar nada."
  exit 0
fi

echo "[3/5] Aguardando o backend responder..."
for _ in $(seq 1 30); do
  if curl -fsS "http://127.0.0.1:${BACKEND_PORT}/api/health" >/dev/null 2>&1; then
    break
  fi
  sleep 2
done

echo "[4/5] Aplicando migration de identidade de hardware (idempotente)..."
# O container mysql expoe MYSQL_USER/MYSQL_PASSWORD/MYSQL_DATABASE (nao DB_*).
DB_USER_RESOLVED="${MYSQL_USER:-${DB_USER:-}}"
DB_PASSWORD_RESOLVED="${MYSQL_PASSWORD:-${DB_PASSWORD:-}}"
DB_NAME_RESOLVED="${MYSQL_DATABASE:-${DB_NAME:-}}"

if [ -z "${DB_USER_RESOLVED}" ] || [ -z "${DB_PASSWORD_RESOLVED}" ] || [ -z "${DB_NAME_RESOLVED}" ]; then
  echo "ERRO: defina MYSQL_USER/MYSQL_PASSWORD/MYSQL_DATABASE (ou DB_USER/DB_PASSWORD/DB_NAME)." >&2
  exit 1
fi
echo "  usuario=${DB_USER_RESOLVED} banco=${DB_NAME_RESOLVED} (senha oculta)"

# Remove o USE fixo da migration: o banco e selecionado por argumento.
sed '/^USE /d' "${MIGRATION_FILE}" | docker compose exec -T \
  -e MYSQL_PWD="${DB_PASSWORD_RESOLVED}" \
  -e MYSQL_USER="${DB_USER_RESOLVED}" \
  -e MYSQL_DATABASE="${DB_NAME_RESOLVED}" \
  mysql sh -c 'mysql -u"$MYSQL_USER" "$MYSQL_DATABASE"'

echo "[5/5] Verificando capacidades publicadas..."
curl -fsS "http://127.0.0.1:${BACKEND_PORT}/api/health"
echo
curl -fsS -o /dev/null -w "frontend HTTP %{http_code}\n" "http://127.0.0.1:${FRONTEND_PORT}/"

echo ""
echo "Atualizacao concluida."
echo " - Painel: http://<IP_VPS>:${FRONTEND_PORT}/"
echo " - API   : http://<IP_VPS>:${BACKEND_PORT}/api/health"
echo " - MySQL : porta ${MYSQL_EXTERNAL_PORT}"
