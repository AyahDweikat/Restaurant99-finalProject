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

// router.get(
//   "/profile/:profileId",
//   validation(validators.shareProfileSchema),
//   asyncHandler(userController.shareProfile)
// );
export default router;
