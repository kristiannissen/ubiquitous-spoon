/**
 * @file server.js
 */
var app = require("connect")(),
  serveStatic = require("serve-static"),
  path = require("path"),
  http = require("http").createServer(app),
  io = require("socket.io")(http),
    fs = require("fs")

app.use(serveStatic(path.join(__dirname, "dist")));

io.on("connection", socket => {
  console.log("client connected");

  socket.on("chat message", data => {
    console.log("chat " + data.msg);
    io.emit("chat message", data.msg);
  });
    // Upsert project
    socket.on("project-upsert", doc => {
        console.log(doc)
    })
    // Get all projects
    socket.on("projects", () => {
        fs.readFile("./data.json", function(err, data) {
            if (err) io.emit("error", {message: err, code: 666})
            let projects = data
            io.emit("projects", JSON.parse(projects))
        })
    })

    io.emit("error", {message: "Server restarted!", code: 666})

  socket.on("disconnect", () => console.log("client disconnected"));
});

http.listen(3000, () => console.log("Server is running"));
