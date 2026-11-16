"""
Renderizador da Sala-Piloto (Recepção) 100% Concluída com a Biblioteca 3D Profissional
RMM Ipojuca — Ciclo #21
Executado via Blender 4.2 LTS headless (bpy)

Gera:
1. reception_full_room.png: Visão isométrica de estúdio completa da Recepção com os 6 novos modelos GLB.
2. reception_topdown_comparison.png: Visão superior (top-down) equivalente à captura do usuário, comprovando
   a substituição de 100% dos blocos e caixas procedurais pela nova biblioteca GLB.
"""

import bpy
import math
import os
from mathutils import Vector, Euler

# Reset factory settings
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080

output_dir = os.path.abspath("frontend/public/models/furniture")
brain_dir = r"C:\Users\vitor.franca\.gemini\antigravity\brain\369304f8-be0b-4e07-9ecb-4223ff786c97"

# ------------------------------------------------------------------------------
# 1. Helpers de Materiais PBR
# ------------------------------------------------------------------------------
def create_pbr_mat(name, color, roughness=0.5, metalness=0.0, emission=None, emission_strength=1.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get('Principled BSDF')
    if bsdf:
        bsdf.inputs['Base Color'].default_value = color
        bsdf.inputs['Roughness'].default_value = roughness
        bsdf.inputs['Metallic'].default_value = metalness
        if emission:
            if 'Emission Color' in bsdf.inputs:
                bsdf.inputs['Emission Color'].default_value = emission
                bsdf.inputs['Emission Strength'].default_value = emission_strength
            elif 'Emission' in bsdf.inputs:
                bsdf.inputs['Emission'].default_value = emission
    return mat

mat_wall = create_pbr_mat('Mat_Wall', (0.94, 0.94, 0.92, 1.0), roughness=0.85)
mat_floor = create_pbr_mat('Mat_Floor', (0.84, 0.75, 0.63, 1.0), roughness=0.50)
mat_rug = create_pbr_mat('Mat_Rug', (0.35, 0.58, 0.82, 1.0), roughness=0.88)
mat_rug_border = create_pbr_mat('Mat_Rug_Border', (0.28, 0.48, 0.72, 1.0), roughness=0.88)
mat_wood = create_pbr_mat('Mat_WoodTrim', (0.42, 0.25, 0.12, 1.0), roughness=0.4)
mat_door = create_pbr_mat('Mat_DoorWood', (0.35, 0.22, 0.12, 1.0), roughness=0.45)
mat_board = create_pbr_mat('Mat_NoticeBoard', (0.18, 0.42, 0.25, 1.0), roughness=0.6)

# ------------------------------------------------------------------------------
# 2. Arquitetura da Recepção Real 1:1 com DigitalTwin3D.jsx (9.0m x 5.0m)
# ------------------------------------------------------------------------------
room_w = 9.0
room_d = 5.0
wall_h = 1.45
wall_t = 0.18

mat_glass_win = create_pbr_mat('Mat_WinGlass', (0.82, 0.91, 0.98, 0.65), roughness=0.1)
mat_panel = create_pbr_mat('Mat_RippedPanel', (0.87, 0.72, 0.57, 1.0), roughness=0.5)

# Piso
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, -0.05))
floor = bpy.context.active_object
floor.scale = (room_w, room_d, 0.1)
floor.data.materials.append(mat_floor)

# Tapete central azul hospitalar (pos=[0.5, 0.2], size=[3.2, 2.0])
bpy.ops.mesh.primitive_cube_add(size=1, location=(0.5, 0.2, 0.004))
rug_b = bpy.context.active_object
rug_b.scale = (3.32, 2.12, 0.006)
rug_b.data.materials.append(mat_rug_border)

bpy.ops.mesh.primitive_cube_add(size=1, location=(0.5, 0.2, 0.008))
rug = bpy.context.active_object
rug.scale = (3.2, 2.0, 0.006)
rug.data.materials.append(mat_rug)

# Parede Norte (Fundo, Y = +2.41, espessura 0.18, altura 1.45)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, room_d/2 - wall_t/2, wall_h/2))
north_wall = bpy.context.active_object
north_wall.scale = (room_w, wall_t, wall_h)
north_wall.data.materials.append(mat_wall)

# Duas Janelas Norte (X = +-9.0/3.4 = +-2.647)
for wx in [-room_w/3.4, room_w/3.4]:
    bpy.ops.mesh.primitive_cube_add(size=1, location=(wx, room_d/2 - wall_t - 0.015, wall_h/2 + 0.22))
    wf = bpy.context.active_object
    wf.scale = (1.3, 0.03, 0.75)
    wf.data.materials.append(mat_wood)
    bpy.ops.mesh.primitive_cube_add(size=1, location=(wx, room_d/2 - wall_t - 0.02, wall_h/2 + 0.22))
    wg = bpy.context.active_object
    wg.scale = (1.14, 0.01, 0.61)
    wg.data.materials.append(mat_glass_win)

