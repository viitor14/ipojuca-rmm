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
  align-items: center;
  gap: 12px;
  pointer-events: none;
  flex-wrap: wrap;
`;

const MastheadPod = styled.div`
  pointer-events: auto;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  padding: 8px 14px;
  display: flex;
  align-items: center;
  gap: 12px;

  .brand-group {
    display: flex;
    flex-direction: column;
  }

  .brand-title {
    font-size: 0.88rem;
    font-weight: 700;
    color: #242925;
    letter-spacing: -0.01em;
  }

  .brand-sub {
    font-size: 0.68rem;
    color: #737b75;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-top: 1px;
  }
`;

const LiveBeacon = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${({ $online }) => ($online ? '#2D6A4F' : '#D97706')};
  display: inline-block;
  animation: ${pulseDot} 2s infinite;
`;

const UnitSwitcherPod = styled.div`
  pointer-events: auto;
  display: flex;
  gap: 4px;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
`;

const UnitSwitchBtn = styled.button`
  background: ${({ $active }) => ($active ? '#ECEFEB' : 'transparent')};
  color: ${({ $active }) => ($active ? '#242925' : '#737B75')};
  border: 1px solid ${({ $active }) => ($active ? '#CBD3CB' : 'transparent')};
  border-radius: 6px;
  padding: 5px 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.15s ease;

  &:hover {
    color: #242925;
    background: #f4f5f2;
  }

  .u-code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.58rem;
    font-weight: 700;
    color: #52796b;
    display: block;
  }

  .u-name {
    font-size: 0.74rem;
    font-weight: 600;
    display: block;
    margin-top: 1px;
  }
`;

const RightControlPod = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  padding: 4px 8px;
`;

const CamModeBtn = styled.button`
  padding: 6px 10px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  border-radius: 6px;
  background: ${({ $active }) => ($active ? '#ECEFEB' : 'transparent')};
  color: ${({ $active }) => ($active ? '#242925' : '#737B75')};
  border: 1px solid ${({ $active }) => ($active ? '#CBD3CB' : 'transparent')};
  transition: all 0.15s ease;

  &:hover {
    color: #242925;
    background: #f4f5f2;
  }
`;

const RoleSelect = styled.select`
  background: #f4f5f2;
  color: #242925;
  border: 1px solid #e4e8e3;
  border-radius: 6px;
  padding: 5px 8px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  outline: none;

  &:focus {
    border-color: #52796b;
  }
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
  width: 290px;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  padding: 12px 14px;

  .card-tag {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    color: #737b75;
    text-transform: uppercase;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const KpiMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 6px;
`;

const KpiCell = styled.div`
  background: #f8faf8;
  border: 1px solid #e4e8e3;
  border-radius: 6px;
  padding: 6px 4px;
  text-align: center;

  .num {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 1.05rem;
    font-weight: 700;
    color: ${({ $color }) => $color};
    line-height: 1.1;
  }
  .lbl {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.58rem;
    font-weight: 600;
    color: #737b75;
    margin-top: 2px;
  }
`;

const LayerToggleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px;
`;

const LayerChip = styled.button`
  padding: 6px 8px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.66rem;
  font-weight: 600;
  border-radius: 6px;
  cursor: pointer;
  background: ${({ $on }) => ($on ? '#ECEFEB' : '#FFFFFF')};
  color: ${({ $on }) => ($on ? '#242925' : '#737B75')};
  border: 1px solid ${({ $on }) => ($on ? '#CBD3CB' : '#E4E8E3')};
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.15s ease;

  &:hover {
    background: #f4f5f2;
    color: #242925;
  }
`;

const SectorMiniRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 8px;
  background: ${({ $selected }) => ($selected ? '#ECEFEB' : '#f8faf8')};
  border: 1px solid ${({ $selected }) => ($selected ? '#52796B' : '#e4e8e3')};
  border-radius: 6px;
  margin-bottom: 5px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.7rem;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $selected }) => ($selected ? '#E2E6E1' : '#f0f3ef')};
    border-color: #52796b;
  }

  .s-name {
    color: #242925;
    font-weight: 600;
  }
  .s-meta {
    color: #737b75;
    font-size: 0.64rem;
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
  height: 24px;
  padding: 0 16px;
  margin-bottom: -1px;
  background: #ffffff;
  color: #52796b;
  border: 1px solid #e4e8e3;
  border-bottom: ${({ $collapsed }) =>
    $collapsed ? '1px solid #e4e8e3' : '1px solid transparent'};
  border-radius: 6px 6px 0 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.03);
  transition: all 0.15s ease;

  .arrow {
    display: inline-block;
    font-size: 0.72rem;
    transition: transform 0.25s ease;
    transform: rotate(${({ $collapsed }) => ($collapsed ? '180deg' : '0deg')});
  }

  &:hover {
    background: #f8faf8;
    color: #242925;
  }
