export const sendAuth =(res,product,message,statusCode=200,isError)=>{
    const token =product?.getToken();
    const options = {
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
        product,  
      });
    }
    if(isError)
    {
      res.status(statusCode).json({
        success:false,
        message,
        product,  
      });
    }
  }