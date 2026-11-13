const test = require('node:test');
const assert = require('node:assert/strict');
const {buildGeometry,projectPoint} = require('../assets/hospital-model.js');
const base={totalBeds:300,openingBeds:100,departmentCount:8,departments:['inpatient','outpatient','emergency','icu','surgery','imaging','laboratory','pharmacy']};
test('hospital concept has finite geometry and bounded perspective at all supported capacities',()=>{
  for(const totalBeds of [1,100,300,601,1000,3000,10000]) {
    const g=buildGeometry({...base,totalBeds,openingBeds:Math.min(100,totalBeds)});
    assert.ok(g.radius>0);assert.ok(g.segments.length<4000);
    for(const s of g.segments) for(const p of [s.a,s.b]) {
      assert.ok(p.every(Number.isFinite));assert.ok(s.opacity>0&&s.opacity<=1);
      const projected=projectPoint(p,{yaw:.7,pitch:.4,zoom:2.4,panX:0,panY:0},g,{width:350,height:400});
      assert.ok(projected&&Object.values(projected).every(Number.isFinite));
    }
  }
});
test('bed capacity changes tower massing, even within a single floor increment',()=>{
  const g=buildGeometry(base),next=buildGeometry({...base,totalBeds:301});
  assert.notDeepEqual(g.blocks,next.blocks);
  assert.ok(buildGeometry({...base,totalBeds:1800}).metrics.towers>g.metrics.towers);
});
test('opening capacity changes floor emphasis while retaining eventual building envelope',()=>{
  const a=buildGeometry(base),b=buildGeometry({...base,openingBeds:300});
  assert.deepEqual(a.blocks,b.blocks);assert.deepEqual(a.center,b.center);
  assert.ok(b.segments.reduce((n,s)=>n+s.opacity,0)>a.segments.reduce((n,s)=>n+s.opacity,0));
});
test('service choices add or remove named wings independently',()=>{
  for(const [service,name] of [['inpatient','Inpatient tower 1'],['emergency','Emergency'],['surgery','Surgery'],['icu','Critical care'],['outpatient','Outpatient'],['imaging','Imaging'],['laboratory','Laboratory'],['pharmacy','Pharmacy']]) {
    assert.ok(buildGeometry(base).blocks.some(b=>b.name===name));
    const g=buildGeometry({...base,departments:base.departments.filter(d=>d!==service)});
    assert.ok(!g.blocks.some(b=>b.name===name));assert.equal(g.metrics.services,7);
  }
});
test('department count expands clinical podium and reset inputs reproduce the concept',()=>{
  const a=buildGeometry(base),b=buildGeometry({...base,departmentCount:40});
  assert.ok(b.blocks[0].w>a.blocks[0].w);assert.deepEqual(buildGeometry(base),a);
});
test('camera zoom scales projection and pan offsets the screen position',()=>{
  const g=buildGeometry(base),camera={yaw:0,pitch:0,zoom:1,panX:0,panY:0},size={width:400,height:400};
  const point=[g.center[0]+2,g.center[1],g.center[2]];
  const a=projectPoint(point,camera,g,size),b=projectPoint(point,{...camera,zoom:2},g,size);
  assert.ok(Math.abs(b.x-200)>Math.abs(a.x-200));
  assert.equal(projectPoint(point,{...camera,panX:20},g,size).x,a.x+20);
});
