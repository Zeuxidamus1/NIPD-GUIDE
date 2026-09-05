/** Preserved legal/reference behavior extracted from the original single-file application. */
/* --- LEGACY SCRIPT BLOCK 17 START --- */

// ==== BACK FROM TRAFFIC FLOW -> RESTORE TRAFFIC TAB ====
// Simple restore: hide flow, show tabs, then click Traffic tab
function goBackToTraffic(){
  var flow = document.getElementById('view-traffic-flow');
  if (flow) flow.style.display = 'none';
  var tabs = document.getElementById('view-tabs');
  if (tabs) tabs.style.display = '';

  var trafficBtn =
    document.querySelector('[data-tab="traffic"]') ||
    document.getElementById('tab-traffic') ||
    document.querySelector('#traffic-tab');

  if (trafficBtn && typeof trafficBtn.click === 'function'){
    trafficBtn.click();
  } else {
    var allBtns = document.querySelectorAll('[data-tab]');
    allBtns.forEach(b => b.classList && b.classList.remove('active'));
    if (trafficBtn && trafficBtn.classList) trafficBtn.classList.add('active');

    var panels = document.querySelectorAll('[data-panel]');
    panels.forEach(p => p.style.display = (p.dataset.panel === 'traffic') ? '' : 'none');
  }
  return false;
}

/* --- LEGACY SCRIPT BLOCK 17 END --- */
/* --- LEGACY SCRIPT BLOCK 18 START --- */

// ==== TINY FIX: ensure 'Back' returns to visible Traffic Stop tab ====
// This does NOT change your React components. It just simulates a click
// on the existing "Traffic Stop" tab button after any Back click in the page.
(function(){
  function clickTrafficTab(){
    // Find a button whose visible text is "Traffic Stop" and click it.
    var buttons = Array.from(document.querySelectorAll('button, a, [role="button"]'));
    var found = buttons.find(function(b){
      var t = (b.textContent || '').trim();
      return /^traffic\s*stop$/i.test(t);
    });
    if (found && typeof found.click === 'function'){
      found.click();
    }
  }
  // Delegate clicks for any "Back" control
  document.addEventListener('click', function(e){
    var el = e.target.closest('button, a, [role="button"]');
    if (!el) return;
    var txt = (el.textContent || '').trim();
    if (/^back$/i.test(txt) || el.getAttribute('data-nav') === 'tabs' || el.id === 'btn-back-traffic'){
      // Let the component handle its own state first, then re-activate the tab
      setTimeout(clickTrafficTab, 0);
    }
  }, true);
})();

/* --- LEGACY SCRIPT BLOCK 18 END --- */
/* --- LEGACY SCRIPT BLOCK 19 START --- */

// ==== IDENTIFYING PASSENGERS — SAFE GLOBAL BINDER ====
// This does NOT modify your React handlers. It simply binds (and re-binds) to any
// element whose visible text includes "Identifying Passengers" and opens the memo modal.
(function(){
  function openIdent(){
    try {
      if (window.buildIdentModal) { window.buildIdentModal(); return; }
      if (window.__openIdentPassengersModal) { window.__openIdentPassengersModal(); return; }
      console.warn('Ident memo builder not found on window.');
    } catch (e) { console.error('Failed to open Ident memo:', e); }
  }
  function bind(){
    try{
      var candidates = document.querySelectorAll('button, a, [role="button"]');
      candidates.forEach(function(el){
        if (el.dataset && el.dataset.identMemoBound) return;
        var txt = (el.textContent || '').trim().toLowerCase();
        if (!txt) return;
        if (txt === 'identifying passengers' || txt.indexOf('identifying passengers') !== -1){
          el.addEventListener('click', function(e){
            // let framework do its thing, then open modal
            setTimeout(openIdent, 0);
          }, true);
          el.dataset.identMemoBound = '1';
        }
      });
    }catch(e){ console.error('Ident binder error:', e); }
  }
  // Initial + observe DOM for dynamic renders
  document.addEventListener('DOMContentLoaded', bind);
  var mo = new MutationObserver(function(){ bind(); });
  mo.observe(document.documentElement, { childList:true, subtree:true });
  // Also attempt a few delayed binds for late mounts
  var t=0, id=setInterval(function(){ bind(); if(++t>20) clearInterval(id); }, 200);
})();

/* --- LEGACY SCRIPT BLOCK 19 END --- */
/* --- LEGACY SCRIPT BLOCK 20 START --- */

// ==== TAB HIGHLIGHT FIX (single active; Case Law neutral) ====
(function(){
  function isCaseLaw(btn){
    if (!btn) return false;
    if (btn.id === 'tab-btn-caselaw-REMOVED') return true;
    var txt = (btn.textContent || '').trim().toLowerCase();
    return txt === 'case law';
  }
  function setOnlyActive(clicked){
    var all = document.querySelectorAll('.tabs .btn');
    all.forEach(function(b){
      b.classList.remove('active');
    });
    if (clicked && !isCaseLaw(clicked)) {
      clicked.classList.add('active');
    }
    // Ensure Case Law never appears active
    var cl = document.getElementById('tab-btn-caselaw-REMOVED');
    if (cl) cl.classList.remove('active');
  }

  // Initial cleanup & default highlight
  document.addEventListener('DOMContentLoaded', function(){
    var trafficBtn = Array.from(document.querySelectorAll('.tabs .btn')).find(function(b){
      return ((b.textContent||'').trim().toLowerCase() === 'traffic stop') && !isCaseLaw(b);
    });
    setOnlyActive(trafficBtn || null);
  });

  // Clicks on tabs
  document.addEventListener('click', function(e){
    var btn = e.target.closest('.tabs .btn');
    if (!btn) return;
    // Don't hijack Case Law; it opens a modal
    if (isCaseLaw(btn)) {
      // keep highlights as-is (or clear if it accidentally had .active)
      btn.classList.remove('active');
      return;
    }
    setOnlyActive(btn);
  }, true);
})();

