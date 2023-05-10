import mongoose from "mongoose";
import  JWT  from "jsonwebtoken";
const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:[true,'Enter Product Name'],
        minLength:[5,'Product Name should be at least of 4 Characters'],
    },
    description:{
        type:String,
        minLength:[10,'Product Description must be at least 10 Characters'],
        maxLength:[80,'Product Description not be more then 80 Characters']
    },
    category:{
        type:String,
        unique:false
    },
    price:{
        type:Number
    },
    quantity:{
        type:Number,
        default:1
    },
    Stock:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
});
productSchema.methods.getToken = function(){
    return JWT.sign({_id:this._id},process.env.SECRET_KEY,{
        expiresIn:'15d',
    });
};

export const Product = mongoose.model('Product',productSchema);