/**
 * @file index.js
 */
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(
        () => {},
        err => console.log("ServiceWorker registration failed: ", err)
      );
  });
}
/**
 * React app
 */
import React from "react";
import { render } from "react-dom";

const App = (props) => (
  <div className="mdl-layout mdl-js-layout is-upgraded">
        <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--12-col">Hello</div>
        </div>
    </div>
);

const root = document.getElementById("root");
root.classList.add("mdl-layout__container");

render(<App />, root);
