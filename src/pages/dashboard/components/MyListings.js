import React, { useEffect, useState, useRef } from "react";
import "../dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { UserContext } from "../../../context/userContext";
import axios from "axios";
import { toast } from "react-toastify";
const MyListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState();
  const ref = useRef(null);
  const [accept, setAccept] = useState(true);
  const [load, setLoad] = useState(false);

  //
  const handleClick = (id) => {
    axios
      .put("/update-listing/" + id, {
        available: false,
      })
      .then((data) => {
        load ? setLoad(false) : setLoad(true);
      })
      .catch((e) => {
        toast.warn("Someting went wrong!!!");
      });
  };
  const handleClick1 = (id) => {
    axios
      .put("/update-listing/" + id, {
        available: true,
      })
      .then((data) => {
        console.log(data);
        load ? setLoad(false) : setLoad(true);
      })
      .catch((e) => {
        toast.warn("Someting went wrong!!!");
      });
  };

  const deleteListing = async (propertyId) => {
    const res = await axios.put("/delete-listing/" + propertyId);
    if (res.data.success) {
      setListings(res.data.result);
    }
  };

  useEffect(() => {
    axios.get("/my-listings").then(function (res) {
      console.log(res);
      setListings(res.data.result);
    });
  }, [load]);

  return (
    <>
      <Navbar></Navbar>
      <div className="container col-md-10 my-4">
        <div className="row mx-auto px-4">
          <div className="col-md-8">
            {listings ? (
              listings.map((val, ind) => {
                return (
                  <>
                    <div key={ind} className="row">
                      <div className="col-md-4">
                        <div className="p-0 rounded mb-3">
                          <img
                            src={`http://localhost:5000/${val.images[0]}`}
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
                            {val?.title}
                          </p>
                          <div className="d-flex flex-wrap justify-content-start align-items-center mb-2">
                            <Link
                              to="#"
                              className="text-decoration-none text-primary"
                            >
                              <div className="d-flex justify-content-start align-items-center me-2">
                                <ion-icon
                                  name="location"
                                  style={{
                                    fontSize: "0.92rem",
                                    color: "#0275d8",
                                  }}
                                ></ion-icon>
                                <p className="text-xs mb-0 ms-1 text-primary">
                                  {val?.address?.address} - {val?.address?.city}
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
                            {val?.features.map((val, index) => {
                              return (
                                <span className="text-xs badge my-2">
                                  <li>{val}</li>
                                </span>
                              );
                            })}
                          </div>
                          <div className="d-flex justify-content-start align-items-center">
                            <div className="ms-2 my-3">
                              <p className="text text-secondary mb-0 text-xs w700">
                                Post By:
                              </p>
                              <small className="d-block mt-0 text-xs">
                                {val?.owner?.firstName} {val?.owner?.lastName}
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="p-1 text-md-end text-start">
                          <div className="mb-3">
                            <p
                              className="text text-secondary mb-0"
                              style={{ fontSize: "13px" }}
                            ></p>
                            <div>
                              <p className="text text-secondary mb-0 fs-6 fw-bold">
                                NPR {val?.price}
                              </p>
                            </div>
                          </div>
                          <div className="d-flex justify-content-start align-items-center mx-2 py-0">
                            {val.available ? (
                              <button
                                onClick={() => handleClick(val._id)}
                                className="btn btn-success btn-sm me-2"
                              >
                                Mark as avaliable
                              </button>
                            ) : (
                              <button
                                onClick={() => handleClick1(val._id)}
                                className="btn btn-danger btn-sm"
                              >
                                Mark as sold
                              </button>
                            )}
                          </div>
                          <div className="justify-content-start align-items-center py-0">
                            <Link
                              to={`/list-property-summary/${val._id}/property-summary`}
                              className="btn btn-sm btn-primary px-3"
                            >
                              Update Listing
                            </Link>
                            <button
                              onClick={deleteListing.bind(this, val._id)}
                              className="btn my-2"
                            >
                              <i className="fa-solid fa-trash text-danger"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr />
                  </>
                );
              })
            ) : (
              <>
                <p>Loading...</p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyListings;
