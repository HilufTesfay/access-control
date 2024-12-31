import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cleanSchemaPlugin from "./plugin";
// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "instructor"],
      required: true,
      default: "student",
    },
  },
  { timestamps: true }
);
//check if eamil is used
userSchema.static.isEmailUsed = async function (email) {
  return !!(await this.findOne({ email: email }));
};
//check if phone is used
userSchema.static.isPhoneUsed = async function (phone) {
  return !!(await this.findOne({ phone: phone }));
};
//comppare phone number
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
// Hash password before saving the user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.plugin(cleanSchemaPlugin);
const User = mongoose.model("User", userSchema);
export default User;
