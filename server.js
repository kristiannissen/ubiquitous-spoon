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
 * @param {string} - Object key to target
 * @param {data} - data to store
 * @return promise
 */
const writeData = data => {
  let jsonData = JSON.stringify(data);
    console.log(jsonData)
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

  // Upsert project
  socket.on("project-create", doc => {
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
