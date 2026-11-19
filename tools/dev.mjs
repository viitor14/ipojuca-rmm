// Sobe backend e frontend juntos em desenvolvimento, sem dependencias extras.
// Uso: npm run dev  (na raiz do repositorio)
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const targets = [
  { name: 'backend', cwd: path.join(root, 'backend'), args: ['run', 'dev'], color: '\u001b[36m' },
  { name: 'frontend', cwd: path.join(root, 'frontend'), args: ['run', 'dev'], color: '\u001b[35m' },
];

const children = [];
let shuttingDown = false;

function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of children) {
    if (child.exitCode === null) {
      child.kill('SIGTERM');
    }
  }
  setTimeout(() => process.exit(code), 400);
}

for (const target of targets) {
  const child = spawn(`${npm} ${target.args.join(' ')}`, {
    cwd: target.cwd,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, FORCE_COLOR: '1' },
  });
  children.push(child);

  const prefix = `${target.color}[${target.name}]\u001b[0m `;
  const pipe = (stream, out) => {
    stream.setEncoding('utf8');
    let buffer = '';
    stream.on('data', (chunk) => {
      buffer += chunk;
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      for (const line of lines) out.write(prefix + line + '\n');
    });
  };
  pipe(child.stdout, process.stdout);
  pipe(child.stderr, process.stderr);

  child.on('exit', (code) => {
    if (!shuttingDown) {
      process.stderr.write(`${prefix}saiu com codigo ${code}\n`);
      shutdown(code ?? 1);
    }
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));

process.stdout.write('\u001b[32m[dev]\u001b[0m backend em http://localhost:4000 | frontend em http://localhost:5173\n');
