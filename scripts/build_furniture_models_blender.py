"""
Gerador Profissional da Biblioteca de Mobiliário 3D do RMM Ipojuca (Ciclo #21)
Executado via Blender 4.2 LTS headless (bpy)

Gera 6 modelos com identidade estética Habblaude, modificadores Bevel,
materiais Principled BSDF PBR e escalas antropométricas:
1. office_desk.glb
2. ergonomic_chair.glb
3. reception_counter.glb
4. storage_cabinet.glb
5. thermal_printer.glb
6. waiting_bench.glb
"""

import bpy
import math
import os
from mathutils import Vector, Euler

# Diretórios de saída
output_furniture = os.path.abspath("frontend/public/models/furniture")
output_tech = os.path.abspath("frontend/public/models/tech")
os.makedirs(output_furniture, exist_ok=True)
os.makedirs(output_tech, exist_ok=True)

# ------------------------------------------------------------------------------
# Helpers para Materiais PBR Principled BSDF
# ------------------------------------------------------------------------------
def make_pbr_material(name, base_color, roughness=0.5, metallic=0.0, transmission=0.0, emission_color=None, emission_strength=1.0):
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    bsdf = nodes.get("Principled BSDF")
    if bsdf:
        bsdf.inputs["Base Color"].default_value = base_color
        bsdf.inputs["Roughness"].default_value = roughness
        bsdf.inputs["Metallic"].default_value = metallic
        if "Transmission Weight" in bsdf.inputs:
            bsdf.inputs["Transmission Weight"].default_value = transmission
        elif "Transmission" in bsdf.inputs:
            bsdf.inputs["Transmission"].default_value = transmission
            
        if emission_color:
            if "Emission Color" in bsdf.inputs:
                bsdf.inputs["Emission Color"].default_value = emission_color
                bsdf.inputs["Emission Strength"].default_value = emission_strength
            elif "Emission" in bsdf.inputs:
                bsdf.inputs["Emission"].default_value = emission_color
    return mat

def add_beveled_box(name, size, location, material, bevel_width=0.006, segments=3):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = size
    bpy.ops.object.transform_apply(scale=True)
    
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = bevel_width
    bev.segments = segments
    bev.limit_method = 'ANGLE'
    bev.angle_limit = math.radians(40)
    
    for poly in obj.data.polygons:
        poly.use_smooth = True
        
    obj.data.materials.append(material)
    return obj

def add_beveled_cylinder(name, radius, depth, location, material, vertices=24, bevel_width=0.003):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, vertices=vertices, location=location)
    obj = bpy.context.active_object
    obj.name = name
    bpy.ops.object.transform_apply(scale=True)
    
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = bevel_width
    bev.segments = 2
    bev.limit_method = 'ANGLE'
    bev.angle_limit = math.radians(45)
    
    for poly in obj.data.polygons:
        poly.use_smooth = True
        
    obj.data.materials.append(material)
    return obj

def export_glb(filepath):
    # Seleciona todos os objetos
    bpy.ops.object.select_all(action='SELECT')
    bpy.ops.export_scene.gltf(
        filepath=filepath,
        export_format='GLB',
        use_selection=True,
        export_apply=True,
        export_yup=True
    )
    stat = os.stat(filepath)
    print(f"Exported: {filepath} ({stat.st_size:,} bytes)")

