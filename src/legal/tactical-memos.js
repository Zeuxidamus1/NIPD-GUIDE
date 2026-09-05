/** Preserved legal/reference behavior extracted from the original single-file application. */
/* --- LEGACY SCRIPT BLOCK 26 START --- */

(function(){
  // 2) Exact memo text you provided
  var LEVELS_MEMO_TEXT =
    'A. Levels of Encounters\n' +
    'When reviewing the legality of police interactions with citizens, courts initially assess the nature and\n' +
    'extent of the contact. To aid in this analysis, interactions, or encounters, are divided into three\n' +
    'conceptual categories. First, there are encounters of a consensual nature. This has sometimes been\n' +
    'called the “common law right to inquire.” This is a right to ask a question enjoyed by all citizens,\n' +
    'whether they work in law enforcement or not.\n' +
    'Occupying the next tier of encounters are interactions of a more intrusive character. These are\n' +
    'encounters commonly called detentions, investigatory stops or Terry stops. The justifications offered by\n' +
    'law enforcement for this more forceful contact must be based on facts that are specific and articulable\n' +
    'and lead to a rational inference or a reasonable suspicion that criminal activity is being undertaken.\n' +
    'The final level of encounter is a formal arrest. To justify this action, law enforcement officials must\n' +
    'possess a higher degree of suspicion, i.e., “probable cause” to believe that a crime is being, or has been,\n' +
    'perpetrated and that a specific person committed it.\n' +
    'This initial categorization of encounters is essential to a determination of the rights of the individual. If\n' +
    'the encounter was consensual, the Constitution is not implicated because no seizure of a person, within\n' +
    'the meaning of the Fourth Amendment, has taken place. However, if the encounter rises to the level of\n' +
    'a detention or a full-scale arrest, then that person has been seized, and law enforcement conduct will be\n' +
    'judged according to the standards of the Fourth Amendment. The person seized can then avail himself\n' +
    'or herself of the Amendment’s protections.';

  // 3) Build the small layered modal (keeps Case Law modal open behind it)
  
function openLevelsMemo(){
  var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
  var back=document.createElement('div'); back.id='levels-memo-backdrop';
  var modal=document.createElement('div'); modal.id='levels-memo';
  var hd=document.createElement('div'); hd.className='hd';
  var t=document.createElement('h3'); t.className='title'; t.textContent='Levels of Encounters — Tactical Briefing';
  var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
  hd.appendChild(t); hd.appendChild(x);

  var bd=document.createElement('div'); bd.className='bd';
  bd.innerHTML = `
    <div class="card">
      <p>When reviewing the legality of police interactions with citizens, courts initially assess the nature and extent of the contact. To aid in this analysis, interactions, or encounters, are divided into three conceptual categories.</p>
    </div>
    <div class="card">
      <h5>Level 1 — Consensual Encounter</h5>
      <p><mark>First, there are encounters of a consensual nature. This has sometimes been called the "common law right to inquire." This is a right to ask a question enjoyed by all citizens, whether they work in law enforcement or not.</mark></p>
    </div>
    <div class="card">
      <h5>Level 2 — Investigatory Detention (Terry Stop)</h5>
      <p>Occupying the next tier of encounters are interactions of a more intrusive character. These are encounters commonly called detentions, investigatory stops or <mark>Terry stops. The justifications offered by law enforcement for this more forceful contact must be based on facts that are specific and articulable and lead to a rational inference or a reasonable suspicion that criminal activity is being undertaken.</mark></p>
    </div>
    <div class="card">
      <h5>Level 3 — Arrest</h5>
      <p>The final level of encounter is a formal arrest. To justify this action, law enforcement officials must possess a higher degree of suspicion, i.e., <mark>"probable cause" to believe that a crime is being, or has been, perpetrated and that a specific person committed it.</mark></p>
    </div>
    <div class="card">
      <h5>Constitutional Implications</h5>
      <p>This initial categorization of encounters is essential to a determination of the rights of the individual. <mark>If the encounter was consensual, the Constitution is not implicated because no seizure of a person, within the meaning of the Fourth Amendment, has taken place.</mark> However, if the encounter rises to the level of a detention or a full-scale arrest, then that person has been seized, and law enforcement conduct will be judged according to the standards of the Fourth Amendment. The person seized can then avail himself or herself of the Amendment's protections.</p>
    </div>
  `;

  modal.appendChild(hd);
  modal.appendChild(bd);
  back.appendChild(modal);
  document.body.appendChild(back);
}


  
function openConsensualMemo(){
  var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
  var back=document.createElement('div'); back.id='levels-memo-backdrop';
  var modal=document.createElement('div'); modal.id='levels-memo';
  var hd=document.createElement('div'); hd.className='hd';
  var t=document.createElement('h3'); t.className='title'; t.textContent='Consensual Encounter — Right of Inquiry';
  var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
  hd.appendChild(t); hd.appendChild(x);

  var bd=document.createElement('div'); bd.className='bd';
  bd.innerHTML = `
    <div class="card">
      <h5>Consensual Encounters—Right of Inquiry</h5>
      <p>The basic premise underlying a consensual encounter is that it is voluntary. <mark>Such an encounter is an interaction based on consent and is terminable by either party.</mark> Law enforcement officers do not infringe on a citizen's Fourth Amendment rights by merely approaching him or her at random in a public place in order to ask a few questions, as long as a reasonable person would understand that he or she could refuse to cooperate and excuse themselves from the exchange, if they choose to do so. <mark>Simply identifying oneself as an officer or asking for someone's name and identification is not an unreasonable intrusion or a seizure within the meaning of the Fourth Amendment. Courts reason that merely asking a few further questions, without more, does not constitute a seizure of the person. State v. Lewis, 815 So.2d 818 (La. 2002); State v. Owens, 655 So.2d 603 (La. Ct. App. 2d Cir. 1995).</mark> This is an important distinction; if the person has not been constitutionally seized, the Fourth Amendment is not implicated and no constitutional violation can occur. A constitutional seizure occurs when the officer, by means of physical force, coercion or show of authority, has in some way restrained the freedom of a citizen so that a reasonable person in the suspect's position would no longer feel as though he or she were free to leave. State v. Gray, 738 So.2d 668 (La. Ct. App. 5th Cir. 1999). Detentions and arrests are viewed as seizures of a person. These actions are reviewed under the Fourth Amendment's reasonableness standard and are subject to constitutional controls.</p>
    </div>
    <div class="card">
      <h5>Establishing a Consensual Encounter</h5>
      <p>The objective test in a consensual encounter is whether a reasonable person would think that he or she were free to go. The following are suggestions for the law enforcement officer to establish a consensual encounter:</p>
      <p>(i) ask the citizen:</p>
      <ul>
        <li>"May I talk to you?"</li>
        <li>"Can I have a minute of your time?"</li>
        <li>"Do you mind if I search you for drugs?"</li>
        <li>"Would you mind showing me what's in your hand?"</li>
        <li>"May I look in your purse/luggage?"</li>
      </ul>
      <p>or (ii) simply walk up to a citizen in a public place and start a conversation.</p>
    </div>
    <div class="card">
      <h5>Case Examples—Valid Consensual Encounters</h5>
      <p><strong>Michigan v. Chesternut, 486 U.S. 567 (1988):</strong> Defendant was not seized when an officer accelerated his patrol car and began to drive alongside defendant. The officer did not activate his siren or flashers, did not command defendant to halt, did not display a weapon, and did not drive aggressively so as to block defendant's path.</p>
      
      <p><strong>State v. Martin, 79 So.3d 951 (La. 2011):</strong> A Calcasieu Parish deputy was walking into a convenience store as defendant was walking out. The deputy knew defendant, and asked how he was doing. Because he also knew defendant "had been in some trouble in Lake Charles," he also asked for defendant's identification so he could run a check for outstanding warrants. The Court found the deputy's actions did not constitute a seizure.</p>
      
      <p><strong>State v. Parker, 931 So.2d 353 (La. 2006):</strong> Two officers on routine patrol saw defendant trying to open the locked door of an obviously closed business. Because it was mid-morning on a weekday, the officers approached and asked defendant if she worked there. She replied that she did not. The officers noticed that her eyes were bloodshot, and that she was incoherent and unsteady on her feet. They asked her for identification and if she was on any medication. She replied that she had smoked crack cocaine earlier in the day, which led to her arrest. Up until this point, defendant had not been seized. This was a casual conversation, not involving any sort of coercion. Therefore, whether or not the officers possessed reasonable suspicion of criminal wrongdoing was not an issue—this was not an encounter that needed to be supported by reasonable suspicion.</p>
      
      <p><strong>State v. Washington, 778 So.2d 1252 (La. Ct. App. 4th Cir. 2001):</strong> Defendant was not seized when officers merely shined a light on him as he sat on the front steps of a vacant house; the Court noted that the officers did not surround defendant or draw their weapons.</p>
    </div>
    <div class="card">
      <h5>Actions That Transform Consensual Encounter Into Detention</h5>
      <p>The courts will probably rule that what the officer thought was a consensual encounter was in fact a detention if the officer does one or more of the following:</p>
      <ul>
        <li>displays a weapon;</li>
        <li>uses a harsh, accusatorial tone of voice;</li>
        <li>orders the citizen to do something (e.g., "Stop," "Open your hands," "Don't move," "Stay right there," or "Come over here");</li>
        <li>blocks the individual's path with his or her body or a police vehicle;</li>
        <li>tells the individual that he or she is a suspect;</li>
        <li>physically touches the individual;</li>
        <li>retains the individual's property (e.g. driver's license, airline ticket).</li>
      </ul>
      <p><strong>Example:</strong> In State v. Atkins, 926 So.2d 591 (La. Ct. App. 5th Cir. 2006), defendant and his three companions were seized when an officer ordered them to come to his patrol car and place their hands on it.</p>
    </div>
    <div class="card">
      <h5>When Does a Seizure Occur?</h5>
      <p>Under federal law, a seizure does not occur until either the suspect complies with a "show of authority" by police or there is an application of physical force (however slight) to the suspect by police. See California v. Hodari D., 499 U.S. 621 (1991).</p>
      
      <p>However, in Louisiana, a person is also considered seized when a stop is "imminent," i.e., when police come upon an individual with such force that, regardless of any attempt the individual may make to flee or elude the encounter, an actual stop is virtually certain. State v. Long, 884 So.2d 1176 (La. 2004), cert. denied, 544 U.S. 977 (2005); State v. Dobard, 824 So.2d 1127 (La. 2002).</p>
      
      <p>Factors a court will weigh in determining if a stop of a defendant was "imminent" include:</p>
      <ul>
        <li>the proximity of police to the defendant;</li>
        <li>whether the defendant was surrounded by police;</li>
        <li>whether the officers had weapons drawn;</li>
        <li>whether the officers were on foot or in vehicles;</li>
        <li>the characteristics of the location where the encounter took place; and</li>
        <li>the number of officers present.</li>
      </ul>
      <p>State v. Tucker, 626 So.2d 707 (La. 1993); State v. Mitchell, 877 So.2d 1151 (La. Ct. App. 5th Cir. 2004).</p>
      
      <p>A stop of a moving vehicle constitutes a seizure of both the driver and any passengers, even if the purpose of the stop is limited and the resulting detention quite brief. Brendlin v. California, 551 U.S. 249 (2007); Berkemer v. McCarty, 468 U.S. 420 (1984).</p>
    </div>
    <div class="card">
      <h5>Public Place Encounters</h5>
      <p>Often an officer will approach a person in a public place (i.e. airport, bus station, train, plane or bus, etc.). The officer needs no reasonable suspicion to ask questions, or ask for a person's identification, as long as a reasonable person would understand that he or she could refuse to cooperate. Florida v. Bostick, 501 U.S. 429 (1991).</p>
      
      <p><strong>U.S. v. Drayton, 536 U.S. 194 (2002):</strong> Defendant was not seized when officers boarded a bus and began questioning the passengers, even when an officer asked consent to search his bag. Although the officers displayed their badges, they did not brandish weapons or make intimidating moves. They gave the passengers no reason to believe that they were required to answer the officer's questions, and they left the aisle free so that passengers could exit the bus. Only one officer did the questioning, and he spoke in a polite, quiet (not authoritative) voice: "Nothing he said would suggest to a reasonable person that he or she was barred from leaving the bus or otherwise terminating the encounter."</p>
      
      <p><strong>State v. Garriga, 592 So.2d 453 (La. Ct. App. 5th Cir. 1991):</strong> Undercover officers suspected that an individual in an airport was involved in drug trafficking. The officers approached him. They identified themselves as police and asked to speak with him. He agreed to speak with them. They asked him where he was arriving from and what his purpose was for being there. They also asked him to produce his ticket and his identification. This was a consensual encounter with the defendant. They were allowed to ask these questions and to ask for his tickets and identification. He could refuse to answer their questions. He could refuse to provide the tickets and identification and was free to walk away. However, when they asked him for his permission to search his luggage for drugs, this consensual encounter was transformed into an "Investigatory Stop." The officers would need a reasonable suspicion of criminal activity before they could ask for permission to search the bag.</p>
    </div>
    <div class="card">
      <h5>Miranda Warning Requirements</h5>
      <div class="note">It is important for the law enforcement officer to remember that in a consensual encounter, the officer does not have to give the citizen Miranda warnings. Once an arrest is made, or there is a detention equivalent to arrest, the person must be advised of his or her Miranda rights if the officer plans on questioning the person while he or she is in custody.</div>
    </div>
`;

  modal.appendChild(hd);
  modal.appendChild(bd);
  back.appendChild(modal);
  document.body.appendChild(back);
}

// 4) Hook clicks *inside the Case Law modal* for the exact sub-item:
  //    It matches the real link: <a class="clx-sub" href="#ii-a">A. Levels of Encounters...</a>
  var caseLaw = document.getElementById('clx-backdrop');
  if(caseLaw){
    caseLaw.addEventListener('click', function(ev){
      var link = ev.target.closest('a.clx-sub[href="#ii-a"]');
      if(!link) return;
      // Make sure the link text starts with "A. Levels of Encounters" (defensive)
      var txt = (link.textContent || '').trim().toLowerCase();
      if(!txt.startsWith('a. levels of encounters')) return;

      ev.preventDefault();
      ev.stopPropagation();
      openLevelsMemo();
    
      // Consensual Encounter — Right of Inquiry
      var linkB = ev.target.closest('a.clx-sub[href="#ii-b"]');
      if(linkB){
        ev.preventDefault();
        ev.stopPropagation();
        openConsensualMemo();
        return;
      }
    }, true); // capture=true so this fires before other handlers swallow it
  }
})();

