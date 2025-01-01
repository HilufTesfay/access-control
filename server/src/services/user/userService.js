import { User } from "../../model/index.js";
import { CustomError } from "../../utils/index.js";

const validateUpdateData = (updateData) => {
  const protectedData = new Set(["email", "password"]);
  const validData = {};
  Object.keys(updateData).forEach((key) => {
    if (!protectedData.has(key)) {
      validData[key] = updateData[key];
    }
  });
  if (Object.keys(validData).length === 0) {
    throw new CustomError(400, "no valid data provided ");
  }
  return validData;
};
// Add a new user
const createUser = async (userData) => {
  const { email, phone } = userData;
  const newUser = new User(userData);
  const [isEmailUsed, isPhoneUsed] = await Promise.all([
    User.isEmailUsed({ email: email }),
    User.isPhoneUsed({ phone: phone }),
  ]);
  if (isEmailUsed || isPhoneUsed) {
    throw new CustomError(400, "email or phone is used", "user");
  }
  if (!newUser) {
    throw new CustomError(500, "unable to create user", "operatinal");
  }
  return await newUser.save();
};

// Delete a user
const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user || user.deletedCount === 0) {
    throw new CustomError(400, "no user found with this id", "user");
  }
  return { message: "user deleted successfuly", user };
};

// Update a user
const updateUserById = async (id, updates) => {
  const validData = validateUpdateData(updates);
  const user = await User.findById({ id: id });
  if (!user) {
    throw new CustomError(400, "no user found withis id", "user");
  }
  Object.keys(validData).forEach((key) => {
    user[key] = updates[key];
  });
  return await user.save();
};

// Search for a user
const searchUser = async (queryParams) => {
  const { name, email, role } = queryParams;
  const query = {};
  if (name) {
    query.name = { $regex: name, $options: "i" };
  }
  if (email) {
    query.email = { $regex: email, $options: "i" };
  }
  if (role) {
    query.role = role;
  }

  return await User.find(query);
};

//get user by Email
const getUserByEmail = async (email) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new CustomError(400, "no user found with this email", "user");
  }
};
//get user by id
const getUserById = async (id) => {
  const user = await User.findById({ id: id });
  if (!user) {
    throw new CustomError(400, "no user found with this id", "user");
  }
};
export default {
  getUserByEmail,
  searchUser,
  createUser,
  updateUserById,
  deleteUser,
  getUserById,
};
