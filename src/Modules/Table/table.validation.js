import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const addTableSchema = 
joi.object({
    tableNumber: joi.string().min(2).max(20).required(),
    branchId:generalFeilds.id,
}).required()

export const updateTableInfoSchema = 
joi.object({
    tableNumber: joi.string().min(2).max(20),
    branchId:generalFeilds.id,
    tableId:generalFeilds.id,
}).required()

export const reserveTableSchema = 
joi.object({
    tableId: generalFeilds.id,
}).required()

export const deleteTableSchema = 
joi.object({
    tableId:generalFeilds.id,
}).required()

export const getTableInfoSchema = 
joi.object({
    tableId:generalFeilds.id,
}).required()

export const getTablesInBranchSchema = 
joi.object({
    branchId:generalFeilds.id,
}).required()


