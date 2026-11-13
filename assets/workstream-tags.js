(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory;
  else root.CCWorkstreamTags=factory(root.CC_GREENFIELD);
})(typeof window==='undefined'?globalThis:window,function(T){
  'use strict';
  const contexts=new Map();let active='';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function taskStatus(t,today){
    if(t.verified)return {color:'yellow',label:'Verified complete'};
    if(t.state?.status==='blocked'||t.finishDate<today)return {color:'red',label:t.state?.status==='blocked'?'Blocked':'Overdue'};
    if((t.targetSlack!==null&&t.targetSlack<0)||(t.startDate<today&&t.state?.status!=='in-progress'))return {color:'orange',label:'At risk'};
    return {color:'yellow',label:t.state?.status==='in-progress'?'In progress':'On track / not started'};
  }
  function status(id,projectId=active){
    const context=contexts.get(projectId);
    if(!context)return {color:'yellow',label:'Template · not assessed'};
    const task=context.result.tasks.find(t=>t.id===id);
    if(task)return taskStatus(task,context.today);
    const tasks=context.result.tasks.filter(t=>t.workstream===id);
    if(!tasks.length)return {color:'yellow',label:'Not in this project scope'};
    if(tasks.every(t=>t.verified))return {color:'yellow',label:'Verified complete'};
    const states=tasks.filter(t=>!t.verified).map(t=>taskStatus(t,context.today));
    return states.find(s=>s.color==='red')||states.find(s=>s.color==='orange')||{color:'yellow',label:'On track / not started'};
  }
  function tag(item,projectId){
    if(!item)return '';
    const s=status(item.id,projectId);
    return '<span class="workstream-tag ws-'+s.color+'" data-domain-tagged="true" title="'+esc(item.name+' · '+s.label)+'" aria-label="'+esc(item.code+' · '+s.label)+'">'+item.code+'</span>';
  }
  function code(id,projectId){return tag(T.workstreams.find(w=>w.id===id),projectId);}
  function html(id,projectId){const w=T.workstreams.find(w=>w.id===id);return w?'<span class="workstream-mention" data-domain-tagged="true">'+code(id,projectId)+' <span>'+esc(w.name)+'</span></span>':'';}
  function findTask(id,projectId=active){return contexts.get(projectId)?.result.tasks.find(t=>t.id===id)||T.tasks.find(t=>t.id===id);}
  function activityCode(id,projectId){return tag(findTask(id,projectId),projectId);}
  function activity(id,projectId){const t=findTask(id,projectId);return t?'<span class="activity-mention" data-domain-tagged="true">'+tag(t,projectId)+' <span>'+esc(t.name)+'</span></span>':'';}
  function setContext(project,result,today){contexts.set(project.id,{result,today});}
  function setActive(id){active=id||'';}
  const legend='<p class="workstream-status-legend"><span><i class="ws-yellow"></i>On track / not started / verified</span><span><i class="ws-orange"></i>At risk</span><span><i class="ws-red"></i>Blocked / overdue</span></p>';
  return {code,html,activity,activityCode,status,taskStatus,setContext,setActive,legend};
});
