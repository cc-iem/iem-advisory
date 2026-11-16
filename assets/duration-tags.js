/* One duration treatment for prose, metadata and dynamically rendered profiles. */
(function(root,factory){
  if(typeof module==='object'&&module.exports)module.exports=factory();
  else {root.CCDurationTags=factory();root.CCDurationTags.start();}
})(typeof window==='undefined'?globalThis:window,function(){
  'use strict';
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const number='\\d+(?:,\\d{3})*(?:\\.\\d+)?',range=number+'(?:\\s*(?:to|[-–—])\\s*'+number+')?';
  const units='(?:(?:working|calendar)\\s+)?(?:minutes?|hours?|days?|weeks?|months?|years?|wks?)';
  const pattern=new RegExp('(?<![\\w-])(?:'+range+'\\s*[- ]?\\s*'+units+'|'+units+'\\s+'+range+')(?!\\w)','gi');
  const skip='.duration-tag, .advisory-tag, .workstream-tag, script, style, input, select, option, textarea, svg, canvas, code, pre, [contenteditable="true"]';
  function label(text){return '<span class="duration-tag" data-domain-tagged="true">'+esc(text)+'</span>';}
  function format(text){
    text=String(text??'');pattern.lastIndex=0;let html='',last=0,match;
    while((match=pattern.exec(text))){html+=esc(text.slice(last,match.index))+label(match[0]);last=pattern.lastIndex;}
    return html+esc(text.slice(last));
  }
  function wrapLabel(element){
    if(!element.textContent.trim()||element.closest(skip)||element.querySelector('.duration-tag'))return;
    const badge=document.createElement('span');badge.className='duration-tag';badge.dataset.domainTagged='true';
    badge.append(...element.childNodes);element.append(badge);
  }
  function textNode(node){
    const parent=node.parentElement;if(!parent||parent.closest(skip))return;
    const explicit=parent.closest('[data-duration-label], .selection-duration');
    if(explicit){wrapLabel(explicit);return;}
    pattern.lastIndex=0;if(!pattern.test(node.nodeValue))return;
    const holder=document.createElement('span');holder.innerHTML=format(node.nodeValue);node.replaceWith(...holder.childNodes);
  }
  function decorate(node){
    if(!node.isConnected)return;
    if(node.nodeType===3){textNode(node);return;}
    if(node.nodeType!==1||node.closest(skip))return;
    if(node.matches('[data-duration-label], .selection-duration'))wrapLabel(node);
    node.querySelectorAll('[data-duration-label], .selection-duration').forEach(wrapLabel);
    const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT),nodes=[];let text;
    while((text=walker.nextNode()))nodes.push(text);nodes.forEach(textNode);
  }
  function start(){
    decorate(document.body);
    new MutationObserver(records=>records.forEach(record=>{
      if(record.type==='characterData')decorate(record.target);else record.addedNodes.forEach(decorate);
    })).observe(document.body,{childList:true,subtree:true,characterData:true});
  }
  return {label,format,decorate,start};
});
