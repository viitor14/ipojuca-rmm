import bpy
import math
import os
from mathutils import Vector

# Reset scene
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
scene.render.engine = 'BLENDER_EEVEE_NEXT' if hasattr(bpy.types, 'RenderSettings') and 'BLENDER_EEVEE_NEXT' in [e.identifier for e in bpy.types.RenderSettings.bl_rna.properties['engine'].enum_items] else 'BLENDER_EEVEE'
scene.render.resolution_x = 1920
scene.render.resolution_y = 1080
scene.render.film_transparent = True

# 1. 2D UI Camera
cam_data = bpy.data.cameras.new("UICam")
cam_data.type = 'ORTHO'
cam_data.sensor_fit = 'VERTICAL'
cam_data.ortho_scale = 10.8  # Height: -5.4 to +5.4, Width: -9.6 to +9.6 (1920x1080)
cam_obj = bpy.data.objects.new("UICam", cam_data)
bpy.context.collection.objects.link(cam_obj)
scene.camera = cam_obj
cam_obj.location = Vector((0, 0, 10))
cam_obj.rotation_euler = (0, 0, 0)

# 2. Pure Unshaded Flat Material Helper (No light wash-out, vector crisp!)
def create_flat_mat(name, rgba):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    tree = mat.node_tree
    tree.nodes.clear()
    out = tree.nodes.new(type='ShaderNodeOutputMaterial')
    emit = tree.nodes.new(type='ShaderNodeEmission')
    emit.inputs['Color'].default_value = rgba
    emit.inputs['Strength'].default_value = 1.0
    tree.links.new(emit.outputs['Emission'], out.inputs['Surface'])
    return mat

mat_drawer_bg = create_flat_mat('Mat_DrawerBg', (1.0, 1.0, 1.0, 1.0))
mat_shadow = create_flat_mat('Mat_DrawerShadow', (0.82, 0.85, 0.88, 1.0))
mat_border = create_flat_mat('Mat_Border', (0.86, 0.89, 0.92, 1.0))
mat_card_bg = create_flat_mat('Mat_CardBg', (0.95, 0.96, 0.98, 1.0))
mat_card_border = create_flat_mat('Mat_CardBorder', (0.88, 0.90, 0.93, 1.0))
mat_text_dark = create_flat_mat('Mat_TextDark', (0.05, 0.07, 0.10, 1.0))
mat_text_muted = create_flat_mat('Mat_TextMuted', (0.35, 0.40, 0.46, 1.0))
mat_badge_green_bg = create_flat_mat('Mat_BadgeGreenBg', (0.82, 0.97, 0.90, 1.0))
mat_badge_green_txt = create_flat_mat('Mat_BadgeGreenTxt', (0.02, 0.55, 0.35, 1.0))
mat_btn_primary = create_flat_mat('Mat_BtnPrimary', (0.12, 0.44, 0.95, 1.0))
mat_btn_white_txt = create_flat_mat('Mat_BtnWhiteTxt', (1.0, 1.0, 1.0, 1.0))
mat_bar_bg = create_flat_mat('Mat_BarBg', (0.85, 0.88, 0.92, 1.0))
mat_bar_cpu = create_flat_mat('Mat_BarCpu', (0.05, 0.72, 0.50, 1.0))
mat_bar_ram = create_flat_mat('Mat_BarRam', (0.18, 0.48, 0.96, 1.0))
mat_bar_disk = create_flat_mat('Mat_BarDisk', (0.52, 0.32, 0.96, 1.0))

# 3. Drawer Dimensions & Placement
# X from 5.1 to 9.3 (width = 4.2 units = 420px), Y from -5.1 to +5.1 (height = 10.2 units = 1020px)
drawer_w = 4.2
drawer_h = 10.2
drawer_cx = 9.6 - (drawer_w / 2) - 0.25  # 7.25

# Shadow / Left Border plane
bpy.ops.mesh.primitive_cube_add(size=1, location=(drawer_cx - (drawer_w / 2) - 0.02, 0, 0.01))
s_obj = bpy.context.active_object
s_obj.scale = (0.04, drawer_h, 0.001)
s_obj.data.materials.append(mat_shadow)

# Drawer Base
bpy.ops.mesh.primitive_cube_add(size=1, location=(drawer_cx, 0, 0.05))
d_obj = bpy.context.active_object
d_obj.scale = (drawer_w, drawer_h, 0.001)
d_obj.data.materials.append(mat_drawer_bg)

# Text helper
def add_txt(body, x, y, size=0.20, mat=mat_text_dark, align='LEFT'):
    txt = bpy.data.curves.new(type="FONT", name="UI_T")
    txt.body = body
    txt.size = size
    txt.align_x = align
    obj = bpy.data.objects.new("UI_T_Obj", txt)
    bpy.context.collection.objects.link(obj)
    obj.location = Vector((x, y, 0.10))
    obj.data.materials.append(mat)
    return obj

# Header
add_txt("POSTO 1  *  RECEPCAO", drawer_cx - 1.85, 4.55, size=0.17, mat=mat_text_muted)

# Badge NORMAL
bpy.ops.mesh.primitive_cube_add(size=1, location=(drawer_cx + 1.25, 4.62, 0.08))
bg_b = bpy.context.active_object
bg_b.scale = (1.05, 0.32, 0.001)
bg_b.data.materials.append(mat_badge_green_bg)
add_txt("* NORMAL", drawer_cx + 0.85, 4.55, size=0.16, mat=mat_badge_green_txt)

