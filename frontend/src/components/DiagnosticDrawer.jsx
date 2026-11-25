import React, { useState, useMemo, useEffect, useRef } from "react";
import styled from "styled-components";
import { RISK_LABELS, fixTextEncoding, isAgentOutdated, theme } from "../styles/theme";
import {
  IconActivity,
  IconTerminal,
  IconCrosshair,
  IconChevronLeft,
  IconChevronRight,
  IconTrash,
  IconRefresh,
  IconSend,
  IconAlertTriangle,
  IconPrinter,
  IconClose,
} from "./Icons";

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

const BladeContainer = styled.aside`
  width: ${({ $collapsed }) => ($collapsed ? "296px" : "432px")};
  max-height: 100%;
  min-height: 0;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 16px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow-y: auto;
  pointer-events: auto;
  transition: width 200ms cubic-bezier(0.2, 0.8, 0.2, 1);

  & > * {
    flex-shrink: 0;
  }

  @media (max-width: 1120px) {
    width: ${({ $collapsed }) => ($collapsed ? "268px" : "384px")};
  }
`;

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 9px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
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
  font-variant-numeric: tabular-nums;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const StatusBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
  background: ${({ $bgColor }) => $bgColor || "rgba(30, 36, 32, 0.06)"};

  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: currentColor;
  }
`;

const HostHeading = styled.h2`
  font-size: 1.18rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.2;
  word-break: break-word;
`;

const SubLocation = styled.div`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.38;
  margin-top: 2px;
`;

const LocationSelect = styled.select`
  margin-top: 8px;
  width: 100%;
  height: 32px;
  padding: 0 10px;
  border-radius: 7px;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-size: 0.76rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 140ms ease, background 140ms ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.borderStrong};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brandPrimary};
    background: ${({ theme }) => theme.colors.bgSurface};
    box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
  }
`;

const ActionToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
  margin-top: 2px;
`;

const HeaderActionBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  padding: 0 10px;
  border-radius: 6px;
  font-size: 0.74rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ $variant, theme }) =>
    $variant === "danger"
      ? "rgba(200, 30, 30, 0.06)"
      : $variant === "accent"
        ? theme.colors.brandPrimarySubtle
        : theme.colors.bgSurfaceSubtle};
  color: ${({ $variant, theme }) =>
    $variant === "danger"
      ? theme.colors.status.CRITICAL
      : $variant === "accent"
        ? theme.colors.brandPrimary
        : theme.colors.textPrimary};
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === "danger"
        ? "rgba(200, 30, 30, 0.22)"
        : $variant === "accent"
          ? "rgba(45, 106, 79, 0.22)"
          : theme.colors.borderSubtle};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    background: ${({ $variant, theme }) =>
      $variant === "danger"
        ? "rgba(200, 30, 30, 0.11)"
        : $variant === "accent"
          ? "rgba(45, 106, 79, 0.15)"
          : theme.colors.bgSurfaceHover};
    border-color: ${({ $variant, theme }) =>
      $variant === "danger"
        ? "rgba(200, 30, 30, 0.36)"
        : theme.colors.borderStrong};
  }

  &:active {
    transform: scale(0.985);
  }
`;

const MetricsLinearGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  flex-shrink: 0;
`;

const MetricCard = styled.div`
  padding: 9px 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  min-width: 0;
  border-right: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  &:last-child {
    border-right: none;
  }

  .m-head {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1px;
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .m-val {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 1rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .m-track {
    height: 3.5px;
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

const OscilloscopeCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 11px 13px;

  .osc-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.74rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 8px;
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
      color: ${({ theme }) => theme.colors.textPrimary};
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
  gap: 9px;
  padding: 12px 14px;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};

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

    span.spec-lbl {
      font-size: 0.7rem;
      font-weight: 500;
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    strong {
      font-size: 0.8rem;
      color: ${({ theme }) => theme.colors.textPrimary};
      font-weight: 600;
      line-height: 1.32;
      word-break: break-word;
    }

    strong.mono {
      font-family: ${({ theme }) => theme.fonts.mono};
      font-variant-numeric: tabular-nums;
      font-size: 0.76rem;
    }
  }

  .spec-divider {
    height: 1px;
    background: ${({ theme }) => theme.colors.borderSubtle};
  }
`;

const DrawerTabNav = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  padding: 3px;
  border-radius: 9px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

const DrawerTabBtn = styled.button`
  height: 32px;
  padding: 0 10px;
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.borderStrong : "transparent"};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.bgSurface : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.textPrimary : theme.colors.textSecondary};
  border-radius: 6px;
  font-size: 0.76rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-shadow: ${({ $active, theme }) => ($active ? theme.shadows.sm : "none")};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    color 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .badge-count {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-variant-numeric: tabular-nums;
    font-size: 0.66rem;
    font-weight: 600;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({ $active }) =>
      $active ? "rgba(45, 106, 79, 0.11)" : "rgba(30, 36, 32, 0.07)"};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.brandPrimary : theme.colors.textSecondary};
  }
`;

