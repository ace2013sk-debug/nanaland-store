/* 나나랜드 스토어 공통 헤더 기능: 알림받기, 상단 메뉴, 더보기 */
(function(){
  var HOME='/nanaland-store/';
  var ST={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{localStorage.setItem(k,v)}catch(e){}}};
  function toast(m){var t=document.getElementById('nn-ts');if(!t){t=document.createElement('div');t.id='nn-ts';t.style.cssText='position:fixed;left:50%;bottom:40px;transform:translateX(-50%);background:#333;color:#fff;padding:12px 20px;border-radius:24px;font-size:13px;z-index:99;max-width:86vw;text-align:center';document.body.appendChild(t)}t.textContent=m;t.style.display='block';clearTimeout(window.__nt);window.__nt=setTimeout(function(){t.style.display='none'},2200)}
  window.nnToast=toast;
  var CATS={all:{t:'상품전체',l:[0,1,2,3,4,5,6,7]},best:{t:'베스트',l:[0,1,2,3,4,5,6,7],rk:1},budget:{t:'가계부 에이전트',l:[0,1,2,4]},asset:{t:'자산·투자',l:[3,5]}};
  var PANELS={
    live:['📺 쇼핑 LIVE','예정된 라이브가 없습니다.','라이브 일정이 등록되면 ‘알림받기’를 설정한 고객께 안내됩니다. [확인 필요]'],
    notice:['📢 공지사항','등록된 공지사항이 없습니다.','스토어 소식이 생기면 이곳에 게시됩니다.'],
    story:['📖 쇼핑스토리','등록된 쇼핑스토리가 없습니다.','에이전트 활용 팁과 사용 후기를 준비 중입니다. [확인 필요]'],
    event:['🎁 리뷰이벤트','진행 중인 리뷰 이벤트가 없습니다.','구매 후기 이벤트는 판매 시작 후 안내됩니다. [확인 필요]'],
    cs:['🎧 고객센터','고객센터 정보가 아직 등록되지 않았습니다.','운영 시간·연락처: [확인 필요]']
  };
  var isIdx=!!document.getElementById('g');
  var navAs=[].slice.call(document.querySelectorAll('nav .w a'));
  var map={};navAs.forEach(function(a){var t=a.textContent.replace(/\s+/g,' ').trim();
    if(t==='쇼핑 LIVE')map.live=a;else if(t==='베스트')map.best=a;else if(t==='가계부 에이전트')map.budget=a;else if(t==='자산·투자')map.asset=a;else if(t==='전체상품')map.all=a;else if(t==='FOR YOU')map.foryou=a;else if(t==='공지사항')map.notice=a;else if(t==='쇼핑스토리')map.story=a;else if(t==='리뷰이벤트')map.event=a;else if(t.indexOf('더보기')===0)map.more=a});
  Object.keys(map).forEach(function(k){if(k!=='more'){map[k].style.cursor='pointer';map[k].setAttribute('role','link');map[k].onclick=function(e){e.preventDefault();go(k)}}});
  function setActive(k){navAs.forEach(function(a){a.classList.remove('on')});if(map[k]){map[k].classList.remove('off');map[k].classList.add('on')}
    navAs.forEach(function(a){if(a!==map[k]&&(a===map.notice||a===map.story||a===map.event))a.classList.add('off')})}
  function recent(){try{return JSON.parse(ST.get('nn_recent')||'[]')}catch(e){return[]}}
  function go(k){
    if(!isIdx){location.href=HOME+'?c='+k;return}
    var sec=document.querySelector('.sec h3'),sort=document.getElementById('sort'),g=document.getElementById('g'),pn=document.getElementById('nn-panel');
    if(!pn){pn=document.createElement('div');pn.id='nn-panel';pn.className='w';pn.style.cssText='display:none;text-align:center;padding:60px 0 100px';g.parentNode.insertBefore(pn,g.nextSibling)}
    setActive(k);try{history.replaceState(null,'','?c='+k)}catch(e){}
    var target=document.querySelector('.sec');
    if(PANELS[k]){var p=PANELS[k];sec.textContent=p[0].replace(/^\S+\s/,'');sort.style.display='none';g.style.display='none';pn.style.display='block';
      pn.innerHTML='<div style="font-size:54px">'+p[0].split(' ')[0]+'</div><h4 style="font-size:20px;margin:14px 0 8px">'+p[1]+'</h4><p style="color:#888;font-size:14px;line-height:1.7">'+p[2]+'</p>'+(k==='live'?'<button id="nn-lv" style="margin-top:22px;border:1px solid #ccc;background:#fff;padding:10px 24px;cursor:pointer;font-family:inherit">🔔 알림받기</button>':'')+'<div><button id="nn-all" style="margin-top:22px;border:0;background:#8a5cf0;color:#fff;padding:12px 28px;cursor:pointer;font-family:inherit;font-weight:700">상품 보러 가기</button></div>';
      var b=document.getElementById('nn-all');b.onclick=function(){go('all')};var l=document.getElementById('nn-lv');if(l)l.onclick=function(){alarm(true)};}
    else{var list,title;
      if(k==='foryou'){var r=recent().map(function(n){return n-1}).filter(function(i){return i>=0&&i<8});var seen={};r=r.filter(function(i){return seen[i]?0:(seen[i]=1)});
        if(r.length){list=r;title='FOR YOU · 최근 본 상품'}else{list=[0,3,4];title='FOR YOU · 이런 상품은 어때요?'}}
      else{list=CATS[k].l;title=CATS[k].t}
      sec.textContent=title;sort.style.display='';pn.style.display='none';g.style.display='';window.drawCards(list,k==='best');}
    window.scrollTo({top:target.getBoundingClientRect().top+window.pageYOffset-70,behavior:'smooth'});
  }
  window.nnGo=go;
  /* 알림받기 */
  var al=document.querySelector('.alarm');
  function alarm(toggleOnly){var on=ST.get('nn_alarm')==='1';if(toggleOnly&&on){toast('이미 알림받기 중입니다.');return}
    on=!on;ST.set('nn_alarm',on?'1':'0');paint();toast(on?'알림받기 설정됨 — 새 소식이 있으면 알려드립니다. (시안: 실제 알림은 발송되지 않습니다)':'알림받기를 해제했습니다.')}
  function paint(){if(!al)return;var on=ST.get('nn_alarm')==='1';al.innerHTML=on?'🔔 알림받는 중':'🔔 알림받기';al.style.background=on?'#f4eeff':'';al.style.borderColor=on?'#cdb8f5':'';al.style.color=on?'#6c3fd1':''}
  if(al){al.style.cursor='pointer';al.onclick=function(){alarm(false)};paint()}
  /* 로고(스토어명) → 홈 */
  var h1=document.querySelector('.head h1');if(h1){h1.style.cursor='pointer';h1.onclick=function(){if(isIdx)go('all');else location.href=HOME}}
  /* 더보기 */
  if(map.more){var m=map.more,box=document.createElement('div');box.style.cssText='position:absolute;right:0;top:50px;background:#fff;border:1px solid #ddd;box-shadow:0 4px 14px rgba(0,0,0,.1);min-width:150px;display:none;z-index:50;text-align:left';
    [['전체상품','all'],['판매자 정보','info'],['고객센터','cs']].forEach(function(x){var d=document.createElement('div');d.textContent=x[0];d.style.cssText='padding:12px 18px;font-size:14px;cursor:pointer;color:#222;white-space:nowrap';d.onmouseenter=function(){d.style.background='#f6f2ff'};d.onmouseleave=function(){d.style.background=''};
      d.onclick=function(ev){ev.stopPropagation();box.style.display='none';if(x[1]==='info'){var f=document.querySelector('footer');f.scrollIntoView({behavior:'smooth',block:'center'});f.style.transition='background .4s';f.style.background='#f6f2ff';setTimeout(function(){f.style.background=''},1800)}else go(x[1])};box.appendChild(d)});
    var par=m.parentNode;par.style.position='relative';par.appendChild(box);
    m.style.cursor='pointer';m.onclick=function(e){e.preventDefault();e.stopPropagation();box.style.display=box.style.display==='block'?'none':'block'};
    document.addEventListener('click',function(){box.style.display='none'})}
  /* 상세 페이지: 최근 본 상품 기록 */
  var mm=location.pathname.match(/\/p\/(\d)\/?/);if(mm){var r=recent().filter(function(x){return x!==+mm[1]});r.unshift(+mm[1]);ST.set('nn_recent',JSON.stringify(r.slice(0,6)))}
  /* 인덱스: ?c= 초기 상태 */
  if(isIdx){var q=(location.search.match(/[?&]c=(\w+)/)||[])[1];if(q&&(CATS[q]||PANELS[q]||q==='foryou'))setTimeout(function(){go(q)},60)}
})();
