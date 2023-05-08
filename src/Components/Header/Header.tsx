import React, { Fragment } from 'react'
import SideBar from './SideBar';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {

    

  return (
    <Fragment>
        <div className="headContainer">
            <Link to={'/login'} style={{textDecoration:'none'}}><h3 className='BrandHeading'>Shop Management</h3></Link>
            <input 
                type="text"
                placeholder='Search a products here...' 
                // value={keyword}
                // onChange={(e)=>setKeyword(e.target.value)}
                />
            <button type='button' className='logoutbtn'>Logout</button>    
        </div>
        <SideBar/>
    </Fragment>
  )
}

export default Header;
