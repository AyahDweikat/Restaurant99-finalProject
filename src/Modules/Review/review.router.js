import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./review.endpoint.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./review.validation.js";
import { asyncHandler } from './../../Services/errorHandling.js';
import * as ReviewController from "./Controller/review.controller.js";



const router = Router({ caseSensitive: true, mergeParams:true });



router.post(
  "/addReview",
  auth(endPoint.create),
  validation(validators.addReviewSchema),
  asyncHandler(ReviewController.addReview)
);

router.patch(
  "/updateReview/:reviewId",
  auth(endPoint.update),
  validation(validators.updateReviewSchema),
  asyncHandler(ReviewController.updateReview)
);
export default router;
