// =============================================================================
// Gerador de GLBs refinados do Gemeo Digital (Ciclo #35)
// Executar: cd frontend && node tools/build-refined-glbs.mjs
// Saida: public/models/refined/*.glb
//
// Sem Blender no ambiente, a geometria e construida com ExtrudeGeometry de
// perfis arredondados (bevel real), LatheGeometry e TubeGeometry, e exportada
// como GLB binario com materiais PBR. Nenhuma peca usa BoxGeometry.
// =============================================================================
import * as THREE from 'three';
import fs from 'node:fs';
import path from 'node:path';

// GLTFExporter usa FileReader/Blob do browser; Node 24 tem Blob, mas nao FileReader.
if (typeof globalThis.FileReader === 'undefined') {
  globalThis.FileReader = class FileReader {
    constructor() {
      this.result = null;
      this.onloadend = null;
      this.onerror = null;
    }

    readAsArrayBuffer(blob) {
      blob.arrayBuffer().then((buf) => {
        this.result = buf;
        if (this.onloadend) this.onloadend();
      }).catch((err) => {
        if (this.onerror) this.onerror(err);
      });
    }

    readAsDataURL(blob) {
      blob.arrayBuffer().then((buf) => {
        const b64 = Buffer.from(buf).toString('base64');
        this.result = `data:${blob.type || 'application/octet-stream'};base64,${b64}`;
        if (this.onloadend) this.onloadend();
      }).catch((err) => {
        if (this.onerror) this.onerror(err);
      });
    }
  };
}

const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');

const OUT_DIR = path.resolve('public/models/refined');
fs.mkdirSync(OUT_DIR, { recursive: true });

// ---------------------------------------------------------------- materiais
const MAT = {
  woodLight: new THREE.MeshStandardMaterial({ color: '#C89F72', roughness: 0.62, metalness: 0.02 }),
  woodDark: new THREE.MeshStandardMaterial({ color: '#8B5E3C', roughness: 0.58, metalness: 0.02 }),
  laminate: new THREE.MeshStandardMaterial({ color: '#F2EFE9', roughness: 0.42, metalness: 0.03 }),
  metal: new THREE.MeshStandardMaterial({ color: '#B7BEC6', roughness: 0.28, metalness: 0.92 }),
  metalDark: new THREE.MeshStandardMaterial({ color: '#4A5058', roughness: 0.36, metalness: 0.85 }),
  graphite: new THREE.MeshStandardMaterial({ color: '#2C3138', roughness: 0.48, metalness: 0.35 }),
  plastic: new THREE.MeshStandardMaterial({ color: '#E8E6E1', roughness: 0.55, metalness: 0.02 }),
  fabric: new THREE.MeshStandardMaterial({ color: '#41607A', roughness: 0.96, metalness: 0.0 }),
  fabricDark: new THREE.MeshStandardMaterial({ color: '#2F4657', roughness: 0.96, metalness: 0.0 }),
  screen: new THREE.MeshStandardMaterial({
    color: '#1B2430', roughness: 0.18, metalness: 0.1,
    emissive: new THREE.Color('#2E6F8E'), emissiveIntensity: 0.55,
  }),
  glass: new THREE.MeshStandardMaterial({
    color: '#CFE3E8', roughness: 0.08, metalness: 0.0,
    transparent: true, opacity: 0.32,
  }),
  accent: new THREE.MeshStandardMaterial({ color: '#2E7D6B', roughness: 0.5, metalness: 0.05 }),
};

// ---------------------------------------------------------------- geometria
/** Caixa com cantos e arestas arredondados de verdade (bevel por extrusao). */
function roundedBox(w, h, d, r = 0.02, bevelSegments = 3) {
  const radius = Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4);
  const shape = new THREE.Shape();
  const x = -w / 2 + radius;
  const y = -h / 2 + radius;
  const iw = w - radius * 2;
  const ih = h - radius * 2;
  shape.moveTo(x, y - radius);
  shape.lineTo(x, y + ih + radius);
  shape.quadraticCurveTo(x, y + ih + radius * 2, x + radius, y + ih + radius * 2);
  shape.lineTo(x + iw + radius, y + ih + radius * 2);
  shape.quadraticCurveTo(x + iw + radius * 2, y + ih + radius * 2, x + iw + radius * 2, y + ih + radius);
  shape.lineTo(x + iw + radius * 2, y - radius);
  shape.quadraticCurveTo(x + iw + radius * 2, y - radius * 2, x + iw + radius, y - radius * 2);
  shape.lineTo(x + radius, y - radius * 2);
  shape.quadraticCurveTo(x, y - radius * 2, x, y - radius);

  const depth = Math.max(d - radius * 2, 0.002);
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelThickness: radius,
    bevelSize: radius,
    bevelSegments,
    curveSegments: 8,
  });
  geo.center();
  return geo;
}