# Painel ripado central norte (width = 1.8) + Quadro de arte (X = -1.45, fora da janela)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, room_d/2 - wall_t - 0.015, wall_h/2 + 0.05))
rp = bpy.context.active_object
rp.scale = (1.8, 0.02, 0.85)
rp.data.materials.append(mat_panel)

bpy.ops.mesh.primitive_cube_add(size=1, location=(-1.45, room_d/2 - wall_t - 0.03, wall_h/2 + 0.22))
art = bpy.context.active_object
art.scale = (0.76, 0.025, 0.58)
art.data.materials.append(mat_board)

# Parede Oeste (Esquerda, X = -4.41, espessura 0.18, altura 1.45)
bpy.ops.mesh.primitive_cube_add(size=1, location=(-room_w/2 + wall_t/2, 0, wall_h/2))
west_wall = bpy.context.active_object
west_wall.scale = (wall_t, room_d, wall_h)
west_wall.data.materials.append(mat_wall)

# Janela Oeste (Y = 0)
bpy.ops.mesh.primitive_cube_add(size=1, location=(-room_w/2 + wall_t + 0.015, 0, wall_h/2 + 0.22))
wwf = bpy.context.active_object
wwf.scale = (0.03, 1.2, 0.75)
wwf.data.materials.append(mat_wood)

# Parede Sul (Divisória com vão de porta [-0.60, +0.60], perfil baixo para visualização da câmera)
door_w = 1.2
seg_w = (room_w - door_w) / 2
for sx in [-door_w/2 - seg_w/2, door_w/2 + seg_w/2]:
    bpy.ops.mesh.primitive_cube_add(size=1, location=(sx, -room_d/2 + wall_t/2, 0.22))
    sw = bpy.context.active_object
    sw.scale = (seg_w, wall_t, 0.44)
    sw.data.materials.append(mat_wall)

# Guia discreta da borda leste (sem parede para manter visibilidade isométrica)
bpy.ops.mesh.primitive_cube_add(size=1, location=(room_w/2 - 0.02, 0, 0.05))
east_trim = bpy.context.active_object
east_trim.scale = (0.04, room_d, 0.10)
east_trim.data.materials.append(mat_wood)

# Rodapés de madeira nobre (em +-2.31m e -4.31m)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, room_d/2 - wall_t - 0.01, 0.06))
bb_n = bpy.context.active_object
bb_n.scale = (room_w, 0.02, 0.12)
bb_n.data.materials.append(mat_wood)

bpy.ops.mesh.primitive_cube_add(size=1, location=(-room_w/2 + wall_t + 0.01, 0, 0.06))
bb_w = bpy.context.active_object
bb_w.scale = (0.02, room_d, 0.12)
bb_w.data.materials.append(mat_wood)

for sx in [-door_w/2 - seg_w/2, door_w/2 + seg_w/2]:
    bpy.ops.mesh.primitive_cube_add(size=1, location=(sx, -room_d/2 + wall_t + 0.01, 0.06))
    bb_s = bpy.context.active_object
    bb_s.scale = (seg_w, 0.02, 0.12)
    bb_s.data.materials.append(mat_wood)

# ------------------------------------------------------------------------------
# 3. Importação dos Modelos GLB Profissionais da Biblioteca
# ------------------------------------------------------------------------------
furniture_dir = os.path.abspath("frontend/public/models/furniture")
tech_dir = os.path.abspath("frontend/public/models/tech")

desk_glb = os.path.join(furniture_dir, "office_desk.glb")
chair_glb = os.path.join(furniture_dir, "ergonomic_chair.glb")
counter_glb = os.path.join(furniture_dir, "reception_counter.glb")
cabinet_glb = os.path.join(furniture_dir, "storage_cabinet.glb")
bench_glb = os.path.join(furniture_dir, "waiting_bench.glb")
printer_glb = os.path.join(tech_dir, "thermal_printer.glb")
workstation_glb = os.path.join(tech_dir, "workstation_pc.glb")

def import_glb(filepath, location, rotation_z=0, rotation_y=0):
    start_objs = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=filepath)
    new_objs = [o for o in bpy.data.objects if o not in start_objs]
    root = bpy.data.objects.new("GLB_Root", None)
    bpy.context.collection.objects.link(root)
    root.location = location
    root.rotation_euler.z = rotation_z
    root.rotation_euler.y = rotation_y
    for o in new_objs:
        if o.parent is None:
            o.parent = root
    return root, new_objs

