const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const context={window:{}};vm.createContext(context);
for(const path of ['data/products.js','data/expansion-products.js','data/finder.js','data/packages.js','data/domains.js','data/greenfield-template.js','data/workstream-solutions.js','data/workstream-codes.js'])vm.runInContext(fs.readFileSync(path,'utf8'),context);
const T=JSON.parse(JSON.stringify(context.window.CC_GREENFIELD)),D=context.window.CC_DOMAINS;
const createTags=require('../assets/workstream-tags.js');
test('all 18 workstreams have unique letter codes of at most four characters',()=>{
  assert.equal(T.workstreams.length,18);assert.equal(new Set(T.workstreams.map(w=>w.code)).size,18);
  for(const w of T.workstreams){assert.match(w.code,/^[A-Z]{1,4}$/);if(T.workstreams.filter(x=>x.domain===w.domain).length===1)assert.equal(w.code,D.find(d=>d.id===w.domain).code);}
});
test('all 347 individual activities have stable sequential parent codes and edited titles',()=>{
  assert.equal(T.tasks.length,347);assert.equal(new Set(T.tasks.map(t=>t.code)).size,347);
  for(const w of T.workstreams)T.tasks.filter(t=>t.workstream===w.id).forEach((t,i)=>{
    assert.equal(t.code,w.code+'-'+String(i+1).padStart(2,'0'));
    assert.match(t.name,/^[A-Z0-9]/);assert.ok(!/\bthe the\b|Market teasing/.test(t.name));
    assert.match(t.id,/^GF-/);assert.ok(t.dependencies.every(d=>T.tasks.some(t=>t.id===d.id)));
  });
});
test('status colors distinguish overdue work, schedule risk and verified completion',()=>{
  const tags=createTags(T),today='2026-11-13';
  const task={id:T.tasks[0].id,workstream:'WS-18',verified:false,startDate:'2026-11-13',finishDate:'2026-11-20',targetSlack:2,state:{}};
  assert.equal(tags.taskStatus(task,today).color,'yellow');
  assert.equal(tags.taskStatus({...task,targetSlack:-1},today).color,'orange');
  assert.equal(tags.taskStatus({...task,finishDate:'2026-11-12'},today).color,'red');
  assert.equal(tags.taskStatus({...task,verified:true,finishDate:'2026-11-12'},today).color,'yellow');
  tags.setContext({id:'a'},{tasks:[{...task,targetSlack:-1}]},today);
  tags.setContext({id:'b'},{tasks:[{...task,finishDate:'2026-11-12'}]},today);
  assert.match(tags.code('WS-18','a'),/ws-orange/);assert.match(tags.code('WS-18','b'),/ws-red/);
  assert.match(tags.code('WS-18','unsaved'),/Template · not assessed/);
});
test('future prerequisites alone do not classify an entire workstream as blocked',()=>{
  const tags=createTags(T);tags.setContext({id:'test'},{tasks:[{id:'x',workstream:'WS-01',startDate:'2027-01-01',finishDate:'2027-01-02',targetSlack:2,blocked:true,state:{}}]},'2026-11-13');
  assert.equal(tags.status('WS-01','test').color,'yellow');
});
