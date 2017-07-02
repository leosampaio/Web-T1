let express = require("express");
let path = require("path");
let cookieParser = require("cookie-parser");
let bodyParser = require("body-parser");

let routes = require("./routes");

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", routes);

module.exports = app;
