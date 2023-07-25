import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MapApi from '../../../../components/mapapi/MapApi';
import { ListingContext } from '../../../../context/listingContext';
import Map from '../../Map';
import "../../style.css";

const AddressForm = () => {

    const navigate = useNavigate()
    const propertyId = useParams().propertyId

    const [listingData, setListingData] = useContext(ListingContext)
    const [city, setCity] = useState(listingData?.address?.city)
    const [address, setAddress] = useState(listingData?.address?.address)
    const [postal, setPostal] = useState(listingData?.address?.postal)
    const [location, setLocation] = useState("")
    const [lat, setLat] = useState()
    const [lng, setLng] = useState()

    const update = () => {
        axios.put(`/update-listing/${propertyId}`, { address: { city, address, postal }, lat: listingData?.lat, lng: listingData?.lng })
        navigate(`/list-property/${propertyId}/update/features`)

    }

    const storeData = () => {
        // setLocation({city, address, location})
        // setListingData(location)
        console.log(listingData)
        {
            propertyId ?
                update() :
                navigate("/list-property/features")
        }
    }

    const back = () => {
        // setLocation({city, address, location})
        // setListingData(location)
        console.log(listingData)
        {
            propertyId ?
                navigate(`/list-property/${propertyId}/update/title`) :
                navigate("/list-property/title")
        }
    }

    useEffect(() => {
        if (propertyId) {
            axios.get(`/get-property-listing/${propertyId}`).then(function (res) {
                console.log(res.data.result)
                const listingData = res.data.result
                setLocation(res.data.result.address)
                setListingData(listingData)
                setCity(listingData.address.city)
                setAddress(listingData.address.address)
                setPostal(listingData.address.postal)
                setLat(listingData.lat)
                setLng(listingData.lng)
                // console.log(location)
            })
        }
    }, [])

    return (
        <>
            <div className='container mx-auto my-4 col-9 mx-auto'>
                <div className='d-flex step-map'>
                    <div className='rounded-circle indicator indicator-done d-flex align-items-center justify-content-center text-center'>
                        <small className='text-light text-xs'><ion-icon name="checkmark-outline" style={{ "color": "#fff", fontSize: "1.2em" }}></ion-icon></small>
                    </div>
                    <div className='divider my-auto mx-2'></div>
                    <div className='rounded-circle indicator d-flex align-items-center justify-content-center text-center'>
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
                                    <p className='text-md fw-bold'>Where is your property located?</p>
                                    {
                                        location !== "" ?
                                            <>
                                                <div className='form-group my-3'>
                                                    <label htmlFor="" className='text-sm'>City</label>
                                                    <input type="text" className='form-control' onChange={(e) => { setCity(e.target.value) }} value={city} />
                                                </div>
                                                <div className='form-group my-3'>
                                                    <label htmlFor="" className='text-sm'>Street Address</label>
                                                    <input type="text" className='form-control' onChange={(e) => { setAddress(e.target.value) }} value={address} />
                                                </div>
                                                <div className='form-group my-3'>
                                                    <label htmlFor="" className='text-sm'>Zip/Postal Code</label>
                                                    <input type="text" className='form-control' onChange={(e) => { setPostal(e.target.value) }} value={postal} />
                                                </div>
                                            </> :
                                            <></>
                                    }
                                </div>
                                <div className='d-flex my-2'>
                                    <button onClick={back} className='btn btn-outline-primary rounded' type='button'>Back</button>
                                    <button onClick={storeData} className='btn btn-primary d-block rounded ms-2' type='button'>Continue</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='col-md-6'>
                        <p className='m-0 m-1 text-xs'>Mark your property on map</p>
                        <Map position={{ lat: lat, lng: lng }}></Map>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddressForm