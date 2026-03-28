const routes = [
  'http://localhost:5173/tr',
  'http://localhost:5173/en/contact',
  'http://localhost:4101/tr',
  'http://localhost:4101/en/contact',
  'http://localhost:4102/tr',
  'http://localhost:4102/en/contact',
  'http://localhost:4103/tr',
  'http://localhost:4103/en/contact',
  'http://localhost:4104/tr',
  'http://localhost:4104/en/contact',
  'http://localhost:4105/tr',
  'http://localhost:4105/en/contact',
  'http://localhost:4106/tr',
  'http://localhost:4106/en/contact',
  'http://localhost:4107/tr',
  'http://localhost:4107/en/contact',
];

const failures = [];

for (const url of routes) {
  try {
    const response = await fetch(url);
    const html = await response.text();

    if (!response.ok) {
      failures.push(`${url} -> HTTP ${response.status}`);
      continue;
    }

    if (!html.includes('<div id="root"></div>')) {
      failures.push(`${url} -> unexpected HTML payload`);
      continue;
    }

    console.log(`OK  ${url}`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    failures.push(`${url} -> ${message}`);
  }
}

if (failures.length) {
  console.error('\nSmoke check failed:\n');
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log('\nAll local routes responded as expected.');
