import React, { Fragment, useState } from 'react'
import './Login.css';
import axios from 'axios';
import URI from '../Config/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate()
    const [email,setEmail] = useState<string>('');
    
    const loginsubmitHandler = async (e:any) => {
        e.preventDefault();

        let log = await axios.post(`${URI}/api/login`,{email},{
            headers:{
                'Content-Type':'application/json',
            },validateStatus: function(status){
                return status<=500;
            }
        });
        if(log.data.success===true){
            localStorage.setItem('token',log.data.token)
        }
        if(log.data.user.role === 'admin'){
            navigate('/admin/dashboard')
            toast.success(log.data.message)
          }else if(log.data.user.role === 'user'){
            navigate('/products')
            toast.success(log.data.message)
          }
            else if(log.data.success ===false) {
            toast.error(log.data.message)
            }
    }

    return (
    <Fragment>
       <div className="loginContainer">
            <form onSubmit={loginsubmitHandler}>
                <h3 className='formheading'>Login</h3>
                <div className="Email">
                <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    placeholder='Enter Your Email' />
                </div>
                <button type='submit' disabled={!email} className='loginbtn'>Login</button>    
            </form>
       </div>
    </Fragment>
  )
}

export default Login;
