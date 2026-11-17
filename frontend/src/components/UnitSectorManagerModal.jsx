import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { fixTextEncoding } from '../styles/theme';

const UNIT_TYPE_OPTIONS = [
  { value: 'USF', label: 'USF — Unidade de Saúde da Família' },
  { value: 'POLICLINICA', label: 'Policlínica Municipal' },
  { value: 'CAPS', label: 'CAPS — Centro de Atenção Psicossocial' },
  { value: 'UPA', label: 'UPA — Unidade de Pronto Atendimento' },
  { value: 'HOSPITAL', label: 'Hospital Municipal' },
  { value: 'CEO', label: 'CEO — Centro de Especialidades' },
  { value: 'SEDE', label: 'Sede Administrativa / Central TI' },
];

const ROOM_ARCHETYPES = [
  {
    value: 'REC',
    label: 'Recepção',
    desc: 'Balcão em L, longarina e madeira',
  },
  {
    value: 'CONS',
    label: 'Consultório',
    desc: 'Maca clínica, soro e biombo',
  },
  {
    value: 'FARM',
    label: 'Farmácia / Vacina',
    desc: 'Estantes médicas e piso xadrez',
  },
  {
    value: 'ADM',
    label: 'Admin / Enfermagem',
    desc: 'Mural de avisos e área clínica',
  },
  {
    value: 'TI',
    label: 'Sala Técnica / TI',
    desc: 'Rack de servidor e infraestrutura',
  },
];

