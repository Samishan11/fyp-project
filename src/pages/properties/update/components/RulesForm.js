import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ListingContext } from '../../../../context/listingContext';
import "../../style.css";
import $ from "jquery"
import axios from 'axios';

const RulesForm = () => {

    const navigate = useNavigate()
    const propertyId = useParams().propertyId

    const [listingData, setListingData] = useContext(ListingContext)
    const [smoking_allowed, setSmoking] = useState(listingData?.rules?.smoking_allowed ? listingData.rules.smoking_allowed : false);
    const [pets_allowed, setPets] = useState(listingData?.rules?.pets_allowed ? listingData.rules.pets_allowed : false);
    const [kids_allowed, setKids] = useState(listingData?.rules?.kids_allowed ? listingData.rules.kids_allowed : false);
    const [outsiders_allowed, setOutsiders] = useState(listingData?.rules?.outsiders_allowed ? listingData.rules.outsiders_allowed : false);
    const [events_allowed, setEvents] = useState(listingData?.rules?.events_allowed ? listingData.rules.events_allowed : false);
    const [entry, setEntry] = useState(listingData?.rules?.entry ? listingData.rules.entry : false);
    const [check_in, setCheckIn] = useState(listingData?.rules?.check_in ? listingData.rules.check_in : false);
    const [check_out, setCheckOut] = useState(listingData?.rules?.check_out ? listingData.rules.check_out : false);

    const [rules, setRules] = useState()

    useEffect(() => {
        if (propertyId) {
            axios.get(`/get-property-listing/${propertyId}`).then(function (res) {
                // setListingData(res.data.result)
                const data = res.data.result
                const rules = data.rules
                setRules(rules)

                setSmoking(rules.smoking_allowed)
                setPets(rules.pets_allowed)
                setKids(rules.kids_allowed)
                setOutsiders(rules.outsiders_allowed)
                setEvents(rules.events_allowed)
                setEvents(rules.events_allowed)
                setEntry(rules.entry)
                setCheckIn(rules.check_in)
                setCheckOut(rules.check_out)
                setListingData(data)
            })
        }
    }, [])

    const update = (rules) => {
        axios.put(`/update-listing/${propertyId}`, { rules })
        navigate(`/list-property-summary/${listingData._id}/property-summary`)
    }

    const storeData = () => {
        const rules = { smoking_allowed, pets_allowed, kids_allowed, outsiders_allowed, events_allowed, entry, check_in, check_out }
        listingData.rules = rules
        setListingData(listingData)
        if (listingData._id) {
            update(rules)
        } else {
            axios.post("/list-property", listingData).then(function (res) {
                console.log(res.data.result)
                listingData._id = res.data.result._id
                setListingData(listingData)

            })
            navigate(`/list-property-summary/${listingData._id}/property-summary`)
        }
    }

    const back = () => {
        const rules = { smoking_allowed, pets_allowed, kids_allowed, outsiders_allowed, events_allowed, entry, check_in, check_out }
        listingData.rules = rules
        // listingData.postal = postal
        setListingData(listingData)
        {
            propertyId ?
                navigate(`/list-property/${propertyId}/update/features`) :
                navigate("/list-property/features")
        }
    }
    console.log(listingData)

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
                    <div className='rounded-circle indicator d-flex align-items-center justify-content-center text-center'>
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
                                    {
                                        rules ?
                                            <>
                                                <p className='text-md fw-bold'>What rules does your property have?</p>
                                                <div className='form-group my-3'>
                                                    <label htmlFor="" className='my-2'>Property Rules</label>

                                                    <div className='d-flex my-2'>
                                                        <label className="form-check-label text-sm" htmlFor="">Smoking allowed in shared area</label>
                                                        <div className="form-check form-switch ms-auto">
                                                            <input defaultChecked={smoking_allowed} onChange={(e) => { setSmoking($('#smoking').is(":checked")) }} className="form-check-input" type="checkbox" role="switch" id="smoking" />
                                                        </div>
                                                    </div>
                                                    <div className='d-flex my-2'>
                                                        <label className="form-check-label text-sm" htmlFor="">Pets allowed</label>
                                                        <div className="form-check form-switch ms-auto">
                                                            <input defaultChecked={pets_allowed} onChange={(e) => { setPets($('#pets').is(":checked")) }} className="form-check-input" type="checkbox" role="switch" id="pets" />
                                                        </div>
                                                    </div>
                                                    <div className='d-flex my-2'>
                                                        <label className="form-check-label text-sm" htmlFor="">Outsiders allowed</label>
                                                        <div className="form-check form-switch ms-auto">
                                                            <input defaultChecked={outsiders_allowed} onChange={(e) => { setOutsiders($('#outsiders').is(":checked")) }} className="form-check-input" type="checkbox" role="switch" id="outsiders" />
                                                        </div>
                                                    </div>
                                                    <div className='d-flex my-2'>
                                                        <label className="form-check-label text-sm" htmlFor="">Kids allowed</label>
                                                        <div className="form-check form-switch ms-auto">
                                                            <input defaultChecked={kids_allowed} onChange={(e) => { setKids($('#kids').is(":checked")) }} className="form-check-input" type="checkbox" role="switch" id="kids" />
                                                        </div>
                                                    </div>
                                                    <div className='d-flex my-2'>
                                                        <label className="form-check-label text-sm" htmlFor="">Events/party allowed</label>
                                                        <div className="form-check form-switch ms-auto">
                                                            <input defaultChecked={events_allowed} onChange={(e) => { setEvents($('#events').is(":checked")) }} className="form-check-input" type="checkbox" role="switch" id="events" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                {
                                                    <>
                                                        <div className='form-group'>
                                                            <label className="form-check-label text-sm" htmlFor="">Entry not allowed after</label>
                                                            <input defaultValue={entry} onChange={(e) => { setEntry(e.target.value) }} className='form-control my-2' type="time" style={{ width: "8vw" }} />
                                                        </div>

                                                        <div className='row'>
                                                            <div className='form-group col-md-6'>
                                                                <label className="form-check-label text-sm" htmlFor="">Check In</label>
                                                                <input defaultValue={check_in} onChange={(e) => { setCheckIn(e.target.value) }} className='form-control my-2' type="time" style={{ width: "8vw" }} />
                                                            </div>
                                                            <div className='form-group col-md-6'>
                                                                <label className="form-check-label text-sm" htmlFor="">Check Out</label>
                                                                <input defaultValue={check_out} onChange={(e) => { setCheckOut(e.target.value) }} className='form-control my-2' type="time" style={{ width: "8vw" }} />
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                            </> :
                                            <><p>Loading...</p></>
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

export default RulesForm