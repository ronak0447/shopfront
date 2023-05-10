import React, { Fragment} from 'react'
import SideBar from './SideBar';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import URI from '../Config/config';
import { toast } from 'react-hot-toast';
interface HeaderProps {
  keyword?:string;
  setkeyword?: React.Dispatch<React.SetStateAction<string>> ;
  setCategory?: React.Dispatch<React.SetStateAction<string>>;
  setUpdateValue?:React.Dispatch<React.SetStateAction<object>>
  reset?:() => void
}


const Header = (props:HeaderProps) => {
  const navigate = useNavigate();  
  const logoutHandler =(e:any)=>{
    e.preventDefault();
    axios.get(`${URI}/api/logout`,{
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    }).then(res=>{toast.success(res.data.message);navigate('/')})
    .then(res=>{localStorage.clear()})
     

  }

  return (
    <Fragment>
        <div className="headContainer">
            <Link to={'/products'} style={{textDecoration:'none'}}><h3 className='BrandHeading'>Shop Management</h3></Link>
            <input 
                type="text"
                placeholder='Search a products here...' 
                value={props.keyword}
                onChange={(e)=>props.setkeyword&&props.setkeyword(e.target.value)}
                />
            <button type='button' className='logoutbtn' onClick={logoutHandler}>Logout</button>    
        </div>
        <SideBar setCategory={props.setCategory} setUpdateValue={props.setUpdateValue} reset={props.reset}/>
    </Fragment>
  )
}

export default Header;
