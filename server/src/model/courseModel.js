import mongoose from "mongoose";
import cleanSchemaPlugin from "./plugin.js";
// Define the course schema
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  credits: {
    type: Number,
    required: true,
    min: [1, "Course must have at least 1 credit"], // Ensure at least 1 credit
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Linking to the User model (instructor)
    required: true,
  },
});
courseSchema.plugin(cleanSchemaPlugin);
const Course = mongoose.model("Course", courseSchema);

export default Course;
