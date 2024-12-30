import mongoose from "mongoose";

// Define the assessment schema
const assessmentSchema = new mongoose.Schema({
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course", // Linking to the Course model
    required: true,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Linking to the User model (instructor)
    required: true,
  },
  type: {
    type: String,
    enum: ["Quiz", "Exam", "Assignment"], // Types of assessments
    required: true,
  },
  marks: {
    type: Number,
    required: true,
    min: [1, "Marks should be at least 1"], // Ensure at least 1 mark
  },
});

const Assessment = mongoose.model("Assessment", assessmentSchema);

export default Assessment;
