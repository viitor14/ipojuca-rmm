import React, { useState, useMemo, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { RISK_LABELS, fixTextEncoding, isAgentOutdated, theme } from "../styles/theme";
import {
  IconCrosshair,
  IconChevronLeft,
  IconChevronRight,
  IconTrash,
  IconRefresh,
  IconSend,
  IconAlertTriangle,
  IconPrinter,
  IconClose,
  IconCopy,
  IconCheck,
  IconMapPin,
  IconActivity,
  IconUploadCloud,
  IconTerminal,
  IconPower,
  IconHardDrive,
  IconWifi,
  IconCpu,
  IconSparkles,
  IconClock,
} from "./Icons";

const ACTION_GROUPS = [
  { id: "DIAG", label: "Diagnóstico" },
  { id: "MAINT", label: "Manutenção" },
  { id: "SYSTEM", label: "Sistema e periféricos" },
];

const TASK_UI_META = {
  SYNC_TELEMETRY_NOW: {
    group: "DIAG",
    label: "Coletar telemetria",
    subtitle: "Atualiza CPU, RAM, disco e temperatura",
    Icon: IconActivity,
  },
  COLLECT_NETWORK_DIAG: {
    group: "DIAG",
    label: "Diagnóstico de rede",
    subtitle: "IPv4, gateway, DNS e latência local",
    Icon: IconWifi,
  },
  CHECK_DISK_HEALTH: {
    group: "DIAG",
    label: "Saúde do disco",
    subtitle: "Integridade física SMART e volume C:",
    Icon: IconHardDrive,
  },
  LIST_TOP_PROCESSES: {
    group: "DIAG",
    label: "Top processos",
    subtitle: "Processos com maior uso de CPU e RAM",
    Icon: IconCpu,
  },
  RESTART_SPOOLER: {
    group: "MAINT",
    label: "Reiniciar spooler",
    subtitle: "Destrava o serviço e a fila de impressão",
    Icon: IconPrinter,
  },
  CLEAR_TEMP_CACHE: {
    group: "MAINT",
    label: "Limpar temporários",
    subtitle: "Remove cache obsoleto sem tocar arquivos",
    Icon: IconSparkles,
  },
  FLUSH_DNS_WINSOCK: {
    group: "MAINT",
    label: "Limpar cache DNS",
    subtitle: "Renova a tabela de resolução de nomes",
    Icon: IconRefresh,
  },
  UPDATE_AGENT: {
    group: "SYSTEM",
    label: "Atualizar agente (OTA)",
    subtitle: "Baixa, valida SHA-256 e atualiza em silêncio",
    Icon: IconUploadCloud,
  },
  INSTALL_APPROVED_PRINTER: {
    group: "SYSTEM",
    label: "Instalar impressora",
    subtitle: "Mapeia impressora de rede homologada",
    Icon: IconPrinter,
  },
  REBOOT_WORKSTATION: {
    group: "SYSTEM",
    label: "Reiniciar estação",
    subtitle: "Aviso de 30s na tela antes de reiniciar",
    Icon: IconPower,
  },
};

function getTaskMeta(task) {
  const mapped = TASK_UI_META[task?.code];
  if (mapped) return mapped;
  return {
    group: task?.riskLevel === "HIGH" ? "SYSTEM" : "MAINT",
    label: fixTextEncoding(task?.title || task?.code || "Tarefa remota"),
    subtitle: fixTextEncoding(task?.description || "Comando remoto homologado"),
    Icon: IconTerminal,
  };
}

const modalBackdropIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const modalCardIn = keyframes`
  from { opacity: 0; transform: translateY(8px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const liveDotPulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.45; transform: scale(0.82); }
`;

const STATUS_PRETTY = {
  NORMAL: "Online",
  WARNING: "Atenção",
  CRITICAL: "Crítico",
  OFFLINE: "Offline",
};

function cleanDisplayVersion(raw) {
  const str = String(raw || "2.3.0").trim();
  const match = str.match(/(\d+\.\d+(?:\.\d+)?)/);
  return match ? `v${match[1]}` : `v${str}`;
}

function metricToneColor(value, warnAt = 80, critAt = 92) {
  if (value >= critAt) return theme.colors.status.CRITICAL;
  if (value >= warnAt) return theme.colors.status.WARNING;
  return theme.colors.textPrimary;
}

function metricBarColor(value, warnAt = 80, critAt = 92, normalColor = theme.colors.brandPrimary) {
  if (value >= critAt) return theme.colors.status.CRITICAL;
  if (value >= warnAt) return theme.colors.status.WARNING;
  return normalColor;
}

const BladeContainer = styled.aside`
  width: ${({ $collapsed }) => ($collapsed ? "296px" : "436px")};
  max-height: 100%;
  min-height: 0;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  pointer-events: auto;
  transition: width 200ms cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (max-width: 1120px) {
    width: ${({ $collapsed }) => ($collapsed ? "268px" : "384px")};
  }
`;

const DrawerHeader = styled.header`
  flex-shrink: 0;
  padding: 11px 16px 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

const HeaderTopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const HeaderMetaCluster = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const MicroSerial = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
  background: ${({ $bgColor }) => $bgColor || "rgba(30, 36, 32, 0.06)"};
  white-space: nowrap;

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const HeaderTools = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 3px;
  flex-shrink: 0;
`;

const IconToolBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid transparent;
  background: transparent;
  color: ${({ $danger, $active, theme }) =>
    $danger
      ? theme.colors.status.CRITICAL
      : $active
        ? theme.colors.brandPrimary
        : theme.colors.textSecondary};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({ $danger, theme }) =>
      $danger ? "rgba(200, 30, 30, 0.08)" : theme.colors.bgSurfaceHover};
    color: ${({ $danger, theme }) =>
      $danger ? theme.colors.status.CRITICAL : theme.colors.textPrimary};
  }

  &:active {
    transform: scale(0.95);
  }
`;

const HostHeading = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.18;
  word-break: break-word;
`;

const LocationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: 2px;

  .loc-text {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.35;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const MoveToggleBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 7px;
  border-radius: 5px;
  border: 1px solid
    ${({ $open, theme }) =>
      $open ? "rgba(45, 106, 79, 0.3)" : theme.colors.borderSubtle};
  background: ${({ $open, theme }) =>
    $open ? theme.colors.brandPrimarySubtle : "transparent"};
  color: ${({ $open, theme }) =>
    $open ? theme.colors.brandPrimary : theme.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: 600;
  cursor: pointer;
  flex-shrink: 0;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgSurfaceHover};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }
`;

const LocationSelect = styled.select`
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandPrimary};
    background: ${({ theme }) => theme.colors.bgSurface};
    box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
  }
`;

const ActivityInlineStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 5px 9px;
  border-radius: 7px;
  background: ${({ $bg }) => $bg};
  font-size: 0.73rem;

  .act-left {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-weight: 600;
  }

  .act-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $color }) => $color};
    flex-shrink: 0;
  }

  .act-headline {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .act-right {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({ $color }) => $color};
    white-space: nowrap;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
`;

const TabStrip = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bgSurface};
`;

const TabUnderlineBtn = styled.button`
  position: relative;
  height: 34px;
  padding: 0 2px;
  border: none;
  background: transparent;
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  font-size: 0.78rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1px;
    height: 2px;
    border-radius: 2px 2px 0 0;
    background: ${({ $active, theme }) =>
      $active ? theme.colors.brandPrimary : "transparent"};
    transition: background 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  .tab-count {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.66rem;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({ $active, $highlight }) =>
      $active || $highlight ? "rgba(45, 106, 79, 0.11)" : "rgba(30, 36, 32, 0.06)"};
    color: ${({ $active, $highlight, theme }) =>
      $active || $highlight ? theme.colors.brandPrimary : theme.colors.textSecondary};
  }
`;

const DrawerBody = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 10px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DrawerFooter = styled.footer`
  flex-shrink: 0;
  padding: 8px 16px 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bgSurface};
`;

const MetricsStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding-bottom: 9px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

const MetricCell = styled.div`
  padding: 0 10px;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;

  &:first-child {
    padding-left: 0;
  }

  &:last-child {
    border-right: none;
    padding-right: 0;
  }

  .m-lbl {
    font-size: 0.69rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .m-val {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1.06rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({ $tone }) => $tone};
    line-height: 1.15;
  }

  .m-track {
    height: 3px;
    background: rgba(30, 36, 32, 0.08);
    border-radius: 2px;
    overflow: hidden;
    margin-top: 2px;

    i {
      display: block;
      height: 100%;
      border-radius: 2px;
      transition: width 300ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }
  }
`;

const SparkSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  .spark-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .spark-legend {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.66rem;
    color: ${({ theme }) => theme.colors.textSecondary};

    span {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    i {
      width: 8px;
      height: 2.5px;
      border-radius: 2px;
      display: inline-block;
    }
  }

  .spark-empty {
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const SpecRowsList = styled.dl`
  display: flex;
  flex-direction: column;
  margin: 0;
`;

const SpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  padding: 5px 0;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  dt {
    font-size: 0.74rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    flex-shrink: 0;
  }

  dd {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    text-align: right;
    word-break: break-word;
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    gap: 6px;
    min-width: 0;

    &.mono {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-variant-numeric: tabular-nums;
      font-size: 0.74rem;
    }
  }
`;

const CopyableValueBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 5px;
  margin: -2px -5px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: ${({ $copied, theme }) =>
    $copied ? theme.colors.brandPrimary : theme.colors.textPrimary};
  font-family: ${({ theme }) => theme.fonts.mono};
  font-variant-numeric: tabular-nums;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  .copy-ico {
    display: inline-flex;
    color: ${({ $copied, theme }) =>
      $copied ? theme.colors.brandPrimary : theme.colors.textMuted};
    opacity: ${({ $copied }) => ($copied ? 1 : 0.6)};
    transition: opacity 150ms ease, color 150ms ease;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  }

  &:hover .copy-ico {
    opacity: 1;
    color: ${({ theme }) => theme.colors.brandPrimary};
  }
`;

const OfflineNote = styled.div`
  font-size: 0.74rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 8px 10px;
  border-radius: 7px;
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  line-height: 1.42;

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const PrimaryFooterBtn = styled.button`
  width: 100%;
  height: 34px;
  padding: 0 14px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brandPrimaryHover};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.985);
  }

  &:disabled {
    opacity: 0.55;
  }
`;

const SectionLead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.76rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};

  .lead-meta {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ActionFilterBar = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`;

const ActionFilterPill = styled.button`
  height: 25px;
  padding: 0 9px;
  border-radius: 6px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? "rgba(45, 106, 79, 0.28)" : theme.colors.borderSubtle};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brandPrimarySubtle : theme.colors.bgSurface};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.brandPrimary : theme.colors.textSecondary};
  font-size: 0.7rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease, border-color 140ms ease;

  &:hover {
    color: ${({ $active, theme }) =>
      $active ? theme.colors.brandPrimary : theme.colors.textPrimary};
    border-color: ${({ $active, theme }) =>
      $active ? "rgba(45, 106, 79, 0.35)" : theme.colors.borderStrong};
  }
`;

const ActionGroupBlock = styled.section`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const ActionGroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2px 2px 4px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-size: 0.69rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textSecondary};

  .grp-count {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.65rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ActionRowList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActionRowBtn = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 8px;
  margin: 0 -2px;
  border: 1px solid transparent;
  border-bottom-color: rgba(30, 36, 32, 0.055);
  border-radius: 8px;
  background: transparent;
  text-align: left;
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.textMuted : theme.colors.textPrimary};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.56 : 1)};
  transition: background 140ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 140ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:last-child {
    border-bottom-color: transparent;
  }

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
    border-color: ${({ theme }) => theme.colors.borderSubtle};
  }

  &:hover:not(:disabled) .act-ico {
    background: ${({ $risk, theme }) =>
      $risk === "HIGH"
        ? "rgba(200, 30, 30, 0.12)"
        : $risk === "MEDIUM"
          ? "rgba(180, 83, 9, 0.12)"
          : theme.colors.brandPrimarySubtle};
    color: ${({ $risk, theme }) =>
      $risk === "HIGH"
        ? theme.colors.status.CRITICAL
        : $risk === "MEDIUM"
          ? theme.colors.status.WARNING
          : theme.colors.brandPrimary};
  }

  &:hover:not(:disabled) .act-chev {
    color: ${({ theme }) => theme.colors.brandPrimary};
    transform: translateX(2px);
  }

  &:active:not(:disabled) {
    transform: scale(0.992);
  }

  .act-ico {
    width: 30px;
    height: 30px;
    border-radius: 7px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${({ $risk, theme }) =>
      $risk === "HIGH"
        ? "rgba(200, 30, 30, 0.07)"
        : $risk === "MEDIUM"
          ? "rgba(180, 83, 9, 0.07)"
          : theme.colors.bgSurfaceSubtle};
    color: ${({ $risk, theme }) =>
      $risk === "HIGH"
        ? theme.colors.status.CRITICAL
        : $risk === "MEDIUM"
          ? theme.colors.status.WARNING
          : theme.colors.textSecondary};
    transition: background 140ms ease, color 140ms ease;
  }

  .act-copy {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }

  .act-title {
    font-size: 0.79rem;
    font-weight: 600;
    line-height: 1.25;
    color: inherit;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .act-sub {
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .act-trail {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }

  .act-risk-pill {
    padding: 2px 6px;
    border-radius: 5px;
    font-size: 0.65rem;
    font-weight: 600;
    background: ${({ $risk }) =>
      $risk === "HIGH" ? "rgba(200, 30, 30, 0.08)" : "rgba(180, 83, 9, 0.09)"};
    color: ${({ $risk, theme }) =>
      $risk === "HIGH" ? theme.colors.status.CRITICAL : theme.colors.status.WARNING};
  }

  .act-locked {
    font-size: 0.66rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textMuted};
  }

  .act-busy {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.brandPrimary};

    i {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      animation: ${liveDotPulse} 1.1s ease-in-out infinite;
    }
  }

  .act-chev {
    color: ${({ theme }) => theme.colors.textMuted};
    display: inline-flex;
    transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1), color 150ms ease;
  }
`;

const LastExecStrip = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;

  .le-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .le-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    flex-shrink: 0;
    background: ${({ $tone }) => $tone};
    animation: ${({ $pulsing }) => ($pulsing ? liveDotPulse : "none")} 1.2s ease-in-out infinite;
  }

  .le-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .le-title {
    font-size: 0.74rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .le-meta {
    font-size: 0.68rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .le-btn {
    height: 28px;
    padding: 0 10px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.bgSurface};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.72rem;
    font-weight: 600;
    flex-shrink: 0;
    cursor: pointer;
    transition: background 140ms ease, border-color 140ms ease;

    &:hover {
      background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
      border-color: ${({ theme }) => theme.colors.brandPrimary};
      color: ${({ theme }) => theme.colors.brandPrimary};
    }
  }
`;

const ChatConversation = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 180px;
`;

const ChatEmptyState = styled.div`
  margin: auto 0;
  padding: 20px 12px;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.8rem;
  line-height: 1.5;

  strong {
    display: block;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-bottom: 4px;
    font-size: 0.84rem;
  }
`;

const ChatBubbleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $fromTi }) => ($fromTi ? "flex-end" : "flex-start")};
`;

const ChatBubble = styled.div`
  max-width: 86%;
  padding: 8px 11px;
  border-radius: ${({ $fromTi }) =>
    $fromTi ? "11px 11px 3px 11px" : "11px 11px 11px 3px"};
  background: ${({ $fromTi }) => ($fromTi ? "#E9F4EE" : "#F3F5F2")};
  border: 1px solid
    ${({ $fromTi }) =>
      $fromTi ? "rgba(45, 106, 79, 0.16)" : "rgba(30, 36, 32, 0.08)"};
  font-size: 0.8rem;
  line-height: 1.44;
  color: ${({ theme }) => theme.colors.textPrimary};
  word-break: break-word;

  .cb-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 10px;
    margin-bottom: 3px;
  }

  .cb-sender {
    font-size: 0.7rem;
    font-weight: 700;
    color: ${({ $fromTi, theme }) =>
      $fromTi ? theme.colors.brandPrimary : theme.colors.textPrimary};
  }

  .cb-time {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.64rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const ChatForm = styled.form`
  display: flex;
  gap: 6px;

  input {
    flex: 1;
    height: 36px;
    padding: 0 11px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.8rem;
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

  button {
    height: 36px;
    padding: 0 14px;
    border-radius: 8px;
    border: none;
    background: ${({ theme }) => theme.colors.brandPrimary};
    color: #ffffff;
    font-size: 0.78rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
      transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.brandPrimaryHover};
    }

    &:active:not(:disabled) {
      transform: scale(0.985);
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
  }
`;

const DiagnosticModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(30, 36, 32, 0.44);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: auto;
  animation: ${modalBackdropIn} 160ms ease-out;
`;

const DiagnosticModalCard = styled.div`
  width: 100%;
  max-width: 520px;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: 14px;
  padding: 20px 22px 18px;
  box-shadow: 0 20px 44px -12px rgba(24, 32, 27, 0.22), 0 4px 12px rgba(24, 32, 27, 0.08);
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
  animation: ${modalCardIn} 190ms cubic-bezier(0.2, 0.8, 0.2, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  .mh-left {
    display: flex;
    align-items: flex-start;
    gap: 11px;
    min-width: 0;
  }

  .mh-copy {
    min-width: 0;
  }

  h3 {
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.colors.textPrimary};
    line-height: 1.25;
  }

  .m-sub {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 3px;

    .m-mono {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-variant-numeric: tabular-nums;
      font-size: 0.71rem;
    }
  }

  .mh-right {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
`;

const ModalIconTile = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 9px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $tone, theme }) =>
    $tone === "danger"
      ? "rgba(200, 30, 30, 0.09)"
      : $tone === "warning"
        ? "rgba(180, 83, 9, 0.1)"
        : theme.colors.brandPrimarySubtle};
  color: ${({ $tone, theme }) =>
    $tone === "danger"
      ? theme.colors.status.CRITICAL
      : $tone === "warning"
        ? theme.colors.status.WARNING
        : theme.colors.brandPrimary};
`;

const ExecutionStepper = styled.ol`
  list-style: none;
  margin: 0;
  padding: 9px 12px;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
