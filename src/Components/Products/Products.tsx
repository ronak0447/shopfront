import React, { Fragment, useEffect, useState } from 'react'
import Header from '../Header/Header';
import './Products.css';
import './AddProduct.css'
import axios from 'axios';
import URI from '../Config/config';
import { toast } from 'react-hot-toast';
import { Box, Button, Modal } from '@mui/material';

interface UpdateObject {
  _id?: string,
  productname?: string,
  description?: string,
  category?: string,
  quantity?: number,
  Stock?: number,
  price?: number,
}

interface props {
  updateValues?: UpdateObject
  isUpdated: boolean
  isData?: UpdateObject
  setIsUpdated: React.Dispatch<React.SetStateAction<boolean>>
  setIsData?: React.Dispatch<React.SetStateAction<object>>
  fetchPro?: React.Dispatch<React.SetStateAction<object>>
}
const AddProduct = (props: props) => {
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
  const [productname, setName] = useState<string>(props.isData?.productname || "");
  const [description, setDescription] = useState<string>(props.isData?.description || "");
  const [category, setCategory] = useState<string>(props.isData?.category || "")
  const [quantity, setQuantity] = useState<number>(props.isData?.quantity || 0);
  const [Stock, setStock] = useState<number>(props.isData?.Stock || 0);
  const [price, setPrice] = useState<number>(props.isData?.price || 0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    props.setIsData && props.setIsData({})
    reset()
    setOpen(true)
  }
  const handleClose = () => {
    props.setIsData && props.setIsData({})
    props.setIsUpdated(false)
    reset()
    setOpen(false)
  }
  const categories = [
    'Mobile',
    'Laptop',
    'Electronics',
    'Toys',
    'Footewear'
  ]

  useEffect(() => {
    if (props.isUpdated) {
      setName(props.isData?.productname || "");
      setDescription(props.isData?.description || "");
      setCategory(props.isData?.description || "");
      setQuantity(props.isData?.quantity || 0);
      setStock(props.isData?.Stock || 0);
      setPrice(props.isData?.price || 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isUpdated])

  const reset = () => {
    setName('');
    setDescription('');
    setCategory('');
    setQuantity(0);
    setStock(0);
    setPrice(0)
  }

  const AddProductHandler = async () => {
    // e.preventDefault();

    if (props.isUpdated) {
      let up = await axios.put(`${URI}/api/updateproduct/${props.isData?._id}`, {
        productname, description, category, quantity, Stock, price
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      });
      if (up.data.success === true) {
        toast.success(up.data.message);
        reset();
        props.setIsData && props.setIsData({})
        props.fetchPro && props.fetchPro({})
      }
    } else {
      let add = await axios.post(`${URI}/api/addproduct`, {
        productname, description, category, quantity, Stock, price
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      if (add.data.success === true) {
        toast.success(add.data.message);
        reset()
        props.setIsData && props.setIsData({})
        props.fetchPro && props.fetchPro({})
      } else if (add.data.success === false) {
        toast.error(add.data.message)
      }
    }

  }
  return (
    <div>
      <Button onClick={handleOpen} style={{
        marginLeft: '89%',
        marginTop: '15%',
        border: 'none',
        position: 'absolute',
        height: '4vh',
        color: 'papayawhip',
        backgroundColor: 'black',
        boxShadow: ' 0px 1px 30px 10px',
      }} >Add Product</Button>
      <Modal
        open={open || props.isUpdated}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className='MuiBox-root css-1wnsr1i '
      >
        <Box sx={style}>
          <div className="AddFormContainer">
            <form className='AddForm' onSubmit={AddProductHandler}>
              <h3 className='AddHeading' onClick={handleClose}>{`${props.isUpdated ? 'Update' : 'Add'} Product`}</h3>
              <div className="productName">
                <input
                  type="text"
                  placeholder='Enter Product Name'
                  required
                  value={productname}
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="productDescription">
                <input
                  type="text"
                  placeholder='Enter Product Description'
                  required
                  minLength={10}
                  maxLength={80}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="productCategory">
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value={category}>Select Category</option>
                  {
                    categories &&
                    categories.map((item) => (
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
                  onChange={(e: any) => setQuantity(e.target.value)}
                />
              </div>
              <div className="productStock">
                <input
                  type="number"
                  placeholder='Enter Product Stock'
                  required
                  value={Stock}
                  onChange={(e: any) => setStock(e.target.value)}
                />
              </div>
              <div className="productPrice">
                <input
                  type="number"
                  placeholder='Enter Product Price'
                  required
                  value={price}
                  onChange={(e: any) => setPrice(e.target.value)}
                />
              </div>
              <button className='AddPro' type='submit'>{`${props.isUpdated ? 'Update' : 'Add'}`}</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
interface updatePop {
  handleOpen?: any,
}

interface Product {
  productname: string;
  createdAt:Date
  // Other properties...
}
const Products = (props: updatePop) => {

  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [product, setProduct] = useState<Product[]>([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isData, setIsData] = useState({});
  // const [pageSize,setPageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const pageSize = 10;
  useEffect(() => {
    const fetchdata = async () => {
      try {
    
        const response = await axios.get(`${URI}/api/products?page=${currentPage}&pageSize=${pageSize}&keyword=${keyword}&category=${category}`, {
          headers: {
            'Authorization': localStorage.getItem('token')
          }
        });
        const { product,total } = response.data;
        setTotalRecords(total);
        setProduct(product);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchdata();
    // eslint-disable-next-line 
  }, [keyword, category, currentPage,pageSize])

  const deleteProductHandler = async (_id: string) => {
    let del = await axios.delete(`${URI}/api/deleteproduct/${_id}`, {
      headers: {
        'Authorization': localStorage.getItem('token'),
      }
    })
    console.log(_id)
    if (del.data.success === true) {
      toast.success(del.data.message)
    }
    async function fetchdatas() {
      const response = await axios.get(`${URI}/api/products?page=${currentPage}&pageSize=${pageSize}&keyword=${keyword}&category=${category}`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      }) ;
      const { product,total } = response.data;
      setTotalRecords(total);
      setProduct(product);
    };
    fetchdatas();
  }
  const updateProductHandler = (id: string, data: object) => {
    // props.handleOpen()
    setIsData(data)
    setIsUpdated(true)

  }
  const fetchPro = (e: any) => {
    e.preventDefault()
    async function fetchdata() {
      await axios.get(`${URI}/api/products?keyword=${keyword}&category=${category}`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      }).then(res => res.data.product).then(
        (products) => {
          setProduct(products)
        },
        (error) => {
          toast.error(error)
        }
      )
    };
    fetchdata();
  }
  const prevDisabled = currentPage === 1;
  const nextDisabled = currentPage === totalRecords;
  const handlePageChange = (newPage:any) => {
    setCurrentPage(newPage)
  }
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalRecords) {
      setCurrentPage(currentPage + 1);
    }
  };


  const categories = [
    'Mobile',
    'Laptop',
    'Electronics',
    'Toys',
    'Footewear'
  ]

  const handleSort = () =>{
      let data = [...product]
      if(data.length>0){
        let result = data.sort((a,b)=>a.productname.localeCompare(b.productname))
        setProduct(result)
      }
  }
  const handleSorti = () => {
    const sortedProducts = [...product].sort((a, b) => {
      const createdAtA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
      const createdAtB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
      return createdAtB.getTime() - createdAtA.getTime();
    });
    setProduct(sortedProducts);
    console.log(sortedProducts);
  };
  
  return (
    <Fragment>
      <Header keyword={keyword} setkeyword={setKeyword} setCategory={setCategory} />
      <h3 className="producthead" onClick={fetchPro}>All Products
        <select onChange={(e) => setCategory(e.target.value)} style={{
              marginLeft: '25%',
              marginTop: '0%',
              position: 'absolute',
              border: 'none',
              outline: 'none',
              height: '3vh',
              color: 'black',
              backgroundColor: 'lavenderblush',
              boxShadow: '2px 2px 6px',
              borderRadius:' 4px',
              fontSize: '0.9rem',
              cursor: 'pointer',
        }}>
          <option value={category} style={{
            cursor:'pointer',backgroundColor:'transparent'
          }}>Select Category</option>
          {
            categories &&
            categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))
          }
        </select>
      </h3>
      <AddProduct isUpdated={isUpdated} setIsUpdated={setIsUpdated} isData={isData} setIsData={setIsData} fetchPro={fetchPro} />
      <table>
        <tr style={{cursor:'pointer'}}>
          <th onClick={handleSort}>ProductName</th>
          <th>Description</th>
          <th>Category</th>
          <th>Quantity</th>
          <th>Stock</th>
          <th>Price</th>
          <th onClick={handleSorti}>createdAt</th>
          <th>Action</th>
        </tr>
        <tbody>
          {
            product.length > 0 &&
            product.map((products: any) => {
              return(
              <tr key={products._id}>
                <td>{products.productname}</td>
                <td>{products.description}</td>
                <td>{products.category}</td>
                <td>{products.quantity}</td>
                <td>{products.Stock}</td>
                <td>{products.price}</td>
                <td>{products.createdAt.split('T')[0]}</td>
                <td><button className='update' onClick={() => updateProductHandler(products._id, products)}>Update</button></td>
                <td><button className='delete' onClick={() => deleteProductHandler(products._id)}>Delete</button></td>
              </tr>
            )})
          }
        </tbody>

      </table>
      <div className="footer">
        <button
          className='prev'
          onClick={handlePreviousPage}
          disabled={prevDisabled}
        >Prev</button>
        <div className="pages">
       {
         Array.from({length:totalRecords},(_,i)=>{
          return(
            <button key={i} onClick={()=>handlePageChange(i+1)}>
              { i+1}
            </button>
          )})
       }
        </div>
        <button
          className='next'
          onClick={handleNextPage}
          disabled={nextDisabled}
        >Next</button>
      </div>
    </Fragment>
  )
}

export default Products;
