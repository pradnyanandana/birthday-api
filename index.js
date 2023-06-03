require("dotenv").config();

const express = require("express");
const logger = require("./core/logger/app-logger");
const config = require("./core/config/config.dev");
const AlertService = require("./services/alert-service");
const alert = new AlertService();

const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/error-handler");
const port = config.serverPort;
const routers = require("./routes");

mongoose.connect(process.env.DATABASE_URI);

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB @ 27017");
});

mongoose.connection.on("error", (err) => {
  console.log(err);
});

logger.stream = {
  write: (message, encoding) => {
    logger.info(message);
  },
};

global.queue = {};
global.logger = logger;

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

alert.start();

app.listen(port, () => {
  console.log(`Run app in port ${port}`);
});
