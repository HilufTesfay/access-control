import otpGenerator from "otp-generator";
import { OTP } from "../model/index.js";
import { DateTime } from "luxon";

// save otp
const saveOTP = async (email, otp) => {
  const expires = DateTime.now().plus({ minutes: 1 }).toJSDate();
  const issuedAt = DateTime.now().toJSDate();
  return await OTP.create({ email, otp, expires, issuedAt });
};

//generate otp
const generateOTP = async (email) => {
  const otp = otpGenerator.generate(6, {
    upperCase: false,
    specialChars: false,
    alphabets: false,
  });
  const otpData = await saveOTP(email, otp);
  return otpData;
};

//verify otp
const verifyOTP = async (email, otp) => {
  return await OTP.validateOTP(email, otp);
};