/** Cilindro com bordas suavizadas. */
function softCylinder(rTop, rBottom, h, seg = 24) {
  const geo = new THREE.CylinderGeometry(rTop, rBottom, h, seg, 1);
  geo.computeVertexNormals();
  return geo;
}

function mesh(geo, mat, pos = [0, 0, 0], rot = [0, 0, 0]) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos);
  m.rotation.set(...rot);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function group(name, children) {
  const g = new THREE.Group();
  g.name = name;
  children.forEach((c) => g.add(c));
  return g;
}

// ---------------------------------------------------------------- mobiliario
function buildDesk() {
  const parts = [];
  // Tampo com chanfro generoso
  parts.push(mesh(roundedBox(1.5, 0.045, 0.78, 0.018), MAT.woodLight, [0, 0.745, 0]));
  // Faixa de acabamento sob o tampo
  parts.push(mesh(roundedBox(1.44, 0.03, 0.72, 0.012), MAT.woodDark, [0, 0.712, 0]));
  // Pernas em metal com sapata
  for (const sx of [-0.66, 0.66]) {
    parts.push(mesh(softCylinder(0.026, 0.03, 0.70), MAT.metalDark, [sx, 0.35, -0.30]));
    parts.push(mesh(softCylinder(0.026, 0.03, 0.70), MAT.metalDark, [sx, 0.35, 0.30]));
    parts.push(mesh(roundedBox(0.10, 0.012, 0.10, 0.006), MAT.graphite, [sx, 0.006, -0.30]));
    parts.push(mesh(roundedBox(0.10, 0.012, 0.10, 0.006), MAT.graphite, [sx, 0.006, 0.30]));
  }
  // Travessa estrutural
  parts.push(mesh(softCylinder(0.016, 0.016, 1.28, 16), MAT.metalDark, [0, 0.12, 0], [0, 0, Math.PI / 2]));
  // Painel de modestia
  parts.push(mesh(roundedBox(1.24, 0.34, 0.022, 0.01), MAT.laminate, [0, 0.52, 0.33]));
  // Gaveiteiro com tres frentes e puxadores
  parts.push(mesh(roundedBox(0.42, 0.66, 0.66, 0.014), MAT.laminate, [0.44, 0.36, 0]));
  for (let i = 0; i < 3; i += 1) {
    const y = 0.13 + i * 0.22;
    parts.push(mesh(roundedBox(0.38, 0.19, 0.02, 0.008), MAT.woodLight, [0.44, y, -0.34]));
    parts.push(mesh(softCylinder(0.008, 0.008, 0.14, 12), MAT.metal, [0.44, y + 0.05, -0.355], [0, 0, Math.PI / 2]));
  }
  return group('office_desk_refined', parts);
}

