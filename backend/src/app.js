const { loadExpressAndCors } = require('./utils/frameworkCompat');
const { express, cors } = loadExpressAndCors();
const env = require('./config/env');
const apiRouter = require('./routes/api');

const app = express();

if (env.trustProxy && typeof app.set === 'function') {
  app.set('trust proxy', 1);
}

// Cabeçalhos de segurança HTTP (OWASP ASVS - @security)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

app.use(
  cors({
    origin: env.corsOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Agent-Uuid',
      'X-Agent-Token',
      'X-Enrollment-Key',
      'X-Agent-Version',
      'X-Agent-Idle-Seconds',
    ],
  })
);

// Limite de payload JSON para evitar abuso de memória (TM-05)
app.use(express.json({ limit: '100kb' }));

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada na API RMM Ipojuca.' });
});

// Tratamento centralizado de erros (Express 4 + asyncHandler)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = Number(err?.statusCode || err?.status || 500);
  if (status >= 500 && env.nodeEnv !== 'test') {
    console.error(`[RMM-Backend] Erro ${status} em ${req.method} ${req.path}:`, err?.message || err);
  }
  const message =
    status < 500 && err?.message
      ? err.message
      : 'Erro interno ao processar a requisição.';
  if (!res.headersSent) {
    res.status(status).json({ error: message });
  }
});

module.exports = app;
