import CustomError from "./customError.js";
//define function to pick valid schema for specific request
const validKeys = ["body", "query", "params"];
const pickObject = (schema) => {
  if (typeof schema !== "object" || Object.keys(schema).length === 0) {
    throw new CustomError(400, "invalid schema type", "programmer");
  }
  const validSchema = Object.keys(schema).reduce((acc, key) => {
    if (validKeys.includes(key)) acc[key] = schema[key];
    return acc;
  }, {});
  if (Object.keys(validSchema).length === 0) {
    throw new CustomError(400, "invalid input ", "user");
  }

  return validSchema;
};

export default pickObject;
