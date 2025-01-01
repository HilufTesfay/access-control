import express from "express";
import { assesmentConroller } from "../controlers/index.js";

const Router = express.Router();
Router.route("/")
  .post(assesmentConroller.createAssesment)
  .put(assesmentConroller.updateAssesment)
  .delete(assesmentConroller.deleteAssesment);
export default Router;
