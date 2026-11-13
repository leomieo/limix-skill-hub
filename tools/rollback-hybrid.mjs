#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rollbackHybridSkill } from '../lib/hybrid.mjs';
const args = process.argv.slice(2);
const id = args[0];
if (!id || id.startsWith('--')) throw new Error('Usage: node tools/rollback-hybrid.mjs <skill-id> [--root <folder>]');
const root = args.includes('--root') ? path.resolve(args[args.indexOf('--root') + 1]) : fileURLToPath(new URL('..', import.meta.url));
const commit = args.includes('--commit') ? args[args.indexOf('--commit') + 1] : undefined;
console.log(JSON.stringify(await rollbackHybridSkill(root, id, { commit })));
console.log('Rebuild the catalog after reviewing the restored content.');