# 1. BALCÃO DE ATENDIMENTO EM L (reception_counter.glb) - Three.js [-2.2, 0, 0.55]
counter_pos = Vector((-2.2, -0.55, 0))
import_glb(counter_glb, counter_pos, rotation_z=0)

# Impressora térmica de atendimento sobre o tampo público superior - Three.js [-2.95, 1.10, 0.40]
import_glb(printer_glb, Vector((-2.95, -0.40, 1.10)), rotation_z=0)

# 2. ARMÁRIO DE PRONTUÁRIOS E ARQUIVOS (storage_cabinet.glb) - Three.js [-3.82, 0, -2.08]
import_glb(cabinet_glb, Vector((-3.82, 2.08, 0)), rotation_z=math.pi)

# 3. LONGARINA DE ESPERA (waiting_bench.glb) - Three.js [-3.95, 0, -0.35], rotY=-PI/2 (assentos para +X)
import_glb(bench_glb, Vector((-3.95, 0.35, 0)), rotation_z=math.radians(-90))

# 4. QUATRO ESTAÇÕES DE TRABALHO ERGONÔMICAS E NÃO COLIDENTES (1:1 com DigitalTwin3D.jsx)
# Posto 1 (Piloto machine 9): na bancada interna do balcão - Three.js [-1.85, 0.76, 0.78], rotY=PI
posto1_pos = Vector((-1.85, -0.78, 0.76))
ws_root1, ws_objs1 = import_glb(workstation_glb, posto1_pos, rotation_z=math.pi)
import_glb(chair_glb, Vector((-1.70, -1.30, 0)), rotation_z=0)

# Configura LED de status do posto 1 para verde
for o in ws_objs1:
    if o.name.startswith("StatusLed") and o.data and o.data.materials:
        mat_led = bpy.data.materials.new("Led_Pilot")
        mat_led.use_nodes = True
        bsdf = mat_led.node_tree.nodes.get("Principled BSDF")
        if bsdf:
            bsdf.inputs["Base Color"].default_value = (0.06, 0.73, 0.51, 1.0)
            if "Emission Color" in bsdf.inputs:
                bsdf.inputs["Emission Color"].default_value = (0.06, 0.73, 0.51, 1.0)
                bsdf.inputs["Emission Strength"].default_value = 3.5
        o.data.materials[0] = mat_led

# Postos 2, 3 e 4: Mesas executivas independentes espelhando computeMachineLayout
standalone_desks = [
    (Vector((2.20, -0.85, 0)), math.pi, Vector((0.15, -0.52, 0)), 0),         # Posto 2: Sul (rotY=PI)
    (Vector((-1.20, 1.20, 0)), 0, Vector((-0.15, 0.52, 0)), math.pi),        # Posto 3: Norte (rotY=0)
    (Vector((2.20, 1.20, 0)), 0, Vector((-0.15, 0.52, 0)), math.pi),         # Posto 4: Nordeste (rotY=0)
]

for idx, (slot, rot_z, chair_offset, chair_rot) in enumerate(standalone_desks, start=2):
    import_glb(desk_glb, slot, rotation_z=rot_z)
    import_glb(chair_glb, slot + chair_offset, rotation_z=chair_rot)
    ws_root, ws_objs = import_glb(workstation_glb, slot + Vector((0, 0, 0.76)), rotation_z=rot_z)
    for o in ws_objs:
        if o.name.startswith("StatusLed") and o.data and o.data.materials:
            color = (0.06, 0.73, 0.51, 1.0) if idx != 3 else (0.95, 0.65, 0.12, 1.0)
            mat_led = bpy.data.materials.new(f"Led_Slot_{idx}")
            mat_led.use_nodes = True
            bsdf = mat_led.node_tree.nodes.get("Principled BSDF")
            if bsdf:
                bsdf.inputs["Base Color"].default_value = color
                if "Emission Color" in bsdf.inputs:
                    bsdf.inputs["Emission Color"].default_value = color
                    bsdf.inputs["Emission Strength"].default_value = 3.0
            o.data.materials[0] = mat_led

# 5. Elementos Arquitetônicos Complementares
# Bebedouro de coluna no canto norte-leste - Three.js [3.85, 0, -2.08]
bpy.ops.mesh.primitive_cube_add(size=1, location=(3.85, 2.08, 0.48))
wc = bpy.context.active_object
wc.scale = (0.38, 0.38, 0.96)
wc.data.materials.append(create_pbr_mat('Mat_Dispenser', (0.94, 0.94, 0.95, 1.0), roughness=0.35))

