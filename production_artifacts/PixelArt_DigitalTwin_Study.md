# Estudo Técnico — Gêmeo Digital em Pixel Art Isométrica

**Ciclo:** #32
**Data:** 18/11/2026
**Responsável:** @lead (arquitetura) com apoio de @designer e @frontend
**Status:** protótipo entregue para avaliação; implementação completa depende de aprovação

---

## 1. Como o Habblaud constrói sua representação visual

A análise do repositório público `marmottajr/habblaud` confirma que **não há cena 3D**. A representação é pixel art procedural composta em memória e só no final convertida em canvas.

Evidências estruturais (arquivos reais do repositório):

| Arquivo | Papel |
|---|---|
| `client/src/art/core/pixbuf.ts` | Buffer RGBA puro (`Uint8ClampedArray`), sem DOM. Toda a arte é composta aqui. |
| `client/src/art/core/color.ts` | `parseColor`, `shade`, `mix`, `ramp`, `outlineFor` — rampas e sombreamento. |
| `client/src/art/core/sprite.ts` | Sprites a partir de templates ASCII + paleta (`char → cor`). |
| `client/src/art/surfaces/floor.ts` | Pisos gerados em chunks de 8×8 tiles a partir de coordenadas de mundo, com hash determinístico e ruído bilinear. |
| `client/src/art/surfaces/walls.ts`, `rug.ts` | Paredes e tapetes como superfícies procedurais. |
| `client/src/art/furniture/kit.ts`, `office.ts`, `wall.ts` | Kits de mobiliário montados por composição de sprites. |
| `client/src/art/pixelfont.ts` | Fonte bitmap própria. |
| `client/src/art/theme.ts` | Paletas por tema. |
| `client/art-preview.html`, `client/src/art/preview.ts` | Bancada de pré-visualização da arte. |

Conclusões que explicam a falha da abordagem anterior:

1. **Determinismo por seed.** O piso é função de `(x, y, seed)`, não de textura. Isso mantém continuidade entre tiles e permite cache por chunk.
2. **Composição em buffer puro.** Desenhar em `PixelBuf` (sem DOM) torna a arte testável em Node e independente do canvas.
3. **Sprites por template ASCII + paleta.** Mobiliário é montado por caracteres, o que dá controle fino de pixel e permite variações por tema.
4. **Sem PBR, sem iluminação, sem câmera 3D.** A "perspectiva" é uma projeção isométrica fixa aplicada na hora de compor o buffer.

Nada foi copiado: o protótipo do RMM usa projeção isométrica própria, paleta própria e desenho procedural escrito para este projeto.

---

## 2. Como adaptar essa abordagem ao RMM

O RMM já possui o que a pixel art precisa: entidades reais (`machines`), setores (`sectors`), unidades (`units`) e telemetria por estação. A adaptação é uma **camada de apresentação**, não uma reescrita.

Mapeamento proposto:

| Conceito Habblaud | Equivalente no RMM |
|---|---|
| Mundo / chunks de piso | Sala do setor (`sector.bounds_x`, `bounds_z`, `depth_3d`) |
| Sprites de mobiliário | Balcão, mesa, cadeira, impressora, planta — desenhados por código |
| Avatar / personagem | Estação de trabalho (`machine`) com hostname real |
| Estado visual do avatar | `health_status` → NORMAL / WARNING / CRITICAL / OFFLINE |
| Fonte bitmap | Fonte monoespaçada em buffer lógico, escalada com vizinho mais próximo |
| Tema por ambiente | Paleta por tipo de setor (recepção, consultório, farmácia, administração) |

Regra de ouro: **a pixel art lê os mesmos objetos que o 3D**. Nenhum campo novo, nenhuma chamada nova ao backend.

---

## 3. Tecnologia recomendada

**Recomendação: Canvas 2D com buffer lógico + blit com `imageSmoothingEnabled = false`.**

Justificativa:

