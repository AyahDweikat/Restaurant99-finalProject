import mongoose, { Schema, Types, model } from "mongoose";
const orderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },
    items: [
      {
        itemId: { type: Types.ObjectId, ref: "MenuItem", required: true },
        qty: { type: Number, default: 1, required: true },
        size: { type: String, default: "sm", required: true },
        price: { type: Number, required: true },
        finalPrice: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String},
      },
    ],
    address: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    finalPrice: { type: Number, required: true },
    paymentType: {
      type: String,
      dafault: 'cash',
      enum: ['cash', 'card'],
    },
    placeToEat:{ type: String, enum: ["take-away", "in-restaurant"], required:true },
    personsNumber:{ type: Number },
    status: {
      type: String,
      dafault: 'pending',
      enum: ['pending', 'canceled', 'onWay', 'delivered'],
    },
    reasonRejected: {type: String},
    note: {type: String},
    updatedBy: { type: Types.ObjectId, ref: "User"},
  },
  {
    timestamps: true,
  }
);
const orderModel = mongoose.models.Order || model("Order", orderSchema);
export default orderModel;
