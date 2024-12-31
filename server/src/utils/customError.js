const errorTypes = Object.freeze({
  USER: "user",
  PROGRAMMER: "programmer",
  OPERATIONAL: "operational",
});

class CustomError extends Error {
  constructor(statusCode, message, type) {
    super(message);
    this.status = statusCode >= 500 ? "error" : "failed";
    this.statusCode = statusCode;
    this.errorType = errorTypes[type.toUpperCase()] || "unknown";
    Error.captureStackTrace(this, this.constructor);
  }
}
export default CustomError;
