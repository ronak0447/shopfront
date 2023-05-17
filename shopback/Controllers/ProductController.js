import { Product } from "../Models/Product.js";
import {sendAuth} from '../Utils/SendAuth.js'

//Add Product
export const addProduct = async(req,res)=>{
    const {productname,description,category,price,quantity,Stock} = req.body;

    if(!productname || !description || !category || !price || !quantity || !Stock){
        sendAuth(res,'All Fields are Mandatory',400,true);
    return;}

    let product = await Product.findOne({productname});

    if(product){
        sendAuth(res,null,'Product Already Exist',403,true);
        return;} 

    await Product.create({ 
        productname,
        description,
        category,  
        price,
        quantity,
        Stock
    });
    sendAuth(res,product,'Product Created Successfully',201,false);
};

//Update Product 
export const updateProduct = async(req,res)=>{
  try {
    const {productname,description,category,price,quantity,Stock} = req.body;

    if(!productname || !description || !category || !price || !quantity || !Stock){
        sendAuth(res,'All Fields are Mandatory',400,true);
    return;}
    let product = await Product.findById(req.params.id);

    if(!product){sendAuth(res,null,'Product Not Found',404,true);
    return;}

    await Product.updateOne({_id:req.params.id},{
        productname,
        description,
        category,
        price,
        quantity,
        Stock
    });
    await product.save();
    sendAuth(res,product,'Product Updated Successfully',201,false);
  } catch (error) {
    sendAuth(res,null,'Internal Server Error',500,true);
  }
};

//Delete Product
export const deleteProduct = async(req,res)=>{

    let product = await Product.findById(req.params.id);

    if(!product){sendAuth(res,null,'Product Not Found',404,true);
    return;}

    await Product.deleteOne();

    sendAuth(res,null,'Product Deleted Successfully',201,false);
};

//Get All Products
export const getAllProducts = async(req,res)=>{

   try {
    const keyword = req.query.keyword || "";
    const category = req.query.category || "";
    const pageNumber = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;

    const skip = (pageNumber - 1) * pageSize;

    const product = await  Product.find({
        productname:{
            $regex:keyword,
            $options:"i",
        },
        category:{
            $regex:category,    
            $options:"i",
        }
    }).sort({createdAt:-1,productname:1})
      .skip(skip).limit(pageSize).exec();

    const totalCount = await Product.countDocuments().exec();
    const noOfPage = Math.ceil(totalCount/pageSize)
    if(!product){sendAuth(res,null,'Product Not Found',404,true);
    return;} 
    res.status(200).json({ 
        success:true,
        page: pageNumber,
        pageSize, 
        total: noOfPage, 
        product,
    });
   } catch (error) {
    res.status(500).json({
        success:false,
        message:'Internal Server Error'
    });
   }
  
};