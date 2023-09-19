import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./branch.endpoint.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./branch.validation.js";
import { asyncHandler } from './../../Services/errorHandling.js';
import * as BranchController from "./Controller/branch.controller.js";


const router = Router();



router.post(
  "/addBranch",
  auth(endPoint.create),
  validation(validators.addBranchSchema),
  asyncHandler(BranchController.addBranch)
);

router.patch(
  "/updateBranch/:branchId",
  auth(endPoint.update),
  validation(validators.updateBranchSchema),
  asyncHandler(BranchController.updateBranch)
);
router.delete(
  "/deleteBranch/:branchId",
  auth(endPoint.delete),
  validation(validators.deleteBranchSchema),
  asyncHandler(BranchController.deleteBranch)
);

router.get(
  "/getBranchInfo/:branchId",
  auth(endPoint.get),
  validation(validators.getBranchInfoSchema),
  asyncHandler(BranchController.getBranchInfo)
);
router.get(
  "/getAllBranches",
  auth(endPoint.get),
  asyncHandler(BranchController.getAllBranches)
);
export default router;
