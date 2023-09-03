import { generalFeilds } from "../../Middleware/validation.js";
import joi from "joi";

export const profilePicSchema = joi
  .object({
    file: generalFeilds.file.required(),
  })
  .required();

export const updatePasswordSchema = joi
  .object({
    oldPassword: generalFeilds.password,
    newPassword: generalFeilds.password.invalid(joi.ref("oldPassword")),
    cPassword: joi.string().valid(joi.ref("newPassword")).required(),
  })
  .required();

// export const shareProfileSchema = joi
//   .object({
//     id: generalFeilds.id,
//   })
//   .required();
