import express from "express";
import morgan from "morgan";
import { morganFormat, stream } from "./config/morgan.js";
import { convertError, handleGlobalError } from "./middileware/index.js";
import CustomError from "./utils/customError.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(morganFormat, { stream }));

app.use("*", (req, res, next) => {
  const message = `this ${req.originalUrl} is not found`;
  next(new CustomError(404, message, "user"));
});
//error handler middleware
app.use(convertError);
app.use(handleGlobalError);

export default app;