/* --- LEGACY SCRIPT BLOCK 20 END --- */
/* --- LEGACY SCRIPT BLOCK 21 START --- */

// === Pill Lookup Legend: MANUAL toggle only ===
document.addEventListener('DOMContentLoaded', function(){
  try {
    // Find the first block whose text begins with "Legend:" inside the Pill Lookup card
    var candidates = Array.from(document.querySelectorAll('div, p, span, li'));
    var legendEl = candidates.find(function(el){
      var t = (el.textContent || '').trim();
      return /^Legend:\s*/i.test(t);
    });
    if (!legendEl || legendEl.__legendBound) return;
    legendEl.__legendBound = true;
    // Hide by default
    legendEl.classList.add('pill-legend');
    // Insert toggle button right before the legend
    var wrap = document.createElement('div');
    wrap.className = 'pill-legend-toggle-wrap';
    var btn = document.createElement('button');
    btn.id = 'toggleLegend';
    btn.type = 'button';
    btn.className = 'pill-legend-toggle';
    btn.textContent = '💡 Legend';
    wrap.appendChild(btn);
    legendEl.parentNode.insertBefore(wrap, legendEl);
    // Manual toggle only
    btn.addEventListener('click', function(){
      legendEl.classList.toggle('show');
    });
  } catch (e) {
    console.error('Legend manual toggle init error:', e);
  }
});

/* --- LEGACY SCRIPT BLOCK 21 END --- */
/* --- LEGACY SCRIPT BLOCK 22 START --- */

// === Pill Lookup Legend: robust manual toggle with DOM observation ===
(function(){
  function findLegendRoot(){
    // Prefer an element that contains text starting with 'Legend:' and has pill-badge spans
    var nodes = Array.from(document.querySelectorAll('div, p'));
    for (var i=0;i<nodes.length;i++){
      var el = nodes[i];
      var txt = (el.textContent || '').trim();
      if (!/^Legend:\s*/i.test(txt)) continue;
      if (el.querySelector('.pill-badge')) return el;
    }
    // Fallback: look for a small muted div with pill-badge children
    var fallback = Array.from(document.querySelectorAll('div.xsmall.muted')).find(function(el){
      return el.querySelector('.pill-badge');
    });
    return fallback || null;
  }

  function ensureToggle(){
    var legendEl = findLegendRoot();
    if (!legendEl || legendEl.__legendBound) return;
    legendEl.__legendBound = true;
    // Hide by default
    legendEl.classList.add('pill-legend');
    // Insert a toggle button before the legend
    var wrap = document.createElement('div');
    wrap.className = 'pill-legend-toggle-wrap';
    var btn = document.createElement('button');
    btn.id = 'toggleLegend';
    btn.type = 'button';
    btn.className = 'pill-legend-toggle';
    btn.textContent = '💡 Legend';
    wrap.appendChild(btn);
    legendEl.parentNode.insertBefore(wrap, legendEl);
    btn.addEventListener('click', function(){ legendEl.classList.toggle('show'); });
  }

  document.addEventListener('DOMContentLoaded', ensureToggle);
  // Observe for late renders
  var mo = new MutationObserver(function(){ ensureToggle(); });
  mo.observe(document.documentElement, {childList:true, subtree:true});
  // Also retry a few times on intervals
  var tries = 0, id = setInterval(function(){ ensureToggle(); if (++tries > 20) clearInterval(id); }, 200);
})();

/* --- LEGACY SCRIPT BLOCK 22 END --- */
/* --- LEGACY SCRIPT BLOCK 23 START --- */

// Robust MutationObserver: add Qty input to each selected pill card
(function(){
  function isSelectedPillCard(card){
    if(!card) return false;
    // Has a schedule badge (pill context) and a navrow with a Remove button
    const hasBadge = !!card.querySelector('.pill-badge');
    const removeBtn = card.querySelector('.navrow button');
    const hasRemove = !!removeBtn && /remove/i.test(removeBtn.textContent||"");
    return hasBadge && hasRemove;
  }

  function attachQty(card){
    if(!isSelectedPillCard(card)) return;
    const nav = card.querySelector('.navrow');
    if(!nav) return;
    if(nav.querySelector('.pill-amount')) return; // already added

    const removeBtn = Array.from(nav.querySelectorAll('button')).find(b => /remove/i.test(b.textContent||""));
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.placeholder = 'Qty';
    input.className = 'pill-amount';
    if(removeBtn){
      nav.insertBefore(input, removeBtn);
    }else{
      nav.appendChild(input);
    }
  }

  function sweep(root){
    root.querySelectorAll('.card').forEach(attachQty);
  }

  const observer = new MutationObserver((muts)=>{
    muts.forEach(m=>{
      m.addedNodes && m.addedNodes.forEach(node=>{
        if(!(node instanceof Element)) return;
        if(node.matches && node.matches('.card')) attachQty(node);
        // Also sweep any subtree added
        node.querySelectorAll && node.querySelectorAll('.card').forEach(attachQty);
      });
    });
  });

  document.addEventListener('DOMContentLoaded', function(){
    sweep(document);
    observer.observe(document.body, {subtree:true, childList:true});
  });
})();

/* --- LEGACY SCRIPT BLOCK 23 END --- */
