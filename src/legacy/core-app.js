/** Preserved legal/reference behavior extracted from the original single-file application. */
/* --- LEGACY SCRIPT BLOCK 2 START --- */

  (function(){
    const h = React.createElement;

    /* ---------- Shared UI helpers ---------- */
    function Box(props){
      return h("div",{className:"card"},
        props.title ? h("h3",{style:{margin:"0 0 .25rem",fontSize:"1.05rem"}},props.title) : null,
        props.subtitle ? h("div",{className:"small muted",style:{marginBottom:".6rem"}},props.subtitle) : null,
        props.children
      );
    }
    function Row({label,children}){ 
      return h("div",{className:"input-row",style:{marginBottom:".6rem"}},
        h("label",{className:"small"},h("strong",null,label)), 
        h("div",null,children)
      );
    }
    function statuteLink(statuteText){
      const clean = (statuteText||"").replace(/^R\.?S\.?\s*/i,"").trim();
      const url = "https://legis.la.gov/Legis/LawSearch.aspx?search="+encodeURIComponent(clean);
      return { url, label: statuteText };
    }

    /* ---------- CDS RULES & picker ---------- */
    const RULES = {
      marijuana: [
        { toGrams: 14,    statute: "R.S. 40:966(C)(2)(a)(i)", level: "Misdemeanor", note: "≤14 g — fine only; summons." },
        { toGrams: 1133,  statute: "R.S. 40:966(C)(2)(b/d/e/f)", level: "Misdemeanor → Felony", note: ">14 g and <2.5 lb — priors decide subsection." },
        { toGrams: Infinity, statute: "R.S. 40:966(D)(1) → A → (B)(2)", level: "Felony", note: "≥2.5 lb — treated as PWITD/Distribution." },
      ],
      heroin: [
        { toGrams: 1.9999, statute: "R.S. 40:966(C)(4)(a)", level: "Felony", note: "<2 g" },
        { toGrams: 27.9999, statute: "R.S. 40:966(C)(4)(b)", level: "Felony", note: "2–28 g" },
        { toGrams: Infinity, statute: "R.S. 40:966(D)(2) → A → (B)(3)(a)", level: "Felony", note: "≥28 g → distribution" },
      ],
      meth: [
        { toGrams: 1.9999, statute: "R.S. 40:967(C)(1)", level: "Felony", note: "<2 g" },
        { toGrams: 27.9999, statute: "R.S. 40:967(C)(2)", level: "Felony", note: "2–28 g" },
        { toGrams: Infinity, statute: "R.S. 40:967(D) → A → (B)(1)(b)", level: "Felony", note: "≥28 g → distribution" },
      ],
      cocaine: [
        { toGrams: 1.9999, statute: "R.S. 40:967(C)(1)", level: "Felony", note: "<2 g" },
        { toGrams: 27.9999, statute: "R.S. 40:967(C)(2)", level: "Felony", note: "2–28 g" },
        { toGrams: Infinity, statute: "R.S. 40:967(D) → A → (B)(1)(b)", level: "Felony", note: "≥28 g → distribution" },
      ],
      crack: [
        { toGrams: 1.9999, statute: "R.S. 40:967(C)(1)", level: "Felony", note: "<2 g" },
        { toGrams: 27.9999, statute: "R.S. 40:967(C)(2)", level: "Felony", note: "2–28 g" },
        { toGrams: Infinity, statute: "R.S. 40:967(D) → A → (B)(1)(b)", level: "Felony", note: "≥28 g → distribution" },
      ],
      mdma: [], synthetic_mj: [], promethazine: [], other_drug: []
    };
    function pickRule(subKey, grams, mjPriors){
      const list = RULES[subKey]||[];
      for(const base of list){
        if(grams<=base.toGrams){
          const r = Object.assign({}, base);
          if(subKey==="marijuana" && base.toGrams===1133){
            if(mjPriors===0){ r.statute="R.S. 40:966(C)(2)(b)"; r.level="Misdemeanor"; r.note=">14 g & <2.5 lb — 1st offense"; }
            else if(mjPriors===1){ r.statute="R.S. 40:966(C)(2)(d)"; r.level="Misdemeanor"; r.note=">14 g & <2.5 lb — 2nd offense"; }
            else if(mjPriors===2){ r.statute="R.S. 40:966(C)(2)(e)"; r.level="Felony";      r.note=">14 g & <2.5 lb — 3rd offense"; }
            else {                r.statute="R.S. 40:966(C)(2)(f)"; r.level="Felony";      r.note=">14 g & <2.5 lb — 4th+ offense"; }
          }
          return r;
        }
      }
      return null;
    }

    /* ---------- Firearm rules ---------- */
    function FIREARM_RULES(params){
      const {
        hasGun, handgunCount, rifleCount,
        handgunStolenCount, rifleStolenCount,
        handgunOblitCount, rifleOblitCount,
        weedGrams, hasSched2,
        isFelon, felonTenYearClear, violentFelony
      } = params;
      const adds=[];
      if(!hasGun) return adds;

      const totalGuns = (handgunCount||0) + (rifleCount||0);
      const stolenCount = (handgunStolenCount||0) + (rifleStolenCount||0);
      const oblitCount  = (handgunOblitCount||0)  + (rifleOblitCount||0);

      if((weedGrams!==null && weedGrams>14) || hasSched2){
        adds.push({ statute:"R.S. 14:95(E)", label:"Firearm while in possession of CDS", note:"Marijuana >14 g and/or any Schedule II present.", count:1 });
      }
      if(stolenCount>0){ adds.push({ statute:"R.S. 14:69.1", label:"Illegal possession of a stolen firearm", count:stolenCount }); }
      if(oblitCount>0){ adds.push({ statute:"R.S. 14:95.7", label:"Obliterated/altered serial number", count:oblitCount }); }
      if(isFelon && !felonTenYearClear && totalGuns>0){
        adds.push({
          statute:"R.S. 14:95.1",
          label:"Possession of firearm by convicted felon",
          note: violentFelony ? "Prior is a Crime of Violence (R.S. 14:2(B))." : undefined,
          count: (totalGuns>1 ? totalGuns : 1)
        });
      }
      return adds;
    }

    /* ---------- MarijuanaInteractive ---------- */
    function MarijuanaInteractive(){
      const [step,setStep]=React.useState(0);
      const [mode,setMode]=React.useState("possession");
      const [grams,setGrams]=React.useState("");
      const [priors,setPriors]=React.useState(0);
      const g = grams===""?null:parseFloat(grams);
      const showBtnEnabled = !(g===null || isNaN(g));

      let result=null;
      if(step===2 && g!==null && !isNaN(g)){
        if(mode==="possession"){
          result = (g>=1134) ? {statute:"R.S. 40:966(D)(1) → A → (B)(2)",level:"Felony",note:"≥2.5 lb — treated as PWITD/Distribution."}
                             : pickRule("marijuana", g, priors);
        } else {
          result = (g>=1134) ? {statute:"R.S. 40:966(B)(2)(b)",level:"Felony",note:"PWITD ≥2.5 lb."}
                             : {statute:"R.S. 40:966(B)(2)(a)",level:"Felony",note:"PWITD <2.5 lb."};
        }
      }

      return h("div",{className:"section"},
        h("h2",null,"Marijuana Interactive"),
        step===0 && h(Box,{title:"Choose Path"},
          h("div",{className:"pills"},
            ["possession","pwitd"].map(m=>h("button",{key:m,className:"pill "+(mode===m?"active":""),onClick:()=>setMode(m)}, m==="possession"?"Simple Possession":"PWITD"))
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn",onClick:()=>setStep(1)},"Continue")
          )
        ),
        step===1 && h(Box,{title:"Enter Details",subtitle:"Weights in grams; 2.5 lb = 1134 g"},
          mode==="possession" && h(Row,{label:"Priors"},
            h("select",{className:"input",value:priors,onChange:e=>setPriors(parseInt(e.target.value,10))},
              h("option",{value:0},"0"),h("option",{value:1},"1"),h("option",{value:2},"2"),h("option",{value:3},"3+")
            )
          ),
          h(Row,{label:"Weight g"},
            h("input",{className:"input",type:"number",min:"0",step:"0.01",value:grams,onChange:e=>setGrams(e.target.value)})
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:()=>setStep(0)},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(2),disabled:!showBtnEnabled},"Show")
          )
        ),
        step===2 && h(Box,{title:"Result"},
          mode==="possession" && h(Row,{label:"Priors"},
            h("select",{className:"input",value:priors,onChange:e=>setPriors(parseInt(e.target.value,10))},
              h("option",{value:0},"0"),h("option",{value:1},"1"),h("option",{value:2},"2"),h("option",{value:3},"3+")
            )
          ),
          result
            ? h("div",{className:"card"},
                h("div",{className:"small"},
                  h("strong",null,"Statute: "),
                  (function(){ const s=statuteLink(result.statute); return h("a",{className:"lawlink",href:s.url,target:"_blank",rel:"noopener"},s.label);}())
                ),
                h("div",{className:"small"}, h("strong",null,"Level: "), result.level),
                result.note ? h("div",{className:"small"}, result.note) : null
              )
            : h("div",{className:"small"},"Enter a valid weight."),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:()=>setStep(1)},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>{setStep(0);setGrams("");setPriors(0);}},"Restart")
          )
        )
      );
    }

    
    
    /* ---------- DomesticAbuseInteractive (with Cheat Sheet, Resources, Evidence, Enhancements) ---------- */
    function DomesticAbuseInteractive(){
      const [step,setStep]=React.useState(0);
      const [showCheat,setShowCheat]=React.useState(false);
// Relationship selector
      const [relationship,setRelationship]=React.useState("unknown"); // "household" | "dating" | "unknown"
      const isDatingNoCohab = relationship==="dating";
      const _qualifies = relationship==="household";

      // Incident facts
      const [facts,setFacts]=React.useState({
        visibleInjury:false,strangulation:false,weaponUsed:false,pregnantVictim:false,
        childPresent:false,propertyDamage:false,medicalTreatment:false,
      });
      const [priorIncidents,setPriorIncidents]=React.useState(0);

      // Evidence checklist (#6)
      const [evidence,setEvidence]=React.useState({
        injuryPhotos:false, weaponRecovered:false, clothingCollected:false,
        audioVideo:false, victimStatement:false, medicalRecords:false
      });
      function toggleEvidence(k){ setEvidence(e=>Object.assign({},e,{[k]:!e[k]})); }

      // Protective order
      const [poInEffect,setPoInEffect]=React.useState(null);
      const [poServed,setPoServed]=React.useState(null);
      const [poViolated,setPoViolated]=React.useState(null);

      function toggle(k){ setFacts(f=>Object.assign({},f,{[k]:!f[k]})); }
      const canContinuePO = poInEffect!==null ? (poInEffect ? (poServed!==null && poViolated!==null) : true) : false;

      // #7: Suggestions including enhancements
      function suggestStatuteLinks(){
        const items=[];
        if(_qualifies){
          items.push({label:"Domestic abuse battery (search)", statute:"R.S. 14:35.3"});
          if(facts.strangulation){ items.push({label:"DAB — strangulation (search)", statute:"R.S. 14:35.3 strangulation"}); }
          if(facts.pregnantVictim){ items.push({label:"DAB — pregnant victim (search)", statute:"R.S. 14:35.3 pregnancy enhancement"}); }
          if(facts.childPresent){ items.push({label:"Child present/endangerment (search)", statute:"R.S. 14:35.3 child present enhancement"}); }
          if(facts.weaponUsed){ items.push({label:"Domestic abuse aggravated (search)", statute:"R.S. 14:37.7 domestic abuse aggravated"}); }
          if(facts.visibleInjury){ items.push({label:"DAB with injury (search)", statute:"R.S. 14:35.3 injury"}); }
          if(facts.propertyDamage){ items.push({label:"Criminal damage (context)", statute:"R.S. 14:56 domestic"}); }
          if(priorIncidents>0){ items.push({label:"Enhanced penalties — prior incidents (search)", statute:"R.S. 14:35.3 prior convictions"}); }
        }
        if(isDatingNoCohab){
          items.push({label:"Battery of a Dating Partner (search)", statute:"R.S. 14:34.9"});
          if(facts.strangulation){ items.push({label:"BODP — strangulation context (search)", statute:"R.S. 14:34.9 strangulation"}); }
          if(facts.pregnantVictim){ items.push({label:"BODP — pregnant victim context (search)", statute:"R.S. 14:34.9 pregnancy"}); }
          if(facts.childPresent){ items.push({label:"Child present/endangerment context (search)", statute:"R.S. 14:34.9 child present"}); }
          if(facts.weaponUsed){ items.push({label:"Aggravated battery context (search)", statute:"R.S. 14:34 + dating partner"}); }
        }
        if(poInEffect){
          items.push({label:"Violation of protective order (search)", statute:"R.S. 14:79 protective order"});
          if(poServed && poViolated){ items.push({label:"PO violation — served & violated (search)", statute:"R.S. 14:79 served violated"}); }
        }
        return items;
      }

      // Victim resources (#5)
      return h("div",{className:"section"},
        h("h2",null,"Domestic Abuse"),

        h("div",{className:"navrow"},
  h("button",{className:"btn ghost",style:{flex:1},onClick:()=>setShowCheat(s=>!s)}, showCheat ? "Hide cheat sheet" : "Show cheat sheet")
),
        showCheat && h(Box,{title:"Cheat Sheet — Domestic vs Dating Partner"},
          h("div",null,
            h("h4",{className:"small",style:{margin:"0 0 .25rem"}}, "Domestic Abuse Battery (R.S. 14:35.3) — generally includes:"),
            h("ul",{className:"small"},
              h("li",null,h("strong",null,"Spouses / ex-spouses")),
              h("li",null,h("strong",null,"Current or former household members (roommates)")),
              h("li",null,h("strong",null,"Live-in partners (boyfriend/girlfriend)")),
              h("li",null,h("strong",null,"Parent ↔ child / step / foster in same household")),
              h("li",null,h("strong",null,"Have a child in common"))
            ),
            h("h4",{className:"small",style:{margin:"8px 0 .25rem"}}, "Battery of a Dating Partner (R.S. 14:34.9) — generally includes:"),
            h("ul",{className:"small"},
              h("li",null,"Dating partners who do not currently live together"),
              h("li",null,"Prior dating relationship without cohabitation")
            ),
            h("div",{className:"small muted",style:{marginTop:"6px"}},
              "Always verify statutory definitions and local DA guidance. ",
              (function(){ const s1=statuteLink("R.S. 14:35.3"); const s2=statuteLink("R.S. 14:34.9"); 
                return h("span",null,"See ",
                  h("a",{href:s1.url,target:"_blank",rel:"noopener",className:"lawlink"}, s1.label),
                  " and ",
                  h("a",{href:s2.url,target:"_blank",rel:"noopener",className:"lawlink"}, s2.label),
                  ".");
              })()
            )
          )
        ),
(step===0) && h(Box,{title:"Relationship type"},
          h("div",{className:"pills"},
            h("button",{className:"pill toggle "+(relationship==="household"?"active":""),onClick:()=>setRelationship("household")},"Household/family (Domestic)"),
            h("button",{className:"pill toggle "+(relationship==="dating"?"active":""),onClick:()=>setRelationship("dating")},"Dating partner (no cohabitation)"),
            h("button",{className:"pill toggle "+(relationship==="unknown"?"active":""),onClick:()=>setRelationship("unknown")},"Other / Not sure")
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(1),disabled:(relationship==="unknown")},"Continue")
          )
        ),

        (step===1) && h(Box,{title:"Incident details (select all that apply)"},
          h("div",{className:"pills"},
            h("button",{className:"pill toggle "+(facts.visibleInjury?"active":""),onClick:()=>toggle("visibleInjury")},"Visible injury"),
            h("button",{className:"pill toggle "+(facts.strangulation?"active":""),onClick:()=>toggle("strangulation")},"Strangulation indicated"),
            h("button",{className:"pill toggle "+(facts.weaponUsed?"active":""),onClick:()=>toggle("weaponUsed")},"Weapon used"),
            h("button",{className:"pill toggle "+(facts.pregnantVictim?"active":""),onClick:()=>toggle("pregnantVictim")},"Pregnant victim"),
            h("button",{className:"pill toggle "+(facts.childPresent?"active":""),onClick:()=>toggle("childPresent")},"Child present"),
            h("button",{className:"pill toggle "+(facts.propertyDamage?"active":""),onClick:()=>toggle("propertyDamage")},"Property damage"),
            h("button",{className:"pill toggle "+(facts.medicalTreatment?"active":""),onClick:()=>toggle("medicalTreatment")},"Medical treatment")
          ),
          h("div",{style:{marginTop:"10px"}},
            h(Row,{label:"Prior incidents (count)"},
              h("input",{className:"input",type:"number",min:"0",step:"1",value:priorIncidents,onChange:e=>setPriorIncidents(Math.max(0,parseInt(e.target.value||"0",10)))})
            )
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:()=>setStep(0)},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(2)},"Continue")
          )
        ),

        // (#6) Evidence checklist step
        (step===2) && h(Box,{title:"Evidence checklist"},
          h("div",{className:"pills"},
            h("button",{className:"pill toggle "+(evidence.injuryPhotos?"active":""),onClick:()=>toggleEvidence("injuryPhotos")},"Injury photos"),
            h("button",{className:"pill toggle "+(evidence.weaponRecovered?"active":""),onClick:()=>toggleEvidence("weaponRecovered")},"Weapon recovered"),
            h("button",{className:"pill toggle "+(evidence.clothingCollected?"active":""),onClick:()=>toggleEvidence("clothingCollected")},"Clothing collected"),
            h("button",{className:"pill toggle "+(evidence.audioVideo?"active":""),onClick:()=>toggleEvidence("audioVideo")},"Audio/Video evidence"),
            h("button",{className:"pill toggle "+(evidence.victimStatement?"active":""),onClick:()=>toggleEvidence("victimStatement")},"Victim statement"),
            h("button",{className:"pill toggle "+(evidence.medicalRecords?"active":""),onClick:()=>toggleEvidence("medicalRecords")},"Medical records")
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:()=>setStep(1)},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(3)},"Continue")
          )
        ),

        (step===3) && h(Box,{title:"Protective order status"},
          h("div",{className:"small",style:{marginBottom:"8px"}},"Is a protective order in effect?"),
          h("div",{className:"pills",style:{marginBottom:"10px"}},
            h("button",{className:"pill toggle "+(poInEffect===true?"active":""),onClick:()=>{setPoInEffect(true); setPoServed(null); setPoViolated(null);}},"Yes"),
            h("button",{className:"pill toggle "+(poInEffect===false?"active":""),onClick:()=>{setPoInEffect(false); setPoServed(null); setPoViolated(null);}},"No")
          ),
          (poInEffect===true) && h("div",null,
            h(Row,{label:"Order served?"},
              h("div",{className:"pills"},
                h("button",{className:"pill toggle "+(poServed===true?"active":""),onClick:()=>setPoServed(true)},"Yes"),
                h("button",{className:"pill toggle "+(poServed===false?"active":""),onClick:()=>setPoServed(false)},"No / Unknown")
              )
            ),
            h(Row,{label:"Order violated in this incident?"},
              h("div",{className:"pills"},
                h("button",{className:"pill toggle "+(poViolated===true?"active":""),onClick:()=>setPoViolated(true)},"Yes"),
                h("button",{className:"pill toggle "+(poViolated===false?"active":""),onClick:()=>setPoViolated(false)},"No / Unknown")
              )
            )
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:()=>setStep(2)},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(4),disabled:!canContinuePO},"Continue")
          )
        ),

        (step===4) && h(Box,{title:"Summary"},
          h("div",{className:"summary-wrap"},
            h("h3",null,"Domestic-related Facts"),
            h("div",{className:"card"},
              h("div",{className:"small"}, h("strong",null,"Relationship qualifies:")," ",
                relationship==="household"?"Yes":(relationship==="dating"?"Dating (no cohabitation)":"No/Unknown")),
              h("div",{className:"small"}, h("strong",null,"Visible injury:")," ", facts.visibleInjury?"Yes":"No"),
              h("div",{className:"small"}, h("strong",null,"Strangulation indicated:")," ", facts.strangulation?"Yes":"No"),
              h("div",{className:"small"}, h("strong",null,"Weapon used:")," ", facts.weaponUsed?"Yes":"No"),
              h("div",{className:"small"}, h("strong",null,"Pregnant victim:")," ", facts.pregnantVictim?"Yes":"No"),
              h("div",{className:"small"}, h("strong",null,"Child present:")," ", facts.childPresent?"Yes":"No"),
              h("div",{className:"small"}, h("strong",null,"Medical treatment:")," ", facts.medicalTreatment?"Yes":"No"),
              h("div",{className:"small"}, h("strong",null,"Prior incidents:")," ", priorIncidents||0)
            ),
            h("div",{className:"hr"}),
            h("h3",null,"Evidence collected"),
            (function(){
              const picked = Object.entries(evidence).filter(([k,v])=>!!v).map(([k])=>({
                injuryPhotos:"injury photos",
                weaponRecovered:"weapon recovered",
                clothingCollected:"clothing collected",
                audioVideo:"audio/video evidence",
                victimStatement:"victim statement",
                medicalRecords:"medical records"
              }[k]));
              return picked.length>0 ? h("div",{className:"small"}, picked.join(", ")) : h("div",{className:"small muted"},"None selected.");
            })(),
            h("div",{className:"hr"}),
            h("h3",null,"Potential Statutes to Review (with enhancements)"),
            (function(){
              const links = suggestStatuteLinks();
              if(links.length===0) return h("div",{className:"small muted"},"No suggestions based on current facts.");
              return h("div",null,
                links.map((x,i)=>{
                  const s = statuteLink(x.statute);
                  return h("div",{key:i,className:"card"},
                    h("div",{className:"small"},
                      h("strong",null,x.label,": "), h("a",{href:s.url,target:"_blank",rel:"noopener",className:"lawlink"}, s.label)
                    )
                  );
                })
              );
            })(),
            h("div",{className:"navrow"},
              h("button",{className:"btn ghost",style:{flex:1},onClick:()=>setStep(3)},"Back"),
              h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(0)},"Start Over")
            )
          )
        )
      );
    }
