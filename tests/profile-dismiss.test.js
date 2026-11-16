const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const source=fs.readFileSync('assets/workspace.js','utf8'),start=source.indexOf('  function dismissDialogOutside(');
const context={};vm.createContext(context);vm.runInContext(source.slice(start,source.indexOf('\n  }',start)+4),context);
function setup(){
  const listeners={};let closes=0;
  const pane={open:true,getBoundingClientRect:()=>({left:600,right:1000,top:0,bottom:800}),addEventListener:(type,fn)=>listeners[type]=fn,close(){this.open=false;closes++;listeners.close();}};
  context.dismissDialogOutside(pane);
  function event(type,x,y=200,target=pane){const ev={target,clientX:x,clientY:y,preventDefault(){this.prevented=true;},stopPropagation(){this.stopped=true;}};listeners[type](ev);return ev;}
  return {pane,event,closes:()=>closes};
}
test('clicking the native RHS backdrop dismisses the topmost profile',()=>{
  const s=setup();s.event('pointerdown',400);const click=s.event('click',400);
  assert.equal(s.closes(),1);assert.equal(click.prevented,true);assert.equal(click.stopped,true,'dismissal cannot activate underlying controls');
});
test('clicks inside the RHS, including its blank space, leave it open',()=>{
  const s=setup();s.event('pointerdown',800);s.event('click',800);
  const input={};s.event('pointerdown',800,200,input);s.event('click',800,200,input);
  assert.equal(s.closes(),0);
});
test('dragging a form interaction outside or cancelling a gesture does not dismiss the RHS',()=>{
  const s=setup();s.event('pointerdown',800,200,{});s.event('click',400);assert.equal(s.closes(),0);
  s.event('pointerdown',400);s.event('click',800);assert.equal(s.closes(),0);
  s.event('pointerdown',400);s.event('pointercancel',400);s.event('click',400);assert.equal(s.closes(),0);
});
