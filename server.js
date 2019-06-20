/**
 * @file server.js
 */
var app = require("connect")(),
  serveStatic = require("serve-static"),
  path = require("path"),
  http = require("http").createServer(app),
  io = require("socket.io")(http),
  fs = require("fs"),
  uuid = require("uuid/v1");

/**
 * @return JSON data from file
 */
const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("data.json", "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
    });
  });
};
/**
 * @param {object} - JSON object to store
 * @return empty promise
 */
const writeData = data => {
  let jsonData = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    fs.writeFile("data.json", jsonData, err => {
      if (err) reject(err);
      else resolve();
    });
  });
};

app.use(serveStatic(path.join(__dirname, "dist")));

io.on("connection", socket => {
  console.log("client connected");

  // Create project
  socket.on("project-create", doc => {
      console.log("create", doc)
    readData()
      .then(data => {
        let projects = data.projects;
        projects[uuid()] = doc;
        data["projects"] = projects;
        writeData(data)
          .then(() => io.emit("projects", data.projects))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
  socket.on("project-edit", props => {
      console.log("edit", props)
    readData()
      .then(data => {
        // console.log(data.projects, props)
        let project = data.projects[props.id] || {};
        io.emit("project-edit", Object.assign({ _id: props.id }, project));
      })
      .catch(err => console.log(err));
  });
  // Get all projects
  socket.on("projects", () => {
    // Read data and return projects
    readData()
      .then(data => io.emit("projects", data.projects))
      .catch(err => console.log(err));
  });

  // io.emit("error", { message: "Server restarted!", code: 666 });

  socket.on("disconnect", () => console.log("client disconnected"));
});

http.listen(3000, () => console.log("Server is running"));