# ==============================================================================
# MODELO 1: office_desk.glb — Mesa de Escritório Executiva
# ==============================================================================
def build_office_desk():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    
    mat_oak = make_pbr_material("Mat_LightOak", (0.83, 0.72, 0.58, 1.0), roughness=0.45, metallic=0.0)
    mat_steel = make_pbr_material("Mat_DarkSteel", (0.16, 0.18, 0.21, 1.0), roughness=0.40, metallic=0.35)
    mat_metal = make_pbr_material("Mat_BrushedMetal", (0.78, 0.80, 0.83, 1.0), roughness=0.25, metallic=0.88)
    mat_cabinet = make_pbr_material("Mat_CabinetBody", (0.94, 0.94, 0.93, 1.0), roughness=0.40)
    
    # 1. Tampo principal com chanfro suave (1.40m x 0.80m x 0.035m, superfície em Z = 0.76m)
    add_beveled_box("DeskTop", (1.40, 0.80, 0.035), (0.0, 0.0, 0.7425), mat_oak, bevel_width=0.008, segments=4)
    
    # 2. Pernas e Estrutura Tubular de Aço (Lado Esquerdo)
    # Perna vertical frontal esquerda
    add_beveled_box("Leg_FL", (0.045, 0.045, 0.715), (-0.63, 0.33, 0.3575), mat_steel, bevel_width=0.003)
    # Perna vertical traseira esquerda
    add_beveled_box("Leg_BL", (0.045, 0.045, 0.715), (-0.63, -0.33, 0.3575), mat_steel, bevel_width=0.003)
    # Travessa horizontal inferior esquerda (sapata de união)
    add_beveled_box("Rail_Bottom_L", (0.045, 0.70, 0.03), (-0.63, 0.0, 0.04), mat_steel, bevel_width=0.004)
    # Travessa horizontal superior esquerda (apoio do tampo)
    add_beveled_box("Rail_Top_L", (0.045, 0.70, 0.03), (-0.63, 0.0, 0.71), mat_steel, bevel_width=0.004)
    
    # 3. Perna e Apoio Traseiro Central
    add_beveled_box("BackPanel_Modesty", (1.20, 0.018, 0.32), (-0.02, -0.33, 0.52), mat_steel, bevel_width=0.003)
    
    # 4. Gaveteiro Modular Acoplado (Lado Direito)
    add_beveled_box("Pedestal_Body", (0.42, 0.68, 0.67), (0.44, 0.0, 0.365), mat_cabinet, bevel_width=0.006)
    
    # 3 Gavetas frontais
    drawer_height = 0.195
    for i in range(3):
        z_pos = 0.13 + i * 0.22
        add_beveled_box(f"DrawerFront_{i}", (0.38, 0.02, drawer_height), (0.44, 0.35, z_pos), mat_cabinet, bevel_width=0.004)
        # Puxador horizontal metálico
        add_beveled_box(f"Handle_{i}", (0.14, 0.018, 0.016), (0.44, 0.365, z_pos), mat_metal, bevel_width=0.002)
        
    # Passa-cabos circular cromado no tampo
    add_beveled_cylinder("CablePass", 0.03, 0.038, (0.55, -0.28, 0.743), mat_metal, vertices=20, bevel_width=0.002)
    
    # Sapatas niveladoras
    for x in [-0.63]:
        for y in [-0.33, 0.33]:
            add_beveled_cylinder(f"Foot_{x}_{y}", 0.022, 0.015, (x, y, 0.008), mat_steel, vertices=16)
            
    export_glb(os.path.join(output_furniture, "office_desk.glb"))

