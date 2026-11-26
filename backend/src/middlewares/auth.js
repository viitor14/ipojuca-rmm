const crypto = require('crypto');
const env = require('../config/env');

function base64UrlEncode(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

function base64UrlDecode(input) {
  let str = input.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

function createJwtToken(payload, expiresInSeconds = 28800) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, iat: now, exp: now + expiresInSeconds };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedBody = base64UrlEncode(JSON.stringify(body));
  const signingInput = `${encodedHeader}.${encodedBody}`;
  const signature = crypto
    .createHmac('sha256', env.jwtSecret)
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
  return `${signingInput}.${signature}`;
}

// Blacklist em memoria de JWTs encerrados no logout ate sua expiracao natural (@security S-07)
const revokedJwtTokens = new Map();
const MAX_REVOKED_TOKENS = 10000;

const revokedCleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [k, expMs] of revokedJwtTokens.entries()) {
    if (now > expMs) revokedJwtTokens.delete(k);
  }
}, 60000);
revokedCleanupTimer.unref();

function hashJwtForRevocation(token) {
  return crypto.createHash('sha256').update(String(token || '')).digest('hex');
}

function revokeJwtToken(token) {
  if (!token || typeof token !== 'string') return false;
  const decoded = verifyJwtToken(token);
  const expMs = decoded && typeof decoded.exp === 'number'
    ? decoded.exp * 1000
    : Date.now() + 28800 * 1000;
  if (revokedJwtTokens.size >= MAX_REVOKED_TOKENS) {
    const oldest = revokedJwtTokens.keys().next().value;
    if (oldest) revokedJwtTokens.delete(oldest);
  }
  revokedJwtTokens.set(hashJwtForRevocation(token), expMs);
  return true;
}

function sanitizeMachine(machine) {
  if (!machine || typeof machine !== 'object') return machine;
  const { agent_token_hash, ...safe } = machine;
  return safe;
}

function verifyJwtToken(token) {
  if (!token || typeof token !== 'string') return null;
  if (revokedJwtTokens.has(hashJwtForRevocation(token))) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [encodedHeader, encodedBody, signature] = parts;

  try {
    const header = JSON.parse(base64UrlDecode(encodedHeader));
    if (!header || header.alg !== 'HS256' || header.typ !== 'JWT') {
      return null;
    }
  } catch {
    return null;
  }

  const signingInput = `${encodedHeader}.${encodedBody}`;
  const expectedSig = crypto
    .createHmac('sha256', env.jwtSecret)
    .update(signingInput)
    .digest('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');

  if (signature.length !== expectedSig.length) return null;
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedBody));
    const now = Math.floor(Date.now() / 1000);
    if (typeof payload.exp !== 'number' || payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}

/**
 * Hash seguro de senha com salt aleatorio individual por usuario (scrypt).
 * Formato: scrypt$<saltHex>$<derivedHex>
 */
function hashPassword(password, explicitSalt = null) {
  const salt = explicitSalt || crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(String(password), salt, 64).toString('hex');
  return `scrypt$${salt}$${derived}`;
}

function isLegacyPasswordHash(storedHash) {
  return Boolean(storedHash && typeof storedHash === 'string' && !storedHash.startsWith('scrypt$'));
}

function verifyPassword(password, storedHash) {
  if (!password || !storedHash || typeof storedHash !== 'string') return false;

  if (storedHash.startsWith('scrypt$')) {
    const parts = storedHash.split('$');
    if (parts.length !== 3 || !parts[1] || !parts[2]) return false;
    const [, salt, expectedHex] = parts;
    const candidateHex = crypto.scryptSync(String(password), salt, 64).toString('hex');
    if (candidateHex.length !== expectedHex.length) return false;
    return crypto.timingSafeEqual(Buffer.from(candidateHex), Buffer.from(expectedHex));
  }

  // Compatibilidade transparente com hashes legados ja persistidos no MySQL da VPS
  const legacyCandidate = crypto
    .scryptSync(String(password), 'ipojuca_rmm_salt_v1', 64)
    .toString('hex');
  if (legacyCandidate.length !== storedHash.length) return false;
  return crypto.timingSafeEqual(Buffer.from(legacyCandidate), Buffer.from(storedHash));
}

function hashAgentToken(rawToken) {
  return crypto.createHash('sha256').update(String(rawToken)).digest('hex');
}

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autenticação ausente ou inválido.' });
  }
  const token = authHeader.slice(7).trim();
  const decoded = verifyJwtToken(token);
  if (!decoded) {
    return res.status(401).json({ error: 'Sessão expirada ou token inválido.' });
  }
  req.user = decoded;
  return next();
}

