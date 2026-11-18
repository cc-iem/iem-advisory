const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const E=require('../assets/planner-engine.js'),graph=require('../assets/activity-graph.js'),definitions=require('../data/gates.js'),G=require('../assets/gates-engine.js')(definitions,E);
const data={window:{}};vm.createContext(data);
for(const file of ['data/products.js','data/expansion-products.js','data/finder.js','data/packages.js','data/domains.js','data/greenfield-template.js','data/workstream-solutions.js','data/workstream-codes.js'])vm.runInContext(fs.readFileSync(file,'utf8'),data);
const T=JSON.parse(JSON.stringify(data.window.CC_GREENFIELD)),C=JSON.parse(JSON.stringify(data.window.CC_CATALOG));
const project=()=>({id:'plan',name:'My Hospital',openingBeds:100,totalBeds:100,departmentCount:8,departments:['inpatient','outpatient','emergency','icu','surgery','imaging','laboratory','pharmacy'],startDate:'2026-01-05',targetDate:'2028-01-05',teams:1,systems:'enterprise',holidays:[],taskStates:{},selectedProducts:[]});
function ready(id='GATE-01'){
  const p=project(),gate=G.list(p,E.schedule(T,p),C).find(g=>g.id===id);
  for(const t of gate.requirements)p.taskStates[t.id]={status:'complete',owner:t.owner,evidence:'Signed source evidence '+t.id,actualFinish:'2026-11-16'};
  return {p,result:E.schedule(T,p)};
}
const input=(extra={})=>({decision:'pending',approver:'Hospital Steering Committee',evidence:'Review record 001',date:'2026-11-17',criteria:definitions[0].criteria.map(c=>c.id),...extra});
test('six stable gate objects project existing milestone IDs without changing any schedule dates or edges',()=>{
  const p=project(),r=E.schedule(T,p),before=JSON.stringify(r),gates=G.list(p,r,C);
  assert.deepEqual(gates.map(g=>g.code),definitions.map(g=>g.id));assert.equal(gates.length,6);
  for(const g of gates)for(const id of g.sourceIds)assert.ok(r.tasks.find(t=>t.id===id)?.milestone,id);
  assert.equal(JSON.stringify(r),before);assert.ok(!r.tasks.some(t=>t.id.startsWith('GATE-')));
  for(const g of gates){const expected=g.sources.map(t=>t.finishDate).sort().at(-1);if(g.id!=='GATE-06')assert.equal(g.forecastDate,expected);}
  assert.equal(gates[5].forecastDate,[G.month(r.forecastDate,12),r.tasks.find(t=>t.id==='GF-017').finishDate].sort().at(-1));
});
test('each original gate milestone is represented and first patient remains a separate event',()=>{
  const p=project(),r=E.schedule(T,p),sources=new Set(G.list(p,r,C).flatMap(g=>g.sourceIds));
  for(const t of r.tasks.filter(t=>t.gate&&t.id!=='GF-016'))assert.ok(sources.has(t.id),t.id);
  assert.ok(!sources.has('GF-016'));assert.equal(r.tasks.find(t=>t.id==='GF-016').code,'ACT-12');
});
test('capacity review codes stay stable and do not renumber the reference activities',()=>{
  const p={...project(),totalBeds:300},r=E.schedule(T,p),gates=G.list(p,r,C);
  assert.deepEqual(gates.slice(6).map(g=>g.id),['GATE-07','GATE-08','GATE-09','GATE-10']);
  for(const g of gates.slice(6))assert.equal(g.sources[0].id,'CAP-'+String(g.sequence-6).padStart(2,'0'));
  const expanded=G.list({...p,totalBeds:400},E.schedule(T,{...p,totalBeds:400}),C);
  for(const g of gates)assert.deepEqual(expanded.find(x=>x.id===g.id).sourceIds,g.sourceIds);
});
test('all gate profiles use the original direct FS/SS endpoints, lags and provenance',()=>{
  const p=project(),r=E.schedule(T,p);
  for(const g of G.list(p,r,C)){
    const links=G.links(g,r.tasks,graph);
    for(const edge of [...links.prerequisites,...links.dependents]){
      const original=r.tasks.find(t=>t.id===edge.to).dependencies.find(d=>d.id===edge.from&&d.type===edge.type);
      assert.ok(original);assert.equal(edge.lag,original.lag);assert.equal(edge.sourceLag,original.sourceLag);
    }
  }
});
test('changing setup dates, capacity and estimates recalculates gates but selections never certify readiness',()=>{
  const p=project(),initial=G.list(p,E.schedule(T,p),C);
  const q={...p,targetDate:'2029-03-31',openingBeds:400,totalBeds:600,taskStates:{'GF-147':{duration:350}}},changed=G.list(q,E.schedule(T,q),C);
  assert.notEqual(initial[0].targetDate,changed[0].targetDate);assert.notEqual(initial[3].forecastDate,changed[3].forecastDate);
  const selected={...p,selectedProducts:C.map(p=>p.id)},all=G.list(selected,E.schedule(T,selected),C);
  assert.deepEqual(all.map(g=>g.status),initial.map(g=>g.status));assert.ok(all.some(g=>g.coveredProducts.length));
  assert.equal(G.month('2028-03-31',-1),'2028-02-29');assert.equal(G.month('2027-03-31',-1),'2027-02-28');
  const late={...p,startDate:'2027-12-01'};assert.ok(G.list(late,E.schedule(T,late),C).filter(g=>g.inherited).length>=4);
});
test('pending reviews retain criteria and immutable history; approval needs verified prerequisites',()=>{
  const p=project(),r=E.schedule(T,p),before=JSON.stringify(p);
  assert.throws(()=>G.review(p,r,'GATE-01',input({decision:'approved'}),C,'2026-11-17'),/Verify every prerequisite/);
  const next=G.review(p,r,'GATE-01',input(),C,'2026-11-17');
  assert.equal(JSON.stringify(p),before);assert.equal(next.gates['GATE-01'].reviews.length,1);
  assert.equal(G.list(next,r,C)[0].criteriaVerified,2);assert.notEqual(G.list(next,r,C)[0].status,'Approved');
  const again=G.review(next,r,'GATE-01',input({evidence:'Second independent review',decision:'hold'}),C,'2026-11-17');
  assert.equal(again.gates['GATE-01'].reviews.length,2);assert.equal(next.gates['GATE-01'].reviews.length,1);assert.equal(G.list(again,r,C)[0].status,'On hold');
});
test('verified evidence permits recorded approval; later material edits require review again',()=>{
  const {p,result}=ready(),approved=G.review(p,result,'GATE-01',input({decision:'approved'}),C,'2026-11-17');
  assert.equal(G.list(approved,result,C)[0].status,'Approved');
  assert.deepEqual(E.schedule(T,approved).tasks,result.tasks,'a review does not duplicate or overwrite original milestone records');
  const moved={...approved,targetDate:'2028-03-01'};assert.equal(G.list(moved,E.schedule(T,moved),C)[0].status,'Review required');
  const selected={...approved,selectedProducts:[C[0].id]};assert.equal(G.list(selected,E.schedule(T,selected),C)[0].status,'Approved');
  const amended=JSON.parse(JSON.stringify(approved));amended.taskStates[Object.keys(amended.taskStates)[0]].evidence='Revised evidence';assert.equal(G.list(amended,E.schedule(T,amended),C)[0].status,'Review required');
});
test('reviews reject future/invalid dates, missing evidence and incomplete conditions',()=>{
  const {p,result}=ready();
  for(const extra of [{date:'2027-01-01'},{date:'2026-02-30'},{evidence:''},{approver:''}])assert.throws(()=>G.review(p,result,'GATE-01',input(extra),C,'2026-11-17'),/valid review date/);
  assert.throws(()=>G.review(p,result,'GATE-01',input({decision:'approved',date:'2026-11-15'}),C,'2026-11-17'),/precede/);
  assert.throws(()=>G.review(p,result,'GATE-01',input({decision:'conditional',conditions:'Follow-up'}),C,'2026-11-17'),/named owner/);
  const next=G.review(p,result,'GATE-01',input({decision:'conditional',conditions:'Close minor items',conditionOwner:'PMO lead',conditionDueDate:'2026-11-30'}),C,'2026-11-17');assert.equal(G.list(next,result,C)[0].status,'Conditional approval');
});
test('a target override is retained and can be cleared to follow the reference dates',()=>{
  const p=project(),r=E.schedule(T,p),next=G.review(p,r,'GATE-01',input({targetDate:'2027-01-05'}),C,'2026-11-17');
  assert.equal(G.list(next,r,C)[0].targetDate,'2027-01-05');
  const cleared=G.review(next,r,'GATE-01',input({targetDate:''}),C,'2026-11-17');assert.equal(G.list(cleared,r,C)[0].targetDate,G.month(p.targetDate,-22));
});
test('first-year handover cannot be approved at early stabilization and short advisory support does not remove it',()=>{
  const {p,result}=ready('GATE-06');
  assert.throws(()=>G.review(p,result,'GATE-06',input({decision:'approved',criteria:definitions[5].criteria.map(c=>c.id)}),C,'2026-11-17'),/12 months after first patient/);
  const short={...p,postOpeningSupport:3,selectedProducts:C.map(p=>p.id)},gates=G.list(short,E.schedule(T,short),C);
  assert.equal(gates.length,6);assert.equal(gates[5].coveredProducts.length,0);assert.ok(gates[4].coveredProducts.length);
});
function uiContext(){
  const p=project(),r=E.schedule(T,p),body={scrollTop:0},panel={dataset:{},hidden:true,querySelector:()=>body},events={},handlers={},observers=[];
  const window={CCActivityGraph:graph,CCGates:G,CC_GREENFIELD:T,HospitalEngine:E,CC_CATALOG:C,CCProject:{get:()=>p},CCAccountableRoles:require('../assets/accountable-roles.js')(T),CCWorkstreamTags:require('../assets/workstream-tags.js')(T),CCDomainTags:require('../assets/domain-tags.js')(data.window.CC_DOMAINS,C),CCPlannerViews:{gateActivities:()=>'<div class="source-gantt">Source timeline</div>',gateTimeline:()=>'<div class="all-gates-gantt"></div>'},addEventListener:(name,fn)=>events[name]=fn};
  window.CCProject.save=next=>Object.assign(p,next);window.CCApp={profile:html=>{panel.innerHTML=html;panel.hidden=false;},close:()=>{panel.hidden=true;}};window.dispatchEvent=ev=>events[ev.type]?.(ev);
  const c={window,document:{getElementById:()=>panel,querySelector:()=>body,addEventListener:(name,fn)=>handlers[name]=fn},MutationObserver:class{constructor(fn){observers.push(fn);}observe(){}},CustomEvent:class{constructor(type,options){this.type=type;this.detail=options?.detail;}},FormData:class{constructor(form){this.values=form.values;}get(key){return this.values[key]??null;}getAll(key){return this.values[key]||[];}},Intl,URL,Blob,console};vm.createContext(c);vm.runInContext(fs.readFileSync('assets/gates-ui.js','utf8'),c);
  return {c,p,r,U:window.CCGatesUI,window,panel,events,handlers,observers};
}
test('register, profile and compact timeline share every gate ID/date and accessible magenta tags',()=>{
  const {p,r,U}=uiContext(),gates=G.list(p,r,C),page=U.page(p,r),timeline=U.timeline(p,r,{origin:p.startDate,end:'2032-01-01'});
  for(const g of gates){assert.ok(page.includes('data-gate-row="'+g.id+'"'));assert.ok(timeline.includes('data-timeline-gate="'+g.id+'"'));const profile=U.profile(g,p);assert.match(profile,/data-gate-review=/);assert.match(profile,/Decision history/);assert.match(profile,/Pre-requisite/);assert.match(profile,/Dependency/);assert.match(profile,/source-gantt/);assert.ok(profile.includes(g.code));assert.ok(timeline.includes('forecast '+new Date(g.forecastDate+'T12:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})));}
  assert.match(page,/data-gates-view="table" aria-pressed="true"/);assert.match(U.page(p,r,'timeline'),/all-gates-gantt/);
  assert.doesNotMatch(timeline,/data-gate-select=/,'gate tags open the RHS instead of only selecting relationships');
  for(const g of gates)assert.ok(timeline.includes(U.button(g)),'timeline gate tag keeps the shared profile action');
  assert.doesNotMatch(timeline,/gantt-bar/,'gates are zero-duration diamonds');assert.match(timeline,/gate-marker forecast/);assert.match(timeline,/gate-marker target/);
});
test('scoped gate timelines only show related gates; product and Package coverage keep hospital requirements',()=>{
  const {p,r,U}=uiContext(),gates=G.list(p,r,C),ids=G.related(gates,['WS-10']).map(g=>g.id),html=U.timeline(p,r,{origin:p.startDate,end:'2032-01-01'},['WS-10']);
  assert.deepEqual([...html.matchAll(/data-timeline-gate="([^"]+)"/g)].map(m=>m[1]),ids);
  assert.match(U.product(C.find(p=>gates[4].products.includes(p.id))),/Supports these gates/);
  assert.match(U.coverage(),/0 of 6/);assert.match(U.involvement(C[0]),/disabled/);
  p.selectedProducts=[C[0].id];assert.doesNotMatch(U.involvement(C[0]),/disabled/);assert.equal(G.list(p,r,C).length,6);
});
test('static page initializes the gate engine exactly once before any rendering code',()=>{
  const index=fs.readFileSync('index.html','utf8');
  for(const file of ['data/gates.js','assets/gates-engine.js','assets/gates-ui.js'])assert.equal(index.split('src="'+file+'?').length-1,1,file);
  assert.ok(index.indexOf('data/gates.js')<index.indexOf('assets/gates-engine.js'));assert.ok(index.indexOf('assets/gates-ui.js')<index.indexOf('assets/app.js'));assert.doesNotMatch(index,/window.CCGates = window.CCGates\(/);
  const c={window:{HospitalEngine:E}};vm.createContext(c);for(const f of ['data/gates.js','assets/gates-engine.js'])vm.runInContext(fs.readFileSync(f,'utf8'),c);assert.equal(typeof c.window.CCGates.list,'function');
});
test('gate RHS actions open the profile, toggle source views, save evidence and close its relationship focus',()=>{
  const {p,U,panel,events,handlers,observers}=uiContext();let opened,closed=false;
  events['advisory-gate-open']=event=>opened=event.detail.id;events['advisory-gate-close']=()=>closed=true;
  const target=attr=>({closest:selector=>selector===attr.selector?attr:null}),event=target=>({target,preventDefault(){},stopPropagation(){}});
  handlers.click(event(target({selector:'[data-gate-open]',dataset:{gateOpen:'GATE-01'}})));
  assert.equal(opened,'GATE-01');assert.equal(panel.dataset.gateProfile,'GATE-01');assert.match(panel.innerHTML,/source-gantt/);
  assert.match(panel.innerHTML,/<button[^>]*data-gate-open="GATE-01"/);
  handlers.click(event(target({selector:'[data-gate-source-view]',dataset:{gateSourceView:'table'}})));
  assert.match(panel.innerHTML,/<table class="planner-table">/);assert.doesNotMatch(panel.innerHTML,/source-gantt/);
  const error={hidden:true,scrollIntoView(){}},form={dataset:{gateReview:'GATE-01'},values:input({criteria:definitions[0].criteria.map(c=>c.id)}),querySelector:()=>error};
  handlers.submit(event({closest:()=>form}));assert.equal(error.hidden,true);assert.equal(p.gates['GATE-01'].reviews.length,1);assert.equal(p.gates['GATE-01'].reviews[0].evidence,'Review record 001');
  panel.hidden=true;observers[0]();assert.equal(closed,true);
});
test('the actual shared Gantt places the same gate dates in master, all child, solution and setup timelines',()=>{
  const {p,r,U,window}=uiContext(),source=fs.readFileSync('assets/workspace.js','utf8');
  const c={window,T,C,E,current:p,result:r,route:{page:'workstreams'},ui:{},S:{get:()=>p},date:s=>s||'',esc:s=>String(s??''),ws:id=>T.workstreams.find(w=>w.id===id)};vm.createContext(c);
  for(const name of ['matchingTasks','isTimelinePage','workstreamRange','activityTimelineBarHTML','activityTimelineRowHTML','ganttHTML','connectionWorkstreamsHTML','setupTimelineHTML','notice']){const start=source.indexOf('  function '+name+'(');vm.runInContext(source.slice(start,source.indexOf('\n  }',start)+4),c);}
  function check(html,expected){assert.deepEqual([...html.matchAll(/data-timeline-gate="([^\"]+)"/g)].map(m=>m[1]),expected.map(g=>g.id));for(const g of expected){assert.ok(html.includes(g.forecastDate)||html.includes(new Date(g.forecastDate+'T12:00:00').toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'})));}}
  const gates=G.list(p,r,C);check(c.ganttHTML(),gates);check(c.setupTimelineHTML(),gates);
  for(const w of T.workstreams){c.route.workstream=w.id;check(c.ganttHTML(),G.related(gates,[w.id]));}
  c.route.workstream=null;for(const product of C)check(c.connectionWorkstreamsHTML(product),G.related(gates,product.workstreamLinks.map(w=>w.id)));
  const gate=gates[3],sources=c.ganttHTML({sourceOnly:true,activityIds:gate.sourceIds,gateIds:[gate.id]});check(sources,[gate]);
  assert.deepEqual([...sources.matchAll(/data-timeline-activity="([^\"]+)"/g)].map(m=>m[1]).sort(),gate.sourceIds.slice().sort());
  const only=c.ganttHTML({gatesOnly:true});check(only,gates);assert.doesNotMatch(only,/data-timeline-activity=/);
});
test('gate reviews and advisory involvement survive shared-project storage and reload',()=>{
  const {p,result}=ready(),saved=G.review(p,result,'GATE-01',input({decision:'approved'}),C,'2026-11-17'),records=new Map(),storage={getItem:key=>records.get(key)??null,setItem:(key,value)=>records.set(key,value)},factory=require('../assets/single-project.js');
  const options={storage,catalog:C,template:T,createDefault:()=>p};const first=factory(options);first.save({...saved,solutionInvolvement:{[C[0].id]:'co-lead'}});
  const second=factory(options),restored=second.get();assert.equal(restored.gates['GATE-01'].reviews[0].decision,'approved');assert.equal(restored.solutionInvolvement[C[0].id],'co-lead');assert.equal(G.list(restored,E.schedule(T,restored),C)[0].status,'Approved');
});
test('workstream charts use one gate row with nonoverlapping labels at narrow and wide widths',()=>{
  const {p,r,U}=uiContext(),gates=G.list(p,r,C),html=U.timeline(p,r,{origin:p.startDate,end:'2032-01-01'});
  assert.equal((html.match(/class="gantt-row gate-rail"/g)||[]).length,1);assert.doesNotMatch(html,/class="gantt-row gate-timeline-row"/);
  for(const g of gates)assert.ok(html.includes(U.button(g)));
  for(const width of [240,470,640,1100]){
    const layout=U.railLayout([.5,.5,5,12,12,35,55,99.2].map(x=>({x})),width);
    for(const a of layout.items)for(const b of layout.items)if(a.index<b.index&&a.lane===b.lane)assert.ok(Math.abs(a.center-b.center)>=78,'labels retain space at '+width+'px');
    assert.ok(layout.height>=76);assert.ok(layout.items.every(item=>item.center>=36&&item.center<=width-36));
  }
});
test('expanding a gate shows its complete workstream/activity hierarchy in both views and clearing removes hidden timeline endpoints',()=>{
  const {p,r,U,window}=uiContext(),gates=G.list(p,r,C),stored=new Map();window.localStorage={getItem:k=>stored.get(k),setItem:(k,v)=>stored.set(k,v)};
  const source=fs.readFileSync('assets/workspace.js','utf8'),c={window,current:p,E,esc:s=>String(s??''),date:s=>s};vm.createContext(c);
  for(const name of ['activityTimelineBarHTML','activityTimelineRowHTML']){const start=source.indexOf('  function '+name+'(');vm.runInContext(source.slice(start,source.indexOf('\n  }',start)+4),c);}
  window.CCPlannerViews.timelineRows=(ids,axis)=>ids.map(id=>{const t=r.tasks.find(t=>t.id===id);return c.activityTimelineRowHTML(t,c.activityTimelineBarHTML(t,axis));}).join('');
  const axis={origin:p.startDate,end:'2032-01-01'};
  for(const g of gates){
    const table=U.children(g,'table'),timeline=U.children(g,'timeline',axis),expected=g.relatedTasks.map(t=>t.id).sort();
    assert.deepEqual([...table.matchAll(/data-gate-activity="([^"]+)"/g)].map(m=>m[1]).sort(),expected);
    assert.deepEqual([...timeline.matchAll(/data-timeline-activity="([^"]+)"/g)].map(m=>m[1]).sort(),expected);
    for(const id of g.workstreams){assert.ok(table.includes('data-gate-workstream="'+id+'"'));assert.ok(timeline.includes('data-gate-workstream="'+id+'"'));}
    for(const t of g.relatedTasks){assert.ok(table.includes(t.startDate));assert.ok(timeline.includes(t.finishDate));}
  }
  const g=gates[0],content={innerHTML:''},container={dataset:{axisOrigin:axis.origin,axisEnd:axis.end},hidden:true,querySelector:()=>content},host={querySelector:()=>container},control={dataset:{gateExpand:g.id,gateView:'table'},closest:()=>host,setAttribute(k,v){this[k]=v;}};
  U.expand(control);assert.equal(container.hidden,false);assert.equal(control['aria-expanded'],'true');assert.match(content.innerHTML,/data-gate-activity=/);
  assert.match(U.timeline(p,r,axis,null,true),/data-timeline-activity=/,'Table expansion carries over to Gates Gantt');
  U.expand(control);assert.equal(container.hidden,true);assert.equal(content.innerHTML,'');assert.equal(control['aria-expanded'],'false');
  control.dataset.gateView='timeline';U.expand(control);assert.match(container.innerHTML,/data-timeline-activity=/);U.expand(control);assert.equal(container.innerHTML,'','hidden activity rows cannot capture dependency-arrow endpoints');
  assert.equal(stored.get('iem-gate-expansion-v1'),'[]');
});
