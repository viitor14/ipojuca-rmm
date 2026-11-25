import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import {
  BrandMark,
  IconEye,
  IconEyeOff,
  IconAlertTriangle,
  IconShieldCheck,
  IconMonitor,
} from './Icons';

const pulseFlow = keyframes`
  0% { stroke-dashoffset: 36; }
  100% { stroke-dashoffset: 0; }
`;

const PageShell = styled.div`
  min-height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.bgCanvas};
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(420px, 0.85fr);
  overflow-y: auto;
  overflow-x: hidden;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    background: ${({ theme }) => theme.colors.bgSurface};
  }
`;

const ShowcasePane = styled.section`
  background: ${({ theme }) => theme.colors.bgCanvas};
  padding: 36px 52px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 32px;
  min-width: 0;

  @media (max-width: 1180px) {
    padding: 32px 36px;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

const TopBrandRow = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .brand-left {
    display: inline-flex;
    align-items: center;
    gap: 10px;
  }

  .brand-name {
    font-size: 0.94rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.02em;
  }

  .brand-org {
    font-size: 0.78rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const EditorialHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  max-width: 620px;

  h1 {
    font-size: clamp(1.75rem, 2.35vw, 2.35rem);
    font-weight: 700;
    line-height: 1.16;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.textPrimary};

    .muted {
      color: ${({ theme }) => theme.colors.textSecondary};
      font-weight: 600;
    }
  }
`;

const TopologyCard = styled.div`
  background: ${({ theme }) => theme.colors.bgSurface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: 14px;
  padding: 22px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  .topo-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .topo-proto {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.72rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.brandPrimary};
    background: ${({ theme }) => theme.colors.brandPrimarySubtle};
    padding: 3px 9px;
    border-radius: 999px;
  }
`;

const TopologyGrid = styled.div`
  display: grid;
  grid-template-columns: 164px 1fr 196px;
  align-items: center;
  gap: 0;

  @media (max-width: 1120px) {
    grid-template-columns: 146px 1fr 172px;
  }
`;

const HubNode = styled.div`
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  .hub-icon {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.brandPrimarySubtle};
    color: ${({ theme }) => theme.colors.brandPrimary};
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .hub-title {
    font-size: 0.84rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.01em;
  }

  .hub-sub {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.7rem;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ConduitSvg = styled.svg`
  width: 100%;
  height: 156px;
  display: block;

  .base-line {
    fill: none;
    stroke: rgba(30, 36, 32, 0.14);
    stroke-width: 1.5;
  }

  .pulse-line {
    fill: none;
    stroke: #2d6a4f;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 8 28;
    animation: ${pulseFlow} 3.2s linear infinite;
  }
`;

const EndpointStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const EndpointItem = styled.div`
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: 8px;
  padding: 9px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  .ep-left {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.78rem;
    font-weight: 600;
  }

  .ep-icon {
    color: ${({ theme }) => theme.colors.brandPrimary};
    display: inline-flex;
  }

  .ep-tag {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.68rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const PillarsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  .pillar {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .p-title {
    font-size: 0.82rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.01em;
  }

  .p-desc {
    font-size: 0.78rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.45;
  }
`;

const AuthPane = styled.main`
  background: ${({ theme }) => theme.colors.bgSurface};
  border-left: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  padding: 36px 48px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 0;

  @media (max-width: 960px) {
    border-left: none;
    padding: 24px 20px 28px;
  }
`;

const MobileBrandHeader = styled.header`
  display: none;

  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 18px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderSubtle};

    .m-title {
      font-size: 0.94rem;
      font-weight: 700;
      color: ${({ theme }) => theme.colors.textPrimary};
      letter-spacing: -0.02em;
    }

    .m-sub {
      font-size: 0.74rem;
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

const FormCenter = styled.div`
  width: 100%;
  max-width: 380px;
  margin: auto;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const AuthHeading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  h2 {
    font-size: 1.48rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.textPrimary};
    letter-spacing: -0.025em;
    line-height: 1.2;
  }

  p {
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.5;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.84rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .input-box {
    position: relative;
    display: flex;
    align-items: center;
  }

  input {
    width: 100%;
    height: 44px;
    padding: ${({ $hasToggle }) => ($hasToggle ? '0 44px 0 13px' : '0 13px')};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.bgSurface};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.95rem;
    transition: border-color 140ms ease, box-shadow 140ms ease;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.brandPrimary};
      box-shadow: 0 0 0 3px rgba(45, 106, 79, 0.14);
    }

    &:disabled {
      background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
      color: ${({ theme }) => theme.colors.textSecondary};
    }
  }

  .pw-toggle {
    position: absolute;
    right: 4px;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 140ms ease, color 140ms ease;

    &:hover {
      background: ${({ theme }) => theme.colors.bgSurfaceHover};
      color: ${({ theme }) => theme.colors.textPrimary};
    }
  }
`;

const SubmitBtn = styled.button`
  margin-top: 4px;
  height: 44px;
  padding: 0 18px;
  border-radius: 8px;
  border: none;
  background: ${({ theme }) => theme.colors.brandPrimary};
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
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
    cursor: wait;
  }
`;

const ErrorBox = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
  padding: 11px 13px;
  border-radius: 0 8px 8px 0;
  border-left: 3px solid ${({ theme }) => theme.colors.status.CRITICAL};
  background: rgba(200, 30, 30, 0.06);
  color: #991b1b;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.45;

  .err-icon {
    flex-shrink: 0;
    margin-top: 2px;
    display: inline-flex;
  }
`;

const DevHelperBox = styled.div`
  padding: 12px 14px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.bgSurfaceSubtle};
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  display: flex;
  flex-direction: column;
  gap: 8px;

  span {
    font-size: 0.74rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  button {
    align-self: flex-start;
    height: 32px;
    padding: 0 12px;
    border-radius: 6px;
    border: 1px solid ${({ theme }) => theme.colors.borderStrong};
    background: ${({ theme }) => theme.colors.bgSurface};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.colors.bgSurfaceHover};
    }
  }
