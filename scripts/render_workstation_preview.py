"""
Renderizador de preview do modelo workstation_pc.glb utilizando o Blender 4.2 LTS headless.
Gera uma imagem de alta resolução com iluminação de estúdio e câmera isométrica.
"""

import bpy
import math
import os

# 1. Reset da cena
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# 2. Importa o GLB gerado
model_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "models", "tech", "workstation_pc.glb"))
bpy.ops.import_scene.gltf(filepath=model_path)

# 3. Piso neutro para projeção de sombras de contato
bpy.ops.mesh.primitive_plane_add(size=4.0, location=(0, 0, 0))
plane = bpy.context.active_object
plane.name = "FloorShadowReceiver"
plane_mat = bpy.data.materials.new("Mat_FloorShadow")
plane_mat.use_nodes = True
nodes = plane_mat.node_tree.nodes
bsdf = nodes.get("Principled BSDF")
if bsdf:
    bsdf.inputs["Base Color"].default_value = (0.92, 0.93, 0.91, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.7
plane.data.materials.append(plane_mat)

# 4. Configuração de Iluminação de Estúdio
# Key light frontal
bpy.ops.object.light_add(type='SUN', location=(2.5, 2.5, 3.5))
sun = bpy.context.active_object
sun.data.energy = 3.5
sun.data.color = (1.0, 0.98, 0.95)
sun.rotation_euler = (math.radians(45), math.radians(-20), math.radians(145))

# Fill light suave
bpy.ops.object.light_add(type='POINT', location=(-1.5, -1.5, 1.8))
fill = bpy.context.active_object
fill.data.energy = 45.0
fill.data.color = (0.85, 0.92, 1.0)

# 5. Câmera Isométrica Frontal (Olhando para a frente do monitor e periféricos)
bpy.ops.object.camera_add(location=(1.6, 2.0, 1.45))
cam = bpy.context.active_object
cam.data.type = 'ORTHO'
cam.data.ortho_scale = 1.05
# Rotação voltada para a frente (+Y para -Y)
cam.rotation_euler = (math.radians(58), 0, math.radians(140))
scene.camera = cam

# 6. Configurações de Renderização
scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items else 'BLENDER_EEVEE'
scene.render.resolution_x = 1024
scene.render.resolution_y = 768
scene.render.film_transparent = False

output_img = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "models", "tech", "workstation_pc_preview.png"))
scene.render.filepath = output_img

print(f"[PREVIEW] Renderizando para {output_img}...")
bpy.ops.render.render(write_still=True)
print(f"[PREVIEW CONCLUIDO] Imagem gerada com sucesso!")
