/**
 * @file src/components/header.js
 */
import React, { useState } from "react";

const Header = props => {
  const [state, setState] = useState(false);

  let visible = state == false ? "" : "is-visible";

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
        <div
          className="mdl-layout__drawer-button"
          onClick={() => setState(false)}
        >
          <i className="material-icons">close</i>
        </div>
        <nav className="mdl-navigation">
          <a className="mdl-navigation__link" href="">
            Link
          </a>
        </nav>
      </div>
      <div
        className="mdl-layout__drawer-button"
        onClick={() => setState(state == false ? true : false)}
      >
        <i className="material-icons">menu</i>
      </div>
    </div>
  );
};

export default Header;
