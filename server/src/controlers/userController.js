import { userService } from "../services/index.js";
import { handleAsyncError } from "../utils/index.js";

//creare user
const createUser = handleAsyncError(async (req, res, next) => {
  const user = await userService.createUser(req.body);
  res.status(200).json({
    message: "user registered sucessfully",
    user: user,
  });
});

// update user
const updateUser = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const updateUser = await userService.updateUserById(id, body);
});

//delete user
const deleteUser = handleAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const deleteduser = await userService.deleteUser(id);
  return { message: deleteUser.message, user: deleteUser.user };
});

//search user
const searchUser = handleAsyncError(async (req, res, next) => {
  const users = await userService.searchUser(req.query);
  if (users.length === 0) {
    res.status(404, "no user found ");
  }
  res.status(200).json({
    users: users,
  });
});

export default { createUser, deleteUser, searchUser, updateUser };
