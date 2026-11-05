# SESSION HANDOFF — RMM Ipojuca (Contexto Completo para Continuar em Outro PC)

> **Como usar este arquivo em outro computador:**
> 1. Clone o repositório: `git clone https://github.com/viitor14/ipojuca-rmm.git`
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

---

## 2. Próximos Passos Planejados pelo Usuário

1. **Testar o Agente (`IpojucaRMM-Setup.exe`) em outros PCs** conectando na VPS (`http://31.97.86.253:4005`) e visualizar no painel `http://31.97.86.253:8095`.
2. **Retomar a evolução do Design / Layout do Dashboard** para deixá-lo ainda mais diferenciado e moderno conforme o gosto do usuário.
3. **Expandir o Super Agente Cliente-Servidor** (chat interativo TI <-> Usuário da máquina, diagnóstico assistido e comandos remotos homologados).
