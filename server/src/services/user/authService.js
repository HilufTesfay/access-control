import userService from "./userService.js";
import tokenService from "../tokenService.js";
import { CustomError } from "../../utils/index.js";
//register admin
const registerAdmin = async (data) => {
  const admin = await userService.createUser(data);
  return admin;
};
//login
const login = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user) {
    throw new CustomError(400, "Incorrect cridentials", "user");
  }
  if (!(await user.comparePassword(password))) {
    throw new CustomError(400, "Incorrect cridentials", "user");
  }

  return { login: true, user };
};

//logout
const logout = async (id) => {
  if (req.user) delete req.user;
  return await tokenService.invalidateAllTokens(id);
};

export default { login, logout, registerAdmin };
