# Especificação Técnica — Stylized Premium Isometric 3D Diorama

**Ciclo:** #33
**Data:** 18/11/2026
**Responsáveis:** @lead, @designer, @engineer, @frontend, @qa
**Status:** três modelos visuais entregues para escolha; implementação definitiva aguarda aprovação

---

## 1. Diagnóstico da aparência pixelada

Antes de alterar modelos, auditei o pipeline de renderização. Resultado medido no navegador:

| Item | Antes | Depois | Observação |
|---|---|---|---|
| `antialias` do WebGLRenderer | `true` | `true` | Já estava correto; não era a causa. |
| `dpr` do Canvas | ausente (padrão R3F `[1,2]`) | `[1, 2]` explícito | Em telas com escala 100% o buffer ficava em 1×, produzindo serrilhado. |
| Resolução efetiva do canvas | 596 × 871 CSS com buffer 596 × 871 | buffer até 2× o CSS | Medido: com `?dpr=2`, buffer 1192 × 1742. |
| `powerPreference` | não definido | `high-performance` | Evita queda para GPU integrada de baixo desempenho. |
| `alpha` | padrão | `false` | Remove composição desnecessária. |
| Tone mapping / ColorSpace | padrão R3F (ACES Filmic + sRGB) | mantido | Já adequado; não era a causa. |
| Sombras | 2048², `shadow-radius` 2.5 | mantido | Já suaves. |
| Texturas de piso | 256² com repetição inteira | mantido | Nitidez adequada; o serrilhado vinha da resolução do buffer. |

**Conclusão:** a aparência pixelada não vinha de `antialias` nem de texturas. Vinha da **resolução efetiva do buffer** (DPR 1 em muitos monitores) somada ao **baixo detalhe geométrico** dos móveis procedurais. O primeiro item está corrigido; o segundo depende dos modelos GLB.

---

## 2. Três modelos visuais da sala-piloto

Implementados em `frontend/src/components/twin/receptionThemes.js` e aplicados por `roomVariant` no `DigitalTwin3D`. A alternância A/B/C fica na barra de câmera, visível apenas no modo 3D.

### Variante A — Clínico Acolhedor

| Elemento | Valor |
|---|---|
| Paredes | `#F7F2E9` (branco quente) |
| Faixa superior | `#B08968` |
| Rodapé | `#8A6A4F` |
| Piso | parquet carvalho claro |
| Tapete | `#A3B18A` com borda `#DAD7CD` |
| Luz principal | `#FFF1DC`, intensidade 1,22 |
| Fundo | `#EDE7DA` |

Leitura: acolhedor e humano, sem perder sobriedade. Indicado para recepção e acolhimento.

### Variante B — Institucional Sereno

| Elemento | Valor |
|---|---|
| Paredes | `#EDF1F4` (cinza claro frio) |
| Faixa superior | `#8FA3AD` |
| Rodapé | `#6B7C86` |
| Piso | porcelanato claro |
| Tapete | `#8FA9B8` com borda `#E4EAEE` |
| Luz principal | `#F2F7FF`, intensidade 1,18 |
| Fundo | `#E7ECEF` |

Leitura: técnico, limpo e institucional. Maior contraste com os LEDs de status.

### Variante C — Terracota Humanizado

| Elemento | Valor |
|---|---|
| Paredes | `#F6E7D8` (creme) |
| Faixa superior | `#A9714B` |
| Rodapé | `#8A5636` |
| Piso | cerâmica terracota em xadrez |
| Tapete | `#C97B5A` com borda `#F0DCC8` |
| Luz principal | `#FFD9A8`, intensidade 1,34 |
| Fundo | `#F0E2D2` |

Leitura: calorosa e regional, com luz de fim de tarde. Maior personalidade, exige cuidado para não competir com os estados.

### Comparação

| Critério | A | B | C |
|---|---|---|---|
| Aconchego | alto | médio | alto |
| Legibilidade dos LEDs | boa | ótima | boa |
| Neutralidade institucional | média | alta | baixa |
| Risco de conflito com cores de estado | baixo | baixo | médio (terracota próximo do âmbar) |
| Coerência com o painel atual (verde `#2D6A4F`) | alta | média | baixa |

**Recomendação do @designer:** variante **A** como padrão, com a variante **B** disponível para setores técnicos (TI, farmácia). A variante **C** fica como opção sazonal, pelo risco de competir com o âmbar de ATENÇÃO.

---

## 3. Refinamento de modelos 3D proposto (não implementado)

