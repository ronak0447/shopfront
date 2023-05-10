import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

interface SideBarProps {
  setCategory?:React.Dispatch<React.SetStateAction<string>>;
  setUpdateValue?:React.Dispatch<React.SetStateAction<object>>;
  reset?:() => void
}

const SideBar = (props:SideBarProps) => {
  const categories = [
    'Mobile',
    'Laptop',
    'Electronics',
    'Toys',
    'Footewear'
]
const updateValHandler = () =>{
  props.setUpdateValue&&props.setUpdateValue({})
  props.reset&&props.reset()
}

  return (
    <Fragment>
        <div className="main">
            <Link to={'/products/addproduct'} onClick={updateValHandler}>Add Product</Link>
            <h3 className='catheading'>Categories</h3>
            {
              categories.map((item,index)=>(
                <ul key={index} onClick={()=>props.setCategory&&props.setCategory(item)}>
                <li>{item}</li>
              </ul>
              ))
            }
        </div>
    </Fragment>
  )
}

export default SideBar;
