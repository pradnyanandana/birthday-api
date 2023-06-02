import * as winston from "winston";
import config from "../config/config.dev";
import * as fs from "fs";

const dir = config.logFileDir;

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

let logger = new winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: config.logFileDir + "/" + config.logFileName,
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `Log`,
    }),
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${info.level}: ${info.label}: ${[info.timestamp]}: ${JSON.stringify(
          info.message
        )}`
    )
  ),
});

module.exports = logger;
