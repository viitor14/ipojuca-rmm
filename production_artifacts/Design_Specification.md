# Especificação de Design System, UI/UX e Digital Twin 3D — RMM Ipojuca (v2.0 Spatial OS)

**Ciclo:** #02 (Revisão de Identidade Visual & Experiência Espacial)  
**Fase:** FASE 5 — Design e Experiência do Usuário  
**Responsável:** `@designer`  
**Skills Consultadas:** `.agents/skills/designer/design_system.md`, `.agents/skills/designer/ux_dashboard.md`

---

## 1. Conceito Criativo: "Spatial CAD Command & Tactical Telemetry"

Para romper completamente com o visual padronizado de dashboards gerados por IA (barra superior + grade de 2 colunas de cartões azuis arredondados), o RMM Ipojuca adota o paradigma **Spatial Command Canvas** (inspirado em interfaces de engenharia espacial, sistemas CAD arquitetônicos, *Teenage Engineering* e *Palantir/VisionOS*):

1. **O Digital Twin 3D É o Próprio Fundo da Aplicação (100vw × 100vh):**
   - Não existe "caixa" prendendo o mapa 3D. A planta tridimensional da Unidade de Saúde ocupa 100% do viewport como um palco espacial contínuo.
2. **HUD Tático Flutuante com Geometria Chanfrada (Chamfered Glass):**
   - Os controles e painéis flutuam sobre o espaço 3D com vidro fumê de obsidiana (`rgba(10, 11, 14, 0.78)` + `backdrop-filter: blur(22px)`), cantos cortados em 45° (`clip-path` técnico), marcas de mira (`+`) nos vértices e tipografia industrial.
3. **Câmera Inteligente com "Fly-To" Cinematográfico:**
   - Ao selecionar qualquer computador no Dock inferior ou no próprio espaço 3D, a câmera interpola suavemente (`lerp`) em direção à estação de trabalho selecionada, permitindo alternar entre **Vista Isométrica 3D**, **Planta Baixa CAD (Topo 90°)** e **Foco Aproximado na Estação**.

---

## 2. Paleta de Cores Não-Convencional & Tipografia Editorial

### 2.1. Tokens Cromáticos ("Obsidian, Acid Titanium & Bio-Phosphor")
| Token | Hexadecimal | Papel Visual |
| :--- | :--- | :--- |
| `bg.void` | `#050507` | Vácuo espacial do palco 3D e grade arquitetônica |
| `bg.hud` | `rgba(11, 12, 16, 0.80)` | Superfície translúcida dos módulos HUD flutuantes |
| `accent.acid` | `#D4FF33` | **Acid Lime / Titanium** — Foco ativo, mira de seleção e destaque de câmera |
| `text.bone` | `#F4F4F0` | Branco osso/papel técnico para máxima nitidez sem ofuscamento |
| `text.muted` | `#7E8494` | Cinza técnico para rótulos de coordenadas e telemetria secundária |
| `status.NORMAL` | `#00F5A0` | **Bio-Phosphor Mint** — Operação nominal |
| `status.WARNING` | `#FFB800` | **Solar Amber** — Atenção / Limiar preventivo |
| `status.CRITICAL` | `#FF2A54` | **Signal Vermilion** — Anomalia crítica + feixe laser vertical 3D |
| `status.OFFLINE` | `#525866` | **Carbon Slate** — Silêncio de telemetria |

### 2.2. Tipografia
- **Display & Títulos Arquitetônicos:** `'Space Grotesk', sans-serif` (caixa alta, tracking expandido, peso 700).
- **Engenharia & Coordenadas:** `'IBM Plex Mono', 'JetBrains Mono', monospace` (`tabular-nums`, índices numéricos `[01]`, coordenadas GPS das unidades de Ipojuca).

---

## 3. Anatomia Espacial da Interface

1. **Masthead Arquitetônico Superior Flutuante:**
   - Exibe coordenadas geográficas da rede municipal de saúde de Ipojuca, seletor de Unidades em formato de *chaves táticas* com LEDs de estado, seletor de Câmera (`ISO 3D`, `PLANTA CAD`, `FOCO`) e chaveador de Perfil RBAC.
2. **Radar Esquerdo de Incidentes Autônomos (n8n / WhatsApp Live Ticker):**
   - Feed compacto flutuante à esquerda com os protocolos abertos autonomamente pelo n8n e atalho de foco imediato nas máquinas críticas.
