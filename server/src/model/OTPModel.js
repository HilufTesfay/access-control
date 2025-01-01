import mongoose from "mongoose";
// Define the OTP schema
const OTPSchema = new mongoose.Schema(
  {
    otp: {
      type: String,
      required: true,
    },
    email: {
      ref: "User",
      required: true,
    },
    issuedAt: {
      type: Date,
      required: true,
    },
    expires: {
      //1 min
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);
// validate OTP
OTPSchema.statics.validateOTP = async function (email, otp) {
  const OTPrecord = await this.findOne({ email, otp });
  if (!OTPrecord) return { valid: false, message: "Invalid OTP" };
  const CurrentTime = Date.now().toJSDate();
  if (CurrentTime > OTPrecord.expires)
    return { valid: false, message: "OTP expired" };
  return { valid: true, message: "OTP verified" };
};

// Create the OTP model
const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;
