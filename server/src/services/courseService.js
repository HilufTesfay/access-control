import { Course } from "../model/index.js";
import { CustomError } from "../utils/index.js";
//create course
const createCourse = async (course) => {
  const newCourse = new Course(course);
  if (!newCourse) {
    throw new CustomError(400, "unable to create course", "user");
  }
  return await newCourse.save();
};
// delete course
const deleteCourse = async (id) => {
  const deletedCourse = await Course.findByIdAndDelete(id);
  if (!deleteCourse) {
    throw new CustomError(400, "No course found with this id", "user");
  }
  return deleteCourse;
};
//update course
const updateCourse = async (id, updateData) => {
  const updatatedCourse = await Course.findById(id);
  Object.keys(updateData).forEach((key) => {
    updatatedCourse[key] = updateData[key];
  });
  if (!updatatedCourse) {
    throw new CustomError(400, "unable to updated the course", "user");
  }
  return await updatatedCourse.save();
};

export default { createCourse, deleteCourse, updateCourse };
