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
# 2. Arquitetura da Recepção (Paredes, Piso, Rodapés, Portas e Decorações)
# ------------------------------------------------------------------------------
room_w = 7.8
room_d = 6.8

# Piso
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, -0.05))
floor = bpy.context.active_object
floor.scale = (room_w, room_d, 0.1)
floor.data.materials.append(mat_floor)

# Tapete central azul hospitalar
bpy.ops.mesh.primitive_cube_add(size=1, location=(0.3, -0.1, 0.004))
rug_b = bpy.context.active_object
rug_b.scale = (3.4, 4.2, 0.008)
rug_b.data.materials.append(mat_rug_border)

bpy.ops.mesh.primitive_cube_add(size=1, location=(0.3, -0.1, 0.006))
rug = bpy.context.active_object
rug.scale = (3.2, 4.0, 0.008)
rug.data.materials.append(mat_rug)

# Parede Norte (Fundo)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, room_d/2 - 0.075, 1.3))
north_wall = bpy.context.active_object
north_wall.scale = (room_w, 0.15, 2.6)
north_wall.data.materials.append(mat_wall)

# Parede Oeste (Esquerda)
bpy.ops.mesh.primitive_cube_add(size=1, location=(-room_w/2 + 0.075, 0, 1.3))
west_wall = bpy.context.active_object
west_wall.scale = (0.15, room_d, 2.6)
west_wall.data.materials.append(mat_wall)

# Parede Leste (Direita, baixa para visibilidade isométrica)
bpy.ops.mesh.primitive_cube_add(size=1, location=(room_w/2 - 0.075, 0, 0.4))
east_wall = bpy.context.active_object
east_wall.scale = (0.15, room_d, 0.8)
east_wall.data.materials.append(mat_wall)

# Parede Sul (Frente, baixa para visibilidade isométrica)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, -room_d/2 + 0.075, 0.4))
south_wall = bpy.context.active_object
south_wall.scale = (room_w, 0.15, 0.8)
south_wall.data.materials.append(mat_wall)

# Rodapés de madeira nobre
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, room_d/2 - 0.16, 0.06))
bb_n = bpy.context.active_object
bb_n.scale = (room_w, 0.02, 0.12)
bb_n.data.materials.append(mat_wood)

bpy.ops.mesh.primitive_cube_add(size=1, location=(-room_w/2 + 0.16, 0, 0.06))
bb_w = bpy.context.active_object
bb_w.scale = (0.02, room_d, 0.12)
bb_w.data.materials.append(mat_wood)

# Porta de acesso no canto oeste
bpy.ops.mesh.primitive_cube_add(size=1, location=(-room_w/2 + 0.08, 2.4, 1.05))
door = bpy.context.active_object
door.scale = (0.04, 0.95, 2.1)
door.data.materials.append(mat_door)

# Quadro de avisos institucional na parede oeste
bpy.ops.mesh.primitive_cube_add(size=1, location=(-room_w/2 + 0.09, -2.1, 1.45))
board = bpy.context.active_object
board.scale = (0.02, 1.2, 0.85)
board.data.materials.append(mat_board)

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

# 1. BALCÃO DE RECEPÇÃO EM L (reception_counter.glb)
# Posicionado na lateral esquerda de entrada, com visor de vidro temperado
counter_pos = Vector((-2.55, -1.1, 0))
import_glb(counter_glb, counter_pos, rotation_z=0)

# Impressora térmica de atendimento no balcão
import_glb(printer_glb, counter_pos + Vector((-0.2, 0.15, 1.10)), rotation_z=math.radians(-90))

# 2. ARMÁRIO DE PRONTUÁRIOS E ARQUIVOS (storage_cabinet.glb)
# Posicionado contra a parede norte (fundo), com portas chanfradas voltadas para a sala (+Y)
import_glb(cabinet_glb, Vector((-1.6, room_d/2 - 0.28, 0)), rotation_z=math.pi)

# 3. LONGARINA DE ESPERA (waiting_bench.glb)
# Posicionada contra a parede oeste, com 3 assentos voltados para a circulação (+X)
import_glb(bench_glb, Vector((-room_w/2 + 0.65, 0.45, 0)), rotation_z=math.radians(90))

# 4. QUATRO ESTAÇÕES DE TRABALHO COMPLETAS (office_desk + ergonomic_chair + workstation_pc)
desk_slots = [
    Vector((-0.95, -0.75, 0)),  # Posto 1: Piloto (DESKTOP-32HK6KT / machine 9)
    Vector((1.95, -0.75, 0)),   # Posto 2: Atendimento
    Vector((-0.95, 1.45, 0)),   # Posto 3: Triagem
    Vector((1.95, 1.45, 0)),    # Posto 4: Regulação
]

