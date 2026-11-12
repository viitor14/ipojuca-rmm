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
