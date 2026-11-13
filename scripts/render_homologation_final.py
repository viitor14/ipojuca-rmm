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

# ---------------------------------------------------------
# 1. PBR Materials Helper
# ---------------------------------------------------------
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
mat_floor = create_pbr_mat('Mat_Floor', (0.82, 0.73, 0.61, 1.0), roughness=0.55)
mat_rug = create_pbr_mat('Mat_Rug', (0.35, 0.58, 0.82, 1.0), roughness=0.88)
mat_rug_border = create_pbr_mat('Mat_Rug_Border', (0.28, 0.48, 0.72, 1.0), roughness=0.88)
mat_wood = create_pbr_mat('Mat_WoodTrim', (0.42, 0.25, 0.12, 1.0), roughness=0.4)
mat_cad_blue = create_pbr_mat('Mat_CadBlue', (0.23, 0.51, 0.96, 1.0), roughness=0.2, emission=(0.23, 0.51, 0.96, 1.0), emission_strength=2.0)
mat_cad_cyan = create_pbr_mat('Mat_CadCyan', (0.38, 0.65, 0.98, 1.0), roughness=0.2, emission=(0.38, 0.65, 0.98, 1.0), emission_strength=3.0)

# ---------------------------------------------------------
# 2. Reception Architecture (Walls, Floor, Rug, Trim)
# ---------------------------------------------------------
# Floor
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, -0.05))
floor = bpy.context.active_object
floor.scale = (7.8, 6.8, 0.1)
floor.data.materials.append(mat_floor)

# Rug with border
bpy.ops.mesh.primitive_cube_add(size=1, location=(0.2, -0.1, 0.004))
rug_b = bpy.context.active_object
rug_b.scale = (3.4, 4.2, 0.008)
rug_b.data.materials.append(mat_rug_border)

bpy.ops.mesh.primitive_cube_add(size=1, location=(0.2, -0.1, 0.006))
rug = bpy.context.active_object
rug.scale = (3.2, 4.0, 0.008)
rug.data.materials.append(mat_rug)

# Walls (Back Wall North, West Wall)
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 3.4 - 0.075, 1.2))
back_wall = bpy.context.active_object
back_wall.scale = (7.8, 0.15, 2.4)
back_wall.data.materials.append(mat_wall)

bpy.ops.mesh.primitive_cube_add(size=1, location=(-3.9 + 0.075, 0, 1.2))
west_wall = bpy.context.active_object
west_wall.scale = (0.15, 6.8, 2.4)
west_wall.data.materials.append(mat_wall)

# Wood Baseboards
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 3.4 - 0.16, 0.06))
bb1 = bpy.context.active_object
bb1.scale = (7.8, 0.02, 0.12)
bb1.data.materials.append(mat_wood)

bpy.ops.mesh.primitive_cube_add(size=1, location=(-3.9 + 0.16, 0, 0.06))
bb2 = bpy.context.active_object
bb2.scale = (0.02, 6.8, 0.12)
bb2.data.materials.append(mat_wood)

# ---------------------------------------------------------
# 3. Furniture and Pilot Workstation Setup
# ---------------------------------------------------------
furniture_dir = os.path.abspath("frontend/public/models/furniture")
tech_dir = os.path.abspath("frontend/public/models/tech")

def import_glb(filepath, location, rotation_z=0):
    start_objs = set(bpy.data.objects)
    bpy.ops.import_scene.gltf(filepath=filepath)
    new_objs = [o for o in bpy.data.objects if o not in start_objs]
    root = bpy.data.objects.new("GLB_Root", None)
    bpy.context.collection.objects.link(root)
    root.location = location
    root.rotation_euler.z = rotation_z
    for o in new_objs:
        if o.parent is None:
            o.parent = root
    return root, new_objs

desk_glb = os.path.join(furniture_dir, "office_desk.glb")
chair_glb = os.path.join(furniture_dir, "ergonomic_chair.glb")
counter_glb = os.path.join(furniture_dir, "reception_counter.glb")
workstation_glb = os.path.join(tech_dir, "workstation_pc.glb")

# Reception counter along west wall
import_glb(counter_glb, Vector((-2.7, -1.5, 0)), rotation_z=0)

