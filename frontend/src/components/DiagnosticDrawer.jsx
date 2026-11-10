import React, { useState, useMemo } from "react";
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
  background: #06080d;
  border: 1px solid rgba(255, 255, 255, 0.11);
  border-radius: 8px;
  padding: 10px 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  line-height: 1.5;
  max-height: 135px;
  overflow-y: auto;
  color: #cbd5e1;

  .line-ok {
    color: #10b981;
  }
  .line-err {
    color: #ef4444;
  }
  .line-n8n {
    color: #d4ff33;
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed rgba(212, 255, 51, 0.25);
  }
`;

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
        reason: `Ação executada por ${currentUser.name}`,
      });
      setFeedback({
        type: "ok",
        text: `${task.title}: ${res.task.output_summary || "Comando enviado ao Agente Windows."}`,
      });
    } catch (err) {
      setFeedback({ type: "err", text: `Erro: ${err.message}` });
    } finally {
      setBusyTask(null);
    }
  }

  return (
    <BladeContainer $statusColor={statusColor} $collapsed={collapsed}>
      <HeaderBlock>
        <HeaderTopRow>
          <MicroSerial>
            ESTAÇÃO #{machine.id} • {machine.ip_address}
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

          <SectionBar>
            <span>Ações de Manutenção Remota</span>
            <span>Perfil: {currentUser.role}</span>
          </SectionBar>

          <KeycapMatrix>
            {taskCatalog.map((task) => {
              const allowed = task.permittedForCurrentUser;
              return (
                <KeycapButton
                  key={task.code}
                  $risk={task.riskLevel}
                  disabled={!allowed || busyTask === task.code}
                  onClick={() => handleRunTask(task)}
                  title={task.description}
                >
                  <div className="key-head">
                    <span className="key-badge">
                      Risco {RISK_LABELS[task.riskLevel] || task.riskLevel}
                    </span>
                  </div>
                  <span className="key-title">
                    {busyTask === task.code
                      ? "Executando comando..."
                      : fixTextEncoding(task.title)}
                  </span>
                </KeycapButton>
              );
            })}
          </KeycapMatrix>

          {(feedback || tasks.length > 0 || alerts.length > 0) && (
            <TerminalReadout>
              {feedback && (
                <div
                  className={feedback.type === "err" ? "line-err" : "line-ok"}
                >
                  &gt; {feedback.text}
                </div>
              )}
              {tasks.slice(0, 4).map((t) => (
                <div key={t.task_id}>
                  [{new Date(t.issued_at).toLocaleTimeString("pt-BR")}]{" "}
                  {t.task_code} :: <span className="line-ok">{t.status}</span> —{" "}
                  {fixTextEncoding(t.output_summary)}
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
          )}
        </>
      )}
    </BladeContainer>
  );
}
