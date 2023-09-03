import mongoose, {Schema,Types,model} from 'mongoose';
const userSchema = new Schema ({
    userName:{
        type:String,
        required:[true, 'userName is required'],
        min:[2],
        max:[20],
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmEmail:{
        type:Boolean,
        default:false,
    },
    profilePic:{
        type:Object,
    },
    coverPic:{
        type:Object,
    },
    phone:{
        type:String,
    },
    address:{
        type:String,
    },
    gender:{
        type: String,
        enum: ['Male', 'Female'],
    },
    maritalStatus:{
        type: String,
        enum: ['Single', 'Married', 'Divorced', 'Widowed'],
    },
    forgetCode:{
        type:String,
        default:null
    },
    changePasswordTime:{
        type:Date,
    }, 
    wishList:[{
        type: Types.ObjectId, 
        ref: "Product",
    }],
    salary:{
        type:Number,
        default:0
    },
    role:{
        type:String,
        default:'User',
        enum : ['Admin','User','SuperAdmin', 'Employee'],
    },
    status:{
        type:String,
        default:'Active',
        enum : ['Active','Not_Active'],
    }
},
{
    timestamps:true,
})
const userModel = mongoose.models.User ||  model('User', userSchema);
export default userModel;