import React, { Fragment, useEffect, useState } from 'react'
import Header from '../Header/Header';
import './Products.css';
import axios from 'axios';
import URI from '../Config/config';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';



const Products = (props:{setUpdateValue:React.Dispatch<React.SetStateAction<object>>}) => {

  const navigate = useNavigate();
  const [keyword,setKeyword] = useState<string>('');
  const [category,setCategory]= useState<string>('');
  const [product,setProduct] = useState([]);

  console.log(keyword)
  useEffect(()=>{
    async function fetchdata(){
      await axios.get(`${URI}/api/products?keyword=${keyword}&category=${category}`,{
        headers:{
          'Authorization':localStorage.getItem('token'),
        }
      }).then(res=>res.data.product).then(
        (products)=>{
          setProduct(products)
        },
        (error)=>{
          toast.error(error)
        }
      )
    };
    fetchdata();
  },[keyword,category])

  const deleteProductHandler =async(id:string)=>{
    let del = await axios.delete(`${URI}/api/deleteproduct/${id}`,{
      headers:{
        'Authorization':localStorage.getItem('token'),
      }
    })
    if(del.data.success===true){
      toast.success(del.data.message)
    }
    async function fetchdatas(){
      await axios.get(`${URI}/api/products`,{
        headers:{
          'Authorization':localStorage.getItem('token'),
        }
      }).then(res=>res.data.product).then(
        (products)=>{
          setProduct(products)
        },
        (error)=>{
          toast.error(error)
        }
      )
    };
    fetchdatas();
  }
  const updateProductHandler = (id:string,data:object) =>{
    props.setUpdateValue(data)
    navigate(`/products/addproduct`)
  }
  const fetchPro = (e:any) =>{
    e.preventDefault()
    async function fetchdata(){
      await axios.get(`${URI}/api/products?keyword=${keyword}&category=${category}`,{
        headers:{
          'Authorization':localStorage.getItem('token'),
        }
      }).then(res=>res.data.product).then(
        (products)=>{
          setProduct(products)
        },
        (error)=>{
          toast.error(error)
        }
      )
    };
    fetchdata();
  }
  return (
    <Fragment>
        <Header keyword={keyword} setkeyword={setKeyword} setCategory={setCategory}/>
        <h3 className="producthead" onClick={fetchPro}>All Products</h3>
        <table>
          <tr>
            <th>ProductName</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Stock</th>
            <th>Price</th>
            <th>createdAt</th>
            <th>Action</th>
          </tr>
          <tbody>
            {
              product.length>0 &&
              product.map((products:any)=>(
                <tr key={products._id}>
                <td>{products.productname}</td>
                <td>{products.description}</td>
                <td>{products.category}</td>
                <td>{products.quantity}</td>
                <td>{products.Stock}</td>
                <td>{products.price}</td>
                <td>{products.createdAt.split('T')[0]}</td>
                <td><button className='update' onClick={()=>updateProductHandler(products._id,products)}>Update</button></td>
                <td><button className='delete' onClick={()=>deleteProductHandler(products._id)}>Delete</button></td>
              </tr>
              ))
            }
          </tbody>
        </table>
    </Fragment>
  )
}

export default Products;
