-- =============================================================================
-- RMM IPOJUCA - MIGRATION 07: CORREDOR CENTRAL ENTRE AS LINHAS DE SALAS
-- Responsavel: @dba | Idempotente e nao destrutiva (revisada no Ciclo #48)
-- Uso: mysql -u <user> -p ipojuca_rmm < 07_sector_layout_corridor.sql
--
-- Problema: as linhas de salas ficavam encostadas (z = -2.5 e z = 2.5 com
-- profundidade 5), formando um bloco macico sem circulacao.
--
-- Correcao segura: ajusta APENAS unidades que possuem exatamente 2 linhas
-- contiguas em z = -2.5 e z = +2.5 (sem corredor), preservando intactas
-- unidades de 1 linha (ex.: CAPS com depth_3d = 10) e unidades com 3+ linhas.
--   linha norte: z = -5.5  -> ocupa z [-8, -3]
--   corredor:                ocupa z [-3, -1]
--   linha sul:   z =  1.5  -> ocupa z [-1,  4]
--
-- As maquinas acompanham o deslocamento em z para nao sairem da sala.
-- =============================================================================

SET NAMES utf8mb4;
USE ipojuca_rmm;

DROP TEMPORARY TABLE IF EXISTS rmm_sector_corridor;

CREATE TEMPORARY TABLE rmm_sector_corridor AS
SELECT
  s.id,
  s.unit_id,
  s.bounds_z AS old_z,
  CASE
    WHEN ABS(s.bounds_z - (-2.50)) < 0.05 THEN -5.50
    WHEN ABS(s.bounds_z - 2.50) < 0.05 THEN 1.50
    ELSE s.bounds_z
  END AS new_z
FROM sectors s
JOIN (
  SELECT unit_id
  FROM sectors
  GROUP BY unit_id
  HAVING COUNT(DISTINCT ROUND(bounds_z, 2)) = 2
     AND MIN(ROUND(bounds_z, 2)) = -2.50
     AND MAX(ROUND(bounds_z, 2)) = 2.50
) eligible ON eligible.unit_id = s.unit_id;

UPDATE sectors s
JOIN rmm_sector_corridor c ON c.id = s.id
SET s.bounds_z = c.new_z
WHERE c.new_z <> s.bounds_z;

UPDATE machines m
JOIN rmm_sector_corridor c ON c.id = m.sector_id
SET m.pos_z = ROUND(m.pos_z + (c.new_z - c.old_z), 3)
WHERE c.new_z <> c.old_z;

DROP TEMPORARY TABLE IF EXISTS rmm_sector_corridor;
