var express = require("express");
let path = require("path");

// root "app"

var app = express();

// our api and client endpoints
var api = require("./api/app");
var web = require("./web/app");

app.use("/api", api);
app.use("/", web);

// models are special classes used by both client and server
app.use('/models', express.static(path.join(__dirname, "models")));

let server = app.listen(8000, () => {
   let host = server.address().address;
   let port = server.address().port;
   console.log("Petioro app listening at http://%s:%s", host, port);
});

module.exports = app;