# ==============================================================================
# MODELO 2: ergonomic_chair.glb — Cadeira Ergonômica de Escritório
# ==============================================================================
def build_ergonomic_chair():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    
    mat_fabric = make_pbr_material("Mat_CharcoalFabric", (0.14, 0.17, 0.20, 1.0), roughness=0.80, metallic=0.0)
    mat_chassis = make_pbr_material("Mat_DarkChassis", (0.11, 0.13, 0.16, 1.0), roughness=0.45, metallic=0.1)
    mat_chrome = make_pbr_material("Mat_ChromePiston", (0.85, 0.88, 0.90, 1.0), roughness=0.15, metallic=0.92)
    
    # 1. Base Estrela de 5 Pontas
    center_hub = add_beveled_cylinder("BaseHub", 0.065, 0.06, (0.0, 0.0, 0.10), mat_chassis, vertices=24)
    
    num_spokes = 5
    spoke_len = 0.28
    for i in range(num_spokes):
        angle = i * (2 * math.pi / num_spokes)
        sx = math.cos(angle) * (spoke_len / 2)
        sy = math.sin(angle) * (spoke_len / 2)
        
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=(sx, sy, 0.09))
        spoke = bpy.context.active_object
        spoke.name = f"Spoke_{i}"
        spoke.scale = (spoke_len, 0.045, 0.035)
        spoke.rotation_euler.z = angle
        bpy.ops.object.transform_apply(scale=True, rotation=True)
        
        bev = spoke.modifiers.new(name="Bevel", type='BEVEL')
        bev.width = 0.005
        bev.segments = 2
        for poly in spoke.data.polygons:
            poly.use_smooth = True
        spoke.data.materials.append(mat_chassis)
        
        # Rodízio duplo na ponta
        cx = math.cos(angle) * spoke_len
        cy = math.sin(angle) * spoke_len
        add_beveled_cylinder(f"Caster_{i}", 0.024, 0.03, (cx, cy, 0.03), mat_chassis, vertices=16)
        
    # 2. Pistão Pneumático Central Metálico
    add_beveled_cylinder("PistonBottom", 0.032, 0.16, (0.0, 0.0, 0.20), mat_chassis, vertices=20)
    add_beveled_cylinder("PistonShaft", 0.020, 0.18, (0.0, 0.0, 0.33), mat_chrome, vertices=20)
    
    # 3. Mecanismo de Reclinação / Base do Assento
    add_beveled_box("SeatMechanism", (0.24, 0.24, 0.05), (0.0, 0.0, 0.44), mat_chassis, bevel_width=0.004)
    
    # 4. Assento Anatômico Almofadado (0.50m x 0.48m x 0.07m, altura 0.48m)
    add_beveled_box("SeatCushion", (0.50, 0.48, 0.07), (0.0, 0.02, 0.49), mat_fabric, bevel_width=0.015, segments=4)
    
    # 5. Encosto Ergonômico com Curvatura Lombar
    # Coluna de suporte traseira
    add_beveled_box("BackSpine", (0.07, 0.04, 0.45), (0.0, -0.23, 0.68), mat_chassis, bevel_width=0.005)
    # Almofada do encosto
    back = add_beveled_box("BackCushion", (0.45, 0.06, 0.50), (0.0, -0.21, 0.78), mat_fabric, bevel_width=0.016, segments=4)
    # Leve inclinação para trás (ergonomia)
    back.rotation_euler.x = math.radians(-5)
    
    # Apoio de cabeça
    add_beveled_box("HeadRest", (0.28, 0.05, 0.14), (0.0, -0.24, 1.05), mat_fabric, bevel_width=0.012)
    
    # 6. Braços Reguláveis com Apoio Macio
    for side, x in [("L", -0.26), ("R", 0.26)]:
        # Haste vertical do braço
        add_beveled_box(f"ArmPost_{side}", (0.035, 0.05, 0.22), (x, 0.02, 0.56), mat_chassis, bevel_width=0.004)
        # Apoio superior macio
        add_beveled_box(f"ArmPad_{side}", (0.075, 0.22, 0.035), (x, 0.04, 0.68), mat_chassis, bevel_width=0.008, segments=3)
        
    export_glb(os.path.join(output_furniture, "ergonomic_chair.glb"))

