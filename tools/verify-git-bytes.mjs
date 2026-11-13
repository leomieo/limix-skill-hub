#!/usr/bin/env node
// Check the staged release bytes, so Windows line-ending conversion cannot silently break source hashes.
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { sha256 } from '../lib/pack.mjs';
const git=(args,options={})=>execFileSync('git',args,{windowsHide:true,maxBuffer:512*1024*1024,...options});
const catalog=JSON.parse(await readFile('registry/catalog.json','utf8'));
const expected=new Map();
for(const skill of catalog.skills) {
  for(const [file,hash] of Object.entries(skill.file_hashes)) expected.set(`skills/${skill.id}/${file}`,hash);
  const inventory=JSON.parse(await readFile(`skills/${skill.id}/_hub.source.json`,'utf8'));
  for(const file of inventory.files) expected.set(`skills/${skill.id}/${file.path}`,file.sha256);
  const executable=inventory.files.filter(file=>file.executable).map(file=>`skills/${skill.id}/${file.path}`);
  for(let offset=0;offset<executable.length;offset+=50) git(['update-index','--chmod=+x','--',...executable.slice(offset,offset+50)]);
}
const index=new Map(git(['ls-files','--stage','-z']).toString('utf8').split('\0').filter(Boolean).map(line=>{
  const tab=line.indexOf('\t'); return [line.slice(tab+1),line.slice(0,tab).split(' ')[1]];
}));
for(const name of expected.keys()) if(!index.has(name)) throw Error(`release file missing from index: ${name}`);
const ids=[...new Set([...expected.keys()].map(name=>index.get(name)))];
const bytes=git(['cat-file','--batch'],{input:ids.join('\n')+'\n'});
const hashes=new Map();
let offset=0;
while(offset<bytes.length) {
  const newline=bytes.indexOf(10,offset);
  const [id,type,size]=bytes.subarray(offset,newline).toString('utf8').split(' ');
  if(type!=='blob'||!/^\d+$/.test(size)) throw Error('invalid Git object');
  const start=newline+1,end=start+Number(size);
  hashes.set(id,sha256(bytes.subarray(start,end)));
  offset=end+1;
}
for(const [name,hash] of expected) if(hashes.get(index.get(name))!==hash) throw Error(`Git changed release bytes: ${name}`);
console.log(`PASS: ${expected.size} staged skill files match published hashes; upstream executable flags retained.`);
