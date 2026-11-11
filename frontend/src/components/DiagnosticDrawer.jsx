import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { STATUS_LABELS, RISK_LABELS, fixTextEncoding, theme } from "../styles/theme";

const BladeContainer = styled.aside`
  width: ${({ $collapsed }) => ($collapsed ? "300px" : "450px")};
  max-height: calc(100vh - 116px);
  background: rgba(13, 16, 24, 0.92);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-top: 3px solid ${({ $statusColor }) => $statusColor};
  border-radius: 10px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.82);
  pointer-events: auto;
  transition: width 0.2s ease;

  @media (max-width: 1100px) {
    width: ${({ $collapsed }) => ($collapsed ? "260px" : "375px")};
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
  padding-bottom: 12px;
`;

const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const MicroSerial = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.colors.brandPrimary};
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #050609;
  background: ${({ $color }) => $color};

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #050609;
  }
`;

const HostHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1.32rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  color: #f8fafc;
  line-height: 1.2;
  word-break: break-word;
`;

const SubLocation = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.82rem;
  font-weight: 500;
  color: #cbd5e1;
  line-height: 1.35;
`;

const ActionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
`;

const HeaderActionBtn = styled.button`
  padding: 5px 10px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.73rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${({ $variant }) =>
    $variant === "danger"
      ? "rgba(239, 68, 68, 0.14)"
      : $variant === "accent"
        ? "rgba(212, 255, 51, 0.12)"
        : "rgba(255, 255, 255, 0.06)"};
  color: ${({ $variant }) =>
    $variant === "danger"
      ? "#FCA5A5"
      : $variant === "accent"
        ? "#D4FF33"
        : "#E2E8F0"};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "danger"
        ? "rgba(239, 68, 68, 0.4)"
        : $variant === "accent"
          ? "rgba(212, 255, 51, 0.4)"
          : "rgba(255, 255, 255, 0.14)"};

  &:hover {
    filter: brightness(1.18);
    transform: translateY(-1px);
  }
`;

const RadialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const DialCard = styled.div`
  background: rgba(7, 9, 14, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .dial-label {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.68rem;
    font-weight: 600;
    color: #94a3b8;
    text-align: center;
  }
`;

const OscilloscopeCard = styled.div`
  background: rgba(7, 9, 14, 0.85);
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  padding: 9px 12px;

  .osc-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.7rem;
    font-weight: 600;
    color: #94a3b8;
    margin-bottom: 6px;
  }

  .osc-legend {
    display: flex;
    gap: 12px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #e2e8f0;
    }
    i {
      width: 8px;
      height: 3px;
      border-radius: 2px;
      display: inline-block;
    }
  }
`;

const SpecPlate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
  background: rgba(7, 9, 14, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 3px solid ${({ theme }) => theme.colors.brandPrimary};
  border-radius: 8px;

  .spec-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .spec-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;

    span {
      font-family: ${({ theme }) => theme.fonts.sans};
      font-size: 0.68rem;
      font-weight: 600;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    strong {
      font-family: ${({ theme }) => theme.fonts.sans};
      font-size: 0.82rem;
      color: #f8fafc;
      font-weight: 600;
      line-height: 1.35;
      word-break: break-word;
    }

    strong.mono {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: 0.79rem;
    }
  }

  .spec-divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.07);
  }
`;

const SectionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-top: 2px;
`;

const RefreshTelemetryBtn = styled.button`
  width: 100%;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${({ $loading }) =>
    $loading ? "rgba(212, 255, 51, 0.25)" : "#D4FF33"};
  color: #050609;
  border: 1px solid #d4ff33;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    filter: brightness(1.08);
    transform: translateY(-1px);
  }
`;

const KeycapMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const KeycapButton = styled.button`
  position: relative;
  padding: 10px 11px;
  border-radius: 8px;
  text-align: left;
  background: ${({ disabled }) =>
    disabled ? "rgba(15, 18, 26, 0.5)" : "rgba(20, 25, 36, 0.95)"};
  color: ${({ disabled }) => (disabled ? "#64748B" : "#F8FAFC")};
  border: 1px solid
    ${({ disabled, $risk }) =>
      disabled
        ? "rgba(255,255,255,0.06)"
        : $risk === "HIGH"
          ? "rgba(245, 158, 11, 0.45)"
          : "rgba(255, 255, 255, 0.13)"};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition:
    transform 0.12s ease,
    border-color 0.15s ease,
    background 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.brandPrimary};
    background: rgba(28, 35, 50, 0.98);
    transform: translateY(-1px);
  }

  .key-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
  }

  .key-badge {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.64rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 4px;
    background: ${({ $risk }) =>
      $risk === "HIGH"
        ? "rgba(245, 158, 11, 0.18)"
        : $risk === "MEDIUM"
          ? "rgba(56, 189, 248, 0.16)"
          : "rgba(16, 185, 129, 0.16)"};
    color: ${({ $risk }) =>
      $risk === "HIGH"
        ? "#FBBF24"
        : $risk === "MEDIUM"
          ? "#38BDF8"
          : "#34D399"};
  }

  .key-title {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.79rem;
    font-weight: 700;
    line-height: 1.3;
    display: block;
    color: inherit;
  }
`;