# ==============================================================================
# MODELO 3: reception_counter.glb — Balcão de Recepção em L
# ==============================================================================
def build_reception_counter():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    
    mat_lacquer = make_pbr_material("Mat_OffWhiteLacquer", (0.92, 0.92, 0.90, 1.0), roughness=0.35)
    mat_oak_top = make_pbr_material("Mat_CounterOak", (0.84, 0.74, 0.61, 1.0), roughness=0.40)
    mat_wood_trim = make_pbr_material("Mat_DarkWoodTrim", (0.35, 0.20, 0.10, 1.0), roughness=0.45)
    mat_glass = make_pbr_material("Mat_GlassVisor", (0.92, 0.95, 0.98, 0.4), roughness=0.05, transmission=0.90)
    mat_metal = make_pbr_material("Mat_ChromeFixtures", (0.80, 0.82, 0.85, 1.0), roughness=0.20, metallic=0.90)
    
    # 1. Corpo Frontal Principal (Comprimento 2.80m, Profundidade 0.70m, Altura 1.06m)
    add_beveled_box("FrontBody", (2.80, 0.68, 1.04), (0.0, 0.0, 0.54), mat_lacquer, bevel_width=0.010, segments=3)
    
    # Rodapé frontal em madeira nobre
    add_beveled_box("Baseboard_Front", (2.82, 0.70, 0.08), (0.0, 0.0, 0.04), mat_wood_trim, bevel_width=0.004)
    
    # Friso canelado / decorativo frontal
    for i in range(11):
        fx = -1.25 + i * 0.25
        add_beveled_box(f"Rib_{i}", (0.02, 0.015, 0.85), (fx, 0.35, 0.54), mat_wood_trim, bevel_width=0.002)
        
    # 2. Tampo de Atendimento ao Público Superior (1.10m altura)
    add_beveled_box("CounterTopPublic", (2.86, 0.38, 0.04), (0.0, 0.16, 1.08), mat_oak_top, bevel_width=0.010, segments=4)
    
    # 3. Visor Protetor em Vidro/Acrílico Translúcido com Suportes Metálicos
    add_beveled_box("GlassVisor", (2.60, 0.012, 0.35), (0.0, 0.18, 1.28), mat_glass, bevel_width=0.003)
    for bx in [-1.0, 0.0, 1.0]:
        add_beveled_cylinder(f"GlassBracket_{bx}", 0.018, 0.08, (bx, 0.18, 1.13), mat_metal, vertices=16)
        
    # 4. Retorno Lateral em L (Lado Esquerdo, Profundidade 1.60m)
    add_beveled_box("ReturnBody", (0.68, 1.50, 1.04), (-1.06, -0.80, 0.54), mat_lacquer, bevel_width=0.010, segments=3)
    add_beveled_box("ReturnBaseboard", (0.70, 1.52, 0.08), (-1.06, -0.80, 0.04), mat_wood_trim, bevel_width=0.004)
    add_beveled_box("ReturnTopPublic", (0.38, 1.56, 0.04), (-1.21, -0.80, 1.08), mat_oak_top, bevel_width=0.010, segments=4)
    
    # 5. Bancada de Trabalho Interna (Altura 0.76m, para computadores e papéis)
    add_beveled_box("InternalDesk", (2.00, 0.45, 0.035), (0.35, -0.15, 0.7425), mat_oak_top, bevel_width=0.006)
    
    export_glb(os.path.join(output_furniture, "reception_counter.glb"))