3. **Dock Inferior de Estações (Hardware Keycap Matrix):**
   - Barra flutuante horizontal na base da tela onde cada computador da unidade é representado como um **módulo físico/keycap numerado** com anel de carga de CPU/Disco. Clicar em um módulo move a câmera 3D até a mesa correspondente.
4. **Lâmina Tática Direita (`DiagnosticDrawer`):**
   - Painel chanfrado flutuante à direita com medidores circulares SVG de CPU, RAM, Disco e Temperatura, gráfico de pulso em tempo real, chapa de identificação de hardware (BIOS/MAC/Serial) e matriz de chaves de comando remoto homologado.

---

## 4. Evolução Visual & Arquitetura 3D — Ciclo #03 ("Architectural Bio-CAD & Holographic Telemetry")

1. **Planta Conectada com Corredor Central e Eletrocalhas de Fibra Óptica:**
   - O piso do Digital Twin recebe uma **passarela central técnica** integrando todos os setores da unidade, com marcações CAD de coordenadas, anéis concêntricos de radar no solo e um **Bastidor Central de Rede (Core Switch Rack)** com LEDs de atividade.
   - Cada estação real conectada exibe um **conduíte luminoso de fibra óptica** traçado ortogonalmente pelo piso desde o Core Switch até a bancada da máquina, pulsando na cor do seu estado operacional (`#00F5A0`, `#FFB800`, `#FF2A54` ou `#525866`).
2. **Detalhamento de Mobiliário Clínico e Estações de Trabalho:**
   - **Setores com Identidade Clínica Realista:**
     - *Recepção / Triagem:* Balcão de atendimento em L chanfrado, totem de retirada de senhas e longarinas de espera.
     - *Consultórios / Enfermagem:* Maca clínica estofada com travesseiro e estrutura tubular, armário vitrine de medicamentos/insumos e biombo hospitalar.
     - *Farmácia / Sala de Vacina:* Câmara fria vertical de imunobiológicos com visor digital (`+4.0°C`) e estantes modulares.
     - *Administração / TI:* Rack de servidores com painéis de LEDs e bancada técnica.
   - **Estação de Trabalho Completa:**
     - Mesa técnica chanfrada + cadeira ergonômica em base estrela + gabinete torre com janela acrílica + monitores duplos em braço articulado + teclado iluminado + mouse + **impressora física de prontuário** com LED indicador do `spooler_running` (`#00F5A0` ativa / `#FF2A54` parada).
3. **HUD Holográfico & Controle de Camadas (`Scene Layer Matrix`):**
   - Controles táticos para ativar/desativar em tempo real:
     - `CAMADA: MOBILIÁRIO` (exibe/oculta móveis clínicos para foco puro em TI)
     - `CAMADA: FIBRA / REDE` (exibe/oculta a malha de cabeamento estruturado e pulsos de dados)
     - `CAMADA: HOLOGRAMAS` (exibe/oculta os callouts flutuantes 3D)
     - `CAMADA: LUZ VOLUMÉTRICA` (feixes atmosféricos sobre os setores e o rack central)
   - Novo modo de câmera **`ORBITAL AUTO`** para apresentação contínua em monitores de NOC/Sala de Situação da TI de Ipojuca.


---

## 5. Reformulação Visual e Artística — Ciclo #08: Editorial Minimalista & Maquete Isométrica Habblaude

### 5.1. Novo Paradigma Visual: "Quiet Infrastructure & Architectural Diorama"
Substituição definitiva da estética futurista por um design editorial requintado e acolhedor:
- **Zero Neon, Zero Glow, Zero Hologramas**: Todo brilho excessivo, partículas e feixes cósmicos foram eliminados.
- **Paleta Editorial Neutra**: Fundos claros `#F4F5F2`, cartões brancos `#FFFFFF` com sombras suaves difusas, divisórias discretas `#E4E8E3` e tipografia carvão `#242925`. Cor institucional de apoio `#52796B`.
- **Cores Semânticas Reservadas**: Verde suave `#2D6A4F` para Online, Âmbar `#D97706` para Atenção, Vermelho `#DC2626` para Crítico e Cinza `#718096` para Offline.

