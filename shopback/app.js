import express, { urlencoded } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { config } from 'dotenv';
import User from './Routes/UserRoutes.js';
import Product from './Routes/ProductRoutes.js';

config({
    path:'./Config/config.env'
});

const app = express()

app.use(cors({
    origin:process.env.FRONTED_URL,
    credentials:true,
    methods:['POST','GET','PUT','DELETE']
}));
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());
app.use('/api',User);
app.use('/api',Product);

export default app