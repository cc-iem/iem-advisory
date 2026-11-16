const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const data={window:{}};vm.createContext(data);
for(const f of ['data/products.js','data/expansion-products.js','data/finder.js','data/packages.js','data/domains.js','data/greenfield-template.js','data/workstream-solutions.js','data/workstream-codes.js'])vm.runInContext(fs.readFileSync(f,'utf8'),data);
const C=JSON.parse(JSON.stringify(data.window.CC_CATALOG)),D=JSON.parse(JSON.stringify(data.window.CC_DOMAINS)),T=JSON.parse(JSON.stringify(data.window.CC_GREENFIELD));
const source=fs.readFileSync('assets/app.js','utf8');
function setup(){
  const selected=[C[0].id,C[3].id],panel={innerHTML:'',body:{scrollTop:140}};
  const c={DOMAINS:D,BY_ID:Object.fromEntries(C.map(p=>[p.id,p])),FIT_LABEL:{new:'New hospital',existing:'Existing hospital'},state:{cart:selected.slice(),cartView:'list'},ICON:{close:'×'},window:{CCDomainTags:require('../assets/domain-tags.js')(D,C),CCWorkstreamTags:require('../assets/workstream-tags.js')(T)},esc:s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])),plural:(n,s,p)=>n+' '+(n===1?s:p),S:{get:()=>({name:'Our hospital',selectedProducts:selected.slice()}),setSelections:ids=>{selected.splice(0,selected.length,...ids);}},$:s=>s==='#cartPanel'?panel:panel.body,toast(){}};
  c.rich=c.esc;c.saveCart=()=>c.S.setSelections(c.state.cart);c.refreshCartUI=()=>c.renderCart();
  vm.createContext(c);
  for(const name of ['solutionSelectionTableHTML','refreshSolutionActions','markersHTML','cartHead','renderCart','addToCart','removeFromCart']){
    const start=source.indexOf('  function '+name+'(');vm.runInContext(source.slice(start,source.indexOf('\n  }',start)+4),c);
  }
  c.inCart=id=>c.state.cart.includes(id);return {c,panel};
}
function rows(html){
  const result={};for(const match of html.matchAll(/<div class="selection-table-row"[^>]*data-solution-row="([^"]+)"[^>]*>/g)){
    let depth=0;for(const tag of html.slice(match.index).matchAll(/<\/?div\b[^>]*>/g)){
      depth+=tag[0].startsWith('</')?-1:1;if(!depth){result[match[1]]=html.slice(match.index,match.index+tag.index+tag[0].length);break;}
    }
  }return result;
}
test('Selected Solutions lists the complete catalog; Package has exactly the selected rows in the same layout',()=>{
  const {c,panel}=setup(),all=c.solutionSelectionTableHTML(C);c.renderCart();
  const full=rows(all),cart=rows(panel.innerHTML);
  assert.equal(Object.keys(full).length,63);assert.deepEqual(Object.keys(cart).sort(),c.state.cart.slice().sort());
  for(const id of c.state.cart)assert.equal(cart[id],full[id],id+' row layout matches exactly');
  assert.equal(panel.body.scrollTop,140);
  for(const p of C){const links=[...new Set(p.workstreamLinks.map(w=>w.id))].sort();const rendered=[...full[p.id].matchAll(/data-workstream="([^"]+)"/g)].map(m=>m[1]).sort();assert.deepEqual(rendered,links,p.code);assert.match(full[p.id],/workstream-tag ws-/);}
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
  const {c}=setup(),id=C[8].id,button={dataset:{id},setAttribute(k,v){this[k]=v;}};
  c.$all=()=>[button];c.refreshSolutionActions({});assert.equal(button.dataset.action,'add');
  c.addToCart(id);c.refreshSolutionActions({});assert.equal(button.dataset.action,'remove');assert.equal(button['aria-pressed'],'true');
  c.removeFromCart(id);c.refreshSolutionActions({});assert.equal(button.dataset.action,'add');assert.equal(button['aria-pressed'],'false');
});
