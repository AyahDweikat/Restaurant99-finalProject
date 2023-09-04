import userModel from "../../../../DB/Model/User.model.js";

export const changeToAdmin = async (req, res, next) => {
  const { adminId } = req.params;
  const admin = await userModel.findById(adminId);
  if (!admin) {
    return next(new Error("invalid Admin"));
  }
  else if(admin.role=='SuperAdmin' || admin.role=='Admin'){
    return next(new Error("Can not change this user to admin"));
  }
  const updatedAdmin = await userModel.findOneAndUpdate(
    { _id: adminId },
    {
      role: "Admin",
    },
    { new: true }
  );
  return res.json({ message: "success", updatedAdmin });
};
export const updateAdminSalary = async (req, res, next) => {
  const { adminId } = req.params;
  const { salary } = req.body;
  const admin = await userModel.findOne({_id:adminId, role:'Admin'});
  if (!admin) {
    return next(new Error("Invalid Admin"));
  }
  const updatedAdmin = await userModel.findOneAndUpdate(
    { _id: adminId, role: "Admin" },
    {
      salary,
    },
    { new: true }
  );
  return res.json({ message: "success", updatedAdmin });
};
export const deleteAdmin = async (req, res, next) => {
  const { adminId } = req.params;
  const admin = await userModel.findOne({_id:adminId, role:'Admin'});
  if (!admin) {
    return next(new Error("invalid Admin"));
  }
  const updatedAdmin = await userModel.findOneAndUpdate(
    { _id: adminId, role: "Admin" },
    {
      role: "User",
      salary: 0,
    },
    { new: true }
  );
  return res.json({ message: "success", updatedAdmin });
};
export const getAllAdmins = async (req, res, next) => {
  const allAdmins = await userModel.find({ role: "Admin" });
  if (!allAdmins) return next(new Error("No Admins"));
  return res.status(201).json({ message: "success", allAdmins });
};

export const changeToActive = async (req, res, next) => {
  const { adminId } = req.params;
  const admin = await userModel.findOne({_id:adminId, role:'Admin', status:'Not_Active'});
  if (!admin) {
    return next(new Error("invalid Admin"));
  }
  const updatedAdmin = await userModel.findOneAndUpdate({_id:adminId, role:'Admin'}, {
    status: "Active",
  }, {new:true});
  return res.json({ message: "success", updatedAdmin });
};

export const changeToNonActive = async (req, res, next) => {
    const { adminId } = req.params;
    const admin = await userModel.findOne({_id:adminId, role:'Admin', status:'Active'});
    if (!admin) {
      return next(new Error("invalid Admin"));
    }
    const updatedAdmin = await userModel.findOneAndUpdate({_id:adminId, role:'Admin'}, {
      status: "Not_Active"
    }, {new:true});
    return res.json({ message: "success", updatedAdmin });
  };