# Pilot workstation desk position: (-1.15, -0.65, 0)
# Angle: -128 deg so that front (+Y) points directly towards camera at (7, -7, 5.8)!
pilot_desk_pos = Vector((-1.15, -0.65, 0))
pilot_rot_z = math.radians(-128)

# Pilot Desk and Chair
import_glb(desk_glb, pilot_desk_pos, rotation_z=pilot_rot_z)
# Chair sits behind desk (opposite to facing direction)
chair_offset = Vector((-math.sin(pilot_rot_z), math.cos(pilot_rot_z), 0)) * -0.55
import_glb(chair_glb, pilot_desk_pos + chair_offset, rotation_z=pilot_rot_z + math.pi)

# Pilot Workstation PC on Desk 1 (Z = 0.76m)
ws_root, ws_objs = import_glb(workstation_glb, pilot_desk_pos + Vector((0, 0, 0.76)), rotation_z=pilot_rot_z)

# Status LED to bright NORMAL green on pilot machine
for o in ws_objs:
    if o.name.startswith("StatusLed") and o.data and o.data.materials:
        mat_led = bpy.data.materials.new("Pilot_StatusLed_Green")
        mat_led.use_nodes = True
        bsdf = mat_led.node_tree.nodes.get("Principled BSDF")
        if bsdf:
            bsdf.inputs["Base Color"].default_value = (0.06, 0.73, 0.51, 1.0)
            if "Emission Color" in bsdf.inputs:
                bsdf.inputs["Emission Color"].default_value = (0.06, 0.73, 0.51, 1.0)
                bsdf.inputs["Emission Strength"].default_value = 4.0
            elif "Emission" in bsdf.inputs:
                bsdf.inputs["Emission"].default_value = (0.06, 0.73, 0.51, 1.0)
        o.data.materials[0] = mat_led

# Secondary desks
secondary_slots = [
    Vector((1.85, -0.65, 0)),
    Vector((-2.10, 1.35, 0)),
    Vector((1.95, 1.35, 0)),
]
for slot in secondary_slots:
    import_glb(desk_glb, slot, rotation_z=pilot_rot_z)
    import_glb(chair_glb, slot + chair_offset, rotation_z=pilot_rot_z + math.pi)

# Water cooler top-left
bpy.ops.mesh.primitive_cube_add(size=1, location=(-3.2, 2.7, 0.45))
wc_body = bpy.context.active_object
wc_body.scale = (0.45, 0.45, 0.9)
wc_body.data.materials.append(create_pbr_mat('Mat_WhitePlastic', (0.95, 0.95, 0.96, 1.0), roughness=0.3))

bpy.ops.mesh.primitive_cylinder_add(radius=0.18, depth=0.45, location=(-3.2, 2.7, 1.1))
wc_bottle = bpy.context.active_object
wc_bottle.data.materials.append(create_pbr_mat('Mat_BlueBottle', (0.15, 0.5, 0.88, 0.8), roughness=0.1))

# Plant pot top-right
bpy.ops.mesh.primitive_cylinder_add(radius=0.28, depth=0.55, location=(3.2, 2.7, 0.28))
pot = bpy.context.active_object
pot.data.materials.append(create_pbr_mat('Mat_Pot', (0.95, 0.95, 0.95, 1.0), roughness=0.4))

bpy.ops.mesh.primitive_cube_add(size=1, location=(3.2, 2.7, 0.75))
plant = bpy.context.active_object
plant.scale = (0.35, 0.35, 0.5)
plant.data.materials.append(create_pbr_mat('Mat_Plant', (0.15, 0.55, 0.3, 1.0), roughness=0.7))

# ---------------------------------------------------------
# 4. Studio Lighting
# ---------------------------------------------------------
world = bpy.data.worlds.new("StudioWorld")
scene.world = world
world.use_nodes = True
bg_node = world.node_tree.nodes.get('Background')
if bg_node:
    bg_node.inputs['Color'].default_value = (0.95, 0.96, 0.97, 1.0)
    bg_node.inputs['Strength'].default_value = 0.6

# Key light
key_light_data = bpy.data.lights.new(name="SunKey", type='SUN')
key_light_data.energy = 3.5
key_light_data.color = (1.0, 0.99, 0.96)
key_light_obj = bpy.data.objects.new(name="SunKey", object_data=key_light_data)
bpy.context.collection.objects.link(key_light_obj)
key_light_obj.location = Vector((8, -6, 10))
key_dir = Vector((-0.7, 0.5, -0.8))
key_light_obj.rotation_euler = key_dir.to_track_quat('-Z', 'Y').to_euler()

