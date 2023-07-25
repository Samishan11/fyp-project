import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Bathroom from "./components/BathroomFeatures";
import RoomAmenities from "./components/RoomAmenities";
import RoomDetails from "./components/RoomDetails";
import RoomTitle from "./components/RoomTitle";

const RoomProperty = () => {
  const section = useParams().section
  useEffect(() => { });
  return (
    <>
      <Navbar />
      {section === "bathroom-features" ? (
        <>
          <Bathroom></Bathroom>
        </>
      ) : section === "amenities" ? (
        <>
          <RoomAmenities></RoomAmenities>
        </>
      ) : section === "room-details" ? (
        <>
          <RoomDetails></RoomDetails>
        </>
      ) : section === "room-title" ? (
        <>
          <RoomTitle></RoomTitle>
        </>) :
        <></>

      }
    </>
  );
};

export default RoomProperty;
