import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from '../../../../context/listingContext';
import "../../style.css";

const TitleForm = () => {

    const navigate = useNavigate()
    const propertyId = useParams().propertyId


    const [listingData, setListingData] = useContext(ListingContext)
    const [title, setTitle] = useState(listingData?.title)
    const [price, setPrice] = useState(listingData?.price)
    const [payment_type, setPaymentType] = useState(listingData?.payment_type)

    const update = () => {
        axios.put(`/update-listing/${propertyId}`, { title, price, payment_type })
        navigate(`/list-property/${propertyId}/update/address`)
    }

    const storeData = () => {
        listingData.title = title
        listingData.price = price
        listingData.payment_type = payment_type
        setListingData(listingData)
        {
            propertyId ?
                update() :
                navigate("/list-property/address")
        }
    }

    useEffect(() => {
        if (propertyId) {
            axios.get(`/get-property-listing/${propertyId}`).then(function (res) {
                // console.log(res.data.result)
                const listingData = res.data.result
                console.log(listingData)
                setTitle(listingData.title)
                setPrice(listingData.price)
                setPaymentType(listingData.payment_type)
            })
        }
    }, [propertyId])

    return (
        <>
            <div className='container mx-auto my-4 col-9 mx-auto'>
                <div className='d-flex step-map'>
                    <div className='rounded-circle indicator d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'>1</small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator indicator-undone d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'>2</small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator indicator-undone d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'>3</small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator indicator-undone d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'>4</small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator indicator-undone d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'>5</small>
                    </div>
                </div>

                <div className='row my-4'>
                    <div className='col-md-5'>
                        <div className=''>
                            <form action="">
                                <div className='box border rounded px-3 py-4'>
                                    <p className='text-md fw-bold'>What is the name of your property?</p>
                                    <div className='form-group'>
                                        <label htmlFor="" className='text-sm'>Property Name</label>
                                        <input type="text" className='form-control' onChange={(e) => { setTitle(e.target.value) }} defaultValue={title} />
                                        <small className='text-xs'>This will appear as a title of your property while searching place.</small>
                                    </div>

                                    <hr />
                                    <p className='text-md fw-bold'>Pricing</p>
                                    <div className='form-group'>
                                        <label htmlFor="" className='text-sm'>Price</label>
                                        <input type="text" className='form-control' onChange={(e) => { setPrice(e.target.value) }} defaultValue={price} />
                                        {/* {
                                            listingData.category === "room" || "hostel" || "apartment" ?
                                                <small className='text-xs'>You are listing a <b>{listingData.category}</b> type property and the price will be shown as <b>per month.</b></small> :
                                                listingData.category === "hotel" ?
                                                    <small className='text-xs'>You are listing a <b>{listingData.category}</b> type property and the price will be shown as <b>per night.</b></small> :
                                                    <></>
                                        } */}
                                    </div>
                                    <div className='form-group my-3'>
                                        <label htmlFor="" className='text-sm'>Payment Type</label>
                                        <select onChange={(e) => { setPaymentType(e.target.value) }} className='form-select form-control text-sm' name="" id="">
                                            <option selected={payment_type === "monthly" ? true : false} value="monthly">Monthly</option>
                                            <option selected={payment_type === "night" ? true : false} value="night">Night</option>
                                            <option selected={payment_type === "on-sale" ? true : false} value="on-sale">On Sale</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='d-flex my-2'>
                                    <button className='btn btn-outline-primary rounded' type='button'>Back</button>
                                    <button onClick={storeData} className='btn btn-primary d-block rounded ms-2' type='button'>Continue</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-md-6'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default TitleForm