import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';

const SideBar = () => {
  return (
    <Fragment>
        <div className="main">
            <Link to={'/addproduct'}>Add Product</Link>
            <h3 className='catheading'>Categories</h3>
            <ul>
                <li>Mobile</li>
                <li>Laptop</li>
                <li>Electronics</li>
                <li>Toys</li>
                <li>Footwear</li>
            </ul>
        </div>
    </Fragment>
  )
}

export default SideBar;
