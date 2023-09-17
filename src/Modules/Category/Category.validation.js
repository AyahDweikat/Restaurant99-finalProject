import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const addCategorySchema = 
joi.object({
    name: joi.string().min(2).max(20).required(),
    file: generalFeilds.file.required()
}).required()



export const updateCategorySchema = 
joi.object({
    categoryId:generalFeilds.id,
    name: joi.string().min(2).max(20),
    file: generalFeilds.file,
}).required()

export const deleteCategorySchema = 
joi.object({
    categoryId:generalFeilds.id
}).required()

export const getCategorySchema = 
joi.object({
    categoryId:generalFeilds.id
}).required()