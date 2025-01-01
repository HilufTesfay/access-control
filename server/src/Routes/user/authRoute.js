import express from "express";
import { authController } from "../../controlers/index.js";
const Router = express.Router();
Router.route("/register").post(authController.registerAdmin); //register user
Router.route("/login").post(authController.login); //login
Router.route("/verify-otp").post(authController.verifyOtp); //verify otp
Router.route("/logout").delete(authController.logout); //logout

export default Router;
