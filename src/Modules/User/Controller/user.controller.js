
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

export const getProfile = async (req, res, next) => {
  const user = await userModel
    .findById(req.user._id)
    .select("userName email role status profilePic coverPic ");

  if (!user) return next(new Error("invalid user"));
  return res.json({ message: "success", user });
};

export const getAllUsers = async (req, res, next) => {
  const users = await userModel
    .find({role:'User'})
    .select("userName email role status profilePic ");

  if (!users) return next(new Error("No Users"));
  return res.json({ message: "success", users });
};

export const updateUserInfo = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if(!user) return next(new Error("Invalid User"));
  const updatedUser = await userModel.findByIdAndUpdate(req.user._id, req.body);
  return res.json({ message: "success", updatedUser });
};
export const deleteUser = async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if(!user) return next(new Error("Invalid User"));
  const deletedUser = await userModel.findByIdAndDelete(req.user._id);
  return res.json({ message: "success", deletedUser });
};

// export const getAllAdmins = async (req, res, next) => {
//   const admins = await userModel
//     .find({role:'Admin'})
//     .select("userName email role status profilePic");

//   if (!admins) return next(new Error("No Admins"));
//   return res.json({ message: "success", admins });
// };