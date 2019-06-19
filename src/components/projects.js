/**
 * @file src/containers/projects.js
 */
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import {
  monthsBetween,
  getMonthName,
  addMonths,
  weekDiff
} from "./../datehelpers";

import Project from "./project";
// TODO: Rename component
const Projects = props => {
  const [projects, updateProjects] = useState([]);

  useEffect(() => {
    const socket = io();
    if (projects.length == 0) {
      socket.emit("projects");
    }
    socket.on("projects", resp => updateProjects(resp));
  }, [projects]);
  // 2. parameter in addMonths could be a context variable
  let dates = projectDateRange(projects),
    monthRange = monthsBetween(dates[0], addMonths(dates[0], 3)).map(
      (month, indx) => {
        // console.log(month)
        // TODO: Divide range by 12 to use full document width
        let cssCol = 12 / 4;
        return (
          <div key={indx} className={`mdl-cell mdl-cell--${cssCol}-col`}>
            {getMonthName(month)}
          </div>
        );
      }
    ),
    gantt = projects.map((project, indx) => {
      let startDate = new Date(Date.parse(project.startDate)),
        endDate = new Date(Date.parse(project.endDate)),
        duration = weekDiff(startDate, endDate),
        weeksFromStart = weekDiff(dates[0], startDate),
        offset = getOffset(startDate),
        css = ["mdl-cell"];
      css.push(`mdl-cell--${duration}-col`);
      css.push(`mdl-cell--${weeksFromStart - offset}-offset`);
      // console.log(project.name, weeksFromStart, duration, offset);

      return (
        <div
          key={indx}
          className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col"
        >
          <div className={css.join(" ")}>
            <Project {...project} />
          </div>
        </div>
      );
    });

  return (
    <div className="mdl-grid mdl-grid--no-spacing">
      <div className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col">
        {monthRange}
      </div>
      <div className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col">
        {gantt}
      </div>
    </div>
  );
};

const projectDateRange = dateArr => {
  let dates = [];
  for (let i in dateArr) {
    dates.push(new Date(Date.parse(dateArr[i].startDate)));
    dates.push(new Date(Date.parse(dateArr[i].endDate)));
  }
  return dates.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
};

const getOffset = dateObj => {
  let date = dateObj.getDate(),
    offset = 0;

  if (date <= 10) offset = 0;
  if (date > 10 && date <= 20) offset = 2;
  if (date > 20) offset = 3;
  // console.log(offset, date)
  return offset;
};

export default Projects;
