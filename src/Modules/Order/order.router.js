import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from './order.endpoint.js';
import validation from "../../Middleware/validation.js";
import * as validators from './order.validation.js'
import { asyncHandler } from "../../Services/errorHandling.js";
import * as OrderController from "./Controller/order.controller.js";

const router = Router({caseSensitive:true});

router.post(
  "/addOrder",
  auth(endPoint.create),
  validation(validators.addOrderSchema),
  asyncHandler(OrderController.addOrder)
);
router.patch(
  "/updateOrder/:orderId",
  auth(endPoint.update),
  validation(validators.updateOrderSchema),
  asyncHandler(OrderController.updateOrder)
);


router.patch(
  "/cancelOrder/:orderId",
  auth(endPoint.cancel),
  validation(validators.cancelOrderSchema),
  asyncHandler(OrderController.cancelOrder)
);


router.patch(
  "/changeOrderState/:orderId",
  auth(endPoint.changeStatus),
  validation(validators.changeOrderStateSchema),
  asyncHandler(OrderController.changeOrderState)
);

export default router;
