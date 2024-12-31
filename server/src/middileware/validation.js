import Joi, { object } from "joi";
import { pickObject, CustomError } from "../utils/index.js";

//validate middleware
const validate = (schema) => async (req, res, next) => {
  const validKeys = ["query", "params", "body"];
  const validSchema = pickObject(schema, validKeys);
  const validRequest = pickObject(req, Object.keys(validSchema));
  const options = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  };
  const { value, error } = validSchema
    .prefs({ errors: { label: "key" } })
    .validate(validRequest, options);
  if (error) {
    const message = error.details.map((err) => err.message).join(",");
    return next(new CustomError(400, message, true));
  }
  Object.assign(req, value);
  return next();
};
export { validate };