function requireRole(allowedRoles = []) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Usuário não autenticado.' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: `Acesso negado. Perfil '${req.user.role}' não possui permissão para esta operação.`,
      });
    }
    return next();
  };
}

/**
 * Autenticacao individual obrigatoria para endpoints do Agente Windows (@security).
 * Valida X-Agent-Uuid + X-Agent-Token (SHA-256 timingSafeEqual) e status is_revoked.
 */
function createRequireAgentAuth(repository) {
  return async (req, res, next) => {
    try {
      const agentUuid = String(
        req.headers['x-agent-uuid'] || req.query?.agent_uuid || req.body?.agent_uuid || ''
      ).trim();
      const agentToken = String(
        req.headers['x-agent-token'] || req.body?.agent_token || ''
      ).trim();

      if (!agentUuid || !agentToken) {
        return res
          .status(401)
          .json({ error: 'Identidade ou credencial do agente ausente.' });
      }

      const machine = await repository.findMachineByAgentUuid(agentUuid);
      if (!machine) {
        return res.status(401).json({ error: 'Agente não reconhecido.' });
      }
      if (machine.is_revoked) {
        return res
          .status(403)
          .json({ error: 'Credencial do agente foi revogada pelo @security.' });
      }

      const incomingHash = hashAgentToken(agentToken);
      if (
        !machine.agent_token_hash ||
        incomingHash.length !== machine.agent_token_hash.length ||
        !crypto.timingSafeEqual(
          Buffer.from(incomingHash),
          Buffer.from(machine.agent_token_hash)
        )
      ) {
        await repository.recordAuditLog({
          machineId: machine.id,
          actionType: 'AGENT_AUTH_FAILED',
          ipAddress: req.ip,
          details: { agentUuid, path: req.path },
        });
        return res.status(401).json({ error: 'Token do agente inválido.' });
      }

      req.machine = machine;
      return next();
    } catch (err) {
      return next(err);
    }
  };
}

/**
 * Autenticacao hibrida para download de artefatos do Agente (@security S-04):
 * aceita Operador autenticado (Bearer JWT) OU Agente Windows autenticado (X-Agent-Uuid + X-Agent-Token).
 */
function createRequireOperatorOrAgentAuth(repository) {
  const requireAgentAuth = createRequireAgentAuth(repository);
  return (req, res, next) => {
    if (process.env.ALLOW_PUBLIC_AGENT_DOWNLOAD === '1') {
      return next();
    }
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim();
      const decoded = verifyJwtToken(token);
      if (decoded) {
        req.user = decoded;
        return next();
      }
      return res.status(401).json({ error: 'Sessão expirada ou token inválido.' });
    }
    return requireAgentAuth(req, res, next);
  };
}

/** Wrapper para rotas async no Express 4: evita UnhandledPromiseRejection */
function asyncHandler(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

// Rate limiter em memoria com limpeza periodica e teto de chaves (TM-05)
const rateBuckets = new Map();
const MAX_RATE_BUCKETS = 10000;

const bucketCleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [k, b] of rateBuckets.entries()) {
    if (now > b.resetAt) rateBuckets.delete(k);
  }
}, 60000);
bucketCleanupTimer.unref();

function createRateLimiter({ windowMs = 60000, maxRequests = 120, keyGenerator = null } = {}) {
  return (req, res, next) => {
    const key =
      typeof keyGenerator === 'function'
        ? String(keyGenerator(req) || `${req.ip}:${req.path}`)
        : `${req.ip}:${req.path}`;
    const now = Date.now();
    if (!rateBuckets.has(key) && rateBuckets.size >= MAX_RATE_BUCKETS) {
      for (const [k, b] of rateBuckets.entries()) {
        if (now > b.resetAt) rateBuckets.delete(k);
      }
      if (rateBuckets.size >= MAX_RATE_BUCKETS) {
        const oldestKey = rateBuckets.keys().next().value;
        if (oldestKey) rateBuckets.delete(oldestKey);
      }
    }

    const bucket = rateBuckets.get(key) || { count: 0, resetAt: now + windowMs };
    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }
    bucket.count += 1;
    rateBuckets.set(key, bucket);
    if (bucket.count > maxRequests) {
      return res
        .status(429)
        .json({ error: 'Limite de requisições excedido. Tente novamente em instantes.' });
    }
    return next();
  };
}

module.exports = {
  createJwtToken,
  verifyJwtToken,
  revokeJwtToken,
  sanitizeMachine,
  hashPassword,
  verifyPassword,
  isLegacyPasswordHash,
  hashAgentToken,
  requireAuth,
  requireRole,
  createRequireAgentAuth,
  createRequireOperatorOrAgentAuth,
  asyncHandler,
  createRateLimiter,
};
