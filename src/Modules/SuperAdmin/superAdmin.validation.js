import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const changeToSuperAdminSchema = joi
  .object({
    superAdminId: generalFeilds.id,
  })
  .required();

export const deleteSuperAdminSchema = joi
  .object({
    superAdminId: generalFeilds.id,
  })
  .required();

export const updateSuperAdminSalarySchema = joi
  .object({
    superAdminId: generalFeilds.id,
    salary: joi.number().required(),
  })
  .required();


