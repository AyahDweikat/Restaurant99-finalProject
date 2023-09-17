import { Router } from "express";
import { auth } from "../../Middleware/auth.middleware.js";
import { endPoint } from "./MenuItem.endpoint.js";
import fileUpload, { fileValidation } from "./../../Services/multer.js";
import validation from "../../Middleware/validation.js";
import * as validators from "./menuItem.validation.js";
import { asyncHandler } from "./../../Services/errorHandling.js";
import * as menuItemsController from "./Controller/item.controller.js";

// import reviewRouter from '../Review/review.router.js';

const router = Router({ caseSensitive: true, mergeParams: true });

// router.use('/:itemId/review', reviewRouter)
router.post(
  "/addItem",
  auth(endPoint.create),
  fileUpload(fileValidation.image).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  validation(validators.addItemSchema),
  asyncHandler(menuItemsController.addItem)
);
router.put(
  "/updateItem/:itemId",
  auth(endPoint.update),
  fileUpload(fileValidation.image).fields([
    { name: "mainImage", maxCount: 1 },
    { name: "subImages", maxCount: 5 },
  ]),
  validation(validators.updateItemSchema),
  asyncHandler(menuItemsController.updateItem)
);



router.patch(
  "/softDeleteItem/:itemId",
  auth(endPoint.delete),
  validation(validators.deleteSchema),
  asyncHandler(menuItemsController.softDeleteItem)
);
router.patch(
  "/restoreDeletedItem/:itemId",
  auth(endPoint.update),
  validation(validators.deleteSchema),
  asyncHandler(menuItemsController.restoreDeletedItem)
);
router.delete(
  "/forceDeleteItem/:itemId",
  auth(endPoint.delete),
  validation(validators.deleteSchema),
  asyncHandler(menuItemsController.forceDeleteItem)
);

router.patch(
  "/changeToUnAvailable/:itemId",
  auth(endPoint.changeAvailability),
  validation(validators.changeAvailabilitySchema),
  asyncHandler(menuItemsController.changeToUnAvailable)
);
router.patch(
  "/changeToUnAvailable/:itemId",
  auth(endPoint.changeAvailability),
  validation(validators.changeAvailabilitySchema),
  asyncHandler(menuItemsController.changeToUnAvailable)
);






router.get(
  "/getItemInfo/:itemId",
  auth(endPoint.get),
  validation(validators.getItemInfoSchema),
  asyncHandler(menuItemsController.getItemInfo)
);
router.get(
  "/getSoftDeletedItems",
  auth(endPoint.delete),
  asyncHandler(menuItemsController.getSoftDeletedItems)
);
router.get(
  "/getItemsFormCategory/:categoryId",
  auth(endPoint.get),
  validation(validators.getItemsSchema),
  asyncHandler(menuItemsController.getItemsFormCategory)
);
router.get("/getAllItems", auth(endPoint.get), 
asyncHandler(menuItemsController.getAllItems));
export default router;
