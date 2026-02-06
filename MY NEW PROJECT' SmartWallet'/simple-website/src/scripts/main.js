/*
  main.js — drawer, reveal, counters, небольшие UI-хуки и интеграция с i18n
*/
(function(){
  const LS_KEY = 'sw_settings_v1';

  function loadSettings(){
    try{ return JSON.parse(localStorage.getItem(LS_KEY)) || {}; }catch(e){ return {}; }
  }
  function saveSettings(s){ try{ localStorage.setItem(LS_KEY, JSON.stringify(s)); }catch(e){} }

  // ===== Theme enforcement (light-only) =====
  function enforceLightTheme(){
    const s = loadSettings();
    s.theme = 'light';
    saveSettings(s);
    const root = document.documentElement;
    root.style.setProperty('--bg', '#f6f8fb');
    root.style.setProperty('--surface', '#ffffff');
    root.style.setProperty('--fg', '#0f1724');
    root.style.setProperty('--border', '#e6e9ef');
  }

  // ===== Drawer =====
  function initDrawer(){
    const trigger = document.getElementById('actionBtn');
    const drawer = document.getElementById('menuDrawer');
    const overlay = document.getElementById('drawerOverlay');
    const closeBtn = document.getElementById('drawerClose');
    if(!trigger || !drawer || !overlay) return;

    const FOCUS_SEL = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';
    let lastFocused = null;

    function openDrawer() {
      lastFocused = document.activeElement;
      drawer.setAttribute('aria-hidden','false');
      overlay.hidden = false; overlay.setAttribute('data-open','true');
      trigger.setAttribute('aria-expanded','true');
      document.body.style.overflow = 'hidden';
      const first = drawer.querySelector(FOCUS_SEL);
      if(first) first.focus();
      document.addEventListener('keydown', onKeyDown);
    }
    function closeDrawer() {
      drawer.setAttribute('aria-hidden','true');
      overlay.setAttribute('data-open','false');
      trigger.setAttribute('aria-expanded','false');
      setTimeout(()=> overlay.hidden = true, 220);
      document.body.style.overflow = '';
      if(lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
      document.removeEventListener('keydown', onKeyDown);
    }
    function onKeyDown(e){
      if(e.key === 'Escape') { closeDrawer(); return; }
      if(e.key !== 'Tab') return;
      const nodes = Array.from(drawer.querySelectorAll(FOCUS_SEL)).filter(n => n.offsetParent !== null);
      if(nodes.length === 0) return;
      const idx = nodes.indexOf(document.activeElement);
      if(e.shiftKey && idx === 0){ e.preventDefault(); nodes[nodes.length - 1].focus(); }
      else if(!e.shiftKey && idx === nodes.length - 1){ e.preventDefault(); nodes[0].focus(); }
    }

    trigger.addEventListener('click', ()=> {
      const opened = drawer.getAttribute('aria-hidden') === 'false';
      opened ? closeDrawer() : openDrawer();
    });
    closeBtn?.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
  }

  // ===== Reveal + counters =====
  function animateCount(el, duration = 900){
    const raw = el.textContent.trim();
    const sign = raw.startsWith('-') ? -1 : 1;
    const numStr = raw.replace(/[^\d]/g,'');
    const target = parseInt(numStr || '0', 10) * sign;
    let start = null;
    function step(ts){
      if(!start) start = ts;
      const progress = Math.min((ts - start)/duration, 1);
      const value = Math.round(target * progress);
      el.textContent = (value >= 0 ? value : -value).toLocaleString();
      if(progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  function initRevealAndCounters(){
    const targets = Array.from(document.querySelectorAll('.card, .widget, .feature')).map((el,i)=>{
      el.classList.add('reveal');
      el.style.setProperty('--delay', `${Math.min(i * 60, 420)}ms`);
      return el;
    });

    if('IntersectionObserver' in window){
      const io = new IntersectionObserver((entries, obs)=>{
        entries.forEach(ent=>{
          if(ent.isIntersecting){
            ent.target.classList.add('visible');
            ent.target.querySelectorAll && ent.target.querySelectorAll('.widget__value').forEach(animateCount);
            obs.unobserve(ent.target);
          }
        });
      }, { threshold: 0.12 });
      targets.forEach(t => io.observe(t));
    } else {
      targets.forEach(t => { t.classList.add('visible'); t.querySelectorAll('.widget__value').forEach(animateCount); });
    }
  }

  // ===== i18n hook =====
  function applyI18n(){
    const s = loadSettings();
    const lang = s.lang || document.documentElement.lang || 'uk';
    document.documentElement.lang = lang;
    if(window.SWI18N && typeof window.SWI18N.applyTranslations === 'function'){
      window.SWI18N.applyTranslations(lang);
    }
  }

  // ===== UI bindings =====
  function initUI(){
    const primary = document.getElementById('primaryBtn');
    if(primary){
      primary.addEventListener('click', ()=>{
        primary.disabled = true;
        setTimeout(()=> { primary.disabled = false; }, 700);
      });
    }

    const balanceAmount = document.querySelector('.balance__amount');
    if(balanceAmount){
      balanceAmount.addEventListener('click', async ()=>{
        try{
          await navigator.clipboard.writeText(balanceAmount.textContent.trim());
          const st = document.getElementById('status');
          if(st) st.textContent = 'Скопировано';
          setTimeout(()=> { if(st) st.textContent = ''; }, 1200);
        }catch(e){}
      });
    }
  }

  // ===== Init =====
  enforceLightTheme();
  document.addEventListener('DOMContentLoaded', ()=>{
    initDrawer();
    initRevealAndCounters();
    initUI();
    applyI18n();
  });

  // API
  window.SWSite = { refreshUI: () => { initRevealAndCounters(); initUI(); }, applyI18n };

})();
function initUI(){
  

  // Quick action: открыть официальный сайт биржи (Binance) в новой вкладке
  const exchangeBtn = Array.from(document.querySelectorAll('.btn'))
    .find(el => el && el.textContent && el.textContent.trim() === 'Биржа');
  if (exchangeBtn) {
    exchangeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://www.binance.com/', '_blank', 'noopener,noreferrer');
    });
  }

  // ...existing code...
}