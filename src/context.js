/**
 * @file src/context.js
 */
import React from "react";

// Helper function
Date.prototype.addDays = function(days) {
  let date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

export const projects = {
  startDaet: new Date(),
  endDate: new Date().addDays(6),
  state: "open",
  id: ""
};

export const ProjectContext = React.createContext(projects);
