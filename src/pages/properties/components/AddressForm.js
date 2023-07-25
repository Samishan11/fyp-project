import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import MapApi from '../../../components/mapapi/MapApi';
import { ListingContext } from '../../../context/listingContext';
import "../style.css";
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { useMap } from 'react-leaflet/hooks'
import Map from '../Map';

const AddressForm = () => {

    const data = useLocation()?.state?.data
    console.log(data)

    const navigate = useNavigate();

    const [listingData, setListingData] = useContext(ListingContext);
    const [city, setCity] = useState(listingData?.address?.city);
    const [address, setAddress] = useState(listingData?.address?.address);
    const [postal, setPostal] = useState(listingData?.address?.postal);
    const [area, setArea] = useState(listingData?.area);

    console.log(listingData)
    const storeData = () => {
        listingData.address = { city, address, postal }
        setListingData(listingData)
        navigate("/list-property/features", { state: { data: data } })
        if (listingData._id) {
            setListingData(listingData)
            navigate(`/list-property-summary/${listingData._id}/property-summary`)
        } else {
            if (listingData.category === 'land') {
                axios.post("/list-property", listingData).then(function (res) {
                    console.log(res.data)
                    listingData._id = res.data.result._id
                    setListingData(listingData)
                    navigate(`/list-property-summary/${res.data.result._id}/property-summary`)
                });
            } 
        }
    }

    const back = () => {
        listingData.address = { city, address, postal }
        setListingData(listingData)
        navigate("/list-property/title")
    }

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
                        <Map></Map>
                    </div>
                </div>
            </div>
            <div className="div" style={{ height: "50vh", width: '50vw' }}>
            </div>
        </>
    )
}

export default AddressForm