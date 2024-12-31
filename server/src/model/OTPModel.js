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

OTPSchema.statics.validateOTP = async function (email, otp) {
  const record = await this.findOne({ email });
  if (record && record.otp === otp) {
    await this.deleteOne({ email });
    return true;
  }
  return false;
};

// Create the OTP model
const OTP = mongoose.model("OTP", OTPSchema);

export default OTP;
