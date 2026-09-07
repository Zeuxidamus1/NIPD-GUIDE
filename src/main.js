import React from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";

window.React = React;
window.ReactDOM = { createRoot };

const root = document.querySelector("#root");

try {
  await import("./legacy/core-app.js");
  await import("./features/drug-slang.js");
  await import("./legal/case-law-library.js");
  await import("./legal/reference-library.js");
  await import("./legal/passenger-identification.js");
  await import("./features/interaction-compatibility.js");
  await import("./features/marijuana-paraphernalia.js");
  await import("./features/case-law-directory.js");
  await import("./legal/tactical-memos.js");
  await import("./ui/guide-shell.js");
  await import("./styles/runtime-overrides.css");
} catch (error) {
  console.error("NIPD guide failed to initialize:", error);
  if (root && !root.childElementCount) {
    root.innerHTML = `
      <section class="section app-error" role="alert">
        <h2>The reference guide could not load.</h2>
        <p>Refresh the page to try again.</p>
      </section>
    `;
  }
}