/* --- LEGACY SCRIPT BLOCK 26 END --- */
/* --- LEGACY SCRIPT BLOCK 27 START --- */

(function(){
  window.openConsensualMemo = function(){
    var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
    var back=document.createElement('div'); back.id='levels-memo-backdrop';
    var modal=document.createElement('div'); modal.id='levels-memo';
    var hd=document.createElement('div'); hd.className='hd';
    var t=document.createElement('h3'); t.className='title'; t.textContent='Consensual Encounter — Right of Inquiry';
    var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
    hd.appendChild(t); hd.appendChild(x);
    var bd=document.createElement('div'); bd.className='bd';
    bd.innerHTML = `
      <div class="card">
        <h5>Consensual Encounters—Right of Inquiry</h5>
        <p>The basic premise underlying a consensual encounter is that it is voluntary. <mark>Such an encounter is an interaction based on consent and is terminable by either party.</mark> Law enforcement officers do not infringe on a citizen's Fourth Amendment rights by merely approaching him or her at random in a public place in order to ask a few questions, as long as a reasonable person would understand that he or she could refuse to cooperate and excuse themselves from the exchange, if they choose to do so. <mark>Simply identifying oneself as an officer or asking for someone's name and identification is not an unreasonable intrusion or a seizure within the meaning of the Fourth Amendment. Courts reason that merely asking a few further questions, without more, does not constitute a seizure of the person. State v. Lewis, 815 So.2d 818 (La. 2002); State v. Owens, 655 So.2d 603 (La. Ct. App. 2d Cir. 1995).</mark> This is an important distinction; if the person has not been constitutionally seized, the Fourth Amendment is not implicated and no constitutional violation can occur. <mark>A constitutional seizure occurs when the officer, by means of physical force, coercion or show of authority, has in some way restrained the freedom of a citizen so that a reasonable person in the suspect's position would no longer feel as though he or she were free to leave. State v. Gray, 738 So.2d 668 (La. Ct. App. 5th Cir. 1999).</mark> Detentions and arrests are viewed as seizures of a person. These actions are reviewed under the Fourth Amendment's reasonableness standard and are subject to constitutional controls.</p>
      </div>
      <div class="card">
        <h5>Establishing a Consensual Encounter</h5>
        <p>The objective test in a consensual encounter is whether a reasonable person would think that he or she were free to go. <mark>The following are suggestions for the law enforcement officer to establish a consensual encounter:</mark></p>
        <p><mark>(i) ask the citizen:</mark></p>
        <ul>
          <li><mark>"May I talk to you?"</mark></li>
          <li><mark>"Can I have a minute of your time?"</mark></li>
          <li><mark>"Do you mind if I search you for drugs?"</mark></li>
          <li><mark>"Would you mind showing me what's in your hand?"</mark></li>
          <li><mark>"May I look in your purse/luggage?"</mark></li>
        </ul>
        <p>or (ii) simply walk up to a citizen in a public place and start a conversation.</p>
      </div>
      <div class="card">
        <h5>Case Examples—Valid Consensual Encounters</h5>
        <p><strong>Michigan v. Chesternut, 486 U.S. 567 (1988):</strong> Defendant was not seized when an officer accelerated his patrol car and began to drive alongside defendant. The officer did not activate his siren or flashers, did not command defendant to halt, did not display a weapon, and did not drive aggressively so as to block defendant's path.</p>
        
        <p><mark><strong>State v. Martin, 79 So.3d 951 (La. 2011):</strong> A Calcasieu Parish deputy was walking into a convenience store as defendant was walking out. The deputy knew defendant, and asked how he was doing. Because he also knew defendant "had been in some trouble in Lake Charles," he also asked for defendant's identification so he could run a check for outstanding warrants. The Court found the deputy's actions did not constitute a seizure.</mark></p>
        
        <p><mark><strong>State v. Parker, 931 So.2d 353 (La. 2006):</strong></mark> Two officers on routine patrol saw defendant trying to open the locked door of an obviously closed business. Because it was mid-morning on a weekday, the officers approached and asked defendant if she worked there. She replied that she did not. The officers noticed that her eyes were bloodshot, and that she was incoherent and unsteady on her feet. They asked her for identification and if she was on any medication. She replied that she had smoked crack cocaine earlier in the day, which led to her arrest. Up until this point, defendant had not been seized. This was a casual conversation, not involving any sort of coercion. Therefore, whether or not the officers possessed reasonable suspicion of criminal wrongdoing was not an issue—<mark>this was not an encounter that needed to be supported by reasonable suspicion. In State v. Washington, 778 So.2d 1252 (La. Ct. App. 4th Cir. 2001),</mark> defendant was not seized when officers merely shined a light on him as he sat on the front steps of a vacant house; the Court noted that the officers did not surround defendant or draw their weapons.</p>
      </div>
      <div class="card">
        <h5>Actions That Transform Consensual Encounter Into Detention</h5>
        <p><mark>The courts will probably rule that what the officer thought was a consensual encounter was in fact a detention if the officer does one or more of the following:</mark></p>
        <ul>
          <li>displays a weapon;</li>
          <li>uses a harsh, accusatorial tone of voice;</li>
          <li>orders the citizen to do something (e.g., "Stop," "Open your hands," "Don't move," "Stay right there," or "Come over here");</li>
          <li>blocks the individual's path with his or her body or a police vehicle;</li>
          <li>tells the individual that he or she is a suspect;</li>
          <li>physically touches the individual;</li>
          <li>retains the individual's property (e.g. driver's license, airline ticket).</li>
        </ul>
        <p><strong>Example:</strong> In State v. Atkins, 926 So.2d 591 (La. Ct. App. 5th Cir. 2006), defendant and his three companions were seized when an officer ordered them to come to his patrol car and place their hands on it.</p>
      </div>
      <div class="card">
        <h5>When Does a Seizure Occur?</h5>
        <p><mark>Under federal law, a seizure does not occur until either the suspect complies with a "show of authority" by police or there is an application of physical force (however slight) to the suspect by police. See California v. Hodari D., 499 U.S. 621 (1991). However, in Louisiana, a person is also considered seized when a stop is "imminent," i.e., when police come upon an individual with such force that, regardless of any attempt the individual may make to flee or elude the encounter, an actual stop is virtually certain. State v. Long, 884 So.2d 1176 (La. 2004), cert. denied, 544 U.S. 977 (2005); State v. Dobard, 824 So.2d 1127 (La. 2002). Factors a court will weigh in determining if a stop of a defendant was "imminent" include:</mark></p>
        <ul>
          <li>the proximity of police to the defendant;</li>
          <li>whether the defendant was surrounded by police;</li>
          <li>whether the officers had weapons drawn;</li>
          <li>whether the officers were on foot or in vehicles;</li>
          <li>the characteristics of the location where the encounter took place; and</li>
          <li>the number of officers present.</li>
        </ul>
        <p><mark>State v. Tucker, 626 So.2d 707 (La. 1993); State v. Mitchell, 877 So.2d 1151 (La. Ct. App. 5th Cir. 2004). A stop of a moving vehicle constitutes a seizure of both the driver and any passengers, even if the purpose of the stop is limited and the resulting detention quite brief. Brendlin v. California, 551 U.S. 249 (2007); Berkemer v. McCarty, 468 U.S. 420 (1984). Often an officer will approach a person in a public place (i.e. airport, bus station, train, plane or bus, etc.). The officer needs no reasonable suspicion to ask questions, or ask for a person's identification, as long as a reasonable person would understand that he or she could refuse to cooperate. Florida v. Bostick, 501 U.S. 429 (1991). For example, in U.S. v. Drayton, 536 U.S. 194 (2002), defendant was not seized when officers boarded a bus and began questioning the passengers, even when an officer asked consent to search his bag. Although the officers displayed their badges, they did not brandish weapons or make intimidating moves.</mark></p>
      </div>
      <div class="card">
        <h5>Public Place Encounters</h5>
        <p>They gave the passengers no reason to believe that they were required to answer the officer's questions, and <mark>they left the aisle free so that passengers could exit the bus. Only one officer did the questioning, and he spoke in a polite, quiet (not authoritative) voice: "Nothing he said would suggest to a reasonable person that he or she was barred from leaving the bus or otherwise terminating the encounter."</mark></p>
        
        <p><strong>State v. Garriga, 592 So.2d 453 (La. Ct. App. 5th Cir. 1991):</strong> Undercover officers suspected that an individual in an airport was involved in drug trafficking. The officers approached him. They identified themselves as police and asked to speak with him. He agreed to speak with them. They asked him where he was arriving from and what his purpose was for being there. They also asked him to produce his ticket and his identification. This was a consensual encounter with the defendant. They were allowed to ask these questions and to ask for his tickets and identification. He could refuse to answer their questions. He could refuse to provide the tickets and identification and was free to walk away. <mark>However, when they asked him for his permission to search his luggage for drugs, this consensual encounter was transformed into an "Investigatory Stop." The officers would need a reasonable suspicion of criminal activity before they could ask for permission to search the bag. Note: It is important for the law enforcement officer to remember that in a consensual encounter, the officer does not have to give the citizen Miranda warnings. Once an arrest is made, or there is a detention equivalent to arrest, the person must be advised of his or her Miranda rights if the officer plans on questioning the person while he or she is in custody.</mark></p>
      </div>
`;
    modal.appendChild(hd); modal.appendChild(bd); back.appendChild(modal);
    document.body.appendChild(back);
  };
})();