/* ---------- StopInteractive (traffic/CDS/weapons) ---------- */
    
/* ===== Traffic Library (REPLACED) ===== */
const TRAFFIC_LIBRARY = [
  {
    "label": "32:52 - No Driver’s License",
    "statute": "R.S. 32:52"
  },
  {
    "label": "32:412g - Expired Driver’s License",
    "statute": "R.S. 32:412g"
  },
  {
    "label": "32:415 - Driving Under Suspension",
    "statute": "R.S. 32:415"
  },
  {
    "label": "32:411f - No License on Person",
    "statute": "R.S. 32:411f"
  },
  {
    "label": "32:414.1 - Fraudulent Use of",
    "statute": "R.S. 32:414.1"
  },
  {
    "label": "32:404 - New Residence 90 Days to Secure",
    "statute": "R.S. 32:404"
  },
  {
    "label": "32:406 - Failure to Change Address 10 Days",
    "statute": "R.S. 32:406"
  },
  {
    "label": "32:408  - Motorcycle Endorsement Required",
    "statute": "R.S. 32:408"
  },
  {
    "label": "32:417 – Parental Responsible Unlicensed Minor",
    "statute": "R.S. 32:417"
  },
  {
    "label": "32:352 – Muffler Requirements",
    "statute": "R.S. 32:352"
  },
  {
    "label": "32:353 – Modified Exhaust",
    "statute": "R.S. 32:353"
  },
  {
    "label": "32:354 – Mirrors",
    "statute": "R.S. 32:354"
  },
  {
    "label": "32:361.1 – Window Tint (40% front/25% rear/ 12% back)",
    "statute": "R.S. 32:361.1"
  },
  {
    "label": "32:1301 – Unsafe Condition",
    "statute": "R.S. 32:1301"
  },
  {
    "label": "32:364 – Fenders and Mudguards",
    "statute": "R.S. 32:364"
  },
  {
    "label": "14:207 – Alteration or Removal of ID Numbers",
    "statute": "R.S. 14:207"
  },
  {
    "label": "32:51 None",
    "statute": "R.S. 32:51"
  },
  {
    "label": "32:304c Light Required",
    "statute": "R.S. 32:304c"
  },
  {
    "label": "32:53 Improper Display",
    "statute": "R.S. 32:53"
  },
  {
    "label": "47:508 Expired",
    "statute": "R.S. 47:508"
  },
  {
    "label": "47:536.8 Switched Plate",
    "statute": "R.S. 47:536.8"
  },
  {
    "label": "47:536.2 Cancelled",
    "statute": "R.S. 47:536.2"
  },
  {
    "label": "47:521 Display Temp Plate",
    "statute": "R.S. 47:521"
  },
  {
    "label": "32:56 – Obedience to Police Officers",
    "statute": "R.S. 32:56"
  },
  {
    "label": "32:123 – Stop/Yield Signs",
    "statute": "R.S. 32:123"
  },
  {
    "label": "32:171 – Railroad Crossings",
    "statute": "R.S. 32:171"
  },
  {
    "label": "32:173.1 – Buses/Commercial Vehicle Stop @ Railroad Crossing",
    "statute": "R.S. 32:173.1"
  },
  {
    "label": "32:232(2)(a) – Yellow Light Violation",
    "statute": "R.S. 32:232(2)(a)"
  },
  {
    "label": "32:232(3)(a) – Red Light Violation",
    "statute": "R.S. 32:232(3)(a)"
  },
  {
    "label": "32:234 – Flashing Signals (Red or Yellow)",
    "statute": "R.S. 32:234"
  },
  {
    "label": "32:232.1 – Inoperative Traffic Lights",
    "statute": "R.S. 32:232.1"
  },
  {
    "label": "32:103 – Moving Parked Vehicle",
    "statute": "R.S. 32:103"
  },
  {
    "label": "32:143(A) – Parking Restrictions",
    "statute": "R.S. 32:143(A)"
  },
  {
    "label": "32:143.1 – Blocking Private Drive",
    "statute": "R.S. 32:143.1"
  },
  {
    "label": "32:145 – Unattended Motor Vehicle",
    "statute": "R.S. 32:145"
  },
  {
    "label": "32:144(A) – Required w/in 18in of Curb",
    "statute": "R.S. 32:144(A)"
  },
  {
    "label": "40:1742(B)(2) – Handicap Parking",
    "statute": "R.S. 40:1742(B)(2)"
  },
  {
    "label": "32:74 – Passing on the Right",
    "statute": "R.S. 32:74"
  },
  {
    "label": "32:75 – Passing on the Left",
    "statute": "R.S. 32:75"
  },
  {
    "label": "32:77 – No Passing Zone",
    "statute": "R.S. 32:77"
  },
  {
    "label": "32:80 – Passing School Buses",
    "statute": "R.S. 32:80"
  },
  {
    "label": "32:104(B) – Signal 100ft Prior to turning onto or off highway",
    "statute": "R.S. 32:104(B)"
  },
  {
    "label": "32:105(B) – Signal Lane Change (Repealed)",
    "statute": "R.S. 32:105(B)"
  },
  {
    "label": "32:101 – Turning @ Intersection",
    "statute": "R.S. 32:101"
  },
  {
    "label": "32:101(C) – Cutting Through Parking Lot",
    "statute": "R.S. 32:101(C)"
  },
  {
    "label": "32:121 – Failure to Yield Intersection",
    "statute": "R.S. 32:121"
  },
  {
    "label": "32:122 – Failure to Yield Turning Left",
    "statute": "R.S. 32:122"
  },
  {
    "label": "32:124 – Failure to Yield from Private Drive",
    "statute": "R.S. 32:124"
  },
  {
    "label": "32:125 – Failure to Yield to Emergency Vehicle",
    "statute": "R.S. 32:125"
  },
  {
    "label": "32:329.1 – Lights Required",
    "statute": "R.S. 32:329.1"
  },
  {
    "label": "32:194 – Traffic Laws Apply",
    "statute": "R.S. 32:194"
  },
  {
    "label": "32:195B – Only Carry Number of Riders Designed",
    "statute": "R.S. 32:195B"
  },
  {
    "label": "32:195C – One Hand on Handlebars",
    "statute": "R.S. 32:195C"
  },
  {
    "label": "32:196 – Clinging to Vehicles",
    "statute": "R.S. 32:196"
  },
  {
    "label": "32:197 – Keep to Right Side of Road",
    "statute": "R.S. 32:197"
  },
  {
    "label": "32:58 – Careless Operation",
    "statute": "R.S. 32:58"
  },
  {
    "label": "32:63(A) - Speeding",
    "statute": "R.S. 32:63(A)"
  },
  {
    "label": "32:61 – Maximum Speed Limit",
    "statute": "R.S. 32:61"
  },
  {
    "label": "32:64(A) – General Speed Law",
    "statute": "R.S. 32:64(A)"
  },
  {
    "label": "32:64(B) – Impeding the Flow of Traffic",
    "statute": "R.S. 32:64(B)"
  },
  {
    "label": "32:65 – Racing on Public Roads",
    "statute": "R.S. 32:65"
  },
  {
    "label": "32:71B(1)(a) – Driving on Right Side of Road",
    "statute": "R.S. 32:71B(1)(a)"
  },
  {
    "label": "32:78 – One-way Roadway",
    "statute": "R.S. 32:78"
  },
  {
    "label": "32:79 – Improper Lane Usage",
    "statute": "R.S. 32:79"
  },
  {
    "label": "32:81 – Following Too Closely",
    "statute": "R.S. 32:81"
  },
  {
    "label": "32:82 – Crossing Median",
    "statute": "R.S. 32:82"
  },
  {
    "label": "32:53 – Proper Equipment Required",
    "statute": "R.S. 32:53"
  },
  {
    "label": "32:301 – Headlights Required @ Night",
    "statute": "R.S. 32:301"
  },
  {
    "label": "32:303 – 2 Headlights Required",
    "statute": "R.S. 32:303"
  },
  {
    "label": "32:319A – 2 Taillamps Required",
    "statute": "R.S. 32:319A"
  },
  {
    "label": "32:304C – License Plate Light Required",
    "statute": "R.S. 32:304C"
  },
  {
    "label": "32:319B – Turn Signal Required",
    "statute": "R.S. 32:319B"
  },
  {
    "label": "32:322 – Headlights Must Dim (500ft front/200ft rear)",
    "statute": "R.S. 32:322"
  },
  {
    "label": "32:326C – Parking Lights Only",
    "statute": "R.S. 32:326C"
  },
  {
    "label": "32:322D – Fog-lights w/o Fog",
    "statute": "R.S. 32:322D"
  },
  {
    "label": "32:333 – Neon Lights Around License Plate",
    "statute": "R.S. 32:333"
  },
  {
    "label": "32:351 – Horn Required",
    "statute": "R.S. 32:351"
  },
  {
    "label": "32:218 – Hitchhiking",
    "statute": "R.S. 32:218"
  },
  {
    "label": "32:282 – Obstruction of Driver’s View",
    "statute": "R.S. 32:282"
  },
  {
    "label": "32:283 – Opening Doors Into Traffic",
    "statute": "R.S. 32:283"
  },
  {
    "label": "32:284 – Riding in Bed of a pickup truck(<12yo)",
    "statute": "R.S. 32:284"
  },
  {
    "label": "32:287 – Crossing Fire Hose",
    "statute": "R.S. 32:287"
  },
  {
    "label": "32:295 – Child Restraint",
    "statute": "R.S. 32:295"
  },
  {
    "label": "32:295.1 – Seatbelt Required",
    "statute": "R.S. 32:295.1"
  },
  {
    "label": "32:327 Driving with hazards or flashers",
    "statute": "R.S. 32:327"
  },
  {
    "label": "32:295.3 – Unattended Children (<6yo)",
    "statute": "R.S. 32:295.3"
  },
  {
    "label": "32:299 – Off Road Vehicles on Roadway",
    "statute": "R.S. 32:299"
  },
  {
    "label": "32:300 – Alcohol Possession in Vehicle",
    "statute": "R.S. 32:300"
  },
  {
    "label": "32:300.4 – Smoking in Motor Vehicle",
    "statute": "R.S. 32:300.4"
  },
  {
    "label": "30:2531 – Intentional Littering",
    "statute": "R.S. 30:2531"
  },
  {
    "label": "14:98 – Operating While Intoxicated (OWI)",
    "statute": "R.S. 14:98"
  },
  {
    "label": "14:98J – OWI w/juvenile",
    "statute": "R.S. 14:98J"
  },
  {
    "label": "14:99 – Reckless Operation",
    "statute": "R.S. 14:99"
  },
  {
    "label": "14:100 – Hit-and-run Driving",
    "statute": "R.S. 14:100"
  }
];

