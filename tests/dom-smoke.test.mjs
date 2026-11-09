/** Browserless DOM smoke test. Không thay thế QA Safari/Chrome trên thiết bị thực. */
import test from 'node:test';
import assert from 'node:assert/strict';

class FakeClassList {
  constructor(node) { this.node=node; }
  get vals(){ return new Set(this.node.className.split(/\s+/).filter(Boolean)); }
  add(value){ const s=this.vals; s.add(value); this.node.className=[...s].join(' '); }
  remove(value){ const s=this.vals; s.delete(value); this.node.className=[...s].join(' '); }
  toggle(value,force){const s=this.vals;const next=force??!s.has(value);next?s.add(value):s.delete(value);this.node.className=[...s].join(' ');return next;}
  contains(value){return this.vals.has(value);}
}
class FakeNode {
  constructor(tag) {
    this.tagName=tag.toUpperCase();this.className='';this.children=[];this.parent=null;this.attributes={};this.dataset={};this.listeners={};this.style={setProperty(){}};
    this.value='';this.textContent='';this.inert=false;this.scrollTop=0;
    this.classList=new FakeClassList(this);
  }
  append(...nodes){for(const n of nodes){if(!n)continue;n.parent=this;this.children.push(n);}}
  prepend(...nodes){for(const n of [...nodes].reverse()){if(!n)continue;n.parent=this;this.children.unshift(n);}}
  replaceChildren(...nodes){this.children=[];this.append(...nodes);}
  remove(){if(this.parent)this.parent.children=this.parent.children.filter(n=>n!==this);}
  setAttribute(name,value){this.attributes[name]=String(value);if(name==='id')this.id=value;}
  removeAttribute(name){delete this.attributes[name];}
  getAttribute(name){return this.attributes[name]??null;}
  addEventListener(type,fn){(this.listeners[type]??=[]).push(fn);}
  removeEventListener(type,fn){this.listeners[type]=(this.listeners[type]??[]).filter(x=>x!==fn);}
  dispatch(type){for(const listener of this.listeners[type]??[])listener({type,preventDefault(){}});}
  querySelector(selector){
    const all=[]; const traverse=(node)=>{all.push(node); for(const child of node.children)traverse(child);};traverse(this);
    if(selector.startsWith('#'))return all.find(x=>x.id===selector.slice(1))??null;
    if(selector.startsWith('.'))return all.find(x=>x.classList.contains(selector.slice(1)))??null;
    return null;
  }
  focus(){globalThis.document.activeElement=this;}
  blur(){if(globalThis.document.activeElement===this)globalThis.document.activeElement=null;}
  reset(){const visit=(node)=>{if(node.tagName==='INPUT')node.value='';for(const c of node.children)visit(c);};visit(this);}
  scrollTo({top}){this.scrollTop=top;}
  getBoundingClientRect(){return {left:0,top:0,width:100,height:50};}
  getContext(){return null;}
  animate(){return {finished:Promise.resolve()};}
}

const media={matches:true,addEventListener(){},removeEventListener(){}};
globalThis.HTMLElement=FakeNode;
globalThis.document={
  activeElement:null,
  createElement:tag=>{
    const node=new FakeNode(tag);
    if(tag==='audio'){
      node.paused=true;
      node.play=()=>{
        globalThis.__audioPlayCalls=(globalThis.__audioPlayCalls||0)+1;
        if(globalThis.__audioFail) return Promise.reject(new Error('NotAllowedError'));
        node.paused=false; return Promise.resolve();
      };
      node.pause=()=>{node.paused=true;};
      node.load=()=>{};
    }
    return node;
  },
  createElementNS:(_,tag)=>new FakeNode(tag),
  addEventListener(){}, removeEventListener(){},hidden:false
};
globalThis.window={
  innerWidth:390,innerHeight:844,devicePixelRatio:2,
  matchMedia:()=>media,
  addEventListener(){},removeEventListener(){},
  setTimeout,clearTimeout,setInterval,clearInterval,
  location:{origin:'https://example.github.io',pathname:'/galaxy-letters-8-3-2027/'}
};
globalThis.requestAnimationFrame=fn=>setTimeout(fn,0);
globalThis.cancelAnimationFrame=clearTimeout;
Object.defineProperty(globalThis,'navigator',{configurable:true,value:{hardwareConcurrency:4,clipboard:null,share:null}});

