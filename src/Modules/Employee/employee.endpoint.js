import { roles } from "../../Middleware/auth.middleware.js";
import { getAllRoles } from "../../Services/getAllRoles.js";

export const endPoint = {
  changeToEmployee: [roles.SuperAdmin, roles.Admin],
  deleteEmployee: [roles.SuperAdmin, roles.Admin],
  getAllEmplyees: [roles.SuperAdmin, roles.Admin],
  updateEmployeeSalary: [roles.SuperAdmin, roles.Admin],
  getAllEmployees: [roles.SuperAdmin, roles.Admin],
};
