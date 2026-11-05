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
