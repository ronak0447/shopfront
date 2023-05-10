export const sendToken =(res,user,message,statusCode=200,isError)=>{
    
    const token = user?.getToken();
    const options ={
     expires:new Date(Date.now()+15*24*60*60*1000),
     httpOnly:true,
    //  secure:true,
     sameSite:"none",
    }
     if(!isError)
      {
        res.status(statusCode).cookie('token',token,options).json({
          success:true,
          message,
          token,
          user,  
        });
      }
      if(isError)
      {
        res.status(statusCode).json({
          success:false,
          message,
          user,  
        });
      }
    }
   