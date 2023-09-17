import { Router } from "express";
import { auth, roles } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./Category.endpoint.js";
import fileUpload, { fileValidation } from './../../Services/multer.js';
import * as validators from "./Category.validation.js";
import validation from "../../Middleware/validation.js";
import { asyncHandler } from './../../Services/errorHandling.js';
import * as CategoryController from "./Controller/Category.controller.js";

const router = Router({caseSensitive:true});
router.post(
  "/addCategory",
  auth(endPoint.create),
  fileUpload(fileValidation.image).single("image"),
  validation(validators.addCategorySchema),
  asyncHandler(CategoryController.addCategory)
);
router.put(
  "/updateCategory/:categoryId",
  auth(endPoint.update),
  fileUpload(fileValidation.image).single("image"),
  validation(validators.updateCategorySchema),
  asyncHandler(CategoryController.updateCategory)
);
router.delete(
  "/deleteCategory/:categoryId",
  auth(endPoint.delete),
  validation(validators.deleteCategorySchema),
  asyncHandler(CategoryController.deleteCategory)
);

router.get(
  "/getCategory/:categoryId",
  auth(endPoint.get),
  validation(validators.getCategorySchema),
  asyncHandler(CategoryController.getCategory)
);
router.get(
  "/getAllCategories",
  auth(endPoint.get),
  asyncHandler(CategoryController.getAllCategories)
);
export default router;
