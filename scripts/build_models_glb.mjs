import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Polyfill FileReader for Three.js GLTFExporter in Node.js
global.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(buf => {
      this.result = buf;
      if (this.onloadend) this.onloadend();
    });
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicModelsDir = path.join(rootDir, 'frontend', 'public', 'models');

const threePath = pathToFileURL(path.join(rootDir, 'frontend', 'node_modules', 'three', 'build', 'three.module.js')).href;
const exporterPath = pathToFileURL(path.join(rootDir, 'frontend', 'node_modules', 'three', 'examples', 'jsm', 'exporters', 'GLTFExporter.js')).href;

const THREE = await import(threePath);
const { GLTFExporter } = await import(exporterPath);

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function exportToGLB(scene, outPath) {
  const exporter = new GLTFExporter();
  const glbBuffer = await new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      resolve,
      reject,
      { binary: true, embedImages: true }
    );
  });
  fs.writeFileSync(outPath, Buffer.from(glbBuffer));
  console.log(`[GLB EXPORT] Wrote ${outPath} (${glbBuffer.byteLength} bytes)`);
}

/* =========================================================================
 * 1. RECEPTION COUNTER (furniture/reception_counter.glb)
 * ========================================================================= */
async function buildReceptionCounter() {
  const root = new THREE.Group();
  root.name = 'ReceptionCounterRoot';

  // Corpo principal do balcão
  const bodyGeo = new THREE.BoxGeometry(2.30, 1.04, 0.70);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xFAF9F6, roughness: 0.65 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.name = 'CounterBody';
  body.position.set(0, 0.52, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  root.add(body);

  // Rodapé metálico recuado
  const baseGeo = new THREE.BoxGeometry(2.28, 0.12, 0.02);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x6B472B, roughness: 0.5 });
  const baseboard = new THREE.Mesh(baseGeo, baseMat);
  baseboard.position.set(0, 0.06, 0.355);
  root.add(baseboard);

  // Frisos verticais em relevo no painel frontal
  const fluteGeo = new THREE.BoxGeometry(0.04, 0.82, 0.015);
  const fluteMat = new THREE.MeshStandardMaterial({ color: 0xEDE7DD, roughness: 0.5 });
  [-0.9, -0.6, -0.3, 0.0, 0.3, 0.6, 0.9].forEach((fx, idx) => {
    const flute = new THREE.Mesh(fluteGeo, fluteMat);
    flute.name = `Flute_${idx}`;
    flute.position.set(fx, 0.55, 0.356);
    root.add(flute);
  });

  // Tampo chanfrado em carvalho nobre
  const topGeo = new THREE.BoxGeometry(2.42, 0.08, 0.78);
  const topMat = new THREE.MeshStandardMaterial({ color: 0xC8B298, roughness: 0.45 });
  const top = new THREE.Mesh(topGeo, topMat);
  top.name = 'CounterTop';
  top.position.set(0, 1.06, 0.02);
  top.castShadow = true;
  top.receiveShadow = true;
  root.add(top);

  // Ala perpendicular em L
  const wingGroup = new THREE.Group();
  wingGroup.name = 'CounterWing';
  wingGroup.position.set(1.40, 0, 0.45);

  const wingBody = new THREE.Mesh(new THREE.BoxGeometry(0.60, 1.04, 1.20), bodyMat);
  wingBody.position.set(0, 0.52, 0);
  wingBody.castShadow = true;
  wingBody.receiveShadow = true;
  wingGroup.add(wingBody);

  const wingBase = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.12, 1.18), baseMat);
  wingBase.position.set(0.305, 0.06, 0);
  wingGroup.add(wingBase);

  const wingTop = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.08, 1.28), topMat);
  wingTop.position.set(0, 1.06, 0);
  wingTop.castShadow = true;
  wingTop.receiveShadow = true;
  wingGroup.add(wingTop);
  root.add(wingGroup);

  // Divisória protetora acrílica translúcida
  const guardGeo = new THREE.BoxGeometry(2.0, 0.40, 0.02);
  const guardMat = new THREE.MeshStandardMaterial({
    color: 0xE0F2FE,
    transparent: true,
    opacity: 0.35,
    roughness: 0.1,
  });
  const guard = new THREE.Mesh(guardGeo, guardMat);
  guard.name = 'AcrylicGuard';
  guard.position.set(0, 1.30, 0.22);
  root.add(guard);

  // Suportes cromados da divisória
  const bracketGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.08, 12);
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.8, roughness: 0.2 });
  [-0.8, -0.3, 0.3, 0.8].forEach((sx, idx) => {
    const bracket = new THREE.Mesh(bracketGeo, bracketMat);
    bracket.name = `Bracket_${idx}`;
    bracket.position.set(sx, 1.11, 0.22);
    root.add(bracket);
  });

  return root;
}

