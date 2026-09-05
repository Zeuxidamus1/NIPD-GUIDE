/** Preserved legal/reference behavior extracted from the original single-file application. */
/* --- LEGACY SCRIPT BLOCK 5 START --- */

/* Case Law links patch (Oyez / Casetext / Google Scholar) */
(function () {
  function ensureStyle() {
    if (document.getElementById('cl2-links-style')) return;
    var s = document.createElement('style');
    s.id = 'cl2-links-style';
    s.textContent = '.cl2-links{margin-top:6px;font-size:13px}' +
                    '.cl2-links a{color:#1b2658;text-decoration:underline;margin-right:10px}';
    document.head.appendChild(s);
  }
  function rowFor(title) {
    var t = String(title||'').replace(/\s+/g,' ').trim();
    if (!t) return '';
    var q = encodeURIComponent(t);
    var oyez = 'https://duckduckgo.com/?q=site%3Aoyez.org+'+q;
    var casetext = 'https://duckduckgo.com/?q=site%3Acasetext.com+'+q;
    var scholar = 'https://scholar.google.com/scholar?q='+q;
    return '<div class="cl2-links">' +
           '<a href="'+oyez+'" target="_blank" rel="noopener">Oyez</a>' +
           '<a href="'+casetext+'" target="_blank" rel="noopener">Casetext</a>' +
           '<a href="'+scholar+'" target="_blank" rel="noopener">Google Scholar</a>' +
           '</div>';
  }
  function addLinks(container) {
    if (!container) return;
    container.querySelectorAll('.cl2-item').forEach(function(item){
      if (item.querySelector('.cl2-links')) return; // already added
      var titleEl = item.querySelector('strong');
      if (!titleEl) return;
      var div = document.createElement('div');
      div.innerHTML = rowFor(titleEl.textContent);
      if (div.firstChild) item.insertBefore(div.firstChild, item.children[1] || null);
    });
  }
  function init() {
    ensureStyle();
    var host = document.getElementById('cl2-results');
    addLinks(host);
    // Watch for new results (search re-renders)
    var mo = new MutationObserver(function(){ addLinks(host); });
    if (host) mo.observe(host, {childList:true, subtree:true});
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/* --- LEGACY SCRIPT BLOCK 5 END --- */
/* --- LEGACY SCRIPT BLOCK 6 START --- */

/* Merge in Search Warrant case law (USSC) */
(function(){
  var NEW = [{"title": "Illinois v. Gates (1983) — USSC", "rule": "Search warrant probable cause is assessed under a 'totality of the circumstances' test; informant veracity, basis of knowledge, and corroboration are relevant.", "category": "Warrants", "takeaway": "Draft affidavits around corroborated facts; don't rely solely on rigid prongs."}, {"title": "Franks v. Delaware (1978) — USSC", "rule": "A defendant is entitled to a hearing if they make a substantial showing that a warrant affidavit contained knowingly false statements or reckless disregard for the truth, and that the false statements were necessary to probable cause.", "category": "Warrants", "takeaway": "Be scrupulously accurate in affidavits; material misstatements risk suppression."}, {"title": "United States v. Leon (1984) — USSC", "rule": "The good-faith exception allows evidence from a warrant later found invalid if officers reasonably relied on the warrant.", "category": "Good faith doctrine", "takeaway": "Act reasonably on the face of the warrant; avoid obvious defects or bare-bones affidavits."}, {"title": "Groh v. Ramirez (2004) — USSC", "rule": "Warrants must particularly describe the place to be searched and items to be seized; a warrant that fails on its face violates the Fourth Amendment.", "category": "Warrants", "takeaway": "Particularity must appear on the warrant itself; don't rely only on an attached affidavit."}, {"title": "Maryland v. Garrison (1987) — USSC", "rule": "A reasonable mistake in executing a warrant may not invalidate a search if officers acted reasonably under the circumstances.", "category": "Warrants", "takeaway": "Verify the target location; stop and limit scope when you realize an error."}, {"title": "United States v. Grubbs (2006) — USSC", "rule": "Anticipatory search warrants are valid if the triggering condition is set out in the affidavit; the condition need not be on the face of the warrant.", "category": "Warrants", "takeaway": "Document and adhere to the triggering event; ensure clear probable cause once triggered."}, {"title": "Kyllo v. United States (2001) — USSC", "rule": "Using a thermal imager to explore details of a home not otherwise visible constitutes a search; a warrant is required.", "category": "Warrants", "takeaway": "Tech to sense inside a home generally needs a warrant absent an exception."}, {"title": "Riley v. California (2014) — USSC", "rule": "A warrant is required to search digital content of a cell phone seized incident to arrest.", "category": "Warrants", "takeaway": "Seize and secure the phone; then get a warrant for data."}, {"title": "Carpenter v. United States (2018) — USSC", "rule": "Government acquisition of historical cell-site location information is a search; generally requires a warrant.", "category": "Warrants", "takeaway": "Get a warrant for prolonged CSLI unless a narrow exception applies."}, {"title": "Payton v. New York (1980) — USSC", "rule": "Absent exigent circumstances, officers may not enter a suspect’s home to make a routine felony arrest without an arrest warrant.", "category": "Warrantless home entry", "takeaway": "Arrest warrants authorize entry into the suspect’s residence when there’s reason to believe the suspect is inside."}, {"title": "Steagald v. United States (1981) — USSC", "rule": "An arrest warrant does not authorize entry into a third party’s home to arrest the suspect; a search warrant is required for the third party’s home.", "category": "Warrants", "takeaway": "Get a search warrant to enter a third party’s residence for a suspect."}];
  function dedupeByTitle(arr) {
    var seen={}, out=[];
    for (var i=0;i<arr.length;i++) { var t=(arr[i].title||'').trim().toLowerCase();
      if(!t||seen[t]) continue; seen[t]=1; out.push(arr[i]); }
    return out;
  }
  var base = Array.isArray(window.__CASELAW_LA__) ? window.__CASELAW_LA__ : [];
  window.__CASELAW_LA__ = dedupeByTitle(base.concat(NEW));
  function attach(){
    var btn = document.getElementById('tab-btn-caselaw-REMOVED') || document.getElementById('tab-btn-caselaw-modal-v2') || document.getElementById('tab-btn-caselaw-modal-safe');
    if(!btn) return;
    btn.addEventListener('click', function(){
      setTimeout(function(){
        var input = document.querySelector('.cl2-input');
        if(input) { input.dispatchEvent(new Event('input')); }
      }, 150);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();

/* --- LEGACY SCRIPT BLOCK 6 END --- */
/* --- LEGACY SCRIPT BLOCK 7 START --- */

/* Add Michigan v. Summers (1981) — USSC into Case Law dataset */
(function(){
  var NEW = {"title": "Michigan v. Summers (1981) — USSC", "rule": "Officers executing a lawful search warrant for contraband have limited authority to detain occupants of the premises while the search is conducted.", "category": "Warrants", "takeaway": "You may detain occupants on-site during execution of a search warrant to ensure officer safety, facilitate the search, and prevent flight. Note: Bailey v. United States (2013) limits this authority to the immediate vicinity of the premises; away-from-scene detentions require independent justification."};
  function dedupeByTitle(arr){
    var seen = {}, out = [];
    for (var i=0;i<arr.length;i++){
      var t = (arr[i].title||'').trim().toLowerCase();
      if (!t || seen[t]) continue;
      seen[t] = 1; out.push(arr[i]);
    }
    return out;
  }
  var base = Array.isArray(window.__CASELAW_LA__) ? window.__CASELAW_LA__ : [];
  base.push(NEW);
  window.__CASELAW_LA__ = dedupeByTitle(base);
  // If the Case Law modal is already open later, kick a refresh when user opens it
  function attach(){
    var btn = document.getElementById('tab-btn-caselaw-REMOVED') || document.getElementById('tab-btn-caselaw-modal-v2') || document.getElementById('tab-btn-caselaw-modal-safe');
    if(!btn) return;
    btn.addEventListener('click', function(){
      setTimeout(function(){
        var input = document.querySelector('.cl2-input');
        if (input) { input.dispatchEvent(new Event('input')); }
      }, 150);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach);
  } else {
    attach();
  }
})();

/* --- LEGACY SCRIPT BLOCK 7 END --- */
/* --- LEGACY SCRIPT BLOCK 8 START --- */

/* Guarantee Summers is in dataset and visible to the modal */
(function(){
  var NEW = {"title": "Michigan v. Summers (1981) — USSC", "rule": "Officers executing a lawful search warrant for contraband have limited authority to detain occupants of the premises while the search is conducted.", "category": "Warrants", "takeaway": "You may detain occupants on-site during execution of a search warrant to ensure officer safety, facilitate the search, and prevent flight. Note: Bailey v. United States (2013) limits this authority to the immediate vicinity of the premises; away-from-scene detentions require independent justification."};
  function dedupe(arr){
    var seen={}, out=[];
    for (var i=0;i<arr.length;i++){ var t=(arr[i].title||'').trim().toLowerCase(); if(!t||seen[t]) continue; seen[t]=1; out.push(arr[i]); }
    return out;
  }
  var base = Array.isArray(window.__CASELAW_LA__) ? window.__CASELAW_LA__ : [];
  base.push(NEW);
  window.__CASELAW_LA__ = dedupe(base);
  function attach(){
    var ids=['tab-btn-caselaw-REMOVED','tab-btn-caselaw-modal-v2','tab-btn-caselaw-modal-safe'];
    for (var i=0;i<ids.length;i++){ var btn=document.getElementById(ids[i]); if(btn) btn.addEventListener('click', function(){ setTimeout(function(){ var el=document.querySelector('.cl2-input'); if(el) el.dispatchEvent(new Event('input')); }, 120); }); }
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', attach); else attach();
})();

/* --- LEGACY SCRIPT BLOCK 8 END --- */
/* --- LEGACY SCRIPT BLOCK 9 START --- */

/* Case Law Tab Mounter — robust: tab bar button + fallback floater */
(function(){
  var TAB_ID = 'tab-btn-caselaw-REMOVED';
  function findTabBar(){
    var el = document.querySelector('[role="tablist"]');
    if (el) return el;
    var classes = ['.tab-bar','.tabs','.tabbar','.nav','.tab-list','.tablist'];
    for (var i=0;i<classes.length;i++) {
      el = document.querySelector(classes[i]);
      if (el && el.querySelectorAll('button, a').length >= 2) return el;
    }
    // try parent of a known tab label
    var known = Array.prototype.find.call(document.querySelectorAll('button,a'), function(b){
      var t = (b.textContent||'').toLowerCase();
      return t.includes('narcotic') || t.includes('traffic') || t.includes('domestic') || t.includes('weapons');
    });
    return known ? known.parentElement : null;
  }
  function mount(){
    var bar = findTabBar();
    if (!bar) { mountFallback(); return; }
    if (document.getElementById(TAB_ID)) return;
    var proto = bar.querySelector('button, a');
    var tag = (proto && proto.tagName.toLowerCase()) || 'button';
    var cls = (proto && proto.className) || '';
    var btn = document.createElement(tag);
    btn.id = TAB_ID;
    btn.className = cls;
    btn.textContent = 'Case Law';
    btn.addEventListener('click', function(){
      // open the modal if present
      var openFn = window.__openCaseLawModalV3 || window.__openCaseLawModalV2;
      if (typeof openFn === 'function') { openFn(); }
      else {
        // try to trigger the existing builder by simulating earlier logic
        var ev = new Event('build-caselaw-modal');
        window.dispatchEvent(ev);
      }
    });
    bar.appendChild(btn);
  }
  function mountFallback(){
    if (document.getElementById(TAB_ID+'-fallback')) return;
    var b = document.createElement('button');
    b.id = TAB_ID+'-fallback';
    b.textContent = 'Case Law';
    b.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:2147483647;padding:10px 14px;border-radius:12px;border:1px solid #3c4e73;background:#1b2658;color:#fff;box-shadow:0 8px 24px rgba(0,0,0,.25)';
    b.addEventListener('click', function(){
      var ev = new Event('build-caselaw-modal');
      window.dispatchEvent(ev);
    });
    document.body.appendChild(b);
  }
  // Provide a public opener so the button can call it
  window.__openCaseLawModalV3 = function(){
    var evt = new Event('build-caselaw-modal');
    window.dispatchEvent(evt);
  };
  // Ensure our modal builder listens to this event
  (function hookBuilder(){
    var hooked = false;
    function tryHook(){
      // The builder function lives inside our injected script; we can't reference it directly,
      // so we listen to the event and click the existing tab button that used to open it.
      if (hooked) return;
      hooked = true;
      window.addEventListener('build-caselaw-modal', function(){
        // Click any existing case law trigger if present
        var triggers = [
          document.getElementById('tab-btn-caselaw-REMOVED'),
          document.getElementById('tab-btn-caselaw-modal-v2'),
          document.getElementById('tab-btn-caselaw-modal-safe')
        ];
        for (var i=0;i<triggers.length;i++){
          if (triggers[i]) { triggers[i].dispatchEvent(new Event('click')); return; }
        }
        // As a last resort, try to locate and invoke the builder if it left a global
        if (typeof window.buildCaseLawModalV3 === 'function') window.buildCaseLawModalV3();
      });
    }
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', tryHook); } else { tryHook(); }
  })();
  // Mount now and on load
  function go(){ mount(); }
  if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', go); } else { go(); }
  window.addEventListener('load', go);
  var tries=0, t=setInterval(function(){ if(++tries>40) return clearInterval(t); go(); }, 250);
})();

/* --- LEGACY SCRIPT BLOCK 9 END --- */
/* --- LEGACY SCRIPT BLOCK 10 START --- */

/* Inline Case Law seed (from your PDF) — merge + persist */
(function(){"use strict";
  var KEY = 'NIPD_CASELAW_LA';
  var SEED = [{"title": "Griffin v. Wisconsin", "citation": "483 U.S. 868 (1987)", "jurisdiction": "USSC", "topic": "Parolees/Probationers", "rule": "Probation/parole searches may be conducted on reasonable suspicion when necessary to supervision duties.", "comment": "No full probable cause required for probation officer; reasonableness assessed by scope, manner, justification, and place.", "source_cite": "fileciteturn6file0"}, {"title": "State v. Malone", "citation": "403 So.2d 1234 (La. 1981)", "jurisdiction": "LA", "topic": "Parolees/Probationers", "rule": "Louisiana factors for reasonableness of probation/parole searches: scope, manner, justification, and place.", "comment": "Louisiana adopts multi-factor test for warrantless probation/parole searches.", "source_cite": "fileciteturn6file4"}, {"title": "State v. Cosie", "citation": "44 So.3d 314 (La. Ct. App. 5th Cir. 2010)", "jurisdiction": "LA", "topic": "Parolees/Probationers", "rule": "Applies reasonableness factors to parole/probation searches.", "comment": "Louisiana appellate application of probation/parole search standards.", "source_cite": "fileciteturn6file6"}, {"title": "New Jersey v. T.L.O.", "citation": "469 U.S. 325 (1985)", "jurisdiction": "USSC", "topic": "Administrative/Special Needs", "rule": "School searches by officials judged by reasonableness under special needs doctrine.", "comment": "Defines governmental 'special needs' beyond law enforcement; forms basis for student search/testing cases.", "source_cite": "fileciteturn6file4"}, {"title": "Allen v. Louisiana State Bd. of Dentistry", "citation": "543 So.2d 908 (La. 1989)", "jurisdiction": "LA", "topic": "Private Actor Searches", "rule": "Constitutional limits apply to governmental action, not private searches.", "comment": "If search is by private person (not gov't agent), exclusionary rule generally inapplicable.", "source_cite": "fileciteturn6file4"}, {"title": "Vernonia Sch. Dist. 47J v. Acton", "citation": "515 U.S. 646 (1995)", "jurisdiction": "USSC", "topic": "Administrative/Special Needs", "rule": "Random drug testing of student athletes upheld under special needs doctrine.", "comment": "Part of the school special needs line.", "source_cite": "fileciteturn6file4"}, {"title": "Bd. of Educ. of Indep. Sch. Dist. No. 92 of Pottawatomie Cty. v. Earls", "citation": "536 U.S. 822 (2002)", "jurisdiction": "USSC", "topic": "Administrative/Special Needs", "rule": "Drug testing of students in competitive extracurriculars upheld.", "comment": "Extends Vernonia beyond athletes.", "source_cite": "fileciteturn6file4"}, {"title": "O'Connor v. Ortega", "citation": "480 U.S. 709 (1987)", "jurisdiction": "USSC", "topic": "Workplace Searches", "rule": "Public employer's search of workplace spaces judged by reasonableness.", "comment": "Desks/offices/file cabinets searchable on work-related justification.", "source_cite": "fileciteturn6file4"}, {"title": "Skinner v. Railway Labor Executives’ Ass’n", "citation": "489 U.S. 602 (1989)", "jurisdiction": "USSC", "topic": "Administrative/Special Needs", "rule": "Warrantless drug/alcohol testing of railway employees upheld.", "comment": "Rail safety as special need.", "source_cite": "fileciteturn6file4"}, {"title": "Nat’l Treasury Employees Union v. Von Raab", "citation": "489 U.S. 656 (1989)", "jurisdiction": "USSC", "topic": "Administrative/Special Needs", "rule": "Drug testing of customs officials upheld under special needs.", "comment": "Testing permissible where strong governmental interests present.", "source_cite": "fileciteturn6file4"}, {"title": "Chandler v. Miller", "citation": "520 U.S. 305 (1997)", "jurisdiction": "USSC", "topic": "Administrative/Special Needs", "rule": "Struck down urinalysis requirement for political candidates—no sufficient special need.", "comment": "Certification not tied to concrete risk; special needs not met.", "source_cite": "fileciteturn6file5"}, {"title": "Ferguson v. City of Charleston", "citation": "532 U.S. 67 (2001)", "jurisdiction": "USSC", "topic": "Administrative/Special Needs", "rule": "Hospital policy drug‑testing pregnant patients for law‑enforcement purposes unconstitutional.", "comment": "Program’s primary purpose was law enforcement; violates 4A.", "source_cite": "fileciteturn6file5"}, {"title": "Katz v. United States", "citation": "389 U.S. 347 (1967)", "jurisdiction": "USSC", "topic": "Expectation of Privacy", "rule": "Fourth Amendment protects people with a reasonable expectation of privacy.", "comment": "Introduces reasonable expectation of privacy test.", "source_cite": "fileciteturn6file5"}, {"title": "United States v. Jacobsen", "citation": "466 U.S. 109 (1984)", "jurisdiction": "USSC", "topic": "Private Actor Searches", "rule": "Exclusionary rule applies to governmental searches; private party searches aren’t subject to 4A.", "comment": "No suppression when purely private search; 4A not implicated.", "source_cite": "fileciteturn6file7"}, {"title": "United States v. Leon", "citation": "468 U.S. 897 (1984)", "jurisdiction": "USSC", "topic": "Good Faith Exception", "rule": "Evidence obtained in reasonable reliance on a warrant later found invalid may be admissible.", "comment": "Purpose of exclusionary rule is deterrence of police misconduct.", "source_cite": "fileciteturn6file7"}, {"title": "Henry v. United States", "citation": "361 U.S. 98 (1959)", "jurisdiction": "USSC", "topic": "Probable Cause", "rule": "PC requires facts/circumstances to warrant a prudent person to believe an offense was committed.", "comment": "Guidance on PC standard; not mere good faith.", "source_cite": "fileciteturn6file7"}, {"title": "State v. Wells", "citation": "45 So.3d 577 (La. 2010)", "jurisdiction": "LA", "topic": "Probable Cause (Arrest)", "rule": "Defines Louisiana probable cause to arrest standard—facts sufficient for person of average caution.", "comment": "Louisiana articulation of PC to arrest.", "source_cite": "fileciteturn6file7"}, {"title": "Malley v. Briggs", "citation": "475 U.S. 335 (1986)", "jurisdiction": "USSC", "topic": "§1983 Civil Liability", "rule": "Officer may be liable for unlawful arrest under §1983 when no reasonable officer would have sought the warrant.", "comment": "Civil liability for objectively unreasonable arrests.", "source_cite": "fileciteturn6file3"}, {"title": "Anderson v. Creighton", "citation": "483 U.S. 635 (1987)", "jurisdiction": "USSC", "topic": "§1983 Civil Liability", "rule": "Civil liability extends to unreasonable searches under §1983; qualified immunity turns on clearly established law.", "comment": "Parallels arrest/search standards for liability.", "source_cite": "fileciteturn6file3"}, {"title": "Saucier v. Katz", "citation": "533 U.S. 194 (2001)", "jurisdiction": "USSC", "topic": "Qualified Immunity", "rule": "Qualified immunity shields officials from suit where conduct does not violate clearly established rights.", "comment": "Two‑step qualified immunity framework.", "source_cite": "fileciteturn6file3"}];
  function parse(j){ try{ return JSON.parse(j)||[]; }catch(_ ){ return []; } }
  function dedupe(arr){ var seen={}; var out=[]; for(var i=0;i<arr.length;i++){ var c=arr[i]||{}; var k=(c.citation||c.title||'').trim().toLowerCase(); if(!k||seen[k]) continue; seen[k]=1; out.push(c);}  return out; }
  var persisted = parse(localStorage.getItem(KEY));
  var page = Array.isArray(window.__CASELAW_LA__) ? window.__CASELAW_LA__ : [];
  var merged = dedupe([].concat(persisted, page, SEED));
  window.__CASELAW_LA__ = merged;
  try { localStorage.setItem(KEY, JSON.stringify(merged)); } catch(_ ) { }
  window.NIPD_getCaseLawJSON = function(){ return JSON.stringify(window.__CASELAW_LA__||[], null, 2); };
  window.NIPD_setCaseLawJSON = function(json){ try{ var arr=JSON.parse(json); if(Array.isArray(arr)){ window.__CASELAW_LA__ = dedupe(arr); localStorage.setItem(KEY, JSON.stringify(window.__CASELAW_LA__)); return true; } }catch(_ ){} return false; };
})();

/* --- LEGACY SCRIPT BLOCK 10 END --- */
/* --- LEGACY SCRIPT BLOCK 11 START --- */

(function(){
  var EXTRA = [{"title": "Whren v. United States (1996) — USSC", "rule": "Pretext stop valid if objective PC for traffic violation exists.", "category": "Automobile Cases", "takeaway": "Officer motive irrelevant if violation occurred."}, {"title": "Delaware v. Prouse (1979) — USSC", "rule": "Random license/registration stops without RS/PC unconstitutional.", "category": "Automobile Cases", "takeaway": "Need RS or checkpoint program with safeguards."}, {"title": "Illinois v. Caballes (2005) — USSC", "rule": "K‑9 sniff during lawful stop OK if it doesn’t prolong the stop.", "category": "K-9 sniff", "takeaway": "No added time; otherwise see Rodriguez."}, {"title": "Rodriguez v. United States (2015) — USSC", "rule": "Cannot extend stop for K‑9 without RS.", "category": "K-9 sniff", "takeaway": "Finish mission tasks or have RS to prolong."}, {"title": "Florida v. Harris (2013) — USSC", "rule": "Dog reliability judged by totality; training/field data relevant.", "category": "K-9 sniff", "takeaway": "Document certification & performance."}, {"title": "Brendlin v. California (2007) — USSC", "rule": "Passengers are seized during traffic stops; have standing.", "category": "Automobile Cases", "takeaway": "Passengers can challenge the stop."}, {"title": "Arizona v. Johnson (2009) — USSC", "rule": "Frisk passenger during stop if RS they’re armed/dangerous.", "category": "Pat downs", "takeaway": "Need RS focused on the person."}, {"title": "Michigan v. Long (1983) — USSC", "rule": "Terry frisk of vehicle if RS of weapons; limited to areas weapons could be hidden.", "category": "Pat downs", "takeaway": "Protective sweep of passenger compartment."}, {"title": "Chimel v. California (1969) — USSC", "rule": "SITA limited to arrestee and grabbing area.", "category": "SITA", "takeaway": "No general room search."}, {"title": "Arizona v. Gant (2009) — USSC", "rule": "Vehicle SITA only if arrestee unsecured and in reach OR evidence of arrest offense likely in car.", "category": "SITA", "takeaway": "No automatic vehicle search post‑arrest."}, {"title": "New York v. Belton (1981) — USSC", "rule": "(Cabined by Gant) Vehicle SITA of passenger compartment incident to arrest.", "category": "SITA", "takeaway": "Apply via Gant limits."}, {"title": "United States v. Ross (1982) — USSC", "rule": "With PC, search vehicle + containers that could hold object.", "category": "Automobile Cases", "takeaway": "Scope tracks object of search."}, {"title": "California v. Acevedo (1991) — USSC", "rule": "With PC to a container in a car, may search that container.", "category": "Automobile Cases", "takeaway": "Container-focused PC permits container search."}, {"title": "Carroll v. United States (1925) — USSC", "rule": "Automobile exception: PC + mobility permits warrantless car search.", "category": "Automobile Cases", "takeaway": "PC is key; mobility supplies exigency."}, {"title": "Collins v. Virginia (2018) — USSC", "rule": "Auto exception doesn’t allow entry into curtilage to access a vehicle.", "category": "Warrantless home entry", "takeaway": "Need warrant when car sits within curtilage."}, {"title": "Schneckloth v. Bustamonte (1973) — USSC", "rule": "Consent must be voluntary under totality; knowledge of right to refuse is a factor.", "category": "Consent Search", "takeaway": "No coercion; document voluntariness."}, {"title": "Florida v. Jimeno (1991) — USSC", "rule": "Scope of consent by objective reasonableness of what typical person would understand.", "category": "Consent Search", "takeaway": "Clarify scope; containers case‑by‑case."}, {"title": "Georgia v. Randolph (2006) — USSC", "rule": "Present co‑occupant’s refusal overrides another’s consent.", "category": "Consent Search", "takeaway": "If one says no while present, stop."}, {"title": "Fernandez v. California (2014) — USSC", "rule": "After lawful removal of objector, remaining occupant can consent.", "category": "Consent Search", "takeaway": "Removal cures Randolph problem."}, {"title": "Kentucky v. King (2011) — USSC", "rule": "Police‑created exigency: lawful tactics do not invalidate exigency.", "category": "Knock and talks", "takeaway": "Avoid threats/illegal conduct."}, {"title": "Miranda v. Arizona (1966) — USSC", "rule": "Custodial interrogation requires warnings and waiver.", "category": "Miranda", "takeaway": "Miranda = custody + interrogation."}, {"title": "Edwards v. Arizona (1981) — USSC", "rule": "After counsel invoked, interrogation must cease until counsel present or suspect re‑initiates.", "category": "Miranda", "takeaway": "Honor counsel invocation."}, {"title": "Berghuis v. Thompkins (2010) — USSC", "rule": "Invocation must be unambiguous; silence alone doesn’t invoke.", "category": "Miranda", "takeaway": "Seek clear invocation; waiver can be implied."}, {"title": "Illinois v. Gates (1983) — USSC", "rule": "Totality‑of‑circumstances governs warrant PC.", "category": "Warrants", "takeaway": "Corroborate basis/veracity."}, {"title": "Franks v. Delaware (1978) — USSC", "rule": "Material false statements/reckless disregard in affidavit can void warrant.", "category": "Warrants", "takeaway": "Be precise; avoid misstatements."}, {"title": "United States v. Leon (1984) — USSC", "rule": "Good‑faith exception for reliance on later‑invalid warrant.", "category": "Good faith doctrine", "takeaway": "Obvious defects defeat good faith."}, {"title": "Groh v. Ramirez (2004) — USSC", "rule": "Particularity must be on warrant’s face.", "category": "Warrants", "takeaway": "List items/place on the warrant."}, {"title": "Maryland v. Garrison (1987) — USSC", "rule": "Reasonable execution mistake may not invalidate search.", "category": "Warrants", "takeaway": "Limit scope once mistake found."}, {"title": "United States v. Grubbs (2006) — USSC", "rule": "Anticipatory warrants valid; trigger may be in affidavit.", "category": "Warrants", "takeaway": "Document & adhere to trigger."}, {"title": "Riley v. California (2014) — USSC", "rule": "Digital phone contents generally require a warrant.", "category": "Warrants", "takeaway": "Seize then get warrant for data."}, {"title": "Carpenter v. United States (2018) — USSC", "rule": "Historical CSLI acquisition is a search requiring warrant.", "category": "Warrants", "takeaway": "Get a warrant for prolonged CSLI."}, {"title": "Kyllo v. United States (2001) — USSC", "rule": "Sense‑enhancing tech probing the home is a search; warrant needed.", "category": "Warrants", "takeaway": "Thermal imaging needs a warrant."}, {"title": "Michigan v. Summers (1981) — USSC", "rule": "Executing search warrant permits limited on‑premises detention of occupants.", "category": "Warrants", "takeaway": "Bailey limits to immediate vicinity."}, {"title": "Bailey v. United States (2013) — USSC", "rule": "Summers authority does not extend beyond immediate vicinity.", "category": "Warrants", "takeaway": "Off‑scene detentions need RS/PC."}, {"title": "Muehler v. Mena (2005) — USSC", "rule": "Handcuffing occupants during warrant execution can be reasonable under Summers.", "category": "Warrants", "takeaway": "Permissible where safety/efficiency justify."}, {"title": "Brigham City v. Stuart (2006) — USSC", "rule": "Exigent circumstances allow entry to render emergency aid.", "category": "Exigent circumstances", "takeaway": "Objective belief of injury/need."}, {"title": "Caniglia v. Strom (2021) — USSC", "rule": "No stand‑alone community caretaking exception for home entry.", "category": "Community Caretaking", "takeaway": "Use exigent/community caretaking limits."}, {"title": "Florida v. Jardines (2013) — USSC", "rule": "K‑9 on front porch is a search; needs warrant/exception.", "category": "Open fields doctrine", "takeaway": "Curtilage protected; implied license limited."}, {"title": "Horton v. California (1990) — USSC", "rule": "Plain view does not require inadvertence.", "category": "Plain feel/smell/view", "takeaway": "Lawful vantage + immediately apparent PC."}, {"title": "Minnesota v. Dickerson (1993) — USSC", "rule": "Plain feel requires immediacy; no manipulation.", "category": "Plain feel/smell/view", "takeaway": "Don’t squeeze/manipulate during frisk."}, {"title": "Draper v. United States (1959) — USSC", "rule": "PC via corroborated predictive details.", "category": "Probable Cause (arrest)", "takeaway": "Specific verified details support PC."}, {"title": "Navarette v. California (2014) — USSC", "rule": "Reliable 911 tip can create RS.", "category": "911 calls, tips, informants", "takeaway": "Traceability + firsthand detail."}, {"title": "Florida v. J.L. (2000) — USSC", "rule": "Bare anonymous tip insufficient for frisk.", "category": "911 calls, tips, informants", "takeaway": "Need predictive detail/corroboration."}, {"title": "Illinois v. Wardlow (2000) — USSC", "rule": "Unprovoked flight in high‑crime area can contribute to RS.", "category": "Reasonable Suspicion", "takeaway": "Totality governs; flight is a factor."}, {"title": "Payton v. New York (1980) — USSC", "rule": "Warrantless entry into suspect’s home for routine felony arrest unconstitutional absent exigency.", "category": "Warrantless home entry", "takeaway": "Arrest warrant to enter suspect home."}, {"title": "Steagald v. United States (1981) — USSC", "rule": "Arrest warrant doesn’t authorize entry into third party’s home; need search warrant.", "category": "Warrants", "takeaway": "Get search warrant for third‑party home."}, {"title": "Maryland v. Buie (1990) — USSC", "rule": "Protective sweep with RS area harbors a dangerous person.", "category": "Protective sweeps", "takeaway": "Quick/limited; safety‑tied."}, {"title": "California v. Greenwood (1988) — USSC", "rule": "No REP in curbside trash left for collection.", "category": "Abandoned property", "takeaway": "Trash outside is searchable."}, {"title": "California v. Hodari D. (1991) — USSC", "rule": "Seizure occurs with physical force or submission; discarded items pre‑seizure are abandoned.", "category": "Detaining suspects", "takeaway": "Thrown drugs before stop are abandoned."}];
  function dedupe(arr){
    var seen = {}, out = [];
    for (var i=0;i<arr.length;i++){
      var t = (arr[i].title||'').trim().toLowerCase();
      if(!t || seen[t]) continue;
      seen[t] = 1; out.push(arr[i]);
    }
    return out;
  }
  var KEY = 'NIPD_CASELAW_LA';
  function parse(j){ try{ return JSON.parse(j)||[]; }catch(_){ return []; } }
  var persisted = parse(localStorage.getItem(KEY));
  var page = Array.isArray(window.__CASELAW_LA__) ? window.__CASELAW_LA__ : [];
  var merged = dedupe([].concat(page, persisted, EXTRA));
  window.__CASELAW_LA__ = merged;
  try { localStorage.setItem(KEY, JSON.stringify(merged)); } catch(_){}
})();

/* --- LEGACY SCRIPT BLOCK 11 END --- */
