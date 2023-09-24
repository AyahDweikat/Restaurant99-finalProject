import * as dotenv from "dotenv";
import reviewModel from "../../../../DB/Model/Review.model.js";
import orderModel from "../../../../DB/Model/Order.model.js";


export const addReview = async (req, res, next) => {
  const { itemId } = req.params;
  const order = await orderModel.findOne({
    userId: req.user._id,
    status: "delivered",
    "items.itemId": itemId,
  });
  if (!order)
    return next(new Error(`Can not review this item`, { cause: 409 }));
  const checkReview = await reviewModel.findOne({
    createdBy: req.user._id,
    itemId,
  });
  if (checkReview) {
    return next(
      new Error(`You have already reviewed this item`, { cause: 409 })
    );
  }
  const newReview = await reviewModel.create({
    ...req.body,
    createdBy: req.user._id,
    updatedBy: req.user._id,
    itemId,
    orderId: order._id,
  });
  return res.status(201).json({
    message: "successfully added Review",
    newReview,
  });
};

export const updateReview = async (req, res, next) => {
  const { reviewId, itemId } = req.params;
  const review = await reviewModel.findOneAndUpdate(
    { _id:reviewId, itemId, createdBy:req.user._id},
    req.body,
    { new: true }
  );
  return res.status(201).json({
    message: "successfully added Review",
    review,
  });
};
