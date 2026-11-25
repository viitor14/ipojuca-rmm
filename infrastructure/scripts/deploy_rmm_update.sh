#!/usr/bin/env bash
# =============================================================================
# RMM IPOJUCA - ATUALIZACAO DE CONTAINERS E MIGRATIONS CONTROLADAS (Ciclo #48)
# Executar na VPS, de qualquer diretorio: bash <repo>/infrastructure/scripts/deploy_rmm_update.sh
# A raiz do repositorio e detectada automaticamente a partir do script.
# Variaveis opcionais: REPO_DIR, FRONTEND_PORT, BACKEND_PORT, MYSQL_EXTERNAL_PORT, DRY_RUN=1
# =============================================================================
set -eu

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DETECTED_REPO_DIR="$(cd "${SCRIPT_DIR}/../.." && pwd)"
REPO_DIR="${REPO_DIR:-${DETECTED_REPO_DIR}}"
FRONTEND_PORT="${FRONTEND_PORT:-8095}"
BACKEND_PORT="${BACKEND_PORT:-4005}"
MYSQL_EXTERNAL_PORT="${MYSQL_EXTERNAL_PORT:-3309}"
MIGRATION_FILES="infrastructure/mysql/02_hardware_identity_upsert.sql infrastructure/mysql/03_approved_printers.sql infrastructure/mysql/04_discovered_printers.sql infrastructure/mysql/05_sector_layout_contiguous.sql infrastructure/mysql/06_sector_layout_compact.sql infrastructure/mysql/07_sector_layout_corridor.sql infrastructure/mysql/08_messages_and_migrations_control.sql"
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

if [ ! -f ".env" ] && [ "$DRY_RUN" != "1" ]; then
  echo "ERRO: arquivo .env ausente em ${REPO_DIR}. Crie/valide .env antes do deploy (ver deploy_vps.sh)." >&2
  exit 1
fi

if [ ! -f "infrastructure/mysql/08_messages_and_migrations_control.sql" ]; then
  echo "ERRO: migration 08 nao encontrada. Rode 'git pull origin main' antes." >&2
  exit 1
fi

if [ "$DRY_RUN" != "1" ] && ! command -v docker >/dev/null 2>&1; then
  echo "ERRO: docker nao encontrado no PATH." >&2
  exit 1
fi

echo "[1/5] Atualizando codigo (git pull)..."
run git pull origin main

echo "[2/5] Rebuild e subida dos containers (mysql, backend, frontend)..."
run docker compose build --no-cache frontend
run docker compose up -d --build

if [ "$DRY_RUN" = "1" ]; then
  echo "[3/5] [dry-run] aguardaria o backend em http://127.0.0.1:${BACKEND_PORT}/api/health"
  echo "[4/5] [dry-run] aplicaria migrations pendentes em schema_migrations: ${MIGRATION_FILES}"
  echo "[5/5] [dry-run] validaria healthcheck, capacidades de seguranca e painel"
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

echo "[4/5] Aplicando migrations pendentes (com controle em schema_migrations)..."
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

# Garante existencia da tabela de controle antes do loop
# shellcheck disable=SC2086
docker compose exec -T ${EXEC_ENV} mysql sh -c '
  MYSQL_PWD="${MYSQL_PASSWORD:-$MYSQL_ROOT_PASSWORD}" mysql -u"$MYSQL_USER" "$MYSQL_DATABASE" -e "
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version VARCHAR(64) PRIMARY KEY,
      applied_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;"
'

# shellcheck disable=SC2086
for migration in ${MIGRATION_FILES}; do
  version="$(basename "${migration}")"
  applied="$(docker compose exec -T ${EXEC_ENV} -e MIG_VER="${version}" mysql sh -c '
    MYSQL_PWD="${MYSQL_PASSWORD:-$MYSQL_ROOT_PASSWORD}" mysql -N -s -u"$MYSQL_USER" "$MYSQL_DATABASE" -e "
      SELECT COUNT(*) FROM schema_migrations WHERE version = '\''${MIG_VER}'\'';"
  ')"
  if [ "${applied:-0}" != "0" ]; then
    echo "  [skip] ${version} ja aplicada anteriormente (preservando layout/dados)."
    continue
  fi

  echo "  [apply] ${migration}"
  sed '/^USE /d' "${migration}" | docker compose exec -T ${EXEC_ENV} mysql sh -c '
    if [ -z "${MYSQL_USER:-}" ] || [ -z "${MYSQL_DATABASE:-}" ]; then
      echo "ERRO: MYSQL_USER/MYSQL_DATABASE ausentes no container mysql." >&2
      exit 1
    fi
    if [ -z "${MYSQL_PASSWORD:-}" ] && [ -z "${MYSQL_ROOT_PASSWORD:-}" ]; then
      echo "ERRO: MYSQL_PASSWORD/MYSQL_ROOT_PASSWORD ausentes no container mysql." >&2
      exit 1
    fi
    MYSQL_PWD="${MYSQL_PASSWORD:-$MYSQL_ROOT_PASSWORD}" exec mysql -u"$MYSQL_USER" "$MYSQL_DATABASE"
  '
  docker compose exec -T ${EXEC_ENV} -e MIG_VER="${version}" mysql sh -c '
    MYSQL_PWD="${MYSQL_PASSWORD:-$MYSQL_ROOT_PASSWORD}" mysql -u"$MYSQL_USER" "$MYSQL_DATABASE" -e "
      INSERT IGNORE INTO schema_migrations (version) VALUES ('\''${MIG_VER}'\'');"
  '
done

echo "[5/5] Verificando capacidades publicadas..."
echo "  commit em execucao: $(git rev-parse --short HEAD)"
HEALTH_JSON="$(curl -fsS "http://127.0.0.1:${BACKEND_PORT}/api/health")"
echo "${HEALTH_JSON}"
curl -fsS -o /dev/null -w "frontend HTTP %{http_code}\n" "http://127.0.0.1:${FRONTEND_PORT}/"

case "${HEALTH_JSON}" in
  *'"agent:authenticated-poll"'*) ;;
  *)
    echo "ERRO: o backend em execucao nao expoe as capacidades do Ciclo #48." >&2
    exit 1
    ;;
esac

echo ""
echo "Atualizacao concluida."
echo " - Painel: http://<IP_VPS>:${FRONTEND_PORT}/"
echo " - API   : http://<IP_VPS>:${BACKEND_PORT}/api/health"
echo " - MySQL : 127.0.0.1:${MYSQL_EXTERNAL_PORT} (somente loopback)"
