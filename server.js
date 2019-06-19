/**
 * @file server.js
 */
var app = require("connect")(),
  serveStatic = require("serve-static"),
  path = require("path"),
  http = require("http").createServer(app),
  io = require("socket.io")(http),
  fs = require("fs");

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
const writeData = (data) => {
    console.log(data)
};

app.use(serveStatic(path.join(__dirname, "dist")));

io.on("connection", socket => {
  console.log("client connected");

  // Upsert project
  socket.on("project-create", doc => {
    readData()
      .then(data => {
        console.log(Object.assign(data.projects, doc))
      })
      .catch(err => io.emit("error", {message: err}))
  });
  // Get all projects
  socket.on("projects", () => {
    // Read data and return projects
    readData()
      .then(data => io.emit("projects", data.projects))
      .catch(err => io.emit("error", { message: err }));
  });

  // io.emit("error", { message: "Server restarted!", code: 666 });

  socket.on("disconnect", () => console.log("client disconnected"));
});

http.listen(3000, () => console.log("Server is running"));
