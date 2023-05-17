import React, { Fragment, useEffect, useState } from 'react';
import './Admin.css';
import axios from 'axios';
import URI from '../Config/config';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal } from '@mui/material';



const UserModal = (props: { openPopUp: any }) => {
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
    const [open, setOpen] = React.useState(false);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [role, setRole] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>();
    // eslint-disable-next-line



    const onchange = (e: any) => {
        const keyCode = e.keyCode || e.which;
        const keyValue = String.fromCharCode(keyCode);
        const isValid = new RegExp("[0-9]").test(keyValue);
        if (!isValid) {
            e.preventDefault();
            setPhoneNo(e.target.value)
            return;
        }
    };

    const adduserFormHandler = async (e: any) => {
        e.preventDefault();
        let user = await axios.post(`${URI}/api/register`, {
            name, email, address, role, phoneNo
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token')
            }
        });
        if (user.data.success === true) {
            toast.success(user.data.message)
            reset()
            props.openPopUp({})
            setOpen(false)
        }


    };
    const reset = () => {
        setName('');
        setEmail('');
        setAddress('');
        setRole('');
        setPhoneNo('')
    }
    const handleOpen = () => setOpen(true);
    const HandleClose = () => {
        setOpen(false)

    }


    return (

        <Fragment>
            <Button className='addUserbtn' onClick={handleOpen} style={{
                border: 'none',
                margin: 'auto',
                marginLeft: '5%',
                position: 'absolute',
                marginTop: '10%',
                width: '10%',
                height: '5vh',
                backgroundColor: '#f3caca',
                color: 'black'
            }}>Add User</Button>
            <Modal
                className='MuiBox-root css-1wnsr1i '
                open={open}

                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="adduser" id='adduser'>
                        <form className="addUser" onSubmit={adduserFormHandler}>
                            <h3>Add User <button className='close' type='button' onClick={HandleClose} >ⓧ</button></h3>
                            <div className="name">
                                <input
                                    type="text"
                                    required
                                    placeholder='Enter Name'
                                    value={name}
                                    onChange={(e: any) => setName(e.target.value)}
                                />
                            </div>
                            <div className="email">
                                <input
                                    type="email"
                                    required
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e: any) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="address">
                                <input
                                    type="text"
                                    required
                                    placeholder='Enter Address'
                                    value={address}
                                    onChange={(e: any) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="role">
                                <input
                                    type="text"
                                    required
                                    placeholder='Enter Role'
                                    value={role}
                                    onChange={(e: any) => setRole(e.target.value)}
                                />
                            </div>
                            <div className="phoneNo">
                                <input
                                    type="text"
                                    required
                                    placeholder='Enter PhoneNo'
                                    value={phoneNo}
                                    maxLength={10}
                                    onChange={onchange}
                                />
                            </div>
                            <button className='adminbtn' type='submit'>Add</button>
                        </form>
                    </div>
                </Box>
            </Modal>

        </Fragment>
    )
}
interface User {
    role: string;
    name:string
}

const Admin = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 10


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await axios.get(`${URI}/api/users?page=${currentPage}&pageSize=${pageSize}`, {
                    headers: {
                        'Authorization': localStorage.getItem('token')
                    }
                });
                const { user,total } = response.data;
                setTotalPages(total);
                setUser(user);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchdata();
    }, [currentPage,pageSize]);

    const logoutHandler = async (e: any) => {
        e.preventDefault();
        let logy = await axios.get(`${URI}/api/logout`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        });
        if (logy.data.success === true) {
            toast.success(logy.data.message)
            localStorage.removeItem('token')
            navigate('/')
        }
    }
    const openPopUp = async () => {
        await axios.get(`${URI}/api/users`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        }).then(res => res.data.user)
            .then(
                (users) => {
                    setUser(users)
                },
                (error) => {
                    toast.error(error)
                }
            )
    };
    const prevDisabled = currentPage === 1;
    const nextDisabled = currentPage === totalPages;
    const handlePageChange = (newPage: any) => {
        setCurrentPage(newPage)
    }
    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1)
        }
    }
    

    const handleSort = () =>{
       let data = [...user]
       if(data.length>0){
         let result = data.sort((a,b)=>a.name.localeCompare(b.name))
       
         setUser(result)
       }
   }
   const handleRole = () =>{
    let data = [...user]
    if(data.length>0){
      let result = data.sort((a,b)=>b.role.localeCompare(a.role)) 
      setUser(result)
    }
   }
    return (
        <Fragment>
            <div className="adminContainer">
                <h3 className="adminheading">SHOP MANAGEMENT ADMIN
                    <button className='admbtn' onClick={logoutHandler}>Logout</button></h3>
                <div className="maincontainer">
                    <UserModal openPopUp={openPopUp} />

                    <button className='register' id='registers' >AddUser</button>
                    <div className="tab">
                        <h3>User Records</h3>
                        <table className='admintable'>
                            <tr style={{cursor:'pointer'}}>
                                <th onClick={handleSort}>Name</th>
                                <th>Email</th>
                                <th>Address</th>
                                <th onClick={handleRole}>Role</th>
                                <th>PhoneNo</th>
                            </tr>
                            <tbody>
                                {user.length > 0 &&
                                    user.map((users: any) => (
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
                        <div className="footer">
                            <button
                                className='prev'
                                onClick={handlePreviousPage}
                                disabled={prevDisabled}
                            >Prev</button>
                            <div className="pages">
                                {
                                    Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            disabled={i + 1 === currentPage}
                                            autoFocus
                                            onClick={() => handlePageChange(i + 1)}
                                        >{i + 1}</button>
                                    ))
                                }
                            </div>
                            <button
                                className='nexts'
                                onClick={handleNextPage}
                                disabled={nextDisabled}
                            >Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Admin;
