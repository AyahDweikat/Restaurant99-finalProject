import { Router } from "express";
import fileUpload, { fileValidation } from "./../../Services/multerCloudinary.js";
import { auth } from "../../Middleware/auth.middleware.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./user.validation.js";
import { asyncHandler } from "../../Services/errorHandling.js";
import * as userController from "./Controller/user.controller.js";
import { endPoint } from "./user.endpoint.js";

const router = Router();

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
  "/updateUserInfo",
  auth(endPoint.update),
  validation(validators.updateUserInfoSchema),
  asyncHandler(userController.updateUserInfo)
);
router.get(
  "/getProfile",
  auth(endPoint.get),
  asyncHandler(userController.getProfile)
);
router.delete(
  "/deleteUser",
  auth(endPoint.delete),
  asyncHandler(userController.deleteUser)
)
router.get(
  "/getAllUsers",
  // auth(endPoint.getAllUsers),
  asyncHandler(userController.getAllUsers)
);

export default router;
