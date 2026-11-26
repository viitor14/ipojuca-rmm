import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { fixTextEncoding } from '../styles/theme';
import { rmmApi } from '../services/api';
import { IconRefresh, IconSearch, IconMapPin, IconDownload } from './Icons';

const PageContainer = styled.div`
  max-width: 1380px;
  margin: 0 auto;
  padding: 24px 28px 44px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PageHeader = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;

  h1 {
    font-size: 1.32rem;
    font-weight: 700;
    letter-spacing: -0.025em;
  }

  p {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 3px;
  }
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 13px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgSurfaceHover};
  }
`;

const TabBar = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

const TabBtn = styled.button`
  position: relative;
  border: none;
  background: transparent;
  padding: 9px 2px 11px;
  font-size: 0.84rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 7px;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    background: ${({ $active, theme }) =>
      $active ? theme.colors.brandPrimary : 'transparent'};
    border-radius: 2px 2px 0 0;
  }

  .t-badge {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.7rem;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({ $active }) =>
      $active ? 'rgba(45, 106, 79, 0.12)' : 'rgba(30, 36, 32, 0.06)'};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.brandPrimary : theme.colors.textSecondary};
  }
`;

const KpiBand = styled.section`
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;

  @media (max-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const KpiCell = styled.div`
  padding: 14px 18px;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: flex;
  flex-direction: column;
  gap: 4px;

  &:last-child {
    border-right: none;
  }

  .k-label {
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .k-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
  }

  .k-val {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 1.1;
  }
`;

const FilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;

  .search-box {
    position: relative;
    flex: 1;
    min-width: 240px;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .search-ico {
    position: absolute;
    left: 10px;
    pointer-events: none;
    display: inline-flex;
  }

  input,
  select {
    height: 34px;
    border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    border-radius: ${({ theme }) => theme.radius.sm};
    background: ${({ theme }) => theme.colors.bgSurface};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.78rem;
    padding: 0 10px;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.1);
    }
  }

  input {
    width: 100%;
    padding-left: 32px;
  }
`;

const CategoryStrip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 3px;
`;

const CatPill = styled.button`
  height: 26px;
  padding: 0 10px;
  border-radius: 5px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brandPrimarySubtle : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.brandPrimary : theme.colors.textSecondary};
  font-size: 0.74rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const TableCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
`;

const TableScroller = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.79rem;

  thead th {
    text-align: left;
    padding: 10px 14px;
    font-size: 0.69rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    white-space: nowrap;
  }

  tbody td {
    padding: 11px 14px;
    border-bottom: 1px solid rgba(30, 36, 32, 0.06);
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: #f9faf8;
  }

  .mono {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.73rem;
  }

  .sub {
    font-size: 0.71rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 2px;
  }
`;

const Pill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  white-space: nowrap;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
`;

const MiniBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 27px;
  padding: 0 9px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ theme }) => theme.colors.brandPrimary};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.brandPrimarySubtle};
    border-color: rgba(45, 106, 79, 0.3);
  }
`;

const EmptyBox = styled.div`
  padding: 36px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.82rem;
`;

function formatDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '—';
  return d.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

