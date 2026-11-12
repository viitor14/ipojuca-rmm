import React, { useEffect, useState, useCallback, useMemo } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { theme, STATUS_LABELS, fixTextEncoding } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { rmmApi, connectDashboardSocket } from './services/api';
import { DigitalTwin3D } from './components/DigitalTwin3D';
import { DiagnosticDrawer } from './components/DiagnosticDrawer';

const pulseDot = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.85); }
`;

const HudOverlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 14px 18px;
`;

const TopCommandDeck = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  pointer-events: none;
  flex-wrap: wrap;
`;

const MastheadPod = styled.div`
  pointer-events: auto;
  background: ${({ theme }) => theme.colors.bgSurface};
  backdrop-filter: blur(22px);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-left: 3px solid ${({ theme }) => theme.colors.brandPrimary};
  clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 0 100%);
  padding: 9px 15px;
  display: flex;
  align-items: center;
  gap: 14px;

  .sys-tag {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.62rem;
    letter-spacing: 0.14em;
    color: ${({ theme }) => theme.colors.brandPrimary};
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .brand-title {
    font-size: 0.94rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    margin-top: 2px;
  }
`;

const LiveBeacon = styled.span`
  width: 7px;
  height: 7px;
  background: ${({ $online }) => ($online ? '#00F5A0' : '#FFB800')};
  display: inline-block;
  animation: ${pulseDot} 1.6s infinite;
`;

const UnitSwitcherPod = styled.div`
  pointer-events: auto;
  display: flex;
  gap: 6px;
  background: rgba(8, 9, 12, 0.84);
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: 5px;
`;

const UnitSwitchBtn = styled.button`
  background: ${({ $active }) =>
    $active ? '#D4FF33' : 'rgba(18, 20, 27, 0.85)'};
  color: ${({ $active }) => ($active ? '#050507' : '#F4F4F0')};
  border: 1px solid
    ${({ $active }) =>
      $active ? '#D4FF33' : 'rgba(244, 244, 240, 0.1)'};
  padding: 6px 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;
  clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 0 100%);

  .u-code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    opacity: 0.82;
    display: block;
  }

  .u-name {
    font-size: 0.74rem;
    font-weight: 700;
    display: block;
    margin-top: 1px;
  }
`;

const RightControlPod = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  background: ${({ theme }) => theme.colors.bgSurface};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: 6px 10px;
`;

const CamModeBtn = styled.button`
  padding: 6px 9px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#D4FF33' : 'transparent')};
  color: ${({ $active }) => ($active ? '#050507' : '#F4F4F0')};
  border: 1px solid
    ${({ $active }) =>
      $active ? '#D4FF33' : 'rgba(244, 244, 240, 0.16)'};
  transition: all 0.15s ease;

  &:hover {
    border-color: #d4ff33;
  }
`;

const RoleSelect = styled.select`
  background: #0b0c10;
  color: #d4ff33;
  border: 1px solid rgba(212, 255, 51, 0.45);
  padding: 6px 9px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.63rem;
  font-weight: 600;
  cursor: pointer;
`;

const MiddleWorkspace = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 10px;
  pointer-events: none;
  overflow: hidden;
`;

const LeftRadarColumn = styled.div`
  width: 295px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
  pointer-events: auto;
  overflow-y: auto;

  & > * {
    flex-shrink: 0;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const RadarCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSurface};
  backdrop-filter: blur(20px);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: 11px 13px;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);

  .card-tag {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.59rem;
    letter-spacing: 0.12em;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    margin-bottom: 7px;
    display: flex;
    justify-content: space-between;
  }
`;

const KpiMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
`;

const KpiCell = styled.div`
  background: rgba(5, 5, 7, 0.7);
  border: 1px solid rgba(244, 244, 240, 0.08);
  border-left: 2px solid ${({ $color }) => $color};
  padding: 5px 8px;

  .num {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 1.02rem;
    font-weight: 700;
    color: ${({ $color }) => $color};
  }
  .lbl {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.56rem;
    letter-spacing: 0.08em;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const LayerToggleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 5px;
`;

