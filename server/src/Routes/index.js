import express from "express";

import userRoute from "./user/userRoute.js";
import authRoute from "./user/authRoute.js";
import assignmentRoute from "./assignmentRoute.js";
import courseRoute from "./courseRoute.js";

const Router = express.Router();

const routes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/assignment",
    route: assignmentRoute,
  },
  {
    path: "/course",
    route: courseRoute,
  },
];

routes.forEach((route) => {
  Router.route(route.path, route.route);
});

export default { Router };