/* ===== Reusable searchable picker ===== */
function SearchablePicker({ title="Select charge", items=[], onPick, onClose }){
  const [q,setQ] = React.useState("");
  const list = React.useMemo(()=>{
    const s=(q||"").trim().toLowerCase();
    if(!s) return items.slice(0,100);
    return items.filter(x=>
      (x.label||"").toLowerCase().includes(s) || (x.statute||"").toLowerCase().includes(s)
    ).slice(0,100);
  },[q,items]);

  function handleKey(e){
    if(e.key==="Enter" && list.length>0){ onPick(list[0]); }
    if(e.key==="Escape"){ onClose(); }
  }

  return h("div",{className:"modal-backdrop",onClick:onClose},
    h("div",{className:"modal",onClick:e=>e.stopPropagation()},
      h("h3",null,title),
      h("input",{
        className:"input", placeholder:"Search by keyword or statute (e.g., 'lane', '32:79')",
        value:q, onChange:e=>setQ(e.target.value), onKeyDown:handleKey, autoFocus:true
      }),
      h("div",{className:"results"},
        list.length===0
          ? h("div",{className:"result-item"},"No matches.")
          : list.map((x,i)=>h("div",{key:i,className:"result-item",onClick:()=>onPick(x)},
              h("div",null,x.label||"—"),
              h("div",{className:"result-sub"},x.statute||"")
            ))
      ),
      h("div",{className:"modal-actions"},
        h("button",{className:"btn ghost",onClick:onClose},"Close")
      )
    )
  );
}

