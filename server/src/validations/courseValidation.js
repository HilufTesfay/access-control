import Joi from "joi";
import { validateObjectId } from "./customValidation.js";
//create course
const createCourse = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    credits: Joi.number().required(),
    instructor: Joi.string().required(),
  }),
};
// update course
const updatatedCourse = {
  params: Joi.object().keys({
    id: Joi.string().required().custom(validateObjectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      instructor: Joi.string(),
      credits: Joi.number(),
    })
    .or("name", "instructor")
    .messages({
      "object.missing": "either 'name' 'instructor' or 'credits is required'",
    }),
};
//delete course
const deleteCourse = {
  params: Joi.object().keys({
    id: Joi.string().custom(validateObjectId),
  }),
};

export default { createCourse, deleteCourse, updatatedCourse };
