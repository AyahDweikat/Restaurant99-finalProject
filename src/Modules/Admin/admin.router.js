import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./admin.endpoint.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./admin.validation.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import * as adminController from "./Controller/admin.controller.js";

const router = Router({ caseSensitive: true });

router.patch(
  "/changeToAdmin/:adminId",
  auth(endPoint.changeToAdmin),
  validation(validators.changeToAdminSchema),
  asyncHandler(adminController.changeToAdmin)
);
router.patch(
  "/deleteAdmin/:adminId",
  auth(endPoint.deleteAdmin),
  validation(validators.deleteAdminSchema),
  asyncHandler(adminController.deleteAdmin)
);
router.patch(
  "/updateAdminSalary/:adminId",
  auth(endPoint.updateAdminSalary),
  validation(validators.updateAdminSalarySchema),
  asyncHandler(adminController.updateAdminSalary)
);
router.get(
  "/getAllAdmins",
  auth(endPoint.getAllAdmins),
  asyncHandler(adminController.getAllAdmins)
);

router.patch(
  "/changeToActive/:adminId",
  auth(endPoint.updateStatus),
  validation(validators.updateStatusSchema),
  asyncHandler(adminController.changeToActive)
);
router.patch(
  "/changeToNonActive/:adminId",
  auth(endPoint.updateStatus),
  validation(validators.updateStatusSchema),
  asyncHandler(adminController.changeToNonActive)
);


export default router;
