import { authService, emailService, tokenService } from "../services/index.js";
import { handleAsyncError } from "../utils/index.js";


//register admin
const registerAdmin=handleAsyncError(async(req,res)=>{
 const 
})
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
