const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');

function setup(){
  const calls=[],click=[],input=[],events={},hosts=[];
  const body={innerHTML:'',scrollTop:42},title={innerHTML:''},results={innerHTML:''};
  const buttons=['table','timeline'].map(view=>({dataset:{view},setAttribute(k,v){this[k]=v;}}));
  const panel={dataset:{},hidden:true,isConnected:true,nodeType:1,innerHTML:'',matches:()=>false,
    querySelector:s=>s==='.panel-body'?body:s==='#detailTitle'?title:results,
    querySelectorAll:s=>s==='.workstream-view-toggle button'?buttons:hosts};
  const views={body:(id,view)=>{views.lastBodyView=view;return '<section>'+id+'</section><input id="planSearch"><div id="workstreamResults"></div>';},content:(id,view)=>{views.lastContentView=view;return 'activities:'+id;},
    connections:(p,view)=>'<div>'+p.id+':'+view+'</div>',setView:(...a)=>calls.push(['view',...a]),setQuery:(...a)=>calls.push(['query',...a]),
    toggle:id=>calls.push(['toggle',id]),activity:(...a)=>calls.push(['activity',...a]),export:id=>calls.push(['export',id])};
  const window={CC_GREENFIELD:{workstreams:[{id:'WS-01',code:'PMO'},{id:'WS-02',code:'NURS'}]},CCPlannerViews:views,CC_CATALOG:[{id:'solution'}],
    CCProject:{get:()=>({id:'global-plan'})},CCWorkstreamTags:{html:(id,p)=>id+':'+p},
    CCApp:{profile(html){panel.innerHTML=html;panel.hidden=false;},close(){calls.push(['close']);}},
    addEventListener:(name,fn)=>events[name]=fn};
  const document={getElementById:()=>panel,addEventListener:(type,fn,capture)=>{if(type==='click')click.push({fn,capture});else if(type==='input')input.push(fn);}};
  const observers=[];class MutationObserver {constructor(fn){observers.push(fn);}observe(){}}
  const c={window,document,MutationObserver};vm.createContext(c);vm.runInContext(fs.readFileSync('assets/workstream-profiles.js','utf8'),c);
  function event(matches){const ev={target:{closest:s=>matches[s]||null},preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};click[0].fn(ev);return ev;}
  return {window,panel,body,title,results,buttons,calls,event,input,observers,events,click,hosts,views};
}
test('workstream profiles reuse the panel shell, global plan and uniquely named child controls',()=>{
  const s=setup();s.window.CCWorkstreamProfiles.open('NURS');
  assert.equal(s.panel.dataset.workstreamProfile,'WS-02');assert.match(s.panel.innerHTML,/panel-head/);assert.match(s.panel.innerHTML,/WS-02:global-plan/);
  assert.match(s.panel.innerHTML,/id="profilePlanSearch"/);assert.match(s.panel.innerHTML,/id="profileWorkstreamResults"/);
  assert.doesNotMatch(s.panel.innerHTML,/id="planSearch"|id="workstreamResults"/);assert.match(s.panel.innerHTML,/#planner\/workstreams\/NURS/);
});
test('profile controls route to their workstream before the underlying catalog handlers',()=>{
  const s=setup();s.window.CCWorkstreamProfiles.open('WS-02');assert.equal(s.click[0].capture,true);
  const profile=s.panel,action={dataset:{planAction:'workstream-view',view:'timeline'}};
  let ev=s.event({'#detailPanel[data-workstream-profile]':profile,'[data-plan-action],[data-profile-action]':action});
  assert.equal(ev.stopped,true);assert.equal(s.results.innerHTML,'activities:WS-02');assert.equal(s.views.lastContentView,'timeline');assert.equal(s.buttons[1]['aria-pressed'],'true');
  ev=s.event({'#detailPanel[data-workstream-profile]':profile,'[data-task]':{dataset:{task:'GF-101'}}});
  assert.equal(ev.stopped,true);assert.deepEqual(s.calls.pop(),['activity','GF-101','WS-02']);
  s.input[0]({target:{id:'profilePlanSearch',value:'competency'}});assert.deepEqual(s.calls.pop(),['query','WS-02','competency']);
  s.event({'#detailPanel[data-workstream-profile]':profile,'[data-plan-action],[data-profile-action]':{dataset:{profileAction:'export'}}});assert.deepEqual(s.calls.pop(),['export','WS-02']);
});
test('connection hosts default to Gantt, switch to Table and refresh with the shared plan',()=>{
  const s=setup(),host={dataset:{productConnections:'solution'},innerHTML:'',nodeType:1,isConnected:true,matches:()=>true,querySelectorAll:()=>[],querySelector:()=>({focus(){}})};
  s.observers[0]([{addedNodes:[host]}]);assert.match(host.innerHTML,/data-view="timeline" aria-pressed="true"/);assert.match(host.innerHTML,/solution:timeline/);
  const action={dataset:{view:'table'}};
  const ev=s.event({'[data-product-connections]':host,'[data-profile-action="connection-view"]':action});
  assert.equal(ev.stopped,true);assert.match(host.innerHTML,/data-view="table" aria-pressed="true"/);assert.match(host.innerHTML,/solution:table/);
  s.hosts.push(host);s.events['advisory-project-change']();assert.match(host.innerHTML,/solution:table/);
});
test('profile refresh preserves scroll, and opening the full page closes the panel',()=>{
  const s=setup();s.window.CCWorkstreamProfiles.open('PMO');s.events['advisory-project-change']();
  assert.equal(s.body.scrollTop,42);assert.match(s.body.innerHTML,/WS-01/);
  const ev=s.event({'#detailPanel[data-workstream-profile]':s.panel,'[data-full-workstream-page]':{}});
  assert.deepEqual(s.calls.pop(),['close']);assert.notEqual(ev.prevented,true,'native page link still navigates');
});
test('each RHS opens in Timeline and preserves an explicit Table choice only while open',()=>{
  const s=setup();s.window.CCWorkstreamProfiles.open('WS-01');assert.equal(s.views.lastBodyView,'timeline');
  s.event({'#detailPanel[data-workstream-profile]':s.panel,'[data-plan-action],[data-profile-action]':{dataset:{planAction:'workstream-view',view:'table'}}});
  assert.equal(s.views.lastContentView,'table');s.window.CCWorkstreamProfiles.refresh();assert.equal(s.views.lastBodyView,'table');
  s.window.CCWorkstreamProfiles.open('WS-02');assert.equal(s.views.lastBodyView,'timeline');
  assert.equal(s.calls.filter(c=>c[0]==='view').length,0,'RHS defaults do not overwrite full-page preferences');
});
