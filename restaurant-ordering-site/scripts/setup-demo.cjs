const fs = require('node:fs');
const path = require('node:path');
const { randomBytes } = require('node:crypto');

const filename = path.join(__dirname, '..', '.env.local');
let source = fs.existsSync(filename) ? fs.readFileSync(filename, 'utf8') : '';
for (const name of ['RESTROVA_DEMO_SESSION_SECRET', 'RESTROVA_SHEETS_SHARED_SECRET']) {
  if (!new RegExp(`^\\s*${name}\\s*=`, 'm').test(source)) {
    source += `\n${name}=${randomBytes(32).toString('hex')}\n`;
    console.log(`Created ${name} in .env.local (value hidden).`);
  }
}
if (!/^\s*GOOGLE_SHEETS_URL\s*=/m.test(source)) {
  source += '\n# Set this to the deployed Apps Script /exec URL.\nGOOGLE_SHEETS_URL=\n';
}
fs.writeFileSync(filename, source, { mode: 0o600 });
console.log('Session configuration saved. Complete the Google Sheets setup in docs/demo-setup.md, then restart the dev server.');
