const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const graph=require('../assets/activity-graph.js');
const key=name=>name.replace(/^data-/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
function setup(withGates=false){
  const tasks=[{id:'a',code:'PMO-01',workstream:'w1',dependencies:[]},{id:'b',code:'NURS-01',workstream:'w2',dependencies:[{id:'a',type:'FS',lag:0}]},{id:'c',code:'NURS-02',workstream:'w2',dependencies:[{id:'b',type:'SS',lag:3}]},{id:'d',code:'FIN-01',workstream:'w3',dependencies:[]}];
  let main,summary;
  class Element{
    constructor(className=''){this.nodeType=1;this.dataset={};this.attrs={};this.children=[];this.className=className;this.isConnected=true;this.html='';this.clientWidth=500;this.scrollWidth=500;this.clientHeight=400;this.scrollHeight=400;this.offsetLeft=20;this.offsetWidth=30;this.offsetTop=15;this.offsetHeight=14;this.classList={add:c=>{this.className+=' '+c;}};}
    matches(selector){return selector.split(',').some(s=>{s=s.trim();const attr=s.match(/^\[([^=\]]+)(?:="([^"]+)")?\]$/);if(attr)return attr[2]?this.dataset[key(attr[1])]===attr[2]:key(attr[1]) in this.dataset;return s[0]==='.'&&this.className.split(' ').includes(s.slice(1));});}
    closest(s){return this.matches(s)?this:this.parentElement?.closest(s)||null;}
    querySelectorAll(s){return this.children.flatMap(child=>[...(child.matches(s)?[child]:[]),...child.querySelectorAll(s)]);}
    querySelector(s){return this.querySelectorAll(s)[0]||null;}
    append(node){node.parentElement=this;this.children.push(node);}
    prepend(node){node.parentElement=this;this.children.unshift(node);}
    after(node){node.parentElement=this.parentElement;const siblings=this.parentElement.children;siblings.splice(siblings.indexOf(this)+1,0,node);}
    remove(){this.parentElement.children=this.parentElement.children.filter(n=>n!==this);this.isConnected=false;}
    setAttribute(k,v){this.attrs[k]=String(v);if(k.startsWith('data-'))this.dataset[key(k)]=String(v);}
    removeAttribute(k){delete this.attrs[k];if(k.startsWith('data-'))delete this.dataset[key(k)];}
    getClientRects(){return [{}];}
    getBoundingClientRect(){const chart=this.closest('.gantt');const row=this.closest('[data-timeline-activity]');return {left:this.matches('.gantt-track')?100:0,top:row?50+chart.querySelectorAll('[data-timeline-activity]').indexOf(row)*45:0};}
    set innerHTML(html){this.html=html;if(html.includes('ROWS:')){this.children=[];html.split('ROWS:')[1].split(',').filter(Boolean).forEach(id=>this.append(row(id)));}}
    get innerHTML(){return this.html;}
  }
  function row(id){const node=new Element('gantt-row');node.dataset.timelineActivity=id;const label=new Element('gantt-label'),button=new Element('timeline-select');button.dataset.timelineSelect=id;label.append(button);node.append(label);const track=new Element('gantt-track'),bar=new Element('gantt-bar');bar.offsetLeft={a:10,b:60,c:100,d:150}[id];track.append(bar);node.append(track);return node;}
  function chart(ids){const chart=new Element('gantt');chart.dataset.timelineOrigin='2026-11-16';chart.dataset.timelineEnd='2028-11-16';ids.forEach(id=>chart.append(row(id)));return chart;}
  main=chart(['a','b','c','d']);summary=chart([]);
  const group=new Element('gantt-row group');group.dataset.workstreamRow='w2';const expand=new Element('timeline-expand');expand.dataset.timelineExpand='w2';group.append(expand);summary.append(group);
  const frames=[],events={},handlers={},observers=[];
  const window={CCActivityGraph:graph,CCPlannerViews:{timelineRows:ids=>'ROWS:'+ids.join(',')},HospitalEngine:{schedule:()=>({tasks})},CC_GREENFIELD:{},CCProject:{get:()=>({id:'plan'})},CCWorkstreamTags:{activity:id=>id},addEventListener:(name,fn)=>events[name]=fn};
  if(withGates){const G=require('../assets/gates-engine.js')([],require('../assets/planner-engine.js'));window.CCGates={list:()=>[{id:'GATE-01',code:'GATE-01',name:'Program authorized',sourceIds:['b']}],links:G.links};window.CCGatesUI={tag:g=>g.code,button:g=>'<button data-gate-open="'+g.id+'">'+g.code+'</button>'};}
  const document={body:new Element(),createElement:()=>new Element(),createElementNS:()=>new Element(),querySelectorAll:s=>[main,summary].filter(chart=>chart.matches(s)),addEventListener:(name,fn)=>handlers[name]=fn};
  class ResizeObserver{observe(){}unobserve(){}}
  class MutationObserver{constructor(fn){observers.push(fn);}observe(){}}
  const context={window,document,ResizeObserver,MutationObserver,requestAnimationFrame:fn=>frames.push(fn)};
  vm.createContext(context);vm.runInContext(fs.readFileSync('assets/timeline-links.js','utf8'),context);
  const flush=()=>{let guard=0;while(frames.length){assert.ok(guard++<20,'updates settle');frames.shift()();}};flush();
  function click(target){const ev={target,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};handlers.click(ev);flush();return ev;}
  return {api:window.CCTimelineLinks,main,summary,expand,events,handlers,observers,tasks,flush,click};
}
test('arrows stay hidden by default, then show only real incoming/outgoing edges of the selected activity',()=>{
  const s=setup();assert.equal(s.main.querySelector('.gantt-links'),null);
  const ev=s.click(s.main.querySelector('[data-timeline-select="b"]'));assert.equal(ev.stopped,true);assert.equal(ev.prevented,true);
  const svg=s.main.querySelector('.gantt-links');assert.match(svg.innerHTML,/data-link-from="a" data-link-to="b" data-link-type="FS"/);assert.match(svg.innerHTML,/data-link-from="b" data-link-to="c" data-link-type="SS"/);assert.doesNotMatch(svg.innerHTML,/data-link-(?:from|to)="d"/);
  assert.equal(s.main.querySelector('[data-timeline-select="b"]').attrs['aria-pressed'],'true');
  assert.equal(s.main.querySelector('[data-timeline-activity="b"]').dataset.relationRole,'focus');
  assert.match(s.summary.querySelector('.gantt-links').innerHTML,/data-link-from="a"/,'summary charts show the same real links');
  assert.equal(s.summary.querySelectorAll('[data-timeline-activity]').length,3,'missing cross-workstream endpoints are included');
  s.click(s.main.querySelector('[data-timeline-select="b"]'));assert.equal(s.main.querySelector('.gantt-links'),null);assert.equal(s.summary.querySelector('[data-timeline-context]'),null);
});
test('opening a profile shows its links and closing it restores only an explicit selection',()=>{
  const s=setup();s.events['advisory-activity-open']({detail:{id:'b'}});s.flush();assert.equal(s.api.focus(),'b');assert.ok(s.main.querySelector('.gantt-links'));
  s.events['advisory-activity-close']();s.flush();assert.equal(s.main.querySelector('.gantt-links'),null);
  s.api.select('a');s.events['advisory-activity-open']({detail:{id:'b'}});s.flush();assert.equal(s.api.focus(),'b');s.events['advisory-activity-close']();s.flush();assert.equal(s.api.focus(),'a');
});
test('summary timeline expansion exposes activity tags without opening a profile',()=>{
  const s=setup();s.click(s.expand);assert.equal(s.expand.attrs['aria-expanded'],'true');assert.equal(s.summary.querySelectorAll('[data-timeline-select]').length,2);
  s.click(s.summary.querySelector('[data-timeline-select="b"]'));assert.ok(s.summary.querySelector('.gantt-links'));assert.equal(s.summary.querySelectorAll('[data-timeline-activity="b"]').length,1);
  s.click(s.expand);assert.equal(s.expand.attrs['aria-expanded'],'false');assert.ok(s.summary.querySelector('.gantt-links'),'focused relationships remain available in context after collapse');
  s.api.select('b');s.flush();assert.equal(s.summary.querySelectorAll('[data-timeline-activity]').length,0);
});
test('schedule changes remove selection for excluded activities; Escape clears selection',()=>{
  const s=setup();s.api.select('b');s.flush();s.tasks.splice(s.tasks.findIndex(t=>t.id==='b'),1);s.events['advisory-project-change']();s.flush();assert.equal(s.api.focus(),null);assert.equal(s.main.querySelector('.gantt-links'),null);
  s.api.select('a');s.flush();const ev={key:'Escape',preventDefault(){},stopPropagation(){}};s.handlers.keydown(ev);s.flush();assert.equal(s.api.focus(),null);
});

test('gate selection and RHS profiles show only the mapped milestones original links',()=>{
  const s=setup(true);assert.equal(s.main.querySelector('.gantt-links'),null);
  s.api.selectGate('GATE-01');s.flush();assert.equal(s.api.focus(),'GATE-01');assert.equal(s.main.dataset.gateFocus,'GATE-01');
  const svg=s.main.querySelector('.gantt-links');assert.match(svg.innerHTML,/data-link-from="a" data-link-to="b" data-link-type="FS"/);assert.match(svg.innerHTML,/data-link-from="b" data-link-to="c" data-link-type="SS"/);assert.match(svg.innerHTML,/#a61b72/);assert.doesNotMatch(svg.innerHTML,/data-link-(?:from|to)="GATE-/,'no fabricated dependencies on composite gate objects');
  s.events['advisory-gate-open']({detail:{id:'GATE-01'}});s.flush();s.events['advisory-gate-close']();s.flush();assert.equal(s.api.focus(),'GATE-01');
  s.api.selectGate('GATE-01');s.flush();assert.equal(s.main.querySelector('.gantt-links'),null);
});
