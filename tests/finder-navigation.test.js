const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const createStore=require('../assets/single-project.js'),createTags=require('../assets/domain-tags.js');
const data={window:{}};vm.createContext(data);
for(const f of ['data/products.js','data/expansion-products.js','data/finder.js','data/packages.js','data/domains.js','assets/engine.js'])vm.runInContext(fs.readFileSync(f,'utf8'),data);
const FINDER=data.window.CC_FINDER,E=data.window.CCEngine,CATALOG=data.window.CC_CATALOG;
const source=fs.readFileSync('assets/app.js','utf8');
function setup(type='new'){
  const tags=createTags(FINDER.domains,CATALOG);tags.setHospitalType(type);
  const S=createStore({catalog:CATALOG,createDefault:()=>({id:'plan',name:'Our hospital',hospitalType:type,departments:[],selectedProducts:[CATALOG[0].id],taskStates:{},scenarios:[],finder:{answers:{status:type},order:['status']}}),notify:ev=>tags.setHospitalType(ev.project.hospitalType)});
  const initial=E.prepareFinder(FINDER,type,S.get().finder),finderMain={innerHTML:''};
  const c={E,FINDER,CATALOG,DOMAINS:FINDER.domains,DOMAIN_BY_ID:Object.fromEntries(FINDER.domains.map(d=>[d.id,d])),BY_ID:Object.fromEntries(CATALOG.map(p=>[p.id,p])),STATUS_PLURAL:{new:'new hospitals',existing:'existing hospitals'},S,window:{CCDomainTags:tags},state:{answers:initial.answers,order:initial.order,finderCursor:initial.cursor},finderMain,reduceMotion:true,setTimeout:fn=>fn(),plural:(n,s,p)=>n+' '+(n===1?s:p),esc:s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),$all:()=>[]};
  vm.createContext(c);
  for(const name of ['saveFinder','currentStep','normalizeFinder','domainAnswers','goToFinderStep','answer','back','change','restart','another','recommendation','domainOptions','domainSolutionSquares','renderQuestion','renderSteps']){
    const start=source.indexOf('  function '+name+'('),end=source.indexOf('\n  function ',start+3);assert.ok(start>=0,name);vm.runInContext(source.slice(start,end),c);
  }
  c.renderFinder=()=>{};return c;
}
test('all four steps are enabled immediately and Recommendations works with only defaults',()=>{
  const c=setup();assert.equal(c.currentStep().type,'status');
  const buttons=Array.from({length:4},()=>({disabled:true,setAttribute(){},removeAttribute(){}}));
  c.$all=()=>buttons.map(button=>({classList:{toggle(){}},setAttribute(){},removeAttribute(){},button}));c.$=(s,li)=>li.button;c.renderSteps(c.currentStep());assert.ok(buttons.every(b=>!b.disabled));
  for(const [step,type] of [['result','result'],['needs','question'],['domain','domain'],['status','status']]){c.goToFinderStep(step);assert.equal(c.currentStep().type,type);}
  c.goToFinderStep('result');assert.ok(c.recommendation().top);assert.equal(c.S.get().finder.cursor,'result');assert.equal(c.S.get().finder.order.length,c.state.order.length);
});
test('every displayed question has exactly one default selected and domain squares match its eligible solutions',()=>{
  const c=setup();for(const target of ['status','domain','needs']){c.goToFinderStep(target);c.renderQuestion(c.currentStep());assert.equal((c.finderMain.innerHTML.match(/aria-pressed="true"/g)||[]).length,1,target);}
  c.goToFinderStep('status');c.renderQuestion(c.currentStep());assert.match(c.finderMain.innerHTML,/hospital-type-square hospital-type-new/);assert.match(c.finderMain.innerHTML,/hospital-type-square hospital-type-existing/);
  for(const type of ['new','existing'])for(const d of FINDER.domains){
    const ready=E.prepareFinder(FINDER,type,{answers:{status:type,domain:d.id}});
    for(const q of E.questionsFor(FINDER,type,d.id,ready.answers))if(E.optionsFor(q,type).length)assert.ok(E.chosenOption(q,type,ready.answers));
    const html=c.domainSolutionSquares(d.id,type),products=CATALOG.filter(p=>p.domain===d.id&&E.fits(p,type));
    assert.equal((html.match(/solution-square"/g)||[]).length,products.length);
    products.forEach(p=>assert.ok(html.includes(p.code+' · '),p.code));
  }
});
test('step jumps and Back retain choices; changing hospital type replaces only incompatible defaults',()=>{
  const c=setup(),priority=c.state.order[2],q=FINDER.questions[c.state.answers.domain][0],options=E.optionsFor(q,'new');
  const chosen=options.at(-1);c.answer(priority,chosen.id);assert.equal(c.recommendation().top.id,chosen.id);
  for(const target of ['status','domain','needs','result'])c.goToFinderStep(target);
  assert.equal(c.state.answers[priority],chosen.id);c.back();assert.equal(c.currentStep().q.id,priority);assert.equal(c.state.answers[priority],chosen.id);
  c.answer('status','existing');assert.equal(c.S.get().hospitalType,'existing');
  assert.deepEqual(JSON.parse(JSON.stringify(c.S.get().finder.answers)),JSON.parse(JSON.stringify(c.state.answers)));
  for(const question of E.questionsFor(FINDER,'existing',c.state.answers.domain,c.state.answers))if(E.optionsFor(question,'existing').length)assert.ok(E.chosenOption(question,'existing',c.state.answers));
});
test('domain changes and Start over supply new defaults while keeping the hospital and package',()=>{
  const c=setup(),packageBefore=c.S.get().selectedProducts;
  c.answer('domain','digital');assert.equal(c.state.answers.domain,'digital');assert.ok(c.state.answers['digital-priority']);assert.ok(!('strategy-priority' in c.state.answers));
  c.goToFinderStep('result');c.change('domain');assert.equal(c.currentStep().type,'domain');assert.equal(c.state.answers.domain,'digital');
  c.restart();assert.equal(c.currentStep().type,'status');assert.equal(c.state.answers.status,'new');assert.equal(c.state.answers.domain,FINDER.domains[0].id);assert.ok(c.state.answers[c.state.order[2]]);assert.deepEqual(c.S.get().selectedProducts,packageBefore);
  const reloaded=E.prepareFinder(FINDER,c.S.get().hospitalType,c.S.get().finder);assert.equal(reloaded.cursor,'status');
});
test('conditional question defaults unlock only the active branch and replace stale options',()=>{
  const f={domains:[{id:'d'}],questions:{d:[{id:'a',options:[{id:'one'},{id:'two'}]},{id:'b',when:{a:['one']},options:[{id:'new-only',status:['new']},{id:'both'}]},{id:'c',when:{a:['two']},options:[{id:'other'}]}]}};
  const first=E.prepareFinder(f,'new',{});assert.equal(first.answers.b,'new-only');assert.equal(first.answers.c,undefined);
  const edited=E.prepareFinder(f,'existing',{answers:{status:'existing',domain:'d',a:'one',b:'new-only'}});assert.equal(edited.answers.b,'both');
  const other=E.prepareFinder(f,'new',{answers:{status:'new',domain:'d',a:'two',b:'new-only'}});assert.equal(other.answers.b,undefined);assert.equal(other.answers.c,'other');
});
