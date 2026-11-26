import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { fixTextEncoding } from '../styles/theme';
import { rmmApi } from '../services/api';
import {
  IconKey,
  IconUsers,
  IconShieldCheck,
  IconEye,
  IconEyeOff,
  IconPlus,
  IconEdit,
  IconTrash,
  IconClose,
  IconDownload,
  IconCopy,
  IconCheck,
  IconBan,
  IconSearch,
} from './Icons';

const ROLE_LABELS = {
  ADMIN_N2: 'Admin N2',
  TECH_N1: 'Suporte N1',
  VIEWER: 'Gestão',
};

const PageContainer = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 24px 28px 44px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const PageHeader = styled.div`
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

const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 236px minmax(0, 1fr);
  gap: 22px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const SideNav = styled.nav`
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  gap: 9px;
  width: 100%;
  padding: 9px 11px;
  border-radius: 7px;
  border: none;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.brandPrimarySubtle : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.brandPrimary : theme.colors.textSecondary};
  font-size: 0.8rem;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  text-align: left;
  cursor: pointer;
  transition: background 140ms ease, color 140ms ease;

  &:hover {
    background: ${({ $active, theme }) =>
      $active ? 'rgba(45, 106, 79, 0.14)' : theme.colors.bgSurfaceHover};
    color: ${({ $active, theme }) =>
      $active ? theme.colors.brandPrimary : theme.colors.textPrimary};
  }
`;

const ContentPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-width: 0;
`;

const SurfaceCard = styled.section`
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
`;

const CardHead = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;

  h2 {
    font-size: 0.94rem;
    font-weight: 700;
    letter-spacing: -0.015em;
  }

  p {
    font-size: 0.76rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    margin-top: 2px;
  }
`;

const CardBody = styled.div`
  padding: 20px;
`;

const IdentityStrip = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 10px;
    background: rgba(45, 106, 79, 0.12);
    color: ${({ theme }) => theme.colors.brandPrimary};
    font-size: 0.96rem;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .meta {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .name {
    font-size: 0.96rem;
    font-weight: 700;
  }

  .email {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.76rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const FormStack = styled.form`
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .input-wrap {
    position: relative;
    display: flex;
    align-items: center;
  }

  input,
  select {
    width: 100%;
    height: 38px;
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    border-radius: 7px;
    background: ${({ theme }) => theme.colors.bgSurface};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.82rem;
    padding: 0 38px 0 11px;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.12);
    }
  }

  select {
    padding-right: 11px;
  }

  .eye-btn {
    position: absolute;
    right: 6px;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 5px;
    background: transparent;
    color: ${({ theme }) => theme.colors.textMuted};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.colors.textPrimary};
      background: ${({ theme }) => theme.colors.bgSurfaceHover};
    }
  }

  .hint {
    font-size: 0.71rem;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

const Banner = styled.div`
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 0.78rem;
  font-weight: 600;
  background: ${({ $type }) => ($type === 'error' ? '#FEF2F2' : '#F0FDF4')};
  border: 1px solid ${({ $type }) => ($type === 'error' ? '#FECACA' : '#BBF7D0')};
  color: ${({ $type }) => ($type === 'error' ? '#991B1B' : '#166534')};
`;

const PrimaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 15px;
  border-radius: 7px;
  border: none;
  background: ${({ $danger, theme }) =>
    $danger ? theme.colors.status.CRITICAL : theme.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${({ $danger, theme }) =>
      $danger ? '#A61717' : theme.colors.brandPrimaryHover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecondaryBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 36px;
  padding: 0 13px;
  border-radius: 7px;
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.bgSurfaceHover};
  }
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
    padding: 10px 16px;
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
    padding: 11px 16px;
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
    font-size: 0.74rem;
  }
`;

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  white-space: nowrap;
`;

const MiniBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  height: 27px;
  padding: 0 8px;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bgSurface};
  color: ${({ $danger, $accent, theme }) =>
    $danger
      ? theme.colors.status.CRITICAL
      : $accent
        ? theme.colors.brandPrimary
        : theme.colors.textSecondary};
  font-size: 0.72rem;
  font-weight: 600;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: ${({ $danger, theme }) =>
      $danger ? 'rgba(200, 30, 30, 0.08)' : theme.colors.bgSurfaceHover};
    border-color: ${({ $danger, theme }) =>
      $danger ? 'rgba(200, 30, 30, 0.35)' : theme.colors.borderStrong};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const AgentMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .m-lbl {
    font-size: 0.7rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  .m-val {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
    word-break: break-all;
  }
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
  max-width: 450px;
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

  .m-foot {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  }
`;

function getInitials(name) {
  const parts = String(name || 'OP')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return 'OP';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function SettingsView({
  token,
  currentUser,
  allMachines = [],
  agentInfo = null,
  onDownloadAgent,
  onRevokeMachine,
}) {
  const isAdmin = currentUser?.role === 'ADMIN_N2';
  const [section, setSection] = useState(isAdmin ? 'USERS' : 'ACCOUNT');

  // --- Minha senha ---
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [showPw, setShowPw] = useState({ current: false, next: false, confirm: false });
  const [pwBusy, setPwBusy] = useState(false);
  const [pwFeedback, setPwFeedback] = useState({ type: '', text: '' });

  // --- Usuários (ADMIN_N2) ---
  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersNotice, setUsersNotice] = useState({ type: '', text: '' });
  const [userModal, setUserModal] = useState({
    mode: null, // 'CREATE' | 'EDIT' | 'RESET_PW' | 'DELETE'
    target: null,
    name: '',
    email: '',
    role: 'TECH_N1',
    isActive: true,
    password: '',
    confirmPassword: '',
    showPassword: false,
    busy: false,
    error: '',
  });

  // --- Agentes & revogação ---
  const [agentSearch, setAgentSearch] = useState('');
  const [agentFilter, setAgentFilter] = useState('ALL');
  const [revokeBusyId, setRevokeBusyId] = useState(null);
  const [copiedSha, setCopiedSha] = useState(false);

  const loadUsers = useCallback(async () => {
    if (!token || !isAdmin) return;
    setUsersLoading(true);
    try {
      const res = await rmmApi.getUsers(token);
      setUsers(res.users || []);
    } catch (err) {
      setUsersNotice({ type: 'error', text: err.message || 'Falha ao carregar usuários.' });
    } finally {
      setUsersLoading(false);
    }
  }, [token, isAdmin]);

  useEffect(() => {
    if (isAdmin) loadUsers();
  }, [isAdmin, loadUsers]);

  async function handleChangeOwnPassword(e) {
    e.preventDefault();
    setPwFeedback({ type: '', text: '' });
    if (pwForm.next.length < 8) {
      setPwFeedback({ type: 'error', text: 'A nova senha deve ter no mínimo 8 caracteres.' });
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwFeedback({ type: 'error', text: 'A confirmação da nova senha não confere.' });
      return;
    }
    setPwBusy(true);
    try {
      const res = await rmmApi.changePassword(token, {
        currentPassword: pwForm.current,
        newPassword: pwForm.next,
      });
      setPwForm({ current: '', next: '', confirm: '' });
      setPwFeedback({
        type: 'success',
        text: res.message || 'Senha atualizada com sucesso.',
      });
    } catch (err) {
      setPwFeedback({ type: 'error', text: err.message || 'Não foi possível alterar a senha.' });
    } finally {
      setPwBusy(false);
    }
  }

  function closeModal() {
    setUserModal((p) => ({ ...p, mode: null, target: null, error: '', busy: false }));
  }

  async function handleSubmitUserModal(e) {
    e.preventDefault();
    setUserModal((p) => ({ ...p, error: '' }));

    if (userModal.mode === 'CREATE') {
      if (!userModal.name.trim() || !userModal.email.trim()) {
        setUserModal((p) => ({ ...p, error: 'Nome e e-mail são obrigatórios.' }));
        return;
      }
      if (userModal.password.length < 8) {
        setUserModal((p) => ({ ...p, error: 'A senha inicial deve ter no mínimo 8 caracteres.' }));
        return;
      }
      setUserModal((p) => ({ ...p, busy: true }));
      try {
        await rmmApi.createUser(token, {
          name: userModal.name.trim(),
          email: userModal.email.trim(),
          role: userModal.role,
          password: userModal.password,
        });
        await loadUsers();
        setUsersNotice({ type: 'success', text: `Conta ${userModal.email.trim()} criada com sucesso.` });
        closeModal();
      } catch (err) {
        setUserModal((p) => ({ ...p, busy: false, error: err.message }));
      }
      return;
    }

    if (userModal.mode === 'EDIT' && userModal.target) {
      setUserModal((p) => ({ ...p, busy: true }));
      try {
        await rmmApi.updateUser(token, userModal.target.id, {
          name: userModal.name.trim(),
          role: userModal.role,
          is_active: userModal.isActive ? 1 : 0,
        });
        await loadUsers();
        setUsersNotice({ type: 'success', text: `Usuário ${userModal.target.email} atualizado.` });
        closeModal();
      } catch (err) {
        setUserModal((p) => ({ ...p, busy: false, error: err.message }));
      }
      return;
    }

    if (userModal.mode === 'RESET_PW' && userModal.target) {
      if (userModal.password.length < 8) {
        setUserModal((p) => ({ ...p, error: 'A nova senha deve ter no mínimo 8 caracteres.' }));
        return;
      }
      if (userModal.password !== userModal.confirmPassword) {
        setUserModal((p) => ({ ...p, error: 'A confirmação da nova senha não confere.' }));
        return;
      }
      setUserModal((p) => ({ ...p, busy: true }));
      try {
        await rmmApi.updateUser(token, userModal.target.id, {
          password: userModal.password,
        });
        setUsersNotice({
          type: 'success',
          text: `Senha de ${userModal.target.email} redefinida com sucesso.`,
        });
        closeModal();
      } catch (err) {
        setUserModal((p) => ({ ...p, busy: false, error: err.message }));
      }
      return;
    }

    if (userModal.mode === 'DELETE' && userModal.target) {
      setUserModal((p) => ({ ...p, busy: true }));
      try {
        await rmmApi.deleteUser(token, userModal.target.id);
        await loadUsers();
        setUsersNotice({
          type: 'success',
          text: `Conta ${userModal.target.email} removida do sistema.`,
        });
        closeModal();
      } catch (err) {
        setUserModal((p) => ({ ...p, busy: false, error: err.message }));
      }
    }
  }

  const filteredStations = useMemo(() => {
    const q = agentSearch.trim().toLowerCase();
    return allMachines.filter((m) => {
      const revoked = Boolean(Number(m.is_revoked));
      if (agentFilter === 'REVOKED' && !revoked) return false;
      if (agentFilter === 'ACTIVE' && revoked) return false;
      if (q) {
        const hay = [m.hostname, m.ip_address, m.unit_name, m.sector_name, m.agent_version]
          .map((v) => fixTextEncoding(String(v || '')).toLowerCase())
          .join(' ');
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [allMachines, agentFilter, agentSearch]);

  const revokedCount = allMachines.filter((m) => Boolean(Number(m.is_revoked))).length;

  async function handleToggleRevoke(machine) {
    if (!onRevokeMachine) return;
    setRevokeBusyId(machine.id);
    try {
      await onRevokeMachine(machine.id, !Number(machine.is_revoked));
    } finally {
      setRevokeBusyId(null);
    }
  }

  return (
    <PageContainer>
      <PageHeader>
        <h1>Configurações e acesso</h1>
        <p>
          Gerencie sua senha, contas da equipe de TI e credenciais dos agentes Windows instalados.
        </p>
      </PageHeader>

      <SettingsGrid>
        <SideNav aria-label="Seções de configurações">
          <NavItem
            type="button"
            $active={section === 'ACCOUNT'}
            onClick={() => setSection('ACCOUNT')}
          >
            <IconKey size={15} />
            <span>Minha conta e senha</span>
          </NavItem>
          {isAdmin && (
            <>
              <NavItem
                type="button"
                $active={section === 'USERS'}
                onClick={() => setSection('USERS')}
              >
                <IconUsers size={15} />
                <span>Usuários e permissões</span>
              </NavItem>
              <NavItem
                type="button"
                $active={section === 'AGENTS'}
                onClick={() => setSection('AGENTS')}
              >
                <IconShieldCheck size={15} />
                <span>Agentes e segurança</span>
              </NavItem>
            </>
          )}
        </SideNav>

        <ContentPanel>
          {section === 'ACCOUNT' && (
            <SurfaceCard>
              <CardHead>
                <div>
                  <h2>Minha conta e senha</h2>
                  <p>Altere sua senha de acesso ao painel Pulso RMM com criptografia scrypt.</p>
                </div>
              </CardHead>
              <CardBody>
                <IdentityStrip>
                  <span className="avatar">{getInitials(currentUser?.name)}</span>
                  <div className="meta">
                    <span className="name">{fixTextEncoding(currentUser?.name || 'Operador')}</span>
                    <span className="email">
                      {currentUser?.email} · {ROLE_LABELS[currentUser?.role] || currentUser?.role}
                    </span>
                  </div>
                </IdentityStrip>

                <FormStack onSubmit={handleChangeOwnPassword}>
                  <FieldGroup>
                    <label htmlFor="pw-current">Senha atual</label>
                    <div className="input-wrap">
                      <input
                        id="pw-current"
                        type={showPw.current ? 'text' : 'password'}
                        autoComplete="current-password"
                        required
                        value={pwForm.current}
                        onChange={(e) => setPwForm((p) => ({ ...p, current: e.target.value }))}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        aria-label="Mostrar ou ocultar senha atual"
                        onClick={() => setShowPw((p) => ({ ...p, current: !p.current }))}
                      >
                        {showPw.current ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                      </button>
                    </div>
                  </FieldGroup>

                  <FieldGroup>
                    <label htmlFor="pw-next">Nova senha</label>
                    <div className="input-wrap">
                      <input
                        id="pw-next"
                        type={showPw.next ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        minLength={8}
                        value={pwForm.next}
                        onChange={(e) => setPwForm((p) => ({ ...p, next: e.target.value }))}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        aria-label="Mostrar ou ocultar nova senha"
                        onClick={() => setShowPw((p) => ({ ...p, next: !p.next }))}
                      >
                        {showPw.next ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                      </button>
                    </div>
                    <span className="hint">Mínimo de 8 caracteres. Recomende combinar letras, números e símbolos.</span>
                  </FieldGroup>

                  <FieldGroup>
                    <label htmlFor="pw-confirm">Confirmar nova senha</label>
                    <div className="input-wrap">
                      <input
                        id="pw-confirm"
                        type={showPw.confirm ? 'text' : 'password'}
                        autoComplete="new-password"
                        required
                        minLength={8}
                        value={pwForm.confirm}
                        onChange={(e) => setPwForm((p) => ({ ...p, confirm: e.target.value }))}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        aria-label="Mostrar ou ocultar confirmação da senha"
                        onClick={() => setShowPw((p) => ({ ...p, confirm: !p.confirm }))}
                      >
                        {showPw.confirm ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                      </button>
                    </div>
                  </FieldGroup>

                  {pwFeedback.text && (
                    <Banner $type={pwFeedback.type}>{pwFeedback.text}</Banner>
                  )}

                  <div>
                    <PrimaryBtn type="submit" disabled={pwBusy}>
                      {pwBusy ? 'Salvando...' : 'Atualizar senha'}
                    </PrimaryBtn>
                  </div>
                </FormStack>
              </CardBody>
            </SurfaceCard>
          )}

          {section === 'USERS' && isAdmin && (
            <SurfaceCard>
              <CardHead>
                <div>
                  <h2>Usuários e permissões</h2>
                  <p>
                    Crie operadores, redefina senhas das contas iniciais ou remova acessos que não utiliza.
                  </p>
                </div>
                <PrimaryBtn
                  type="button"
                  onClick={() => {
                    setUsersNotice({ type: '', text: '' });
                    setUserModal({
                      mode: 'CREATE',
                      target: null,
                      name: '',
                      email: '',
                      role: 'TECH_N1',
                      isActive: true,
                      password: '',
                      confirmPassword: '',
                      showPassword: false,
                      busy: false,
                      error: '',
                    });
                  }}
                >
                  <IconPlus size={14} />
                  <span>Novo usuário</span>
                </PrimaryBtn>
              </CardHead>

              {usersNotice.text && (
                <div style={{ padding: '12px 20px 0' }}>
                  <Banner $type={usersNotice.type}>{usersNotice.text}</Banner>
                </div>
              )}

              <TableScroller>
                <StyledTable>
                  <thead>
                    <tr>
                      <th>Operador</th>
                      <th>E-mail</th>
                      <th>Perfil</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersLoading ? (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center', padding: '26px', color: '#5B655F' }}>
                          Carregando operadores...
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => {
                        const isSelf = Number(u.id) === Number(currentUser?.id);
                        const isActive = Boolean(Number(u.is_active));
                        return (
                          <tr key={u.id}>
                            <td style={{ fontWeight: 600 }}>
                              {fixTextEncoding(u.name)}
                              {isSelf && (
                                <Badge
                                  $bg="rgba(45,106,79,0.10)"
                                  $color="#2D6A4F"
                                  style={{ marginLeft: 8 }}
                                >
                                  Você
                                </Badge>
                              )}
                            </td>
                            <td className="mono">{u.email}</td>
                            <td>
                              <Badge
                                $bg={
                                  u.role === 'ADMIN_N2'
                                    ? 'rgba(45,106,79,0.12)'
                                    : u.role === 'TECH_N1'
                                      ? 'rgba(180,83,9,0.10)'
                                      : 'rgba(100,116,139,0.11)'
                                }
                                $color={
                                  u.role === 'ADMIN_N2'
                                    ? '#2D6A4F'
                                    : u.role === 'TECH_N1'
                                      ? '#B45309'
                                      : '#475569'
                                }
                              >
                                {ROLE_LABELS[u.role] || u.role}
                              </Badge>
                            </td>
                            <td>
                              <Badge
                                $bg={isActive ? 'rgba(45,106,79,0.09)' : 'rgba(100,116,139,0.12)'}
                                $color={isActive ? '#2D6A4F' : '#64748B'}
                              >
                                {isActive ? 'Ativo' : 'Inativo'}
                              </Badge>
                            </td>
                            <td>
                              <div style={{ display: 'inline-flex', gap: 5, whiteSpace: 'nowrap' }}>
                                <MiniBtn
                                  type="button"
                                  onClick={() =>
                                    setUserModal({
                                      mode: 'EDIT',
                                      target: u,
                                      name: fixTextEncoding(u.name),
                                      email: u.email,
                                      role: u.role,
                                      isActive,
                                      password: '',
                                      confirmPassword: '',
                                      showPassword: false,
                                      busy: false,
                                      error: '',
                                    })
                                  }
                                >
                                  <IconEdit size={12} />
                                  <span>Editar</span>
                                </MiniBtn>
                                <MiniBtn
                                  type="button"
                                  $accent
                                  onClick={() =>
                                    setUserModal({
                                      mode: 'RESET_PW',
                                      target: u,
                                      name: fixTextEncoding(u.name),
                                      email: u.email,
                                      role: u.role,
                                      isActive,
                                      password: '',
                                      confirmPassword: '',
                                      showPassword: false,
                                      busy: false,
                                      error: '',
                                    })
                                  }
                                >
                                  <IconKey size={12} />
                                  <span>Redefinir senha</span>
                                </MiniBtn>
                                <MiniBtn
                                  type="button"
                                  $danger
                                  disabled={isSelf}
                                  title={
                                    isSelf
                                      ? 'Você não pode excluir sua própria conta logada'
                                      : `Excluir conta ${u.email}`
                                  }
                                  onClick={() =>
                                    setUserModal({
                                      mode: 'DELETE',
                                      target: u,
                                      name: fixTextEncoding(u.name),
                                      email: u.email,
                                      role: u.role,
                                      isActive,
                                      password: '',
                                      confirmPassword: '',
                                      showPassword: false,
                                      busy: false,
                                      error: '',
                                    })
                                  }
                                >
                                  <IconTrash size={12} />
                                </MiniBtn>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </StyledTable>
              </TableScroller>
            </SurfaceCard>
          )}

          {section === 'AGENTS' && isAdmin && (
            <>
              <SurfaceCard>
                <CardHead>
                  <div>
                    <h2>Instalador oficial do Agente Windows</h2>
                    <p>Binário nativo com criptografia DPAPI, TLS 1.2 e verificação SHA-256 em OTA.</p>
                  </div>
                  <PrimaryBtn type="button" onClick={onDownloadAgent}>
                    <IconDownload size={14} />
                    <span>Baixar IpojucaRMM-Setup.exe</span>
                  </PrimaryBtn>
                </CardHead>
                <CardBody>
                  <AgentMetaGrid>
                    <div className="meta-item">
                      <span className="m-lbl">Versão publicada</span>
                      <span className="m-val">{agentInfo?.latest_version || '2.6.2-native-exe'}</span>
                    </div>
                    <div className="meta-item">
                      <span className="m-lbl">Tamanho</span>
                      <span className="m-val">
                        {agentInfo?.size_bytes
                          ? `${(agentInfo.size_bytes / 1024).toFixed(1)} KB`
                          : '—'}
                      </span>
                    </div>
                    <div className="meta-item">
                      <span className="m-lbl">SHA-256 oficial</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span className="m-val" style={{ fontSize: '0.72rem' }}>
                          {agentInfo?.sha256 ? `${agentInfo.sha256.slice(0, 20)}...` : '—'}
                        </span>
                        {agentInfo?.sha256 && (
                          <MiniBtn
                            type="button"
                            onClick={() => {
                              navigator.clipboard?.writeText(agentInfo.sha256).catch(() => {});
                              setCopiedSha(true);
                              setTimeout(() => setCopiedSha(false), 1400);
                            }}
                          >
                            {copiedSha ? <IconCheck size={12} /> : <IconCopy size={12} />}
                          </MiniBtn>
                        )}
                      </div>
                    </div>
                  </AgentMetaGrid>
                </CardBody>
              </SurfaceCard>

              <SurfaceCard>
                <CardHead>
                  <div>
                    <h2>Controle de revogação de estações</h2>
                    <p>
                      {revokedCount === 0
                        ? 'Nenhuma estação revogada no momento. Revogue imediatamente qualquer equipamento perdido ou comprometido.'
                        : `${revokedCount} estação(ões) revogada(s) bloqueada(s) de se comunicar com o servidor.`}
                    </p>
                  </div>
                  <div style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}>
                    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                      <span style={{ position: 'absolute', left: 9, color: '#7B857F', display: 'inline-flex' }}>
                        <IconSearch size={13} />
                      </span>
                      <input
                        type="text"
                        placeholder="Filtrar hostname..."
                        value={agentSearch}
                        onChange={(e) => setAgentSearch(e.target.value)}
                        style={{
                          height: 32,
                          padding: '0 10px 0 28px',
                          borderRadius: 6,
                          border: '1px solid rgba(30,36,32,0.14)',
                          fontSize: '0.76rem',
                        }}
                      />
                    </div>
                    <select
                      aria-label="Filtrar estado de revogação"
                      value={agentFilter}
                      onChange={(e) => setAgentFilter(e.target.value)}
                      style={{
                        height: 32,
                        padding: '0 8px',
                        borderRadius: 6,
                        border: '1px solid rgba(30,36,32,0.14)',
                        fontSize: '0.76rem',
                      }}
                    >
                      <option value="ALL">Todas ({allMachines.length})</option>
                      <option value="REVOKED">Revogadas ({revokedCount})</option>
                      <option value="ACTIVE">Autorizadas ({allMachines.length - revokedCount})</option>
                    </select>
                  </div>
                </CardHead>
                <TableScroller>
                  <StyledTable>
                    <thead>
                      <tr>
                        <th>Estação</th>
                        <th>Unidade / Setor</th>
                        <th>Versão</th>
                        <th>Credencial</th>
                        <th>Ação</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStations.length === 0 ? (
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: '#5B655F' }}>
                            Nenhuma estação encontrada.
                          </td>
                        </tr>
                      ) : (
                        filteredStations.map((m) => {
                          const revoked = Boolean(Number(m.is_revoked));
                          return (
                            <tr key={m.id}>
                              <td style={{ fontWeight: 700 }}>{m.hostname}</td>
                              <td>
                                {fixTextEncoding(m.unit_name || '—')} ·{' '}
                                {fixTextEncoding(m.sector_name || '—')}
                              </td>
                              <td className="mono">{m.agent_version || '—'}</td>
                              <td>
                                <Badge
                                  $bg={revoked ? 'rgba(200,30,30,0.10)' : 'rgba(45,106,79,0.10)'}
                                  $color={revoked ? '#C81E1E' : '#2D6A4F'}
                                >
                                  {revoked ? 'Revogado' : 'Autorizado'}
                                </Badge>
                              </td>
                              <td>
                                <MiniBtn
                                  type="button"
                                  $danger={!revoked}
                                  $accent={revoked}
                                  disabled={revokeBusyId === m.id}
                                  onClick={() => handleToggleRevoke(m)}
                                >
                                  {revoked ? <IconShieldCheck size={12} /> : <IconBan size={12} />}
                                  <span>{revoked ? 'Reativar acesso' : 'Revogar agente'}</span>
                                </MiniBtn>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </StyledTable>
                </TableScroller>
              </SurfaceCard>
            </>
          )}
        </ContentPanel>
      </SettingsGrid>

      {/* MODAL DE USUÁRIOS (CRIAR / EDITAR / REDEFINIR SENHA / EXCLUIR) */}
      {userModal.mode && (
        <ModalBackdrop onClick={() => !userModal.busy && closeModal()}>
          <ModalCard onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <div className="m-head">
              <h3>
                {userModal.mode === 'CREATE' && 'Novo operador'}
                {userModal.mode === 'EDIT' && `Editar ${userModal.target?.email}`}
                {userModal.mode === 'RESET_PW' && `Redefinir senha — ${userModal.target?.email}`}
                {userModal.mode === 'DELETE' && 'Excluir conta de operador'}
              </h3>
              <MiniBtn type="button" onClick={closeModal} aria-label="Fechar">
                <IconClose size={13} />
              </MiniBtn>
            </div>

            <form
              onSubmit={handleSubmitUserModal}
              style={{ display: 'flex', flexDirection: 'column', gap: 13 }}
            >
              {(userModal.mode === 'CREATE' || userModal.mode === 'EDIT') && (
                <>
                  <FieldGroup>
                    <label htmlFor="um-name">Nome completo</label>
                    <input
                      id="um-name"
                      type="text"
                      required
                      style={{ paddingRight: 11 }}
                      value={userModal.name}
                      onChange={(e) => setUserModal((p) => ({ ...p, name: e.target.value }))}
                    />
                  </FieldGroup>

                  {userModal.mode === 'CREATE' && (
                    <FieldGroup>
                      <label htmlFor="um-email">E-mail de acesso</label>
                      <input
                        id="um-email"
                        type="email"
                        required
                        style={{ paddingRight: 11 }}
                        value={userModal.email}
                        onChange={(e) => setUserModal((p) => ({ ...p, email: e.target.value }))}
                      />
                    </FieldGroup>
                  )}

                  <FieldGroup>
                    <label htmlFor="um-role">Perfil de permissão</label>
                    <select
                      id="um-role"
                      value={userModal.role}
                      onChange={(e) => setUserModal((p) => ({ ...p, role: e.target.value }))}
                    >
                      <option value="ADMIN_N2">Admin N2 (acesso completo + usuários + segurança)</option>
                      <option value="TECH_N1">Suporte N1 (mapa, ações de diagnóstico e unidades)</option>
                      <option value="VIEWER">Gestão (somente visualização e relatórios)</option>
                    </select>
                  </FieldGroup>

                  {userModal.mode === 'EDIT' && (
                    <label
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={userModal.isActive}
                        onChange={(e) =>
                          setUserModal((p) => ({ ...p, isActive: e.target.checked }))
                        }
                      />
                      <span>Conta ativa (permitir login no painel)</span>
                    </label>
                  )}

                  {userModal.mode === 'CREATE' && (
                    <FieldGroup>
                      <label htmlFor="um-pw">Senha inicial (mínimo 8 caracteres)</label>
                      <div className="input-wrap">
                        <input
                          id="um-pw"
                          type={userModal.showPassword ? 'text' : 'password'}
                          required
                          minLength={8}
                          value={userModal.password}
                          onChange={(e) => setUserModal((p) => ({ ...p, password: e.target.value }))}
                        />
                        <button
                          type="button"
                          className="eye-btn"
                          onClick={() =>
                            setUserModal((p) => ({ ...p, showPassword: !p.showPassword }))
                          }
                        >
                          {userModal.showPassword ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                        </button>
                      </div>
                    </FieldGroup>
                  )}
                </>
              )}

              {userModal.mode === 'RESET_PW' && (
                <>
                  <FieldGroup>
                    <label htmlFor="um-reset-pw">Nova senha (mínimo 8 caracteres)</label>
                    <div className="input-wrap">
                      <input
                        id="um-reset-pw"
                        type={userModal.showPassword ? 'text' : 'password'}
                        required
                        minLength={8}
                        value={userModal.password}
                        onChange={(e) => setUserModal((p) => ({ ...p, password: e.target.value }))}
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={() =>
                          setUserModal((p) => ({ ...p, showPassword: !p.showPassword }))
                        }
                      >
                        {userModal.showPassword ? <IconEyeOff size={15} /> : <IconEye size={15} />}
                      </button>
                    </div>
                  </FieldGroup>
                  <FieldGroup>
                    <label htmlFor="um-reset-confirm">Confirmar nova senha</label>
                    <input
                      id="um-reset-confirm"
                      type={userModal.showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      style={{ paddingRight: 11 }}
                      value={userModal.confirmPassword}
                      onChange={(e) =>
                        setUserModal((p) => ({ ...p, confirmPassword: e.target.value }))
                      }
                    />
                  </FieldGroup>
                </>
              )}

              {userModal.mode === 'DELETE' && (
                <p style={{ fontSize: '0.82rem', color: '#5B655F', lineHeight: 1.5 }}>
                  Tem certeza que deseja excluir permanentemente a conta{' '}
                  <strong style={{ color: '#1E2420' }}>{userModal.target?.email}</strong>? Essa
                  operação é registrada na trilha de auditoria.
                </p>
              )}

              {userModal.error && <Banner $type="error">{userModal.error}</Banner>}

              <div className="m-foot">
                <SecondaryBtn type="button" disabled={userModal.busy} onClick={closeModal}>
                  Cancelar
                </SecondaryBtn>
                <PrimaryBtn
                  type="submit"
                  $danger={userModal.mode === 'DELETE'}
                  disabled={userModal.busy}
                >
                  {userModal.busy
                    ? 'Processando...'
                    : userModal.mode === 'CREATE'
                      ? 'Criar conta'
                      : userModal.mode === 'EDIT'
                        ? 'Salvar alterações'
                        : userModal.mode === 'RESET_PW'
                          ? 'Redefinir senha'
                          : 'Excluir conta'}
                </PrimaryBtn>
              </div>
            </form>
          </ModalCard>
        </ModalBackdrop>
      )}
    </PageContainer>
  );
}
