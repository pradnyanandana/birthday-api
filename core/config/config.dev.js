const path = require("path");

let config = {};

config.logFileDir = path.join(__dirname, "../../log");
config.logFileName = "app.log";
config.serverPort = process.env.APP_SERVER_PORT || 8000;

module.exports = config;
