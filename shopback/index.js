import app from './app.js';
import {ConnectDb} from './Config/Database.js';

ConnectDb()


app.listen(process.env.PORT,()=>{
    console.log(`Server Running On Port: ${process.env.PORT}`);
});