/* Readiness, activity profiles and timeline arrows share the scheduled graph. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else root.CCActivityGraph=factory();
})(typeof window==='undefined'?globalThis:window,function(){
  'use strict';
  function relations(tasks,id){
    const byId=new Map(tasks.map(t=>[t.id,t])),task=byId.get(id);
    if(!task)return {task:null,prerequisites:[],dependents:[]};
    const edge=(to,dependency)=>({...dependency,from:dependency.id,to:to.id,predecessor:byId.get(dependency.id),successor:to});
    return {task,
      prerequisites:task.dependencies.filter(d=>byId.has(d.id)).map(d=>edge(task,d)),
      dependents:tasks.flatMap(t=>t.dependencies.filter(d=>d.id===id).map(d=>edge(t,d)))
    };
  }
  function describe(edge){
    const types={FS:'Finish → start',SS:'Start → start',FF:'Finish → finish',SF:'Start → finish'};
    return (types[edge.type]||edge.type)+(edge.lag?' · '+(edge.lag>0?'+':'')+edge.lag+' working days':'');
  }
  function provenance(edge){
    if(edge.origin)return edge.origin;
    return edge.from.startsWith('CAP-')||edge.to.startsWith('CAP-')?'Capacity review rule':'MS Project-derived link';
  }
  function path(from,to,type='FS'){
    const source=type.startsWith('S')?from.start:from.finish;
    const target=type.endsWith('F')?to.finish:to.start;
    const channel=type.startsWith('S')?Math.min(source,target)-14:Math.max(source+14,(source+target)/2);
    const approach=type.endsWith('F')?target+8:target-8;
    const n=value=>Math.round(value*10)/10;
    return 'M '+n(source)+' '+n(from.y)+' H '+n(channel)+' V '+n(to.y)+' H '+n(approach)+' H '+n(target);
  }
  return {relations,describe,provenance,path};
});