# ==============================================================================
# MODELO 4: storage_cabinet.glb — Armário de Prontuários
# ==============================================================================
def build_storage_cabinet():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    
    mat_cabinet = make_pbr_material("Mat_HospitalWhite", (0.92, 0.93, 0.92, 1.0), roughness=0.38)
    mat_metal = make_pbr_material("Mat_BrushedAlum", (0.80, 0.82, 0.85, 1.0), roughness=0.25, metallic=0.85)
    mat_dark_feet = make_pbr_material("Mat_RubberFeet", (0.15, 0.17, 0.19, 1.0), roughness=0.6)
    
    # 1. Carcaça Principal (0.90m x 0.45m x 1.82m)
    add_beveled_box("CabinetChassis", (0.90, 0.45, 1.80), (0.0, 0.0, 0.94), mat_cabinet, bevel_width=0.008, segments=3)
    
    # 2. Portas Verticais Duplas Chanfradas
    door_w = 0.435
    door_h = 1.74
    for side, x in [("L", -0.222), ("R", 0.222)]:
        add_beveled_box(f"Door_{side}", (door_w, 0.02, door_h), (x, 0.235, 0.94), mat_cabinet, bevel_width=0.005)
        # Puxadores elegantes verticais
        add_beveled_box(f"Handle_{side}", (0.02, 0.025, 0.32), (x + (-0.12 if side == 'L' else 0.12) * -1, 0.255, 0.94), mat_metal, bevel_width=0.002)
        
    # Fechadura central cromada
    add_beveled_cylinder("LockCylinder", 0.012, 0.025, (0.03, 0.245, 0.94), mat_metal, vertices=16)
    
    # 3. Sapatas Cilíndricas com Base de Borracha
    for x in [-0.40, 0.40]:
        for y in [-0.18, 0.18]:
            add_beveled_cylinder(f"Foot_{x}_{y}", 0.025, 0.04, (x, y, 0.02), mat_dark_feet, vertices=16)
            
    export_glb(os.path.join(output_furniture, "storage_cabinet.glb"))

# ==============================================================================
# MODELO 5: thermal_printer.glb — Impressora Térmica de Atendimento
# ==============================================================================
def build_thermal_printer():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    
    mat_chassis = make_pbr_material("Mat_PrinterChassis", (0.13, 0.15, 0.18, 1.0), roughness=0.45, metallic=0.1)
    mat_paper = make_pbr_material("Mat_PaperReceipt", (0.96, 0.97, 0.98, 1.0), roughness=0.85)
    mat_led = make_pbr_material("StatusLed_Printer", (0.06, 0.72, 0.40, 1.0), roughness=0.1, emission_color=(0.06, 0.85, 0.45, 1.0), emission_strength=2.5)
    mat_metal = make_pbr_material("Mat_CutterMetal", (0.75, 0.78, 0.82, 1.0), roughness=0.25, metallic=0.85)
    mat_button = make_pbr_material("Mat_FeedButton", (0.22, 0.25, 0.30, 1.0), roughness=0.4)
    
    # 1. Chassi da Impressora (0.20m x 0.16m x 0.13m)
    add_beveled_box("PrinterBase", (0.20, 0.16, 0.10), (0.0, 0.0, 0.05), mat_chassis, bevel_width=0.005, segments=3)
    
    # 2. Tampa Superior Inclinada
    lid = add_beveled_box("PrinterLid", (0.19, 0.14, 0.035), (0.0, -0.01, 0.11), mat_chassis, bevel_width=0.004)
    
    # 3. Fenda de Saída e Serrilha de Corte
    add_beveled_box("PaperSlot", (0.11, 0.012, 0.005), (0.0, 0.03, 0.128), mat_metal, bevel_width=0.001)
    
    # 4. Cupom / Prontuário Térmico Saindo da Fenda
    add_beveled_box("PaperReceipt", (0.09, 0.035, 0.002), (0.0, 0.045, 0.138), mat_paper, bevel_width=0.0005)
    
    # 5. Painel de Controle Frontal: Botão Feed e Status LED
    # Botão Feed
    add_beveled_cylinder("FeedButton", 0.008, 0.004, (0.07, 0.06, 0.11), mat_button, vertices=16)
    
    # Micro-LED indicador do Spooler de Impressão (sub-nó explícito para R3F)
    bpy.ops.mesh.primitive_uv_sphere_add(radius=0.004, location=(0.07, 0.04, 0.112))
    led_obj = bpy.context.active_object
    led_obj.name = "StatusLed_Printer"
    for poly in led_obj.data.polygons:
        poly.use_smooth = True
    led_obj.data.materials.append(mat_led)
    
    # Pés de borracha
    for x in [-0.08, 0.08]:
        for y in [-0.06, 0.06]:
            add_beveled_cylinder(f"Foot_{x}_{y}", 0.01, 0.005, (x, y, 0.0025), mat_chassis, vertices=12)
            
    export_glb(os.path.join(output_tech, "thermal_printer.glb"))

