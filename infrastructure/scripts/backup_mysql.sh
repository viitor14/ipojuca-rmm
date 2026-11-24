#!/usr/bin/env sh
# =============================================================================
# RMM IPOJUCA - SCRIPT AUTOMATIZADO DE BACKUP MYSQL E EXPURGO DE TELEMETRIA
# Responsavel: @devops & @dba (Hardening Ciclo #48)
# =============================================================================
set -eu

BACKUP_DIR="${BACKUP_DIR:-/var/backups/ipojuca-rmm}"
TELEMETRY_RETENTION_DAYS="${TELEMETRY_RETENTION_DAYS:-30}"
AUDIT_RETENTION_DAYS="${AUDIT_RETENTION_DAYS:-180}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

if [ -z "${DB_PASSWORD:-}" ]; then
  echo "[Backup] ERRO: variavel DB_PASSWORD nao definida." >&2
  exit 1
fi

# Usa MYSQL_PWD para evitar exposicao da senha na linha de comando (ps aux)
export MYSQL_PWD="${DB_PASSWORD}"

echo "[Backup] Gerando dump consistente do banco ${DB_NAME:-ipojuca_rmm}..."
umask 077
mysqldump \
  --single-transaction \
  --routines \
  --triggers \
  -h "${DB_HOST:-mysql}" \
  -P "${DB_PORT:-3306}" \
  -u "${DB_USER:-rmm_user}" \
  "${DB_NAME:-ipojuca_rmm}" | gzip > "${BACKUP_DIR}/ipojuca_rmm_${TIMESTAMP}.sql.gz"

echo "[Retencao DB] Expurgando telemetry_history (> ${TELEMETRY_RETENTION_DAYS}d) e audit_logs (> ${AUDIT_RETENTION_DAYS}d)..."
mysql \
  -h "${DB_HOST:-mysql}" \
  -P "${DB_PORT:-3306}" \
  -u "${DB_USER:-rmm_user}" \
  "${DB_NAME:-ipojuca_rmm}" \
  -e "DELETE FROM telemetry_history WHERE recorded_at < NOW() - INTERVAL ${TELEMETRY_RETENTION_DAYS} DAY;
      DELETE FROM audit_logs WHERE created_at < NOW() - INTERVAL ${AUDIT_RETENTION_DAYS} DAY;"

unset MYSQL_PWD

echo "[Retencao Arquivos] Removendo backups locais com mais de 14 dias..."
find "$BACKUP_DIR" -name "ipojuca_rmm_*.sql.gz" -mtime +14 -delete

echo "[Backup] Concluido com sucesso: ipojuca_rmm_${TIMESTAMP}.sql.gz"
