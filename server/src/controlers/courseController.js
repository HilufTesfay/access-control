import { courseService } from "../services/index.js";
import { handleAsyncError } from "../utils/index.js";

//create course
const createCourse = handleAsyncError(async (req, res) => {
  const newCourse = await courseService.createCourse(req.body);
  res.status(200).json({
    message: "created successfully",
    course: newCourse,
  });
});

//update course
const updateCourse = handleAsyncError(async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatatedCourse = await courseService.updateCourse(id, body);
});

//delete course

const deleteCourse = handleAsyncError(async (req, res) => {
  const { id } = req.params;
  const deletedCourse = await courseService.deleteCourse(id);
  res.status(202).json({
    message: "deleted successfully",
    deletedCourse: deleteCourse,
  });
});

export default { createCourse, deleteCourse, updateCourse };
