import Joi from "joi";
const login = {
  body: Joi.object().keys({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
  }),
};

export default { login };