### 5.2. Direção Artística da Maquete 3D (Inspiração Habblaude)
- **Perspectiva Isométrica de Diorama**: Câmera ajustada no clássico ângulo isométrico de 35.264° com rotação de 45°, transmitindo a sensação de uma maquete tátil em miniatura sobre uma base arquitetônica de madeira clara.
- **Paredes Cortadas em L (*Cutaway Half-Walls*)**: As paredes dos setores possuem altura reduzida e cortes estratégicos para permitir visualização completa do interior das salas sem bloqueio visual.
- **Mobiliários em Estilo Voxel / Pixel Art 3D**:
  - Mesas de trabalho estilizadas com acabamento em carvalho claro e pés metálicos escuros.
  - Cadeiras ergonômicas em miniatura.
  - Balcão de atendimento na recepção, macas clínicas e biombos nos consultórios/enfermagem, armários modulares de farmácia e mini-rack de telecomunicações.
- **Computadores em Miniatura com Micro-LEDs de Status**:
  - Mini gabinetes e telas slim proporcionais sobre as mesas reais.
  - Indicadores luminosos sutis apenas no bezel do monitor, sem iluminar a cena inteira.
  - Efeito suave de destaque na mesa e tooltip discreto ao pairar o mouse (*hover*).

---

## 6. Especificação de Design Artístico — Ciclo #17: Sala-Piloto da Recepção (Padrão Habblaude Premium)

### 6.1. Diretriz Visual da Sala-Piloto
A Sala-Piloto (Recepção & Triagem) estabelece um novo padrão artístico para o Gêmeo Digital:
- **Transição de Blocos Procedurais para Miniaturas Modeladas:** Cada peça é dotada de proporção, espessura, chanfros, texturas limpas e materiais diferenciados (madeira carvalho, tecido acolchoado, metal escovado, vidro acrílico translúcido, cerâmica esmaltada).
- **Harmonia de Cores e Iluminação de Estúdio:** O ambiente combina paredes em tom linho suave `#F5EBE0`, rodapés de madeira nobre `#5C4033`, piso em parquet de carvalho claro `#C89D66` de baixo ruído e tapete de entrada azul royal `#1D4ED8` com borda celeste `#60A5FA`.
- **Iluminação Suave sem Faixas Diagonais:** Eliminação de sombras duras com `shadow-radius = 3.5`, `shadow-bias = -0.0005` e luz de preenchimento a 120° da luz solar.

### 6.2. Especificação dos Modelos da Sala-Piloto
1. **Balcão de Recepção (`ReceptionDeskHabblaude`):**
   - Geometria em L estilizada com tampo chanfrado em madeira carvalho natural (`#C8B298`).
   - Painel frontal com acabamento de ripas verticais em marfim suave (`#FAF9F6`), rodapé metálico recuado (`#8D6E63`).
   - Divisória superior de atendimento em vidro acrílico translúcido (`#E0F2FE`, opacidade 0.35).
   - Interior equipado com gaveteiro de fichas, nicho para impressora térmica e torre do PC.
2. **Mesa Executiva (`OfficeDeskHabblaude`):**
   - Tampo encorpado de carvalho claro (`1.34m x 0.82m x 0.08m`).
   - Gaveteiro lateral integrado com 3 gavetas em acabamento branco acetinado (`#FAF9F6`) e puxadores horizontais metálicos escovados (`#94A3B8`).
   - Pés metálicos em tubo de aço grafite escuro (`#4A4F55`) com travessa inferior de reforço.
3. **Cadeira Ergonômica (`ErgonomicChairHabblaude`):**
   - Assento acolchoado em tecido grafite (`#374151`) com curvatura anatômica frontal.
   - Encosto alto anatômico com suporte lombar integrado (`#374151`).
   - Apoios de braço em T em poliuretano preto fosco (`#1F2937`).
   - Haste do pistão pneumático cromada (`#9CA3AF`) e base aranha de 5 raios com mini-rodízios de nylon (`#111827`).
4. **Miniatura de Estação de Informática (`ComputerStationHabblaude`):**
   - **Monitor Widescreen:** Bezel ultrafino preto fosco (`#1F242B`), base metálica inclinada, tela fosca com emissividade semântica suave de status (`#2D6A4F` online, `#D97706` atenção, `#DC2626` crítico, `#2D3748` offline) e micro-LED de telemetria no canto inferior direito do bezel.
   - **Gabinete Torre:** Chassi metálico cinza-chumbo (`#1F2937`), grade frontal de arrefecimento (`#111827`), botão power circular (`#9CA3AF`), portas USB e micro-LED de atividade pulsante do agente.
   - **Teclado Slim & Mouse:** Teclado baixo com linhas de relevo de teclas, mousepad retangular escuro (`#1E293B`) e mouse óptico ergonômico esculpido (`#334155`).
