import mongoose from "mongoose";
import { tokenTypes } from "../config/tokenTypes.js";
import cleanSchemaPlugin from "./plugin.js";
// Define the token schema
const tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expires: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(tokenTypes),
      required: true,
    },
    blackListed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Static method to check if a token is blacklisted
tokenSchema.statics.isBlackListed = async function (token) {
  const tokenDoc = await this.findOne({ token });
  return tokenDoc ? tokenDoc.blackListed : false;
};
tokenSchema.plugin(cleanSchemaPlugin);
// Create and export the Token model
const Token = mongoose.model("Token", tokenSchema);
export default Token;