const TerminalReadout = styled.div`
  background: #060911;
  border: 1px solid
    ${({ $highlight }) =>
      $highlight ? "rgba(0, 229, 255, 0.65)" : "rgba(255, 255, 255, 0.16)"};
  box-shadow: ${({ $highlight }) =>
    $highlight ? "0 0 16px rgba(0, 229, 255, 0.18)" : "none"};
  border-radius: 8px;
  padding: 10px 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.74rem;
  line-height: 1.5;
  max-height: 165px;
  overflow-y: auto;
  color: #cbd5e1;

  .console-head {
    font-size: 0.66rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #00e5ff;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 4px;
  }

  .line-ok {
    color: #10b981;
    font-weight: 600;
  }
  .line-busy {
    color: #00e5ff;
    font-weight: 600;
  }
  .line-err {
    color: #ef4444;
    font-weight: 600;
  }
  .line-n8n {
    color: #d4ff33;
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed rgba(212, 255, 51, 0.25);
  }
`;

const DiagnosticModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(3, 6, 12, 0.72);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: auto;
`;

const DiagnosticModalCard = styled.div`
  width: 100%;
  max-width: 560px;
  background: rgba(11, 15, 25, 0.98);
  border: 1px solid rgba(0, 229, 255, 0.55);
  border-top: 4px solid ${({ $statusColor }) => $statusColor || "#00E5FF"};
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.9), 0 0 32px rgba(0, 229, 255, 0.16);
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: #f8fafc;
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const DiagItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 8px;
`;

const DiagItemBox = styled.div`
  background: rgba(6, 9, 16, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-left: 3px solid #00e5ff;
  border-radius: 7px;
  padding: 8px 11px;
  display: flex;
  flex-direction: column;
  gap: 3px;

  .diag-k {
    font-size: 0.66rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #94a3b8;
  }

  .diag-v {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.81rem;
    font-weight: 700;
    color: #f1f5f9;
    word-break: break-word;
  }
`;

function parseDiagnosticSummary(rawText) {
  const clean = fixTextEncoding(rawText || "");
  if (!clean) return [];
  const parts = clean
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.map((segment, idx) => {
    const colonIdx = segment.indexOf(":");
    if (colonIdx > 0 && colonIdx < 36) {
      return {
        label: segment.slice(0, colonIdx).trim(),
        value: segment.slice(colonIdx + 1).trim(),
      };
    }
    return {
      label: `Item #${idx + 1}`,
      value: segment,
    };
  });
}

function RadialGauge({ value = 0, unit = "%", label }) {
  const clamped = Math.min(100, Math.max(0, Number(value || 0)));
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  const strokeColor =
    clamped >= 90
      ? theme.colors.status.CRITICAL
      : clamped >= 75
        ? theme.colors.status.WARNING
        : theme.colors.status.NORMAL;

  return (
    <DialCard>
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="4.5"
        />
        <circle
          cx="28"
          cy="28"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="4.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 28 28)"
        />
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#F8FAFC"
          fontFamily="JetBrains Mono, monospace"
          fontSize="10.5"
          fontWeight="700"
        >
          {clamped.toFixed(1)}
          {unit}
        </text>
      </svg>
      <span className="dial-label">{label}</span>
    </DialCard>
  );
}

