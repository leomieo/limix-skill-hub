#!/usr/bin/env node
// Reads inert files only. No provider, script, dependency or tool execution.
import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyHybridSkill } from '../lib/hybrid.mjs';
import { sha256 } from '../lib/pack.mjs';
const root = fileURLToPath(new URL('..', import.meta.url));
const report = { checkedAt: new Date().toISOString(), scope: 'Static integrity and provenance only; no downloaded scripts executed.', results:[], errors:[] };
for (const entry of await readdir(path.join(root,'skills'),{withFileTypes:true})) {
  if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
  const id = entry.name;
  try {
    const dir=path.join(root,'skills',id);
    const {verified,files,manifest}=await verifyHybridSkill(dir);
    const meta=JSON.parse(await readFile(path.join(dir,'_hub.json'),'utf8'));
    const inventory=JSON.parse(await readFile(path.join(dir,'_hub.source.json'),'utf8'));
    if (manifest.name!==id || meta.originalCoreVerified!==verified) throw Error('identity/provenance mismatch');
    for (const file of inventory.files) {
      const cached=path.join(root,'source-cache',id,manifest.source.commit,file.path);
      const bytes=await readFile(cached).catch(error=>{if(error.code==='ENOENT') return null; throw error;});
      if (bytes && sha256(bytes)!==file.sha256) throw Error('immutable cache mismatch');
    }
    report.results.push({id,verified,files,commit:manifest.source.commit,security:manifest.security.status,compatibility:manifest.compatibility.status,skipped:inventory.skipped,license:manifest.source.license??null});
  } catch(error) { report.errors.push({id,error:error.message}); }
}
await mkdir(path.join(root,'migration-reports'),{recursive:true});
await writeFile(path.join(root,'migration-reports','hybrid-verification.json'),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({total:report.results.length+report.errors.length,passed:report.results.length,sourceVerified:report.results.filter(r=>r.verified).length,quarantined:report.results.filter(r=>r.security==='quarantined').length,errors:report.errors}));
if(report.errors.length) process.exitCode=1;
