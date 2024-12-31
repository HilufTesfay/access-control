import userService from "./userService.js";
import tokenService from "../tokenService.js";
import { CustomError } from "../../utils/index.js";
//register admin
const registerAdmin = async (data) => {
  const admin = await userService.createUser(data);
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
  const tokens = await tokenService.generateAuthToken(user.id, user.role);
  return { message: "login successfully", tokens: tokens };
};

//logout
const logout = async (id) => {
  return await tokenService.invalidateAllTokens(id);
};

export default { login, logout, registerAdmin };