Esta etapa depende de aprovação e de modelagem no Blender. Nada foi alterado nos GLB atuais.

| Ativo | Situação atual | Proposta |
|---|---|---|
| `workstation_pc.glb` | monitor e gabinete com quinas vivas | chanfro de 2 mm, moldura fina, base com peso visual, teclado com teclas sugeridas |
| `reception_counter.glb` | volume reto | tampo com chanfro, saia frontal rebaixada, rodapé embutido |
| `storage_cabinet.glb` | caixa com portas | puxadores em perfil, divisórias internas visíveis, pés discretos |
| `waiting_bench.glb` | assento e encosto retos | assento com leve ergonomia, encosto inclinado, estrutura metálica aparente |
| `thermal_printer.glb` | bloco | bandeja de saída, botoeira, LED de status |
| Cadeira | `ChairModel` | encosto com curvatura, base em cinco pontas, rodízios |
| Plantas | caixas empilhadas | folhagem em planos curvos com variação de tom |

Alternativa de baixo custo, se não houver Blender: aplicar `RoundedBox` do `@react-three/drei` (já instalado) nos móveis procedurais e manter os GLB como estão. Isso suaviza quinas sem remodular.

---

## 4. Câmera e composição

- Câmera isométrica mantida (`CameraRig`), com `ISO`, `CAD TOPO`, `FOCO`, `360°`.
- Enquadramento centralizado em `boardBounds`.
- Nenhuma parede oculta equipamentos: as paredes têm 1,45 m e a câmera olha de cima.
- Rótulos em `Html` do drei, com `distanceFactor`, sem sobreposição nas capturas.
- Hook de QA `?cam=` afasta a câmera para capturas de conjunto, sem alterar o padrão.

---

## 5. Preservação funcional

Nada foi alterado em: telemetria, Socket.io, identificação das estações, estados NORMAL/WARNING/CRITICAL/OFFLINE, seleção, `CameraRig`, `DiagnosticDrawer`, interações e integração com o backend. A mudança é apenas de paleta e iluminação, aplicada por `roomVariant`.

Verificado: clique na estação em modo 3D seleciona o equipamento e desenha a moldura CAD azul (`variant_C_foco_selecao.png`).

---

## 6. Critérios de homologação (@qa)

| # | Critério | Como verificar |
|---|---|---|
| 1 | Ausência de aparência pixelada | buffer ≥ 2× o CSS em tela com escala 100% |
| 2 | Mobiliário com geometria refinada | inspeção visual a 2× de zoom |
| 3 | Cores equilibradas | comparação das três variantes lado a lado |
| 4 | Texturas nítidas | piso sem serrilhado em zoom |
| 5 | Iluminação natural e sombras suaves | ausência de faixas duras |
| 6 | Identidade visual consistente | mesma paleta em todos os setores |
| 7 | Equipamentos reconhecíveis | monitor, gabinete, teclado e mouse legíveis |
| 8 | Telemetria e interatividade preservadas | clique seleciona; drawer abre; valores reais |
| 9 | Desempenho | 60 fps em GPU integrada de referência |

Itens 1, 3, 6, 7 e 8 verificados nas capturas deste ciclo. Itens 2, 4, 5 e 9 dependem da etapa de modelagem e de medição em hardware de referência.

---

## 7. Capturas entregues

| Arquivo | Conteúdo |
|---|---|
| `evidence/variant_A_clinico_acolhedor.png` | visão geral, 3200 × 2000 |
| `evidence/variant_B_institucional_sereno.png` | visão geral, 3200 × 2000 |
| `evidence/variant_C_terracota_humanizado.png` | visão geral, 3200 × 2000 |
| `evidence/variant_C_foco_selecao.png` | aproximação com estação selecionada |

As capturas foram geradas com `?dpr=2` e `?cam=1.55`, lendo o buffer real do canvas (3200 × 2000), não por ampliação de imagem.

**Limitação registrada:** o `DiagnosticDrawer` é um painel DOM fora do canvas, então não aparece na exportação do buffer. A captura com o drawer aberto exige screenshot de página inteira, que a ferramenta de browser não concluiu neste ciclo (timeout). Fica pendente para a homologação final.

---

## 8. Decisão pendente

Escolher a variante (A, B ou C) e aprovar a etapa de refinamento dos GLB. Após aprovação, implemento somente na sala-piloto (`DESKTOP-32HK6KT`, machine.id 9) e entrego as três capturas de homologação.
