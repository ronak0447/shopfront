import React, { Fragment, useEffect, useState } from 'react'
import Header from '../Header/Header';
import './Products.css';
import './AddProduct.css'
import axios from 'axios';
import URI from '../Config/config';
import { toast } from 'react-hot-toast';
import { Box, Button, Modal } from '@mui/material';
import ReactPaginate from 'react-paginate';

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
  updateValues?:UpdateObject
  isUpdated:boolean
  isData?:UpdateObject
  setIsUpdated:React.Dispatch<React.SetStateAction<boolean>>
  setIsData?:React.Dispatch<React.SetStateAction<object>>
  fetchPro?:React.Dispatch<React.SetStateAction<object>>
}
const AddProduct = (props:props) =>{
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
    const [productname,setName] = useState<string>(props.isData?.productname||"");
    const [description,setDescription] = useState<string>(props.isData?.description||"");
    const [category,setCategory] = useState<string>(props.isData?.category||"")
    const [quantity,setQuantity] = useState<number>(props.isData?.quantity||0);
    const [Stock,setStock] = useState<number>(props.isData?.Stock||0);
    const [price,setPrice] = useState<number>(props.isData?.price||0);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      props.setIsData&&props.setIsData({})
      reset()
      setOpen(true)}
    const handleClose = () => {
      props.setIsData&&props.setIsData({})
      props.setIsUpdated(false)
      reset()
      setOpen(false)
     }
      console.log(props.isData)
    const categories = [
      'Mobile',
      'Laptop',
      'Electronics',
      'Toys',
      'Footewear'
  ]
 
  useEffect(()=>{
    if(props.isUpdated){
    setName(props.isData?.productname||"");
    setDescription(props.isData?.description||"");
    setCategory(props.isData?.description||"");
    setQuantity(props.isData?.quantity||0);
    setStock(props.isData?.Stock||0);
    setPrice(props.isData?.price||0)
    }
 // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.isUpdated])

  const reset = () =>{
      setName('');
          setDescription('');
          setCategory('');
          setQuantity(0);
          setStock(0);
          setPrice(0)
  }

  const AddProductHandler = async ()=>{
      // e.preventDefault();

      if(props.isUpdated){
          let up = await axios.put(`${URI}/api/updateproduct/${props.isData?._id}`,{
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
              props.setIsData&&props.setIsData({})
              props.fetchPro&&props.fetchPro({})
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
              props.setIsData&&props.setIsData({})
              props.fetchPro&&props.fetchPro({})
            }else if(add.data.success===false){
              toast.error(add.data.message)
          }    
      }

  }
  return(
    <div>
    <Button onClick={handleOpen} style={{
          marginLeft: '89%',
          marginTop: '0%',
          border: 'none',
          position:'absolute',
          height: '4vh',
          color: 'papayawhip',
          backgroundColor: 'black',
          boxShadow:' 0px 1px 30px 10px',
    }} >Add Product</Button>
    <Modal
      open={open||props.isUpdated}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className='MuiBox-root css-1wnsr1i '
    >
      <Box sx={style}>
      <div className="AddFormContainer">
        <form className='AddForm' onSubmit={AddProductHandler}>
            <h3 className='AddHeading'  onClick={handleClose}>{`${props.isUpdated?'Update':'Add'} Product`}</h3>
            <div className="productName">
                <input 
                    type="text"
                    placeholder='Enter Product Name'
                    required
                    value={productname}
                    onChange={(e)=>setName(e.target.value)} />
            </div>
            <div className="productDescription">
                <input 
                    type="text"
                    placeholder='Enter Product Description'
                    required 
                    minLength={10}
                    maxLength={80}
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}/>
            </div>
            <div className="productCategory">
                <select onChange={(e)=>setCategory(e.target.value)}>
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
            <button className='AddPro' type='submit'>{`${props.isUpdated?'Update':'Add'}`}</button>
        </form>
        </div>
      </Box>
    </Modal>
  </div>
  )
}
interface updatePop {
  handleOpen?:any,
}

const Products = (props:updatePop) => {

  const [keyword,setKeyword] = useState<string>('');
  const [category,setCategory]= useState<string>('');
  const [product,setProduct] = useState([]);
  const [isUpdated,setIsUpdated] = useState(false);
  const [currentPage,setCurrentPage] = useState(1);
  const [isData,setIsData] = useState({});
  const PER_PAGE = 10
  useEffect(()=>{
    async function fetchdata(){
      await axios.get(`${URI}/api/products?keyword=${keyword}&category=${category}&page=${currentPage}`,{
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
  },[keyword,category,currentPage])

  const deleteProductHandler =async(id:string)=>{
    let del = await axios.delete(`${URI}/api/deleteproduct/${id}`,{
      headers:{
        'Authorization':localStorage.getItem('token'),
      }
    })
    console.log(id)
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
    // props.handleOpen()
    setIsData(data)
    setIsUpdated(true)

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
  // function handlePageClick({ selected: selectedPage }) {
  //   setCurrentPage(selectedPage);
  // }
  const pageCount = Math.ceil(product.length / PER_PAGE);
  return (
    <Fragment>
        <Header keyword={keyword} setkeyword={setKeyword} setCategory={setCategory}/>
        <h3 className="producthead" onClick={fetchPro}>All Products</h3>
        <AddProduct isUpdated={isUpdated} setIsUpdated={setIsUpdated} isData={isData} setIsData={setIsData} fetchPro={fetchPro}/>
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
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          // onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
    </Fragment>
  )
}

export default Products;
