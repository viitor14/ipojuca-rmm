import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { STATUS_LABELS, RISK_LABELS, fixTextEncoding, theme } from "../styles/theme";

const BladeContainer = styled.aside`
  width: ${({ $collapsed }) => ($collapsed ? "300px" : "468px")};
  max-height: calc(100vh - 172px);
  background: rgba(13, 16, 24, 0.94);
  backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-top: 3px solid ${({ $statusColor }) => $statusColor};
  border-radius: 10px;
  padding: 16px 18px 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.82);
  pointer-events: auto;
  transition: width 0.2s ease;

  /* Impede que o Flexbox esmague o console de retorno ou o chat dentro da gaveta */
  & > * {
    flex-shrink: 0;
  }

  @media (max-width: 1100px) {
    width: ${({ $collapsed }) => ($collapsed ? "260px" : "390px")};
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
  gap: 7px;
  flex-shrink: 0;
`;

const KeycapButton = styled.button`
  position: relative;
  padding: 8px 10px;
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
    margin-bottom: 3px;
  }

  .key-badge {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.62rem;
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
    font-size: 0.76rem;
    font-weight: 700;
    line-height: 1.25;
    display: block;
    color: inherit;
  }
`;

const TerminalReadout = styled.div`
  flex-shrink: 0;
  background: #060a14;
  border: 1.5px solid
    ${({ $highlight }) =>
      $highlight ? "rgba(0, 229, 255, 0.75)" : "rgba(0, 229, 255, 0.28)"};
  box-shadow: ${({ $highlight }) =>
    $highlight ? "0 0 20px rgba(0, 229, 255, 0.22)" : "none"};
  border-radius: 10px;
  padding: 12px 14px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.78rem;
  line-height: 1.55;
  min-height: 120px;
  max-height: 290px;
  overflow-y: auto;
  color: #e2e8f0;

  .console-head {
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #00e5ff;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 6px;
  }

  .line-ok {
    color: #10b981;
    font-weight: 700;
  }
  .line-busy {
    color: #00e5ff;
    font-weight: 700;
  }
  .line-err {
    color: #ef4444;
    font-weight: 700;
  }
  .line-n8n {
    color: #d4ff33;
    margin-top: 8px;
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

function formatDurationPt(totalSeconds, includeSeconds = true) {
  const sec = Math.max(0, Math.floor(Number(totalSeconds || 0)));
  if (sec < 60) return `${sec}s`;
  const mins = Math.floor(sec / 60);
  const remSec = sec % 60;
  if (mins < 60) {
    return includeSeconds && remSec > 0 ? `${mins}m ${remSec}s` : `${mins} min`;
  }
  const hours = Math.floor(mins / 60);
  const remMins = mins % 60;
  if (hours < 24) {
    return remMins > 0 ? `${hours}h ${remMins}m` : `${hours}h`;
  }
  const days = Math.floor(hours / 24);
  const remHours = hours % 24;
  return remHours > 0 ? `${days}d ${remHours}h` : `${days} dia(s)`;
}

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
  const [nowTimestamp, setNowTimestamp] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNowTimestamp(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

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
  const baseIdle = Math.max(0, Number(machine.idle_seconds || 0));
  const isOffline = machine.health_status === "OFFLINE";
  const offlineSeconds = useMemo(() => {
    if (!machine.last_seen_at) return 0;
    const diffMs = nowTimestamp - new Date(machine.last_seen_at).getTime();
    return Math.max(0, Math.floor(diffMs / 1000));
  }, [machine.last_seen_at, machine.health_status, nowTimestamp]);

  const secondsSinceSeen = useMemo(() => {
    if (!machine.last_seen_at) return 0;
    const diffMs = nowTimestamp - new Date(machine.last_seen_at).getTime();
    return Math.max(0, Math.floor(diffMs / 1000));
  }, [machine.last_seen_at, nowTimestamp]);

  const liveIdleSeconds = !isOffline && baseIdle > 0 ? baseIdle + Math.min(secondsSinceSeen, 3) : baseIdle;
  const isLegacyAgent = Boolean(machine.agent_version) && !machine.agent_version.startsWith("2.3");

  const activityState = useMemo(() => {
    if (isOffline) {
      return {
        badge: "🔌 DESLIGADO / OFFLINE",
        color: "#EF4444",
        bg: "rgba(239, 68, 68, 0.12)",
        border: "rgba(239, 68, 68, 0.45)",
        headline: `Desligado há ${formatDurationPt(offlineSeconds)}`,
        subline: machine.last_seen_at
          ? `Último contato: ${new Date(machine.last_seen_at).toLocaleString("pt-BR")}`
          : "Sem registro recente",
        needsUpdate: false,
      };
    }
    if (isLegacyAgent) {
      return {
        badge: "⚠️ AGENTE LEGADO (" + (machine.agent_version || "2.2.0") + ")",
        color: "#F59E0B",
        bg: "rgba(245, 158, 11, 0.14)",
        border: "rgba(245, 158, 11, 0.55)",
        headline: `Estação Ativa • Requer Atualização 2.3.0`,
        subline: `Clique no botão "Enviar Atualização do Agente" abaixo para ativar telemetria de ociosidade em tempo real.`,
        needsUpdate: true,
      };
    }
    if (liveIdleSeconds < 180) {
      return {
        badge: "🟢 EM USO ATIVO",
        color: "#10B981",
        bg: "rgba(16, 185, 129, 0.12)",
        border: "rgba(16, 185, 129, 0.45)",
        headline: `Em uso agora (Ocioso há ${formatDurationPt(liveIdleSeconds)})`,
        subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} (${uptimeHours}h)`,
        needsUpdate: false,
      };
    }
    if (liveIdleSeconds < 1800) {
      return {
        badge: "🟡 OCIOSO / AUSENTE",
        color: "#F59E0B",
        bg: "rgba(245, 158, 11, 0.12)",
        border: "rgba(245, 158, 11, 0.45)",
        headline: `Ocioso há ${formatDurationPt(liveIdleSeconds)} sem uso`,
        subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} (${uptimeHours}h)`,
        needsUpdate: false,
      };
    }
    return {
      badge: "🟠 OCIOSIDADE PROLONGADA",
      color: "#F97316",
      bg: "rgba(249, 115, 22, 0.14)",
      border: "rgba(249, 115, 22, 0.5)",
      headline: `Parado / Ocioso há ${formatDurationPt(liveIdleSeconds)}`,
      subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} sem atividade de usuário`,
      needsUpdate: false,
    };
  }, [isOffline, isLegacyAgent, offlineSeconds, liveIdleSeconds, machine.last_seen_at, machine.uptime_seconds, uptimeHours, machine.agent_version]);

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
    <>
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

      <div
        style={{
          flexShrink: 0,
          background: activityState.bg,
          border: `1.5px solid ${activityState.border}`,
          borderRadius: "10px",
          padding: "11px 14px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.7rem",
            fontWeight: 800,
            letterSpacing: "0.05em",
            color: activityState.color,
          }}
        >
          <span>⏱️ ESTADO DE ATIVIDADE &amp; OCIOSIDADE</span>
          <span>{activityState.badge}</span>
        </div>
        <div
          style={{
            fontSize: "0.95rem",
            fontWeight: 800,
            color: "#F8FAFC",
            marginTop: "2px",
          }}
        >
          {activityState.headline}
        </div>
        <div
          style={{
            fontSize: "0.76rem",
            color: "#CBD5E1",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          {activityState.subline}
        </div>
      </div>

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

            <div className="spec-divider" />

            <div className="spec-grid-2">
              <div className="spec-cell">
                <span>⏱️ Tempo de Ociosidade (Sem Uso)</span>
                <strong
                  style={{
                    color: isOffline
                      ? "#94A3B8"
                      : liveIdleSeconds >= 180
                        ? "#F59E0B"
                        : "#10B981",
                  }}
                >
                  {isOffline
                    ? "Computador Desligado"
                    : isLegacyAgent
                      ? "Requer Agente v2.3"
                      : liveIdleSeconds === 0
                        ? "0s (Em uso contínuo)"
                        : `${formatDurationPt(liveIdleSeconds)} sem uso`}
                </strong>
              </div>
              <div className="spec-cell">
                <span>🔌 Estado Ligado / Desligado</span>
                <strong style={{ color: isOffline ? "#EF4444" : "#00E5FF" }}>
                  {isOffline
                    ? `Desligado há ${formatDurationPt(offlineSeconds)}`
                    : `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)}`}
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

          {onSendMessage && (
            <div
              style={{
                flexShrink: 0,
                background: "rgba(9, 14, 24, 0.95)",
                border: "1.5px solid rgba(0, 229, 255, 0.45)",
                borderRadius: "10px",
                padding: "12px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
              }}
            >
              <SectionBar style={{ marginTop: 0, color: "#00E5FF", fontSize: "0.75rem" }}>
                <span>💬 Chat / Aviso na Tela do PC</span>
                <span>Super Agente • Tempo Real</span>
              </SectionBar>

              <div
                style={{
                  minHeight: "64px",
                  maxHeight: "135px",
                  overflowY: "auto",
                  fontSize: "0.8rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  padding: "8px 10px",
                  background: "rgba(4, 7, 13, 0.85)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "7px",
                }}
              >
                {chatMessages.length === 0 ? (
                  <span style={{ color: "#94A3B8", fontSize: "0.76rem" }}>
                    Digite abaixo para abrir um aviso ou conversar ao vivo na tela de{" "}
                    <strong style={{ color: "#E2E8F0" }}>{machine.hostname}</strong>.
                  </span>
                ) : (
                  chatMessages.slice(-8).map((m) => (
                    <div key={m.id} style={{ lineHeight: 1.4 }}>
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
                      <span style={{ color: "#F8FAFC" }}>
                        {fixTextEncoding(m.message)}
                      </span>
                    </div>
                  ))
                )}
              </div>

              <form
                onSubmit={handleSendChatMessage}
                style={{ display: "flex", gap: "8px" }}
              >
                <input
                  type="text"
                  placeholder="Digite um aviso para exibir na tela do usuário..."
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    borderRadius: "7px",
                    background: "rgba(15, 23, 42, 0.95)",
                    border: "1px solid rgba(0, 229, 255, 0.35)",
                    color: "#F8FAFC",
                    fontFamily: "inherit",
                    fontSize: "0.82rem",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  disabled={sendingChat || !chatText.trim()}
                  style={{
                    padding: "9px 14px",
                    borderRadius: "7px",
                    background: "#00E5FF",
                    color: "#050609",
                    border: "none",
                    fontWeight: 800,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  {sendingChat ? "Enviando..." : "Enviar Aviso"}
                </button>
              </form>
            </div>
          )}

          <SectionBar>
            <span>Ações de Manutenção Remota</span>
            <span>Perfil: {currentUser.role}</span>
          </SectionBar>

          <TerminalReadout $highlight={Boolean(feedback || busyTask)}>
            <div className="console-head">
              <span>⚡ Painel de Diagnóstico &amp; Retorno Remoto</span>
              <span>{busyTask ? "⏳ EXECUTANDO NO PC..." : "PRONTO"}</span>
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
                style={{
                  marginBottom: "10px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  background: "rgba(15, 23, 42, 0.85)",
                  border: "1px solid rgba(0, 229, 255, 0.25)",
                  fontSize: "0.8rem",
                }}
              >
                &gt; {feedback.text}
              </div>
            ) : (
              tasks.length === 0 && (
                <div style={{ color: "#94A3B8", padding: "6px 0" }}>
                  &gt; Clique em qualquer ação abaixo (ex.: Diagnóstico de Rede Local ou Saúde de Disco) para ver o diagnóstico detalhado do PC aqui.
                </div>
              )
            )}

            {(activeReport?.summary || tasks[0]?.output_summary) && (
              <div style={{ marginBottom: "10px" }}>
                <DiagItemsGrid>
                  {parseDiagnosticSummary(
                    activeReport?.summary || tasks[0]?.output_summary
                  ).map((item, idx) => (
                    <DiagItemBox key={idx}>
                      <span className="diag-k">{item.label}</span>
                      <span className="diag-v">{item.value}</span>
                    </DiagItemBox>
                  ))}
                </DiagItemsGrid>
              </div>
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
                  padding: "5px 6px",
                  borderRadius: "5px",
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                  fontSize: "0.75rem",
                }}
                title="Clique para abrir a janela de relatório detalhado desta ação"
              >
                [{new Date(t.issued_at).toLocaleTimeString("pt-BR")}]{" "}
                <strong style={{ color: "#E2E8F0" }}>{t.task_code}</strong> ::{" "}
                <span className="line-ok">{t.status}</span> —{" "}
                {fixTextEncoding(t.output_summary)}{" "}
                <span style={{ color: "#00E5FF", fontWeight: 700 }}>
                  [Expandir Relatório]
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
        </>
      )}
      </BladeContainer>

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
    </>
  );
}
