/* One domain/solution tag system shared by navigation, catalog, planner and prose. */
(function (root, factory) {
  if(typeof module==='object'&&module.exports)module.exports=factory;
  else {root.CCDomainTags=factory(root.CC_DOMAINS,root.CC_CATALOG,root.CC_GREENFIELD?.workstreams,root.CC_GREENFIELD?.tasks);root.CCDomainTags.start();}
})(typeof window==='undefined'?globalThis:window,function(domains,catalog,workstreams,tasks){
  'use strict';
  workstreams=workstreams||[];tasks=tasks||[];
  const byCode=new Map(catalog.map(p=>[p.code,p]));
  const byId=new Map(catalog.map(p=>[p.id,p]));
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const fits=fit=>fit.includes('new')&&fit.includes('existing')?'both':fit.includes('new')?'new':'existing';
  const background=fit=>({existing:'#176393',new:'#287744',both:'linear-gradient(135deg, #176393 0%, #176393 49.6%, #287744 50.4%, #287744 100%)'}[fits(fit)]);
  const labels={both:'New and existing hospitals',new:'New hospitals',existing:'Existing hospitals'};
  function domainFit(id){return [...new Set(catalog.filter(p=>p.domain===id||p.secondaryDomains?.includes(id)).flatMap(p=>p.fit))];}
  function tag(text,fit,extra=''){
    const type=fits(fit);
    return '<span class="advisory-tag tag-'+type+' '+extra+'" title="'+labels[type]+'" data-domain-tagged="true">'+esc(text)+'</span>';
  }
  function code(id,product){const d=domains.find(d=>d.id===id||d.code===id);return d?tag(d.code,product?.fit||domainFit(d.id),'domain-code'):'';}
  function domain(id,product){const d=domains.find(d=>d.id===id);return d?'<span class="domain-mention" data-domain-tagged="true">'+code(id,product)+' <span>'+esc(d.name)+'</span></span>':'';}
  function solution(product){return tag(product.code,product.fit,'solution-code');}
  function solutionTitle(product){return '<span data-tag-context="solution" data-domain-plain="true">'+esc(product.title)+'</span>';}
  function solutionLabel(product){return '<span class="solution-mention" data-tag-context="solution" data-domain-tagged="true">'+solution(product)+' '+solutionTitle(product)+'</span>';}
  function resolveMention(token,context={}){
    const product=byCode.get(token);
    if(context.type){
      const owner=byId.get(context.id);
      return context.type==='solution'&&product&&(!owner||owner.id===product.id)?{type:'solution',id:product.id}:null;
    }
    const task=tasks.find(t=>t.id===context.activityId&&(t.name===token||t.id===token))||tasks.find(t=>t.workstream===context.workstreamId&&t.name===token)||tasks.find(t=>t.name===token||t.id===token);
    const domain=domains.find(d=>d.name===token),workstream=workstreams.find(w=>w.name===token);
    return product?{type:'solution',id:product.id}:task?{type:'activity',id:task.id}:domain?{type:'domain',id:domain.id}:workstream?{type:'workstream',id:workstream.id}:null;
  }
  const escapeRegex=s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  const tokens=[...byCode.keys(),...domains.map(d=>d.name),...workstreams.map(w=>w.name),...tasks.flatMap(t=>[t.name,t.id])].sort((a,b)=>b.length-a.length);
  const pattern=new RegExp('(?<![\\w])('+[...new Set(tokens)].map(escapeRegex).join('|')+')(?![\\w])','g');
  const skipped='[data-domain-tagged],[data-domain-plain],script,style,textarea,input,select,option,optgroup,svg,canvas,[contenteditable="true"],.model-panel,.field-label,.tile-num';
  function contextProduct(parent){
    const explicit=parent.closest('[data-domain-product],[data-product],[data-id]');
    const found=explicit&&byId.get(explicit.dataset.domainProduct||explicit.dataset.product||explicit.dataset.id);
    if(found)return found;
    const row=parent.closest('.row,.offering-row,.cart-item,.also-row,.result-band');
    const button=row?.querySelector('[data-product],[data-id]');
    return button&&byId.get(button.dataset.product||button.dataset.id);
  }
  function decorateText(node){
    const parent=node.parentElement;if(!parent||parent.closest(skipped))return;
    const text=node.nodeValue;pattern.lastIndex=0;
    if(!pattern.test(text))return;pattern.lastIndex=0;
    const fragment=document.createDocumentFragment();let end=0,match,changed=false;
    while((match=pattern.exec(text))){
      fragment.append(document.createTextNode(text.slice(end,match.index)));
      const holder=document.createElement('span');
      const boundary=parent.closest('[data-tag-context]');
      const activity=parent.closest('[data-task],[data-activity]');
      const mention=resolveMention(match[0],{type:boundary?.dataset.tagContext,id:boundary?.dataset.tagId,activityId:activity?.dataset.task||activity?.dataset.activity,workstreamId:parent.closest('[data-workstream-id]')?.dataset.workstreamId});
      if(mention)changed=true;
      holder.innerHTML=!mention?esc(match[0]):mention.type==='solution'?solution(byId.get(mention.id)):mention.type==='activity'?window.CCWorkstreamTags.activity(mention.id):mention.type==='domain'?domain(mention.id,contextProduct(parent)):window.CCWorkstreamTags.html(mention.id);
      fragment.append(...holder.childNodes);end=pattern.lastIndex;
    }
    if(changed){fragment.append(document.createTextNode(text.slice(end)));node.replaceWith(fragment);}
  }
  function decorate(node){
    if(!node.isConnected)return;
    if(node.nodeType===3){decorateText(node);return;}
    if(node.nodeType!==1||node.closest(skipped))return;
    const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT),texts=[];let text;
    while((text=walker.nextNode()))texts.push(text);
    texts.forEach(decorateText);
    if(node.matches('select'))decorateSelect(node);
    node.querySelectorAll('select').forEach(decorateSelect);
  }
  function decorateSelect(select){
    for(const option of select.options){
      const d=domains.find(d=>d.id===option.value);
      if(d&&!option.textContent.startsWith(d.code+' · '))option.textContent=d.code+' · '+d.name;
    }
    for(const group of select.querySelectorAll('optgroup')){
      const d=domains.find(d=>d.name===group.label);if(d)group.label=d.code+' · '+d.name;
    }
    const d=domains.find(d=>d.id===select.value),p=byId.get(select.value);
    select.classList.remove('tag-new','tag-existing','tag-both','advisory-select');
    if(d||p)select.classList.add('advisory-select','tag-'+fits(p?p.fit:domainFit(d.id)));
  }
  function start(){
    decorate(document.body);
    new MutationObserver(records=>{
      for(const record of records){
        if(record.type==='characterData')decorate(record.target);
        else record.addedNodes.forEach(decorate);
      }
    }).observe(document.body,{subtree:true,childList:true,characterData:true});
    document.addEventListener('change',ev=>{if(ev.target.matches('select'))decorateSelect(ev.target);});
  }
  return {code,domain,solution,solutionTitle,solutionLabel,resolveMention,fits,background,domainFit,start,decorate};
});
