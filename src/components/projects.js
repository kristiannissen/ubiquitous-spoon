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
  const [projects, updateProjects] = useState({});

  useEffect(() => {
    const socket = io();
    // Check if object has any properties
    if (Object.getOwnPropertyNames(projects).length == 0) {
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
    gantt = Object.keys(projects).map((key, indx) => {
      let project = projects[key],
        startDate = new Date(project.startDate),
        endDate = new Date(project.endDate),
        duration = weekDiff(startDate, endDate),
        weeksFromStart = weekDiff(dates[0], startDate),
        offset = getOffset(startDate),
        css = ["mdl-cell"];
      css.push(`mdl-cell--${duration}-col`);
      css.push(`mdl-cell--${weeksFromStart}-offset`);
      console.log({ dur: duration, weeksfrom: weeksFromStart, offset: offset });

      return (
        <div
          key={indx}
          className="mdl-grid mdl-grid--no-spacing mdl-cell mdl-cell--12-col"
        >
          <div className={css.join(" ")}>
            <Project {...project} id={key} />
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
  Object.keys(dateArr).forEach(key => {
    dates.push(new Date(dateArr[key].startDate));
    dates.push(new Date(dateArr[key].endDate));
  });
  dates.sort((a, b) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });
  let date = new Date(dates[0]);
  if (date.getDate() != 1) {
    dates = [new Date(date.setDate(1))].concat(dates);
  }
  return dates;
};

const getOffset = dateObj => {
  let date = dateObj.getDate(),
    offset = 0;

  if (date <= 10) offset = 0;
  if (date > 10 && date <= 20) offset = 1;
  if (date > 20) offset = 2;
  return offset;
};

export default Projects;
