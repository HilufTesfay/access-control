import { httpLogger } from "./logger.js";
//define morgan format
const morganFormat =
  ":remote-user :remote-addr :method :url :status :http-version :response-time ms";
//define stream option to redirect morgan logs to Logger
const stream = {
  write: (data) => {
    const [
      userName,
      ipAddress,
      method,
      url,
      status,
      httpVersion,
      responseTime,
    ] = data.trim().split(" ");
    return httpLogger.info("HTTP Acess Log", {
      userName: userName === "-" ? "anonymous" : userName,
      ipAddress: ipAddress,
      method: method,
      url: url,
      status: Number(status),
      httpVersion: Number(httpVersion),
      responseTime: Number(responseTime),
      timeStamp: new Date().toString(),
    });
  },
};
export { morganFormat, stream };