function suggestCodeFromName(name, fallback = 'SETOR') {
  const clean = String(name || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase()
    .replace(/[^A-Z0-9\s-]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 16);
  return clean || fallback;
}

function inferRoomThemeFromSector(sector) {
  const explicit = String(sector?.room_theme || '').trim().toUpperCase();
  if (['REC', 'CONS', 'FARM', 'ADM', 'TI'].includes(explicit)) return explicit;
  const combined = `${sector?.code || ''} ${sector?.name || ''}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
  if (combined.includes('REC') || combined.includes('ACOLH') || sector?.id === 1) return 'REC';
  if (combined.includes('CONS') || combined.includes('MED') || combined.includes('PSI') || sector?.id === 2) return 'CONS';
  if (combined.includes('FAR') || combined.includes('VAC') || combined.includes('LAB') || sector?.id === 3) return 'FARM';
  if (combined.includes('TI') || combined.includes('CPD') || sector?.id === 8) return 'TI';
  return 'ADM';
}

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 60;
  background: rgba(36, 41, 37, 0.42);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 18px;
`;

const ModalCard = styled.div`
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 10px;
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.16);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const ModalHeader = styled.div`
  padding: 16px 20px 12px;
  border-bottom: 1px solid #e4e8e3;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;

  .m-kicker {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.66rem;
    font-weight: 700;
    color: #52796b;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  .m-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #242925;
    margin-top: 2px;
  }
`;

const CloseBtn = styled.button`
  background: #f4f5f2;
  border: 1px solid #e4e8e3;
  color: #737b75;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #242925;
    background: #ecefeb;
  }
`;

const ModeTabs = styled.div`
  display: flex;
  gap: 6px;
  padding: 10px 20px 0;
  background: #f8faf8;
  border-bottom: 1px solid #e4e8e3;
  flex-wrap: wrap;
`;

const ModeTabBtn = styled.button`
  padding: 7px 12px;
  border: 1px solid ${({ $active, $danger }) =>
    $active ? ($danger ? '#DC2626' : '#52796B') : 'transparent'};
  border-bottom: none;
  border-radius: 6px 6px 0 0;
  background: ${({ $active }) => ($active ? '#FFFFFF' : 'transparent')};
  color: ${({ $active, $danger }) =>
    $danger ? '#DC2626' : $active ? '#242925' : '#737B75'};
  font-size: 0.72rem;
  font-weight: 700;
  cursor: pointer;
  margin-bottom: -1px;

  &:hover {
    color: ${({ $danger }) => ($danger ? '#B91C1C' : '#242925')};
  }
`;

const ModalBody = styled.form`
  padding: 16px 20px 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const FieldRow = styled.div`
  display: grid;
  grid-template-columns: ${({ $cols }) => $cols || '1fr'};
  gap: 10px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 0.7rem;
    font-weight: 700;
    color: #4a524c;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .hint {
    font-weight: 500;
    color: #737b75;
    font-size: 0.64rem;
  }

  input,
  select {
    width: 100%;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid #cbd3cb;
    background: #ffffff;
    color: #242925;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.78rem;
    outline: none;

    &:focus {
      border-color: #52796b;
      box-shadow: 0 0 0 2px rgba(82, 121, 107, 0.14);
    }
  }
`;

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;

  @media (max-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ThemeOptionCard = styled.button`
  padding: 8px 6px;
  border-radius: 7px;
  border: 1px solid ${({ $selected }) => ($selected ? '#52796B' : '#E4E8E3')};
  background: ${({ $selected }) => ($selected ? 'rgba(82, 121, 107, 0.10)' : '#F8FAF8')};
  cursor: pointer;
  text-align: left;
  transition: all 0.14s ease;

  &:hover {
    border-color: #52796b;
  }

  .t-code {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.62rem;
    font-weight: 700;
    color: #52796b;
  }

  .t-name {
    font-size: 0.69rem;
    font-weight: 700;
    color: #242925;
    margin-top: 2px;
  }

  .t-desc {
    font-size: 0.59rem;
    color: #737b75;
    line-height: 1.25;
    margin-top: 3px;
  }
`;

const ToggleBox = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 11px;
  border-radius: 7px;
  border: 1px solid #e4e8e3;
  background: #f8faf8;
  font-size: 0.74rem;
  font-weight: 600;
  color: #242925;
  cursor: pointer;

  input {
    accent-color: #52796b;
    width: 15px;
    height: 15px;
  }
`;

const AdvancedBox = styled.div`
  border: 1px solid #e4e8e3;
  border-radius: 7px;
  padding: 10px 12px;
  background: #f8faf8;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AdvancedToggleBtn = styled.button`
  align-self: flex-start;
  background: none;
  border: none;
  padding: 0;
  color: #52796b;
  font-size: 0.7rem;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`;

const AlertBanner = styled.div`
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 0.75rem;
  line-height: 1.4;
  background: ${({ $tone }) =>
    $tone === 'danger' ? 'rgba(220, 38, 38, 0.08)' : 'rgba(217, 119, 6, 0.1)'};
  border: 1px solid
    ${({ $tone }) => ($tone === 'danger' ? 'rgba(220, 38, 38, 0.35)' : 'rgba(217, 119, 6, 0.35)')};
  color: ${({ $tone }) => ($tone === 'danger' ? '#991B1B' : '#92400E')};
`;

const FooterActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding-top: 6px;
  border-top: 1px solid #e4e8e3;
`;

const ActionBtn = styled.button`
  padding: 8px 14px;
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid
    ${({ $variant }) =>
      $variant === 'primary'
        ? '#52796B'
        : $variant === 'danger'
          ? '#DC2626'
          : '#CBD3CB'};
  background: ${({ $variant }) =>
    $variant === 'primary'
      ? '#52796B'
      : $variant === 'danger'
        ? '#DC2626'
        : '#FFFFFF'};
  color: ${({ $variant }) =>
    $variant === 'primary' || $variant === 'danger' ? '#FFFFFF' : '#242925'};

  &:hover:not(:disabled) {
    opacity: 0.92;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export function UnitSectorManagerModal({
  isOpen,
  initialMode = 'CREATE_UNIT',
  units = [],
  activeUnit = null,
  targetSector = null,
  machines = [],
  onClose,
  onCreateUnit,
  onUpdateUnit,
  onDeleteUnit,
  onCreateSector,
  onUpdateSector,
  onDeleteSector,
}) {
  const [mode, setMode] = useState(initialMode);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Campos de Unidade
  const [unitName, setUnitName] = useState('');
  const [unitCode, setUnitCode] = useState('');
  const [unitCodeTouched, setUnitCodeTouched] = useState(false);
  const [unitType, setUnitType] = useState('USF');
  const [unitAddress, setUnitAddress] = useState('');
  const [createDefaultSectors, setCreateDefaultSectors] = useState(true);
  const [targetUnitForReloc, setTargetUnitForReloc] = useState('');

  // Campos de Setor
  const [sectorName, setSectorName] = useState('');
  const [sectorCode, setSectorCode] = useState('');
  const [sectorCodeTouched, setSectorCodeTouched] = useState(false);
  const [roomTheme, setRoomTheme] = useState('CONS');
  const [autoPosition3d, setAutoPosition3d] = useState(true);
  const [showAdvancedLayout, setShowAdvancedLayout] = useState(false);
  const [boundsX, setBoundsX] = useState('');
  const [boundsZ, setBoundsZ] = useState('');
  const [width3d, setWidth3d] = useState('9');
  const [depth3d, setDepth3d] = useState('5');
  const [targetSectorForReloc, setTargetSectorForReloc] = useState('');

  const otherUnits = useMemo(
    () => units.filter((u) => Number(u.id) !== Number(activeUnit?.id)),
    [units, activeUnit]
  );

  const siblingSectors = useMemo(
    () =>
      (activeUnit?.sectors || []).filter(
        (s) => Number(s.id) !== Number(targetSector?.id)
      ),
    [activeUnit, targetSector]
  );

  const sectorMachineCount = useMemo(() => {
    if (!targetSector) return 0;
    return machines.filter((m) => Number(m.sector_id) === Number(targetSector.id)).length;
  }, [machines, targetSector]);

  const unitMachineCount = Number(activeUnit?.summary?.total ?? machines.length ?? 0);

  const activeUnitId = activeUnit?.id;
  const targetSectorId = targetSector?.id;

  useEffect(() => {
    if (!isOpen) return;
    setMode(initialMode);
    setErrorMsg('');
    setSubmitting(false);

    if (initialMode === 'CREATE_UNIT') {
      setUnitName('');
      setUnitCode('');
      setUnitCodeTouched(false);
      setUnitType('USF');
      setUnitAddress('');
      setCreateDefaultSectors(true);
    } else if (initialMode === 'EDIT_UNIT' && activeUnit) {
      setUnitName(fixTextEncoding(activeUnit.name || ''));
      setUnitCode(activeUnit.code || '');
      setUnitCodeTouched(true);
      setUnitType(activeUnit.unit_type || 'USF');
      setUnitAddress(fixTextEncoding(activeUnit.address || ''));
    } else if (initialMode === 'DELETE_UNIT') {
      setTargetUnitForReloc(otherUnits[0]?.id ? String(otherUnits[0].id) : '');
    } else if (initialMode === 'CREATE_SECTOR') {
      setSectorName('');
      setSectorCode('');
      setSectorCodeTouched(false);
      setRoomTheme('CONS');
      setAutoPosition3d(true);
      setShowAdvancedLayout(false);
      setBoundsX('');
      setBoundsZ('');
      setWidth3d('9');
      setDepth3d('5');
    } else if (initialMode === 'EDIT_SECTOR' && targetSector) {
      setSectorName(fixTextEncoding(targetSector.name || ''));
      setSectorCode(targetSector.code || '');
      setSectorCodeTouched(true);
      setRoomTheme(inferRoomThemeFromSector(targetSector));
      setAutoPosition3d(false);
      setShowAdvancedLayout(false);
      setBoundsX(String(targetSector.bounds_x ?? 0));
      setBoundsZ(String(targetSector.bounds_z ?? 0));
      setWidth3d(String(targetSector.width_3d ?? 9));
      setDepth3d(String(targetSector.depth_3d ?? 5));
    } else if (initialMode === 'DELETE_SECTOR') {
      setTargetSectorForReloc(siblingSectors[0]?.id ? String(siblingSectors[0].id) : '');
    }
    // Executa apenas ao abrir o modal ou trocar o alvo selecionado, preservando edições durante sync em segundo plano
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialMode, activeUnitId, targetSectorId]);

  if (!isOpen) return null;

  const switchMode = (nextMode) => {
    setErrorMsg('');
    setMode(nextMode);
    if (nextMode === 'CREATE_UNIT') {
      setUnitName('');
      setUnitCode('');
      setUnitCodeTouched(false);
      setUnitType('USF');
      setUnitAddress('');
      setCreateDefaultSectors(true);
    } else if (nextMode === 'EDIT_UNIT' && activeUnit) {
      setUnitName(fixTextEncoding(activeUnit.name || ''));
      setUnitCode(activeUnit.code || '');
      setUnitCodeTouched(true);
      setUnitType(activeUnit.unit_type || 'USF');
      setUnitAddress(fixTextEncoding(activeUnit.address || ''));
    } else if (nextMode === 'DELETE_UNIT') {
      setTargetUnitForReloc(otherUnits[0]?.id ? String(otherUnits[0].id) : '');
    } else if (nextMode === 'CREATE_SECTOR') {
      setSectorName('');
      setSectorCode('');
      setSectorCodeTouched(false);
      setRoomTheme('CONS');
      setAutoPosition3d(true);
      setShowAdvancedLayout(false);
      setBoundsX('');
      setBoundsZ('');
      setWidth3d('9');
      setDepth3d('5');
    } else if (nextMode === 'EDIT_SECTOR' && targetSector) {
      setSectorName(fixTextEncoding(targetSector.name || ''));
      setSectorCode(targetSector.code || '');
      setSectorCodeTouched(true);
      setRoomTheme(inferRoomThemeFromSector(targetSector));
      setAutoPosition3d(false);
      setShowAdvancedLayout(false);
      setBoundsX(String(targetSector.bounds_x ?? 0));
      setBoundsZ(String(targetSector.bounds_z ?? 0));
      setWidth3d(String(targetSector.width_3d ?? 9));
      setDepth3d(String(targetSector.depth_3d ?? 5));
    } else if (nextMode === 'DELETE_SECTOR') {
      setTargetSectorForReloc(siblingSectors[0]?.id ? String(siblingSectors[0].id) : '');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);
    try {
      if (mode === 'CREATE_UNIT') {
        await onCreateUnit({
          name: unitName,
          code: unitCode,
          unit_type: unitType,
          address: unitAddress,
          create_default_sectors: createDefaultSectors,
        });
      } else if (mode === 'EDIT_UNIT' && activeUnit) {
        await onUpdateUnit(activeUnit.id, {
          name: unitName,
          code: unitCode,
          unit_type: unitType,
          address: unitAddress,
        });
      } else if (mode === 'DELETE_UNIT' && activeUnit) {
        await onDeleteUnit(activeUnit.id, {
          target_unit_id: targetUnitForReloc ? Number(targetUnitForReloc) : undefined,
        });
      } else if (mode === 'CREATE_SECTOR' && activeUnit) {
        await onCreateSector(activeUnit.id, {
          name: sectorName,
          code: sectorCode,
          room_theme: roomTheme,
          width_3d: Number(width3d || 9),
          depth_3d: Number(depth3d || 5),
          ...(autoPosition3d
            ? {}
            : {
                bounds_x: boundsX === '' ? undefined : Number(boundsX),
                bounds_z: boundsZ === '' ? undefined : Number(boundsZ),
              }),
        });
      } else if (mode === 'EDIT_SECTOR' && targetSector) {
        await onUpdateSector(targetSector.id, {
          name: sectorName,
          code: sectorCode,
          room_theme: roomTheme,
          width_3d: Number(width3d || 9),
          depth_3d: Number(depth3d || 5),
          bounds_x: boundsX === '' ? undefined : Number(boundsX),
          bounds_z: boundsZ === '' ? undefined : Number(boundsZ),
        });
      } else if (mode === 'DELETE_SECTOR' && targetSector) {
        await onDeleteSector(targetSector.id, {
          target_sector_id: targetSectorForReloc ? Number(targetSectorForReloc) : undefined,
        });
      }
      onClose();
    } catch (err) {
      setErrorMsg(err?.message || 'Não foi possível concluir a operação.');
    } finally {
      setSubmitting(false);
    }
  };

  const isSectorDirectAction =
    mode === 'EDIT_SECTOR' || mode === 'DELETE_SECTOR';

  const headerTitle = {
    CREATE_UNIT: 'Cadastrar Nova Unidade de Saúde',
    EDIT_UNIT: `Editar Unidade — ${fixTextEncoding(activeUnit?.name || '')}`,
    DELETE_UNIT: `Excluir Unidade — ${fixTextEncoding(activeUnit?.name || '')}`,
    CREATE_SECTOR: `Novo Setor em ${fixTextEncoding(activeUnit?.name || 'Unidade')}`,
    EDIT_SECTOR: `Editar Setor — ${fixTextEncoding(targetSector?.name || '')}`,
    DELETE_SECTOR: `Excluir Setor — ${fixTextEncoding(targetSector?.name || '')}`,
  }[mode];

  return (
    <Backdrop onClick={() => !submitting && onClose()}>
      <ModalCard onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <ModalHeader>
          <div>
            <div className="m-kicker">
              ESTRUTURA DA REDE // {activeUnit ? fixTextEncoding(activeUnit.code) : 'RMM'}
            </div>
            <div className="m-title">{headerTitle}</div>
          </div>
          <CloseBtn type="button" onClick={() => !submitting && onClose()} title="Fechar">
            ✕
          </CloseBtn>
        </ModalHeader>

        {!isSectorDirectAction ? (
          <ModeTabs>
            <ModeTabBtn
              type="button"
              $active={mode === 'CREATE_UNIT'}
              onClick={() => switchMode('CREATE_UNIT')}
            >
              + Nova Unidade
            </ModeTabBtn>
            {activeUnit && (
              <>
                <ModeTabBtn
                  type="button"
                  $active={mode === 'CREATE_SECTOR'}
                  onClick={() => switchMode('CREATE_SECTOR')}
                >
                  + Novo Setor
                </ModeTabBtn>
                <ModeTabBtn
                  type="button"
                  $active={mode === 'EDIT_UNIT'}
                  onClick={() => switchMode('EDIT_UNIT')}
                >
                  Editar Unidade
                </ModeTabBtn>
                <ModeTabBtn
                  type="button"
                  $danger
                  $active={mode === 'DELETE_UNIT'}
                  onClick={() => switchMode('DELETE_UNIT')}
                >
                  Excluir Unidade
                </ModeTabBtn>
              </>
            )}
          </ModeTabs>
        ) : (
          <ModeTabs>
            <ModeTabBtn
              type="button"
              $active={mode === 'EDIT_SECTOR'}
              onClick={() => switchMode('EDIT_SECTOR')}
            >
              Editar Setor
            </ModeTabBtn>
            <ModeTabBtn
              type="button"
              $danger
              $active={mode === 'DELETE_SECTOR'}
              onClick={() => switchMode('DELETE_SECTOR')}
            >
              Excluir Setor
            </ModeTabBtn>
          </ModeTabs>
        )}

        <ModalBody onSubmit={handleSubmit}>
          {errorMsg && <AlertBanner $tone="danger">{errorMsg}</AlertBanner>}

          {(mode === 'CREATE_UNIT' || mode === 'EDIT_UNIT') && (
            <>
              <FieldRow $cols="2fr 1fr">
                <FieldGroup>
                  <label>Nome da Unidade de Saúde *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: USF Camela / UPA Ipojuca"
                    value={unitName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setUnitName(val);
                      if (!unitCodeTouched && mode === 'CREATE_UNIT') {
                        setUnitCode(suggestCodeFromName(val, 'UNI'));
                      }
                    }}
                  />
                </FieldGroup>
                <FieldGroup>
                  <label>
                    Sigla / Código
                    <span className="hint">Única</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: USF-CAM"
                    value={unitCode}
                    onChange={(e) => {
                      setUnitCodeTouched(true);
                      setUnitCode(e.target.value.toUpperCase());
                    }}
                  />
                </FieldGroup>
              </FieldRow>

              <FieldRow $cols="1fr 1.4fr">
                <FieldGroup>
                  <label>Tipo de Estabelecimento</label>
                  <select value={unitType} onChange={(e) => setUnitType(e.target.value)}>
                    {UNIT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FieldGroup>
                <FieldGroup>
                  <label>Endereço / Bairro</label>
                  <input
                    type="text"
                    placeholder="Ex: Distrito de Camela, Ipojuca - PE"
                    value={unitAddress}
                    onChange={(e) => setUnitAddress(e.target.value)}
                  />
                </FieldGroup>
              </FieldRow>

              {mode === 'CREATE_UNIT' && (
                <ToggleBox>
                  <input
                    type="checkbox"
                    checked={createDefaultSectors}
                    onChange={(e) => setCreateDefaultSectors(e.target.checked)}
                  />
                  <span>
                    Criar planta inicial com 4 setores padrão (Recepção, Consultório, Farmácia e Adm)
                  </span>
                </ToggleBox>
              )}
            </>
          )}

          {mode === 'DELETE_UNIT' && activeUnit && (
            <>
              {otherUnits.length === 0 ? (
                <AlertBanner $tone="danger">
                  Esta é a única unidade ativa no painel. Crie outra unidade antes de excluir{' '}
                  <strong>{fixTextEncoding(activeUnit.name)}</strong>.
                </AlertBanner>
              ) : (
                <AlertBanner $tone="warning">
                  A unidade <strong>{fixTextEncoding(activeUnit.name)}</strong> possui{' '}
                  <strong>{(activeUnit.sectors || []).length} setor(es)</strong> e{' '}
                  <strong>{unitMachineCount} computador(es)</strong> vinculados. Esta ação remove
                  permanentemente a unidade e todos os seus setores.
                </AlertBanner>
              )}

              {otherUnits.length > 0 && unitMachineCount > 0 && (
                <FieldGroup>
                  <label>Realocar computadores existentes para qual unidade?</label>
                  <select
                    value={targetUnitForReloc}
                    onChange={(e) => setTargetUnitForReloc(e.target.value)}
                    required
                  >
                    {otherUnits.map((u) => (
                      <option key={u.id} value={u.id}>
                        [{u.code}] {fixTextEncoding(u.name)}
                      </option>
                    ))}
                  </select>
                </FieldGroup>
              )}
            </>
          )}

          {(mode === 'CREATE_SECTOR' || mode === 'EDIT_SECTOR') && (
            <>
              <FieldRow $cols="2fr 1fr">
                <FieldGroup>
                  <label>Nome do Setor *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sala de Vacina, Consultório 02, CPD"
                    value={sectorName}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSectorName(val);
                      if (!sectorCodeTouched && mode === 'CREATE_SECTOR') {
                        setSectorCode(suggestCodeFromName(val, 'SETOR'));
                      }
                    }}
                  />
                </FieldGroup>
                <FieldGroup>
                  <label>
                    Sigla / Código
                    <span className="hint">Única na unidade</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: VAC-01"
                    value={sectorCode}
                    onChange={(e) => {
                      setSectorCodeTouched(true);
                      setSectorCode(e.target.value.toUpperCase());
                    }}
                  />
                </FieldGroup>
              </FieldRow>

              <FieldGroup>
                <label>
                  Estilo do Ambiente &amp; Mobiliário 3D
                  <span className="hint">Define móveis e piso na maquete</span>
                </label>
                <ThemeGrid>
                  {ROOM_ARCHETYPES.map((arch) => (
                    <ThemeOptionCard
                      key={arch.value}
                      type="button"
                      $selected={roomTheme === arch.value}
                      onClick={() => setRoomTheme(arch.value)}
                    >
                      <div className="t-code">{arch.value}</div>
                      <div className="t-name">{arch.label}</div>
                      <div className="t-desc">{arch.desc}</div>
                    </ThemeOptionCard>
                  ))}
                </ThemeGrid>
              </FieldGroup>

              <AdvancedToggleBtn
                type="button"
                onClick={() => setShowAdvancedLayout((prev) => !prev)}
              >
                {showAdvancedLayout
                  ? '▾ Ocultar layout e medidas 3D'
                  : '▸ Layout e medidas 3D (Avançado)'}
              </AdvancedToggleBtn>

              {showAdvancedLayout && (
                <AdvancedBox>
                  {mode === 'CREATE_SECTOR' && (
                    <ToggleBox style={{ background: '#FFFFFF' }}>
                      <input
                        type="checkbox"
                        checked={autoPosition3d}
                        onChange={(e) => setAutoPosition3d(e.target.checked)}
                      />
                      <span>
                        Posicionar automaticamente no próximo espaço livre da planta (sem colisão)
                      </span>
                    </ToggleBox>
                  )}

                  <FieldRow $cols="repeat(2, 1fr)">
                    <FieldGroup>
                      <label>Largura da Sala (m)</label>
                      <input
                        type="number"
                        step="0.5"
                        min="4"
                        max="24"
                        value={width3d}
                        onChange={(e) => setWidth3d(e.target.value)}
                      />
                    </FieldGroup>
                    <FieldGroup>
                      <label>Profundidade da Sala (m)</label>
                      <input
                        type="number"
                        step="0.5"
                        min="3.5"
                        max="16"
                        value={depth3d}
                        onChange={(e) => setDepth3d(e.target.value)}
                      />
                    </FieldGroup>
                  </FieldRow>

                  {(!autoPosition3d || mode === 'EDIT_SECTOR') && (
                    <FieldRow $cols="repeat(2, 1fr)">
                      <FieldGroup>
                        <label>Posição X Centro (m)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={boundsX}
                          placeholder="-4.5, 4.5, 13.5..."
                          onChange={(e) => setBoundsX(e.target.value)}
                        />
                      </FieldGroup>
                      <FieldGroup>
                        <label>Posição Z Centro (m)</label>
                        <input
                          type="number"
                          step="0.5"
                          value={boundsZ}
                          placeholder="-3.5 (Norte) ou 3.5 (Sul)"
                          onChange={(e) => setBoundsZ(e.target.value)}
                        />
                      </FieldGroup>
                    </FieldRow>
                  )}
                </AdvancedBox>
              )}
            </>
          )}

          {mode === 'DELETE_SECTOR' && targetSector && (
            <>
              {siblingSectors.length === 0 && sectorMachineCount > 0 ? (
                <AlertBanner $tone="danger">
                  O setor <strong>{fixTextEncoding(targetSector.name)}</strong> é o único setor desta
                  unidade e contém <strong>{sectorMachineCount} computador(es)</strong>. Crie outro
                  setor antes de excluí-lo para permitir a transferência.
                </AlertBanner>
              ) : (
                <AlertBanner $tone="warning">
                  Confirma a exclusão do setor{' '}
                  <strong>{fixTextEncoding(targetSector.name)}</strong> ({targetSector.code}) da
                  unidade <strong>{fixTextEncoding(activeUnit?.name || '')}</strong>?
                  {sectorMachineCount > 0
                    ? ` Os ${sectorMachineCount} computador(es) alocados serão transferidos para o setor selecionado abaixo.`
                    : ' Este setor não possui computadores alocados.'}
                </AlertBanner>
              )}

              {siblingSectors.length > 0 && sectorMachineCount > 0 && (
                <FieldGroup>
                  <label>Transferir computadores deste setor para:</label>
                  <select
                    value={targetSectorForReloc}
                    onChange={(e) => setTargetSectorForReloc(e.target.value)}
                    required
                  >
                    {siblingSectors.map((sec) => (
                      <option key={sec.id} value={sec.id}>
                        [{sec.code}] {fixTextEncoding(sec.name)}
                      </option>
                    ))}
                  </select>
                </FieldGroup>
              )}
            </>
          )}

          <FooterActions>
            <ActionBtn
              type="button"
              onClick={() => !submitting && onClose()}
              disabled={submitting}
            >
              Cancelar
            </ActionBtn>
            <ActionBtn
              type="submit"
              $variant={
                mode === 'DELETE_UNIT' || mode === 'DELETE_SECTOR' ? 'danger' : 'primary'
              }
              disabled={
                submitting ||
                (mode === 'DELETE_UNIT' && otherUnits.length === 0) ||
                (mode === 'DELETE_SECTOR' &&
                  siblingSectors.length === 0 &&
                  sectorMachineCount > 0)
              }
            >
              {submitting
                ? 'Processando...'
                : mode === 'CREATE_UNIT'
                  ? 'Criar Unidade'
                  : mode === 'EDIT_UNIT'
                    ? 'Salvar Unidade'
                    : mode === 'DELETE_UNIT'
                      ? 'Confirmar Exclusão da Unidade'
                      : mode === 'CREATE_SECTOR'
                        ? 'Criar Setor 3D'
                        : mode === 'EDIT_SECTOR'
                          ? 'Salvar Setor'
                          : 'Confirmar Exclusão do Setor'}
            </ActionBtn>
          </FooterActions>
        </ModalBody>
      </ModalCard>
    </Backdrop>
  );
}
