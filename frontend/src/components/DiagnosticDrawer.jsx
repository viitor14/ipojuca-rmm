import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";
import { STATUS_LABELS, RISK_LABELS, fixTextEncoding, theme } from "../styles/theme";

const BladeContainer = styled.aside`
  width: ${({ $collapsed }) => ($collapsed ? "290px" : "440px")};
  max-height: 100%;
  min-height: 0;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
  padding: 16px 18px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  pointer-events: auto;
  transition: width 0.2s ease;

  & > * {
    flex-shrink: 0;
  }

  @media (max-width: 1100px) {
    width: ${({ $collapsed }) => ($collapsed ? "260px" : "380px")};
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid #e4e8e3;
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
  font-size: 0.68rem;
  font-weight: 600;
  color: #52796b;
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 8px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.68rem;
  font-weight: 700;
  color: ${({ $color }) => $color};
  background: ${({ $bgColor }) => $bgColor || 'rgba(0,0,0,0.05)'};
  border: 1px solid ${({ $color }) => $color};

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const HostHeading = styled.h2`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  color: #242925;
  line-height: 1.25;
  word-break: break-word;
`;

const SubLocation = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.78rem;
  color: #737b75;
  line-height: 1.35;
`;

const ActionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 4px;
`;

const HeaderActionBtn = styled.button`
  padding: 5px 9px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  background: ${({ $variant }) =>
    $variant === "danger"
      ? "#FEF2F2"
      : $variant === "accent"
        ? "#ECEFEB"
        : "#F8FAF8"};
  color: ${({ $variant }) =>
    $variant === "danger"
      ? "#DC2626"
      : $variant === "accent"
        ? "#52796B"
        : "#242925"};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "danger"
        ? "#FECACA"
        : $variant === "accent"
          ? "#CBD3CB"
          : "#E4E8E3"};

  &:hover {
    filter: brightness(0.96);
  }
`;

const MetricsLinearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
  flex-shrink: 0;
`;

const MetricCard = styled.div`
  background: #f8faf8;
  border: 1px solid #e4e8e3;
  border-radius: 6px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  gap: 4px;

  min-width: 0;

  .m-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    color: #737b75;
  }

  .m-val {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 1rem;
    font-weight: 700;
    color: #242925;
  }

  .m-track {
    height: 4px;
    background: #e4e8e3;
    border-radius: 2px;
    overflow: hidden;
    margin-top: 2px;
    i {
      display: block;
      height: 100%;
      border-radius: 2px;
    }
  }
`;

const OscilloscopeCard = styled.div`
  background: #f8faf8;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  padding: 10px 12px;

  .osc-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.68rem;
    font-weight: 600;
    color: #737b75;
    margin-bottom: 6px;
  }

  .osc-legend {
    display: flex;
    gap: 12px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.66rem;
    span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      color: #242925;
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
  padding: 11px 13px;
  background: #f8faf8;
  border: 1px solid #e4e8e3;
  border-radius: 8px;

  .spec-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
  }

  .spec-cell {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;

    span {
      font-family: ${({ theme }) => theme.fonts.sans};
      font-size: 0.66rem;
      font-weight: 600;
      color: #737b75;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    strong {
      font-family: ${({ theme }) => theme.fonts.sans};
      font-size: 0.78rem;
      color: #242925;
      font-weight: 600;
      line-height: 1.3;
      word-break: break-word;
    }

    strong.mono {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-size: 0.76rem;
    }
  }

  .spec-divider {
    height: 1px;
    background: #e4e8e3;
  }
`;

const DrawerTabNav = styled.div`
  display: flex;
  gap: 4px;
  background: #f4f5f2;
  padding: 3px;
  border-radius: 8px;
  border: 1px solid #e4e8e3;
  margin-top: 2px;
`;

