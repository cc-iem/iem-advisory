/* Illustrative hospital massing. Geometry is deliberately schematic, not a design standard. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HospitalModel = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  const scaleName = scale => scale >= 10000 ? 'Hospital campus' : scale >= 3000 ? 'Large hospital' : 'Hospital';
  function buildGeometry(project) {
    const total = clamp(Number(project.totalBeds) || 300, 1, 10000);
    const opening = clamp(Number(project.openingBeds) || 1, 1, total);
    const departments = clamp(Number(project.departmentCount) || 8, 1, 100);
    const scale = Math.max(Number(project.capacityScale) || 1000, total > 3000 ? 10000 : total > 1000 ? 3000 : 1000);
    const services = new Set(project.departments || []);
    const segments = [], blocks = [], elements = [];
    let owner = '';
    const element = (id, name, anchor) => { owner = id; elements.push({id, name, anchor}); };
    const line = (a, b, opacity = 1) => segments.push({a, b, opacity, id: owner});
    function box(id, name, x, z, w, d, h, base = 0, opacity = 1, floors = 1, openingRatio = 1) {
      element(id, name, [x,base+h,z]);
      blocks.push({id, name, x, z, w, d, h, base});
      const ring = y => [[x-w/2,y,z-d/2],[x+w/2,y,z-d/2],[x+w/2,y,z+d/2],[x-w/2,y,z+d/2]];
      const bottom = ring(base), top = ring(base+h);
      for (let i=0;i<4;i++) {
        line(bottom[i],bottom[(i+1)%4],opacity*.65);
        line(bottom[i],top[i],opacity);
        line(top[i],top[(i+1)%4],opacity);
      }
      for (let f=1;f<floors;f++) {
        const r=ring(base+h*f/floors), alpha=.22+clamp(openingRatio*floors-(f-1),0,1)*opacity*.53;
        for (let i=0;i<4;i++) line(r[i],r[(i+1)%4],alpha);
      }
      const divisions=Math.min(10,Math.max(2,Math.round(w/2)));
      for(let i=1;i<divisions;i++) for(const face of [-1,1]) {
        const xx=x-w/2+w*i/divisions;
        line([xx,base,z+face*d/2],[xx,base+h,z+face*d/2],opacity*.28);
      }
    }
    const towers=Math.min(6,Math.max(1,Math.ceil(total/600)));
    const towerWidth=6+Math.sqrt(total/towers)*.16;
    const towerDepth=5+Math.sqrt(total/towers)*.08;
    const spread=scale>=10000?1.5:scale>=3000?1.22:1;
    const width=Math.max(15+Math.sqrt(departments)*2,Math.min(3,towers)*(towerWidth+2))*spread;
    const podiumDepth=(towers>3?22:14)*(.8+.25*Math.sqrt(opening/300))*spread;
    box('podium','Clinical podium',0,0,width,podiumDepth,3.2,0,1,2);
    const height=Math.min(34,(2+total/(towers*45))*1.35);
    const floors=Math.min(22,Math.max(3,Math.ceil(total/(towers*45))));
    for(let i=0;i<(services.has('inpatient')?towers:0);i++) {
      const col=i%3,row=Math.floor(i/3),cols=Math.min(3,towers);
      const x=(col-(cols-1)/2)*(towerWidth+2)*spread,z=(row-(towers>3?.5:0))*(towerDepth+2);
      box('inpatient-'+i,'Inpatient tower '+(i+1),x,z,towerWidth,towerDepth,height,3.2,.65,floors,opening/total);
      box('opening-'+i,'Opening inpatient capacity · '+Math.round(opening/towers)+' beds',x,z,towerWidth*.94,towerDepth*.94,height*opening/total,3.2,1,1);
    }
    const wingSize=.7+.4*Math.sqrt(opening/300);
    const wings=[
      ['outpatient','Outpatient',-width/2-4*wingSize,0,8,10,4.5],
      ['emergency','Emergency',width/2+4*wingSize,0,8,10,3.5],
      ['surgery','Surgery',-6,-podiumDepth/2-4*wingSize,10,8,4],
      ['imaging','Imaging',5,-podiumDepth/2-4*wingSize,10,8,3.2],
      ['laboratory','Laboratory',-7,podiumDepth/2+4*wingSize,8,8,3.6],
      ['pharmacy','Pharmacy',3,podiumDepth/2+4*wingSize,10,8,3.2],
      ['icu','Critical care',width/2+4*wingSize,-9*wingSize,8,8,5.5],
    ];
    for(const [id,name,x,z,w,d,h] of wings) if(services.has(id))
      box(id,name,x,z,w*wingSize,d*wingSize,h,0,.85,2);
    // Unspecified departments remain explicitly unnamed rather than inventing clinical services.
    const extra=Math.max(0,departments-services.size),cols=Math.min(8,Math.max(1,Math.ceil(Math.sqrt(extra))));
    for(let i=0;i<extra;i++) {
      const n=services.size+i+1;
      box('department-'+n,'Department '+n+' · scope to define',(i%cols-(cols-1)/2)*4.5,
        podiumDepth/2+12*wingSize+Math.floor(i/cols)*4.5,3.5,3.5,3,0,.85);
    }
    box('entrance','Main entrance',0,podiumDepth/2+2,5,4,1,2.4,.9);
    const crossY=1.6,front=podiumDepth/2+.01;
    element('hospital-sign','Hospital sign · '+(project.name||'New hospital'),[0,3,front]);
    line([-1,crossY,front],[1,crossY,front]);line([0,crossY-1,front],[0,crossY+1,front]);
    const extent=width/2+12*wingSize,back=-podiumDepth/2-10*wingSize;
    const forward=podiumDepth/2+Math.max(12*wingSize+Math.ceil(extra/cols)*4.5,12*wingSize);
    const reserve=scale>=10000?16:scale>=3000?8:0;
    if(reserve) {
      box('reserve',scaleName(scale)+' · expansion reserve',extent+reserve/2,0,reserve,18,1,0,.3);
    }
    element('site',scaleName(scale)+' · site boundary',[-extent,0,forward]);
    const site=[[-extent-3,0,back-3],[extent+reserve+3,0,back-3],[extent+reserve+3,0,forward+3],[-extent-3,0,forward+3]];
    for(let i=0;i<4;i++)line(site[i],site[(i+1)%4],.3);
    // Context markers are planning overlays, not additional hospital departments.
    element('location','Location · '+(project.location||'To be confirmed'),site[0]);
    line(site[0],[site[0][0],4,site[0][2]],.7);
    element('stage',({planning:'Planning / design',construction:'Under construction',activation:'Preparing to open'})[project.stage]||'Planning / design',[0,0,back-2]);
    const stage=project.stage==='construction'?2:project.stage==='activation'?3:1;
    for(let i=0;i<stage;i++)line([-3+i*3,0,back-2],[-3+i*3,stage*1.4,back-2],.8);
    const construction=project.constructionStatus||'under',constructionCount=construction==='design'?1:construction==='done'?3:2;
    element('construction-status','Construction · '+({design:'Design / not started',under:'Under construction',done:'Structure complete'})[construction],[-extent,2,back]);
    for(let i=0;i<constructionCount;i++)line([-extent,1+i,back],[-extent+4,1+i,back],.8);
    element('opening-approach',project.openingApproach==='phased'?'Phased opening · release reviews required':'Single opening',[extent,2,forward-6]);
    for(let i=0;i<(project.openingApproach==='phased'?3:1);i++)line([extent-3+i*1.5,0,forward-6],[extent-3+i*1.5,2+i*.5,forward-6],.8);
    const support=Number(project.postOpeningSupport??12);
    element('advisory-support',support?'Post-opening advisory support · '+support+' months':'Hospital-led after opening',[-extent,2,forward-6]);
    line([-extent,0,forward-6],[-extent,1+support/6,forward-6],.8);
    line([-extent,1+support/6,forward-6],[-extent+2+support/6,1+support/6,forward-6],.8);
    element('digital',project.systems==='new'?'Digital · new hospital systems':'Digital · existing group systems',[width/2,5,-podiumDepth/2]);
    const digitalLines=project.systems==='new'?2:1;
    for(let i=0;i<digitalLines;i++)line([-width/2,3.5+i*.6,-podiumDepth/2],[width/2,3.5+i*.6,-podiumDepth/2],.8);
    for(let i=0;i<clamp(+project.teams||1,1,4);i++)
      box('team-'+i,'Delivery team '+(i+1),-extent+2+i*3,forward,2,2,.8,0,.7);
    if(project.internationalHires)box('international','International physician hiring',extent,forward,4,3,2,0,.9);
    for(const [id,label,value,z] of [
      ['start','Planning start',project.startDate,back],
      ['target','Target opening',project.targetDate,forward],
      ['handover','Building handover',project.handoverDate,forward-3],
    ]) {
      element(id,label+' · '+(value||'No fixed date'),[extent+reserve+2,3,z]);
      const stamp=Date.parse(value),phase=Number.isFinite(stamp)?(stamp/86400000%365)/365:0;
      const x=extent+reserve+2;
      line([x,0,z],[x,3+phase*3,z],.65);
      line([x,3+phase*3,z],[x-2,3+phase*3,z],.65);
    }
    const points=segments.flatMap(s=>[s.a,s.b]);
    const min=[0,0,0].map((_,i)=>Math.min(...points.map(p=>p[i])));
    const max=[0,0,0].map((_,i)=>Math.max(...points.map(p=>p[i])));
    const center=min.map((n,i)=>(n+max[i])/2);
    const radius=Math.hypot(...max.map((n,i)=>(n-min[i])/2));
    // Partial fitting preserves visible growth instead of normalizing every plan to the same size.
    const viewRadius=22+radius*.48;
    return {segments,blocks,elements,center,radius,viewRadius,metrics:{total,opening,departments,services:services.size,towers,floors,scale}};
  }
  function changeFocus(previous, project, field) {
    if(!previous)return null;
    const added=(project.departments||[]).find(id=>!(previous.departments||[]).includes(id));
    const removed=(previous.departments||[]).find(id=>!(project.departments||[]).includes(id));
    if(field==='departments' && added)return {id:added==='inpatient'?'inpatient-0':added,detail:'Service added'};
    if(field==='departments' && removed)return {id:'podium',detail:removed+' service removed'};
    if(field==='departmentCount')return {id:project.departmentCount>previous.departmentCount?'department-'+project.departmentCount:'podium',detail:project.departmentCount+' departments planned'};
    const ids={openingBeds:'opening-0',totalBeds:'inpatient-0',capacityScale:'site',name:'hospital-sign',location:'location',stage:'stage',constructionStatus:'construction-status',openingApproach:'opening-approach',postOpeningSupport:'advisory-support',systems:'digital',teams:'team-'+(Math.max(1,project.teams)-1),internationalHires:project.internationalHires?'international':'team-0',startDate:'start',targetDate:'target',targetDays:'target',handoverMode:'handover',handoverDate:'handover',holidays:'target'};
    const details={openingBeds:project.openingBeds+' opening beds',totalBeds:project.totalBeds+' eventual beds',capacityScale:scaleName(project.capacityScale),teams:project.teams+' parallel delivery teams',internationalHires:project.internationalHires?'International hires included':'International hires excluded',targetDays:'Target opening updated',holidays:'Working calendar updated'};
    return {id:ids[field]||'site',detail:details[field]||'Plan updated'};
  }
  function projectPoint(point, camera, geometry, size) {
    const [x,y,z]=point.map((n,i)=>n-geometry.center[i]);
    const cy=Math.cos(camera.yaw), sy=Math.sin(camera.yaw);
    const cp=Math.cos(camera.pitch), sp=Math.sin(camera.pitch);
    const xx=x*cy-z*sy, zz=x*sy+z*cy;
    const yy=y*cp-zz*sp, depth=y*sp+zz*cp;
    const distance=(geometry.viewRadius||geometry.radius)*3.3;
    const denominator=distance-depth;
    if(denominator<.1) return null;
    const scale=Math.min(size.width,size.height)*1.7*camera.zoom/denominator;
    return {x:size.width/2+xx*scale+camera.panX,y:size.height*.53-yy*scale+camera.panY,depth};
  }
  function mount(host, initialProject, options = {}) {
    host.innerHTML = '<button class="model-expand" type="button" aria-label="Expand hospital preview" title="Expand hospital preview">‹ <span>Hospital preview</span></button><div class="model-panel"><header class="model-header"><div><p class="page-kicker">Live concept</p><h2>Your hospital in 3D</h2></div><button type="button" data-model="collapse" aria-label="Collapse hospital preview" title="Collapse hospital preview">›</button></header><p class="model-intro">Shape the plan. Watch your hospital take form.</p><div class="model-stage"><canvas tabindex="0" role="img" aria-label="Interactive 3D hospital. Drag to orbit, scroll to zoom. Arrow keys rotate, plus and minus zoom, Home resets, Space pauses rotation."></canvas><div class="model-focus" role="status" hidden><strong></strong><span></span></div><div class="model-compass"><button type="button" data-model="north" aria-label="Face north" title="Face north">N ↑</button></div><div class="model-view-controls"><button type="button" data-model="top" aria-label="Toggle top view" aria-pressed="false" title="Top / 3D view">3D</button><button type="button" data-model="reset" aria-label="Reset hospital view" title="Reset view">⌖</button></div><div class="model-zoom"><button type="button" data-model="in" aria-label="Zoom in">+</button><output aria-label="Model zoom">100%</output><button type="button" data-model="out" aria-label="Zoom out">−</button></div><button type="button" class="model-spin" data-model="spin" aria-label="Pause rotation" aria-pressed="true">Ⅱ <span>Auto rotate</span></button></div><div class="model-inspector"><label>Inspect an element<select aria-label="Inspect model element"></select></label></div><div class="model-statistics" aria-live="polite"></div><div class="model-legend"><span>━ Opening capacity</span><span class="model-future">━ Future capacity</span></div><p class="model-help">Drag to orbit · Scroll or pinch to zoom<br>Shift-drag to pan · Double-click to zoom</p><p class="model-disclaimer">Illustrative massing only. Capacity and services shape this concept; site markers show planning context; it is not an architectural design or a capacity validation.</p></div>';
    const canvas=host.querySelector('canvas'), ctx=canvas.getContext('2d');
    const q=s=>host.querySelector(s), abort=new AbortController(), signal=abort.signal;
    let geometry, previous=null, focus=null, screenLines=[], dragged=false, dragStart=null, camera={yaw:-.65,pitch:.4,zoom:1,panX:0,panY:0};
    let size={width:1,height:1}, frame=0, last=0, disposed=false, collapsed=false, visible=true;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let spinning=!motion.matches, holdUntil=0;
    const pointers=new Map();
    function draw() {
      if(!geometry||collapsed||disposed) return;
      ctx.clearRect(0,0,size.width,size.height);
      const lines=geometry.segments.map(s=>({a:projectPoint(s.a,camera,geometry,size),b:projectPoint(s.b,camera,geometry,size),opacity:s.opacity,id:s.id})).filter(s=>s.a&&s.b).sort((a,b)=>(a.a.depth+a.b.depth)-(b.a.depth+b.b.depth));
      screenLines=lines;
      for(const s of lines) {
        const depth=(s.a.depth+s.b.depth)/(2*geometry.radius);
        ctx.strokeStyle='rgba(255,255,255,'+(s.id===focus?.id?1:s.opacity*clamp(.85+depth*.2,.45,1))+')';
        ctx.lineWidth=s.id===focus?.id?2:s.opacity>.9?1.05:.65;
        ctx.beginPath();ctx.moveTo(s.a.x,s.a.y);ctx.lineTo(s.b.x,s.b.y);ctx.stroke();
      }
      const focused=geometry.elements.find(e=>e.id===focus?.id);
      const label=q('.model-focus');
      label.hidden=!focused;
      if(focused) {
        const anchor=projectPoint(focused.anchor,camera,geometry,size);
        if(anchor) {
          const x=clamp(anchor.x,8,Math.max(8,size.width-195)),y=clamp(anchor.y-70,50,Math.max(50,size.height-100));
          label.style.left=x+'px';label.style.top=y+'px';
          ctx.strokeStyle='#c4efff';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(anchor.x,anchor.y);ctx.lineTo(x+10,y+48);ctx.stroke();
          ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(anchor.x,anchor.y,3,0,Math.PI*2);ctx.fill();
        }
      }
      q('.model-zoom output').textContent=Math.round(camera.zoom*100)+'%';
      q('.model-compass button').style.transform='rotate('+(-camera.yaw*180/Math.PI)+'deg)';
      canvas.dataset.yaw=camera.yaw.toFixed(3);
    }
    function tick(now) {
      frame=0;
      if(disposed||collapsed||!visible||document.hidden||!spinning) return;
      if(last && now>holdUntil) camera.yaw+=(Math.min(now-last,50)/1000)*Math.PI/50;
      last=now;draw();frame=requestAnimationFrame(tick);
    }
    function animate() {
      cancelAnimationFrame(frame);frame=0;last=0;
      if(spinning&&!collapsed&&visible&&!document.hidden&&!disposed) frame=requestAnimationFrame(tick);
    }
    function syncSpin() {
      const button=q('[data-model="spin"]');
      button.setAttribute('aria-pressed',String(spinning));
      button.setAttribute('aria-label',spinning?'Pause rotation':'Resume rotation');
      button.innerHTML=(spinning?'Ⅱ':'▷')+' <span>Auto rotate</span>';
      animate();draw();
    }
    function interact() {holdUntil=performance.now()+2500;draw();}
    function zoom(factor) {camera.zoom=clamp(camera.zoom*factor,.5,2.4);interact();}
    function reset() {camera={yaw:-.65,pitch:.4,zoom:1,panX:0,panY:0};q('[data-model="top"]').setAttribute('aria-pressed','false');interact();}
    function selectElement(next) {
      focus=next && geometry.elements.some(e=>e.id===next.id)?next:next?{id:'podium',detail:next.detail}:null;
      const element=geometry.elements.find(e=>e.id===focus?.id);
      q('.model-focus strong').textContent=element?.name||'';
      q('.model-focus span').textContent=focus?.detail||'';
      q('.model-inspector select').value=focus?.id||'';
      host.dataset.focus=focus?.id||'';
      q('.model-focus').classList.remove('is-updated');
      void q('.model-focus').offsetWidth;
      q('.model-focus').classList.add('is-updated');
      draw();
    }
    function update(project, changed = {}) {
      geometry=buildGeometry(project);
      const selector=q('.model-inspector select');
      selector.replaceChildren(new Option('Labels hidden — select or click', ''),...geometry.elements.map(e=>new Option(e.name,e.id)));
      const m=geometry.metrics;
      q('.model-statistics').innerHTML='<div><strong>'+m.opening.toLocaleString()+'</strong><span>Opening beds</span></div><div><strong>'+m.total.toLocaleString()+'</strong><span>Eventual beds</span></div><div><strong>'+m.departments+'</strong><span>Departments</span></div><div><strong>'+m.services+'</strong><span>Services</span></div>';
      canvas.setAttribute('aria-label','Interactive 3D hospital: '+m.opening+' opening beds, '+m.total+' eventual beds, '+m.departments+' departments, '+m.services+' services. Drag to orbit, click an element to label it, scroll to zoom.');
      host.dataset.geometry=geometry.elements.map(e=>e.name).join(', ');
      selectElement(changeFocus(previous,project,changed.name));
      previous={...project,departments:[...(project.departments||[])]};
    }
    q('.model-inspector select').addEventListener('change',ev=>selectElement(ev.target.value?{id:ev.target.value,detail:'Selected element'}:null),{signal});
    canvas.addEventListener('click',ev=>{
      if(dragged)return;
      const rect=canvas.getBoundingClientRect(),x=ev.clientX-rect.left,y=ev.clientY-rect.top;
      let closest=null,distance=12;
      for(const s of screenLines) {
        const dx=s.b.x-s.a.x,dy=s.b.y-s.a.y;
        const t=clamp(((x-s.a.x)*dx+(y-s.a.y)*dy)/(dx*dx+dy*dy||1),0,1);
        const d=Math.hypot(x-s.a.x-t*dx,y-s.a.y-t*dy);
        if(d<distance){distance=d;closest=s;}
      }
      selectElement(closest?{id:closest.id,detail:'Selected element'}:null);
    },{signal});
    function setCollapsed(value) {
      collapsed=!!value;host.closest('.setup-shell').classList.toggle('model-collapsed',collapsed);
      q('.model-panel').hidden=collapsed;q('.model-expand').hidden=!collapsed;
      animate();if(!collapsed) resize();
    }
    function resize() {
      const rect=canvas.getBoundingClientRect();
      if(!rect.width||!rect.height) return;
      size={width:rect.width,height:rect.height};
      const dpr=Math.min(devicePixelRatio||1,2);
      canvas.width=Math.round(size.width*dpr);canvas.height=Math.round(size.height*dpr);
      ctx.setTransform(dpr,0,0,dpr,0,0);draw();
    }
    host.addEventListener('click',ev=>{
      const button=ev.target.closest('button');if(!button) return;
      if(button.matches('.model-expand')||button.dataset.model==='collapse') {
        options.onToggle?.(!collapsed);return;
      }
      switch(button.dataset.model) {
        case 'in':zoom(1.2);break;case 'out':zoom(1/1.2);break;
        case 'reset':reset();break;
        case 'north':camera.yaw=0;interact();break;
        case 'spin':spinning=!spinning;syncSpin();break;
        case 'top': {
          const top=button.getAttribute('aria-pressed')!=='true';
          camera.pitch=top?Math.PI/2-.01:.4;
          button.setAttribute('aria-pressed',String(top));interact();break;
        }
      }
    },{signal});
    canvas.addEventListener('wheel',ev=>{ev.preventDefault();zoom(Math.exp(-ev.deltaY*.0015));},{passive:false,signal});
    canvas.addEventListener('dblclick',()=>zoom(1.3),{signal});
    canvas.addEventListener('contextmenu',ev=>ev.preventDefault(),{signal});
    canvas.addEventListener('pointerdown',ev=>{
      dragged=false;dragStart={x:ev.clientX,y:ev.clientY};
      canvas.focus();canvas.setPointerCapture(ev.pointerId);
      pointers.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});canvas.classList.add('is-dragging');holdUntil=Infinity;
    },{signal});
    canvas.addEventListener('pointermove',ev=>{
      if(!pointers.has(ev.pointerId)) return;
      if(dragStart&&Math.hypot(ev.clientX-dragStart.x,ev.clientY-dragStart.y)>4)dragged=true;
      const previous=[...pointers.values()], old=pointers.get(ev.pointerId);
      pointers.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});
      if(pointers.size===2) {
        dragged=true;
        const next=[...pointers.values()];
        const distance=p=>Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y);
        camera.zoom=clamp(camera.zoom*distance(next)/Math.max(1,distance(previous)),.5,2.4);
        camera.panX+=(ev.clientX-old.x)/2;camera.panY+=(ev.clientY-old.y)/2;
      } else if(ev.shiftKey||ev.buttons===2) {
        camera.panX+=ev.clientX-old.x;camera.panY+=ev.clientY-old.y;
      } else {
        camera.yaw+=(ev.clientX-old.x)*.009;
        camera.pitch=clamp(camera.pitch+(ev.clientY-old.y)*.006,-.2,Math.PI/2-.01);
        q('[data-model="top"]').setAttribute('aria-pressed','false');
      }
      draw();
    },{signal});
    const endPointer=ev=>{pointers.delete(ev.pointerId);if(!pointers.size){canvas.classList.remove('is-dragging');holdUntil=performance.now()+2500;}};
    canvas.addEventListener('pointerup',endPointer,{signal});canvas.addEventListener('pointercancel',endPointer,{signal});
    canvas.addEventListener('keydown',ev=>{
      const keys=['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home',' '];
      if(!keys.includes(ev.key))return;ev.preventDefault();
      if(ev.key==='ArrowLeft')camera.yaw-=.12;
      if(ev.key==='ArrowRight')camera.yaw+=.12;
      if(ev.key==='ArrowUp')camera.pitch=clamp(camera.pitch+.1,-.2,Math.PI/2-.01);
      if(ev.key==='ArrowDown')camera.pitch=clamp(camera.pitch-.1,-.2,Math.PI/2-.01);
      if(ev.key==='+'||ev.key==='=')zoom(1.2);
      if(ev.key==='-')zoom(1/1.2);
      if(ev.key==='Home')reset();
      if(ev.key===' '){spinning=!spinning;syncSpin();}
      interact();
    },{signal});
    document.addEventListener('visibilitychange',animate,{signal});
    motion.addEventListener('change',()=>{spinning=!motion.matches;syncSpin();},{signal});
    const observer=new ResizeObserver(resize);observer.observe(canvas);
    const visibility=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;animate();});visibility.observe(canvas);
    update(initialProject);setCollapsed(options.collapsed);syncSpin();resize();
    return {update,setCollapsed,dispose(){disposed=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();abort.abort();pointers.clear();}};
  }
  return {buildGeometry,projectPoint,changeFocus,mount};
});
