import React, { Suspense, lazy, useEffect, useState, useCallback, useMemo, useRef } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme, STATUS_LABELS, fixTextEncoding, isAgentOutdated } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { rmmApi, connectDashboardSocket } from './services/api';
import { PixelArtTwin } from './components/PixelArtTwin';
import { LoginScreen } from './components/LoginScreen';
import { getReceptionVariant } from './components/twin/receptionThemes';
import { DiagnosticDrawer } from './components/DiagnosticDrawer';
import { UnitSectorManagerModal } from './components/UnitSectorManagerModal';
import {
  BrandMark,
  IconPlus,
  IconEdit,
  IconTrash,
  IconChevronDown,
  IconChevronLeft,
  IconRotateCcw,
  IconDownload,
  IconUploadCloud,
  IconLogout,
  IconSearch,
  IconPrinter,
  IconLayers,
  IconTag,
  IconPanelLeft,
  IconCube,
  IconGrid,
  IconAlertTriangle,
} from './components/Icons';

const DigitalTwin3D = lazy(() =>
  import('./components/DigitalTwin3D').then((m) => ({ default: m.DigitalTwin3D }))
);
const ModelShowcase = lazy(() => import('./components/twin/ModelShowcase'));

const ROLE_DISPLAY = {
  ADMIN_N2: 'Admin N2',
  TECH_N1: 'Suporte N1',
  VIEWER: 'Gestão',
};

function formatOperatorName(name) {
  return String(name || 'Operador')
    .replace(/\s*\((Admin\s*N2|Suporte\s*N1|Tech\s*N1|Gest[aã]o|Viewer)\)\s*$/i, '')
    .trim();
}

function getInitials(name) {
  const parts = formatOperatorName(name)
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'TI';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

const HudOverlay = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const TopBar = styled.header`
  pointer-events: auto;
  height: 54px;
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bgSurface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const BrandCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;

  .brand-copy {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
  }

  .brand-title {
    font-size: 0.9rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.02em;
    white-space: nowrap;
  }

  .brand-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.72rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 1px;
    white-space: nowrap;
  }
`;

const StatusDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ $color }) => $color || '#2D6A4F'};
  display: inline-block;
  flex-shrink: 0;
`;

const UnitNavCluster = styled.nav`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const UnitTabsScroller = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  overflow-x: auto;
  padding: 2px 0;

  &::-webkit-scrollbar {
    height: 3px;
  }
`;

const UnitManageGroup = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

const UnitTabBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 10px;
  max-width: 210px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.borderStrong : 'transparent'};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.bgSurfaceSubtle : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  font-size: 0.76rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  .u-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgSurfaceHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:active {
    transform: scale(0.985);
  }

  .u-count {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    font-weight: 600;
    flex-shrink: 0;
    color: ${({ $active, theme }) =>
      $active ? theme.colors.brandPrimary : theme.colors.textMuted};
    background: ${({ $active }) =>
      $active ? 'rgba(45, 106, 79, 0.1)' : 'rgba(30, 36, 32, 0.05)'};
    padding: 1px 6px;
    border-radius: 999px;
  }

  @media (max-width: 1360px) {
    max-width: 165px;
    padding: 0 8px;
  }
`;

const SubtleIconBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  height: 32px;
  padding: ${({ $iconOnly }) => ($iconOnly ? '0 8px' : '0 10px')};
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid
    ${({ $accent, theme }) =>
      $accent ? 'rgba(45, 106, 79, 0.26)' : theme.colors.borderSubtle};
  background: ${({ $accent, theme }) =>
    $accent ? theme.colors.brandPrimarySubtle : theme.colors.bgSurface};
  color: ${({ $accent, $danger, theme }) =>
    $danger
      ? theme.colors.status.CRITICAL
      : $accent
        ? theme.colors.brandPrimary
        : theme.colors.textSecondary};
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({ $accent, $danger, theme }) =>
      $danger
        ? 'rgba(200, 30, 30, 0.08)'
        : $accent
          ? 'rgba(45, 106, 79, 0.16)'
          : theme.colors.bgSurfaceHover};
    border-color: ${({ $danger, theme }) =>
      $danger ? 'rgba(200, 30, 30, 0.35)' : theme.colors.borderStrong};
    color: ${({ $danger, $accent, theme }) =>
      $danger
        ? theme.colors.status.CRITICAL
        : $accent
          ? theme.colors.brandPrimaryHover
          : theme.colors.textPrimary};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TopRightCluster = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (max-width: 1120px) {
    .hide-compact {
      display: none;
    }
  }
