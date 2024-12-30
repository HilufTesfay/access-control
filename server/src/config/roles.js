const allRoles = {
  instructor: [""],
  admin: [""],
  student: [""],
};
const roles = Object.keys(allRoles);
const roleRight = new Map(Object.entries(allRoles));
export { roles, roleRight };
