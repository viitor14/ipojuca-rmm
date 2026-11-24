-- =============================================================================
-- RMM IPOJUCA - MIGRATION 07: CORREDOR CENTRAL ENTRE AS LINHAS DE SALAS
-- Responsavel: @dba | Idempotente e nao destrutiva (pode rodar varias vezes)
-- Uso: mysql -u <user> -p ipojuca_rmm < 07_sector_layout_corridor.sql
--
-- Problema: as linhas de salas ficavam encostadas (z = -2.5 e z = 2.5 com
-- profundidade 5), formando um bloco macico sem circulacao. A planta parecia
-- um conjunto de retangulos colados, sem corredor.
--
-- Correcao: afasta as linhas para abrir um corredor central de 2 m.
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
    WHEN s.bounds_z < 0 THEN -5.50
    ELSE 1.50
  END AS new_z
FROM sectors s;

UPDATE sectors s
JOIN rmm_sector_corridor c ON c.id = s.id
SET s.bounds_z = c.new_z
WHERE c.new_z <> s.bounds_z;

UPDATE machines m
JOIN rmm_sector_corridor c ON c.id = m.sector_id
SET m.pos_z = ROUND(m.pos_z + (c.new_z - c.old_z), 3)
WHERE c.new_z <> c.old_z;

DROP TEMPORARY TABLE IF EXISTS rmm_sector_corridor;
