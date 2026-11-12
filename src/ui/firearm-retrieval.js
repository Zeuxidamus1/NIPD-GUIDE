import { createElement as h, useLayoutEffect, useRef, useState } from "react";

const steps = {
  stop: {
    title: "Is this a lawful traffic stop that is still in progress?",
    yes: "consent",
    no: "outside",
  },
  consent: {
    title: "Did someone with authority voluntarily consent to retrieving the firearm?",
    detail: "Permission must cover the entry and the area where you retrieve it. A disclosure alone gives no consent. Honor any limits or withdrawal.",
    yes: "permitted",
    no: "danger",
  },
  danger: {
    title: "Do specific facts support a reasonable belief that someone poses a danger?",
    detail: "Consider what you observed, such as a threat or repeated reaching toward the suspected weapon location. Disclosure and refusal alone do not establish dangerousness.",
    yes: "access",
    no: "denied",
  },
  access: {
    title: "Could that person gain immediate control of a weapon in the passenger compartment?",
    detail: "Consider their location, who remains in the vehicle, and whether the person may return to it during or after the detention. Possible access alone does not establish dangerousness.",
    yes: "protective",
    no: "denied",
  },
  outside: {
    title: "Do not retrieve under this guide",
    detail: "This workflow covers a lawful, ongoing traffic stop. Any entry outside that scenario requires its own lawful basis.",
  },
  denied: {
    title: "Do not retrieve on these facts",
    detail: "Without consent or facts supporting both danger and access, a protective entry is unjustified. Any retrieval would require a separate lawful basis.",
  },
  permitted: {
    title: "Retrieval permitted within the scope of consent",
    detail: "Limit the entry and retrieval to the permission actually given.",
  },
  protective: {
    title: "Limited protective retrieval permitted",
    detail: "Limit the search to passenger-compartment areas where a weapon could be located and that are relevant to the safety threat. Document the facts supporting danger, access, and the scope of the search.",
  },
};

export function FirearmRetrieval() {
  const [history, setHistory] = useState(["stop"]);
  const heading = useRef(null);
  const firstRender = useRef(true);
  const current = steps[history.at(-1)];

  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    heading.current.focus();
  }, [history]);

  function answer(next) {
    setHistory([...history, next]);
  }

  return h("section", { className: "card", "aria-labelledby": "firearm-retrieval-heading" },
    h("h3", { id: "firearm-retrieval-heading" }, "Firearm Retrieval"),
    h("h4", { ref: heading, tabIndex: -1 },
      current.yes ? `Step ${history.length}. ${current.title}` : current.title
    ),
    current.detail && h("p", null, current.detail),
    h("div", { className: "navrow", style: { flexWrap: "wrap" } },
      current.yes && h("button", { type: "button", className: "btn", onClick: () => answer(current.yes) }, "Yes"),
      current.no && h("button", { type: "button", className: "btn", onClick: () => answer(current.no) }, "No / Unsure"),
      history.length > 1 && h("button", { type: "button", className: "btn", onClick: () => setHistory(history.slice(0, -1)) }, "Back"),
      !current.yes && h("button", { type: "button", className: "btn", onClick: () => setHistory(["stop"]) }, "Start over")
    ),
    h("p", { className: "small" },
      h("a", { href: "https://www.govinfo.gov/content/pkg/USREPORTS-463/pdf/USREPORTS-463-1032.pdf", target: "_blank", rel: "noopener noreferrer" }, "Michigan v. Long"),
      " · ",
      h("a", { href: "https://www.ca5.uscourts.gov/Opinions/pub/24/24-11115-CR0.pdf", target: "_blank", rel: "noopener noreferrer" }, "United States v. Johnson"),
      " · ",
      h("a", { href: "https://www.lasc.org/opinions/2018/18-0981.KK.pc.pdf", target: "_blank", rel: "noopener noreferrer" }, "State v. Perique")
    )
  );
}
