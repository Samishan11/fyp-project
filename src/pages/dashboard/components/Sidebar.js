import React, { useEffect } from "react";
import { Link } from "react-router-dom";
const Sidebar = (props) => {
  useEffect(() => {
    // document.querySelector(".tab-btn")?.classList?.remove('active')
    document.querySelector(`#${props.tab}`)?.classList?.add("active");
  }, [props.tab]);
  return (
    <div
      className="col-md-4 m-0 p-0 position-absolute"
      style={{
        width: "15em",
        height: "122ch",
        backgroundColor: "#4E5180",
        left: 0,
        top: "80px",
      }}
    >
      <div
        className="nav_link  text-align"
        style={{ position: "sticky", overflow: "hidden", height: "100vh" }}>
        <div className="links mx-auto active_link py-1">
          <Link to={"/"} className="mx-auto" style={{ textDecoration: "none" }}>
            <div className="logo d-flex">
              <div className="title fs-5 mt-3">
                <p className="fw-bold">
                  Dash<span className="text-primary">Board</span>
                </p>
              </div>
            </div>
          </Link>
        </div>
        <div className="links mx-auto active_link  my-3 py-1">
          <Link
            id="profile"
            to="/profile"
            className="text-light"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            Profile
          </Link>
        </div>
        <div className="links mx-auto active_link  my-3 py-1">
          <Link
            id="my-listing"
            to="/my-listings"
            className="text-light"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            My Property
          </Link>
        </div>
        <div className="links mx-auto active_link  my-3 py-1">
          <Link
            id="list-property"
            to="/list-property/category"
            className="text-light"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            List Property
          </Link>
        </div>
        <div className="links mx-auto active_link  my-3 py-1">
          <Link
            id="booking"
            to="/booking"
            className="text-light"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            Offer My Property
          </Link>
        </div>
        <div className="links mx-auto active_link  my-3 py-1">
          <Link
            id="customer"
            to="/bookings/customer"
            className="text-light"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            Offer Other Property
          </Link>
        </div>
        <div className="links mx-auto active_link  my-3 py-1">
          <Link
            id="buy"
            to="/bookings"
            className="text-light"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            Property Buy
          </Link>
        </div>
        <div className="links mx-auto active_link  my-3 py-1">
          <Link
            onClick={() => localStorage.removeItem("token")}
            to="/login"
            className="text-light"
            style={{ cursor: "pointer", textDecoration: "none" }}
          >
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