`;

const BottomMatrixDock = styled.footer`
  pointer-events: auto;
  align-self: stretch;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  padding: ${({ $collapsed }) => ($collapsed ? '0 14px' : '10px 14px')};
  max-height: ${({ $collapsed }) => ($collapsed ? '0px' : '195px')};
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
  gap: 5px;
  padding-right: 12px;
  border-right: 1px solid #e4e8e3;
  min-width: 190px;

  .dock-title {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.72rem;
    font-weight: 700;
    color: #242925;
    white-space: nowrap;
  }

  .dock-search {
    background: #f4f5f2;
    border: 1px solid #e4e8e3;
    border-radius: 6px;
    color: #242925;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.7rem;
    padding: 5px 8px;
    outline: none;

    &:focus {
      border-color: #52796b;
      background: #ffffff;
    }
  }
`;

const NodeKeycap = styled.button`
  min-width: 175px;
  padding: 8px 11px;
  background: ${({ $selected }) => ($selected ? '#F2F6F4' : '#FFFFFF')};
  border: 1px solid ${({ $selected }) => ($selected ? '#52796B' : '#E4E8E3')};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
  color: #242925;
  text-align: left;
  cursor: pointer;
  transition: all 0.15s ease;

  &:hover {
    border-color: #52796b;
    transform: translateY(-1px);
  }

  .n-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.64rem;
    color: #737b75;
    font-weight: 600;
  }

  .n-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    display: inline-block;
    margin-right: 4px;
  }

  .n-host {
    font-size: 0.8rem;
    font-weight: 700;
    color: #242925;
    margin: 3px 0 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .n-metrics {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.64rem;
    color: #737b75;
    margin-bottom: 5px;
  }

  .n-bars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }

  .bar-track {
    height: 3px;
    background: #e4e8e3;
    border-radius: 2px;
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
  const [selectedSectorId, setSelectedSectorId] = useState(null);
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
    labels: true,
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
  const selectedSector = useMemo(
    () => (activeUnit?.sectors || []).find((s) => s.id === Number(selectedSectorId)) || null,
    [activeUnit, selectedSectorId]
  );

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

      {/* MAQUETE 3D ISOMÉTRICA EM TELA CHEIA (ESTILO HABBLAUDE) */}
      <DigitalTwin3D
        activeUnit={activeUnit}
        machines={machines}
        selectedMachine={selectedMachine}
        selectedSector={selectedSector}
        cameraMode={cameraMode}
        sceneLayers={sceneLayers}
        onUserOrbit={() => {
          if (cameraMode !== 'FREE') setCameraMode('FREE');
        }}
        onSelectMachine={(m) => {
          setSelectedMachineId(m.id);
          setSelectedSectorId(null);
          setCameraMode('FOCUS');
        }}
      />

      {/* INTERFACE ADMINISTRATIVA EDITORIAL MINIMALISTA */}
      <HudOverlay>
        <TopCommandDeck>
          <MastheadPod>
            <div className="brand-group">
              <div className="brand-title">RMM // Saúde Ipojuca</div>
              <div className="brand-sub">
                <LiveBeacon $online={socketConnected} />
                <span>Gêmeo Digital &amp; Telemetria</span>
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
                  setSelectedSectorId(null);
                  setCameraMode('ISO');
                }}
              >
                <span className="u-code">[{u.code}] • {u.summary?.total || 0} PCs</span>
                <span className="u-name">{fixTextEncoding(u.name)}</span>
              </UnitSwitchBtn>
            ))}
          </UnitSwitcherPod>

          <RightControlPod>
            <CamModeBtn
              $active={cameraMode === 'ISO'}
              onClick={() => {
                setSelectedSectorId(null);
                setCameraMode('ISO');
              }}
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
              FOCO
            </CamModeBtn>
            <CamModeBtn
              $active={cameraMode === 'ORBIT'}
              onClick={() =>
                setCameraMode((prev) => (prev === 'ORBIT' ? 'ISO' : 'ORBIT'))
              }
              title="Giro orbital suave ao redor da maquete"
            >
              360°
            </CamModeBtn>

            <CamModeBtn
              as="a"
              href="/IpojucaRMM-Setup.exe"
              download="IpojucaRMM-Setup.exe"
              style={{
                textDecoration: 'none',
                color: '#52796B',
                background: 'rgba(82, 121, 107, 0.1)',
                fontWeight: 700,
              }}
              title="Baixar instalador do Agente Windows (.exe)"
            >
              ↓ AGENTE (.EXE)
            </CamModeBtn>

            {auth.user?.role === 'ADMIN_N2' && (
              <CamModeBtn
                onClick={handleUpdateAllAgents}
                style={{
                  color: '#2D6A4F',
                  background: 'rgba(45, 106, 79, 0.08)',
                  fontWeight: 700,
                }}
                title="Atualizar agentes via OTA"
              >
                ↑ ATUALIZAR TODOS
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
                <span>REDE GLOBAL</span>
                <span>{totalSummary.total} ESTAÇÕES</span>
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
                <span>CAMADAS DA MAQUETE</span>
              </div>
              <LayerToggleGrid>
                <LayerChip
                  $on={sceneLayers.furniture}
                  onClick={() => toggleLayer('furniture')}
                >
                  <span>Mobiliário</span>
                  <span>{sceneLayers.furniture ? 'Ligado' : 'Desl.'}</span>
                </LayerChip>
                <LayerChip
                  $on={sceneLayers.labels}
                  onClick={() => toggleLayer('labels')}
                >
                  <span>Rótulos</span>
                  <span>{sceneLayers.labels ? 'Ligado' : 'Desl.'}</span>
                </LayerChip>
              </LayerToggleGrid>
            </RadarCard>

            <RadarCard>
              <div className="card-tag">
                <span>SETORES DA UNIDADE</span>
                {selectedSectorId ? (
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedSectorId(null);
                      setCameraMode('ISO');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#52796B',
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      padding: 0,
                    }}
                    title="Voltar para a visão geral da maquete"
                  >
                    ↺ Visão Geral
                  </button>
                ) : (
                  <span>{(activeUnit?.sectors || []).length}</span>
                )}
              </div>
              {(activeUnit?.sectors || []).map((sec) => {
                const secNodes = machines.filter(
                  (m) => Number(m.sector_id) === Number(sec.id)
                );
                const isSecSelected = selectedSectorId === sec.id;
                return (
                  <SectorMiniRow
                    key={sec.id}
                    $selected={isSecSelected}
                    onClick={() => {
                      if (isSecSelected) {
                        setSelectedSectorId(null);
                        setCameraMode('ISO');
                      } else {
                        setSelectedSectorId(sec.id);
                        setCameraMode('SECTOR');
                      }
                    }}
                    title={`Aproximar câmera no setor ${fixTextEncoding(sec.name)}`}
                  >
                    <div>
                      <div className="s-name">{fixTextEncoding(sec.name)}</div>
                      <div className="s-meta">[{sec.code}]</div>
                    </div>
                    <span className="s-meta">{secNodes.length} PC(S)</span>
                  </SectorMiniRow>
                );
              })}
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
            <span>{dockCollapsed ? `${machines.length} PCs da Unidade` : 'Ocultar Barra'}</span>
          </DockToggleBtn>

          <BottomMatrixDock id="rmm-bottom-dock" $collapsed={dockCollapsed} aria-hidden={dockCollapsed}>
            <DockControlsBlock>
              <span className="dock-title">
                {activeUnit?.code || 'UNIDADE'} — {filteredMachines.length} ESTAÇÕES
              </span>
              <input
                className="dock-search"
                type="text"
                placeholder="Filtrar Hostname, IP..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </DockControlsBlock>

            {filteredMachines.length === 0 && (
              <div
                style={{
                  fontSize: '0.72rem',
                  color: '#737B75',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span>Nenhuma máquina cadastrada nesta unidade.</span>
                <a
                  href="/IpojucaRMM-Setup.exe"
                  download="IpojucaRMM-Setup.exe"
                  style={{
                    color: '#52796B',
                    textDecoration: 'underline',
                    fontWeight: 600,
                  }}
                >
                  Baixar Agente (.exe)
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
                  ? `Desligado há ${fmtShort(offSec)}`
                  : isLegacy
                    ? `Ativo (${m.agent_version || '2.2.0'})`
                    : idleSec < 180
                      ? `Em uso (${fmtShort(idleSec)})`
                      : `Ocioso há ${fmtShort(idleSec)}`;

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
                      <i className="n-dot" />
                      {m.sector_code}
                    </span>
                    <span>{STATUS_LABELS[m.health_status]}</span>
                  </div>
                  <div className="n-host">
                    <span>{m.hostname}</span>
                    <span
                      style={{
                        fontSize: '0.62rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        color: m.spooler_running ? '#2D6A4F' : '#DC2626',
                      }}
                    >
                      {m.spooler_running ? 'PRN:OK' : 'PRN:OFF'}
                    </span>
                  </div>
                  <div className="n-metrics">
                    CPU {cpu.toFixed(0)}% • RAM {ram.toFixed(0)}% • {m.ip_address}
                  </div>
                  <div
                    style={{
                      fontSize: '0.64rem',
                      color:
                        m.health_status === 'OFFLINE'
                          ? '#718096'
                          : idleSec < 180
                            ? '#2D6A4F'
                            : '#D97706',
                      marginBottom: '5px',
                      fontWeight: 600,
                    }}
                  >
                    {activityLabel}
                  </div>
                  <div className="n-bars">
                    <div className="bar-track" title={`CPU: ${cpu.toFixed(0)}%`}>
                      <i style={{ width: `${cpu}%`, background: '#2D6A4F' }} />
                    </div>
                    <div className="bar-track" title={`RAM: ${ram.toFixed(0)}%`}>
                      <i style={{ width: `${ram}%`, background: '#52796B' }} />
                    </div>
                    <div className="bar-track" title={`Disco: ${dsk.toFixed(0)}%`}>
                      <i style={{ width: `${dsk}%`, background: '#718096' }} />
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
