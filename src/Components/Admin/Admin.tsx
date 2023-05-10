import React, { Fragment, useEffect, useState } from 'react';
import './Admin.css';
import axios from 'axios';
import URI from '../Config/config';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate()
    const [user,setUser] = useState([]);
    const [name,setName] =useState <string>('');
    const [email,setEmail] = useState <string>('');
    const [address,setAddress] = useState <string>('');
    const [role,setRole] = useState <string>('');
    const [phoneNo,setPhoneNo] = useState<string>();

    const onchange =(e:any) =>{
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValid = new RegExp("[0-9]").test(keyValue);
        if (!isValid) {
           e.preventDefault();
           setPhoneNo(e.target.value)
           return;
        }
    };
    const reset =()=>{
        setName('');
        setEmail('');
        setAddress('');
        setRole('');
        setPhoneNo('')
    }
    const adduserFormHandler = async(e:any) =>{
        e.preventDefault();
        let user = await axios.post(`${URI}/api/register`,{
            name,email,address,role,phoneNo
        },{
            headers:{
                'Content-Type':'application/json',
                'Authorization':localStorage.getItem('token')
            }
        });
        if(user.data.success===true){
            toast.success(user.data.message)
            reset()
        }

        async function fetchUser(){
            await axios.get(`${URI}/api/users`,{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            }).then(res=>res.data.user)
            .then(
                (users)=>{
                    setUser(users)
                },
                (error)=>{
                    toast.error(error)
                }
                )
                
            };
            fetchUser();
    };
    useEffect(()=>{
        async function fetchUser(){
            await axios.get(`${URI}/api/users`,{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            }).then(res=>res.data.user)
            .then(
                (users)=>{
                    setUser(users)
                },
                (error)=>{
                    toast.error(error)
                }
                )
                
            };
            fetchUser();
        },[]);

        const logoutHandler = async(e:any) =>{
            e.preventDefault();
            let logy = await axios.get(`${URI}/api/logout`,{
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            });
            if(logy.data.success===true){
                toast.success(logy.data.message)
                localStorage.removeItem('token')
                navigate('/')
            }
        }
        let register = document.getElementById('registers')
        let add = document.getElementById('adduser')
        const openPopUp = () =>{
            add?.classList.add('add')
            register?.classList.remove('register')
        }
        const closePopUp = () => {
            add?.classList.remove('add')
            register?.classList.add('register')
        }
        return (
    <Fragment>
        <div className="adminContainer">
            <h3 className="adminheading">SHOP MANAGEMENT ADMIN
            <button className='admbtn' onClick={logoutHandler}>Logout</button></h3>
            <div className="maincontainer">
            <div className="add">
    <div className="adduser" id='adduser'>
        <form  className="addUser" onSubmit={adduserFormHandler}>
            <h3>Add User <button className='close' type='button' onClick={closePopUp}>ⓧ</button></h3>
            <div className="name">
                <input 
                    type="text"
                    required
                    placeholder='Enter Name' 
                    value={name}
                    onChange={(e:any)=>setName(e.target.value)}
                    />
            </div>
            <div className="email">
                <input 
                    type="email"
                    required
                    placeholder='Enter Email' 
                    value={email}
                    onChange={(e:any)=>setEmail(e.target.value)}
                    />
            </div>
            <div className="address">
                <input 
                    type="text"
                    required
                    placeholder='Enter Address' 
                    value={address}
                    onChange={(e:any)=>setAddress(e.target.value)}
                    />
            </div>
            <div className="role">
                <input 
                    type="text"
                    required
                    placeholder='Enter Role' 
                    value={role}
                    onChange={(e:any)=>setRole(e.target.value)}
                    />
            </div>
            <div className="phoneNo">
                <input 
                    type="text"
                    required
                    placeholder='Enter PhoneNo' 
                    value={phoneNo}
                    maxLength={10}
                    onKeyPress={onchange}
                    />
            </div>
            <button className='adminbtn' type='submit'>Add</button>
        </form>
    </div>
    </div>
                <div className="reg">
                <button className='register' id='registers' onClick={openPopUp}>AddUser</button>
                </div>
                <div className="tab">
                    <h3>User Records</h3>
                    <table className='admintable'>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>PhoneNo</th>
                        </tr>
                        <tbody>
                         {  user.length>0&&
                            user.map((users:any)=>(
                                <tr key={users._id}>
                                <td>{users.name}</td>
                                <td>{users.email}</td>
                                <td>{users.address}</td>
                                <td>{users.role}</td>
                                <td>{users.phoneNo}</td>
                            </tr>
                            ))
                         }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </Fragment>
  )
}

export default Admin;
