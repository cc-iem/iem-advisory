/* Program review groupings proposed from the activation examples. Source IDs stay unchanged. */
(function(root){
  const definitions = [
    ['GATE-01','Program authorized','Mobilize',-22,['GF-006'],['Program scope and governance reviewed','Hospital decision authority confirmed']],
    ['GATE-02','Model approved','Design & operating model',-15,['GF-007','GF-008'],['Opening services, staffing and budget reviewed','Design baseline accepted by the hospital']],
    ['GATE-03','Build baseline accepted','Build & configure',-11,['GF-009','GF-170','GF-195'],['Operating, equipment and digital baselines reconciled','Remaining configuration constraints have owners']],
    ['GATE-04','Activation authorized','Test & recruit',-6,['GF-011','GF-012','GF-184','GF-210'],['Handover, workforce, equipment and systems evidence reviewed','Activation constraints and responsibilities agreed']],
    ['GATE-05','Opening authorized','Activate & open',0,['GF-015'],['Opening requirements and local approvals confirmed','Go / no-go decision authority and conditions recorded']],
    ['GATE-06','Operational handover accepted','After opening',12,['GF-017'],['Ramp-up outcomes and remaining risks reviewed','Routine management accepts the handover']]
  ].map(([id,name,phase,offsetMonths,sourceIds,criteria],i)=>({id,code:id,name,phase,offsetMonths,sourceIds,sequence:i+1,owner:'Steering Committee',criteria:criteria.map((name,j)=>({id:id+'-C'+(j+1),name,required:true})),provenance:'Proposed program grouping from greenfield-builder.html and greenfield-activation.html; requirements need hospital agreement.'}));
  root.CC_GATE_DEFINITIONS=definitions;
  if(typeof module!=='undefined')module.exports=definitions;
})(typeof window==='undefined'?globalThis:window);
