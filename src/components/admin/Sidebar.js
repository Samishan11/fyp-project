import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
const Sidebar = (props) => {
    useEffect(() => {
        // document.querySelector(".tab-btn")?.classList?.remove('active')
        document.querySelector(`#${props.tab}`)?.classList?.add('active')
    }, [props.tab]);
    return (
        <div className="col-md-4 m-0 p-0 position-absolute" style={{ width: "15em", height: '100vh', backgroundColor: '#4E5180', left: 0 }}>
            <div className="nav_link  text-align">

                <div className="links mx-auto active_link py-1" >
                    <Link to={'/'} className="mx-auto" style={{ textDecoration: "none" }}>
                        <div className="logo d-flex">
                            <div className="title fs-5 mt-3">
                                <p className='fw-bold'>Real<span className='text-primary'>-Estate</span></p>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="links mx-auto active_link  my-3 py-1" >
                    <Link id='admin' to='/admin' className='text-light' style={{ cursor: 'pointer', textDecoration: 'none' }}>Dashboard</Link>
                </div>
                <div className="links mx-auto active_link  my-3 py-1" >
                    <Link id='add-user' to='/add-user' className='text-light' style={{ cursor: 'pointer', textDecoration: 'none' }}>Add User</Link>
                </div>
                <div className="links mx-auto active_link  my-3 py-1" >
                    <Link id='manage-user' to='/manage-user' className='text-light' style={{ cursor: 'pointer', textDecoration: 'none' }}>Manage User</Link>
                </div>
                <div className="links mx-auto active_link  my-3 py-1" >
                    <Link id='contact' to='/view-contact' className='text-light' style={{ cursor: 'pointer', textDecoration: 'none' }}>Messages</Link>
                </div>
                <div className="links mx-auto active_link  my-3 py-1" >
                    <Link id='transication' to='/transication' className='text-light' style={{ cursor: 'pointer', textDecoration: 'none' }}>Transication</Link>
                </div>
                <div className="links mx-auto active_link  my-3 py-1" >
                    <Link onClick={() => localStorage.removeItem('token')} to='/login' className='text-light bg-danger py-1 px-2 rounded' style={{ cursor: 'pointer', textDecoration: 'none' }}>Logout <i className='fa fa-arrow-right text-light'></i> </Link>
                </div>
            </div>

        </div>
    )
}

export default Sidebar;