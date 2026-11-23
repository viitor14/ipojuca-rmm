-- =============================================================================
-- RMM IPOJUCA - MIGRATION 05: PLANTAS CONTIGUAS (SEM VAO ENTRE SALAS)
-- Responsavel: @dba | Idempotente e nao destrutiva (pode rodar varias vezes)
-- Uso: mysql -u <user> -p ipojuca_rmm < 05_sector_layout_contiguous.sql
--
-- Problema: as linhas de setores ficavam em z = +-3.5 com profundidade 5,
-- deixando 2 m livres entre elas. O vao aparecia na maquete 3D.
--
-- Correcao: mantem a primeira linha de cada unidade e encosta as seguintes,
-- de modo que a divisa de uma linha coincida com a divisa da anterior.
-- As maquinas acompanham o deslocamento da linha (pos_z).
-- =============================================================================

SET NAMES utf8mb4;
USE ipojuca_rmm;

DROP TEMPORARY TABLE IF EXISTS rmm_row_shift;

CREATE TEMPORARY TABLE rmm_row_shift AS
WITH row_info AS (
  SELECT
    unit_id,
    bounds_z,
    MAX(depth_3d) AS row_depth
  FROM sectors
  GROUP BY unit_id, bounds_z
),
cum AS (
  SELECT
    unit_id,
    bounds_z,
    row_depth,
    SUM(row_depth) OVER (
      PARTITION BY unit_id ORDER BY bounds_z
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS cum_depth,
    FIRST_VALUE(bounds_z) OVER (
      PARTITION BY unit_id ORDER BY bounds_z
    ) AS first_z,
    FIRST_VALUE(row_depth) OVER (
      PARTITION BY unit_id ORDER BY bounds_z
    ) AS first_depth
  FROM row_info
)
SELECT
  unit_id,
  bounds_z AS old_z,
  ROUND(
    first_z - first_depth / 2 + (cum_depth - row_depth) + row_depth / 2,
    2
  ) AS new_z,
  ROUND(
    (first_z - first_depth / 2 + (cum_depth - row_depth) + row_depth / 2) - bounds_z,
    2
  ) AS delta
FROM cum;

UPDATE sectors s
JOIN rmm_row_shift r
  ON r.unit_id = s.unit_id AND r.old_z = s.bounds_z
SET s.bounds_z = r.new_z
WHERE r.delta <> 0;

UPDATE machines m
JOIN sectors s ON s.id = m.sector_id
JOIN rmm_row_shift r ON r.unit_id = s.unit_id AND r.new_z = s.bounds_z
SET m.pos_z = ROUND(m.pos_z + r.delta, 3)
WHERE r.delta <> 0;

DROP TEMPORARY TABLE IF EXISTS rmm_row_shift;
