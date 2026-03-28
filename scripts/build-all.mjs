import { spawnSync } from 'node:child_process';

const scripts = [
  'build',
  'build:manager',
  'build:rent',
  'build:tracker',
  'build:trader',
  'build:partner',
  'build:tyre',
  'build:smart',
];

for (const script of scripts) {
  const result = spawnSync('npm', ['run', script], {
    stdio: 'inherit',
    env: process.env,
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
