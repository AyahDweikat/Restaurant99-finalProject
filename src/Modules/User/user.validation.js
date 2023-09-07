import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const profilePicSchema = joi
  .object({
    file: generalFeilds.file
  })
  .required();
export const updatePasswordSchema = joi
  .object({
    oldPassword: generalFeilds.password,
    newPassword: generalFeilds.password.invalid(joi.ref("oldPassword")),
    cPassword: joi.string().valid(joi.ref("newPassword")).required(),
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
