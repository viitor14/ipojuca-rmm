import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { fixTextEncoding, isAgentOutdated } from '../styles/theme';
import { rmmApi } from '../services/api';
import {
  IconDownload,
  IconRefresh,
  IconSearch,
  IconCopy,
  IconCheck,
  IconMapPin,
  IconEdit,
  IconBan,
  IconShieldCheck,
  IconBuilding,
  IconLayers,
  IconClose,
} from './Icons';

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

  .head-copy {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  h1 {
    font-size: 1.32rem;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    font-size: 0.82rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .head-actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
`;

const ActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 13px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid
    ${({ $primary, theme }) =>
      $primary ? theme.colors.brandPrimary : theme.colors.borderStrong};
  background: ${({ $primary, theme }) =>
    $primary ? theme.colors.brandPrimary : theme.colors.bgSurface};
  color: ${({ $primary, theme }) =>
    $primary ? '#FFFFFF' : theme.colors.textPrimary};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({ $primary, theme }) =>
      $primary ? theme.colors.brandPrimaryHover : theme.colors.bgSurfaceHover};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const KpiBand = styled.section`
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  overflow: hidden;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const KpiCell = styled.div`
  padding: 15px 18px;
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
    background: ${({ $color }) => $color || '#1E2420'};
  }

  .k-val {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.55rem;
    font-weight: 700;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.1;
  }

  .k-sub {
    font-size: 0.71rem;
    color: ${({ theme }) => theme.colors.textMuted};
    font-variant-numeric: tabular-nums;
  }
`;

const QuantPanel = styled.section`
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  overflow: hidden;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const QuantColumn = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  &:last-child {
    border-right: none;
  }

  @media (max-width: 980px) {
    border-right: none;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    &:last-child {
      border-bottom: none;
    }
  }
`;

const QuantHead = styled.div`
  padding: 13px 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};

  .q-title {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.8rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    min-width: 0;

    span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .q-meta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .q-count {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.71rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ResetPill = styled.button`
  border: 1px solid rgba(45, 106, 79, 0.28);
  background: rgba(45, 106, 79, 0.08);
  color: ${({ theme }) => theme.colors.brandPrimary};
  border-radius: 999px;
  padding: 2px 8px;
  font-size: 0.69rem;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: rgba(45, 106, 79, 0.16);
  }
`;

const QuantList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 274px;
  overflow-y: auto;
`;

const QuantRow = styled.button`
  position: relative;
  width: 100%;
  text-align: left;
  border: none;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);
  background: ${({ $active }) => ($active ? '#F1F7F4' : 'transparent')};
  padding: 10px 18px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  transition: background 140ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 3px;
    border-radius: 0 2px 2px 0;
    background: ${({ $active, theme }) =>
      $active ? theme.colors.brandPrimary : 'transparent'};
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? '#E7F2EC' : theme.colors.bgSurfaceSubtle};
  }

  .qr-top {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
  }

  .qr-name-wrap {
    min-width: 0;
    display: flex;
    align-items: baseline;
    gap: 6px;
  }

  .qr-name {
    font-size: 0.82rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .qr-sub {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    color: ${({ theme }) => theme.colors.textMuted};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .qr-total {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.84rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    flex-shrink: 0;
  }

  .qr-pct {
    font-weight: 500;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-left: 5px;
  }

  .qr-bar-row {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .qr-track {
    flex: 1;
    height: 6px;
    border-radius: 999px;
    background: rgba(30, 36, 32, 0.07);
    overflow: hidden;
    display: flex;
  }

  .qr-seg {
    height: 100%;
    transition: width 220ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .qr-breakdown {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    flex-shrink: 0;
  }
`;

const TabBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  flex-wrap: wrap;

  .tabs-left {
    display: flex;
    align-items: center;
    gap: 20px;
  }
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
  font-size: 0.78rem;

  thead th {
    text-align: left;
    padding: 9px 10px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.textSecondary};
    background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    white-space: nowrap;
  }

  tbody td {
    padding: 10px 10px;
    border-bottom: 1px solid rgba(30, 36, 32, 0.06);
    vertical-align: middle;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: #f9faf8;
  }

  .host-btn {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.81rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    text-align: left;

    &:hover {
      color: ${({ theme }) => theme.colors.brandPrimary};
      text-decoration: underline;
    }
  }

  .sub-line {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 2px;
    max-width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .mono {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
  }
`;

const StatusBadge = styled.span`
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

  i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const CopyChip = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  border: none;
  background: transparent;
  padding: 2px 4px;
  margin-left: -4px;
  border-radius: 4px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSurfaceHover};
    color: ${({ theme }) => theme.colors.brandPrimary};
  }
`;

const RowActions = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
`;

const MiniActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 26px;
  padding: 0 7px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ $danger, $accent, theme }) =>
    $danger
      ? theme.colors.status.CRITICAL
      : $accent
        ? theme.colors.brandPrimary
        : theme.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ $danger, theme }) =>
      $danger ? 'rgba(200, 30, 30, 0.08)' : theme.colors.bgSurfaceHover};
    border-color: ${({ $danger, theme }) =>
      $danger ? 'rgba(200, 30, 30, 0.32)' : theme.colors.borderStrong};
    color: ${({ $danger, theme }) =>
      $danger ? theme.colors.status.CRITICAL : theme.colors.textPrimary};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

