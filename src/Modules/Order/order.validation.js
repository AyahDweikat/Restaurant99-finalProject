import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";


export const addOrderSchema = 
joi.object({
    items: joi.array().required(),
    address: joi.string(),
    phoneNumber: joi.string(),
    paymentType: joi.string(),
    placeToEat: joi.string().required(),
    personsNumber: joi.number(),
    note: joi.string(),
}).required()

export const updateOrderSchema = 
joi.object({
    orderId: generalFeilds.id,
    items: joi.array(),
    address: joi.string(),
    phoneNumber: joi.string(),
    paymentType: joi.string(),
    placeToEat: joi.string(),
    personsNumber: joi.number(),
    note: joi.string(),
}).required()

export const cancelOrderSchema = 
joi.object({
    orderId: generalFeilds.id,
    reasonRejected: joi.string().required()
}).required()



export const changeOrderStateSchema = 
joi.object({
    orderId: generalFeilds.id,
    status: joi.string().required()
}).required()