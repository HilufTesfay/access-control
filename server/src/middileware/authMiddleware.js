import { tokenService } from "../services/index.js";
import CustomError from "../utils/customError.js";
import { roleRight } from "../config/roles.js";
import { userService } from "../services/index.js";
//authenticate user
const isAuthenticated = async (req, res, next) => {
  const token = tokenService.extractToken(req.headers);
  const { isValidToken, userRole, userId } =
    tokenService.isAuthenticatedToken(token);
  if (!isValidToken) {
    return next(new CustomError(403, "you are not authenticated", "user"));
  }
  req.user = await userService.getUserById(userId);
  req.user.isAuthenticated = true;
  return next();
};

//autherize user

const autherizeUser =
  (...requiredRights) =>
  (req, res, next) => {
    if (!req.user || !req.user.isAuthenticated) {
      return next(new CustomError(403, "you are not authenticated", "user"));
    }
    const userRole = req.user.role;
    const userRights = roleRight.get(userRole);
    const hasRight = requiredRights.every((right) =>
      userRights.includes(right)
    );
    if (!hasRight)
      return next(
        new CustomError(403, "you are not autherize to acess this API", "user")
      );
    return next();
  };

export default { isAuthenticated, autherizeUser };