/* --- LEGACY SCRIPT BLOCK 27 END --- */
/* --- LEGACY SCRIPT BLOCK 28 START --- */

(function(){
  function bind(){
    var root = document.getElementById('clx-backdrop') || document;
    if(root.__consBound) return;
    root.__consBound = true;
    root.addEventListener('click', function(ev){
      var b = ev.target.closest('a.clx-sub[href="#ii-b"]');
      if(!b) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(typeof window.openConsensualMemo === 'function'){
        window.openConsensualMemo();
      }
    }, true); // capture to beat other handlers
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();

/* --- LEGACY SCRIPT BLOCK 28 END --- */
/* --- LEGACY SCRIPT BLOCK 29 START --- */

(function(){
  window.openDetentionsMemo = function(){
    var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
    var back=document.createElement('div'); back.id='levels-memo-backdrop';
    var modal=document.createElement('div'); modal.id='levels-memo';
    var hd=document.createElement('div'); hd.className='hd';
    var t=document.createElement('h3'); t.className='title'; t.textContent='Detentions & Investigatory Stops (Terry)';
    var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
    hd.appendChild(t); hd.appendChild(x);

    var bd=document.createElement('div'); bd.className='bd';
    bd.innerHTML = `
      <div class="card">
        <h5>Overview</h5>
        <p>The next conceptual category in the hierarchy of encounters involves interactions that courts refer to as investigatory stops, temporary detentions or <mark>Terry stops.</mark> The U.S. Supreme Court articulated the standard officers require as a justification for this more intrusive action in <mark>Terry v. Ohio, 392 U.S. 1 (1968). The Court held that when an officer observes specific and articulable events which give rise to a reasonable suspicion that illegal activity may be underway then the officer is justified in detaining and questioning the individual.</mark> The requisite suspicion must derive from facts and inferences from those facts. <mark>Such suspicions cannot lead to a mere hunch that something is amiss. More is needed.</mark> The facts producing the officer's suspicions must be <mark>objectively reasonable at the time, taking into account all of the circumstances attendant to the encounter.</mark> Note that the observations made by the officer to justify a Terry stop need not be as convincing as information that would create "probable cause" for arrest.</p>
      </div>

      <div class="card">
        <h5>Terry Frisk Authority</h5>
        <p><mark>In the Terry case, the Court also held that when a law enforcement officer has a reasonable suspicion that illegal activity may be under way and the suspect has been detained, the officer is entitled to conduct a limited pat-down, or frisk, of the outer garments of the detainee to determine whether the suspect is armed or possesses an item that could be used to harm the officer.</mark> The requirements for, and the parameters of, this limited search are discussed below.</p>
      </div>

      <div class="card">
        <h5>Legal Standards—Stop vs. Frisk</h5>
        <p><mark>The legal standard for the stop is reasonable suspicion to believe the detainee is somehow engaged in unlawful activity. The legal standard for the frisk, unlike the stop, relates to fear that the suspect is armed with a deadly weapon.</mark></p>
      </div>
      
      <div class="card">
        <h5>1. Reasonable Suspicion</h5>
        <h6>a. In General</h6>
        <p>The level of doubt needed to permit this more intrusive type of encounter (i.e., a Terry stop) is phrased as "reasonable suspicion of criminal activity." This suspicion must be reasonable to a judge or jury looking at the encounter in hindsight, not suspicion that was subjectively reasonable to the officer at the time. To ascertain if the suspicion was, in fact, reasonable, one must look to all the circumstances surrounding the encounter. The facts known by the officer are relevant here (e.g., the suspect was arrested for burglary two months ago or an all-points bulletin just came out for a murder only two blocks away), as well as his or her observations <mark>(e.g., the suspect was stumbling or slurring words or seemed nervous when the officer spoke to him) and experience (e.g., "I've been a cop for fifteen years and I know what a drug deal looks like.").</mark> When taken together these elements must coalesce and point to a conclusion that a circumspect, judicious person would come to, namely, that <mark>some form of criminal endeavor was afoot. The facts given to support the suspicion must be detailed. The officer must be able to state them in a clear and concise fashion.</mark> A mere intuition or instinctive feeling, standing alone, is insufficient. Facts are needed to bolster the conclusion that the suspicion was reasonable. <mark>Assuming there was adequate justification for the stop, the means of investigation employed must be reasonably related to the suspicion created.</mark></p>
        
        <p><mark>Moreover, the detention must last no longer than reasonably necessary to dispel or confirm the suspicion (15 to 30 minutes is the time frame courts seem to routinely permit, although substantially longer detentions have been upheld, and shorter ones have been found excessive).</mark></p>
        
        <div class="note"><mark>Note: If the officers do not have a justification for making the initial stop (i.e., at least a reasonable suspicion that criminal activity is underway), everything that may happen afterwards (e.g., guns or drugs are found) will be of no consequence. Any evidence that might have been used against the suspect becomes tainted by the police misconduct and will be suppressed as the result, or fruit, of an unconstitutional detention. State v. Elmore, 756 So.2d 1256 (La. Ct. App. 2d Cir. 2000); State v. Schaffer, 767 So.2d 49 (La. Ct. App. 4th Cir. 2000). This is known as the exclusionary rule.</mark></div>
      </div>
`;

    modal.appendChild(hd); modal.appendChild(bd); back.appendChild(modal);
    document.body.appendChild(back);
  };
})();

/* --- LEGACY SCRIPT BLOCK 29 END --- */
/* --- LEGACY SCRIPT BLOCK 30 START --- */

(function(){
  function bind(){
    var root = document.getElementById('clx-backdrop') || document;
    if(root.__detBind) return;
    root.__detBind = true;
    root.addEventListener('click', function(ev){
      var c = ev.target.closest('a.clx-sub[href="#ii-c"]');
      if(!c) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(typeof window.openDetentionsMemo === 'function'){
        window.openDetentionsMemo();
      }
    }, true);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();

/* --- LEGACY SCRIPT BLOCK 30 END --- */
/* --- LEGACY SCRIPT BLOCK 31 START --- */

(function(){
  window.openRSGeneralMemo = function(){
    var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
    var back=document.createElement('div'); back.id='levels-memo-backdrop';
    var modal=document.createElement('div'); modal.id='levels-memo';
    var hd=document.createElement('div'); hd.className='hd';
    var t=document.createElement('h3'); t.className='title'; t.textContent='Reasonable Suspicion (General) — Tactical Briefing';
    var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
    hd.appendChild(t); hd.appendChild(x);

    var bd=document.createElement('div'); bd.className='bd';
    bd.innerHTML = `
      <div class="card">
        <h5>In General</h5>
        <div style="white-space:pre-wrap">
a. In General. The level of doubt needed to permit this more intrusive type of encounter (i.e., a Terry
stop) is phrased as “reasonable suspicion of criminal activity.” This suspicion must be reasonable to a
judge or jury looking at the encounter in hindsight, not suspicion that was subjectively reasonable to the
officer at the time. To ascertain if the suspicion was, in fact, reasonable, one must look to all the
circumstances surrounding the encounter.
        </div>
      </div>

      <div class="card">
        <h5>Supporting Facts & Experience</h5>
        <div style="white-space:pre-wrap">
The facts known by the officer are relevant here (e.g., the suspect was arrested for burglary two months ago or an all-points bulletin just came out for a murder only two blocks away), as well as his or her observations (e.g., the suspect was stumbling or slurring words or seemed nervous when the officer spoke to him) and experience (e.g., “I’ve been a cop for fifteen years and I know what a drug deal looks like.”). When taken together these elements must coalesce and point to a conclusion that a circumspect, judicious person would come to, namely, that some form of criminal endeavor was afoot. The facts given to support the suspicion must be detailed. The officer must be able to state them in a clear and concise fashion. A mere intuition or instinctive feeling, standing alone, is insufficient. Facts are needed to bolster the conclusion that the suspicion was reasonable. Assuming there was adequate justification for the stop, the means of investigation employed must be reasonably related to the suspicion created.
        </div>
      </div>

      <div class="card">
        <h5>Duration</h5>
        <div style="white-space:pre-wrap">
Moreover, the detention must last no longer than reasonably necessary to dispel or confirm the suspicion (15 to 30 minutes is the time frame courts seem to routinely permit, although substantially longer detentions have been upheld, and shorter ones have been found excessive).
        </div>
      </div>

      <div class="card">
        <h5>Exclusionary Rule — Lack of Justification</h5>
        <div style="white-space:pre-wrap">
Note: If the officers do not have a justification for making the initial stop (i.e., at least a reasonable suspicion that criminal activity is underway), everything that may happen afterwards (e.g., guns or drugs are found) will be of no consequence. Any evidence that might have been used against the suspect becomes tainted by the police misconduct and will be suppressed as the result, or fruit, of an unconstitutional detention. State v. Elmore, 756 So.2d 1256 (La. Ct. App. 2d Cir. 2000); State v. Schaffer, 767 So.2d 49 (La. Ct. App. 4th Cir. 2000). This is known as the exclusionary rule.
        </div>
      </div>
    `;

    modal.appendChild(hd); modal.appendChild(bd); back.appendChild(modal);
    document.body.appendChild(back);
  };
})();

/* --- LEGACY SCRIPT BLOCK 31 END --- */
/* --- LEGACY SCRIPT BLOCK 32 START --- */

(function(){
  function bind(){
    var root = document.getElementById('clx-backdrop') || document;
    if(root.__rsGenBind) return;
    root.__rsGenBind = true;
    root.addEventListener('click', function(ev){
      var a = ev.target.closest('a.clx-sub[href="#ii-c-1"]');
      if(!a) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(typeof window.openRSGeneralMemo === 'function'){
        window.openRSGeneralMemo();
      }
    }, true);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();

/* --- LEGACY SCRIPT BLOCK 32 END --- */
/* --- LEGACY SCRIPT BLOCK 33 START --- */

(function(){
  window.openFactorsMemo = function(){
    var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
    var back=document.createElement('div'); back.id='levels-memo-backdrop';
    var modal=document.createElement('div'); modal.id='levels-memo';
    var hd=document.createElement('div'); hd.className='hd';
    var t=document.createElement('h3'); t.className='title'; t.textContent='Reasonable Suspicion — Factors to Consider';
    var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
    hd.appendChild(t); hd.appendChild(x);
    var bd=document.createElement('div'); bd.className='bd';
    bd.innerHTML = `
      <div class="card">
        <h5>Factors to Consider</h5>
        <div style="white-space:pre-wrap">
Factors to Consider. For the professional officer, an important point to note is that an individual fact
or observation alone may be as consistent with innocuous, perfectly lawful conduct and activities, as it is
with criminal enterprise. Courts consistently look at the combination of several different observations,
each of which when isolated may appear innocent, but when taken together would lead to a reasonable
impression that illegal activities are taking place.
        </div>
      </div>

      <div class="card">
        <h5>Vehicles & Motorists</h5>
        <div style="white-space:pre-wrap">
Investigatory stops are routinely conducted in a variety of factual settings. The process of detaining and
questioning a person is not limited to an “on-the-street” scenario, where an officer detains and
questions a pedestrian. Investigatory stops are permissible in situations involving vehicles and motorists
as well. An officer may briefly detain and question the driver or passengers of a vehicle if he or she has a
reasonable suspicion that the occupants are involved in criminal activity. Following a lawful stop an
officer may, as a matter of course, order the driver and any passengers to step out of the vehicle, even
without any particularized suspicion that the vehicle occupants are armed or may otherwise pose a
threat to the officer.
        </div>
      </div>
    `;
    modal.appendChild(hd); modal.appendChild(bd); back.appendChild(modal);
    document.body.appendChild(back);
  };
})();

/* --- LEGACY SCRIPT BLOCK 33 END --- */
/* --- LEGACY SCRIPT BLOCK 34 START --- */

(function(){
  window.openInvestigatoryStopsMemo = function(){
    var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
    var back=document.createElement('div'); back.id='levels-memo-backdrop';
    var modal=document.createElement('div'); modal.id='levels-memo';
    var hd=document.createElement('div'); hd.className='hd';
    var t=document.createElement('h3'); t.className='title'; t.textContent='Investigatory Stops (Vehicle/Pedestrian)';
    var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
    hd.appendChild(t); hd.appendChild(x);
    var bd=document.createElement('div'); bd.className='bd';
    bd.innerHTML = `
      <div class="card">
        <h5>Overview</h5>
        <div style="white-space:pre-wrap">
Investigatory Stops. The police may briefly detain and question a person upon a reasonable suspicion,
short of probable cause for arrest, that the person is involved in criminal activity. What is, or is not,
reasonable suspicion depends on balancing, weighing and meshing a variety of factors, taking into
account the particular factual setting with which an officer is confronted.
        </div>
      </div>

      <div class="card">
        <h5>Common Factors Cited by Courts</h5>
        <div style="white-space:pre-wrap">
Some factors commonly cited
by courts when determining the existence or absence of reasonable suspicion are as follows:
<mark> (1) A prior criminal record does not create a reasonable suspicion that there is current criminal activity.
However, if that knowledge is coupled with other concrete facts or observations, an officer may rely on
the combination to create a reasonable suspicion of present criminal activity.</mark>
(2) An officer’s awareness that a crime was recently committed in the vicinity is a pertinent
consideration. Standing alone, however, this knowledge does not create a reasonable suspicion that an
individual who happens to be in that area, a short time later, was the perpetrator.
(3) A suspect’s presence in a high-crime area, or an area known for drug trafficking, standing alone, is
not a basis for reasonable suspicion. But a suspect’s presence in such an area is an articulable fact.
Coupled with other more solid observations, such presence can create reasonable suspicion that the
suspect is engaged in the unlawful activity for which the neighborhood is known.
(4) Evasive conduct, furtive gestures, concealing or attempting to conceal one’s identity are criteria an
officer may weigh in assessing if his suspicion is reasonable. However, each individual observation,
without more, will not create a reasonable suspicion of criminal endeavor.
(5) The time of day or night in which the individual is observed is relevant. However, merely being out in
public at a late hour, without more, will not justify a stop. (6) Information given to an officer by a third party, an informant, is generally insufficient by itself to
create reasonable suspicion. However, when this information is corroborated by officers through
independent investigation, or there is extraneous evidence that the informant is reliable and truthful,
reasonable suspicion may be based on the tip. An officer may also rely on a flyer or bulletin describing a
suspect and disseminated by another law enforcement agency as a source for reasonable suspicion. The
officer relying on the bulletin does not have to demonstrate personal knowledge of the facts necessary
to justify the stop. However, the party issuing the bulletin or flyer must have facts in his or her
possession which would support a finding of reasonable suspicion. Moreover, the scope of the stop
made by the officer relying on the bulletin may be no more intrusive than that the issuing agency would
have been justified in conducting.
        </div>
      </div>
    `;
    modal.appendChild(hd); modal.appendChild(bd); back.appendChild(modal);
    document.body.appendChild(back);
  };
})();

/* --- LEGACY SCRIPT BLOCK 34 END --- */
/* --- LEGACY SCRIPT BLOCK 35 START --- */

(function(){
  window.openLegalityMemo = function(){
    var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
    var back=document.createElement('div'); back.id='levels-memo-backdrop';
    var modal=document.createElement('div'); modal.id='levels-memo';
    var hd=document.createElement('div'); hd.className='hd';
    var t=document.createElement('h3'); t.className='title'; t.textContent='Legality of a Stop (Scope & Duration)';
    var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
    hd.appendChild(t); hd.appendChild(x);
    var bd=document.createElement('div'); bd.className='bd';
    bd.innerHTML = `
      <div class="card">
        <h5>Standard & Scope</h5>
        <div style="white-space:pre-wrap">
Legality of a Stop. A determination that an officer possessed reasonable suspicion, justifying a
detention, is only the first step in determining the legality of a stop. A reviewing court will ask initially if
the officer’s action was justified at its inception, and secondly whether it was reasonably related in
scope to the circumstances which justified the interference in the first place. An examination of the
scope of the stop addresses the following: (i) the length of the detention, and (ii) the methods employed
during the stop. The duration of, and methods employed during the stop must be tailored to serve the
purpose of confirming or alleviating the officer’s suspicions. If those concerns are confirmed, and an
officer’s observations during the detention create probable cause, an arrest may be made. If the
suspicions are dispelled, then the suspect should be let go. The detention must be sufficiently limited in
temporal duration to satisfy the conditions of an investigative seizure. The nature of the questioning and
level of force employed during the detention must be similarly limited. Even though the initial stop was
justified, if the detention exceeds the scope authorized by its justification, i.e., “reasonable suspicion of not be admissible in court.
        </div>
      </div>

      <div class="card">
        <h5>Identity During a Valid Stop</h5>
        <div style="white-space:pre-wrap">
In Hiibel v. Sixth Judicial District Court of Nevada, Humboldt County, 542 U.S. 177 (2004), the U.S.
Supreme Court upheld a law, similar to C.Cr.P. Art. 215.1(A), making it unlawful for a suspect to refuse
to disclose his or her identity in the course of a valid Terry stop.
        </div>
      </div>
    `;
    modal.appendChild(hd); modal.appendChild(bd); back.appendChild(modal);
    document.body.appendChild(back);
  };
})();

/* --- LEGACY SCRIPT BLOCK 35 END --- */
/* --- LEGACY SCRIPT BLOCK 36 START --- */

(function(){
  function bind(){
    var root = document.getElementById('clx-backdrop') || document;
    if(root.__detSubsBound) return;
    root.__detSubsBound = true; // mark

    root.addEventListener('click', function(ev){
      // Factors to Consider
      var a2 = ev.target.closest('a.clx-sub[href="#ii-c-2"]');
      if(a2){
        ev.preventDefault(); ev.stopPropagation();
        if(typeof window.openFactorsMemo === 'function') window.openFactorsMemo();
        return;
      }
      // Investigatory Stops (Vehicle/Pedestrian)
      var a3 = ev.target.closest('a.clx-sub[href="#ii-c-3"]');
      if(a3){
        ev.preventDefault(); ev.stopPropagation();
        if(typeof window.openInvestigatoryStopsMemo === 'function') window.openInvestigatoryStopsMemo();
        return;
      }
      // Legality of a Stop (Scope/Duration)
      var a4 = ev.target.closest('a.clx-sub[href="#ii-c-4"]');
      if(a4){
        ev.preventDefault(); ev.stopPropagation();
        if(typeof window.openLegalityMemo === 'function') window.openLegalityMemo();
        return;
      }
    }, true);
  }
  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', bind); }
  else { bind(); }
})();

/* --- LEGACY SCRIPT BLOCK 36 END --- */
/* --- LEGACY SCRIPT BLOCK 37 START --- */


// V8.js — Adds "Justifications for a Detention" memo and binder (href="#ii-c-5")
(function(){
  // Modal open function (Option 2 tactical style; relies on existing CSS from other memos)
  window.openJustificationsMemo = function(){
    var ex=document.getElementById('levels-memo-backdrop'); if(ex) ex.remove();
    var back=document.createElement('div'); back.id='levels-memo-backdrop';
    var modal=document.createElement('div'); modal.id='levels-memo';
    var hd=document.createElement('div'); hd.className='hd';
    var t=document.createElement('h3'); t.className='title'; t.textContent='Justifications for a Detention — Tactical Briefing';
    var x=document.createElement('button'); x.className='x'; x.textContent='Close'; x.onclick=function(){ back.remove(); };
    hd.appendChild(t); hd.appendChild(x);
    var bd=document.createElement('div'); bd.className='bd';

    bd.innerHTML = [
      '<div class="card"><h5>Justification for a Detention</h5><div style="white-space:pre-wrap">'
      + 'Justification for a Detention.\n'
      + '(1) Flight. A suspect’s flight, when confronted with police presence, may give the officer reasonable\n'
      + 'suspicion to pursue and detain the suspect. Note, however, that not all conduct that merely avoids\n'
      + 'contact with law enforcement is considered flight from law enforcement.\n'
      + 'See, e.g., Illinois v. Wardlow, 528 U.S. 119 (2000). Two uniformed officers were in the last car of a fourcar\n'
      + 'police caravan that converged on an area of Chicago known for heavy narcotics trafficking, in order\n'
      + 'to investigate drug transactions. The officers observed defendant, who was standing next to a building\n'
      + 'holding an opaque bag, look at the police caravan, then run in the opposite direction. Given the\n'
      + 'character of the area and defendant’s headlong flight (“the consummate act of evasion”), the officers\n'
      + 'had reasonable suspicion to stop him.\n'
      + '</div></div>',
      '<div class="card"><h5>(2) High-Crime Area</h5><div style="white-space:pre-wrap">'
      + '(2) High-Crime Area. Presence in a high-crime area, when coupled with observations of suspicious\n'
      + 'activity, can create reasonable suspicion. \n'
      + '</div></div>',
      '<div class="card"><h5>(3) Officer’s Experience</h5><div style="white-space:pre-wrap">'
      + '(3) Officer’s Experience. Officers are entitled to rely on their own knowledge and experience in forming\n'
      + 'reasonable suspicion.\n'
      + 'See, e.g., State v. Collins, 890 So.2d 616 (La. Ct. App. 5th Cir. 2004). Two deputies were on patrol in the\n'
      + 'vicinity of the Villa D’Ames Apartments in Morrero, a high-crime area. They saw defendant walking\n'
      + 'through a parking lot. When defendant looked at the deputies, he tapped his left side with his hand, and\n'
      + 'began walking between the vehicles in the lot. Although neither deputy saw a weapon, one of the\n'
      + 'deputies later testified that he thought, based on is experience, that defendant was instinctively\n'
      + 'checking on a concealed weapon by touching his side. When the deputies exited their car, defendant\n'
      + 'adopted a defensive position (which the deputy described as “blading”) and reached under his shirt,\n'
      + 'another action consistent with possession of a firearm. The deputies had reasonable suspicion to stop\n'
      + 'and frisk defendant.\n'
      + '</div></div>',
      '<div class="card"><h5>(4) Tips</h5><div style="white-space:pre-wrap">'
      + '(4) Tips. Information provided by someone outside the circles of law enforcement may provide\n'
      + 'sufficient justification for a stop if it carries with it sufficient indicia of reliability. Factors that bolster the\n'
      + 'reliability of information may include: the reliability and reputation of the person providing the tip;\n'
      + 'corroboration of the details contained in the tip by independent police work; and the extent to which\n'
      + 'any information provided by the informant has proved to be accurate or useful in the past.\n'
      + 'See, e.g., State v. Carter, 130 So.3d 308 (La. 2013). A state trooper received a tip from an unnamed\n'
      + 'informant, not previously known to police, identifying defendant Charles Carter by name and advising\n'
      + 'that he was en route to Lake Providence by bus from the Dallas-Fort Worth area with substantial\n'
      + 'amounts of cocaine and marijuana. The informant alleged defendant would arrive at the Monroe\n'
      + 'Greyhound station that night, to be picked up by Jeffrey Carter (presumably a relation) and driven on to\n'
      + 'Lake Providence. The trooper confirmed that “Charles Carter” lived in Lake Providence, and had a prior\n'
      + 'record for narcotics trafficking; he then printed out Carter’s photo and began a stake-out of the bus\n'
      + 'station. Defendant stepped off the bus from Dallas-Fort Worth carrying a soft vinyl bag and began to\n'
      + 'scan the parking lot as if looking for someone. The trooper identified him from the photo he had printed\n'
      + 'and initiated an investigatory stop. In reviewing this stop, the Court held it was supported by reasonable\n'
      + 'suspicion. Defendant bore out all the informant’s predictions save being picked up by his relative, but it\n'
      + 'was reasonable to assume a 2-hour delay in the bus’s arrival disrupted defendant’s plans. In addition,\n'
      + 'the informant stayed in contact with police the entire time—for example, confirming defendant’s\n'
      + 'identity via a cell phone picture. This increased his trustworthiness, as he was accountable if his\n'
      + 'information proved wrong.\n\n'
      + 'In State v. Bozeman, 6 So.3d 899 (La. Ct. App. 1st Cir. 2009), Assumption Parish officers received a tip\n'
      + 'from a property-owner along Pleasant Lane in Belle Rose that defendant was selling drugs. The tipster\n'
      + 'owned several rental trailers and indicated that defendant lived in one of the trailers with his girlfriend 5\n'
      + 'or 6 days a week. When officers went to investigate, they saw defendant getting into a car outside the\n'
      + 'trailer indicated. Because the tipster was an identified citizen, he was presumed inherently credible.\n'
      + 'Therefore, based on his tip, the officers had reasonable suspicion to stop and question defendant.\n'
      + 'See also State v. Hicks, 733 So.2d 652 (La. Ct. App. 5th Cir. 1999), where the owner of an “In and Out”\n'
      + 'store complained to police that defendant was selling drugs in the parking lot of his store. Because this\n'
      + 'tip came from an identified ordinary citizen, it was presumed reliable, and police had reasonable\n'
      + 'suspicion to stop defendant.\n\n'
      + 'In State v. Elliott, 35 So.3d 247 (La. 2010), a Ford Ranger pick-up truck ran a red light and nearly collided\n'
      + 'with a vehicle carrying a married couple. The wife called 911 on her cell phone while the husband\n'
      + 'followed the truck. The wife described the truck as it swerved “all over the road,” hitting the right curb\n'
      + 'then almost hitting another car. Based on this call, Benton police stopped the truck and arrested the\n'
      + 'driver for DWI. The Court upheld this stop. The couple were clearly citizen informants providing\n'
      + 'information regarding a crime as it was happening. “The dispatcher could reasonably infer from the\n'
      + 'circumstances that the caller was motivated by the desire to eliminate an immediate risk to public safety\n'
      + 'and was holding herself accountable for the information she provided by identifying herself, if not by\n'
      + 'name, then by the cellular phone from which she was calling.” (Per §33:9109(A), cell phone services\n'
      + 'record the number of every phone that calls 911.) Because this tip came from an identifiable citizen\n'
      + 'making a first-hand report, it established reasonable suspicion.\n'
      + '</div></div>',
      '<div class="card"><h5>(5) Anonymous Tips</h5><div style="white-space:pre-wrap">'
      + '(5) Anonymous Tips. An anonymous tip, if corroborated by other observations and supported by indicia\n'
      + 'of reliability, can create reasonable suspicion.\n'
      + 'See, e.g., Alabama v. White, 496 U.S. 325 (1990). Montgomery police received an anonymous tip stating\n'
      + 'that defendant, carrying a brown briefcase filled with cocaine, would leave a specific unit of an\n'
      + 'apartment building and travel in her brown Plymouth station wagon, which had a broken taillight, to a\n'
      + 'specific motel. Police watched the apartment complex, and saw a brown Plymouth wagon with a broken\n'
      + 'taillight. They then watched defendant, empty-handed, exit the specified apartment, get into the car\n'
      + 'and drive directly toward the motel. Even though not every detail in the tip turned out to be totally\n'
      + 'correct, the partial corroboration by police alone provided reasonable suspicion for a stop.\n\n'
      + 'In State v. Gentras, 733 So.2d 113 (La. Ct. App. 5th Cir. 1999), Jefferson Parish police received an\n'
      + 'anonymous tip reporting drug activity in Room 23 of the Texas Motel on Airlane Highway. Officers\n'
      + 'staked out the room for 30 to 40 minutes and saw an unusually large number of people entering and\n'
      + 'leaving the room. This sufficiently corroborated the tip to establish reasonable suspicion to knock on the\n'
      + 'door and question the room’s occupants. When defendant opened the door, one officer looked inside\n'
      + 'the room and saw several rocks of crack cocaine on a plate protruding from underneath the bed. This\n'
      + 'established probable cause for arrest.\n\n'
      + 'See also Navarette v. California, 572 U.S. __ (2014). In Mendocino County, California, a driver called 911\n'
      + 'to report that a silver Ford F-150 pickup truck with a specified license plate had just run her off the road,\n'
      + 'at mile marker 88 on southbound Highway 1. Roughly 18 minutes after the call, a California Highway\n'
      + 'Patrol officer spotted the same truck at mile marker 69, 19 miles south of the reported incident. The U.S\n'
      + 'Supreme Court ruled that, assuming the 911 call was anonymous, the officer nevertheless had\n'
      + 'reasonable suspicion to stop the truck. By reporting that she had been run off the road by a specific\n'
      + 'vehicle, the caller necessarily claimed eyewitness knowledge of the alleged dangerous driving—a\n'
      + 'driver’s claim that another vehicle ran her off the road implies that the informant knows the other car\n'
      + 'was driven dangerously. That basis of knowledge lent significant support to the tip’s reliability. In\n'
      + 'addition, the officer saw the truck in a location suggesting that the caller must have reported the\n'
      + 'incident soon after she was run off the road. The Court noted, “That sort of contemporaneous report\n'
      + 'has long been treated as especially reliable.” In addition, 911 calls are recorded, which provides victims\n'
      + 'with an opportunity to identify the false tipster’s voice and subject him to prosecution; a 911 caller’s cell\n'
      + 'phone number can also be easily identified, further discouraging its use in giving false tips. Thus, the\n'
      + 'caller’s use of the 911 system was another factor suggesting reliability. Finally, the Court noted that\n'
      + 'running another vehicle off the road “suggests lane positioning problems, decreased vigilance, impaired\n'
      + 'judgment, or some combination of those recognized drunk driving cues.” Thus there was reason to believe the driver of the truck might be intoxicated and therefore committing a crime. Under the totality\n'
      + 'of these circumstances, an investigatory stop was justified.\n'
      + '</div></div>',
      '<div class="card"><h5>(6) “Erratic” Driving</h5><div style="white-space:pre-wrap">'
      + '(6) “Erratic” Driving. Driving in an erratic manner in and of itself justifies a stop. An officer does not\n'
      + 'violate the Fourth Amendment by stopping and questioning someone who just committed a traffic\n'
      + 'violation in the officer’s presence. Moreover, routine traffic infractions, even minor ones, can provide\n'
      + 'the requisite reasonable suspicion to stop a vehicle. \n\n'
      + 'See, e.g., State v. Candebat, 133 So.3d 304 (4th Cir., 2014) (valid stop for cracked windshield); State v.\n'
      + 'Turner, 118 So.3d 1186 (La Ct. App. 5th Cir. 2013) (reasonable suspicion when defendant made a right\n'
      + 'turn without signaling); State v. Cortes, 84 So.3d 733 (La. Ct. App. 3d Cir. 2012) (stop justified when\n'
      + 'defendant was following too closely, only two to three car lengths behind another vehicle despite a wet\n'
      + 'roadway and heavy traffic); State v. Cooper, 2 So.3d 1172 (La. Ct. App. 2d Cir. 2009) (valid stop for\n'
      + 'broken taillight); State v. McVan, 744 So.2d 641 (La. Ct. App. 2d Cir. 1999) (reasonable suspicion for a\n'
      + 'stop when defendant was traveling 10 m.p.h. below the speed limit, and drifted from the fog line to the\n'
      + 'center line, back to the center of the lane, then back to the center line, even though he never left his\n'
      + 'lane of travel); State v. Kinchen, 71 So.3d 344 (La. Ct. App. 3d Cir. 2011) (reasonable suspicion when\n'
      + 'defendant travelling 57 mph in the left lane of Interstate 10 where the speed limit was 70 mph); State v.\n'
      + 'Wyatt, 775 So.2d 481 (La. Ct. App. 4th Cir. 2000) (stop justified to investigate possible infraction when\n'
      + 'car windows so darkly tinted it was impossible to see inside); State v. Robinson, 743 So.2d 814 (La. Ct.\n'
      + 'App. 4th Cir. 1999) (valid stop after defendant failed to signal before a turn); State v. Calvert, 811 So.2d\n'
      + '1081 (La. Ct. App. 5th Cir. 2002) (reasonable suspicion to stop when defendant crossed center lane on\n'
      + 'three separate occasions and fog line once within less than a mile); State v. Curtis, 738 So.2d 657 (La. Ct.\n'
      + 'App. 5th Cir. 1999) (reasonable suspicion for a stop when defendant’s vehicle lacked an inspection\n'
      + 'sticker); State v. Anderson, 732 So.2d 605 (La. Ct. App. 5th Cir. 1999) (valid stop when defendant was\n'
      + 'stopped at a green light, obstructing traffic).\n'
      + 'In State v. Harris, 140 So.3d 1226 (2d Cir. 2014), a stop was upheld when an officer saw no license plate\n'
      + 'on defendant’s car; although there proved to be a temporary tag in the back window, that window was\n'
      + 'so darkly tinted the officer could not see the tag until after he activated his patrol car’s spotlight.\n'
      + 'Be aware that under the revised language of R.S. §32:295.1, a stop is justified solely to investigate a\n'
      + 'seat belt violation, if the officer has a clear, unobstructed view of the violation. State v. Hunt, 25 So.3d\n'
      + '746 (La. 2009). However, a vehicle may not be inspected or searched solely because of a seat belt\n'
      + 'violation.\n\n'
      + 'A detention following a traffic violation must last no longer than is necessary to effectuate the purpose\n'
      + 'of the stop, i.e. to issue a citation or warning. Once an officer has determined that the driver has a valid\n'
      + 'license and the citation or ticket has been issued, the driver must be allowed to proceed on his or her\n'
      + 'way, without being subjected to further delay by police for additional questioning, unless the driver\n'
      + 'consents to such questioning or the officer discovers evidence establishing a reasonable suspicion of\n'
      + 'criminal activity unrelated to the initial traffic violation. State v. Lopez, 772 So.2d 90 (La. 2000); C.Cr.P.\n'
      + 'Art. 215.1(D).\n'
      + '</div></div>',
      '<div class="card"><h5>(7) Drug Courier Profiles</h5><div style="white-space:pre-wrap">'
      + '(7) Drug Courier Profiles. Profiles of drug couriers are relied on by officers to identify potential suspects.\n'
      + 'Generally, a match to the profile alone does not create reasonable suspicion to detain the suspect. The\n'
      + 'officer must observe other conduct or circumstances that sufficiently heighten his suspicion. Often,\n'
      + 'undercover officers will survey airport or bus terminals for individuals matching a certain profile. Factors\n'
      + 'utilized in compiling this profile may include: (i) a journey that originated in a source city for narcotics, or\n'
      + 'a short round trip, with a brief stay in such a city; (ii) the suspect carrying a hard-sided suitcase; (iii) the\n'
      + 'suspect appearing nervous when questioned; (iv) tickets that were paid for in cash; (v) the suspect\n'
      + 'providing inconsistent or wavering answers to inquiries; (vi) furtive movements (e.g., glancing over one’s\n'
      + 'shoulder, not making eye contact, etc.). U.S. v. Sokolow, 490 U.S. 1 (1989).\n'
      + '</div></div>',
      '<div class="card"><h5>(9) “Pretext” Stops</h5><div style="white-space:pre-wrap">'
      + '(9) “Pretext” Stops. Pretext stop cases typically involve officers who have a hunch that the driver or\n'
      + 'passenger of a car is committing a given crime, e.g., possession of narcotics. However, nothing they have\n'
      + 'observed rises to the level of reasonable suspicion necessary to stop the car. The police then observe\n'
      + 'the motorist commit a minor traffic violation, and use this infraction, “the claimed pretext,” to stop the\n'
      + 'vehicle and pursue a more intrusive line of investigation. In the adjudicated cases, the pretext stop\n'
      + 'search typically leads to the discovery of contraband wholly unrelated to the reason for the stop. In\n'
      + 'Whren v. U.S., 517 U.S. 806 (1996), the U.S. Supreme Court held that “Ulterior motives do not invalidate\n'
      + 'police conduct that is justified on the basis of probable cause to believe a violation of the law has\n'
      + 'occurred.” The true motivating factor behind the stop is irrelevant. As long as there is probable cause to\n'
      + 'believe the rules of the road have been violated, a detention under such circumstances is lawful. A\n'
      + 'suspect may not claim that he or she was illegally detained merely because an officer had a hunch that a different, more serious crime was being committed, although the officer lacked proof for that\n'
      + 'proposition and intended to find evidence of that crime during the stop. If there is an objectively valid\n'
      + 'reason for the stop, even one involving a minor traffic infraction, subjective intentions are irrelevant.\n'
      + 'For example, in State v. Thomas, 764 So.2d 1104 (La. Ct. App. 4th Cir. 2000), a stop was justified after\n'
      + 'defendant failed to completely stop at a stop sign, even if the “real” reason the officers made the stop\n'
      + 'was to investigate a tip regarding defendant’s drug activity, and even though a citation was not issued.\n'
      + 'In Whren, supra, the Court did note that a stop motivated by an intent to single out members of a\n'
      + 'suspect class, such as race, would, however, be impermissible.\n'
      + 'The Whren standard applies to arrests as well as investigatory stops—an arrest is valid as long as there\n'
      + 'was objective probable cause, even if the officer had a different subjective motivation for making the\n'
      + 'arrest. Arkansas v. Sullivan, 532 U.S. 769 (2001) (arrest for driving without registration or proof of\n'
      + 'insurance and carrying a weapon valid when supported by probable cause, even if the officer’s “true”\n'
      + 'purpose for making the arrest was to search defendant’s car for drugs). An arrest is valid even if the\n'
      + 'criminal offense for which probable cause actually exists is not “closely related” to the offense stated by\n'
      + 'the officer at the time of arrest. Devenpeck v. Alford, 543 U.S. 146 (2004).\n'
      + '</div></div>'
    ].join('');

    var modalWrap = modal;
    modal.appendChild(hd);
    modal.appendChild(bd);
    back.appendChild(modalWrap);
    document.body.appendChild(back);
  };

  // Binder: listen for the Case Law sublink with href="#ii-c-5"
  function bind(){
    var root = document.getElementById('clx-backdrop') || document;
    if(root.__justBound) return;
    root.__justBound = true;
    root.addEventListener('click', function(ev){
      var link = ev.target && ev.target.closest && ev.target.closest('a.clx-sub[href="#ii-c-5"]');
      if(!link) return;
      ev.preventDefault();
      ev.stopPropagation();
      if(typeof window.openJustificationsMemo === 'function'){
        window.openJustificationsMemo();
      }
    }, true);
  }

  if(document.readyState === 'loading'){ document.addEventListener('DOMContentLoaded', bind); }
  else { bind(); }
})();


/* --- LEGACY SCRIPT BLOCK 37 END --- */
