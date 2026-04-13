const fs = require('fs');

const tsFile = 'src/product-sites/productsData.ts';
let content = fs.readFileSync(tsFile, 'utf8');

// Fix 1: JC400 - Camera specGroup. The "CE01:..." line became a separate specGroup.
//   Merge it into the Camera group by adding the CI03, CE01 lines to Peripheral Camera value and moving Video Format into Camera group.
content = content.replace(
  /specGroup\('Camera', 'Camera', \[\n\s*spec\('Front Camera \(Main\)', 'Front Camera \(Main\)', '1920×1080\/25FPS\/F2\.2\/Full color\/118° \(HFoV\)'\),\n\s*spec\('Peripheral Camera \(Optional \)', 'Peripheral Camera \(Optional \)', 'CI01: 1280×720\/15FPS\/F2\.0\/Full color in daytime & monochrome in dim light\/100° \(HFoV\)'\)\n\s*\]\),\n\s*specGroup\('CE01: 1280×720\/15FPS\/F2\.0\/Full color\/IP67\/125° \(HFoV\)', 'CE01: 1280×720\/15FPS\/F2\.0\/Full color\/IP67\/125° \(HFoV\)', \[\n\s*spec\('Video Format', 'Video Format', '\.mp4'\)\n\s*\]\)/,
  `specGroup('Camera', 'Camera', [
        spec('Front Camera (Main)', 'Front Camera (Main)', '1920×1080/25FPS/F2.2/Full color/118° (HFoV)'),
        spec('Peripheral Camera (Optional)', 'Peripheral Camera (Optional)', \`CI01: 1280×720/15FPS/F2.0/Full color in daytime & monochrome in dim light/100° (HFoV)
CI03: 1280×720/15FPS/F2.4/Full color in daytime & monochrome in dim light/119° (HFoV)
CE01: 1280×720/15FPS/F2.0/Full color/IP67/125° (HFoV)\`),
        spec('Video Format', 'Video Format', '.mp4')
      ])`
);

// Fix 2: JC261 - Camera specGroup. The "JC170:..." line became a separate specGroup.
content = content.replace(
  /specGroup\('Camera', 'Camera', \[\n\s*spec\('Front Camera \(Main\)', 'Front Camera \(Main\)', '1920×1080\/25FPS\/F2\.2\/Full color\/85° \(HFoV\)'\),\n\s*spec\('Peripheral Camera \(Optional\)', 'Peripheral Camera \(Optional\)', 'CI01: 1280×720\/15FPS\/F2\.0\/Full color in daytime & monochrome in dim light\/100° \(HFoV\)'\)\n\s*\]\),\n\s*specGroup\('JC170: 1280×720\/15FPS\/F2\.4\/Monochrome\/56° \(HFoV\)', 'JC170: 1280×720\/15FPS\/F2\.4\/Monochrome\/56° \(HFoV\)', \[\n\s*spec\('Video Format', 'Video Format', '\.ts'\)\n\s*\]\)/,
  `specGroup('Camera', 'Camera', [
        spec('Front Camera (Main)', 'Front Camera (Main)', '1920×1080/25FPS/F2.2/Full color/85° (HFoV)'),
        spec('Peripheral Camera (Optional)', 'Peripheral Camera (Optional)', \`CI01: 1280×720/15FPS/F2.0/Full color in daytime & monochrome in dim light/100° (HFoV)
CI03: 1280×720/15FPS/F2.4/Full color in daytime & monochrome in dim light/119° (HFoV)
CE01: 1280×720/15FPS/F2.0/Full color/IP67/125° (HFoV)
JC170: 1280×720/15FPS/F2.4/Monochrome/56° (HFoV)\`),
        spec('Video Format', 'Video Format', '.ts')
      ])`
);

// Fix 3: JC450 - "Seatbelt Detection (Required with JC171)" became a specGroup.
//   Merge those items into the Feature group.
content = content.replace(
  /specGroup\('Feature', 'Feature', \[\n\s*spec\('ADAS', 'ADAS', 'FCW, HMW, LDW'\),\n\s*spec\('DMS \(Optional\)', 'DMS \(Optional\)', 'Phone use, Smoking, Distraction, Yawning, Eyes closed, No face detected'\)\n\s*\]\),\n\s*specGroup\('Seatbelt Detection \(Required with JC171\)', 'Seatbelt Detection \(Required with JC171\)', \[\n\s*spec\('Configuration support', 'Configuration support', 'GPRS, SMS, Memory card, APP'\),\n\s*spec\('Firmware update', 'Firmware update', 'USB cable, Memory card, OTA'\),\n\s*spec\('Certification', 'Certification', 'CE, FCC, PTCRB, RoHS, AT&T'\)\n\s*\]\)/,
  `specGroup('Feature', 'Feature', [
        spec('ADAS', 'ADAS', 'FCW, HMW, LDW'),
        spec('DMS (Optional)', 'DMS (Optional)', 'Phone use, Smoking, Distraction, Yawning, Eyes closed, No face detected'),
        spec('Facial Recognition System', 'Facial Recognition System', 'Required with JC171'),
        spec('Seatbelt Detection', 'Seatbelt Detection', 'Required with JC171'),
        spec('Configuration support', 'Configuration support', 'GPRS, SMS, Memory card, APP'),
        spec('Firmware update', 'Firmware update', 'USB cable, Memory card, OTA'),
        spec('Certification', 'Certification', 'CE, FCC, PTCRB, RoHS, AT&T')
      ])`
);