function buildChair() {
  const parts = [];
  // Base em cinco bracos com rodizios
  for (let i = 0; i < 5; i += 1) {
    const a = (i / 5) * Math.PI * 2;
    const spoke = mesh(roundedBox(0.30, 0.026, 0.05, 0.012), MAT.graphite, [Math.cos(a) * 0.15, 0.09, Math.sin(a) * 0.15], [0, -a, 0]);
    parts.push(spoke);
    parts.push(mesh(softCylinder(0.028, 0.028, 0.032, 14), MAT.metalDark, [Math.cos(a) * 0.29, 0.032, Math.sin(a) * 0.29], [Math.PI / 2, 0, 0]));
  }
  parts.push(mesh(softCylinder(0.055, 0.065, 0.05, 20), MAT.graphite, [0, 0.10, 0]));
  // Coluna a gas com luva cromada
  parts.push(mesh(softCylinder(0.032, 0.038, 0.20, 20), MAT.metalDark, [0, 0.22, 0]));
  parts.push(mesh(softCylinder(0.024, 0.024, 0.20, 20), MAT.metal, [0, 0.40, 0]));
  // Mecanismo e assento anatomico
  parts.push(mesh(roundedBox(0.24, 0.05, 0.24, 0.02), MAT.graphite, [0, 0.50, 0]));
  parts.push(mesh(roundedBox(0.50, 0.075, 0.48, 0.035), MAT.fabric, [0, 0.565, -0.02]));
  // Encosto com curvatura e apoio lombar
  parts.push(mesh(roundedBox(0.44, 0.52, 0.075, 0.035), MAT.fabric, [0, 0.86, 0.22], [0.12, 0, 0]));
  parts.push(mesh(roundedBox(0.34, 0.16, 0.05, 0.024), MAT.fabricDark, [0, 0.70, 0.20], [0.12, 0, 0]));
  parts.push(mesh(roundedBox(0.28, 0.14, 0.07, 0.03), MAT.fabric, [0, 1.13, 0.245], [0.1, 0, 0]));
  // Bracos com apoio emborrachado
  for (const sx of [-0.27, 0.27]) {
    parts.push(mesh(roundedBox(0.045, 0.22, 0.05, 0.018), MAT.graphite, [sx, 0.60, 0.0]));
    parts.push(mesh(roundedBox(0.075, 0.032, 0.26, 0.014), MAT.fabricDark, [sx, 0.715, -0.02]));
  }
  return group('ergonomic_chair_refined', parts);
}

function buildWorkstation() {
  const parts = [];
  // Monitor: base, haste, moldura fina e tela
  parts.push(mesh(roundedBox(0.24, 0.014, 0.17, 0.007), MAT.graphite, [-0.06, 0.007, 0.10]));
  parts.push(mesh(roundedBox(0.05, 0.22, 0.035, 0.012), MAT.graphite, [-0.06, 0.12, 0.125]));
  parts.push(mesh(roundedBox(0.56, 0.34, 0.028, 0.012), MAT.graphite, [-0.06, 0.245, 0.10], [-0.06, 0, 0]));
  parts.push(mesh(roundedBox(0.535, 0.315, 0.004, 0.006), MAT.screen, [-0.06, 0.245, 0.086], [-0.06, 0, 0]));
  // Teclado com bloco principal, numerico e barra de espaco
  parts.push(mesh(roundedBox(0.40, 0.016, 0.145, 0.008), MAT.graphite, [-0.06, 0.008, -0.16]));
  parts.push(mesh(roundedBox(0.30, 0.006, 0.10, 0.004), MAT.plastic, [-0.10, 0.017, -0.16]));
  parts.push(mesh(roundedBox(0.075, 0.006, 0.10, 0.004), MAT.plastic, [0.10, 0.017, -0.16]));
  // Mouse com scroll
  parts.push(mesh(roundedBox(0.065, 0.028, 0.11, 0.014), MAT.graphite, [0.20, 0.014, -0.16]));
  parts.push(mesh(softCylinder(0.008, 0.008, 0.014, 12), MAT.metal, [0.20, 0.030, -0.19], [0, 0, Math.PI / 2]));
  // Gabinete com grade frontal e botoes
  parts.push(mesh(roundedBox(0.19, 0.36, 0.40, 0.014), MAT.graphite, [0.42, 0.18, 0.02]));
  for (let i = 0; i < 5; i += 1) {
    parts.push(mesh(roundedBox(0.13, 0.012, 0.006, 0.003), MAT.metalDark, [0.42, 0.06 + i * 0.03, -0.185]));
  }
  parts.push(mesh(softCylinder(0.012, 0.012, 0.008, 16), MAT.metal, [0.38, 0.30, -0.19], [Math.PI / 2, 0, 0]));
  parts.push(mesh(roundedBox(0.02, 0.008, 0.006, 0.002), MAT.accent, [0.44, 0.27, -0.19]));
  return group('workstation_pc_refined', parts);
}

function buildPrinter() {
  const parts = [];
  parts.push(mesh(roundedBox(0.42, 0.20, 0.36, 0.022), MAT.plastic, [0, 0.10, 0]));
  parts.push(mesh(roundedBox(0.40, 0.05, 0.34, 0.018), MAT.graphite, [0, 0.215, 0]));
  parts.push(mesh(roundedBox(0.30, 0.012, 0.05, 0.005), MAT.graphite, [0, 0.10, -0.185]));
  parts.push(mesh(roundedBox(0.34, 0.02, 0.20, 0.008), MAT.plastic, [0, 0.245, -0.06], [-0.18, 0, 0]));
  parts.push(mesh(roundedBox(0.16, 0.006, 0.10, 0.003), MAT.screen, [0.10, 0.205, -0.16], [-0.5, 0, 0]));
  parts.push(mesh(softCylinder(0.014, 0.014, 0.01, 16), MAT.accent, [-0.14, 0.205, -0.165], [Math.PI / 2, 0, 0]));
  return group('thermal_printer_refined', parts);
}

