/**
 * @file src/components/project.js
 */
import React from "react";
import io from "socket.io-client";

import { weekDiff } from "./../datehelpers";

const Project = props => {
  let startDate = new Date(Date.parse(props.startDate)),
    endDate = new Date(Date.parse(props.endDate));

  const emit = id => {
    let socket = io();
    socket.emit("project-edit", { id });
  };

  return (
    <div className="project-component">
      <div>
        <a href="#" onClick={() => emit(props.id)}>
          {props.name}
        </a>
      </div>
      <div className="project-timeline" />
    </div>
  );
};

export default Project;