`;

const StepItem = styled.li`
  display: flex;
  align-items: center;
  gap: 7px;
  min-width: 0;

  .st-mark {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.65rem;
    font-weight: 700;
    background: ${({ $state, theme }) =>
      $state === "done"
        ? theme.colors.brandPrimary
        : $state === "error"
          ? theme.colors.status.CRITICAL
          : $state === "active"
            ? "rgba(45, 106, 79, 0.15)"
            : "rgba(30, 36, 32, 0.08)"};
    color: ${({ $state, theme }) =>
      $state === "done" || $state === "error"
        ? "#FFFFFF"
        : $state === "active"
          ? theme.colors.brandPrimary
          : theme.colors.textMuted};
    animation: ${({ $state }) => ($state === "active" ? liveDotPulse : "none")} 1.25s ease-in-out infinite;
  }

  .st-lbl {
    font-size: 0.72rem;
    font-weight: ${({ $state }) => ($state === "pending" ? 500 : 600)};
    color: ${({ $state, theme }) =>
      $state === "error"
        ? theme.colors.status.CRITICAL
        : $state === "pending"
          ? theme.colors.textMuted
          : theme.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const TargetSummaryStrip = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 10px 12px;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  .ts-cell {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 0 10px;
    border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    min-width: 0;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      border-right: none;
      padding-right: 0;
    }
  }

  .ts-k {
    font-size: 0.67rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .ts-v {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.77rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const OutputNarrativeBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px 14px;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-left: 3px solid
    ${({ $tone, theme }) =>
      $tone === "danger"
        ? theme.colors.status.CRITICAL
        : $tone === "warning"
          ? theme.colors.status.WARNING
          : theme.colors.brandPrimary};
  background: ${({ $tone, theme }) =>
    $tone === "danger"
      ? "rgba(200, 30, 30, 0.05)"
      : $tone === "warning"
        ? "rgba(180, 83, 9, 0.06)"
        : theme.colors.bgSurfaceSubtle};

  .on-ico {
    margin-top: 1px;
    flex-shrink: 0;
    color: ${({ $tone, theme }) =>
      $tone === "danger"
        ? theme.colors.status.CRITICAL
        : $tone === "warning"
          ? theme.colors.status.WARNING
          : theme.colors.brandPrimary};
  }

  .on-body {
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
  }

  .on-lead {
    font-size: 0.76rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .on-msg {
    font-size: 0.8rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.textSecondary};
    word-break: break-word;
  }
`;

const OutputSpecTable = styled.dl`
  margin: 0;
  padding: 4px 14px;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  max-height: 260px;
  overflow-y: auto;
`;

const OutputSpecRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 14px;
  padding: 7px 0;
  border-bottom: 1px solid rgba(30, 36, 32, 0.06);

  &:last-child {
    border-bottom: none;
  }

  dt {
    font-size: 0.74rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
    flex-shrink: 0;
  }

  dd {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    text-align: right;
    word-break: break-word;
  }
`;

const PrinterList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  max-height: 260px;
  overflow-y: auto;
`;

const PrinterOptionCard = styled.label`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.brandPrimary : theme.colors.borderSubtle};
  background: ${({ $selected, theme }) =>
    $selected ? "rgba(45, 106, 79, 0.06)" : theme.colors.bgSurface};
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease;

  &:hover {
    border-color: ${({ $selected, theme }) =>
      $selected ? theme.colors.brandPrimary : theme.colors.borderStrong};
  }

  input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  .pr-left {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }

  .pr-ico {
    width: 30px;
    height: 30px;
    border-radius: 7px;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: ${({ $selected, theme }) =>
      $selected ? theme.colors.brandPrimarySubtle : theme.colors.bgSurfaceSubtle};
    color: ${({ $selected, theme }) =>
      $selected ? theme.colors.brandPrimary : theme.colors.textSecondary};
  }

  .pr-info {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .pr-name {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.81rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .pr-tag {
    padding: 1px 6px;
    border-radius: 999px;
    font-size: 0.64rem;
    font-weight: 600;
    background: ${({ $source }) =>
      $source === "NETWORK"
        ? "rgba(29, 78, 216, 0.09)"
        : $source === "INSTALLED"
          ? "rgba(45, 106, 79, 0.1)"
          : "rgba(180, 83, 9, 0.1)"};
    color: ${({ $source }) =>
      $source === "NETWORK"
        ? "#1D4ED8"
        : $source === "INSTALLED"
          ? "#2D6A4F"
          : "#92400E"};
  }

  .pr-ip {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.72rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .pr-check {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid
      ${({ $selected, theme }) =>
        $selected ? theme.colors.brandPrimary : theme.colors.borderStrong};
    background: ${({ $selected, theme }) =>
      $selected ? theme.colors.brandPrimary : "transparent"};
    color: #ffffff;
  }
`;

const ModalNotice = styled.div`
  padding: 10px 12px;
  border-radius: 0 8px 8px 0;
  border-left: 3px solid
    ${({ $tone, theme }) =>
      $tone === "danger"
        ? theme.colors.status.CRITICAL
        : theme.colors.status.WARNING};
  background: ${({ $tone }) =>
    $tone === "danger" ? "rgba(200, 30, 30, 0.06)" : "rgba(180, 83, 9, 0.07)"};
  color: ${({ $tone }) => ($tone === "danger" ? "#991B1B" : "#92400E")};
  font-size: 0.79rem;
  line-height: 1.48;
`;

const ModalFooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  .mf-left,
  .mf-right {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }
`;

const ModalBtn = styled.button`
  height: 35px;
  padding: 0 14px;
  border-radius: 8px;
  font-size: 0.79rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === "primary"
        ? theme.colors.brandPrimary
        : $variant === "danger"
          ? theme.colors.status.CRITICAL
          : $variant === "ghost"
            ? "transparent"
            : theme.colors.borderStrong};
  background: ${({ $variant, theme }) =>
    $variant === "primary"
      ? theme.colors.brandPrimary
      : $variant === "danger"
        ? theme.colors.status.CRITICAL
        : $variant === "ghost"
          ? "transparent"
          : theme.colors.bgSurface};
  color: ${({ $variant, $copied, theme }) =>
    $variant === "primary" || $variant === "danger"
      ? "#FFFFFF"
      : $copied
        ? theme.colors.brandPrimary
        : theme.colors.textPrimary};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms ease,
    color 150ms ease,
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({ $variant, theme }) =>
      $variant === "primary"
        ? theme.colors.brandPrimaryHover
        : $variant === "danger"
          ? "#B41A1A"
          : theme.colors.bgSurfaceSubtle};
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.45;
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

function parseDiagnosticOutput(rawText) {
  const clean = fixTextEncoding(rawText || "").trim();
  if (!clean) return { structured: false, items: [], message: "" };
  const parts = clean
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);

  const kvItems = [];
  let allKv = parts.length >= 2;
  for (const segment of parts) {
    const colonIdx = segment.indexOf(":");
    if (colonIdx > 0 && colonIdx < 36 && colonIdx < segment.length - 1) {
      kvItems.push({
        label: segment.slice(0, colonIdx).trim(),
        value: segment.slice(colonIdx + 1).trim(),
      });
    } else {
      allKv = false;
    }
  }

  if (allKv && kvItems.length >= 2) {
    return { structured: true, items: kvItems, message: clean };
  }
  return { structured: false, items: [], message: clean };
}

function getReportStatusMeta(status) {
  if (status === "FAILED") {
    return {
      label: "Falha",
      tone: "danger",
      color: theme.colors.status.CRITICAL,
      bg: theme.colors.statusBg.CRITICAL,
      lead: "A tarefa retornou erro durante a execução",
    };
  }
  if (status === "EXPIRED") {
    return {
      label: "Expirado",
      tone: "danger",
      color: theme.colors.status.CRITICAL,
      bg: theme.colors.statusBg.CRITICAL,
      lead: "Tempo limite atingido sem resposta do agente",
    };
  }
  if (status === "RUNNING") {
    return {
      label: "Executando",
      tone: "brand",
      color: theme.colors.brandPrimary,
      bg: "rgba(45, 106, 79, 0.1)",
      lead: "Enviando ordem assinada ao agente Windows",
    };
  }
  if (status === "DISPATCHED" || status === "PENDING") {
    return {
      label: "Na fila do agente",
      tone: "warning",
      color: theme.colors.status.WARNING,
      bg: theme.colors.statusBg.WARNING,
      lead: "Aguardando retorno real do equipamento",
    };
  }
  return {
    label: "Concluído",
    tone: "ok",
    color: theme.colors.status.NORMAL,
    bg: theme.colors.statusBg.NORMAL,
    lead: "Execução concluída com sucesso",
  };
}

function TelemetryOscilloscope({ telemetryHistory = [] }) {
  const hasRealSeries = Array.isArray(telemetryHistory) && telemetryHistory.length >= 2;

  const { cpuPath, cpuAreaPath, ramPath, lastCpuPt } = useMemo(() => {
    if (!hasRealSeries) {
      return { cpuPath: "", cpuAreaPath: "", ramPath: "", lastCpuPt: null };
    }
    const samples = telemetryHistory.slice(0, 14).reverse();
    const width = 400;
    const height = 36;
    const step = (width - 6) / Math.max(1, samples.length - 1);

    const pts = (key) =>
      samples.map((s, idx) => {
        const val = Math.min(100, Math.max(0, Number(s[key] || 0)));
        return {
          x: Number((idx * step + 2).toFixed(1)),
          y: Number((height - (val / 100) * (height - 8) - 4).toFixed(1)),
        };
      });

    const cpuPts = pts("cpu_usage_pct");
    const ramPts = pts("ram_usage_pct");
    const lineFrom = (arr) => arr.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
    const cPath = lineFrom(cpuPts);
    const areaPath = `${cPath} L${cpuPts[cpuPts.length - 1].x},${height} L${cpuPts[0].x},${height} Z`;

    return {
      cpuPath: cPath,
      cpuAreaPath: areaPath,
      ramPath: lineFrom(ramPts),
      lastCpuPt: cpuPts[cpuPts.length - 1],
    };
  }, [hasRealSeries, telemetryHistory]);

  return (
    <SparkSection>
      <div className="spark-head">
        <span>Histórico de uso ({telemetryHistory.length})</span>
        <div className="spark-legend">
          <span>
            <i style={{ background: theme.colors.brandPrimary }} /> CPU
          </span>
          <span>
            <i style={{ background: theme.colors.status.OFFLINE }} /> RAM
          </span>
        </div>
      </div>

      {!hasRealSeries ? (
        <span className="spark-empty">
          Aguardando ao menos 2 leituras reais para traçar a série temporal.
        </span>
      ) : (
        <svg width="100%" height="36" viewBox="0 0 400 36" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="pulsoCpuGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2D6A4F" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#2D6A4F" stopOpacity="0.01" />
            </linearGradient>
          </defs>
          <line x1="0" y1="12" x2="400" y2="12" stroke="rgba(30,36,32,0.06)" />
          <line x1="0" y1="24" x2="400" y2="24" stroke="rgba(30,36,32,0.06)" />
          <path d={cpuAreaPath} fill="url(#pulsoCpuGrad)" />
          <path d={ramPath} fill="none" stroke="#64748B" strokeWidth="1.4" strokeDasharray="3 2" />
          <path d={cpuPath} fill="none" stroke="#2D6A4F" strokeWidth="1.9" />
          {lastCpuPt && (
            <circle cx={lastCpuPt.x} cy={lastCpuPt.y} r="3" fill="#2D6A4F" />
          )}
        </svg>
      )}
    </SparkSection>
  );
}

export function DiagnosticDrawer({
  diagnostics,
  units = [],
  chatMessages = [],
  taskCatalog = [],
  currentUser,
  onDispatchTask,
  onLoadPrinters,
  onRefreshTelemetryNow,
  onUpdateMachineAgent,
  onSendMessage,
  onUpdateLocation,
  onDeleteMachine,
  onFocusCamera,
}) {
  const [busyTask, setBusyTask] = useState(null);
  const [refreshingNow, setRefreshingNow] = useState(false);
  const [chatText, setChatText] = useState("");
  const [sendingChat, setSendingChat] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeReport, setActiveReport] = useState(null);
  const [lastExecution, setLastExecution] = useState(null);
  const [actionFilter, setActionFilter] = useState("ALL");
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("DIAG"); // 'DIAG' | 'ACTIONS' | 'CHAT'
  const [moveOpen, setMoveOpen] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);
  const [nowTimestamp, setNowTimestamp] = useState(Date.now());
  const [printerPicker, setPrinterPicker] = useState(null);
  const [rebootConfirm, setRebootConfirm] = useState({ open: false, task: null });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const chatBodyRef = useRef(null);
  const copyTimerRef = useRef(null);
  const activeRunIdRef = useRef(0);
  const reportDismissedRunRef = useRef(0);

  function closeActiveReport() {
    reportDismissedRunRef.current = activeRunIdRef.current;
    setActiveReport(null);
  }

  useEffect(() => {
    const timer = setInterval(() => setNowTimestamp(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    };
  }, []);

  // Fecha qualquer card/modal aberto com a tecla Esc
  const anyModalOpen = Boolean(
    activeReport || printerPicker?.open || rebootConfirm.open || deleteConfirmOpen
  );
  useEffect(() => {
    if (!anyModalOpen) return;
    function onKeyDown(e) {
      if (e.key !== "Escape") return;
      if (activeReport) closeActiveReport();
      else if (printerPicker?.open) setPrinterPicker(null);
      else if (rebootConfirm.open) setRebootConfirm({ open: false, task: null });
      else if (deleteConfirmOpen) setDeleteConfirmOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [anyModalOpen, activeReport, printerPicker?.open, rebootConfirm.open, deleteConfirmOpen]);

  useEffect(() => {
    if (activeTab === "CHAT" && chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [chatMessages.length, activeTab]);

  // Fecha seletor de realocação e limpa última execução local ao trocar de máquina
  const machineIdForReset = diagnostics?.machine?.id || null;
  useEffect(() => {
    setMoveOpen(false);
    setLastExecution(null);
  }, [machineIdForReset]);

  const latestTask = diagnostics?.tasks?.[0] || null;
  useEffect(() => {
    if (!latestTask || !activeReport) return;
    if (
      activeReport.taskId === latestTask.task_id ||
      (activeReport.taskCode === latestTask.task_code && activeReport.status === "RUNNING")
    ) {
      if (latestTask.output_summary) {
        const updated = {
          ...activeReport,
          taskId: latestTask.task_id,
          status: latestTask.status || "COMPLETED",
          summary: fixTextEncoding(latestTask.output_summary),
          timestamp: new Date(
            latestTask.completed_at || latestTask.issued_at || Date.now()
          ).toLocaleTimeString("pt-BR"),
        };
        setActiveReport(updated);
        setLastExecution(updated);
        setFeedback({
          type: "ok",
          text: `${activeReport.title}: ${fixTextEncoding(latestTask.output_summary)}`,
        });
      }
    }
  }, [latestTask?.task_id, latestTask?.status, latestTask?.output_summary]);

  function handleCopyValue(key, rawValue) {
    const text = String(rawValue || "").trim();
    if (!text) return;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
    copyTimerRef.current = setTimeout(() => setCopiedKey(null), 1800);
  }

  const machine = diagnostics?.machine || null;

  if (!machine) {
    return (
      <BladeContainer $collapsed={collapsed} aria-label="Painel de diagnóstico da estação">
        <DrawerHeader style={{ borderBottom: "none" }}>
          <MicroSerial>Aguardando agentes</MicroSerial>
          <HostHeading>Nenhuma estação selecionada</HostHeading>
          <LocationRow>
            <span className="loc-text" style={{ whiteSpace: "normal" }}>
              Clique em um equipamento na maquete ou instale o Agente Windows para iniciar o
              monitoramento.
            </span>
          </LocationRow>
        </DrawerHeader>
      </BladeContainer>
    );
  }

  const {
    tasks = [],
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
      : Number(latestSample?.temperature_c || 0);

  const statusColor =
    theme.colors.status[machine.health_status] || theme.colors.status.NORMAL;
  const statusBg =
    theme.colors.statusBg[machine.health_status] || "rgba(30, 36, 32, 0.06)";

  const baseIdle = Math.max(0, Number(machine.idle_seconds || 0));
  const isOffline = machine.health_status === "OFFLINE";
  const offlineSeconds = machine.last_seen_at
    ? Math.max(0, Math.floor((nowTimestamp - new Date(machine.last_seen_at).getTime()) / 1000))
    : 0;
  const secondsSinceSeen = machine.last_seen_at
    ? Math.max(0, Math.floor((nowTimestamp - new Date(machine.last_seen_at).getTime()) / 1000))
    : 0;
  const liveIdleSeconds =
    !isOffline && baseIdle > 0 ? baseIdle + Math.min(secondsSinceSeen, 3) : baseIdle;
  const isLegacyAgent = isAgentOutdated(machine.agent_version, "2.3.0");
  const uptimeShort = formatDurationPt(machine.uptime_seconds || 0, false);

  const activityState = (() => {
    const INACTIVITY_24H = 86400;
    if (isOffline) {
      if (offlineSeconds >= INACTIVITY_24H) {
        return {
          badge: "Inativo >24h",
          alertIcon: true,
          color: theme.colors.status.CRITICAL,
          bg: "rgba(200, 30, 30, 0.06)",
          headline: `Desligado há ${formatDurationPt(offlineSeconds)}`,
        };
      }
      return {
        badge: "Offline",
        alertIcon: false,
        color: theme.colors.status.OFFLINE,
        bg: theme.colors.bgSurfaceSubtle,
        headline: `Desligado há ${formatDurationPt(offlineSeconds)}`,
      };
    }
    if (liveIdleSeconds >= INACTIVITY_24H) {
      return {
        badge: "Inativo >24h",
        alertIcon: true,
        color: theme.colors.status.CRITICAL,
        bg: "rgba(200, 30, 30, 0.06)",
        headline: `Sem interação há ${formatDurationPt(liveIdleSeconds)}`,
      };
    }
    if (isLegacyAgent) {
      return {
        badge: cleanDisplayVersion(machine.agent_version || "2.2.0"),
        alertIcon: false,
        color: theme.colors.status.WARNING,
        bg: "rgba(180, 83, 9, 0.07)",
        headline: "Agente desatualizado · atualização recomendada",
      };
    }
    if (liveIdleSeconds < 180) {
      return {
        badge: `Ligado ${uptimeShort}`,
        alertIcon: false,
        color: theme.colors.status.NORMAL,
        bg: theme.colors.bgSurfaceSubtle,
        headline: "Em uso ativo agora",
      };
    }
    return {
      badge: `Ligado ${uptimeShort}`,
      alertIcon: false,
      color: theme.colors.status.WARNING,
      bg: "rgba(180, 83, 9, 0.06)",
      headline: `Ocioso há ${formatDurationPt(liveIdleSeconds)}`,
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

  async function handleSendChatMessage(e) {
    e.preventDefault();
    if (!chatText.trim() || !onSendMessage) return;
    setSendingChat(true);
    try {
      await onSendMessage(machine.id, chatText.trim());
      setFeedback({
        type: "ok",
        text: `Mensagem enviada para ${machine.hostname}.`,
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
      setMoveOpen(false);
      setFeedback({
        type: "ok",
        text: "Localização da estação atualizada.",
      });
    } catch (err) {
      setFeedback({ type: "err", text: `Erro ao mover estação: ${err.message}` });
    }
  }

  async function handleRunTask(task) {
    if (task.code === "INSTALL_APPROVED_PRINTER") {
      openPrinterPicker(task);
      return;
    }
    if (task.code === "REBOOT_WORKSTATION") {
      setRebootConfirm({ open: true, task });
      return;
    }
    await dispatchTask(task);
  }

  async function dispatchTask(task, params = {}) {
    const meta = getTaskMeta(task);
    const cleanTitle = meta.label || fixTextEncoding(task.title);
    const runId = ++activeRunIdRef.current;
    const setReportIfVisible = (reportObj) => {
      setLastExecution(reportObj);
      if (reportDismissedRunRef.current !== runId) {
        setActiveReport(reportObj);
      }
    };

    setBusyTask(task.code);
    setFeedback({
      type: "busy",
      text: `Executando "${cleanTitle}" em ${machine.hostname}...`,
    });
    const initialReport = {
      taskId: null,
      taskCode: task.code,
      title: cleanTitle,
      status: "RUNNING",
      summary: `Enviando "${cleanTitle}" para o Agente Windows (${machine.ip_address})...`,
      timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      taskRef: task,
      paramsRef: params,
    };
    setActiveReport(initialReport);
    setLastExecution(initialReport);

    try {
      if (task.code === "SYNC_TELEMETRY_NOW" && onRefreshTelemetryNow) {
        const res = await onRefreshTelemetryNow(machine.id);
        const summaryMsg =
          `Estação: ${machine.hostname} | IPv4: ${machine.ip_address} | CPU: ${displayCpu.toFixed(1)}% | RAM: ${displayRam.toFixed(1)}% | Disco: ${displayDisk.toFixed(1)}% | Temperatura: ${displayTemp > 0 ? `${displayTemp.toFixed(1)}°C` : "N/D"}`;
        setFeedback({ type: "ok", text: res.message || summaryMsg });
        setReportIfVisible({
          taskId: `sync_${Date.now().toString().slice(-5)}`,
          taskCode: task.code,
          title: cleanTitle,
          status: "COMPLETED",
          summary: summaryMsg,
          timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          taskRef: task,
          paramsRef: params,
        });
        return;
      }

      if (task.code === "UPDATE_AGENT" && onUpdateMachineAgent) {
        const res = await onUpdateMachineAgent(machine.id);
        const summaryMsg = res.message || "Atualização OTA silenciosa despachada para o computador.";
        setFeedback({ type: "ok", text: `${cleanTitle}: ${summaryMsg}` });
        setReportIfVisible({
          taskId: `ota_${Date.now().toString().slice(-5)}`,
          taskCode: task.code,
          title: cleanTitle,
          status: "COMPLETED",
          summary: summaryMsg,
          timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
          taskRef: task,
          paramsRef: params,
        });
        return;
      }

      const res = await onDispatchTask({
        machineId: machine.id,
        taskCode: task.code,
        parameters: params,
      });
      const returnedStatus = res?.task?.status || "DISPATCHED";
      const isQueued = returnedStatus === "DISPATCHED" || returnedStatus === "PENDING";
      setFeedback({
        type: isQueued ? "busy" : returnedStatus === "FAILED" ? "err" : "ok",
        text: isQueued
          ? `Ordem enfileirada para ${machine.hostname} (aguardando execução real do agente).`
          : `Retorno de ${machine.hostname}: ${fixTextEncoding(res?.task?.output_summary || returnedStatus)}`,
      });
      if (res?.task) {
        setReportIfVisible({
          taskId: res.task.task_id,
          taskCode: res.task.task_code,
          title: cleanTitle,
          status: returnedStatus,
          summary:
            fixTextEncoding(res.task.output_summary) ||
            "Ordem autenticada na fila do Agente Windows. O retorno real aparecerá automaticamente assim que a estação concluir a tarefa (TTL 120s).",
          timestamp: new Date(res.task.issued_at || Date.now()).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          taskRef: task,
          paramsRef: params,
        });
      }
    } catch (err) {
      setFeedback({ type: "err", text: `Falha: ${err.message}` });
      setReportIfVisible({
        taskId: null,
        taskCode: task.code,
        title: cleanTitle,
        status: "FAILED",
        summary: `Erro ao despachar comando: ${err.message}`,
        timestamp: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
        taskRef: task,
        paramsRef: params,
      });
    } finally {
      setBusyTask(null);
    }
  }

  async function openPrinterPicker(task) {
    setPrinterPicker({
      open: true,
      task,
      loading: true,
      printers: [],
      selectedId: null,
      error: null,
    });
    try {
      const list = onLoadPrinters ? await onLoadPrinters(machine.unit_id, machine.id) : [];
      setPrinterPicker((prev) =>
        prev
          ? {
              ...prev,
              loading: false,
              printers: list,
              selectedId: list[0]?.id ?? null,
              error: list.length
                ? null
                : "Nenhuma impressora encontrada na rede desta estação. Verifique se o agente já enviou um heartbeat com a descoberta.",
            }
          : prev
      );
    } catch (err) {
      const raw = String(err?.message || "");
      const stale = /Rota n[ãa]o encontrada|404/i.test(raw);
      setPrinterPicker((prev) =>
        prev
          ? {
              ...prev,
              loading: false,
              error: stale
                ? "Servidor desatualizado: a rota /api/printers não existe no backend em execução."
                : `Falha ao carregar impressoras: ${raw}`,
            }
          : prev
      );
    }
  }

  async function confirmPrinterInstall() {
    if (!printerPicker) return;
    const printer = printerPicker.printers.find((p) => p.id === printerPicker.selectedId);
    if (!printer) return;
    const task = printerPicker.task;
    setPrinterPicker(null);
    await dispatchTask(task, {
      printer_ip: printer.ip_address,
      printer_name: printer.name,
    });
  }

  async function confirmReboot() {
    const task = rebootConfirm.task;
    setRebootConfirm({ open: false, task: null });
    if (task) await dispatchTask(task);
  }

  const canMoveMachine = units.length > 0 && Boolean(onUpdateLocation) && currentUser?.role !== "VIEWER";

  return (
    <>
      <BladeContainer $collapsed={collapsed} aria-label="Painel inspetor do computador">
        {/* ZONA 1: CABEÇALHO FIXO ENXUTO */}
        <DrawerHeader>
          <HeaderTopRow>
            <HeaderMetaCluster>
              <MicroSerial>
                #{machine.id} · {cleanDisplayVersion(machine.agent_version)}
              </MicroSerial>
              <StatusBadge $color={statusColor} $bgColor={statusBg}>
                <span className="dot" />
                {STATUS_PRETTY[machine.health_status] || machine.health_status}
              </StatusBadge>
            </HeaderMetaCluster>

            <HeaderTools>
              <IconToolBtn
                type="button"
                onClick={onFocusCamera}
                title="Focar câmera nesta estação"
                aria-label="Focar câmera nesta estação"
              >
                <IconCrosshair size={15} />
              </IconToolBtn>
              <IconToolBtn
                type="button"
                onClick={() => setCollapsed((prev) => !prev)}
                title={collapsed ? "Expandir painel" : "Recolher painel"}
                aria-label={collapsed ? "Expandir painel" : "Recolher painel"}
              >
                {collapsed ? <IconChevronLeft size={15} /> : <IconChevronRight size={15} />}
              </IconToolBtn>
              {onDeleteMachine && currentUser?.role !== "VIEWER" && (
                <IconToolBtn
                  type="button"
                  $danger
                  onClick={() => setDeleteConfirmOpen(true)}
                  title="Remover equipamento do painel"
                  aria-label="Remover equipamento do painel"
                >
                  <IconTrash size={15} />
                </IconToolBtn>
              )}
            </HeaderTools>
          </HeaderTopRow>

          <div>
            <HostHeading>{fixTextEncoding(machine.hostname)}</HostHeading>
            <LocationRow>
              <span className="loc-text" title={`${fixTextEncoding(machine.unit_name)} · ${fixTextEncoding(machine.sector_name)}`}>
                {fixTextEncoding(machine.unit_name)} · {fixTextEncoding(machine.sector_name)}
              </span>
              {canMoveMachine && !collapsed && (
                <MoveToggleBtn
                  type="button"
                  $open={moveOpen}
                  onClick={() => setMoveOpen((prev) => !prev)}
                  aria-expanded={moveOpen}
                  title="Mover estação para outra unidade ou setor"
                >
                  <IconMapPin size={11} />
                  <span>{moveOpen ? "Fechar" : "Mover"}</span>
                </MoveToggleBtn>
              )}
            </LocationRow>
          </div>

          {moveOpen && canMoveMachine && !collapsed && (
            <LocationSelect
              aria-label="Selecionar nova unidade e setor da estação"
              value={`${machine.unit_id}:${machine.sector_id}`}
              onChange={handleSectorChange}
            >
              {units.map((u) =>
                (u.sectors || []).map((s) => (
                  <option key={`${u.id}:${s.id}`} value={`${u.id}:${s.id}`}>
                    {fixTextEncoding(u.name)} — {fixTextEncoding(s.name)}
                  </option>
                ))
              )}
            </LocationSelect>
          )}

          <ActivityInlineStrip $bg={activityState.bg} $color={activityState.color}>
            <span className="act-left">
              <span className="act-dot" />
              <span className="act-headline">{activityState.headline}</span>
            </span>
            <span className="act-right">
              {activityState.alertIcon && <IconAlertTriangle size={12} />}
              <span>{activityState.badge}</span>
            </span>
          </ActivityInlineStrip>
        </DrawerHeader>

        {/* ZONA 2: 3 ABAS COM FILETE INFERIOR DE 2PX */}
        {!collapsed && (
          <TabStrip role="tablist" aria-label="Abas do inspetor de estação">
            <TabUnderlineBtn
              type="button"
              role="tab"
              aria-selected={activeTab === "DIAG"}
              $active={activeTab === "DIAG"}
              onClick={() => setActiveTab("DIAG")}
            >
              <span>Visão geral</span>
            </TabUnderlineBtn>
            <TabUnderlineBtn
              type="button"
              role="tab"
              aria-selected={activeTab === "ACTIONS"}
              $active={activeTab === "ACTIONS"}
              onClick={() => setActiveTab("ACTIONS")}
            >
              <span>Ações</span>
              <span className="tab-count">{taskCatalog.length}</span>
            </TabUnderlineBtn>
            {onSendMessage && (
              <TabUnderlineBtn
                type="button"
                role="tab"
                aria-selected={activeTab === "CHAT"}
                $active={activeTab === "CHAT"}
                $highlight={chatMessages.length > 0}
                onClick={() => setActiveTab("CHAT")}
              >
                <span>Chat</span>
                <span className="tab-count">{chatMessages.length}</span>
              </TabUnderlineBtn>
            )}
          </TabStrip>
        )}

        {/* ZONA 3: CORPO ROLÁVEL */}
        <DrawerBody ref={activeTab === "CHAT" ? chatBodyRef : null}>
          {/* ABA 1: VISÃO GERAL (ou modo recolhido) */}
          {(collapsed || activeTab === "DIAG") && (
            <>
              <MetricsStrip>
                <MetricCell $tone={metricToneColor(displayCpu, 80, 92)}>
                  <span className="m-lbl">CPU</span>
                  <span className="m-val">{displayCpu.toFixed(0)}%</span>
                  <div className="m-track">
                    <i
                      style={{
                        width: `${Math.min(100, displayCpu)}%`,
                        background: metricBarColor(displayCpu, 80, 92),
                      }}
                    />
                  </div>
                </MetricCell>

                <MetricCell $tone={metricToneColor(displayRam, 80, 92)}>
                  <span className="m-lbl">RAM</span>
                  <span className="m-val">{displayRam.toFixed(0)}%</span>
                  <div className="m-track">
                    <i
                      style={{
                        width: `${Math.min(100, displayRam)}%`,
                        background: metricBarColor(displayRam, 80, 92, theme.colors.brandPrimaryLight),
                      }}
                    />
                  </div>
                </MetricCell>

                <MetricCell $tone={metricToneColor(displayDisk, 82, 92)}>
                  <span className="m-lbl">Disco</span>
                  <span className="m-val">{displayDisk.toFixed(0)}%</span>
                  <div className="m-track">
                    <i
                      style={{
                        width: `${Math.min(100, displayDisk)}%`,
                        background: metricBarColor(displayDisk, 82, 92, theme.colors.status.OFFLINE),
                      }}
                    />
                  </div>
                </MetricCell>

                <MetricCell $tone={displayTemp > 0 ? metricToneColor(displayTemp, 75, 85) : theme.colors.textMuted}>
                  <span className="m-lbl">Temp.</span>
                  <span className="m-val">
                    {displayTemp > 0 ? `${displayTemp.toFixed(0)}°C` : "N/D"}
                  </span>
                  <div className="m-track">
                    <i
                      style={{
                        width: `${displayTemp > 0 ? Math.min(100, (displayTemp / 95) * 100) : 0}%`,
                        background: metricBarColor(displayTemp, 75, 85, theme.colors.brandPrimaryLight),
                      }}
                    />
                  </div>
                </MetricCell>
              </MetricsStrip>

              {isOffline && (
                <OfflineNote>
                  <strong>Equipamento desconectado.</strong> Último contato em{" "}
                  {machine.last_seen_at
                    ? new Date(machine.last_seen_at).toLocaleString("pt-BR")
                    : "horário anterior"}
                  .
                </OfflineNote>
              )}

              {!collapsed && (
                <>
                  <TelemetryOscilloscope telemetryHistory={activeTelemetryHistory} />

                  <SpecRowsList>
                    <SpecRow>
                      <dt>Endereço IP</dt>
                      <dd className="mono">
                        <CopyableValueBtn
                          type="button"
                          $copied={copiedKey === "ip"}
                          onClick={() => handleCopyValue("ip", machine.ip_address)}
                          title="Copiar endereço IPv4"
                        >
                          <span>{machine.ip_address || "0.0.0.0"}</span>
                          <span className="copy-ico">
                            {copiedKey === "ip" ? <IconCheck size={13} /> : <IconCopy size={12} />}
                          </span>
                        </CopyableValueBtn>
                      </dd>
                    </SpecRow>

                    <SpecRow>
                      <dt>Endereço MAC</dt>
                      <dd className="mono">
                        {machine.mac_address ? (
                          <CopyableValueBtn
                            type="button"
                            $copied={copiedKey === "mac"}
                            onClick={() => handleCopyValue("mac", machine.mac_address)}
                            title="Copiar endereço MAC"
                          >
                            <span>{machine.mac_address}</span>
                            <span className="copy-ico">
                              {copiedKey === "mac" ? <IconCheck size={13} /> : <IconCopy size={12} />}
                            </span>
                          </CopyableValueBtn>
                        ) : (
                          <span style={{ color: theme.colors.textMuted }}>Não informado</span>
                        )}
                      </dd>
                    </SpecRow>

                    <SpecRow>
                      <dt>Spooler de impressão</dt>
                      <dd
                        style={{
                          color: machine.spooler_running
                            ? theme.colors.status.NORMAL
                            : theme.colors.status.CRITICAL,
                        }}
                      >
                        <IconPrinter size={13} />
                        <span>{machine.spooler_running ? "Ativo" : "Parado"}</span>
                      </dd>
                    </SpecRow>

                    <SpecRow>
                      <dt>Equipamento</dt>
                      <dd>
                        {fixTextEncoding(machine.manufacturer || "N/D")}{" "}
                        {fixTextEncoding(machine.model || "")}
                      </dd>
                    </SpecRow>

                    <SpecRow>
                      <dt>Serial</dt>
                      <dd className="mono">
                        {machine.serial_number ? (
                          <CopyableValueBtn
                            type="button"
                            $copied={copiedKey === "serial"}
                            onClick={() => handleCopyValue("serial", machine.serial_number)}
                            title={`Copiar serial (confiança ${machine.identity_confidence || "LOW"})`}
                          >
                            <span>{machine.serial_number}</span>
                            <span style={{ color: theme.colors.textMuted, fontSize: "0.68rem" }}>
                              {machine.identity_confidence || "LOW"}
                            </span>
                            <span className="copy-ico">
                              {copiedKey === "serial" ? <IconCheck size={13} /> : <IconCopy size={12} />}
                            </span>
                          </CopyableValueBtn>
                        ) : (
                          <span style={{ color: theme.colors.textMuted }}>Não informado</span>
                        )}
                      </dd>
                    </SpecRow>

                    <SpecRow>
                      <dt>Processador</dt>
                      <dd>{fixTextEncoding(machine.cpu_model || machine.processor || "Não informado")}</dd>
                    </SpecRow>

                    <SpecRow>
                      <dt>Memória e disco</dt>
                      <dd className="mono">
                        {(Number(machine.ram_total_mb || 8192) / 1024).toFixed(0)} GB ·{" "}
                        {machine.disk_total_gb || 0} GB {machine.disk_type || "N/D"}
                      </dd>
                    </SpecRow>

                    <SpecRow>
                      <dt>Sistema</dt>
                      <dd>{fixTextEncoding(machine.os_version || "Windows")}</dd>
                    </SpecRow>
                  </SpecRowsList>
                </>
              )}
            </>
          )}

          {/* ABA 2: CATÁLOGO AGRUPADO DE AÇÕES REMOTAS */}
          {!collapsed && activeTab === "ACTIONS" && (() => {
            const groupedTasks = ACTION_GROUPS.map((grp) => ({
              ...grp,
              items: taskCatalog.filter((t) => getTaskMeta(t).group === grp.id),
            })).filter(
              (grp) => grp.items.length > 0 && (actionFilter === "ALL" || actionFilter === grp.id)
            );

            return (
              <>
                <SectionLead>
                  <span>Catálogo homologado</span>
                  <span className="lead-meta">HMAC-SHA256</span>
                </SectionLead>

                <ActionFilterBar role="group" aria-label="Filtrar ações por categoria">
                  <ActionFilterPill
                    type="button"
                    $active={actionFilter === "ALL"}
                    onClick={() => setActionFilter("ALL")}
                  >
                    Todas ({taskCatalog.length})
                  </ActionFilterPill>
                  {ACTION_GROUPS.map((grp) => (
                    <ActionFilterPill
                      key={grp.id}
                      type="button"
                      $active={actionFilter === grp.id}
                      onClick={() => setActionFilter(grp.id)}
                    >
                      {grp.id === "SYSTEM" ? "Sistema" : grp.label}
                    </ActionFilterPill>
                  ))}
                </ActionFilterBar>

                {groupedTasks.map((grp) => (
                  <ActionGroupBlock key={grp.id}>
                    <ActionGroupHeader>
                      <span>{grp.label}</span>
                      <span className="grp-count">{grp.items.length}</span>
                    </ActionGroupHeader>

                    <ActionRowList>
                      {grp.items.map((task) => {
                        const allowed = task.permittedForCurrentUser;
                        const isBusy = busyTask === task.code;
                        const meta = getTaskMeta(task);
                        const TaskIcon = meta.Icon;
                        const showRiskBadge =
                          task.riskLevel === "MEDIUM" || task.riskLevel === "HIGH";

                        return (
                          <ActionRowBtn
                            key={task.code}
                            type="button"
                            $risk={task.riskLevel}
                            disabled={!allowed || isBusy}
                            onClick={() => handleRunTask(task)}
                            title={fixTextEncoding(task.description)}
                          >
                            <span className="act-ico">
                              <TaskIcon size={15} />
                            </span>

                            <span className="act-copy">
                              <span className="act-title">{meta.label}</span>
                              <span className="act-sub">{meta.subtitle}</span>
                            </span>

                            <span className="act-trail">
                              {!allowed ? (
                                <span className="act-locked">Restrito</span>
                              ) : isBusy ? (
                                <span className="act-busy">
                                  <i />
                                  Enviando
                                </span>
                              ) : (
                                <>
                                  {showRiskBadge && (
                                    <span className="act-risk-pill">
                                      {RISK_LABELS[task.riskLevel] || task.riskLevel}
                                    </span>
                                  )}
                                  <span className="act-chev">
                                    <IconChevronRight size={14} />
                                  </span>
                                </>
                              )}
                            </span>
                          </ActionRowBtn>
                        );
                      })}
                    </ActionRowList>
                  </ActionGroupBlock>
                ))}
              </>
            );
          })()}

          {/* ABA 3: CHAT DEDICADO EM ALTURA COMPLETA */}
          {!collapsed && activeTab === "CHAT" && onSendMessage && (
            <ChatConversation>
              {chatMessages.length === 0 ? (
                <ChatEmptyState>
                  <strong>Nenhuma mensagem nesta estação</strong>
                  Envie uma mensagem abaixo para abrir o chat diretamente na tela do usuário logado.
                </ChatEmptyState>
              ) : (
                chatMessages.slice(-40).map((m) => {
                  const fromTi = m.direction === "SERVER_TO_CLIENT";
                  const timeStr = m.created_at
                    ? new Date(m.created_at).toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "";
                  return (
                    <ChatBubbleRow key={m.id} $fromTi={fromTi}>
                      <ChatBubble $fromTi={fromTi}>
                        <div className="cb-head">
                          <span className="cb-sender">{fixTextEncoding(m.sender)}</span>
                          {timeStr && <span className="cb-time">{timeStr}</span>}
                        </div>
                        <div>{fixTextEncoding(m.message)}</div>
                      </ChatBubble>
                    </ChatBubbleRow>
                  );
                })
              )}
            </ChatConversation>
          )}
        </DrawerBody>

        {/* ZONA 4: RODAPÉ CONTEXTUAL FIXO */}
        {!collapsed && activeTab === "DIAG" && (
          <DrawerFooter>
            <PrimaryFooterBtn
              type="button"
              onClick={handleManualRefresh}
              disabled={refreshingNow}
            >
              <IconRefresh size={14} />
              <span>
                {refreshingNow ? "Atualizando telemetria..." : "Atualizar telemetria agora"}
              </span>
            </PrimaryFooterBtn>
          </DrawerFooter>
        )}

        {!collapsed && activeTab === "ACTIONS" && (() => {
          const histTask = tasks[0] || null;
          const summaryItem =
            lastExecution ||
            (histTask
              ? {
                  taskId: histTask.task_id,
                  taskCode: histTask.task_code,
                  title: getTaskMeta({ code: histTask.task_code, title: histTask.task_code }).label,
                  status: histTask.status || "COMPLETED",
                  summary: fixTextEncoding(histTask.output_summary || "Execução registrada no histórico."),
                  timestamp: new Date(
                    histTask.completed_at || histTask.issued_at || Date.now()
                  ).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                  taskRef: taskCatalog.find((t) => t.code === histTask.task_code) || null,
                }
              : null);

          const statusMeta = summaryItem ? getReportStatusMeta(summaryItem.status) : null;
          const isPulsing =
            summaryItem &&
            (summaryItem.status === "RUNNING" ||
              summaryItem.status === "DISPATCHED" ||
              summaryItem.status === "PENDING");

          return (
            <DrawerFooter>
              <LastExecStrip
                $tone={statusMeta ? statusMeta.color : theme.colors.textMuted}
                $pulsing={Boolean(isPulsing)}
              >
                <div className="le-left">
                  <span className="le-dot" />
                  <div className="le-text">
                    <span className="le-title">
                      {summaryItem
                        ? `Última ação: ${summaryItem.title}`
                        : "Pronto para executar ações"}
                    </span>
                    <span className="le-meta">
                      {summaryItem
                        ? `${statusMeta.label} · ${summaryItem.timestamp}`
                        : "Clique em uma ação acima para enviar ao agente"}
                    </span>
                  </div>
                </div>
                {summaryItem && (
                  <button
                    type="button"
                    className="le-btn"
                    onClick={() => setActiveReport(summaryItem)}
                  >
                    Ver retorno
                  </button>
                )}
              </LastExecStrip>
            </DrawerFooter>
          );
        })()}

        {!collapsed && activeTab === "CHAT" && onSendMessage && (
          <DrawerFooter>
            {currentUser?.role !== "VIEWER" ? (
              <ChatForm onSubmit={handleSendChatMessage}>
                <input
                  type="text"
                  aria-label="Mensagem para o operador do computador"
                  placeholder="Escrever mensagem para a estação..."
                  value={chatText}
                  onChange={(e) => setChatText(e.target.value)}
                />
                <button type="submit" disabled={sendingChat || !chatText.trim()}>
                  <IconSend size={13} />
                  <span>Enviar</span>
                </button>
              </ChatForm>
            ) : (
              <div style={{ fontSize: "0.74rem", color: theme.colors.textSecondary }}>
                Modo somente leitura: apenas Suporte N1 ou Admin N2 pode enviar mensagens.
              </div>
            )}
          </DrawerFooter>
        )}
      </BladeContainer>

      {/* MODAIS UNIFICADOS — CICLO #56 */}
      {printerPicker?.open && (
        <DiagnosticModalBackdrop onClick={() => setPrinterPicker(null)}>
          <DiagnosticModalCard
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Instalar impressora homologada"
          >
            <ModalHead>
              <div className="mh-left">
                <ModalIconTile $tone="brand">
                  <IconPrinter size={18} />
                </ModalIconTile>
                <div className="mh-copy">
                  <h3>Instalar impressora homologada</h3>
                  <div className="m-sub">
                    <span>{fixTextEncoding(machine.hostname)}</span>
                    <span>·</span>
                    <span className="m-mono">{machine.ip_address}</span>
                  </div>
                </div>
              </div>
              <div className="mh-right">
                <IconToolBtn type="button" onClick={() => setPrinterPicker(null)} aria-label="Fechar">
                  <IconClose size={15} />
                </IconToolBtn>
              </div>
            </ModalHead>

            {printerPicker.loading && (
              <OutputNarrativeBox $tone="warning">
                <span className="on-ico">
                  <IconClock size={15} />
                </span>
                <span className="on-body">
                  <span className="on-lead">Buscando impressoras na sub-rede</span>
                  <span className="on-msg">
                    Consultando o catálogo homologado e a descoberta de rede da estação...
                  </span>
                </span>
              </OutputNarrativeBox>
            )}

            {printerPicker.error && <ModalNotice $tone="danger">{printerPicker.error}</ModalNotice>}

            {!printerPicker.loading && printerPicker.printers.length > 0 && (
              <PrinterList>
                {printerPicker.printers.map((printer) => {
                  const selected = printer.id === printerPicker.selectedId;
                  return (
                    <PrinterOptionCard
                      key={printer.id}
                      $selected={selected}
                      $source={printer.source}
                    >
                      <input
                        type="radio"
                        name="approved_printer"
                        checked={selected}
                        onChange={() =>
                          setPrinterPicker((prev) =>
                            prev ? { ...prev, selectedId: printer.id } : prev
                          )
                        }
                      />
                      <span className="pr-left">
                        <span className="pr-ico">
                          <IconPrinter size={15} />
                        </span>
                        <span className="pr-info">
                          <span className="pr-name">
                            <span>{printer.name}</span>
                            <span className="pr-tag">
                              {printer.source === "NETWORK"
                                ? "Rede"
                                : printer.source === "INSTALLED"
                                  ? "Instalada"
                                  : "Homologada"}
                            </span>
                          </span>
                          <span className="pr-ip">
                            {printer.ip_address}
                            {printer.model ? ` · ${printer.model}` : ""}
                          </span>
                        </span>
                      </span>
                      <span className="pr-check">
                        {selected && <IconCheck size={11} strokeWidth={2.4} />}
                      </span>
                    </PrinterOptionCard>
                  );
                })}
              </PrinterList>
            )}

            <ModalFooterRow>
              <div className="mf-left">
                <span style={{ fontSize: "0.71rem", color: theme.colors.textMuted }}>
                  Risco Alto · Admin N2
                </span>
              </div>
              <div className="mf-right">
                <ModalBtn type="button" onClick={() => setPrinterPicker(null)}>
                  Cancelar
                </ModalBtn>
                <ModalBtn
                  type="button"
                  $variant="primary"
                  disabled={!printerPicker.selectedId}
                  onClick={confirmPrinterInstall}
                >
                  Instalar impressora
                </ModalBtn>
              </div>
            </ModalFooterRow>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}

      {rebootConfirm.open && (
        <DiagnosticModalBackdrop onClick={() => setRebootConfirm({ open: false, task: null })}>
          <DiagnosticModalCard
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Confirmar reinicialização da estação"
          >
            <ModalHead>
              <div className="mh-left">
                <ModalIconTile $tone="danger">
                  <IconPower size={18} />
                </ModalIconTile>
                <div className="mh-copy">
                  <h3>Reiniciar estação de trabalho</h3>
                  <div className="m-sub">
                    <span>Ação de alto impacto</span>
                    <span>·</span>
                    <span>Requer confirmação</span>
                  </div>
                </div>
              </div>
              <div className="mh-right">
                <IconToolBtn
                  type="button"
                  onClick={() => setRebootConfirm({ open: false, task: null })}
                  aria-label="Fechar"
                >
                  <IconClose size={15} />
                </IconToolBtn>
              </div>
            </ModalHead>

            <TargetSummaryStrip>
              <div className="ts-cell">
                <span className="ts-k">Estação</span>
                <span className="ts-v">{fixTextEncoding(machine.hostname)}</span>
              </div>
              <div className="ts-cell">
                <span className="ts-k">Endereço IP</span>
                <span className="ts-v">{machine.ip_address || "0.0.0.0"}</span>
              </div>
              <div className="ts-cell">
                <span className="ts-k">Aviso na tela</span>
                <span className="ts-v">30 segundos</span>
              </div>
            </TargetSummaryStrip>

            <ModalNotice $tone="warning">
              O Windows exibirá um aviso de 30 segundos para que o operador salve os documentos
              abertos antes da reinicialização. A ordem será registrada na auditoria.
            </ModalNotice>

            <ModalFooterRow>
              <div className="mf-left">
                <span style={{ fontSize: "0.71rem", color: theme.colors.textMuted }}>
                  Esc para cancelar
                </span>
              </div>
              <div className="mf-right">
                <ModalBtn
                  type="button"
                  onClick={() => setRebootConfirm({ open: false, task: null })}
                >
                  Cancelar
                </ModalBtn>
                <ModalBtn type="button" $variant="danger" onClick={confirmReboot}>
                  <IconPower size={13} />
                  <span>Confirmar reinício</span>
                </ModalBtn>
              </div>
            </ModalFooterRow>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}

      {activeReport && (() => {
        const repMeta = getTaskMeta({
          code: activeReport.taskCode,
          title: activeReport.title,
        });
        const RepIcon = repMeta.Icon;
        const st = getReportStatusMeta(activeReport.status);
        const parsed = parseDiagnosticOutput(activeReport.summary);
        const isWaiting =
          activeReport.status === "RUNNING" ||
          activeReport.status === "DISPATCHED" ||
          activeReport.status === "PENDING";
        const isError = activeReport.status === "FAILED" || activeReport.status === "EXPIRED";
        const step2State = isError ? "error" : isWaiting ? "active" : "done";
        const step3State = isError ? "error" : isWaiting ? "pending" : "done";

        return (
          <DiagnosticModalBackdrop onClick={closeActiveReport}>
            <DiagnosticModalCard
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Execução da ação ${activeReport.title}`}
            >
              <ModalHead>
                <div className="mh-left">
                  <ModalIconTile $tone={st.tone === "danger" ? "danger" : st.tone === "warning" ? "warning" : "brand"}>
                    <RepIcon size={18} />
                  </ModalIconTile>
                  <div className="mh-copy">
                    <h3>{activeReport.title}</h3>
                    <div className="m-sub">
                      <span>{fixTextEncoding(machine.hostname)}</span>
                      <span>·</span>
                      <span className="m-mono">{machine.ip_address}</span>
                      <span>·</span>
                      <span className="m-mono">{activeReport.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="mh-right">
                  <StatusBadge $color={st.color} $bgColor={st.bg}>
                    <span className="dot" />
                    {st.label}
                  </StatusBadge>
                  <IconToolBtn
                    type="button"
                    onClick={closeActiveReport}
                    aria-label="Fechar"
                  >
                    <IconClose size={15} />
                  </IconToolBtn>
                </div>
              </ModalHead>

              <ExecutionStepper aria-label="Etapas da execução remota">
                <StepItem $state="done">
                  <span className="st-mark">
                    <IconCheck size={10} strokeWidth={2.5} />
                  </span>
                  <span className="st-lbl">Assinada (HMAC)</span>
                </StepItem>
                <StepItem $state={step2State}>
                  <span className="st-mark">
                    {step2State === "done" ? (
                      <IconCheck size={10} strokeWidth={2.5} />
                    ) : step2State === "error" ? (
                      "!"
                    ) : (
                      "2"
                    )}
                  </span>
                  <span className="st-lbl">
                    {step2State === "active" ? "Na fila do agente" : "Enviada ao agente"}
                  </span>
                </StepItem>
                <StepItem $state={step3State}>
                  <span className="st-mark">
                    {step3State === "done" ? (
                      <IconCheck size={10} strokeWidth={2.5} />
                    ) : step3State === "error" ? (
                      "!"
                    ) : (
                      "3"
                    )}
                  </span>
                  <span className="st-lbl">
                    {step3State === "error" ? "Falha / TTL" : "Retorno recebido"}
                  </span>
                </StepItem>
              </ExecutionStepper>

              {parsed.structured ? (
                <OutputSpecTable>
                  {parsed.items.map((item, idx) => (
                    <OutputSpecRow key={idx}>
                      <dt>{item.label}</dt>
                      <dd>{item.value}</dd>
                    </OutputSpecRow>
                  ))}
                </OutputSpecTable>
              ) : (
                <OutputNarrativeBox $tone={st.tone === "danger" ? "danger" : st.tone === "warning" ? "warning" : "brand"}>
                  <span className="on-ico">
                    {isError ? (
                      <IconAlertTriangle size={16} />
                    ) : isWaiting ? (
                      <IconClock size={16} />
                    ) : (
                      <IconCheck size={16} />
                    )}
                  </span>
                  <span className="on-body">
                    <span className="on-lead">{st.lead}</span>
                    <span className="on-msg">{parsed.message}</span>
                  </span>
                </OutputNarrativeBox>
              )}

              <ModalFooterRow>
                <div className="mf-left">
                  <ModalBtn
                    type="button"
                    $variant="ghost"
                    $copied={copiedKey === "report"}
                    onClick={() => handleCopyValue("report", parsed.message)}
                    title="Copiar saída completa da tarefa"
                  >
                    {copiedKey === "report" ? <IconCheck size={13} /> : <IconCopy size={13} />}
                    <span>{copiedKey === "report" ? "Copiado" : "Copiar resultado"}</span>
                  </ModalBtn>
                </div>
                <div className="mf-right">
                  {activeReport.taskRef && !isWaiting && (
                    <ModalBtn
                      type="button"
                      onClick={() =>
                        dispatchTask(activeReport.taskRef, activeReport.paramsRef || {})
                      }
                    >
                      <IconRefresh size={13} />
                      <span>Executar novamente</span>
                    </ModalBtn>
                  )}
                  <ModalBtn
                    type="button"
                    $variant="primary"
                    onClick={closeActiveReport}
                  >
                    Fechar
                  </ModalBtn>
                </div>
              </ModalFooterRow>
            </DiagnosticModalCard>
          </DiagnosticModalBackdrop>
        );
      })()}

      {deleteConfirmOpen && (
        <DiagnosticModalBackdrop onClick={() => setDeleteConfirmOpen(false)}>
          <DiagnosticModalCard
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Confirmar remoção de equipamento"
          >
            <ModalHead>
              <div className="mh-left">
                <ModalIconTile $tone="danger">
                  <IconTrash size={18} />
                </ModalIconTile>
                <div className="mh-copy">
                  <h3>Remover equipamento do painel</h3>
                  <div className="m-sub">
                    <span>Ação permanente</span>
                    <span>·</span>
                    <span>Registrada na auditoria</span>
                  </div>
                </div>
              </div>
              <div className="mh-right">
                <IconToolBtn
                  type="button"
                  onClick={() => setDeleteConfirmOpen(false)}
                  aria-label="Fechar"
                >
                  <IconClose size={15} />
                </IconToolBtn>
              </div>
            </ModalHead>

            <TargetSummaryStrip>
              <div className="ts-cell">
                <span className="ts-k">Estação</span>
                <span className="ts-v">{fixTextEncoding(machine.hostname)}</span>
              </div>
              <div className="ts-cell">
                <span className="ts-k">Endereço IP</span>
                <span className="ts-v">{machine.ip_address || "0.0.0.0"}</span>
              </div>
              <div className="ts-cell">
                <span className="ts-k">Setor</span>
                <span className="ts-v">{fixTextEncoding(machine.sector_name || "N/D")}</span>
              </div>
            </TargetSummaryStrip>

            <ModalNotice $tone="danger">
              Esta ação remove permanentemente o cadastro, o histórico de telemetria e as mensagens
              desta estação do painel.
            </ModalNotice>

            <ModalFooterRow>
              <div className="mf-left">
                <span style={{ fontSize: "0.71rem", color: theme.colors.textMuted }}>
                  Esc para cancelar
                </span>
              </div>
              <div className="mf-right">
                <ModalBtn type="button" onClick={() => setDeleteConfirmOpen(false)}>
                  Cancelar
                </ModalBtn>
                <ModalBtn
                  type="button"
                  $variant="danger"
                  onClick={async () => {
                    setDeleteConfirmOpen(false);
                    if (onDeleteMachine) await onDeleteMachine(machine.id);
                  }}
                >
                  Confirmar remoção
                </ModalBtn>
              </div>
            </ModalFooterRow>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}
    </>
  );
}
