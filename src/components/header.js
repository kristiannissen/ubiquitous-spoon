/**
 * @file src/components/header.js
 */
import React, { useState } from "react";

// FIXME: should be pulled into a single import
import Form from "./form";

const Header = props => {
  const [drawerState, setState] = useState(false);
  const formFields = {
    name: {
      type: "text",
      label: "Your name",
      value: ""
    },
    startDate: {
      type: "date",
      label: "Start Date",
      value: ""
    },
    endDate: {
      type: "date",
      label: "End Date",
      value: ""
    }
  };
  let visible = drawerState == false ? "" : "is-visible";

  return (
    <div>
      <header className="mdl-layout__header mdl-layout__header--transparent">
        <div className="mdl-layout__header-row">
          <nav className="mdl-navigation">
            <a className="mdl-navigation__link" href="">
              Link
            </a>
          </nav>
        </div>
      </header>
      <div className={`mdl-layout__drawer ${visible}`}>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--2-col mdl-cell--10-offset">
            <div
              className="mdl-button mdl-js-button"
              onClick={() => setState(false)}
            >
              <i className="material-icons">close</i>
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <Form fields={formFields} action="project-upsert" />
          </div>
        </div>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="">
            Link
          </a>
        </nav>
      </div>
      <div
        className="mdl-layout__drawer-button"
        onClick={() => setState(drawerState == false ? true : false)}
      >
        <i className="material-icons">menu</i>
      </div>
    </div>
  );
};

export default Header;
