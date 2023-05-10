import React, { Fragment, useState } from 'react'
import Header from '../Header/Header';
import './AddProduct.css';
import axios from 'axios';
import URI from '../Config/config';
import { toast } from 'react-hot-toast';
interface UpdateObject {
_id?:string,    
productname?:string,
description?:string,
category?:string,
quantity?:number,
Stock?:number,
price?:number,
}

interface props{
    setUpdateValue?:React.Dispatch<React.SetStateAction<object>>
    updateValues?:UpdateObject
}
const AddProduct = (props:props) => {
    const isUpdate = Object.keys(props?.updateValues||{}).length>0
    const [productname,setName] = useState<string>(props.updateValues?.productname||"");
    const [description,setDescription] = useState<string>(props.updateValues?.description||"");
    const [category,setCategory] = useState<string>(props.updateValues?.category||"")
    const [quantity,setQuantity] = useState<number>(props.updateValues?.quantity||0);
    const [Stock,setStock] = useState<number>(props.updateValues?.Stock||0);
    const [price,setPrice] = useState<number>(props.updateValues?.price||0);

    const categories = [
        'Mobile',
        'Laptop',
        'Electronics',
        'Toys',
        'Footewear'
    ]


    const reset = () =>{
        setName('');
            setDescription('');
            setCategory('');
            setQuantity(0);
            setStock(0);
            setPrice(0)
    }

    const AddProductHandler = async (e:any)=>{
        e.preventDefault();

        if(isUpdate){
            let up = await axios.put(`${URI}/api/updateproduct/${props.updateValues?._id}`,{
                productname,description,category,quantity,Stock,price
            },{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':localStorage.getItem('token')
                }
            });
            if(up.data.success===true){
                toast.success(up.data.message);
                reset();
                props.setUpdateValue&&props.setUpdateValue({})
            }
        }else{
            let add = await axios.post(`${URI}/api/addproduct`,{
                productname,description,category,quantity,Stock,price
            },{
                headers:{
                    'Content-Type':'application/json',
                    'Authorization':localStorage.getItem('token')
                }
            })
            if(add.data.success===true){
                toast.success(add.data.message);
                reset()
                props.setUpdateValue&&props.setUpdateValue({})
            }else if(add.data.success===false){
                toast.error(add.data.message)
            }    
        }

    }
  return (
    <Fragment>
        <Header setUpdateValue={props.setUpdateValue} reset={reset}/>
        <div className="AddFormContainer">
        <form className='AddForm' onSubmit={AddProductHandler}>
            <h3 className='AddHeading'>{`${isUpdate?'Update':'Add'} Product`}</h3>
            <div className="productName">
                <input 
                    type="text"
                    placeholder='Enter Product Name'
                    required
                    value={productname}
                    onChange={(Event)=>setName(Event.target.value)} />
            </div>
            <div className="productDescription">
                <input 
                    type="text"
                    placeholder='Enter Product Description'
                    required 
                    minLength={10}
                    maxLength={80}
                    value={description}
                    onChange={(Event)=>setDescription(Event.target.value)}/>
            </div>
            <div className="productCategory">
                <select onChange={(Event)=>setCategory(Event.target.value)}>
                    <option value={category}>Select Category</option>
                   {
                    categories &&
                    categories.map((item)=>(
                        <option key={item} value={item}>{item}</option>
                    ))
                   }
                </select>
            </div>
            <div className="productQuantity">
                <input 
                    type="number"
                    placeholder='Enter Product Quantity'
                    required 
                    value={quantity}
                    onChange={(e:any)=>setQuantity(e.target.value)}
                    />
            </div>
            <div className="productStock">
                <input 
                    type="number"
                    placeholder='Enter Product Stock'
                    required 
                    value={Stock}
                    onChange={(e:any)=>setStock(e.target.value)}
                    />
            </div>
            <div className="productPrice">
                <input 
                    type="number"
                    placeholder='Enter Product Price'
                    required 
                    value={price}
                    onChange={(e:any)=>setPrice(e.target.value)}
                    />
            </div>
            <button className='AddPro' type='submit'>{`${isUpdate?'Update':'Add'}`}</button>
        </form>
        </div>
    </Fragment>
  )
}

export default AddProduct;
