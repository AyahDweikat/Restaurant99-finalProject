import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./table.endpoint.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./table.validation.js";
import { asyncHandler } from './../../Services/errorHandling.js';
import * as TableController from "./Controller/table.controller.js";


const router = Router();

router.post(
  "/addTable",
  auth(endPoint.create),
  validation(validators.addTableSchema),
  asyncHandler(TableController.addTable)
);

router.patch(
  "/updateTableInfo/:tableId",
  auth(endPoint.update),
  validation(validators.updateTableInfoSchema),
  asyncHandler(TableController.updateTableInfo)
);

router.patch(
  "/reserveTable/:tableId",
  auth(endPoint.reserve),
  validation(validators.reserveTableSchema),
  asyncHandler(TableController.reserveTable)
);
router.patch(
  "/addEvent/:branchId",
  auth(endPoint.reserve),
  asyncHandler(TableController.addEvent)
);
router.patch(
  "/removeEvent/:branchId",
  auth(endPoint.reserve),
  asyncHandler(TableController.removeEvent)
);
router.patch(
  "/removeReservation/:tableId",
  auth(endPoint.reserve),
  validation(validators.reserveTableSchema),
  asyncHandler(TableController.removeReservation)
);

router.delete(
  "/deleteTable/:tableId",
  auth(endPoint.delete),
  validation(validators.deleteTableSchema),
  asyncHandler(TableController.deleteTable)
);

router.get(
  "/getTableInfo/:tableId",
  auth(endPoint.getInfo),
  validation(validators.getTableInfoSchema),
  asyncHandler(TableController.getTableInfo)
);
router.get(
  "/getTablesInBranch/:branchId",
  auth(endPoint.getStatus),
  validation(validators.getTablesInBranchSchema),
  asyncHandler(TableController.getTablesInBranch)
);

export default router;
