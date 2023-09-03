import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const changeToEmployeeSchema = joi
  .object({
    employeeId: generalFeilds.id,
  })
  .required();
export const deleteEmployeeSchema = joi
  .object({
    employeeId: generalFeilds.id,
  })
  .required();

export const updateEmployeeSalarySchema = joi
  .object({
    employeeId: generalFeilds.id,
    salary: joi.number().required(),
  })
  .required();

export const updateUserInfoSchema = joi
  .object({
    userName: joi.string().min(2).max(20),
    email: generalFeilds.email,
    phone: joi.string(),
    address: joi.string(),
    gender: joi.string(),
    maritalStatus: joi.string(),
  })
  .required();