# Fill light
fill_light_data = bpy.data.lights.new(name="SunFill", type='SUN')
fill_light_data.energy = 1.2
fill_light_data.color = (0.88, 0.92, 0.98)
fill_light_obj = bpy.data.objects.new(name="SunFill", object_data=fill_light_data)
bpy.context.collection.objects.link(fill_light_obj)
fill_light_obj.location = Vector((-6, 6, 6))
fill_dir = Vector((0.7, -0.5, -0.6))
fill_light_obj.rotation_euler = fill_dir.to_track_quat('-Z', 'Y').to_euler()

# ---------------------------------------------------------
# 5. CAMERA CONFIGURATION & RENDER CAPTURA 2
# ---------------------------------------------------------
cam_data = bpy.data.cameras.new("IsoCam")
cam_data.type = 'ORTHO'
cam_data.ortho_scale = 6.4
cam_obj = bpy.data.objects.new("IsoCam", cam_data)
bpy.context.collection.objects.link(cam_obj)
scene.camera = cam_obj

cam_obj.location = Vector((7.0, -7.0, 5.8))
cam_direction = Vector((-0.2, -0.1, 0.75)) - cam_obj.location
rot_quat = cam_direction.to_track_quat('-Z', 'Y')
cam_obj.rotation_euler = rot_quat.to_euler()

# Render Captura 2: Workstation na mesa da recepção
out_path_cap2 = os.path.abspath("frontend/public/models/tech/reception_workstation_installed.png")
scene.render.filepath = out_path_cap2
bpy.ops.render.render(write_still=True)
print("Captura 2 rendered successfully:", out_path_cap2)

# ---------------------------------------------------------
# 6. CAPTURA 3: WORKSTATION SELECIONADO COM CAD BOX E DIAGNOSTIC DRAWER
# ---------------------------------------------------------
# CAD Selection Bounding Box with Corner Brackets around workstation
# matching WorkstationModel.jsx line 260: BoxGeometry(1.38, 0.012, 0.82)
cad_group = bpy.data.objects.new("CAD_Selection", None)
bpy.context.collection.objects.link(cad_group)
cad_group.location = pilot_desk_pos + Vector((0, 0, 0.765))
cad_group.rotation_euler.z = pilot_rot_z

# Bounding box lines
bpy.ops.mesh.primitive_cube_add(size=1, location=(0, 0, 0.005))
cad_frame = bpy.context.active_object
cad_frame.name = "CAD_BoundingFrame"
cad_frame.parent = cad_group
cad_frame.scale = (1.38, 0.82, 0.01)
# Make it a wireframe outline
wire_mod = cad_frame.modifiers.new(name="Wireframe", type='WIREFRAME')
wire_mod.thickness = 0.012
wire_mod.use_replace = True
cad_frame.data.materials.append(mat_cad_blue)

# 4 Corner CAD L-brackets
corners = [(-0.69, -0.41), (-0.69, 0.41), (0.69, -0.41), (0.69, 0.41)]
for cx, cz in corners:
    bpy.ops.mesh.primitive_cube_add(size=1, location=(cx, cz, 0.01))
    cb = bpy.context.active_object
    cb.name = f"CAD_Bracket_{cx}_{cz}"
    cb.parent = cad_group
    cb.scale = (0.07, 0.07, 0.02)
    cb.data.materials.append(mat_cad_cyan)

# Camera adjustments for Captura 3:
# Zoomed in on pilot workstation, shifted left to leave room for DiagnosticDrawer on right
cam_data.ortho_scale = 3.6
# Shift camera target slightly towards the pilot desk
cam_target = pilot_desk_pos + Vector((0.35, -0.2, 0.85))
cam_obj.location = cam_target + Vector((3.8, -3.8, 3.2))
cam_direction = cam_target - cam_obj.location
cam_obj.rotation_euler = cam_direction.to_track_quat('-Z', 'Y').to_euler()

# Render Captura 3 background 3D scene
temp_3d_path = os.path.abspath("frontend/public/models/tech/temp_selected_3d.png")
scene.render.filepath = temp_3d_path
bpy.ops.render.render(write_still=True)
print("Captura 3 3D scene rendered:", temp_3d_path)
