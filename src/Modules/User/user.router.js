import { Router } from "express";
import fileUpload, { fileValidation } from "./../../Services/multerCloudinary.js";
import { auth } from "../../Middleware/auth.middleware.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./user.validation.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import * as userController from "./Controller/user.controller.js";
import { endPoint } from "./user.endpoint.js";

const router = Router({ caseSensitive: true });

router.patch(
  "/profilePic",
  auth(endPoint.update),
  fileUpload(fileValidation.image).single("image"),
  validation(validators.profilePicSchema),
  asyncHandler(userController.profilePic)
);

router.patch(
  "/coverPic",
  auth(endPoint.update),
  fileUpload(fileValidation.image).single("image"),
  validation(validators.profilePicSchema),
  asyncHandler(userController.coverPic)
);

router.patch(
  "/updatePassword",
  auth(endPoint.update),
  validation(validators.updatePasswordSchema),
  asyncHandler(userController.updatePassword)
);

router.patch(
  "/changeToActive",
  auth(endPoint.updateStatus),
  // validation(validators.updatePasswordSchema),
  asyncHandler(userController.changeToActive)
);
router.patch(
  "/changeToNonActive",
  auth(endPoint.updateStatus),
  // validation(validators.updatePasswordSchema),
  asyncHandler(userController.changeToNonActive)
);
router.get(
  "/getProfile",
  auth(endPoint.get),
  asyncHandler(userController.getProfile)
);
router.get(
  "/getAllUsers",
  auth(endPoint.getAllUsers),
  asyncHandler(userController.getAllUsers)
);
router.get(
  "/getAllEmployees",
  auth(endPoint.getAllEmployees),
  asyncHandler(userController.getAllEmployees)
);
router.get(
  "/getAllAdmins",
  auth(endPoint.getAllAdmins),
  asyncHandler(userController.getAllAdmins)
);
export default router;
