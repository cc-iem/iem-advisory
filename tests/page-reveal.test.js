const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');

function element(bars=[]){
  const classes=new Set(),properties={};
  return {classes,properties,hidden:false,
    classList:{add:(...names)=>names.forEach(n=>classes.add(n)),remove:(...names)=>names.forEach(n=>classes.delete(n))},
    style:{width:'42%',setProperty:(k,v)=>properties[k]=v},parentElement:{closest:()=>null},
    closest(){return this.hidden?{}:null;},getClientRects:()=>[{}],
    querySelectorAll:()=>bars.filter(b=>!b.milestone)};
}
function setup({reduced=false,intersection=true}={}){
  const bar=element(),milestone={...element(),milestone:true},items=[element(),element(),element([bar,milestone])];
  const frames=[],observers=[],observed=[],unobserved=[],changes={};let mutations;
  const motion={matches:reduced,addEventListener:(event,fn)=>changes[event]=fn};
  const surface={closest:()=>null,getClientRects:()=>[{}],querySelectorAll:()=>items,contains:()=>false};
  const document={body:{},querySelectorAll:s=>s.startsWith('#top')?[surface]:[...items,bar].filter(e=>[...e.classes].some(c=>c.startsWith('enter-')))};
  class IntersectionObserver{constructor(fn){observers.push(fn);}observe(el){observed.push(el);}unobserve(el){unobserved.push(el);}}
  class MutationObserver{constructor(fn){mutations=fn;}observe(){}}
  const c={window:{matchMedia:()=>motion},document,MutationObserver,requestAnimationFrame:fn=>frames.push(fn),...(intersection?{IntersectionObserver}:{})};
  vm.createContext(c);vm.runInContext(fs.readFileSync('assets/page-reveal.js','utf8'),c);
  const flush=()=>{while(frames.length)frames.shift()();};flush();
  return {items,bar,milestone,motion,changes,observed,unobserved,flush,mutate:records=>mutations(records),intersect:elements=>observers[0](elements.map(target=>({target,isIntersecting:true})))};
}
test('visible text and rows reveal in sequence, while bars grow without changing schedule width',()=>{
  const s=setup();assert.equal(s.observed.length,3);assert.ok(s.items.every(e=>e.classes.has('enter-pending')));
  s.intersect(s.items);
  assert.deepEqual(s.items.map(e=>e.properties['--enter-delay']),['0ms','35ms','70ms']);
  assert.ok(s.items.every(e=>e.classes.has('enter-item')&&!e.classes.has('enter-pending')));
  assert.ok(s.bar.classes.has('enter-bar'));assert.equal(s.bar.properties['--enter-delay'],'160ms');
  assert.equal(s.bar.style.width,'42%');assert.ok(!s.milestone.classes.has('enter-bar'),'milestone diamonds keep their shape');
  s.mutate();s.flush();assert.equal(s.observed.length,3,'tag decoration does not replay existing rows');
});
test('newly revealed content animates and long lists have a bounded delay',()=>{
  const s=setup();const added=Array.from({length:20},()=>element());s.items.push(...added);s.mutate();s.flush();s.intersect(added);
  assert.equal(added[0].properties['--enter-delay'],'0ms');assert.equal(added.at(-1).properties['--enter-delay'],'315ms');
});
test('reduced motion shows content immediately and releases pending offscreen rows',()=>{
  const reduced=setup({reduced:true});assert.equal(reduced.observed.length,0);assert.ok(reduced.items.every(e=>e.classes.size===0));
  const s=setup();s.intersect([s.items[0]]);s.motion.matches=true;s.changes.change();
  assert.ok(s.items.every(e=>e.classes.size===0));assert.ok(!s.bar.classes.has('enter-bar'));
});
test('content still reveals when viewport observation is unavailable',()=>{
  const s=setup({intersection:false});assert.ok(s.items.every(e=>e.classes.has('enter-item')));assert.ok(s.items.every(e=>!e.classes.has('enter-pending')));
});
test('replacing an offscreen timeline releases its old pending animation targets',()=>{
  const s=setup(),old=s.items[2];
  old.nodeType=1;old.matches=selector=>selector==='.enter-pending';old.querySelectorAll=()=>[];
  s.mutate([{removedNodes:[old]}]);assert.ok(s.unobserved.includes(old));
});
