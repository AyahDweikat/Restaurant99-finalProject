import mongoose, { Schema, Types, model } from "mongoose";
const branchSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    createdBy: { type: Types.ObjectId, ref: "User", required: true },
    updatedBy: { type: Types.ObjectId, ref: "User"},
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);
branchSchema.virtual("employees", {
  localField: "_id",
  foreignField: "branchId",
  ref: "User",
});
branchSchema.virtual("admin", {
  localField: "_id",
  foreignField: "branchId",
  ref: "User",
});
const branchModel = mongoose.models.Branch || model("Branch", branchSchema);
export default branchModel;
