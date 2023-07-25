import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from '../../../../context/listingContext';
import "../../style.css";
import $ from "jquery"
import axios from 'axios';

const FeaturesForm = () => {

    const navigate = useNavigate()
    const propertyId = useParams().propertyId

    const [listingData, setListingData] = useContext(ListingContext)
    const [features, setFeatures] = useState(listingData?.features ? listingData.features : [])
    // const [postal, setPostal] = useState(listingData?.postal)

    useEffect(() => {
        if (propertyId) {
            axios.get(`/get-property-listing/${propertyId}`).then(function (res) {
                // setListingData(res.data.result)
                setFeatures(res.data.result.features)
            })
        }
    }, [])

    const update = () => {
        axios.put(`/update-listing/${propertyId}`, { features })
        navigate(`/list-property/${propertyId}/update/rules`)
    }

    const storeData = () => {
        listingData.features = features
        // listingData.postal = postal
        setListingData(listingData)
        console.log(listingData)
        {
            propertyId ?
                update() :
                navigate("/list-property/rules")
        }
    }

    const back = () => {
        listingData.features = features
        // listingData.postal = postal
        setListingData(listingData)
        {
            propertyId ?
                navigate(`/list-property/${propertyId}/update/address`) :
                navigate("/list-property/address")
        }
    }

    const addItem = (id, value) => {
        const check = $(`#${id}`).is(":checked")
        if (check) {
            console.log("checked")
            setFeatures((list) => [...list, value])

        } else {
            console.log("unchecked")
            var index = features.indexOf(value)
            features.splice(index, 1)
            setFeatures(features)
        }
    }

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
                    <div className='rounded-circle indicator d-flex align-items-center justify-content-center text-center'>
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
                                    <p className='text-md fw-bold'>What features does your property have?</p>
                                    {
                                        features.length > 0 ?
                                            <div className='form-group my-3'>
                                                <label htmlFor="" className='my-2'>General Features</label>
                                                <div className='row mb-2'>
                                                    <div className="form-group col-md-12">
                                                        <label className="form-control-label text-sm" htmlFor="room">
                                                            Kitchne
                                                        </label>
                                                        <br />
                                                        <input
                                                            defaultValue={features?.indexOf('Kitchen') ? parseInt(features[0].slice(-1)) : 0}
                                                            className="form-control-sm"
                                                            id="kitchen"
                                                            type="number"
                                                            onChange={e => setFeatures((data => [...data, `Kitchen ${e.target.value}`]))} />

                                                    </div>
                                                    <div className="form-group col-md-12">
                                                        <label className="form-control-label text-sm" htmlFor="room">
                                                            Bed Room
                                                        </label>
                                                        <br />
                                                        <input
                                                            defaultValue={features?.indexOf('Bed Room') ? parseInt(features[0].slice(-1)) : 0}
                                                            className="form-control-sm"
                                                            id="bedroom"
                                                            type="number"
                                                            onChange={e => setFeatures((data => [...data, `Bed Room ${e.target.value}`]))} />

                                                    </div>
                                                    <div className="form-group col-md-12">
                                                        <label className="form-control-label text-sm" htmlFor="room">
                                                            Bathroom Room
                                                        </label>
                                                        <br />
                                                        <input
                                                            defaultValue={features?.indexOf('Bath Room') ? parseInt(features[0].slice(-1)) : 0}
                                                            className="form-control-sm"
                                                            id="bathroom"
                                                            type="number"
                                                            onChange={e => setFeatures((data => [...data, `Bath Room ${e.target.value}`]))} />

                                                    </div>
                                                </div>
                                                <div>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                defaultChecked={features?.indexOf('CCTV') === -1 ? false : true}
                                                                id="cctv"
                                                                type="checkbox"
                                                                onChange={addItem.bind(this, "cctv", "CCTV")}
                                                            />

                                                            <label
                                                                className="form-check-label text-sm"
                                                                htmlFor="cctv"
                                                            >
                                                                CCTV
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                defaultChecked={features?.indexOf('Drinking') === -1 ? false : true}
                                                                id="drinking"
                                                                onChange={addItem.bind(this, 'drinking', "Drinking")}
                                                            />
                                                            <label
                                                                className="form-check-label text-sm"
                                                                htmlFor="drinking"
                                                            >
                                                                Drinking Water
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                defaultChecked={features?.indexOf('Lift') === -1 ? false : true}
                                                                id="lift"
                                                                onChange={addItem.bind(this, 'lift', "Lift")}
                                                            />
                                                            <label
                                                                className="form-check-label text-sm"
                                                                htmlFor="lift"
                                                            >
                                                                Lift
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                defaultChecked={features?.indexOf('GYM') === -1 ? false : true}
                                                                id="gym"
                                                                onChange={addItem.bind(this, 'gym', "GYM")}
                                                            />
                                                            <label
                                                                className="form-check-label text-sm"
                                                                htmlFor="gym"
                                                            >
                                                                Garden
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                defaultChecked={features?.indexOf('Internet') === -1 ? false : true}
                                                                id="internet"
                                                                onChange={addItem.bind(this, 'internet', "Internet")}
                                                            />
                                                            <label
                                                                className="form-check-label text-sm"
                                                                htmlFor="internet"
                                                            >
                                                                Internet
                                                            </label>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                defaultChecked={features?.indexOf('Swimming') === -1 ? false : true}
                                                                id="swimming"
                                                                onChange={addItem.bind(this, 'swimming', "Swimming")}
                                                            />
                                                            <label
                                                                className="form-check-label text-sm"
                                                                htmlFor="swimming"
                                                            >
                                                                Swimming Pool
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> :
                                            <></>
                                    }
                                </div>

                                <div className='d-flex my-2'>
                                    <button onClick={back} className='btn btn-outline-primary rounded' type='button'>Back</button>
                                    <button onClick={storeData} type="button" className='btn btn-primary d-block rounded ms-2'>Continue</button>
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

export default FeaturesForm