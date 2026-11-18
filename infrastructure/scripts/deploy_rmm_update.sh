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
MIGRATION_FILES="infrastructure/mysql/02_hardware_identity_upsert.sql infrastructure/mysql/03_approved_printers.sql infrastructure/mysql/04_discovered_printers.sql"
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

if [ ! -f "infrastructure/mysql/02_hardware_identity_upsert.sql" ]; then
  echo "ERRO: migration 02 nao encontrada. Rode 'git pull origin main' antes." >&2
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
  echo "[4/5] [dry-run] aplicaria ${MIGRATION_FILES} no container mysql"
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
# As credenciais vivem DENTRO do container mysql (MYSQL_USER/MYSQL_PASSWORD/MYSQL_DATABASE).
# Overrides do host (DB_* ou MYSQL_*) sao opcionais e passados por -e.
EXEC_ENV=""
if [ -n "${MYSQL_USER:-${DB_USER:-}}" ]; then
  EXEC_ENV="${EXEC_ENV} -e MYSQL_USER=${MYSQL_USER:-${DB_USER}}"
fi
if [ -n "${MYSQL_PASSWORD:-${DB_PASSWORD:-}}" ]; then
  EXEC_ENV="${EXEC_ENV} -e MYSQL_PASSWORD=${MYSQL_PASSWORD:-${DB_PASSWORD}}"
fi
if [ -n "${MYSQL_DATABASE:-${DB_NAME:-}}" ]; then
  EXEC_ENV="${EXEC_ENV} -e MYSQL_DATABASE=${MYSQL_DATABASE:-${DB_NAME}}"
fi

# Remove o USE fixo: o banco e selecionado por argumento dentro do container.
# shellcheck disable=SC2086
for migration in ${MIGRATION_FILES}; do
  echo "  aplicando ${migration}"
  sed '/^USE /d' "${migration}" | docker compose exec -T ${EXEC_ENV} mysql sh -c '
    if [ -z "${MYSQL_USER:-}" ] || [ -z "${MYSQL_DATABASE:-}" ]; then
      echo "ERRO: MYSQL_USER/MYSQL_DATABASE ausentes no container mysql." >&2
      exit 1
    fi
    if [ -z "${MYSQL_PASSWORD:-}" ] && [ -z "${MYSQL_ROOT_PASSWORD:-}" ]; then
      echo "ERRO: MYSQL_PASSWORD/MYSQL_ROOT_PASSWORD ausentes no container mysql." >&2
      exit 1
    fi
    echo "  usuario=${MYSQL_USER} banco=${MYSQL_DATABASE} (senha oculta)"
    MYSQL_PWD="${MYSQL_PASSWORD:-$MYSQL_ROOT_PASSWORD}" exec mysql -u"$MYSQL_USER" "$MYSQL_DATABASE"
  '
done

echo "[5/5] Verificando capacidades publicadas..."
echo "  commit em execucao: $(git rev-parse --short HEAD)"
HEALTH_JSON="$(curl -fsS "http://127.0.0.1:${BACKEND_PORT}/api/health")"
echo "${HEALTH_JSON}"
curl -fsS -o /dev/null -w "frontend HTTP %{http_code}\n" "http://127.0.0.1:${FRONTEND_PORT}/"

case "${HEALTH_JSON}" in
  *'"printers:catalog"'*) ;;
  *)
    echo "ERRO: o backend em execucao nao expoe /api/printers (container antigo)." >&2
    echo "      Verifique se o 'git pull' trouxe o commit esperado e rode novamente." >&2
    exit 1
    ;;
esac

echo ""
echo "Atualizacao concluida."
echo " - Painel: http://<IP_VPS>:${FRONTEND_PORT}/"
echo " - API   : http://<IP_VPS>:${BACKEND_PORT}/api/health"
echo " - MySQL : porta ${MYSQL_EXTERNAL_PORT}"
