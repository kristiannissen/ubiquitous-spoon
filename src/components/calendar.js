/**
 * @file src/components/calendar.js
 */
import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import { CalendarContext } from "../context";

const Calendar = props => {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    console.log("effect " + msg);

    const socket = io();
    socket.emit("chat message", { msg: "Kitty" });
    socket.on("chat message", data => setMsg(data));
    console.log("effect " + msg);
  });

  return <div>Hello {msg}</div>;
};

// Calendar.contextType = CalendarContext

export default Calendar;
