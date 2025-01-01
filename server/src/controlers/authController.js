import {
  authService,
  emailService,
  tokenService,
  otpService,
} from "../services/index.js";
import { handleAsyncError } from "../utils/index.js";

//register admin
const registerAdmin = handleAsyncError(async (req, res) => {
  const admin = await authService.registerAdmin(req.body);
  res.status(200).json({
    admin: admin,
    redirect: "/auth/login",
  });
});
//login
const login = handleAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  const { login, user } = await authService.login(email, password);

  if (!!login && !!user) {
    const tempToken = await tokenService.generateTempToken();
    await emailService.sendOtp(email);
    return res.status(200).json({
      message: "otp has sent to your email",
      tempToken: tempToken,
      redirect: "/auth/verify-otp",
    });
  }
});
//verify otp
const verifyOtp = handleAsyncError(async (req, res) => {
  const { email, otp } = req.body;
  const { valid, message } = await otpService.verifyOtp(email, otp);
  if (!valid || message === "Invalid OTP") {
    return res.status(403).json({
      message: "Invalid otp",
    });
  }
});

export default { login, registerAdmin, verifyOtp };
