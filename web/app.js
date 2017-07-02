var express = require("express");
var path = require("path");

var routes = require("./routes");

var app = express();
app.use(express.static(path.join(__dirname, "./")));

app.use("/", routes);

module.exports = app;