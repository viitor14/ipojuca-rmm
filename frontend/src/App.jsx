import React, { Suspense, lazy, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import styled, { ThemeProvider, keyframes } from 'styled-components';
import { theme, STATUS_LABELS, fixTextEncoding, isAgentOutdated } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { rmmApi, connectDashboardSocket } from './services/api';
import { PixelArtTwin } from './components/PixelArtTwin';
import { LoginScreen } from './components/LoginScreen';
import { getReceptionVariant } from './components/twin/receptionThemes';
import { DiagnosticDrawer } from './components/DiagnosticDrawer';
import { UnitSectorManagerModal } from './components/UnitSectorManagerModal';

const DigitalTwin3D = lazy(() =>
  import('./components/DigitalTwin3D').then((m) => ({ default: m.DigitalTwin3D }))
);
const ModelShowcase = lazy(() => import('./components/twin/ModelShowcase'));

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
  flex-direction: column;
  align-items: stretch;
  gap: 8px;
  pointer-events: none;
`;

const TopHeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  pointer-events: none;
  flex-wrap: wrap;
`;

const CenterControlShell = styled.div`
  align-self: center;
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 4px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(10px);
  border: 1px solid #e4e8e3;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  padding: ${({ $collapsed }) => ($collapsed ? '4px 10px' : '5px 8px')};
  max-width: 100%;
  transition: all 0.2s ease;
`;

const ControlDivider = styled.span`
  width: 1px;
  height: 18px;
  background: #e4e8e3;
  margin: 0 3px;
  display: inline-block;
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
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  max-width: 100%;
`;

const UnitActionBtn = styled.button`
  background: ${({ $tone }) =>
    $tone === 'primary' ? 'rgba(82, 121, 107, 0.12)' : '#f4f5f2'};
  color: ${({ $tone }) => ($tone === 'primary' ? '#2D6A4F' : '#52796B')};
  border: 1px solid
    ${({ $tone }) => ($tone === 'primary' ? 'rgba(82, 121, 107, 0.35)' : '#e4e8e3')};
  border-radius: 6px;
  padding: 6px 10px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;

  &:hover {
    background: ${({ $tone }) =>
      $tone === 'primary' ? 'rgba(82, 121, 107, 0.2)' : '#ecefeb'};
    color: #242925;
  }
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

const UserSessionPod = styled.div`
  pointer-events: auto;
  display: flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
  padding: 4px 6px;
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

const UserSessionPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: #f4f5f2;
  border: 1px solid #e4e8e3;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.68rem;
  color: #242925;

  .u-role {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.6rem;
    font-weight: 700;
    color: #52796b;
  }

  .u-logout {
    background: #ffffff;
    border: 1px solid #cbd3cb;
    border-radius: 4px;
    padding: 2px 7px;
    font-size: 0.64rem;
    font-weight: 700;
    color: #737b75;
    cursor: pointer;

    &:hover {
      border-color: #dc2626;
      color: #dc2626;
      background: #fef2f2;
    }
  }
`;

const AlertMiniRow = styled.div`
  padding: 6px 8px;
  border-radius: 6px;
  background: ${({ $severity }) =>
    $severity === 'CRITICAL' ? '#FEF2F2' : '#FFFBEB'};
  border: 1px solid
    ${({ $severity }) => ($severity === 'CRITICAL' ? '#FECACA' : '#FDE68A')};
  margin-bottom: 5px;
  font-size: 0.68rem;
  line-height: 1.35;

  .a-top {
    display: flex;
    justify-content: space-between;
    font-weight: 700;
    color: ${({ $severity }) =>
      $severity === 'CRITICAL' ? '#991B1B' : '#92400E'};
  }

  .a-msg {
    color: #3f4741;
    margin-top: 2px;
  }

  .a-meta {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.6rem;
    color: #737b75;
    margin-top: 2px;
  }
`;

const ConfirmBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(36, 41, 37, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`;

const ConfirmCard = styled.div`
  width: 100%;
  max-width: 460px;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 10px;
  padding: 18px 20px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.14);
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: ${({ theme }) => theme.fonts.sans};
  color: #242925;
`;

const StageFallback = styled.div`
  position: fixed;
  inset: 0;
  background: #eaece8;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.8rem;
  color: #52796b;
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
  gap: 6px;
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
  .s-right {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-shrink: 0;
  }
`;

const InlineMiniBtn = styled.button`
  background: #ffffff;
  border: 1px solid #d6dcd6;
  color: ${({ $danger }) => ($danger ? '#DC2626' : '#52796B')};
  border-radius: 4px;
  width: 20px;
  height: 20px;
  font-size: 0.66rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: all 0.12s ease;

  &:hover {
    background: ${({ $danger }) => ($danger ? '#FEF2F2' : '#ECEFEB')};
    border-color: ${({ $danger }) => ($danger ? '#DC2626' : '#52796B')};
  }
`;

const CardAddChipBtn = styled.button`
  background: rgba(82, 121, 107, 0.12);
  border: 1px solid rgba(82, 121, 107, 0.35);
  color: #2d6a4f;
  border-radius: 5px;
  padding: 2px 7px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.62rem;
  font-weight: 700;
  cursor: pointer;
  text-transform: none;
  letter-spacing: 0;

  &:hover {
    background: rgba(82, 121, 107, 0.22);
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

const INACTIVITY_ALERT_SECONDS = 86400; // 24 horas

function getInactivityInfo(machine, nowMs) {
  if (!machine) return { isInactive24h: false, mode: null, seconds: 0 };
  const isOffline = machine.health_status === 'OFFLINE';
  const offSec = machine.last_seen_at
    ? Math.max(0, Math.floor((nowMs - new Date(machine.last_seen_at).getTime()) / 1000))
    : 0;
  const idleSec = Math.max(0, Math.floor(Number(machine.idle_seconds || 0)));

  if (isOffline && offSec >= INACTIVITY_ALERT_SECONDS) {
    return { isInactive24h: true, mode: 'OFFLINE', seconds: offSec };
  }
  if (!isOffline && idleSec >= INACTIVITY_ALERT_SECONDS) {
    return { isInactive24h: true, mode: 'IDLE', seconds: idleSec };
  }
  return { isInactive24h: false, mode: null, seconds: isOffline ? offSec : idleSec };
}

function formatShortDuration(totalSeconds) {
  const s = Math.max(0, Math.floor(Number(totalSeconds || 0)));
  if (s < 60) return `${s}s`;
  const mins = Math.floor(s / 60);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ${mins % 60}m`;
  return `${Math.floor(hrs / 24)}d ${hrs % 24}h`;
}

