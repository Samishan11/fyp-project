import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListingContext } from '../../../context/listingContext';
import "../style.css";
const CategorySelection = ({data}) => {

    const navigate = useNavigate()
    const location = useLocation()?.state?.data

    const [listingData, setListingData] = useContext(ListingContext)

    const storeData = (category) => {
        listingData.category = category
        setListingData(listingData)
        navigate("/list-property/title",{ state: { data: category } })
    };

    return (
        <>
            <div className='container mx-auto my-4 col-9 mx-auto'>
                <div className='row my-4'>
                    <div className='col-md-12'>
                        <div className=''>
                            <form action="">
                                <div className='box border rounded px-3 py-4'>
                                    <p className='text-md fw-bold'>What type of a property are you listing?</p>
                                    <div className='row'>
                                        <div className=' col-md-3'>
                                            <div className='form-group'>
                                                <img style={{ width: "20ch", height: "20ch", objectFit: "cover" }} src="/images/categories/home_logo.jpg" alt="" />
                                                <p style={{ fontWeight: "600" }}>Building</p>
                                            </div>
                                            <input id="building" type="radio" className='' onChange={(e) => { storeData(e.target.value) }} name="category" value="building" />
                                        </div>
                                        <div className=' col-md-3'>
                                            <div className='form-group'>
                                                <img style={{ width: "20ch", height: "20ch", objectFit: "cover" }} src="/images/categories/land.jpg" alt="" />
                                                <p style={{ fontWeight: "600" }}>Land</p>
                                            </div>
                                            <input id="land" type="radio" className='' onChange={(e) => { storeData(e.target.value) }} name="category" value="land" />
                                        </div>
                                        <div className='col-md-3'>
                                            <div className='form-group'>
                                                <img style={{ width: "20ch", height: "20ch", objectFit: "cover" }} src="/images/categories/apartment_logo.jpg" alt="" />
                                                <p style={{ fontWeight: "600" }}>Apartment</p>
                                            </div>
                                            <input id="apartment" type="radio" className='' onChange={(e) => { storeData(e.target.value) }} name="category" value="apartment" />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategorySelection