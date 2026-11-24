"""Gerador headless dos GLBs refinados do Gemeo Digital (Ciclo #39).

Executar:
  "C:/Program Files/Blender Foundation/Blender 5.3/blender.exe" \
      --background --python frontend/tools/blender/build_models.py

Saida: frontend/public/models/refined/*.glb

Diferente do gerador three.js (Ciclo #35), aqui a geometria passa por bevel
modifier com segmentos reais, subdivision surface nas pecas organicas e
shading suave por angulo. As dimensoes externas de cada peca sao mantidas
identicas as anteriores para nao alterar o layout da sala-piloto.

Eixos: Blender Z-up. O exportador glTF converte para Y-up.
  Blender +X -> glTF +X   (largura)
  Blender +Y -> glTF -Z   (profundidade)
  Blender +Z -> glTF +Y   (altura)
"""

import math
import os
import sys

import bpy
from mathutils import Vector

OUT_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "public", "models", "refined")
)


# --------------------------------------------------------------------- cena
def reset_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    scene.unit_settings.scale_length = 1.0


def material(name, color, roughness=0.5, metallic=0.0, emission=None):
    mat = bpy.data.materials.get(name)
    if mat:
        return mat
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1.0)
    bsdf.inputs["Roughness"].default_value = roughness
    bsdf.inputs["Metallic"].default_value = metallic
    if emission is not None:
        bsdf.inputs["Emission Color"].default_value = (*emission, 1.0)
        bsdf.inputs["Emission Strength"].default_value = 2.0
    return mat


def _finish(obj, mat, bevel, segments, smooth):
    obj.data.materials.append(mat)
    if bevel > 0:
        mod = obj.modifiers.new("Bevel", "BEVEL")
        mod.width = bevel
        mod.segments = segments
        mod.limit_method = "ANGLE"
        mod.angle_limit = math.radians(35)
        mod.harden_normals = True
    if smooth:
        for poly in obj.data.polygons:
            poly.use_smooth = True
    return obj


def box(name, size, loc, mat, bevel=0.008, segments=3, rot=(0, 0, 0), smooth=False):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    obj = bpy.context.object
    obj.name = name
    obj.scale = (size[0], size[1], size[2])
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return _finish(obj, mat, bevel, segments, smooth)


def cyl(name, radius, depth, loc, mat, rot=(0, 0, 0), verts=32, bevel=0.004, smooth=True):
    bpy.ops.mesh.primitive_cylinder_add(
        vertices=verts, radius=radius, depth=depth, location=loc, rotation=rot
    )
    obj = bpy.context.object
    obj.name = name
    return _finish(obj, mat, bevel, 2, smooth)


def sphere(name, radius, loc, mat, scale=(1, 1, 1), rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=16, radius=radius, location=loc)
    obj = bpy.context.object
    obj.name = name
    obj.scale = scale
    obj.rotation_euler = rot
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    return _finish(obj, mat, 0, 0, True)


def subsurf(obj, levels=2):
    mod = obj.modifiers.new("Subdivision", "SUBSURF")
    mod.levels = levels
    mod.render_levels = levels
    return obj


def export(name):
    os.makedirs(OUT_DIR, exist_ok=True)
    path = os.path.join(OUT_DIR, f"{name}.glb")
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.export_scene.gltf(
        filepath=path,
        export_format="GLB",
        use_selection=True,
        export_apply=True,
        export_yup=True,
        export_materials="EXPORT",
        export_normals=True,
    )
    size = os.path.getsize(path)
    print(f"[glb] {name}.glb {size} bytes")
    return path


