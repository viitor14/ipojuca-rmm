import React, { useState, useMemo } from "react";
import styled from "styled-components";
import { STATUS_LABELS, theme } from "../styles/theme";

const BladeContainer = styled.aside`
  width: ${({ $collapsed }) => ($collapsed ? "275px" : "430px")};
  max-height: calc(100vh - 118px);
  background: ${({ theme }) => theme.colors.bgSurface};
  backdrop-filter: blur(24px);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-top: 2px solid ${({ $statusColor }) => $statusColor};
  clip-path: polygon(
    0 0,
    calc(100% - 18px) 0,
    100% 18px,
    100% 100%,
    14px 100%,
    0 calc(100% - 14px)
  );
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.78);
  pointer-events: auto;
  transition: width 0.2s ease;

  @media (max-width: 1100px) {
    width: ${({ $collapsed }) => ($collapsed ? "240px" : "350px")};
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding-bottom: 10px;
`;

const MicroSerial = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.63rem;
  letter-spacing: 0.13em;
  color: ${({ theme }) => theme.colors.brandPrimary};
  text-transform: uppercase;
`;

const HostHeading = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SubLocation = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 3px;
`;

const UplinkRibbon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 9px;
  background: rgba(0, 229, 255, 0.07);
  border: 1px solid rgba(0, 229, 255, 0.28);
  border-left: 2px solid #00e5ff;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.08em;
  color: #b9f6ff;
`;

const StatusStamp = styled.div`
  padding: 4px 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #050507;
  background: ${({ $color }) => $color};
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
`;

const RadialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 7px;
`;

const DialCard = styled.div`
  background: rgba(5, 5, 7, 0.68);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: 7px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;

  .dial-label {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.59rem;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const OscilloscopeCard = styled.div`
  background: rgba(4, 6, 10, 0.85);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: 8px 10px;

  .osc-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.58rem;
    letter-spacing: 0.1em;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 5px;
  }

  .osc-legend {
    display: flex;
    gap: 10px;
    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    i {
      width: 7px;
      height: 2px;
      display: inline-block;
    }
  }
`;

const SpecPlate = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 12px;
  padding: 9px 11px;
  background: rgba(5, 5, 7, 0.72);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-left: 2px solid ${({ theme }) => theme.colors.brandPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;

  .spec-cell {
    display: flex;
    flex-direction: column;
    span {
      font-size: 0.57rem;
      color: ${({ theme }) => theme.colors.textSecondary};
      text-transform: uppercase;
      letter-spacing: 0.08em;
    }
    strong {
      color: ${({ theme }) => theme.colors.textPrimary};
      font-weight: 600;
      margin-top: 1px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

const SectionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.63rem;
  letter-spacing: 0.11em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const KeycapMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
`;

const KeycapButton = styled.button`
  position: relative;
  padding: 8px 10px;
  text-align: left;
  background: ${({ disabled }) =>
    disabled ? "rgba(10, 11, 15, 0.45)" : "rgba(19, 21, 28, 0.95)"};
  color: ${({ disabled, theme }) =>
    disabled ? "#434857" : theme.colors.textPrimary};
  border: 1px solid
    ${({ disabled, $risk }) =>
      disabled
        ? "rgba(255,255,255,0.05)"
        : $risk === "HIGH"
          ? "rgba(255, 184, 0, 0.45)"
          : "rgba(244, 244, 240, 0.16)"};
  border-bottom-width: ${({ disabled }) => (disabled ? "1px" : "3px")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition:
    transform 0.1s ease,
    border-color 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.brandPrimary};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  .key-code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.56rem;
    letter-spacing: 0.08em;
    color: ${({ $risk }) => ($risk === "HIGH" ? "#FFB800" : "#D4FF33")};
    display: flex;
    justify-content: space-between;
  }

  .key-title {
    font-size: 0.74rem;
    font-weight: 700;
    margin-top: 2px;
    display: block;
  }
`;

