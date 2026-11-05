import React, { useState } from 'react';
import styled from 'styled-components';
import { STATUS_LABELS, theme } from '../styles/theme';

const BladeContainer = styled.aside`
  width: 420px;
  max-height: calc(100vh - 108px);
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
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.75);
  pointer-events: auto;

  @media (max-width: 1100px) {
    width: 350px;
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding-bottom: 12px;
`;

const MicroSerial = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  color: ${({ theme }) => theme.colors.brandPrimary};
  text-transform: uppercase;
`;

const HostHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const SubLocation = styled.div`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  margin-top: 3px;
`;

const StatusStamp = styled.div`
  padding: 4px 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #050507;
  background: ${({ $color }) => $color};
  clip-path: polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 0 100%);
`;

const RadialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const DialCard = styled.div`
  background: rgba(5, 5, 7, 0.65);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: 8px 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;

  .dial-label {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.62rem;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const SpecPlate = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 12px;
  padding: 10px 12px;
  background: rgba(5, 5, 7, 0.72);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-left: 2px solid ${({ theme }) => theme.colors.brandPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.69rem;

  .spec-cell {
    display: flex;
    flex-direction: column;
    span {
      font-size: 0.58rem;
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
  font-size: 0.66rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const SimSwitchRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const SimTrigger = styled.button`
  padding: 7px 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.66rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  background: ${({ $danger }) =>
    $danger ? 'rgba(255, 42, 84, 0.14)' : 'rgba(0, 245, 160, 0.12)'};
  color: ${({ $danger }) => ($danger ? '#FF2A54' : '#00F5A0')};
  border: 1px solid ${({ $danger }) => ($danger ? '#FF2A54' : '#00F5A0')};
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#FF2A54' : '#00F5A0')};
    color: #050507;
  }
`;

const KeycapMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const KeycapButton = styled.button`
  position: relative;
  padding: 9px 10px;
  text-align: left;
  background: ${({ disabled }) =>
    disabled ? 'rgba(10, 11, 15, 0.45)' : 'rgba(19, 21, 28, 0.95)'};
  color: ${({ disabled, theme }) =>
    disabled ? '#434857' : theme.colors.textPrimary};
  border: 1px solid
    ${({ disabled, $risk }) =>
      disabled
        ? 'rgba(255,255,255,0.05)'
        : $risk === 'HIGH'
          ? 'rgba(255, 184, 0, 0.45)'
          : 'rgba(244, 244, 240, 0.16)'};
  border-bottom-width: ${({ disabled }) => (disabled ? '1px' : '3px')};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: transform 0.1s ease, border-color 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.brandPrimary};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  .key-code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.58rem;
    letter-spacing: 0.08em;
    color: ${({ $risk }) => ($risk === 'HIGH' ? '#FFB800' : '#D4FF33')};
    display: flex;
    justify-content: space-between;
  }

  .key-title {
    font-size: 0.76rem;
    font-weight: 700;
    margin-top: 3px;
    display: block;
  }
`;

const TerminalReadout = styled.div`
  background: #040507;
  border: 1px solid rgba(244, 244, 240, 0.12);
  padding: 10px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.67rem;
  line-height: 1.45;
  max-height: 135px;
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
    margin-top: 6px;
    padding-top: 6px;
    border-top: 1px dashed rgba(212, 255, 51, 0.25);
  }
`;

function RadialGauge({ value = 0, unit = '%', label }) {
  const clamped = Math.min(100, Math.max(0, Number(value || 0)));
  const radius = 22;
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
      <svg width="58" height="58" viewBox="0 0 58 58">
        <circle
          cx="29"
          cy="29"
          r={radius}
          fill="none"
          stroke="rgba(244,244,240,0.08)"
          strokeWidth="4.5"
        />
        <circle
          cx="29"
          cy="29"
          r={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth="4.5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="butt"
          transform="rotate(-90 29 29)"
        />
        <text
          x="50%"
          y="53%"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#F4F4F0"
          fontFamily="IBM Plex Mono, monospace"
          fontSize="11"
          fontWeight="700"
        >
          {clamped.toFixed(0)}
          {unit}
        </text>
      </svg>
      <span className="dial-label">{label}</span>
    </DialCard>
  );
}

export function DiagnosticDrawer({
  diagnostics,
  taskCatalog,
  currentUser,
  onDispatchTask,
  onRefreshTelemetryNow,
  onFocusCamera,
}) {
  const [busyTask, setBusyTask] = useState(null);
  const [refreshingNow, setRefreshingNow] = useState(false);
  const [feedback, setFeedback] = useState(null);

  if (!diagnostics || !diagnostics.machine) {
    return (
      <BladeContainer $statusColor="#D4FF33">
        <HeaderBlock>
          <div>
            <MicroSerial>AGUARDANDO AGENTES REAIS</MicroSerial>
            <HostHeading>Nenhuma Estação Nesta Unidade</HostHeading>
            <SubLocation>
              Inicie o Agente Windows na máquina física para auto-registro imediato no mapa 3D.
            </SubLocation>
          </div>
        </HeaderBlock>
      </BladeContainer>
    );
  }

  const { machine, tasks = [], alerts = [] } = diagnostics;
  const statusColor =
    theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;

  async function handleManualRefresh() {
    setRefreshingNow(true);
    setFeedback(null);
    try {
      const res = await onRefreshTelemetryNow(machine.id);
      setFeedback({
        type: 'ok',
        text: `SYNC MANUAL // ${res.message || 'Telemetria solicitada ao agente em tempo real.'}`,
      });
    } catch (err) {
      setFeedback({ type: 'err', text: `FALHA SYNC // ${err.message}` });
    } finally {
      setRefreshingNow(false);
    }
  }

  async function handleRunTask(task) {
    setBusyTask(task.code);
    setFeedback(null);
    try {
      const defaultParams =
        task.code === 'INSTALL_APPROVED_PRINTER'
          ? { printer_ip: '10.14.1.250', printer_name: 'IMP_USF_RECEPCAO' }
          : task.code === 'CLEAR_TEMP_CACHE'
            ? { include_system_temp: true }
            : task.code === 'CHECK_DISK_HEALTH'
              ? { drive: 'C' }
              : {};

      const res = await onDispatchTask({
        machineId: machine.id,
        taskCode: task.code,
        parameters: defaultParams,
        reason: `Comando tático por ${currentUser.name}`,
      });
      setFeedback({
        type: 'ok',
        text: `EXEC // ${res.task.task_code} -> ${res.task.output_summary || 'Ordem entregue ao Agente Windows.'}`,
      });
    } catch (err) {
      setFeedback({ type: 'err', text: `BLOCKED // ${err.message}` });
    } finally {
      setBusyTask(null);
    }
  }

  return (
    <BladeContainer $statusColor={statusColor}>
      <HeaderBlock>
        <div>
          <MicroSerial>
            SYS.NODE.{machine.id} // {machine.agent_uuid}
          </MicroSerial>
          <HostHeading>{machine.hostname}</HostHeading>
          <SubLocation>
            {machine.unit_name} — {machine.sector_name}
          </SubLocation>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
          <StatusStamp $color={statusColor}>
            {STATUS_LABELS[machine.health_status]}
          </StatusStamp>
          <button
            onClick={onFocusCamera}
            style={{
              background: 'transparent',
              border: '1px solid rgba(212,255,51,0.45)',
              color: '#D4FF33',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '9px',
              padding: '2px 7px',
              cursor: 'pointer',
            }}
          >
            [MIRAR CÂMERA 3D]
          </button>
        </div>
      </HeaderBlock>

      <RadialGrid>
        <RadialGauge value={machine.cpu_usage_pct} unit="%" label="CPU LOAD" />
        <RadialGauge value={machine.ram_usage_pct} unit="%" label="RAM MEM" />
        <RadialGauge value={machine.disk_usage_pct} unit="%" label="NVMe/SSD" />
        <RadialGauge value={machine.temperature_c} unit="°" label="THERMAL" />
      </RadialGrid>

      <SpecPlate>
        <div className="spec-cell">
          <span>IPV4 / MAC</span>
          <strong>
            {machine.ip_address} • {machine.mac_address.slice(-8)}
          </strong>
        </div>
        <div className="spec-cell">
          <span>SPOOLER DAEMON</span>
          <strong style={{ color: machine.spooler_running ? '#00F5A0' : '#FFB800' }}>
            {machine.spooler_running ? 'ONLINE (ACTIVE)' : 'STOPPED (FAULT)'}
          </strong>
        </div>
        <div className="spec-cell">
          <span>HARDWARE / BIOS</span>
          <strong>
            {machine.manufacturer} {machine.model} ({machine.serial_number})
          </strong>
        </div>
        <div className="spec-cell">
          <span>CPU / STORAGE</span>
          <strong>
            {Math.round(machine.ram_total_mb / 1024)}GB RAM • {machine.disk_total_gb}GB {machine.disk_type}
          </strong>
        </div>
      </SpecPlate>

      <SectionBar>
        <span>CICLO: BOOT + 4H • ÚLTIMA LEITURA: {machine.last_seen_at ? new Date(machine.last_seen_at).toLocaleTimeString('pt-BR') : 'AGORA'}</span>
      </SectionBar>

      <button
        onClick={handleManualRefresh}
        disabled={refreshingNow || machine.health_status === 'OFFLINE'}
        style={{
          width: '100%',
          padding: '9px 12px',
          background: refreshingNow ? 'rgba(212, 255, 51, 0.25)' : '#D4FF33',
          color: '#050507',
          border: '1px solid #D4FF33',
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.08em',
          cursor: machine.health_status === 'OFFLINE' ? 'not-allowed' : 'pointer',
          textTransform: 'uppercase',
          clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 0 100%)',
        }}
      >
        {refreshingNow
          ? '⟳ COLETANDO TELEMETRIA EM TEMPO REAL...'
          : '⟳ ATUALIZAR TELEMETRIA AGORA (SOB DEMANDA)'}
      </button>

      <SectionBar>
        <span>CATÁLOGO DE MANUTENÇÃO REMOTA</span>
        <span>RBAC: {currentUser.role}</span>
      </SectionBar>

      <KeycapMatrix>
        {taskCatalog.map((task) => {
          const allowed =
            task.permittedForCurrentUser && machine.health_status !== 'OFFLINE';
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
                {busyTask === task.code ? 'EXECUTANDO...' : task.title}
              </span>
            </KeycapButton>
          );
        })}
      </KeycapMatrix>

      <TerminalReadout>
        {feedback && (
          <div className={feedback.type === 'err' ? 'line-err' : 'line-ok'}>
            &gt; {feedback.text}
          </div>
        )}
        {tasks.slice(0, 4).map((t) => (
          <div key={t.task_id}>
            [{new Date(t.issued_at).toLocaleTimeString('pt-BR')}] {t.task_code} ::{' '}
            <span className="line-ok">{t.status}</span> — {t.output_summary}
          </div>
        ))}
        {alerts.length > 0 && (
          <div className="line-n8n">
            [N8N // WHATSAPP DISPATCH] PROTOCOLO #{alerts[0].external_ticket_id || 'ATIVO'}{' '}
            — {alerts[0].message}
          </div>
        )}
      </TerminalReadout>
    </BladeContainer>
  );
}