function TelemetryOscilloscope({ machine, telemetryHistory = [] }) {
  const { cpuPath, ramPath } = useMemo(() => {
    const baseCpu = Number(machine?.cpu_usage_pct || 18);
    const baseRam = Number(machine?.ram_usage_pct || 42);

    const samples =
      telemetryHistory && telemetryHistory.length >= 2
        ? telemetryHistory.slice(0, 12).reverse()
        : Array.from({ length: 12 }).map((_, i) => ({
            cpu_usage_pct: Math.max(
              2,
              Math.min(
                100,
                baseCpu + Math.sin(i * 0.9 + (machine?.id || 1)) * 4
              )
            ),
            ram_usage_pct: Math.max(
              5,
              Math.min(
                100,
                baseRam + Math.cos(i * 0.7 + (machine?.id || 1)) * 2
              )
            ),
          }));

    const width = 360;
    const height = 46;
    const step = width / Math.max(1, samples.length - 1);

    const toPath = (key) =>
      samples
        .map((s, idx) => {
          const val = Math.min(100, Math.max(0, Number(s[key] || 0)));
          const x = (idx * step).toFixed(1);
          const y = (height - (val / 100) * (height - 8) - 4).toFixed(1);
          return `${idx === 0 ? "M" : "L"}${x},${y}`;
        })
        .join(" ");

    return {
      cpuPath: toPath("cpu_usage_pct"),
      ramPath: toPath("ram_usage_pct"),
    };
  }, [machine, telemetryHistory]);

  return (
    <OscilloscopeCard>
      <div className="osc-head">
        <span>Histórico de Uso em Tempo Real</span>
        <div className="osc-legend">
          <span>
            <i style={{ background: "#10B981" }} /> CPU
          </span>
          <span>
            <i style={{ background: "#00E5FF" }} /> RAM
          </span>
        </div>
      </div>
      <svg
        width="100%"
        height="46"
        viewBox="0 0 360 46"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="12"
          x2="360"
          y2="12"
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="3 3"
        />
        <line
          x1="0"
          y1="24"
          x2="360"
          y2="24"
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="3 3"
        />
        <line
          x1="0"
          y1="36"
          x2="360"
          y2="36"
          stroke="rgba(255,255,255,0.06)"
          strokeDasharray="3 3"
        />
        <path
          d={ramPath}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="1.8"
          opacity="0.85"
        />
        <path d={cpuPath} fill="none" stroke="#10B981" strokeWidth="2" />
      </svg>
    </OscilloscopeCard>
  );
}

