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

export const dateFormat = date =>
  new Date(Date.parse(date)).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

export const projects = {
  startDate: dateFormat(new Date()),
  endDate: dateFormat(new Date().addDays(6)),
  status: "open"
};

export const ProjectContext = React.createContext(projects);