5. **Impressora de Prontuário (`ThermalPrinterHabblaude`):**
   - Gabinete compacto hospitalar em cinza claro (`#F9FAFB`), bandeja de saída com folha de prontuário branca projetada e micro-LED verde indicador de spooler ativo.
6. **Armário de Arquivo (`StorageCabinetHabblaude`):**
   - Armário vertical de duas portas em marfim acetinado com puxadores verticais metálicos.
7. **Longarina de Espera (`WaitingLoungeHabblaude`):**
   - Barra estrutural em tubo de aço (`#64748B`) com pés anti-derrapantes e 3 assentos anatômicos acolchoados em azul royal hospitalar (`#1E3A8A`).
8. **Bebedouro de Água Mineral (`WaterDispenserHabblaude`):**
   - Gabinete de aço esmaltado branco, pingadeira cinza, torneiras azul e vermelha e galão de 20L translúcido com água azul cristalina (`#60A5FA`, opacidade 0.78) e tampa azul escura (`#1D4ED8`).
9. **Planta de Interior (`IndoorPlantHabblaude`):**
   - Vaso cônico em cerâmica esmaltada fosca (`#DFD7CB`), terra vegetal escura (`#3D2817`) e folhagem volumétrica estilizada de monstera/samambaia com variação de tons de verde (`#2D6A4F`, `#40916C`, `#52B788`).
10. **Decoração de Parede e Acabamentos:**
    - Relógio de parede redondo com moldura em madeira nobre e ponteiros escuros.
    - Quadro de arte contemporânea com moldura de madeira e vidro.
    - Janelas com moldura de madeira nobre, vidros translúcidos duplos e peitoril.
    - Portal de acesso com batente em madeira nobre e tabuleta de setor.

---

## 7. Especificação de Modelos 3D GLB — Ciclo #18: Biblioteca Modular da Sala-Piloto

### 7.1. Especificações Geométricas e Métricas dos Arquivos GLB
Todos os modelos são compilados com escala métrica 1:1, ponto de pivô fixado no piso (`Y = 0`) para alinhamento imediato com a laje, e orientação voltada para frente (`+Z` frontal):

1. **`furniture/reception_counter.glb`:**
   - **Dimensões:** `Largura: 2.40m | Altura: 1.08m | Profundidade: 1.80m` (formato em L).
   - **Materiais PBR:** Carvalho nobre natural (`#C8B298`, roughness 0.45), ripado em marfim (`#FAF9F6`), rodapé bronze escuro (`#5C4033`) e divisória acrílica translúcida (`#E0F2FE`, opacity 0.35).
2. **`furniture/office_desk.glb`:**
   - **Dimensões:** `Largura: 1.36m | Altura: 0.74m | Profundidade: 0.82m`.
   - **Materiais PBR:** Tampo biselado carvalho acetinado (`#C8B298`), gaveteiro branco pérola com puxadores em aço escovado (`#94A3B8`, metalness 0.8) e pernas tubulares grafite (`#374151`).
3. **`furniture/ergonomic_chair.glb`:**
   - **Dimensões:** `Largura: 0.54m | Altura: 0.96m | Profundidade: 0.52m`.
   - **Materiais PBR:** Estofado anatômico grafite (`#374151`, roughness 0.75), braços pretos (`#1F2937`), coluna cromada (`#9CA3AF`, metalness 0.7) e rodízios em nylon.
4. **`furniture/storage_cabinet.glb`:**
   - **Dimensões:** `Largura: 1.15m | Altura: 1.48m | Profundidade: 0.46m`.
   - **Materiais PBR:** Corpo marfim acetinado com tampo de carvalho e puxadores verticais metálicos.
5. **`tech/workstation_pc.glb`:**
   - **Dimensões:** `Largura: 0.90m | Altura: 0.46m | Profundidade: 0.52m`.
   - **Sub-nós Nomeados para Telemetria:**
     - `ScreenDisplay`: display 16:9 widescreen com material emissivo dinâmico.
     - `StatusLed`: micro-LED cilíndrico na moldura inferior.
     - `Chassis`: carcaça do monitor e torre miniatura com grelhas e botão power.
     - `Peripherals`: teclado slim e mousepad com mouse óptico.
6. **`tech/thermal_printer.glb`:**
   - **Dimensões:** `Largura: 0.28m | Altura: 0.18m | Profundidade: 0.24m`.
   - **Sub-nós:** Fenda com folha de papel e LED indicador `SpoolerLed`.
