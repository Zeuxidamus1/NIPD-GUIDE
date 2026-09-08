const ITEMS = ["Scales", "Baggies", "Pipes", "Evidence of distribution", "Other"];

const LINKS = {
  definitions: "https://www.legis.la.gov/legis/Law.aspx?d=96972",
  factors: "https://www.legis.la.gov/legis/Law.aspx?d=96973",
  prohibitedActs: "https://www.legis.la.gov/legis/Law.aspx?d=409441",
  defenses: "https://www.legis.la.gov/legis/Law.aspx?d=410560",
  penalties: "https://www.legis.la.gov/legis/Law.aspx?d=410561",
  marijuana: "https://legis.la.gov/Legis/law.aspx?d=98880",
  classifications: "https://legis.la.gov/Legis/Law.aspx?d=78337&p=y",
};

const state = {
  selected: new Set(),
  otherDetails: "",
  personalUse: null,
  priorCount: null,
  completed: false,
};

function cardTitle(card) {
  return card?.querySelector(":scope > h3")?.textContent.trim() || "";
}

function link(label, href) {
  const anchor = document.createElement("a");
  anchor.className = "lawlink";
  anchor.href = href;
  anchor.target = "_blank";
  anchor.rel = "noopener noreferrer";
  anchor.textContent = label;
  return anchor;
}

function resetState() {
  state.selected.clear();
  state.otherDetails = "";
  state.personalUse = null;
  state.priorCount = null;
  state.completed = false;
}

function findSummaryCard() {
  return [...document.querySelectorAll("#root .card")].find(
    (item) => cardTitle(item) === "Summary",
  );
}

function findMarijuanaCard(summary) {
  if (!summary) return null;
  return [...summary.querySelectorAll(".card")].find(
    (item) => item.querySelector(":scope > .small")?.textContent.trim() === "Marijuana",
  );
}

function marijuanaGrams(summary) {
  const card = findMarijuanaCard(summary);
  const weight = [...(card?.querySelectorAll(":scope > .small") || [])].find((item) =>
    item.textContent.trim().startsWith("Weight (g):"),
  );
  const match = weight?.textContent.match(/Weight \(g\):\s*([0-9]+(?:\.[0-9]+)?)/);
  return match ? Number(match[1]) : null;
}

function validationMessage(step) {
  if (!state.selected.size) return "";
  if (state.selected.has("Other") && !state.otherDetails.trim()) {
    return "Enter details for Other before continuing.";
  }
  if (state.personalUse === null) {
    return "Choose whether the marijuana-only personal-use penalty applies.";
  }
  if (state.priorCount === null) {
    return "Select the number of qualifying prior convictions.";
  }
  const summary = step.nextElementSibling?.querySelector(".summary-wrap");
  if (state.selected.has("Evidence of distribution") && marijuanaGrams(summary) === null) {
    return "Return to Weights and enter the marijuana weight so the correct distribution subsection can be shown.";
  }
  return "";
}

