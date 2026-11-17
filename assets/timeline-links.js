/* Show only the direct relationships of a selected or open activity. */
(function(){
  'use strict';
  const graph=window.CCActivityGraph,views=window.CCPlannerViews;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let selected=null,opened=null,selectedGate=null,openedGate=null,tasks=[],gates=[],generation=0,queued=false,nextChart=0;
  const watched=new Set();
  const resize=new ResizeObserver(()=>queue());
  function load(){const project=window.CCProject.get(),result=window.HospitalEngine.schedule(window.CC_GREENFIELD,project);tasks=result.tasks;gates=window.CCGates?.list(project,result,window.CC_CATALOG)||[];generation++;}
  function focus(){return opened||openedGate||selectedGate||selected;}
  function select(id){selectedGate=null;selected=selected===id?null:id;queue();}
  function selectGate(id){selected=null;selectedGate=selectedGate===id?null:id;queue();}
  function show(id){opened=id;queue();}
  function close(){opened=null;queue();}
  function expand(button){
    const chart=button.closest('.gantt'),id=button.dataset.timelineExpand;
    const existing=chart.querySelector('[data-timeline-expanded="'+id+'"]');
    if(existing){existing.remove();button.setAttribute('aria-expanded','false');button.textContent='Show activities ('+tasks.filter(t=>t.workstream===id).length+')';}
    else{
      const rows=document.createElement('div');rows.dataset.timelineExpanded=id;
      rows.innerHTML=views.timelineRows(tasks.filter(t=>t.workstream===id).map(t=>t.id),{origin:chart.dataset.timelineOrigin,end:chart.dataset.timelineEnd},false);
      button.closest('[data-workstream-row]').after(rows);button.setAttribute('aria-expanded','true');button.textContent='Hide activities';
    }
    delete chart.dataset.relationRevision;queue();
  }
  function geometry(chart,id){
    const row=chart.querySelector('[data-timeline-activity="'+id+'"]'),track=row?.querySelector('.gantt-track'),bar=row?.querySelector('.gantt-bar');
    if(!track||!bar)return null;
    const root=chart.getBoundingClientRect(),rect=track.getBoundingClientRect();
    const start=rect.left-root.left+bar.offsetLeft;
    if(bar.matches('.milestone'))return {start:start+bar.offsetWidth/2,finish:start+bar.offsetWidth/2,y:rect.top-root.top+bar.offsetTop+bar.offsetHeight/2};
    return {start,finish:start+bar.offsetWidth,y:rect.top-root.top+bar.offsetTop+bar.offsetHeight/2};
  }
  function draw(chart,links){
    let svg=chart.querySelector('.gantt-links');
    if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('gantt-links');chart.append(svg);}
    const width=Math.max(chart.clientWidth,chart.scrollWidth),height=Math.max(chart.clientHeight,chart.scrollHeight);
    if(!chart.dataset.linkId)chart.dataset.linkId='timeline-links-'+(++nextChart);
    const prefix=chart.dataset.linkId;
    const paths=(edges,role)=>edges.map(edge=>{
      const from=geometry(chart,edge.from),to=geometry(chart,edge.to);if(!from||!to)return '';
      const label=edge.predecessor.code+' → '+edge.successor.code+' · '+graph.describe(edge);
      return '<path class="gantt-link '+role+'" data-link-from="'+edge.from+'" data-link-to="'+edge.to+'" data-link-type="'+edge.type+'" d="'+graph.path(from,to,edge.type)+'" marker-end="url(#'+prefix+'-'+role+')"><title>'+esc(label)+'</title></path>';
    }).join('');
    const html='<defs>'+['incoming','outgoing'].map(role=>'<marker id="'+prefix+'-'+role+'" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M 0 0 L 8 4 L 0 8 Z" fill="'+(chart.dataset.gateFocus?'#a61b72':role==='incoming'?'#48c0e8':'#efac57')+'"/></marker>').join('')+'</defs>'+paths(links.prerequisites,'incoming')+paths(links.dependents,'outgoing');
    svg.setAttribute('width',width);svg.setAttribute('height',height);svg.setAttribute('viewBox','0 0 '+width+' '+height);
    svg.setAttribute('role','img');svg.setAttribute('aria-label',links.task.code+': '+links.prerequisites.length+' pre-requisite links flowing in; '+links.dependents.length+' dependency links flowing out.');
    if(svg.linkMarkup!==html){svg.innerHTML=html;svg.linkMarkup=html;}
  }
  function update(){
    queued=false;
    const charts=[...document.querySelectorAll('.gantt')];
    for(const chart of watched)if(!chart.isConnected){resize.unobserve(chart);watched.delete(chart);}
    const id=focus(),gate=gates.find(g=>g.id===id),links=gate?window.CCGates.links(gate,tasks,graph):graph.relations(tasks,id);
    charts.forEach(chart=>{
      if(!watched.has(chart)){watched.add(chart);resize.observe(chart);}
      chart.querySelectorAll('[data-timeline-select]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.timelineSelect===selected)));
      chart.querySelectorAll('[data-gate-select]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.gateSelect===selectedGate)));
      if(gate)chart.dataset.gateFocus=gate.id;else delete chart.dataset.gateFocus;
      chart.querySelectorAll('[data-relation-role]').forEach(row=>row.removeAttribute('data-relation-role'));
      if(!links.task){
        chart.querySelectorAll('.gantt-links, [data-timeline-context], .timeline-focus').forEach(node=>node.remove());
        delete chart.dataset.relationRevision;return;
      }
      if(!chart.getClientRects().length)return;
      const revision=id+'|'+generation;
      if(chart.dataset.relationRevision!==revision){
        chart.querySelector('[data-timeline-context]')?.remove();
        const ids=[...new Set(gate?[...gate.sourceIds,...links.prerequisites.flatMap(edge=>[edge.from,edge.to]),...links.dependents.flatMap(edge=>[edge.from,edge.to])]:[...links.prerequisites.map(edge=>edge.from),id,...links.dependents.map(edge=>edge.to)])];
        const missing=ids.filter(taskId=>!chart.querySelector('[data-timeline-activity="'+taskId+'"]'));
        if(missing.length){
          const context=document.createElement('div');context.dataset.timelineContext='true';
          context.innerHTML='<div class="timeline-context-heading">Relationship context <small>Activities outside the current view are included to show direct links.</small></div>'+views.timelineRows(missing,{origin:chart.dataset.timelineOrigin,end:chart.dataset.timelineEnd});
          chart.append(context);
        }
        chart.dataset.relationRevision=revision;
      }
      let legend=chart.querySelector('.timeline-focus');
      if(!legend){legend=document.createElement('div');legend.className='timeline-focus';chart.prepend(legend);}
      const html='<span>'+(gate?window.CCGatesUI.tag(gate):window.CCWorkstreamTags.activity(id,window.CCProject.get().id))+'</span><span class="timeline-link-key"><i class="incoming"></i>Pre-requisite → <i class="outgoing"></i>→ Dependency</span><span class="timeline-link-count">'+links.prerequisites.length+' in · '+links.dependents.length+' out'+(opened||openedGate?' · Open in profile':'')+(gate?' · Source milestone links; no added schedule constraints':'')+'</span>'+(!opened&&!openedGate?'<button type="button" data-timeline-clear>Clear selection</button>':'');
      if(legend.innerHTML!==html)legend.innerHTML=html;
      const roles=new Map([...links.prerequisites.map(edge=>[edge.from,'incoming']),...links.dependents.map(edge=>[edge.to,'outgoing']),[id,'focus']]);
      chart.querySelectorAll('[data-timeline-activity]').forEach(row=>{
        const role=roles.get(row.dataset.timelineActivity);if(role)row.dataset.relationRole=role;
      });
      draw(chart,links);
    });
  }
  function queue(){if(!queued){queued=true;requestAnimationFrame(update);}}
  document.addEventListener('click',ev=>{
    const tag=ev.target.closest('[data-timeline-select]'),gate=ev.target.closest('[data-gate-select]'),clear=ev.target.closest('[data-timeline-clear]'),toggle=ev.target.closest('[data-timeline-expand]');
    if(!tag&&!gate&&!clear&&!toggle)return;
    ev.preventDefault();ev.stopPropagation();
    if(toggle)expand(toggle);else if(tag)select(tag.dataset.timelineSelect);else if(gate)selectGate(gate.dataset.gateSelect);else{selected=null;selectedGate=null;queue();}
  },true);
  document.addEventListener('keydown',ev=>{
    if(ev.key==='Escape'&&(selected||selectedGate)&&!opened&&!openedGate){ev.preventDefault();ev.stopPropagation();selected=null;selectedGate=null;queue();}
  },true);
  window.addEventListener('advisory-activity-open',ev=>show(ev.detail.id));
  window.addEventListener('advisory-activity-close',close);
  window.addEventListener('advisory-gate-open',ev=>{openedGate=ev.detail.id;queue();});
  window.addEventListener('advisory-gate-close',()=>{openedGate=null;queue();});
  window.addEventListener('advisory-project-change',()=>{
    load();if(!tasks.some(t=>t.id===selected))selected=null;if(!tasks.some(t=>t.id===opened))opened=null;if(!gates.some(g=>g.id===selectedGate))selectedGate=null;if(!gates.some(g=>g.id===openedGate))openedGate=null;queue();
  });
  window.addEventListener('resize',queue);
  document.addEventListener('animationend',ev=>{if(ev.target.closest('.gantt'))queue();});
  new MutationObserver(records=>{
    if(records.some(record=>record.type==='attributes'?(record.target.matches('details, dialog, .panel, #planner, #finder, #portfolio, .model-panel')||!!record.target.querySelector('.gantt')):[...record.addedNodes,...record.removedNodes].some(node=>node.nodeType===1&&(node.matches('.gantt')||node.querySelector('.gantt')))))queue();
  }).observe(document.body,{childList:true,subtree:true,attributes:true,attributeFilter:['hidden','open']});
  load();queue();
  window.CCTimelineLinks={select,selectGate,show,close,focus,refresh:()=>{load();queue();}};
})();
