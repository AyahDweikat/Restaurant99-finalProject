import mongoose, { Schema, Types, model } from "mongoose";
const menuItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
    },
    ingredients: [{
      type: String,
    }],
    description: {
        type: String,
    },
    price: {
      type: Number,
      default: 1,
    },
    finalPrice: {
      type: Number,
      default: 1,
    },
    discount: {
      type: Number,
      default: 0,
    },
    sizes: [{ type: String, enum: ["sm", "md", "lg", "xl"] }],
    mainImage: {
      type: Object,
      required: true,
    },
    subImages: {
      type: Object,
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    isAvailable: {
      type: Boolean,
      default: true
    },
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: { type: Types.ObjectId, ref: "User", required: true }, // required true after prototype
    updatedBy: { type: Types.ObjectId, ref: "User", required: true }, // required true after prototype
  },
  {
    timestamps: true,
  }
);

// menuItemSchema.virtual("reviews", {
//   localField: "_id",
//   foreignField: "itemId",
//   ref: "Review",
// });
const menuItemModel = mongoose.models.MenuItem || model("MenuItem", menuItemSchema);
export default menuItemModel;