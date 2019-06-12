/**
 * @file index.js
 *
 * ServiceWorker setup
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

import Projects from "./containers/projects";
import { ProjectContext, projects, DrawerContext, drawer } from "./context";
import Header from "./components/header";

const App = props => (
  <div className="mdl-layout mdl-js-layout is-upgraded">
    <DrawerContext.Provider value={drawer}>
      <Header />
    </DrawerContext.Provider>
    <main className="mdl-layout__content">
      <div className="mdl-grid page-content">
        <div className="mdl-cell mdl-cell--12-col">
          <ProjectContext.Provider value={projects}>
            <Projects />
          </ProjectContext.Provider>
        </div>
      </div>
    </main>
  </div>
);

const root = document.getElementById("root");
root.classList.add("mdl-layout__container");

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.log(error, info);
  }
  render() {
    if (this.state.hasError) {
      return <b>Something went wrong</b>;
    }
    return this.props.children;
  }
}

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
  root
);