# Hostname
add_txt("DESKTOP-32HK6KT", drawer_cx - 1.85, 4.05, size=0.28, mat=mat_text_dark)
add_txt("IP: 192.168.1.109  *  USF N. Sra. do O", drawer_cx - 1.85, 3.65, size=0.18, mat=mat_text_muted)

# Divider
bpy.ops.mesh.primitive_cube_add(size=1, location=(drawer_cx, 3.35, 0.08))
div = bpy.context.active_object
div.scale = (3.8, 0.02, 0.001)
div.data.materials.append(mat_border)

# Telemetry Section Title
add_txt("TELEMETRIA EM TEMPO REAL", drawer_cx - 1.85, 2.95, size=0.18, mat=mat_text_dark)

# Metric Card Function
def create_card(title, value, bar_mat, pct, y_c):
    # Card Background
    bpy.ops.mesh.primitive_cube_add(size=1, location=(drawer_cx, y_c, 0.07))
    c_obj = bpy.context.active_object
    c_obj.scale = (3.8, 0.95, 0.001)
    c_obj.data.materials.append(mat_card_bg)
    
    # Texts
    add_txt(title, drawer_cx - 1.7, y_c + 0.20, size=0.16, mat=mat_text_muted)
    add_txt(value, drawer_cx + 1.7, y_c + 0.20, size=0.18, mat=mat_text_dark, align='RIGHT')
    
    # Progress Bar Track
    bpy.ops.mesh.primitive_cube_add(size=1, location=(drawer_cx, y_c - 0.22, 0.08))
    b_track = bpy.context.active_object
    b_track.scale = (3.4, 0.12, 0.001)
    b_track.data.materials.append(mat_bar_bg)
    
    # Progress Bar Fill
    fill_len = 3.4 * pct
    fill_x = drawer_cx - 1.7 + (fill_len / 2)
    bpy.ops.mesh.primitive_cube_add(size=1, location=(fill_x, y_c - 0.22, 0.09))
    b_fill = bpy.context.active_object
    b_fill.scale = (fill_len, 0.12, 0.001)
    b_fill.data.materials.append(bar_mat)

create_card("Processador (Intel i3-8100 3.6GHz)", "18%", mat_bar_cpu, 0.18, 2.20)
create_card("Memoria RAM (3.4 / 8.0 GB)", "42%", mat_bar_ram, 0.42, 1.05)
create_card("Disco C: (SSD 240 GB)", "65 GB livres", mat_bar_disk, 0.73, -0.10)

# System Health Card
bpy.ops.mesh.primitive_cube_add(size=1, location=(drawer_cx, -1.20, 0.07))
sh_obj = bpy.context.active_object
sh_obj.scale = (3.8, 0.95, 0.001)
sh_obj.data.materials.append(mat_card_bg)

add_txt("Uptime do SO:  4 dias, 12 horas, 35m", drawer_cx - 1.7, -1.05, size=0.16, mat=mat_text_dark)
add_txt("Spooler Impressao:  Operacional (USB)", drawer_cx - 1.7, -1.35, size=0.16, mat=mat_badge_green_txt)

# Action Buttons
def create_btn(label, y_c, primary=False):
    bpy.ops.mesh.primitive_cube_add(size=1, location=(drawer_cx, y_c, 0.08))
    btn_obj = bpy.context.active_object
    btn_obj.scale = (3.8, 0.55, 0.001)
    btn_obj.data.materials.append(mat_btn_primary if primary else mat_card_bg)
    
    t_mat = mat_btn_white_txt if primary else mat_text_dark
    add_txt(label, drawer_cx, y_c - 0.07, size=0.18, mat=t_mat, align='CENTER')

create_btn("Atualizar Telemetria Agora", -2.10, primary=True)
create_btn("Executar Script Remoto", -2.80, primary=False)
create_btn("Reiniciar Spooler de Impressao", -3.50, primary=False)
create_btn("Abrir Terminal Remoto (PowerShell)", -4.20, primary=False)

# ---------------------------------------------------------
# 4. COMPOSITOR: Overlay UI on top of temp_selected_3d.png
# ---------------------------------------------------------
scene.use_nodes = True
tree = scene.node_tree
tree.nodes.clear()

# Render Layers (UI Drawer with alpha)
rl_node = tree.nodes.new(type='CompositorNodeRLayers')
rl_node.location = (0, 0)

# Image input (temp_selected_3d.png)
bg_img_path = os.path.abspath("frontend/public/models/tech/temp_selected_3d.png")
img_data = bpy.data.images.load(bg_img_path)
img_node = tree.nodes.new(type='CompositorNodeImage')
img_node.image = img_data
img_node.location = (0, -300)

# Alpha Over Node
alpha_over = tree.nodes.new(type='CompositorNodeAlphaOver')
alpha_over.location = (400, -100)

tree.links.new(img_node.outputs['Image'], alpha_over.inputs[1])
tree.links.new(rl_node.outputs['Image'], alpha_over.inputs[2])

# Composite output
comp_out = tree.nodes.new(type='CompositorNodeComposite')
comp_out.location = (700, -100)
tree.links.new(alpha_over.outputs['Image'], comp_out.inputs['Image'])

# Render Captura 3
out_path_cap3 = os.path.abspath("frontend/public/models/tech/workstation_selected_drawer.png")
scene.render.filepath = out_path_cap3
bpy.ops.render.render(write_still=True)
print("Captura 3 composite rendered successfully:", out_path_cap3)
