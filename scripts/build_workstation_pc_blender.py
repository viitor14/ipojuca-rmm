"""
Script Python para o Blender 4.2 LTS:
Gera o modelo profissional 'workstation_pc.glb' para o RMM Ipojuca
Inspirado na linguagem visual isométrica refinada do Habblaude.

Componentes:
- Monitor Widescreen com Bezel chanfrado
- ScreenDisplay desacoplado (Tela independente para conteúdo de SO)
- StatusLed (Micro-LED indicador dinâmico de telemetria)
- Suporte tubular e base chanfrada
- Mini-Torre com grade de ventilação, botão Power e portas USB
- Teclado ergonômico com teclas modeladas
- Mouse anatômico com scroll wheel e mousepad
- Origem em Z=0 (base de contato com a mesa)
"""

import bpy
import bmesh
import math
import os
import sys

# 1. Limpa a cena inicial do Blender
bpy.ops.wm.read_factory_settings(use_empty=True)

scene = bpy.context.scene
scene.unit_settings.system = 'METRIC'
scene.unit_settings.scale_length = 1.0

# 2. Criação de Coleção Organizada
collection = bpy.data.collections.new("WorkstationPC_Collection")
scene.collection.children.link(collection)

def make_material(name, base_color, roughness=0.5, metallic=0.0, emission_color=(0,0,0,1), emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf:
        # Blender 4.x Principled BSDF sockets
        if "Base Color" in bsdf.inputs:
            bsdf.inputs["Base Color"].default_value = base_color
        if "Roughness" in bsdf.inputs:
            bsdf.inputs["Roughness"].default_value = roughness
        if "Metallic" in bsdf.inputs:
            bsdf.inputs["Metallic"].default_value = metallic
        if "Emission Color" in bsdf.inputs:
            bsdf.inputs["Emission Color"].default_value = emission_color
        if "Emission Strength" in bsdf.inputs:
            bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat

# Materiais PBR
mat_dark_chassis = make_material("Mat_DarkChassis", (0.12, 0.14, 0.17, 1.0), roughness=0.45, metallic=0.1)
mat_silver_metal = make_material("Mat_SilverMetal", (0.75, 0.78, 0.82, 1.0), roughness=0.25, metallic=0.88)
mat_screen_bezel = make_material("Mat_ScreenBezel", (0.09, 0.10, 0.12, 1.0), roughness=0.4, metallic=0.05)
mat_screen_display = make_material("Mat_ScreenDisplay", (0.08, 0.12, 0.18, 1.0), roughness=0.2, emission_color=(0.10, 0.18, 0.28, 1.0), emission_strength=0.35)
mat_status_led = make_material("Mat_StatusLed", (0.06, 0.72, 0.40, 1.0), roughness=0.1, emission_color=(0.06, 0.85, 0.45, 1.0), emission_strength=2.2)
mat_keyboard_base = make_material("Mat_KeyboardBase", (0.14, 0.16, 0.19, 1.0), roughness=0.5)
mat_keycaps = make_material("Mat_Keycaps", (0.22, 0.25, 0.30, 1.0), roughness=0.35)
mat_mouse = make_material("Mat_Mouse", (0.16, 0.18, 0.22, 1.0), roughness=0.3)
mat_mousepad = make_material("Mat_Mousepad", (0.10, 0.12, 0.15, 1.0), roughness=0.8)
mat_tower = make_material("Mat_Tower", (0.11, 0.13, 0.16, 1.0), roughness=0.4)
mat_vent_grill = make_material("Mat_VentGrill", (0.06, 0.07, 0.09, 1.0), roughness=0.7)
mat_accent_led = make_material("Mat_AccentLed", (0.20, 0.50, 0.95, 1.0), emission_color=(0.20, 0.50, 0.95, 1.0), emission_strength=1.8)

# Funções Auxiliares de Modelagem
def add_beveled_box(name, size, location, material, bevel_width=0.006, segments=3):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = size
    bpy.ops.object.transform_apply(scale=True)
    
    # Adiciona Bevel
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = bevel_width
    bev.segments = segments
    bev.limit_method = 'ANGLE'
    bev.angle_limit = math.radians(40)
    
    # Shade Smooth com Auto Smooth
    for poly in obj.data.polygons:
        poly.use_smooth = True
        
    obj.data.materials.append(material)
    return obj

def add_cylinder(name, radius, depth, location, material, vertices=24):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, vertices=vertices, location=location)
    obj = bpy.context.active_object
    obj.name = name
    for poly in obj.data.polygons:
        poly.use_smooth = True
    obj.data.materials.append(material)
    return obj