const ACTION_LABELS = {
  AUTH_LOGIN_SUCCESS: 'Login realizado',
  AUTH_LOGIN_FAILED: 'Tentativa de login negada',
  AUTH_LOGOUT: 'Logout realizado',
  AUTH_PASSWORD_CHANGED: 'Senha própria alterada',
  AUTH_PASSWORD_CHANGE_FAILED: 'Falha na troca de senha',
  USER_CREATED: 'Usuário criado',
  USER_UPDATED: 'Usuário editado',
  USER_PASSWORD_RESET: 'Senha redefinida (Admin)',
  USER_DELETED: 'Usuário excluído',
  REMOTE_TASK_DISPATCHED: 'Ação remota enviada',
  REMOTE_TASK_RESULT: 'Retorno de ação remota',
  REMOTE_TASK_DISPATCH_ERROR: 'Erro ao despachar ação',
  MANUAL_TELEMETRY_REFRESH: 'Coleta manual de telemetria',
  AGENT_OTA_UPDATE_REQUESTED: 'Atualização OTA enviada',
  AGENT_OTA_UPDATE_ALL_REQUESTED: 'Atualização OTA global',
  AGENT_INSTALLER_DOWNLOADED: 'Instalador baixado',
  AGENT_AUTO_ENROLLED: 'Estação cadastrada',
  AGENT_REBOUND: 'Reassociação de hardware',
  AGENT_REVOKED: 'Agente revogado',
  AGENT_UNREVOKED: 'Agente reativado',
  AGENT_DISCONNECTED: 'Agente desconectado',
  AGENT_AUTH_FAILED: 'Auth de agente recusada',
  AGENT_MESSAGE_SENT: 'Mensagem enviada (TI)',
  AGENT_MESSAGE_RECEIVED: 'Mensagem recebida (PC)',
  MACHINE_RELOCATED: 'Estação movida',
  MACHINE_DELETED: 'Estação removida',
  UNIT_CREATED: 'Unidade criada',
  UNIT_UPDATED: 'Unidade editada',
  UNIT_DELETED: 'Unidade excluída',
  SECTOR_CREATED: 'Setor criado',
  SECTOR_UPDATED: 'Setor editado',
  SECTOR_DELETED: 'Setor excluído',
  SECURITY_BLOCKED_ARBITRARY_COMMAND: 'Comando livre bloqueado',
  SECURITY_BLOCKED_UNKNOWN_TASK: 'Tarefa desconhecida bloqueada',
  SECURITY_BLOCKED_INSUFFICIENT_ROLE: 'Ação bloqueada (RBAC)',
  SECURITY_BLOCKED_TASK_RESULT_SPOOF: 'Spoof de tarefa bloqueado',
  SECURITY_BLOCKED_ACTIVE_AGENT_REBIND: 'Rebind ativo bloqueado',
  HARDWARE_KEY_CONFLICT: 'Conflito de hardware',
};

