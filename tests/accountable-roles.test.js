const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const c={window:{}};vm.createContext(c);for(const file of ['data/greenfield-template.js','data/workstream-codes.js'])vm.runInContext(fs.readFileSync(file,'utf8'),c);
const T=JSON.parse(JSON.stringify(c.window.CC_GREENFIELD)),roles=require('../assets/accountable-roles.js')(T);
test('the role directory contains every reference owner and workstream lead with all source activity links',()=>{
  const entries=roles.entries(),expected=new Set([...T.workstreams.map(w=>w.owner),...T.tasks.map(t=>t.owner)].map(r=>r.trim().toLowerCase()));
  assert.equal(entries.length,expected.size);
  for(const entry of entries){assert.ok(expected.has(entry.role.toLowerCase()));assert.equal(entry.activities.length,T.tasks.filter(t=>t.owner.trim().toLowerCase()===entry.role.toLowerCase()).length);assert.ok(entry.workstreams.every(id=>T.workstreams.some(w=>w.id===id)));}
});
test('role cards use acronym circles and plain department/company text without code tags',()=>{
  for(const w of T.workstreams){const html=roles.profile(w.owner,w.id);assert.match(html,/role-avatar/);assert.match(html,/data-domain-plain="true"/);assert.ok(html.includes(roles.department(w.id).replace(/&/g,'&amp;')));assert.doesNotMatch(html,/advisory-tag|workstream-tag/);assert.ok(roles.initials(w.owner).length<=4);}
  assert.equal(roles.initials('Chief Nursing Officer'),'CNO');assert.equal(roles.initials('CFO'),'CFO');assert.match(roles.profile('<Unsafe>','WS-01'),/&lt;Unsafe&gt;/);
});
test('gate owners, decision authorities, advisers, evidence owners and review/condition owners join the directory',()=>{
  const task=T.tasks[0],gate={id:'GATE-01',owner:'Gate Review Chair',decisionAuthority:'Hospital Board',advisoryReviewer:'Activation Assurance Lead',sources:[{workstream:'WS-18'}],relatedTasks:[{...task,state:{owner:'Current Delivery Lead'}}],criteria:[{owner:'Evidence Lead'}],record:{reviews:[{approver:'gate review chair',conditionOwner:'Remediation Lead'},{approver:'Independent Reviewer'}]}};
  const entries=roles.entries([gate,{...gate,id:'GATE-02'}]),expected=['Gate Review Chair','Hospital Board','Activation Assurance Lead','Current Delivery Lead','Evidence Lead','Remediation Lead','Independent Reviewer',task.owner];
  for(const role of expected){const entry=entries.find(r=>r.role.toLowerCase()===role.toLowerCase());assert.ok(entry,role);assert.deepEqual(entry.gates,['GATE-01','GATE-02']);}
  assert.equal(entries.filter(r=>r.role.toLowerCase()==='gate review chair').length,1,'case variants do not duplicate a role');
  const assigned=entries.find(r=>r.role==='Current Delivery Lead');assert.ok(assigned.activities.includes(task.id));assert.ok(assigned.workstreams.includes(task.workstream));
});
