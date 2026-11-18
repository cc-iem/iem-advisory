(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory;
  else root.CCAccountableRoles=factory(root.CC_GREENFIELD);
})(typeof window==='undefined'?globalThis:window,function(T){
  'use strict';
  const departments=['Program Management Office','Strategy & Business Development','Finance','Regulatory & Compliance','Facilities & Construction','Biomedical Engineering','Information Technology','Clinical Operations','Medical Staff','Nursing','Clinical Support Services','Quality & Patient Safety','Human Resource','Education & Training','Supply Chain','Support Services & Facilities','Marketing & Patient Access','Activation & Readiness'];
  const department=id=>departments[T.workstreams.findIndex(w=>w.id===id)]||'Hospital Operations';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function display(role){return role.split(/(\s+)/).map((word,index)=>/[A-Z]/.test(word)||index&&/^(and|of|the|&)$/.test(word)?word:word.charAt(0).toUpperCase()+word.slice(1)).join('');}
  function initials(role){
    const words=role.split(/[^\w]+/).filter(w=>w&&!/^(hospital|owner|advisory|team|and|of|the|group)$/i.test(w));
    return words.find(w=>/^[A-Z]{2,4}$/.test(w))||words.slice(0,4).map(w=>w[0].toUpperCase()).join('')||'HR';
  }
  function profile(role,ids){
    const companies=[...new Set((Array.isArray(ids)?ids:[ids]).map(department))];
    return '<div class="accountable-profile" data-domain-plain="true"><span class="role-avatar" aria-hidden="true">'+esc(initials(role))+'</span><div><strong>'+esc(display(role))+'</strong><span class="role-company">'+esc(companies.join(' · '))+'</span></div></div>';
  }
  function entries(gates=[]){
    const roles=new Map();
    function add(role,workstream,task,gate){
      if(typeof role!=='string'||!role.trim())return;
      const key=role.trim().toLowerCase();if(!roles.has(key))roles.set(key,{role:role.trim(),workstreams:new Set(),activities:new Set(),gates:new Set()});
      const entry=roles.get(key);if(workstream)entry.workstreams.add(workstream);if(task)entry.activities.add(task);if(gate)entry.gates.add(gate);
    }
    T.workstreams.forEach(w=>add(w.owner,w.id));T.tasks.forEach(t=>add(t.owner,t.workstream,t.id));
    gates.forEach(g=>{
      const home=g.sources?.[0]?.workstream||'WS-18';
      [g.owner,g.accountableRole,g.decisionAuthority,g.advisoryReviewer].forEach(role=>add(role,home,null,g.id));
      (g.relatedTasks||g.sources||[]).forEach(t=>{add(t.owner,t.workstream,t.id,g.id);add(t.state?.owner,t.workstream,t.id,g.id);});
      (g.record?.reviews||[]).forEach(r=>{add(r.approver,home,null,g.id);add(r.conditionOwner,home,null,g.id);});
      (g.criteria||[]).forEach(c=>add(c.owner,home,null,g.id));
    });
    return [...roles.values()].map(r=>({role:r.role,workstreams:[...r.workstreams],activities:[...r.activities],gates:[...r.gates]})).sort((a,b)=>display(a.role).localeCompare(display(b.role)));
  }
  return {department,display,initials,profile,entries};
});
