import mongoose, {Schema,Types,model} from 'mongoose';
const tableSchema = new Schema ({
    tableNumber:{
        type: String,
        required:true,
    },
    branchId: { type: Types.ObjectId, ref: "Branch", required:true},
    orderId: { type: Types.ObjectId, ref: "Order"},
    isReserved:{
        type: Boolean, 
        default: false,
    },
    reservedTo: { type: Types.ObjectId, ref: "User"},
    chairsNumber: { type: Number, required: true },
    createdBy: { type: Types.ObjectId, ref: "User", required:true},
    updatedBy: { type: Types.ObjectId, ref: "User", required:true},
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps:true,
})
const tableModel = mongoose.models.Table ||  model('Table', tableSchema);
export default tableModel;