# ---------------------------------------------------------------- materiais
def mats():
    return {
        "wood": material("WoodLight", (0.831, 0.588, 0.353), 0.52, 0.0),
        "wood_dark": material("WoodDark", (0.545, 0.322, 0.176), 0.50, 0.0),
        "laminate": material("Laminate", (0.965, 0.945, 0.906), 0.36, 0.02),
        "metal": material("Metal", (0.741, 0.769, 0.800), 0.24, 0.94),
        "metal_dark": material("MetalDark", (0.259, 0.286, 0.322), 0.32, 0.88),
        "graphite": material("Graphite", (0.145, 0.165, 0.196), 0.42, 0.38),
        "plastic": material("Plastic", (0.929, 0.918, 0.894), 0.50, 0.02),
        "fabric": material("Fabric", (0.106, 0.435, 0.541), 0.92, 0.0),
        "fabric_dark": material("FabricDark", (0.063, 0.302, 0.396), 0.92, 0.0),
        "screen": material("Screen", (0.035, 0.071, 0.125), 0.16, 0.1, emission=(0.06, 0.18, 0.32)),
        "accent": material("Accent", (0.043, 0.769, 0.518), 0.32, 0.0, emission=(0.05, 0.78, 0.52)),
        "white": material("White", (0.973, 0.976, 0.980), 0.40, 0.0),
        "glass": material("Glass", (0.588, 0.729, 0.804), 0.10, 0.05),
        "terracotta": material("Terracotta", (0.769, 0.412, 0.247), 0.68, 0.0),
        "soil": material("Soil", (0.239, 0.157, 0.090), 0.95, 0.0),
        "leaf_dark": material("LeafDark", (0.106, 0.478, 0.259), 0.72, 0.0),
        "leaf_light": material("LeafLight", (0.243, 0.686, 0.361), 0.70, 0.0),
        "teal": material("Teal", (0.129, 0.494, 0.443), 0.48, 0.0),
        "water": material("Water", (0.376, 0.647, 0.980), 0.08, 0.04),
        "steel": material("Steel", (0.804, 0.827, 0.851), 0.18, 0.96),
    }


# ------------------------------------------------------------------- pecas
def build_office_desk(M):
    """1.536 x 0.815 x 0.78 — gavetas em +Y, painel de modestia em -Y."""
    W, H, D = 1.536, 0.815, 0.78
    box("DeskTop", (W, D, 0.042), (0, 0, H - 0.021), M["wood"], bevel=0.012, segments=4)
    box("DeskTopEdge", (W - 0.02, D - 0.02, 0.006), (0, 0, H - 0.046), M["wood_dark"], bevel=0.003)
    for sx in (-1, 1):
        box(
            f"DeskLeg_{'L' if sx < 0 else 'R'}",
            (0.045, D - 0.05, H - 0.06),
            (sx * (W / 2 - 0.032), 0, (H - 0.06) / 2),
            M["metal_dark"],
            bevel=0.006,
        )
        box(
            f"DeskFoot_{'L' if sx < 0 else 'R'}",
            (0.06, 0.06, 0.012),
            (sx * (W / 2 - 0.032), D / 2 - 0.05, 0.006),
            M["metal_dark"],
            bevel=0.004,
        )
    box("DeskModesty", (W - 0.12, 0.022, 0.42), (0, -D / 2 + 0.09, H - 0.30), M["laminate"], bevel=0.006)
    # gaveteiro
    box("DeskDrawerUnit", (0.42, D - 0.12, H - 0.10), (W / 2 - 0.24, 0.02, (H - 0.10) / 2), M["laminate"], bevel=0.008)
    for i in range(3):
        z = 0.20 + i * 0.215
        box(f"DeskDrawerFront_{i}", (0.40, 0.02, 0.19), (W / 2 - 0.24, D / 2 - 0.055, z), M["white"], bevel=0.006)
        box(f"DeskDrawerHandle_{i}", (0.14, 0.018, 0.016), (W / 2 - 0.24, D / 2 - 0.042, z + 0.062), M["metal"], bevel=0.004)
    # passa-cabo
    cyl("DeskCableGrommet", 0.035, 0.05, (-W / 2 + 0.22, 0.02, H - 0.012), M["graphite"], verts=24)


