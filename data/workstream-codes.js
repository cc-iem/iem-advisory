/* Display codes and editorial corrections preserve source IDs and dependency keys. */
(function(root){
  'use strict';
  const codes=['PMO','BSP','FIN','REG','BLD','EQP','DIG','COPS','MED','NURS','CSUP','SQPE','HRES','EDU','SCM','SUPP','MKT','ACT'];
  const corrections={
    '30 / 60 / 90-day post-opening reviews':'Post-opening reviews at 30, 60 and 90 days',
    'Go / No-Go decision':'Go / no-go decision',
    'hospital owner Program Director / Activation Lead named: one accountable owner for the opening':'Hospital owner program director / activation lead named: one accountable owner for the opening',
    'Market research and demand update for the the new hospital catchment':'Market research and demand update for the new hospital catchment',
    'Caregiver housing and transport for the the new hospital site':'Caregiver housing and transport for the new hospital site',
    'Phasing and ramp-up strategy with capacity triggers planned capacity':'Phasing and ramp-up strategy with planned capacity triggers',
    'Post-occupancy evaluation of facility design (input to phases planned capacity)':'Post-occupancy evaluation of facility design (input to planned capacity phases)',
    'Clinical training at advisory team delivered (observerships and preceptorships)':'Advisory clinical training delivered (observerships and preceptorships)',
    'Market teasing: introduce doctors and hospital strengths':'Market introduction: introduce doctors and hospital strengths',
    'Recruitment advisory response: agreed scope, effort, people and deliverable':'Recruitment advisory response: agreed scope, effort, people and deliverables',
    'Hospital Director appointed and on board':'Hospital director appointed and onboarded',
    'Day-in-the-Life simulation 1: department scenarios':'Day-in-the-life simulation 1: department scenarios',
    'Day-in-the-Life simulation 2: integrated, hospital-wide, including emergency codes':'Day-in-the-life simulation 2: integrated, hospital-wide, including emergency codes',
  };
  function title(name){
    let text=corrections[name]||name;
    text=text.replace(/\bGo \/ No-Go\b/g,'go / no-go').replace(/\bthe the\b/g,'the').replace(/\bre-baselined\b/g,'rebaselined');
    text=text.replace(/[A-Za-z][A-Za-z0-9]*/g,word=>/^[A-Z0-9]{2,}$/.test(word)?word:word.toLowerCase());
    return text.charAt(0).toUpperCase()+text.slice(1);
  }
  const T=root.CC_GREENFIELD,count={};
  T.workstreams.forEach((w,i)=>{w.code=codes[i];count[w.id]=0;});
  T.tasks.forEach(t=>{
    const w=T.workstreams.find(w=>w.id===t.workstream);
    t.code=w.code+'-'+String(++count[w.id]).padStart(2,'0');
    t.name=title(t.name);
  });
  (root.CC_CATALOG||[]).forEach(p=>(p.workstreamLinks||[]).forEach(w=>{w.activities=w.activities.map(title);}));
})(typeof window==='undefined'?globalThis:window);
