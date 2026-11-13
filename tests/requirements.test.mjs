import test from 'node:test';
import assert from 'node:assert/strict';
import {analyzeRequirements} from '../lib/requirements.mjs';
const f=(path,text)=>({path,text});

test('declared dependency scopes and versions remain separate; no commands or secrets copied',()=>{
  const r=analyzeRequirements([f('package.json',JSON.stringify({dependencies:{react:'^19'},devDependencies:{playwright:'1.58'},optionalDependencies:{sharp:'*'},engines:{node:'>=20'},scripts:{postinstall:'dangerous command'},token:'secret'}))]);
  assert.ok(r.detected.some(x=>x.name==='react' && x.version==='^19' && x.scope==='dependencies'));
  assert.ok(r.detected.some(x=>x.name==='playwright' && x.scope==='devDependencies'));
  assert.ok(r.detected.some(x=>x.name==='node' && x.scope==='engines'));
  assert.doesNotMatch(JSON.stringify(r),/dangerous command|secret/);
  assert.equal(r.autoInstall,false);
  assert.equal(r.environmentStatus,'not-tested');
});
test('imports, file types and mentions are hints with evidence; Python import names are unresolved',()=>{
  const r=analyzeRequirements([f('run.mjs',"import fs from 'node:fs';\nimport x from '@scope/pkg/sub';\nimport y from './local.js';"),f('run.py','import PIL\n'),f('SKILL.md','Docker is optional here.')]);
  assert.ok(r.detected.some(x=>x.name==='@scope/pkg' && x.status==='import-hint' && x.evidence[0].line===2));
  assert.ok(r.detected.some(x=>x.name==='PIL' && x.distributionName==='unresolved'));
  assert.ok(r.detected.some(x=>x.name==='python' && x.status==='file-type-hint'));
  assert.ok(!r.detected.some(x=>x.name==='fs' || x.name.includes('local')));
  assert.ok(r.detected.some(x=>x.name==='docker' && x.status==='mention-hint'));
});
test('pip requirements, invalid manifests, translations and missing files keep uncertainty',()=>{
  const files=[f('requirements.txt','Pillow>=10\n-r other.txt\n'),f('package.json','invalid'),f('references/guide.vi.md','docker'),f('manifest.json','{"requiredCapabilities":["ffmpeg"]}')];
  const r=analyzeRequirements(files,{inventory:{skipped:[{path:'render.mjs',reason:'size'}]}});
  assert.ok(r.detected.some(x=>x.name==='Pillow' && x.version==='>=10'));
  assert.equal(r.diagnostics.length,2);
  assert.equal(r.packageCompleteness,'incomplete');
  assert.equal(r.detected.some(x=>x.name==='docker' || x.name==='ffmpeg'),false);
  assert.deepEqual(r,analyzeRequirements(files,{inventory:{skipped:[{path:'render.mjs',reason:'size'}]}}));
});
test('documented install commands yield hints without copying URLs, flags or credentials',()=>{
  const r=analyzeRequirements([f('SKILL.md','pip install Pillow>=10 -r private.txt --index-url https://secret@example.test/index\nnpm install @scope/pkg@1.2 --registry https://secret@example.test')]);
  assert.ok(r.detected.some(x=>x.name==='Pillow' && x.version==='>=10' && x.status==='installation-command-hint'));
  assert.ok(r.detected.some(x=>x.name==='@scope/pkg' && x.version==='1.2'));
  assert.doesNotMatch(JSON.stringify(r),/secret|private.txt/);
});
test('inline installation snippets exclude surrounding prose and support python -m pip',()=>{
  const r=analyzeRequirements([f('README.md','Use `pip install numpy pillow` and pin versions.\npython3 -m pip install sherpa-onnx\n`npm install` pulls remotion and react.\n')]);
  const names=r.detected.filter(x=>x.status==='installation-command-hint').map(x=>x.name).sort();
  assert.deepEqual(names,['numpy','pillow','sherpa-onnx']);
});
