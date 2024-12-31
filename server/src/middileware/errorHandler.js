import { CustomError } from "../utils/index.js";
import { errorLogger } from "../config/logger.js";

const logError = (error) => {
  errorLogger.error("error details", {
    errorName: error.name || "custom errror",
    message: error.message,
    stack: error.stack,
  });
};
//conver error
const convertError = (error, req, res, next) => {
  if (error instanceof CustomError) {
    logError(error);
    return next(error);
  } else {
    logError(error);
    return next(new CustomError(500, "something went wrong", "operational"));
  }
};

// handle global error

const handleGlobalError = (error, req, res, next) => {
  const response = {
    message: error.message,
    statusCode: error.statusCode,
  };
  res.status(statusCode).json(response);
};

export { handleGlobalError, convertError };
