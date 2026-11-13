/* Illustrative hospital massing. Geometry is deliberately schematic, not a design standard. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.HospitalModel = api;
})(typeof window === 'undefined' ? globalThis : window, function () {
  'use strict';
  const clamp = (n, lo, hi) => Math.max(lo, Math.min(hi, n));
  function buildGeometry(project) {
    const total = clamp(Number(project.totalBeds) || 300, 1, 10000);
    const opening = clamp(Number(project.openingBeds) || 1, 1, total);
    const departments = clamp(Number(project.departmentCount) || 8, 1, 100);
    const services = new Set(project.departments || []);
    const segments = [], blocks = [];
    const line = (a, b, opacity = 1) => segments.push({ a, b, opacity });
    function box(name, x, z, w, d, h, base = 0, opacity = 1, floors = 1, openingRatio = 1) {
      blocks.push({ name, x, z, w, d, h, base });
      const ring = y => [[x-w/2,y,z-d/2],[x+w/2,y,z-d/2],[x+w/2,y,z+d/2],[x-w/2,y,z+d/2]];
      const bottom = ring(base), top = ring(base+h);
      for (let i=0; i<4; i++) {
        line(bottom[i],bottom[(i+1)%4],opacity*.65);
        line(bottom[i],top[i],opacity);
        line(top[i],top[(i+1)%4],opacity);
      }
      for (let f=1; f<floors; f++) {
        const r=ring(base+h*f/floors), alpha=.22+clamp(openingRatio*floors-(f-1),0,1)*opacity*.53;
        for (let i=0;i<4;i++) line(r[i],r[(i+1)%4],alpha);
      }
      // Vertical facade divisions give the white wireframe a recognizable hospital scale.
      const divisions = Math.min(10,Math.max(2,Math.round(w/2)));
      for(let i=1;i<divisions;i++) for(const face of [-1,1]) {
        const xx=x-w/2+w*i/divisions;
        line([xx,base,z+face*d/2],[xx,base+h,z+face*d/2],opacity*.28);
      }
    }
    const towers=Math.min(6,Math.max(1,Math.ceil(total/600)));
    const towerWidth=7+Math.sqrt(total/towers)*.09;
    const towerDepth=6+Math.sqrt(total/towers)*.04;
    const width = Math.max(15 + Math.sqrt(departments)*2, Math.min(3,towers)*(towerWidth+2));
    const podiumDepth=towers>3?22:14;
    box('Clinical podium',0,0,width,podiumDepth,3.2,0,1,2);
    const height=Math.max(3,total/(towers*45))*1.35;
    const floors=Math.min(22,Math.max(3,Math.ceil(total/(towers*45))));
    for(let i=0;i<(services.has('inpatient')?towers:0);i++) {
      const col=i%3, row=Math.floor(i/3), cols=Math.min(3,towers);
      box('Inpatient tower '+(i+1),(col-(cols-1)/2)*(towerWidth+2),(row-(towers>3?.5:0))*(towerDepth+2),
        towerWidth,towerDepth,Math.min(30,height),3.2,1,floors,opening/total);
    }
    const wings = [
      ['outpatient','Outpatient',-width/2-4,1,8,10,4.5],
      ['emergency','Emergency',width/2+4,1,8,10,3.5],
      ['surgery','Surgery',-6,-11,10,8,4],
      ['imaging','Imaging',5,-11,10,8,3.2],
      ['laboratory','Laboratory',-7,11,8,8,3.6],
      ['pharmacy','Pharmacy',3,11,10,8,3.2],
      ['icu','Critical care',width/2+4,-9,8,8,5.5],
    ];
    for(const [id,name,x,z,w,d,h] of wings) if(services.has(id)) box(name,x,z,w,d,h,0,.8,2);
    box('Entrance canopy',0,9,5,5,1,2.4,.9);
    // Hospital cross on the front facade.
    const crossY=1.6, front=podiumDepth/2+.01, cx=0;
    line([cx-1,crossY,front],[cx+1,crossY,front],1);
    line([cx,crossY-1,front],[cx,crossY+1,front],1);
    const points=segments.flatMap(s=>[s.a,s.b]);
    const min=[0,0,0].map((_,i)=>Math.min(...points.map(p=>p[i])));
    const max=[0,0,0].map((_,i)=>Math.max(...points.map(p=>p[i])));
    const center=min.map((n,i)=>(n+max[i])/2);
    const radius=Math.hypot(...max.map((n,i)=>(n-min[i])/2));
    return {segments,blocks,center,radius,metrics:{total,opening,departments,services:services.size,towers,floors}};
  }
  function projectPoint(point, camera, geometry, size) {
    const [x,y,z]=point.map((n,i)=>n-geometry.center[i]);
    const cy=Math.cos(camera.yaw), sy=Math.sin(camera.yaw);
    const cp=Math.cos(camera.pitch), sp=Math.sin(camera.pitch);
    const xx=x*cy-z*sy, zz=x*sy+z*cy;
    const yy=y*cp-zz*sp, depth=y*sp+zz*cp;
    const distance=geometry.radius*3.3/camera.zoom;
    const denominator=distance-depth;
    if(denominator<.1) return null;
    const scale=Math.min(size.width,size.height)*1.55/denominator;
    return {x:size.width/2+xx*scale+camera.panX,y:size.height*.53-yy*scale+camera.panY,depth};
  }
  function mount(host, initialProject, options = {}) {
    host.innerHTML = '<button class="model-expand" type="button" aria-label="Expand hospital preview" title="Expand hospital preview">‹ <span>Hospital preview</span></button><div class="model-panel"><header class="model-header"><div><p class="page-kicker">Live concept</p><h2>Your hospital in 3D</h2></div><button type="button" data-model="collapse" aria-label="Collapse hospital preview" title="Collapse hospital preview">›</button></header><p class="model-intro">Shape the plan. Watch your hospital take form.</p><div class="model-stage"><canvas tabindex="0" role="img" aria-label="Interactive 3D hospital. Drag to orbit, scroll to zoom. Arrow keys rotate, plus and minus zoom, Home resets, Space pauses rotation."></canvas><div class="model-compass"><button type="button" data-model="north" aria-label="Face north" title="Face north">N ↑</button></div><div class="model-view-controls"><button type="button" data-model="top" aria-label="Toggle top view" aria-pressed="false" title="Top / 3D view">3D</button><button type="button" data-model="reset" aria-label="Reset hospital view" title="Reset view">⌖</button></div><div class="model-zoom"><button type="button" data-model="in" aria-label="Zoom in">+</button><output aria-label="Model zoom">100%</output><button type="button" data-model="out" aria-label="Zoom out">−</button></div><button type="button" class="model-spin" data-model="spin" aria-label="Pause rotation" aria-pressed="true">Ⅱ <span>Auto rotate</span></button></div><div class="model-statistics" aria-live="polite"></div><div class="model-legend"><span>━ Opening capacity</span><span class="model-future">━ Future capacity</span></div><p class="model-help">Drag to orbit · Scroll or pinch to zoom<br>Shift-drag to pan · Double-click to zoom</p><p class="model-disclaimer">Illustrative massing only. Capacity and services shape this concept; it is not an architectural design or a capacity validation.</p></div>';
    const canvas=host.querySelector('canvas'), ctx=canvas.getContext('2d');
    const q=s=>host.querySelector(s), abort=new AbortController(), signal=abort.signal;
    let geometry, signature='', camera={yaw:-.65,pitch:.4,zoom:1,panX:0,panY:0};
    let size={width:1,height:1}, frame=0, last=0, disposed=false, collapsed=false, visible=true;
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    let spinning=!motion.matches, holdUntil=0;
    const pointers=new Map();
    function draw() {
      if(!geometry||collapsed||disposed) return;
      ctx.clearRect(0,0,size.width,size.height);
      const lines=geometry.segments.map(s=>({a:projectPoint(s.a,camera,geometry,size),b:projectPoint(s.b,camera,geometry,size),opacity:s.opacity})).filter(s=>s.a&&s.b).sort((a,b)=>(a.a.depth+a.b.depth)-(b.a.depth+b.b.depth));
      for(const s of lines) {
        const depth=(s.a.depth+s.b.depth)/(2*geometry.radius);
        ctx.strokeStyle='rgba(255,255,255,'+(s.opacity*clamp(.85+depth*.2,.45,1))+')';
        ctx.lineWidth=s.opacity>.9?1.05:.65;
        ctx.beginPath();ctx.moveTo(s.a.x,s.a.y);ctx.lineTo(s.b.x,s.b.y);ctx.stroke();
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
    function update(project) {
      const next=JSON.stringify([project.totalBeds,project.openingBeds,project.departmentCount,project.departments]);
      if(next!==signature) {geometry=buildGeometry(project);signature=next;}
      const m=geometry.metrics;
      q('.model-statistics').innerHTML='<div><strong>'+m.opening.toLocaleString()+'</strong><span>Opening beds</span></div><div><strong>'+m.total.toLocaleString()+'</strong><span>Eventual beds</span></div><div><strong>'+m.departments+'</strong><span>Departments</span></div><div><strong>'+m.services+'</strong><span>Services</span></div>';
      canvas.setAttribute('aria-label','Interactive 3D hospital: '+m.opening+' opening beds, '+m.total+' eventual beds, '+m.departments+' departments, '+m.services+' services. Drag to orbit, scroll to zoom. Arrow keys rotate, plus and minus zoom, Home resets, Space pauses rotation.');
      host.dataset.geometry=geometry.blocks.map(b=>b.name).join(', ');
      draw();
    }
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
      canvas.focus();canvas.setPointerCapture(ev.pointerId);
      pointers.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});canvas.classList.add('is-dragging');holdUntil=Infinity;
    },{signal});
    canvas.addEventListener('pointermove',ev=>{
      if(!pointers.has(ev.pointerId)) return;
      const previous=[...pointers.values()], old=pointers.get(ev.pointerId);
      pointers.set(ev.pointerId,{x:ev.clientX,y:ev.clientY});
      if(pointers.size===2) {
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
  return {buildGeometry,projectPoint,mount};
});
