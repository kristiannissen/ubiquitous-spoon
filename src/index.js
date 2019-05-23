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

import React from "react";
import { render } from "react-dom";

import Calculator from "./app/calculator";

const App = () => (
  <div>
    <Calculator />
  </div>
);

render(<App />, document.getElementById("root"));
