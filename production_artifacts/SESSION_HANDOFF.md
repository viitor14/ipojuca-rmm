# SESSION HANDOFF — RMM Ipojuca (Contexto Completo para Continuar em Outro PC)

> **Como usar este arquivo em outro computador:**
> 1. Clone (ou atualize) o repositório:
>    - Novo PC: `git clone https://github.com/viitor14/ipojuca-rmm.git`
>    - PC já clonado: `git pull origin main`
> 2. Abra a pasta `ipojuca-rmm` no Antigravity.
> 3. Digite no chat:
>    `/startcycle Leia @production_artifacts/SESSION_HANDOFF.md e vamos continuar de onde paramos`

---

## 1. Status Atual do Projeto (Concluído até aqui)

1. **Implantação na VPS (`31.97.86.253` / `root@srv912524`):**
   - Repositório Oficial: `https://github.com/viitor14/ipojuca-rmm.git` (branch `main`).
   - **Portas configuradas sem conflito com os outros containers da VPS:**
     - **Frontend (Dashboard 3D Digital Twin):** `http://31.97.86.253:8095`
     - **Backend (API Node.js + Socket.io):** `http://31.97.86.253:4005`
     - **MySQL 8.0:** Porta externa `3309` (`rmm-mysql`)
     - **n8n:** Integrado ao container existente na porta `5678`
2. **Máquinas Virtuais Removidas (Somente Máquinas Reais):**
   - Todos os mocks/máquinas simuladas (`101`, `102`, `103`, etc.) foram removidos de `backend/src/database/repository.js` e `frontend/src/App.jsx`.
   - O sistema realiza **Auto-Enrollment** apenas de máquinas reais autenticadas com `AGENT_ENROLLMENT_KEY=rmm-ipojuca-enroll-2026`.
3. **Ciclo Leve de Telemetria (Boot + 4h + Botão Manual):**
   - O agente envia telemetria imediatamente ao ligar o PC (boot/logon), a cada **4 horas** (`14400000` ms) e quando solicitado manualmente pelo botão **"⟳ ATUALIZAR TELEMETRIA AGORA (SOB DEMANDA)"** no painel.
   - `OFFLINE_THRESHOLD_SECONDS=15000` (4h10min).
4. **Instalador e Executável Nativo em Segundo Plano (`IpojucaRMM-Setup.exe`):**
   - Código-fonte C# nativo (`.NET Framework 4.x`, zero dependências externas): `agent/native/IpojucaAgent.cs`.
   - Executável compilado (`29 KB`): `agent/IpojucaRMM-Setup.exe` (também copiado em `backend/public/IpojucaRMM-Setup.exe` e `frontend/public/IpojucaRMM-Setup.exe`).
   - Ao executar em qualquer PC Windows:
     - Instala em `%LOCALAPPDATA%\IpojucaRMM\IpojucaRMM-Agent.exe`.
     - Registra inicialização automática no Registro (`HKCU\Software\Microsoft\Windows\CurrentVersion\Run\IpojucaRMMService`) e no Agendador de Tarefas (`IpojucaRMMService_AutoStart`).
     - Roda em segundo plano na Bandeja do Sistema (perto do relógio) sem janela preta do CMD.
     - Inclui janela do **Super Agente Client-Server** com botão de telemetria manual e chat bidirecional com a Central de TI (`/api/agent/pending`, `/api/agent/message`, `/api/machines/:id/messages`).
5. **Digital Twin 3D Arquitetônico & HUD Holográfico (`IPOJUCA.SPATIAL.OS v3.0` — Ciclo #03 Concluído):**
   - **Arquitetura 3D Conectada (`frontend/src/components/DigitalTwin3D.jsx`):** Corredor central hospitalar iluminado, anéis de radar polar no solo, pórticos de acesso nos setores, iluminação volumétrica e **Bastidor Core de Telecomunicações (`CORE.SWITCH // FIBRA ÓPTICA`)** central.
   - **Malha de Fibra Óptica 3D (`FiberOpticConduit`):** Conduítes no piso ligando o Core Switch a cada estação real ativa com pacotes luminosos pulsando na cor do status da máquina.
   - **Mobiliário Clínico/TI Contextual e Impressora 3D:**
     - *Recepção/Triagem:* balcão chanfrado com LED, totem de senha e longarinas de espera.
     - *Consultórios/Enfermagem:* maca clínica com cabeceira, armário vitrine e biombo.
     - *Farmácia/Vacina:* câmara fria científica (`+4.0°C`) e estantes modulares.
     - *Estações de Trabalho:* bancada chanfrada, cadeira ergonômica 5 pontas, gabinete com lateral acrílica, monitores duplos, periféricos iluminados e **impressora física de bancada** com LED sincronizado ao `spooler_running` (`PRN:OK` / `PRN:ERR`).
   - **HUD Holográfico & Osciloscópio (`frontend/src/App.jsx` e `DiagnosticDrawer.jsx`):** Seletor de camadas 3D (`MOBILIÁRIO`, `FIBRA GPON`, `HUD 3D`, `LUZ VOLUM.`), câmera `ORBITAL 360°`, filtro de busca rápida no Dock inferior, barras triplas CPU/RAM/Disco e Osciloscópio SVG de série temporal com modo compacto/expandido.

---

## 2. Próximos Passos Planejados para Continuar Amanhã no Outro PC

1. **Atualizar o Container do Frontend na VPS (`31.97.86.253:8095`)** com as novidades do Ciclo #03 (`cd /opt/ipojuca-rmm && git pull origin main && docker compose up -d --build frontend`).
2. **Expandir o Super Agente Cliente-Servidor** (integrar o chat interativo TI <-> Usuário da máquina dentro da lâmina do Dashboard, diagnóstico assistido e novos comandos remotos homologados).
3. **Testar o Agente (`IpojucaRMM-Setup.exe`) em máquinas reais** conectando na VPS (`http://31.97.86.253:4005`) e visualizar no painel 3D (`http://31.97.86.253:8095`).
