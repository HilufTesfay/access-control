import { format, transports, createLogger } from "winston";
const { combine, timestamp, json, simple, colorize } = format;
import { envConfig } from "./config.js";
//create transports option

// file transoport for http logs
const httpFile = new transports.File({
  level: "info",
  filename: `${envConfig.logPath}/httpLogs.log`,
  json: true,
});
// file transoport for error logs
const errFile = new transports.File({
  filename: `${envConfig.logPath}/errorLogs.log`,
  level: "error",
});
//file transport for sent  email logs
const emailFile = new transports.File({
  filename: `${envConfig.logPath}/emailSent.log`,
});
// console log
const consoleTransport = new transports.Console({
  format: combine(colorize(), simple()),
});
//create http logger
const httpLogger = createLogger({
  level: envConfig.env === "production" ? "info" : "debug",
  format: json(),
  transports: [httpFile, consoleTransport],
});
//create error logger
const errorLogger = createLogger({
  level: "error",
  format: combine(json(), timestamp()),
  transports: [errFile, consoleTransport],
});
//create email sent logger
const emailLogger = createLogger({
  level: "info",
  format: combine(json(), timestamp()),
  transports: [emailFile, consoleTransport],
});
// remove console transport if it is in production stage
if (envConfig.env === "production") {
  httpLogger.remove(consoleTransport);
  errorLogger.remove(consoleTransport);
  emailLogger.remove(consoleTransport);
}
export { httpLogger, errorLogger, emailLogger };