# ==============================================================================
# MODELO 6: waiting_bench.glb — Longarina Hospitalar de Espera (3 Lugares)
# ==============================================================================
def build_waiting_bench():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    
    mat_steel = make_pbr_material("Mat_BenchSteel", (0.18, 0.20, 0.24, 1.0), roughness=0.35, metallic=0.60)
    mat_shell = make_pbr_material("Mat_SlateShell", (0.28, 0.40, 0.48, 1.0), roughness=0.55, metallic=0.05)
    mat_feet = make_pbr_material("Mat_RubberTips", (0.12, 0.14, 0.16, 1.0), roughness=0.7)
    
    # 1. Viga Estrutural Contínua em Tubo de Aço (Comprimento 1.80m)
    add_beveled_cylinder("MainBeam", 0.035, 1.76, (0.0, 0.0, 0.38), mat_steel, vertices=24)
    beam = bpy.context.active_object
    beam.rotation_euler.y = math.radians(90)
    bpy.ops.object.transform_apply(rotation=True)
    
    # 2. Pernas Estruturais em Y Invertido (Esquerda e Direita)
    for side, x in [("L", -0.72), ("R", 0.72)]:
        # Coluna vertical
        add_beveled_cylinder(f"LegVertical_{side}", 0.032, 0.38, (x, 0.0, 0.20), mat_steel, vertices=20)
        # Barra de apoio no piso (transversal)
        bpy.ops.mesh.primitive_cylinder_add(radius=0.025, depth=0.54, vertices=20, location=(x, 0.0, 0.025))
        foot_bar = bpy.context.active_object
        foot_bar.name = f"FootBar_{side}"
        foot_bar.rotation_euler.x = math.radians(90)
        bpy.ops.object.transform_apply(rotation=True)
        foot_bar.data.materials.append(mat_steel)
        
        # Ponteiras de borracha anti-derrapantes
        for fy in [-0.26, 0.26]:
            add_beveled_cylinder(f"Tip_{side}_{fy}", 0.028, 0.03, (x, fy, 0.025), mat_feet, vertices=16)
            
    # 3. Três Assentos Anatômicos Individuais
    seat_positions = [-0.56, 0.0, 0.56]
    for i, sx in enumerate(seat_positions):
        # Suporte metálico que une a viga ao assento
        add_beveled_box(f"SeatBracket_{i}", (0.06, 0.16, 0.08), (sx, 0.0, 0.42), mat_steel, bevel_width=0.004)
        
        # Assento individual
        add_beveled_box(f"SeatPan_{i}", (0.48, 0.42, 0.045), (sx, 0.05, 0.46), mat_shell, bevel_width=0.014, segments=4)
        
        # Encosto individual anatômico
        back_pan = add_beveled_box(f"BackPan_{i}", (0.46, 0.045, 0.38), (sx, -0.16, 0.65), mat_shell, bevel_width=0.014, segments=4)
        back_pan.rotation_euler.x = math.radians(-10)
        
    export_glb(os.path.join(output_furniture, "waiting_bench.glb"))

# ==============================================================================
# Execução Principal
# ==============================================================================
if __name__ == "__main__":
    print("\n--- INICIANDO MODELAGEM DA BIBLIOTECA DE MOBILIÁRIO NO BLENDER 4.2 LTS ---")
    build_office_desk()
    build_ergonomic_chair()
    build_reception_counter()
    build_storage_cabinet()
    build_thermal_printer()
    build_waiting_bench()
    print("\n--- TODOS OS 6 MODELOS FORAM GERADOS E EXPORTADOS COM SUCESSO! ---")

