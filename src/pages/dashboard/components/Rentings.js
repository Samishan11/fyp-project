import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../../components/Navbar'

const Rentings = () => {

    const rentingType = useParams().type

    const [rentings, setRentings] = useState()

    useEffect(() => {
        axios.get(rentingType === "vendor" ? '/rentings-vendor' : '/rentings-customer').then(function (res) {
            setRentings(res.data)
        })
    }, [rentingType])

    return (
        <>
            <Navbar></Navbar>
            <div className="container col-md-10 my-4">
                <div className="row mx-auto px-4">
                    <div className="col-md-8">
                        <p className='m-0'>See your renting history here</p>
                        {
                            rentings ?
                                <>
                                    {
                                        rentings.rentings.length > 0 ?
                                            <>
                                                {
                                                    rentings.rentings.map((val, ind) => {
                                                        return (
                                                            <>
                                                                <div key={ind} className="row">
                                                                    <div className="col-md-4">
                                                                        <div className="p-0 rounded mb-3">
                                                                            <img
                                                                                src={`http://localhost:5000/${val.property.images[0]}`}
                                                                                alt=""
                                                                                className="p-0"
                                                                                style={{ width: "100%", height: "auto" }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-5">
                                                                        <div className="px-2 py-1 text-start mb-3">
                                                                            <p
                                                                                className="fw-bold mb-1 text-xl"
                                                                                style={{ color: "#707070" }}
                                                                            >
                                                                                {val.property.title}
                                                                            </p>
                                                                            <div className="d-flex flex-wrap justify-content-start align-items-center mb-2">
                                                                                <Link
                                                                                    to="#"
                                                                                    className="text-decoration-none text-primary"
                                                                                >
                                                                                    <div className="d-flex justify-content-start align-items-center me-2">
                                                                                        <ion-icon
                                                                                            name="location"
                                                                                            style={{ fontSize: "0.92rem", color: "#0275d8" }}
                                                                                        ></ion-icon>
                                                                                        <p className="text-xs mb-0 ms-1 text-primary">
                                                                                            {val.property.address.address} - {val.property.address.city}
                                                                                        </p>
                                                                                    </div>
                                                                                </Link>
                                                                                <ion-icon
                                                                                    name="ellipse"
                                                                                    style={{ color: "#707070", fontSize: "0.4rem" }}
                                                                                ></ion-icon>
                                                                                <Link to="#" className="text-decoration-none">
                                                                                    <p
                                                                                        className="text-xs mb-0 mx-2 text-primary"
                                                                                    // style={{ color: "#707070" }}
                                                                                    >
                                                                                        View on Map
                                                                                    </p>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="features p-0 m-0">
                                                                                {val.property.features.map((val, index) => {
                                                                                    return (
                                                                                        <span className="text-xs badge my-2">
                                                                                            <li>{val}</li>
                                                                                        </span>
                                                                                    );
                                                                                })}
                                                                            </div>
                                                                            <div className='d-flex flex-wrap justify-content-between'>
                                                                                <div className="d-flex justify-content-start align-items-center">
                                                                                    <img
                                                                                        src="https://cdn.pixabay.com/photo/2013/07/13/10/07/man-156584__340.png"
                                                                                        alt=""
                                                                                        style={{
                                                                                            width: "35px",
                                                                                            height: "35px",
                                                                                            objectFit: "cover",
                                                                                            borderRadius: "50%",
                                                                                        }}
                                                                                    />
                                                                                    <div className="ms-2 my-3">
                                                                                        <p className="text text-secondary mb-0 text-xs w700">
                                                                                            Rented To:
                                                                                        </p>
                                                                                        <small className="d-block mt-0 text-xs">
                                                                                            {val.customer.firstName} {val.customer.lastName}
                                                                                        </small>
                                                                                        <small className='d-block text-xs mt-0'>Deal Closed On: NPR {val.property.price}</small>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-3">
                                                                        <div className="p-1 text-md-end text-start">
                                                                            <div className="d-flex justify-content-md-end justify-content-start align-items-center mb-3">
                                                                                <Link to="#" className="text-decoration-none text-xs">
                                                                                    <div className="d-flex justify-content-start align-items-center me-2">
                                                                                        <i className='fa-solid fa-star text-warning'></i>
                                                                                        <p className="text-xs mb-0 ms-1">3.6</p>
                                                                                    </div>
                                                                                </Link>
                                                                                <ion-icon
                                                                                    name="ellipse"
                                                                                    style={{ color: "#575757", fontSize: "3px" }}
                                                                                ></ion-icon>
                                                                                <Link to="#" className="text-decoration-none mb-0">
                                                                                    <p
                                                                                        className="text-xs ms-2 mb-0"
                                                                                    >
                                                                                        19 Reviews
                                                                                    </p>
                                                                                </Link>
                                                                            </div>
                                                                            <div className="mb-3">
                                                                                <p
                                                                                    className="text text-secondary mb-0"
                                                                                    style={{ fontSize: "13px" }}
                                                                                >
                                                                                    {/* 4 nights, 2 adults, 2 children */}
                                                                                </p>
                                                                                <div>
                                                                                    <p
                                                                                        className="text text-secondary mb-0 fs-6 fw-bold"
                                                                                    >
                                                                                        NPR {val.property.price} <small>{val.price}</small>
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                            <div className="d-flex justify-content-md-end justify-content-start align-items-center py-0">
                                                                                <Link to={`/list-property-summary/${val._id}/property-summary`} className="btn btn-primary px-3">
                                                                                    Update Listing
                                                                                </Link>
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </div>
                                                                <hr />
                                                            </>
                                                        )
                                                    })
                                                }
                                            </> :
                                            <>
                                                <p>No Data Found...</p>
                                            </>
                                    }
                                </>
                                :
                                <>
                                    <p>Loading...</p>
                                </>
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default Rentings