const {mountApp}=await import('../dist/src/App.js');

test('phải chạm để phát nhạc rồi mới chạy intro; các scene và thư hoạt động',async()=>{
  globalThis.__audioFail=false;
  globalThis.__audioPlayCalls=0;
  const host=new FakeNode('div');
  const destroy=mountApp(host);
  const shell=host.children[0];
  assert.equal(shell.dataset.scene,'gate');
  assert.equal(globalThis.__audioPlayCalls,0,'không được phát nhạc khi chưa tương tác');
  const intro=host.querySelector('#scene-intro');
  const lookup=host.querySelector('#scene-lookup');
  assert.equal(intro.classList.contains('scene--active'),false);
  assert.equal(lookup.inert,true);
  assert.equal(intro.dataset.phase,'black');
  host.querySelector('.entry-begin').dispatch('click');
  assert.equal(globalThis.__audioPlayCalls,1,'audio.play() phải được gọi ngay trong click');
  await Promise.resolve(); await Promise.resolve();
  assert.equal(shell.dataset.scene,'intro');
  assert.equal(host.querySelector('.audio-toggle').getAttribute('aria-pressed'),'true');
  assert.equal(intro.classList.contains('scene--active'),true);
  host.querySelector('.skip-intro').dispatch('click');
  assert.equal(shell.dataset.scene,'lookup');
  assert.equal(lookup.inert,false);
  const input=host.querySelector('#student-stt');
  input.value='34';
  host.querySelector('.lookup-form').dispatch('submit');
  assert.match(host.querySelector('#lookup-error').textContent,/chưa có thư riêng/);
  assert.equal(shell.dataset.scene,'lookup');
  input.value='19';
  host.querySelector('.lookup-form').dispatch('submit');
  assert.equal(shell.dataset.scene,'letter');
  assert.equal(host.querySelector('#letter-heading').textContent,'Gửi Ánh Minh,');
  assert.equal(host.querySelector('#letter-sheet').inert,false);
  host.querySelector('.wish-star').dispatch('click');
  assert.equal(shell.dataset.scene,'closing');
  assert.equal(host.querySelector('#letter-sheet').inert,true);
  host.querySelector('.closing-back').dispatch('click');
  assert.equal(shell.dataset.scene,'lookup');
  input.value='45';
  host.querySelector('.lookup-form').dispatch('submit');
  assert.equal(host.querySelector('#letter-heading').textContent,'Gửi Nhất Linh,');
  destroy();
});


test('khi trình duyệt chặn âm thanh có nút thử lại và đường đi không kẹt', async()=>{
  globalThis.__audioFail=true;
  globalThis.__audioPlayCalls=0;
  const host=new FakeNode('div');
  const destroy=mountApp(host);
  const shell=host.children[0];
  host.querySelector('.entry-begin').dispatch('click');
  assert.equal(globalThis.__audioPlayCalls,1);
  await Promise.resolve();await Promise.resolve();
  assert.equal(shell.dataset.scene,'gate');
  const fallback=host.querySelector('.entry-fallback');
  assert.equal(fallback.hidden,false);
  assert.match(host.querySelector('.entry-status').textContent,/chưa phát được nhạc/);
  host.querySelector('.entry-begin').dispatch('click');
  await Promise.resolve();await Promise.resolve();
  assert.equal(globalThis.__audioPlayCalls,2);
  fallback.dispatch('click');
  assert.equal(shell.dataset.scene,'intro');
  host.querySelector('.skip-intro').dispatch('click');
  assert.equal(shell.dataset.scene,'lookup');
  destroy();
  globalThis.__audioFail=false;
});
