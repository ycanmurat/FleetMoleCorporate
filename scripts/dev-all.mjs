import { spawn } from 'node:child_process';

const tasks = [
  ['corporate', 'dev:corporate'],
  ['manager', 'dev:manager'],
  ['rent', 'dev:rent'],
  ['tracker', 'dev:tracker'],
  ['trader', 'dev:trader'],
  ['partner', 'dev:partner'],
  ['tyre', 'dev:tyre'],
  ['smart', 'dev:smart'],
];

const children = [];
let hasExited = false;

const shutdown = (code = 0) => {
  if (hasExited) {
    return;
  }

  hasExited = true;

  for (const child of children) {
    child.kill('SIGTERM');
  }

  setTimeout(() => {
    for (const child of children) {
      child.kill('SIGKILL');
    }

    process.exit(code);
  }, 250);
};

for (const [, script] of tasks) {
  const child = spawn('npm', ['run', script], {
    stdio: 'inherit',
    env: process.env,
  });

  children.push(child);

  child.on('exit', (code) => {
    if (hasExited) {
      return;
    }

    shutdown(code ?? 0);
  });
}

process.on('SIGINT', () => shutdown(0));
process.on('SIGTERM', () => shutdown(0));
