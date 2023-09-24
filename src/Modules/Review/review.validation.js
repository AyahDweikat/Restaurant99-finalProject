import joi from "joi";
import { generalFeilds } from "../../Middleware/validation.js";

export const addReviewSchema = 
joi.object({
    itemId: generalFeilds.id, 
    rating:joi.number().min(0).max(5).required(),
    comment:joi.string().required(),
}).required()



export const updateReviewSchema = 
joi.object({
    itemId: generalFeilds.id,
    reviewId: generalFeilds.id,
    rating:joi.number().min(0).max(5).required(),
    comment:joi.string().required(),
}).required()