const DrawerTabBtn = styled.button`
  flex: 1;
  padding: 7px 10px;
  border: 1px solid ${({ $active }) => ($active ? "#cbd3cb" : "transparent")};
  background: ${({ $active }) => ($active ? "#ffffff" : "transparent")};
  color: ${({ $active }) => ($active ? "#242925" : "#737b75")};
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: ${({ $active }) => ($active ? "0 1px 4px rgba(0,0,0,0.04)" : "none")};

  &:hover {
    color: #242925;
  }

  .badge-count {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.64rem;
    padding: 1px 5px;
    border-radius: 4px;
    background: ${({ $active }) => ($active ? "#ecefeb" : "#e4e8e3")};
    color: #52796b;
  }
`;

const OfflineStaticNotice = styled.div`
  background: #f8faf8;
  border: 1px dashed #cbd3cb;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.72rem;
  color: #5a625c;
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.35;

  strong {
    color: #242925;
    font-size: 0.74rem;
  }
`;

const SectionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #737b75;
  text-transform: uppercase;
  margin-top: 2px;
`;

const RefreshTelemetryBtn = styled.button`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  background: #ecefeb;
  color: #242925;
  border: 1px solid #cbd3cb;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.74rem;
  font-weight: 700;
  cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    background: #e2e6e1;
  }
`;

const KeycapMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
  flex-shrink: 0;
`;

const KeycapButton = styled.button`
  position: relative;
  padding: 8px 9px;
  border-radius: 6px;
  text-align: left;
  background: #ffffff;
  color: ${({ disabled }) => (disabled ? "#9CA3AF" : "#242925")};
  border: 1px solid #e4e8e3;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: all 0.15s ease;

  &:hover:not(:disabled) {
    border-color: #52796b;
    background: #f8faf8;
    transform: translateY(-1px);
  }

  .key-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    margin-bottom: 2px;
  }

  .key-badge {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.6rem;
    font-weight: 700;
    padding: 1px 5px;
    border-radius: 4px;
    background: ${({ $risk }) =>
      $risk === "HIGH"
        ? "#FEF2F2"
        : $risk === "MEDIUM"
          ? "#FFFBEB"
          : "#F0FDF4"};
    color: ${({ $risk }) =>
      $risk === "HIGH"
        ? "#DC2626"
        : $risk === "MEDIUM"
          ? "#D97706"
          : "#2D6A4F"};
  }

  .key-title {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.25;
    display: block;
    color: inherit;
  }
`;

const TerminalReadout = styled.div`
  flex-shrink: 0;
  background: #f8faf8;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  padding: 10px 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.74rem;
  line-height: 1.5;
  min-height: 100px;
  max-height: 240px;
  overflow-y: auto;
  color: #242925;

  .console-head {
    font-size: 0.68rem;
    font-weight: 700;
    color: #52796b;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e4e8e3;
    padding-bottom: 4px;
  }

  .line-ok {
    color: #2d6a4f;
    font-weight: 600;
  }
  .line-busy {
    color: #52796b;
    font-weight: 600;
  }
  .line-err {
    color: #dc2626;
    font-weight: 600;
  }
  .line-n8n {
    color: #d97706;
    margin-top: 6px;
    padding-top: 4px;
    border-top: 1px dashed #e4e8e3;
  }
`;

const DiagnosticModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: auto;
`;

const DiagnosticModalCard = styled.div`
  width: 100%;
  max-width: 540px;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: #242925;
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const DiagItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 6px;
`;

const DiagItemBox = styled.div`
  background: #f8faf8;
  border: 1px solid #e4e8e3;
  border-left: 3px solid #52796b;
  border-radius: 6px;
  padding: 6px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .diag-k {
    font-size: 0.64rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #737b75;
  }

  .diag-v {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.78rem;
    font-weight: 600;
    color: #242925;
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
    const height = 44;
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
        <span>Histórico de Uso</span>
        <div className="osc-legend">
          <span>
            <i style={{ background: "#2D6A4F" }} /> CPU
          </span>
          <span>
            <i style={{ background: "#52796B" }} /> RAM
          </span>
        </div>
      </div>
      <svg
        width="100%"
        height="44"
        viewBox="0 0 360 44"
        preserveAspectRatio="none"
      >
        <line
          x1="0"
          y1="11"
          x2="360"
          y2="11"
          stroke="#E4E8E3"
          strokeDasharray="3 3"
        />
        <line
          x1="0"
          y1="22"
          x2="360"
          y2="22"
          stroke="#E4E8E3"
          strokeDasharray="3 3"
        />
        <line
          x1="0"
          y1="33"
          x2="360"
          y2="33"
          stroke="#E4E8E3"
          strokeDasharray="3 3"
        />
        <path
          d={ramPath}
          fill="none"
          stroke="#52796B"
          strokeWidth="1.8"
        />
        <path d={cpuPath} fill="none" stroke="#2D6A4F" strokeWidth="2" />
      </svg>
    </OscilloscopeCard>
  );
}