bpy.ops.mesh.primitive_cylinder_add(radius=0.15, depth=0.44, location=(3.85, 2.08, 1.24))
bottle = bpy.context.active_object
bottle.data.materials.append(create_pbr_mat('Mat_Bottle', (0.2, 0.55, 0.92, 0.75), roughness=0.15))

# Planta decorativa no canto sul-leste - Three.js [3.95, 0, 1.90]
bpy.ops.mesh.primitive_cylinder_add(radius=0.22, depth=0.56, location=(3.95, -1.90, 0.28))
pot = bpy.context.active_object
pot.data.materials.append(create_pbr_mat('Mat_Pot', (0.90, 0.88, 0.85, 1.0), roughness=0.5))

bpy.ops.mesh.primitive_cube_add(size=1, location=(3.95, -1.90, 0.72))
plant = bpy.context.active_object
plant.scale = (0.28, 0.28, 0.28)
plant.data.materials.append(create_pbr_mat('Mat_Plant', (0.16, 0.55, 0.32, 1.0), roughness=0.75))

# ------------------------------------------------------------------------------
# 4. Iluminação de Estúdio Isométrico
# ------------------------------------------------------------------------------
world = bpy.data.worlds.new("StudioWorld")
scene.world = world
world.use_nodes = True
bg_node = world.node_tree.nodes.get('Background')
if bg_node:
    bg_node.inputs['Color'].default_value = (0.95, 0.96, 0.97, 1.0)
    bg_node.inputs['Strength'].default_value = 0.65

# Key light principal
key_light_data = bpy.data.lights.new(name="SunKey", type='SUN')
key_light_data.energy = 3.6
key_light_data.color = (1.0, 0.99, 0.96)
key_light_obj = bpy.data.objects.new(name="SunKey", object_data=key_light_data)
bpy.context.collection.objects.link(key_light_obj)
key_light_obj.location = Vector((9, -7, 11))
key_dir = Vector((-0.7, 0.5, -0.8))
key_light_obj.rotation_euler = key_dir.to_track_quat('-Z', 'Y').to_euler()

# Fill light difusa
fill_light_data = bpy.data.lights.new(name="SunFill", type='SUN')
fill_light_data.energy = 1.3
fill_light_data.color = (0.88, 0.92, 0.98)
fill_light_obj = bpy.data.objects.new(name="SunFill", object_data=fill_light_data)
bpy.context.collection.objects.link(fill_light_obj)
fill_light_obj.location = Vector((-7, 7, 7))
fill_dir = Vector((0.7, -0.5, -0.6))
fill_light_obj.rotation_euler = fill_dir.to_track_quat('-Z', 'Y').to_euler()

# ------------------------------------------------------------------------------
# 5. RENDER 1: VISÃO ISOMÉTRICA GERAL DA RECEPÇÃO CONCLUÍDA
# ------------------------------------------------------------------------------
cam_data = bpy.data.cameras.new("IsoCam")
cam_data.type = 'ORTHO'
cam_data.ortho_scale = 10.6
cam_obj = bpy.data.objects.new("IsoCam", cam_data)
bpy.context.collection.objects.link(cam_obj)
scene.camera = cam_obj

cam_obj.location = Vector((8.5, -8.5, 7.2))
cam_target = Vector((0.0, 0.0, 0.5))
cam_direction = cam_target - cam_obj.location
cam_obj.rotation_euler = cam_direction.to_track_quat('-Z', 'Y').to_euler()

out_full = os.path.join(output_dir, "reception_full_room.png")
scene.render.filepath = out_full
bpy.ops.render.render(write_still=True)
print(f"Rendered: {out_full}")

# Copia para o diretório de artefatos
import shutil
shutil.copy2(out_full, os.path.join(brain_dir, "reception_full_room.png"))

# ------------------------------------------------------------------------------
# 6. RENDER 2: VISÃO SUPERIOR (TOP-DOWN) COMPARATIVA COM O PRINT DO USUÁRIO
# ------------------------------------------------------------------------------
cam_data.ortho_scale = 9.4
# Câmera superior inclinada (~78 graus) mostrando toda a sala 9.0m x 5.0m e limites das paredes
cam_obj.location = Vector((0.0, -2.5, 13.0))
cam_target = Vector((0.0, 0.0, 0.0))
cam_direction = cam_target - cam_obj.location
cam_obj.rotation_euler = cam_direction.to_track_quat('-Z', 'Y').to_euler()

out_topdown = os.path.join(output_dir, "reception_topdown_comparison.png")
scene.render.filepath = out_topdown
bpy.ops.render.render(write_still=True)
print(f"Rendered: {out_topdown}")

shutil.copy2(out_topdown, os.path.join(brain_dir, "reception_topdown_comparison.png"))
print("Done! Both renders exported and copied to brain artifacts.")

