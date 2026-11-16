const test=require('node:test'),assert=require('node:assert/strict');
const createTags=require('../assets/domain-tags.js');
const domains=[{id:'finance',code:'FIN',name:'Finance'},{id:'regulatory',code:'REG',name:'Regulatory'}];
const catalog=[{id:'a',code:'FIN-01',domain:'finance',fit:['new']},{id:'b',code:'FIN-02',domain:'finance',fit:['existing']},{id:'c',code:'REG-01',domain:'regulatory',fit:['new','existing']}];
const tags=createTags(domains,catalog);
test('all tags follow the selected hospital type while retaining actual eligibility metadata',()=>{
  for(const type of ['new','existing']){
    tags.setHospitalType(type);
    catalog.forEach(p=>{assert.match(tags.solution(p),new RegExp('tag-'+type));assert.match(tags.solution(p),new RegExp('data-hospital-fit="'+tags.fits(p.fit)+'"'));});
    assert.equal(tags.background(catalog[2].fit),type==='new'?'#287744':'#176393');
  }
});
test('generic and solution-specific domain tags share the selected project color',()=>{
  tags.setHospitalType('new');assert.match(tags.domain('finance'),/tag-new/);assert.match(tags.domain('finance',catalog[0]),/tag-new/);
  tags.setHospitalType('existing');assert.match(tags.domain('finance'),/tag-existing/);assert.match(tags.domain('finance',catalog[0]),/tag-existing/);
  assert.match(tags.code('FIN'),/>FIN</);assert.match(tags.domain('regulatory'),/REG/);
});
test('tag labels escape text and explain eligibility without relying on color',()=>{
  assert.match(tags.solution({code:'<unsafe>',fit:['new']}),/&lt;unsafe&gt;/);
  assert.match(tags.solution(catalog[2]),/New and existing hospitals/);
});
test('overlapping solution titles retain only their solution code in solution lists',()=>{
  const workstreams=[{id:'nursing',code:'NURS',name:'Nursing Practice & Operations'},{id:'support',code:'CSUP',name:'Clinical Support Services Readiness'}];
  const products=workstreams.map((w,i)=>({id:'solution-'+i,code:'CLIN-0'+(i+1),title:w.name,fit:['new'],domain:'clinical'}));
  const tagged=createTags([{id:'clinical',name:'Clinical Operations',code:'CLIN'}],products,workstreams);
  for(const p of products){
    const html=tagged.solutionLabel(p);
    assert.equal((html.match(/class="advisory-tag /g)||[]).length,1);
    assert.doesNotMatch(html,/workstream-tag/);
    assert.equal(tagged.resolveMention(p.title,{type:'solution',id:p.id}),null);
    assert.deepEqual(tagged.resolveMention(p.code,{type:'solution',id:p.id}),{type:'solution',id:p.id});
  }
  assert.equal(tagged.resolveMention('CLIN-02',{type:'solution',id:'solution-0'}),null);
  assert.equal(tagged.resolveMention('Clinical Operations',{type:'solution',id:'solution-0'}),null);
  assert.equal(tagged.resolveMention('Nursing Practice & Operations',{type:'workstream'}),null);
  assert.deepEqual(tagged.resolveMention('Nursing Practice & Operations'),{type:'workstream',id:'nursing'});
});
test('a suppressed contextual mention leaves its text node untouched for observer stability',()=>{
  const prior=global.document;let replacements=0;
  global.document={createDocumentFragment:()=>({append(){}}),createTextNode:text=>({text}),createElement:()=>({childNodes:[]})};
  try {
    const boundary={dataset:{tagContext:'solution',tagId:'a'}};
    const parent={closest:s=>s==='[data-tag-context]'?boundary:null};
    tags.decorate({nodeType:3,isConnected:true,parentElement:parent,nodeValue:'Finance',replaceWith(){replacements++;}});
    assert.equal(replacements,0,'MutationObserver must not repeatedly replace identical text');
  } finally {global.document=prior;}
});
test('changing hospital type recolors existing tags, tiles and selectors without changing eligibility',()=>{
  const tagged=createTags(domains,catalog);
  function node(classes=[]){const values=new Set(classes);return {values,classList:{remove:(...items)=>items.forEach(c=>values.delete(c)),add:(...items)=>items.forEach(c=>values.add(c))},dataset:{hospitalFit:'both'},style:{}};}
  const tag=node(['advisory-tag','tag-new']),tile=node(),select=Object.assign(node(),{value:'a',options:[],querySelectorAll:()=>[]});
  const scope={querySelectorAll:s=>s==='.advisory-tag'?[tag]:s==='.tile'?[tile]:[select]};
  tagged.setHospitalType('existing',scope);assert.ok(tag.values.has('tag-existing'));assert.ok(!tag.values.has('tag-new'));assert.equal(tile.style.background,'#176393');assert.ok(select.values.has('tag-existing'));assert.match(tag.title,/Existing hospital plan/);assert.match(tag.title,/New and existing hospitals/);
  tagged.setHospitalType('new',scope);assert.ok(tag.values.has('tag-new'));assert.equal(tile.style.background,'#287744');assert.ok(select.values.has('tag-new'));
});
