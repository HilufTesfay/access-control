import mongoose from "mongoose";
import cleanSchemaPlugin from "./plugin.js";
const assessmentTpes = ["quiz", "qxam", "qssignment"];
// Define the assessment schema
const assessmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  type: {
    type: String,
    enum: assessmentTpes,
  },
  marks: {
    type: Number,
    required: true,
    min: [1, "Marks should be at least 1"],
  },
});
assessmentSchema.plugin(cleanSchemaPlugin);
const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;
