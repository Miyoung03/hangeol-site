(()=>{'use strict';
const $=id=>document.getElementById(id);const KEY='hangeol-records-v1';const OLD_KEYS=['my50hours-v2','my50hours-v1'];
const ICONS={play:'<path d="m8 5 11 7-11 7V5z"/>',stop:'<rect x="6" y="6" width="12" height="12" rx="2"/>',pencil:'<path d="m16 5 3 3M4 20l4.6-.9L20 7.7a2.1 2.1 0 0 0-3-3L5.6 16.1 4 20z"/>',home:'<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-6v-7h-4v7H4a1 1 0 0 1-1-1z"/>',chart:'<rect x="4" y="12" width="3" height="8" rx="1"/><rect x="10.5" y="5" width="3" height="15" rx="1"/><rect x="17" y="9" width="3" height="11" rx="1"/>',plus:'<path d="M12 5v14M5 12h14"/>',list:'<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/>',settings:'<path d="M10 3h4l.6 2.3 2 .8 2.1-1.2 2.8 2.8-1.2 2.1.8 2L23 12l-2.7.6-.8 2 1.2 2.1-2.8 2.8-2.1-1.2-2 .8L14 22h-4l-.6-2.9-2-.8-2.1 1.2-2.8-2.8 1.2-2.1-.8-2L1 12l2.9-.6.8-2-1.2-2.1 2.8-2.8 2.1 1.2 2-.8L10 3z"/><circle cx="12" cy="12" r="3"/>',trash:'<path d="M4 7h16M10 11v7M14 11v7M6 7l1 14h10l1-14M9 7V4h6v3"/>'};
const icon=(name)=>`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[name]||''}</svg>`;
const CAT_ICONS={
 '봉사':'<rect x="3.5" y="9" width="17" height="12" rx="2.7"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
 '공부':'<path d="M12 6C9 4 5 4 2 5v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-3-1-7-1-10 1Zm0 0v14"/>',
 '독서':'<path d="M12 6C9 4 5 4 2 5v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-3-1-7-1-10 1Zm0 0v14"/>',
 '책':'<path d="M12 6C9 4 5 4 2 5v14c4-1 7-1 10 1 3-2 6-2 10-1V5c-3-1-7-1-10 1Zm0 0v14"/>',
 '운동':'<rect x="3" y="9" width="3" height="6" rx="1.2"/><rect x="18" y="9" width="3" height="6" rx="1.2"/><rect x="7" y="7" width="2.5" height="10" rx="1.1"/><rect x="14.5" y="7" width="2.5" height="10" rx="1.1"/><path d="M9.5 12h5"/>',
 '업무':'<rect x="6" y="4" width="12" height="16" rx="2"/><path d="M9 4.5h6a1 1 0 0 1 1 1V7H8V5.5a1 1 0 0 1 1-1Z"/><path d="m9 11 1.5 1.5L13 10"/><path d="m9 15 1.5 1.5L13 14"/><path d="M14.8 11H16M14.8 15H16"/>',
 '가정':'<path d="M3.5 10.5 12 4l8.5 6.5"/><path d="M5.5 9.7V19a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.7"/><path d="M10 20v-5h4v5"/>',
 '자기관리':'<path d="M18.5 5.5c-5 .2-9 3.6-10.7 8.3-.6 1.6-.8 3.1-.8 4.7 1.5 0 3.1-.2 4.7-.8 4.7-1.7 8.1-5.7 8.3-10.7-.6-.9-.6-.9-1.5-1.5Z"/><path d="M7.5 18.5c2.4-2.8 5.1-5.4 8.1-7.7"/>',
 '모임':'<circle cx="12" cy="8" r="2.7"/><path d="M6.5 18c.4-2.7 2.6-4.5 5.5-4.5s5.1 1.8 5.5 4.5"/><circle cx="5.3" cy="10.2" r="2"/><circle cx="18.7" cy="10.2" r="2"/><path d="M2.8 18c.2-1.8 1.5-3.1 3.3-3.5"/><path d="M21.2 18c-.2-1.8-1.5-3.1-3.3-3.5"/>',
 '기타':'<circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
 '휴식':'<circle cx="12" cy="6.7" r="1.8"/><path d="M7.5 11.5c1.3 1.2 2.7 1.8 4.5 1.8s3.2-.6 4.5-1.8"/><path d="M8.5 21l1.2-4.2M15.5 21l-1.2-4.2"/><path d="M8 16c.8 1.6 2.2 2.4 4 2.4s3.2-.8 4-2.4"/>'
};
function setCategoryVisual(el,cat){const svg=CAT_ICONS[cat.iconKey]||CAT_ICONS[cat.name]||CAT_ICONS['기타'];el.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">${svg}</svg>`;}

document.querySelectorAll('[data-icon]').forEach(el=>{el.innerHTML=icon(el.dataset.icon)});
const pad=n=>String(n).padStart(2,'0');const localDate=(d=new Date())=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
const thisMonth=()=>localDate().slice(0,7),toMonth=(s,n)=>{const[y,m]=s.split('-').map(Number);const d=new Date(y,m-1+n,1);return `${d.getFullYear()}-${pad(d.getMonth()+1)}`};
const niceMonth=s=>`${Number(s.slice(0,4))}년 ${Number(s.slice(5,7))}월`;
const validDate=s=>{if(!/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(s||''))return false;const d=new Date(`${s}T12:00:00`);return !Number.isNaN(d.getTime())&&localDate(d)===s};
const duration=m=>{const h=Math.floor(m/60),min=m%60;return h&&min?`${h}시간 ${min}분`:h?`${h}시간`:`${min}분`};
const startYear=m=>Number(m.slice(5,7))>=9?Number(m.slice(0,4)):Number(m.slice(0,4))-1;
const monthsInYear=y=>Array.from({length:12},(_,i)=>`${y+Math.floor((i+8)/12)}-${pad((i+8)%12+1)}`);
const uid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
const txt=(s,max=200)=>String(s??'').slice(0,max).trim();
const COLORS=['#778CB8','#66A08E','#B88A69','#A58AB7','#C47784','#8D918D'];
// 등록하지 않은 항목은 자동으로 표시하지 않습니다.
const PRESET_NAMES=['봉사','공부','운동','독서','기타','업무','가정','자기관리','모임','휴식'];
const PRESET_EMOJI={'봉사':'🤝','공부':'📘','운동':'🚶','독서':'📖','기타':'✨','업무':'📝','가정':'🏠','자기관리':'🌿','모임':'👥','휴식':'🧘'};
const PRESET_COLORS={'봉사':COLORS[0],'공부':COLORS[0],'운동':COLORS[1],'독서':COLORS[2],'기타':COLORS[3],'업무':COLORS[5],'가정':COLORS[3],'자기관리':COLORS[1],'모임':COLORS[0],'휴식':COLORS[5]};
const OLD_SEEDED=[{name:'봉사',emoji:'🤝',color:COLORS[0]},{name:'운동',emoji:'🚶',color:COLORS[1]},{name:'독서',emoji:'📖',color:COLORS[2]},{name:'기타',emoji:'✨',color:COLORS[3]}];
const defaults=()=>[];
let state={entries:[],goalChanges:[],activeTimer:null,pendingSession:null,categories:[]};
let month=thisMonth(),year=startYear(month),page='home',scope='month',selected='',slideIndex=0,editingId=null,editingCategory=null,editingGoal=null,modalMode='manual',toastId=null;
const categoryFor=name=>state.categories.find(c=>c.name===name)||{name,emoji:'✨',iconKey:PRESET_NAMES.includes(name)?name:'기타',color:COLORS[5],goalMinutes:0};
const selectedName=()=>state.activeTimer?.category||state.pendingSession?.category||(state.categories.some(c=>c.name===selected)?selected:(state.categories[0]?.name||''));
const sum=items=>items.reduce((s,r)=>s+r.minutes,0);
const monthRecords=()=>state.entries.filter(r=>r.date.startsWith(month+'-')).sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id));
const annualRecords=()=>state.entries.filter(r=>r.date.slice(0,7)>=`${year}-09`&&r.date.slice(0,7)<=`${year+1}-08`);
function normalizedCategories(raw,entries){
 let result=Array.isArray(raw)?raw.slice(0,80).filter(x=>x&&typeof x==='object').map((c,i)=>({
   name:txt(c.name,30),emoji:txt(c.emoji||'✨',8)||'✨',
   iconKey:PRESET_NAMES.includes(c.iconKey)?c.iconKey:(PRESET_NAMES.includes(c.name)?c.name:'기타'),
   color:/^#[\da-fA-F]{6}$/.test(c.color||'')?c.color:COLORS[i%COLORS.length],
   goalMinutes:Number.isInteger(c.goalMinutes)&&c.goalMinutes>=0&&c.goalMinutes<=60000?c.goalMinutes:0
 })).filter(x=>x.name):[];
 const names=new Set();result=result.filter(x=>{if(names.has(x.name))return false;names.add(x.name);return true});
 for(const r of entries){if(!names.has(r.category)){names.add(r.category);result.push({name:r.category,emoji:PRESET_EMOJI[r.category]||'✨',iconKey:PRESET_NAMES.includes(r.category)?r.category:'기타',color:PRESET_COLORS[r.category]||COLORS[5],goalMinutes:0})}}
 return result;
}

function normalizeEntry(r){if(!r||typeof r!=='object'||!validDate(r.date)||!Number.isInteger(Number(r.minutes))||Number(r.minutes)<1||Number(r.minutes)>60000)return null;return {id:txt(r.id||uid(),100),date:r.date,minutes:Number(r.minutes),category:txt(r.category||'기타',30)||'기타',note:txt(r.note,200),method:['manual','timer','range'].includes(r.method)?r.method:'manual'};}
function validateData(obj){if(!obj||!Array.isArray(obj.entries)||obj.entries.length>30000)throw Error('기록 형식이 올바르지 않습니다.');const entries=obj.entries.map(normalizeEntry);if(entries.some(x=>!x)||new Set(entries.map(r=>r.id)).size!==entries.length)throw Error('기록이 올바르지 않습니다.');const gc=Array.isArray(obj.goalChanges)?obj.goalChanges:[];if(gc.length>3000||gc.some(g=>!g||!/^\d{4}-(0[1-9]|1[0-2])$/.test(g.month)||!Number.isInteger(g.minutes)||g.minutes<1||g.minutes>60000))throw Error('이전 목표 형식이 올바르지 않습니다.');const active=obj.activeTimer;const pending=obj.pendingSession;if(active&&(!Number.isFinite(active.startedAt)||active.startedAt<0||active.startedAt>Date.now()+60000))throw Error('타이머 정보가 올바르지 않습니다.');if(pending&&(!validDate(pending.date)||!Number.isInteger(pending.minutes)||pending.minutes<1||pending.minutes>60000))throw Error('미저장 기록이 올바르지 않습니다.');return {entries,goalChanges:gc,activeTimer:active?{startedAt:active.startedAt,category:txt(active.category,30)}:null,pendingSession:pending?{date:pending.date,minutes:pending.minutes,category:txt(pending.category,30)}:null,categories:normalizedCategories(obj.categories,entries)};}
function migrateLegacy(raw){const rows=Array.isArray(raw.entries)?raw.entries:Object.entries(raw.records||{}).map(([date,r])=>({...r,date,id:uid()}));const entries=rows.map(r=>normalizeEntry({...r,category:r.category||(['공부','운동','독서','봉사','업무'].find(s=>String(r.note||'').includes(s))||'기타')})).filter(Boolean);return {entries,goalChanges:[],activeTimer:null,pendingSession:null,categories:normalizedCategories(null,entries)};}
function save(){try{localStorage.setItem(KEY,JSON.stringify({...state,version:2}));return true}catch(err){alert('저장 공간을 확인해 주세요. 기록을 저장할 수 없습니다.');return false}}
function load(){try{const raw=localStorage.getItem(KEY);if(raw){state=validateData(JSON.parse(raw));return}}catch(err){console.warn('한결 저장 데이터 불러오기 실패',err)}for(const k of OLD_KEYS){try{const s=localStorage.getItem(k);if(s){state=validateData(migrateLegacy(JSON.parse(s)));save();return}}catch(err){console.warn('이전 버전 변환 실패',err)}}}
function migrateUnchangedDefaults(){
 try{
   const flag='hangeol-explicit-categories-r12';
   if(localStorage.getItem(flag)==='1')return;
   const before=state.categories.length;
   state.categories=state.categories.filter(c=>{
     const old=OLD_SEEDED.find(d=>d.name===c.name);
     const used=state.entries.some(r=>r.category===c.name)||state.activeTimer?.category===c.name||state.pendingSession?.category===c.name;
     return !old||used||c.goalMinutes!==0||c.emoji!==old.emoji||c.color.toUpperCase()!==old.color.toUpperCase();
   });
   if(state.categories.length!==before){
      if(!save())return;
   }
   localStorage.setItem(flag,'1');
 }catch(e){console.warn('기본 항목 정리 건너뜀',e)}
}
function notify(msg){$('toast').textContent=msg;$('toast').style.display='block';clearTimeout(toastId);toastId=setTimeout(()=>{$('toast').style.display='none'},2500)}
function showPage(which){if(!['home','stats','records','settings'].includes(which))return;page=which;document.querySelectorAll('.page').forEach(x=>x.hidden=x.id!==`page-${which}`);document.querySelectorAll('.navbtn[data-page]').forEach(x=>{x.classList.toggle('active',x.dataset.page===which);x.setAttribute('aria-current',x.dataset.page===which?'page':'false')});$('month-control').hidden=which==='stats'||which==='settings';render();window.scrollTo(0,0)}
function empty(el,a,b){el.replaceChildren();const wrap=document.createElement('div');wrap.className='empty';const p=document.createElement('div');p.textContent=a;wrap.append(p);if(b){const s=document.createElement('div');s.textContent=b;wrap.append(s)}el.append(wrap)}
function catBadge(cat){const e=document.createElement('span');e.className='entry-cat';e.style.backgroundColor=cat.color+'20';e.style.color=cat.color;setCategoryVisual(e,cat);e.append(document.createTextNode(' '+cat.name));return e;}

function recordRow(r){const cat=categoryFor(r.category);const row=document.createElement('div');row.className='entry';row.style.borderLeftColor=cat.color;const left=document.createElement('div');const top=document.createElement('div');top.className='entry-heading';const dow=['일','월','화','수','목','금','토'][new Date(`${r.date}T12:00:00`).getDay()];const date=document.createElement('span');date.className='entry-date';date.textContent=`${Number(r.date.slice(5,7))}/${Number(r.date.slice(8,10))} (${dow})`;top.append(catBadge(cat),date);const detail=document.createElement('div');detail.className='entry-detail';detail.textContent=r.note||({timer:'타이머 기록',range:'시간 기록',manual:'직접 입력'}[r.method]||'직접 입력');left.append(top,detail);const right=document.createElement('div');right.className='entry-right';const time=document.createElement('span');time.className='entry-time';time.textContent=duration(r.minutes);const edit=document.createElement('button');edit.className='icon-action';edit.innerHTML=icon('pencil');edit.setAttribute('aria-label',`${r.date} 기록 수정`);edit.onclick=()=>openEntry('edit',r);const del=document.createElement('button');del.className='icon-action danger';del.innerHTML=icon('trash');del.setAttribute('aria-label',`${r.date} 기록 삭제`);del.onclick=()=>deleteEntry(r);right.append(time,edit,del);row.append(left,right);return row;}
function renderPicker(){
 const picker=$('home-category-picker');picker.replaceChildren();
 if(!state.categories.length){const msg=document.createElement('p');msg.className='category-empty';msg.textContent='아직 추가한 항목이 없어요. 설정에서 항목을 추가해 주세요.';picker.append(msg);return;}
 for(const cat of state.categories){const b=document.createElement('button');b.type='button';b.className='cat-chip';b.classList.toggle('selected',cat.name===selectedName());b.disabled=!!state.activeTimer||!!state.pendingSession;b.style.setProperty('--chip-color',cat.color);b.style.setProperty('--chip-bg',cat.color+'18');const ico=document.createElement('span');ico.className='cat-symbol';setCategoryVisual(ico,cat);const label=document.createElement('span');label.textContent=cat.name;b.append(ico,label);b.setAttribute('aria-pressed',String(cat.name===selectedName()));b.onclick=()=>{if(state.activeTimer||state.pendingSession)return;selected=cat.name;const i=state.categories.findIndex(c=>c.name===selected);moveSlide(i);renderPicker();renderSelected()};picker.append(b)}
}

function renderSelected(){const status=$('selected-category-status');status.hidden=!state.categories.length;if(!state.categories.length){status.textContent='';return;}const cat=categoryFor(selectedName());status.textContent=cat.goalMinutes?`월 목표 ${duration(cat.goalMinutes)}`:'월 목표 미설정';}

function moveSlide(index,smooth=true){const count=state.categories.length;slideIndex=count?Math.max(0,Math.min(count-1,index)):0;const carousel=$('hero-carousel');if(count&&carousel.clientWidth)carousel.scrollTo({left:carousel.clientWidth*slideIndex,behavior:smooth?'smooth':'instant'});renderDots();}

function renderDots(){const size=state.categories.length;$('hero-prev').disabled=!size||slideIndex<=0;$('hero-next').disabled=!size||slideIndex>=size-1;$('hero-count').textContent=size?`${slideIndex+1} / ${size}`:'';const controls=document.querySelector('.hero-month-card .hero-controls');if(controls)controls.hidden=size===0;[...$('hero-dots').children].forEach((b,i)=>b.classList.toggle('active',i===slideIndex));}

function buildSlides(){
  const track=$('hero-carousel'),dots=$('hero-dots');
  track.replaceChildren();dots.replaceChildren();
  const entries=monthRecords();
  if(!state.categories.length){const msg=document.createElement('p');msg.className='category-empty';msg.textContent='설정에서 항목을 추가하면 누적시간이 표시돼요.';track.append(msg);moveSlide(0,false);return;}
  state.categories.forEach((cat,i)=>{
    const mins=sum(entries.filter(r=>r.category===cat.name));
    const goal=cat.goalMinutes;
    const pct=goal?Math.round(mins/goal*100):null;
    const ratio=goal?Math.min(100,mins/goal*100):0;
    const slide=document.createElement('article');slide.className='hero-slide';
    // The category directly precedes '이번 달 누적시간'; no icon or action button.
    const head=document.createElement('h2');head.className='slide-cat-head';
    const category=document.createElement('span');category.className='slide-cat-title';category.textContent=cat.name;
    const descriptor=document.createElement('span');descriptor.className='slide-month-title';descriptor.textContent='이번 달 누적시간';
    head.append(category,descriptor);
    const h=document.createElement('div');h.className='slide-headline';
    const number=document.createElement('div');number.className='slide-duration';
    const hours=Math.floor(mins/60),minute=mins%60;
    number.innerHTML=`<span class="time-value">${hours}</span><span class="time-unit">시간</span><span class="time-value">${minute}</span><span class="time-unit">분</span>`;
    const ring=document.createElement('div');ring.className='slide-ring';
    ring.setAttribute('role','progressbar');ring.setAttribute('aria-label',`${cat.name} 달성률`);
    ring.setAttribute('aria-valuemin','0');ring.setAttribute('aria-valuemax','100');
    if (pct!==null)ring.setAttribute('aria-valuenow',String(Math.min(100,pct)));
    else ring.setAttribute('aria-valuetext','목표 미설정');
    const circ=document.createElementNS('http://www.w3.org/2000/svg','svg');circ.setAttribute('viewBox','0 0 84 84');circ.setAttribute('aria-hidden','true');
    const bg=document.createElementNS('http://www.w3.org/2000/svg','circle');
    for(const [k,v] of Object.entries({cx:'42',cy:'42',r:'34',fill:'none',stroke:'#ebe9e7','stroke-width':'9'})) bg.setAttribute(k,v);
    const fg=bg.cloneNode();fg.setAttribute('stroke',cat.color);fg.setAttribute('stroke-linecap','round');fg.setAttribute('stroke-dasharray','213.628');
    fg.setAttribute('stroke-dashoffset',String(213.628*(1-ratio/100)));
    circ.append(bg,fg);
    const percent=document.createElement('b');percent.textContent=pct===null?'—':`${pct}%`;
    ring.append(circ,percent);h.append(number,ring);
    const stats=document.createElement('div');stats.className='slide-stats';
    const a=document.createElement('div');a.className='slide-stat';
    const b=document.createElement('div');b.className='slide-stat';
    const lab1=document.createElement('span');lab1.textContent='남은 시간';
    const val1=document.createElement('b');val1.textContent=goal?duration(Math.max(0,goal-mins)):'—';
    const lab2=document.createElement('span');lab2.textContent='이번 달 목표';
    const val2=document.createElement('b');val2.textContent=goal?duration(goal):'미설정';
    a.append(lab1,val1);b.append(lab2,val2);stats.append(a,b);
    // A안: 누적시간+원형 달성률을 한 그룹으로, 목표 정보는 오른쪽 세로 정렬.
    const overview=document.createElement('div');overview.className='slide-overview';
    if(hours>=100)overview.classList.add('time-long');
    overview.append(h,stats);
    slide.append(head,overview);track.append(slide);
    const dot=document.createElement('button');dot.className='slide-dot';dot.type='button';
    dot.setAttribute('aria-label',`${cat.name} 항목 보기`);
    dot.onclick=()=>{selected=cat.name;moveSlide(i);renderPicker();renderSelected()};dots.append(dot);
  });
  moveSlide(slideIndex,false);
}
function renderTimer(){const a=state.activeTimer,p=state.pendingSession,hasCategories=state.categories.length>0;$('start-timer').disabled=!hasCategories||!!a||!!p;$('stop-timer').disabled=!a;$('direct-input').disabled=!hasCategories;$('bottom-add').disabled=!hasCategories;$('start-timer').classList.toggle('active',!!a);$('stop-timer').classList.toggle('warn',!!a);$('timer-strip').hidden=!a;$('pending-strip').hidden=!p;if(a){const secs=Math.max(0,Math.floor((Date.now()-a.startedAt)/1000));$('timer-message').textContent=`${a.category} 기록 중`;$('timer-clock').textContent=`${pad(Math.floor(secs/3600))}:${pad(Math.floor(secs%3600/60))}:${pad(secs%60)}`;}if(p)$('pending-desc').textContent=`${p.category} · ${duration(p.minutes)} 저장 대기 중`;}

function renderHome(){renderPicker();renderSelected();buildSlides();renderTimer();const rec=monthRecords(),list=$('recent-list');list.replaceChildren();if(!rec.length)empty(list,'아직 이달의 기록이 없어요.','시간을 기록하면 이곳에 표시돼요.');else rec.slice(0,4).forEach(r=>list.append(recordRow(r)))}
function renderRecords(){const rec=monthRecords(),out=$('all-records');$('records-count').textContent=`${rec.length}개 기록`;out.replaceChildren();if(!rec.length)return empty(out,'이 달의 기록이 없어요.','홈에서 시간을 기록해 보세요.');let last='';for(const r of rec){if(r.date!==last){const h=document.createElement('div');h.className='detail-date';h.textContent=r.date;out.append(h);last=r.date}out.append(recordRow(r))}}
function renderStats(){const rec=annualRecords(),ms=monthsInYear(year),total=sum(rec),active=ms.filter(m=>rec.some(r=>r.date.startsWith(m+'-'))).length;$('year-period').textContent=`${year}년 9월 ~ ${year+1}년 8월`;$('year-total').textContent=duration(total);$('year-months').textContent=active+'개월';$('year-avg').textContent=active?duration(Math.round(total/active)):'0분';const bars=$('monthly-bars');bars.replaceChildren();const max=Math.max(60,...ms.map(m=>sum(rec.filter(r=>r.date.startsWith(m+'-')))));ms.forEach(m=>{const amt=sum(rec.filter(r=>r.date.startsWith(m+'-'))),row=document.createElement('div');row.className='bar-row';const lbl=document.createElement('span');lbl.className='bar-month';lbl.textContent=`${Number(m.slice(5,7))}월`;const track=document.createElement('div');track.className='bar-track';const fill=document.createElement('div');fill.className='bar-fill';fill.style.width=amt/max*100+'%';track.append(fill);const value=document.createElement('span');value.className='bar-value';value.textContent=amt?duration(amt):'—';row.append(lbl,track,value);bars.append(row)});$('stats-month').classList.toggle('active',scope==='month');$('stats-year').classList.toggle('active',scope==='year');const target=scope==='month'?monthRecords():rec,out=$('category-totals');out.replaceChildren();for(const cat of state.categories){const value=sum(target.filter(r=>r.category===cat.name)),goal=cat.goalMinutes*(scope==='month'?1:12);const row=document.createElement('div');row.className='cat-overview-row';const head=document.createElement('div');head.className='cat-overview-head';const name=document.createElement('div');name.className='cat-overview-name';const mini=document.createElement('span');mini.className='mini-icon';setCategoryVisual(mini,cat);mini.style.backgroundColor=cat.color+'1D';name.append(mini,document.createTextNode(cat.name));const amount=document.createElement('span');amount.className='cat-overview-time';amount.textContent=duration(value);head.append(name,amount);const desc=document.createElement('div');desc.className='cat-sub';desc.textContent=goal?`목표 ${duration(goal)} · ${Math.round(value/goal*100)}% 달성`:'목표 미설정';const track=document.createElement('div');track.className='cat-track';const fill=document.createElement('div');fill.className='cat-fill';fill.style.backgroundColor=cat.color;fill.style.width=(goal?Math.min(100,value/goal*100):0)+'%';track.append(fill);row.append(head,desc,track);out.append(row)}}
function renderSettings(){const out=$('category-settings');out.replaceChildren();if(!state.categories.length){const msg=document.createElement('p');msg.className='category-empty';msg.textContent='등록된 항목이 없어요. 위의 항목 추가 버튼으로 시작해 주세요.';out.append(msg);return;}for(const cat of state.categories){const row=document.createElement('div');row.className='setting-cat';const symbol=document.createElement('div');symbol.className='setting-cat-icon';symbol.style.backgroundColor=cat.color+'20';setCategoryVisual(symbol,cat);const copy=document.createElement('div');copy.className='setting-cat-copy';const name=document.createElement('strong');name.textContent=cat.name;const sub=document.createElement('div');sub.textContent=cat.goalMinutes?'월 목표 '+duration(cat.goalMinutes):'월 목표 미설정';copy.append(name,sub);const actions=document.createElement('div');actions.className='cat-setting-actions';const g=document.createElement('button');g.textContent='목표';g.onclick=()=>openGoal(cat.name);const e=document.createElement('button');e.textContent='수정';e.onclick=()=>openCategory(cat.name);actions.append(g,e);row.append(symbol,copy,actions);out.append(row)}}

function render(){$('month-label').textContent=niceMonth(month);if(page==='home')renderHome();else if(page==='records')renderRecords();else if(page==='stats')renderStats();else if(page==='settings')renderSettings()}
function startTimer(){if(state.activeTimer||state.pendingSession)return;const name=selectedName();if(!state.categories.some(c=>c.name===name)){alert('기록할 항목을 선택해 주세요.');return}state.activeTimer={startedAt:Date.now(),category:name};if(!save()){state.activeTimer=null;return}renderTimer();notify('시간 기록을 시작했어요')}
function stopTimer(){const a=state.activeTimer;if(!a)return;const elapsed=Math.max(1,Math.round((Date.now()-a.startedAt)/60000));if(elapsed>60000){alert('시간이 너무 오래 경과했습니다. 직접 입력으로 기록해 주세요.');return}state.pendingSession={date:localDate(new Date(a.startedAt)),minutes:elapsed,category:a.category};state.activeTimer=null;if(!save()){state.activeTimer=a;state.pendingSession=null;return}renderTimer();openEntry('timer')}
function makeEntryChips(name){const el=$('entry-category-buttons');el.replaceChildren();for(const cat of state.categories){const b=document.createElement('button');b.type='button';b.className='cat-chip';b.style.setProperty('--chip-color',cat.color);b.style.setProperty('--chip-bg',cat.color+'1C');const ico=document.createElement('span');ico.className='cat-symbol';setCategoryVisual(ico,cat);const tx=document.createElement('span');tx.textContent=cat.name;const check=document.createElement('span');check.className='cat-check';check.textContent='✓';b.append(ico,tx,check);b.onclick=()=>selectEntryCat(cat.name);el.append(b)}selectEntryCat(name)}
function selectEntryCat(name){$('entry-category').value=name;[...$('entry-category-buttons').children].forEach((b,i)=>{const flag=state.categories[i].name===name;b.classList.toggle('selected',flag);b.setAttribute('aria-pressed',String(flag))})}
function openEntry(mode='manual',r=null){if(!state.categories.length){alert('설정에서 항목을 먼저 추가해 주세요.');return;}modalMode=mode;editingId=mode==='edit'?r.id:null;const curr=mode==='edit'?r:mode==='timer'?state.pendingSession:null;if(mode==='timer'&&!curr)return;$('entry-title').textContent=mode==='edit'?'기록 수정':mode==='timer'?'타이머 기록 저장':'시간 직접 입력';$('entry-sub').textContent=mode==='timer'?'측정된 시간이 자동 입력됐어요. 시간과 분을 수정한 뒤 저장할 수 있어요.':'날짜·항목·시간을 입력해 주세요.';$('entry-date').value=curr?.date||localDate();$('entry-hours').value=curr?Math.floor(curr.minutes/60):0;$('entry-minutes').value=curr?curr.minutes%60:0;$('entry-note').value=curr?.note||'';makeEntryChips(curr?.category||selectedName());const readonly=mode==='timer';$('entry-date').readOnly=readonly;$('entry-hours').readOnly=false;$('entry-minutes').readOnly=false;$('entry-dialog').showModal()}

function saveEntry(e){e.preventDefault();const date=$('entry-date').value,cat=txt($('entry-category').value,30),note=txt($('entry-note').value,200),h=Number($('entry-hours').value),m=Number($('entry-minutes').value),mins=h*60+m;if(!validDate(date)||!state.categories.some(c=>c.name===cat)||!Number.isInteger(h)||h<0||h>999||!Number.isInteger(m)||m<0||m>59||mins<1||mins>60000){alert('날짜, 항목, 시간을 확인해 주세요.');return}const before=JSON.stringify(state);if(editingId){const index=state.entries.findIndex(r=>r.id===editingId);if(index<0){alert('기록을 찾을 수 없어요.');return}state.entries[index]={...state.entries[index],date,category:cat,note,minutes:mins}}else state.entries.push({id:uid(),date,category:cat,note,minutes:mins,method:modalMode==='timer'?'timer':'manual'});if(modalMode==='timer')state.pendingSession=null;if(!save()){state=JSON.parse(before);return}month=date.slice(0,7);selected=cat;slideIndex=Math.max(0,state.categories.findIndex(c=>c.name===selected));$('entry-dialog').close();render();notify(editingId?'기록을 수정했어요':'기록을 저장했어요')}
function deleteEntry(r){if(!confirm(`${r.date} · ${r.category} ${duration(r.minutes)} 기록을 삭제할까요?`))return;const before=state.entries;state.entries=before.filter(x=>x.id!==r.id);if(!save()){state.entries=before;return}render();notify('기록을 삭제했어요')}
function renderCategoryOptions(){
 const root=$('cat-icon-choices');root.replaceChildren();
 for(const key of PRESET_NAMES){const selectedKey=$('cat-icon').value;const b=document.createElement('button');b.type='button';b.className='cat-chip preset-chip';b.classList.toggle('selected',selectedKey===key);b.style.setProperty('--chip-color','#747a7d');b.style.setProperty('--chip-bg','#f1f2f2');b.setAttribute('aria-pressed',String(selectedKey===key));
   if(!editingCategory&&state.categories.some(c=>c.name===key)){b.disabled=true;b.title='이미 추가된 항목';}
   const ico=document.createElement('span');ico.className='cat-symbol';setCategoryVisual(ico,{name:key,iconKey:key});const label=document.createElement('span');label.textContent=key;b.append(ico,label);
   b.onclick=()=>{$('cat-icon').value=key;if(!editingCategory)$('cat-color').value=PRESET_COLORS[key]||COLORS[0];renderCategoryOptions();};root.append(b);
 }
}
function openCategory(name){editingCategory=name||null;const cat=name?categoryFor(name):{name:'',emoji:'',iconKey:'',color:COLORS[0],goalMinutes:0};$('category-title').textContent=name?`${name} 설정`:'항목 추가';$('cat-icon').value=name?(cat.iconKey|| (PRESET_NAMES.includes(name)?name:'기타')):'';$('cat-color').value=cat.color;if(!$('cat-color').value)$('cat-color').value=COLORS[0];$('cat-goal-h').value=Math.floor(cat.goalMinutes/60);$('cat-goal-m').value=cat.goalMinutes%60;$('delete-category').style.display=name?'block':'none';renderCategoryOptions();$('category-dialog').showModal()}

function saveCategory(e){e.preventDefault();const iconKey=$('cat-icon').value;const name=editingCategory||iconKey;const color=$('cat-color').value,h=Number($('cat-goal-h').value),m=Number($('cat-goal-m').value),goalMinutes=h*60+m;if(!name||!PRESET_NAMES.includes(iconKey)){alert('추가할 아이콘을 선택해 주세요.');return;}if(!/^#[0-9a-fA-F]{6}$/.test(color)||!Number.isInteger(h)||!Number.isInteger(m)||h<0||h>999||m<0||m>59||goalMinutes>60000){alert('목표 시간과 색상을 확인해 주세요.');return;}if(!editingCategory&&state.categories.some(c=>c.name===name)){alert('이미 추가된 항목이에요.');return;}const old=JSON.stringify(state);if(editingCategory){const cat=state.categories.find(c=>c.name===editingCategory);if(!cat)return;Object.assign(cat,{iconKey,color,goalMinutes,emoji:PRESET_EMOJI[iconKey]||cat.emoji});}else state.categories.push({name,emoji:PRESET_EMOJI[iconKey],iconKey,color,goalMinutes});selected=name;slideIndex=state.categories.findIndex(c=>c.name===name);if(!save()){state=JSON.parse(old);return}$('category-dialog').close();render();notify('항목을 저장했어요')}

function deleteCategory(){const name=editingCategory;if(!name)return;if(state.entries.some(r=>r.category===name)||state.activeTimer?.category===name||state.pendingSession?.category===name){alert('기록이 있는 항목은 삭제할 수 없습니다. 기록은 남겨 두고 목표나 아이콘을 변경할 수 있어요.');return;}if(!confirm(`「${name}」 항목을 삭제할까요?`))return;const before=JSON.stringify(state);state.categories=state.categories.filter(c=>c.name!==name);selected=state.categories[0]?.name||'';slideIndex=0;if(!save()){state=JSON.parse(before);return}$('category-dialog').close();render();notify('항목을 삭제했어요')}

function openGoal(name){const cat=state.categories.find(c=>c.name===name);if(!cat)return;editingGoal=name;$('goal-title').textContent=`${cat.emoji} ${cat.name} 월 목표 설정`;$('goal-hours').value=Math.floor(cat.goalMinutes/60);$('goal-mins').value=cat.goalMinutes%60;$('goal-dialog').showModal()}
function saveGoal(e){e.preventDefault();const cat=state.categories.find(c=>c.name===editingGoal);if(!cat)return;const h=Number($('goal-hours').value),m=Number($('goal-mins').value),val=h*60+m;if(!Number.isInteger(h)||!Number.isInteger(m)||h<0||h>999||m<0||m>59||val>60000){alert('목표 시간을 확인해 주세요.');return}const old=cat.goalMinutes;cat.goalMinutes=val;if(!save()){cat.goalMinutes=old;return}$('goal-dialog').close();render();notify('목표 시간을 저장했어요')}
function download(name,content,type){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000)}
const cell=s=>'"'+String(s??'').replaceAll('"','""')+'"';
function backup(){download(`한결_전체백업_${localDate()}.json`,JSON.stringify({...state,version:2,exportedAt:new Date().toISOString()},null,2),'application/json;charset=utf-8');notify('백업 파일을 저장했어요')}
function csv(){const lines=[['날짜','항목','시간','분','메모','입력방식'],...state.entries.slice().sort((a,b)=>a.date.localeCompare(b.date)).map(r=>[r.date,r.category,Math.floor(r.minutes/60),r.minutes%60,r.note,r.method])];download(`한결_기록_${localDate()}.csv`,'\ufeff'+lines.map(r=>r.map(cell).join(',')).join('\r\n'),'text/csv;charset=utf-8');notify('CSV 파일을 저장했어요')}
async function importBackup(file){if(!file)return;try{if(file.size>5_000_000)throw Error('파일 크기가 너무 큽니다.');const data=JSON.parse(await file.text());const incoming=Array.isArray(data.entries)&&Array.isArray(data.goalChanges)?validateData(data):data.records||Array.isArray(data.entries)?validateData(migrateLegacy(data)):null;if(!incoming)throw Error('지원하지 않는 파일입니다.');if(!confirm('현재 앱의 모든 기록을 백업 내용으로 교체할까요? 진행 전에 현재 기록을 백업해 주세요.'))return;const before=state;state=incoming;if(!save()){state=before;return}month=thisMonth();year=startYear(month);slideIndex=0;selected=state.categories[0]?.name||'';render();notify('백업을 복원했어요')}catch(e){alert(`복원할 수 없습니다: ${e.message}`)}finally{$('import-file').value=''}}
$('hero-prev').onclick=()=>moveSlide(slideIndex-1);$('hero-next').onclick=()=>moveSlide(slideIndex+1);
$('hero-carousel').addEventListener('scroll',()=>{const el=$('hero-carousel');if(!el.clientWidth)return;const n=Math.max(0,Math.min(state.categories.length-1,Math.round(el.scrollLeft/el.clientWidth)));if(n!==slideIndex){slideIndex=n;renderDots();if(!state.activeTimer&&!state.pendingSession){selected=state.categories[n].name;renderPicker();renderSelected()}}},{passive:true});
$('hero-carousel').addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();moveSlide(slideIndex+1)}if(e.key==='ArrowLeft'){e.preventDefault();moveSlide(slideIndex-1)}});
$('month-prev').onclick=()=>{month=toMonth(month,-1);render()};$('month-next').onclick=()=>{month=toMonth(month,1);render()};
document.querySelectorAll('.navbtn[data-page]').forEach(b=>b.onclick=()=>showPage(b.dataset.page));
$('bottom-add').onclick=$('direct-input').onclick=()=>openEntry('manual');$('start-timer').onclick=startTimer;$('stop-timer').onclick=stopTimer;$('finish-pending').onclick=()=>openEntry('timer');$('discard-pending').onclick=()=>{if(confirm('저장 대기 중인 기록을 취소할까요?')){state.pendingSession=null;save();render()}};
$('see-all').onclick=()=>showPage('records');$('entry-form').onsubmit=saveEntry;$('cancel-entry').onclick=()=>$('entry-dialog').close();
$('year-prev').onclick=()=>{year--;renderStats()};$('year-next').onclick=()=>{year++;renderStats()};$('stats-month').onclick=()=>{scope='month';renderStats()};$('stats-year').onclick=()=>{scope='year';renderStats()};
$('add-category').onclick=()=>openCategory();$('category-form').onsubmit=saveCategory;$('cancel-category').onclick=()=>$('category-dialog').close();$('delete-category').onclick=deleteCategory;
$('goal-form').onsubmit=saveGoal;$('goal-cancel').onclick=()=>$('goal-dialog').close();$('export-json').onclick=backup;$('export-csv').onclick=csv;$('import-json').onclick=()=>$('import-file').click();$('import-file').onchange=e=>importBackup(e.target.files?.[0]);
load();migrateUnchangedDefaults();selected=state.activeTimer?.category||state.pendingSession?.category||state.categories[0]?.name||'';render();setInterval(()=>{if(page==='home'&&state.activeTimer)renderTimer()},1000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)render()});if('serviceWorker'in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./sw.js').catch(err=>console.warn('캐시 등록 실패',err));
})();