function sanitizeCsvCell(value) {
  let str = String(value ?? '').replace(/\r?\n/g, ' ').trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

function classifyAuditAction(actionType = '') {
  const act = String(actionType).toUpperCase();
  if (
    act.startsWith('SECURITY_') ||
    act.includes('FAILED') ||
    act.includes('REVOKED') ||
    act.includes('CONFLICT') ||
    act.includes('ERROR')
  ) {
    return { category: 'SECURITY', color: '#C81E1E', bg: 'rgba(200, 30, 30, 0.10)' };
  }
  if (
    act.startsWith('REMOTE_TASK') ||
    act.startsWith('AGENT_OTA') ||
    act === 'MANUAL_TELEMETRY_REFRESH' ||
    act.startsWith('AGENT_MESSAGE')
  ) {
    return { category: 'TASKS', color: '#B45309', bg: 'rgba(180, 83, 9, 0.11)' };
  }
  if (act.startsWith('USER_') || act.startsWith('AUTH_')) {
    return { category: 'USERS', color: '#2D6A4F', bg: 'rgba(45, 106, 79, 0.11)' };
  }
  return { category: 'INFRA', color: '#475569', bg: 'rgba(100, 116, 139, 0.11)' };
}

function summarizeAuditDetails(raw) {
  if (!raw) return '—';
  let obj = raw;
  if (typeof raw === 'string') {
    try {
      obj = JSON.parse(raw);
    } catch {
      return raw.slice(0, 160);
    }
  }
  if (typeof obj !== 'object' || obj === null) return String(obj);
  if (obj.task_title && obj.output_summary) {
    return `${obj.task_title} (${obj.status || 'OK'}): ${String(obj.output_summary).slice(0, 160)}`;
  }
  if (obj.task_title && obj.task_code) {
    return `${obj.task_title} (${obj.task_code}) · ${obj.task_id || ''}`.replace(/\s*·\s*$/, '');
  }
  const entries = Object.entries(obj)
    .filter(([, v]) => v !== null && v !== undefined && v !== '')
    .slice(0, 5)
    .map(([k, v]) => {
      const val = typeof v === 'object' ? JSON.stringify(v) : String(v);
      return `${k}: ${val}`;
    });
  return entries.length > 0 ? entries.join(' · ') : '—';
}

export function MonitoringAuditView({
  token,
  units = [],
  allMachines = [],
  alerts = [],
  currentUser,
  latestAuditEvent = null,
  onOpenMachineInMap,
  onRefreshFleet,
}) {
  const isAdmin = currentUser?.role === 'ADMIN_N2';
  const [activeTab, setActiveTab] = useState('ALERTS');
  const [alertSearch, setAlertSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [unitFilter, setUnitFilter] = useState('ALL');

  const [auditLogs, setAuditLogs] = useState([]);
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditError, setAuditError] = useState('');
  const [auditSearch, setAuditSearch] = useState('');
  const [auditCategory, setAuditCategory] = useState('ALL');

  const loadAuditLogs = useCallback(async ({ silent = false } = {}) => {
    if (!token || !isAdmin) return;
    if (!silent) setAuditLoading(true);
    setAuditError('');
    try {
      const res = await rmmApi.getAuditLogs(token);
      setAuditLogs(res.logs || []);
    } catch (err) {
      setAuditError(err?.message || 'Não foi possível carregar a trilha de auditoria.');
    } finally {
      if (!silent) setAuditLoading(false);
    }
  }, [token, isAdmin]);

  useEffect(() => {
    if (isAdmin) {
      loadAuditLogs();
    }
  }, [isAdmin, loadAuditLogs]);

  // Recarrega ao abrir a aba Trilha de auditoria e mantém sincronização periódica
  useEffect(() => {
    if (!isAdmin || activeTab !== 'AUDIT') return undefined;
    loadAuditLogs({ silent: auditLogs.length > 0 });
    const timer = setInterval(() => {
      loadAuditLogs({ silent: true });
    }, 10000);
    return () => clearInterval(timer);
  }, [isAdmin, activeTab, loadAuditLogs]);

  // Inserção imediata em tempo real via WebSocket (audit:created)
  useEffect(() => {
    if (!isAdmin || !latestAuditEvent || !latestAuditEvent.id) return;
    setAuditLogs((prev) => {
      if (prev.some((l) => Number(l.id) === Number(latestAuditEvent.id))) return prev;
      return [latestAuditEvent, ...prev].slice(0, 250);
    });
  }, [isAdmin, latestAuditEvent]);

  // Consolida alertas do backend com alertas ao vivo de inatividade >24h
  const combinedAlerts = useMemo(() => {
    const nowMs = Date.now();
    const liveInactivity = allMachines
      .map((m) => {
        const isOffline = m.health_status === 'OFFLINE';
        const offSec = m.last_seen_at
          ? Math.max(0, Math.floor((nowMs - new Date(m.last_seen_at).getTime()) / 1000))
          : 0;
        const idleSec = Math.max(0, Math.floor(Number(m.idle_seconds || 0)));
        const sec = isOffline ? offSec : idleSec;
        if (sec < 86400) return null;
        const alreadyExists = alerts.some(
          (a) =>
            Number(a.machine_id) === Number(m.id) &&
            a.metric_name === 'INACTIVITY_24H' &&
            a.status !== 'RESOLVED'
        );
        if (alreadyExists) return null;
        return {
          id: `live-inact-${m.id}`,
          machine_id: m.id,
          unit_id: m.unit_id,
          hostname: m.hostname,
          unit_name: m.unit_name || '',
          severity: 'WARNING',
          metric_name: 'INACTIVITY_24H',
          status: 'OPEN',
          message: isOffline
            ? `Estação sem comunicação há mais de 24h (${Math.floor(sec / 3600)}h).`
            : `Estação ligada sem interação há mais de 24h (${Math.floor(sec / 3600)}h).`,
          created_at: m.last_seen_at || new Date().toISOString(),
        };
      })
      .filter(Boolean);

    return [...liveInactivity, ...alerts];
  }, [allMachines, alerts]);

  const alertKpis = useMemo(() => {
    let open = 0;
    let critical = 0;
    let inactivity = 0;
    let resolved = 0;
    for (const a of combinedAlerts) {
      if (a.status === 'RESOLVED') {
        resolved += 1;
      } else {
        open += 1;
        if (a.severity === 'CRITICAL') critical += 1;
        if (a.metric_name === 'INACTIVITY_24H') inactivity += 1;
      }
    }
    return { open, critical, inactivity, resolved };
  }, [combinedAlerts]);

  const filteredAlerts = useMemo(() => {
    const q = alertSearch.trim().toLowerCase();
    return combinedAlerts.filter((a) => {
      if (severityFilter !== 'ALL' && a.severity !== severityFilter) return false;
      if (statusFilter === 'OPEN' && a.status === 'RESOLVED') return false;
      if (statusFilter === 'RESOLVED' && a.status !== 'RESOLVED') return false;
      if (unitFilter !== 'ALL') {
        const machine = allMachines.find((m) => Number(m.id) === Number(a.machine_id));
        const uid = a.unit_id || machine?.unit_id;
        if (Number(uid) !== Number(unitFilter)) return false;
      }
      if (q) {
        const hay = [a.hostname, a.unit_name, a.message, a.metric_name, a.status]
          .map((v) => fixTextEncoding(String(v || '')).toLowerCase())
          .join(' ');
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [combinedAlerts, severityFilter, statusFilter, unitFilter, alertSearch, allMachines]);

  const filteredAuditLogs = useMemo(() => {
    const q = auditSearch.trim().toLowerCase();
    return auditLogs.filter((l) => {
      const cls = classifyAuditAction(l.action_type);
      if (auditCategory !== 'ALL' && cls.category !== auditCategory) return false;
      if (q) {
        const hay = [
          l.action_type,
          ACTION_LABELS[l.action_type] || '',
          l.user_name,
          l.user_email,
          l.machine_hostname,
          l.ip_address,
          summarizeAuditDetails(l.details_json),
        ]
          .map((v) => fixTextEncoding(String(v || '')).toLowerCase())
          .join(' ');
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [auditLogs, auditCategory, auditSearch]);

  function handleExportAuditCsv() {
    const headers = ['Data/Hora', 'Evento', 'Codigo', 'Operador', 'Email', 'Estacao', 'IP', 'Detalhes'];
    const rows = filteredAuditLogs.map((l) => [
      formatDateTime(l.created_at),
      ACTION_LABELS[l.action_type] || l.action_type,
      l.action_type,
      fixTextEncoding(l.user_name || 'Sistema / Agente'),
      l.user_email || '',
      l.machine_hostname || '',
      l.ip_address || '',
      summarizeAuditDetails(l.details_json),
    ]);
    const lines = [
      headers.map(sanitizeCsvCell).join(';'),
      ...rows.map((r) => r.map(sanitizeCsvCell).join(';')),
    ];
    const blob = new Blob([`\uFEFF${lines.join('\r\n')}`], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `pulso-rmm-auditoria-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(url), 4000);
  }

  function openAlertInMap(al) {
    const machine = allMachines.find((m) => Number(m.id) === Number(al.machine_id));
    if (machine) {
      onOpenMachineInMap?.(machine);
    }
  }

  return (
    <PageContainer>
      <PageHeader>
        <div>
          <h1>Monitoramento e auditoria</h1>
          <p>
            Acompanhamento de incidentes da frota e trilha auditável de ações remotas, acessos e segurança.
          </p>
        </div>
        <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
          {activeTab === 'AUDIT' && isAdmin && (
            <ActionBtn
              type="button"
              onClick={handleExportAuditCsv}
              disabled={filteredAuditLogs.length === 0}
              title="Exportar trilha de auditoria filtrada em CSV"
            >
              <IconDownload size={14} />
              <span>Exportar CSV ({filteredAuditLogs.length})</span>
            </ActionBtn>
          )}
          <ActionBtn
            type="button"
            onClick={() => {
              onRefreshFleet?.();
              if (isAdmin) loadAuditLogs();
            }}
          >
            <IconRefresh size={14} />
            <span>Atualizar</span>
          </ActionBtn>
        </div>
      </PageHeader>

      <TabBar>
        <TabBtn
          type="button"
          $active={activeTab === 'ALERTS'}
          onClick={() => setActiveTab('ALERTS')}
        >
          <span>Alertas da frota</span>
          <span className="t-badge">{alertKpis.open}</span>
        </TabBtn>
        {isAdmin && (
          <TabBtn
            type="button"
            $active={activeTab === 'AUDIT'}
            onClick={() => setActiveTab('AUDIT')}
          >
            <span>Trilha de auditoria</span>
            <span className="t-badge">{auditLogs.length}</span>
          </TabBtn>
        )}
      </TabBar>

      {activeTab === 'ALERTS' ? (
        <>
          <KpiBand>
            <KpiCell $color="#B45309">
              <span className="k-label">
                <span className="k-dot" />
                Alertas ativos
              </span>
              <span className="k-val">{alertKpis.open}</span>
            </KpiCell>
            <KpiCell $color="#C81E1E">
              <span className="k-label">
                <span className="k-dot" />
                Críticos abertos
              </span>
              <span className="k-val">{alertKpis.critical}</span>
            </KpiCell>
            <KpiCell $color="#B45309">
              <span className="k-label">
                <span className="k-dot" />
                Inatividade &gt;24h
              </span>
              <span className="k-val">{alertKpis.inactivity}</span>
            </KpiCell>
            <KpiCell $color="#2D6A4F">
              <span className="k-label">
                <span className="k-dot" />
                Resolvidos
              </span>
              <span className="k-val">{alertKpis.resolved}</span>
            </KpiCell>
          </KpiBand>

          <FilterBar>
            <div className="search-box">
              <span className="search-ico">
                <IconSearch size={14} />
              </span>
              <input
                type="text"
                aria-label="Filtrar alertas"
                placeholder="Buscar estação, unidade, métrica ou mensagem..."
                value={alertSearch}
                onChange={(e) => setAlertSearch(e.target.value)}
              />
            </div>

            <select
              aria-label="Filtrar por severidade"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              <option value="ALL">Todas severidades</option>
              <option value="CRITICAL">Crítico</option>
              <option value="WARNING">Atenção</option>
            </select>

            <select
              aria-label="Filtrar por situação"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Todas situações</option>
              <option value="OPEN">Abertos</option>
              <option value="RESOLVED">Resolvidos</option>
            </select>

            <select
              aria-label="Filtrar alertas por unidade"
              value={unitFilter}
              onChange={(e) => setUnitFilter(e.target.value)}
            >
              <option value="ALL">Todas as unidades</option>
              {units.map((u) => (
                <option key={u.id} value={String(u.id)}>
                  {fixTextEncoding(u.name)}
                </option>
              ))}
            </select>
          </FilterBar>

          <TableCard>
            <TableScroller>
              {filteredAlerts.length === 0 ? (
                <EmptyBox>
                  Nenhum alerta encontrado para os filtros selecionados.
                </EmptyBox>
              ) : (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Severidade</th>
                      <th>Estação</th>
                      <th>Ocorrência</th>
                      <th>Situação</th>
                      <th>Registro</th>
                      <th>Ação</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAlerts.map((al) => {
                      const isCrit = al.severity === 'CRITICAL';
                      const isRes = al.status === 'RESOLVED';
                      return (
                        <tr key={al.id || al.incident_key}>
                          <td>
                            <Pill
                              $bg={isCrit ? 'rgba(200,30,30,0.10)' : 'rgba(180,83,9,0.11)'}
                              $color={isCrit ? '#C81E1E' : '#B45309'}
                            >
                              {isCrit ? 'Crítico' : 'Atenção'}
                            </Pill>
                          </td>
                          <td>
                            <div style={{ fontWeight: 700 }}>
                              {fixTextEncoding(al.hostname || `PC #${al.machine_id}`)}
                            </div>
                            <div className="sub">{fixTextEncoding(al.unit_name || '—')}</div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 500 }}>{fixTextEncoding(al.message)}</div>
                            <div className="sub mono">
                              {al.metric_name || 'TELEMETRY'}
                              {al.external_ticket_id ? ` · Chamado #${al.external_ticket_id}` : ''}
                            </div>
                          </td>
                          <td>
                            <Pill
                              $bg={isRes ? 'rgba(45,106,79,0.10)' : 'rgba(180,83,9,0.11)'}
                              $color={isRes ? '#2D6A4F' : '#B45309'}
                            >
                              {isRes
                                ? 'Resolvido'
                                : al.metric_name === 'INACTIVITY_24H'
                                  ? 'Inativo >24h'
                                  : al.status || 'Aberto'}
                            </Pill>
                          </td>
                          <td className="mono">{formatDateTime(al.triggered_at || al.created_at)}</td>
                          <td>
                            {al.machine_id ? (
                              <MiniBtn
                                type="button"
                                onClick={() => openAlertInMap(al)}
                                title="Abrir estação afetada no mapa"
                              >
                                <IconMapPin size={12} />
                                <span>Abrir no mapa</span>
                              </MiniBtn>
                            ) : (
                              '—'
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </StyledTable>
              )}
            </TableScroller>
          </TableCard>
        </>
      ) : (
        <>
          <FilterBar>
            <div className="search-box">
              <span className="search-ico">
                <IconSearch size={14} />
              </span>
              <input
                type="text"
                aria-label="Buscar na trilha de auditoria"
                placeholder="Buscar evento, operador, estação, IP ou detalhes..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
              />
            </div>

            <CategoryStrip role="tablist" aria-label="Filtrar categoria de auditoria">
              {[
                { key: 'ALL', label: 'Todos' },
                { key: 'SECURITY', label: 'Segurança' },
                { key: 'TASKS', label: 'Tarefas remotas' },
                { key: 'USERS', label: 'Usuários' },
                { key: 'INFRA', label: 'Infraestrutura' },
              ].map((cat) => (
                <CatPill
                  key={cat.key}
                  type="button"
                  $active={auditCategory === cat.key}
                  onClick={() => setAuditCategory(cat.key)}
                >
                  {cat.label}
                </CatPill>
              ))}
            </CategoryStrip>
          </FilterBar>

          {auditError && (
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 8,
                background: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#991B1B',
                fontSize: '0.8rem',
                fontWeight: 600,
              }}
            >
              {auditError}
            </div>
          )}

          <TableCard>
            <TableScroller>
              {auditLoading ? (
                <EmptyBox>Carregando trilha de auditoria...</EmptyBox>
              ) : filteredAuditLogs.length === 0 ? (
                <EmptyBox>Nenhum evento de auditoria corresponde ao filtro.</EmptyBox>
              ) : (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Data / Hora</th>
                      <th>Evento</th>
                      <th>Operador</th>
                      <th>Estação</th>
                      <th>IP</th>
                      <th>Detalhes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAuditLogs.map((log) => {
                      const cls = classifyAuditAction(log.action_type);
                      const friendlyLabel = ACTION_LABELS[log.action_type];
                      return (
                        <tr key={log.id}>
                          <td className="mono">{formatDateTime(log.created_at)}</td>
                          <td>
                            <Pill $bg={cls.bg} $color={cls.color}>
                              <span>{friendlyLabel || log.action_type}</span>
                            </Pill>
                            {friendlyLabel && (
                              <div className="sub mono" style={{ fontSize: '0.66rem' }}>
                                {log.action_type}
                              </div>
                            )}
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>
                              {fixTextEncoding(log.user_name || 'Sistema / Agente')}
                            </div>
                            {log.user_email && <div className="sub">{log.user_email}</div>}
                          </td>
                          <td className="mono">{log.machine_hostname || '—'}</td>
                          <td className="mono">{log.ip_address || '—'}</td>
                          <td
                            style={{
                              maxWidth: '340px',
                              fontSize: '0.74rem',
                              color: '#5B655F',
                            }}
                          >
                            {summarizeAuditDetails(log.details_json)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </StyledTable>
              )}
            </TableScroller>
          </TableCard>
        </>
      )}
    </PageContainer>
  );
}
