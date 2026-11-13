"""
Renderizador de Previews Individuais em Estúdio Isométrico
para os 6 novos modelos da biblioteca de mobiliário RMM (Ciclo #21).
"""

import bpy
import math
import os
from mathutils import Vector, Euler

# Modelos a renderizar: (nome_arquivo, pasta, escala_camera, altura_foco)
MODELS = [
    ("office_desk.glb", "furniture", 2.2, 0.42),
    ("ergonomic_chair.glb", "furniture", 1.8, 0.55),
    ("reception_counter.glb", "furniture", 3.8, 0.65),
    ("storage_cabinet.glb", "furniture", 2.6, 0.95),
    ("thermal_printer.glb", "tech", 0.65, 0.08),
    ("waiting_bench.glb", "furniture", 2.6, 0.45),
]

output_dir = os.path.abspath("frontend/public/models/previews")
os.makedirs(output_dir, exist_ok=True)

def render_preview(filename, folder, ortho_scale, focus_z):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    scene = bpy.context.scene
    scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'
    scene.render.resolution_x = 1280
    scene.render.resolution_y = 960
    scene.render.film_transparent = True
    
    # 1. Importa o GLB
    glb_path = os.path.abspath(os.path.join("frontend/public/models", folder, filename))
    bpy.ops.import_scene.gltf(filepath=glb_path)
    
    # 2. Pedestal Neutro com Chanfro
    bpy.ops.mesh.primitive_cylinder_add(radius=2.0, depth=0.03, vertices=36, location=(0, 0, -0.015))
    ped = bpy.context.active_object
    ped.name = "Pedestal"
    mat_ped = bpy.data.materials.new("Mat_Pedestal")
    mat_ped.use_nodes = True
    bsdf = mat_ped.node_tree.nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = (0.94, 0.95, 0.96, 1.0)
        bsdf.inputs["Roughness"].default_value = 0.65
    ped.data.materials.append(mat_ped)
    
    # 3. Iluminação Isométrica de Estúdio
    world = bpy.data.worlds.new("StudioWorld")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get('Background')
    if bg:
        bg.inputs['Color'].default_value = (0.96, 0.97, 0.98, 1.0)
        bg.inputs['Strength'].default_value = 0.5
        
    # Key light
    key_light = bpy.data.lights.new(name="KeyLight", type='SUN')
    key_light.energy = 3.6
    key_light.color = (1.0, 0.99, 0.96)
    key_obj = bpy.data.objects.new("KeyLight", key_light)
    bpy.context.collection.objects.link(key_obj)
    key_obj.location = Vector((6, -5, 8))
    key_obj.rotation_euler = Vector((-0.7, 0.5, -0.8)).to_track_quat('-Z', 'Y').to_euler()
    
    # Fill light
    fill_light = bpy.data.lights.new(name="FillLight", type='SUN')
    fill_light.energy = 1.2
    fill_light.color = (0.88, 0.92, 0.98)
    fill_obj = bpy.data.objects.new("FillLight", fill_light)
    bpy.context.collection.objects.link(fill_obj)
    fill_obj.location = Vector((-6, 5, 5))
    fill_obj.rotation_euler = Vector((0.7, -0.5, -0.6)).to_track_quat('-Z', 'Y').to_euler()
    
    # 4. Câmera Isométrica Ortográfica
    cam_data = bpy.data.cameras.new("Cam")
    cam_data.type = 'ORTHO'
    cam_data.ortho_scale = ortho_scale
    cam_obj = bpy.data.objects.new("Cam", cam_data)
    bpy.context.collection.objects.link(cam_obj)
    scene.camera = cam_obj
    
    # Posição isométrica padrão: 45 graus horizontal, ~35 graus elevação
    dist = 10.0
    cam_x = dist * math.cos(math.radians(45))
    cam_y = -dist * math.sin(math.radians(45))
    cam_z = dist * 0.72
    cam_obj.location = Vector((cam_x, cam_y, cam_z))
    target = Vector((0.0, 0.0, focus_z))
    cam_dir = target - cam_obj.location
    cam_obj.rotation_euler = cam_dir.to_track_quat('-Z', 'Y').to_euler()
    
    # 5. Render
    out_name = f"preview_{os.path.splitext(filename)[0]}.png"
    out_path = os.path.join(output_dir, out_name)
    scene.render.filepath = out_path
    bpy.ops.render.render(write_still=True)
    print(f"Rendered preview: {out_path}")

if __name__ == "__main__":
    for item in MODELS:
        render_preview(*item)
    print("\n--- TODAS AS PREVIEWS FORAM RENDERIZADAS COM SUCESSO! ---")
