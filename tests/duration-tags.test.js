const test=require('node:test'),assert=require('node:assert/strict'),tags=require('../assets/duration-tags.js');
test('duration ranges and unit-first phase labels use the common tag without changing dates or identifiers',()=>{
  for(const text of ['12 to 24 weeks','12–24 weeks','12-month','20 working days','730 calendar days','Weeks 1–4','1.5 hours']){
    const html=tags.format(text);assert.match(html,/class="duration-tag"/);assert.ok(html.includes(text));
  }
  assert.doesNotMatch(tags.format('PMO-12 · 2026-11-16 · 300 beds'),/duration-tag/);
});
test('freeform duration labels and prose escape content safely',()=>{
  assert.match(tags.label('Set at scoping'),/duration-tag/);
  assert.match(tags.label('<unsafe>'),/&lt;unsafe&gt;/);
  const prose=tags.format('Plan <script> over 6 to 12 weeks; review after 20 working days.');
  assert.equal((prose.match(/class="duration-tag"/g)||[]).length,2);assert.ok(!prose.includes('<script>'));
});
test('existing duration badges are left untouched during repeated DOM decoration',()=>{
  let replacements=0;tags.decorate({nodeType:3,isConnected:true,parentElement:{closest:()=>({})},nodeValue:'12 weeks',replaceWith(){replacements++;}});assert.equal(replacements,0);
});
