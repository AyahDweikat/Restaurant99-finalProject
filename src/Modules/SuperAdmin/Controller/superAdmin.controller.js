import userModel from "../../../../DB/Model/User.model.js";

export const changeToSuperAdmin = async (req, res, next) => {
  const { superAdminId } = req.params;
  const superAdmin = await userModel.findById(superAdminId);
  if (!superAdmin) {
    return next(new Error("invalid SuperAdmin"));
  }
  else if(superAdmin.role=='SuperAdmin'){
    return next(new Error("CThe user is already SuperAdmin"));
  }
  const updatedSuperAdmin = await userModel.findOneAndUpdate(
    { _id: superAdminId },
    {
      role: "SuperAdmin",
    },
    { new: true }
  );
  return res.json({ message: "success", updatedSuperAdmin });
};
export const updateSuperAdminSalary = async (req, res, next) => {
  const { superAdminId } = req.params;
  const { salary } = req.body;
  const superAdmin = await userModel.findOne({_id:superAdminId, role:'SuperAdmin'});
  if (!superAdmin) {
    return next(new Error("Invalid SuperAdmin"));
  }
  const updatedSuperAdmin = await userModel.findOneAndUpdate(
    { _id: superAdminId, role: "SuperAdmin" },
    {
      salary,
    },
    { new: true }
  );
  return res.json({ message: "success", updatedSuperAdmin });
};
export const deleteSuperAdmin = async (req, res, next) => {
  const { superAdminId } = req.params;
  const superAdmin = await userModel.findOne({_id:superAdminId, role:'SuperAdmin'});
  if (!superAdmin) {
    return next(new Error("invalid SuperAdmin"));
  }
  const updatedSuperAdmin = await userModel.findOneAndUpdate(
    { _id: superAdminId, role: "SuperAdmin" },
    {
      role: "User",
      salary: 0,
      status:'Active'
    },
    { new: true }
  );
  return res.json({ message: "success", updatedSuperAdmin });
};
export const getAllSuperAdmins = async (req, res, next) => {
  const allSuperAdmins = await userModel.find({ role: "SuperAdmin" });
  if (!allSuperAdmins) return next(new Error("No Admins"));
  return res.status(201).json({ message: "success", allSuperAdmins });
};
