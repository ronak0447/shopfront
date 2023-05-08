import React, { Fragment, useState } from 'react'
import './Login.css';

const Login = () => {

    const [email,setEmail] = useState<string>('');
    
    return (
    <Fragment>
       <div className="loginContainer">
            <form>
                <h3 className='formheading'>Login</h3>
                <div className="email">
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
