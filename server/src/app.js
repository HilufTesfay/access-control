import express from "express";
import morgan from "morgan";
import { morganFormat, stream } from "./config/morgan.js";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(morganFormat, { stream }));

export default app;
