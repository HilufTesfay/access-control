import Joi from "joi";
import {
  ValidatePassword,
  validateObjectId,
  validatePhone,
} from "./customValidation.js";
//create user schema
const createUser = {
  body: Joi.object().keys({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().custom(ValidatePassword),
    phone: Joi.string().trim().required().custom(validatePhone),
    role: Joi.string()
      .trim()
      .valid("student", "instructor", "admin")
      .default("student"),
  }),
};
//update user schema
const updateUser = {
  params: Joi.object().keys({
    id: Joi.string().trim().required().custom(validateObjectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string().trim(),
      phone: Joi.string().trim().custom(validatePhone),
    })
    .or("name", "phone")
    .messages({
      "object.missing": "At least one of 'name', or 'phone' is required.",
    }),
};

//update user schema
const deleteUser = {
  params: Joi.object().keys({
    id: Joi.string().trim().required().custom(validateObjectId),
  }),
};

//change user cridentials schema schema
const changeCridential = {
  body: Joi.object()
    .keys({
      email: Joi.string().trim().email(),
      password: Joi.string().trim().custom(ValidatePassword),
    })
    .or("email", "password")
    .messages({
      "object.missing": "At least one of 'email', or 'password' is required.",
    }),
};
//search User
const searchUser = {
  query: Joi.object()
    .keys({
      name: Joi.string().trim().min(1).optional(),
      role: Joi.string()
        .trim()
        .valid("student", "instructor", "admin")
        .optional(),
      email: Joi.string().trim().email().optional(),
    })
    .or("name", "role", "email")
    .messages({
      "object.missing":
        "At least one of 'name', 'role', or 'email' is required.",
    }),
};

export default { createUser, deleteUser, updateUser, changeCridential };