const LayerChip = styled.button`
  padding: 5px 7px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.58rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-align: left;
  cursor: pointer;
  background: ${({ $on }) =>
    $on ? 'rgba(0, 229, 255, 0.12)' : 'rgba(10, 12, 18, 0.75)'};
  color: ${({ $on }) => ($on ? '#00E5FF' : '#7E8494')};
  border: 1px solid
    ${({ $on }) => ($on ? 'rgba(0, 229, 255, 0.5)' : 'rgba(244, 244, 240, 0.08)')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.14s ease;

  &:hover {
    border-color: #00e5ff;
  }
`;

const SectorMiniRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 7px;
  background: rgba(5, 6, 9, 0.65);
  border-left: 2px solid ${({ $accent }) => $accent};
  margin-bottom: 4px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.61rem;

  .s-name {
    color: #f4f4f0;
    font-weight: 600;
  }
  .s-meta {
    color: #8a90a2;
    font-size: 0.56rem;
  }
`;

const IncidentItem = styled.div`
  padding: 7px 9px;
  background: rgba(255, 42, 84, 0.08);
  border: 1px solid rgba(255, 42, 84, 0.35);
  margin-top: 5px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.62rem;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 42, 84, 0.2);
  }

  .tck {
    color: #d4ff33;
    font-weight: 700;
    display: flex;
    justify-content: space-between;
  }
  .msg {
    color: #f4f4f0;
    margin-top: 2px;
    line-height: 1.35;
  }
`;

const DockShell = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  pointer-events: none;
`;

const DockToggleBtn = styled.button`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 22px;
  padding: 0 14px;
  margin-bottom: -1px;
  background: rgba(8, 9, 13, 0.92);
  backdrop-filter: blur(22px);
  color: #d4ff33;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-bottom: ${({ $collapsed, theme }) =>
    $collapsed ? `1px solid ${theme.colors.borderSubtle}` : '1px solid transparent'};
  clip-path: polygon(8px 0, calc(100% - 8px) 0, 100% 100%, 0 100%);
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: color 0.15s ease, background 0.15s ease;

  .arrow {
    display: inline-block;
    font-size: 0.7rem;
    transition: transform 0.25s ease;
    transform: rotate(${({ $collapsed }) => ($collapsed ? '180deg' : '0deg')});
  }

  &:hover {
    background: rgba(212, 255, 51, 0.14);
  }

  &:focus-visible {
    outline: 1px solid #d4ff33;
    outline-offset: 2px;
  }
`;

const BottomMatrixDock = styled.footer`
  pointer-events: auto;
  align-self: stretch;
  background: rgba(8, 9, 13, 0.88);
  backdrop-filter: blur(22px);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: ${({ $collapsed }) => ($collapsed ? '0 12px' : '8px 12px')};
  max-height: ${({ $collapsed }) => ($collapsed ? '0px' : '220px')};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  border-width: ${({ $collapsed }) => ($collapsed ? '0' : '1px')};
  visibility: ${({ $collapsed }) => ($collapsed ? 'hidden' : 'visible')};
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  transition: max-height 0.25s ease, padding 0.25s ease, opacity 0.2s ease,
    visibility 0.25s;
`;

const DockControlsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-right: 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  min-width: 195px;

  .dock-title {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    color: ${({ theme }) => theme.colors.brandPrimary};
    white-space: nowrap;
  }

  .dock-search {
    background: rgba(5, 6, 10, 0.9);
    border: 1px solid rgba(244, 244, 240, 0.16);
    color: #f4f4f0;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.62rem;
    padding: 4px 7px;
    outline: none;

    &:focus {
      border-color: #d4ff33;
    }
  }
