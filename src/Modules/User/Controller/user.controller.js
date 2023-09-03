
import userModel from "../../../../DB/Model/User.model.js";
import cloudinary from "../../../Services/cloudinary.js";
import { asyncHandler } from "../../../Services/errorHandling.js";
import { compare, hash } from "../../../Services/hashAndCompare.js";

export const profilePic = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("please provide a file"));
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/user/${req.user._id}/profilePic` }
  );
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {profilePic:{ public_id, secure_url }},
    { new: true }
  );
  if (req.user.profilePic) {
    await cloudinary.uploader.destroy(req.user.profilePic.public_id);
  }
  return res.json({ message: "success", user });
};

export const coverPic = async (req, res, next) => {
  if (!req.file) {
    return next(new Error("please provide a file"));
  }
  const { public_id, secure_url } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `${process.env.APP_NAME}/user/${req.user._id}/coverPic` }
  );
  const user = await userModel.findByIdAndUpdate(
    req.user._id,
    {coverPic:{ public_id, secure_url }},
    { new: true }
  );
  if (req.user.coverPic) {
    await cloudinary.uploader.destroy(req.user.coverPic.public_id);
  }
  return res.json({ message: "success", user });
};

export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const user = await userModel.findById(req.user._id);
  const match = compare(oldPassword, user.password);
  if (!match) {
    return next(new Error("invalid password "));
  }
  const hashPassword = hash(newPassword);
  await userModel.findByIdAndUpdate(req.user._id, { password: hashPassword });
  return res.json({ message: "success" });
};

// export const shareProfile = async (req, res, next) => {
//   const user = await userModel
//     .findById(req.params.id)
//     .select("userName email ");

//   if (!user) {
//     return next(new Error("invalid profile id"));
//   } else {
//     return res.json({ message: "success", user });
//   }
// };
