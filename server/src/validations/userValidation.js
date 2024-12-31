import Joi from "joi";

//create user schema
const createUser = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(ValidatePassword),
    phone: Joi.string().required().custom(validatePhone),
    role: Joi.string()
      .valid("student", "instructor", "admin")
      .default("student"),
  }),
};
//dellete user schema
const deleteUser = {
  params: Joi.string().required().custom(validateId),
};
//update user scema

export default { createUser };