/* =========================================================================
 * 2. OFFICE DESK (furniture/office_desk.glb)
 * ========================================================================= */
async function buildOfficeDesk() {
  const root = new THREE.Group();
  root.name = 'OfficeDeskRoot';

  // Tampo chanfrado espesso em carvalho natural
  const topGeo = new THREE.BoxGeometry(1.36, 0.08, 0.82);
  const topMat = new THREE.MeshStandardMaterial({ color: 0xC8B298, roughness: 0.45 });
  const desktop = new THREE.Mesh(topGeo, topMat);
  desktop.name = 'Desktop';
  desktop.position.set(0, 0.72, 0);
  desktop.castShadow = true;
  desktop.receiveShadow = true;
  root.add(desktop);

  // Gaveteiro lateral integrado à direita
  const pedGroup = new THREE.Group();
  pedGroup.name = 'DrawerPedestal';
  pedGroup.position.set(0.42, 0.35, 0);

  const pedBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.64, 0.68),
    new THREE.MeshStandardMaterial({ color: 0xFAF9F6, roughness: 0.65 })
  );
  pedBox.castShadow = true;
  pedBox.receiveShadow = true;
  pedGroup.add(pedBox);

  // 3 Frentes de gavetas com puxadores
  const drawerFrontGeo = new THREE.BoxGeometry(0.34, 0.16, 0.015);
  const drawerFrontMat = new THREE.MeshStandardMaterial({ color: 0xF3F4F6, roughness: 0.6 });
  const handleGeo = new THREE.BoxGeometry(0.10, 0.015, 0.015);
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.8, roughness: 0.2 });

  [-0.18, 0.0, 0.18].forEach((yOff, idx) => {
    const front = new THREE.Mesh(drawerFrontGeo, drawerFrontMat);
    front.name = `DrawerFront_${idx}`;
    front.position.set(0, yOff, 0.345);
    pedGroup.add(front);

    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.name = `DrawerHandle_${idx}`;
    handle.position.set(0, yOff, 0.360);
    pedGroup.add(handle);
  });
  root.add(pedGroup);

  // Pernas de aço à esquerda com travessa de reforço
  const legMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.4, metalness: 0.3 });
  const legFront = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.68, 0.05), legMat);
  legFront.name = 'LegFrontLeft';
  legFront.position.set(-0.58, 0.34, 0.32);
  legFront.castShadow = true;
  root.add(legFront);

  const legBack = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.68, 0.05), legMat);
  legBack.name = 'LegBackLeft';
  legBack.position.set(-0.58, 0.34, -0.32);
  legBack.castShadow = true;
  root.add(legBack);

  const crossbar = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.04, 0.60), legMat);
  crossbar.name = 'StretcherBar';
  crossbar.position.set(-0.58, 0.16, 0);
  root.add(crossbar);

  return root;
}

/* =========================================================================
 * 3. ERGONOMIC CHAIR (furniture/ergonomic_chair.glb)
 * ========================================================================= */
async function buildErgonomicChair() {
  const root = new THREE.Group();
  root.name = 'ErgonomicChairRoot';

  const fabricMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.72 });
  const plasticMat = new THREE.MeshStandardMaterial({ color: 0x1F2937, roughness: 0.5 });
  const chromeMat = new THREE.MeshStandardMaterial({ color: 0x9CA3AF, metalness: 0.8, roughness: 0.2 });

  // Assento anatômico acolchoado
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.07, 0.42), fabricMat);
  seat.name = 'SeatCushion';
  seat.position.set(0, 0.44, 0);
  seat.castShadow = true;
  root.add(seat);

  // Encosto anatômico com suporte lombar
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.46, 0.06), fabricMat);
  back.name = 'Backrest';
  back.position.set(0, 0.74, 0.18);
  back.castShadow = true;
  root.add(back);

  // Apoios de braço em T
  const armL = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.22), plasticMat);
  armL.name = 'ArmrestLeft';
  armL.position.set(-0.24, 0.56, 0.06);
  root.add(armL);

  const armR = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.22), plasticMat);
  armR.name = 'ArmrestRight';
  armR.position.set(0.24, 0.56, 0.06);
  root.add(armR);

  // Pistão pneumático
  const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.42, 12), chromeMat);
  piston.name = 'GasPiston';
  piston.position.set(0, 0.22, 0);
  root.add(piston);

  // Base aranha de 5 raios
  const starbase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.03, 5), plasticMat);
  starbase.name = 'Starbase';
  starbase.position.set(0, 0.04, 0);
  root.add(starbase);

  return root;
}

