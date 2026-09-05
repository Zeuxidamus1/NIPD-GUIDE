/** Preserved legal/reference behavior extracted from the original single-file application. */
/* --- LEGACY SCRIPT BLOCK 24 START --- */

(function(){
  const openBtn = document.getElementById('clx-open-btn');
  const bd = document.getElementById('clx-backdrop');
  const closeBtn = document.getElementById('clx-close');

  function openCL(){ bd.classList.add('show'); bd.setAttribute('aria-hidden','false'); }
  function closeCL(){ bd.classList.remove('show'); bd.setAttribute('aria-hidden','true'); }

  if(openBtn) openBtn.addEventListener('click', openCL);
  if(closeBtn) closeBtn.addEventListener('click', closeCL);
  bd && bd.addEventListener('click', (e)=>{ if(e.target===bd) closeCL(); });
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape' && bd.classList.contains('show')) closeCL(); });

  // Accordion wiring
  document.querySelectorAll('[data-clx-acc]').forEach(acc=>{
    const h = acc.querySelector('.clx-acc-h');
    const p = acc.querySelector('.clx-acc-p');
    const inner = acc.querySelector('.clx-acc-in');
    p.style.maxHeight = '0px';
    h.addEventListener('click', ()=>{
      const open = acc.classList.contains('open');
      document.querySelectorAll('[data-clx-acc].open').forEach(a=>{
        if(a!==acc){ a.classList.remove('open'); a.querySelector('.clx-acc-p').style.maxHeight='0px'; }
      });
      if(open){ acc.classList.remove('open'); p.style.maxHeight='0px'; }
      else { acc.classList.add('open'); p.style.maxHeight = inner.scrollHeight + 'px'; }
    });
    const ro = new ResizeObserver(()=>{
      if(acc.classList.contains('open')) p.style.maxHeight = inner.scrollHeight + 'px';
    });
    ro.observe(inner);
  });

  // Optional: expose a global so existing buttons can open the modal if needed
  window.__openCaseLawModal = openCL;
})();

/* --- LEGACY SCRIPT BLOCK 24 END --- */
/* --- LEGACY SCRIPT BLOCK 25 START --- */

// --- Bind inline Case Law tab(s) to open the modal as well ---
(function(){
  function isCaseLawEl(el){
    if(!el || el.id === 'clx-open-btn') return false;
    const txt = (el.textContent || '').trim().toLowerCase().replace(/\s+/g,' ');
    return txt === 'case law';
  }
  function bind(){
    const candidates = Array.from(document.querySelectorAll('button, a, [role="tab"], .tab, .tab-btn, .pill, .btn'));
    candidates.forEach(el => {
      if(el.__clx_bound) return;
      if(isCaseLawEl(el)){
        el.__clx_bound = true;
        el.addEventListener('click', function(e){
          // prevent existing router/tab switch and open our modal
          e.preventDefault();
          e.stopPropagation();
          if(typeof window.__openCaseLawModal === 'function'){
            window.__openCaseLawModal();
          }else{
            const bd = document.getElementById('clx-backdrop');
            if(bd){ bd.classList.add('show'); bd.setAttribute('aria-hidden','false'); }
          }
        }, true);
      }
    });
  }
  // Initial bind and keep it sticky across app updates
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', bind);
  }else{
    bind();
  }
  const mo = new MutationObserver(bind);
  mo.observe(document.documentElement || document.body, {subtree:true, childList:true});
})();



/* --- LEGACY SCRIPT BLOCK 25 END --- */
