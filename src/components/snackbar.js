/**
 * @file components/snackbar.js
 */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const SnackBar = props => {
  const [msg, setMessage] = useState("");

  useEffect(() => {
    const socket = io();
    socket.on("error", resp => {
      setMessage(resp.message);
      setActive(true);
    });
  }, [msg]);

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (active) {
      let timer = setTimeout(() => {
        setActive(false);
        clearTimeout(timer);
      }, 5000);
    }
  }, [active]);

  let isActive = active == true ? "mdl-snackbar--active" : "";

  return (
    <div className={`mdl-js-snackbar mdl-snackbar ${isActive}`}>
      <div className="mdl-snackbar__text">{msg}</div>
      <button className="mdl-snackbar__action" onClick={() => setActive(false)}>
        Ok!
      </button>
    </div>
  );
};

export default SnackBar;
