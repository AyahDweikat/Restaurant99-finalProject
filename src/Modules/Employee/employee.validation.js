import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const changeToEmployeeSchema = joi
  .object({
    employeeId: generalFeilds.id,
    branchId: generalFeilds.id,
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