`;

const NodeKeycap = styled.button`
  min-width: 175px;
  padding: 7px 10px;
  background: ${({ $selected }) =>
    $selected ? 'rgba(212, 255, 51, 0.16)' : 'rgba(16, 19, 27, 0.94)'};
  border: 1px solid
    ${({ $selected }) =>
      $selected ? '#D4FF33' : 'rgba(244, 244, 240, 0.12)'};
  border-top: 2px solid ${({ $color }) => $color};
  color: #f4f4f0;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;
  clip-path: polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 0 100%);

  &:hover {
    border-color: #d4ff33;
    transform: translateY(-2px);
  }

  .n-top {
    display: flex;
    justify-content: space-between;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.56rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
  .n-host {
    font-size: 0.78rem;
    font-weight: 700;
    margin: 2px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .n-metrics {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.6rem;
    color: ${({ $color }) => $color};
    margin-bottom: 4px;
  }
  .n-bars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }
  .bar-track {
    height: 3px;
    background: rgba(244, 244, 240, 0.1);
    overflow: hidden;
    i {
      display: block;
      height: 100%;
    }
  }
`;

const DEMO_PROFILES = [
  { label: 'ADMIN_N2 // Vitor França', email: 'admin@ipojuca.pe.gov.br', pass: 'Admin@Rmm2026' },
  { label: 'TECH_N1 // Carlos Mendes', email: 'suporte@ipojuca.pe.gov.br', pass: 'Suporte@Rmm2026' },
  { label: 'VIEWER // Dra. Helena', email: 'gestao@ipojuca.pe.gov.br', pass: 'Gestao@Rmm2026' },
];

export default function App() {
  const [auth, setAuth] = useState({ token: null, user: null });
  const [selectedProfileIdx, setSelectedProfileIdx] = useState(0);
  const [units, setUnits] = useState([]);
  const [selectedUnitId, setSelectedUnitId] = useState(1);
  const [machines, setMachines] = useState([]);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [diagnostics, setDiagnostics] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [taskCatalog, setTaskCatalog] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [socketConnected, setSocketConnected] = useState(false);
  const [cameraMode, setCameraMode] = useState('ISO');
  const [searchQuery, setSearchQuery] = useState('');
  const [dockCollapsed, setDockCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem('rmm.dockCollapsed') === '1';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('rmm.dockCollapsed', dockCollapsed ? '1' : '0');
    } catch {
      /* armazenamento indisponível: mantém apenas em memória */
    }
  }, [dockCollapsed]);
  const [nowTimestamp, setNowTimestamp] = useState(Date.now());
  const [sceneLayers, setSceneLayers] = useState({
    furniture: true,
    network: true,
    labels: true,
    volumetric: true,
  });

  useEffect(() => {
    const timer = setInterval(() => setNowTimestamp(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLayer = (key) => {
    setSceneLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const loadAllData = useCallback(async (token, unitId, machineId) => {
    const [unitsRes, machinesRes, catalogRes, alertsRes] = await Promise.all([
      rmmApi.getUnits(token),
      rmmApi.getMachines(token, { unitId }),
      rmmApi.getTaskCatalog(token),
      rmmApi.getAlerts(token),
    ]);
    const loadedMachines = machinesRes.machines || [];
    setUnits(unitsRes.units || []);
    setMachines(loadedMachines);
    setTaskCatalog(catalogRes.tasks || []);
    setAlerts(alertsRes.alerts || []);

    const targetId =
      machineId && loadedMachines.some((m) => m.id === Number(machineId))
        ? machineId
        : loadedMachines[0]?.id || null;

    if (targetId) {
      const [diagRes, msgRes] = await Promise.all([
        rmmApi.getMachineDiagnostics(token, targetId),
        rmmApi.getMachineMessages(token, targetId).catch(() => ({ messages: [] })),
      ]);
      setDiagnostics(diagRes);
      setChatMessages(msgRes.messages || []);
    } else {
      setDiagnostics(null);
      setChatMessages([]);
    }
  }, []);

  useEffect(() => {
    let activeSocket = null;
    const profile = DEMO_PROFILES[selectedProfileIdx];

    rmmApi
      .login(profile.email, profile.pass)
      .then((res) => {
        setAuth({ token: res.token, user: res.user });
        loadAllData(res.token, selectedUnitId, selectedMachineId);

        activeSocket = connectDashboardSocket(res.token, {
          onConnect: () => setSocketConnected(true),
          onDisconnect: () => setSocketConnected(false),
          onMachineUpdated: (updatedMachine) => {
            setMachines((prev) => {
              const exists = prev.some((m) => m.id === updatedMachine.id);
              if (exists) {
                return prev.map((m) =>
                  m.id === updatedMachine.id ? updatedMachine : m
                );
              }
              return [...prev, updatedMachine];
            });
            setDiagnostics((prev) =>
              !prev || prev.machine?.id === updatedMachine.id
                ? { ...(prev || {}), machine: updatedMachine }
                : prev
            );
            rmmApi.getUnits(res.token).then((uRes) => setUnits(uRes.units || [])).catch(() => {});
          },
          onMachineDeleted: ({ id }) => {
            setMachines((prev) => prev.filter((m) => m.id !== Number(id)));
            setDiagnostics((prev) => (prev?.machine?.id === Number(id) ? null : prev));
            rmmApi.getUnits(res.token).then((uRes) => setUnits(uRes.units || [])).catch(() => {});
          },
          onAlertTriggered: (newAlert) => {
            setAlerts((prev) => [newAlert, ...prev.slice(0, 19)]);
          },
          onTaskUpdated: (updatedTask) => {
            const targetMachineId = updatedTask?.machine_id || selectedMachineId;
            if (updatedTask && updatedTask.machine_id) {
              setDiagnostics((prev) => {
                if (!prev || prev.machine?.id !== Number(updatedTask.machine_id)) {
                  return prev;
                }
                const prevTasks = prev.tasks || [];
                const exists = prevTasks.some((t) => t.task_id === updatedTask.task_id);
                const nextTasks = exists
                  ? prevTasks.map((t) => (t.task_id === updatedTask.task_id ? updatedTask : t))
                  : [updatedTask, ...prevTasks];
                return { ...prev, tasks: nextTasks };
              });
            }
            if (targetMachineId) {
              rmmApi
                .getMachineDiagnostics(res.token, targetMachineId)
                .then(setDiagnostics)
                .catch(() => {});
            }
          },
          onAgentMessage: (newMsg) => {
            setChatMessages((prev) => [...prev, newMsg]);
          },
        });
      })
      .catch((err) => console.error('Falha de autenticação:', err));

    return () => {
      if (activeSocket) activeSocket.close();
    };
  }, [selectedProfileIdx]);

  useEffect(() => {
    if (!auth.token) return;
    loadAllData(auth.token, selectedUnitId, selectedMachineId);
    const syncTimer = setInterval(() => {
      loadAllData(auth.token, selectedUnitId, selectedMachineId).catch(() => {});
    }, 12000);
    return () => clearInterval(syncTimer);
  }, [auth.token, selectedUnitId, selectedMachineId, loadAllData]);

  const activeUnit =
    units.find((u) => u.id === Number(selectedUnitId)) || units[0];
  const selectedMachine =
    machines.find((m) => m.id === Number(selectedMachineId)) || machines[0];

  const filteredMachines = useMemo(() => {
    if (!searchQuery.trim()) return machines;
    const q = searchQuery.toLowerCase();
    return machines.filter(
      (m) =>
        String(m.hostname || '').toLowerCase().includes(q) ||
        String(m.ip_address || '').toLowerCase().includes(q) ||
        String(m.sector_name || '').toLowerCase().includes(q)
    );
  }, [machines, searchQuery]);

  const totalSummary = units.reduce(
    (acc, u) => ({
      total: acc.total + (u.summary?.total || 0),
      NORMAL: acc.NORMAL + (u.summary?.NORMAL || 0),
      WARNING: acc.WARNING + (u.summary?.WARNING || 0),
      CRITICAL: acc.CRITICAL + (u.summary?.CRITICAL || 0),
      OFFLINE: acc.OFFLINE + (u.summary?.OFFLINE || 0),
    }),
    { total: 0, NORMAL: 0, WARNING: 0, CRITICAL: 0, OFFLINE: 0 }
  );

  async function handleDispatchTask(payload) {
    const res = await rmmApi.dispatchAuthorizedTask(auth.token, payload);
    await loadAllData(auth.token, selectedUnitId, payload.machineId);
    return res;
  }

  async function handleRefreshTelemetryNow(machineId) {
    const res = await rmmApi.refreshMachineTelemetryNow(auth.token, machineId);
    await loadAllData(auth.token, selectedUnitId, machineId);
    return res;
  }

  async function handleUpdateMachineAgent(machineId) {
    const res = await rmmApi.updateMachineAgent(auth.token, machineId);
    await loadAllData(auth.token, selectedUnitId, machineId);
    return res;
  }

  async function handleUpdateAllAgents() {
    const res = await rmmApi.updateAllAgents(auth.token);
    window.alert(res.message || 'Ordem de atualização enviada para todas as máquinas.');
    await loadAllData(auth.token, selectedUnitId, selectedMachineId);
    return res;
  }

  async function handleSendMessage(machineId, text) {
    const res = await rmmApi.sendMachineMessage(auth.token, machineId, text);
    await loadAllData(auth.token, selectedUnitId, machineId);
    return res;
  }

  async function handleUpdateLocation(machineId, { unitId, sectorId }) {
    const res = await rmmApi.updateMachineLocation(auth.token, machineId, { unitId, sectorId });
    setSelectedUnitId(Number(unitId));
    await loadAllData(auth.token, Number(unitId), machineId);
    return res;
  }

  async function handleDeleteMachine(machineId) {
    await rmmApi.deleteMachine(auth.token, machineId);
    setSelectedMachineId(null);
    await loadAllData(auth.token, selectedUnitId, null);
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {/* PALCO ESPACIAL 3D EM TELA CHEIA (100VW x 100VH) */}
      <DigitalTwin3D
        activeUnit={activeUnit}
        machines={machines}
        selectedMachine={selectedMachine}
        cameraMode={cameraMode}
        sceneLayers={sceneLayers}
        onUserOrbit={() => {
          if (cameraMode !== 'FREE') setCameraMode('FREE');
        }}
        onSelectMachine={(m) => {
          setSelectedMachineId(m.id);
          setCameraMode('FOCUS');
        }}
      />

      {/* CAMADA HUD TÁTICA FLUTUANTE */}
      <HudOverlay>
        <TopCommandDeck>
          <MastheadPod>
            <div>
              <div className="sys-tag">
                <LiveBeacon $online={socketConnected} />
                <span>
                  IPOJUCA.SPATIAL.OS v3.0 // 08°23&apos;56&quot;S 35°03&apos;50&quot;W
                </span>
              </div>
              <div className="brand-title">
                RMM Comando Biomédico &amp; Gêmeo Digital
              </div>
            </div>
          </MastheadPod>

          <UnitSwitcherPod>
            {units.map((u) => (
              <UnitSwitchBtn
                key={u.id}
                $active={u.id === Number(selectedUnitId)}
                onClick={() => {
                  setSelectedUnitId(u.id);
                  setSelectedMachineId(null);
                  setCameraMode('ISO');
                }}
              >
                <span className="u-code">
                  [{u.code}] • {u.summary?.total || 0} PC(S)
                </span>
                <span className="u-name">{fixTextEncoding(u.name)}</span>
              </UnitSwitchBtn>
            ))}
          </UnitSwitcherPod>

          <RightControlPod>
            <CamModeBtn
              $active={cameraMode === 'ISO'}
              onClick={() => setCameraMode('ISO')}
            >
              ISO 3D
            </CamModeBtn>
            <CamModeBtn
              $active={cameraMode === 'TOP'}
              onClick={() => setCameraMode('TOP')}
            >
              CAD TOPO
            </CamModeBtn>
            <CamModeBtn
              $active={cameraMode === 'FOCUS'}
              onClick={() => setCameraMode('FOCUS')}
            >
              FOCO ESTAÇÃO
            </CamModeBtn>
            <CamModeBtn
              $active={cameraMode === 'ORBIT'}
              onClick={() =>
                setCameraMode((prev) => (prev === 'ORBIT' ? 'ISO' : 'ORBIT'))
              }
              title="Giro orbital cinematográfico automático ao redor da Unidade de Saúde"
            >
              ORBITAL 360°
            </CamModeBtn>

            <CamModeBtn
              as="a"
              href="/IpojucaRMM-Setup.exe"
              download="IpojucaRMM-Setup.exe"
              style={{
                textDecoration: 'none',
                borderColor: 'rgba(16, 185, 129, 0.55)',
                color: '#10B981',
                background: 'rgba(16, 185, 129, 0.12)',
              }}
              title="Baixar o instalador executável (.exe) para instalar o Agente Windows em segundo plano em qualquer PC"
            >
              ⬇ AGENTE (.EXE)
            </CamModeBtn>

            {auth.user?.role === 'ADMIN_N2' && (
              <CamModeBtn
                onClick={handleUpdateAllAgents}
                style={{
                  borderColor: 'rgba(0, 229, 255, 0.55)',
                  color: '#00E5FF',
                  background: 'rgba(0, 229, 255, 0.12)',
                }}
                title="Enviar atualização automática (OTA) do Agente para todas as máquinas cadastradas na rede"
              >
                ⬆ ATUALIZAR TODOS
              </CamModeBtn>
            )}

            <RoleSelect
              value={selectedProfileIdx}
              onChange={(e) => setSelectedProfileIdx(Number(e.target.value))}
            >
              {DEMO_PROFILES.map((p, idx) => (
                <option key={p.email} value={idx}>
                  {p.label}
                </option>
              ))}
            </RoleSelect>
          </RightControlPod>
        </TopCommandDeck>

        <MiddleWorkspace>
          <LeftRadarColumn>
            <RadarCard>
              <div className="card-tag">
                <span>MATRIZ GLOBAL DA REDE</span>
                <span>[{totalSummary.total} ESTAÇÕES]</span>
              </div>
              <KpiMatrix>
                <KpiCell $color={theme.colors.status.NORMAL}>
                  <div className="num">{totalSummary.NORMAL}</div>
                  <div className="lbl">ONLINE</div>
                </KpiCell>
                <KpiCell $color={theme.colors.status.WARNING}>
                  <div className="num">{totalSummary.WARNING}</div>
                  <div className="lbl">ATENÇÃO</div>
                </KpiCell>
                <KpiCell $color={theme.colors.status.CRITICAL}>
                  <div className="num">{totalSummary.CRITICAL}</div>
                  <div className="lbl">CRÍTICO</div>
                </KpiCell>
                <KpiCell $color={theme.colors.status.OFFLINE}>
                  <div className="num">{totalSummary.OFFLINE}</div>
                  <div className="lbl">OFFLINE</div>
                </KpiCell>
              </KpiMatrix>
            </RadarCard>

            <RadarCard>
              <div className="card-tag">
                <span>CAMADAS HOLOGRÁFICAS 3D</span>
                <span style={{ color: '#00E5FF' }}>BIO-CAD</span>
              </div>
              <LayerToggleGrid>
                <LayerChip
                  $on={sceneLayers.furniture}
                  onClick={() => toggleLayer('furniture')}
                >
                  <span>MOBILIÁRIO</span>
                  <span>{sceneLayers.furniture ? 'ON' : 'OFF'}</span>
                </LayerChip>
                <LayerChip
                  $on={sceneLayers.network}
                  onClick={() => toggleLayer('network')}
                >
                  <span>FIBRA GPON</span>
                  <span>{sceneLayers.network ? 'ON' : 'OFF'}</span>
                </LayerChip>
                <LayerChip
                  $on={sceneLayers.labels}
                  onClick={() => toggleLayer('labels')}
                >
                  <span>HUD 3D</span>
                  <span>{sceneLayers.labels ? 'ON' : 'OFF'}</span>
                </LayerChip>
                <LayerChip
                  $on={sceneLayers.volumetric}
                  onClick={() => toggleLayer('volumetric')}
                >
                  <span>LUZ VOLUM.</span>
                  <span>{sceneLayers.volumetric ? 'ON' : 'OFF'}</span>
                </LayerChip>
              </LayerToggleGrid>
            </RadarCard>

            <RadarCard>
              <div className="card-tag">
                <span>PLANTA ARQUITETÔNICA</span>
                <span>{(activeUnit?.sectors || []).length} SETORES</span>
              </div>
              {(activeUnit?.sectors || []).map((sec) => {
                const secNodes = machines.filter(
                  (m) => Number(m.sector_id) === Number(sec.id)
                );
                const hasCrit = secNodes.some((m) => m.health_status === 'CRITICAL');
                const accent = hasCrit
                  ? theme.colors.status.CRITICAL
                  : secNodes.length > 0
                    ? theme.colors.status.NORMAL
                    : '#3a4256';
                return (
                  <SectorMiniRow key={sec.id} $accent={accent}>
                    <div>
                      <div className="s-name">{fixTextEncoding(sec.name)}</div>
                      <div className="s-meta">[{sec.code}]</div>
                    </div>
                    <span className="s-meta">{secNodes.length} PC(S)</span>
                  </SectorMiniRow>
                );
              })}
            </RadarCard>

            <RadarCard>
              <div className="card-tag">
                <span>DESPACHOS AUTÔNOMOS N8N</span>
                <span style={{ color: '#D4FF33' }}>WHATSAPP LIVE</span>
              </div>
              {alerts.length === 0 && (
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.6rem',
                    color: '#7E8494',
                  }}
                >
                  NENHUM INCIDENTE ATIVO NA REDE.
                </div>
              )}
              {alerts.slice(0, 3).map((a) => (
                <IncidentItem
                  key={a.id}
                  onClick={() => {
                    const targetMachine = machines.find(
                      (m) => m.id === a.machine_id
                    );
                    if (targetMachine) {
                      setSelectedMachineId(targetMachine.id);
                      setCameraMode('FOCUS');
                    }
                  }}
                >
                  <div className="tck">
                    <span>#{a.external_ticket_id || `INC-${a.id}`}</span>
                    <span>{a.hostname}</span>
                  </div>
                  <div className="msg">{a.message}</div>
                </IncidentItem>
              ))}
            </RadarCard>
          </LeftRadarColumn>

          <DiagnosticDrawer
            diagnostics={diagnostics}
            units={units}
            chatMessages={chatMessages}
            taskCatalog={taskCatalog}
            currentUser={auth.user || { name: 'Operador', role: 'ADMIN_N2' }}
            onDispatchTask={handleDispatchTask}
            onRefreshTelemetryNow={handleRefreshTelemetryNow}
            onUpdateMachineAgent={handleUpdateMachineAgent}
            onSendMessage={handleSendMessage}
            onUpdateLocation={handleUpdateLocation}
            onDeleteMachine={handleDeleteMachine}
            onFocusCamera={() => setCameraMode('FOCUS')}
          />
        </MiddleWorkspace>

        <DockShell>
        <DockToggleBtn
          type="button"
          $collapsed={dockCollapsed}
          onClick={() => setDockCollapsed((prev) => !prev)}
          aria-expanded={!dockCollapsed}
          aria-controls="rmm-bottom-dock"
          aria-label={dockCollapsed ? 'Expandir lista de computadores' : 'Recolher lista de computadores'}
          title={dockCollapsed ? 'Expandir lista de computadores' : 'Recolher lista de computadores'}
        >
          <span className="arrow" aria-hidden="true">▼</span>
          {dockCollapsed && <span>{machines.length} PCs</span>}
        </DockToggleBtn>
        <BottomMatrixDock id="rmm-bottom-dock" $collapsed={dockCollapsed} aria-hidden={dockCollapsed}>
          <DockControlsBlock>
            <span className="dock-title">
              DOCK // {activeUnit?.code || 'UNIDADE'} ({filteredMachines.length})
            </span>
            <input
              className="dock-search"
              type="text"
              placeholder="Filtrar Hostname, IP ou Setor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </DockControlsBlock>

          {filteredMachines.length === 0 && (
            <div
              style={{
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: '0.68rem',
                color: '#8A90A2',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span>
                [NENHUMA MÁQUINA REGISTRADA NESTA UNIDADE — INSTALE O AGENTE (.EXE) NO PC]
              </span>
              <a
                href="/IpojucaRMM-Setup.exe"
                download="IpojucaRMM-Setup.exe"
                style={{
                  color: '#10B981',
                  textDecoration: 'underline',
                  fontWeight: 600,
                }}
              >
                ⬇ Baixar IpojucaRMM-Setup.exe
              </a>
            </div>
          )}

          {filteredMachines.map((m, idx) => {
            const stColor =
              theme.colors.status[m.health_status] || theme.colors.status.NORMAL;
            const isSel = selectedMachine?.id === m.id;
            const cpu = Math.min(100, Math.max(0, Number(m.cpu_usage_pct || 0)));
            const ram = Math.min(100, Math.max(0, Number(m.ram_usage_pct || 0)));
            const dsk = Math.min(100, Math.max(0, Number(m.disk_usage_pct || 0)));
            const idleSec = Math.max(0, Math.floor(Number(m.idle_seconds || 0)));
            const isLegacy = Boolean(m.agent_version) && !m.agent_version.startsWith('2.3');
            const offSec = m.last_seen_at
              ? Math.max(0, Math.floor((nowTimestamp - new Date(m.last_seen_at).getTime()) / 1000))
              : 0;
            const fmtShort = (s) => {
              if (s < 60) return `${s}s`;
              const mins = Math.floor(s / 60);
              if (mins < 60) return `${mins}m`;
              const hrs = Math.floor(mins / 60);
              if (hrs < 24) return `${hrs}h ${mins % 60}m`;
              return `${Math.floor(hrs / 24)}d ${hrs % 24}h`;
            };
            const activityLabel =
              m.health_status === 'OFFLINE'
                ? `🔌 Desligado há ${fmtShort(offSec)}`
                : isLegacy
                  ? `⚡ Ativo (${m.agent_version || '2.2.0'})`
                  : idleSec < 180
                    ? `🟢 Em uso (${fmtShort(idleSec)})`
                    : `⏳ Ocioso há ${fmtShort(idleSec)}`;

            return (
              <NodeKeycap
                key={m.id}
                $selected={isSel}
                $color={stColor}
                onClick={() => {
                  setSelectedMachineId(m.id);
                  setCameraMode('FOCUS');
                }}
              >
                <div className="n-top">
                  <span>
                    [0{idx + 1}] {m.sector_code}
                  </span>
                  <span>{STATUS_LABELS[m.health_status]}</span>
                </div>
                <div className="n-host">
                  <span>{m.hostname}</span>
                  <span
                    style={{
                      fontSize: '0.56rem',
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: m.spooler_running ? '#00F5A0' : '#FF2A54',
                    }}
                  >
                    {m.spooler_running ? 'PRN:OK' : 'PRN:ERR'}
                  </span>
                </div>
                <div className="n-metrics">
                  CPU {cpu.toFixed(0)}% • RAM {ram.toFixed(0)}% • {m.ip_address}
                </div>
                <div
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: '0.58rem',
                    color:
                      m.health_status === 'OFFLINE'
                        ? '#EF4444'
                        : idleSec < 180
                          ? '#10B981'
                          : '#F59E0B',
                    marginBottom: '4px',
                    fontWeight: 600,
                  }}
                >
                  {activityLabel}
                </div>
                <div className="n-bars">
                  <div className="bar-track" title={`CPU: ${cpu.toFixed(0)}%`}>
                    <i style={{ width: `${cpu}%`, background: '#00F5A0' }} />
                  </div>
                  <div className="bar-track" title={`RAM: ${ram.toFixed(0)}%`}>
                    <i style={{ width: `${ram}%`, background: '#00E5FF' }} />
                  </div>
                  <div className="bar-track" title={`Disco: ${dsk.toFixed(0)}%`}>
                    <i style={{ width: `${dsk}%`, background: stColor }} />
                  </div>
                </div>
              </NodeKeycap>
            );
          })}
        </BottomMatrixDock>
        </DockShell>
      </HudOverlay>
    </ThemeProvider>
  );
}
