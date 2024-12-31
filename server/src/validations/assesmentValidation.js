import Joi from "joi";
import { validateObjectId } from "./customValidation.js";
// create assesment
const updateAssessment = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateObjectId),
  }),
  body: Joi.object()
    .keys({
      course: Joi.string(),
      instructor: Joi.string(),
      marks: Joi.number(),
      type: Joi.string().valid("quiz", "exam", "assignment"),
    })
    .or("course", "instructor", "marks", "type")
    .messages({
      "object.missing":
        "atleast 'course' 'instructor' 'marks' or 'type' are required ",
    }),
};
// delete assesment
const deleteAssessment = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateObjectId),
  }),
};
//create assement
const createAssesment = {
  body: Joi.object().keys({
    course: Joi.string().required(),
    instructor: Joi.string().required(),
    marks: Joi.number().required(),
    type: Joi.string().required().valid("quiz", "exam", "assignment"),
  }),
};

export default { updateAssessment, createAssesment, deleteAssessment };
