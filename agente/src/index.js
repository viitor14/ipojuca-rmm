/**
 * Ponto de compatibilidade com a estrutura inicial (agente/src/index.js -> agent/src/index.js)
 */
module.exports = require('../../agent/src/index.js');
if (require.main === module) {
  require('../../agent/src/index.js');
}