def build_ergonomic_chair(M):
    """0.643 x 1.259 x 0.609 — encosto em -Y."""
    seat_z = 0.47
    seat = box("ChairSeat", (0.50, 0.48, 0.09), (0, 0.01, seat_z), M["fabric"], bevel=0.035, segments=5, smooth=True)
    subsurf(seat, 1)
    back = box("ChairBack", (0.46, 0.10, 0.60), (0, -0.235, seat_z + 0.36), M["fabric"], bevel=0.045, segments=5, smooth=True)
    back.rotation_euler = (math.radians(-8), 0, 0)
    subsurf(back, 1)
    box("ChairBackFrame", (0.40, 0.03, 0.52), (0, -0.29, seat_z + 0.36), M["fabric_dark"], bevel=0.012)
    box("ChairLumbar", (0.34, 0.05, 0.12), (0, -0.20, seat_z + 0.16), M["fabric_dark"], bevel=0.02, smooth=True)
    cyl("ChairColumn", 0.032, 0.30, (0, 0.01, seat_z - 0.20), M["metal"], verts=24)
    cyl("ChairColumnSleeve", 0.045, 0.10, (0, 0.01, seat_z - 0.10), M["metal_dark"], verts=24)
    for i in range(5):
        a = math.radians(i * 72)
        x, y = math.cos(a) * 0.16, math.sin(a) * 0.16
        box(
            f"ChairSpoke_{i}",
            (0.30, 0.045, 0.028),
            (x, y, 0.055),
            M["metal_dark"],
            bevel=0.008,
            rot=(0, 0, a),
        )
        cyl(f"ChairCaster_{i}", 0.028, 0.026, (math.cos(a) * 0.30, math.sin(a) * 0.30, 0.028), M["graphite"], rot=(math.pi / 2, 0, 0), verts=20)
    for sx in (-1, 1):
        box(f"ChairArmPost_{sx}", (0.03, 0.03, 0.20), (sx * 0.245, 0.02, seat_z + 0.10), M["metal_dark"], bevel=0.006)
        box(f"ChairArmPad_{sx}", (0.06, 0.26, 0.035), (sx * 0.245, 0.02, seat_z + 0.215), M["graphite"], bevel=0.014, smooth=True)


def build_workstation_pc(M):
    """0.881 x 0.467 x 0.453 — tela, LEDs, teclado e frente do gabinete em +Y (lado da cadeira)."""
    # Base e haste posicionadas atras do monitor (-Y), nunca atravessando a tela
    box("PcMonitorStand", (0.22, 0.16, 0.014), (-0.06, -0.075, 0.007), M["metal_dark"], bevel=0.004)
    box("PcMonitorNeck", (0.048, 0.028, 0.23), (-0.06, -0.095, 0.125), M["metal_dark"], bevel=0.005)
    box("PcMonitorVesa", (0.075, 0.026, 0.075), (-0.06, -0.074, 0.245), M["graphite"], bevel=0.004)

    # Moldura do monitor (y = -0.061 a -0.039) e tela plana UV limpa voltada para +Y (usuario)
    box("PcMonitorBezel", (0.56, 0.022, 0.34), (-0.06, -0.05, 0.275), M["graphite"], bevel=0.006, segments=4)
    bpy.ops.mesh.primitive_plane_add(
        size=1.0,
        location=(-0.06, -0.038, 0.280),
        rotation=(math.pi / 2, 0, math.pi),
    )
    screen_obj = bpy.context.object
    screen_obj.name = "ScreenDisplay"
    screen_obj.scale = (0.528, 0.304, 1.0)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    screen_obj.data.materials.append(M["screen"])

    box("PcMonitorChin", (0.56, 0.024, 0.020), (-0.06, -0.05, 0.112), M["graphite"], bevel=0.003)
    cyl("StatusLed", 0.005, 0.006, (0.16, -0.037, 0.112), M["accent"], rot=(math.pi / 2, 0, 0), verts=16)
    box("ActivityLed", (0.014, 0.005, 0.005), (0.195, -0.037, 0.112), M["accent"], bevel=0.001)
    # gabinete
    box("PcTowerBody", (0.19, 0.42, 0.40), (0.36, 0.0, 0.20), M["graphite"], bevel=0.012, segments=4)
    box("PcTowerFront", (0.175, 0.014, 0.38), (0.36, 0.212, 0.20), M["metal_dark"], bevel=0.006)
    for i in range(3):
        box(f"PcTowerSlot_{i}", (0.13, 0.006, 0.012), (0.36, 0.222, 0.30 - i * 0.035), M["metal"], bevel=0.002)
    cyl("PcTowerPower", 0.014, 0.008, (0.36, 0.222, 0.10), M["accent"], rot=(math.pi / 2, 0, 0), verts=20)
    # teclado e mouse
    box("PcKeyboard", (0.40, 0.14, 0.018), (-0.05, 0.20, 0.009), M["graphite"], bevel=0.006, segments=4)
    for r in range(4):
        for c in range(11):
            box(
                f"PcKey_{r}_{c}",
                (0.028, 0.024, 0.006),
                (-0.05 - 0.16 + c * 0.032, 0.20 - 0.048 + r * 0.032, 0.020),
                M["metal_dark"],
                bevel=0.002,
                segments=1,
            )
    box("PcMouse", (0.062, 0.10, 0.028), (0.21, 0.20, 0.014), M["graphite"], bevel=0.014, segments=5, smooth=True)


