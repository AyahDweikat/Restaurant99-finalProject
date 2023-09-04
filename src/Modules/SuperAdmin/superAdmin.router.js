import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./superAdmin.endpoint.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./superAdmin.validation.js";
import { asyncHandler } from './../../Services/errorHandling.js';
import * as superAdminController from "./Controller/superAdmin.controller.js";

const router = Router({ caseSensitive: true });

router.patch(
  "/changeToSuperAdmin/:superAdminId",
  auth(endPoint.changeToSuperAdmin),
  validation(validators.changeToSuperAdminSchema),
  asyncHandler(superAdminController.changeToSuperAdmin)
);
router.patch(
  "/deleteSuperAdmin/:superAdminId",
  auth(endPoint.deleteSuperAdmin),
  validation(validators.deleteSuperAdminSchema),
  asyncHandler(superAdminController.deleteSuperAdmin)
);
router.patch(
  "/updateSuperAdminSalary/:superAdminId",
  auth(endPoint.updateSuperAdminSalary),
  validation(validators.updateSuperAdminSalarySchema),
  asyncHandler(superAdminController.updateSuperAdminSalary)
);
router.get(
  "/getAllSuperAdmins",
  auth(endPoint.getAllSuperAdmins),
  asyncHandler(superAdminController.getAllSuperAdmins)
);



export default router;
