/** Preserved legal/reference behavior extracted from the original single-file application. */
/* --- LEGACY SCRIPT BLOCK 16 START --- */

  // ===== Styles (only injected once) =====
// ==== MODAL CSS INJECTION (ensureIdentStyles) ====
/* Injects lightweight CSS for modal/backdrop once per page load. Safe to tweak sizing/colors. */

  function ensureIdentStyles(){
    if (document.getElementById('ident-modal-css')) return;
    const css = `
      .cl2-backdrop{position:fixed;inset:0;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;z-index:9999}
      .cl2-modal{background:#fff;width:min(900px,92vw);max-height:82vh;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.2);display:flex;flex-direction:column}
      .cl2-hd,.cl2-ft{padding:12px 16px;border-bottom:1px solid #e5e7eb}
      .cl2-ft{border-top:1px solid #e5e7eb;border-bottom:none}
      .cl2-title{margin:0;font:600 1.05rem/1.3 system-ui, sans-serif}
      .cl2-bd{padding:14px 16px;overflow:auto}
      .cl2-btn{border:1px solid #e5e7eb;background:#f9fafb;border-radius:8px;padding:6px 10px;cursor:pointer}
      .cl2-btn.ghost{background:#fff}
      .card{border:1px solid #e5e7eb;border-radius:12px;padding:14px;line-height:1.45}
    `;
    const style = document.createElement('style');
    style.id = 'ident-modal-css';
    style.textContent = css;
    document.head.appendChild(style);
  }

  // ===== Scroll helpers =====
  function lockScroll(){ document.documentElement.style.overflow = 'hidden'; }
  function unlockScroll(){ document.documentElement.style.overflow = ''; }

  // ===== Modal builder =====
