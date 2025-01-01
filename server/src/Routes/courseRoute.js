import express from "express";
import { courseController } from "../controlers/index.js";
const Router = express.Router();
Router.route("/")
  .post(courseController.createCourse)
  .put(courseController.updateCourse)
  .delete(courseController.deleteCourse);
export default Router;
