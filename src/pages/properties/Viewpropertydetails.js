import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./style.css";
import $ from "jquery";
import { UserContext } from "../../context/userContext";
import { toast } from "react-toastify";
import BookingCard from "./components/BookingCard";
import OwnersCard from "./components/OwnersCard";
import { RoomBookProvider } from "../../context/BookRoomContext";
import MapView from "./components/MapView";
import ShowComments from "./components/ShowComments";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Viewpropertydetails = () => {
  const data = useLocation()?.state;
  const compare = useLocation()?.state?.compare;
  const [property, setProperty] = useState();
  const propertyId = useParams().propertyId;
  const [user] = useContext(UserContext);
  const [rating, setRating] = useState("1");
  const [review, setReview] = useState();

  const navigate = useNavigate();
  const [filterproperty, setFiterProperty] = useState();
  const [show, setShow] = useState(false);
  const [table, setTable] = useState(false);
  console.log(` show ${show}`);
  console.log(` table ${table}`);

  const showFUnction = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
    $("html, body").animate(
      { scrollTop: document.body.scrollHeight },
      "smooth"
    );
  };

  const showTableFUnction = () => {
    table ? setTable(false) : setTable(true);
    show ? setShow(false) : setShow(true);
  };

  useEffect(() => {
    axios.get(`/get-property-listing/${propertyId}`).then(function (res) {
      setProperty(res.data.result);
      const filter = data?.filter((data, ind) => {
        if (
          data._id !== propertyId &&
          data.category === res.data.result.category
        ) {
          return data;
        }
      });

      function random_item(items) {
        return items[Math.floor(Math.random() * items.length)];
      }
      setFiterProperty(random_item(filter));
    });
  }, []);

  console.log(property)

  const starRate = (val) => {
    $(".fa-star").removeClass("text-warning");
    console.log(val);
    for (var i = 0; i <= val; i++) {
      $(".fa-star").eq(i).addClass("text-warning");
      setRating(val);
    }
  };
  const [load, setLoad] = useState(false);
  const postReview = async () => {
    const res = await axios.post(`/post-review/${propertyId}`, {
      property: propertyId,
      rating: rating,
      comment: review,
    });
    if (res.data.success) {
      load ? setLoad(false) : setLoad(true);
      toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT });
    }
  };

  return (
    <>
      <Navbar></Navbar>
      {property ? (
        <div className="container mx-auto my-4 col-md-12 col-xl-9 mx-auto">
          <div className="row flex-reverse">
            <div className="col-md-8 right-section">
              <div className="p-1">
                <div
                  id="carouselExampleIndicators"
                  className="carousel slide bg-dark"
                  data-bs-ride="carousel"
                  style={{ position: "relative" }}
                >
                  <div className="carousel-indicators d-flex m-0">
                    {property?.images ? (
                      property.images.map((val, ind) => {
                        return (
                          <img
                            type="button"
                            src={`http://localhost:5000/${val}`}
                            style={{
                              height: "8ch",
                              width: "14ch",
                              objectFit: "cover",
                            }}
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to={ind}
                            className={`${ind === 0 ? "active" : ""} mx-3`}
                            aria-current="true"
                            aria-label={`Slide ${ind}`}
                          />
                        );
                      })
                    ) : (
                      <>
                        <p>Loading...</p>
                      </>
                    )}
                  </div>
                  <div className="carousel-inner">
                    {property?.images ? (
                      property.images.map((val, ind) => {
                        return (
                          <div
                            key={ind}
                            style={{ width: "100%" }}
                            className={`carousel-item ${
                              ind === 0 ? "active" : ""
                            }`}
                          >
                            <img
                              key={ind + 1}
                              src={`http://localhost:5000/${val}`}
                              className="d-block w-100"
                              alt="image"
                              style={{ height: "50ch", objectFit: "cover" }}
                            />
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div
                          className="d-block w-100 carousel-item"
                          alt="image"
                          style={{ height: "50ch" }}
                        >
                          <p>Loading...</p>
                        </div>
                      </>
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
                <div className="bg-light p-2">
                  <div className="px-3">
                    <div className="mb-5" id="overviewSection">
                      <p className="text text-secondary mb-0 fw-bold">
                        Overview
                      </p>
                      <hr className="mt-1" />
                      <div className="hostel-data mb-4">
                        <p className="text text-secondary mb-1 fw-bold">
                          {property?.title}
                        </p>
                        <div className="d-flex justify-content-start align-items-center mb-2">
                          <i className="text-secondary me-2">
                            <ion-icon name="location"></ion-icon>
                          </i>
                          <small className="d-block text-secondary">
                            {property?.address?.address},{" "}
                            {property?.address?.city} -{" "}
                            {property?.address?.postal}
                          </small>
                        </div>
                        {property.owner.phone !== "#" && (
                          <div className="d-flex justify-content-start align-items-center mb-2">
                            <i className="text-secondary me-2">
                              <ion-icon name="phone-portrait-outline"></ion-icon>
                            </i>
                            <small className="d-block text-secondary">
                              {property?.owner?.phone}
                            </small>
                          </div>
                        )}
                        <div className="d-flex justify-content-start align-items-center mb-2">
                          <i className="text-secondary me-2">
                            <ion-icon name="mail"></ion-icon>
                          </i>
                          <small className="d-block text-secondary">
                            {property?.owner?.email}
                          </small>
                        </div>
                      </div>
                      {property?.area && (
                        <div className="hostel-description mb-4">
                          <p className="text text-secondary mb-1 fw-bold">
                            Area:
                          </p>
                          <p className="text text-muted">
                            {property?.area} sq. feet
                          </p>
                        </div>
                      )}
                      <div className="hostel-description mb-4">
                        <p className="text text-secondary mb-1 fw-bold">
                          Description
                        </p>
                        <p className="text text-muted">{property?.desc}</p>
                      </div>
                      {property?.category !== "land" && (
                        <>
                          <div className="hostel-features mb-4">
                            <p className="text text-secondary mb-1 fw-bold">
                              Features
                            </p>
                            <div className="d-flex flex-wrap justify-content-between align-items-center">
                              {property?.features.map((val) => {
                                return (
                                  <div className="d-flex justify-content-start align-items-center mb-2">
                                    <ion-icon
                                      name="checkmark-circle-outline"
                                      style={{ color: "#12bf12" }}
                                    ></ion-icon>
                                    <small className="d-block text-secondary ms-1">
                                      {val}
                                    </small>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {property?.category === "appartment" && (
                            <>
                              <hr />
                              <div className="hostel-rules mb-5">
                                <p className="text text-secondary mb-0 fw-bold">
                                  Property Rules
                                </p>
                                <div className="row my-3">
                                  <div className="col-md-4">
                                    <div className="px-1">
                                      <div className="d-flex justify-content-start align-items-center mb-2">
                                        <i className=" text-secondary me-2">
                                          <ion-icon name="paw"></ion-icon>
                                        </i>
                                        <small className="d-block text-secondary">
                                          Pets Friendly
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="px-1">
                                      <p className="text text-secondary">
                                        <div class="form-check form-switch">
                                          <input
                                            class="form-check-input"
                                            type="checkbox"
                                            defaultChecked={
                                              property?.rules?.pets_allowed
                                                ? true
                                                : false
                                            }
                                            disabled
                                          />
                                        </div>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-md-4">
                                    <div className="px-1">
                                      <div className="d-flex justify-content-start align-items-center mb-2">
                                        <i className=" text-secondary me-2">
                                          <ion-icon name="accessibility"></ion-icon>
                                        </i>
                                        <small className="d-block text-secondary">
                                          Children
                                        </small>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-8">
                                    <div className="px-1">
                                      <div class="form-check form-switch">
                                        <input
                                          class="form-check-input"
                                          type="checkbox"
                                          defaultChecked={
                                            property?.rules?.kids_allowed
                                              ? true
                                              : false
                                          }
                                          disabled
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    <div className="mb-5 mt-4" id="reviewSection">
                      <p className="text text-secondary fw-bold mb-0">Review</p>
                      <hr className="mt-1" />
                      <button
                        type="button"
                        className="btn btn-sm btn-secondary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        Write A Review
                      </button>
                      <div
                        class="modal fade"
                        id="exampleModal"
                        tabIndex="-1"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h5
                                class="modal-title text-md"
                                id="exampleModalLabel"
                              >
                                Post a Review
                              </h5>
                              <button
                                type="button"
                                className="btn-close btn-sm"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </div>
                            <div className="modal-body">
                              <div className="">
                                <div className="">
                                  <div className="mt-3">
                                    <textarea
                                      onChange={(e) =>
                                        setReview(e.target.value)
                                      }
                                      name=""
                                      id=""
                                      cols="30"
                                      rows="4"
                                      className="form-control"
                                      placeholder="Write something..."
                                    ></textarea>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button
                                type="button"
                                className="btn btn-sm btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                onClick={postReview}
                                type="button"
                                className="btn btn-sm btn-primary"
                              >
                                Post
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      {load ? (
                        <ShowComments
                          load={load}
                          propertyId={propertyId}
                        ></ShowComments>
                      ) : (
                        <ShowComments
                          load={load}
                          propertyId={propertyId}
                        ></ShowComments>
                      )}
                    </div>
                    <div className="mb-5" id="mapSection">
                      <p className="text text-secondary fw-bold mb-0">Map</p>
                      <hr className="mt-1" />
                      <div className="">
                        <MapView
                          position={{ lat: property?.lat, lng: property?.lng }}
                        ></MapView>
                      </div>
                      {/* compare */}
                      <div className="mt-4 m-0 p-0">
                        {show && (
                          <div className="container">
                            <h6 className="fw-bold">Property Comparision</h6>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="p-0 rounded mb-3">
                                  <img
                                    src={`http://localhost:5000/${property.images[0]}`}
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
                                    {property?.title}
                                  </p>
                                  <div className="d-flex flex-wrap justify-content-start align-items-center mb-2">
                                    <div className="d-flex justify-content-start align-items-center me-2">
                                      <ion-icon
                                        name="location"
                                        style={{
                                          fontSize: "0.92rem",
                                          color: "#0275d8",
                                        }}
                                      ></ion-icon>
                                      <p className="text-xs mb-0 ms-1 text-primary">
                                        {property?.address?.address} -{" "}
                                        {property?.address?.city}
                                      </p>
                                    </div>
                                    <ion-icon
                                      name="ellipse"
                                      style={{
                                        color: "#707070",
                                        fontSize: "0.4rem",
                                      }}
                                    ></ion-icon>
                                  </div>
                                  <div className="d-flex justify-content-start align-items-center">
                                    <div className="ms-2 my-1">
                                      {property?.available ? (
                                        <button
                                          className="btn text-sm text-light btn-sm my-2"
                                          style={{ background: "#42EA5A" }}
                                        >
                                          Available
                                        </button>
                                      ) : (
                                        <button className="btn text-sm text-light btn-sm bg-danger my-2">
                                          Unavailable
                                        </button>
                                      )}
                                      <p className="text text-secondary mb-0 text-xs w700">
                                        Hosted By:
                                      </p>
                                      <small className="d-block mt-0 text-xs">
                                        {property?.owner?.firstName}{" "}
                                        {property?.owner?.lastName}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-4">
                                <div className="p-0 rounded mb-3">
                                  <img
                                    src={`http://localhost:5000/${filterproperty?.images[0]}`}
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
                                    {filterproperty?.title}
                                  </p>
                                  <div className="d-flex flex-wrap justify-content-start align-items-center mb-2">
                                    <div className="d-flex justify-content-start align-items-center me-2">
                                      <ion-icon
                                        name="location"
                                        style={{
                                          fontSize: "0.92rem",
                                          color: "#0275d8",
                                        }}
                                      ></ion-icon>
                                      <p className="text-xs mb-0 ms-1 text-primary">
                                        {filterproperty?.address?.address} -{" "}
                                        {filterproperty?.address?.city}
                                      </p>
                                    </div>

                                    <ion-icon
                                      name="ellipse"
                                      style={{
                                        color: "#707070",
                                        fontSize: "0.4rem",
                                      }}
                                    ></ion-icon>
                                  </div>
                                  <div className="d-flex justify-content-start align-items-center">
                                    <div className="ms-2 my-1">
                                      {filterproperty?.available ? (
                                        <button
                                          className="btn text-sm text-light btn-sm my-2"
                                          style={{ background: "#42EA5A" }}
                                        >
                                          Available
                                        </button>
                                      ) : (
                                        <button className="btn text-sm text-light btn-sm bg-danger my-2">
                                          Unavailable
                                        </button>
                                      )}
                                      <p className="text text-secondary mb-0 text-xs w700">
                                        Hosted By:
                                      </p>
                                      <small className="d-block mt-0 text-xs">
                                        {filterproperty?.owner?.firstName}{" "}
                                        {filterproperty?.owner?.lastName}
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {compare?.length > 1 ? (
                              <button
                                onClick={showTableFUnction}
                                className="btn text-sm text-light btn-sm my-2 py-1"
                                style={{ background: "#42EA5A" }}
                              >
                                Compare Properties
                              </button>
                            ) : (
                              <p>No other properties to compare</p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              {property?.available ? (
                localStorage.getItem("token") ? (
                  user?._id !== property?.owner?._id ? (
                    <RoomBookProvider>
                      <BookingCard property={property}></BookingCard>
                    </RoomBookProvider>
                  ) : (
                    <OwnersCard property={property}></OwnersCard>
                  )
                ) : (
                  <button
                    onClick={() => navigate("/login")}
                    type="button"
                    className="btn btn-primary d-block w-100"
                  >
                    Buy
                  </button>
                )
              ) : (
                <div
                  className="p-1"
                  style={{
                    background: "#F9F9F9",
                    position: "sticky",
                    top: "0",
                  }}
                >
                  <div className="mx-2">
                    <p className="text text-secondary mb-0 fs-6 fw-bold">
                      NPR {property.price}
                    </p>
                    <hr className="my-2" />
                    <div>
                      <button className="btn text-sm text-light bg-danger">
                        Unavailable
                      </button>
                      <small className="text-xs d-block my-3">
                        This property has been sold out and currently
                        unavailable.
                      </small>
                    </div>
                  </div>
                </div>
              )}
              <button
                onClick={() => {
                  if (show) {
                    setShow(false);
                  } else {
                    setShow(true);
                  }
                  $("html, body").animate(
                    { scrollTop: document.body.scrollHeight },
                    "smooth"
                  );
                }}
                className="btn btn-outline-primary mt-4 rounded"
              >
                + Compare with other property
              </button>
            </div>
          </div>
          <>
            {table && (
              <div className="container">
                <table class="table table-hover border table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">Property 1</th>
                      <th scope="col">Property 2</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="container">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="p-0 rounded mb-3">
                                <img
                                  src={`http://localhost:5000/${property.images[0]}`}
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
                                  {property?.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="container">
                          <div className="row">
                            <div className="col-md-4">
                              <div className="p-0 rounded mb-3">
                                <img
                                  src={`http://localhost:5000/${filterproperty?.images[0]}`}
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
                                  {filterproperty?.title}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="d-flex flex-wrap justify-content-start align-items-center mb-2">
                          <div className="d-flex justify-content-start align-items-center me-2">
                            <ion-icon
                              name="location"
                              style={{
                                fontSize: "0.92rem",
                                color: "#0275d8",
                              }}
                            ></ion-icon>
                            <p
                              style={{ fontSize: "16px" }}
                              className="text-xs mb-0 ms-1 text-primary"
                            >
                              {property?.address?.address} -{" "}
                              {property?.address?.city}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex flex-wrap justify-content-start align-items-center mb-2">
                          <div className="d-flex justify-content-start align-items-center me-2">
                            <ion-icon
                              name="location"
                              style={{
                                fontSize: "0.92rem",
                                color: "#0275d8",
                              }}
                            ></ion-icon>
                            <p
                              style={{ fontSize: "16px" }}
                              className="text-xs mb-0 ms-1 text-primary"
                            >
                              {filterproperty?.address?.address} -{" "}
                              {filterproperty?.address?.city}
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <div className="features p-0 m-0">
                          {property?.features?.map((val, index) => {
                            return (
                              <span className="text-xs badge my-2">
                                <li style={{ listStyle: "none" }}>{val}</li>
                              </span>
                            );
                          })}
                        </div>
                      </td>
                      <td>
                        <div className="features p-0 m-0">
                          {filterproperty?.features?.map((val, index) => {
                            return (
                              <span className="text-xs badge my-2">
                                <li style={{ listStyle: "none" }}>{val}</li>
                              </span>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <div>
                          <p className="text text-secondary mb-0 fs-6 fw-bold">
                            NRP {property?.price}
                            <span
                              className="text text-secondary mb-0"
                              style={{ fontSize: "13px" }}
                            >
                              <span></span> 
                            </span>
                          </p>
                        </div>
                      </th>
                      <th>
                        <div>
                          <p className="text text-secondary mb-0 fs-6 fw-bold">
                            NRP {filterproperty?.price}
                            <span
                              className="text text-secondary mb-0"
                              style={{ fontSize: "13px" }}
                            >
                              <span></span> 
                            </span>
                          </p>
                        </div>
                      </th>
                    </tr>
                    {/* <tr>
                      <th>
                        <div className="circular-bar mx-auto">
                          {property.category.length}
                          <CircularProgressbar
                            value={60}
                            text={`${property.category.length >= 10 ? 'A++': property.category.length < 10 && property.category.length >=  8 ? "A" :property.category.length < 8 && property.category.length >=6 ?"B+" : property.category.length < 6 && property.category.length > 4 ? "B": "C" }`}
                            strokeWidth={4}
                            styles={buildStyles({
                              textColor: "#707070",
                              pathColor: "#4470ff",
                              trailColor: "#d1d1d1",
                            })}
                          />
                        </div>
                      </th>
                      <th>
                        <div className="circular-bar mx-auto">
                        {filterproperty?.category?.length}
                          <CircularProgressbar
                            value={60}
                            text={`${filterproperty.category.length >= 10 ? 'A++': filterproperty.category.length < 10 && filterproperty.category.length >=  8 ? "A" :filterproperty.category.length < 8 && filterproperty.category.length >=6 ?"B+" : filterproperty.category.length < 6 && filterproperty.category.length > 4 ? "B": "C" }`}
                            strokeWidth={4}
                            styles={buildStyles({
                              textColor: "#707070",
                              pathColor: "#4470ff",
                              trailColor: "#d1d1d1",
                            })}
                          />
                        </div>
                      </th>
                    </tr> */}
                  </tbody>
                </table>
              </div>
            )}
          </>
          {/* comapre table */}
          {compare?.length > 1 && (
            <div>
              <p className="h5 fw-bold mb-3">Comapre</p>
              {compare?.map((data) => {
                return (
                  <>
                    <span
                      className="me-2 text-light"
                      style={{
                        height: "50px",
                        borderRadius: "20px",
                        padding: "10px",
                        width: "30px",
                        position: "relative",
                        backgroundColor: "rgb(102, 153, 204)",
                      }}
                    >
                      {data?._id?.slice(0, 8)?.toUpperCase()}
                    </span>
                  </>
                );
              })}
            </div>
          )}
          <table class="table border table-bordered mt-3">
            <thead>
              <tr>
                {compare?.map((data) => {
                  return <th>{data?.title}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                {compare?.map((data) => {
                  return (
                    <td>
                      <div className="container">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="p-0 rounded mb-3">
                              <img
                                src={`http://localhost:5000/${data?.images[0]}`}
                                alt=""
                                width={100}
                                className="p-0"
                                style={{ width: "100%", height: "100%" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                {compare?.map((data) => {
                  return (
                    <td>
                      <p className="fw-bold">Features</p>
                      <div className="features p-0 m-0">
                        {data?.features?.map((val, index) => {
                          return (
                            <span className="text-xs badge my-2">
                              <li style={{ listStyle: "" }}>{val}</li>
                            </span>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                {compare?.map((data) => {
                  return (
                    <td>
                      <p className="fw-bold">Location</p>
                      <div className="d-flex flex-wrap justify-content-start align-items-center mb-2">
                        <div className="d-flex justify-content-start align-items-center me-2">
                          <ion-icon
                            name="location"
                            style={{
                              fontSize: "0.92rem",
                            }}
                          ></ion-icon>
                          <p
                            style={{ fontSize: "16px" }}
                            className="text-xs mb-0 ms-1 "
                          >
                            {data?.address?.address} - {data?.address?.city}
                          </p>
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
              <tr>
                {compare?.map((data) => {
                  return (
                    <td>
                      <p className="fw-bold">NRP {data?.price}</p>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <p>Loading Data...</p>
        </>
      )}
    </>
  );
};
export default Viewpropertydetails;
