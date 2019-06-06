/**
 * @file server.js
 */
var connect = require("connect"),
  serveStatic = require("serve-static"),
  path = require("path");

connect()
  .use(serveStatic(path.join(__dirname, "dist")))
  .listen(3000, function() {
    console.log("Server is running");
  });
