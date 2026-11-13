#!/usr/bin/env node
// Preserve legacy commentary and point old README links at canonical English names.
import { readFile, readdir, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { verifyHybridSkill } from '../lib/hybrid.mjs';
const root=fileURLToPath(new URL('..',import.meta.url));
const readJson=async p=>JSON.parse(await readFile(p,'utf8'));
let readme=await readFile(path.join(root,'README.md'),'utf8');
for(const entry of await readdir(path.join(root,'skills'),{withFileTypes:true})) {
  if(!entry.isDirectory()||entry.name.startsWith('.')) continue;
  const dir=path.join(root,'skills',entry.name);
  const {manifest}=await verifyHybridSkill(dir);
  const meta=await readJson(path.join(dir,'_hub.json'));
  const inventory=await readJson(path.join(dir,'_hub.source.json'));
  const originalId=meta.legacyId??entry.name;
  if(originalId!==entry.name) {
    readme=readme.replaceAll(`(skills/${originalId}/`,`(skills/${entry.name}/`);
    if(manifest.vietnamese&&!manifest.vietnamese.aliases.includes(originalId)) {
      manifest.vietnamese.aliases=[...manifest.vietnamese.aliases,originalId].slice(0,24);
      await writeFile(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
    }
  }
  const analysis=await readFile(path.join(root,'migration-backups','2026-11-13',originalId,'PHAN-TICH.md'),'utf8').catch(()=>null);
  if(analysis&&!inventory.files.some(f=>f.path==='references/analysis.vi.md')) {
    const guideFile=path.join(dir,'references','guide.vi.md');
    const guide=await readFile(guideFile,'utf8');
    if(inventory.files.length>=198) {
      const marker='\n## Phân tích đã lưu (nhận xét cũ)\n';
      if(!guide.includes(marker)) await writeFile(guideFile,guide.replace(/\nPhân tích đã lưu: \[analysis.vi.md\][^\n]*\n/g,'')+marker+'\nNhận xét tham khảo, số liệu có thể cũ.\n\n'+analysis);
      await rm(path.join(dir,'references','analysis.vi.md'),{force:true});
    } else {
      await writeFile(path.join(dir,'references','analysis.vi.md'),'<!-- Legacy curator commentary; not execution instructions. Facts may be stale. -->\n\n'+analysis);
      if(!guide.includes('(analysis.vi.md)')) await writeFile(guideFile,guide+'\nPhân tích đã lưu: [analysis.vi.md](analysis.vi.md) — nhận xét tham khảo, số liệu có thể cũ.\n');
    }
  }
  // Legacy metadata's license label alone is not source license evidence.
  const hasLicense=inventory.files.some(f=>/(^|\/)(?:LICENSE|COPYING|NOTICE)(?:\.[\w.-]+)?$/i.test(f.path));
  if(!hasLicense) {
    const finding='No standalone upstream license evidence retained; verify redistribution terms before activation.';
    if(!manifest.security.findings.includes(finding)) manifest.security.findings.push(finding);
    manifest.security.status='quarantined';
    await writeFile(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  }
  if(inventory.skipped?.length) {
    manifest.security.status='quarantined';
    const finding='Incomplete upstream bundle: inspect excluded files before approving compatibility or activation.';
    if(!manifest.security.findings.includes(finding)) manifest.security.findings.push(finding);
    await writeFile(path.join(dir,'manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  }
}
await writeFile(path.join(root,'README.md'),readme);
console.log('Legacy analysis retained; README aliases updated; license evidence checked.');
