/* Exercise the actual pure render functions without opening a browser or using a server. */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const E=require('../assets/planner-engine.js'),createTags=require('../assets/workstream-tags.js');
const data={window:{}};vm.createContext(data);
for(const file of ['data/products.js','data/expansion-products.js','data/finder.js','data/packages.js','data/domains.js','data/greenfield-template.js','data/workstream-solutions.js','data/workstream-codes.js'])vm.runInContext(fs.readFileSync(file,'utf8'),data);
const T=JSON.parse(JSON.stringify(data.window.CC_GREENFIELD)),C=JSON.parse(JSON.stringify(data.window.CC_CATALOG));
const project={id:'single-plan',name:'Our hospital',openingBeds:100,totalBeds:300,departmentCount:8,departments:['inpatient','outpatient','emergency','icu','surgery','imaging','laboratory','pharmacy'],startDate:'2026-11-16',targetDate:'2028-11-16',teams:1,systems:'enterprise',internationalHires:false,holidays:[],taskStates:{},selectedProducts:[]};
const result=E.schedule(T,project),tags=createTags(T);tags.setContext(project,result,'2026-11-16');tags.setActive(project.id);
const source=fs.readFileSync('assets/workspace.js','utf8');
function declaration(name){
  const start=source.indexOf('  function '+name+'(');
  if(start>=0)return source.slice(start,source.indexOf('\n  }',start)+4);
  const constant=source.indexOf('  const '+name+' =');assert.ok(constant>=0,name+' exists');
  return source.slice(constant,source.indexOf(';',constant)+1);
}
function context(){const context={T,C,E,result,current:project,route:{section:'planner',page:'workstreams',workstream:'WS-01'},ui:{workstreamViews:{},activityQueries:{}},pages:[['overview','Selected Solutions'],['setup','Project Planner'],['workstreams','Workstreams'],['gates','Gates'],['roles','Accountable Role'],['readiness','Readiness']],scopeDepth:0,D:JSON.parse(JSON.stringify(data.window.CC_DOMAINS)),S:{get:()=>project,selectedWorkstreams:()=>[]},location:{hash:'#planner/workstreams/PMO'},URLSearchParams,window:{CCAccountableRoles:require('../assets/accountable-roles.js')(T),CCActivityGraph:require('../assets/activity-graph.js'),CCWorkstreamTags:tags,CCDomainTags:require('../assets/domain-tags.js')(data.window.CC_DOMAINS,C)},ws:id=>T.workstreams.find(w=>w.id===id),today:()=> '2026-11-16',date:s=>s||'',esc:s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};vm.createContext(context);for(const name of ['projectURL','workstreamURL','parseRoute','accountableRolesHTML','isTimelinePage','workstreamsHTML','timelineHTML','matchingTasks','workstreamViewToggle','workstreamContentHTML','workstreamActivitiesHTML','ganttHTML','activityTimelineRowHTML','activityTimelineBarHTML','activityRelationshipsHTML','readinessHTML','workstreamRange','setupTimelineHTML','renderSetupTimeline','connectionWorkstreamsHTML','workstreamPageHTML','workstreamSolutionsHTML','productButton','filtersHTML','head','button','overviewHTML','notice','renderNav','navSection','withPlanScope'])vm.runInContext(declaration(name),context);return context;}
const ids=html=>[...new Set([...html.matchAll(/data-task="([^"]+)"/g)].map(m=>m[1]))].sort();
test('Table and Timeline render exactly the same scoped activity IDs for all 18 workstreams',()=>{const c=context();for(const w of T.workstreams){c.route.workstream=w.id;c.ui.workstreamViews[w.id]='table';const table=c.workstreamContentHTML(w);c.ui.workstreamViews[w.id]='timeline';const timeline=c.workstreamContentHTML(w);const expected=result.tasks.filter(t=>t.workstream===w.id).map(t=>t.id).sort();assert.deepEqual(ids(table),expected,w.code+' table');assert.deepEqual(ids(timeline),expected,w.code+' timeline');assert.ok(timeline.includes('gantt-scroll'));}});
test('search filtering and no-match results remain identical across both views',()=>{const c=context(),w=T.workstreams.find(w=>w.code==='NURS');c.route.workstream=w.id;for(const query of ['NURS-01','competency','nonexistent activity']){c.ui.activityQueries[project.id+w.id]=query;c.ui.workstreamViews[w.id]='table';const table=ids(c.workstreamContentHTML(w));c.ui.workstreamViews[w.id]='timeline';assert.deepEqual(ids(c.workstreamContentHTML(w)),table,query);if(query==='NURS-01')assert.equal(table.length,1);if(query==='nonexistent activity')assert.equal(table.length,0);}});
test('view selection is explicit and defaults to Table',()=>{const c=context(),w=T.workstreams[0];assert.match(c.workstreamViewToggle(w),/data-view="table" aria-pressed="true"/);c.ui.workstreamViews[w.id]='timeline';assert.match(c.workstreamViewToggle(w),/data-view="timeline" aria-pressed="true"/);});
test('solution Table and default Gantt show every mapped workstream for all 63 solutions',()=>{
  const c=context();c.route={section:'catalog',page:'connections'};c.ui.query='';
  for(const product of C){
    const expected=[...new Set(product.workstreamLinks.map(w=>w.id))].sort();
    const table=c.connectionWorkstreamsHTML(product,'table'),gantt=c.connectionWorkstreamsHTML(product);
    const linked=html=>[...new Set([...html.matchAll(/data-workstream="([^"]+)"/g)].map(m=>m[1]))].sort();
    assert.deepEqual(linked(table),expected,product.code+' table');
    assert.deepEqual(linked(gantt),expected,product.code+' Gantt');
    assert.match(gantt,/gantt-scroll/);assert.equal(ids(gantt).length,0,'connections summarize workstreams; profiles expose activities');
  }
});
test('a mapped workstream outside current services remains visible in both connection views',()=>{
  const c=context(),w=T.workstreams[0],p={workstreamLinks:[{id:w.id,role:'Primary'}]};
  c.route={page:'connections'};c.result={...result,tasks:result.tasks.filter(t=>t.workstream!==w.id)};
  assert.match(c.connectionWorkstreamsHTML(p),/Not in the current service scope/);
  assert.match(c.connectionWorkstreamsHTML(p,'table'),new RegExp('data-connection-workstream="'+w.id+'"'));
});
test('RHS bodies share the full child page content and activities for all 18 workstreams',()=>{
  const c=context();for(const w of T.workstreams){
    c.route.workstream=w.id;
    const full=c.workstreamPageHTML(w),body=c.workstreamPageHTML(w,true);
    assert.ok(full.endsWith(body),w.code+' profile content is the actual child body');
    assert.deepEqual(ids(body),result.tasks.filter(t=>t.workstream===w.id).map(t=>t.id).sort());
    assert.match(body,/Activities & deliverables/);assert.match(body,/Supporting, conditional and post-opening solutions/);
  }
});
test('legacy planner page URLs resolve to Selected Solutions',()=>{
  const c=context();for(const hash of ['#planner/advisory','#planner/scenarios','#planner/old/advisory','#planner/old/scenarios']){
    c.location.hash=hash;assert.equal(c.parseRoute().page,'overview',hash);
  }
  assert.equal(c.projectURL('advisory'),'#planner/overview?section=solutions');
});
test('catalog profiles use the shared plan and restore the main route after scoped rendering',()=>{
  const c=context(),w=T.workstreams.find(w=>w.code==='NURS');
  const originalRoute={section:'catalog',domain:'clinical'},originalUI={query:'unrelated search',domain:'finance',criticalOnly:true};
  c.route=originalRoute;c.ui=originalUI;c.current=null;
  const body=c.withPlanScope(w.id,()=>c.workstreamPageHTML(w,true));
  assert.deepEqual(ids(body),result.tasks.filter(t=>t.workstream===w.id).map(t=>t.id).sort());
  const p=C.find(p=>p.workstreamLinks.length>1);
  const chart=c.withPlanScope(null,()=>c.connectionWorkstreamsHTML(p));
  assert.equal(new Set([...chart.matchAll(/data-workstream="([^"]+)"/g)].map(m=>m[1])).size,new Set(p.workstreamLinks.map(w=>w.id)).size);
  assert.equal(c.current,null);assert.equal(c.route,originalRoute);assert.equal(c.ui,originalUI);assert.equal(c.scopeDepth,0);
});
test('catalog and RHS tags share status on direct load, after profile rendering and on saved edits',()=>{
  const c=context(),listeners={},storage=new Map();
  const saved={...project,startDate:'2027-01-04',targetDate:'2027-01-05',finder:{answers:{},order:[]}};
  storage.set('iem-advisory-project-v1',JSON.stringify(saved));
  c.window.CCWorkstreamTags=createTags(T);
  Object.assign(c.window,{CC_GREENFIELD:T,CC_CATALOG:C,HospitalEngine:E,
    localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},
    CCExampleProject:{create:()=>saved},
    addEventListener:(type,fn)=>(listeners[type]??=[]).push(fn),
    dispatchEvent:ev=>(listeners[ev.type]||[]).forEach(fn=>fn(ev))});
  c.location.hash='#catalog';c.CustomEvent=class{constructor(type,options){this.type=type;this.detail=options.detail;}};
  c.Intl={DateTimeFormat:function(){return {format:()=> '2026-11-16'};}};
  vm.runInContext(fs.readFileSync('assets/single-project.js','utf8'),c);
  c.S=c.window.CCProject;c.route={section:'catalog'};c.current=null;
  const app=fs.readFileSync('assets/app.js','utf8'),start=app.indexOf('  function solutionWorkstreamsHTML(');
  vm.runInContext(app.slice(start,app.indexOf('\n  }',start)+4),c);
  const w=T.workstreams[0],p={workstreamLinks:[{id:w.id,role:'Primary'}]};
  let catalog=c.solutionWorkstreamsHTML(p),refreshes=0;
  assert.doesNotMatch(catalog,/<small>|Primary|Supporting scope/,'catalog workstream links contain no scope subtitle');
  const assertColor=color=>{
    assert.match(catalog,new RegExp('ws-'+color));
    assert.ok(catalog.includes(c.window.CCWorkstreamTags.html(w.id,saved.id)),'catalog and explicit RHS markup are identical');
  };
  assertColor('orange');
  c.withPlanScope(w.id,()=>c.workstreamPageHTML(w,true));
  assert.ok(catalog.includes(c.window.CCWorkstreamTags.html(w.id)),'closing the profile retains the saved-plan context');
  c.state={cart:[],answers:{},order:[]};c.$=()=>({hidden:true});
  c.renderCatalog=()=>{refreshes++;catalog=c.solutionWorkstreamsHTML(p);};c.refreshCartUI=c.renderCatalog;
  const eventStart=app.indexOf('  window.addEventListener("advisory-project-change"');
  vm.runInContext(app.slice(eventStart,app.indexOf('  /* ---------------- Start',eventStart)),c);
  const task=result.tasks.find(t=>t.workstream===w.id);
  c.S.save({taskStates:{[task.id]:{status:'blocked'}}},'workspace');assertColor('red');
  c.S.save({taskStates:{},targetDate:'2035-01-01'},'config');assertColor('yellow');
  const changed={...c.S.get(),taskStates:{[task.id]:{status:'blocked'}}};
  storage.set('iem-advisory-project-v1',JSON.stringify(changed));
  c.window.dispatchEvent({type:'storage',key:c.S.key});assertColor('red');
  assert.equal(refreshes,3,'activity, configuration and other-tab edits refresh the catalog');
  const setupHost={innerHTML:''};c.route={section:'planner',page:'setup'};c.current=c.S.get();c.projects=[c.current];
  c.$=selector=>selector==='#setupWorkstreamTimeline'?setupHost:{hidden:true};c.renderNav=()=>{};
  const workspaceStart=source.indexOf('  window.addEventListener("advisory-project-change"');
  vm.runInContext(source.slice(workspaceStart,source.indexOf('  window.addEventListener("hashchange"',workspaceStart)),c);
  c.S.save({startDate:'2027-04-01'},'config');
  assert.match(setupHost.innerHTML,/Planning start/);assert.match(setupHost.innerHTML,/2027-04-01/);
  assert.equal((setupHost.innerHTML.match(/data-workstream-row=/g)||[]).length,18,'a valid setup save redraws the mounted model timeline');
});
test('RHS Timeline override leaves the saved full-page Table choice unchanged',()=>{
  const c=context(),w=T.workstreams[0];c.ui.workstreamViews[w.id]='table';
  const html=c.withPlanScope(w.id,()=>c.workstreamPageHTML(w,true),false,'timeline');
  assert.match(html,/data-view="timeline" aria-pressed="true"/);assert.match(html,/gantt-scroll/);
  assert.equal(c.ui.workstreamViews[w.id],'table');
});
test('the setup model and dashboard share all 18 date ranges as Dates & Delivery changes',()=>{
  const c=context();c.route={section:'planner',page:'connections'};c.ui.query='';
  const ranges=html=>Object.fromEntries([...html.matchAll(/data-workstream-row="([^"]+)" data-start-date="([^"]+)" data-finish-date="([^"]+)"/g)].map(m=>[m[1],[m[2],m[3]]]));
  const snapshots=[];
  for(const edit of [{},{startDate:'2027-02-01'},{targetDate:'2026-12-01'},{handoverDate:'2030-01-01'},{teams:4},{systems:'new'},{internationalHires:true}]){
    c.current={...project,...edit};c.result=E.schedule(T,c.current);
    const setup=c.setupTimelineHTML(),dashboard=c.ganttHTML({groupsOnly:true,workstreamIds:T.workstreams.map(w=>w.id)});
    const setupRanges=ranges(setup);assert.deepEqual(setupRanges,ranges(dashboard));
    assert.equal((setup.match(/data-workstream-row=/g)||[]).length,18);
    for(const w of T.workstreams){
      const tasks=c.result.tasks.filter(t=>t.workstream===w.id);if(!tasks.length)continue;
      const expected=[tasks.map(t=>t.startDate).sort()[0],tasks.map(t=>t.finishDate).sort().at(-1)];
      assert.deepEqual(setupRanges[w.id],expected,w.code+' '+JSON.stringify(edit));
      expected.forEach(d=>assert.ok(setup.includes('datetime="'+d+'"'),'each range has visible date labels'));
      c.route={section:'planner',page:'workstreams',workstream:w.id};
      assert.deepEqual(ranges(c.ganttHTML())[w.id],expected,w.code+' child matches setup');
    }
    snapshots.push(JSON.stringify(setupRanges));c.route={section:'planner',page:'connections'};
    if(edit.targetDate)assert.ok(c.result.gapDays>0,'an urgent target displays the dependency gap instead of shortening fixed durations');
  }
  assert.ok(snapshots[0]!==snapshots[1],'planning start moves workstream dates');
  assert.ok(snapshots[0]!==snapshots[2],'requested opening updates launch activities');
  assert.ok(snapshots[0]!==snapshots[3],'handover constraints update dependent dates');
  assert.ok(snapshots[0]!==snapshots[4],'parallel teams update workload dates');
});
test('timeline search changes visible activities while keeping full workstream summary dates',()=>{
  const c=context(),w=T.workstreams[0],range=c.workstreamRange(w.id);
  c.ui.activityQueries[project.id+w.id]=range.tasks[0].code;
  const html=c.ganttHTML();assert.match(html,new RegExp('data-start-date="'+range.startDate+'" data-finish-date="'+range.finishDate+'"'));
  assert.equal(ids(html).length,1);
});
test('activity RHS profiles list every direct prerequisite and dependent used by Readiness',()=>{
  const c=context();
  for(const task of result.tasks){
    const html=c.activityRelationshipsHTML(task.id);
    assert.match(html,/<h3>Pre-requisite<\/h3>/);assert.match(html,/<h3>Dependency<\/h3>/);
    const actual=[...html.matchAll(/data-relationship-from="([^"]+)" data-relationship-to="([^"]+)"/g)].map(m=>m[1]+'>'+m[2]).sort();
    const expected=[...task.dependencies.map(d=>d.id+'>'+task.id),...result.tasks.flatMap(t=>t.dependencies.filter(d=>d.id===task.id).map(()=>task.id+'>'+t.id))].sort();
    assert.deepEqual(actual,expected,task.code);
  }
  assert.match(c.readinessHTML(),/Review milestone/);
});
test('all timeline activity tags select relationships separately from opening the profile',()=>{
  const c=context();for(const w of T.workstreams){
    c.route.workstream=w.id;
    const html=c.ganttHTML(),selected=[...html.matchAll(/data-timeline-select="([^"]+)"/g)].map(m=>m[1]).sort();
    assert.deepEqual(selected,result.tasks.filter(t=>t.workstream===w.id).map(t=>t.id).sort());
    assert.deepEqual(ids(html),selected);
  }
  c.route={page:'connections'};const compact=c.ganttHTML({groupsOnly:true,workstreamIds:T.workstreams.map(w=>w.id)});
  assert.match(compact,/data-timeline-expand=/,'summary charts allow activity expansion before selection');
});
test('Selected Solutions replaces the hospital overview with the shared solution table only',()=>{
  const c=context();c.window.CCApp={solutionTable:items=>'<div data-shared-table="'+items.length+'"></div>'};
  const html=c.overviewHTML();
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);assert.match(html,/>Selected Solutions<\/h1>/);
  assert.match(html,/data-shared-table="63"/);
  assert.doesNotMatch(html,/Forecast opening|Requested opening|Activities on the critical path|Opening decisions|Backups & downloads|All 18 workstreams mapped/);
});
test('Workstreams is the former Timeline view and old Timeline URLs resolve to it',()=>{
  const c=context();c.route={section:'planner',page:'workstreams',workstream:null};
  const html=c.workstreamsHTML();assert.match(html,/id="timelineResults"/);assert.match(html,/Critical path only/);assert.match(html,/gantt-scroll/);assert.doesNotMatch(html,/ws-overview-grid/);
  c.ui.criticalOnly=true;assert.ok(c.matchingTasks().every(t=>t.critical));
  for(const hash of ['#planner/timeline','#planner/old/timeline']){c.location.hash=hash;assert.equal(c.parseRoute().page,'workstreams');}
  assert.equal(c.projectURL('timeline'),'#planner/workstreams');
});
test('Accountable Role lists the reference directory and a Gates column',()=>{
  const c=context();assert.equal((c.accountableRolesHTML().match(/class="accountable-profile"/g)||[]).length,c.window.CCAccountableRoles.entries().length);
  assert.match(c.accountableRolesHTML(),/<h1[^>]*>Accountable Role<\/h1>/);assert.match(c.accountableRolesHTML(),/<th>Gates<\/th>/);
  c.location.hash='#planner/roles';assert.equal(c.parseRoute().page,'roles');
});
test('navigation groups advisory choices under Advisory Planner and delivery pages under Project Planner',()=>{
  const c=context(),nav={innerHTML:''};c.$=()=>nav;
  c.link=(href,label)=>'<a class="nav-item" href="'+href+'">'+label+'</a>';
  c.renderNav();
  assert.doesNotMatch(nav.innerHTML,/My Advisory Plan|My Hospital|Our hospital|Guided Finder|Hospital Setup|Scenarios & Exports/);
  const stack=[],parents={};
  for(const match of nav.innerHTML.matchAll(/<\/?div\b[^>]*>|<a\b[^>]*href="([^"]+)"[^>]*>/g)){
    if(match[0].startsWith('</div'))stack.pop();
    else if(match[0].startsWith('<div'))stack.push(match[0]);
    else parents[match[1]]=stack.filter(tag=>!tag.includes('nav-link-row'));
  }
  assert.deepEqual(parents['#planner/setup'],parents['#finder'],'Project Planner is a peer of Advisory Planner');
  for(const page of ['workstreams','gates','roles','readiness']){assert.equal(parents['#planner/'+page].length,parents['#planner/setup'].length+1);assert.ok(parents['#planner/'+page].at(-1).includes('id="projectPlannerNav"'));}
  assert.equal(parents['#planner/workstreams/PMO'].length,parents['#planner/workstreams'].length+1);
  assert.match(nav.innerHTML,/>Project Planner<\/a>/);assert.match(nav.innerHTML,/>Accountable Role<\/a>/);
  assert.deepEqual(parents['#planner/overview'],parents['#catalog']);
  assert.equal(parents['#catalog'].length,parents['#finder'].length+1);
  assert.ok(parents['#catalog'].at(-1).includes('id="advisoryPlannerNav"'));
  assert.equal(parents['#catalog/'+c.D[0].id].length,parents['#catalog'].length+1);
  assert.doesNotMatch(nav.innerHTML,/Advisory catalog|Advisory Domains|All advisory domains|gate-tag/);
  assert.match(nav.innerHTML,/>Domains<\/a>/);assert.match(nav.innerHTML,/aria-controls="advisoryDomainNav" aria-expanded="true"/);
  c.ui.expanded={catalog:false};c.renderNav();assert.match(nav.innerHTML,/id="advisoryDomainNav" class="nav-children" hidden/);
  c.ui.expanded['advisory-planner']=false;c.ui.expanded['project-planner']=false;c.renderNav();assert.match(nav.innerHTML,/id="advisoryPlannerNav" class="nav-children" hidden/);assert.match(nav.innerHTML,/id="projectPlannerNav" class="nav-children" hidden/);
});
test('legacy routes, setup and child pages all resolve to the same global project',()=>{const c=context();for(const hash of ['#planner','#planner/new','#planner/overview','#planner/legacy-id/setup','#planner/another-id/workstreams?ws=WS-01','#planner/workstreams/PMO']){c.location.hash=hash;const route=c.parseRoute();assert.equal(route.id,project.id,hash);if(hash.endsWith('/new'))assert.equal(route.page,'setup');if(hash.includes('workstreams'))assert.equal(route.workstream,'WS-01');}assert.equal(c.projectURL('setup','different-project'),'#planner/setup');assert.equal(c.workstreamURL('WS-01','different-project'),'#planner/workstreams/PMO');});
test('planner recommendations honor the shared hospital type',()=>{const p={...project,hospitalType:'existing'},recommendations=E.recommendations(T,p,E.schedule(T,p),C);assert.ok(recommendations.length>0);assert.ok(recommendations.every(r=>r.product.fit.includes('existing')));});
test('configuration drafts retain the current Package selections',()=>{
  const createStore=require('../assets/single-project.js');
  const data=new Map(),store=createStore({catalog:C,createDefault:()=>({...project,selectedProducts:[],scenarios:[]}),storage:{getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)}});
  const selected=C[0].id;store.setSelections([selected]);
  class FormValues { constructor(form){this.fields=form.fields;}get(key){const value=this.fields[key];return Array.isArray(value)?value[0]??null:value??null;}getAll(key){const value=this.fields[key];return Array.isArray(value)?value:value===undefined?[]:[value];}has(key){return key in this.fields;} }
  const c={S:store,T,FormData:FormValues};vm.createContext(c);vm.runInContext(declaration('projectFromForm'),c);
  const draft=c.projectFromForm({dataset:{projectId:store.get().id},fields:{...project,openingBeds:250,name:'Configured hospital',location:'To be confirmed',capacityScale:'1000',handoverMode:'none',internationalHires:'no',hospitalType:'new'}});
  store.save(draft,'config');
  assert.equal(store.get().openingBeds,250);assert.deepEqual(store.get().selectedProducts,[selected]);assert.equal(store.get().id,project.id);
});

test('all navigation nodes use matching outline icons, with semantic domain and workstream symbols',()=>{
  const c=context(),nav={innerHTML:''};c.$=()=>nav;
  for(const name of ['paths','icon','domainIcons','workstreamIcons'])vm.runInContext(declaration(name),c);
  const start=source.indexOf('  const link =');vm.runInContext(source.slice(start,source.indexOf('  function saveUI()',start)),c);
  vm.runInContext('this.actualLink=link;this.iconPaths=paths;',c);c.renderNav();
  const links=[...nav.innerHTML.matchAll(/<a class="nav-item"[\s\S]*?<\/a>/g)].map(m=>m[0]);assert.equal(links.length,36);
  for(const html of links){assert.match(html,/<svg[^>]*fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/);assert.doesNotMatch(html,/advisory-tag|workstream-tag|gate-tag/);}
  assert.ok(c.actualLink('#catalog/finance','Finance','',false,'FIN').includes(c.iconPaths.finance));
  assert.ok(c.actualLink('#planner/workstreams/NURS','Nursing','',false,'','WS-10').includes(c.iconPaths.nursing));
  assert.match(c.actualLink('#planner/workstreams/NURS','Nursing','',false,'','WS-10'),/title="NURS · Nursing"/);
});
test('Accountable Role includes saved gate reviewers and shows clickable gate associations',()=>{
  const c=context(),p=JSON.parse(JSON.stringify(project));p.gates={'GATE-01':{reviews:[{decision:'pending',date:'2026-11-16',approver:'Independent Gate Reviewer',conditionOwner:'Gate Remediation Lead'}],criteria:{'GATE-01-C1':{owner:'Gate Evidence Lead'}}}};
  c.current=p;c.result=E.schedule(T,p);c.window.CCGates=require('../assets/gates-engine.js')(require('../data/gates.js'),E);
  const gateSource=fs.readFileSync('assets/gates-ui.js','utf8'),start=gateSource.indexOf('  const tag='),end=gateSource.indexOf('  function readExpanded()',start);
  vm.runInContext('window.CCGatesUI=(function(){'+gateSource.slice(start,end)+'return {button};})();',c);
  const gates=c.window.CCGates.list(p,c.result,C),html=c.accountableRolesHTML();
  assert.match(html,/<th>Accountable Role<\/th>/);assert.match(html,/<th>Gates<\/th>/);
  assert.equal((html.match(/class="accountable-profile"/g)||[]).length,c.window.CCAccountableRoles.entries(gates).length);
  for(const name of ['Independent Gate Reviewer','Gate Remediation Lead','Gate Evidence Lead']){const row=html.split('</tr>').find(row=>row.includes('<strong>'+name+'</strong>'));assert.ok(row,name);assert.match(row,/data-gate-open="GATE-01"/);assert.match(row,/class="gate-tag"/);}
});
