import * as dotenv from "dotenv";
import branchModel from "../../../../DB/Model/Branch.model.js";

export const addBranch = async (req, res, next) => {
  const newBranch = await branchModel.create({
    ...req.body,
    createdBy: req.user._id,
  });
  return res.status(201).json({
    message: "successfully added Branch",
    newBranch,
  });
};

export const updateBranch = async (req, res, next) => {
  const { branchId } = req.params;
  const branch = await branchModel.findOneAndUpdate(
    { _id: branchId },
    req.body,
    { new: true }
  );
  return res.status(201).json({
    message: "successfully updated Branch",
    branch,
  });
};

export const deleteBranch = async (req, res, next) => {
  const { branchId } = req.params;
  const deletedBranch = await branchModel.findOneAndDelete({ _id: branchId });
  return res.status(201).json({
    message: "successfully deleted Branch",
    deletedBranch,
  });
};

export const getBranchInfo = async (req, res, next) => {
  const { branchId } = req.params;
  const branch = await branchModel
    .findOne({ _id: branchId })
    .populate({
      path: "employees",
      match: { role: { $eq: "Employee" } },
    })
    .populate({
      path: "admin",
      match: { role: { $eq: "Admin" } },
    });

  return res.status(201).json({
    message: "successfully get Branch Info",
    branch,
  });
};

export const getAllBranches = async (req, res, next) => {
  const allBranches = await branchModel.find()
  .populate({
    path: "employees",
    match: { role: { $eq: 'Employee' }},
  })
  .populate({
    path: "admin",
    match: { role: { $eq: 'Admin' } },
  })
  return res.status(201).json({
    message: "successfully get All Branches",
    allBranches,
  });
};