- O protótipo já roda assim e produz pixel art real (pixels definidos, sem antialiasing).
- Não adiciona dependência nova ao `package.json`.
- Funciona em qualquer navegador corporativo, inclusive sem WebGL.
- Permite o mesmo padrão do Habblaud: compor em buffer e converter no fim.

Alternativas avaliadas e descartadas para o modo A:

| Alternativa | Motivo do descarte |
|---|---|
| Three.js com sprites | Peso desnecessário; mantém dependência de WebGL para uma cena 2D. |
| PixiJS | Ótimo para sprites, mas adiciona ~400 KB e um segundo renderizador para manter. |
| CSS 3D + `box-shadow` | Não produz pixel art consistente nem controle de paleta. |
| SVG isométrico | Escala suave (antialiasing), contrariando o requisito de pixels definidos. |

Evolução opcional, se o volume de salas crescer: extrair o buffer para um módulo puro (equivalente ao `PixelBuf`) e cachear chunks de piso por sala, como o Habblaud faz.

---

## 4. Vantagens e limitações do Canvas 2D

**Vantagens**

- Custo de GPU baixo; roda em estações modestas e em navegador sem aceleração.
- Pixel art determinística: mesmo dado → mesma imagem.
- Fácil de testar (desenho é função pura de dados + seed).
- Acessível: labels e cartões podem ser desenhados em espaço de tela, sempre legíveis.
- Sem risco para a telemetria: é só leitura.

**Limitações**

- Sem iluminação, sombras dinâmicas ou materiais PBR.
- Ordenação de profundidade é manual (algoritmo do pintor por `x + y`).
- Muitos sprites animados exigem atlas e cache; desenho procedural por frame não escala indefinidamente.
- Zoom muito alto expõe a grade de pixels (é o efeito desejado, mas limita detalhe).
- Não substitui inspeção técnica tridimensional.

---

## 5. Possibilidade de manter o Three.js como modo complementar

Sim, e é o que foi implementado. O `DigitalTwin3D` permanece intacto e os modelos GLB não foram removidos. A alternância é feita por um estado de UI (`twinMode`: `PIXEL` | `3D`), com os botões de câmera (`ISO 3D`, `CAD TOPO`, `FOCO`, `360°`) visíveis apenas no modo 3D.

Consequências práticas:

- Nenhum modelo GLB foi apagado ou alterado.
- O modo 3D continua disponível para inspeção de infraestrutura.
- O modo pixel art é o padrão de leitura rápida; o 3D é o modo de aprofundamento.

---

## 6. Estratégia de sincronização dos dados

Fonte única: o array `machines` já carregado pelo `App.jsx` e atualizado por Socket.io.

```
App.jsx (estado único)
  ├── machines, activeUnit, selectedMachine, selectedSector
  ├── <PixelArtTwin ... onSelectMachine={...} />
  └── <DigitalTwin3D ... onSelectMachine={...} />
```

- **Seleção:** ambos recebem `selectedMachine` e chamam o mesmo `onSelectMachine`, que grava `selectedMachineId`. Selecionar no pixel art reflete no 3D e vice-versa.
- **Telemetria:** nenhum componente busca dados por conta própria; ambos recebem o mesmo snapshot.
- **Setor:** `selectedSector` é compartilhado; o pixel art prioriza o setor de recepção quando não há seleção.
- **Sem duplicação de regra:** o cálculo de saúde continua no backend (`healthEvaluator`); o front apenas colore.

---

## 7. Impactos no desempenho

Medições do protótipo (Canvas 2D, 480×300 lógicos, blit escalado):

- Desenho completo da sala: custo desprezível (dezenas de polígonos e retângulos).
- Redesenho ocorre apenas em mudança de estado (seleção, zoom, pan, blink de LED a cada 700 ms).
- Sem `requestAnimationFrame` contínuo: não há consumo de GPU em repouso.
- Memória: um buffer de 480×300 RGBA (~576 KB) mais o canvas de saída.

Comparação com o modo 3D atual: o 3D mantém loop de render, sombras 2048×2048 e malhas; o pixel art é ordens de magnitude mais leve.

