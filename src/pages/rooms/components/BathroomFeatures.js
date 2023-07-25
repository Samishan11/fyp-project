import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomContext } from "../../../context/roomContext";
import $ from "jquery"

const Bathroom = () => {

  const propertyId = useParams().propertyId

  const navigate = useNavigate()

  const [roomData, setRoomData] = useContext(RoomContext)
  const [shared, setShared] = useState(roomData?.bathroom?.shared)
  const [features, setFeatures] = useState(roomData?.bathroom?.features ? roomData?.bathroom?.features : [])

  const back = () => {
    roomData.bathroom = {features, shared}
    setRoomData(roomData)
    navigate(`/add-room/${propertyId}/room-details`);
  }
  const storeData = () => {
    roomData.bathroom = {features, shared}
    setRoomData(roomData)
    navigate(`/add-room/${propertyId}/amenities`);

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
          <div className="rounded-circle indicator d-flex align-items-center justify-content-center text-center">
            <small className="text-light text-xs">2</small>
          </div>
          <div className="divider my-auto mx-2"></div>
          <div className="rounded-circle indicator indicator-undone d-flex align-items-center justify-content-center text-center">
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
            <p className="text-md fw-bold">Bathroom</p>
            <div className="box border rounded px-3 py-4 mb-3">
              <form action="">
                {/* type of room form */}
                <div className="form-group mb-3 text-secondary">
                  <label htmlFor="" className="text-sm mb-1 fw-bold">
                    Bathroom type
                  </label>
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="privateRadioButton"
                        defaultChecked={shared === "Private" ? true : false}
                        value="Private"
                        onChange={(e) => { setShared(e.target.value) }}
                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="privateRadioButton"
                      >
                        Private
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="inlineRadioOptions"
                        id="sharedRadioButton"
                        defaultChecked={shared === "Shared" ? true : false}
                        value="Shared"
                        onChange={(e) => { setShared(e.target.value) }} />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="sharedRadioButton"
                      >
                        Shared
                      </label>
                    </div>
                  </div>
                </div>
                <hr />
                {/*  */}
                <div className="form-group mb-3">
                  <label htmlFor="" className="text-sm mb-1 fw-bold">
                    Bathroom features
                  </label>
                  {/* shower features */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Shower"
                        defaultChecked={features?.indexOf('Shower') === -1 ? false : true}
                        onChange={addItem.bind(this, "Shower", "Shower")}                        />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="ShowerCheckBoxButton"
                      >
                        Shower
                      </label>
                    </div>
                  </div>
                  {/* toilet features */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Toilet"
                        defaultChecked={features?.indexOf('Toilet') === -1 ? false : true}
                        onChange={addItem.bind(this, "Toilet", "Toilet")}                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="Toilet"
                      >
                        Toilet
                      </label>
                    </div>
                  </div>
                  {/* hair dryer features */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="HairDryer"
                        defaultChecked={features?.indexOf('Hair Dryer') === -1 ? false : true}
                        onChange={addItem.bind(this, "HairDryer", "Hair Dryer")}                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="HairDryer"
                      >
                        Hair Dryer
                      </label>
                    </div>
                  </div>
                  {/* bath tub features */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="BathTub"
                        defaultChecked={features?.indexOf('Bath Tub') === -1 ? false : true}
                        onChange={addItem.bind(this, "BathTub", "Bath Tub")}                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="BathTub"
                      >
                        Bath Tub
                      </label>
                    </div>
                  </div>
                  {/* free toiletries features */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="FreeToiletries"
                        defaultChecked={features?.indexOf('Free Toiletries') === -1 ? false : true}
                        onChange={addItem.bind(this, "FreeToiletries", "Free Toiletries")}                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="FreeToiletries"
                      >
                        Free Toiletries
                      </label>
                    </div>
                  </div>
                  {/* bathroom slippers features */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="BathroomSlippers"
                        defaultChecked={features?.indexOf('Bathroom Slippers') === -1 ? false : true}
                        onChange={addItem.bind(this, "BathroomSlippers", "Bathroom Slippers")}                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="BathroomSlippers"
                      >
                        Bathroom Slippers
                      </label>
                    </div>
                  </div>
                  {/* hand wash features */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="HandWash"
                        defaultChecked={features?.indexOf('Toilet HandWash') === -1 ? false : true}
                        onChange={addItem.bind(this, "HandWash", "Hand Wash")}                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="HandWash"
                      >
                        Hand Wash
                      </label>
                    </div>
                  </div>
                  {/* bathdrobe features */}
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="Bathdrobe"
                        defaultChecked={features?.indexOf('Bathdrobe') === -1 ? false : true}
                        onChange={addItem.bind(this, "Bathdrobe", "Bathdrobe")}                      />
                      <label
                        className="form-check-label text-sm"
                        htmlFor="Bathdrobe"
                      >
                        Bathdrobe
                      </label>
                    </div>
                  </div>
                  {/*  */}
                </div>
              </form>
            </div>
            {/* buttons back and continue */}
            <div className="d-flex my-2">
              <button onClick={back} className="btn btn-outline-primary rounded" type="button">
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

export default Bathroom;
