import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const changeToAdminSchema = joi
  .object({
    adminId: generalFeilds.id,
    branchId: generalFeilds.id,
  })
  .required();

export const deleteAdminSchema = joi
  .object({
    adminId: generalFeilds.id,
  })
  .required();

export const updateAdminSalarySchema = joi
  .object({
    adminId: generalFeilds.id,
    salary: joi.number().required(),
  })
  .required();

export const updateStatusSchema = joi
  .object({
    adminId: generalFeilds.id,
  })
  .required();

