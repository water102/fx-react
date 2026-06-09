import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDir = dirname(fileURLToPath(import.meta.url));
const sourceIndex = readFileSync(join(rootDir, '../src/index.ts'), 'utf8');
const outputPath = join(rootDir, '../dist/src/index.d.ts');

writeFileSync(outputPath, `${sourceIndex.trim()}\n`);
