-- =============================================================================
-- RMM IPOJUCA - MIGRATION 06: PLANTA COMPACTA (SEM SALAS ESPALHADAS)
-- Responsavel: @dba | Idempotente e nao destrutiva (pode rodar varias vezes)
-- Uso: mysql -u <user> -p ipojuca_rmm < 06_sector_layout_compact.sql
--
-- Problema: o posicionamento automatico antigo abria colunas em x = +-13.5,
-- +-22.5, +-31.5, o que espalhava as salas e inflava o tabuleiro 3D, deixando
-- uma laje vazia enorme na maquete.
--
-- Correcao: reorganiza os setores de cada unidade em uma malha compacta e
-- centrada, preenchendo linha a linha. As maquinas acompanham o deslocamento
-- em x e z, para nao sairem da sala.
--
-- A malha usa a maior largura e a maior profundidade da unidade como celula,
-- o que garante que nenhuma sala se sobreponha.
-- =============================================================================

SET NAMES utf8mb4;
USE ipojuca_rmm;

DROP TEMPORARY TABLE IF EXISTS rmm_sector_compact;

CREATE TEMPORARY TABLE rmm_sector_compact AS
SELECT
  g.id,
  g.unit_id,
  g.old_x,
  g.old_z,
  ROUND((g.col_idx - (g.cols - 1) / 2) * g.cell_w, 2) AS new_x,
  ROUND((g.row_idx - (g.rows_total - 1) / 2) * g.cell_d, 2) AS new_z
FROM (
  SELECT
    b.id,
    b.unit_id,
    b.bounds_x AS old_x,
    b.bounds_z AS old_z,
    b.cell_w,
    b.cell_d,
    b.cols,
    CEIL(b.total / b.cols) AS rows_total,
    (b.rn - 1) % b.cols AS col_idx,
    FLOOR((b.rn - 1) / b.cols) AS row_idx
  FROM (
    SELECT
      s.id,
      s.unit_id,
      s.bounds_x,
      s.bounds_z,
      d.cell_w,
      d.cell_d,
      CEIL(SQRT(d.total)) AS cols,
      d.total,
      ROW_NUMBER() OVER (PARTITION BY s.unit_id ORDER BY s.bounds_z, s.bounds_x, s.id) AS rn
    FROM sectors s
    JOIN (
      SELECT unit_id, MAX(width_3d) AS cell_w, MAX(depth_3d) AS cell_d, COUNT(*) AS total
      FROM sectors
      GROUP BY unit_id
    ) d ON d.unit_id = s.unit_id
  ) b
) g;

UPDATE sectors s
JOIN rmm_sector_compact c ON c.id = s.id
SET s.bounds_x = c.new_x,
    s.bounds_z = c.new_z
WHERE c.new_x <> s.bounds_x OR c.new_z <> s.bounds_z;

UPDATE machines m
JOIN rmm_sector_compact c ON c.id = m.sector_id
SET m.pos_x = ROUND(m.pos_x + (c.new_x - c.old_x), 3),
    m.pos_z = ROUND(m.pos_z + (c.new_z - c.old_z), 3)
WHERE c.new_x <> c.old_x OR c.new_z <> c.old_z;

DROP TEMPORARY TABLE IF EXISTS rmm_sector_compact;