/* =========================================================================
 * 4. STORAGE CABINET (furniture/storage_cabinet.glb)
 * ========================================================================= */
async function buildStorageCabinet() {
  const root = new THREE.Group();
  root.name = 'StorageCabinetRoot';

  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xF8FAF8, roughness: 0.65 });
  const woodMat = new THREE.MeshStandardMaterial({ color: 0xC8B298, roughness: 0.5 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.8, roughness: 0.2 });

  // Corpo do armário
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.44, 0.46), bodyMat);
  body.name = 'CabinetBody';
  body.position.set(0, 0.72, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  root.add(body);

  // Tampo em carvalho suave
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.20, 0.04, 0.50), woodMat);
  top.name = 'CabinetTop';
  top.position.set(0, 1.45, 0);
  root.add(top);

  // Duas portas com puxadores verticais
  const doorL = new THREE.Mesh(new THREE.BoxGeometry(0.50, 1.30, 0.015), bodyMat);
  doorL.name = 'DoorLeft';
  doorL.position.set(-0.27, 0.72, 0.235);
  root.add(doorL);

  const doorR = new THREE.Mesh(new THREE.BoxGeometry(0.50, 1.30, 0.015), bodyMat);
  doorR.name = 'DoorRight';
  doorR.position.set(0.27, 0.72, 0.235);
  root.add(doorR);

  const handleL = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.24, 0.02), metalMat);
  handleL.name = 'HandleLeft';
  handleL.position.set(-0.06, 0.72, 0.25);
  root.add(handleL);

  const handleR = new THREE.Mesh(new THREE.BoxGeometry(0.015, 0.24, 0.02), metalMat);
  handleR.name = 'HandleRight';
  handleR.position.set(0.06, 0.72, 0.25);
  root.add(handleR);

  return root;
}

/* =========================================================================
 * 5. WORKSTATION PC (tech/workstation_pc.glb)
 * ========================================================================= */
async function buildWorkstationPC() {
  const root = new THREE.Group();
  root.name = 'WorkstationPCRoot';

  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1F242B, roughness: 0.7 });
  const towerMat = new THREE.MeshStandardMaterial({ color: 0x1F2937, roughness: 0.6 });
  const ventMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 });
  const metalMat = new THREE.MeshStandardMaterial({ color: 0x9CA3AF, metalness: 0.8 });

  // A. MONITOR WIDESCREEN
  const monitorGroup = new THREE.Group();
  monitorGroup.name = 'MonitorGroup';
  monitorGroup.position.set(-0.08, 0.23, -0.10);

  // Base do monitor
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.02, 0.18), darkMat);
  base.position.set(0, -0.19, 0);
  monitorGroup.add(base);

  // Haste
  const stem = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.20, 0.03), darkMat);
  stem.position.set(0, -0.09, -0.02);
  monitorGroup.add(stem);

  // Carcaça / Bezel traseiro
  const bezel = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.34, 0.03), darkMat);
  bezel.name = 'Chassis';
  bezel.position.set(0, 0.06, 0);
  bezel.castShadow = true;
  monitorGroup.add(bezel);

  // TELA EMISSIVA DINÂMICA (SUB-NÓ IDENTIFICADO)
  const screenMat = new THREE.MeshStandardMaterial({
    color: 0x2D6A4F,
    emissive: 0x2D6A4F,
    emissiveIntensity: 0.45,
    roughness: 0.25,
  });
  const screen = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.28, 0.005), screenMat);
  screen.name = 'ScreenDisplay';
  screen.position.set(0, 0.06, 0.018);
  monitorGroup.add(screen);

  // MICRO-LED DE STATUS (SUB-NÓ IDENTIFICADO)
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x2D6A4F });
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), ledMat);
  led.name = 'StatusLed';
  led.position.set(0.23, -0.07, 0.022);
  monitorGroup.add(led);
  root.add(monitorGroup);

  // B. GABINETE TORRE COMPACTO
  const towerGroup = new THREE.Group();
  towerGroup.name = 'TowerGroup';
  towerGroup.position.set(0.46, 0.19, -0.08);

  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.38, 0.38), towerMat);
  tower.name = 'TowerChassis';
  tower.castShadow = true;
  tower.receiveShadow = true;
  towerGroup.add(tower);

  const vent = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.16, 0.005), ventMat);
  vent.position.set(0, 0.04, 0.192);
  towerGroup.add(vent);

  const powerBtn = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.005, 12), metalMat);
  powerBtn.rotation.x = Math.PI / 2;
  powerBtn.position.set(0, 0.14, 0.193);
  towerGroup.add(powerBtn);

  const activityLed = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.015, 0.005), ledMat);
  activityLed.name = 'ActivityLed';
  activityLed.position.set(0, 0.10, 0.193);
  towerGroup.add(activityLed);
  root.add(towerGroup);

  // C. PERIFÉRICOS (TECLADO E MOUSE)
  const periphGroup = new THREE.Group();
  periphGroup.name = 'Peripherals';

  const mousepad = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.006, 0.18),
    new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.8 })
  );
  mousepad.position.set(0.18, 0.005, 0.15);
  periphGroup.add(mousepad);

  const mouse = new THREE.Mesh(
    new THREE.BoxGeometry(0.05, 0.02, 0.08),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 })
  );
  mouse.name = 'Mouse';
  mouse.position.set(0.18, 0.018, 0.15);
  mouse.castShadow = true;
  periphGroup.add(mouse);

  const kbdBase = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.016, 0.13), darkMat);
  kbdBase.position.set(-0.08, 0.010, 0.15);
  kbdBase.castShadow = true;
  periphGroup.add(kbdBase);

  const kbdKeys = new THREE.Mesh(
    new THREE.BoxGeometry(0.35, 0.008, 0.10),
    new THREE.MeshStandardMaterial({ color: 0x4B5563, roughness: 0.5 })
  );
  kbdKeys.name = 'KeyboardKeys';
  kbdKeys.position.set(-0.08, 0.020, 0.15);
  periphGroup.add(kbdKeys);
  root.add(periphGroup);

  return root;
}

