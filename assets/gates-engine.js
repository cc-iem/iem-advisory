/* Gate records project existing milestones; they never duplicate or rewrite the scheduler graph. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory;
  else root.CCGates=factory(root.CC_GATE_DEFINITIONS,root.HospitalEngine);
})(typeof window==='undefined'?globalThis:window,function(definitions,E){
  'use strict';
  const clone=x=>JSON.parse(JSON.stringify(x));
  const last=values=>values.filter(Boolean).sort().at(-1);
  const validDate=s=>{try{return /^\d{4}-\d{2}-\d{2}$/.test(s)&&E.iso(new Date(s+'T00:00:00Z'))===s;}catch(e){return false;}};
  function recordFor(project,id){
    const raw=project.gates?.[id],record=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};
    return {targetDate:validDate(record.targetDate)?record.targetDate:null,criteria:record.criteria&&typeof record.criteria==='object'?record.criteria:{},reviews:Array.isArray(record.reviews)?record.reviews.filter(r=>r&&typeof r==='object'&&validDate(r.date)):[]};
  }
  function month(date,offset){
    const d=new Date(date+'T00:00:00Z'),day=d.getUTCDate();d.setUTCDate(1);d.setUTCMonth(d.getUTCMonth()+offset);
    const end=new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth()+1,0)).getUTCDate();d.setUTCDate(Math.min(day,end));return E.iso(d);
  }
  function ancestors(tasks,ids){
    const byId=new Map(tasks.map(t=>[t.id,t])),seen=new Set();
    function visit(id){if(seen.has(id)||!byId.has(id))return;seen.add(id);byId.get(id).dependencies.forEach(d=>visit(d.id));}
    ids.forEach(visit);return [...seen].map(id=>byId.get(id));
  }
  function fingerprint(gate,project){
    return JSON.stringify({dates:[project.startDate,project.targetDate,project.handoverDate,project.openingBeds,project.totalBeds,project.departmentCount,project.departments,project.teams,project.systems,project.holidays],target:gate.targetDate,sources:gate.sources.map(t=>[t.id,t.finishDate,t.dependencies]),requirements:gate.requirements.map(t=>[t.id,t.finishDate,t.verified,t.state.owner,t.state.evidence,t.state.actualFinish]),criteria:gate.criteria.map(c=>[c.id,c.verified,c.evidence,c.owner])});
  }
  function list(project,result,catalog=[]){
    const extras=result.tasks.filter(t=>t.id.startsWith('CAP-')).map(t=>({id:'GATE-'+String(6+Number(t.id.slice(4))).padStart(2,'0'),code:'GATE-'+String(6+Number(t.id.slice(4))).padStart(2,'0'),name:t.name,phase:'Capacity release',sequence:6+Number(t.id.slice(4)),sourceIds:[t.id],owner:t.owner,criteria:[{id:t.id+'-C1',name:'Staffing, licensing, demand and capacity-release evidence accepted',required:true}],provenance:'Existing generated capacity review; provisional 20-working-day spacing, not an approved release plan.'}));
    return [...definitions,...extras].map(def=>{
      const record=recordFor(project,def.id),sources=def.sourceIds.map(id=>result.tasks.find(t=>t.id===id)).filter(Boolean),sourceSet=new Set(def.sourceIds);
      const related=ancestors(result.tasks,def.sourceIds),requirements=related.filter(t=>!sourceSet.has(t.id)||!t.gate);
      const reference=def.offsetMonths===undefined?null:month(project.targetDate,def.offsetMonths);
      const targetDate=record.targetDate||reference;
      const criteria=def.criteria.map(c=>({...c,...record.criteria?.[c.id],id:c.id,name:c.name,required:c.required}));
      const forecastDate=last([sources.map(t=>t.finishDate).sort().at(-1),def.id==='GATE-06'?month(result.forecastDate,12):null]);
      const verified=requirements.filter(t=>t.verified).length,criteriaVerified=criteria.filter(c=>c.verified===true&&typeof c.owner==='string'&&c.owner.trim()&&typeof c.evidence==='string'&&c.evidence.trim()).length;
      const ready=sources.length===def.sourceIds.length&&verified===requirements.length&&criteriaVerified===criteria.length;
      const gate={...def,sources,requirements,criteria,record,targetDate,referenceDate:reference,forecastDate,verified,criteriaVerified,ready,workstreams:[...new Set(related.map(t=>t.workstream))],relatedTasks:related,review:record.reviews?.at(-1),inherited:!!targetDate&&targetDate<project.startDate};
      gate.fingerprint=fingerprint(gate,project);
      gate.stale=!!gate.review&&['approved','conditional'].includes(gate.review.decision)&&gate.review.fingerprint!==gate.fingerprint;
      gate.status=gate.stale?'Review required':gate.review?.decision==='rejected'?'Rejected':gate.review?.decision==='hold'?'On hold':gate.review?.decision==='approved'?'Approved':gate.review?.decision==='conditional'?'Conditional approval':ready?'Ready for review':requirements.some(t=>t.state.status==='blocked')?'Blocked':'Evidence needed';
      gate.varianceDays=targetDate&&forecastDate?Math.round((Date.parse(forecastDate)-Date.parse(targetDate))/86400000):null;
      gate.products=catalog.filter(p=>related.some(t=>(t.products||[]).includes(p.id))).map(p=>p.id);
      gate.coveredProducts=gate.products.filter(id=>(project.selectedProducts||[]).includes(id)&&(def.id!=='GATE-06'||Number(project.postOpeningSupport??12)>=12));
      return gate;
    });
  }
  function related(gates,workstreamIds){return !workstreamIds?gates:gates.filter(g=>g.workstreams.some(id=>workstreamIds.includes(id)));}
  function review(project,result,id,input,catalog=[],today=E.iso(new Date())){
    let next=clone(project),gate=list(next,result,catalog).find(g=>g.id===id);
    if(!gate)throw new Error('This gate is not in the current hospital scope.');
    if(!['pending','approved','conditional','hold','rejected'].includes(input.decision))throw new Error('Choose a valid review decision.');
    const approver=String(input.approver||'').trim(),evidence=String(input.evidence||'').trim(),decisionDate=String(input.date||'');
    if(!approver||!evidence||!validDate(decisionDate)||decisionDate>today)throw new Error('Add a reviewer, evidence and a valid review date that is not in the future.');
    if(input.targetDate&&!validDate(input.targetDate))throw new Error('Enter a valid target date.');
    const record=clone(gate.record);record.targetDate=input.targetDate||null;record.criteria=record.criteria||{};
    gate.criteria.forEach(c=>{record.criteria[c.id]={verified:!!input.criteria?.includes(c.id),owner:approver,evidence,reviewedAt:decisionDate};});
    next.gates={...next.gates,[id]:record};gate=list(next,result,catalog).find(g=>g.id===id);
    if(['approved','conditional'].includes(input.decision)&&!gate.ready)throw new Error('Verify every prerequisite activity and required criterion before approval. Save a pending review to retain evidence.');
    if(['approved','conditional'].includes(input.decision)&&gate.requirements.some(t=>t.state.actualFinish>decisionDate))throw new Error('The decision date cannot precede its prerequisite evidence.');
    if(['approved','conditional'].includes(input.decision)&&id==='GATE-06'&&decisionDate<month(result.forecastDate,12))throw new Error('The first-year handover review cannot be approved before 12 months after first patient.');
    if(input.decision==='conditional'&&(!String(input.conditions||'').trim()||!String(input.conditionOwner||'').trim()||!validDate(input.conditionDueDate)||input.conditionDueDate<decisionDate))throw new Error('Conditional approval needs conditions, a named owner and a valid due date on or after the review.');
    const entry={decision:input.decision,approver,evidence,date:decisionDate,conditions:String(input.conditions||'').trim(),conditionOwner:String(input.conditionOwner||'').trim(),conditionDueDate:input.conditionDueDate||'',recordedAt:new Date().toISOString(),fingerprint:gate.fingerprint};
    record.reviews=[...(record.reviews||[]),entry];
    return next;
  }
  function links(gate,tasks,graph){
    const sources=new Set(gate.sourceIds),unique=edges=>[...new Map(edges.map(e=>[e.from+'|'+e.to+'|'+e.type+'|'+e.lag,e])).values()];
    return {task:{id:gate.id,code:gate.code,name:gate.name},prerequisites:unique(gate.sourceIds.flatMap(id=>graph.relations(tasks,id).prerequisites).filter(e=>!sources.has(e.from))),dependents:unique(gate.sourceIds.flatMap(id=>graph.relations(tasks,id).dependents).filter(e=>!sources.has(e.to)))};
  }
  return {list,related,review,links,month,ancestors};
});
