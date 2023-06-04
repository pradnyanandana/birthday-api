require("dotenv").config();

const express = require("express");

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middlewares/error-handler");
const routers = require("./routes");
const logger = require("./core/logger/app-logger");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(routers);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hello!",
  });
});

app.use(errorHandler);

app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Sorry, URL not found!",
  });
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

global.logger = logger;

module.exports = app;
