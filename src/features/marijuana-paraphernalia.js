const OPTIONS = [
  "Scales",
  "Baggies",
  "Pipes",
  "Evidence of distribution",
  "Other",
];

const QUESTION_ID = "marijuana-paraphernalia-question";
const HELP_ID = "marijuana-paraphernalia-help";
const OTHER_INPUT_ID = "marijuana-paraphernalia-other";
const state = {
  selected: new Set(),
  otherDetails: "",
};

function cardTitle(card) {
  return card?.querySelector(":scope > h3")?.textContent.trim() || "";
}

function resetState() {
  state.selected.clear();
  state.otherDetails = "";
}

function buildQuestion() {
  const fieldset = document.createElement("fieldset");
  fieldset.className = "marijuana-paraphernalia";
  fieldset.dataset.marijuanaParaphernalia = "question";

  const legend = document.createElement("legend");
  legend.id = QUESTION_ID;
  legend.className = "marijuana-paraphernalia__legend";
  legend.textContent = "Was drug paraphernalia located?";

  const help = document.createElement("p");
  help.id = HELP_ID;
  help.className = "small muted marijuana-paraphernalia__help";
  help.textContent = "Select all that apply.";

  const options = document.createElement("div");
  options.className = "pills marijuana-paraphernalia__options";

  OPTIONS.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "pill toggle";
    button.dataset.paraphernaliaOption = option;
    button.setAttribute("aria-pressed", "false");
    button.setAttribute("aria-describedby", HELP_ID);
    button.textContent = option;
    button.addEventListener("click", () => {
      const willSelect = !state.selected.has(option);
      if (willSelect) state.selected.add(option);
      else state.selected.delete(option);
      renderQuestion(fieldset);
      if (option === "Other" && willSelect) {
        requestAnimationFrame(() => fieldset.querySelector(`#${OTHER_INPUT_ID}`)?.focus());
      }
    });
    options.appendChild(button);
  });

  const other = document.createElement("label");
  other.className = "marijuana-paraphernalia__other";
  other.htmlFor = OTHER_INPUT_ID;
  other.hidden = true;

  const otherLabel = document.createElement("span");
  otherLabel.className = "small";
  otherLabel.innerHTML = "<strong>Other details</strong>";

  const input = document.createElement("input");
  input.id = OTHER_INPUT_ID;
  input.className = "input";
  input.type = "text";
  input.placeholder = "Describe the paraphernalia located";
  input.autocomplete = "off";
  input.addEventListener("input", () => {
    state.otherDetails = input.value;
  });

  other.append(otherLabel, input);
  fieldset.append(legend, help, options, other);
  renderQuestion(fieldset);
  return fieldset;
}

function renderQuestion(fieldset) {
  fieldset.querySelectorAll("[data-paraphernalia-option]").forEach((button) => {
    const active = state.selected.has(button.dataset.paraphernaliaOption);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });

  const other = fieldset.querySelector(".marijuana-paraphernalia__other");
  const input = fieldset.querySelector(`#${OTHER_INPUT_ID}`);
  const showOther = state.selected.has("Other");
  other.hidden = !showOther;
  input.value = state.otherDetails;
}

function enhanceWeightsStep() {
  const existingQuestions = [
    ...document.querySelectorAll("#root [data-marijuana-paraphernalia='question']"),
  ];
  const card = [...document.querySelectorAll("#root .card")].find(
    (item) => cardTitle(item) === "Enter Weights (grams)",
  );
  const marijuanaRow = [...(card?.querySelectorAll(".input-row") || [])].find(
    (row) => row.querySelector("label")?.textContent.trim() === "Marijuana",
  );

  existingQuestions.forEach((question) => {
    if (!card || !marijuanaRow || question.closest(".card") !== card) question.remove();
  });

  if (
    !card ||
    !marijuanaRow ||
    card.querySelector("[data-marijuana-paraphernalia='question']")
  ) return;

  marijuanaRow.after(buildQuestion());
}

function enhanceSummary() {
  const card = [...document.querySelectorAll("#root .card")].find(
    (item) => cardTitle(item) === "Summary",
  );
  const summary = card?.querySelector(".summary-wrap");
  if (!summary || summary.querySelector("[data-marijuana-paraphernalia='summary']")) return;

  const hasMarijuana = [...summary.querySelectorAll(":scope .card")].some(
    (item) => item.querySelector(".small")?.textContent.trim() === "Marijuana",
  );
  if (!hasMarijuana) return;

  const section = document.createElement("section");
  section.className = "marijuana-paraphernalia-summary";
  section.dataset.marijuanaParaphernalia = "summary";

  const divider = document.createElement("div");
  divider.className = "hr";

  const heading = document.createElement("h3");
  heading.textContent = "Drug Paraphernalia";

  const detail = document.createElement("div");
  detail.className = "small";
  if (!state.selected.size) {
    detail.classList.add("muted");
    detail.textContent = "None selected.";
  } else {
    const values = [...state.selected].map((option) => {
      if (option !== "Other") return option;
      const details = state.otherDetails.trim();
      return details ? `Other — ${details}` : "Other";
    });
    detail.textContent = values.join(", ");
  }

  section.append(divider, heading, detail);
  const actions = summary.querySelector(":scope > .navrow");
  summary.insertBefore(section, actions || null);
}

let framePending = false;
function scheduleEnhancement() {
  if (framePending) return;
  framePending = true;
  requestAnimationFrame(() => {
    framePending = false;
    enhanceWeightsStep();
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
    }
  });

  new MutationObserver(scheduleEnhancement).observe(root, { childList: true, subtree: true });
  scheduleEnhancement();
}
