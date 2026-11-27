// Archipelago Atlas hand-in program.
// The grader runs this file with Node 22. It copies the static site and the
// screenshots into the output directory, then asks the vendored make.fun
// library to write the dossier the judge reads.

import { chmodSync, cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const root = fileURLToPath(new URL('.', import.meta.url));
const output = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const appSource = join(root, 'app');
const shotsSource = join(root, 'screenshots');

mkdirSync(output, { recursive: true });
cpSync(appSource, join(output, 'app'), { recursive: true });
mkdirSync(join(output, 'screenshots'), { recursive: true });
if (existsSync(shotsSource)) {
  cpSync(shotsSource, join(output, 'screenshots'), { recursive: true });
}

const dossierPath = join(output, 'dossier.json');
writeFileSync(
  dossierPath,
  buildDossier(output, {
    text_max_bytes: 163840,
    screenshots: { max: 4, max_bytes: 262144 },
    app_max_files: 993,
    app_max_bytes: 16777216,
  }),
);
chmodSync(dossierPath, 0o644);
