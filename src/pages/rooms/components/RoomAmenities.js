import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomContext } from "../../../context/roomContext";
import $ from 'jquery'

const RoomAmenities = () => {
  const navigate = useNavigate();
  const propertyId = useParams().propertyId

  const [roomData, setRoomData] = useContext(RoomContext);
  const [features, setFeatures] = useState(roomData?.features ? roomData.features : [])

  const storeData = () => {
    roomData.features = features
    setRoomData(roomData)
    navigate(`/add-room/${propertyId}/room-title`)
  }

  const back = () => {
    roomData.features = features
    setRoomData(roomData)
    navigate(`/add-room/${propertyId}/bathroom-features`)
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
      <div className="container mx-auto my-4 col-md-12 col-xl-9 mx-auto">
        <div className="d-flex step-map">
          <div className="rounded-circle indicator indicator-done d-flex align-items-center justify-content-center text-center">
            <small className="text-light text-xs">
              <ion-icon
                name="checkmark-outline"
                style={{ color: "#fff", fontSize: "1.2em" }}
              ></ion-icon>
            </small>
          </div>
          <div className="divider my-auto mx-2"></div>
          <div className="rounded-circle indicator indicator-done d-flex align-items-center justify-content-center text-center">
            <small className="text-light text-xs">
              <ion-icon
                name="checkmark-outline"
                style={{ color: "#fff", fontSize: "1.2em" }}
              ></ion-icon>
            </small>
          </div>
          <div className="divider my-auto mx-2"></div>
          <div className="rounded-circle indicator d-flex align-items-center justify-content-center text-center">
            <small className="text-light text-xs">3</small>
          </div>
          <div className="divider my-auto mx-2"></div>
          <div className="rounded-circle indicator indicator-undone d-flex align-items-center justify-content-center text-center">
            <small className="text-light text-xs">4</small>
          </div>
        </div>
        {/* main section */}
        <div className="row my-4">
          <div className="col-md-5">
            <p className="text-md fw-bold">Room Amenities</p>
            <div className="box border rounded px-3 py-4 mb-3">
              <form action="">
                {/* type of room form */}
                <div className="form-group mb-3 text-secondary">
                  <label htmlFor="" className="text-sm mb-1 fw-bold">
                    General Amenities
                  </label>
                  {/* General Amenities */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tv"
                        defaultChecked={features?.indexOf('TV') === -1 ? false : true}
                        onChange={addItem.bind(this, "tv", "TV")}
                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="tv"
                      >
                        Flat Screen TV
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="ac"
                        defaultChecked={features?.indexOf('AC') === -1 ? false : true}
                        onChange={addItem.bind(this, "ac", "AC")}
                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="ac"
                      >
                        AC
                      </label>
                    </div>
                  </div>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="wifi"
                        defaultChecked={features?.indexOf('Wifi') === -1 ? false : true}
                        onChange={addItem.bind(this, "wifi", "Wifi")}
                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="wifi"
                      >
                        Wifi
                      </label>
                    </div>
                  </div>
                </div>
                <hr />
                {/*  */}
                <div className="form-group mb-3">
                  <label htmlFor="" className="text-sm mb-1 fw-bold">
                    Usable Items
                  </label>
                  {/* water heater items */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="waterheater"
                        defaultChecked={features?.indexOf('Water Heater') === -1 ? false : true}
                        onChange={addItem.bind(this, "waterheater", "Water Heater")}                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="waterheater"
                      >
                        Water Heater
                      </label>
                    </div>
                  </div>
                  {/* tea/coffee maker items */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="tea"
                        defaultChecked={features?.indexOf('Tea/Coffee') === -1 ? false : true}
                        onChange={addItem.bind(this, "tea", "Tea/Coffee")}
                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="tea"
                      >
                        Tea/Coffee maker
                      </label>
                    </div>
                  </div>
                  {/* refrigerator */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="refrigerator"
                        defaultChecked={features?.indexOf('Refrigerator') === -1 ? false : true}
                        onChange={addItem.bind(this, "refrigerator", "Refrigerator")}
                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="refrigerator"
                      >
                        Refrigerator
                      </label>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </form>
            </div>
            {/* buttons back and continue */}
            <div className="d-flex my-2">
              <button
                onClick={back}
                className="btn btn-outline-primary rounded"
                type="button"
              >
                Back
              </button>
              <button
                onClick={storeData}
                className="btn btn-primary d-block rounded ms-2"
                type="button"
              >
                Continue
              </button>
            </div>
          </div>
          {/* <div className="col-md-6">hello</div> */}
        </div>
      </div>
    </>
  );
};

export default RoomAmenities;