def build_thermal_printer(M):
    """0.464 x 0.332 x 0.39."""
    box("PrinterBase", (0.464, 0.36, 0.05), (0, 0, 0.025), M["graphite"], bevel=0.012, segments=4)
    box("PrinterBody", (0.44, 0.34, 0.20), (0, 0, 0.15), M["plastic"], bevel=0.016, segments=4)
    box("PrinterLid", (0.44, 0.34, 0.05), (0, 0, 0.275), M["white"], bevel=0.014, segments=4)
    box("PrinterSlot", (0.30, 0.012, 0.014), (0, -0.168, 0.245), M["graphite"], bevel=0.004)
    box("PrinterTray", (0.34, 0.10, 0.012), (0, -0.20, 0.20), M["metal_dark"], bevel=0.004)
    cyl("StatusLed_Printer", 0.007, 0.008, (-0.14, -0.172, 0.20), M["accent"], rot=(math.pi / 2, 0, 0), verts=16)
    box("PrinterButton", (0.05, 0.012, 0.02), (0.13, -0.172, 0.20), M["metal_dark"], bevel=0.004)


def build_reception_counter(M):
    """2.14 x 1.43 x 1.98 — L com tampo em balanco."""
    H = 1.02
    box("CounterMainBody", (2.10, 0.62, H - 0.06), (0, 0.30, (H - 0.06) / 2), M["wood"], bevel=0.014, segments=4)
    box("CounterMainTop", (2.14, 0.68, 0.05), (0, 0.30, H - 0.025), M["laminate"], bevel=0.016, segments=5)
    box("CounterMainKick", (2.06, 0.60, 0.08), (0, 0.30, 0.04), M["metal_dark"], bevel=0.006)
    box("CounterWingBody", (0.62, 1.30, H - 0.06), (-0.74, -0.34, (H - 0.06) / 2), M["wood"], bevel=0.014, segments=4)
    box("CounterWingTop", (0.68, 1.36, 0.05), (-0.74, -0.34, H - 0.025), M["laminate"], bevel=0.016, segments=5)
    box("CounterWingKick", (0.60, 1.26, 0.08), (-0.74, -0.34, 0.04), M["metal_dark"], bevel=0.006)
    # painel frontal com ripas
    for i in range(9):
        box(
            f"CounterSlat_{i}",
            (0.20, 0.02, H - 0.24),
            (-0.86 + i * 0.215, -0.005, (H - 0.24) / 2 + 0.10),
            M["wood_dark"],
            bevel=0.005,
        )
    # prateleira interna e passagem
    box("CounterShelf", (1.90, 0.44, 0.03), (0, 0.30, 0.62), M["laminate"], bevel=0.006)
    box("CounterDivider", (0.03, 0.58, 0.44), (0.55, 0.30, 0.80), M["laminate"], bevel=0.005)
    # rodape de acabamento
    box("CounterToeKick", (2.10, 0.02, 0.06), (0, -0.005, 0.03), M["metal_dark"], bevel=0.004)


