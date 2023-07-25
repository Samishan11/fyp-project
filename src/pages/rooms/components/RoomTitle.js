import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomContext } from "../../../context/roomContext";



const RoomTitle = () => {
  const navigate = useNavigate();
  const propertyId = useParams().propertyId

  const [roomData, setRoomData] = useContext(RoomContext)
  const [title, setTitle] = useState(roomData?.title)
  const [price, setPrice] = useState(roomData?.price)

  const back = ()=>{
    roomData.title = title
    roomData.price = price
    setRoomData(roomData)
    navigate(`/add-room/${propertyId}/amenities`)
  }

  const storeData = () => {
    roomData.title = title
    roomData.price = price
    setRoomData(roomData)
    if(roomData._id){
      navigate(`/list-property-summary/${propertyId}/property-summary`)
    }else{
      axios.post(`/add-room/${propertyId}`, roomData).then(function(res){
        console.log(res.data.result)
        roomData._id = res.data.result._id
        setRoomData(roomData)
        navigate(`/list-property-summary/${propertyId}/property-summary`)
      })
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
            <small className="text-light text-xs">4</small>
          </div>
        </div>
        {/* main section */}
        <div className="row my-4">
          <div className="col-md-5">
            <div className="box border rounded px-3 py-4">
              <form action="">
                <p className="text-md fw-bold">Set a title for this room</p>
                {/* type of room form */}
                <div className="form-group mb-3">
                  <label htmlFor="" className="text-sm">
                    Room Title
                  </label>
                  <input onChange={(e)=>{setTitle(e.target.value)}} type="text" className="form-control" defaultValue={title} />
          
                </div>
                <hr />
                <p className="m-0 text-md fw-bold">Pricing</p>
                <div className="form-group mb-3">
                  <label htmlFor="" className="text-sm">
                    Price for this Room
                  </label>
                  <input onChange={(e)=>{setPrice(e.target.value)}} type="number" className="form-control" defaultValue={price} />
                </div>
              </form>
            </div>
            {/* buttons back and continue */}
            <div className="d-flex my-2">
              <button
              onClick={back}
               className="btn btn-outline-primary rounded" type="button">
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

export default RoomTitle;