const AUTH_TOKEN_KEY = 'rmm.authToken';

function readSavedToken() {
  try {
    return window.sessionStorage.getItem(AUTH_TOKEN_KEY) || null;
  } catch {
    return null;
  }
}

function saveSessionToken(token) {
  try {
    if (token) {
      window.sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      window.sessionStorage.removeItem(AUTH_TOKEN_KEY);
    }
  } catch {
    /* sessionStorage indisponível */
  }
}

export default function App() {
  // Cena isolada de homologacao: /?showcase=1&angle=iso|front|close
  const showcase = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('showcase') !== '1') return null;
    return { angle: params.get('angle') || 'iso' };
  }, []);

  if (showcase) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Suspense fallback={<StageFallback>Carregando cena de homologação 3D...</StageFallback>}>
          <ModelShowcase angle={showcase.angle} />
        </Suspense>
      </ThemeProvider>
    );
  }

  return <DashboardApp />;
}

function DashboardApp() {
  const [auth, setAuth] = useState({ token: null, user: null, checking: true });
  const [sessionNotice, setSessionNotice] = useState('');
  const [updateAllConfirm, setUpdateAllConfirm] = useState({ open: false, busy: false, resultMsg: '' });
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
  const [twinMode, setTwinMode] = useState('PIXEL');
  const [topControlsCollapsed, setTopControlsCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem('rmm.topControlsCollapsed') === '1';
    } catch {
      return false;
    }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [dockCollapsed, setDockCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem('rmm.dockCollapsed') === '1';
    } catch {
      return false;
    }
  });

  const selectedUnitIdRef = useRef(selectedUnitId);
  const selectedMachineIdRef = useRef(selectedMachineId);

  useEffect(() => {
    selectedUnitIdRef.current = selectedUnitId;
  }, [selectedUnitId]);

  useEffect(() => {
    selectedMachineIdRef.current = selectedMachineId;
  }, [selectedMachineId]);

  useEffect(() => {
    try {
      window.localStorage.setItem('rmm.dockCollapsed', dockCollapsed ? '1' : '0');
    } catch {
      /* armazenamento indisponível: mantém apenas em memória */
    }
  }, [dockCollapsed]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'rmm.topControlsCollapsed',
        topControlsCollapsed ? '1' : '0'
      );
    } catch {
      /* armazenamento indisponível */
    }
  }, [topControlsCollapsed]);

  const [nowTimestamp, setNowTimestamp] = useState(Date.now());
  const [sceneLayers, setSceneLayers] = useState({
    furniture: true,
    labels: true,
  });
  const [managerModal, setManagerModal] = useState({
    isOpen: false,
    mode: 'CREATE_UNIT',
    targetSector: null,
  });

  const handleLogout = useCallback((notice = '') => {
    saveSessionToken(null);
    setAuth({ token: null, user: null, checking: false });
    setSocketConnected(false);
    setUnits([]);
    setMachines([]);
    setDiagnostics(null);
    setChatMessages([]);
    setAlerts([]);
    setSessionNotice(notice);
  }, []);

  const handleLoginSubmit = useCallback(async (email, password) => {
    const res = await rmmApi.login(email, password);
    saveSessionToken(res.token);
    setSessionNotice('');
    setAuth({ token: res.token, user: res.user, checking: false });
    return res;
  }, []);

  // Restaura sessão válida a partir de sessionStorage via GET /api/auth/me
  useEffect(() => {
    const saved = readSavedToken();
    if (!saved) {
      setAuth({ token: null, user: null, checking: false });
      return;
    }
    rmmApi
      .getMe(saved)
      .then((res) => {
        setAuth({ token: saved, user: res.user, checking: false });
      })
      .catch(() => {
        saveSessionToken(null);
        setAuth({ token: null, user: null, checking: false });
      });
  }, []);

  const canManageStructure =
    auth.user?.role === 'ADMIN_N2' || auth.user?.role === 'TECH_N1';

  const openManagerModal = (mode, targetSector = null) => {
    setManagerModal({ isOpen: true, mode, targetSector });
  };

  const closeManagerModal = () => {
    setManagerModal((prev) => ({ ...prev, isOpen: false }));
  };

  useEffect(() => {
    const timer = setInterval(() => setNowTimestamp(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleLayer = (key) => {
    setSceneLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const loadAllData = useCallback(async (token, unitId, machineId) => {
    try {
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
    } catch (err) {
      if (err?.status === 401) {
        handleLogout('Sua sessão expirou. Faça login novamente.');
        return;
      }
      throw err;
    }
  }, [handleLogout]);

  useEffect(() => {
    if (!auth.token) return undefined;
    const token = auth.token;

    const activeSocket = connectDashboardSocket(token, {
      onConnect: () => setSocketConnected(true),
      onDisconnect: () => setSocketConnected(false),
      onMachineUpdated: (updatedMachine) => {
        const currentUnitId = Number(selectedUnitIdRef.current);
        const machineUnitId = Number(updatedMachine.unit_id);
        const isForCurrentUnit = currentUnitId > 0 && machineUnitId === currentUnitId;

        setMachines((prev) => {
          const exists = prev.some((m) => m.id === updatedMachine.id);
          if (isForCurrentUnit) {
            if (exists) {
              return prev.map((m) =>
                m.id === updatedMachine.id ? updatedMachine : m
              );
            }
            return [...prev, updatedMachine];
          }
          return exists ? prev.filter((m) => m.id !== updatedMachine.id) : prev;
        });

        setDiagnostics((prev) => {
          if (!prev || !prev.machine) return prev;
          if (prev.machine.id === updatedMachine.id) {
            if (!isForCurrentUnit) {
              return null;
            }
            return { ...prev, machine: updatedMachine };
          }
          return prev;
        });

        rmmApi.getUnits(token).then((uRes) => setUnits(uRes.units || [])).catch(() => {});
      },
      onMachineDeleted: ({ id }) => {
        setMachines((prev) => prev.filter((m) => m.id !== Number(id)));
        setDiagnostics((prev) => (prev?.machine?.id === Number(id) ? null : prev));
        rmmApi.getUnits(token).then((uRes) => setUnits(uRes.units || [])).catch(() => {});
      },
      onAlertTriggered: (newAlert) => {
        setAlerts((prev) => [newAlert, ...prev.filter((a) => a.id !== newAlert.id).slice(0, 19)]);
      },
      onTaskUpdated: (updatedTask) => {
        const currentSelectedMachineId = selectedMachineIdRef.current;
        if (updatedTask && updatedTask.machine_id) {
          setDiagnostics((prev) => {
            if (!prev || Number(prev.machine?.id) !== Number(updatedTask.machine_id)) {
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
        if (
          updatedTask?.machine_id &&
          Number(updatedTask.machine_id) === Number(currentSelectedMachineId)
        ) {
          rmmApi
            .getMachineDiagnostics(token, updatedTask.machine_id)
            .then((diagRes) => {
              if (Number(selectedMachineIdRef.current) === Number(updatedTask.machine_id)) {
                setDiagnostics(diagRes);
              }
            })
            .catch(() => {});
        }
      },
      onAgentMessage: (newMsg) => {
        const currentId = Number(selectedMachineIdRef.current);
        if (!newMsg || !currentId || Number(newMsg.machine_id) !== currentId) {
          return;
        }
        setChatMessages((prev) => {
          if (newMsg.id !== undefined && prev.some((m) => m.id === newMsg.id)) {
            return prev;
          }
          return [...prev, newMsg];
        });
      },
      onUnitsUpdated: (payload) => {
        if (Array.isArray(payload?.units)) {
          setUnits(payload.units);
        }
      },
    });

    return () => {
      activeSocket.close();
    };
  }, [auth.token]);

  useEffect(() => {
    if (!auth.token) return;
    loadAllData(auth.token, selectedUnitId, selectedMachineId).catch(() => {});
    const syncTimer = setInterval(() => {
      loadAllData(auth.token, selectedUnitId, selectedMachineId).catch(() => {});
    }, 12000);
    return () => clearInterval(syncTimer);
  }, [auth.token, selectedUnitId, selectedMachineId, loadAllData]);

  useEffect(() => {
    if (units.length > 0 && !units.some((u) => u.id === Number(selectedUnitId))) {
      setSelectedUnitId(units[0].id);
      setSelectedSectorId(null);
      setSelectedMachineId(null);
      setDiagnostics(null);
    }
  }, [units, selectedUnitId]);

  const activeUnit =
    units.find((u) => u.id === Number(selectedUnitId)) || units[0];
  const selectedMachine =
    machines.find((m) => m.id === Number(selectedMachineId)) || machines[0] || null;
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

  async function handleLoadPrinters(unitId, machineId) {
    const res = await rmmApi.getApprovedPrinters(auth.token, unitId, machineId);
    return res.printers || [];
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

  async function handleConfirmUpdateAllAgents() {
    setUpdateAllConfirm((prev) => ({ ...prev, busy: true, resultMsg: '' }));
    try {
      const res = await rmmApi.updateAllAgents(auth.token);
      await loadAllData(auth.token, selectedUnitId, selectedMachineId);
      setUpdateAllConfirm({
        open: true,
        busy: false,
        resultMsg: res.message || 'Ordem de atualização enviada para todas as máquinas.',
      });
    } catch (err) {
      setUpdateAllConfirm({
        open: true,
        busy: false,
        resultMsg: `Falha ao enviar atualização: ${err.message}`,
      });
    }
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

  async function handleCreateUnit(payload) {
    const res = await rmmApi.createUnit(auth.token, payload);
    if (Array.isArray(res.units)) setUnits(res.units);
    const nextUnitId = res.unit?.id || selectedUnitId;
    setSelectedUnitId(nextUnitId);
    setSelectedMachineId(null);
    setSelectedSectorId(null);
    setDiagnostics(null);
    setCameraMode('ISO');
    await loadAllData(auth.token, nextUnitId, null);
    return res;
  }

  async function handleUpdateUnit(unitId, payload) {
    const res = await rmmApi.updateUnit(auth.token, unitId, payload);
    if (Array.isArray(res.units)) setUnits(res.units);
    await loadAllData(auth.token, selectedUnitId, selectedMachineId);
    return res;
  }

  async function handleDeleteUnit(unitId, payload) {
    const res = await rmmApi.deleteUnit(auth.token, unitId, payload);
    const remainingUnits = Array.isArray(res.units) ? res.units : [];
    setUnits(remainingUnits);
    const fallbackUnitId = res.target_unit_id || remainingUnits[0]?.id || 1;
    setSelectedUnitId(fallbackUnitId);
    setSelectedMachineId(null);
    setSelectedSectorId(null);
    setDiagnostics(null);
    setCameraMode('ISO');
    await loadAllData(auth.token, fallbackUnitId, null);
    return res;
  }

  async function handleCreateSector(unitId, payload) {
    const res = await rmmApi.createSector(auth.token, unitId, payload);
    if (Array.isArray(res.units)) setUnits(res.units);
    if (res.sector?.id) {
      setSelectedSectorId(res.sector.id);
      setCameraMode('SECTOR');
    }
    await loadAllData(auth.token, selectedUnitId, selectedMachineId);
    return res;
  }

  async function handleUpdateSector(sectorId, payload) {
    const res = await rmmApi.updateSector(auth.token, sectorId, payload);
    if (Array.isArray(res.units)) setUnits(res.units);
    await loadAllData(auth.token, selectedUnitId, selectedMachineId);
    return res;
  }

  async function handleDeleteSector(sectorId, payload) {
    const res = await rmmApi.deleteSector(auth.token, sectorId, payload);
    if (Array.isArray(res.units)) setUnits(res.units);
    if (Number(selectedSectorId) === Number(sectorId)) {
      setSelectedSectorId(null);
      setCameraMode('ISO');
    }
    await loadAllData(auth.token, selectedUnitId, selectedMachineId);
    return res;
  }

  if (auth.checking) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StageFallback>Validando sessão RMM Ipojuca...</StageFallback>
      </ThemeProvider>
    );
  }

  if (!auth.token || !auth.user) {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <LoginScreen onAuthenticated={handleLoginSubmit} sessionNotice={sessionNotice} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      {/* MAQUETE 3D ISOMÉTRICA EM TELA CHEIA (ESTILO HABBLAUDE) */}
      {twinMode === 'PIXEL' ? (
        <PixelArtTwin
          activeUnit={activeUnit}
          machines={machines}
          selectedMachine={selectedMachine}
          selectedSector={selectedSector}
          onSelectMachine={(m) => {
            setSelectedMachineId(m.id);
            setSelectedSectorId(null);
          }}
        />
      ) : (
        <Suspense fallback={<StageFallback>Carregando Gêmeo Digital 3D...</StageFallback>}>
          <DigitalTwin3D
            activeUnit={activeUnit}
            machines={machines}
            selectedMachine={selectedMachine}
            selectedSector={selectedSector}
            cameraMode={cameraMode}
            roomVariant={getReceptionVariant()}
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
        </Suspense>
      )}

      {/* INTERFACE ADMINISTRATIVA EDITORIAL MINIMALISTA */}
      <HudOverlay>
        <TopCommandDeck>
          <TopHeaderRow>
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
                    setDiagnostics(null);
                    setCameraMode('ISO');
                  }}
                >
                  <span className="u-code">[{u.code}] • {u.summary?.total || 0} PCs</span>
                  <span className="u-name">{fixTextEncoding(u.name)}</span>
                </UnitSwitchBtn>
              ))}
              {canManageStructure && (
                <>
                  <UnitActionBtn
                    type="button"
                    $tone="primary"
                    onClick={() => openManagerModal('CREATE_UNIT')}
                    title="Cadastrar nova Unidade de Saúde"
                  >
                    + Unidade
                  </UnitActionBtn>
                  {activeUnit && (
                    <UnitActionBtn
                      type="button"
                      onClick={() => openManagerModal('EDIT_UNIT')}
                      title="Editar ou excluir unidade selecionada"
                    >
                      ✎ Unidade
                    </UnitActionBtn>
                  )}
                </>
              )}
            </UnitSwitcherPod>

            <UserSessionPod>
              <UserSessionPill title={auth.user.email}>
                <span className="u-role">{auth.user.role}</span>
                <span>{auth.user.name}</span>
                <button
                  type="button"
                  className="u-logout"
                  onClick={() => handleLogout('')}
                  title="Encerrar sessão"
                >
                  Sair
                </button>
              </UserSessionPill>
            </UserSessionPod>
          </TopHeaderRow>

          <CenterControlShell $collapsed={topControlsCollapsed}>
            {topControlsCollapsed ? (
              <>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#52796B',
                    padding: '0 4px',
                  }}
                >
                  {twinMode === 'PIXEL' ? 'PIXEL ART' : `3D • ${cameraMode}`}
                </span>
                <CamModeBtn
                  type="button"
                  onClick={() => setTopControlsCollapsed(false)}
                  title="Expandir barra de controles e downloads"
                  aria-expanded="false"
                >
                  ▼ Controles
                </CamModeBtn>
              </>
            ) : (
              <>
                <CamModeBtn
                  type="button"
                  $active={twinMode === 'PIXEL'}
                  onClick={() => setTwinMode('PIXEL')}
                  title="Maquete isométrica em pixel art (Canvas 2D)"
                >
                  PIXEL
                </CamModeBtn>
                <CamModeBtn
                  type="button"
                  $active={twinMode === '3D'}
                  onClick={() => setTwinMode('3D')}
                  title="Inspeção tridimensional (Three.js)"
                >
                  3D
                </CamModeBtn>

                {twinMode === '3D' && (
                  <>
                    <ControlDivider aria-hidden="true" />
                    <CamModeBtn
                      type="button"
                      $active={cameraMode === 'ISO'}
                      onClick={() => {
                        setSelectedSectorId(null);
                        setCameraMode('ISO');
                      }}
                    >
                      ISO 3D
                    </CamModeBtn>
                    <CamModeBtn
                      type="button"
                      $active={cameraMode === 'TOP'}
                      onClick={() => setCameraMode('TOP')}
                    >
                      CAD TOPO
                    </CamModeBtn>
                    <CamModeBtn
                      type="button"
                      $active={cameraMode === 'FOCUS'}
                      onClick={() => setCameraMode('FOCUS')}
                    >
                      FOCO
                    </CamModeBtn>
                    <CamModeBtn
                      type="button"
                      $active={cameraMode === 'ORBIT'}
                      onClick={() =>
                        setCameraMode((prev) => (prev === 'ORBIT' ? 'ISO' : 'ORBIT'))
                      }
                      title="Giro orbital suave ao redor da maquete"
                    >
                      360°
                    </CamModeBtn>
                  </>
                )}

                <ControlDivider aria-hidden="true" />

                <CamModeBtn
                  as="a"
                  href="/api/agent/download"
                  download="IpojucaRMM-Setup.exe"
                  style={{
                    textDecoration: 'none',
                    color: '#52796B',
                    background: 'rgba(82, 121, 107, 0.1)',
                    fontWeight: 700,
                  }}
                  title="Baixar instalador oficial do Agente Windows (.exe)"
                >
                  ↓ AGENTE (.EXE)
                </CamModeBtn>

                {auth.user?.role === 'ADMIN_N2' && (
                  <CamModeBtn
                    type="button"
                    onClick={() => setUpdateAllConfirm({ open: true, busy: false, resultMsg: '' })}
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

                <ControlDivider aria-hidden="true" />

                <CamModeBtn
                  type="button"
                  onClick={() => setTopControlsCollapsed(true)}
                  title="Recolher barra de controles"
                  aria-expanded="true"
                  style={{ color: '#52796B', padding: '6px 8px' }}
                >
                  ▲
                </CamModeBtn>
              </>
            )}
          </CenterControlShell>
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
                  <div className="num">
                    {totalSummary.NORMAL + totalSummary.WARNING + totalSummary.CRITICAL}
                  </div>
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
                <span>SETORES ({(activeUnit?.sectors || []).length})</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {selectedSectorId && (
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
                      ↺ Geral
                    </button>
                  )}
                  {canManageStructure && activeUnit && (
                    <CardAddChipBtn
                      type="button"
                      onClick={() => openManagerModal('CREATE_SECTOR')}
                      title="Criar novo setor nesta unidade"
                    >
                      + Setor
                    </CardAddChipBtn>
                  )}
                </div>
              </div>
              {(activeUnit?.sectors || []).length === 0 && (
                <div style={{ fontSize: '0.69rem', color: '#737B75', padding: '4px 0' }}>
                  Nenhum setor cadastrado.{' '}
                  {canManageStructure && 'Clique em "+ Setor" para criar uma sala 3D.'}
                </div>
              )}
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
                    <div className="s-right">
                      <span className="s-meta">{secNodes.length} PC(S)</span>
                      {canManageStructure && (
                        <>
                          <InlineMiniBtn
                            type="button"
                            title={`Editar setor ${fixTextEncoding(sec.name)}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openManagerModal('EDIT_SECTOR', sec);
                            }}
                          >
                            ✎
                          </InlineMiniBtn>
                          <InlineMiniBtn
                            type="button"
                            $danger
                            title={`Excluir setor ${fixTextEncoding(sec.name)}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              openManagerModal('DELETE_SECTOR', sec);
                            }}
                          >
                            ✕
                          </InlineMiniBtn>
                        </>
                      )}
                    </div>
                  </SectorMiniRow>
                );
              })}
            </RadarCard>

            <RadarCard>
              {(() => {
                const liveInactivityAlerts = machines
                  .map((m) => ({ machine: m, info: getInactivityInfo(m, nowTimestamp) }))
                  .filter(({ info }) => info.isInactive24h)
                  .filter(
                    ({ machine }) =>
                      !alerts.some(
                        (a) =>
                          Number(a.machine_id) === Number(machine.id) &&
                          a.metric_name === 'INACTIVITY_24H' &&
                          a.status !== 'RESOLVED'
                      )
                  )
                  .map(({ machine, info }) => ({
                    id: `live-inact-${machine.id}`,
                    machine_id: machine.id,
                    hostname: machine.hostname,
                    unit_name: machine.unit_name || activeUnit?.name || '',
                    severity: 'WARNING',
                    metric_name: 'INACTIVITY_24H',
                    status: 'INATIVO >24H',
                    message:
                      info.mode === 'OFFLINE'
                        ? `Estação desligada/sem comunicação há ${formatShortDuration(info.seconds)} (>24h).`
                        : `Estação ligada sem interação há ${formatShortDuration(info.seconds)} (>24h).`,
                  }));

                const combinedAlerts = [...liveInactivityAlerts, ...alerts];
                const activeCount = combinedAlerts.filter((a) => a.status !== 'RESOLVED').length;

                return (
                  <>
                    <div className="card-tag">
                      <span>ALERTAS RECENTES</span>
                      <span>{activeCount} ATIVO(S)</span>
                    </div>
                    {combinedAlerts.length === 0 ? (
                      <div style={{ fontSize: '0.69rem', color: '#737B75', padding: '4px 0' }}>
                        Nenhum alerta crítico ou de inatividade (&gt;24h) no momento.
                      </div>
                    ) : (
                      combinedAlerts.slice(0, 5).map((al) => (
                        <AlertMiniRow
                          key={al.id || al.incident_key}
                          $severity={al.severity}
                          onClick={() => {
                            if (al.machine_id) {
                              setSelectedMachineId(Number(al.machine_id));
                              setCameraMode('FOCUS');
                            }
                          }}
                          style={{ cursor: al.machine_id ? 'pointer' : 'default' }}
                          title="Clique para focar esta estação"
                        >
                          <div className="a-top">
                            <span>{fixTextEncoding(al.hostname || `PC #${al.machine_id}`)}</span>
                            <span>
                              {al.metric_name === 'INACTIVITY_24H' && al.status !== 'RESOLVED'
                                ? 'INATIVO >24H'
                                : al.status || al.severity}
                            </span>
                          </div>
                          <div className="a-msg">{fixTextEncoding(al.message)}</div>
                          <div className="a-meta">
                            {fixTextEncoding(al.unit_name || '')}
                            {al.external_ticket_id ? ` • #${al.external_ticket_id}` : ''}
                          </div>
                        </AlertMiniRow>
                      ))
                    )}
                  </>
                );
              })()}
            </RadarCard>
          </LeftRadarColumn>

          <DiagnosticDrawer
            diagnostics={diagnostics}
            units={units}
            chatMessages={chatMessages}
            taskCatalog={taskCatalog}
            currentUser={auth.user || { name: 'Operador', role: 'VIEWER' }}
            onDispatchTask={handleDispatchTask}
            onLoadPrinters={handleLoadPrinters}
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
                  href="/api/agent/download"
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
              const isLegacy = isAgentOutdated(m.agent_version, '2.3.0');
              const inact = getInactivityInfo(m, nowTimestamp);
              const offSec = m.last_seen_at
                ? Math.max(0, Math.floor((nowTimestamp - new Date(m.last_seen_at).getTime()) / 1000))
                : 0;

              const activityLabel = inact.isInactive24h
                ? `⚠ Inativo >24h (${formatShortDuration(inact.seconds)})`
                : m.health_status === 'OFFLINE'
                  ? `Desligado há ${formatShortDuration(offSec)}`
                  : isLegacy
                    ? `Ativo (${m.agent_version || '2.2.0'})`
                    : idleSec < 180
                      ? `Em uso (${formatShortDuration(idleSec)})`
                      : `Ocioso há ${formatShortDuration(idleSec)}`;

              return (
                <NodeKeycap
                  key={m.id}
                  $selected={isSel}
                  $color={stColor}
                  style={
                    inact.isInactive24h && !isSel
                      ? { borderColor: '#F59E0B', background: '#FFFDF5' }
                      : undefined
                  }
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
                      color: inact.isInactive24h
                        ? '#B91C1C'
                        : m.health_status === 'OFFLINE'
                          ? '#718096'
                          : idleSec < 180
                            ? '#2D6A4F'
                            : '#D97706',
                      marginBottom: '5px',
                      fontWeight: inact.isInactive24h ? 700 : 600,
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

      <UnitSectorManagerModal
        isOpen={managerModal.isOpen}
        initialMode={managerModal.mode}
        units={units}
        activeUnit={activeUnit}
        targetSector={managerModal.targetSector}
        machines={machines}
        onClose={closeManagerModal}
        onCreateUnit={handleCreateUnit}
        onUpdateUnit={handleUpdateUnit}
        onDeleteUnit={handleDeleteUnit}
        onCreateSector={handleCreateSector}
        onUpdateSector={handleUpdateSector}
        onDeleteSector={handleDeleteSector}
      />

      {updateAllConfirm.open && (
        <ConfirmBackdrop
          onClick={() =>
            !updateAllConfirm.busy &&
            setUpdateAllConfirm({ open: false, busy: false, resultMsg: '' })
          }
        >
          <ConfirmCard onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>
              Confirmar Atualização Global de Agentes (OTA)
            </h3>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#4A524C', lineHeight: 1.45 }}>
              Esta operação enviará ordem de atualização automática (verificada via SHA-256) para
              todas as <strong>{totalSummary.total} estação(ões)</strong> cadastradas na rede de
              saúde.
            </p>
            {updateAllConfirm.resultMsg && (
              <div
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  background: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  color: '#166534',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                }}
              >
                {updateAllConfirm.resultMsg}
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <CamModeBtn
                type="button"
                disabled={updateAllConfirm.busy}
                onClick={() => setUpdateAllConfirm({ open: false, busy: false, resultMsg: '' })}
              >
                {updateAllConfirm.resultMsg ? 'Fechar' : 'Cancelar'}
              </CamModeBtn>
              {!updateAllConfirm.resultMsg && (
                <CamModeBtn
                  type="button"
                  disabled={updateAllConfirm.busy}
                  onClick={handleConfirmUpdateAllAgents}
                  style={{
                    background: '#2D6A4F',
                    color: '#FFFFFF',
                    borderColor: '#2D6A4F',
                  }}
                >
                  {updateAllConfirm.busy ? 'Enviando...' : 'Confirmar Atualização Global'}
                </CamModeBtn>
              )}
            </div>
          </ConfirmCard>
        </ConfirmBackdrop>
      )}
    </ThemeProvider>
  );
}
