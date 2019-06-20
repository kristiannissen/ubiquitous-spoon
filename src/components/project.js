/**
 * @file src/components/project.js
 */
import React from "react";
import io from "socket.io-client";

import { weekDiff, formatDate, getPMU, pmu } from "./../datehelpers";

const Project = props => {
  let startDate = new Date(props.startDate),
    endDate = new Date(props.endDate);

  const emit = id => {
    let socket = io();
    socket.emit("project-edit", { id });
  };

  return (
    <div className="project-component">
      <div className="project-title">
        <a href="#" onClick={() => emit(props.id)}>
          {props.name}
        </a>
      </div>
      <div className="project-timeline">
        <div className="project-timeline-text">
          Start: {communicatedStart(startDate)} Duration:{" "}
          {weekDiff(startDate, endDate)}W
        </div>
      </div>
    </div>
  );
};

const communicatedStart = date => getPMU(pmu(date));

export default Project;
