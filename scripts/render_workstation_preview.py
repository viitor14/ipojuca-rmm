"""
Renderizador da Captura 1: Workstation isolado em perspectiva isométrica completa.
Mostra o monitor, tela com desktop, LED, gabinete mini-torre com botões e aletas,
teclado ergonômico, mouse e mousepad sobre base neutra sem cortes.
"""

import bpy
import math
import os

# 1. Reset da cena
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# 2. Importa o GLB gerado pelo Blender
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "models", "tech", "workstation_pc.glb"))
bpy.ops.import_scene.gltf(filepath=model_path)

# 3. Base de apoio neutra com bevel suave
bpy.ops.mesh.primitive_cube_add(size=1.0, location=(0.15, 0.05, -0.015))
pedestal = bpy.context.active_object
pedestal.name = "StudioPedestal"
pedestal.scale = (1.4, 0.9, 0.03)
bpy.ops.object.transform_apply(scale=True)

ped_mat = bpy.data.materials.new("Mat_StudioPedestal")
ped_mat.use_nodes = True
nodes = ped_mat.node_tree.nodes
bsdf = nodes.get("Principled BSDF")
if bsdf:
    bsdf.inputs["Base Color"].default_value = (0.92, 0.93, 0.91, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.55
pedestal.data.materials.append(ped_mat)

# 4. Configuração de Iluminação de Estúdio Isométrico
# Luz solar principal frontal-superior
bpy.ops.object.light_add(type='SUN', location=(3.0, 3.5, 4.0))
sun = bpy.context.active_object
sun.data.energy = 4.0
sun.data.color = (1.0, 0.99, 0.96)
sun.rotation_euler = (math.radians(48), math.radians(-18), math.radians(138))

# Fill light lateral suave
bpy.ops.object.light_add(type='POINT', location=(-2.0, -1.0, 2.5))
fill = bpy.context.active_object
fill.data.energy = 60.0
fill.data.color = (0.88, 0.93, 1.0)

# Rim light traseiro para realçar a silhueta chanfrada
bpy.ops.object.light_add(type='POINT', location=(1.0, -2.5, 1.8))
rim = bpy.context.active_object
rim.data.energy = 35.0
rim.data.color = (1.0, 1.0, 1.0)

# 5. Câmera Isométrica Ortográfica Perfeitamente Enquadrada
bpy.ops.object.camera_add(location=(1.75, 1.75, 1.45))
cam = bpy.context.active_object
cam.data.type = 'ORTHO'
cam.data.ortho_scale = 1.15  # Enquadramento sem corte de nenhum objeto
cam.rotation_euler = (math.radians(58), 0, math.radians(135))
scene.camera = cam

# 6. Renderização de Alta Resolução
scene.render.resolution_x = 1200
scene.render.resolution_y = 900
scene.render.film_transparent = False

output_img = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "models", "tech", "workstation_isolated.png"))
scene.render.filepath = output_img

print(f"[PREVIEW ISOLADO] Renderizando Captura 1 para {output_img}...")
bpy.ops.render.render(write_still=True)
print(f"[PREVIEW ISOLADO CONCLUIDO] Imagem gerada com sucesso!")