const EmptyBox = styled.div`
  padding: 36px 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.82rem;
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 95;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 440px;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  padding: 20px 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;

  .m-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-size: 0.96rem;
      font-weight: 700;
    }
  }

  .m-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    label {
      font-size: 0.74rem;
      font-weight: 600;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
    select {
      height: 36px;
      border-radius: 7px;
      border: 1px solid ${({ theme }) => theme.colors.borderStrong};
      background: ${({ theme }) => theme.colors.bgSurface};
      color: ${({ theme }) => theme.colors.textPrimary};
      padding: 0 10px;
      font-size: 0.82rem;
    }
  }

  .m-err {
    padding: 8px 10px;
    border-radius: 6px;
    background: #fef2f2;
    border: 1px solid #fecaca;
    color: #991b1b;
    font-size: 0.76rem;
    font-weight: 600;
  }

  .m-foot {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  }
`;

const STATUS_META = {
  NORMAL: { label: 'Online', color: '#2D6A4F', bg: 'rgba(45, 106, 79, 0.11)' },
  WARNING: { label: 'Atenção', color: '#B45309', bg: 'rgba(180, 83, 9, 0.11)' },
  CRITICAL: { label: 'Crítico', color: '#C81E1E', bg: 'rgba(200, 30, 30, 0.10)' },
  OFFLINE: { label: 'Offline', color: '#64748B', bg: 'rgba(100, 116, 139, 0.12)' },
};

const FIELD_LABELS = {
  hostname: 'Hostname',
  ram_total_mb: 'Memória RAM (MB)',
  ram_total_gb: 'Memória RAM (GB)',
  disk_total_gb: 'Disco total (GB)',
  disk_type: 'Tipo de disco',
  cpu_model: 'Processador',
  manufacturer: 'Fabricante',
  model: 'Modelo do equipamento',
  hardware_model: 'Modelo do equipamento',
  serial_number: 'Número de série',
  mac_address: 'Endereço MAC',
  os_version: 'Sistema Operacional',
  agent_uuid: 'Rebind de agente',
};

function sanitizeCsvCell(value) {
  let str = String(value ?? '').replace(/\r?\n/g, ' ').trim();
  // Proteção @security contra CSV Formula Injection (Excel / LibreOffice)
  if (/^[=+\-@\t\r]/.test(str)) {
    str = `'${str}`;
  }
  return `"${str.replace(/"/g, '""')}"`;
}

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
  });
}

