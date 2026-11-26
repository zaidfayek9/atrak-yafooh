(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var AR = function (n) { return String(n).replace(/\d/g, function (d) { return '٠١٢٣٤٥٦٧٨٩'[d]; }); };
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // mobile menu
  var mb = $('#menuBtn'), nav = $('#nav');
  mb.addEventListener('click', function () { var o = nav.classList.toggle('open'); mb.setAttribute('aria-expanded', o); });
  $$('#nav a').forEach(function (a) { a.addEventListener('click', function () { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); }); });
  // filter
  $$('.fl').forEach(function (b) {
    b.addEventListener('click', function () {
      var f = b.dataset.f;
      $$('.fl').forEach(function (x) { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', x === b); });
      $$('.card').forEach(function (c) { c.hidden = !(f === 'all' || c.dataset.fam === f); });
    });
  });
  // journal chapters
  var NOTES = [['العود: لماذا يزداد جودة مع الوقت', 'ينتج الخشب العطري حين تصاب شجرة الأكويلاريا بالفطر فتفرز راتنجها دفاعاً عن نفسها. بعد التقطير البطيء يُترك الدهن سنوات، وكل سنة تضيف عمقاً لا يُشترى بالمال.'], ['العنبر: دفء يبقى على الثوب', 'يمنح العنبر الرمادي العطر قاعدته الدافئة ويثبّت النوتات الخفيفة فوقه. لذلك نضعه في قاعدة معظم توقيعاتنا، وهو ما يبقى في الثوب إلى اليوم التالي.'], ['ورد الطائف: حصاد قبل الفجر', 'يُقطف الورد الطائفي في ساعات الفجر الأولى قبل أن تسرق الشمس زيته. من آلاف البتلات تخرج قطرات قليلة، ولهذا يُقدَّر ثمنه.']];
  var curCh = null;
  function setCh(i) { curCh = i; $$('.ch').forEach(function (x) { var on = i !== null && +x.dataset.c === i; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); }); var nt = $('#notes'); nt.hidden = i === null; nt.innerHTML = i === null ? '' : '<b>' + NOTES[i][0] + '</b><p>' + NOTES[i][1] + '</p>'; }
  var chTouch = false, chTimer = null, chBox = $('#chapters') && $('#chapters').parentNode;
  function chPlace() { var nt = $('#notes'), ul = $('#chapters'); if (!nt || !ul) return; if (window.innerWidth > 900) nt.style.top = (ul.offsetTop + ul.offsetHeight + 12) + 'px'; else nt.style.top = ''; }
  function chClear() { if (chTimer) { clearTimeout(chTimer); chTimer = null; } }
  function chArm() { chClear(); chTimer = setTimeout(function () { setCh(null); document.body.classList.remove('reading'); }, 3000); }
  var setCh0 = setCh;
  setCh = function (i) { setCh0(i); document.body.classList.toggle('reading', i !== null); if (i === null) chClear(); else { chPlace(); } };
  $$('.ch').forEach(function (b) { b.addEventListener('click', function () { var n = +b.dataset.c; setCh(curCh === n ? null : n); if (curCh !== null && (chTouch || !chBox.matches(':hover'))) chArm(); }); });
  document.addEventListener('pointerdown', function (e) { chTouch = e.pointerType === 'touch' || e.pointerType === 'pen'; }, true);
  if (chBox) { chBox.addEventListener('mouseenter', function () { if (!chTouch) chClear(); }); chBox.addEventListener('mouseleave', function () { if (curCh !== null && !chTouch) chArm(); }); }
  setInterval(function () { if (curCh === null) return; var hov = false; try { hov = chBox.matches(':hover'); } catch (e) {} if (chTouch) return; if (hov) chClear(); else if (!chTimer) chArm(); }, 400);
  window.addEventListener('resize', chPlace);
  // collection card flip
  function flipCard(c, on) { c.classList.toggle('flip', on); var b = c.querySelector('.fbtn'); b.setAttribute('aria-expanded', on); c.querySelector('.cb').setAttribute('aria-hidden', !on); $$('.cbtn,.bk', c).forEach(function (x) { x.tabIndex = on ? 0 : -1; }); (on ? c.querySelector('.bk') : b).focus({ preventScroll: true }); }
  $$('.card').forEach(function (c) { c.querySelector('.fbtn').addEventListener('click', function () { flipCard(c, true); }); c.querySelector('.bk').addEventListener('click', function () { flipCard(c, false); }); c.querySelector('.cbtn').addEventListener('click', function () { flipCard(c, false); }); c.addEventListener('keydown', function (e) { if (e.key === 'Escape' && c.classList.contains('flip')) flipCard(c, false); }); });
  setCh(null);
  // countdown (to a fixed date 60 days after first load day start)
  var target = new Date('2026-11-27T00:00:00+03:00');
  function tick() { var d = Math.max(0, target - new Date()), s = Math.floor(d / 1000);
    $('#cd-d').textContent = AR(Math.floor(s / 86400)); $('#cd-h').textContent = AR(Math.floor(s % 86400 / 3600)); $('#cd-m').textContent = AR(Math.floor(s % 3600 / 60)); $('#cd-s').textContent = AR(s % 60); }
  tick(); setInterval(tick, 1000);
  // forms
  // Saudi mobile: 05XXXXXXXX, 5XXXXXXXX, +9665XXXXXXXX, 009665XXXXXXXX, 9665XXXXXXXX (Arabic digits accepted)
  function saPhone(v) { v = String(v).replace(/[\u0660-\u0669]/g, function (d) { return d.charCodeAt(0) - 0x660; }).replace(/[\u06F0-\u06F9]/g, function (d) { return d.charCodeAt(0) - 0x6F0; }).replace(/[\s\-().\u200e\u200f]/g, ''); var m = /^(?:\+?966|00966|0)?(5\d{8})$/.exec(v); return m ? m[1] : null; }
  function phoneFilter(el) { if (!el) return; el.addEventListener('input', function () { var v = el.value.replace(/[\u0660-\u0669]/g, function (d) { return d.charCodeAt(0) - 0x660; }).replace(/[^0-9+\s\-]/g, ''); if (v !== el.value) el.value = v; }); }
  ['subMail', 'cMail', 'fmail'].forEach(function (i) { phoneFilter(document.getElementById(i)); });
  var mailRe = { test: function (v) { return !!saPhone(v); } };
  function subSubmit(e) {
    e.preventDefault(); var v = $('#subMail').value.trim(), er = $('#subErr'), ok = $('#subOk'); ok.textContent = ''; 
    if (!mailRe.test(v)) { er.textContent = 'اكتب رقم جوال سعودي صحيح، مثل 0512345678'; $('#subMail').setAttribute('aria-invalid', 'true'); return; }
    er.textContent = ''; $('#subMail').removeAttribute('aria-invalid'); ok.textContent = 'شرّفتنا، سنرسل لك دعوة جمعة الدار على واتساب قبل بدايتها.'; $('#subForm').reset();
  }
  function cSubmit(e) {
    e.preventDefault(); var bad = 0;
    var rules = { cName: [function (v) { return v.trim().length >= 2; }, 'اكتب اسمك من فضلك'], cEmail: [function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }, 'اكتب بريدك الإلكتروني بشكل صحيح'], cMail: [function (v) { return mailRe.test(v.trim()); }, 'اكتب رقم جوال سعودي صحيح، مثل 0512345678'], cOcc: [function (v) { return !!v; }, 'اختر المناسبة'], cLike: [function (v) { return v.trim().length >= 3; }, 'اذكر نوتة أو اثنتين تحبهما، مثل العود أو الورد'] };
    Object.keys(rules).forEach(function (id) { var el = document.getElementById(id), m = $('.err[data-for=' + id + ']'), good = rules[id][0](el.value);
      m.textContent = good ? '' : rules[id][1]; if (good) el.removeAttribute('aria-invalid'); else { el.setAttribute('aria-invalid', 'true'); bad++; } });
    $('#cOk').textContent = bad ? '' : 'استلمنا طلبك، وسنرسل لك العرض على واتساب والبريد في أقرب وقت.'; if (!bad) $('#cForm').reset();
  }
  // phone: the notify form starts as one "سجّل" button; a tap opens the number field
  (function () {
    var f = $('#subForm'); if (!f || !window.matchMedia) return; var mq = window.matchMedia('(max-width: 600px)');
    if (mq.matches) f.classList.add('fold');
    f.addEventListener('click', function (e) {
      var b = e.target.closest && e.target.closest('.btn'); if (!b || !f.classList.contains('fold')) return;
      e.stopPropagation(); e.preventDefault(); f.classList.remove('fold'); var i = $('#subMail'); try { i.focus(); } catch (x) {}
    }, true);
  })();
  // Hosted pages run in a sandboxed iframe without allow-forms: native submit is blocked, so wire click + Enter explicitly.
  [['#subForm', subSubmit], ['#cForm', cSubmit]].forEach(function (p) {
    var f = $(p[0]);
    f.addEventListener('submit', p[1]);
    $('button[type=submit], .btn', f).setAttribute('type', 'button');
    $('.btn', f).addEventListener('click', p[1]);
    $$('input', f).forEach(function (i) { i.addEventListener('keydown', function (e) { if (e.key === 'Enter') p[1](e); }); });
  });
  var yr = $('#year'); if (yr) yr.textContent = AR(new Date().getFullYear());
  // mascot
  var SAYS = ['يا مرحبا بالضيف!', 'تفضّل، القهوة جاهزة', 'خلّ العود يتكلم عنك', 'أول رشّة تعرّفك بنفسك', 'عطرك بيفوح قبل لا تتكلم'], ASK = 'وين تبيني أوصلك؟ دوس على أي مكان', ARRIVE = ['وصلنا، تفضّل', 'هذا المكان يا طيب', 'أبشر، وصلتك', 'تم، حياك الله'], FR = { stand: 0, walk1: 1, walk2: 2, wave: 3, talk: 4, blink: 5 };
  var cv = $('#mcv'), g = cv.getContext('2d'), btn = $('#masbtn'), bub = $('#bub'), wrap = $('#mas');
  var im = $('#msrc'), ready = false, s = { x: 30, y: 0, dir: 1, mode: 'walk', t: 0, say: 0, tick: 0, sel: false, anchored: false, tx: 0, ty: 0, arr: 0 };
  g.imageSmoothingEnabled = false;
  function paint(f) { if (!ready) return; g.clearRect(0, 0, 48, 54); g.drawImage(im, f * 48, 0, 48, 54, 0, 0, 48, 54); }
  function say() { bub.textContent = SAYS[s.say++ % SAYS.length]; bub.hidden = false; place(); }
  function place() { var w = wrap.clientWidth; var bw = (bub.offsetWidth || 170) / 2 + 8; bub.style.left = Math.min(Math.max(s.x + btn.offsetWidth / 2, bw), w - bw) + 'px'; }
  function startM() { ready = true; paint(FR.stand); if (reduce) say(); }
  if (im.complete && im.naturalWidth) startM(); else im.addEventListener('load', startM);
  // follows the visitor. Inside a hosted full-height iframe 'position:fixed' sits at the bottom of the whole page,
  // so the visible part of the page is found with IntersectionObserver (implicit root = top-level viewport) over thin trackers.
  var LINES = { hero: 'يا هلا بك في دار عطرك بيفوح!', collection: 'ثمانية عطور، اختر اللي يشبهك', journey: 'أربع محطات لين توصلك الزجاجة', 'scent-map': 'القاعدة هي اللي تبقى أطول', guide: 'ثلاث خطوات وتعرف عطرك', pricing: 'مجلس أكثر باقة يطلبونها', journal: 'تعال اقرأ أوراق الدار', launch: 'جمعة الدار على الأبواب، سجّل بريدك', consultation: 'اطلب عرضك وأنا أرتّب لك', footer: 'في أمان الله، ارجع لنا قريب' };
  var TH = 8, MH = 130, LIFT = 34, lastTop = 0, lastBottom = 0, cur = '', first = true, vis = {}, H0 = 0, trkBox = null, io2 = null;
  var secs = $$('main section[id], footer[id]');
  function sectionAt(y) { for (var q = secs.length - 1; q >= 0; q--) { if (secs[q].offsetTop <= y) return secs[q].id; } return 'hero'; }
  // Hosted pages sit in a full-height iframe under the host's own sticky bar: a normal sticky header never leaves the top of
  // the page there, so in a frame the header is moved to the visible top of the screen (below the host bar).
  var inFrame = false; try { inFrame = window.self !== window.top; } catch (er) { inFrame = true; }
  var hdr = $('#header');
  // Desktop in the hosted frame: ask the viewer for its full-screen layout so the page scrolls inside the frame (real sticky header)
  var scEl = document.getElementById('sc'), FS = !!(scEl && inFrame && window.innerWidth >= 768);
  if (FS) { document.documentElement.setAttribute('data-instinct-full-screen', ''); document.documentElement.classList.add('fs'); }
  var SCR = FS ? scEl : document.documentElement;
  function headerFollow() { if (!inFrame || FS) return; hdr.style.transform = "translate3d(0," + (lastTop <= 0 ? 0 : lastTop + TH + 52) + "px,0)"; }
  function pageH() { var f = document.getElementById('footer'); return f ? Math.min(SCR.scrollHeight, f.offsetTop + f.offsetHeight) : SCR.scrollHeight; }
  function putY() { wrap.style.transform = 'translateY(' + Math.max(0, Math.min(s.y - MH, pageH() - MH)) + 'px)'; }
  function setBottom(bottom) {
    bottom = Math.min(bottom, pageH()); lastBottom = bottom;
    if (s.anchored) { if (s.y >= lastTop + 30 && s.y <= lastBottom + 10) return; s.anchored = false; wrap.style.transition = ''; }
    if (s.mode === 'goto') return;
    s.y = Math.max(MH, bottom - LIFT); putY();
    var id = sectionAt(bottom - 160);
    if (id !== cur) {
      cur = id; if (id === 'footer') { s.x = 16; btn.style.left = '16px'; } if (first) { first = false; return; }
      if (s.sel || s.mode === 'gone' || s.mode === 'away' || s.mode === 'hold') return;
      bub.textContent = LINES[cur] || SAYS[0]; bub.hidden = false; place();
      s.mode = 'wave'; s.t = 0;
      if (reduce) { paint(FR.wave); setTimeout(function () { bub.hidden = true; paint(FR.stand); }, 3500); }
    }
  }
  function onIO(es) {
    es.forEach(function (e) { vis[e.target.getAttribute('data-i')] = e.isIntersecting; });
    var mx = -1, mn = 1e9; for (var k in vis) { if (vis[k]) { if (+k > mx) mx = +k; if (+k < mn) mn = +k; } }
    if (mx >= 0) { lastTop = mn * TH; headerFollow(); setBottom((mx + 1) * TH); }
  }
  function buildTrackers() {
    var H = pageH(); if (Math.abs(H - H0) < TH && trkBox) return; H0 = H;
    if (io2) io2.disconnect(); if (trkBox) trkBox.remove(); vis = {};
    trkBox = document.createElement('div'); trkBox.setAttribute('aria-hidden', 'true'); trkBox.style.cssText = 'position:absolute;top:0;right:0;width:2px;height:' + H + 'px;pointer-events:none;overflow:hidden';
    io2 = new IntersectionObserver(onIO);
    for (var n = 0; n < Math.ceil(H / TH); n++) { var d = document.createElement('i'); d.setAttribute('data-i', n); d.style.cssText = 'position:absolute;right:0;width:2px;height:' + TH + 'px;top:' + (n * TH) + 'px'; trkBox.appendChild(d); io2.observe(d); }
    (FS ? scEl : document.body).appendChild(trkBox);
  }
  if ('IntersectionObserver' in window) {
    buildTrackers();
    window.addEventListener('resize', buildTrackers);
    window.addEventListener('load', function () { setTimeout(buildTrackers, 300); });
    if (window.ResizeObserver) new ResizeObserver(buildTrackers).observe(FS ? document.querySelector('main') : document.body);
  } else { wrap.style.transform = 'translateY(' + Math.max(0, window.innerHeight - MH - LIFT) + 'px)'; }
  function bubble(t) { bub.textContent = t; bub.hidden = false; place(); }
  function select(on) {
    s.sel = on; btn.classList.toggle('sel', on); document.body.classList.toggle('mas-sel', on);
    btn.setAttribute('aria-pressed', on);
    if (on) { s.mode = 'sel'; s.t = 0; bubble(ASK); } else if (s.mode === 'sel') { s.mode = 'idle'; s.t = 0; bub.hidden = true; }
  }
  btn.addEventListener('click', function (e) { e.stopPropagation(); select(!s.sel); if (reduce) paint(s.sel ? FR.wave : FR.stand); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && s.sel) select(false); });
  // second step: the next click anywhere sends the character there
  document.addEventListener('click', function (e) {
    if (!s.sel || btn.contains(e.target)) return;
    e.preventDefault(); e.stopPropagation();
    var w = wrap.clientWidth, bw = btn.offsetWidth;
    var px = FS ? e.clientX : e.pageX, py = FS ? e.clientY + scEl.scrollTop : e.pageY;
    s.tx = Math.min(Math.max(px - bw / 2, 0), Math.max(0, w - bw));
    s.ty = Math.min(Math.max(py + 8, MH), SCR.scrollHeight);
    s.sel = false; btn.classList.remove('sel'); document.body.classList.remove('mas-sel'); btn.setAttribute('aria-pressed', 'false');
    s.anchored = true; s.arr = 0;
    if (reduce) { s.x = s.tx; s.y = s.ty; btn.style.left = s.x + 'px'; putY(); s.mode = 'idle'; bubble(ARRIVE[s.arr++ % ARRIVE.length]); paint(FR.wave); setTimeout(function () { bub.hidden = true; paint(FR.stand); }, 3500); return; }
    s.mode = 'goto'; bubble('أبشر، جايك!'); wrap.style.transition = 'transform .13s linear';
  }, true);
  if (!reduce) setInterval(function () {
    s.tick++; s.t++; var max = Math.max(60, wrap.clientWidth - (btn.offsetWidth + 20)), f = FR.stand;
    if (s.mode === 'goto') {
      var dx = s.tx - s.x, dy = s.ty - s.y, dist = Math.sqrt(dx * dx + dy * dy), step = Math.max(14, Math.min(46, dist / 18));
      if (dist <= step) { s.x = s.tx; s.y = s.ty; s.mode = 'wave'; s.t = 0; f = FR.wave; s.anchored = true; bubble(ARRIVE[s.arr++ % ARRIVE.length]); }
      else { s.x += dx / dist * step; s.y += dy / dist * step; s.dir = dx > 0 ? 1 : -1; f = (s.tick >> 1) % 2 ? FR.walk1 : FR.walk2; bubble(bub.textContent); }
      btn.style.left = s.x + 'px'; putY();
    }
    else if (s.mode === 'hold') { f = (s.tick >> 1) % 2 ? FR.talk : FR.stand; }
    else if (s.mode === 'away') { s.x -= 26; s.dir = -1; f = (s.tick >> 1) % 2 ? FR.walk1 : FR.walk2; btn.style.left = s.x + 'px'; }
    else if (s.mode === 'gone') { f = FR.stand; }
    else if (s.mode === 'ret') { s.x += 12; f = (s.tick >> 1) % 2 ? FR.walk1 : FR.walk2; if (s.x >= 30) { s.x = 30; s.mode = 'wave'; s.t = 0; s.dir = 1; bubble('رجعت، تمت المهمة'); } btn.style.left = s.x + 'px'; }
    else if (s.mode === 'sel') { f = (s.tick >> 1) % 2 ? FR.wave : FR.stand; }
    else if (s.mode === 'walk' && s.anchored) { s.mode = 'idle'; s.t = 0; }
    else if (s.mode === 'walk') { s.x += s.dir * 4; var mx = cur === 'footer' ? 28 : max; if (s.x > mx) { s.x = mx; s.dir = -1; } if (s.x < 16) { s.x = 16; s.dir = 1; } f = (s.tick >> 1) % 2 ? FR.walk1 : FR.walk2; if (s.t > 40) { s.mode = 'wave'; s.t = 0; say(); } btn.style.left = s.x + 'px'; }
    else if (s.mode === 'wave') { f = FR.wave; if (s.t > 14) { s.mode = 'talk'; s.t = 0; } }
    else if (s.mode === 'talk') { f = (s.tick >> 1) % 2 ? FR.talk : FR.stand; if (s.t > 24) { s.mode = 'idle'; s.t = 0; bub.hidden = true; } }
    else { f = s.t % 16 < 2 ? FR.blink : FR.stand; if (s.t > 20) { s.mode = 'walk'; s.t = 0; } }
    paint(f);
  }, 130);
  // the house mascot leaves the page for the video scene and comes back when it closes
  window.__mas = {
    away: function (text) {
      if (reduce) return; if (s.sel) select(false);
      s.mode = 'hold'; s.anchored = true; bubble(text); btn.style.transition = 'opacity .9s ease';
      setTimeout(function () { s.mode = 'away'; btn.style.opacity = '0'; bub.hidden = true; }, 1900);
      setTimeout(function () { if (s.mode === 'away') { s.mode = 'gone'; btn.style.visibility = 'hidden'; } }, 3000);
    },
    back: function () {
      if (reduce || (s.mode !== 'gone' && s.mode !== 'away' && s.mode !== 'hold')) { btn.style.opacity = ''; btn.style.visibility = ''; return; }
      btn.style.transition = 'none'; s.x = -80; btn.style.left = s.x + 'px'; btn.style.visibility = 'visible'; btn.style.opacity = '1'; s.mode = 'ret';
      setTimeout(function () { btn.style.transition = ''; }, 300);
    }
  };
  // in-page links: smooth scroll (also scrolls the host page when running inside the hosted iframe)
  document.addEventListener('click', function (e) {
    if (e.defaultPrevented) return;
    var a = e.target.closest ? e.target.closest('a[href^="#"]') : null; if (!a) return;
    var id = a.getAttribute('href').slice(1), t = id && document.getElementById(id); if (!t) return;
    e.preventDefault();
    if (FS) { t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); return; }
    // aim a little above the section so its heading is not hidden by the (host + site) headers
    var m = document.createElement('i'); m.setAttribute('aria-hidden', 'true');
    m.style.cssText = 'position:absolute;left:0;width:1px;height:1px;pointer-events:none;top:' + Math.max(0, t.offsetTop - (inFrame ? 130 : 70)) + 'px';
    document.body.appendChild(m);
    m.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { m.remove(); }, 2500);
  });

  var fs = $('#fsub'), fm = $('#fmail'), fg = $('#fmsg');
  if (fs) { var go = function () { var ok = !!saPhone(fm.value); fg.textContent = ok ? 'أبشر، سجّلنا رقمك وتصلك الدعوة على واتساب' : 'اكتب رقم جوال سعودي صحيح يا طيب، مثل 0512345678'; if (ok) fm.value = ''; }; fs.addEventListener('click', go); fm.addEventListener('keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } }); }

  var tt = $('#toast'), tm = 0;
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('a[data-demo]'); if (!a) return; e.preventDefault(); var r = a.getBoundingClientRect(); tt.hidden = false; tt.style.top = Math.max(60, r.top + (FS ? scEl.scrollTop : window.pageYOffset) - tt.offsetHeight - 12) + 'px'; tt.style.bottom = 'auto'; tt.textContent = 'هذه الصفحة تُفتح قريباً بإذن الله'; tt.hidden = false; clearTimeout(tm); tm = setTimeout(function () { tt.hidden = true; }, 3000); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); mb.setAttribute('aria-expanded', 'false'); mb.focus(); } });
(function(){var bt=document.getElementById('bt'),busy=false;if(!bt)return;
bt.addEventListener('click',function(e){e.stopPropagation();if(busy)return;busy=true;bt.classList.remove('hint');bt.classList.add('go');setTimeout(function(){bt.classList.remove('go');bt.classList.add('hint');busy=false},6100)});
})();
  // ---- magazine scene: original canvas animation + synthesized oud/qanun-style music (no samples, no third-party audio) ----
  (function () {
    var vid = document.getElementById('vid'), cv = document.getElementById('vcv'), pb = document.getElementById('playBtn'), sndB = document.getElementById('vSnd'), clsB = document.getElementById('vCls');
    if (!vid || !cv || !pb) return;
    var g = cv.getContext('2d'), W = 960, H = 600, raf = 0, t0 = 0, run = false, AC = null, master = null, muted = false, timer = 0, nextT = 0, step = 0, an = null;
    var R = function (s) { var x = Math.sin(s * 127.1) * 43758.5453; return x - Math.floor(x); };
    var stars = []; for (var i = 0; i < 170; i++) stars.push({ x: R(i + 1) * W, y: R(i + 7) * H * 0.62, r: 0.4 + R(i + 3) * 1.3, p: R(i + 9) * 6.28, s: 0.6 + R(i + 5) * 1.8 });
    var L = [{ b: 0.66, a: 22, f: 0.006, sp: 6, c0: '#2a2147', c1: '#171230' }, { b: 0.72, a: 30, f: 0.0045, sp: 14, c0: '#4a3350', c1: '#241a38' }, { b: 0.8, a: 36, f: 0.0035, sp: 28, c0: '#7a4a3a', c1: '#3a2430' }, { b: 0.9, a: 40, f: 0.003, sp: 52, c0: '#a86a3c', c1: '#4a2c2c' }];
    function ridge(k, x, t) { var l = L[k], o = t * l.sp + k * 300; return H * l.b + l.a * Math.sin((x + o) * l.f * 2 + k) + l.a * 0.45 * Math.sin((x + o) * l.f * 5.3 + k * 2) + l.a * 0.2 * Math.sin((x + o) * l.f * 11); }
    var parts = []; function spawn(t) { parts.push({ x: 300 + (R(t * 3) - 0.5) * 20, y: 300, vx: (R(t * 7) - 0.3) * 14, vy: -(18 + R(t * 5) * 30), life: 0, max: 3 + R(t) * 3, r: 1 + R(t * 2) * 2 }); }
    function frame(now) {
      if (!run) return; var t = (now - t0) / 1000, tt = t % 30, d = 1 / 60; if (t >= 30) { close(); return; } raf = requestAnimationFrame(frame);
      var sk = g.createLinearGradient(0, 0, 0, H * 0.75); sk.addColorStop(0, '#070818'); sk.addColorStop(0.55, '#1a1440'); sk.addColorStop(1, '#5a3a55'); g.fillStyle = sk; g.fillRect(0, 0, W, H);
      stars.forEach(function (s) { var a = 0.45 + 0.55 * Math.sin(t * s.s + s.p); g.globalAlpha = Math.max(0.1, a) * 0.9; g.fillStyle = '#fff6dc'; g.beginPath(); g.arc((s.x - t * 1.5 + W * 3) % W, s.y, s.r, 0, 6.28); g.fill(); }); g.globalAlpha = 1;
      var mx = 700, my = 150 - tt * 0.6, mg = g.createRadialGradient(mx, my, 20, mx, my, 220); mg.addColorStop(0, 'rgba(255,238,190,.55)'); mg.addColorStop(1, 'rgba(255,238,190,0)'); g.fillStyle = mg; g.fillRect(mx - 230, my - 230, 460, 460);
      g.fillStyle = '#fff1cf'; g.beginPath(); g.arc(mx, my, 46, 0, 6.28); g.fill(); g.fillStyle = 'rgba(210,180,130,.35)'; g.beginPath(); g.arc(mx - 14, my - 8, 9, 0, 6.28); g.arc(mx + 15, my + 14, 6, 0, 6.28); g.fill();
      var sx = (tt * 90) % 1400 - 200; if (tt > 5 && tt < 6.2) { g.strokeStyle = 'rgba(255,240,200,' + (1 - (tt - 5) / 1.2) + ')'; g.lineWidth = 2; g.beginPath(); g.moveTo(sx + 300, 60 + (tt - 5) * 60); g.lineTo(sx + 220, 40 + (tt - 5) * 60); g.stroke(); }
      for (var k = 0; k < 4; k++) {
        if (k === 0) { var off = (t * L[0].sp) % 900; g.fillStyle = '#1a1438'; for (var q = -1; q < 3; q++) { var bx = q * 900 + 200 - off, by = H * 0.66 - 10; g.beginPath(); g.moveTo(bx - 60, by + 20); g.lineTo(bx - 60, by - 30); g.arc(bx - 30, by - 30, 30, Math.PI, 0); g.lineTo(bx, by + 20); g.fill(); g.fillRect(bx + 8, by - 70, 6, 90); g.beginPath(); g.arc(bx + 11, by - 74, 7, 0, 6.28); g.fill(); g.beginPath(); g.moveTo(bx - 94, by + 20); g.lineTo(bx - 94, by - 20); g.arc(bx - 80, by - 20, 14, Math.PI, 0); g.lineTo(bx - 66, by + 20); g.fill(); } }
        var gr = g.createLinearGradient(0, H * L[k].b - 40, 0, H); gr.addColorStop(0, L[k].c0); gr.addColorStop(1, L[k].c1); g.fillStyle = gr; g.beginPath(); g.moveTo(0, H); for (var x = 0; x <= W; x += 12) g.lineTo(x, ridge(k, x, t)); g.lineTo(W, H); g.closePath(); g.fill();
        g.strokeStyle = 'rgba(255,225,170,' + (0.18 + k * 0.07) + ')'; g.lineWidth = 1.4; g.beginPath(); for (var x2 = 0; x2 <= W; x2 += 12) { var yy = ridge(k, x2, t); if (x2) g.lineTo(x2, yy); else g.moveTo(x2, yy); } g.stroke();
      }
      // house mascot flies in on a magic carpet, glides past the lamp and the moon, then lands on a dune and poses
      var mxE = 640, myE = H * 0.8 - 6;
      function cpos(q) { var X, Y; if (q < 13) { var u = Math.min(1, Math.max(0, (q - 1.2) / 11.8)); X = -150 + u * (mxE + 150); Y = H * 0.5 - 95 * Math.sin(u * 3.77) + 16 * Math.sin(q * 1.7); } else { var w = Math.min(1, (q - 13) / 3.6), e = w * w * (3 - 2 * w), X0 = mxE, Y0 = H * 0.5 - 95 * Math.sin(3.77) + 16 * Math.sin(13 * 1.7); X = X0 + 5 * Math.sin(q * 1.2) * e; Y = Y0 + (myE - Y0) * e + 4 * Math.sin(q * 2.2) * e; } return [X, Y]; }
      var cm = Math.min(1, Math.max(0, (tt - 12) / 2)) * (tt > 28 ? Math.max(0, (30 - tt) / 2) : 1);
      if (cm > 0) { g.globalAlpha = cm; var dg = g.createLinearGradient(0, myE, 0, myE + 80); dg.addColorStop(0, '#b87a44'); dg.addColorStop(1, '#4a2c2c'); g.fillStyle = dg; g.beginPath(); g.moveTo(mxE - 230, H); g.bezierCurveTo(mxE - 150, myE + 32, mxE - 90, myE + 18, mxE, myE + 18); g.bezierCurveTo(mxE + 90, myE + 18, mxE + 150, myE + 32, mxE + 230, H); g.closePath(); g.fill(); g.globalAlpha = 1; }
      var ca = Math.min(1, Math.max(0, (tt - 1) / 0.8)) * (tt > 28 ? Math.max(0, (30 - tt) / 2) : 1);
      if (ca > 0 && im && im.naturalWidth) {
        var P = cpos(tt), P2 = cpos(tt + 0.12), cx = P[0], cy = P[1], land = tt >= 13 ? Math.min(1, (tt - 13) / 3.6) : 0;
        var rot = Math.atan2(P2[1] - cy, Math.max(1, P2[0] - cx)) * 0.55 * (1 - land) + 0.06 * Math.sin(tt * 1.5) * (1 - land * 0.8);
        if (Math.floor(tt * 30) !== Math.floor((tt - d) * 30) && land < 0.9) { parts.push({ x: cx - 80 * Math.cos(rot), y: cy + 10 + 8 * Math.sin(rot) * 0, vx: -22 - R(tt * 9) * 18, vy: (R(tt * 5) - 0.5) * 22, life: 0, max: 1.4 + R(tt * 3) * 1.4, r: 1 + R(tt * 2) * 2.4 }); }
        g.save(); g.globalAlpha = ca; g.translate(cx, cy); g.rotate(rot);
        var sh = g.createRadialGradient(0, 18, 4, 0, 18, 90); sh.addColorStop(0, 'rgba(255,200,90,' + 0.35 * (1 - land) + ')'); sh.addColorStop(1, 'rgba(255,200,90,0)'); g.fillStyle = sh; g.fillRect(-100, -80, 200, 200);
        var wv3 = (tt >= 16.2 && tt < 16.75) || (tt >= 17.4 && tt < 17.95) || (tt >= 18.6 && tt < 19.15), fr = wv3 ? 3 : (Math.floor(tt * 3) % 11 === 0 ? 5 : 0), sc = 2.7; g.imageSmoothingEnabled = false;
        g.drawImage(im, fr * 48, 0, 48, 54, -24 * sc, -54 * sc + 6, 48 * sc, 54 * sc);
        var wv = Math.sin(tt * 4) * 4 * (1 - land * 0.7);
        g.fillStyle = '#9c2a22'; g.strokeStyle = '#e0b04a'; g.lineWidth = 2.2; g.beginPath(); g.moveTo(-84, 4 + wv); g.quadraticCurveTo(-40, -2 - wv, 0, 4); g.quadraticCurveTo(44, 10 + wv, 84, 2 - wv); g.lineTo(76, 20 - wv); g.quadraticCurveTo(40, 28 + wv, 0, 22); g.quadraticCurveTo(-44, 16 - wv, -76, 24 + wv); g.closePath(); g.fill(); g.stroke();
        g.strokeStyle = 'rgba(255,225,170,.75)'; g.lineWidth = 1.2; g.beginPath(); g.moveTo(-66, 9 + wv); g.quadraticCurveTo(-34, 4 - wv, 0, 10); g.quadraticCurveTo(36, 16 + wv, 68, 8 - wv); g.stroke();
        g.fillStyle = '#e0b04a'; for (var q2 = -3; q2 <= 3; q2++) { g.beginPath(); g.moveTo(q2 * 20, 12); g.lineTo(q2 * 20 + 6, 18); g.lineTo(q2 * 20 - 6, 18); g.closePath(); g.fill(); }
        g.strokeStyle = '#e0b04a'; g.lineWidth = 1.6; for (var q3 = 0; q3 < 7; q3++) { var fx = -80 + q3 * 4; g.beginPath(); g.moveTo(-82 + wv * 0.1, 6 + q3 * 2.6 + wv); g.lineTo(-92 + wv * 0.1, 8 + q3 * 2.6 + wv); g.stroke(); g.beginPath(); g.moveTo(82, 4 + q3 * 2.6 - wv); g.lineTo(92, 6 + q3 * 2.6 - wv); g.stroke(); }
        g.restore(); g.globalAlpha = 1;
      }
      // magic lamp
      var lx = 300, ly = 330 + Math.sin(t * 1.3) * 8, pu = 0.7 + 0.3 * Math.sin(t * 2.4), lg = g.createRadialGradient(lx, ly, 6, lx, ly, 150); lg.addColorStop(0, 'rgba(255,200,90,' + 0.55 * pu + ')'); lg.addColorStop(1, 'rgba(255,200,90,0)'); g.fillStyle = lg; g.fillRect(lx - 160, ly - 160, 320, 320);
      g.save(); g.translate(lx, ly); g.fillStyle = '#e0a73a'; g.strokeStyle = '#ffe3a0'; g.lineWidth = 1.5; g.beginPath(); g.ellipse(0, 0, 30, 13, 0, 0, 6.28); g.fill(); g.stroke(); g.beginPath(); g.moveTo(22, -6); g.quadraticCurveTo(46, -22, 56, -26); g.quadraticCurveTo(46, -10, 28, 4); g.fill(); g.stroke(); g.beginPath(); g.moveTo(-28, -4); g.quadraticCurveTo(-50, -26, -34, -22); g.quadraticCurveTo(-30, -12, -24, -8); g.fill(); g.stroke(); g.fillRect(-9, -18, 18, 7); g.beginPath(); g.arc(0, -20, 7, Math.PI, 0); g.fill(); g.restore();
      if (Math.floor(t * 20) !== Math.floor((t - d) * 20)) { var p = { x: lx + 56, y: ly - 26, vx: (R(t * 7) - 0.4) * 10, vy: -(20 + R(t * 5) * 26), life: 0, max: 3 + R(t) * 3, r: 1 + R(t * 2) * 2.2 }; parts.push(p); }
      parts = parts.filter(function (p) { p.life += d; p.x += (p.vx + Math.sin(p.life * 2 + p.x) * 12) * d; p.y += p.vy * d; var a = Math.max(0, 1 - p.life / p.max); g.globalAlpha = a * 0.9; g.fillStyle = '#ffd36e'; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 6.28); g.fill(); g.globalAlpha = a * 0.25; g.beginPath(); g.arc(p.x, p.y, p.r * 3.5, 0, 6.28); g.fill(); g.globalAlpha = 1; return a > 0; });
      var v = g.createRadialGradient(W / 2, H / 2, H * 0.4, W / 2, H / 2, H * 0.95); v.addColorStop(0, 'rgba(0,0,0,0)'); v.addColorStop(1, 'rgba(0,0,0,.55)'); g.fillStyle = v; g.fillRect(0, 0, W, H);
      var ta = Math.min(1, Math.max(0, (tt - 17) / 3)) * (tt > 27 ? Math.max(0, (30 - tt) / 3) : 1); if (ta > 0) { g.fillStyle = 'rgba(10,6,20,' + 0.45 * ta + ')'; g.fillRect(0, 0, W, H); g.globalAlpha = ta; g.textAlign = 'center'; g.save(); g.translate(W / 2 - 54, H * 0.4 - 190); g.scale(4.5, 4.5); g.strokeStyle = '#e0b04a'; g.lineWidth = 1.6; g.stroke(new Path2D('M12 3c3.5 4 6 7 6 10.5A6 6 0 0 1 6 13.5C6 10 8.5 7 12 3z')); g.fillStyle = '#e0b04a'; g.fill(new Path2D('M12 9c1.6 2 2.6 3.2 2.6 4.8a2.6 2.6 0 0 1-5.2 0C9.4 12.2 10.4 11 12 9z')); g.restore(); g.fillStyle = '#e0b04a'; g.font = '600 76px "IBM Plex Sans Arabic",sans-serif'; g.fillText('عطرك بيفوح', W / 2, H * 0.4); g.fillStyle = '#e9dcc6'; g.font = '500 24px "IBM Plex Sans Arabic",sans-serif'; g.fillText('ليالي العود، وحكاية العطر العربي', W / 2, H * 0.4 + 50); g.globalAlpha = 1; }
      var fi = Math.min(1, t / 1.2); if (fi < 1) { g.fillStyle = 'rgba(0,0,0,' + (1 - fi) + ')'; g.fillRect(0, 0, W, H); }
    }
    // ---- music: Karplus-Strong plucked strings, maqam Hijaz on D ----
    var HZ = { D3: 146.83, A3: 220, D4: 293.66, Eb4: 311.13, F4s: 369.99, G4: 392, A4: 440, Bb4: 466.16, C5: 523.25, D5: 587.33, F5s: 739.99 };
    var PH = [['A4', 1], ['Bb4', .5], ['A4', .5], ['G4', 1], ['F4s', .5], ['G4', .5], ['A4', 2], ['Bb4', 1], ['C5', .5], ['Bb4', .5], ['A4', 1], ['G4', .5], ['F4s', .5], ['Eb4', 1], ['D4', 3], [null, 1], ['D4', .5], ['Eb4', .5], ['F4s', 1], ['G4', .5], ['A4', .5], ['Bb4', 1], ['A4', 1], ['C5', 1], ['D5', 1.5], ['C5', .5], ['Bb4', 1], ['A4', 1], ['G4', .5], ['F4s', .5], ['Eb4', 1], ['D4', 3], [null, 1]];
    var cache = {};
    function pluck(f, bright) { var key = f + '_' + bright; if (cache[key]) return cache[key]; var sr = AC.sampleRate, n = Math.round(sr / f), len = Math.floor(sr * 2.6), buf = AC.createBuffer(1, len, sr), d = buf.getChannelData(0), ring = new Float32Array(n), s = 7 + f; for (var i = 0; i < n; i++) { s = (s * 16807) % 2147483647; ring[i] = ((s / 2147483647) * 2 - 1) * (i < n * 0.5 ? 1 : 0.75); } var dec = bright ? 0.9975 : 0.9962, lp = 0; for (var j = 0; j < len; j++) { var i0 = j % n, i1 = (j + 1) % n, nv = (ring[i0] + ring[i1]) * 0.5 * dec; lp = lp + (nv - lp) * (bright ? 0.9 : 0.62); ring[i0] = lp; d[j] = ring[i0]; } cache[key] = buf; return buf; }
    function note(f, at, vol, bright, pan) { var s = AC.createBufferSource(); s.buffer = pluck(f, bright); var gn = AC.createGain(); gn.gain.setValueAtTime(vol, at); gn.gain.exponentialRampToValueAtTime(0.0008, at + (bright ? 2.2 : 1.9)); var pn = AC.createStereoPanner ? AC.createStereoPanner() : null; s.connect(gn); if (pn) { pn.pan.value = pan; gn.connect(pn); pn.connect(master); } else gn.connect(master); s.start(at); }
    function drum(at, doum) { var o = AC.createOscillator(), gn = AC.createGain(); if (doum) { o.type = 'sine'; o.frequency.setValueAtTime(150, at); o.frequency.exponentialRampToValueAtTime(55, at + 0.18); gn.gain.setValueAtTime(0.5, at); gn.gain.exponentialRampToValueAtTime(0.001, at + 0.4); o.connect(gn); gn.connect(master); o.start(at); o.stop(at + 0.45); } else { var b = AC.createBuffer(1, 2205, AC.sampleRate), dd = b.getChannelData(0); for (var i = 0; i < dd.length; i++) dd[i] = (Math.random() * 2 - 1) * Math.exp(-i / 380); var s = AC.createBufferSource(), hp = AC.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 2500; s.buffer = b; gn.gain.value = 0.16; s.connect(hp); hp.connect(gn); gn.connect(master); s.start(at); } }
    function pad(at, f, dur) { [-6, 0, 7].forEach(function (c) { var o = AC.createOscillator(), gn = AC.createGain(), lp = AC.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = f; o.detune.value = c; lp.type = 'lowpass'; lp.frequency.value = 520; gn.gain.setValueAtTime(0.0001, at); gn.gain.linearRampToValueAtTime(0.028, at + 3); gn.gain.linearRampToValueAtTime(0.0001, at + dur); o.connect(lp); lp.connect(gn); gn.connect(master); o.start(at); o.stop(at + dur + 0.1); }); }
    var beat = 0.62, pi = 0, pt = 0, bars = 0;
    function sched() { if (!AC) return; while (nextT < AC.currentTime + 1.6) { var p = PH[pi % PH.length], dur = p[1] * beat * 1.15; if (p[0]) { note(HZ[p[0]], nextT, 0.5, true, 0.12); if (pi % 6 === 2) note(HZ[p[0]] / 2, nextT + 0.01, 0.22, false, -0.2); } nextT += dur; pi++; if (pi % PH.length === 0) { pad(nextT, HZ.D3, 9); } }
      while (pt < AC.currentTime + 1.6) { var bt = Math.round(pt / (beat / 2)) % 8; if (pt > t0a + 5) { if (bt === 0 || bt === 5) drum(pt, true); else if (bt === 3 || bt === 4 || bt === 7) drum(pt, false); } if (bt === 0 && bars % 4 === 0) { note(HZ.D3, pt, 0.34, false, -0.3); note(HZ.A3, pt + 0.35, 0.2, false, -0.3); } if (bt === 0) bars++; pt += beat / 2; } }
    var t0a = 0;
    function ensureAC() { if (AC) return; try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { AC = null; } }
    function audioStart() { ensureAC(); if (!AC) return; master = AC.createGain(); master.gain.value = muted ? 0 : 0.9; var comp = AC.createDynamicsCompressor(); an = AC.createAnalyser(); an.fftSize = 512; var d1 = AC.createDelay(1), fb = AC.createGain(), lp = AC.createBiquadFilter(), wet = AC.createGain(); d1.delayTime.value = 0.34; fb.gain.value = 0.38; lp.type = 'lowpass'; lp.frequency.value = 2400; wet.gain.value = 0.32; master.connect(comp); master.connect(d1); d1.connect(lp); lp.connect(fb); fb.connect(d1); lp.connect(wet); wet.connect(comp); comp.connect(an); an.connect(AC.destination); if (AC.resume) AC.resume(); t0a = AC.currentTime; nextT = t0a + 0.4; pt = t0a + 0.4; pi = 0; bars = 0; window.__sceneAudio = { ctx: AC, an: an }; pad(t0a, HZ.D3, 9); timer = setInterval(sched, 250); sched(); }
    function audioStop() { clearInterval(timer); if (AC) { try { master.gain.value = 0; AC.close(); } catch (e) { } } AC = null; cache = {}; }
    function open() { vid.classList.add('on'); run = true; t0 = performance.now(); parts = []; raf = requestAnimationFrame(frame); audioStart(); pb.setAttribute('aria-pressed', 'true'); sndB.textContent = muted ? 'تشغيل الصوت' : 'إيقاف الصوت'; clsB.focus({ preventScroll: true }); }
    function close() { if (window.__mas) window.__mas.back(); run = false; cancelAnimationFrame(raf); audioStop(); vid.classList.remove('on'); pb.focus({ preventScroll: true }); }
    var starting = false; pb.addEventListener('click', function () { if (starting || vid.classList.contains('on')) return; starting = true; ensureAC(); if (AC && AC.resume) AC.resume(); if (window.__mas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) { window.__mas.away('عن إذنكم يا ضيوفنا، عندي مهمة'); setTimeout(function () { starting = false; open(); }, 3400); } else { starting = false; open(); } }); clsB.addEventListener('click', close);
    sndB.addEventListener('click', function () { muted = !muted; if (master) master.gain.setTargetAtTime(muted ? 0 : 0.9, AC.currentTime, 0.05); sndB.textContent = muted ? 'تشغيل الصوت' : 'إيقاف الصوت'; sndB.setAttribute('aria-pressed', muted); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && vid.classList.contains('on')) close(); });
    document.addEventListener('visibilitychange', function () { if (document.hidden && vid.classList.contains('on')) close(); });
  })();
})();
