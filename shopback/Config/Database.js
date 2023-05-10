import mongoose from "mongoose";

export const ConnectDb = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDb Connected With Server');
    } catch (error) {
        console.log(`Server is Shutting Down Due to error ${error}`);
    }
};