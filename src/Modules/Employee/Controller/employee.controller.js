import userModel from "../../../../DB/Model/User.model.js";

export const changeToEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  const employee = await userModel.findById(employeeId);
  if (!employee) {
    return next(new Error("invalid Employee"));
  }
  const updatedEmployee = await userModel.findOneAndUpdate(
    { _id: employeeId, role: "User" },
    {
      role: "Employee",
    },
    { new: true }
  );
  return res.json({ message: "success", updatedEmployee });
};
export const updateEmployeeSalary = async (req, res, next) => {
  const { employeeId } = req.params;
  const { salary } = req.body;
  const employee = await userModel.findById(employeeId);
  if (!employee) {
    return next(new Error("invalid Employee"));
  }
  const updatedEmplyee = await userModel.findOneAndUpdate(
    { _id: employeeId, role: "Employee" },
    {
      salary,
    },
    { new: true }
  );
  return res.json({ message: "success", updatedEmplyee });
};
export const deleteEmployee = async (req, res, next) => {
  const { employeeId } = req.params;
  const employee = await userModel.findById(employeeId);
  if (!employee) {
    return next(new Error("invalid Employee"));
  }
  const updatedEmplyee = await userModel.findOneAndUpdate(
    { _id: employeeId, role: "Employee" },
    {
      role: "User",
      salary: 0,
    },
    { new: true }
  );
  return res.json({ message: "success", updatedEmplyee });
};
export const getAllEmployees = async (req, res, next) => {
  const allEmployees = await userModel.find({ role: "Employee" });
  if (!allEmployees) return next(new Error("No Employees"));
  return res.status(201).json({ message: "success", allEmployees });
};

// export const changeActiveStatus = async (req, res, next) => {
//   const { employeeId } = req.params;
//   const employee = await userModel.findById(employeeId);
//   if (!employee) {
//     return next(new Error("invalid Employee"));
//   }
//   const updatedEmployee = {}
//   if(employee.status == 'Not_Active') {
//     updatedEmployee = await userModel.findByIdAndUpdate(employeeId, {
//       status: "Active",
//     });
//   }
//   else {
//     updatedEmployee = await userModel.findByIdAndUpdate(employeeId, {
//       status: "Not_Active",
//     });
//   }
//   return res.json({ message: "success", updatedEmployee });
// };