export function DiagnosticDrawer({
  diagnostics,
  units = [],
  chatMessages = [],
  taskCatalog = [],
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
  const [activeTab, setActiveTab] = useState("DIAG"); // 'DIAG' | 'ACTIONS'
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

  const machine = diagnostics?.machine || null;

  if (!machine) {
    return (
      <BladeContainer $collapsed={collapsed}>
        <HeaderBlock>
          <MicroSerial>AGUARDANDO AGENTES</MicroSerial>
          <HostHeading>Nenhuma Estação Selecionada</HostHeading>
          <SubLocation>
            Instale o Agente Windows (IpojucaRMM-Setup.exe) para registrar novas estações nesta unidade.
          </SubLocation>
        </HeaderBlock>
      </BladeContainer>
    );
  }

  const {
    tasks = [],
    alerts = [],
    telemetry = [],
    telemetryHistory = [],
  } = diagnostics;
  const activeTelemetryHistory =
    telemetry.length > 0 ? telemetry : telemetryHistory;

  const latestSample = activeTelemetryHistory[0] || null;
  const displayCpu =
    Number(machine.cpu_usage_pct) > 0
      ? Number(machine.cpu_usage_pct)
      : Number(latestSample?.cpu_usage_pct || 0);
  const displayRam =
    Number(machine.ram_usage_pct) > 0
      ? Number(machine.ram_usage_pct)
      : Number(latestSample?.ram_usage_pct || 0);

  const displayDisk =
    Number(machine.disk_usage_pct) > 0
      ? Number(machine.disk_usage_pct)
      : Number(latestSample?.disk_usage_pct || 0);
  const displayTemp =
    Number(machine.temperature_c) > 0
      ? Number(machine.temperature_c)
      : Number(latestSample?.temperature_c || 45);

  const statusColor =
    theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;
  const statusBg =
    theme.colors.statusBg[machine.health_status] || 'rgba(0,0,0,0.05)';

  const uptimeHours = (Number(machine.uptime_seconds || 0) / 3600).toFixed(1);
  const baseIdle = Math.max(0, Number(machine.idle_seconds || 0));
  const isOffline = machine.health_status === "OFFLINE";
  const offlineSeconds = machine.last_seen_at
    ? Math.max(0, Math.floor((nowTimestamp - new Date(machine.last_seen_at).getTime()) / 1000))
    : 0;

  const secondsSinceSeen = machine.last_seen_at
    ? Math.max(0, Math.floor((nowTimestamp - new Date(machine.last_seen_at).getTime()) / 1000))
    : 0;

  const liveIdleSeconds = !isOffline && baseIdle > 0 ? baseIdle + Math.min(secondsSinceSeen, 3) : baseIdle;
  const isLegacyAgent = Boolean(machine.agent_version) && !machine.agent_version.startsWith("2.3");

  const activityState = (() => {
    if (isOffline) {
      return {
        badge: "DESLIGADO",
        color: "#718096",
        bg: "#F8FAFC",
        border: "#E2E8F0",
        headline: `Desligado há ${formatDurationPt(offlineSeconds)}`,
        subline: machine.last_seen_at
          ? `Último contato: ${new Date(machine.last_seen_at).toLocaleString("pt-BR")}`
          : "Sem registro recente",
      };
    }
    if (isLegacyAgent) {
      return {
        badge: `AGENTE ${machine.agent_version || "2.2.0"}`,
        color: "#D97706",
        bg: "#FFFBEB",
        border: "#FDE68A",
        headline: `Estação Ativa • Requer v2.3.0`,
        subline: `Envie a atualização do agente abaixo para ativar o tempo de ociosidade contínuo.`,
      };
    }
    if (liveIdleSeconds < 180) {
      return {
        badge: "EM USO",
        color: "#2D6A4F",
        bg: "#F0FDF4",
        border: "#BBF7D0",
        headline: `Em uso ativo agora`,
        subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} (${uptimeHours}h)`,
      };
    }
    if (liveIdleSeconds < 1800) {
      return {
        badge: "AUSENTE",
        color: "#D97706",
        bg: "#FFFBEB",
        border: "#FDE68A",
        headline: `Ocioso há ${formatDurationPt(liveIdleSeconds)}`,
        subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} (${uptimeHours}h)`,
      };
    }
    return {
      badge: "OCIOSO",
      color: "#D97706",
      bg: "#FFFBEB",
      border: "#FDE68A",
      headline: `Parado há ${formatDurationPt(liveIdleSeconds)}`,
      subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} sem interação`,
    };
  })();

  async function handleManualRefresh() {
    setRefreshingNow(true);
    setFeedback(null);
    try {
      const res = await onRefreshTelemetryNow(machine.id);
      setFeedback({
        type: "ok",
        text: res.message || "Telemetria atualizada em tempo real.",
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
        text: res.message || "Atualização enviada para a estação.",
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
        text: `Aviso enviado para a tela de ${machine.hostname}.`,
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
        text: "Localização da estação atualizada.",
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
      text: `Executando "${cleanTitle}" em ${machine.hostname}...`,
    });
    setActiveReport({
      taskId: null,
      taskCode: task.code,
      title: cleanTitle,
      status: "RUNNING",
      summary: `Executando "${cleanTitle}" no Agente Windows (${machine.ip_address})...`,
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
          res.message || "Atualização OTA despachada para o computador.";
        setFeedback({
          type: "ok",
          text: `✅ ${cleanTitle}: ${summaryMsg}`,
        });
        setActiveReport({
          taskId: `ota_${Date.now()}`,
          taskCode: task.code,
          title: cleanTitle,
          status: "COMPLETED",
          summary: summaryMsg,
          timestamp: new Date().toLocaleTimeString("pt-BR"),
          taskRef: task,
        });
        return;
      }

      const res = await onDispatchTask({
        machineId: machine.id,
        taskCode: task.code,
        params: {},
      });
      setFeedback({
        type: "ok",
        text: `Ordem enviada para ${machine.hostname}. Aguardando retorno.`,
      });
      if (res?.task) {
        setActiveReport({
          taskId: res.task.task_id,
          taskCode: res.task.task_code,
          title: cleanTitle,
          status: res.task.status || "RUNNING",
          summary:
            fixTextEncoding(res.task.output_summary) ||
            "Executando no computador cliente...",
          timestamp: new Date(res.task.issued_at || Date.now()).toLocaleTimeString("pt-BR"),
          taskRef: task,
        });
      }
    } catch (err) {
      setFeedback({ type: "err", text: `Falha: ${err.message}` });
      setActiveReport({
        taskId: null,
        taskCode: task.code,
        title: cleanTitle,
        status: "FAILED",
        summary: `Erro ao despachar comando: ${err.message}`,
        timestamp: new Date().toLocaleTimeString("pt-BR"),
        taskRef: task,
      });
    } finally {
      setBusyTask(null);
    }
  }

  return (
    <>
      <BladeContainer $collapsed={collapsed}>
        <HeaderBlock>
          <HeaderTopRow>
            <MicroSerial>
              ESTAÇÃO #{machine.id} • {machine.ip_address} • v{machine.agent_version || "2.3.0"}
            </MicroSerial>
            <StatusBadge $color={statusColor} $bgColor={statusBg}>
              <span className="dot" />
              {STATUS_LABELS[machine.health_status] || machine.health_status}
            </StatusBadge>
          </HeaderTopRow>

          <div>
            <HostHeading>{fixTextEncoding(machine.hostname)}</HostHeading>
            <SubLocation>
              {fixTextEncoding(machine.unit_name)} • {fixTextEncoding(machine.sector_name)}
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
                  background: "#F8FAF8",
                  color: "#242925",
                  border: "1px solid #E4E8E3",
                  fontFamily: "inherit",
                  fontSize: "0.74rem",
                  cursor: "pointer",
                }}
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
              Focar Maquete
            </HeaderActionBtn>
            <HeaderActionBtn onClick={() => setCollapsed((prev) => !prev)}>
              {collapsed ? "Expandir" : "Recolher"}
            </HeaderActionBtn>
            {onDeleteMachine && currentUser?.role !== "VIEWER" && (
              <HeaderActionBtn
                $variant="danger"
                onClick={() => onDeleteMachine(machine.id)}
              >
                Remover PC
              </HeaderActionBtn>
            )}
          </ActionToolbar>
        </HeaderBlock>

          {/* Métricas Lineares Limpas e Modernas */}
          <MetricsLinearGrid>
            <MetricCard>
              <div className="m-head">
                <span>CPU</span>
                <span className="m-val">{displayCpu.toFixed(0)}%</span>
              </div>
              <div className="m-track">
                <i style={{ width: `${Math.min(100, displayCpu)}%`, background: '#2D6A4F' }} />
              </div>
            </MetricCard>

            <MetricCard>
              <div className="m-head">
                <span>RAM</span>
                <span className="m-val">{displayRam.toFixed(0)}%</span>
              </div>
              <div className="m-track">
                <i style={{ width: `${Math.min(100, displayRam)}%`, background: '#52796B' }} />
              </div>
            </MetricCard>

            <MetricCard>
              <div className="m-head">
                <span>DISCO</span>
                <span className="m-val">{displayDisk.toFixed(0)}%</span>
              </div>
              <div className="m-track">
                <i style={{ width: `${Math.min(100, displayDisk)}%`, background: '#718096' }} />
              </div>
            </MetricCard>

            <MetricCard>
              <div className="m-head">
                <span>TEMP</span>
                <span className="m-val">{displayTemp.toFixed(0)}°C</span>
              </div>
              <div className="m-track">
                <i style={{ width: `${Math.min(100, (displayTemp / 90) * 100)}%`, background: '#D97706' }} />
              </div>
            </MetricCard>
          </MetricsLinearGrid>

        {/* Abas Superiores Compactas para Eliminar Rolagem Excessiva */}
        {!collapsed && (
          <DrawerTabNav>
            <DrawerTabBtn
              type="button"
              $active={activeTab === "DIAG"}
              onClick={() => setActiveTab("DIAG")}
            >
              <span>📊 Diagnóstico &amp; Hardware</span>
            </DrawerTabBtn>
            <DrawerTabBtn
              type="button"
              $active={activeTab === "ACTIONS"}
              onClick={() => setActiveTab("ACTIONS")}
            >
              <span>⚡ Ações &amp; Suporte</span>
              <span className="badge-count">{taskCatalog.length}</span>
            </DrawerTabBtn>
          </DrawerTabNav>
        )}

        {/* CONTEÚDO DA ABA 1: DIAGNÓSTICO & HARDWARE (Também exibido quando recolhido) */}
        {(collapsed || activeTab === "DIAG") && (
          <>
            {/* Aviso Explícito de Equipamento Desconectado (Consistência de Estados) */}
            {isOffline && (
              <OfflineStaticNotice>
                <strong>EQUIPAMENTO DESCONECTADO</strong>
                <span>
                  Exibindo última leitura de telemetria registrada em{" "}
                  {machine.last_seen_at
                    ? new Date(machine.last_seen_at).toLocaleTimeString("pt-BR")
                    : "horário anterior"}
                  . Novas métricas pausadas até a reconexão do agente.
                </span>
              </OfflineStaticNotice>
            )}

            {/* Cartão de Atividade e Ociosidade */}
            <div
              style={{
                flexShrink: 0,
                background: activityState.bg,
                border: `1px solid ${activityState.border}`,
                borderRadius: "6px",
                padding: "8px 12px",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: "0.66rem",
                  fontWeight: 700,
                  color: activityState.color,
                }}
              >
                <span>ESTADO DE ATIVIDADE</span>
                <span>{activityState.badge}</span>
              </div>
              <div
                style={{
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  color: "#242925",
                }}
              >
                {activityState.headline}
              </div>
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "#737B75",
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
                      <span>IPv4 / MAC</span>
                      <strong className="mono">
                        {machine.ip_address}
                      </strong>
                    </div>
                    <div className="spec-cell">
                      <span>Spooler Impressão</span>
                      <strong
                        style={{
                          color: machine.spooler_running ? "#2D6A4F" : "#DC2626",
                        }}
                      >
                        {machine.spooler_running ? "Ativo" : "Parado"}
                      </strong>
                    </div>
                  </div>

                  <div className="spec-divider" />

                  <div className="spec-cell">
                    <span>Hardware</span>
                    <strong>
                      {fixTextEncoding(machine.manufacturer)} {fixTextEncoding(machine.model)}
                    </strong>
                  </div>

                  <div className="spec-divider" />

                  <div className="spec-cell">
                    <span>Processador</span>
                    <strong>
                      {fixTextEncoding(machine.cpu_model || machine.processor || "Não informado")}
                    </strong>
                  </div>

                  <div className="spec-divider" />

                  <div className="spec-grid-2">
                    <div className="spec-cell">
                      <span>Memória / Disco</span>
                      <strong className="mono">
                        {(Number(machine.ram_total_mb || 8192) / 1024).toFixed(0)} GB • {machine.disk_total_gb} GB SSD
                      </strong>
                    </div>
                    <div className="spec-cell">
                      <span>Sistema</span>
                      <strong>{fixTextEncoding(machine.os_version || "Windows")}</strong>
                    </div>
                  </div>
                </SpecPlate>

                <RefreshTelemetryBtn
                  onClick={handleManualRefresh}
                  disabled={refreshingNow}
                >
                  {refreshingNow
                    ? "Atualizando dados..."
                    : "Atualizar Telemetria Agora"}
                </RefreshTelemetryBtn>
              </>
            )}
          </>
        )}

        {/* CONTEÚDO DA ABA 2: AÇÕES REMOTAS & SUPORTE */}
        {!collapsed && activeTab === "ACTIONS" && (
          <>
            {onSendMessage && (
              <div
                style={{
                  flexShrink: 0,
                  background: "#F8FAF8",
                  border: "1px solid #E4E8E3",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <SectionBar style={{ marginTop: 0 }}>
                  <span>Aviso na Tela do Computador</span>
                </SectionBar>

                <div
                  style={{
                    minHeight: "50px",
                    maxHeight: "110px",
                    overflowY: "auto",
                    fontSize: "0.74rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    padding: "6px 8px",
                    background: "#FFFFFF",
                    border: "1px solid #E4E8E3",
                    borderRadius: "6px",
                  }}
                >
                  {chatMessages.length === 0 ? (
                    <span style={{ color: "#737B75" }}>
                      Envie uma mensagem direta para o operador deste PC.
                    </span>
                  ) : (
                    chatMessages.slice(-6).map((m) => (
                      <div key={m.id}>
                        <strong style={{ color: "#52796B" }}>
                          [{m.sender}]:
                        </strong>{" "}
                        <span>{fixTextEncoding(m.message)}</span>
                      </div>
                    ))
                  )}
                </div>

                <form
                  onSubmit={handleSendChatMessage}
                  style={{ display: "flex", gap: "6px" }}
                >
                  <input
                    type="text"
                    placeholder="Digitar aviso..."
                    value={chatText}
                    onChange={(e) => setChatText(e.target.value)}
                    style={{
                      flex: 1,
                      padding: "6px 10px",
                      borderRadius: "6px",
                      background: "#FFFFFF",
                      border: "1px solid #E4E8E3",
                      fontSize: "0.76rem",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    disabled={sendingChat || !chatText.trim()}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "6px",
                      background: "#52796B",
                      color: "#FFFFFF",
                      border: "none",
                      fontWeight: 600,
                      fontSize: "0.74rem",
                      cursor: "pointer",
                    }}
                  >
                    Enviar
                  </button>
                </form>
              </div>
            )}

            <SectionBar>
              <span>Ações Remotas Autorizadas</span>
            </SectionBar>

            <TerminalReadout>
              <div className="console-head">
                <span>Retorno das Tarefas</span>
                <span>{busyTask ? "Executando..." : "Pronto"}</span>
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
                >
                  &gt; {feedback.text}
                </div>
              ) : (
                <div style={{ color: "#737B75" }}>
                  &gt; Selecione uma tarefa abaixo para despachar ao agente.
                </div>
              )}

              {(activeReport?.summary || tasks[0]?.output_summary) && (
                <div style={{ marginTop: "6px" }}>
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
                  >
                    <div className="key-head">
                      <span className="key-badge">
                        Risco {RISK_LABELS[task.riskLevel] || task.riskLevel}
                      </span>
                    </div>
                    <span className="key-title">
                      {isBusy ? "Executando..." : fixTextEncoding(task.title)}
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
          <DiagnosticModalCard onClick={(e) => e.stopPropagation()}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "1px solid #E4E8E3",
                paddingBottom: "10px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 700 }}>
                  {activeReport.title}
                </h3>
                <div style={{ fontSize: "0.75rem", color: "#737B75" }}>
                  Estação: {machine.hostname} ({machine.ip_address}) • {activeReport.timestamp}
                </div>
              </div>
              <span
                style={{
                  padding: "4px 8px",
                  borderRadius: "6px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  background:
                    activeReport.status === "FAILED"
                      ? "#FEF2F2"
                      : activeReport.status === "RUNNING"
                        ? "#F0FDF4"
                        : "#F0FDF4",
                  color:
                    activeReport.status === "FAILED"
                      ? "#DC2626"
                      : "#2D6A4F",
                }}
              >
                {activeReport.status === "RUNNING"
                  ? "Em execução..."
                  : activeReport.status === "FAILED"
                    ? "Falha"
                    : "Concluído"}
              </span>
            </div>

            <DiagItemsGrid>
              {parseDiagnosticSummary(activeReport.summary).map((item, idx) => (
                <DiagItemBox key={idx}>
                  <span className="diag-k">{item.label}</span>
                  <span className="diag-v">{item.value}</span>
                </DiagItemBox>
              ))}
            </DiagItemsGrid>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "4px",
              }}
            >
              <button
                type="button"
                onClick={() => setActiveReport(null)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  background: "#52796B",
                  color: "#FFFFFF",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.76rem",
                  cursor: "pointer",
                }}
              >
                Fechar
              </button>
            </div>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}
    </>
  );
}
