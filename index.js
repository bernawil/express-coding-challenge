const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

const router = express.Router();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,HEAD");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
  } else {
    next();
  }
});

app.use(router);

// initialize routes
require("./routes")(app);
require('http').Server(app).listen(process.env.API_PORT, () => "Api server ready")
