 import mongoose, {Schema,Types,model} from 'mongoose';
const reviewSchema = new Schema ({
    comment:{
        type:String,
        required:true,
    },
    rating: { type: Number, required:true, min:1, max:5 },
    itemId: {type: Types.ObjectId, ref: "MenuItem", required:true},
    orderId: { type: Types.ObjectId, ref: "Order", required:true},
    createdBy: { type: Types.ObjectId, ref: "User", required:true},
    updatedBy: { type: Types.ObjectId, ref: "User", required:true},
},
{
    timestamps:true,
})
const reviewModel = mongoose.models.Review ||  model('Review', reviewSchema);
export default reviewModel;


