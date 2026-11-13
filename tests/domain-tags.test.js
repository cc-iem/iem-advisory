const test=require('node:test'),assert=require('node:assert/strict');
const createTags=require('../assets/domain-tags.js');
const domains=[{id:'finance',code:'FIN',name:'Finance'},{id:'regulatory',code:'REG',name:'Regulatory'}];
const catalog=[{id:'a',code:'FIN-01',domain:'finance',fit:['new']},{id:'b',code:'FIN-02',domain:'finance',fit:['existing']},{id:'c',code:'REG-01',domain:'regulatory',fit:['new','existing']}];
const tags=createTags(domains,catalog);
test('tags classify actual solution eligibility independent of current filters',()=>{
  assert.match(tags.solution(catalog[0]),/tag-new/);assert.match(tags.solution(catalog[1]),/tag-existing/);assert.match(tags.solution(catalog[2]),/tag-both/);
});
test('generic domain tags aggregate eligibility, contextual tags use the solution fit',()=>{
  assert.match(tags.domain('finance'),/tag-both/);assert.match(tags.domain('finance',catalog[0]),/tag-new/);
  assert.match(tags.code('FIN'),/>FIN</);assert.match(tags.domain('regulatory'),/REG/);
});
test('tag labels escape text and explain eligibility without relying on color',()=>{
  assert.match(tags.solution({code:'<unsafe>',fit:['new']}),/&lt;unsafe&gt;/);
  assert.match(tags.solution(catalog[2]),/New and existing hospitals/);
});