function StopInteractive(){
      const [showTSCaseLaw,setShowTSCaseLaw]=React.useState(false);
      const [step,setStep]=React.useState(0);
      const [isStop,setIsStop]=React.useState(true);
      const [title,setTitle]=React.useState("32");

      const TRAFFIC_OPTS=[
        {label:"Improper Display of a License Plate",statute:"R.S. 32:53"},
        {label:"Failure to signal 100 feet prior",statute:"R.S. 32:104"},
        {label:"Window tint",statute:"R.S. 32:361.1"},
        {label:"General Speed",statute:"R.S. 32:64"},
        {label:"License plate lights required",statute:"R.S. 32:304"},
        {label:"Other (specify)",statute:""}
      ];
      const [trafficPicks,setTrafficPicks]=React.useState([]);
      
      function removeTrafficPick(idx){
        setTrafficPicks(p=>p.filter((_,i)=>i!==idx));
      }
const [trafficOtherText,setTrafficOtherText]=React.useState("");

      const [showTrafficPicker,setShowTrafficPicker]=React.useState(false);
const SUBS={
        marijuana:{label:"Marijuana"},
        meth:{label:"Methamphetamine"},
        heroin:{label:"Heroin"},
        crack:{label:"Crack (base)"},
        cocaine:{label:"Cocaine (powder)"},
        mdma:{label:"MDMA"},
        synthetic_mj:{label:"Synthetic Marijuana"},
        promethazine:{label:"Promethazine"},
        other_drug:{label:"Other (specify)"}
      };
      const ORDER=Object.keys(SUBS);
      const [found,setFound]=React.useState(null);
      const [picked,setPicked]=React.useState([]);
      const [weights,setWeights]=React.useState({});
      const [otherDrugName,setOtherDrugName]=React.useState("");
      const [mjPriors,setMjPriors]=React.useState(0);

      const [weaponInvolved,setWeaponInvolved]=React.useState(null);
      const [handgunCount,setHandgunCount]=React.useState(0);
      const [rifleCount,setRifleCount]=React.useState(0);
      const [handgunStolenCount,setHandgunStolenCount]=React.useState(0);
      const [rifleStolenCount,setRifleStolenCount]=React.useState(0);
      const [handgunOblitCount,setHandgunOblitCount]=React.useState(0);
      const [rifleOblitCount,setRifleOblitCount]=React.useState(0);

      const [isFelon,setIsFelon]=React.useState(null);
      const [tenYearClear,setTenYearClear]=React.useState(null);
      const [violentFelony,setViolentFelony]=React.useState(false);

      function goBack(){ setStep(s => (s <= 2 ? 0 : Math.max(0, s - 1))); }
      function restart(){
        setStep(0); setIsStop(true); setTitle("32");
        setTrafficPicks([]); setTrafficOtherText("");
        setFound(null); setPicked([]); setWeights({}); setOtherDrugName(""); setMjPriors(0);
        setWeaponInvolved(null);
        setHandgunCount(0); setRifleCount(0);
        setHandgunStolenCount(0); setRifleStolenCount(0);
        setHandgunOblitCount(0); setRifleOblitCount(0);
        setIsFelon(null); setTenYearClear(null); setViolentFelony(false);
      }
      function clamp(n,min,max){ n = isNaN(n)?0:n; return Math.max(min, Math.min(max, n)); }
      function onHandgunCountChange(v){
        const n = clamp(parseInt(v||"0",10), 0, 999);
        setHandgunCount(n);
        setHandgunStolenCount(s=>clamp(s,0,n));
        setHandgunOblitCount(s=>clamp(s,0,n));
      }
      function onRifleCountChange(v){
        const n = clamp(parseInt(v||"0",10), 0, 999);
        setRifleCount(n);
        setRifleStolenCount(s=>clamp(s,0,n));
        setRifleOblitCount(s=>clamp(s,0,n));
      }

      const weedGrams=(function(){
        const raw=(weights&&weights["marijuana"]); 
        const g=(raw===""||raw==null)?null:parseFloat(raw);
        return (g===null||isNaN(g))?null:g;
      })();
      const hasAnySched2=["meth","cocaine","crack","heroin"].some(k=>{
        const raw=(weights||{})[k]; const g=(raw===""||raw==null)?null:parseFloat(raw);
        return g!==null && !isNaN(g) && g>0;
      });
      const needTrafficOtherText = (trafficPicks||[]).some(t=>(t.label||"").indexOf("Other")===0);
      const canContinueTitle32 = (trafficPicks||[]).length>0 && (!needTrafficOtherText || (trafficOtherText||"").trim().length>0);
      const needOtherDrugName = (picked||[]).indexOf("other_drug")>-1;
      const canContinueDrugs = (picked||[]).length>0 && (!needOtherDrugName || (otherDrugName||"").trim().length>0);

      return h("div",{className:"section"},
        h("h2",null,"Traffic Stop"),

        (step===0) && h(Box,{},
          h("div",{className:"navrow"},
            h("button",{className:"btn",style:{flex:1},onClick:()=>{ setIsStop(true); setTitle("32"); setStep(2); }},"Begin")
          ),
          h("div",{style:{marginTop:"12px",display:"flex",gap:"8px",flexWrap:"wrap"}},  h("button",{className:"btn",onClick:()=>setShowTSCaseLaw(v=>!v)},"Case Law Reference For Traffic Stops"),  h("button",{className:"btn",onClick:()=>{    if (typeof window.__openIdentPassengersModal==="function"){ window.__openIdentPassengersModal(); }    else { try{ window.dispatchEvent(new Event("build-ident-passengers")); }catch(_e){} }  }},"Identifying Passengers")),
          showTSCaseLaw && h("div",{className:"card",style:{padding:"14px",marginTop:"10px"}},
            h("h3",null,"Core U.S. Supreme Court Cases"),
            h("ul",null,
              h("li",null,h("strong",null,"Whren v. United States (1996)")," — Pretext stops permitted if there is objective probable cause for any traffic violation; officer motive is irrelevant."),
              h("li",null,h("strong",null,"Pennsylvania v. Mimms (1977)")," — During a lawful stop, officers may order the driver out of the vehicle for safety."),
              h("li",null,h("strong",null,"Maryland v. Wilson (1997)")," — Extends ",h("em",null,"Mimms")," to passengers; they may be ordered out as well."),
              h("li",null,h("strong",null,"Rodriguez v. United States (2015)")," — You may not prolong the stop beyond traffic tasks unless you develop independent reasonable suspicion.")
            ),
            h("h3",null,"Frequently Used Add‑Ons"),
            h("ul",null,
              h("li",null,h("strong",null,"Illinois v. Caballes (2005)")," — K‑9 sniff is allowed so long as it does not extend the stop."),
              h("li",null,h("strong",null,"Arizona v. Johnson (2009)")," — Frisk a passenger if you have reasonable suspicion they’re armed and dangerous."),
              h("li",null,h("strong",null,"Brendlin v. California (2007)")," — Passengers are seized during a traffic stop and may challenge its legality.")
            )
          )
        ),

        (step===2) && h(Box,{title:"Select traffic violations (multi-select)"},
          h("div",{className:"pills"},
            TRAFFIC_OPTS.map(opt=>{
              const active=(trafficPicks||[]).some(o=>o.label===opt.label);
              return h("button",{
                key:opt.label,className:"pill toggle "+(active?"active":""),

                onClick:()=>{
                if(opt.label==="Other (specify)"){
                  setShowTrafficPicker(true);
                }else{
                  setTrafficPicks(p=>active?p.filter(x=>x.label!==opt.label):p.concat([opt]));
                }
              }
              },opt.label);
            })
          
          ,
          (trafficPicks && trafficPicks.length>0) && h("div",{className:"selected-list"},
            h("div",{className:"small",style:{marginBottom:"6px"}}, "Currently selected:"),
            h("div",{style:{display:"flex",flexWrap:"wrap"}},
              trafficPicks.map((t,i)=>h("div",{key:i,className:"selected-item"},
                h("span",{className:"label"}, (t.label||"").replace(/\s+/g," ").trim() ),
                h("button",{className:"selected-remove",onClick:()=>removeTrafficPick(i)},"Remove")
              ))
            )
          )
),
          needTrafficOtherText && h("div",{style:{marginTop:"10px"}},
            h(Row,{label:"Specify other"},
              h("input",{className:"input",value:trafficOtherText,onChange:e=>setTrafficOtherText(e.target.value),placeholder:"e.g., Improper turn, expired registration…"})
            )
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:goBack},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(3),disabled:!canContinueTitle32},"Continue")
          )
        ),
        (showTrafficPicker && h(SearchablePicker,{
          title:"Search traffic charges",
          items:TRAFFIC_LIBRARY,
          onPick:(item)=>{ setTrafficPicks(p=>p.concat([{label:item.label,statute:item.statute}])); setShowTrafficPicker(false); },
          onClose:()=>setShowTrafficPicker(false)
        })),

        (step===3) && h(Box,{title:"Narcotics found?"},
          h("div",{className:"navrow"},
            h("button",{className:"btn",style:{flex:1},onClick:()=>{setFound(true);setStep(4);}},"Yes"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>{setFound(false);setStep(6);}},"No")
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:goBack},"Back")
          )
        ),

        (step===4) && h(Box,{title:"Select all narcotics located",subtitle:"Multi-select"},
          h("div",{className:"pills"},
            ORDER.map(k=>{
              const active=(picked||[]).indexOf(k)>-1;
              return h("button",{key:k,className:"pill toggle "+(active?"active":""),onClick:()=>setPicked(p=>active?p.filter(x=>x!==k):p.concat([k]))}, SUBS[k].label);
            })
          ),
          needOtherDrugName && h("div",{style:{marginTop:"10px"}},
            h(Row,{label:"Specify other CDS"},
              h("input",{className:"input",value:otherDrugName,onChange:e=>setOtherDrugName(e.target.value),placeholder:"Name of substance"})
            )
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:goBack},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>{ setFound(true); setStep(5); },disabled:!canContinueDrugs},"Continue")
          )
        ),

        (step===5) && h(Box,{title:"Enter Weights (grams)"},
          ((picked||[]).length===0)
            ? h("div",{className:"small muted"},"No substances selected.")
            : (picked||[]).map(k=>h(Row,{key:k,label:(k==="other_drug"?(otherDrugName||"Other CDS"):SUBS[k].label)},
                h("input",{className:"input",type:"number",min:"0",step:"0.01",value:(weights[k]||""),onChange:e=>setWeights(w=>Object.assign({},w,{[k]:e.target.value}))})
              )
            ),
          h("div",{className:"conv"},
            h("ul",{className:"small"},
              h("li",null,h("strong",null,"28.35 grams")," = ",h("strong",null,"1 ounce")),
              h("li",null,h("strong",null,"16 ounces")," = ",h("strong",null,"1 pound")),
              h("li",null,h("strong",null,"Zip")," = ",h("strong",null,"Ounce")),
              h("li",null,h("strong",null,"8-ball")," = ",h("strong",null,"3.5 grams"))
            )
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:goBack},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(6),disabled:(picked||[]).length===0 },"Continue")
          )
        ),

        (step===6) && h(Box,{title:"Weapons involved?"},
          h("div",{className:"navrow"},
            h("button",{className:"btn",style:{flex:1},onClick:()=>{setWeaponInvolved(true);setStep(7);}},"Yes"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>{setWeaponInvolved(false);setStep(8);}},"No")
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:goBack},"Back")
          )
        ),

        (step===7) && h(Box,{title:"Weapon details"},
          h(Row,{label:"Handguns (quantity)"},
            h("input",{className:"input",type:"number",min:"0",step:"1",
              value:handgunCount,onChange:e=>onHandgunCountChange(e.target.value)})
          ),
          (handgunCount>1)
            ? h(React.Fragment,null,
                h(Row,{label:`Handguns stolen (0–${handgunCount})`},
                  h("input",{className:"input",type:"number",min:"0",max:handgunCount,step:"1",
                    value:handgunStolenCount,onChange:e=>setHandgunStolenCount(clamp(parseInt(e.target.value||"0",10),0,handgunCount))})
                ),
                h(Row,{label:`Handguns w/ obliterated serial (0–${handgunCount})`},
                  h("input",{className:"input",type:"number",min:"0",max:handgunCount,step:"1",
                    value:handgunOblitCount,onChange:e=>setHandgunOblitCount(clamp(parseInt(e.target.value||"0",10),0,handgunCount))})
                )
              )
            : (handgunCount===1)
              ? h(Row,{label:"Handgun flags"},
                  h("div",{className:"pills"},
                    h("button",{className:"pill toggle "+(handgunStolenCount===1?"active":""),onClick:()=>setHandgunStolenCount(handgunStolenCount===1?0:1)},"Stolen?"),
                    h("button",{className:"pill toggle "+(handgunOblitCount===1?"active":""),onClick:()=>setHandgunOblitCount(handgunOblitCount===1?0:1)},"Obliterated?")
                  )
                )
              : null,

          h(Row,{label:"Rifles (quantity)"},
            h("input",{className:"input",type:"number",min:"0",step:"1",
              value:rifleCount,onChange:e=>onRifleCountChange(e.target.value)})
          ),
          (rifleCount>1)
            ? h(React.Fragment,null,
                h(Row,{label:`Rifles stolen (0–${rifleCount})`},
                  h("input",{className:"input",type:"number",min:"0",max:rifleCount,step:"1",
                    value:rifleStolenCount,onChange:e=>setRifleStolenCount(clamp(parseInt(e.target.value||"0",10),0,rifleCount))})
                ),
                h(Row,{label:`Rifles w/ obliterated serial (0–${rifleCount})`},
                  h("input",{className:"input",type:"number",min:"0",max:rifleCount,step:"1",
                    value:rifleOblitCount,onChange:e=>setRifleOblitCount(clamp(parseInt(e.target.value||"0",10),0,rifleCount))})
                )
              )
            : (rifleCount===1)
              ? h(Row,{label:"Rifle flags"},
                  h("div",{className:"pills"},
                    h("button",{className:"pill toggle "+(rifleStolenCount===1?"active":""),onClick:()=>setRifleStolenCount(rifleStolenCount===1?0:1)},"Stolen?"),
                    h("button",{className:"pill toggle "+(rifleOblitCount===1?"active":""),onClick:()=>setRifleOblitCount(rifleOblitCount===1?0:1)},"Obliterated?")
                  )
                )
              : null,

          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:goBack},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(8),disabled: ((handgunCount||0)+(rifleCount||0))===0 },"Continue")
          )
        ),

        (step===8) && h(Box,{title:"Suspect is a convicted felon?"},
          h("div",{className:"navrow"},
            h("button",{className:"btn",style:{flex:1},onClick:()=>{setIsFelon(true);setStep(9);}},"Yes"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>{setIsFelon(false);setStep(10);}},"No")
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:goBack},"Back")
          )
        ),

        (step===9) && h(Box,{title:"Ten-year cleansing / crimes of violence"},
          h(Row,{label:"Is it more than 10 years since conviction or completion of supervision?"},
            h("div",{className:"pills"},
              h("button",{className:"pill toggle "+(tenYearClear===true?"active":""),onClick:()=>setTenYearClear(true)},"More than 10 years"),
              h("button",{className:"pill toggle "+(tenYearClear===false?"active":""),onClick:()=>setTenYearClear(false)},"Less than 10 years")
            )
          ),
          (tenYearClear===false) && h(Row,{label:"Do prior felonies fall under R.S. 14:2 — Crimes of Violence?"},
            h("div",{className:"pills"},
              h("button",{className:"pill toggle "+(violentFelony?"active":""),onClick:()=>setViolentFelony(true)},"Yes"),
              h("button",{className:"pill toggle "+(!violentFelony?"active":""),onClick:()=>setViolentFelony(false)},"No")
            )
          ),
          h("div",{className:"navrow"},
            h("button",{className:"btn ghost",style:{flex:1},onClick:goBack},"Back"),
            h("button",{className:"btn",style:{flex:1},onClick:()=>setStep(10),disabled:(tenYearClear===null)},"Continue")
          )
        ),

        (step===10) && h(Box,{title:"Summary"},
          h("div",{className:"summary-wrap"},
            h("ul",{className:"small"},
              h("li",null,h("strong",null,"Traffic stop:")," ", isStop? "Yes":"No"),
              h("li",null,h("strong",null,"Title chosen:")," Title 32")
            ),

            h("div",{className:"hr"}), h("h3",null,"Controlled Dangerous Substance Charges"),
            (function(){
              const pickedList = Array.isArray(picked) ? picked : [];
              const showCDS = (found === true) || (pickedList.length > 0);
              if(!showCDS) return h("div",{className:"small muted"},"None.");
              if(pickedList.length===0) return h("div",{className:"small muted"},"No substances selected.");

              return h("div",null,
                pickedList.map(k=>{
                  const raw=(weights||{})[k]; 
                  const g=(raw===""||raw==null)?null:parseFloat(raw);
                  let rule=null;
                  if(["marijuana","heroin","meth","cocaine","crack"].indexOf(k)>-1){
                    rule=(g!==null && !isNaN(g))?pickRule(k,g,mjPriors):null;
                    if(k==="marijuana" && g!==null && g>=1134){
                      rule={statute:"R.S. 40:966(D)(1) → A → (B)(2)", level:"Felony", note:"Possession ≥ 2.5 lb — treated as PWITD/Distribution."};
                    }
                  }
                  const labels = {
                    marijuana:"Marijuana", meth:"Methamphetamine", heroin:"Heroin",
                    crack:"Crack (base)", cocaine:"Cocaine (powder)", mdma:"MDMA",
                    synthetic_mj:"Synthetic Marijuana", promethazine:"Promethazine"
                  };
                  const label = (k==="other_drug") ? (otherDrugName||"Other CDS") : (labels[k]||k);
                  const statuteDisplay = (rule && rule.statute) ? rule.statute : "Review statute";
                  const statuteNode = statuteDisplay==="Review statute"
                    ? "Review statute"
                    : (function(){ const s=statuteLink(statuteDisplay); return h("a",{className:"lawlink",href:s.url,target:"_blank",rel:"noopener"},s.label); }());
                  return h("div",{key:k, className:"card"},
                    h("div",{className:"small",style:{fontWeight:600}},label),
                    h("div",{className:"small"},h("strong",null,"Weight (g): "),(g!==null && !isNaN(g))?g:"—"),
                    h("div",{className:"small"},h("strong",null,"Statute: "), statuteNode),
                    h("div",{className:"small"},h("strong",null,"Level: "), rule?rule.level:"—"),
                    (rule && rule.note) ? h("div",{className:"small"},h("strong",null,"Notes: "),rule.note) : null
                  );
                })
              );
            })(),

            h("div",{className:"hr"}), h("h3",null,"Firearm-Related Charges"),
            (function(){
              const adds = FIREARM_RULES({
                hasGun: weaponInvolved===true,
                handgunCount: handgunCount||0, rifleCount: rifleCount||0,
                handgunStolenCount: handgunStolenCount||0, rifleStolenCount: rifleStolenCount||0,
                handgunOblitCount: handgunOblitCount||0, rifleOblitCount: rifleOblitCount||0,
                weedGrams: weedGrams, hasSched2: hasAnySched2,
                isFelon: isFelon===true, felonTenYearClear: tenYearClear===true, violentFelony: !!violentFelony
              }) || [];
              if(adds.length===0) return h("div",{className:"small muted"},"None.");
              return h("div",null,
                adds.map((a,idx)=>{
                  const s=statuteLink(a.statute||"");
                  const counts = (a.count && a.count>1) ? ` (${a.count} counts)` : "";
                  const link = a.statute ? h("a",{className:"lawlink",href:s.url,target:"_blank",rel:"noopener"},s.label) : "—";
                  return h("div",{key:idx,className:"card"},
                    h("div",{className:"small"},h("strong",null, (a.label||"Charge") + counts)),
                    h("div",{className:"small"},h("strong",null,"Statute: "), link),
                    a.note ? h("div",{className:"small"},a.note) : null
                  );
                })
              );
            })(),

            h("div",{className:"hr"}), h("h3",null,"Traffic Violations"),
            (function(){
              if((trafficPicks||[]).length===0) return h("div",{className:"small muted"},"None.");
              return h("div",null,
                (trafficPicks||[]).map((t,idx)=>{
                  const label = (t.label||"").indexOf("Other")===0 ? (trafficOtherText||"Other") : (t.label||"");
                  const statute = (t.label||"").indexOf("Other")===0 ? "" : (t.statute||"");
                  const link = statute ? (function(){const s=statuteLink(statute); return h("a",{className:"lawlink",href:s.url,target:"_blank",rel:"noopener"},s.label);}()) : "—";
                  return h("div",{key:idx,className:"card"},
                    h("div",{className:"small"},h("strong",null,label||"Traffic violation")),
                    h("div",{className:"small"},h("strong",null,"Statute: "), link)
                  );
                })
              );
            })(),

            (found && (picked||[]).indexOf("marijuana")>-1) ? h(React.Fragment,null,
              h("div",{className:"hr"}),
              h(Row,{label:"Prior Marijuana Convictions"},
                h("select",{className:"input",value:mjPriors,onChange:e=>setMjPriors(parseInt(e.target.value,10))},
                  h("option",{value:0},"0"),h("option",{value:1},"1"),
                  h("option",{value:2},"2"),h("option",{value:3},"3+")
                )
              )
            ) : null,

            h("div",{className:"navrow"},
              h("button",{className:"btn ghost",style:{flex:1},onClick:()=>setStep(5)},"Back to Weights"),
              h("button",{className:"btn",style:{flex:1},onClick:restart},"Start Over")
            )
          )
        )
      );
    }

    
    /* ---------- PillLookup (Option 1: Quick Search to PillIdentifier.com) ---------- */
