import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from '../../../../context/listingContext';
import "../../style.css";
import { Link } from 'react-router-dom';
const Summary = () => {

    const navigate = useNavigate()
    const [listingData, setListingData] = useContext(ListingContext)
    const propertyId = useParams().propertyId

    return (
        <>
            <div className='container mx-auto my-4 col-9 mx-auto'>
                <div className='d-flex step-map'>
                    <div className='rounded-circle indicator indicator-done d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'><ion-icon name="checkmark-outline" style={{ "color": "#fff", fontSize: "1.2em" }}></ion-icon></small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator indicator-done d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'><ion-icon name="checkmark-outline" style={{ "color": "#fff", fontSize: "1.2em" }}></ion-icon></small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator indicator-done d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'><ion-icon name="checkmark-outline" style={{ "color": "#fff", fontSize: "1.2em" }}></ion-icon></small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator indicator-done d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'><ion-icon name="checkmark-outline" style={{ "color": "#fff", fontSize: "1.2em" }}></ion-icon></small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'>5</small>
                    </div>
                </div>
                <div className='row my-4'>
                    <div className='col-md-6'>
                        <div className='border rounded my-2 px-1 py-2 d-flex'>
                            <div className='my-auto mx-2'>
                                <ion-icon name="home-outline" style={{ fontSize: "3em", color: "#1965fc" }}></ion-icon>
                            </div>
                            <div>
                                <small className='text-xs'>Step 1</small>
                                <p className='fw-bold m-0'>Property Details</p>
                                <small className='text-sm'>Add details to your listing including location, features, rules and more.</small>
                                <Link to={`/list-property/${propertyId}/update/title`} className='link-btn link-btn-sm text-primary d-block'>Edit</Link>
                            </div>
                        </div>
                        <div className='border rounded my-2 px-1 py-2 d-flex'>
                            <div className='my-auto mx-2'>
                                <ion-icon name="add-circle-outline" style={{ fontSize: "3em", color: "#1965fc" }}></ion-icon>                            </div>
                            <div>
                                <small className='text-xs'>Step 2</small>
                                <p className='fw-bold m-0'>Add rooms</p>
                                <small className='text-sm'>Add rooms and its features on this property.</small>
                                <Link to={`/add-room/${propertyId}/bathroom-features`} className='link-btn link-btn-sm text-primary d-block'>Add new room</Link>
                            </div>
                        </div>
                        <div className='border rounded my-2 px-1 py-2 d-flex'>
                            <div className='my-auto mx-2'>
                                <ion-icon name="image" style={{ fontSize: "3em", color: "#1965fc" }}></ion-icon>                            </div>
                            <div>
                                <small className='text-xs'>Step 3</small>
                                <p className='fw-bold m-0'>Add Images</p>
                                <small className='text-sm'>Add images so that people can know better about your property.</small>
                                <small className='link-btn link-btn-sm text-primary d-block'>Add image</small>
                            </div>
                        </div>
                        <div className='border rounded my-2 px-1 py-2 d-flex'>
                            <div className='my-auto mx-2'>
                                <ion-icon name="wallet-outline" style={{ fontSize: "3em", color: "#1965fc" }}></ion-icon>                            </div>
                            <div>
                                <small className='text-xs'>Step 4</small>
                                <p className='fw-bold m-0'>Payment</p>
                                <small className='text-sm'>Add your billing information.</small>
                                <small className='link-btn link-btn-sm text-primary d-block'>Verify Payment</small>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6'>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Summary