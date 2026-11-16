const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/workspace.js','utf8');
function setup(){
  class Node{
    constructor(className=''){this.className=className;this.dataset={};this.children=[];this.hidden=false;}
    matches(selector){return selector.split(',').some(part=>{part=part.trim();if(part.startsWith('.'))return this.className.split(' ').includes(part.slice(1));if(part.startsWith('#'))return this.id===part.slice(1);const m=part.match(/^\[([^=\]]+)(?:="([^"]+)")?\]$/);if(!m)return false;if(m[1]==='name')return this.name===m[2];const key=m[1].replace(/^data-/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase());return m[2]?this.dataset[key]===m[2]:key in this.dataset;});}
    closest(s){return this.matches(s)?this:this.parent?.closest(s)||null;}
    querySelectorAll(s){return this.children.flatMap(child=>[...(child.matches(s)?[child]:[]),...child.querySelectorAll(s)]);}
    querySelector(s){return this.querySelectorAll(s)[0]||null;}
    append(node){node.remove();node.parent=this;this.children.push(node);}
    before(node){node.remove();node.parent=this.parent;this.parent.children.splice(this.parent.children.indexOf(this),0,node);}
    remove(){if(this.parent)this.parent.children=this.parent.children.filter(child=>child!==this);this.parent=null;}
    setAttribute(){}
    set innerHTML(value){this.html=value;if(value.includes('data-setup-page-count')){const count=new Node();count.dataset.setupPageCount='';this.append(count);}}
  }
  const c={document:{createElement:()=>new Node()},esc:s=>s,setupCursor:'name'};vm.createContext(c);
  const first=source.indexOf('  const setupQuestions =');vm.runInContext(source.slice(first,source.indexOf('  function visibleSetupQuestions',first))+'\nthis.questions=setupQuestions;',c);
  const form=new Node(),section=new Node('setup-section');form.append(section);form.elements={};
  for(const [key] of c.questions){let control=new Node(key==='departments'?'service-options':'form-field');if(key==='handoverDate')control.id='handoverField';const input=new Node();input.name=key;input.value=key==='hospitalType'?'new':key==='handoverMode'?'none':'default-'+key;control.append(input);section.append(control);form.elements[key]=input;}
  c.$=(s,r=form)=>r.querySelector(s);c.$$=(s,r=form)=>r.querySelectorAll(s);
  for(const name of ['initializeSetupPages','setupPageState','renderSetupPage','visibleSetupQuestions']){const start=source.indexOf('  function '+name+'(');vm.runInContext(source.slice(start,source.indexOf('\n  }',start)+4),c);}
  return {c,form};
}
test('initialization preserves every control and renders one question page at a time',()=>{
  const {c,form}=setup(),original={...form.elements};c.initializeSetupPages(form);c.renderSetupPage(form);
  assert.equal(form.querySelectorAll('.setup-section').length,0);
  assert.equal(form.querySelectorAll('[data-setup-page]').filter(page=>!page.hidden).length,1);
  for(const [key,input] of Object.entries(original))assert.equal(form.querySelector('[name="'+key+'"]'),input,key+' live value is preserved');
  c.setupCursor='openingBeds';c.renderSetupPage(form);
  assert.equal(form.querySelectorAll('[data-setup-page]').find(page=>!page.hidden).dataset.setupPage,'openingBeds');assert.equal(form.elements.name.value,'default-name');
});
test('conditional handover and holiday questions participate only when applicable',()=>{
  const {c,form}=setup();c.initializeSetupPages(form);
  assert.ok(!c.setupPageState(form,'name').questions.some(([key])=>key==='holidays'||key==='handoverDate'));
  form.elements.hospitalType.value='existing';form.elements.handoverMode.value='set';
  const state=c.setupPageState(form,'handoverDate');assert.equal(state.key,'handoverDate');assert.ok(state.questions.some(([key])=>key==='holidays'));
  c.setupCursor='holidays';c.renderSetupPage(form);assert.equal(form.querySelectorAll('[data-setup-page]').filter(page=>!page.hidden).length,1);
});
