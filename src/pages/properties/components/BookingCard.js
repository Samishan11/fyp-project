import React, { useContext, useEffect, useState } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import $ from "jquery";
import DatePicker from "sassy-datepicker";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../../context/userContext";
import { useNavigate, useParams } from "react-router-dom";

const BookingCard = (props) => {
  const [user] = useContext(UserContext);
  const [property, setProperty] = useState(props.property);
  const propertyId = useParams().propertyId;
  const [adult, setAdult] = useState(0);
  const [child, setChild] = useState(0);
  const [startDate, setStartDate] = useState(new Date(Date.now()));
  const [endDate, setEndDate] = useState(new Date());
  const [roomType, setRoomType] = useState("1");
  const [days, setDays] = useState(0);
  const [offerprice, setOfferPrice] = useState();

  function booking() {
    axios
      .post("/booking", {
        property: propertyId,
        people: {
          adult,
          child,
        },
        room_type: roomType,
        booking_at: startDate,
        booking_till: endDate,
        payment: true,
        vendor: props?.property?.owner._id,
        user: user._id,
        price: props.property.price,
      })
      .then((res) => {
        if (res.data.booked) {
          toast.warning(res.data.message, {
            position: toast.POSITION_TOP_RIGHT,
          });
          document.getElementById("checkout-form").reset();
        } else {
          toast.success("Property has been offered.", {
            position: toast.POSITION_TOP_RIGHT,
          });
          document.getElementById("checkout-form").reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

   const myKey = {
    publicTestKey: "test_public_key_881f535efbb040ee885f85e52aff77aa",
    secretKey: "test_secret_key_0d850f6c660b4390a445b1e46c7d2da6",
  };

  let config = {
    publicKey: myKey.publicTestKey,
    productIdentity: propertyId,
    productName: property?.title,
    productUrl: "http://localhost:3000/view-details/" + propertyId,
    eventHandler: {
      onSuccess(payload) {
        console.log(payload);
        //  booking property
        axios
          .post("/booking", {
            property: propertyId,
            people: {
              adult,
              child,
            },
            room_type: roomType,
            booking_at: startDate,
            booking_till: endDate,
            payment: true,
            vendor: props.property.owner._id,
            user: user._id,
            offer_price: offerprice,
          })
          .then((res) => {
            if (res.data.booked) {
              toast.warning(res.data.message, {
                position: toast.POSITION_TOP_RIGHT,
              });
              document.getElementById("checkout-form").reset();
            } else {
              toast.success("Property has been booked", {
                position: toast.POSITION_TOP_RIGHT,
              });
              document.getElementById("checkout-form").reset();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
      onError(error) {
        console.log(error);
      },
      onClose() {
        console.log("widget is closing");
      },
    },
    paymentPreference: [
      "KHALTI",
      "EBANKING",
      "MOBILE_BANKING",
      "CONNECT_IPS",
      "SCT",
    ],
  };
  const cancelBooking = async () => {
    const res = await axios.delete(
      `/booking-cancel/${user?._id}/${property?._id}`
    );
    if (res.data.deleted) {
      toast.success(res.data.message, { position: toast.POSITION_TOP_RIGHT });
    } else {
      toast.warning(res.data.message, { position: toast.POSITION_TOP_RIGHT });
    }
  };

  const reportProperty = async () => {
    toast.success("Report has been submitted", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const showCalendar = (start) => {
    if (start) {
      $("#endDateB").css("display", "none");
      $("#startDateB").css("display", "block");
    } else {
      $("#startDateB").css("display", "none");
      $("#endDateB").css("display", "block");
    }
  };

  const changeStartDate = (date) => {
    setStartDate(date);
    $("#startDateB").css("display", "none");
  };

  const changeEndDate = (date) => {
    setEndDate(date);

    $("#endDateB").css("display", "none");
  };

  return (
    <>
      <div
        className="p-1"
        style={{ background: "#F9F9F9", position: "sticky", top: "0" }}
      >
        <div className="mx-2">
          <p className="text text-secondary mb-0 fs-6 fw-bold">
            NPR {property.price}
          </p>
          <hr className="my-2" />
          <form id="checkout-form">
            {!property?.category === "land" ||
              (!property.category === "building" && (
                <>
                  {property.category === "hotel" ||
                  property.category === "hostel" ? (
                    <>
                      <div className="my-2" style={{ position: "relative" }}>
                        <small className="text-sm">Check In</small>
                        <div className="input-group bg-light border py-2">
                          <span className="d-block my-auto">
                            <i className="fa-solid fa-calendar mx-2"></i>
                          </span>
                          <input
                            className="form-control p-0 text-sm"
                            value={startDate.toDateString()}
                            style={{ border: "none" }}
                            type="text"
                            onFocus={() => showCalendar(true)}
                          />
                        </div>
                        <DatePicker
                          id="startDateB"
                          selected={startDate}
                          onChange={(date) => changeStartDate(date)}
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            display: "none",
                          }}
                        />
                      </div>

                      <div className="my-2" style={{ position: "relative" }}>
                        <small className="text-sm">Check Out</small>
                        <div className="input-group bg-light border py-2">
                          <span className="d-block my-auto">
                            <i className="fa-solid fa-calendar mx-2"></i>
                          </span>
                          <input
                            className="form-control p-0 text-sm"
                            value={endDate.toDateString()}
                            style={{ border: "none" }}
                            type="text"
                            onFocus={() => showCalendar(false)}
                          />
                        </div>
                        <DatePicker
                          id="endDateB"
                          selected={endDate}
                          onChange={(date) => changeEndDate(date)}
                          style={{
                            position: "absolute",
                            zIndex: "1",
                            display: "none",
                          }}
                        />
                      </div>
                      <div className="my-3">
                        <p className="text text-secondary mb-0 text-sm fw-bold">
                          <span className="fw-normal">08 Nights</span>
                        </p>
                      </div>
                      <hr className="my-2" />
                    </>
                  ) : (
                    <></>
                  )}
                  <div className="">
                    <p className="text text-secondary h6 text-sm fw-bold mb-1">
                      People
                    </p>
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <div className="w-50 me-2">
                        <label
                          htmlFor="adults"
                          className="h6 text-secondary text-sm"
                        >
                          Adults
                        </label>
                        <div className="d-flex justify-content-start align-items-center border bg-white">
                          <i className="text-secondary text-sm mx-2">
                            <ion-icon name="person"></ion-icon>
                          </i>
                          <input
                            onChange={(e) => setAdult(e.target.value)}
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
                        <label
                          htmlFor="child"
                          className="h6 text-secondary text-sm"
                        >
                          Child
                        </label>
                        <div className="d-flex justify-content-start align-items-center border bg-white">
                          <i className="text-secondary fs-6 mx-2">
                            <ion-icon name="accessibility"></ion-icon>
                          </i>
                          <input
                            onChange={(e) => setChild(e.target.value)}
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
                      Total Guest:{" "}
                      <span className="fw-normal">
                        {parseInt(child) + parseInt(adult)}
                      </span>
                    </p>
                  </div>
                  <hr className="my-2" />

                  {property.category === "hostel" ? (
                    <>
                      <div className="form-group mb-3">
                        <label htmlFor="" className="text-sm">
                          Prefered Room Type
                        </label>
                        <select
                          className="form-select form-control"
                          aria-label="Default select example"
                          onChange={(e) => {
                            setRoomType(e.target.value);
                          }}
                          value={roomType}
                        >
                          <option selected="Single Sitter" value="1">
                            Single Sitter
                          </option>
                          <option value="2">Two Sitter</option>
                          <option value="3">Three Sitter</option>
                          <option value="4">A group of Four</option>
                          <option value="5">A group of Five</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </>
              ))}

            <button
              onClick={() =>
                new KhaltiCheckout(config).show({
                  amount: 1000,
                  mobile: 9866701165,
                })
              }
              type="button"
              className="btn btn-primary d-block w-100"
            >
              Buy Property
            </button>
          </form>
          <hr />
          <div className="d-flex justify-content-start align-items-center">
            <div className=" my-0 py-0 ms-2">
              <button
                onClick={cancelBooking}
                type="button"
                className="my-0 btn fw-bold text-secondary"
              >
                <i className="fa-solid fa-thumbs-up fs-4 me-1"></i>Free
                Cancellation <br />
              </button>
              <small className="text-xs d-block mx-3">Within 24 Hours</small>
            </div>
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <div
              className="modal fade property-modal"
              data-backdrop="false"
              id="reportPropertyModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <p className="m-0">
                      <span>
                        <i className="fa-solid fa-info-circle me-1"></i>
                      </span>
                      Report
                    </p>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div>
                      <div
                        className="py-2 px-2 d-flex"
                        style={{
                          background: "#f1f1f1",
                          borderLeft: "3px solid #707070",
                        }}
                      >
                        <div>
                          <img
                            className="rounded"
                            src={`http://localhost:5000/${property?.images[0]}`}
                            style={{
                              height: "6ch",
                              width: "6ch",
                              objectFit: "cover",
                            }}
                            alt=""
                          />
                        </div>
                        <div className="mx-2">
                          <small className="text-xs fw-bold">
                            {property?.title}
                          </small>
                          <small className="text-xs d-block">
                            NPR {property?.price}
                          </small>
                          <small className="text-xs d-block">
                            {property?.payment_type}
                          </small>
                        </div>
                      </div>
                      <div className="my-2">
                        <label htmlFor="" className="text-sm">
                          Subject
                        </label>
                        <input className="form-control text-sm" type="text" />
                      </div>
                      <div className="my-2">
                        <label htmlFor="" className="text-sm">
                          Description
                        </label>
                        <textarea
                          className="form-control text-sm"
                          name=""
                          id=""
                          cols="30"
                          rows="6"
                        ></textarea>
                        <small className="text-xs">
                          Be specific with your reason to report this content.
                        </small>
                      </div>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      onClick={reportProperty}
                      type="button"
                      className="btn btn-sm btn-info text-light"
                    >
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingCard;