export function InventoryView({
  token,
  units = [],
  allMachines = [],
  currentUser,
  latestAgentVersion = '2.6.1-native-exe',
  onOpenMachineInMap,
  onUpdateLocation,
  onRevokeMachine,
  onRefreshFleet,
}) {
  const [activeTab, setActiveTab] = useState('EQUIPMENT');
  const [search, setSearch] = useState('');
  const [unitFilter, setUnitFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [versionFilter, setVersionFilter] = useState('ALL');
  const [copiedKey, setCopiedKey] = useState('');
  const [changes, setChanges] = useState([]);
  const [changesLoading, setChangesLoading] = useState(false);
  const [changeSearch, setChangeSearch] = useState('');
  const [moveModal, setMoveModal] = useState({
    open: false,
    machine: null,
    unitId: '',
    sectorId: '',
    busy: false,
    error: '',
  });
  const [revokeBusyId, setRevokeBusyId] = useState(null);

  const isAdmin = currentUser?.role === 'ADMIN_N2';
  const canMove = isAdmin || currentUser?.role === 'TECH_N1';

  const loadChanges = async () => {
    if (!token) return;
    setChangesLoading(true);
    try {
      const res = await rmmApi.getInventoryChanges(token, { limit: 150 });
      setChanges(res.changes || []);
    } catch {
      setChanges([]);
    } finally {
      setChangesLoading(false);
    }
  };

  useEffect(() => {
    loadChanges();
  }, [token]);

  // Quantitativo por Unidade (inclui unidades com 0 PCs)
  const unitCounts = useMemo(() => {
    const map = new Map();
    for (const u of units) {
      map.set(Number(u.id), {
        id: Number(u.id),
        name: fixTextEncoding(u.name),
        code: u.code || '',
        total: 0,
        normal: 0,
        warning: 0,
        critical: 0,
        offline: 0,
      });
    }
    for (const m of allMachines) {
      const uid = Number(m.unit_id);
      if (!map.has(uid)) {
        map.set(uid, {
          id: uid,
          name: fixTextEncoding(m.unit_name || `Unidade #${uid}`),
          code: '',
          total: 0,
          normal: 0,
          warning: 0,
          critical: 0,
          offline: 0,
        });
      }
      const row = map.get(uid);
      row.total += 1;
      if (m.health_status === 'CRITICAL') row.critical += 1;
      else if (m.health_status === 'WARNING') row.warning += 1;
      else if (m.health_status === 'OFFLINE') row.offline += 1;
      else row.normal += 1;
    }
    return Array.from(map.values()).sort(
      (a, b) => b.total - a.total || a.name.localeCompare(b.name)
    );
  }, [units, allMachines]);

  // Quantitativo por Setor (respeita a unidade clicada ou mostra todos)
  const sectorCounts = useMemo(() => {
    const map = new Map();
    const targetUnits =
      unitFilter === 'ALL'
        ? units
        : units.filter((u) => Number(u.id) === Number(unitFilter));

    for (const u of targetUnits) {
      for (const s of u.sectors || []) {
        map.set(Number(s.id), {
          id: Number(s.id),
          unitId: Number(u.id),
          unitName: fixTextEncoding(u.name),
          name: fixTextEncoding(s.name),
          code: s.code || '',
          total: 0,
          normal: 0,
          warning: 0,
          critical: 0,
          offline: 0,
        });
      }
    }

    for (const m of allMachines) {
      if (unitFilter !== 'ALL' && Number(m.unit_id) !== Number(unitFilter)) continue;
      const sid = Number(m.sector_id);
      if (!map.has(sid)) {
        map.set(sid, {
          id: sid,
          unitId: Number(m.unit_id),
          unitName: fixTextEncoding(m.unit_name || ''),
          name: fixTextEncoding(m.sector_name || `Setor #${sid}`),
          code: m.sector_code || '',
          total: 0,
          normal: 0,
          warning: 0,
          critical: 0,
          offline: 0,
        });
      }
      const row = map.get(sid);
      row.total += 1;
      if (m.health_status === 'CRITICAL') row.critical += 1;
      else if (m.health_status === 'WARNING') row.warning += 1;
      else if (m.health_status === 'OFFLINE') row.offline += 1;
      else row.normal += 1;
    }

    return Array.from(map.values()).sort(
      (a, b) => b.total - a.total || a.name.localeCompare(b.name)
    );
  }, [units, allMachines, unitFilter]);

  const maxUnitTotal = Math.max(1, ...unitCounts.map((u) => u.total));
  const maxSectorTotal = Math.max(1, ...sectorCounts.map((s) => s.total));

  const kpis = useMemo(() => {
    let online = 0;
    let attention = 0;
    let offline = 0;
    let outdated = 0;
    for (const m of allMachines) {
      if (m.health_status === 'OFFLINE') offline += 1;
      else {
        online += 1;
        if (m.health_status === 'WARNING' || m.health_status === 'CRITICAL') {
          attention += 1;
        }
      }
      if (m.agent_version && isAgentOutdated(m.agent_version, latestAgentVersion)) {
        outdated += 1;
      }
    }
    return { total: allMachines.length, online, attention, offline, outdated };
  }, [allMachines, latestAgentVersion]);

  const availableSectorsForDropdown = useMemo(() => {
    if (unitFilter === 'ALL') {
      return units.flatMap((u) =>
        (u.sectors || []).map((s) => ({
          ...s,
          unitName: fixTextEncoding(u.name),
        }))
      );
    }
    const u = units.find((item) => Number(item.id) === Number(unitFilter));
    return (u?.sectors || []).map((s) => ({
      ...s,
      unitName: fixTextEncoding(u.name),
    }));
  }, [units, unitFilter]);

  const filteredMachines = useMemo(() => {
    const q = search.trim().toLowerCase();
    return allMachines.filter((m) => {
      if (unitFilter !== 'ALL' && Number(m.unit_id) !== Number(unitFilter)) return false;
      if (sectorFilter !== 'ALL' && Number(m.sector_id) !== Number(sectorFilter)) return false;
      if (statusFilter === 'REVOKED') {
        if (!Number(m.is_revoked)) return false;
      } else if (statusFilter !== 'ALL' && m.health_status !== statusFilter) {
        return false;
      }
      if (versionFilter === 'OUTDATED') {
        if (!isAgentOutdated(m.agent_version, latestAgentVersion)) return false;
      } else if (versionFilter === 'CURRENT') {
        if (isAgentOutdated(m.agent_version, latestAgentVersion)) return false;
      }
      if (q) {
        const hay = [
          m.hostname,
          m.ip_address,
          m.mac_address,
          m.serial_number,
          m.cpu_model,
          m.model,
          m.hardware_model,
          m.os_version,
          m.unit_name,
          m.sector_name,
          m.sector_code,
        ]
          .map((v) => fixTextEncoding(String(v || '')).toLowerCase())
          .join(' ');
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allMachines, unitFilter, sectorFilter, statusFilter, versionFilter, search, latestAgentVersion]);

  const filteredChanges = useMemo(() => {
    const q = changeSearch.trim().toLowerCase();
    if (!q) return changes;
    return changes.filter((c) =>
      [c.hostname, c.unit_name, c.sector_name, c.field_name, c.old_value, c.new_value]
        .map((v) => fixTextEncoding(String(v || '')).toLowerCase())
        .join(' ')
        .includes(q)
    );
  }, [changes, changeSearch]);

  const hasActiveFilter =
    unitFilter !== 'ALL' ||
    sectorFilter !== 'ALL' ||
    statusFilter !== 'ALL' ||
    versionFilter !== 'ALL' ||
    search.trim().length > 0;

  const selectedUnitObj =
    unitFilter !== 'ALL'
      ? units.find((u) => Number(u.id) === Number(unitFilter))
      : null;

  function handleCopy(key, value) {
    if (!value) return;
    navigator.clipboard?.writeText(String(value)).catch(() => {});
    setCopiedKey(key);
    setTimeout(() => setCopiedKey((prev) => (prev === key ? '' : prev)), 1400);
  }

  function handleExportCsv() {
    const headers = [
      'Hostname',
      'Unidade',
      'Setor',
      'Codigo Setor',
      'Status',
      'Revogado',
      'IPv4',
      'MAC',
      'Sistema Operacional',
      'Modelo',
      'Numero de Serie',
      'Processador',
      'RAM Total (GB)',
      'Disco Total (GB)',
      'CPU (%)',
      'RAM (%)',
      'Disco (%)',
      'Versao Agente',
      'Ultima Comunicacao',
    ];
    const rows = filteredMachines.map((m) => [
      m.hostname,
      fixTextEncoding(m.unit_name || ''),
      fixTextEncoding(m.sector_name || ''),
      m.sector_code || '',
      STATUS_META[m.health_status]?.label || m.health_status,
      Number(m.is_revoked) ? 'Sim' : 'Nao',
      m.ip_address || '',
      m.mac_address || '',
      m.os_version || '',
      m.model || m.hardware_model || '',
      m.serial_number || '',
      m.cpu_model || '',
      m.ram_total_mb ? Math.round(Number(m.ram_total_mb) / 1024) : m.ram_total_gb || '',
      m.disk_total_gb || '',
      Number(m.cpu_usage_pct || 0).toFixed(1),
      Number(m.ram_usage_pct || 0).toFixed(1),
      Number(m.disk_usage_pct || 0).toFixed(1),
      m.agent_version || '',
      formatDateTime(m.last_seen_at),
    ]);

    const csvLines = [
      headers.map(sanitizeCsvCell).join(';'),
      ...rows.map((r) => r.map(sanitizeCsvCell).join(';')),
    ];
    const blob = new Blob([`\uFEFF${csvLines.join('\r\n')}`], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const stamp = new Date().toISOString().slice(0, 10);
    link.download = `pulso-rmm-inventario-${stamp}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(url), 4000);
  }

  function openMoveModal(machine) {
    setMoveModal({
      open: true,
      machine,
      unitId: String(machine.unit_id || units[0]?.id || ''),
      sectorId: String(machine.sector_id || ''),
      busy: false,
      error: '',
    });
  }

  async function handleConfirmMove() {
    if (!moveModal.machine || !moveModal.unitId || !moveModal.sectorId) {
      setMoveModal((p) => ({ ...p, error: 'Selecione a unidade e o setor de destino.' }));
      return;
    }
    setMoveModal((p) => ({ ...p, busy: true, error: '' }));
    try {
      await onUpdateLocation(moveModal.machine.id, {
        unitId: Number(moveModal.unitId),
        sectorId: Number(moveModal.sectorId),
      });
      setMoveModal({ open: false, machine: null, unitId: '', sectorId: '', busy: false, error: '' });
    } catch (err) {
      setMoveModal((p) => ({
        ...p,
        busy: false,
        error: err.message || 'Não foi possível mover a estação.',
      }));
    }
  }

  async function handleToggleRevoke(machine) {
    if (!onRevokeMachine) return;
    setRevokeBusyId(machine.id);
    try {
      await onRevokeMachine(machine.id, !Number(machine.is_revoked));
    } finally {
      setRevokeBusyId(null);
    }
  }

  const moveTargetUnit = units.find((u) => Number(u.id) === Number(moveModal.unitId));

  return (
    <PageContainer>
      <PageHeader>
        <div className="head-copy">
          <h1>Inventário da frota</h1>
          <p>
            Quantitativo de estações por unidade e setor, especificações de hardware e histórico de alterações.
          </p>
        </div>
        <div className="head-actions">
          <ActionBtn
            type="button"
            onClick={() => {
              onRefreshFleet?.();
              loadChanges();
            }}
            title="Sincronizar inventário e histórico agora"
          >
            <IconRefresh size={14} />
            <span>Atualizar</span>
          </ActionBtn>
          <ActionBtn
            type="button"
            $primary
            onClick={handleExportCsv}
            disabled={filteredMachines.length === 0}
            title="Exportar estações filtradas em CSV (compatível com Excel)"
          >
            <IconDownload size={14} />
            <span>Exportar CSV ({filteredMachines.length})</span>
          </ActionBtn>
        </div>
      </PageHeader>

      {/* FAIXA DE INDICADORES CONSOLIDADOS */}
      <KpiBand aria-label="Resumo quantitativo da frota">
        <KpiCell $color="#1E2420">
          <span className="k-label">
            <span className="k-dot" />
            Total de estações
          </span>
          <span className="k-val">{kpis.total}</span>
          <span className="k-sub">{units.length} {units.length === 1 ? 'unidade' : 'unidades'}</span>
        </KpiCell>
        <KpiCell $color="#2D6A4F">
          <span className="k-label">
            <span className="k-dot" />
            Online
          </span>
          <span className="k-val">{kpis.online}</span>
          <span className="k-sub">
            {kpis.total ? `${Math.round((kpis.online / kpis.total) * 100)}% da frota` : '—'}
          </span>
        </KpiCell>
        <KpiCell $color="#B45309">
          <span className="k-label">
            <span className="k-dot" />
            Atenção / Crítico
          </span>
          <span className="k-val">{kpis.attention}</span>
          <span className="k-sub">Uso elevado ou falha ativa</span>
        </KpiCell>
        <KpiCell $color="#64748B">
          <span className="k-label">
            <span className="k-dot" />
            Offline
          </span>
          <span className="k-val">{kpis.offline}</span>
          <span className="k-sub">Sem heartbeat recente</span>
        </KpiCell>
        <KpiCell $color="#B45309">
          <span className="k-label">
            <span className="k-dot" />
            Agentes desatualizados
          </span>
          <span className="k-val">{kpis.outdated}</span>
          <span className="k-sub">Versão oficial v{latestAgentVersion.split('-')[0]}</span>
        </KpiCell>
      </KpiBand>

      {/* PAINEL DE QUANTITATIVOS POR UNIDADE E POR SETOR */}
      <QuantPanel aria-label="Quantitativo de computadores por unidade e setor">
        <QuantColumn>
          <QuantHead>
            <div className="q-title">
              <IconBuilding size={14} />
              <span>Quantitativo por unidade</span>
            </div>
            <div className="q-meta">
              {unitFilter !== 'ALL' && (
                <ResetPill
                  type="button"
                  onClick={() => {
                    setUnitFilter('ALL');
                    setSectorFilter('ALL');
                  }}
                >
                  Todas
                </ResetPill>
              )}
              <span className="q-count">{unitCounts.length} unidades</span>
            </div>
          </QuantHead>
          <QuantList>
            {unitCounts.map((u) => {
              const isSelected = String(u.id) === String(unitFilter);
              const share = kpis.total > 0 ? Math.round((u.total / kpis.total) * 100) : 0;
              const onlineCount = u.normal + u.warning + u.critical;
              return (
                <QuantRow
                  key={u.id}
                  type="button"
                  $active={isSelected}
                  onClick={() => {
                    if (isSelected) {
                      setUnitFilter('ALL');
                      setSectorFilter('ALL');
                    } else {
                      setUnitFilter(String(u.id));
                      setSectorFilter('ALL');
                    }
                  }}
                  title={`Clique para filtrar estações de ${u.name}`}
                >
                  <div className="qr-top">
                    <div className="qr-name-wrap">
                      <span className="qr-name">{u.name}</span>
                      {u.code && <span className="qr-sub">{u.code}</span>}
                    </div>
                    <span className="qr-total">
                      {u.total} {u.total === 1 ? 'PC' : 'PCs'}
                      <span className="qr-pct">{share}%</span>
                    </span>
                  </div>
                  <div className="qr-bar-row">
                    <div className="qr-track">
                      <div
                        className="qr-seg"
                        style={{
                          width: `${(u.normal / maxUnitTotal) * 100}%`,
                          background: '#2D6A4F',
                        }}
                      />
                      <div
                        className="qr-seg"
                        style={{
                          width: `${(u.warning / maxUnitTotal) * 100}%`,
                          background: '#B45309',
                        }}
                      />
                      <div
                        className="qr-seg"
                        style={{
                          width: `${(u.critical / maxUnitTotal) * 100}%`,
                          background: '#C81E1E',
                        }}
                      />
                      <div
                        className="qr-seg"
                        style={{
                          width: `${(u.offline / maxUnitTotal) * 100}%`,
                          background: '#94A3B8',
                        }}
                      />
                    </div>
                    <span className="qr-breakdown">
                      {u.total === 0
                        ? 'Sem estações'
                        : `${onlineCount} on · ${u.offline} off`}
                    </span>
                  </div>
                </QuantRow>
              );
            })}
          </QuantList>
        </QuantColumn>

        <QuantColumn>
          <QuantHead>
            <div className="q-title">
              <IconLayers size={14} />
              <span>
                {selectedUnitObj
                  ? `Setores — ${fixTextEncoding(selectedUnitObj.name)}`
                  : 'Quantitativo por setor'}
              </span>
            </div>
            <div className="q-meta">
              {sectorFilter !== 'ALL' && (
                <ResetPill type="button" onClick={() => setSectorFilter('ALL')}>
                  Limpar setor
                </ResetPill>
              )}
              <span className="q-count">{sectorCounts.length} setores</span>
            </div>
          </QuantHead>
          <QuantList>
            {sectorCounts.length === 0 ? (
              <EmptyBox>Nenhum setor cadastrado nesta unidade.</EmptyBox>
            ) : (
              sectorCounts.map((s) => {
                const isSelected = String(s.id) === String(sectorFilter);
                const onlineCount = s.normal + s.warning + s.critical;
                return (
                  <QuantRow
                    key={s.id}
                    type="button"
                    $active={isSelected}
                    onClick={() => {
                      if (isSelected) {
                        setSectorFilter('ALL');
                      } else {
                        setUnitFilter(String(s.unitId));
                        setSectorFilter(String(s.id));
                      }
                    }}
                    title={`Clique para filtrar estações do setor ${s.name}`}
                  >
                    <div className="qr-top">
                      <div className="qr-name-wrap">
                        <span className="qr-name">{s.name}</span>
                        <span className="qr-sub">
                          {s.code}
                          {unitFilter === 'ALL' && s.unitName ? ` · ${s.unitName}` : ''}
                        </span>
                      </div>
                      <span className="qr-total">
                        {s.total} {s.total === 1 ? 'PC' : 'PCs'}
                      </span>
                    </div>
                    <div className="qr-bar-row">
                      <div className="qr-track">
                        <div
                          className="qr-seg"
                          style={{
                            width: `${(s.normal / maxSectorTotal) * 100}%`,
                            background: '#2D6A4F',
                          }}
                        />
                        <div
                          className="qr-seg"
                          style={{
                            width: `${(s.warning / maxSectorTotal) * 100}%`,
                            background: '#B45309',
                          }}
                        />
                        <div
                          className="qr-seg"
                          style={{
                            width: `${(s.critical / maxSectorTotal) * 100}%`,
                            background: '#C81E1E',
                          }}
                        />
                        <div
                          className="qr-seg"
                          style={{
                            width: `${(s.offline / maxSectorTotal) * 100}%`,
                            background: '#94A3B8',
                          }}
                        />
                      </div>
                      <span className="qr-breakdown">
                        {s.total === 0
                          ? 'Vazio'
                          : `${onlineCount} on · ${s.offline} off`}
                      </span>
                    </div>
                  </QuantRow>
                );
              })
            )}
          </QuantList>
        </QuantColumn>
      </QuantPanel>

      {/* SUB-ABAS: EQUIPAMENTOS E ALTERAÇÕES DE HARDWARE */}
      <TabBar>
        <div className="tabs-left">
          <TabBtn
            type="button"
            $active={activeTab === 'EQUIPMENT'}
            onClick={() => setActiveTab('EQUIPMENT')}
          >
            <span>Equipamentos</span>
            <span className="t-badge">{filteredMachines.length}</span>
          </TabBtn>
          <TabBtn
            type="button"
            $active={activeTab === 'CHANGES'}
            onClick={() => setActiveTab('CHANGES')}
          >
            <span>Alterações de hardware</span>
            <span className="t-badge">{changes.length}</span>
          </TabBtn>
        </div>
      </TabBar>

      {activeTab === 'EQUIPMENT' ? (
        <>
          <FilterBar>
            <div className="search-box">
              <span className="search-ico">
                <IconSearch size={14} />
              </span>
              <input
                type="text"
                aria-label="Buscar estação por hostname, IP, MAC, serial ou CPU"
                placeholder="Buscar hostname, IP, MAC, serial, modelo ou CPU..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              aria-label="Filtrar por unidade"
              value={unitFilter}
              onChange={(e) => {
                setUnitFilter(e.target.value);
                setSectorFilter('ALL');
              }}
            >
              <option value="ALL">Todas as unidades</option>
              {units.map((u) => (
                <option key={u.id} value={String(u.id)}>
                  {fixTextEncoding(u.name)}
                </option>
              ))}
            </select>

            <select
              aria-label="Filtrar por setor"
              value={sectorFilter}
              onChange={(e) => setSectorFilter(e.target.value)}
            >
              <option value="ALL">Todos os setores</option>
              {availableSectorsForDropdown.map((s) => (
                <option key={s.id} value={String(s.id)}>
                  {fixTextEncoding(s.name)}
                  {unitFilter === 'ALL' ? ` (${s.unitName})` : ''}
                </option>
              ))}
            </select>

            <select
              aria-label="Filtrar por status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Todos os status</option>
              <option value="NORMAL">Online</option>
              <option value="WARNING">Atenção</option>
              <option value="CRITICAL">Crítico</option>
              <option value="OFFLINE">Offline</option>
              <option value="REVOKED">Revogados</option>
            </select>

            <select
              aria-label="Filtrar por versão do agente"
              value={versionFilter}
              onChange={(e) => setVersionFilter(e.target.value)}
            >
              <option value="ALL">Todas as versões</option>
              <option value="CURRENT">Agente atualizado</option>
              <option value="OUTDATED">Agente desatualizado</option>
            </select>

            {hasActiveFilter && (
              <ResetPill
                type="button"
                onClick={() => {
                  setSearch('');
                  setUnitFilter('ALL');
                  setSectorFilter('ALL');
                  setStatusFilter('ALL');
                  setVersionFilter('ALL');
                }}
              >
                Limpar filtros
              </ResetPill>
            )}
          </FilterBar>

          <TableCard>
            <TableScroller>
              {filteredMachines.length === 0 ? (
                <EmptyBox>
                  Nenhuma estação corresponde aos filtros atuais.
                </EmptyBox>
              ) : (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Estação</th>
                      <th>Unidade / Setor</th>
                      <th>Status & Recursos</th>
                      <th>IPv4 / MAC</th>
                      <th>Hardware</th>
                      <th>Agente</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMachines.map((m) => {
                      const st = STATUS_META[m.health_status] || STATUS_META.OFFLINE;
                      const outdated =
                        m.agent_version && isAgentOutdated(m.agent_version, latestAgentVersion);
                      const revoked = Boolean(Number(m.is_revoked));
                      const ipCopyId = `ip-${m.id}`;
                      return (
                        <tr key={m.id}>
                          <td>
                            <button
                              type="button"
                              className="host-btn"
                              onClick={() => onOpenMachineInMap?.(m)}
                              title="Abrir esta estação no mapa"
                            >
                              <span>{m.hostname}</span>
                              {revoked && (
                                <StatusBadge $bg="rgba(200,30,30,0.10)" $color="#C81E1E">
                                  Revogado
                                </StatusBadge>
                              )}
                            </button>
                            <div className="sub-line" title={m.os_version || ''}>
                              {m.os_version || 'Windows'}
                            </div>
                          </td>
                          <td>
                            <div style={{ fontWeight: 600 }}>
                              {fixTextEncoding(m.unit_name || '—')}
                            </div>
                            <div className="sub-line">
                              {fixTextEncoding(m.sector_name || '—')}
                              {m.sector_code ? ` · ${m.sector_code}` : ''}
                            </div>
                          </td>
                          <td>
                            <StatusBadge $bg={st.bg} $color={st.color}>
                              <i />
                              {st.label}
                            </StatusBadge>
                            <div className="sub-line mono">
                              CPU {Number(m.cpu_usage_pct || 0).toFixed(0)}% · RAM{' '}
                              {Number(m.ram_usage_pct || 0).toFixed(0)}% · DSK{' '}
                              {Number(m.disk_usage_pct || 0).toFixed(0)}%
                            </div>
                          </td>
                          <td>
                            <CopyChip
                              type="button"
                              onClick={() => handleCopy(ipCopyId, m.ip_address)}
                              title="Copiar endereço IPv4"
                            >
                              <span>{m.ip_address || '—'}</span>
                              {copiedKey === ipCopyId ? (
                                <IconCheck size={12} />
                              ) : (
                                <IconCopy size={12} />
                              )}
                            </CopyChip>
                            <div className="sub-line mono">{m.mac_address || '—'}</div>
                          </td>
                          <td>
                            {(() => {
                              const ramGb = m.ram_total_mb
                                ? Math.round(Number(m.ram_total_mb) / 1024)
                                : m.ram_total_gb || null;
                              const hwMain =
                                m.model || m.hardware_model || m.cpu_model || '—';
                              const hwSub = [
                                ramGb ? `${ramGb}GB RAM` : null,
                                m.disk_total_gb
                                  ? `${m.disk_total_gb}GB${m.disk_type && m.disk_type !== 'UNKNOWN' ? ` ${m.disk_type}` : ''}`
                                  : null,
                                m.serial_number || null,
                              ]
                                .filter(Boolean)
                                .join(' · ');
                              return (
                                <>
                                  <div
                                    style={{
                                      maxWidth: '175px',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      fontWeight: 500,
                                    }}
                                    title={`${hwMain}${m.cpu_model && hwMain !== m.cpu_model ? ` · ${m.cpu_model}` : ''}`}
                                  >
                                    {hwMain}
                                  </div>
                                  <div className="sub-line mono" title={hwSub}>
                                    {hwSub || '—'}
                                  </div>
                                </>
                              );
                            })()}
                          </td>
                          <td>
                            <StatusBadge
                              $bg={outdated ? 'rgba(180,83,9,0.11)' : 'rgba(45,106,79,0.09)'}
                              $color={outdated ? '#B45309' : '#2D6A4F'}
                            >
                              <span className="mono" style={{ fontSize: '0.68rem' }}>
                                {String(m.agent_version || '—').replace(/-native-exe$/i, '')}
                              </span>
                            </StatusBadge>
                            <div className="sub-line">{formatDateTime(m.last_seen_at)}</div>
                          </td>
                          <td>
                            <RowActions>
                              <MiniActionBtn
                                type="button"
                                $accent
                                onClick={() => onOpenMachineInMap?.(m)}
                                title="Focar estação no mapa"
                              >
                                <IconMapPin size={12} />
                                <span>Mapa</span>
                              </MiniActionBtn>
                              {canMove && (
                                <MiniActionBtn
                                  type="button"
                                  onClick={() => openMoveModal(m)}
                                  title="Mover estação de unidade ou setor"
                                >
                                  <IconEdit size={12} />
                                  <span>Mover</span>
                                </MiniActionBtn>
                              )}
                              {isAdmin && (
                                <MiniActionBtn
                                  type="button"
                                  $danger={!revoked}
                                  $accent={revoked}
                                  disabled={revokeBusyId === m.id}
                                  onClick={() => handleToggleRevoke(m)}
                                  title={
                                    revoked
                                      ? 'Reativar comunicação do agente'
                                      : 'Revogar credencial do agente'
                                  }
                                >
                                  {revoked ? <IconShieldCheck size={12} /> : <IconBan size={12} />}
                                  <span>{revoked ? 'Reativar' : 'Revogar'}</span>
                                </MiniActionBtn>
                              )}
                            </RowActions>
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
                aria-label="Filtrar alterações de hardware"
                placeholder="Filtrar por hostname, unidade, campo ou valor..."
                value={changeSearch}
                onChange={(e) => setChangeSearch(e.target.value)}
              />
            </div>
          </FilterBar>

          <TableCard>
            <TableScroller>
              {changesLoading ? (
                <EmptyBox>Carregando histórico de alterações de hardware...</EmptyBox>
              ) : filteredChanges.length === 0 ? (
                <EmptyBox>
                  Nenhuma troca de componente ou alteração de hardware registrada até o momento.
                </EmptyBox>
              ) : (
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Data / Hora</th>
                      <th>Estação</th>
                      <th>Unidade / Setor</th>
                      <th>Campo alterado</th>
                      <th>Antes → Depois</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredChanges.map((c) => (
                      <tr key={c.id}>
                        <td className="mono">{formatDateTime(c.changed_at)}</td>
                        <td style={{ fontWeight: 700 }}>{c.hostname || `PC #${c.machine_id}`}</td>
                        <td>
                          {fixTextEncoding(c.unit_name || '—')}
                          {c.sector_name ? ` · ${fixTextEncoding(c.sector_name)}` : ''}
                        </td>
                        <td>
                          <StatusBadge $bg="rgba(45,106,79,0.09)" $color="#2D6A4F">
                            {FIELD_LABELS[c.field_name] || c.field_name}
                          </StatusBadge>
                        </td>
                        <td className="mono">
                          <span style={{ color: '#64748B' }}>{c.old_value || '—'}</span>
                          {' → '}
                          <span style={{ color: '#1E2420', fontWeight: 700 }}>
                            {c.new_value || '—'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </StyledTable>
              )}
            </TableScroller>
          </TableCard>
        </>
      )}

      {moveModal.open && moveModal.machine && (
        <ModalBackdrop
          onClick={() =>
            !moveModal.busy &&
            setMoveModal({ open: false, machine: null, unitId: '', sectorId: '', busy: false, error: '' })
          }
        >
          <ModalCard onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="m-head">
              <h3>Mover {moveModal.machine.hostname}</h3>
              <MiniActionBtn
                type="button"
                onClick={() =>
                  setMoveModal({ open: false, machine: null, unitId: '', sectorId: '', busy: false, error: '' })
                }
                aria-label="Fechar"
              >
                <IconClose size={13} />
              </MiniActionBtn>
            </div>
            <div className="m-field">
              <label htmlFor="inv-move-unit">Unidade de destino</label>
              <select
                id="inv-move-unit"
                value={moveModal.unitId}
                onChange={(e) => {
                  const nextUid = e.target.value;
                  const nextUnit = units.find((u) => Number(u.id) === Number(nextUid));
                  setMoveModal((p) => ({
                    ...p,
                    unitId: nextUid,
                    sectorId: String(nextUnit?.sectors?.[0]?.id || ''),
                  }));
                }}
              >
                {units.map((u) => (
                  <option key={u.id} value={String(u.id)}>
                    {fixTextEncoding(u.name)}
                  </option>
                ))}
              </select>
            </div>
            <div className="m-field">
              <label htmlFor="inv-move-sector">Setor de destino</label>
              <select
                id="inv-move-sector"
                value={moveModal.sectorId}
                onChange={(e) => setMoveModal((p) => ({ ...p, sectorId: e.target.value }))}
              >
                {(moveTargetUnit?.sectors || []).map((s) => (
                  <option key={s.id} value={String(s.id)}>
                    {fixTextEncoding(s.name)} ({s.code})
                  </option>
                ))}
              </select>
            </div>
            {moveModal.error && <div className="m-err">{moveModal.error}</div>}
            <div className="m-foot">
              <ActionBtn
                type="button"
                disabled={moveModal.busy}
                onClick={() =>
                  setMoveModal({ open: false, machine: null, unitId: '', sectorId: '', busy: false, error: '' })
                }
              >
                Cancelar
              </ActionBtn>
              <ActionBtn
                type="button"
                $primary
                disabled={moveModal.busy}
                onClick={handleConfirmMove}
              >
                {moveModal.busy ? 'Movendo...' : 'Salvar localização'}
              </ActionBtn>
            </div>
          </ModalCard>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
}