# ==============================================================================
# 1. MONITOR WIDESCREEN SLIM COM BASE ARREDONDADA E TELA DESACOPLADA
# ==============================================================================
monitor_center_x = -0.06
monitor_center_z = -0.10
desk_surface_y = 0.0

# Base do monitor (Disco chanfrado esbelto com recorte traseiro)
base_obj = add_beveled_box(
    name="MonitorBase",
    size=(0.22, 0.16, 0.012),
    location=(monitor_center_x, monitor_center_z, 0.006),
    material=mat_silver_metal,
    bevel_width=0.004,
    segments=3
)

# Haste cilíndrica de suporte metálico
stem_obj = add_cylinder(
    name="MonitorStem",
    radius=0.014,
    depth=0.22,
    location=(monitor_center_x, monitor_center_z - 0.03, 0.11),
    material=mat_silver_metal,
    vertices=20
)

# Articulação / VESA Mount atrás do monitor
mount_obj = add_beveled_box(
    name="MonitorMount",
    size=(0.06, 0.035, 0.06),
    location=(monitor_center_x, monitor_center_z - 0.015, 0.22),
    material=mat_dark_chassis,
    bevel_width=0.003
)

# Moldura / Bezel do Monitor (Chanfrado, fino e elegante)
screen_y_pos = monitor_center_z + 0.015
screen_z_center = 0.24

bezel_obj = add_beveled_box(
    name="MonitorBezel",
    size=(0.54, 0.022, 0.33),
    location=(monitor_center_x, screen_y_pos - 0.011, screen_z_center),
    material=mat_screen_bezel,
    bevel_width=0.005,
    segments=4
)

# TELA INDEPENDENTE (ScreenDisplay)
# Sub-nó nomeado explicitamente para integração de telemetria no R3F
screen_obj = add_beveled_box(
    name="ScreenDisplay",
    size=(0.505, 0.004, 0.295),
    location=(monitor_center_x, screen_y_pos + 0.001, screen_z_center + 0.004),
    material=mat_screen_display,
    bevel_width=0.001,
    segments=1
)

# STATUS LED (Micro-LED indicador de telemetria do equipamento)
# Sub-nó nomeado explicitamente: StatusLed
bpy.ops.mesh.primitive_uv_sphere_add(
    radius=0.0045,
    location=(monitor_center_x + 0.235, screen_y_pos + 0.002, screen_z_center - 0.145)
)
status_led_obj = bpy.context.active_object
status_led_obj.name = "StatusLed"
for poly in status_led_obj.data.polygons:
    poly.use_smooth = True
status_led_obj.data.materials.append(mat_status_led)

# Detalhe do Logo sutil do Fabricante no centro inferior do bezel
logo_badge = add_beveled_box(
    name="MonitorBadge",
    size=(0.030, 0.002, 0.008),
    location=(monitor_center_x, screen_y_pos + 0.001, screen_z_center - 0.145),
    material=mat_silver_metal,
    bevel_width=0.001
)

# ==============================================================================
# 2. GABINETE MINI-TORRE (DESKTOP PRO ESTILIZADO)
# ==============================================================================
tower_x = 0.42
tower_y = -0.06
tower_w = 0.16
tower_d = 0.34
tower_h = 0.35

tower_body = add_beveled_box(
    name="TowerChassis",
    size=(tower_w, tower_d, tower_h),
    location=(tower_x, tower_y, tower_h / 2.0),
    material=mat_tower,
    bevel_width=0.008,
    segments=4
)

# Painel Frontal com Friso de Ventilação
front_face_y = tower_y + (tower_d / 2.0)
grill_obj = add_beveled_box(
    name="TowerFrontGrill",
    size=(tower_w - 0.024, 0.008, 0.18),
    location=(tower_x, front_face_y + 0.004, 0.13),
    material=mat_vent_grill,
    bevel_width=0.003
)

# Aletas de ventilação horizontais esculpidas
for idx, z_slot in enumerate([-0.06, -0.03, 0.0, 0.03, 0.06]):
    slot = add_beveled_box(
        name=f"VentSlot_{idx}",
        size=(tower_w - 0.045, 0.004, 0.010),
        location=(tower_x, front_face_y + 0.008, 0.13 + z_slot),
        material=mat_dark_chassis,
        bevel_width=0.001
    )

# Botão Power Metálico
power_btn = add_cylinder(
    name="PowerButton",
    radius=0.009,
    depth=0.006,
    location=(tower_x - 0.04, front_face_y + 0.004, 0.29),
    material=mat_silver_metal,
    vertices=16
)
power_btn.rotation_euler = (math.radians(90), 0, 0)

