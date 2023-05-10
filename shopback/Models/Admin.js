import mongoose from "mongoose";
import  JWT  from "jsonwebtoken";

const adminSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Enter Your Name']
    },
    email:{
        type:String,
        unique:true
    },
    address:{
        type:String,
    },
    dob:{
        type:Date,
    },
    phoneNo:{
        type:Number,
    },
    role:{
        type:String,
        default:'user'
    },
    joinedAt:{
        type:Date,
        default:Date.now()
    },
});
adminSchema.methods.getToken = function(){
    return JWT.sign({_id:this._id},process.env.SECRET_KEY,{
        expiresIn:'15d',
    });
};

export const Admin = mongoose.model('Admin',adminSchema);