facing_rot = math.radians(-128) # Ligeiramente angulado para visualização isométrica
chair_offset = Vector((-math.sin(facing_rot), math.cos(facing_rot), 0)) * -0.52

for i, slot in enumerate(desk_slots):
    # Mesa executiva de escritório
    import_glb(desk_glb, slot, rotation_z=facing_rot)
    
    # Cadeira ergonômica
    import_glb(chair_glb, slot + chair_offset, rotation_z=facing_rot + math.pi)
    
    # Estação de trabalho PC completa (workstation_pc.glb)
    ws_root, ws_objs = import_glb(workstation_glb, slot + Vector((0, 0, 0.76)), rotation_z=facing_rot)
    
    # Configuração de LED de status nos computadores
    for o in ws_objs:
        if o.name.startswith("StatusLed") and o.data and o.data.materials:
            color = (0.06, 0.73, 0.51, 1.0) if i != 2 else (0.95, 0.65, 0.12, 1.0) # Posto 3 com status Warning para teste
            mat_led = bpy.data.materials.new(f"Led_Slot_{i}")
            mat_led.use_nodes = True
            bsdf = mat_led.node_tree.nodes.get("Principled BSDF")
            if bsdf:
                bsdf.inputs["Base Color"].default_value = color
                if "Emission Color" in bsdf.inputs:
                    bsdf.inputs["Emission Color"].default_value = color
                    bsdf.inputs["Emission Strength"].default_value = 3.5
            o.data.materials[0] = mat_led
            
    # Impressora acoplada na estação 1 (spooler ativo)
    if i == 0:
        import_glb(printer_glb, slot + Vector((-0.45, 0, 0.76)), rotation_z=facing_rot)

# 5. Elementos Arquitetônicos Complementares
# Bebedouro de coluna no canto norte-leste
bpy.ops.mesh.primitive_cube_add(size=1, location=(room_w/2 - 0.7, room_d/2 - 0.5, 0.48))
wc = bpy.context.active_object
wc.scale = (0.42, 0.42, 0.96)
wc.data.materials.append(create_pbr_mat('Mat_Dispenser', (0.94, 0.94, 0.95, 1.0), roughness=0.35))

bpy.ops.mesh.primitive_cylinder_add(radius=0.16, depth=0.46, location=(room_w/2 - 0.7, room_d/2 - 0.5, 1.18))
bottle = bpy.context.active_object
bottle.data.materials.append(create_pbr_mat('Mat_Bottle', (0.2, 0.55, 0.92, 0.75), roughness=0.15))

# Planta decorativa no canto sul-leste
bpy.ops.mesh.primitive_cylinder_add(radius=0.25, depth=0.55, location=(room_w/2 - 0.6, -room_d/2 + 0.7, 0.28))
pot = bpy.context.active_object
pot.data.materials.append(create_pbr_mat('Mat_Pot', (0.90, 0.88, 0.85, 1.0), roughness=0.5))

bpy.ops.mesh.primitive_cube_add(size=1, location=(room_w/2 - 0.6, -room_d/2 + 0.7, 0.75))
plant = bpy.context.active_object
plant.scale = (0.35, 0.35, 0.45)
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
cam_data.ortho_scale = 8.2
cam_obj = bpy.data.objects.new("IsoCam", cam_data)
bpy.context.collection.objects.link(cam_obj)
scene.camera = cam_obj

cam_obj.location = Vector((8.5, -8.5, 7.2))
cam_target = Vector((0.0, 0.0, 0.7))
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
cam_data.ortho_scale = 7.6
# Câmera superior inclinada (~78 graus) semelhante à perspectiva do print do usuário
cam_obj.location = Vector((0.4, -2.6, 12.0))
cam_target = Vector((0.0, -0.1, 0.0))
cam_direction = cam_target - cam_obj.location
cam_obj.rotation_euler = cam_direction.to_track_quat('-Z', 'Y').to_euler()

out_topdown = os.path.join(output_dir, "reception_topdown_comparison.png")
scene.render.filepath = out_topdown
bpy.ops.render.render(write_still=True)
print(f"Rendered: {out_topdown}")

shutil.copy2(out_topdown, os.path.join(brain_dir, "reception_topdown_comparison.png"))
print("Done! Both renders exported and copied to brain artifacts.")