Riscos de escala e mitigação:

- Muitas salas simultâneas → renderizar apenas a sala ativa (já é o comportamento).
- Muitos sprites animados → atlas + cache por sala.
- Zoom alto → limitar `zoom` a 4× e manter HUD em espaço de tela.

---

## 8. Plano de migração sem comprometer funcionalidades

| Etapa | Entrega | Risco | Mitigação |
|---|---|---|---|
| 1 (feita) | Estudo técnico + protótipo de uma recepção | Baixo | Componente isolado, sem tocar backend |
| 2 (feita) | Alternância PIXEL/3D no painel | Baixo | Estado de UI; 3D preservado |
| 3 (feita) | Correção da superfície azul no 3D | Baixo | Apenas paleta do tema `REC` |
| 4 (pendente) | Aprovação visual do usuário | — | Gate explícito |
| 5 | Generalizar para os demais setores | Médio | Um setor por vez, com o mesmo contrato de props |
| 6 | Cache de chunks e atlas de sprites | Médio | Só se o volume exigir; medir antes |
| 7 | Testes de regressão visual | Baixo | Captura automatizada por sala |

Invariantes respeitadas em todas as etapas:

- Backend não migrado.
- Modelos GLB preservados.
- Agentes e telemetria intocados.
- Lógica de negócio não duplicada.
- Inspeção 3D não abandonada.

---

## 9. Protótipo entregue

**Arquivo:** `frontend/src/components/PixelArtTwin.jsx`
**Integração:** `frontend/src/App.jsx` (estado `twinMode`, botões `PIXEL` / `3D`)

Conteúdo da sala de recepção, desenhado proceduralmente:

- Piso em xadrez isométrico.
- Paredes norte e oeste com faixa superior.
- Porta na parede oeste e janela na parede norte.
- Balcão de recepção, duas mesas, cadeira, impressora sobre apoio e planta.
- Tapete em tom sálvia (sem azul).
- Três estações reais: `DESKTOP-32HK6KT`, `DESKTOP-LMJ6I0N` e `DESKTOP-TCIIVHG`.

Interação:

- Clique no computador → seleciona a estação e abre o diagnóstico pelo mesmo fluxo do 3D.
- Arraste → move a maquete; roda do mouse → zoom (0,6× a 4×); duplo clique → centraliza.
- Cartão fixo com hostname, IP, status, CPU, RAM, disco e temperatura.
- LEDs de status piscando; rótulos compactos para evitar sobreposição.

Dados verificados na captura real: `DESKTOP-32HK6KT`, ONLINE, IP `10.200.33.245`, CPU 27%, RAM 32%, disco 44%, temperatura 50 °C.

---

## 10. Correção da superfície azul no modo 3D

**Origem identificada:** `frontend/src/components/DigitalTwin3D.jsx`, tema `REC` em `SECTOR_THEMES`:

```js
rugColor: '#1D4ED8',        // azul forte
rugBorderColor: '#60A5FA',  // azul claro
rugSize: [3.2, 2.0],
rugPos: [0.5, 0.0, -0.2],
```

Era o tapete de 3,2 × 2,0 no centro da recepção. Havia ainda um segundo elemento azul: o capacho de entrada (`#1E3A8A`, 1,0 × 1,8) na fachada oeste.

**Correção aplicada:**

- Tapete: `#A3B18A` com borda `#DAD7CD` (sálvia, coerente com a paleta hospitalar).
- Capacho: `#8D6E63` (madeira/terracota).
- Nenhuma alteração em seleção, layout ou lógica de equipamentos.

**Verificação:** captura do modo 3D após a correção mostra o tapete em verde-sálvia; não resta superfície azul de grande área. Os únicos azuis remanescentes são telas de monitor (`#1E3A8A`), propositalmente pequenas.

---

## 11. Decisão pendente

A implementação dos demais ambientes depende de aprovação explícita desta direção visual. Até lá, o escopo permanece: uma recepção em pixel art, alternância com o 3D e correção da paleta.
