import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const addBranchSchema = 
joi.object({
    name: joi.string().min(2).max(20).required(),
    phone: joi.string().min(2).max(20),
    address: joi.string().min(2).max(100)
}).required()



export const updateBranchSchema = 
joi.object({
    branchId:generalFeilds.id,
    name: joi.string().min(2).max(20),
    phone: joi.string().min(2).max(20),
    address: joi.string().min(2).max(100)
}).required()

export const deleteBranchSchema = 
joi.object({
    branchId:generalFeilds.id,
}).required()

export const getBranchInfoSchema = 
joi.object({
    branchId:generalFeilds.id,
}).required()