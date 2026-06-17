let LINE_URL = 'https://line.me/R/ti/p/@006hlqez';
let allEvents = [];
let allPlaces = [];

function ymdLabel(iso){
  const d = new Date(iso + 'T00:00:00');
  const w = '日月火水木金土'[d.getDay()];
  return `${d.getMonth()+1}/${d.getDate()}（${w}）`;
}
function lineLink(ev){
  const text = encodeURIComponent(ev.lineMessage || `${ymdLabel(ev.date)}の${ev.title}参加希望の○○です`);
  return `${LINE_URL}?text=${text}`;
}
async function loadEvents(){
  const res = await fetch('data/events.json');
  const data = await res.json();
  LINE_URL = data.site?.lineUrl || LINE_URL;
  allEvents = Array.isArray(data) ? data : (data.events || []);
  allPlaces = Array.isArray(data.places) ? data.places : [...new Set(allEvents.map(e=>e.place))];
  initEventPage();
  initHomeEvents();
  initSearch();
}
function eventImageHtml(ev){
  const src = typeof ev.image === 'string' ? ev.image : ev.image?.src;
  const alt = typeof ev.image === 'object' ? (ev.image.alt || ev.title) : ev.title;
  if(!src) return '<div class="event-thumb placeholder">☕</div>';
  return `<div class="event-thumb image"><img src="${src}" alt="${alt}" loading="lazy"></div>`;
}
function eventCard(ev){
  return `<article class="event-card" data-place="${ev.place}" data-key="${ev.title} ${ev.place} ${ev.genre} ${ev.age}">
    ${eventImageHtml(ev)}
    <div class="event-body">
      <h3>${ev.title}</h3>
      <div class="meta"><span class="tag">${ymdLabel(ev.date)}</span><span class="tag">${ev.time}</span><span class="tag">${ev.place}</span><span class="tag">${ev.genre}</span></div>
      <p>${ev.description}</p>
      <p><b>参加費：</b>${ev.fee}　<b>定員：</b>${ev.capacity}</p>
      <a class="btn line" href="${lineLink(ev)}" target="_blank" rel="noopener">今すぐ申し込む</a>
    </div>
  </article>`;
}
function compactEventCard(ev){
  return `<article class="event-card compact-event">
    <a class="compact-link" href="${lineLink(ev)}" target="_blank" rel="noopener">${eventImageHtml(ev)}</a>
    <p class="compact-title">${ymdLabel(ev.date)} ${ev.time}〜「${ev.title}」＠${ev.place}</p>
  </article>`;
}
function initEventPage(){
  const list = document.querySelector('#eventList');
  const tabs = document.querySelector('#placeTabs');
  if(!list || !tabs) return;
  const places = ['すべて', ...allPlaces];
  tabs.innerHTML = places.map((p,i)=>`<button class="place-tab ${i===0?'active':''}" data-place="${p}">${p}</button>`).join('');
  renderEvents('すべて');
  tabs.addEventListener('click', e=>{
    const btn = e.target.closest('.place-tab'); if(!btn) return;
    document.querySelectorAll('.place-tab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    renderEvents(btn.dataset.place);
  });
  function renderEvents(place){
    const events = place==='すべて' ? allEvents : allEvents.filter(e=>e.place===place);
    list.innerHTML = events.map(eventCard).join('') || '<p>該当するイベントはまだありません。</p>';
  }
}
function initHomeEvents(){
  const list = document.querySelector('#homeEvents');
  if(!list) return;
  list.innerHTML = allEvents.slice(0,3).map(compactEventCard).join('');
}
function initSearch(){
  const open = document.querySelector('#openSearch');
  const panel = document.querySelector('#searchPanel');
  const close = document.querySelector('#closeSearch');
  const input = document.querySelector('#searchInput');
  const results = document.querySelector('#searchResults');
  if(!open || !panel) return;
  open.addEventListener('click',()=>panel.classList.add('open'));
  close?.addEventListener('click',()=>panel.classList.remove('open'));
  panel.addEventListener('click',e=>{ if(e.target===panel) panel.classList.remove('open'); });
  function renderSearch(){
    const q = (input.value||'').trim().toLowerCase();
    const rows = allEvents.filter(ev => !q || `${ev.title} ${ev.place} ${ev.genre} ${ev.age} ${ev.description}`.toLowerCase().includes(q));
    results.innerHTML = rows.slice(0,6).map(ev=>`<p><a href="event.html#eventList">${ymdLabel(ev.date)} ${ev.time}｜${ev.title}</a></p>`).join('') || '<p>見つかりませんでした。</p>';
  }
  input?.addEventListener('input',renderSearch); renderSearch();
}

function initThree(){
  const canvas = document.querySelector('#threeBg');
  if(!canvas || !window.THREE) return;
  const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(55, innerWidth/innerHeight, .1, 100); camera.position.z=8;
  const group = new THREE.Group(); scene.add(group);
  const mat = new THREE.MeshBasicMaterial({color:0xed1e71,transparent:true,opacity:.28});
  for(let i=0;i<40;i++){
    const g = new THREE.SphereGeometry(Math.random()*0.06+0.025,16,16);
    const m = new THREE.Mesh(g,mat); m.position.set((Math.random()-.5)*12,(Math.random()-.5)*7,(Math.random()-.5)*6); group.add(m);
  }
  const cup = new THREE.Mesh(new THREE.TorusGeometry(1.2,.035,16,120), new THREE.MeshBasicMaterial({color:0x5e2f00,transparent:true,opacity:.25}));
  cup.rotation.x = Math.PI/2; scene.add(cup);
  function resize(){renderer.setSize(innerWidth,innerHeight); camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix()} resize(); addEventListener('resize',resize);
  function tick(t){group.rotation.y=t*.00008; cup.rotation.z=t*.0002; renderer.render(scene,camera); requestAnimationFrame(tick)} tick(0);
}

document.addEventListener('DOMContentLoaded',()=>{loadEvents();initThree();});
