(function(){
var D=window.NN_REV||{};
var css='.st{position:relative;display:inline-block;font-size:15px;letter-spacing:1px;line-height:1;color:#ddd;vertical-align:middle}.st i{position:absolute;left:0;top:0;overflow:hidden;white-space:nowrap;color:#f5a623;font-style:normal}'
+'.rs{display:flex;gap:28px;align-items:center;padding:22px 10px;border-bottom:1px solid #eee;flex-wrap:wrap}.rs .rbig{text-align:center;min-width:120px}.rs .rbig b{display:block;font-size:44px;font-weight:900;color:#222;line-height:1.1}.rs .rbig .st{font-size:20px;margin-top:6px}.rs .rbig span.c{display:block;font-size:12px;color:#888;margin-top:6px}'
+'.rs .bars{flex:1;min-width:200px}.rs .bars div{display:flex;align-items:center;gap:8px;font-size:12px;color:#777;margin:3px 0}.rs .bars em{font-style:normal;width:28px}.rs .bars u{flex:1;height:8px;background:#eee;border-radius:4px;overflow:hidden;text-decoration:none;display:block}.rs .bars u s{display:block;height:100%;background:#f5a623;text-decoration:none}.rs .bars span{width:28px;text-align:right}'
+'.rsn{margin:16px 0 0;padding:12px 14px;background:#fff8e6;border:1px solid #f3dfa5;border-radius:8px;font-size:13px;color:#8a6d1c;line-height:1.6}'
+'.rbar{display:flex;justify-content:flex-end;gap:12px;padding:14px 0 8px;font-size:13px;color:#999}.rbar a{cursor:pointer}.rbar a.on{color:#222;font-weight:800}'
+'.ri{padding:20px 6px;border-bottom:1px solid #f0f0f0}.ri .h{display:flex;align-items:center;gap:10px;font-size:12px;color:#999}.ri .h b{color:#444;font-weight:700}.ri .h em{font-style:normal;background:#f3f0fa;color:#7b5cc7;padding:2px 8px;border-radius:10px;font-size:11px}.ri p{font-size:14px!important;color:#333!important;line-height:1.75;text-align:left!important;padding:10px 0 8px!important;word-break:keep-all}.ri .hp{display:inline-block;border:1px solid #ddd;border-radius:14px;padding:4px 12px;font-size:12px;color:#777;cursor:pointer;user-select:none}.ri .hp.on{border-color:#8a5cf0;color:#8a5cf0;background:#f8f4ff}'
+'.rmore{display:block;margin:20px auto 0;padding:12px 40px;border:1px solid #ccc;border-radius:22px;background:#fff;font-size:14px;cursor:pointer}'
+'.rsum{margin:10px 0 0;font-size:14px;color:#555;cursor:pointer}.rsum b{color:#222;margin:0 4px 0 6px}';
var s=document.createElement('style');s.textContent=css;document.head.appendChild(s);
function stars(v){return '<span class="st">★★★★★<i style="width:'+(v/5*100)+'%">★★★★★</i></span>'}
function stat(id){var a=D[id]||[];if(!a.length)return{n:0,avg:0};var t=0;a.forEach(function(r){t+=r[1]});return{n:a.length,avg:t/a.length}}
window.nnRev={stat:stat,stars:stars};
var m=location.pathname.match(/\/p\/(\d)\/?/);if(!m)return;
var id=m[1],a=(D[id]||[]).map(function(r,i){return{n:r[0],r:r[1],t:r[2],h:r[3],i:i}}),st=stat(id);if(!a.length)return;
var tab=document.querySelector('.tabs a[href="#rv"]');if(tab)tab.textContent='리뷰 '+st.n;
var rsum=document.getElementById('rsum');if(rsum){rsum.innerHTML=stars(st.avg)+'<b>'+st.avg.toFixed(1)+'</b>리뷰 '+st.n+'건';rsum.onclick=function(){document.getElementById('rv').scrollIntoView({behavior:'smooth'})}}
var box=document.getElementById('rv');if(!box)return;
var dist={};a.forEach(function(r){var k=Math.ceil(r.r);dist[k]=(dist[k]||0)+1});
var bars='';for(var k=5;k>=1;k--){var c=dist[k]||0;bars+='<div><em>'+k+'점</em><u><s style="width:'+(c/a.length*100)+'%"></s></u><span>'+c+'</span></div>'}
var mode=0,shown=10;
function sorted(){var b=a.slice();if(mode===0)b.sort(function(x,y){return y.h-x.h||x.i-y.i});else if(mode===1)b.sort(function(x,y){return y.r-x.r||x.i-y.i});else b.sort(function(x,y){return x.r-y.r||x.i-y.i});return b}
function esc(t){return t.replace(/&/g,'&amp;').replace(/</g,'&lt;')}
function draw(){var b=sorted(),h='';b.slice(0,shown).forEach(function(r){h+='<div class="ri"><div class="h">'+stars(r.r)+'<b>'+r.r.toFixed(1)+'</b><span>'+esc(r.n)+'</span><em>샘플</em></div><p>'+esc(r.t)+'</p><span class="hp" data-i="'+r.i+'">도움돼요 <span>'+r.h+'</span></span></div>'});
 document.getElementById('rl').innerHTML=h;var mb=document.getElementById('rm');mb.style.display=shown<b.length?'block':'none';mb.textContent='리뷰 더보기 ('+Math.min(shown,b.length)+' / '+b.length+')';
 [].forEach.call(document.querySelectorAll('#rbar a'),function(x,i){x.className=i===mode?'on':''})}
box.innerHTML='<h3>리뷰 <span style="color:#8a5cf0">'+st.n+'</span></h3><div class="rsn">※ 이 리뷰는 상품 페이지 구성을 위해 작성한 <b>샘플(예시) 리뷰</b>이며, 실제 구매자의 후기가 아닙니다.</div><div class="rs"><div class="rbig"><b>'+st.avg.toFixed(1)+'</b>'+stars(st.avg)+'<span class="c">5점 만점 · 리뷰 '+st.n+'건</span></div><div class="bars">'+bars+'</div></div><div class="rbar" id="rbar"><a>추천순</a><a>평점 높은순</a><a>평점 낮은순</a></div><div id="rl"></div><button class="rmore" id="rm"></button>';
document.getElementById('rbar').onclick=function(e){var t=e.target.closest('a');if(!t)return;mode=[].indexOf.call(t.parentNode.children,t);shown=10;draw()};
document.getElementById('rm').onclick=function(){shown+=10;draw()};
document.getElementById('rl').onclick=function(e){var t=e.target.closest('.hp');if(!t)return;var r=a[+t.dataset.i],on=t.classList.toggle('on');r.h+=on?1:-1;t.lastChild.textContent=r.h};
draw();
})();
