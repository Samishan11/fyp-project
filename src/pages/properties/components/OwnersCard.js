import axios from 'axios'
import React, { useState } from 'react'
import $ from 'jquery'
import { toast } from 'react-toastify'

const OwnersCard = (props) => {

    const [users, setUsers] = useState([])
    const [property, setProperty] = useState(props.property)

    const rent = () => {
        axios.get('/users').then(function (res) {
            console.log(res.data)
            setUsers(res.data)
            $('.expandable').css({ visibility: "visible" })
        })
    }
    const rented = (customerId) => {
        axios.post(`/set-rented/${property._id}/${customerId}`).then(function (res) {
            console.log(res.data.success)
            if (res.data.success) {
                property.available = false
                setProperty(property)
                toast.success(res.data.message, { position: toast.POSITION_TOP_RIGHT })
            }
        })
    }

    return (
        <>
            <div className="p-1" style={{ background: "#F9F9F9", position: "sticky", top: "0" }}>
                <div className='mx-2'>
                    <p className="text text-secondary mb-0 fs-6 fw-bold">
                        NPR {property.price}
                    </p>
                    <hr className="my-2" />
                    <div>
                        {
                            property.available ?
                                <>
                                    {
                                        property.category === "apartment" ?
                                            <button onClick={rent} className='btn text-sm text-light' style={{ background: "#42EA5A" }}>Mark As Sold</button>
                                            :
                                            property.category === "hostel" ?
                                                <button className='btn text-sm text-light' style={{ background: "#42EA5A" }}>Mark As Booked</button>
                                                :
                                                property.category === "room" ?
                                                    <button onClick={rent} className='btn text-sm text-light' style={{ background: "#42EA5A" }}>Mark As Rented</button>
                                                    :
                                                    property.category === "flat" ?
                                                        <button onClick={rent} className='btn text-sm text-light' style={{ background: "#42EA5A" }}>Mark As Rented</button>
                                                        :
                                                        property.category === "hotel" ?
                                                            // <button className='btn text-sm text-light' style={{ background: "#42EA5A" }}>Mark Unavailable</button>
                                                            <></>
                                                            :
                                                            <button className='btn text-sm text-light' style={{ background: "#42EA5A" }}>Mark Unavailable</button>
                                    }
                                </> :
                                <>
                                    <button className='btn text-sm text-light' style={{ background: "#42EA5A" }}>Renew Listing</button>
                                </>
                        }
                        <small className='text-xs d-block my-3'>You are the owner of this property. You can mark it as sold or rented or Unavailable if you have this property given to your client.</small>
                        <div className='expandable bg-light rounded my-2 px-2 py-2'>
                            <p className='text-sm'>Who did you sell?</p>
                            {
                                users?.length > 0 ?
                                    users.map((val, ind) => {
                                        return (
                                            <div key={ind} className='my-3 hover px-2 py-2' type='button' onClick={rented.bind(this, val._id)}>
                                                <div className='d-flex'>
                                                    <div>
                                                        <img className='rounded-circle' style={{ height: "5ch", width: "5ch", objectFit: "cover" }} src="https://www.pngitem.com/pimgs/m/334-3344170_user-vector-user-flat-png-transparent-png.png" alt="" />
                                                    </div>
                                                    <div className='mx-2'>
                                                        <small>{val.username}</small>
                                                        <small className='d-block'>{val.firstName} {val.lastName}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }) :
                                    <><p>Loading...</p></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OwnersCard