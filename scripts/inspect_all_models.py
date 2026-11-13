import bpy
import glob
import os

for f in sorted(glob.glob("frontend/public/models/**/*.glb", recursive=True)):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=f)
    mesh_objs = [o for o in bpy.context.scene.objects if o.type == 'MESH']
    total_tris = sum(len(p.vertices) - 2 for o in mesh_objs for p in o.data.polygons)
    total_verts = sum(len(o.data.vertices) for o in mesh_objs)
    mat_count = len(bpy.data.materials)
    print(f"MODEL_METRIC | {os.path.basename(f)} | Tris: {total_tris} | Verts: {total_verts} | Meshes: {len(mesh_objs)} | Mats: {mat_count}")

