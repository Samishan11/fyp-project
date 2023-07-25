import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RoomContext } from "../../../context/roomContext";

const RoomDetails = () => {

    const navigate = useNavigate()
    const propertyId = useParams().propertyId

    const [roomDetails, setRoomDetails] = useContext(RoomContext)

    const [roomType, setRoomType] = useState(roomDetails?.room_type? roomDetails.room_type: "1")
    const [roomCount, setRoomCount] = useState(roomDetails?.room_count? roomDetails.room_count: 0)
    const [floor, setFloor] = useState(roomDetails?.floor? roomDetails.floor: "Ground Floor")
    const [roomSize, setRoomSize] = useState(roomDetails?.room_size? roomDetails.room_size: 0)
    const [singleBed , setSingleBed] = useState(roomDetails?.single_bed? roomDetails.single_bed: 0)
    const [doubleBed , setDoubleBed] = useState(roomDetails?.double_bed? roomDetails.single_bed: 0)
    const [kingsBed , setKingsBed] = useState(roomDetails?.kings_bed? roomDetails.kings_bed: 0)
    const [queensBed , setQueensBed] = useState(roomDetails?.queens_bed? roomDetails.queens_bed: 0)

    const storeData = ()=>{
        roomDetails.room_type = roomType
        roomDetails.room_count = roomCount
        roomDetails.floor = floor
        roomDetails.room_size = roomSize
        roomDetails.single_bed= singleBed
        roomDetails.double_bed= doubleBed
        roomDetails.kings_bed= kingsBed
        roomDetails.queens_bed= queensBed
        setRoomDetails(roomDetails)
        console.log(roomDetails)
        navigate(`/add-room/${propertyId}/bathroom-features`)
    }

    const increase = (field) =>{
        if(field === "single"){
            if(singleBed>=0 && singleBed<4){
                setSingleBed(singleBed+1)
            }
        }
        if(field === "double"){
            if(doubleBed>=0 && doubleBed<4){
                setDoubleBed(doubleBed+1)
            }
        }
        if(field === "kings"){
            if(kingsBed>=0 && kingsBed<4){
                setKingsBed(kingsBed+1)
            }
        }
        if(field === "queens"){
            if(queensBed>=0 && queensBed<4){
                setQueensBed(queensBed+1)
            }
        }
    }

    const decrease = (field) =>{
        if(field === "single"){
            if(singleBed>0 && singleBed<=4){
                setSingleBed(singleBed-1)
            }
        }
        if(field === "double"){
            if(doubleBed>0 && doubleBed<=4){
                setDoubleBed(doubleBed-1)
            }
        }
        if(field === "kings"){
            if(kingsBed>0 && kingsBed<=4){
                setKingsBed(kingsBed-1)
            }
        }
        if(field === "queens"){
            if(queensBed>0 && queensBed<=4){
                setQueensBed(queensBed-1)
            }
        }
    }

  return (
    <>
      <div className="container mx-auto my-4 col-md-12 col-xl-9 mx-auto">
        <div className="d-flex step-map">
          <div className="rounded-circle indicator d-flex align-items-center justify-content-center text-center">
            <small className="text-light text-xs">1</small>
          </div>
          <div className="divider my-auto mx-2"></div>
          <div className="rounded-circle indicator indicator-undone d-flex align-items-center justify-content-center text-center">
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
            <div className="box border rounded px-3 py-4">
              <form action="">
                <p className="text-md fw-bold">Add New Room</p>
                {/* type of room form */}
                <div className="form-group mb-3">
                  <label htmlFor="" className="text-sm">
                    Type of the room
                  </label>
                  <select
                    className="form-select form-control"
                    aria-label="Default select example" onChange={(e)=>{setRoomType(e.target.value)}} value={roomType}
                  >
                    <option selected="Single Sitter" value="1">
                      Room For One
                    </option>
                    <option value="2">Room For Two</option>
                    <option value="3">Room For Three</option>
                    <option value="4">Room For Four</option>
                    <option value="5">Room For Five</option>
                  </select>
                </div>
                {/* floor of rooms form */}
                <div className="form-group mb-3">
                  <label htmlFor="" className="text-sm">
                    Rooms Floor
                  </label>
                  <select
                    className="form-select form-control"
                    aria-label="Default select example" onChange={(e)=>{setFloor(e.target.value)}} value={floor}
                  >
                    <option selected="Ground Floor" value="Ground Floor">
                      Ground Floor
                    </option>
                    <option value="Second floor">Second floor</option>
                    <option value="Third Floor">Third Floor</option>
                    <option value="Fourth Floor">Fourth Floor</option>
                    <option value="Top Floor">Top Floor</option>
                  </select>
                </div>
                {/* sleeping form */}
                <div className="mb-4">
                  <p className="text text-secondary mb-1 fw-bold text-sm">Sleeping</p>
                  <div className="border rounded p-3">
                    {/* single bed form */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex justify-content-start align-items-center text-secondary">
                        <ion-icon name="bed"></ion-icon>
                        <span className="ms-2 my-auto">Single Bed</span>
                      </div>
                      <div
                        className="btn-group border"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button type="button" onClick={decrease.bind(this, 'single')} className="btn increment py-0">
                          -
                        </button>
                        <span id="single-room" className="my-auto px-1 py-0">{singleBed}</span>
                        <button onClick={increase.bind(this,'single')} type="button" className="btn increment py-0">
                          +
                        </button>
                      </div>
                    </div>
                    {/* double bed form */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex justify-content-start align-items-center text-secondary">
                        <ion-icon name="bed"></ion-icon>
                        <span className="ms-2 my-auto">Double Bed</span>
                      </div>
                      <div
                        className="btn-group border"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button onClick={decrease.bind(this, 'double')} type="button" className="btn increment py-0">
                          -
                        </button>
                        <span className="my-auto px-1 py-0">{doubleBed}</span>
                        <button onClick={increase.bind(this, 'double')} type="button" className="btn increment py-0">
                          +
                        </button>
                      </div>
                    </div>
                    {/* kings bed form */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex justify-content-start align-items-center text-secondary">
                        <ion-icon name="bed"></ion-icon>{" "}
                        <span className="ms-2 my-auto">Kings Bed</span>
                      </div>
                      <div
                        className="btn-group border"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button onClick={decrease.bind(this, 'kings')} type="button" className="btn increment py-0">
                          -
                        </button>
                        <span className="my-auto px-1 py-0">{kingsBed}</span>
                        <button onClick={increase.bind(this, 'kings')} type="button" className="btn increment py-0">
                          +
                        </button>
                      </div>
                    </div>
                    {/* queens bed form */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div className="d-flex justify-content-start align-items-center text-secondary">
                        <ion-icon name="bed"></ion-icon>{" "}
                        <span className="ms-2 my-auto">Queens Bed</span>
                      </div>
                      <div
                        className="btn-group border"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button onClick={decrease.bind(this, 'queens')} type="button" className="btn increment py-0">
                          -
                        </button>
                        <span className="my-auto px-1 py-0">{queensBed}</span>
                        <button onClick={increase.bind(this, 'queens')} type="button" className="btn increment py-0">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* room size section */}
                <div className="bg-light px-3 py-2 mb-3">
                  <p className="text text-secondary fw-bold mb-1 text-sm">Room Size</p>
                  <div className="d-flex justify-content-start align-items-center mb-4 px-0">
                    <input
                      type="text"
                      className="form-control w-75 me-2 py-2" onChange={(e)=>{setRoomSize(e.target.value)}} value={roomSize}
                    />
                    <p className="border text-dark px-4 py-2 mb-0">
                      sq.ft
                    </p>
                  </div>
                </div>
                {/* buttons back and continue */}
                <div className="d-flex my-2">
                  <button
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
              </form>
            </div>
          </div>
          {/* <div className="col-md-6">hello</div> */}
        </div>
      </div>
    </>
  );
};

export default RoomDetails;