const ActivityBanner = styled.div`
  flex-shrink: 0;
  background: ${({ $bg }) => $bg};
  border-left: 3px solid ${({ $color }) => $color};
  border-radius: 0 8px 8px 0;
  padding: 9px 12px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .act-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: ${({ $color }) => $color};
  }

  .act-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-weight: 700;
  }

  .act-head {
    font-size: 0.86rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    margin-top: 1px;
  }

  .act-sub {
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const OfflineStaticNotice = styled.div`
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  border-radius: 8px;
  padding: 9px 12px;
  font-size: 0.74rem;
  color: ${({ theme }) => theme.colors.textSecondary};
  display: flex;
  flex-direction: column;
  gap: 2px;
  line-height: 1.4;

  strong {
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.76rem;
  }
`;

const SectionBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.76rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textPrimary};
  letter-spacing: -0.01em;
`;

const RefreshTelemetryBtn = styled.button`
  width: 100%;
  height: 36px;
  padding: 0 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ theme }) => theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  font-size: 0.78rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgSurfaceHover};
    border-color: ${({ theme }) => theme.colors.brandPrimary};
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }
`;

const ChatPanel = styled.div`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 9px;
`;

const ChatFeed = styled.div`
  min-height: 92px;
  max-height: 192px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: 8px;
`;

const ChatBubbleRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ $fromTi }) => ($fromTi ? "flex-end" : "flex-start")};
`;

const ChatBubble = styled.div`
  max-width: 88%;
  padding: 7px 10px;
  border-radius: ${({ $fromTi }) =>
    $fromTi ? "10px 10px 3px 10px" : "10px 10px 10px 3px"};
  background: ${({ $fromTi }) => ($fromTi ? "#E9F4EE" : "#F3F5F2")};
  border: 1px solid
    ${({ $fromTi }) =>
      $fromTi ? "rgba(45, 106, 79, 0.18)" : "rgba(30, 36, 32, 0.08)"};
  font-size: 0.78rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.textPrimary};
  word-break: break-word;

  .cb-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 2px;
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
    height: 34px;
    padding: 0 11px;
    border-radius: 7px;
    background: ${({ theme }) => theme.colors.bgSurface};
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.78rem;
    transition: border-color 140ms ease;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }

  button {
    height: 34px;
    padding: 0 13px;
    border-radius: 7px;
    border: none;
    background: ${({ theme }) => theme.colors.brandPrimary};
    color: #ffffff;
    font-size: 0.76rem;
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

const KeycapMatrix = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 7px;
  flex-shrink: 0;
`;

const KeycapButton = styled.button`
  position: relative;
  padding: 10px 11px;
  border-radius: 8px;
  text-align: left;
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.textMuted : theme.colors.textPrimary};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: transform 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    border-color 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.brandPrimary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }

  &:active:not(:disabled) {
    transform: translateY(0) scale(0.985);
  }

  .key-head {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 4px;
  }

  .risk-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ $risk, theme }) =>
      $risk === "HIGH"
        ? theme.colors.status.CRITICAL
        : $risk === "MEDIUM"
          ? theme.colors.status.WARNING
          : theme.colors.status.NORMAL};
  }

  .key-badge {
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({ $risk, theme }) =>
      $risk === "HIGH"
        ? theme.colors.status.CRITICAL
        : $risk === "MEDIUM"
          ? theme.colors.status.WARNING
          : theme.colors.textSecondary};
  }

  .key-title {
    font-size: 0.76rem;
    font-weight: 600;
    line-height: 1.28;
    display: block;
    color: inherit;
  }
`;

const TerminalReadout = styled.div`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 10px 12px;
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: 0.72rem;
  line-height: 1.5;
  min-height: 86px;
  max-height: 220px;
  overflow-y: auto;
  color: ${({ theme }) => theme.colors.textPrimary};

  .console-head {
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
    padding-bottom: 5px;
  }

  .line-ok {
    color: ${({ theme }) => theme.colors.status.NORMAL};
    font-weight: 600;
  }
  .line-busy {
    color: ${({ theme }) => theme.colors.brandPrimaryLight};
    font-weight: 600;
  }
  .line-err {
    color: ${({ theme }) => theme.colors.status.CRITICAL};
    font-weight: 600;
  }
`;

const DiagnosticModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(30, 36, 32, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  pointer-events: auto;
`;

const DiagnosticModalCard = styled.div`
  width: 100%;
  max-width: 520px;
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 22px 24px;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  flex-direction: column;
  gap: 14px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ModalHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  h3 {
    font-size: 1.02rem;
    font-weight: 700;
    letter-spacing: -0.015em;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .m-sub {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 2px;
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
  font-size: 0.8rem;
  line-height: 1.48;
`;

const ModalFooterRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

const ModalBtn = styled.button`
  height: 36px;
  padding: 0 15px;
  border-radius: 7px;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: 1px solid
    ${({ $variant, theme }) =>
      $variant === "primary"
        ? theme.colors.brandPrimary
        : $variant === "danger"
          ? theme.colors.status.CRITICAL
          : theme.colors.borderStrong};
  background: ${({ $variant, theme }) =>
    $variant === "primary"
      ? theme.colors.brandPrimary
      : $variant === "danger"
        ? theme.colors.status.CRITICAL
        : theme.colors.bgSurface};
  color: ${({ $variant, theme }) =>
    $variant === "primary" || $variant === "danger"
      ? "#FFFFFF"
      : theme.colors.textPrimary};
  transition: background 150ms cubic-bezier(0.2, 0.8, 0.2, 1),
    transform 90ms cubic-bezier(0.2, 0.8, 0.2, 1);

  &:hover:not(:disabled) {
    filter: brightness(0.95);
    transform: translateY(-1px);
  }

  &:active:not(:disabled) {
    transform: scale(0.985);
  }

  &:disabled {
    opacity: 0.45;
  }
`;

const DiagItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
`;

const DiagItemBox = styled.div`
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-left: 2.5px solid ${({ theme }) => theme.colors.brandPrimary};
  border-radius: 0 6px 6px 0;
  padding: 7px 10px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  .diag-k {
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .diag-v {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.78rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    word-break: break-word;
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

function parseDiagnosticSummary(rawText) {
  const clean = fixTextEncoding(rawText || "");
  if (!clean) return [];
  const parts = clean
    .split("|")
    .map((p) => p.trim())
    .filter(Boolean);
  return parts.map((segment, idx) => {
    const colonIdx = segment.indexOf(":");
    if (colonIdx > 0 && colonIdx < 36) {
      return {
        label: segment.slice(0, colonIdx).trim(),
        value: segment.slice(colonIdx + 1).trim(),
      };
    }
    return {
      label: `Item #${idx + 1}`,
      value: segment,
    };
  });
}

function TelemetryOscilloscope({ telemetryHistory = [] }) {
  const hasRealSeries = Array.isArray(telemetryHistory) && telemetryHistory.length >= 2;

  const { cpuPath, ramPath } = useMemo(() => {
    if (!hasRealSeries) {
      return { cpuPath: "", ramPath: "" };
    }
    const samples = telemetryHistory.slice(0, 12).reverse();
    const width = 360;
    const height = 44;
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
  }, [hasRealSeries, telemetryHistory]);

  return (
    <OscilloscopeCard>
      <div className="osc-head">
        <span>Histórico de Uso ({telemetryHistory.length} leituras)</span>
        <div className="osc-legend">
          <span>
            <i style={{ background: "#2D6A4F" }} /> CPU
          </span>
          <span>
            <i style={{ background: "#52796B" }} /> RAM
          </span>
        </div>
      </div>
      {!hasRealSeries ? (
        <div
          style={{
            height: "44px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.7rem",
            color: "#737B75",
            border: "1px dashed #E4E8E3",
            borderRadius: "4px",
          }}
        >
          Aguardando ao menos 2 leituras reais para traçar a série temporal.
        </div>
      ) : (
        <svg
          width="100%"
          height="44"
          viewBox="0 0 360 44"
          preserveAspectRatio="none"
        >
          <line x1="0" y1="11" x2="360" y2="11" stroke="#E4E8E3" strokeDasharray="3 3" />
          <line x1="0" y1="22" x2="360" y2="22" stroke="#E4E8E3" strokeDasharray="3 3" />
          <line x1="0" y1="33" x2="360" y2="33" stroke="#E4E8E3" strokeDasharray="3 3" />
          <path d={ramPath} fill="none" stroke="#52796B" strokeWidth="1.8" />
          <path d={cpuPath} fill="none" stroke="#2D6A4F" strokeWidth="2" />
        </svg>
      )}
    </OscilloscopeCard>
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
  const [updatingAgent, setUpdatingAgent] = useState(false);
  const [chatText, setChatText] = useState("");
  const [sendingChat, setSendingChat] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [activeReport, setActiveReport] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("DIAG"); // 'DIAG' | 'ACTIONS'
  const [nowTimestamp, setNowTimestamp] = useState(Date.now());
  const [printerPicker, setPrinterPicker] = useState(null);
  const [rebootConfirm, setRebootConfirm] = useState({ open: false, task: null });
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const chatFeedRef = useRef(null);

  useEffect(() => {
    if (chatFeedRef.current) {
      chatFeedRef.current.scrollTop = chatFeedRef.current.scrollHeight;
    }
  }, [chatMessages.length, activeTab]);

  useEffect(() => {
    const timer = setInterval(() => setNowTimestamp(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const latestTask = diagnostics?.tasks?.[0] || null;
  useEffect(() => {
    if (!latestTask || !activeReport) return;
    if (
      activeReport.taskId === latestTask.task_id ||
      (activeReport.taskCode === latestTask.task_code && activeReport.status === "RUNNING")
    ) {
      if (latestTask.output_summary) {
        setActiveReport((prev) =>
          prev
            ? {
                ...prev,
                taskId: latestTask.task_id,
                status: latestTask.status || "COMPLETED",
                summary: fixTextEncoding(latestTask.output_summary),
                timestamp: new Date(latestTask.completed_at || latestTask.issued_at || Date.now()).toLocaleTimeString("pt-BR"),
              }
            : null
        );
        setFeedback({
          type: "ok",
          text: `${activeReport.title}: ${fixTextEncoding(latestTask.output_summary)}`,
        });
      }
    }
  }, [latestTask?.task_id, latestTask?.status, latestTask?.output_summary]);

  const machine = diagnostics?.machine || null;

  if (!machine) {
    return (
      <BladeContainer $collapsed={collapsed}>
        <HeaderBlock>
          <MicroSerial>Aguardando agentes</MicroSerial>
          <HostHeading>Nenhuma estação selecionada</HostHeading>
          <SubLocation>
            Instale o Agente Windows (IpojucaRMM-Setup.exe) para registrar novas estações nesta unidade.
          </SubLocation>
        </HeaderBlock>
      </BladeContainer>
    );
  }

  const {
    tasks = [],
    alerts = [],
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
    theme.colors.statusBg[machine.health_status] || 'rgba(0,0,0,0.05)';

  const uptimeHours = (Number(machine.uptime_seconds || 0) / 3600).toFixed(1);
  const baseIdle = Math.max(0, Number(machine.idle_seconds || 0));
  const isOffline = machine.health_status === "OFFLINE";
  const offlineSeconds = machine.last_seen_at
    ? Math.max(0, Math.floor((nowTimestamp - new Date(machine.last_seen_at).getTime()) / 1000))
    : 0;

  const secondsSinceSeen = machine.last_seen_at
    ? Math.max(0, Math.floor((nowTimestamp - new Date(machine.last_seen_at).getTime()) / 1000))
    : 0;

  const liveIdleSeconds = !isOffline && baseIdle > 0 ? baseIdle + Math.min(secondsSinceSeen, 3) : baseIdle;
  const isLegacyAgent = isAgentOutdated(machine.agent_version, "2.3.0");

  const activityState = (() => {
    const INACTIVITY_24H = 86400;
    if (isOffline) {
      if (offlineSeconds >= INACTIVITY_24H) {
        return {
          badge: "Inativo >24h",
          alertIcon: true,
          color: "#C81E1E",
          bg: "rgba(200, 30, 30, 0.06)",
          headline: `Desligado há ${formatDurationPt(offlineSeconds)} (>24h)`,
          subline: machine.last_seen_at
            ? `Sem comunicação desde ${new Date(machine.last_seen_at).toLocaleString("pt-BR")}`
            : "Sem comunicação há mais de 24 horas",
        };
      }
      return {
        badge: "Desligado",
        alertIcon: false,
        color: "#64748B",
        bg: "#F6F7F4",
        headline: `Desligado há ${formatDurationPt(offlineSeconds)}`,
        subline: machine.last_seen_at
          ? `Último contato: ${new Date(machine.last_seen_at).toLocaleString("pt-BR")}`
          : "Sem registro recente",
      };
    }
    if (liveIdleSeconds >= INACTIVITY_24H) {
      return {
        badge: "Inativo >24h",
        alertIcon: true,
        color: "#C81E1E",
        bg: "rgba(200, 30, 30, 0.06)",
        headline: `Inativo há ${formatDurationPt(liveIdleSeconds)} (>24h)`,
        subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} sem interação de teclado ou mouse.`,
      };
    }
    if (isLegacyAgent) {
      return {
        badge: `Agente ${cleanDisplayVersion(machine.agent_version || "2.2.0")}`,
        alertIcon: false,
        color: "#B45309",
        bg: "rgba(180, 83, 9, 0.07)",
        headline: "Estação ativa · atualização recomendada",
        subline: "Envie a atualização do agente para habilitar recursos recentes.",
      };
    }
    if (liveIdleSeconds < 180) {
      return {
        badge: "Em uso",
        alertIcon: false,
        color: "#2D6A4F",
        bg: "rgba(45, 106, 79, 0.07)",
        headline: "Em uso ativo agora",
        subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} (${uptimeHours}h)`,
      };
    }
    if (liveIdleSeconds < 1800) {
      return {
        badge: "Ausente",
        alertIcon: false,
        color: "#B45309",
        bg: "rgba(180, 83, 9, 0.07)",
        headline: `Ocioso há ${formatDurationPt(liveIdleSeconds)}`,
        subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} (${uptimeHours}h)`,
      };
    }
    return {
      badge: "Ocioso",
      alertIcon: false,
      color: "#B45309",
      bg: "rgba(180, 83, 9, 0.07)",
      headline: `Parado há ${formatDurationPt(liveIdleSeconds)}`,
      subline: `Ligado há ${formatDurationPt(machine.uptime_seconds || 0, false)} sem interação`,
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

  async function handleUpdateAgentNow() {
    if (!onUpdateMachineAgent) return;
    setUpdatingAgent(true);
    setFeedback(null);
    try {
      const res = await onUpdateMachineAgent(machine.id);
      setFeedback({
        type: "ok",
        text: res.message || "Atualização enviada para a estação.",
      });
    } catch (err) {
      setFeedback({ type: "err", text: `Falha ao atualizar agente: ${err.message}` });
    } finally {
      setUpdatingAgent(false);
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
        text: `Aviso enviado para a tela de ${machine.hostname}.`,
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
    const cleanTitle = fixTextEncoding(task.title);
    setBusyTask(task.code);
    setFeedback({
      type: "busy",
      text: `Executando "${cleanTitle}" em ${machine.hostname}...`,
    });
    setActiveReport({
      taskId: null,
      taskCode: task.code,
      title: cleanTitle,
      status: "RUNNING",
      summary: `Executando "${cleanTitle}" no Agente Windows (${machine.ip_address})...`,
      timestamp: new Date().toLocaleTimeString("pt-BR"),
      taskRef: task,
    });

    try {
      if (task.code === "SYNC_TELEMETRY_NOW" && onRefreshTelemetryNow) {
        const res = await onRefreshTelemetryNow(machine.id);
        const summaryMsg =
          res.message ||
          `Host: ${machine.hostname} | IPv4: ${machine.ip_address} | CPU: ${Number(machine.cpu_usage_pct).toFixed(1)}% | RAM: ${Number(machine.ram_usage_pct).toFixed(1)}% | Disco: ${Number(machine.disk_usage_pct).toFixed(1)}%`;
        setFeedback({
          type: "ok",
          text: `${cleanTitle}: ${summaryMsg}`,
        });
        setActiveReport({
          taskId: `sync_${Date.now()}`,
          taskCode: task.code,
          title: cleanTitle,
          status: "COMPLETED",
          summary: summaryMsg,
          timestamp: new Date().toLocaleTimeString("pt-BR"),
          taskRef: task,
        });
        return;
      }

      if (task.code === "UPDATE_AGENT" && onUpdateMachineAgent) {
        const res = await onUpdateMachineAgent(machine.id);
        const summaryMsg =
          res.message || "Atualização OTA despachada para o computador.";
        setFeedback({
          type: "ok",
          text: `${cleanTitle}: ${summaryMsg}`,
        });
        setActiveReport({
          taskId: `ota_${Date.now()}`,
          taskCode: task.code,
          title: cleanTitle,
          status: "COMPLETED",
          summary: summaryMsg,
          timestamp: new Date().toLocaleTimeString("pt-BR"),
          taskRef: task,
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
          : `Retorno recebido de ${machine.hostname}: ${fixTextEncoding(res?.task?.output_summary || returnedStatus)}`,
      });
      if (res?.task) {
        setActiveReport({
          taskId: res.task.task_id,
          taskCode: res.task.task_code,
          title: cleanTitle,
          status: returnedStatus,
          summary:
            fixTextEncoding(res.task.output_summary) ||
            "Ordem na fila do Agente Windows. O resultado real aparecerá assim que a estação responder (TTL 120s).",
          timestamp: new Date(res.task.issued_at || Date.now()).toLocaleTimeString("pt-BR"),
          taskRef: task,
        });
      }
    } catch (err) {
      setFeedback({ type: "err", text: `Falha: ${err.message}` });
      setActiveReport({
        taskId: null,
        taskCode: task.code,
        title: cleanTitle,
        status: "FAILED",
        summary: `Erro ao despachar comando: ${err.message}`,
        timestamp: new Date().toLocaleTimeString("pt-BR"),
        taskRef: task,
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
                ? "Servidor desatualizado: a rota /api/printers não existe no backend em execução. Rode o deploy na VPS."
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

  return (
    <>
      <BladeContainer $collapsed={collapsed} aria-label="Painel de diagnóstico da estação">
        <HeaderBlock>
          <HeaderTopRow>
            <MicroSerial>
              #{machine.id} · {machine.ip_address} · {cleanDisplayVersion(machine.agent_version)}
            </MicroSerial>
            <StatusBadge $color={statusColor} $bgColor={statusBg}>
              <span className="dot" />
              {STATUS_PRETTY[machine.health_status] || machine.health_status}
            </StatusBadge>
          </HeaderTopRow>

          <div>
            <HostHeading>{fixTextEncoding(machine.hostname)}</HostHeading>
            <SubLocation>
              {fixTextEncoding(machine.unit_name)} · {fixTextEncoding(machine.sector_name)}
            </SubLocation>
            {units.length > 0 && onUpdateLocation && currentUser?.role !== "VIEWER" && (
              <LocationSelect
                aria-label="Realocar estação para outra unidade ou setor"
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
          </div>

          <ActionToolbar>
            <HeaderActionBtn type="button" $variant="accent" onClick={onFocusCamera}>
              <IconCrosshair size={13} />
              <span>Focar</span>
            </HeaderActionBtn>
            <HeaderActionBtn type="button" onClick={() => setCollapsed((prev) => !prev)}>
              {collapsed ? <IconChevronLeft size={13} /> : <IconChevronRight size={13} />}
              <span>{collapsed ? "Expandir" : "Recolher"}</span>
            </HeaderActionBtn>
            {onDeleteMachine && currentUser?.role !== "VIEWER" && (
              <HeaderActionBtn
                type="button"
                $variant="danger"
                onClick={() => setDeleteConfirmOpen(true)}
              >
                <IconTrash size={13} />
                <span>Remover</span>
              </HeaderActionBtn>
            )}
          </ActionToolbar>
        </HeaderBlock>

        {/* Faixa Unificada de Métricas */}
        <MetricsLinearGrid>
          <MetricCard>
            <div className="m-head">
              <span>CPU</span>
              <span className="m-val">{displayCpu.toFixed(0)}%</span>
            </div>
            <div className="m-track">
              <i style={{ width: `${Math.min(100, displayCpu)}%`, background: theme.colors.status.NORMAL }} />
            </div>
          </MetricCard>

          <MetricCard>
            <div className="m-head">
              <span>RAM</span>
              <span className="m-val">{displayRam.toFixed(0)}%</span>
            </div>
            <div className="m-track">
              <i style={{ width: `${Math.min(100, displayRam)}%`, background: theme.colors.brandPrimaryLight }} />
            </div>
          </MetricCard>

          <MetricCard>
            <div className="m-head">
              <span>Disco</span>
              <span className="m-val">{displayDisk.toFixed(0)}%</span>
            </div>
            <div className="m-track">
              <i style={{ width: `${Math.min(100, displayDisk)}%`, background: theme.colors.status.OFFLINE }} />
            </div>
          </MetricCard>

          <MetricCard>
            <div className="m-head">
              <span>Temp.</span>
              <span className="m-val">
                {displayTemp > 0 ? `${displayTemp.toFixed(0)}°C` : "N/D"}
              </span>
            </div>
            <div className="m-track">
              <i
                style={{
                  width: `${displayTemp > 0 ? Math.min(100, (displayTemp / 90) * 100) : 0}%`,
                  background: theme.colors.status.WARNING,
                }}
              />
            </div>
          </MetricCard>
        </MetricsLinearGrid>

        {/* Abas Segmentadas Limpas */}
        {!collapsed && (
          <DrawerTabNav role="tablist" aria-label="Seções do painel de diagnóstico">
            <DrawerTabBtn
              type="button"
              role="tab"
              aria-selected={activeTab === "DIAG"}
              $active={activeTab === "DIAG"}
              onClick={() => setActiveTab("DIAG")}
            >
              <IconActivity size={14} />
              <span>Diagnóstico</span>
            </DrawerTabBtn>
            <DrawerTabBtn
              type="button"
              role="tab"
              aria-selected={activeTab === "ACTIONS"}
              $active={activeTab === "ACTIONS"}
              onClick={() => setActiveTab("ACTIONS")}
            >
              <IconTerminal size={14} />
              <span>Ações &amp; Chat</span>
              <span className="badge-count">{taskCatalog.length}</span>
            </DrawerTabBtn>
          </DrawerTabNav>
        )}

        {/* ABA 1: DIAGNÓSTICO & HARDWARE */}
        {(collapsed || activeTab === "DIAG") && (
          <>
            {isOffline && (
              <OfflineStaticNotice>
                <strong>Equipamento desconectado</strong>
                <span>
                  Última leitura registrada em{" "}
                  {machine.last_seen_at
                    ? new Date(machine.last_seen_at).toLocaleTimeString("pt-BR")
                    : "horário anterior"}
                  . Novas métricas serão retomadas na reconexão.
                </span>
              </OfflineStaticNotice>
            )}

            <ActivityBanner $bg={activityState.bg} $color={activityState.color}>
              <div className="act-top">
                <span>Estado de atividade</span>
                <span className="act-badge">
                  {activityState.alertIcon && <IconAlertTriangle size={12} />}
                  {activityState.badge}
                </span>
              </div>
              <div className="act-head">{activityState.headline}</div>
              <div className="act-sub">{activityState.subline}</div>
            </ActivityBanner>

            {!collapsed && (
              <>
                <TelemetryOscilloscope telemetryHistory={activeTelemetryHistory} />

                <SpecPlate>
                  <div className="spec-grid-2">
                    <div className="spec-cell">
                      <span className="spec-lbl">IPv4 / MAC</span>
                      <strong className="mono">{machine.ip_address || "0.0.0.0"}</strong>
                      <strong
                        className="mono"
                        style={{ fontSize: "0.68rem", color: theme.colors.textSecondary }}
                      >
                        {machine.mac_address || "MAC N/D"}
                      </strong>
                    </div>
                    <div className="spec-cell">
                      <span className="spec-lbl">Spooler de impressão</span>
                      <strong
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          color: machine.spooler_running
                            ? theme.colors.status.NORMAL
                            : theme.colors.status.CRITICAL,
                        }}
                      >
                        <IconPrinter size={13} />
                        {machine.spooler_running ? "Ativo" : "Parado"}
                      </strong>
                    </div>
                  </div>

                  <div className="spec-divider" />

                  <div className="spec-grid-2">
                    <div className="spec-cell">
                      <span className="spec-lbl">Hardware</span>
                      <strong>
                        {fixTextEncoding(machine.manufacturer || "N/D")}{" "}
                        {fixTextEncoding(machine.model || "")}
                      </strong>
                    </div>
                    <div className="spec-cell">
                      <span className="spec-lbl">Serial</span>
                      <strong className="mono">
                        {machine.serial_number || "Não informado"}{" "}
                        <span style={{ color: theme.colors.textSecondary, fontSize: "0.68rem" }}>
                          ({machine.identity_confidence || "LOW"})
                        </span>
                      </strong>
                    </div>
                  </div>

                  <div className="spec-divider" />

                  <div className="spec-cell">
                    <span className="spec-lbl">Processador</span>
                    <strong>
                      {fixTextEncoding(machine.cpu_model || machine.processor || "Não informado")}
                    </strong>
                  </div>

                  <div className="spec-divider" />

                  <div className="spec-grid-2">
                    <div className="spec-cell">
                      <span className="spec-lbl">Memória e disco</span>
                      <strong className="mono">
                        {(Number(machine.ram_total_mb || 8192) / 1024).toFixed(0)} GB ·{" "}
                        {machine.disk_total_gb || 0} GB {machine.disk_type || "N/D"}
                      </strong>
                    </div>
                    <div className="spec-cell">
                      <span className="spec-lbl">Sistema</span>
                      <strong>{fixTextEncoding(machine.os_version || "Windows")}</strong>
                    </div>
                  </div>
                </SpecPlate>

                <RefreshTelemetryBtn
                  type="button"
                  onClick={handleManualRefresh}
                  disabled={refreshingNow}
                >
                  <IconRefresh size={14} />
                  <span>
                    {refreshingNow ? "Atualizando telemetria..." : "Atualizar telemetria agora"}
                  </span>
                </RefreshTelemetryBtn>
              </>
            )}
          </>
        )}

        {/* ABA 2: AÇÕES REMOTAS & CHAT */}
        {!collapsed && activeTab === "ACTIONS" && (
          <>
            {onSendMessage && (
              <ChatPanel>
                <SectionBar>
                  <span>Chat com o operador</span>
                  <span
                    style={{
                      fontFamily: theme.fonts.mono,
                      fontSize: "0.68rem",
                      fontWeight: 500,
                      color: theme.colors.textSecondary,
                    }}
                  >
                    {chatMessages.length} msg
                  </span>
                </SectionBar>

                <ChatFeed ref={chatFeedRef}>
                  {chatMessages.length === 0 ? (
                    <span style={{ fontSize: "0.76rem", color: theme.colors.textSecondary }}>
                      Nenhuma conversa ainda. Envie um aviso direto para a tela deste equipamento.
                    </span>
                  ) : (
                    chatMessages.slice(-20).map((m) => {
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
                </ChatFeed>

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
              </ChatPanel>
            )}

            <SectionBar>
              <span>Ações remotas autorizadas</span>
            </SectionBar>

            <TerminalReadout>
              <div className="console-head">
                <span>Retorno das tarefas</span>
                <span>{busyTask ? "Executando..." : "Pronto"}</span>
              </div>
              {feedback ? (
                <div
                  className={
                    feedback.type === "err"
                      ? "line-err"
                      : feedback.type === "busy"
                        ? "line-busy"
                        : "line-ok"
                  }
                >
                  &gt; {feedback.text}
                </div>
              ) : (
                <div style={{ color: theme.colors.textSecondary }}>
                  &gt; Selecione uma tarefa homologada abaixo para despachar ao agente.
                </div>
              )}

              {(activeReport?.summary || tasks[0]?.output_summary) && (
                <div style={{ marginTop: "8px" }}>
                  <DiagItemsGrid>
                    {parseDiagnosticSummary(
                      activeReport?.summary || tasks[0]?.output_summary
                    ).map((item, idx) => (
                      <DiagItemBox key={idx}>
                        <span className="diag-k">{item.label}</span>
                        <span className="diag-v">{item.value}</span>
                      </DiagItemBox>
                    ))}
                  </DiagItemsGrid>
                </div>
              )}
            </TerminalReadout>

            <KeycapMatrix>
              {taskCatalog.map((task) => {
                const allowed = task.permittedForCurrentUser;
                const isBusy = busyTask === task.code;
                return (
                  <KeycapButton
                    key={task.code}
                    type="button"
                    $risk={task.riskLevel}
                    disabled={!allowed || isBusy}
                    onClick={() => handleRunTask(task)}
                    title={task.description}
                  >
                    <div className="key-head">
                      <span className="risk-dot" />
                      <span className="key-badge">
                        Risco {RISK_LABELS[task.riskLevel] || task.riskLevel}
                      </span>
                    </div>
                    <span className="key-title">
                      {isBusy ? "Executando..." : fixTextEncoding(task.title)}
                    </span>
                  </KeycapButton>
                );
              })}
            </KeycapMatrix>
          </>
        )}
      </BladeContainer>

      {printerPicker?.open && (
        <DiagnosticModalBackdrop onClick={() => setPrinterPicker(null)}>
          <DiagnosticModalCard onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <ModalHead>
              <div>
                <h3>Instalar impressora homologada</h3>
                <div className="m-sub">
                  {machine.hostname} ({machine.ip_address}) · Selecione a impressora de rede
                </div>
              </div>
              <HeaderActionBtn type="button" onClick={() => setPrinterPicker(null)} aria-label="Fechar">
                <IconClose size={14} />
              </HeaderActionBtn>
            </ModalHead>

            {printerPicker.loading && (
              <div style={{ fontSize: "0.82rem", color: theme.colors.brandPrimary, fontWeight: 600 }}>
                Carregando impressoras homologadas...
              </div>
            )}

            {printerPicker.error && (
              <ModalNotice $tone="danger">{printerPicker.error}</ModalNotice>
            )}

            {!printerPicker.loading && printerPicker.printers.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  maxHeight: "260px",
                  overflowY: "auto",
                }}
              >
                {printerPicker.printers.map((printer) => {
                  const selected = printer.id === printerPicker.selectedId;
                  return (
                    <label
                      key={printer.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "9px 11px",
                        borderRadius: "8px",
                        border: `1px solid ${
                          selected ? theme.colors.brandPrimary : theme.colors.borderSubtle
                        }`,
                        background: selected ? "rgba(45, 106, 79, 0.06)" : theme.colors.bgSurfaceSubtle,
                        cursor: "pointer",
                      }}
                    >
                      <input
                        type="radio"
                        name="approved_printer"
                        checked={selected}
                        style={{ accentColor: theme.colors.brandPrimary }}
                        onChange={() =>
                          setPrinterPicker((prev) =>
                            prev ? { ...prev, selectedId: printer.id } : prev
                          )
                        }
                      />
                      <span style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                        <strong style={{ fontSize: "0.82rem", color: theme.colors.textPrimary }}>
                          {printer.name}
                          <span
                            style={{
                              marginLeft: "6px",
                              padding: "1px 6px",
                              borderRadius: "999px",
                              fontSize: "0.64rem",
                              fontWeight: 600,
                              background:
                                printer.source === "NETWORK"
                                  ? "rgba(29, 78, 216, 0.09)"
                                  : printer.source === "INSTALLED"
                                    ? "rgba(45, 106, 79, 0.1)"
                                    : "rgba(180, 83, 9, 0.1)",
                              color:
                                printer.source === "NETWORK"
                                  ? "#1D4ED8"
                                  : printer.source === "INSTALLED"
                                    ? "#2D6A4F"
                                    : "#92400E",
                            }}
                          >
                            {printer.source === "NETWORK"
                              ? "Rede"
                              : printer.source === "INSTALLED"
                                ? "Instalada"
                                : "Homologada"}
                          </span>
                        </strong>
                        <span
                          style={{
                            fontFamily: theme.fonts.mono,
                            fontSize: "0.72rem",
                            color: theme.colors.textSecondary,
                          }}
                        >
                          {printer.ip_address}
                          {printer.model ? ` · ${printer.model}` : ""}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            )}

            <ModalFooterRow>
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
            </ModalFooterRow>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}

      {rebootConfirm.open && (
        <DiagnosticModalBackdrop onClick={() => setRebootConfirm({ open: false, task: null })}>
          <DiagnosticModalCard onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <ModalHead>
              <div>
                <h3>Confirmar reinicialização</h3>
                <div className="m-sub">
                  {machine.hostname} ({machine.ip_address})
                </div>
              </div>
            </ModalHead>

            <ModalNotice $tone="warning">
              O computador será reiniciado com aviso de 30 segundos na tela do usuário. Salve o
              trabalho em aberto antes de confirmar.
            </ModalNotice>

            <ModalFooterRow>
              <ModalBtn type="button" onClick={() => setRebootConfirm({ open: false, task: null })}>
                Cancelar
              </ModalBtn>
              <ModalBtn type="button" $variant="danger" onClick={confirmReboot}>
                Confirmar reinício
              </ModalBtn>
            </ModalFooterRow>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}

      {activeReport && (
        <DiagnosticModalBackdrop onClick={() => setActiveReport(null)}>
          <DiagnosticModalCard onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <ModalHead>
              <div>
                <h3>{activeReport.title}</h3>
                <div className="m-sub">
                  {machine.hostname} ({machine.ip_address}) · {activeReport.timestamp}
                </div>
              </div>
              <StatusBadge
                $color={
                  activeReport.status === "FAILED" || activeReport.status === "EXPIRED"
                    ? theme.colors.status.CRITICAL
                    : activeReport.status === "DISPATCHED" || activeReport.status === "PENDING"
                      ? theme.colors.status.WARNING
                      : theme.colors.status.NORMAL
                }
                $bgColor={
                  activeReport.status === "FAILED" || activeReport.status === "EXPIRED"
                    ? theme.colors.statusBg.CRITICAL
                    : activeReport.status === "DISPATCHED" || activeReport.status === "PENDING"
                      ? theme.colors.statusBg.WARNING
                      : theme.colors.statusBg.NORMAL
                }
              >
                <span className="dot" />
                {activeReport.status === "RUNNING"
                  ? "Em execução..."
                  : activeReport.status === "DISPATCHED" || activeReport.status === "PENDING"
                    ? "Na fila"
                    : activeReport.status === "EXPIRED"
                      ? "Expirado"
                      : activeReport.status === "FAILED"
                        ? "Falha"
                        : "Concluído"}
              </StatusBadge>
            </ModalHead>

            <DiagItemsGrid>
              {parseDiagnosticSummary(activeReport.summary).map((item, idx) => (
                <DiagItemBox key={idx}>
                  <span className="diag-k">{item.label}</span>
                  <span className="diag-v">{item.value}</span>
                </DiagItemBox>
              ))}
            </DiagItemsGrid>

            <ModalFooterRow>
              <ModalBtn type="button" $variant="primary" onClick={() => setActiveReport(null)}>
                Fechar
              </ModalBtn>
            </ModalFooterRow>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}

      {deleteConfirmOpen && (
        <DiagnosticModalBackdrop onClick={() => setDeleteConfirmOpen(false)}>
          <DiagnosticModalCard onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <ModalHead>
              <div>
                <h3>Confirmar remoção de equipamento</h3>
                <div className="m-sub">
                  {fixTextEncoding(machine.hostname)} ({machine.ip_address})
                </div>
              </div>
            </ModalHead>

            <ModalNotice $tone="danger">
              Esta ação remove permanentemente o cadastro, histórico de telemetria e mensagens desta
              estação do painel. A operação será registrada na trilha de auditoria.
            </ModalNotice>

            <ModalFooterRow>
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
            </ModalFooterRow>
          </DiagnosticModalCard>
        </DiagnosticModalBackdrop>
      )}
    </>
  );
}
