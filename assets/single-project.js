/* One persisted advisory plan shared by Finder, configuration, planner and Package. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory;
  else {
    let storage;try{storage=root.localStorage;}catch(e){}
    root.CCProject=factory({storage,catalog:root.CC_CATALOG,template:root.CC_GREENFIELD,
      createDefault:()=>root.CCExampleProject.create(root.CC_GREENFIELD,root.HospitalEngine),
      legacyProjectId:location.hash.split('/')[1],
      forecast:p=>root.HospitalEngine.schedule(root.CC_GREENFIELD,p).forecastDate,
      notify:detail=>root.dispatchEvent(new CustomEvent('advisory-project-change',{detail}))});
    root.addEventListener('storage',event=>{if(event.key===root.CCProject.key)root.CCProject.reload();});
  }
})(typeof window==='undefined'?globalThis:window,function(options){
  'use strict';
  const KEY='iem-advisory-project-v1',BACKUP='iem-advisory-single-project-migration-backup-v1';
  const clone=x=>JSON.parse(JSON.stringify(x));
  const valid=new Set(options.catalog.map(p=>p.id));
  const unique=ids=>[...new Set((Array.isArray(ids)?ids:[]).filter(id=>valid.has(id)))];
  const read=(key,fallback)=>{try{return JSON.parse(options.storage?.getItem(key))??fallback;}catch(e){return fallback;}};
  const write=(key,value)=>{try{if(!options.storage)return false;options.storage.setItem(key,JSON.stringify(value));return true;}catch(e){return false;}};
  let project=read(KEY,null);
  if(!project||!project.id||!Array.isArray(project.departments)){
    const legacy=read('iem-hospital-projects-v1',[]),cart=read('ccc-cart',[]);
    const projects=Array.isArray(legacy)?legacy.filter(p=>p&&p.id&&Array.isArray(p.departments)):[];
    const chosen=projects.find(p=>p.id===options.legacyProjectId)||projects.filter(p=>!p.archived).sort((a,b)=>String(b.updatedAt||'').localeCompare(String(a.updatedAt||'')))[0]||projects[0];
    if(projects.length||cart.length)write(BACKUP,{projects:clone(projects),package:cart,migratedAt:new Date().toISOString()});
    project=clone(chosen||options.createDefault());
    if(!chosen)project.scenarios=[];
    project.id=project.id||'advisory-plan';
    if(['Example Hospital','New hospital'].includes(project.name))project.name='My Hospital';
    if(project.location==='Illustrative greenfield project')project.location='To be confirmed';
    project.hospitalType=project.hospitalType||'new';
    project.selectedProducts=unique([...(chosen?.selectedProducts||[]),...(Array.isArray(cart)?cart:[])]);
    project.finder=project.finder||{answers:{status:project.hospitalType},order:['status']};
    delete project.archived;
    delete project.exampleSeed;
    project.singleProjectVersion=1;
    write(KEY,project);
  }
  project.selectedProducts=unique(project.selectedProducts);
  project.hospitalType=project.hospitalType==='existing'?'existing':'new';
  project.finder=project.finder||{answers:{status:project.hospitalType},order:['status']};
  const get=()=>clone(project);
  function commit(changes,source='workspace'){
    const previous=project,next={...project,...clone(changes),id:project.id,singleProjectVersion:1};
    next.selectedProducts=unique(next.selectedProducts);
    next.hospitalType=next.hospitalType==='existing'?'existing':'new';
    if(next.hospitalType!==previous.hospitalType)next.finder={answers:{status:next.hospitalType},order:['status']};
    if(next.name==='Example Hospital')next.name='My Hospital';
    delete next.archived;delete next.exampleSeed;
    next.updatedAt=new Date().toISOString();
    project=next;
    const persisted=write(KEY,project);
    options.notify?.({source,project:get(),persisted});
    return persisted;
  }
  function setSelections(ids,source='package'){return commit({selectedProducts:unique(ids)},source);}
  function setFinder(finder){
    const status=finder.answers.status;
    return commit({finder:clone(finder),...(status?{hospitalType:status}:{})},'finder');
  }
  function selectedWorkstreams(){
    const ids=new Set(project.selectedProducts);
    return [...new Set(options.catalog.filter(p=>ids.has(p.id)).flatMap(p=>(p.workstreamLinks||[]).map(w=>w.id)))];
  }
  let restoreNumber=0;
  function restore(snapshot,source='restore'){
    const before=clone(project);delete before.scenarios;
    let forecastDate;try{forecastDate=options.forecast?.(project);}catch(e){}
    const saved={forecastDate,id:'before-'+Date.now()+'-'+(++restoreNumber),name:'Before '+(source==='import'?'import':'restore'),baseline:false,savedAt:new Date().toISOString(),project:before};
    const history=[...new Map([...(project.scenarios||[]),...(snapshot.scenarios||[])].map(s=>[s.id,s])).values()];
    return commit({...clone(snapshot),scenarios:[...history,saved],finder:snapshot.finder||project.finder},source);
  }
  function reload(){const next=read(KEY,null);if(next?.id){project=next;options.notify?.({source:'storage',project:get(),persisted:true});}}
  return {key:KEY,get,save:commit,setSelections,setFinder,selectedWorkstreams,restore,reload};
});