/* Quick Schedule DB (editable): common Rx encountered in patrol */
const QUICK_PILL_DB = {
  // Schedule II (R.S. 40:967)
  "adderall": {schedule:"II", statute:"R.S. 40:967", aka:["amphetamine","dextroamphetamine"]},
  "methylphenidate": {schedule:"II", statute:"R.S. 40:967", aka:["ritalin","concerta"]},
  "oxycodone": {schedule:"II", statute:"R.S. 40:967", aka:["oxycontin","percocet","roxicodone"]},
  "hydrocodone": {schedule:"II", statute:"R.S. 40:967", aka:["norco","vicodin","lortab"]},
  "morphine": {schedule:"II", statute:"R.S. 40:967", aka:[]},
  "fentanyl": {schedule:"II", statute:"R.S. 40:967", aka:[]},
  "methadone": {schedule:"II", statute:"R.S. 40:967", aka:[]},

  // Schedule III (R.S. 40:968)
  "suboxone": {schedule:"III", statute:"R.S. 40:968", aka:["buprenorphine","buprenorphine/naloxone"]},
  "testosterone": {schedule:"III", statute:"R.S. 40:968", aka:["androgels"]},

  // Schedule IV (R.S. 40:969)
  "alprazolam": {schedule:"IV", statute:"R.S. 40:969", aka:["xanax"]},
  "clonazepam": {schedule:"IV", statute:"R.S. 40:969", aka:["klonopin"]},
  "diazepam": {schedule:"IV", statute:"R.S. 40:969", aka:["valium"]},
  "lorazepam": {schedule:"IV", statute:"R.S. 40:969", aka:["ativan"]},
  "zolpidem": {schedule:"IV", statute:"R.S. 40:969", aka:["ambien"]},
  "tramadol": {schedule:"IV", statute:"R.S. 40:969", aka:[]},

  // Schedule V (R.S. 40:970)
  "codeine cough syrup": {schedule:"V", statute:"R.S. 40:970", aka:["guaifenesin with codeine","promethazine with codeine"]},

  // Non-controlled (verify locally if reclassified)
  "gabapentin": {schedule:"Not controlled", statute:"—", aka:[]},
  "promethazine": {schedule:"Not controlled", statute:"—", aka:[]},
  "naloxone": {schedule:"Not controlled", statute:"—", aka:["narcan"]},
};

