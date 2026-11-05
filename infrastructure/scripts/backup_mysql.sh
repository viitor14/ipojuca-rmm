#!/usr/bin/env sh
# =============================================================================
# RMM IPOJUCA - SCRIPT AUTOMATIZADO DE BACKUP MYSQL E EXPURGO DE TELEMETRIA
# Responsavel: @devops & @dba
# =============================================================================
set -e

BACKUP_DIR="${BACKUP_DIR:-/var/backups/ipojuca-rmm}"
TIMESTAMP="$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "[Backup] Gerando dump consistente do banco ipojuca_rmm..."
mysqldump \
  --single-transaction \
  --routines \
  --triggers \
  -h "${DB_HOST:-mysql}" \
  -u "${DB_USER:-rmm_user}" \
  -p"${DB_PASSWORD}" \
  "${DB_NAME:-ipojuca_rmm}" | gzip > "${BACKUP_DIR}/ipojuca_rmm_${TIMESTAMP}.sql.gz"

echo "[Retencao] Removendo backups locais com mais de 14 dias..."
find "$BACKUP_DIR" -name "ipojuca_rmm_*.sql.gz" -mtime +14 -delete

echo "[Backup] Concluido com sucesso: ipojuca_rmm_${TIMESTAMP}.sql.gz"

