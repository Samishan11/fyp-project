import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Sidebar from './Sidebar';
const Contactt = () => {
    const [contact, setContact] = useState([]);
    const [load, aa] = useState(false);
    useEffect(() => {
        axios.get('/contact-get').then(res => {
            setContact(res.data)
            console.log(res.data)
        }).catch(e => {

        })
    }, [load])

    return (
        <div className="container-fluid">
            <div className="container" style={{ height: "100vh" }}>
                <Sidebar tab={'contact'}></Sidebar>
                <div className="container mx-3">
                    <div className="container col-md-10 mx-auto">
                        <h4 className="fw-bold mx-2 pt-2"></h4>

                        {/*  */}
                        <div className="mt-5 mx-2">
                            <h6 className="m-0">RECENT CONTACT</h6>
                            {
                                contact?.map(data => {
                                    return (

                                        <div
                                            // key={ind}
                                            className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                                        >
                                            <div className="col d-flex align-items-center">
                                                <div className="no-img-avatar-sm me-4">{data?.username?.slice(0, 1).toUpperCase()}</div>
                                                <div className="col">
                                                    <p className="m-0 text-s">{data?.username}</p>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <p className="m-0 text-xs">Email</p>
                                                <p className="m-0 text-sm">{data?.email}</p>
                                            </div>
                                            <div className="col">
                                                <p className="m-0 text-xs">Message</p>
                                                <p className="m-0 text-sm">{data?.message?.slice(0, 50)}...</p>
                                            </div>

                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contactt