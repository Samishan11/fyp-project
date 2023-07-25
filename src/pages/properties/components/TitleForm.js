import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ListingContext } from '../../../context/listingContext';
import "../style.css";
const TitleForm = () => {

    const navigate = useNavigate()
    const data = useLocation()?.state?.data
    const [listingData, setListingData] = useContext(ListingContext)
    const [title, setTitle] = useState(listingData?.title)
    const [price, setPrice] = useState(listingData?.price)
    const [area, setArea] = useState(listingData?.area)
    const [desc, setDesc] = useState(listingData?.desc)
    const [property_dirction, setDoordirection] = useState(listingData?.property_dirction)
    const [paymentType, setPaymentType] = useState("per month")

    const back = () => {
        listingData.title = title
        listingData.price = price
        listingData.area = area
        listingData.desc = desc
        listingData.payment_type = paymentType
        listingData.property_dirction = property_dirction
        listingData.category = data
        setListingData(listingData)
        navigate("/list-property/category", { state: { data: listingData } })
    }

    const storeData = () => {
        listingData.title = title
        listingData.price = price
        listingData.area = area
        listingData.payment_type = paymentType
        listingData.property_dirction = property_dirction
        listingData.category = data
        listingData.desc = desc
        setListingData(listingData)
        console.log(listingData)
        navigate("/list-property/address", { state: { data: listingData } })
    }

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
                                        <input type="text" className='form-control' onChange={(e) => { setTitle(e.target.value) }} value={title} />
                                        <small className='text-xs'>This will appear as a title of your property while searching place.</small>
                                    </div>
                                    <hr />

                                    <>
                                        <p className='text-md fw-bold'>Area In Sq. Feet</p>
                                        <div className='form-group'>
                                            <label htmlFor="" className='text-sm'>Area</label>
                                            <input type="text" className='form-control' onChange={(e) => { setArea(e.target.value) }} value={area} />

                                        </div>
                                    </>

                                    {
                                        data === "building" &&
                                        <div className='pt-3'>
                                            <p className='text-md fw-bold'>Main Door Direction</p>
                                            <div className='form-group'>
                                                <label htmlFor="" className='text-sm'>Direction</label>
                                                <select onChange={(e) => { setDoordirection(e.target.value) }} className='form-select form-control text-sm' name="" id="">
                                                    <option value="North">North</option>
                                                    <option value="South">South</option>
                                                    <option value="East">East</option>
                                                    <option value="West">West</option>
                                                </select>
                                            </div>
                                        </div>
                                    }
                                    <p className='text-md fw-bold mt-3'>Pricing</p>
                                    <div className='form-group'>
                                        <label htmlFor="" className='text-sm'>Price</label>
                                        <input type="text" className='form-control' onChange={(e) => { setPrice(e.target.value) }} value={price} />

                                    </div>
                                    <p className='text-md fw-bold mt-3'>Description</p>
                                    <div className='form-group'>
                                        <label htmlFor="" className='text-sm'>Description</label>
                                        <textarea type="text" className='form-control' onChange={(e) => { setDesc(e.target.value) }} value={desc} />

                                    </div>
                                    <div className='form-group my-3'>
                                        <label htmlFor="" className='text-sm'>Payment Type</label>
                                        <select onChange={(e) => { setPaymentType(e.target.value) }} className='form-select form-control text-sm' name="" id="">
                                            <option selected={paymentType === "on-sale" ? true : false} value="on-sale">On Sale</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='d-flex my-2'>
                                    <button onClick={back} className='btn btn-outline-primary rounded' type='button'>Back</button>
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