function buildCounter() {
  const parts = [];
  // Corpo em L com tampo em balanco
  parts.push(mesh(roundedBox(2.0, 0.90, 0.62, 0.02), MAT.laminate, [0, 0.45, 0]));
  parts.push(mesh(roundedBox(2.06, 0.05, 0.70, 0.02), MAT.woodLight, [0, 0.925, 0]));
  parts.push(mesh(roundedBox(0.62, 0.90, 1.30, 0.02), MAT.laminate, [-0.72, 0.45, 0.95]));
  parts.push(mesh(roundedBox(0.70, 0.05, 1.36, 0.02), MAT.woodLight, [-0.72, 0.925, 0.95]));
  // Rodape em madeira escura
  parts.push(mesh(roundedBox(2.02, 0.10, 0.64, 0.012), MAT.woodDark, [0, 0.05, 0]));
  // Anteparo de vidro com montantes
  parts.push(mesh(roundedBox(1.30, 0.42, 0.012, 0.005), MAT.glass, [0.1, 1.16, -0.30]));
  for (const sx of [-0.55, 0.75]) {
    parts.push(mesh(softCylinder(0.012, 0.012, 0.44, 14), MAT.metal, [sx, 1.17, -0.30]));
  }
  return group('reception_counter_refined', parts);
}

function buildCabinet() {
  const parts = [];
  parts.push(mesh(roundedBox(0.86, 1.70, 0.42, 0.016), MAT.laminate, [0, 0.85, 0]));
  parts.push(mesh(roundedBox(0.90, 0.04, 0.46, 0.014), MAT.woodLight, [0, 1.72, 0]));
  for (let i = 0; i < 3; i += 1) {
    const y = 0.32 + i * 0.50;
    parts.push(mesh(roundedBox(0.80, 0.46, 0.02, 0.008), MAT.woodLight, [0, y, -0.215]));
    parts.push(mesh(softCylinder(0.009, 0.009, 0.16, 12), MAT.metal, [0, y + 0.14, -0.235], [0, 0, Math.PI / 2]));
  }
  return group('storage_cabinet_refined', parts);
}

function buildBench() {
  const parts = [];
  parts.push(mesh(roundedBox(1.70, 0.06, 0.44, 0.02), MAT.woodLight, [0, 0.42, 0]));
  for (const sx of [-0.72, 0.72]) {
    parts.push(mesh(roundedBox(0.05, 0.40, 0.40, 0.014), MAT.metalDark, [sx, 0.21, 0]));
  }
  for (let i = 0; i < 3; i += 1) {
    parts.push(mesh(roundedBox(0.48, 0.07, 0.40, 0.028), MAT.fabric, [-0.55 + i * 0.55, 0.485, 0]));
  }
  return group('waiting_bench_refined', parts);
}

// ---------------------------------------------------------------- exportacao
const BUILDERS = {
  'office_desk': buildDesk,
  'ergonomic_chair': buildChair,
  'workstation_pc': buildWorkstation,
  'thermal_printer': buildPrinter,
  'reception_counter': buildCounter,
  'storage_cabinet': buildCabinet,
  'waiting_bench': buildBench,
};

const exporter = new GLTFExporter();
const report = {};

for (const [name, build] of Object.entries(BUILDERS)) {
  const root = build();
  root.updateMatrixWorld(true);
  const buf = await new Promise((resolve, reject) => {
    exporter.parse(root, resolve, reject, { binary: true, onlyVisible: true });
  });
  const file = path.join(OUT_DIR, `${name}.glb`);
  fs.writeFileSync(file, Buffer.from(buf));

  let meshes = 0;
  let tris = 0;
  root.traverse((o) => {
    if (o.isMesh) {
      meshes += 1;
      const pos = o.geometry.attributes.position;
      tris += (o.geometry.index ? o.geometry.index.count : pos.count) / 3;
    }
  });
  report[name] = { meshes, triangles: Math.round(tris), bytes: fs.statSync(file).size };
}

console.log(JSON.stringify(report, null, 2));
