const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const data={window:{}};vm.createContext(data);
for(const f of ['data/products.js','data/expansion-products.js','data/finder.js','data/packages.js','data/domains.js','data/greenfield-template.js','data/workstream-solutions.js','data/workstream-codes.js'])vm.runInContext(fs.readFileSync(f,'utf8'),data);
const C=JSON.parse(JSON.stringify(data.window.CC_CATALOG)),D=JSON.parse(JSON.stringify(data.window.CC_DOMAINS)),T=JSON.parse(JSON.stringify(data.window.CC_GREENFIELD));
const source=fs.readFileSync('assets/app.js','utf8');
function setup(){
  const selected=[C[0].id,C[3].id],panel={innerHTML:'',body:{scrollTop:140}};
  const c={CATALOG:C,DOMAINS:D,BY_ID:Object.fromEntries(C.map(p=>[p.id,p])),FIT_LABEL:{new:'New hospital',existing:'Existing hospital'},state:{cart:selected.slice(),cartView:'list'},ICON:{close:'×'},window:{CCDomainTags:require('../assets/domain-tags.js')(D,C),CCWorkstreamTags:require('../assets/workstream-tags.js')(T)},esc:s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),plural:(n,s,p)=>n+' '+(n===1?s:p),S:{get:()=>({name:'Our hospital',selectedProducts:selected.slice()}),setSelections:ids=>{selected.splice(0,selected.length,...ids);}},$:s=>s==='#cartPanel'?panel:panel.body,toast(){}};
  c.rich=c.esc;c.saveCart=()=>c.S.setSelections(c.state.cart);c.refreshCartUI=()=>c.renderCart();
  vm.createContext(c);
  for(const name of ['solutionWorkstreamsHTML','solutionDomainSelection','solutionDomainOpen','toggleSolutionDomain','setSolutionDomain','solutionSelectionRowHTML','solutionGateTagsHTML','solutionDomainWorkstreamsHTML','solutionSelectionTableHTML','refreshSolutionActions','markersHTML','cartHead','renderCart','addToCart','removeFromCart']){
    const start=source.indexOf('  function '+name+'(');vm.runInContext(source.slice(start,source.indexOf('\n  }',start)+4),c);
  }
  c.inCart=id=>c.state.cart.includes(id);c.storageSet=()=>{};return {c,panel};
}
function rows(html){
  const result={};for(const match of html.matchAll(/<div class="selection-table-row"[^>]*data-solution-row="([^"]+)"[^>]*>/g)){
    let depth=0;for(const tag of html.slice(match.index).matchAll(/<\/?div\b[^>]*>/g)){
      depth+=tag[0].startsWith('</')?-1:1;if(!depth){result[match[1]]=html.slice(match.index,match.index+tag.index+tag[0].length);break;}
    }
  }return result;
}
const withoutHospitalFit=html=>html.replace(/<span class="marker marker-(?:new|existing)">.*?<\/span>/g,'');
test('Selected Solutions lists the complete catalog; Package has exactly the selected rows in the same layout',()=>{
  const {c,panel}=setup(),all=c.solutionSelectionTableHTML(C);c.renderCart();
  const full=rows(all),cart=rows(panel.innerHTML);
  assert.equal(Object.keys(full).length,63);assert.deepEqual(Object.keys(cart).sort(),c.state.cart.slice().sort());
  for(const id of c.state.cart)assert.equal(cart[id],withoutHospitalFit(full[id]),id+' row layout matches except omitted Package fit markers');
  assert.equal(panel.body.scrollTop,140);
  for(const p of C){const links=[...new Set(p.workstreamLinks.map(w=>w.id))].sort();const rendered=[...full[p.id].matchAll(/data-plan-action="open-workstream" data-workstream="([^"]+)"/g)].map(m=>m[1]).sort();assert.deepEqual(rendered,links,p.code);assert.match(full[p.id],/workstream-tag ws-/);assert.doesNotMatch(full[p.id],/workstream-mention/,'solution rows use code-only workstream links');}
});
test('Add and Remove update the one package and both shared table views',()=>{
  const {c,panel}=setup(),id=C[8].id;
  assert.match(rows(c.solutionSelectionTableHTML(C))[id],/data-action="add"/);
  c.addToCart(id);assert.ok(c.S.get().selectedProducts.includes(id));assert.match(rows(c.solutionSelectionTableHTML(C))[id],/data-action="remove"/);assert.ok(rows(panel.innerHTML)[id]);
  c.removeFromCart(id);assert.ok(!c.S.get().selectedProducts.includes(id));assert.ok(!rows(panel.innerHTML)[id]);assert.match(rows(c.solutionSelectionTableHTML(C))[id],/data-action="add"/);
  c.state.cart.slice().forEach(id=>c.removeFromCart(id));assert.match(panel.innerHTML,/package is empty/);assert.equal(Object.keys(rows(c.solutionSelectionTableHTML(C))).length,63,'clearing Package never removes available solutions');
});
test('selection updates preserve the page scroll and focus on the toggled solution',()=>{
  const {c}=setup(),top={scrollTop:760},row={dataset:{solutionRow:C[8].id}};let focused=false;
  const host={innerHTML:'',querySelector:()=>({focus:options=>{focused=options.preventScroll;}})};
  Object.assign(c,{C,document:{activeElement:{closest:()=>row}},window:{...c.window,CCApp:{solutionTable:c.solutionSelectionTableHTML}},$:s=>s==='#solutionSelectionList'?host:top});
  const workspace=fs.readFileSync('assets/workspace.js','utf8'),start=workspace.indexOf('  function refreshSolutionList(');vm.runInContext(workspace.slice(start,workspace.indexOf('\n  }',start)+4),c);
  c.refreshSolutionList();assert.equal(top.scrollTop,760);assert.equal(focused,true);assert.equal(Object.keys(rows(host.innerHTML)).length,63);
});
test('package toggles update existing action buttons without rebuilding the solution rows',()=>{
  const {c}=setup(),id=C[8].id,label={},row={dataset:{},querySelector:()=>label},button={dataset:{id},closest:()=>row,setAttribute(k,v){this[k]=v;}};
  c.$all=s=>s==='.solution-package-action'?[button]:[];c.refreshSolutionActions({});assert.equal(button.dataset.action,'add');
  c.addToCart(id);c.refreshSolutionActions({});assert.equal(button.dataset.action,'remove');assert.equal(button['aria-pressed'],'true');
  c.removeFromCart(id);c.refreshSolutionActions({});assert.equal(button.dataset.action,'add');assert.equal(button['aria-pressed'],'false');
});
test('Selected Solutions and Package reuse the catalog heatmaps with identical activity numbers and status colors',()=>{
  const {c,panel}=setup(),tags=c.window.CCWorkstreamTags,E=require('../assets/planner-engine.js');
  const project={id:'plan',name:'Hospital',openingBeds:100,totalBeds:300,departmentCount:8,departments:['inpatient'],startDate:'2026-11-16',targetDate:'2026-12-01',teams:1,systems:'enterprise',internationalHires:false,holidays:[],taskStates:{}};
  tags.setContext(project,E.schedule(T,project),'2026-11-16');tags.setActive(project.id);
  const full=rows(c.solutionSelectionTableHTML(C));c.renderCart();const cart=rows(panel.innerHTML);
  for(const p of C){
    const links=[...new Set(p.workstreamLinks.map(w=>w.id))];
    assert.equal((full[p.id].match(/class="workstream-heatmap"/g)||[]).length,links.length,p.code);
    for(const id of links){const heatmap=tags.heatmap(id);assert.ok(full[p.id].includes(heatmap));assert.ok(c.solutionWorkstreamsHTML(p).includes(heatmap));if(cart[p.id])assert.ok(cart[p.id].includes(heatmap));}
  }
  for(const id of c.state.cart)assert.equal(cart[id],withoutHospitalFit(full[id]));
});
test('domains group every solution once, collapse independently and remember expansion',()=>{
  const {c}=setup(),html=c.solutionSelectionTableHTML(C);
  assert.equal((html.match(/data-solution-domain=/g)||[]).length,10);assert.equal(Object.keys(rows(html)).length,63);
  const domain=D[0].id,body={hidden:true},group={dataset:{solutionDomain:domain,solutionContext:'solutions'},querySelector:()=>body};
  const button={expanded:'false',closest:()=>group,getAttribute(){return this.expanded;},setAttribute(k,v){this.expanded=v;}};
  c.toggleSolutionDomain(button);assert.equal(body.hidden,false);assert.equal(c.solutionDomainOpen(domain,'solutions'),true);
  assert.equal(c.solutionDomainOpen(domain,'package'),true,'Package defaults to expanded independently');
  c.toggleSolutionDomain(button);assert.equal(body.hidden,true);assert.equal(c.solutionDomainOpen(domain,'solutions'),false);
  const mainIDs=[...c.solutionSelectionTableHTML(C).matchAll(/id="([^"]+)-body"/g)].map(m=>m[1]);
  const packageIDs=[...c.solutionSelectionTableHTML(C,'package').matchAll(/id="([^"]+)-body"/g)].map(m=>m[1]);
  assert.equal(mainIDs.filter(id=>packageIDs.includes(id)).length,0,'main and RHS controls have unique IDs');
});
test('domain selection and clearing affect all solutions in that domain and preserve other domains',()=>{
  const {c}=setup(),domain=C[8].domain,ids=C.filter(p=>p.domain===domain).map(p=>p.id),outside=c.state.cart.filter(id=>!ids.includes(id));
  c.setSolutionDomain(domain,true);assert.equal(c.solutionDomainSelection(domain).status,'all');
  assert.match(c.solutionSelectionTableHTML(C),/class="btn btn-secondary btn-small domain-select-all" aria-pressed="true"[^>]*>− Remove domain<\/button>/);assert.ok(ids.every(id=>c.S.get().selectedProducts.includes(id)));assert.ok(outside.every(id=>c.S.get().selectedProducts.includes(id)));
  c.removeFromCart(ids[0]);assert.equal(c.solutionDomainSelection(domain).status,ids.length>1?'partial':'none');
  const controls={'.domain-selection-count':{},'.domain-select-all':{setAttribute(k,v){this[k]=v;}},'.domain-clear':{}};
  const group={dataset:{solutionDomain:domain},querySelector:s=>controls[s]};
  c.$all=s=>s==='[data-solution-domain]'?[group]:[];c.refreshSolutionActions({});
  assert.equal(controls['.domain-select-all'].textContent,'+ Add domain');
  assert.equal(controls['.domain-select-all']['aria-pressed'],ids.length>1?'mixed':'false');
  c.setSolutionDomain(domain,true);c.refreshSolutionActions({});
  assert.equal(controls['.domain-select-all'].textContent,'− Remove domain');
  assert.equal(controls['.domain-select-all']['aria-pressed'],'true');
  c.setSolutionDomain(domain,false);assert.equal(c.solutionDomainSelection(domain).status,'none');assert.deepEqual(c.S.get().selectedProducts.sort(),outside.sort());
});
test('rows and action labels clearly distinguish selected and unselected states',()=>{
  const {c}=setup(),id=C[8].id;let html=rows(c.solutionSelectionTableHTML(C))[id];
  assert.match(html,/data-selected="false"/);assert.match(html,/>Not selected<\/span>/);assert.match(html,/>\+ Add<\/button>/);
  c.addToCart(id);html=rows(c.solutionSelectionTableHTML(C))[id];
  assert.match(html,/data-selected="true"/);assert.match(html,/>✓ Selected<\/span>/);assert.match(html,/>− Remove<\/button>/);
});
test('Package omits hospital-fit labels and markers while keeping activity heatmaps and scope labels',()=>{
  const {c,panel}=setup(),p=C.find(p=>p.proposed);c.state.cart=[p.id];c.renderCart();
  assert.doesNotMatch(panel.innerHTML,/class="marker marker-(?:new|existing)"/);
  assert.match(panel.innerHTML,/class="workstream-heatmap"/);assert.match(panel.innerHTML,/Proposed scope/);
  assert.match(c.solutionSelectionTableHTML([p]),/class="marker marker-/,'full Selected Solutions retains eligibility labels');
});
test('domain previews contain every related workstream once using standard colored tags',()=>{
  const {c}=setup();for(const d of D){
    const products=C.filter(p=>p.domain===d.id),html=c.solutionDomainWorkstreamsHTML(products);
    const expected=[...new Set(products.flatMap(p=>p.workstreamLinks.map(w=>w.id)))].sort();
    assert.deepEqual([...html.matchAll(/data-workstream="([^"]+)"/g)].map(m=>m[1]).sort(),expected);
    for(const id of expected){
      const w=T.workstreams.find(w=>w.id===id);assert.ok(html.includes(c.window.CCWorkstreamTags.code(id)));
      assert.ok(html.includes('title="'+c.esc(w.name)+' · '),'full name is available on hover');
      assert.doesNotMatch(html,/workstream-mention/,'previews show codes without visible workstream names');
    }
  }
});
test('domain summaries and expanded solution rows show their own mapped gate columns',()=>{
  const {c,panel}=setup(),E=require('../assets/planner-engine.js');
  const G=require('../assets/gates-engine.js')(require('../data/gates.js'),E);
  const project={name:'Hospital',openingBeds:100,totalBeds:300,departmentCount:8,departments:['inpatient','outpatient','emergency','icu','surgery','imaging','laboratory','pharmacy'],startDate:'2026-11-16',targetDate:'2028-11-16',teams:1,systems:'enterprise',holidays:[],taskStates:{}};
  const gates=G.list(project,E.schedule(T,project),C);
  c.window.CCGatesUI={list:()=>gates,button:gate=>'<button data-gate-open="'+gate.id+'">'+gate.code+'</button>',coverage:()=>'',involvement:()=>''};
  const html=c.solutionSelectionTableHTML(C),rendered=rows(html);
  const gateIds=markup=>[...markup.matchAll(/data-gate-open="([^"]+)"/g)].map(match=>match[1]);
  assert.match(html,/<span role="columnheader">Workstreams<\/span><span role="columnheader">Gates<\/span>/);
  for(const domain of D){
    const group=html.split('<section class="solution-domain" data-solution-domain="'+domain.id+'"')[1];
    const header=group.split('<div class="solution-domain-body"')[0];
    assert.match(header,/domain-workstream-preview[\s\S]*selection-gates[\s\S]*solution-domain-controls/);
    assert.deepEqual(gateIds(header),gates.filter(g=>g.products.some(id=>c.BY_ID[id].domain===domain.id)).map(g=>g.id));
  }
  for(const p of C){
    assert.match(rendered[p.id],/selection-workstreams[\s\S]*selection-gates[\s\S]*selection-actions/);
    assert.deepEqual(gateIds(rendered[p.id]),gates.filter(g=>g.products.includes(p.id)).map(g=>g.id));
  }
  c.renderCart();
  for(const [id,row] of Object.entries(rows(panel.innerHTML)))assert.deepEqual(gateIds(row),gateIds(rendered[id]));
});
