/**
 * @file server.js
 */
var app = require("connect")(),
  serveStatic = require("serve-static"),
  path = require("path"),
  http = require("http").createServer(app),
  io = require("socket.io")(http);

app.use(serveStatic(path.join(__dirname, "dist")));

io.on("connection", (socket) => {
    console.log("client connected")

    socket.on("chat message", (data) => {
        console.log("chat "+ data.msg)
        io.emit("chat message", data.msg)
    })

    socket.on("disconnect", () => console.log("client disconnected"))
})

http.listen(3000, () => console.log("Server is running"));
