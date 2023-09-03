import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./employee.endpoint.js";
import fileUpload, { fileValidation } from "../../Services/multerCloudinary.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./employee.validation.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import * as employeeController from "./Controller/employee.controller.js";

const router = Router({ caseSensitive: true });

router.patch(
  "/changeToEmployee/:employeeId",
  auth(endPoint.changeToEmployee),
  validation(validators.changeToEmployeeSchema),
  asyncHandler(employeeController.changeToEmployee)
);
router.patch(
  "/updateEmployeeSalary/:employeeId",
  auth(endPoint.updateEmployeeSalary),
  validation(validators.updateEmployeeSalarySchema),
  asyncHandler(employeeController.updateEmployeeSalary)
);
router.patch(
  "/deleteEmployee/:employeeId",
  auth(endPoint.deleteEmployee),
  validation(validators.deleteEmployeeSchema),
  asyncHandler(employeeController.deleteEmployee)
);
router.get(
  "/getAllEmployees",
  auth(endPoint.getAllEmployees),
  asyncHandler(employeeController.getAllEmployees)
);

// router.get(
//   "/getAllAdmins",
//   auth(endPoint.getAllAdmins),
//   asyncHandler(userController.getAllAdmins)
// );
// router.patch(
//   "/changeToActive",
//   auth(endPoint.updateStatus),
//   // validation(validators.updateStatusSchema),
//   asyncHandler(employeeController.changeActiveStatus)
// );
// router.patch(
//   "/changeToNonActive",
//   auth(endPoint.updateStatus),
//   // validation(validators.updateStatusSchema),
//   asyncHandler(employeeController.changeActiveStatus)
// );
export default router;
