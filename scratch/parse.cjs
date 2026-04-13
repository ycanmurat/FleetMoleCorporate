const fs = require('fs');

const raw = fs.readFileSync('scratch/raw.txt', 'utf8');
const tsFile = 'src/product-sites/productsData.ts';
let tsContent = fs.readFileSync(tsFile, 'utf8');

const productsSpecs = {};
const cleanedRaw = raw.replace(/\r\n/g, '\n').replace(/\n-\n/g, '\n\n');
const productBlocks = cleanedRaw.split(/(?=https?:\/\/www\.jimiiot\.com)/);

for (const block of productBlocks) {
  if (!block.trim()) continue;
  
  const urlMatch = block.match(/^https?:\/\/www\.jimiiot\.com\/en\/products\/[^\/]+\/([a-z0-9-]+)/i);
  if (!urlMatch) continue;
  
  let rawId = urlMatch[1].toLowerCase();
  const linesAfterUrl = block.split('\n').slice(1).join('\n').trim();
  const chunks = linesAfterUrl.split(/\n\n+/);
  
  let currentGroup = 'General';
  const parsedGroups = {};
  
  for (let chunk of chunks) {
    let text = chunk.trim();
    if (!text || text === '-' || text.startsWith('https://')) continue;
    
    if (text === 'Optional Configuration*') {
      currentGroup = 'Optional Configuration';
      continue;
    }
    
    if (text.includes('\n')) {
      const lines = text.split('\n');
      const label = lines[0].trim();
      const value = lines.slice(1).join('\n').trim();
      
      if (!parsedGroups[currentGroup]) parsedGroups[currentGroup] = [];
      parsedGroups[currentGroup].push({ label, value });
    } else {
      currentGroup = text;
    }
  }
  
  productsSpecs[rawId] = parsedGroups;
}

const escapeStr = (str) => {
  if (str.includes('\n')) {
    return '`' + str.replace(/`/g, '\\`').replace(/\$/g, '\\$') + '`';
  }
  return "'" + str.replace(/'/g, "\\'") + "'"; 
}

let modifiedTs = tsContent;
const tsProductIds = [...tsContent.matchAll(/id:\s*'([a-z0-9-]+)'/g)].map(m => m[1]);

function replaceProperty(block, propName, newValue) {
  let propIdx = block.indexOf(`\n    ${propName}: `);
  if (propIdx === -1) propIdx = block.indexOf(`\n    ${propName}:`);
  if (propIdx !== -1) {
    let nextPropIdx = block.substring(propIdx + 1).search(/\n    [a-zA-Z]+:/);
    let endIdx = block.indexOf('\n  }', propIdx);
    let cutPoint = nextPropIdx !== -1 ? propIdx + 1 + nextPropIdx : endIdx;
    return block.substring(0, propIdx) + `\n    ${propName}: ${newValue},` + block.substring(cutPoint);
  } else {
    let insertIdx = block.search(/\n    (?:features|featureCards|downloads|gallery):/);
    if (insertIdx === -1) insertIdx = block.indexOf('\n  }');
    return block.substring(0, insertIdx) + `\n    ${propName}: ${newValue},` + block.substring(insertIdx);
  }
}

let missed = [];

Object.keys(productsSpecs).forEach(rawId => {
  let mappedId = tsProductIds.find(id => rawId === id || rawId.startsWith(id + '-') || id.startsWith(rawId + '-'));
  if (!mappedId) {
    if (rawId === 'jm-ll301-4g-lte-cat-gps-asset-tracker') mappedId = 'll301';
    if (rawId === 'jm-ll02-asset-gps-tracker-device') mappedId = 'll02';
    if (rawId === 'jm-ll01-asset-gnss-tracker') mappedId = 'll01';
    if (rawId === '4g-wireless-gps-tracker') mappedId = 'll705';
    if (rawId === 'll702-wireless-gps-tracker') mappedId = 'll702';
    if (rawId === 'll303pro-solar-powered-gnss-tracker') mappedId = 'll303pro';
    if (rawId === 'vl512-4g-obd-tracker') mappedId = 'vl512';
    if (rawId === 'lg300-asset-gnss-tracker') mappedId = 'lg300';
    if (rawId === 'gt06n-multifunctional-gps-vehicle-tracker') mappedId = 'gt06n';
    if (rawId === 'wetrack140-multifunctional-gps-tracking-device-for-car') mappedId = 'wetrack140';
    if (rawId === 'vl103d-lte-gnss-terminal') mappedId = 'vl103d';
    if (rawId === 'vl111-4g-tracking-terminal') mappedId = 'vl111';
    if (rawId === 'vl501-plug-and-play-tracker') mappedId = 'vl501';
    if (rawId === 'vl802-4g-gps-tracker') mappedId = 'vl802';
    if (rawId === 'wetrack-2-general-gps-vehicle-tracker') mappedId = 'wetrack2';
    if (rawId === 'bl11-4g-gps-bike-tracker-lock') mappedId = 'bl11';
    if (rawId === 'wetrack-lite-vehicle-gps-tracker') mappedId = 'wetrack-lite';
    if (rawId === 'vl502-obd-tracker') mappedId = 'vl502';
    if (rawId === 'vl502a-obd-tracker') mappedId = 'vl502-a';
    if (rawId === 'kl100-positioning-fuel-level-sensor') mappedId = 'kl100';
    if (rawId === 'eg02-intelligent-e-scooter-gps-tracker') mappedId = 'eg02';
    if (rawId === 'at4-portable-asset-gps-tracker') mappedId = 'at4';
    if (rawId === 'at1-asset-gps-tracker') mappedId = 'at1';
    if (rawId === 'bl10-gps-bike-share-lock') mappedId = 'bl10';
  }
  
  if (!mappedId) {
    missed.push(rawId);
    return;
  }
  
  const groups = productsSpecs[rawId];
  if (Object.keys(groups).length === 0) return;
  
  const groupCodeLines = [];
  for (const [gName, items] of Object.entries(groups)) {
    let specLines = items.map(item => `        spec(${escapeStr(item.label)}, ${escapeStr(item.label)}, ${escapeStr(item.value)})`).join(',\n');
    groupCodeLines.push(`      specGroup(${escapeStr(gName)}, ${escapeStr(gName)}, [\n${specLines}\n      ])`);
  }
  const specGroupsValue = `[\n${groupCodeLines.join(',\n')}\n    ]`;
  
  let startIdx = modifiedTs.indexOf(`id: '${mappedId}'`);
  if (startIdx === -1) startIdx = modifiedTs.indexOf(`id: "${mappedId}"`);
  if (startIdx === -1) return;
  
  let blockStart = modifiedTs.lastIndexOf('{', startIdx);
  let blockEndMatch = modifiedTs.substring(startIdx).match(/\n  },?/);
  let blockEnd = startIdx + blockEndMatch.index + blockEndMatch[0].length;
  
  let blockStr = modifiedTs.substring(blockStart, blockEnd);
  blockStr = replaceProperty(blockStr, 'specs', '[]');
  blockStr = replaceProperty(blockStr, 'specGroups', specGroupsValue);
  
  modifiedTs = modifiedTs.substring(0, blockStart) + blockStr + modifiedTs.substring(blockEnd);
});

fs.writeFileSync(tsFile, modifiedTs);
console.log('Missed IDs:', missed);
