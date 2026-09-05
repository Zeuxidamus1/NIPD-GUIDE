const TOOL_ACTIONS = [
  {
    title: "Traffic Stop",
    description: "Traffic violations, controlled substances, firearms, and stop-specific case law.",
    keywords: "vehicle title 32 drugs weapons passengers",
    run: () => activateTab("Traffic Stop"),
  },
  {
    title: "Narcotics",
    description: "Pill identification, schedules, statutes, and drug-slang reference.",
    keywords: "pills imprint schedule controlled substances drug slang",
    run: () => activateTab("Narcotics"),
  },
  {
    title: "Domestic Abuse",
    description: "Relationship, incident, evidence, protective-order, and statute guidance.",
    keywords: "dating partner household battery protective order evidence",
    run: () => activateTab("Domestic Abuse"),
  },
  {
    title: "Case Law",
    description: "Search the case-law library and open the legal reference directory.",
    keywords: "cases precedent supreme court Louisiana fourth amendment",
    run: () => openCaseLaw(),
  },
  {
    title: "Identifying Passengers",
    description: "Open the passenger-identification legal memorandum.",
    keywords: "traffic stop passenger id identification hiibel brendlin",
    run: () => {
      activateTab("Traffic Stop");
      window.setTimeout(() => window.buildIdentModal?.(), 80);
    },
  },
];

const searchState = { opener: null, activeIndex: 0, results: [] };

function normalize(value) {
  return String(value || "").toLocaleLowerCase().replace(/\s+/g, " ").trim();
}

function activateTab(label) {
  const button = [...document.querySelectorAll(".tabs .btn")].find(
    (item) => normalize(item.textContent) === normalize(label),
  );
  button?.click();
  document.querySelector("#root")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function openCaseLaw(query = "") {
  if (typeof window.__openCaseLawModalV3 === "function") {
    window.__openCaseLawModalV3();
  } else if (typeof window.__openCaseLawModal === "function") {
    window.__openCaseLawModal();
  } else {
    document.querySelector("#clx-open-btn")?.click();
  }

  if (query) {
    window.setTimeout(() => {
      const input = document.querySelector(".cl2-input");
      if (!input) return;
      input.value = query;
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    }, 140);
  }
}

function openCaseLawEntry(item, opener = document.activeElement) {
  document.querySelector(".case-detail-backdrop")?.remove();

  const backdrop = document.createElement("div");
  backdrop.className = "case-detail-backdrop";
  backdrop.innerHTML = `
    <article class="case-detail" role="dialog" aria-modal="true" aria-labelledby="case-detail-title">
      <header class="case-detail__header">
        <div>
          <p>Case law reference</p>
          <h2 id="case-detail-title"></h2>
        </div>
        <button type="button" aria-label="Close case-law entry">Close</button>
      </header>
      <dl class="case-detail__body"></dl>
    </article>
  `;

  backdrop.querySelector("h2").textContent = item.title || item.citation || "Case law entry";
  const body = backdrop.querySelector(".case-detail__body");
  const fields = [
    ["Citation", item.citation],
    ["Jurisdiction", item.jurisdiction],
    ["Topic", item.category || item.topic],
    ["Rule", item.rule],
    ["Practical takeaway", item.takeaway],
    ["Comment", item.comment],
    ["Source citation", item.source_cite],
  ];

  fields.forEach(([label, value]) => {
    if (!value) return;
    const group = document.createElement("div");
    const term = document.createElement("dt");
    const detail = document.createElement("dd");
    term.textContent = label;
    detail.textContent = value;
    group.append(term, detail);
    body.appendChild(group);
  });

  const close = () => {
    backdrop.remove();
    document.documentElement.classList.remove("has-modal");
    opener?.focus?.();
  };
  backdrop.querySelector("button").addEventListener("click", close);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) close();
  });
  backdrop.addEventListener("keydown", (event) => {
    if (event.key === "Escape") close();
  });

  document.body.appendChild(backdrop);
  document.documentElement.classList.add("has-modal");
  requestAnimationFrame(() => backdrop.querySelector("button").focus());
}

function caseLawActions() {
  const cases = Array.isArray(window.__CASELAW_LA__) ? window.__CASELAW_LA__ : [];
  return cases.map((item) => ({
    title: item.title || item.citation || "Case law entry",
    description: [item.citation, item.category || item.topic].filter(Boolean).join(" · "),
    keywords: [item.title, item.citation, item.category, item.topic, item.rule, item.takeaway, item.comment]
      .filter(Boolean)
      .join(" "),
    type: "Case law",
    run: () => openCaseLawEntry(item),
  }));
}