/* =========================================================================
 * 6. THERMAL PRINTER (tech/thermal_printer.glb)
 * ========================================================================= */
async function buildThermalPrinter() {
  const root = new THREE.Group();
  root.name = 'ThermalPrinterRoot';

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(0.32, 0.20, 0.28),
    new THREE.MeshStandardMaterial({ color: 0xF9FAFB, roughness: 0.5 })
  );
  body.name = 'PrinterBody';
  body.position.set(0, 0.10, 0);
  body.castShadow = true;
  body.receiveShadow = true;
  root.add(body);

  const tray = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.02, 0.14),
    new THREE.MeshStandardMaterial({ color: 0xE5E7EB })
  );
  tray.position.set(0, 0.10, 0.05);
  root.add(tray);

  const paper = new THREE.Mesh(
    new THREE.BoxGeometry(0.18, 0.006, 0.12),
    new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.9 })
  );
  paper.name = 'PrintedPaper';
  paper.position.set(0, 0.115, 0.06);
  root.add(paper);

  const led = new THREE.Mesh(
    new THREE.SphereGeometry(0.012, 10, 10),
    new THREE.MeshBasicMaterial({ color: 0x2D6A4F })
  );
  led.name = 'SpoolerLed';
  led.position.set(0.11, 0.08, 0.145);
  root.add(led);

  return root;
}

/* =========================================================================
 * MAIN COMPILATION SCRIPT
 * ========================================================================= */
async function main() {
  console.log('=== BUILD GLB MODELS PIPELINE (RMM IPOJUCA) ===');

  const furnitureDir = path.join(publicModelsDir, 'furniture');
  const techDir = path.join(publicModelsDir, 'tech');
  ensureDir(furnitureDir);
  ensureDir(techDir);

  console.log('1. Building Reception Counter...');
  const receptionCounter = await buildReceptionCounter();
  await exportToGLB(receptionCounter, path.join(furnitureDir, 'reception_counter.glb'));

  console.log('2. Building Office Desk...');
  const officeDesk = await buildOfficeDesk();
  await exportToGLB(officeDesk, path.join(furnitureDir, 'office_desk.glb'));

  console.log('3. Building Ergonomic Chair...');
  const ergonomicChair = await buildErgonomicChair();
  await exportToGLB(ergonomicChair, path.join(furnitureDir, 'ergonomic_chair.glb'));

  console.log('4. Building Storage Cabinet...');
  const storageCabinet = await buildStorageCabinet();
  await exportToGLB(storageCabinet, path.join(furnitureDir, 'storage_cabinet.glb'));

  console.log('5. Building Workstation PC...');
  const workstationPC = await buildWorkstationPC();
  await exportToGLB(workstationPC, path.join(techDir, 'workstation_pc.glb'));

  console.log('6. Building Thermal Printer...');
  const thermalPrinter = await buildThermalPrinter();
  await exportToGLB(thermalPrinter, path.join(techDir, 'thermal_printer.glb'));

  console.log('=== ALL GLB MODELS COMPILED SUCCESSFULLY ===');
}

main().catch(err => {
  console.error('FAILED TO BUILD GLB MODELS:', err);
  process.exit(1);
});
