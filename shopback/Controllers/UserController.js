import { Admin } from "../Models/Admin.js";
import { sendToken } from "../Utils/SendToken.js";

//Register
export const createUser = async (req, res) => {
    try {
        const { name, email, phoneNo, address, role } = req.body;
    if (!name || !email || !phoneNo || !address || !role){
        sendToken(res,null,"All Fields are Mandatory",400,true);
        return;
    }

    let user = await Admin.findOne({ email });

    if (user){ 
        sendToken(res,null,'User Already Exist',403,true);    
        return;
    } 

    user = await Admin.create({
        name,
        email,
        phoneNo,
        address,
        role
    });
    sendToken(res, user, 'Registered Successfully', 201,false);
    } catch (error) {
        sendToken(res, null,"Internal Server Error", 500,true);
        console.log(error)
    }
};

//Login
export const login = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email){
            sendToken(res, null,"User Not Found", 404,true);
          return;
        }
        const user = await Admin.findOne({ email });
    
        if (!user){
            sendToken(res, null,"Incorrect Username or Password", 400,true);
          return;
        } 
    
        sendToken(res,user,"Login Successfully",200,false);
    } catch (error) {
        sendToken(res, null,"Internal Server Error", 500,true);
        console.log(error)
              
    }
};

//Logout
export const logout = async (req, res, status) => {
   sendToken(res,null,"Logout Successfully",200,false);
};

//Get All User 
export const getAllUser = async(req,res)=>{
    try {
        const user = await Admin.find({}).sort({joinedAt:-1,name:1});

        if(!user) {
            sendToken(res,null,'No User Found',404,true);    
            return;
        }
    
        res.status(200).json({
            success:true,
            user
        });
    } catch (error) {
        sendToken(res, null,"Internal Server Error", 500,true);
        console.log(error)
    }
};