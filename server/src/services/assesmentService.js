import { Assessment } from "../model/index.js";
import CustomError from "../utils/customError.js";

//create assesment
const createAssesment = async (assesment) => {
  const newAssesment = new Assessment(assesment);
  if (!newAssesment) {
    throw new CustomError(400, "unable to create new assessment", "user");
  }
  return await newAssesment.save();
};
//update assesment
const updateAssessment = async (updateData) => {
  const updatedAssessment = await Assessment.findById({ id: id });
  if (!updateAssessment) {
    throw new CustomError(400, "unable to update assesement", "user");
  }
  Object.keys(updateData).forEach((key) => {
    updateAssessment[key] = updateData[key];
  });
  return await updateAssessment.save();
};
//delete assessment
const deleteAssessment = async (id) => {
  const deletedAssesment = await Assessment.deleteOne({ id: id });
  if (!deleteAssessment) {
    throw new CustomError(400, "no assesment found with this id", "user");
  }
};

export default { createAssesment, deleteAssessment, updateAssessment };
