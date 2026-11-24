/**
 * Planta arquitetônica do Digital Twin.
 *
 * A planta é derivada dos próprios setores (bounds_x, bounds_z, width_3d,
 * depth_3d), não de coordenadas espalhadas pelo código. A partir deles este
 * módulo identifica as faixas de corredor entre as linhas de salas, para que a
 * cena renderize circulação real em vez de uma laje contínua.
 *
 * Regra: duas linhas de salas (agrupadas por bounds_z) deixam entre si uma
 * faixa livre. Essa faixa é o corredor. Se as linhas se tocam, não há corredor.
 */

const EPS = 0.01;

function sectorBox(sector) {
  const bx = Number(sector.bounds_x || 0);
  const bz = Number(sector.bounds_z || 0);
  const hw = Number(sector.width_3d || 9.0) / 2;
  const hd = Number(sector.depth_3d || 5.0) / 2;
  return { x0: bx - hw, x1: bx + hw, z0: bz - hd, z1: bz + hd, bz };
}

/**
 * Faixas de circulação entre linhas de salas.
 * @returns {Array<{x0:number,x1:number,z0:number,z1:number,width:number}>}
 */
export function computeCorridorBands(sectors = []) {
  if (!sectors.length) return [];

  const boxes = sectors.map(sectorBox);
  const rows = new Map();
  for (const box of boxes) {
    const key = box.bz.toFixed(2);
    const row = rows.get(key) || { z0: Infinity, z1: -Infinity, x0: Infinity, x1: -Infinity };
    row.z0 = Math.min(row.z0, box.z0);
    row.z1 = Math.max(row.z1, box.z1);
    row.x0 = Math.min(row.x0, box.x0);
    row.x1 = Math.max(row.x1, box.x1);
    rows.set(key, row);
  }

  const ordered = [...rows.values()].sort((a, b) => a.z0 - b.z0);
  const bands = [];
  for (let i = 0; i < ordered.length - 1; i += 1) {
    const current = ordered[i];
    const next = ordered[i + 1];
    const gap = next.z0 - current.z1;
    if (gap > EPS) {
      bands.push({
        x0: Math.min(current.x0, next.x0),
        x1: Math.max(current.x1, next.x1),
        z0: current.z1,
        z1: next.z0,
        width: gap,
      });
    }
  }
  return bands;
}

/**
 * Portas de cada setor voltadas para o corredor mais próximo.
 * @returns {Array<{id:number,x:number,z:number,side:'north'|'south'}>}
 */
export function computeCorridorDoors(sectors = [], bands = []) {
  if (!sectors.length || !bands.length) return [];
  return sectors
    .map((sector) => {
      const box = sectorBox(sector);
      let best = null;
      for (const band of bands) {
        const toNorth = Math.abs(box.z1 - band.z0);
        const toSouth = Math.abs(box.z0 - band.z1);
        const distance = Math.min(toNorth, toSouth);
        if (!best || distance < best.distance) {
          best = {
            distance,
            side: toNorth <= toSouth ? 'north' : 'south',
            z: toNorth <= toSouth ? box.z1 : box.z0,
          };
        }
      }
      return best && best.distance < 0.6
        ? { id: sector.id, x: (box.x0 + box.x1) / 2, z: best.z, side: best.side }
        : null;
    })
    .filter(Boolean);
}