# Micro-LED de Atividade (ActivityLed)
activity_led = add_cylinder(
    name="ActivityLed",
    radius=0.0035,
    depth=0.005,
    location=(tower_x - 0.04, front_face_y + 0.004, 0.265),
    material=mat_accent_led,
    vertices=12
)
activity_led.rotation_euler = (math.radians(90), 0, 0)

# Duas Portas USB Frontais
for u_idx, u_z in enumerate([0.29, 0.265]):
    usb_port = add_beveled_box(
        name=f"FrontUsb_{u_idx}",
        size=(0.014, 0.004, 0.006),
        location=(tower_x + 0.035, front_face_y + 0.004, u_z),
        material=mat_dark_chassis,
        bevel_width=0.001
    )

# Sapatas de Borracha na Base do Gabinete (4 pés)
for foot_idx, (fx, fy) in enumerate([(-0.06, -0.13), (0.06, -0.13), (-0.06, 0.13), (0.06, 0.13)]):
    foot = add_cylinder(
        name=f"TowerFoot_{foot_idx}",
        radius=0.010,
        depth=0.004,
        location=(tower_x + fx, tower_y + fy, 0.002),
        material=mat_screen_bezel,
        vertices=12
    )

# ==============================================================================
# 3. PERIFÉRICOS (MOUSEPAD, TECLADO E MOUSE ANATÔMICO)
# ==============================================================================
# Mousepad discreto com borda costurada
pad_x = 0.18
pad_y = 0.16
mousepad = add_beveled_box(
    name="Mousepad",
    size=(0.20, 0.22, 0.004),
    location=(pad_x, pad_y, 0.002),
    material=mat_mousepad,
    bevel_width=0.002
)

# Mouse Anatômico com perfil curvo
mouse = add_beveled_box(
    name="Mouse",
    size=(0.062, 0.108, 0.024),
    location=(pad_x, pad_y, 0.016),
    material=mat_mouse,
    bevel_width=0.008,
    segments=4
)

# Scroll Wheel Metálica do Mouse
scroll_wheel = add_cylinder(
    name="MouseScrollWheel",
    radius=0.005,
    depth=0.004,
    location=(pad_x, pad_y + 0.024, 0.028),
    material=mat_silver_metal,
    vertices=12
)
scroll_wheel.rotation_euler = (0, math.radians(90), 0)

# Teclado Ergonômico Slim
kbd_x = -0.06
kbd_y = 0.16
kbd_base = add_beveled_box(
    name="KeyboardBase",
    size=(0.38, 0.14, 0.012),
    location=(kbd_x, kbd_y, 0.006),
    material=mat_keyboard_base,
    bevel_width=0.003,
    segments=3
)
kbd_base.rotation_euler = (math.radians(-3), 0, 0)

# Blocos de Teclas Esculpidas
# 1. Bloco Principal Alfanumérico
key_block_main = add_beveled_box(
    name="KeyBlockMain",
    size=(0.28, 0.09, 0.006),
    location=(kbd_x - 0.035, kbd_y, 0.014),
    material=mat_keycaps,
    bevel_width=0.001
)
key_block_main.rotation_euler = (math.radians(-3), 0, 0)

# 2. Barra de Espaço Destacada
spacebar = add_beveled_box(
    name="KeySpacebar",
    size=(0.11, 0.016, 0.006),
    location=(kbd_x - 0.035, kbd_y - 0.038, 0.014),
    material=mat_keycaps,
    bevel_width=0.001
)
spacebar.rotation_euler = (math.radians(-3), 0, 0)

# 3. Bloco Numérico / Setas à Direita
key_block_num = add_beveled_box(
    name="KeyBlockNum",
    size=(0.05, 0.11, 0.006),
    location=(kbd_x + 0.145, kbd_y, 0.014),
    material=mat_keycaps,
    bevel_width=0.001
)
key_block_num.rotation_euler = (math.radians(-3), 0, 0)

# ==============================================================================
# 4. APLICAÇÃO DE MODIFICADORES E EXPORTAÇÃO GLB
# ==============================================================================
# Seleciona todos os objetos criados para aplicar modificadores e exportar
bpy.ops.object.select_all(action='SELECT')

output_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "models", "tech")
os.makedirs(output_dir, exist_ok=True)
glb_filepath = os.path.abspath(os.path.join(output_dir, "workstation_pc.glb"))

print(f"[BLENDER PYTHON] Exportando GLB para: {glb_filepath}")

bpy.ops.export_scene.gltf(
    filepath=glb_filepath,
    export_format='GLB',
    export_apply=True,
    export_materials='EXPORT',
    export_cameras=False,
    export_lights=False
)

file_size = os.path.getsize(glb_filepath)
print(f"[BLENDER PYTHON SUCESSO] Arquivo gerado com sucesso: {file_size} bytes")