`;

const HairlineV = styled.span`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => theme.colors.borderSubtle};
  display: inline-block;
  flex-shrink: 0;
`;

const UserMenuChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 3px 4px 3px 5px;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};

  .u-avatar {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: rgba(45, 106, 79, 0.12);
    color: ${({ theme }) => theme.colors.brandPrimary};
    font-size: 0.7rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    letter-spacing: -0.02em;
  }

  .u-meta {
    display: flex;
    flex-direction: column;
    line-height: 1.15;
    padding-right: 4px;
  }

  .u-name {
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    max-width: 132px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .u-role {
    font-size: 0.66rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const WorkspaceFrame = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 16px 14px;
  gap: 10px;
  pointer-events: none;
`;

const ViewportToolbarRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  flex-shrink: 0;
`;

const ViewportControlPill = styled.div`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
  background: ${({ theme }) => theme.colors.bgGlassHeavy};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 4px;
  max-width: 100%;
`;

const SegmentedBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 28px;
  padding: 0 10px;
  border-radius: 6px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.borderStrong : 'transparent'};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.bgSurfaceSubtle : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  font-size: 0.74rem;
  font-weight: ${({ $active }) => ($active ? 600 : 500)};
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.colors.bgSurfaceHover};
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:active {
    transform: scale(0.985);
  }
`;

const MiddleWorkspace = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 14px;
  pointer-events: none;
  overflow: hidden;