const TerminalReadout = styled.div`
  background: #040507;
  border: 1px solid rgba(244, 244, 240, 0.12);
  padding: 9px 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.65rem;
  line-height: 1.45;
  max-height: 125px;
  overflow-y: auto;
  color: #b4bccf;

  .line-ok {
    color: #00f5a0;
  }
  .line-err {
    color: #ff2a54;
  }
  .line-n8n {
    color: #d4ff33;
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px dashed rgba(212, 255, 51, 0.25);
  }
`;

function RadialGauge({ value = 0, unit = "%", label }) {
  const clamped = Math.min(100, Math.max(0, Number(value || 0)));
  const radius = 21;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (clamped / 100) * circumference;

  const strokeColor =
    clamped >= 95
      ? theme.colors.status.CRITICAL
      : clamped >= 80
        ? theme.colors.status.WARNING
        : theme.colors.status.NORMAL;

  return (
    <DialCard>
      <svg width="54" height="54" viewBox="0 0 54 54">
        <circle
          cx="27"
          cy="27"
          r={radius}
          fill="none"
          stroke="rgba(244,244,240,0.08)"
          strokeWidth="4.2"
        />
        <circle
          cx="27"
          cy="27"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="4.2"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          transform="rotate(-90 27 27)"
        />
        <text
          x="50%"
          y="53%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#F4F4F0"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="9.5"
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
    const baseCpu = Number(machine?.cpu_usage_pct || 24);
    const baseRam = Number(machine?.ram_usage_pct || 48);

    const samples =
      telemetryHistory && telemetryHistory.length >= 4
        ? telemetryHistory.slice(0, 12).reverse()
        : Array.from({ length: 12 }).map((_, i) => ({
            cpu_usage_pct: Math.max(
              4,
              Math.min(
                100,
                baseCpu + Math.sin(i * 0.9 + (machine?.id || 1)) * 7,
              ),
            ),
            ram_usage_pct: Math.max(
              10,
              Math.min(
                100,
                baseRam + Math.cos(i * 0.7 + (machine?.id || 1)) * 4,
              ),
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
        <span>OSCILOSCÓPIO DE PULSO // SÉRIE TEMPORAL</span>
        <div className="osc-legend">
          <span>
            <i style={{ background: "#00F5A0" }} /> CPU
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
          stroke="rgba(244,244,240,0.06)"
          strokeDasharray="3 3"
        />
        <line
          x1="0"
          y1="24"
          x2="360"
          y2="24"
          stroke="rgba(244,244,240,0.06)"
          strokeDasharray="3 3"
        />
        <line
          x1="0"
          y1="36"
          x2="360"
          y2="36"
          stroke="rgba(244,244,240,0.06)"
          strokeDasharray="3 3"
        />
        <path
          d={ramPath}
          fill="none"
          stroke="#00E5FF"
          strokeWidth="1.5"
          opacity="0.8"
        />
        <path d={cpuPath} fill="none" stroke="#00F5A0" strokeWidth="1.8" />
      </svg>
    </OscilloscopeCard>
  );
}

export function DiagnosticDrawer({
  diagnostics,
  taskCatalog,
  currentUser,
  onDispatchTask,
  onRefreshTelemetryNow,
  onDeleteMachine,
  onFocusCamera,
}) {
  const [busyTask, setBusyTask] = useState(null);
  const [refreshingNow, setRefreshingNow] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [collapsed, setCollapsed] = useState(false);

  if (!diagnostics || !diagnostics.machine) {
    return (
      <BladeContainer $statusColor="#D4FF33" $collapsed={collapsed}>
        <HeaderBlock>
          <div>
            <MicroSerial>AGUARDANDO AGENTES REAIS</MicroSerial>
            <HostHeading>Nenhuma Estação Nesta Unidade</HostHeading>
            <SubLocation>
              Inicie o Agente Windows na máquina física para auto-registro
              imediato na malha 3D.
            </SubLocation>
          </div>
        </HeaderBlock>
      </BladeContainer>
    );
  }

  const { machine, tasks = [], alerts = [], telemetry = [], telemetryHistory = [] } = diagnostics;
  const activeTelemetryHistory = telemetry.length > 0 ? telemetry : telemetryHistory;
  const statusColor =
    theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;

  async function handleManualRefresh() {
    setRefreshingNow(true);
    setFeedback(null);
    try {
      const res = await onRefreshTelemetryNow(machine.id);
      setFeedback({
        type: "ok",
        text: `SYNC MANUAL // ${res.message || "Telemetria solicitada ao agente em tempo real."}`,
      });
    } catch (err) {
      setFeedback({ type: "err", text: `FALHA SYNC // ${err.message}` });
    } finally {
      setRefreshingNow(false);
    }
  }

  async function handleRunTask(task) {
    setBusyTask(task.code);
    setFeedback(null);
    try {
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
        reason: `Comando tático por ${currentUser.name}`,
      });
      setFeedback({
        type: "ok",
        text: `EXEC // ${res.task.task_code} -> ${res.task.output_summary || "Ordem entregue ao Agente Windows."}`,
      });
    } catch (err) {
      setFeedback({ type: "err", text: `BLOCKED // ${err.message}` });
    } finally {
      setBusyTask(null);
    }
  }

  return (
    <BladeContainer $statusColor={statusColor} $collapsed={collapsed}>
      <HeaderBlock>
        <div>
          <MicroSerial>
            SYS.NODE.{machine.id} //{" "}
            {String(machine.agent_uuid || "").slice(0, 13)}
          </MicroSerial>
          <HostHeading>{machine.hostname}</HostHeading>
          <SubLocation>
            {machine.unit_name} — {machine.sector_name}
          </SubLocation>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: "5px",
          }}
        >
          <StatusStamp $color={statusColor}>
            {STATUS_LABELS[machine.health_status]}
          </StatusStamp>
          <div style={{ display: "flex", gap: "4px" }}>
            <button
              onClick={onFocusCamera}
              style={{
                background: "transparent",
                border: "1px solid rgba(212,255,51,0.45)",
                color: "#D4FF33",
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "8.5px",
                padding: "2px 6px",
                cursor: "pointer",
              }}
            >
              [MIRAR 3D]
            </button>
            {onDeleteMachine && currentUser?.role !== "VIEWER" && (
              <button
                onClick={() => onDeleteMachine(machine.id)}
                style={{
                  background: "rgba(255,42,84,0.12)",
                  border: "1px solid rgba(255,42,84,0.45)",
                  color: "#FF2A54",
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "8.5px",
                  padding: "2px 6px",
                  cursor: "pointer",
                }}
                title="Remover estação cadastrada do painel"
              >
                [REMOVER]
              </button>
            )}
            <button
              onClick={() => setCollapsed((prev) => !prev)}
              style={{
                background: "rgba(244,244,240,0.06)",
                border: "1px solid rgba(244,244,240,0.2)",
                color: "#F4F4F0",
                fontFamily: "IBM Plex Mono, monospace",
                fontSize: "8.5px",
                padding: "2px 6px",
                cursor: "pointer",
              }}
              title="Recolher ou expandir painel lateral para ampliar visão 3D"
            >
              {collapsed ? "[+ EXPANDIR]" : "[- COMPACTAR]"}
            </button>
          </div>
        </div>
      </HeaderBlock>

      <UplinkRibbon>
        <span>FIBRA GPON // CORE-SW-01</span>
        <span>
          POS 3D [{Number(machine.pos_x || 0).toFixed(1)},{" "}
          {Number(machine.pos_z || 0).toFixed(1)}]
        </span>
      </UplinkRibbon>

      <RadialGrid>
        <RadialGauge value={machine.cpu_usage_pct} unit="%" label="CPU LOAD" />
        <RadialGauge value={machine.ram_usage_pct} unit="%" label="RAM MEM" />
        <RadialGauge value={machine.disk_usage_pct} unit="%" label="NVMe/SSD" />
        <RadialGauge value={machine.temperature_c} unit="°" label="THERMAL" />
      </RadialGrid>

      {!collapsed && (
        <>
          <TelemetryOscilloscope
            machine={machine}
            telemetryHistory={activeTelemetryHistory}
          />

          <SpecPlate>
            <div className="spec-cell">
              <span>IPV4 / MAC</span>
              <strong>
                {machine.ip_address} •{" "}
                {String(machine.mac_address || "").slice(-8)}
              </strong>
            </div>
            <div className="spec-cell">
              <span>IMPRESSORA / SPOOLER</span>
              <strong
                style={{
                  color: machine.spooler_running ? "#00F5A0" : "#FF2A54",
                }}
              >
                {machine.spooler_running
                  ? "ONLINE (ACTIVE 3D)"
                  : "STOPPED (FAULT)"}
              </strong>
            </div>
            <div className="spec-cell">
              <span>FABRICANTE / MODELO / BIOS</span>
              <strong>
                {machine.manufacturer} {machine.model} ({machine.serial_number})
              </strong>
            </div>
            <div className="spec-cell">
              <span>PROCESSADOR (CPU)</span>
              <strong>{machine.cpu_model || 'x64 Processor'}</strong>
            </div>
            <div className="spec-cell">
              <span>MEMÓRIA / DISCO</span>
              <strong>
                {(Number(machine.ram_total_mb || 8192) / 1024).toFixed(1)}GB RAM •{' '}
                {machine.disk_total_gb}GB {machine.disk_type}
              </strong>
            </div>
            <div className="spec-cell">
              <span>SISTEMA OPERACIONAL / UPTIME</span>
              <strong>
                {machine.os_version || 'Windows'} •{' '}
                {Math.floor(Number(machine.uptime_seconds || 0) / 3600)}h ativo
              </strong>
            </div>
          </SpecPlate>

          <SectionBar>
            <span>
              CICLO: BOOT + 4H • ÚLTIMO PULSO:{" "}
              {machine.last_seen_at
                ? new Date(machine.last_seen_at).toLocaleTimeString("pt-BR")
                : "AGORA"}
            </span>
          </SectionBar>

          <button
            onClick={handleManualRefresh}
            disabled={refreshingNow || machine.health_status === "OFFLINE"}
            style={{
              width: "100%",
              padding: "9px 12px",
              background: refreshingNow
                ? "rgba(212, 255, 51, 0.25)"
                : "#D4FF33",
              color: "#050507",
              border: "1px solid #D4FF33",
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              cursor:
                machine.health_status === "OFFLINE" ? "not-allowed" : "pointer",
              textTransform: "uppercase",
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)",
            }}
          >
            {refreshingNow
              ? "⟳ COLETANDO TELEMETRIA EM TEMPO REAL..."
              : "⟳ ATUALIZAR TELEMETRIA AGORA (SOB DEMANDA)"}
          </button>

          <SectionBar>
            <span>CATÁLOGO DE MANUTENÇÃO REMOTA</span>
            <span>RBAC: {currentUser.role}</span>
          </SectionBar>

          <KeycapMatrix>
            {taskCatalog.map((task) => {
              const allowed =
                task.permittedForCurrentUser &&
                machine.health_status !== "OFFLINE";
              return (
                <KeycapButton
                  key={task.code}
                  $risk={task.riskLevel}
                  disabled={!allowed || busyTask === task.code}
                  onClick={() => handleRunTask(task)}
                  title={task.description}
                >
                  <div className="key-code">
                    <span>{task.code.slice(0, 15)}</span>
                    <span>[{task.riskLevel}]</span>
                  </div>
                  <span className="key-title">
                    {busyTask === task.code ? "EXECUTANDO..." : task.title}
                  </span>
                </KeycapButton>
              );
            })}
          </KeycapMatrix>

          <TerminalReadout>
            {feedback && (
              <div className={feedback.type === "err" ? "line-err" : "line-ok"}>
                &gt; {feedback.text}
              </div>
            )}
            {tasks.slice(0, 4).map((t) => (
              <div key={t.task_id}>
                [{new Date(t.issued_at).toLocaleTimeString("pt-BR")}]{" "}
                {t.task_code} :: <span className="line-ok">{t.status}</span> —{" "}
                {t.output_summary}
              </div>
            ))}
            {alerts.length > 0 && (
              <div className="line-n8n">
                [N8N // WHATSAPP DISPATCH] PROTOCOLO #
                {alerts[0].external_ticket_id || "ATIVO"} — {alerts[0].message}
              </div>
            )}
          </TerminalReadout>
        </>
      )}
    </BladeContainer>
  );
}