def build_storage_cabinet(M):
    """0.928 x 1.8 x 0.474."""
    H = 1.80
    box("CabinetBody", (0.90, 0.44, H - 0.06), (0, 0, (H - 0.06) / 2), M["laminate"], bevel=0.010, segments=4)
    box("CabinetPlinth", (0.86, 0.40, 0.06), (0, 0, 0.03), M["metal_dark"], bevel=0.005)
    box("CabinetTop", (0.928, 0.474, 0.03), (0, 0, H - 0.015), M["wood"], bevel=0.008)
    for i, (z0, h) in enumerate([(0.10, 0.62), (0.74, 0.50), (1.26, 0.48)]):
        box(f"CabinetDoor_{i}", (0.86, 0.022, h), (0, 0.232, z0 + h / 2), M["white"], bevel=0.008, segments=4)
        box(f"CabinetHandle_{i}", (0.02, 0.026, 0.14), (0.34, 0.248, z0 + h / 2), M["metal"], bevel=0.006)
        box(f"CabinetHinge_{i}", (0.02, 0.02, 0.06), (-0.40, 0.244, z0 + 0.06), M["metal_dark"], bevel=0.003)
    box("CabinetLabel", (0.20, 0.006, 0.05), (-0.18, 0.245, 1.50), M["metal"], bevel=0.002)


def build_waiting_bench(M):
    """1.74 x 0.594 x 0.44."""
    box("BenchSeat", (1.74, 0.44, 0.07), (0, 0, 0.40), M["wood"], bevel=0.014, segments=4)
    box("BenchSeatCushion", (1.70, 0.42, 0.02), (0, 0, 0.445), M["fabric"], bevel=0.008, smooth=True)
    box("BenchBack", (1.74, 0.06, 0.20), (0, -0.19, 0.52), M["wood"], bevel=0.012, segments=4)
    for sx in (-1, 1):
        box(f"BenchLeg_{sx}", (0.06, 0.40, 0.38), (sx * 0.78, 0, 0.19), M["metal_dark"], bevel=0.008)
        box(f"BenchFoot_{sx}", (0.10, 0.44, 0.014), (sx * 0.78, 0, 0.007), M["metal_dark"], bevel=0.004)
    box("BenchRail", (1.60, 0.03, 0.04), (0, 0.02, 0.14), M["metal_dark"], bevel=0.006)


def build_decorative_plant(M):
    """Planta de vaso com folhagem organica (substitui os blocos quadrados).

    Altura total ~1.05 m. Folhas sao elipsoides achatados inclinados para fora,
    com subdivision surface, em vez de cubos.
    """
    cyl("PlantPot", 0.22, 0.54, (0, 0, 0.27), M["terracotta"], verts=32, bevel=0.012)
    cyl("PlantPotRim", 0.238, 0.055, (0, 0, 0.535), M["terracotta"], verts=32, bevel=0.010)
    cyl("PlantSoil", 0.205, 0.035, (0, 0, 0.552), M["soil"], verts=32, bevel=0.004)
    cyl("PlantStem", 0.018, 0.30, (0, 0, 0.70), M["leaf_dark"], verts=16, bevel=0.004)

    leaves = [
        (0.00, 0.00, 0.78, 0.150, 0.055, 34, 0.0, "leaf_dark"),
        (0.00, 0.00, 0.86, 0.130, 0.048, 22, 0.0, "leaf_light"),
        (0.00, 0.00, 0.94, 0.110, 0.042, 12, 0.0, "leaf_dark"),
    ]
    for i in range(8):
        a = math.radians(i * 45 + 12)
        r = 0.135 + 0.035 * (i % 3)
        h = 0.72 + 0.055 * (i % 4)
        leaves.append((math.cos(a) * r, math.sin(a) * r, h, 0.155, 0.052, 46, a, "leaf_light" if i % 2 else "leaf_dark"))

    for i, (x, y, z, length, width, tilt, yaw, mat_key) in enumerate(leaves):
        sphere(
            f"PlantLeaf_{i}",
            1.0,
            (x, y, z),
            M[mat_key],
            scale=(width, length, width * 0.42),
            rot=(math.radians(tilt), 0, yaw),
        )