// Fix 4: Remove all trailing \u2028 characters and dash artifacts from spec values
// Pattern: `CE/FCC/RoHS\n\u2028\u2028-`) => `CE/FCC/RoHS`)
content = content.replace(/`([^`]*)\n\u2028+-`\)/g, (match, inner) => {
  return `'${inner.replace(/'/g, "\\'")}')`
});
content = content.replace(/`([^`]*)\n\u2028-`\)/g, (match, inner) => {
  return `'${inner.replace(/'/g, "\\'")}')`
});

// Fix 5: Add VL02 (jm-vl02) specs
const vl02OldSpecs = `specs: [{ label: { tr: 'Frekans', en: 'Frequency' }, value: { tr: 'Çoklu Bant', en: 'Multi-band' } }]`;
const vl02NewSpecs = `specs: [],
    specGroups: [
      specGroup('Positioning & Location', 'Positioning & Location', [
        spec('Technology', 'Technology', 'GPS, BDS, LBS, GLONASS'),
        spec('Accuracy', 'Accuracy', '＜2.5m CEP'),
        spec('Tracking sensitivity', 'Tracking sensitivity', '–165dBm'),
        spec('Acquisition sensitivity', 'Acquisition sensitivity', '–148dBm'),
        spec('TTFF (open sky)', 'TTFF (open sky)', \`Avg. hot start ≤1s
Avg. cold start ≤32s\`)
      ]),
      specGroup('Cellular', 'Cellular', [
        spec('Technology', 'Technology', 'LTE Cat M1 & NB2, GSM'),
        spec('Frequency', 'Frequency', \`JM-VL02A:
LTE: B1/B2/B3/B4/B5/B12/B13/B28/B66
GSM: 850/900/1800/1900 MHz
JM-VL02E:
LTE: B1/B3/B5/B8/B18/B19/B20/B26
GSM: 850/900/1800/1900 MHz\`)
      ]),
      specGroup('Power', 'Power', [
        spec('Battery', 'Battery', '300mAh/3.7V industrial-grade Li-Polymer battery'),
        spec('Input voltage', 'Input voltage', '9-36VDC'),
        spec('Power consumption', 'Power consumption', \`Standby: 5mA
Working: 58mA\`)
      ]),
      specGroup('Operating Environment', 'Operating Environment', [
        spec('Operating temperature', 'Operating temperature', '–20℃ to +70℃'),
        spec('Operating humidity', 'Operating humidity', '5% to 95%, non-condensing'),
        spec('IP rating', 'IP rating', 'IP65')
      ]),
      specGroup('Physical Specification', 'Physical Specification', [
        spec('Dimensions', 'Dimensions', '105 x 57.0 x 22mm'),
        spec('Weight', 'Weight', '103g')
      ]),
      specGroup('Interface', 'Interface', [
        spec('LED indication', 'LED indication', 'GNSS (Blue), Cellular (Green), Power (Red)'),
        spec('SIM', 'SIM', 'Standard-SIM'),
        spec('Digital I/Os', 'Digital I/Os', '1*ACC, 1*SOS, 1*Relay, 1*Reserved output, 1*Reserved input'),
        spec('Analog I/Os', 'Analog I/Os', '1: 0–30VDC (±0.3V)'),
        spec('Memory capacity', 'Memory capacity', '1000 GPS data entries'),
        spec('USB', 'USB', 'N/A'),
        spec('GNSS antenna', 'GNSS antenna', 'Internal'),
        spec('Bluetooth antenna', 'Bluetooth antenna', 'N/A'),
        spec('Serial ports', 'Serial ports', 'TTL')
      ]),
      specGroup('Feature', 'Feature', [
        spec('Sensors', 'Sensors', 'Accelerometer'),
        spec('Scenarios', 'Scenarios', 'Vehicle movement alert, Over-speed alert, Geo-fence, Vehicle battery detection, Power supply disconnection'),
        spec('Driving behavior analysis (DBA)', 'Driving behavior analysis (DBA)', 'Harsh acceleration, Harsh braking, Harsh cornering, Collision'),
        spec('Bluetooth', 'Bluetooth', 'N/A'),
        spec('Configuration support', 'Configuration support', 'PC Tools, SMS, GPRS'),
        spec('Certification', 'Certification', 'CE, FCC, PTCRB, AT&T, T-Mobile, Verizon, TELEC')
      ]),
      specGroup('Optional Configuration', 'Optional Configuration', [
        spec('RS232 sensor', 'RS232 sensor', 'Capacitive fuel level sensor, Ultrasonic fuel level sensor, Temperature sensor')
      ])
    ]`;
content = content.replace(vl02OldSpecs, vl02NewSpecs);

// Fix 6: Fix VL101G - weird quote character in serial ports spec: '1'TTL'
content = content.replace("'1\u2019TTL'", "'1*TTL'");

// Fix 7: Clean up any remaining stray \u2028 line separator characters
content = content.replace(/\u2028/g, '');

fs.writeFileSync(tsFile, content);

// Verify
const result = fs.readFileSync(tsFile, 'utf8');
const badGroups = result.match(/specGroup\('(CE01|JC170|Seatbelt)/g);
const badChars = (result.match(/\u2028/g) || []).length;
const hasVl02Specs = result.includes("id: 'jm-vl02'") && result.includes("specGroups: [") && result.includes("'PC Tools, SMS, GPRS'");

console.log('Bad specGroup names remaining:', badGroups ? badGroups.length : 0);
console.log('Bad \\u2028 chars remaining:', badChars);
console.log('VL02 specs added:', hasVl02Specs);
console.log('Done!');
