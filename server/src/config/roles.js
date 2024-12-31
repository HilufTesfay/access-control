const allRoles = {
  instructor: [
    "createAssesmet",
    "deleteAssesment",
    "updateAssesment",
    "updateProfile",
  ],
  student: ["updateProfile", "viewMarks", "viewAssesments"],
  admin: ["manageCourses", "manageUsers"],
};
const roles = Object.keys(allRoles);
const roleRight = new Map(Object.entries(allRoles));
export { roles, roleRight };
