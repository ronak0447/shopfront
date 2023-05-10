import  jwt  from "jsonwebtoken";
import ErrorHandler from "../Utils/ErrorHandler.js";
import {Admin} from '../Models/Admin.js';

export const isAuthenticated = async(req,res,next)=>{
   try {
    const token = req.header('Authorization');
    if(!token) return next(new ErrorHandler("Please Login for access resources",401));

    const decoded = jwt.verify(token,process.env.SECRET_KEY);
    req.user = await Admin.findById(decoded._id);
    next();
   } catch (error) {
    res.status(500).json({
        success:false,
        message:'Internal Server Problem'
    })
   }
};

export const authorizeAdmin = async(req,res,next)=>{
    const token = req.header('Authorization');
    const decoded = jwt.verify(token,process.env.SECRET_KEY);

    req.user = await Admin.findById(decoded._id);
    if(req.user.role!=="admin") return next(
        new ErrorHandler(
            `${req.user.role} is not allowed to access this resource`,403
        ),
    );
    next();
};