function buildSearch() {
  const wrapper = document.createElement("div");
  wrapper.className = "guide-search";
  wrapper.hidden = true;
  wrapper.innerHTML = `
    <div class="guide-search__panel" role="dialog" aria-modal="true" aria-labelledby="guide-search-title">
      <div class="guide-search__topline">
        <div>
          <p class="guide-search__eyebrow">Quick find</p>
          <h2 id="guide-search-title">Search the guide</h2>
        </div>
        <button class="guide-search__close" type="button" aria-label="Close search">Close</button>
      </div>
      <label class="guide-search__field">
        <span class="sr-only">Search tools, cases, citations, and topics</span>
        <input type="search" autocomplete="off" placeholder="Search tools, cases, citations, and topics…" />
        <kbd>Esc</kbd>
      </label>
      <div class="guide-search__meta" aria-live="polite"></div>
      <div class="guide-search__results" role="listbox" aria-label="Search results"></div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const input = wrapper.querySelector("input");
  const results = wrapper.querySelector(".guide-search__results");
  const meta = wrapper.querySelector(".guide-search__meta");

  function getMatches(query) {
    const entries = [
      ...TOOL_ACTIONS.map((item) => ({ ...item, type: "Guide tool" })),
      ...caseLawActions(),
    ];
    const term = normalize(query);
    if (!term) return entries.slice(0, 5);
    const words = term.split(" ");
    return entries
      .map((entry) => {
        const haystack = normalize(`${entry.title} ${entry.description} ${entry.keywords}`);
        const score = words.reduce((total, word) => total + (haystack.includes(word) ? 1 : 0), 0);
        const titleBoost = normalize(entry.title).includes(term) ? 3 : 0;
        return { entry, score: score + titleBoost };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title))
      .slice(0, 40)
      .map((item) => item.entry);
  }

  function render() {
    searchState.results = getMatches(input.value);
    searchState.activeIndex = Math.min(searchState.activeIndex, Math.max(searchState.results.length - 1, 0));
    meta.textContent = input.value
      ? `${searchState.results.length} result${searchState.results.length === 1 ? "" : "s"}`
      : "Start with a guide tool or search the case-law library.";
    results.replaceChildren();

    if (!searchState.results.length) {
      const empty = document.createElement("div");
      empty.className = "guide-search__empty";
      empty.textContent = "No matching tool, case, citation, or topic was found.";
      results.appendChild(empty);
      return;
    }

    searchState.results.forEach((entry, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "guide-search__result";
      button.setAttribute("role", "option");
      button.setAttribute("aria-selected", String(index === searchState.activeIndex));
      button.innerHTML = `
        <span class="guide-search__result-main">
          <strong></strong>
          <span></span>
        </span>
        <span class="guide-search__type"></span>
      `;
      button.querySelector("strong").textContent = entry.title;
      button.querySelector(".guide-search__result-main > span").textContent = entry.description || "Open reference";
      button.querySelector(".guide-search__type").textContent = entry.type;
      button.addEventListener("mouseenter", () => {
        searchState.activeIndex = index;
        updateActiveResult();
      });
      button.addEventListener("click", () => selectResult(index));
      results.appendChild(button);
    });
  }

  function updateActiveResult() {
    [...results.querySelectorAll(".guide-search__result")].forEach((item, index) => {
      item.setAttribute("aria-selected", String(index === searchState.activeIndex));
    });
  }

  function selectResult(index) {
    const result = searchState.results[index];
    if (!result) return;
    closeSearch();
    result.run();
  }

  function openSearch(opener, initialQuery = "") {
    searchState.opener = opener || document.activeElement;
    searchState.activeIndex = 0;
    wrapper.hidden = false;
    document.documentElement.classList.add("has-modal");
    input.value = initialQuery;
    render();
    requestAnimationFrame(() => input.focus());
  }

  function closeSearch() {
    if (wrapper.hidden) return;
    wrapper.hidden = true;
    document.documentElement.classList.remove("has-modal");
    searchState.opener?.focus?.();
  }

  input.addEventListener("input", () => {
    searchState.activeIndex = 0;
    render();
  });
  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" && searchState.results.length) {
      event.preventDefault();
      searchState.activeIndex = (searchState.activeIndex + 1) % searchState.results.length;
      updateActiveResult();
      results.children[searchState.activeIndex]?.scrollIntoView({ block: "nearest" });
    }
    if (event.key === "ArrowUp" && searchState.results.length) {
      event.preventDefault();
      searchState.activeIndex = (searchState.activeIndex - 1 + searchState.results.length) % searchState.results.length;
      updateActiveResult();
      results.children[searchState.activeIndex]?.scrollIntoView({ block: "nearest" });
    }
    if (event.key === "Enter") {
      event.preventDefault();
      selectResult(searchState.activeIndex);
    }
  });
  wrapper.addEventListener("click", (event) => {
    if (event.target === wrapper) closeSearch();
  });
  wrapper.querySelector(".guide-search__close").addEventListener("click", closeSearch);

  return { openSearch, closeSearch, wrapper };
}

function enhanceCaseLawDirectory(openSearch) {
  const searchTerms = {
    "#ii-d": "probable cause arrest",
    "#iii-1": "criminal liability mental state",
    "#iii-1a": "specific intent",
    "#iii-1b": "general intent",
    "#iii-1c": "criminal negligence",
    "#iii-1d": "strict liability",
    "#iv-a": "search warrant",
    "#iv-b": "warrant exceptions",
    "#iv-b-1": "consent search",
    "#iv-b-2": "search incident arrest",
    "#iv-b-3": "automobile exception",
    "#iv-b-4": "plain view",
    "#iv-b-5": "exigent circumstances",
    "#iv-b-6": "inventory search",
    "#iv-b-7": "stop frisk Terry",
    "#vi-1": "probable cause determination 48 hour",
    "#vi-2": "initial appearance 72 hour",
    "#vi-3": "booking DNA collection",
  };

  document.querySelector("#clx-backdrop")?.addEventListener("click", (event) => {
    const link = event.target.closest("a.clx-sub");
    const query = link && searchTerms[link.getAttribute("href")];
    if (!query) return;

    event.preventDefault();
    document.querySelector("#clx-backdrop")?.classList.remove("show");
    document.querySelector("#clx-backdrop")?.setAttribute("aria-hidden", "true");
    openSearch(link, query);
  });
}

function enhanceHeader(openSearch) {
  const context = document.querySelector(".header-context");
  if (!context) return;
  const button = document.createElement("button");
  button.type = "button";
  button.className = "header-search";
  button.setAttribute("aria-haspopup", "dialog");
  button.innerHTML = `<span>Search guide</span><kbd>/</kbd>`;
  button.addEventListener("click", () => openSearch(button));
  context.replaceWith(button);
}

function enhanceModals() {
  let lastTrigger = null;
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("button, a");
    if (trigger) lastTrigger = trigger;
  }, true);

  const observer = new MutationObserver(() => {
    document.querySelectorAll(".cl2-modal, #levels-memo, .slang-modal").forEach((modal) => {
      if (modal.dataset.accessibleModal === "true") return;
      modal.dataset.accessibleModal = "true";
      modal.setAttribute("role", "dialog");
      modal.setAttribute("aria-modal", "true");
      const title = modal.querySelector("h2, h3, .ttl, .title");
      if (title) {
        title.id ||= `modal-title-${Math.random().toString(36).slice(2, 9)}`;
        modal.setAttribute("aria-labelledby", title.id);
      }
      modal.querySelectorAll("button").forEach((button) => {
        if (normalize(button.textContent) === "close") button.setAttribute("aria-label", "Close dialog");
      });
      requestAnimationFrame(() => modal.querySelector("input, button, a[href]")?.focus());
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const backdrop = document.querySelector("#ip-backdrop, #levels-memo-backdrop, .modal-backdrop");
    const close = backdrop?.querySelector("button[aria-label='Close dialog'], .x, .cl2-btn.ghost, .btn.ghost");
    if (close) {
      close.click();
      lastTrigger?.focus?.();
    }
  });
}

function secureExternalLinks() {
  const update = (root = document) => {
    root.querySelectorAll?.("a[href^='http']").forEach((link) => {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });
  };
  update();
  new MutationObserver((records) => {
    records.forEach((record) => record.addedNodes.forEach((node) => node.nodeType === 1 && update(node)));
  }).observe(document.body, { childList: true, subtree: true });
}

function normalizeCaseLawTrigger() {
  const button = document.querySelector("#tab-btn-caselaw-REMOVED");
  button?.classList.remove("active");
  button?.removeAttribute("aria-current");
}

normalizeCaseLawTrigger();
const search = buildSearch();
enhanceHeader(search.openSearch);
enhanceModals();
enhanceCaseLawDirectory(search.openSearch);
secureExternalLinks();

document.addEventListener("keydown", (event) => {
  const editing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName || "");
  if ((event.key === "/" && !editing) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k")) {
    event.preventDefault();
    search.openSearch(document.activeElement);
  }
  if (event.key === "Escape" && !search.wrapper.hidden) search.closeSearch();
});
