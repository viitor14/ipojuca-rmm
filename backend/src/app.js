const { loadExpressAndCors } = require('./utils/frameworkCompat');
const { express, cors } = loadExpressAndCors();
const env = require('./config/env');
const apiRouter = require('./routes/api');

const app = express();

// Cabeçalhos de segurança HTTP (OWASP ASVS - @security)
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
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
    ],
  })
);

// Limite de payload JSON para evitar abuso de memória (TM-05)
app.use(express.json({ limit: '100kb' }));

app.use('/api', apiRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada na API RMM Ipojuca.' });
});

module.exports = app;
