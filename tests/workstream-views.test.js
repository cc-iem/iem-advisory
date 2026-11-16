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
function context(){const context={T,C,E,result,current:project,route:{section:'planner',page:'workstreams',workstream:'WS-01'},ui:{workstreamViews:{},activityQueries:{}},pages:['overview','setup','workstreams','timeline','readiness'].map(k=>[k,k]),scopeDepth:0,D:JSON.parse(JSON.stringify(data.window.CC_DOMAINS)),S:{get:()=>project,selectedWorkstreams:()=>[]},location:{hash:'#planner/workstreams/PMO'},URLSearchParams,window:{CCWorkstreamTags:tags,CCDomainTags:require('../assets/domain-tags.js')(data.window.CC_DOMAINS,C)},ws:id=>T.workstreams.find(w=>w.id===id),today:()=> '2026-11-16',date:s=>s||'',esc:s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))};vm.createContext(context);for(const name of ['projectURL','workstreamURL','parseRoute','matchingTasks','workstreamViewToggle','workstreamContentHTML','workstreamActivitiesHTML','ganttHTML','connectionWorkstreamsHTML','workstreamPageHTML','workstreamSolutionsHTML','productButton','filtersHTML','head','button','overviewHTML','hospitalOverviewHTML','advisoryHTML','additionalSolutionsHTML','solutionMatrixHTML','notice','stat','workstreamTable','renderNav','navSection','withPlanScope'])vm.runInContext(declaration(name),context);return context;}
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
test('removed page URLs resolve to the merged Hospital Planner',()=>{
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
test('merged overview contains the hospital, solution selectors and backups under one page title',()=>{
  const c=context();c.domain=id=>c.D.find(d=>d.id===id);
  const html=c.overviewHTML();
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1);
  assert.match(html,/id="selectedSolutions"/);assert.match(html,/data-product-select=/);
  assert.match(html,/data-plan-action="export-json"/);assert.match(html,/data-plan-action="import"/);
  assert.doesNotMatch(html,/Scenarios & Exports|Save scenario/);
});
test('planner navigation pages are peers of Guided Finder with no plan title heading',()=>{
  const c=context(),nav={innerHTML:''};c.$=()=>nav;
  c.link=(href,label)=>'<a class="nav-item" href="'+href+'">'+label+'</a>';
  c.renderNav();
  assert.doesNotMatch(nav.innerHTML,/My Advisory Plan|My Hospital|Our hospital|Selected Solutions|Scenarios & Exports/);
  const stack=[],parents={};
  for(const match of nav.innerHTML.matchAll(/<\/?div\b[^>]*>|<a\b[^>]*href="([^"]+)"[^>]*>/g)){
    if(match[0].startsWith('</div'))stack.pop();
    else if(match[0].startsWith('<div'))stack.push(match[0]);
    else parents[match[1]]=stack.filter(tag=>!tag.includes('nav-link-row'));
  }
  for(const page of ['overview','setup','workstreams','timeline','readiness'])assert.deepEqual(parents['#planner/'+page],parents['#finder'],page+' is a peer of Guided Finder');
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
