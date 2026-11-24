import React, { useState } from 'react';
import styled from 'styled-components';

const Page = styled.main`
  min-height: 100vh;
  width: 100vw;
  background: radial-gradient(circle at 22% 18%, #f8faf8 0%, #f4f5f2 55%, #e6ebe5 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: ${({ theme }) => theme.fonts.sans};
`;

const Card = styled.section`
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border: 1px solid #e4e8e3;
  border-radius: 12px;
  box-shadow: 0 18px 48px rgba(36, 41, 37, 0.08);
  padding: 28px 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const BrandBlock = styled.header`
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-bottom: 1px solid #ecefeb;
  padding-bottom: 14px;

  .kicker {
    font-family: ${({ theme }) => theme.fonts.mono};
    font-size: 0.66rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    color: #52796b;
    text-transform: uppercase;
  }

  h1 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #242925;
    letter-spacing: -0.02em;
    margin: 0;
  }

  p {
    font-size: 0.78rem;
    color: #737b75;
    margin: 0;
    line-height: 1.4;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 0.72rem;
    font-weight: 700;
    color: #3f4741;
  }

  input {
    width: 100%;
    padding: 10px 12px;
    border-radius: 7px;
    border: 1px solid #cbd3cb;
    background: #ffffff;
    color: #242925;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-size: 0.84rem;
    outline: none;
    transition: border-color 0.15s ease, box-shadow 0.15s ease;

    &:focus {
      border-color: #52796b;
      box-shadow: 0 0 0 3px rgba(82, 121, 107, 0.14);
    }
  }
`;

const SubmitBtn = styled.button`
  margin-top: 4px;
  padding: 11px 14px;
  border-radius: 7px;
  border: 1px solid #416457;
  background: #52796b;
  color: #ffffff;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.15s ease, opacity 0.15s ease;

  &:hover:not(:disabled) {
    background: #416457;
  }

  &:disabled {
    opacity: 0.6;
    cursor: wait;
  }
`;

const ErrorBox = styled.div`
  padding: 10px 12px;
  border-radius: 7px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
  font-size: 0.76rem;
  font-weight: 600;
  line-height: 1.35;
`;

const DevHelperBox = styled.div`
  padding: 10px 12px;
  border-radius: 7px;
  background: #f8faf8;
  border: 1px dashed #cbd3cb;
  display: flex;
  flex-direction: column;
  gap: 6px;

  span {
    font-size: 0.68rem;
    font-weight: 700;
    color: #52796b;
  }

  button {
    align-self: flex-start;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid #cbd3cb;
    background: #ffffff;
    color: #242925;
    font-size: 0.7rem;
    font-weight: 600;
    cursor: pointer;

    &:hover {
      background: #ecefeb;
    }
  }
`;

const FooterNote = styled.footer`
  font-size: 0.68rem;
  color: #737b75;
  text-align: center;
  border-top: 1px solid #ecefeb;
  padding-top: 12px;
  line-height: 1.4;
`;

export function LoginScreen({ onAuthenticated, sessionNotice = '' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Preenchimento rápido opcional EXCLUSIVO em modo DEV local via .env.local (zero credenciais no código/bundle)
  const devQuickEnabled =
    import.meta.env.DEV &&
    import.meta.env.VITE_DEV_QUICK_LOGIN === 'true' &&
    Boolean(import.meta.env.VITE_DEV_LOGIN_EMAIL) &&
    Boolean(import.meta.env.VITE_DEV_LOGIN_PASSWORD);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Informe seu e-mail institucional e senha.');
      return;
    }
    setSubmitting(true);
    try {
      await onAuthenticated(trimmedEmail, password);
    } catch (err) {
      setError(err?.message || 'Não foi possível autenticar. Verifique suas credenciais.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Page>
      <Card aria-label="Autenticação do Painel RMM Ipojuca">
        <BrandBlock>
          <span className="kicker">PREFEITURA DO IPOJUCA // SECRETARIA DE SAÚDE</span>
          <h1>RMM Saúde Ipojuca</h1>
          <p>
            Acesso restrito à equipe técnica autorizada para monitoramento, Gêmeo Digital e
            manutenção remota controlada.
          </p>
        </BrandBlock>

        {(error || sessionNotice) && (
          <ErrorBox role="alert">{error || sessionNotice}</ErrorBox>
        )}

        <Form onSubmit={handleSubmit}>
          <Field>
            <label htmlFor="rmm-login-email">E-mail institucional</label>
            <input
              id="rmm-login-email"
              type="email"
              autoComplete="username"
              placeholder="operador@ipojuca.pe.gov.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
              required
            />
          </Field>

          <Field>
            <label htmlFor="rmm-login-password">Senha</label>
            <input
              id="rmm-login-password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={submitting}
              required
            />
          </Field>

          <SubmitBtn type="submit" disabled={submitting}>
            {submitting ? 'Validando credenciais...' : 'Entrar no Painel'}
          </SubmitBtn>
        </Form>

        {devQuickEnabled && (
          <DevHelperBox>
            <span>MODO DESENVOLVIMENTO LOCAL (.env.local)</span>
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

        <FooterNote>
          Todas as sessões, comandos remotos e alterações de infraestrutura são registrados em
          trilha de auditoria conforme a LGPD.
        </FooterNote>
      </Card>
    </Page>
  );
}

export default LoginScreen;
