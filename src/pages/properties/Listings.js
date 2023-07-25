import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const Listings = () => {

    const [listings, setListings] = useState()

    useEffect(() => {
        axios.get("/my-listings").then(function (res) {
            console.log(res)
            setListings(res.data.result)
        })
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <div className='container col-9 mx-auto my-4'>
                {
                    listings ?
                        listings.map((val, ind) => {
                            return (
                                <>
                                    <div className='border rounded py-2 px-3 my-2'>
                                        <p>{val.title}</p>
                                        <Link to={`/list-property-summary/${val._id}/property-summary`}>Edit</Link>
                                    </div>
                                </>
                            )
                        }) :
                        <>
                            <p>Loading...</p>
                        </>
                }
            </div>
        </>
    )
}

export default Listings