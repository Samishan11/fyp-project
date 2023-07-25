import React, { useState, useContext } from 'react'
import $ from "jquery"
import DatePicker from "sassy-datepicker"
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/userContext';

const Rooms = (props) => {
    const [rooms, setRooms] = useState(props.rooms)
    const [room, setRoom] = useState()
    const [adult, setAdult] = useState(0)
    const [child, setChild] = useState(0)
    const [startDate, setStartDate] = useState(new Date(Date.now()));
    const [endDate, setEndDate] = useState(new Date(Date.now()));
    const [days, setDays] = useState(0);
    const [user] = useContext(UserContext)

    const property = props.property

    const navigate = useNavigate()

    
    // booking
    // booking cancel
    const cancelBooking = async () => {
        const res = await axios.delete("/booking-cancel", {
            property: property._id,
            user: user._id
        })
        if (res.data.deleted) {
            toast.success(res.data.message, { position: toast.POSITION_TOP_RIGHT });
        } else {
            toast.warning(res.data.message, { position: toast.POSITION_TOP_RIGHT });
        }
    }
    const showCalendar = (start) => {
        if (start) {
            $("#endDate").css("display", "none")
            $("#startDate").css("display", "block")
        } else {
            $("#startDate").css("display", "none")
            $("#endDate").css("display", "block")
        }
    }

    const changeStartDate = (date) => {
        setStartDate(date)
        console.log(startDate)
        const days = (new Date(date).getTime() - new Date(date).getTime()) / 1000 * 3600 * 24
        setDays(days)
        $("#startDate").css("display", "none")
    }

    const changeEndDate = (date) => {
        setEndDate(date)
        console.log(endDate)
        $("#endDate").css("display", "none")
    }

    const reserve = (reservedRoom) => {
        setRoom(reservedRoom)
    }

    return (
        <>
            <table className='table border text-sm'>
                <thead>
                    <tr>
                        <th>Room Type</th>
                        <th style={{ background: "#f0f0f0" }}>Number of stays</th>
                        <th>Latest Price</th>
                        <th style={{ background: "#f0f0f0" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        rooms.map((val, ind) => {
                            return (
                                <tr key={ind + 5}>
                                    <td>
                                        <p className='m-0 my-1'>{val.title}</p>
                                        <p className='m-0'>{val.kings_bed > 0 ? <><i className='mt-2'><ion-icon name="bed-outline"></ion-icon></i> {val.kings_bed} Kings Bed</> : ""}</p>
                                        <p className='m-0'>{val.single_bed > 0 ? <><i className='mt-2'><ion-icon name="bed-outline"></ion-icon></i> {val.single_bed} Single Bed</> : ""}</p>
                                        <p className='m-0'>{val.double_bed > 0 ? <><i className='mt-2'><ion-icon name="bed-outline"></ion-icon></i> {val.double_bed} Double Bed</> : ""}</p>
                                        <div className='d-flex flex-wrap my-2'>
                                            <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="resize-outline"></ion-icon></i> {val.room_size} sq.feet</span>
                                            {
                                                val.features.map((f, ind) => {
                                                    if (f === "TV") {
                                                        return (
                                                            <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="tv"></ion-icon></i> {f}</span>
                                                        )
                                                    }
                                                    if (f === "AC") {
                                                        return (
                                                            <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="thermometer-outline"></ion-icon></i> {f}</span>
                                                        )
                                                    }
                                                    if (f === "Wifi") {
                                                        return (
                                                            <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="wifi-outline"></ion-icon></i> {f}</span>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                        <span className='my-2'><i class="fa-solid fa-toilet me-1"></i>{val.bathroom.shared} Bathroom</span>

                                        <div className='d-flex flex-wrap my-2'>
                                            {
                                                val.bathroom.features.map((bf, ind) => {
                                                    return (
                                                        <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="checkmark-outline"></ion-icon></i> {bf}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                    </td>
                                    <td className='' style={{ background: "#f0f0f0" }}>
                                        <span className='text-center d-block'><i className='fa-solid fa-person me-1'></i><span className='text-sm'>{val.room_type}</span></span>
                                    </td>
                                    <td className='w-25'>
                                        <p className='m-0 text-sm text-danger' style={{ textDecoration: "line-through" }}>NPR {val.price - 301}</p>
                                        <p className='m-0 text-sm'>NPR {val.price}</p>
                                        <small className='text-xs'>Including all taxes and charges</small>
                                    </td>
                                    <td className='w-25' style={{ background: "#f0f0f0" }}>
                                        <button onClick={reserve.bind(this, val)} className='btn btn-sm btn-primary w-100 my-2' data-bs-toggle="modal" data-bs-target="#bookRoom">Reserve</button>

                                        <div className="modal fade property-modal" data-backdrop="false" id="bookRoom" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div class="modal-body">
                                                        <div>
                                                            <div className='py-2 px-2 my-3' style={{ background: "#f1f1f1", borderLeft: "3px solid #707070" }}>
                                                                <td>
                                                                    <p className='m-0 my-1'>{val.title}</p>
                                                                    <p className='m-0'>{val.kings_bed > 0 ? <><i className='mt-2'><ion-icon name="bed-outline"></ion-icon></i> {val.kings_bed} Kings Bed</> : ""}</p>
                                                                    <p className='m-0'>{val.single_bed > 0 ? <><i className='mt-2'><ion-icon name="bed-outline"></ion-icon></i> {val.single_bed} Single Bed</> : ""}</p>
                                                                    <p className='m-0'>{val.double_bed > 0 ? <><i className='mt-2'><ion-icon name="bed-outline"></ion-icon></i> {val.double_bed} Double Bed</> : ""}</p>
                                                                    <div className='d-flex flex-wrap my-2'>
                                                                        <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="resize-outline"></ion-icon></i> {val.room_size} sq.feet</span>
                                                                        {
                                                                            val.features.map((f, ind) => {
                                                                                if (f === "TV") {
                                                                                    return (
                                                                                        <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="tv"></ion-icon></i> {f}</span>
                                                                                    )
                                                                                }
                                                                                if (f === "AC") {
                                                                                    return (
                                                                                        <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="thermometer-outline"></ion-icon></i> {f}</span>
                                                                                    )
                                                                                }
                                                                                if (f === "Wifi") {
                                                                                    return (
                                                                                        <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="wifi-outline"></ion-icon></i> {f}</span>
                                                                                    )
                                                                                }
                                                                            })
                                                                        }
                                                                    </div>
                                                                    <span className='my-2'><i class="fa-solid fa-toilet me-1"></i>{val.bathroom.shared} Bathroom</span>

                                                                    <div className='d-flex flex-wrap my-2'>
                                                                        {
                                                                            val.bathroom.features.map((bf, ind) => {
                                                                                return (
                                                                                    <span className='me-3 d-flex'><i className="me-1" style={{ marginTop: "1.5px" }}><ion-icon name="checkmark-outline"></ion-icon></i> {bf}</span>
                                                                                )
                                                                            })
                                                                        }
                                                                    </div>
                                                                </td>
                                                            </div>
                                                            <div className='col-md-7'>
                                                                <form id='checkout-form'>

                                                                    {
                                                                        property.category === "hotel" || property.category === "hostel" ?
                                                                            <>
                                                                                <div className='my-2' style={{ position: "relative" }}>
                                                                                    <small className='text-sm'>Check In</small>
                                                                                    <div className='input-group bg-light border py-2'>
                                                                                        <span className='d-block my-auto'><i className='fa-solid fa-calendar mx-2'></i></span>
                                                                                        <input className='form-control p-0 text-sm' value={startDate.toDateString()} style={{ border: "none" }} type="text" onFocus={() => showCalendar(true)} />
                                                                                    </div>
                                                                                    <DatePicker id="startDate" selected={startDate} onChange={(date) => changeStartDate(date)} style={{ position: "absolute", zIndex: "1", display: "none" }} />
                                                                                </div>

                                                                                <div className='my-2' style={{ position: "relative" }}>
                                                                                    <small className='text-sm'>Check Out</small>
                                                                                    <div className='input-group bg-light border py-2'>
                                                                                        <span className='d-block my-auto'><i className='fa-solid fa-calendar mx-2'></i></span>
                                                                                        <input className='form-control p-0 text-sm' value={endDate.toDateString()} style={{ border: "none" }} type="text" onFocus={() => showCalendar(false)} />
                                                                                    </div>
                                                                                    <DatePicker id="endDate" selected={endDate} onChange={(date) => changeEndDate(date)} style={{ position: "absolute", zIndex: "1", display: "none" }} />
                                                                                </div>
                                                                                <div className="my-3">
                                                                                    <p className="text text-secondary mb-0 text-sm fw-bold">
                                                                                        <span className="fw-normal">08 Nights</span>
                                                                                    </p>
                                                                                </div>
                                                                                <hr className="my-2" />

                                                                            </> :
                                                                            <></>
                                                                    }
                                                                    <div className="">
                                                                        <p className="text text-secondary h6 text-sm fw-bold mb-1">
                                                                            People
                                                                        </p>
                                                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                                                            <div className="w-50 me-2">
                                                                                <label htmlFor="adults" className="h6 text-secondary text-sm">
                                                                                    Adults
                                                                                </label>
                                                                                <div className="d-flex justify-content-start align-items-center border bg-white">
                                                                                    <i className="text-secondary text-sm mx-2">
                                                                                        <ion-icon name="person"></ion-icon>
                                                                                    </i>
                                                                                    <input
                                                                                        onChange={e => setAdult(e.target.value)}
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        id="adults"
                                                                                        style={{
                                                                                            outline: "none",
                                                                                            border: "0px solid white",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                            <div className="w-50 ms-2">
                                                                                <label htmlFor="child" className="h6 text-secondary text-sm">
                                                                                    Child
                                                                                </label>
                                                                                <div className="d-flex justify-content-start align-items-center border bg-white">
                                                                                    <i className="text-secondary fs-6 mx-2">
                                                                                        <ion-icon name="accessibility"></ion-icon>
                                                                                    </i>
                                                                                    <input
                                                                                        onChange={e => setChild(e.target.value)}
                                                                                        type="number"
                                                                                        className="form-control"
                                                                                        id="adults"
                                                                                        style={{
                                                                                            outline: "none",
                                                                                            border: "0px solid white",
                                                                                        }}
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <p className="text text-secondary mb-0 text-sm fw-bold">
                                                                            Total Guest: <span className="fw-normal">{parseInt(child) + parseInt(adult)}</span>
                                                                        </p>
                                                                    </div>
                                                                    <hr className="my-2" />
                                                                   
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <small className='d-block'><i className='fa-solid fa-check-circle me-1'></i>Free cancelation</small>
                                        <small className='d-block'><i className='fa-solid fa-check-circle me-1'></i>No extra charges</small>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Rooms