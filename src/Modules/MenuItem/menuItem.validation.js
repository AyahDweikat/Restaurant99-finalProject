import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";
import { foodSizes } from "../../Services/getAllRoles.js";

export const addItemSchema = 
joi.object({
    name: joi.string().min(2).max(20).required(),
    // file: generalFeilds.file.required(), 
    categoryId:generalFeilds.id.required(),
    description: joi.string(),
    ingredients: joi.string(),
    price: joi.number().min(0),
    discount: joi.number().min(0),
    size:joi.string().valid(...Object.values(foodSizes))
}).required()

export const updateItemSchema = 
joi.object({
    name: joi.string().min(2).max(20),//
    file: generalFeilds.file,
    categoryId:generalFeilds.id,//
    description: joi.string(),//
    ingredients: joi.string(),//
    price: joi.number().min(0),//
    discount: joi.number().min(0),//
    size:joi.string().valid(...Object.values(foodSizes))//
}).required()

export const deleteSchema = 
joi.object({
    itemId:generalFeilds.id,
}).required()

export const changeAvailabilitySchema = 
joi.object({
    itemId:generalFeilds.id,
}).required()

export const getItemInfoSchema = 
joi.object({
    itemId:generalFeilds.id,
}).required()

export const getItemsSchema = 
joi.object({
    categoryId:generalFeilds.id
}).required()