def build_water_dispenser(M):
    """Bebedouro de coluna hospitalar com gabinete chanfrado e galao de 20 L.

    Substitui o bebedouro feito de caixas puras. Pegada 0.38 x 0.38 m,
    altura total ~1.56 m, mesma ocupacao do objeto anterior.
    """
    # Gabinete com chanfro real e cantos suavizados
    body = box("DispenserBody", (0.38, 0.38, 0.96), (0, 0, 0.48), M["white"], bevel=0.022, segments=4)
    subsurf(body, 1)

    # Painel frontal rebaixado, com moldura
    box("DispenserPanel", (0.30, 0.022, 0.60), (0, -0.192, 0.44), M["laminate"], bevel=0.010, segments=3)
    box("DispenserPanelTrim", (0.32, 0.010, 0.62), (0, -0.186, 0.44), M["steel"], bevel=0.004, segments=2)

    # Pingadeira em inox com grade
    box("DispenserDripTray", (0.26, 0.105, 0.030), (0, -0.180, 0.615), M["steel"], bevel=0.006, segments=3)
    for i in range(5):
        box(
            f"DispenserDripBar_{i}",
            (0.235, 0.008, 0.008),
            (0, -0.205 + i * 0.012, 0.632),
            M["metal_dark"],
            bevel=0.002,
            segments=2,
        )

    # Torneiras quente/fria com alavanca
    for i, (dx, mat_key) in enumerate(((-0.062, "water"), (0.062, "accent"))):
        cyl(f"DispenserTap_{i}", 0.014, 0.055, (dx, -0.205, 0.700), M[mat_key], verts=20, bevel=0.003)
        cyl(
            f"DispenserLever_{i}",
            0.010,
            0.048,
            (dx, -0.228, 0.735),
            M["steel"],
            rot=(math.radians(90), 0, 0),
            verts=16,
            bevel=0.002,
        )

    # Colar de apoio do galao
    cyl("DispenserCollar", 0.162, 0.055, (0, 0, 0.985), M["steel"], verts=40, bevel=0.008)
    cyl("DispenserCollarInner", 0.120, 0.030, (0, 0, 1.010), M["metal_dark"], verts=32, bevel=0.004)

    # Galao de 20 L com silhueta suavizada
    bottle = cyl("DispenserBottle", 0.150, 0.440, (0, 0, 1.245), M["water"], verts=40, bevel=0.020)
    subsurf(bottle, 2)
    cyl("DispenserBottleNeck", 0.058, 0.090, (0, 0, 1.500), M["water"], verts=28, bevel=0.010)
    cyl("DispenserBottleCap", 0.050, 0.048, (0, 0, 1.556), M["teal"], verts=28, bevel=0.008)

    # LED de status no painel
    cyl(
        "StatusLed_Dispenser",
        0.011,
        0.010,
        (0.118, -0.200, 0.760),
        M["accent"],
        rot=(math.radians(90), 0, 0),
        verts=16,
        bevel=0.002,
    )


BUILDERS = {
    "office_desk": build_office_desk,
    "ergonomic_chair": build_ergonomic_chair,
    "workstation_pc": build_workstation_pc,
    "thermal_printer": build_thermal_printer,
    "reception_counter": build_reception_counter,
    "storage_cabinet": build_storage_cabinet,
    "waiting_bench": build_waiting_bench,
    "decorative_plant": build_decorative_plant,
    "water_dispenser": build_water_dispenser,
}


def main():
    only = None
    if "--" in sys.argv:
        args = sys.argv[sys.argv.index("--") + 1 :]
        if args:
            only = set(args)
    for name, builder in BUILDERS.items():
        if only and name not in only:
            continue
        reset_scene()
        builder(mats())
        export(name)
    print("[done] modelos gerados em", OUT_DIR)


main()
