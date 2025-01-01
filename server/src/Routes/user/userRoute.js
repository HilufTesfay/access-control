import express from "express";
import { userController } from "../../controlers/index.js";
const Router = express.Router();
Router.route("/")
  .post(userController.createUser)
  .delete(userController.deleteUser)
  .get(userController.searchUser)
  .put(userController.updateUser);

export default Router;
