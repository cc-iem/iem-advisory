const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const graph=require('../assets/activity-graph.js'),E=require('../assets/planner-engine.js');
const c={window:{}};vm.createContext(c);
for(const file of ['data/greenfield-template.js','data/workstream-codes.js'])vm.runInContext(fs.readFileSync(file,'utf8'),c);
const T=JSON.parse(JSON.stringify(c.window.CC_GREENFIELD));
const project={name:'Test hospital',openingBeds:100,totalBeds:300,departmentCount:8,departments:['inpatient','outpatient','emergency','icu','surgery','imaging','laboratory','pharmacy'],startDate:'2026-11-16',targetDate:'2028-11-16',teams:1,systems:'enterprise',internationalHires:true,holidays:[],taskStates:{}};
test('every profile relationship is an exact scheduled link with its direction, type and lag',()=>{
  for(const p of [project,{...project,internationalHires:false,departments:['inpatient']}]){
    const tasks=E.schedule(T,p).tasks;
    for(const task of tasks){
      const links=graph.relations(tasks,task.id);
      assert.deepEqual(links.prerequisites.map(e=>[e.from,e.to,e.type,e.lag]),task.dependencies.map(d=>[d.id,task.id,d.type,d.lag]));
      const dependents=tasks.flatMap(t=>t.dependencies.filter(d=>d.id===task.id).map(d=>[task.id,t.id,d.type,d.lag]));
      assert.deepEqual(links.dependents.map(e=>[e.from,e.to,e.type,e.lag]),dependents);
      for(const edge of [...links.prerequisites,...links.dependents]){assert.equal(edge.predecessor.id,edge.from);assert.equal(edge.successor.id,edge.to);}
    }
  }
});
test('MS Project provenance and separately marked generalization checks survive graph lookup',()=>{
  const tasks=E.schedule(T,project).tasks;
  const edges=tasks.flatMap(t=>graph.relations(tasks,t.id).prerequisites);
  assert.ok(edges.some(e=>graph.provenance(e)==='MS Project-derived link'));
  assert.ok(edges.some(e=>graph.provenance(e)==='Generalization completion check'));
  assert.ok(edges.some(e=>graph.provenance(e)==='Capacity review rule'));
  for(const edge of edges){
    const source=T.tasks.find(t=>t.id===edge.to)?.dependencies.find(d=>d.id===edge.from&&d.type===edge.type);
    if(source){assert.equal(edge.sourceLag,source.sourceLag);assert.equal(edge.origin,source.origin);assert.equal(edge.sourceType,source.sourceType);}
  }
  assert.equal(graph.relations(tasks,'not-in-scope').task,null);
});
test('arrow endpoints preserve finish-to-start versus start-to-start and describe working-day lag',()=>{
  const from={start:100,finish:140,y:25},to={start:180,finish:220,y:75};
  assert.match(graph.path(from,to,'FS'),/^M 140 25 .*H 180$/);
  assert.match(graph.path(from,to,'SS'),/^M 100 25 .*H 180$/);
  assert.match(graph.path(from,to,'FF'),/^M 140 25 .*H 220$/);
  assert.equal(graph.describe({type:'SS',lag:5}),'Start → start · +5 working days');
  assert.equal(graph.describe({type:'FS',lag:0}),'Finish → start');
  assert.doesNotMatch(graph.path({start:50,finish:100,y:100},{start:30,finish:45,y:0}),/NaN|Infinity/);
});