// ==== IDENTIFYING PASSENGERS MODAL BUILDER (buildIdentModal) ====
/* Builds the overlay + modal + memo content. Close by clicking backdrop or the Close buttons. */

  function buildIdentModal(){
    ensureIdentStyles();

    // remove any existing instance
    const ex = document.getElementById('ip-backdrop');
    if (ex) ex.remove();

    // backdrop
    const back = document.createElement('div');
    back.id = 'ip-backdrop';
    back.className = 'cl2-backdrop';
    back.addEventListener('click', (e) => {
      if (e.target === back){ back.remove(); unlockScroll(); }
    });

    // modal
    const modal = document.createElement('div');
    modal.className = 'cl2-modal';

    // header
    const hd = document.createElement('div');
    hd.className = 'cl2-hd';
    const title = document.createElement('h3');
    title.className = 'cl2-title';
    title.textContent = 'Identifying Passengers — Legal Memo';
    const close = document.createElement('button');
    close.className = 'cl2-btn ghost';
    close.textContent = 'Close';
    close.onclick = function(){ back.remove(); unlockScroll(); };
    hd.appendChild(title);
    hd.appendChild(close);

    // body
    const bd = document.createElement('div');
    bd.className = 'cl2-bd';
    bd.style.maxHeight = '70vh';
    bd.style.overflow = 'auto';

    const wrap = document.createElement('div');
    wrap.className = 'card';
    wrap.style.cssText = 'border:1px solid #e5e7eb;border-radius:12px;padding:14px;line-height:1.45;';
    wrap.innerHTML = `
      <div style="font-family: system-ui, sans-serif; line-height: 1.55; color: #111827;">
  <h3 style="margin-top: 0; font-size: 1.1rem; font-weight: 700;">1. PURPOSE</h3>
  <p>This memorandum provides legal clarification regarding whether a passenger in a motor vehicle is required to identify themselves during a lawful traffic stop. It summarizes controlling federal and state authority, outlines officer limitations, and establishes best practices consistent with the U.S. Supreme Court, the Fifth Circuit Court of Appeals, and Louisiana statutory law.</p>

  <h3 style="margin-top: 1rem; font-size: 1.1rem; font-weight: 700;">2. CONTROLLING AUTHORITY</h3>

  <p><strong>A. U.S. Supreme Court — Hiibel v. Sixth Judicial Dist. Ct., 542 U.S. 177 (2004)</strong><br>
  A person may be required to identify themselves only if state law expressly mandates it during a lawful detention. Hiibel upheld a Nevada “stop and identify” statute as applied to a lawful Terry stop supported by reasonable suspicion. The Court emphasized that the identification requirement must stem from a specific statute and that officers cannot compel ID absent lawful grounds for detention.</p>

  <p><strong>B. U.S. Supreme Court — Brendlin v. California, 551 U.S. 249 (2007)</strong><br>
  Passengers are seized for Fourth Amendment purposes during a lawful traffic stop. Therefore, passengers have standing to challenge the legality of the stop. However, the fact that passengers are seized does not automatically obligate them to identify themselves absent an independent lawful basis or specific statute requiring it.</p>

  <p><strong>C. U.S. Supreme Court — Arizona v. Johnson, 555 U.S. 323 (2009)</strong><br>
  While passengers are lawfully detained during a traffic stop, officers may only frisk or further detain them upon reasonable suspicion that the passenger is armed and dangerous. The scope of the detention must remain related to the mission of the stop.</p>

  <p><strong>D. Louisiana Law</strong><br>
  Louisiana has no general “stop and identify” statute. Identification may be requested but cannot be compelled unless the person is lawfully arrested (La. C.Cr.P. art. 215.1; La. R.S. 14:108 — resisting an officer). Refusal to identify alone during an investigatory stop does not constitute resisting unless coupled with obstruction, flight, or physical interference with lawful duties.</p>

  <h3 style="margin-top: 1rem; font-size: 1.1rem; font-weight: 700;">3. OFFICER LIMITATIONS</h3>
  <ul style="margin-left: 1.25rem; list-style-type: disc;">
    <li>Passengers cannot be compelled to produce identification absent reasonable suspicion of criminal activity or a specific statutory duty.</li>
    <li>Officers may request a passenger’s name or identification for officer safety, documentation, or investigative purposes, but the passenger’s refusal alone does not justify arrest or prolonged detention.</li>
    <li>Officers may not extend the duration of a stop solely to obtain or verify passenger identification. (See <em>Rodriguez v. United States</em>, 575 U.S. 348 (2015)).</li>
    <li>Officers may briefly detain a passenger for officer safety or investigative questioning related to the mission of the stop, but the inquiry must remain within the bounds of the original stop.</li>
  </ul>

  <h3 style="margin-top: 1rem; font-size: 1.1rem; font-weight: 700;">4. BEST PRACTICES</h3>
  <ul style="margin-left: 1.25rem; list-style-type: disc;">
    <li>Clearly articulate the lawful basis for any passenger inquiry or detention in your report.</li>
    <li>Document all observable indicators (nervousness, behavior, concealment attempts, contraband odors, etc.) that justify extending or escalating the encounter.</li>
    <li>Use voluntary phrasing when requesting identification (e.g., “Would you mind providing your name for my report?”).</li>
    <li>Do not threaten arrest or charge “resisting” solely for refusal to identify unless the individual is physically obstructing or interfering with a lawful duty under R.S. 14:108.</li>
    <li>When in doubt, consult with a supervisor or district attorney for clarification before applying force or arrest authority under ambiguous circumstances.</li>
  </ul>

  <h3 style="margin-top: 1rem; font-size: 1.1rem; font-weight: 700;">5. CONCLUSION</h3>
  <p>Passengers are lawfully detained during traffic stops but are not required by Louisiana law to provide identification absent an independent lawful basis. Officers should limit inquiries to matters reasonably related to the purpose of the stop and maintain clear documentation of their legal justification. Requests for passenger identification should remain voluntary unless a specific lawful basis exists for compulsion.</p>
</div>

    `;
    bd.appendChild(wrap);

    // footer
    const ft = document.createElement('div');
    ft.className = 'cl2-ft';
    const close2 = document.createElement('button');
    close2.className = 'cl2-btn ghost';
    close2.textContent = 'Close';
    close2.onclick = function(){ back.remove(); unlockScroll(); };
    ft.appendChild(close2);

    // assemble & show
    modal.appendChild(hd);
    modal.appendChild(bd);
    modal.appendChild(ft);
    back.appendChild(modal);
    document.body.appendChild(back);
    lockScroll();
  }

  // ===== Make available to inline handlers and modules =====
  window.buildIdentModal = buildIdentModal;

  // ===== Wiring (works for static & dynamic buttons) =====
  document.addEventListener('DOMContentLoaded', function () {
    // direct bind if button exists at load
    const staticBtn = document.getElementById('btn-ident-memo');
    if (staticBtn) staticBtn.addEventListener('click', buildIdentModal);
  });

  // delegated bind covers buttons created later (e.g., when switching tabs)
  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('#btn-ident-memo, [data-open="ident-memo"]');
    if (trigger) {
      e.preventDefault();
      buildIdentModal();
    }
  });

/* --- LEGACY SCRIPT BLOCK 16 END --- */
