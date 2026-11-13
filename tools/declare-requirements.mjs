// Refresh only the local Hybrid metadata. Never execute or modify upstream source.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readSkillDir } from '../lib/pack.mjs';
import { verifyHybridSkill, validateHybridManifest } from '../lib/hybrid.mjs';
import { analyzeRequirements } from '../lib/requirements.mjs';

const root = fileURLToPath(new URL('..', import.meta.url));
const updates = [];
for (const area of ['skills','quarantine']) {
  let dirs;
  try { dirs = await readdir(path.join(root,area),{withFileTypes:true}); }
  catch (e) { if(e.code === 'ENOENT') continue; throw e; }
  for (const dir of dirs.filter(d=>d.isDirectory()).sort((a,b)=>a.name.localeCompare(b.name))) {
    const folder = path.join(root,area,dir.name);
    const files = await readSkillDir(folder);
    if (!files.some(f=>f.path === 'manifest.json')) continue;
    await verifyHybridSkill(folder);
    const manifestPath = path.join(folder,'manifest.json');
    const before = await readFile(manifestPath,'utf8');
    const manifest = JSON.parse(before);
    // Replace our generated summaries so removed dependencies do not linger on the next refresh.
    const manual = manifest.requiredCapabilities.filter(c=> !/ \[(?:declared|mention-hint|file-type-hint|reference-hint|installation-command-hint)(?:;[^\]]*)?\]$/.test(c));
    manifest.requiredCapabilities = analyzeRequirements(files,{capabilities:manual}).capabilities;
    validateHybridManifest(manifest);
    const after = JSON.stringify(manifest,null,2)+'\n';
    if (before !== after) updates.push({manifestPath,after});
  }
}
// Validate every source first; no partial writes on an integrity failure.
for (const update of updates) await writeFile(update.manifestPath,update.after);
console.log(`requirements: ${updates.length} local manifests updated`);
