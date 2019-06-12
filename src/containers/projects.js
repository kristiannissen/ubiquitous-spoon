/**
 * @file src/containers/projects.js
 */
import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";

import { ProjectContext } from "./../context";

const Projects = props => {
  const projectContext = useContext(ProjectContext);

  const [projects, updateProjects] = useState([]);
  useEffect(() => {
    const socket = io();
    // Emit command to get projects
    socket.emit("projects", projectContext);

    socket.emit("projects", data => updateProjects(data));
  });

  return <div>Projects</div>;
};

export default Projects;
