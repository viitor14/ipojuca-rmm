/**
 * Adaptador de compatibilidade para Express e CORS.
 * - Em produção / Docker (com node_modules instalado), utiliza os pacotes oficiais 'express' e 'cors'.
 * - Em ambientes locais / CI antes de 'npm install', provê compatibilidade nativa sobre 'node:http'
 *   com a mesma API de roteamento, middlewares, req.params, req.query e res.status().json().
 */
function loadExpressAndCors() {
  try {
    if (process.env.FORCE_NATIVE_ROUTER === '1') {
      throw new Error('Forçando roteador in-memory para suíte de testes sem socket TCP');
    }
    const express = require('express');
    const cors = require('cors');
    return { express, cors, isNativeFallback: false };
  } catch {
    function matchPath(pattern, actualPath) {
      const patternParts = pattern.split('/').filter(Boolean);
      const actualParts = actualPath.split('/').filter(Boolean);
      if (patternParts.length !== actualParts.length) return null;
      const params = {};
      for (let i = 0; i < patternParts.length; i += 1) {
        if (patternParts[i].startsWith(':')) {
          params[patternParts[i].slice(1)] = decodeURIComponent(actualParts[i]);
        } else if (patternParts[i] !== actualParts[i]) {
          return null;
        }
      }
      return params;
    }

    function createRouter() {
      const routes = [];
      const router = {
        _routes: routes,
        get(path, ...handlers) {
          routes.push({ method: 'GET', path, handlers });
        },
        post(path, ...handlers) {
          routes.push({ method: 'POST', path, handlers });
        },
        delete(path, ...handlers) {
          routes.push({ method: 'DELETE', path, handlers });
        },
      };
      return router;
    }

    function createApp() {
      const middlewares = [];
      const mountedRouters = [];
      let notFoundHandler = (req, res) =>
        res.status(404).json({ error: 'Not Found' });

      const app = async (req, res) => {
        const parsedUrl = new URL(req.url, 'http://localhost');
        req.path = parsedUrl.pathname;
        req.query = Object.fromEntries(parsedUrl.searchParams.entries());
        req.ip = req.socket?.remoteAddress || '127.0.0.1';
        req.headers = req.headers || {};

        res.statusCode = 200;
        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (obj) => {
          if (!res.headersSent) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
          }
          res.end(JSON.stringify(obj));
          return res;
        };

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          return res.end();
        }

        // Parse JSON body (suporta stream HTTP ou req.body pre-injetado em testes in-memory)
        if (req.body === undefined) {
          if (['POST', 'PUT', 'PATCH'].includes(req.method) && req[Symbol.asyncIterator]) {
            const chunks = [];
            for await (const chunk of req) chunks.push(chunk);
            const raw = Buffer.concat(chunks).toString('utf8');
            try {
              req.body = raw ? JSON.parse(raw) : {};
            } catch {
              req.body = {};
            }
          } else {
            req.body = {};
          }
        }

        const chain = [...middlewares];

        let matchedRoute = null;
        for (const mounted of mountedRouters) {
          if (req.path.startsWith(mounted.prefix)) {
            const subPath = req.path.slice(mounted.prefix.length) || '/';
            for (const r of mounted.router._routes) {
              if (r.method === req.method) {
                const params = matchPath(r.path, subPath);
                if (params) {
                  req.params = params;
                  matchedRoute = r;
                  break;
                }
              }
            }
          }
          if (matchedRoute) break;
        }

        if (matchedRoute) {
          chain.push(...matchedRoute.handlers);
        } else {
          chain.push(notFoundHandler);
        }

        let idx = 0;
        async function next() {
          const fn = chain[idx++];
          if (!fn || res.writableEnded) return;
          await fn(req, res, next);
        }
        await next();
      };

      app.use = (arg1, arg2) => {
        if (typeof arg1 === 'string' && arg2 && arg2._routes) {
          mountedRouters.push({ prefix: arg1, router: arg2 });
        } else if (typeof arg1 === 'function') {
          if (arg1.length === 2 && middlewares.length > 0 && mountedRouters.length > 0) {
            notFoundHandler = arg1;
          } else {
            middlewares.push(arg1);
          }
        }
      };

      return app;
    }

    createApp.Router = createRouter;
    createApp.json = () => (req, res, next) => next();

    const cors = () => (req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type,Authorization,X-Agent-Uuid,X-Agent-Token'
      );
      next();
    };

    return { express: createApp, cors, isNativeFallback: true };
  }
}

module.exports = { loadExpressAndCors };