`;

const AuthFooter = styled.footer`
  width: 100%;
  max-width: 380px;
  margin: 0 auto;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  display: flex;
  flex-direction: column;
  gap: 8px;

  .health-row {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 0.76rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.textSecondary};
  }

  .health-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    display: inline-block;
  }

  .audit-line {
    font-size: 0.74rem;
    color: ${({ theme }) => theme.colors.textMuted};
    line-height: 1.48;
  }
`;

export function LoginScreen({ onAuthenticated, sessionNotice = '' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [apiHealth, setApiHealth] = useState('checking'); // 'checking' | 'ok' | 'down'

  // Preenchimento rápido opcional EXCLUSIVO em modo DEV local via .env.local (zero credenciais no bundle)
  const devQuickEnabled =
    import.meta.env.DEV &&
    import.meta.env.VITE_DEV_QUICK_LOGIN === 'true' &&
    Boolean(import.meta.env.VITE_DEV_LOGIN_EMAIL) &&
    Boolean(import.meta.env.VITE_DEV_LOGIN_PASSWORD);

  useEffect(() => {
    let active = true;
    const ctrl = new AbortController();
    fetch('/api/health', { signal: ctrl.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('HTTP'))))
      .then((data) => {
        if (active) setApiHealth(data?.status === 'ok' ? 'ok' : 'down');
      })
      .catch(() => {
        if (active) setApiHealth('down');
      });
    return () => {
      active = false;
      ctrl.abort();
    };
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Informe seu e-mail e senha para continuar.');
      return;
    }
    setSubmitting(true);
    try {
      await onAuthenticated(trimmedEmail, password);
    } catch (err) {
      setError(err?.message || 'Não foi possível autenticar. Verifique e-mail e senha.');
    } finally {
      setSubmitting(false);
    }
  }

  const healthMeta =
    apiHealth === 'ok'
      ? { color: '#2D6A4F', label: 'Serviço Pulso RMM operacional' }
      : apiHealth === 'down'
        ? { color: '#C81E1E', label: 'Servidor de API indisponível no momento' }
        : { color: '#7B857F', label: 'Verificando disponibilidade da API...' };

  return (
    <PageShell>
      <ShowcasePane aria-label="Visão geral do Pulso RMM">
        <TopBrandRow>
          <div className="brand-left">
            <BrandMark size={28} />
            <span className="brand-name">Pulso RMM</span>
          </div>
          <span className="brand-org">Monitoramento &amp; Gestão de Estações</span>
        </TopBrandRow>

        <EditorialHero>
          <h1>
            Monitoramento de estações em tempo real.{' '}
            <span className="muted">Inventário, telemetria e suporte remoto.</span>
          </h1>

          <TopologyCard role="img" aria-label="Esquema da arquitetura de telemetria entre a central Pulso RMM e estações monitoradas">
            <div className="topo-head">
              <span>Arquitetura de comunicação autenticada</span>
              <span className="topo-proto">HMAC-SHA256 · OTA</span>
            </div>

            <TopologyGrid>
              <HubNode>
                <span className="hub-icon">
                  <IconShieldCheck size={17} />
                </span>
                <div className="hub-title">Central TI</div>
                <div className="hub-sub">API · Socket.io</div>
              </HubNode>

              <ConduitSvg viewBox="0 0 180 156" preserveAspectRatio="none" aria-hidden="true">
                <path className="base-line" d="M 0 78 C 60 78, 70 26, 180 26" />
                <path className="base-line" d="M 0 78 L 180 78" />
                <path className="base-line" d="M 0 78 C 60 78, 70 130, 180 130" />

                <path className="pulse-line" d="M 0 78 C 60 78, 70 26, 180 26" />
                <path className="pulse-line" d="M 0 78 L 180 78" style={{ animationDelay: '0.9s' }} />
                <path className="pulse-line" d="M 0 78 C 60 78, 70 130, 180 130" style={{ animationDelay: '1.8s' }} />
              </ConduitSvg>

              <EndpointStack>
                <EndpointItem>
                  <span className="ep-left">
                    <span className="ep-icon">
                      <IconMonitor size={14} />
                    </span>
                    <span>Recepção</span>
                  </span>
                  <span className="ep-tag">REC</span>
                </EndpointItem>

                <EndpointItem>
                  <span className="ep-left">
                    <span className="ep-icon">
                      <IconMonitor size={14} />
                    </span>
                    <span>Consultórios</span>
                  </span>
                  <span className="ep-tag">CONS</span>
                </EndpointItem>

                <EndpointItem>
                  <span className="ep-left">
                    <span className="ep-icon">
                      <IconMonitor size={14} />
                    </span>
                    <span>Farmácia</span>
                  </span>
                  <span className="ep-tag">FARM</span>
                </EndpointItem>
              </EndpointStack>
            </TopologyGrid>
          </TopologyCard>
        </EditorialHero>

        <PillarsRow>
          <div className="pillar">
            <span className="p-title">Telemetria contínua</span>
            <span className="p-desc">Agente Windows nativo em segundo plano sem interromper o atendimento.</span>
          </div>
          <div className="pillar">
            <span className="p-title">Manutenção homologada</span>
            <span className="p-desc">Catálogo de tarefas assinadas por estação e atualizações SHA-256.</span>
          </div>
          <div className="pillar">
            <span className="p-title">Auditoria e LGPD</span>
            <span className="p-desc">Controle por perfil técnico com registro completo das operações.</span>
          </div>
        </PillarsRow>
      </ShowcasePane>

      <AuthPane aria-label="Autenticação do painel Pulso RMM">
        <MobileBrandHeader>
          <BrandMark size={28} />
          <div>
            <div className="m-title">Pulso RMM</div>
            <div className="m-sub">Monitoramento &amp; Gestão de Estações</div>
          </div>
        </MobileBrandHeader>

        <FormCenter>
          <AuthHeading>
            <h2>Entrar no painel</h2>
            <p>Use sua conta autorizada pela equipe de TI.</p>
          </AuthHeading>

          {(error || sessionNotice) && (
            <ErrorBox role="alert">
              <span className="err-icon">
                <IconAlertTriangle size={16} />
              </span>
              <span>{error || sessionNotice}</span>
            </ErrorBox>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            <Field>
              <label htmlFor="rmm-login-email">E-mail</label>
              <div className="input-box">
                <input
                  id="rmm-login-email"
                  type="email"
                  autoComplete="username"
                  placeholder="nome@dominio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={submitting}
                  required
                />
              </div>
            </Field>

            <Field $hasToggle>
              <label htmlFor="rmm-login-password">Senha</label>
              <div className="input-box">
                <input
                  id="rmm-login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={submitting}
                  required
                />
                <button
                  type="button"
                  className="pw-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                  aria-pressed={showPassword}
                  disabled={submitting}
                >
                  {showPassword ? <IconEyeOff size={17} /> : <IconEye size={17} />}
                </button>
              </div>
            </Field>

            <SubmitBtn type="submit" disabled={submitting}>
              {submitting ? 'Validando credenciais...' : 'Entrar no painel'}
            </SubmitBtn>
          </Form>

          {devQuickEnabled && (
            <DevHelperBox>
              <span>Desenvolvimento local (.env.local)</span>
              <button
                type="button"
                onClick={() => {
                  setEmail(import.meta.env.VITE_DEV_LOGIN_EMAIL);
                  setPassword(import.meta.env.VITE_DEV_LOGIN_PASSWORD);
                }}
              >
                Preencher credencial local configurada
              </button>
            </DevHelperBox>
          )}
        </FormCenter>

        <AuthFooter>
          <div className="health-row">
            <span className="health-dot" style={{ background: healthMeta.color }} />
            <span>{healthMeta.label}</span>
          </div>
          <p className="audit-line">
            Sessões, comandos remotos e alterações de infraestrutura são registrados em trilha de
            auditoria conforme a LGPD.
          </p>
        </AuthFooter>
      </AuthPane>
    </PageShell>
  );
}

export default LoginScreen;
