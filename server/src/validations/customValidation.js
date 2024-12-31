import mongoose from "mongoose";

//validate password
const ValidatePassword = (value, helpers) => {
  const passRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$?])[A-Za-z\d@#$?]{8,}$/;
  if (!passRegex.test(value)) {
    return helpers.message(
      "password must be atleast 8 char length and contain atleast one uppercase,one lower case,one number,and one special character"
    );
  }
  return value;
};
//validate id
const validateObjectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid Id');
  }
  return value;
};
//validate phone
const validatePhone = (value, helpers) => {
  const phoneRegex = /^(\+251|0)(9|7)(\d){8}$/; // Ethiopian phone number
  if (!phoneRegex.test(value)) {
    return helpers.message(
      "Phone number must be a valid Ethiopian phone number."
    );
  }
  return value;
};

export { validateObjectId, validatePhone, ValidatePassword };