/* Helper to find by name in QUICK_PILL_DB */
function findScheduleByName(raw){
  if(!raw) return null;
  const q = raw.trim().toLowerCase();
  // direct match
  if(QUICK_PILL_DB[q]) return {name:q, ...QUICK_PILL_DB[q]};
  // search aka lists
  for(const [k,v] of Object.entries(QUICK_PILL_DB)){
    if((v.aka||[]).some(alias => alias.toLowerCase()===q)) return {name:k, ...v};
  }
  // loose contains match (best-effort)
  for(const [k,v] of Object.entries(QUICK_PILL_DB)){
    if(k.includes(q)) return {name:k, ...v};
    if((v.aka||[]).some(alias => alias.toLowerCase().includes(q))) return {name:k, ...v};
  }
  return null;
}

    



function PillLookup(){
  // --- Quick tables (name→schedule) ---
  const QUICK_PILL_DB = {
    "adderall": {schedule:"II", statute:"R.S. 40:967", aka:["amphetamine","dextroamphetamine"]},
    "methylphenidate": {schedule:"II", statute:"R.S. 40:967", aka:["ritalin","concerta"]},
    "oxycodone": {schedule:"II", statute:"R.S. 40:967", aka:["oxycontin","percocet","roxicodone"]},
    "hydrocodone": {schedule:"II", statute:"R.S. 40:967", aka:["norco","vicodin","lortab"]},
    "morphine": {schedule:"II", statute:"R.S. 40:967", aka:[]},
    "fentanyl": {schedule:"II", statute:"R.S. 40:967", aka:[]},
    "methadone": {schedule:"II", statute:"R.S. 40:967", aka:[]},
    "suboxone": {schedule:"III", statute:"R.S. 40:968", aka:["buprenorphine","buprenorphine/naloxone"]},
    "testosterone": {schedule:"III", statute:"R.S. 40:968", aka:[]},
    "alprazolam": {schedule:"IV", statute:"R.S. 40:969", aka:["xanax"]},
    "clonazepam": {schedule:"IV", statute:"R.S. 40:969", aka:["klonopin"]},
    "diazepam": {schedule:"IV", statute:"R.S. 40:969", aka:["valium"]},
    "lorazepam": {schedule:"IV", statute:"R.S. 40:969", aka:["ativan"]},
    "zolpidem": {schedule:"IV", statute:"R.S. 40:969", aka:["ambien"]},
    "tramadol": {schedule:"IV", statute:"R.S. 40:969", aka:[]},
    "codeine cough syrup": {schedule:"V", statute:"R.S. 40:970", aka:["guaifenesin with codeine","promethazine with codeine"]},
    "gabapentin": {schedule:"Not controlled", statute:"—", aka:[]},
    "promethazine": {schedule:"Not controlled", statute:"—", aka:[]},
    "naloxone": {schedule:"Not controlled", statute:"—", aka:["narcan"]},
  };
  function findScheduleByName(raw){
    if(!raw) return null;
    const q = raw.trim().toLowerCase();
    if(QUICK_PILL_DB[q]) return {name:q, ...QUICK_PILL_DB[q]};
    for(const [k,v] of Object.entries(QUICK_PILL_DB)){
      if((v.aka||[]).some(alias => alias.toLowerCase()===q)) return {name:k, ...v};
    }
    for(const [k,v] of Object.entries(QUICK_PILL_DB)){
      if(k.includes(q)) return {name:k, ...v};
      if((v.aka||[]).some(alias => alias.toLowerCase().includes(q))) return {name:k, ...v};
    }
    return null;
  }

  // --- Imprint DB & helpers ---
  const QUICK_IMPRINTS = [{imprint:"M367", name:"Hydrocodone/Acetaminophen 10/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"IP 110", name:"Hydrocodone/Acetaminophen 10/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"RP 10 325", name:"Oxycodone/Acetaminophen 10/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"RP 7.5 325", name:"Oxycodone/Acetaminophen 7.5/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"A 215", name:"Oxycodone 30 mg", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"K 56", name:"Oxycodone 10 mg", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"R P 10 325", name:"Oxycodone/Acetaminophen 10/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"GG 249", name:"Alprazolam 2 mg (White bar)", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"S 90 3", name:"Alprazolam 2 mg (Green bar)", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"GG 257", name:"Alprazolam 0.5 mg", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"TEVA 833", name:"Clonazepam 1 mg", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"U31", name:"Tramadol 50 mg", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"AN 627", name:"Tramadol 50 mg", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"b 973", name:"Amphetamine/Dextroamphetamine 30 mg", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"G 3722", name:"Alprazolam 2 mg (Xanax bar)", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"R 039", name:"Alprazolam 2 mg (Yellow bar)", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"TEVA 3925", name:"Diazepam 5 mg", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"E 8", name:"Amphetamine/Dextroamphetamine 20 mg", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"A 349", name:"Oxycodone 5 mg", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"XANAX", name:"Alprazolam (brand tablet)", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"G 037", name:"Hydrocodone/Acetaminophen 10/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"V 2531", name:"Hydrocodone/Acetaminophen 5/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"A 333", name:"Oxycodone/Acetaminophen 10/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"S 901", name:"Alprazolam 0.5 mg (Peach)", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"MYLAN 477", name:"Lorazepam 1 mg", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"WATSON 853", name:"Hydrocodone/Acetaminophen 10/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"IP 204", name:"Oxycodone/Acetaminophen 10/325", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"M 30", name:"Oxycodone 30 mg (Blue)", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"K 9", name:"Oxycodone 30 mg (Blue round)", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"E 7", name:"Amphetamine/Dextroamphetamine 30 mg", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"U15", name:"Tramadol 50 mg", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"M357", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"V 36 01", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"WATSON 349", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"3604 V", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"V 36 05", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"WATSON 3202", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"V 35 92", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"M360", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"M358", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"WATSON 853", name:"Hydrocodone/Acetaminophen", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"30 over M (\"30 M\")", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"K 9", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"K 8", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"V 48 12", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"R P 5", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"R P 30", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"223", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"A 214", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"M 5", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"112", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"114", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"113", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"cor 224", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"ETH 461", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"ETH 445", name:"Oxycodone", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"AN 627", name:"Tramadol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"GG 249", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"R 0 3 9", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"G 372 2", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"GG 257", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"031 R", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"027 R", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"Y 2 0", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"Y 1 8", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"2 0 9 0 V", name:"Alprazolam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"TEVA 3926", name:"Diazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"TEVA 3927", name:"Diazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"TEVA 833", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"TEVA 832", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"TEVA 834", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"93 833", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"E 64", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"E 63", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"R 34", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"R 35", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"M C14", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"M C 13", name:"Clonazepam", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"AMB 10 5421", name:"Zolpidem (Ambien)", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"E 79", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"Logo 10 MG", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"M Z2", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"6469 V", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"IT 117", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"M Z1", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"93 74", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"6468 V", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"ZIM 10", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"515", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"RB 82", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"516", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"IG 259", name:"Zolpidem", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"SOMA 350", name:"Carisoprodol (Soma)", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"2410 V", name:"Carisoprodol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"O 111", name:"Carisoprodol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"A-136", name:"Carisoprodol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"cor 103", name:"Carisoprodol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"446", name:"Carisoprodol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"MP 58", name:"Carisoprodol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"WW 176", name:"Carisoprodol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"H 94", name:"Carisoprodol", schedule:"IV", statute:"R.S. 40:969"},
    {imprint:"AD 30", name:"Amphetamine/Dextroamphetamine (Adderall)", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"b 973 2 0", name:"Amphetamine/Dextroamphetamine", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"E 404", name:"Amphetamine/Dextroamphetamine", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"T 173", name:"Methylphenidate (Concerta/Ritalin)", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"M 1810 10 mg", name:"Methylphenidate", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"215", name:"Methylphenidate", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"K 101", name:"Methylphenidate", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"M 10", name:"Methylphenidate", schedule:"II", statute:"R.S. 40:967"},
    {imprint:"M 20", name:"Methylphenidate", schedule:"II", statute:"R.S. 40:967"}
];
  const norm = s => (s||"").toUpperCase().replace(/[^A-Z0-9]/g,"");
  function filterImprints(prefix){
    const n = norm(prefix);
    if(n.length<2) return [];
    return QUICK_IMPRINTS.filter(x => norm(x.imprint).startsWith(n)).slice(0,50);
  }

  // unified query (replaces separate imprint/name boxes)
  const [query,setQuery]=React.useState("");
  const [selected,setSelected]=React.useState([]);

  function addSelected(item){ setSelected(list=>[...list, item]); }
  function removeSelected(idx){ setSelected(list=>list.filter((_,i)=>i!==idx)); }

  function openPillIdentifier(){
    if(!query.trim()) return;
    const url = "https://www.drugs.com/imprints.php?imprint=" + encodeURIComponent(query.trim());
    window.open(url, "_blank", "noopener");
  }

  // Name hits from QUICK_PILL_DB (prefix/contains match)
  function nameMatches(q){
    const s = (q||"").trim().toLowerCase();
    if(s.length<2) return [];
    const results = [];
    for(const [key,val] of Object.entries(QUICK_PILL_DB)){
      if(key.includes(s) || (val.aka||[]).some(a=>a.toLowerCase().includes(s))){
        results.push({imprint:key.toUpperCase(), name:key, schedule:val.schedule, statute:val.statute, source:"name"});
      }
    }
    return results.slice(0,50);
  }

  return React.createElement("div",{className:"section"},
    React.createElement(Box,{title:""},
      React.createElement(Row,{label:"Imprint or Name"},
        React.createElement("input",{className:"input",placeholder:"e.g., M367, RP 10 325, Xanax, Suboxone",value:query,onChange:e=>setQuery(e.target.value)})
      ),
      (function(){
        const imHits = filterImprints(query);
        const nmHits = nameMatches(query);
        const hasHits = imHits.length>0 || nmHits.length>0;
        if(!hasHits) return null;
        return React.createElement("div",{className:"card", style:{marginTop:"8px"}},
          React.createElement("div",{className:"small muted"},"Matches:"),
          imHits.length>0 && React.createElement("div",null,
            React.createElement("div",{className:"xsmall muted",style:{margin:"6px 0 2px"}}, "Imprints"),
            React.createElement("div",{style:{maxHeight:"140px",overflowY:"auto", borderBottom:"1px solid #eee", paddingBottom:"6px"}},
              imHits.map((x,i)=>(function(){
                const sc=(x.schedule||"").toString().toUpperCase().replace(/[^A-Z0-9]/g,"");
                return React.createElement("div",{key:"i"+i,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0"}},
                  React.createElement("div",null,
                    React.createElement("div",{className:"small"},
                      React.createElement("strong",null,x.imprint),
                      React.createElement("span",{className:"pill-badge schedule-"+(sc||"NA")}, x.schedule||"—")
                    ),
                    React.createElement("div",{className:"xsmall muted"}, x.name)
                  ),
                  React.createElement("div",{style:{display:"flex",gap:"6px"}},
                    React.createElement("button",{className:"btn",onClick:()=>{addSelected(x);}}, "Select")
                  )
                );
              })())
            )
          ),
          nmHits.length>0 && React.createElement("div",null,
            React.createElement("div",{className:"xsmall muted",style:{margin:"6px 0 2px"}}, "Names"),
            React.createElement("div",{style:{maxHeight:"140px",overflowY:"auto"}},
              nmHits.map((x,i)=>(function(){
                const sc=(x.schedule||"").toString().toUpperCase().replace(/[^A-Z0-9]/g,"");
                return React.createElement("div",{key:"n"+i,style:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0"}},
                  React.createElement("div",null,
                    React.createElement("div",{className:"small"},
                      React.createElement("strong",null,x.name.toUpperCase()),
                      React.createElement("span",{className:"pill-badge schedule-"+(sc||"NA")}, x.schedule||"—")
                    ),
                    React.createElement("div",{className:"xsmall muted"}, (x.imprint||"").toString())
                  ),
                  React.createElement("div",{style:{display:"flex",gap:"6px"}},
                    React.createElement("button",{className:"btn",onClick:()=>{addSelected(x);}}, "Select")
                  )
                );
              })())
            )
          ),
          React.createElement("div",{className:"xsmall muted",style:{marginTop:"6px"}},
            "Legend: ",
            React.createElement("span",{className:"pill-badge schedule-II"},"II"), " = Schedule II, ",
            React.createElement("span",{className:"pill-badge schedule-III"},"III"), " = Schedule III, ",
            React.createElement("span",{className:"pill-badge schedule-IV"},"IV"), " = Schedule IV, ",
            React.createElement("span",{className:"pill-badge schedule-V"},"V"), " = Schedule V, ",
            React.createElement("span",{className:"pill-badge schedule-NOTCONTROLLED"},"NC"), " = Not controlled"
          )
        );
      })(),
      React.createElement("div",{className:"navrow"},  React.createElement("button",{className:"btn",style:{flex:1},onClick:openPillIdentifier,disabled:!query.trim()},"Search PillIdentifier.com"),  React.createElement("button",{className:"btn danger",style:{flex:1},    onClick:()=>{ if(confirm("Are you sure you want to clear all selected pills and the search field?")){ setSelected([]); setQuery(""); } },    disabled:(selected.length===0 && !query.trim())  },"Clear All")),
      (function(){
        const hit = findScheduleByName(query);
        if(!hit) return React.createElement("div",{className:"small muted", style:{marginTop:"8px"}},"");
        const s = statuteLink(hit.statute||"");
        return React.createElement("div",{className:"card", style:{marginTop:"8px"}},
          React.createElement("div",{className:"small"}, React.createElement("strong",null, (query||"").toUpperCase()), " — Schedule ", hit.schedule),
          React.createElement("div",{className:"small"}, React.createElement("strong",null,"Statute: "), (hit.statute && hit.statute!=="—" ? React.createElement("a",{className:"lawlink",href:s.url,target:"_blank",rel:"noopener"}, s.label) : "—")),
          React.createElement("div",{className:"small muted"},"Verify with the external Pill Identifier page.")
        );
      })()
    ),
    // Bottom section — cumulative selected pills
    (function(){
      if(selected.length===0) return null;
      return React.createElement(Box,{title:"", subtitle:"All items you selected"},
        React.createElement("div",null,
          selected.map((x,idx)=>{
            const sc=(x.schedule||"").toString().toUpperCase().replace(/[^A-Z0-9]/g,"");
            const s = statuteLink(x.statute||"");
            return React.createElement("div",{key:idx,className:"card",style:{
            marginBottom:"6px",
            border:"2px solid #1f4db8",
            background:"#e8efff",
            borderRadius:"14px",
            boxShadow:"0 4px 10px rgba(31,77,184,0.15)",
            padding:"10px 14px"
            
}},


              React.createElement("div",{className:"small"},
                React.createElement("strong",null, x.imprint || x.name.toUpperCase()), x.imprint? " — "+x.name : "",
                React.createElement("span",{className:"pill-badge schedule-"+(sc||"NA"), style:{marginLeft:"8px"}}, x.schedule||"—")
              ),
              React.createElement("div",{className:"xsmall"}, "Statute: ", (x.statute && x.statute!=="—" ? React.createElement("a",{className:"lawlink",href:s.url,target:"_blank",rel:"noopener"}, s.label) : "—")),
              React.createElement("div",{className:"navrow"},
                React.createElement("button",{className:"btn ghost",onClick:()=>removeSelected(idx)}, "Remove")
              )
            );
          })
        )
      );
    })()
  );
}





// Add quick schedule panel below
      // (appended in the same component)
    

/* ---------- Error Boundary ---------- */
    class ErrorBoundary extends React.Component {
      constructor(props){ super(props); this.state={hasError:false,error:null}; }
      static getDerivedStateFromError(error){ return {hasError:true,error}; }
      componentDidCatch(error, info){ console.error("UI error:", error, info); }
      render(){
        if(this.state.hasError){
          return h(
            "div",
            {className:"card", style:{border:"1px solid #fca5a5",background:"#fff1f2",color:"#991b1b",borderRadius:"12px",padding:"12px"}},
            h("div", {className:"small", style:{fontWeight:700}}, "Something went wrong rendering this step."),
            h("div", {className:"small"}, String(this.state.error||"Unknown error"))
          );
        }
        return this.props.children;
      }
    }

    /* ---------- App ---------- */

    function NarcoticsTab({activeVersion}){
      const [showPill,setShowPill]=React.useState(false);
      React.useEffect(()=>{ setShowPill(false); }, [activeVersion]);
      return h("div",null,
        h("div",{className:"card",style:{padding:"16px"}},
          h("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"8px"}},
            h("h3",{style:{margin:0}},"Pill Identification"),
            h("button",{className:"btn",onClick:()=>setShowPill(v=>!v)}, showPill?"Hide":"Show")
          ),
          showPill ? h(PillLookup) : null
        )
      );
    }


function App(){
      const [tab,setTab]=React.useState("stop");
      const [narcoticsVer,setNarcoticsVer]=React.useState(0);
      return h("div",null,
        h("div",{className:"tabs"},
          
          h("button",{className:"btn "+(tab==="stop"?"active":""),onClick:()=>setTab("stop")},"Traffic Stop"),
          h("button",{className:"btn "+(tab==="narcotics"?"active":""),onClick:()=>{if(tab!=="narcotics") setNarcoticsVer(v=>v+1); setTab("narcotics");}},"Narcotics"),
          h("button",{className:"btn "+(tab==="domestic"?"active":""),onClick:()=>setTab("domestic")},"Domestic Abuse"),
          ),
        
        tab==="stop" ? h(StopInteractive) : null,
        tab==="domestic" ? h(DomesticAbuseInteractive) : null,
        tab==="narcotics" ? h(NarcoticsTab,{activeVersion:narcoticsVer}) : null,
        
        
      );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(h(ErrorBoundary,null,h(App)));
  })();
  
/* --- LEGACY SCRIPT BLOCK 2 END --- */