`;

const LeftRailToggleChip = styled.button`
  pointer-events: auto;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 36px;
  padding: 0 12px;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    transform: translateY(-1px);
    border-color: ${({ theme }) => theme.colors.borderStrong};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  .alert-pill {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    font-weight: 700;
    color: #991b1b;
    background: #fef2f2;
    border: 1px solid #fecaca;
    padding: 1px 6px;
    border-radius: 999px;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const LeftRailPanel = styled.aside`
  pointer-events: auto;
  width: 280px;
  max-height: 100%;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  @media (max-width: 960px) {
    display: none;
  }
`;

const RailSection = styled.section`
  padding: 14px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  &:last-child {
    border-bottom: none;
  }
`;

const RailSectionHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;

  .sec-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.01em;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .sec-meta {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .sec-actions {
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
`;

const KpiStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
`;

const KpiColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 7px;
  border-top: 2px solid ${({ $color }) => $color};

  .num {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.15rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.15;
  }

  .lbl {
    font-size: 0.68rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 2px;
  }
`;

const TextActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  padding: 2px 4px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.brandPrimary};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({ theme }) => theme.colors.brandPrimarySubtle};
  }
`;

const RailIconBtn = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 5px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({ $danger, theme }) =>
    $danger ? theme.colors.status.CRITICAL : theme.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({ $danger, theme }) =>
      $danger ? 'rgba(200, 30, 30, 0.08)' : theme.colors.bgSurfaceHover};
    color: ${({ $danger, theme }) =>
      $danger ? theme.colors.status.CRITICAL : theme.colors.textPrimary};
  }
`;

const SectorRowList = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectorListRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 8px 8px 10px;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);
  border-radius: 6px;
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.brandPrimarySubtle : 'transparent'};
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    bottom: 6px;
    width: 2.5px;
    border-radius: 2px;
    background: ${({ $selected, theme }) =>
      $selected ? theme.colors.brandPrimary : 'transparent'};
  }

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: ${({ $selected, theme }) =>
      $selected ? 'rgba(45, 106, 79, 0.13)' : theme.colors.bgSurfaceSubtle};
  }

  .s-info {
    min-width: 0;
  }

  .s-name {
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .s-code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 1px;
  }

  .s-right {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .s-count {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(30, 36, 32, 0.05);
  }

  .s-controls {
    display: inline-flex;
    align-items: center;
    gap: 1px;
    opacity: 0.45;
    transition: opacity 150ms ease;
  }

  &:hover .s-controls,
  &:focus-within .s-controls {
    opacity: 1;
  }
`;

const AlertRow = styled.button`
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border: none;
  border-left: 2.5px solid
    ${({ $severity, theme }) =>
      $severity === 'CRITICAL'
        ? theme.colors.status.CRITICAL
        : theme.colors.status.WARNING};
  border-radius: 0 6px 6px 0;
  background: ${({ $severity }) =>
    $severity === 'CRITICAL'
      ? 'rgba(200, 30, 30, 0.05)'
      : 'rgba(180, 83, 9, 0.05)'};
  margin-bottom: 6px;
  cursor: ${({ $clickable }) => ($clickable ? 'pointer' : 'default')};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    background: ${({ $severity, $clickable }) =>
      !$clickable
        ? undefined
        : $severity === 'CRITICAL'
          ? 'rgba(200, 30, 30, 0.09)'
          : 'rgba(180, 83, 9, 0.09)'};
  }

  .a-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .a-tag {
    font-size: 0.66rem;
    font-weight: 700;
    color: ${({ $severity, theme }) =>
      $severity === 'CRITICAL'
        ? theme.colors.status.CRITICAL
        : theme.colors.status.WARNING};
    white-space: nowrap;
  }

  .a-msg {
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.38;
    margin-top: 2px;
  }

  .a-meta {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.66rem;
    color: ${({ theme }) => theme.colors.textMuted};
    margin-top: 3px;
  }
`;

const EmptyNote = styled.p`
  font-size: 0.76rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.45;
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
  height: 26px;
  padding: 0 14px;
  margin-bottom: -1px;
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ theme }) => theme.colors.textSecondary};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-bottom: ${({ $collapsed, theme }) =>
    $collapsed ? `1px solid ${theme.colors.borderSubtle}` : '1px solid transparent'};
  border-radius: 8px 8px 0 0;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    background 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  .arrow {
    display: inline-flex;
    transition: transform 200ms cubic-bezier(0.2, 0.8, 0.2, 1);
    transform: rotate(${({ $collapsed }) => ($collapsed ? '180deg' : '0deg')});
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const BottomMatrixDock = styled.footer`
  pointer-events: auto;
  align-self: stretch;
  background: ${({ theme }) => theme.colors.bgGlassHeavy};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: ${({ $collapsed }) => ($collapsed ? '0 14px' : '10px 14px')};
  max-height: ${({ $collapsed }) => ($collapsed ? '0px' : '168px')};
  opacity: ${({ $collapsed }) => ($collapsed ? 0 : 1)};
  border-width: ${({ $collapsed }) => ($collapsed ? '0' : '1px')};
  visibility: ${({ $collapsed }) => ($collapsed ? 'hidden' : 'visible')};
  display: flex;
  align-items: center;
  gap: 10px;
  overflow-x: auto;
  overflow-y: hidden;
  transition: max-height 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
    padding 220ms cubic-bezier(0.2, 0.8, 0.2, 1),
    opacity 180ms ease,
    visibility 220ms;
`;

const DockControlsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right: 14px;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  min-width: 204px;
  flex-shrink: 0;

  .dock-title {
    font-size: 0.78rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    white-space: nowrap;
    letter-spacing: -0.01em;
  }

  .dock-sub {
    font-size: 0.7rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-variant-numeric: tabular-nums;
  }

  .search-wrap {
    position: relative;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .search-icon {
    position: absolute;
    left: 9px;
    pointer-events: none;
    display: inline-flex;
  }

  .dock-search {
    width: 100%;
    height: 32px;
    background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
    border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    border-radius: 7px;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.76rem;
    padding: 0 10px 0 30px;
    transition: border-color 140ms ease, background 140ms ease;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandPrimary};
      background: ${({ theme }) => theme.colors.bgSurface};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }
`;

const NodeKeycap = styled.button`
  min-width: 188px;
  flex-shrink: 0;
  padding: 9px 12px;
  background: ${({ $selected, $inact }) =>
    $selected ? '#F1F7F4' : $inact ? '#FFFDF5' : '#FFFFFF'};
  border: 1px solid
    ${({ $selected, $inact, theme }) =>
      $selected
        ? theme.colors.brandPrimary
        : $inact
          ? 'rgba(180, 83, 9, 0.45)'
          : theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-align: left;
  cursor: pointer;
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    border-color: ${({ theme }) => theme.colors.brandPrimary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  &:active {
    transform: translateY(0) scale(0.985);
  }

  .n-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }

  .n-sector {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
  }

  .n-host {
    font-size: 0.84rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.01em;
    margin: 4px 0 2px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 6px;
  }

  .n-prn {
    display: inline-flex;
    align-items: center;
    color: ${({ $prnOk, theme }) =>
      $prnOk ? theme.colors.brandPrimary : theme.colors.status.CRITICAL};
    opacity: ${({ $prnOk }) => ($prnOk ? 0.72 : 1)};
  }

  .n-metrics {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 4px;
  }

  .n-activity {
    font-size: 0.7rem;
    font-weight: 600;
    margin-bottom: 6px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .n-bars {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 4px;
  }

  .bar-track {
    height: 3px;
    background: rgba(30, 36, 32, 0.08);
    border-radius: 2px;
    overflow: hidden;
    i {
      display: block;
      height: 100%;
      border-radius: 2px;
    }
  }
`;

const ConfirmBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 90;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ConfirmCard = styled.div`
  width: 100%;
  max-width: 460px;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 22px 24px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};

  h3 {
    font-size: 1.02rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  p {
    font-size: 0.84rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
  }

  .modal-result {
    padding: 10px 12px;
    border-radius: 8px;
    background: #f0fdf4;
    border: 1px solid #bbf7d0;
    color: #166534;
    font-size: 0.8rem;
    font-weight: 600;
  }

  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 6px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  }
`;

const ModalPrimaryBtn = styled.button`
  height: 36px;
  padding: 0 16px;
  border-radius: 7px;
  border: none;
  background: ${({ theme }) => theme.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brandPrimaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ModalSecondaryBtn = styled.button`
  height: 36px;
  padding: 0 14px;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgSurfaceHover};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }
`;

const StageFallback = styled.div`
  position: fixed;
  inset: 0;
  background: ${({ theme }) => theme.colors.bgCanvas};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.textSecondary};
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
  const [leftRailCollapsed, setLeftRailCollapsed] = useState(() => {
    try {
      return window.localStorage.getItem('rmm.leftRailCollapsed') === '1';
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

  useEffect(() => {
    try {
      window.localStorage.setItem(
        'rmm.leftRailCollapsed',
        leftRailCollapsed ? '1' : '0'
      );
    } catch {
      /* armazenamento indisponível */
    }
  }, [leftRailCollapsed]);

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
        <StageFallback>Validando sessão Pulso RMM...</StageFallback>
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

      {/* INTERFACE ADMINISTRATIVA EDITORIAL */}
      <HudOverlay>
        <TopBar>
          <BrandCluster>
            <BrandMark size={26} />
            <div className="brand-copy">
              <span className="brand-title">Pulso RMM</span>
              <span className="brand-status">
                <StatusDot $color={socketConnected ? theme.colors.status.NORMAL : theme.colors.status.WARNING} />
                <span>{socketConnected ? 'Tempo real ativo' : 'Reconectando'}</span>
              </span>
            </div>
          </BrandCluster>

          <HairlineV aria-hidden="true" />

          <UnitNavCluster aria-label="Unidades de Saúde">
            <UnitTabsScroller>
              {units.map((u) => {
                const isUnitActive = u.id === Number(selectedUnitId);
                const unitLabel = fixTextEncoding(u.name);
                return (
                  <UnitTabBtn
                    key={u.id}
                    type="button"
                    $active={isUnitActive}
                    aria-current={isUnitActive ? 'page' : undefined}
                    title={`${unitLabel} (${u.summary?.total || 0} estações)`}
                    onClick={() => {
                      setSelectedUnitId(u.id);
                      setSelectedMachineId(null);
                      setSelectedSectorId(null);
                      setDiagnostics(null);
                      setCameraMode('ISO');
                    }}
                  >
                    <span className="u-name">{unitLabel}</span>
                    <span className="u-count">{u.summary?.total || 0}</span>
                  </UnitTabBtn>
                );
              })}
            </UnitTabsScroller>
            {canManageStructure && (
              <UnitManageGroup>
                <SubtleIconBtn
                  type="button"
                  $accent
                  $iconOnly
                  onClick={() => openManagerModal('CREATE_UNIT')}
                  title="Cadastrar nova Unidade de Saúde"
                  aria-label="Cadastrar nova Unidade de Saúde"
                >
                  <IconPlus size={14} />
                </SubtleIconBtn>
                {activeUnit && (
                  <SubtleIconBtn
                    type="button"
                    $iconOnly
                    onClick={() => openManagerModal('EDIT_UNIT')}
                    title="Editar ou excluir unidade selecionada"
                    aria-label="Editar unidade selecionada"
                  >
                    <IconEdit size={14} />
                  </SubtleIconBtn>
                )}
              </UnitManageGroup>
            )}
          </UnitNavCluster>

          <TopRightCluster>
            <SubtleIconBtn
              as="a"
              href="/api/agent/download"
              download="IpojucaRMM-Setup.exe"
              title="Baixar instalador oficial do Agente Windows (.exe)"
            >
              <IconDownload size={14} />
              <span className="hide-compact">Agente</span>
            </SubtleIconBtn>

            {auth.user?.role === 'ADMIN_N2' && (
              <SubtleIconBtn
                type="button"
                $accent
                onClick={() => setUpdateAllConfirm({ open: true, busy: false, resultMsg: '' })}
                title="Enviar atualização silenciosa (OTA) para todas as máquinas"
              >
                <IconUploadCloud size={14} />
                <span className="hide-compact">Atualizar todos</span>
              </SubtleIconBtn>
            )}

            <HairlineV aria-hidden="true" />

            <UserMenuChip title={auth.user.email}>
              <span className="u-avatar">{getInitials(auth.user.name)}</span>
              <div className="u-meta">
                <span className="u-name">{formatOperatorName(auth.user.name)}</span>
                <span className="u-role">{ROLE_DISPLAY[auth.user.role] || auth.user.role}</span>
              </div>
              <RailIconBtn
                type="button"
                $danger
                onClick={() => handleLogout('')}
                title="Encerrar sessão"
                aria-label="Encerrar sessão"
              >
                <IconLogout size={14} />
              </RailIconBtn>
            </UserMenuChip>
          </TopRightCluster>
        </TopBar>

        <WorkspaceFrame>
          <ViewportToolbarRow>
            <ViewportControlPill>
              {topControlsCollapsed ? (
                <>
                  <span
                    style={{
                      fontFamily: theme.fonts.mono,
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: theme.colors.textSecondary,
                      padding: '0 8px',
                    }}
                  >
                    {twinMode === 'PIXEL' ? 'Pixel Art' : `3D · ${cameraMode}`}
                  </span>
                  <SegmentedBtn
                    type="button"
                    onClick={() => setTopControlsCollapsed(false)}
                    title="Expandir controles de visualização"
                    aria-expanded="false"
                  >
                    <IconChevronDown size={14} />
                    <span>Visualização</span>
                  </SegmentedBtn>
                </>
              ) : (
                <>
                  <SegmentedBtn
                    type="button"
                    $active={twinMode === 'PIXEL'}
                    onClick={() => setTwinMode('PIXEL')}
                    title="Planta isométrica em Pixel Art"
                  >
                    <IconGrid size={13} />
                    <span>Pixel Art</span>
                  </SegmentedBtn>
                  <SegmentedBtn
                    type="button"
                    $active={twinMode === '3D'}
                    onClick={() => setTwinMode('3D')}
                    title="Maquete tridimensional interativa"
                  >
                    <IconCube size={13} />
                    <span>3D</span>
                  </SegmentedBtn>

                  {twinMode === '3D' && (
                    <>
                      <HairlineV aria-hidden="true" />
                      <SegmentedBtn
                        type="button"
                        $active={cameraMode === 'ISO'}
                        onClick={() => {
                          setSelectedSectorId(null);
                          setCameraMode('ISO');
                        }}
                      >
                        ISO
                      </SegmentedBtn>
                      <SegmentedBtn
                        type="button"
                        $active={cameraMode === 'TOP'}
                        onClick={() => setCameraMode('TOP')}
                      >
                        Topo
                      </SegmentedBtn>
                      <SegmentedBtn
                        type="button"
                        $active={cameraMode === 'FOCUS'}
                        onClick={() => setCameraMode('FOCUS')}
                      >
                        Foco
                      </SegmentedBtn>
                      <SegmentedBtn
                        type="button"
                        $active={cameraMode === 'ORBIT'}
                        onClick={() =>
                          setCameraMode((prev) => (prev === 'ORBIT' ? 'ISO' : 'ORBIT'))
                        }
                        title="Giro orbital suave ao redor da maquete"
                      >
                        360°
                      </SegmentedBtn>
                      <HairlineV aria-hidden="true" />
                      <SegmentedBtn
                        type="button"
                        $active={sceneLayers.furniture}
                        onClick={() => toggleLayer('furniture')}
                        title="Alternar mobiliário 3D"
                      >
                        <IconLayers size={13} />
                        <span>Mobiliário</span>
                      </SegmentedBtn>
                      <SegmentedBtn
                        type="button"
                        $active={sceneLayers.labels}
                        onClick={() => toggleLayer('labels')}
                        title="Alternar rótulos das estações"
                      >
                        <IconTag size={13} />
                        <span>Rótulos</span>
                      </SegmentedBtn>
                    </>
                  )}

                  <HairlineV aria-hidden="true" />

                  <SegmentedBtn
                    type="button"
                    onClick={() => setTopControlsCollapsed(true)}
                    title="Recolher barra de visualização"
                    aria-label="Recolher barra de visualização"
                    aria-expanded="true"
                  >
                    <IconChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                  </SegmentedBtn>
                </>
              )}
            </ViewportControlPill>
          </ViewportToolbarRow>

          <MiddleWorkspace>
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
                  status: 'Inativo >24h',
                  message:
                    info.mode === 'OFFLINE'
                      ? `Sem comunicação há ${formatShortDuration(info.seconds)} (>24h).`
                      : `Ligado sem interação há ${formatShortDuration(info.seconds)} (>24h).`,
                }));

              const combinedAlerts = [...liveInactivityAlerts, ...alerts];
              const activeAlertCount = combinedAlerts.filter((a) => a.status !== 'RESOLVED').length;

              if (leftRailCollapsed) {
                return (
                  <LeftRailToggleChip
                    type="button"
                    onClick={() => setLeftRailCollapsed(false)}
                    title="Expandir painel lateral de rede, setores e alertas"
                    aria-expanded="false"
                  >
                    <IconPanelLeft size={15} />
                    <span>Painel</span>
                    {activeAlertCount > 0 && (
                      <span className="alert-pill">{activeAlertCount}</span>
                    )}
                  </LeftRailToggleChip>
                );
              }

              return (
                <LeftRailPanel aria-label="Resumo da rede, setores e alertas">
                  <RailSection>
                    <RailSectionHead>
                      <span className="sec-title">Rede global</span>
                      <div className="sec-actions">
                        <span className="sec-meta">{totalSummary.total} PCs</span>
                        <RailIconBtn
                          type="button"
                          onClick={() => setLeftRailCollapsed(true)}
                          title="Recolher painel lateral"
                          aria-label="Recolher painel lateral"
                        >
                          <IconChevronLeft size={14} />
                        </RailIconBtn>
                      </div>
                    </RailSectionHead>
                    <KpiStrip>
                      <KpiColumn $color={theme.colors.status.NORMAL}>
                        <span className="num">
                          {totalSummary.NORMAL + totalSummary.WARNING + totalSummary.CRITICAL}
                        </span>
                        <span className="lbl">Online</span>
                      </KpiColumn>
                      <KpiColumn $color={theme.colors.status.WARNING}>
                        <span className="num">{totalSummary.WARNING}</span>
                        <span className="lbl">Atenção</span>
                      </KpiColumn>
                      <KpiColumn $color={theme.colors.status.CRITICAL}>
                        <span className="num">{totalSummary.CRITICAL}</span>
                        <span className="lbl">Crítico</span>
                      </KpiColumn>
                      <KpiColumn $color={theme.colors.status.OFFLINE}>
                        <span className="num">{totalSummary.OFFLINE}</span>
                        <span className="lbl">Offline</span>
                      </KpiColumn>
                    </KpiStrip>
                  </RailSection>

                  <RailSection>
                    <RailSectionHead>
                      <span className="sec-title">
                        Setores
                        <span className="sec-meta">({(activeUnit?.sectors || []).length})</span>
                      </span>
                      <div className="sec-actions">
                        {selectedSectorId && (
                          <TextActionBtn
                            type="button"
                            onClick={() => {
                              setSelectedSectorId(null);
                              setCameraMode('ISO');
                            }}
                            title="Voltar para a visão geral da maquete"
                          >
                            <IconRotateCcw size={12} />
                            <span>Geral</span>
                          </TextActionBtn>
                        )}
                        {canManageStructure && activeUnit && (
                          <TextActionBtn
                            type="button"
                            onClick={() => openManagerModal('CREATE_SECTOR')}
                            title="Criar novo setor nesta unidade"
                          >
                            <IconPlus size={12} />
                            <span>Setor</span>
                          </TextActionBtn>
                        )}
                      </div>
                    </RailSectionHead>

                    {(activeUnit?.sectors || []).length === 0 ? (
                      <EmptyNote>
                        Nenhum setor cadastrado.{' '}
                        {canManageStructure && 'Use "+ Setor" para adicionar uma sala.'}
                      </EmptyNote>
                    ) : (
                      <SectorRowList>
                        {(activeUnit?.sectors || []).map((sec) => {
                          const secNodes = machines.filter(
                            (m) => Number(m.sector_id) === Number(sec.id)
                          );
                          const isSecSelected = selectedSectorId === sec.id;
                          return (
                            <SectorListRow
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
                              title={`Filtrar e aproximar no setor ${fixTextEncoding(sec.name)}`}
                            >
                              <div className="s-info">
                                <div className="s-name">{fixTextEncoding(sec.name)}</div>
                                <div className="s-code">{sec.code}</div>
                              </div>
                              <div className="s-right">
                                <span className="s-count">{secNodes.length}</span>
                                {canManageStructure && (
                                  <div className="s-controls">
                                    <RailIconBtn
                                      type="button"
                                      title={`Editar setor ${fixTextEncoding(sec.name)}`}
                                      aria-label={`Editar setor ${fixTextEncoding(sec.name)}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openManagerModal('EDIT_SECTOR', sec);
                                      }}
                                    >
                                      <IconEdit size={13} />
                                    </RailIconBtn>
                                    <RailIconBtn
                                      type="button"
                                      $danger
                                      title={`Excluir setor ${fixTextEncoding(sec.name)}`}
                                      aria-label={`Excluir setor ${fixTextEncoding(sec.name)}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        openManagerModal('DELETE_SECTOR', sec);
                                      }}
                                    >
                                      <IconTrash size={13} />
                                    </RailIconBtn>
                                  </div>
                                )}
                              </div>
                            </SectorListRow>
                          );
                        })}
                      </SectorRowList>
                    )}
                  </RailSection>

                  <RailSection>
                    <RailSectionHead>
                      <span className="sec-title">Alertas recentes</span>
                      <span className="sec-meta">
                        {activeAlertCount} {activeAlertCount === 1 ? 'ativo' : 'ativos'}
                      </span>
                    </RailSectionHead>
                    {combinedAlerts.length === 0 ? (
                      <EmptyNote>
                        Nenhum alerta crítico ou de inatividade (&gt;24h) no momento.
                      </EmptyNote>
                    ) : (
                      combinedAlerts.slice(0, 5).map((al) => (
                        <AlertRow
                          key={al.id || al.incident_key}
                          type="button"
                          $severity={al.severity}
                          $clickable={Boolean(al.machine_id)}
                          onClick={() => {
                            if (al.machine_id) {
                              setSelectedMachineId(Number(al.machine_id));
                              setCameraMode('FOCUS');
                            }
                          }}
                          title={al.machine_id ? 'Clique para focar esta estação' : undefined}
                        >
                          <div className="a-top">
                            <span>{fixTextEncoding(al.hostname || `PC #${al.machine_id}`)}</span>
                            <span className="a-tag">
                              {al.metric_name === 'INACTIVITY_24H' && al.status !== 'RESOLVED'
                                ? 'Inativo >24h'
                                : al.status || al.severity}
                            </span>
                          </div>
                          <div className="a-msg">{fixTextEncoding(al.message)}</div>
                          <div className="a-meta">
                            {fixTextEncoding(al.unit_name || '')}
                            {al.external_ticket_id ? ` · #${al.external_ticket_id}` : ''}
                          </div>
                        </AlertRow>
                      ))
                    )}
                  </RailSection>
                </LeftRailPanel>
              );
            })()}

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
            >
              <span className="arrow" aria-hidden="true">
                <IconChevronDown size={13} />
              </span>
              <span>
                {dockCollapsed
                  ? `${machines.length} ${machines.length === 1 ? 'estação' : 'estações'} na unidade`
                  : 'Ocultar estações'}
              </span>
            </DockToggleBtn>

            <BottomMatrixDock id="rmm-bottom-dock" $collapsed={dockCollapsed} aria-hidden={dockCollapsed}>
              <DockControlsBlock>
                <div>
                  <div className="dock-title">{fixTextEncoding(activeUnit?.name || 'Unidade')}</div>
                  <div className="dock-sub">
                    {filteredMachines.length} de {machines.length} estações
                  </div>
                </div>
                <div className="search-wrap">
                  <span className="search-icon">
                    <IconSearch size={13} />
                  </span>
                  <input
                    className="dock-search"
                    type="text"
                    aria-label="Filtrar estações por hostname, IP ou setor"
                    placeholder="Filtrar hostname, IP..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </DockControlsBlock>

              {filteredMachines.length === 0 && (
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: theme.colors.textSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <span>Nenhuma estação encontrada nesta unidade.</span>
                  <a
                    href="/api/agent/download"
                    download="IpojucaRMM-Setup.exe"
                    style={{
                      color: theme.colors.brandPrimary,
                      textDecoration: 'underline',
                      fontWeight: 600,
                    }}
                  >
                    Baixar Agente (.exe)
                  </a>
                </div>
              )}

              {filteredMachines.map((m) => {
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
                  ? `Inativo >24h (${formatShortDuration(inact.seconds)})`
                  : m.health_status === 'OFFLINE'
                    ? `Desligado há ${formatShortDuration(offSec)}`
                    : isLegacy
                      ? `Ativo (${m.agent_version || '2.2.0'})`
                      : idleSec < 180
                        ? `Em uso (${formatShortDuration(idleSec)})`
                        : `Ocioso há ${formatShortDuration(idleSec)}`;

                const activityColor = inact.isInactive24h
                  ? theme.colors.status.CRITICAL
                  : m.health_status === 'OFFLINE'
                    ? theme.colors.status.OFFLINE
                    : idleSec < 180
                      ? theme.colors.status.NORMAL
                      : theme.colors.status.WARNING;

                const statusText =
                  m.health_status === 'NORMAL'
                    ? 'Online'
                    : m.health_status === 'WARNING'
                      ? 'Atenção'
                      : m.health_status === 'CRITICAL'
                        ? 'Crítico'
                        : 'Offline';

                return (
                  <NodeKeycap
                    key={m.id}
                    type="button"
                    $selected={isSel}
                    $inact={inact.isInactive24h}
                    $prnOk={Boolean(m.spooler_running)}
                    onClick={() => {
                      setSelectedMachineId(m.id);
                      setCameraMode('FOCUS');
                    }}
                  >
                    <div className="n-top">
                      <span className="n-sector">
                        <StatusDot $color={stColor} />
                        {m.sector_code}
                      </span>
                      <span>{statusText}</span>
                    </div>
                    <div className="n-host">
                      <span>{m.hostname}</span>
                      <span
                        className="n-prn"
                        title={
                          m.spooler_running
                            ? 'Spooler de impressão ativo'
                            : 'Spooler de impressão parado'
                        }
                      >
                        <IconPrinter size={13} />
                      </span>
                    </div>
                    <div className="n-metrics">
                      CPU {cpu.toFixed(0)}% · RAM {ram.toFixed(0)}% · {m.ip_address}
                    </div>
                    <div className="n-activity" style={{ color: activityColor }}>
                      {inact.isInactive24h && <IconAlertTriangle size={12} />}
                      <span>{activityLabel}</span>
                    </div>
                    <div className="n-bars">
                      <div className="bar-track" title={`CPU: ${cpu.toFixed(0)}%`}>
                        <i style={{ width: `${cpu}%`, background: theme.colors.status.NORMAL }} />
                      </div>
                      <div className="bar-track" title={`RAM: ${ram.toFixed(0)}%`}>
                        <i style={{ width: `${ram}%`, background: theme.colors.brandPrimaryLight }} />
                      </div>
                      <div className="bar-track" title={`Disco: ${dsk.toFixed(0)}%`}>
                        <i style={{ width: `${dsk}%`, background: theme.colors.status.OFFLINE }} />
                      </div>
                    </div>
                  </NodeKeycap>
                );
              })}
            </BottomMatrixDock>
          </DockShell>
        </WorkspaceFrame>
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
            <h3>Confirmar atualização global de agentes</h3>
            <p>
              Esta operação enviará ordem de atualização silenciosa (com verificação obrigatória
              SHA-256) para todas as <strong>{totalSummary.total} estação(ões)</strong> cadastradas
              no painel.
            </p>
            {updateAllConfirm.resultMsg && (
              <div className="modal-result">{updateAllConfirm.resultMsg}</div>
            )}
            <div className="modal-actions">
              <ModalSecondaryBtn
                type="button"
                disabled={updateAllConfirm.busy}
                onClick={() => setUpdateAllConfirm({ open: false, busy: false, resultMsg: '' })}
              >
                {updateAllConfirm.resultMsg ? 'Fechar' : 'Cancelar'}
              </ModalSecondaryBtn>
              {!updateAllConfirm.resultMsg && (
                <ModalPrimaryBtn
                  type="button"
                  disabled={updateAllConfirm.busy}
                  onClick={handleConfirmUpdateAllAgents}
                >
                  {updateAllConfirm.busy ? 'Enviando...' : 'Confirmar atualização'}
                </ModalPrimaryBtn>
              )}
            </div>
          </ConfirmCard>
        </ConfirmBackdrop>
      )}
    </ThemeProvider>
  );
}