export function DiagnosticDrawer({
  diagnostics,
  units = [],
  chatMessages = [],
  taskCatalog,
  currentUser,
  onDispatchTask,
  onRefreshTelemetryNow,
  onUpdateMachineAgent,
  onSendMessage,
  onUpdateLocation,
  onDeleteMachine,
  onFocusCamera,
}) {
  const [busyTask, setBusyTask] = useState(null);
  const [refreshingNow, setRefreshingNow] = useState(false);
  const [updatingAgent, setUpdatingAgent] = useState(false);
  const [chatText, setChatText] = useState("");
  const [sendingChat, setSendingChat] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeReport, setActiveReport] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  const latestTask = diagnostics?.tasks?.[0] || null;
  useEffect(() => {
    if (!latestTask || !activeReport) return;
    if (
      activeReport.taskId === latestTask.task_id ||
      (activeReport.taskCode === latestTask.task_code && activeReport.status === "RUNNING")
    ) {
      if (latestTask.output_summary) {
        setActiveReport((prev) =>
          prev
            ? {
                ...prev,
                taskId: latestTask.task_id,
                status: latestTask.status || "COMPLETED",
                summary: fixTextEncoding(latestTask.output_summary),
                timestamp: new Date(latestTask.completed_at || latestTask.issued_at || Date.now()).toLocaleTimeString("pt-BR"),
              }
            : null
        );
        setFeedback({
          type: "ok",
          text: `✅ ${activeReport.title}: ${fixTextEncoding(latestTask.output_summary)}`,
        });
      }
    }
  }, [latestTask?.task_id, latestTask?.status, latestTask?.output_summary]);

  if (!diagnostics || !diagnostics.machine) {
    return (
      <BladeContainer $statusColor="#D4FF33" $collapsed={collapsed}>
        <HeaderBlock>
          <MicroSerial>AGUARDANDO AGENTES REAIS</MicroSerial>
          <HostHeading>Nenhuma Estação Nesta Unidade</HostHeading>
          <SubLocation>
            Instale e inicie o Agente Windows (IpojucaRMM-Setup.exe) na máquina
            para registrá-la automaticamente nesta unidade.
          </SubLocation>
        </HeaderBlock>
      </BladeContainer>
    );
  }

  const {
    machine,
    tasks = [],
    alerts = [],
    telemetry = [],
    telemetryHistory = [],
  } = diagnostics;
  const activeTelemetryHistory =
    telemetry.length > 0 ? telemetry : telemetryHistory;

  // Se a máquina tiver histórico de telemetria recente mas CPU/RAM vieram zerados, exibe o último valor real medido
  const latestSample = activeTelemetryHistory[0] || null;
  const displayCpu =
    Number(machine.cpu_usage_pct) > 0
      ? Number(machine.cpu_usage_pct)
      : Number(latestSample?.cpu_usage_pct || 0);
  const displayRam =
    Number(machine.ram_usage_pct) > 0
      ? Number(machine.ram_usage_pct)
      : Number(latestSample?.ram_usage_pct || 0);

  const statusColor =
    theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;

  const uptimeHours = (Number(machine.uptime_seconds || 0) / 3600).toFixed(1);

  async function handleManualRefresh() {
    setRefreshingNow(true);
    setFeedback(null);
    try {
      const res = await onRefreshTelemetryNow(machine.id);
      setFeedback({
        type: "ok",
        text:
          res.message ||
          "Telemetria atualizada com sucesso em tempo real.",
      });
    } catch (err) {
      setFeedback({ type: "err", text: `Falha na coleta: ${err.message}` });
    } finally {
      setRefreshingNow(false);
    }
  }

  async function handleUpdateAgentNow() {
    if (!onUpdateMachineAgent) return;
    setUpdatingAgent(true);
    setFeedback(null);
    try {
      const res = await onUpdateMachineAgent(machine.id);
      setFeedback({
        type: "ok",
        text:
          res.message ||
          "Ordem de atualização enviada ao Agente Windows com aviso na tela do cliente.",
      });
    } catch (err) {
      setFeedback({ type: "err", text: `Falha ao atualizar agente: ${err.message}` });
    } finally {
      setUpdatingAgent(false);
    }
  }

  async function handleSendChatMessage(e) {
    e.preventDefault();
    if (!chatText.trim() || !onSendMessage) return;
    setSendingChat(true);
    try {
      await onSendMessage(machine.id, chatText.trim());
      setFeedback({
        type: "ok",
        text: `Mensagem enviada para a tela de ${machine.hostname}: "${chatText.trim()}"`,
      });
      setChatText("");
    } catch (err) {
      setFeedback({ type: "err", text: `Falha ao enviar mensagem: ${err.message}` });
    } finally {
      setSendingChat(false);
    }
  }

  async function handleSectorChange(e) {
    const val = e.target.value;
    if (!val || !onUpdateLocation) return;
    const [uId, sId] = val.split(":").map(Number);
    if (!uId || !sId) return;
    try {
      await onUpdateLocation(machine.id, { unitId: uId, sectorId: sId });
      setFeedback({
        type: "ok",
        text: "Unidade e setor da estação atualizados no mapa 3D.",
      });
    } catch (err) {
      setFeedback({ type: "err", text: `Erro ao mover estação: ${err.message}` });
    }
  }

  async function handleRunTask(task) {
    const cleanTitle = fixTextEncoding(task.title);
    setBusyTask(task.code);
    setFeedback({
      type: "busy",
      text: `⏳ Executando "${cleanTitle}" em ${machine.hostname}... aguarde resposta do Agente.`,
    });
    setActiveReport({
      taskId: null,
      taskCode: task.code,
      title: cleanTitle,
      status: "RUNNING",
      summary: `Solicitando "${cleanTitle}" ao Agente Windows instalado em ${machine.hostname} (${machine.ip_address})...`,
      timestamp: new Date().toLocaleTimeString("pt-BR"),
      taskRef: task,
    });

    try {
      if (task.code === "SYNC_TELEMETRY_NOW" && onRefreshTelemetryNow) {
        const res = await onRefreshTelemetryNow(machine.id);
        const summaryMsg =
          res.message ||
          `Host: ${machine.hostname} | IPv4: ${machine.ip_address} | CPU: ${Number(machine.cpu_usage_pct).toFixed(1)}% | RAM: ${Number(machine.ram_usage_pct).toFixed(1)}% | Disco: ${Number(machine.disk_usage_pct).toFixed(1)}%`;
        setFeedback({
          type: "ok",
          text: `✅ ${cleanTitle}: ${summaryMsg}`,
        });
        setActiveReport({
          taskId: `sync_${Date.now()}`,
          taskCode: task.code,
          title: cleanTitle,
          status: "COMPLETED",
          summary: summaryMsg,
          timestamp: new Date().toLocaleTimeString("pt-BR"),
          taskRef: task,
        });
        return;
      }

      if (task.code === "UPDATE_AGENT" && onUpdateMachineAgent) {
        const res = await onUpdateMachineAgent(machine.id);
        const summaryMsg =
          res.message ||
          "Ordem de atualização OTA enviada ao PC com barra de progresso na tela do cliente.";
        setFeedback({
          type: "ok",
          text: `✅ ${cleanTitle}: ${summaryMsg}`,
        });
        setActiveReport({
          taskId: `upd_${Date.now()}`,
          taskCode: task.code,
          title: cleanTitle,
          status: "COMPLETED",
          summary: summaryMsg,
          timestamp: new Date().toLocaleTimeString("pt-BR"),
          taskRef: task,
        });
        return;
      }

      const defaultParams =
        task.code === "INSTALL_APPROVED_PRINTER"
          ? { printer_ip: "10.14.1.250", printer_name: "IMP_USF_RECEPCAO" }
          : task.code === "CLEAR_TEMP_CACHE"
            ? { include_system_temp: true }
            : task.code === "CHECK_DISK_HEALTH"
              ? { drive: "C" }
              : {};

      const res = await onDispatchTask({
        machineId: machine.id,
        taskCode: task.code,
        parameters: defaultParams,
        reason: `Ação executada por ${currentUser.name}`,
      });
      const summaryOut = fixTextEncoding(
        res.task?.output_summary || "Comando executado no Agente Windows."
      );
      setFeedback({
        type: "ok",
        text: `✅ ${cleanTitle}: ${summaryOut}`,
      });
      setActiveReport({
        taskId: res.task?.task_id || `tsk_${Date.now()}`,
        taskCode: task.code,
        title: cleanTitle,
        status: res.task?.status || "COMPLETED",
        summary: summaryOut,
        timestamp: new Date().toLocaleTimeString("pt-BR"),
        taskRef: task,
      });
    } catch (err) {
      const errMsg = `Erro ao executar "${cleanTitle}": ${err.message}`;
      setFeedback({ type: "err", text: `❌ ${errMsg}` });
      setActiveReport({
        taskId: `err_${Date.now()}`,
        taskCode: task.code,
        title: cleanTitle,
        status: "FAILED",
        summary: errMsg,
        timestamp: new Date().toLocaleTimeString("pt-BR"),
        taskRef: task,
      });
    } finally {
      setBusyTask(null);
    }
  }

  return (
    <BladeContainer $statusColor={statusColor} $collapsed={collapsed}>
      <HeaderBlock>
        <HeaderTopRow>
          <MicroSerial>
            ESTAÇÃO #{machine.id} • {machine.ip_address} • AGENTE{" "}
            {machine.agent_version || "2.1.0"}
          </MicroSerial>
          <StatusBadge $color={statusColor}>
            <span className="dot" />
            {STATUS_LABELS[machine.health_status] || machine.health_status}
          </StatusBadge>
        </HeaderTopRow>

        <div>
          <HostHeading>{fixTextEncoding(machine.hostname)}</HostHeading>
          <SubLocation>
            {fixTextEncoding(machine.unit_name)} •{" "}
            {fixTextEncoding(machine.sector_name)}
          </SubLocation>
          {units.length > 0 && onUpdateLocation && currentUser?.role !== "VIEWER" && (
            <select
              value={`${machine.unit_id}:${machine.sector_id}`}
              onChange={handleSectorChange}
              style={{
                marginTop: "6px",
                width: "100%",
                padding: "5px 8px",
                borderRadius: "6px",
                background: "rgba(15, 23, 42, 0.85)",
                color: "#CBD5E1",
                border: "1px solid rgba(255,255,255,0.14)",
                fontFamily: "inherit",
                fontSize: "0.75rem",
                cursor: "pointer",
              }}
              title="Alterar em qual Unidade de Saúde e Setor esta máquina está alocada"
            >
              {units.map((u) =>
                (u.sectors || []).map((s) => (
                  <option key={`${u.id}:${s.id}`} value={`${u.id}:${s.id}`}>
                    📍 {fixTextEncoding(u.name)} — {fixTextEncoding(s.name)}
                  </option>
                ))
              )}
            </select>
          )}
        </div>

        <ActionToolbar>
          <HeaderActionBtn $variant="accent" onClick={onFocusCamera}>
            Focar no Mapa 3D
          </HeaderActionBtn>
          <HeaderActionBtn onClick={() => setCollapsed((prev) => !prev)}>
            {collapsed ? "Expandir Painel" : "Recolher Painel"}
          </HeaderActionBtn>
          {onDeleteMachine && currentUser?.role !== "VIEWER" && (
            <HeaderActionBtn
              $variant="danger"
              onClick={() => onDeleteMachine(machine.id)}
              title="Remover esta estação do painel"
            >
              Remover PC
            </HeaderActionBtn>
          )}
        </ActionToolbar>
      </HeaderBlock>

      <RadialGrid>
        <RadialGauge value={displayCpu} unit="%" label="Uso de CPU" />
        <RadialGauge value={displayRam} unit="%" label="Memória RAM" />
        <RadialGauge
          value={machine.disk_usage_pct}
          unit="%"
          label="Disco SSD"
        />
        <RadialGauge
          value={machine.temperature_c}
          unit="°C"
          label="Temperatura"
        />
      </RadialGrid>

      {!collapsed && (
        <>
          <TelemetryOscilloscope
            machine={{
              ...machine,
              cpu_usage_pct: displayCpu,
              ram_usage_pct: displayRam,
            }}
            telemetryHistory={activeTelemetryHistory}
          />

          <SpecPlate>
            <div className="spec-grid-2">
              <div className="spec-cell">
                <span>Endereço IPv4 / MAC</span>
                <strong className="mono">
                  {machine.ip_address} • {machine.mac_address || "N/A"}
                </strong>
              </div>
              <div className="spec-cell">
                <span>Fila de Impressão (Spooler)</span>
                <strong
                  style={{
                    color: machine.spooler_running ? "#10B981" : "#EF4444",
                  }}
                >
                  {machine.spooler_running
                    ? "● Serviço Ativo (Normal)"
                    : "● Serviço Parado (Falha)"}
                </strong>
              </div>
            </div>

            <div className="spec-divider" />

            <div className="spec-cell">
              <span>Fabricante / Modelo / Número de Série</span>
              <strong>
                {fixTextEncoding(machine.manufacturer)}{" "}
                {fixTextEncoding(machine.model)} ({machine.serial_number})
              </strong>
            </div>

            <div className="spec-divider" />

            <div className="spec-cell">
              <span>Processador (CPU)</span>
              <strong>
                {fixTextEncoding(machine.cpu_model || "Processador x64")}
              </strong>
            </div>

            <div className="spec-divider" />

            <div className="spec-grid-2">
              <div className="spec-cell">
                <span>Memória / Armazenamento</span>
                <strong className="mono">
                  {(Number(machine.ram_total_mb || 8192) / 1024).toFixed(1)} GB
                  RAM • {machine.disk_total_gb} GB {machine.disk_type}
                </strong>
              </div>
              <div className="spec-cell">
                <span>Sistema Operacional / Ativo</span>
                <strong>
                  {fixTextEncoding(machine.os_version || "Windows")} •{" "}
                  {uptimeHours}h ligado
                </strong>
              </div>
            </div>
          </SpecPlate>

          <SectionBar>
            <span>
              Última comunicação:{" "}
              {machine.last_seen_at
                ? new Date(machine.last_seen_at).toLocaleTimeString("pt-BR")
                : "Agora"}
            </span>
            <span>Ciclo: 4h + Tempo Real</span>
          </SectionBar>

          <RefreshTelemetryBtn
            onClick={handleManualRefresh}
            disabled={refreshingNow}
            $loading={refreshingNow}
          >
            {refreshingNow
              ? "⟳ Coletando dados em tempo real do Agente..."
              : "⟳ Atualizar Telemetria Agora (Tempo Real)"}
          </RefreshTelemetryBtn>

          {onUpdateMachineAgent && currentUser?.role !== "VIEWER" && (
            <RefreshTelemetryBtn
              onClick={handleUpdateAgentNow}
              disabled={updatingAgent}
              $loading={updatingAgent}
              style={{
                background: updatingAgent
                  ? "rgba(0, 229, 255, 0.2)"
                  : "rgba(0, 229, 255, 0.14)",
                color: "#00E5FF",
                borderColor: "rgba(0, 229, 255, 0.55)",
              }}
              title="Envia a nova versão do Agente para este computador e mostra o progresso na tela do cliente"
            >
              {updatingAgent
                ? "⬆ Enviando atualização ao Agente..."
                : "⬆ Enviar Atualização do Agente (Mostrar na Tela do PC)"}
            </RefreshTelemetryBtn>
          )}

          <SectionBar>
            <span>Ações de Manutenção Remota</span>
            <span>Perfil: {currentUser.role}</span>
          </SectionBar>

          <TerminalReadout $highlight={Boolean(feedback || busyTask)}>
            <div className="console-head">
              <span>⚡ Retorno de Execução Remota</span>
              <span>{busyTask ? "EXECUTANDO..." : "PRONTO"}</span>
            </div>
            {feedback ? (
              <div
                className={
                  feedback.type === "err"
                    ? "line-err"
                    : feedback.type === "busy"
                      ? "line-busy"
                      : "line-ok"
                }
                style={{ marginBottom: tasks.length > 0 ? "6px" : 0 }}
              >
                &gt; {feedback.text}
              </div>
            ) : (
              tasks.length === 0 && (
                <div style={{ color: "#94A3B8" }}>
                  &gt; Clique em qualquer botão abaixo para executar no PC selecionado.
                </div>
              )
            )}
            {tasks.slice(0, 4).map((t) => (
              <div
                key={t.task_id}
                onClick={() => {
                  const foundSpec = taskCatalog.find((c) => c.code === t.task_code);
                  setActiveReport({
                    taskId: t.task_id,
                    taskCode: t.task_code,
                    title: fixTextEncoding(foundSpec?.title || t.task_code),
                    status: t.status || "COMPLETED",
                    summary: fixTextEncoding(t.output_summary || "Sem detalhes adicionais."),
                    timestamp: new Date(t.issued_at).toLocaleTimeString("pt-BR"),
                    taskRef: foundSpec || null,
                  });
                }}
                style={{
                  cursor: "pointer",
                  padding: "3px 4px",
                  borderRadius: "4px",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                }}
                title="Clique para abrir a janela de relatório detalhado desta ação"
              >
                [{new Date(t.issued_at).toLocaleTimeString("pt-BR")}]{" "}
                <strong style={{ color: "#E2E8F0" }}>{t.task_code}</strong> ::{" "}
                <span className="line-ok">{t.status}</span> —{" "}
                {fixTextEncoding(t.output_summary)}{" "}
                <span style={{ color: "#00E5FF", fontSize: "0.68rem" }}>
                  [Ver Diagnóstico]
                </span>
              </div>
            ))}
            {alerts.length > 0 && (
              <div className="line-n8n">
                [N8N // WHATSAPP] Protocolo #
                {alerts[0].external_ticket_id || "ATIVO"} —{" "}
                {fixTextEncoding(alerts[0].message)}
              </div>
            )}
          </TerminalReadout>

          <KeycapMatrix>
            {taskCatalog.map((task) => {
              const allowed = task.permittedForCurrentUser;
              const isBusy = busyTask === task.code;
              return (
                <KeycapButton
                  key={task.code}
                  $risk={task.riskLevel}
                  disabled={!allowed || isBusy}
                  onClick={() => handleRunTask(task)}
                  title={task.description}
                  style={
                    isBusy
                      ? {
                          borderColor: "#00E5FF",
                          background: "rgba(0, 229, 255, 0.14)",
                        }
                      : undefined
                  }
                >
                  <div className="key-head">
                    <span className="key-badge">
                      Risco {RISK_LABELS[task.riskLevel] || task.riskLevel}
                    </span>
                  </div>
                  <span className="key-title">
                    {isBusy
                      ? "⏳ Executando no PC..."
                      : fixTextEncoding(task.title)}
                  </span>
                </KeycapButton>
              );
            })}
          </KeycapMatrix>

          {onSendMessage && (
            <div
              style={{
                background: "rgba(7, 9, 14, 0.85)",
                border: "1px solid rgba(0, 229, 255, 0.25)",
                borderRadius: "8px",
                padding: "10px 12px",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              <SectionBar style={{ marginTop: 0, color: "#00E5FF" }}>
                <span>💬 Chat / Aviso na Tela do PC</span>
                <span>Super Agente</span>
              </SectionBar>

              {chatMessages.length > 0 && (
                <div
                  style={{
                    maxHeight: "95px",
                    overflowY: "auto",
                    fontSize: "0.75rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    padding: "6px 8px",
                    background: "rgba(3, 5, 9, 0.7)",
                    borderRadius: "6px",
                  }}
                >
                  {chatMessages.slice(-6).map((m) => (
                    <div key={m.id} style={{ lineHeight: 1.35 }}>
                      <strong
                        style={{
                          color:
                            m.direction === "SERVER_TO_CLIENT"
                              ? "#D4FF33"
                              : "#00E5FF",
                        }}
                      >
                        [{m.sender}]:
                      </strong>{" "}
                      <span style={{ color: "#F1F5F9" }}>
                        {fixTextEncoding(m.message)}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <form
                onSubmit={handleSendChatMessage}
                style={{ display: "flex", gap: "6px" }}
              >
                <input
                  type="text"
                  placeholder="Enviar mensagem para abrir na tela do usuário..."
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "7px 10px",
                    borderRadius: "6px",
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(255,255,255,0.16)",
                    color: "#F8FAFC",
                    fontFamily: "inherit",
                    fontSize: "0.78rem",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={sendingChat || !chatText.trim()}
                  style={{
                    padding: "7px 12px",
                    borderRadius: "6px",
                    background: "#00E5FF",
                    color: "#050609",
                    border: "none",
                    fontWeight: 700,
                    fontSize: "0.76rem",
                    cursor: "pointer",
                  }}
                >
                  Enviar
                </button>
              </form>
            </div>
          )}
        </>
      )}

      {activeReport && (
        <DiagnosticModalBackdrop onClick={() => setActiveReport(null)}>
          <DiagnosticModalCard
            $statusColor={
              activeReport.status === "FAILED"
                ? "#EF4444"
                : activeReport.status === "RUNNING"
                  ? "#00E5FF"
                  : "#10B981"
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "12px",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                paddingBottom: "12px",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.7rem",
                    color: "#00E5FF",
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}
                >
                  RELATÓRIO DE DIAGNÓSTICO REMOTO // {activeReport.taskCode}
                </div>
                <h3
                  style={{
                    margin: "4px 0 2px",
                    fontSize: "1.15rem",
                    fontWeight: 800,
                    color: "#F8FAFC",
                  }}
                >
                  {activeReport.title}
                </h3>
                <div style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                  Estação:{" "}
                  <strong style={{ color: "#E2E8F0" }}>
                    {fixTextEncoding(machine.hostname)}
                  </strong>{" "}
                  ({machine.ip_address}) • Horário: {activeReport.timestamp}
                </div>
              </div>

              <span
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  background:
                    activeReport.status === "FAILED"
                      ? "rgba(239, 68, 68, 0.2)"
                      : activeReport.status === "RUNNING"
                        ? "rgba(0, 229, 255, 0.2)"
                        : "rgba(16, 185, 129, 0.2)",
                  color:
                    activeReport.status === "FAILED"
                      ? "#EF4444"
                      : activeReport.status === "RUNNING"
                        ? "#00E5FF"
                        : "#10B981",
                  border: "1px solid currentColor",
                  whiteSpace: "nowrap",
                }}
              >
                {activeReport.status === "RUNNING"
                  ? "⏳ COLETANDO NO PC..."
                  : activeReport.status === "FAILED"
                    ? "❌ FALHA"
                    : "✅ CONCLUÍDO NO PC"}
              </span>
            </div>

            {activeReport.status === "RUNNING" ? (
              <div
                style={{
                  padding: "18px 16px",
                  borderRadius: "8px",
                  background: "rgba(0, 229, 255, 0.08)",
                  border: "1px dashed rgba(0, 229, 255, 0.4)",
                  color: "#E2E8F0",
                  fontSize: "0.86rem",
                  lineHeight: 1.5,
                }}
              >
                ⏳ {activeReport.summary}
              </div>
            ) : (
              <>
                <DiagItemsGrid>
                  {parseDiagnosticSummary(activeReport.summary).map(
                    (item, idx) => (
                      <DiagItemBox key={idx}>
                        <span className="diag-k">{item.label}</span>
                        <span className="diag-v">{item.value}</span>
                      </DiagItemBox>
                    )
                  )}
                </DiagItemsGrid>

                <div
                  style={{
                    background: "#05070C",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: "0.75rem",
                    color: "#CBD5E1",
                    lineHeight: 1.5,
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "#64748B",
                      marginBottom: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    Retorno Bruto do Agente Windows:
                  </div>
                  &gt; {activeReport.summary}
                </div>
              </>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
                marginTop: "4px",
              }}
            >
              {activeReport.taskRef && activeReport.status !== "RUNNING" && (
                <button
                  type="button"
                  onClick={() => handleRunTask(activeReport.taskRef)}
                  style={{
                    padding: "8px 14px",
                    borderRadius: "7px",
                    background: "rgba(0, 229, 255, 0.14)",
                    border: "1px solid rgba(0, 229, 255, 0.5)",
                    color: "#00E5FF",
                    fontWeight: 700,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                  }}
                >
                  ⟳ Executar Novamente
                </button>
              )}
              <button
                type="button"
                onClick={() => setActiveReport(null)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "7px",
                  background: "#10B981",
                  border: "none",
                  color: "#04060A",
                  fontWeight: 800,
                  fontSize: "0.78rem",
                  cursor: "pointer",
                }}
              >
                Fechar Relatório
              </button>
            </div>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}
    </BladeContainer>
  );
}