function updateQuestion(step) {
  step.querySelectorAll("[data-paraphernalia-item]").forEach((button) => {
    const selected = state.selected.has(button.dataset.paraphernaliaItem);
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  const otherWrap = step.querySelector("[data-paraphernalia-other-wrap]");
  const otherInput = step.querySelector("[data-paraphernalia-other]");
  const showOther = state.selected.has("Other");
  otherWrap.hidden = !showOther;
  otherInput.required = showOther;
  if (otherInput.value !== state.otherDetails) otherInput.value = state.otherDetails;

  step.querySelector("[data-paraphernalia-followups]").hidden = state.selected.size === 0;

  step.querySelectorAll("[data-personal-use]").forEach((button) => {
    const selected = state.personalUse === (button.dataset.personalUse === "yes");
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  step.querySelectorAll("[data-paraphernalia-priors]").forEach((button) => {
    const selected = state.priorCount === Number(button.dataset.paraphernaliaPriors);
    button.classList.toggle("active", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  const message = validationMessage(step);
  step.querySelector("[data-paraphernalia-validation]").textContent = message;
  step.querySelector("[data-paraphernalia-continue]").disabled = Boolean(message);
}

function buildQuestion(summaryCard) {
  const step = document.createElement("div");
  step.className = "card marijuana-paraphernalia-step";
  step.dataset.marijuanaParaphernalia = "question";
  step.innerHTML = `
    <h3>Marijuana — Paraphernalia</h3>
    <p class="small muted marijuana-paraphernalia-step__intro">Document the items located before reviewing the final charges.</p>

    <fieldset class="marijuana-paraphernalia">
      <legend class="marijuana-paraphernalia__legend">Was drug paraphernalia located?</legend>
      <p id="marijuana-paraphernalia-help" class="small muted marijuana-paraphernalia__help">Select all that apply. Leave blank if none was located.</p>
      <div class="pills marijuana-paraphernalia__options">
        ${ITEMS.map((item) => `<button type="button" class="pill toggle" data-paraphernalia-item="${item}" aria-pressed="false" aria-describedby="marijuana-paraphernalia-help">${item}</button>`).join("")}
      </div>
      <label class="marijuana-paraphernalia__other" data-paraphernalia-other-wrap hidden>
        <strong class="small">Other details</strong>
        <input class="input" type="text" autocomplete="off" placeholder="Describe the paraphernalia located" data-paraphernalia-other>
      </label>
    </fieldset>

    <div class="marijuana-paraphernalia__followups" data-paraphernalia-followups hidden>
      <fieldset class="marijuana-paraphernalia marijuana-paraphernalia--secondary">
        <legend class="marijuana-paraphernalia__legend">Does the marijuana-only personal-use penalty apply?</legend>
        <p id="marijuana-personal-use-help" class="small muted marijuana-paraphernalia__help">Choose Yes only when the paraphernalia was intended for or used solely to introduce marijuana into the body and did not exceed individual personal use. <a class="lawlink" href="${LINKS.penalties}" target="_blank" rel="noopener noreferrer">R.S. 40:1025(E)</a></p>
        <div class="pills">
          <button type="button" class="pill toggle" data-personal-use="yes" aria-pressed="false" aria-describedby="marijuana-personal-use-help">Yes</button>
          <button type="button" class="pill toggle" data-personal-use="no" aria-pressed="false" aria-describedby="marijuana-personal-use-help">No</button>
        </div>
      </fieldset>

      <fieldset class="marijuana-paraphernalia marijuana-paraphernalia--secondary">
        <legend class="marijuana-paraphernalia__legend">Qualifying prior paraphernalia convictions</legend>
        <p id="marijuana-paraphernalia-priors-help" class="small muted marijuana-paraphernalia__help">Use qualifying priors after applying the limited two-year predicate rule in <a class="lawlink" href="${LINKS.penalties}" target="_blank" rel="noopener noreferrer">R.S. 40:1025(A)(2)</a>.</p>
        <div class="pills">
          <button type="button" class="pill toggle" data-paraphernalia-priors="0" aria-pressed="false" aria-describedby="marijuana-paraphernalia-priors-help">0</button>
          <button type="button" class="pill toggle" data-paraphernalia-priors="1" aria-pressed="false" aria-describedby="marijuana-paraphernalia-priors-help">1</button>
          <button type="button" class="pill toggle" data-paraphernalia-priors="2" aria-pressed="false" aria-describedby="marijuana-paraphernalia-priors-help">2+</button>
        </div>
      </fieldset>
    </div>

    <p class="small marijuana-paraphernalia__reference">Confirm that each object qualifies under <a class="lawlink" href="${LINKS.definitions}" target="_blank" rel="noopener noreferrer">R.S. 40:1021</a> and the factors in <a class="lawlink" href="${LINKS.factors}" target="_blank" rel="noopener noreferrer">R.S. 40:1022</a>, and review the exclusions and defenses in <a class="lawlink" href="${LINKS.defenses}" target="_blank" rel="noopener noreferrer">R.S. 40:1024</a>.</p>
    <p class="small marijuana-paraphernalia__validation" data-paraphernalia-validation aria-live="polite"></p>
    <div class="navrow">
      <button type="button" class="btn ghost" style="flex:1" data-paraphernalia-back>Back to Weights</button>
      <button type="button" class="btn" style="flex:1" data-paraphernalia-continue>Review Charges</button>
    </div>
  `;

  step.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.paraphernaliaItem) {
      const item = button.dataset.paraphernaliaItem;
      const willSelect = !state.selected.has(item);
      if (willSelect) state.selected.add(item);
      else state.selected.delete(item);
      updateQuestion(step);
      if (item === "Other" && willSelect) {
        requestAnimationFrame(() => step.querySelector("[data-paraphernalia-other]")?.focus());
      }
      return;
    }
    if (button.dataset.personalUse) {
      state.personalUse = button.dataset.personalUse === "yes";
      updateQuestion(step);
      return;
    }
    if (button.dataset.paraphernaliaPriors) {
      state.priorCount = Number(button.dataset.paraphernaliaPriors);
      updateQuestion(step);
      return;
    }
    if (button.dataset.paraphernaliaBack !== undefined) {
      summaryCard.hidden = false;
      [...summaryCard.querySelectorAll("button")]
        .find((item) => item.textContent.trim() === "Back to Weights")
        ?.click();
      return;
    }
    if (button.dataset.paraphernaliaContinue !== undefined && !validationMessage(step)) {
      state.completed = true;
      step.remove();
      summaryCard.hidden = false;
      renderChargeSummary(summaryCard.querySelector(".summary-wrap"));
      summaryCard.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  step.querySelector("[data-paraphernalia-other]").addEventListener("input", (event) => {
    state.otherDetails = event.target.value;
    updateQuestion(step);
  });

  updateQuestion(step);
  return step;
}

function penaltyResult() {
  if (state.personalUse) {
    return {
      grade: "Misdemeanor",
      penalty: ["$100 fine", "$500 fine", "$2,500 fine"][state.priorCount],
      citation: "R.S. 40:1025(E)",
    };
  }
  if (state.priorCount === 0) {
    return {
      grade: "Misdemeanor",
      penalty: "Fine up to $300, imprisonment up to 15 days, or both",
      citation: "R.S. 40:1025(A)",
    };
  }
  if (state.priorCount === 1) {
    return {
      grade: "Misdemeanor",
      penalty: "Fine up to $1,000, imprisonment up to 6 months, or both",
      citation: "R.S. 40:1025(B)",
    };
  }
  return {
    grade: "Felony",
    penalty: "Fine up to $2,500, imprisonment with or without hard labor up to 2 years, or both",
    citation: "R.S. 40:1025(C)",
  };
}

function line(label, value) {
  const row = document.createElement("div");
  row.className = "small";
  const name = document.createElement("strong");
  name.textContent = `${label}: `;
  row.appendChild(name);
  row.append(value);
  return row;
}

function gradeNode(grade, citation) {
  const fragment = document.createDocumentFragment();
  const badge = document.createElement("span");
  badge.className = `marijuana-charge-grade is-${grade.toLowerCase()}`;
  badge.textContent = grade;
  fragment.append(badge, " · ", link(citation, LINKS.penalties));
  return fragment;
}

function renderParaphernaliaCharge(summary) {
  summary.querySelector("[data-marijuana-paraphernalia='summary']")?.remove();
  const section = document.createElement("section");
  section.className = "marijuana-paraphernalia-summary";
  section.dataset.marijuanaParaphernalia = "summary";
  section.innerHTML = '<div class="hr"></div><h3>Drug Paraphernalia Charge</h3>';

  if (!state.selected.size) {
    const empty = document.createElement("div");
    empty.className = "small muted";
    empty.textContent = "No paraphernalia charge indicated.";
    section.appendChild(empty);
  } else {
    const result = penaltyResult();
    const charge = document.createElement("div");
    charge.className = "card marijuana-charge-card";
    const items = [...state.selected].map((item) =>
      item === "Other" ? `Other — ${state.otherDetails.trim()}` : item,
    );
    charge.append(
      line("Charge", "Use or possession with intent to use drug paraphernalia"),
      line("Statute", link("R.S. 40:1023(C)", LINKS.prohibitedActs)),
      line("Grade", gradeNode(result.grade, result.citation)),
      line("Penalty", result.penalty),
      line("Items documented", items.join(", ")),
    );
    const note = document.createElement("p");
    note.className = "small muted marijuana-charge-card__note";
    note.append(
      "Grade follows Louisiana's hard-labor definition in ",
      link("R.S. 14:2(A)(4) and (6)", LINKS.classifications),
      ". Confirm statutory elements, exclusions, and defenses before charging.",
    );
    charge.appendChild(note);
    section.appendChild(charge);
  }

  const firearmHeading = [...summary.querySelectorAll(":scope > h3")].find(
    (item) => item.textContent.trim() === "Firearm-Related Charges",
  );
  const insertionPoint = firearmHeading?.previousElementSibling || summary.querySelector(":scope > .navrow");
  summary.insertBefore(section, insertionPoint || null);
}

function renderDistributionCharge(summary) {
  summary.querySelector("[data-marijuana-distribution-charge]")?.remove();
  const original = findMarijuanaCard(summary);
  if (!original) return;
  original.hidden = false;
  if (!state.selected.has("Evidence of distribution")) return;

  const grams = marijuanaGrams(summary);
  if (grams === null) return;
  original.hidden = true;

  const subsection = grams >= 1134
    ? "R.S. 40:966(A)(1) and (B)(2)(b)"
    : "R.S. 40:966(A)(1) and (B)(2)(a)";
  const charge = document.createElement("div");
  charge.className = "card marijuana-charge-card";
  charge.dataset.marijuanaDistributionCharge = "true";

  const title = document.createElement("div");
  title.className = "small";
  const strong = document.createElement("strong");
  strong.textContent = "Marijuana — Possession with intent to distribute";
  title.appendChild(strong);

  const badge = document.createElement("span");
  badge.className = "marijuana-charge-grade is-felony";
  badge.textContent = "Felony";
  charge.append(
    title,
    line("Weight (g)", String(grams)),
    line("Statute", link(subsection, LINKS.marijuana)),
    line("Grade", badge),
    line("Charging note", "Evidence of distribution was selected; confirm the facts establish intent to distribute."),
  );
  original.after(charge);
}

function renderChargeSummary(summary) {
  const signature = JSON.stringify({
    selected: [...state.selected],
    otherDetails: state.otherDetails,
    personalUse: state.personalUse,
    priorCount: state.priorCount,
    grams: marijuanaGrams(summary),
  });
  if (summary.dataset.marijuanaChargeSignature === signature) return;

  renderDistributionCharge(summary);
  renderParaphernaliaCharge(summary);
  summary.dataset.marijuanaChargeSignature = signature;
}

function enhanceSummary() {
  const summaryCard = findSummaryCard();
  document.querySelectorAll("#root [data-marijuana-paraphernalia='question']").forEach((question) => {
    if (!summaryCard || question.nextElementSibling !== summaryCard) question.remove();
  });
  if (!summaryCard) return;

  const summary = summaryCard.querySelector(".summary-wrap");
  if (!summary || !findMarijuanaCard(summary)) {
    summaryCard.hidden = false;
    return;
  }

  if (!state.completed) {
    summaryCard.hidden = true;
    let question = summaryCard.previousElementSibling;
    if (question?.dataset.marijuanaParaphernalia !== "question") {
      question = buildQuestion(summaryCard);
      summaryCard.before(question);
    }
    updateQuestion(question);
    return;
  }

  const question = summaryCard.previousElementSibling;
  if (question?.dataset.marijuanaParaphernalia === "question") question.remove();
  summaryCard.hidden = false;
  renderChargeSummary(summary);
}

let framePending = false;
function scheduleEnhancement() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => {
    framePending = false;
    enhanceSummary();
  });
}

const root = document.querySelector("#root");
if (root) {
  root.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const title = cardTitle(button.closest(".card"));
    const label = button.textContent.trim();
    const deselectingMarijuana =
      title === "Select all narcotics located" &&
      label === "Marijuana" &&
      button.classList.contains("active");

    if (deselectingMarijuana || (title === "Summary" && label === "Start Over")) {
      resetState();
    } else if (title === "Summary" && label === "Back to Weights") {
      state.completed = false;
    }
  });

  new MutationObserver(scheduleEnhancement).observe(root, { childList: true, subtree: true });
  scheduleEnhancement();
}
