import { DateTime } from "luxon";
import jwt from "jsonwebtoken";
import { envConfig } from "../config/config.js";
import { Token } from "../model/index.js";
import { CustomError } from "../utils/customError.js";
import { tokenTypes } from "../config/tokenTypes.js";

const { sign, verify } = jwt;
// define funcrion to Generate a token
const generateToken = (id, userRole, tokenType, expires) => {
  const payload = {
    sub: id,
    role: userRole,
    type: tokenType,
    iat: DateTime.now().toUnixInteger(),
    exp: expires.toUnixInteger(),
  };
  return sign(payload, envConfig.token.secretKey);
};

// define funcrion to Save token to a data base
const saveToken = async (token, id, type, expires, blacklisted = false) => {
  const tokenDoc = {
    token: token,
    user: id,
    tokenType: type,
    expires: expires.toISO(),
    blacklisted: blacklisted,
  };
  const savedToken = await Token.create(tokenDoc);
  return savedToken;
};
//define function to delete token
const deleteToken = async (token, id, type) => {
  const tokenDoc = await Token.deleteOne({
    token: token,
    user: id,
    type: type,
  });
  if (tokenDoc.deletedCount === 0) {
    throw new CustomError(400, "Token not found or already deleted", "user");
  }
  return { message: "Deleted successfully" };
};
// define funcrion to Verify a token
const verifyToken = async (token, tokenType) => {
  const payload = verify(token, envConfig.token.secretKey);
  const tokenDoc = await Token.findOne({
    token: token,
    user: payload.sub,
    tokenType: tokenType,
    blacklisted: false,
  });
  if (!tokenDoc) {
    throw new CustomError(400, "Token verification failed", "user");
  }
  return tokenDoc;
};

// define funcrion to genenrate accessToken
const generateAccessToken = (id, userRole) => {
  const tokenType = tokenTypes.ACCESS;
  const expires = DateTime.now().plus({
    minutes: envConfig.token.acessTokenExp,
  });
  const accessToken = generateToken(id, userRole, tokenType, expires);
  return accessToken;
};
//define function to generate reset token
const generateResetPasswordToken = async (id, userRole) => {
  const tokenType = tokenTypes.RESET;
  const expires = DateTime.now().plus({
    seconds: envConfig.token.resetPasswordToknExp,
  });
  const resetToken = generateToken(id, userRole, tokenType, expires);
  await saveToken(resetToken, id, tokenType, expires, false);
  return resetToken;
};
//define funcrion to generate refreshtoken
const generateRefreshToken = async (id, userRole) => {
  const tokenType = tokenTypes.REFRESH;
  const expires = DateTime.now().plus({ day: envConfig.token.refreshTokenExp });
  const refreshToken = generateToken(id, userRole, tokenType, expires);
  await saveToken(refreshToken, id, tokenType, expires, false);
  return refreshToken;
};
//define function to genrate emailVerification Token
const generateEmailVerificationToken = async (id, userRole) => {
  const tokenType = tokenTypes.VERIFICATION;
  const expires = DateTime.now().plus({
    seconds: envConfig.token.emailVerificationTokenEXp,
  });
  const verificationToken = generateToken(id, userRole, tokenType, expires);
  await saveToken(verificationToken, id, tokenType, expires);
  return verificationToken;
};
//define funcrion to generate auth tokens
const generateAuthToken = async (id, userRole) => {
  const accesToken = generateAccessToken(id, userRole);
  const refreshToken = await generateRefreshToken(id, userRole);
  return { acess: accesToken, refresh: refreshToken };
};

// define function to redresh token
const refreshToken = async (token, user) => {
  const tokenType = tokenTypes.REFRESH;
  const tokenDoc = await verifyToken(token, tokenType);
  await deleteToken(token, tokenDoc.user, tokenType);
  const newTokens = generateAuthToken(user.id, user.role);
  return newTokens;
};
//define funcrion to check the authenticty of token
const isAuthenticatedToken = (token) => {
  const result = {
    isValidToken: false,
  };
  const payload = verify(token, envConfig.token.secretKey);

  if (!payload) {
    return result;
  }
  result.isValidToken = true;
  result.userId = payload.sub;
  result.userRole = payload.userRole;
  return result;
};
//define function to extract token from header
const extractToken = (headers) => {
  const token = headers["authorization"].split(" ")[1];
  if (!token) {
    throw new CustomError(403, "token not found", "user");
  }
  return token;
};
//define function to invalidate all stored tokens in the databse
const invalidateAllTokens = async (id) => {
  if (!id) {
    throw new CustomError(404, "No user id provided");
  }
  const deletedTokens = await Token.deleteMany({ user: id });
  if (!deletedTokens.deletedCount) {
    throw new CustomError(404, "token not exist", "user");
  }
  return { message: "Tokens deleted successfully" };
};
//generate temporary token
const generateTempToken = async (id, userRole) => {
  const tokenType = tokenTypes.TEMP;
  const expires = DateTime.now().plus({ minutes: 5 });
  const tempToken = generateToken(id, userRole, tokenType, expires);
  await saveToken(tempToken, id, tokenType, expires);
  return tempToken;
};

export default {
  refreshToken,
  generateResetPasswordToken,
  generateEmailVerificationToken,
  generateAuthToken,
  isAuthenticatedToken,
  deleteToken,
  extractToken,
  invalidateAllTokens,
  verifyToken,
  generateTempToken,
};
