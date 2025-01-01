import { assesmentService } from "../services/index.js";
import { handleAsyncError } from "../utils//index.js";

//create assessment
const createAssesment = handleAsyncError(async (req, res) => {
  const newAssesment = await assesmentService.createAssesment(req.body);
  res.status(200).json({
    message: "assessment created successfully",
    assessment: newAssesment,
  });
});

//update assesment
const updateAssessment = handleAsyncError(async (req, res) => {
  const { id } = req.params;
  const { body: data } = req;
  const updatedAssessment = await assesmentService.updateAssessment(id, data);
  res.status(202).json({
    message: "updated successfully",
    updateAssessment: updateAssessment,
  });
});

//delete assesment
const deleteAssessment = handleAsyncError(async (req, res) => {
  const { id } = req.params;
  const deletedAssesment = await assesmentService.deleteAssessment(id);
  res.status(202).json({
    message: "deleted successfully",
    deleteAssessment: deleteAssessment,
  });
});

export default { createAssesment, deleteAssessment, updateAssessment };