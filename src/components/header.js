/**
 * @file src/components/header.js
 */
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Form from "./form";

const socket = io();

const Header = props => {
  const [drawerState, setDrawerState] = useState(false);

  let visible = drawerState == false ? "" : "is-visible";

  useEffect(() => {
    socket.on("project-edit", data => setDrawerState(true));
  }, []);

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
              onClick={() => setDrawerState(false)}
            >
              <i className="material-icons">close</i>
            </div>
          </div>
        </div>
        <div className="mdl-grid">
          <div className="mdl-cell mdl-cell--12-col">
            <Form />
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
        onClick={() => setDrawerState(drawerState == false ? true : false)}
      >
        <i className="material-icons">menu</i>
      </div>
    </div>
  );
};

export default Header;
