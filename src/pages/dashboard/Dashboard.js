import React, { useContext } from "react";
import "./dashboard.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { UserContext } from "../../context/userContext";
import Sidebar from "./components/Sidebar";

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <Navbar></Navbar>
      <div className="container my-4">
        <div className="row mx-auto px-4">
          <div className="container col-md-10">
            <div className="col-md-12 mb-4 me-md-3">
              <div className="px-3 py-2 border border-2 border-muted rounded mb-4">
                <div className="d-flex flex-wrap justify-content-between align-items-center mx-md-2 mx-sm-1 mb-3">
                  <div className="">
                    <p
                      className="h3 fw-bold text-xl"
                      style={{ color: "#707070" }}
                    >
                      Welcome{" "}
                      <span className="text-primary">{user?.username}</span>!
                    </p>
                  </div>
                </div>
              </div>
              <div className="px-3 py-2 border border-2 border-muted rounded mb-4">
                <div className="d-flex flex-wrap justify-content-start align-items-center mx-md-3 mx-sm-1 py-3">
                  <img
                    src="/images/my-prop.png"
                    className="propertyImage text-center"
                    alt=""
                  />
                  <div className="ms-2">
                    <p className="text text-md fw-bold mb-0">
                      Visit Your Profile
                    </p>
                    <p className="text text-secondary text-s">
                      See your profile.
                    </p>
                    <Link
                      to={"/profile"}
                      className="btn btn-outline-primary px-4"
                    >
                      Visit Profile
                    </Link>
                  </div>
                </div>
              </div>
              <div className="px-3 py-2 border border-2 border-muted rounded mb-4">
                <div className="d-flex flex-wrap justify-content-start align-items-center mx-md-3 mx-sm-1 py-3">
                  <img
                    src="/images/my-prop.png"
                    className="propertyImage text-center"
                    alt=""
                  />
                  <div className="ms-2">
                    <p className="text text-md fw-bold mb-0">Your properties</p>
                    <p className="text text-secondary text-s">
                      See what have you listed so far or create a new listing.
                    </p>
                    <Link
                      to={"/my-listings"}
                      className="btn btn-outline-primary px-4"
                    >
                      View Listings
                    </Link>
                  </div>
                </div>
              </div>
              {/* Sixth Item Section */}
              <div className="px-3 py-2 border border-2 border-muted rounded mb-4">
                <div className="d-flex justify-content-start align-items-center mx-md-3 mx-sm-1 py-3">
                  <img
                    src="/images/my-prop.png"
                    className="propertyImage text-center"
                    alt=""
                  />
                  <div className="ms-2">
                    <p className="text text-md fw-bold mb-0">
                      Enhance your property business
                    </p>
                    <p className="text text-secondary text-s">
                      List your property in our website for free.
                    </p>
                    <Link
                      to={"/list-property/category"}
                      className="btn btn-outline-primary px-4"
                    >
                      List Property
                    </Link>
                  </div>
                </div>
              </div>
              <div className="px-3 py-2 border border-2 border-muted rounded mb-4">
                <div className="d-flex justify-content-start align-items-center mx-md-3 mx-sm-1 py-3">
                  <img
                    src="/images/my-prop.png"
                    className="propertyImage text-center"
                    alt=""
                  />
                  <div className="ms-2">
                    <p className="text text-md fw-bold mb-0">Property Buy</p>
                    <p className="text text-secondary text-s">
                      See your buying history here.
                    </p>
                    <Link
                      to={"/bookings"}
                      className="btn btn-outline-primary px-4"
                    >
                      View Property You Buy
                    </Link>
                  </div>
                </div>
              </div>
              {/* <div className="px-3 py-2 border border-2 border-muted rounded mb-4">
                <div className="d-flex justify-content-start align-items-center mx-md-3 mx-sm-1 py-3">
                  <img
                    src="/images/my-prop.png"
                    className="propertyImage text-center"
                    alt=""
                  />
                  <div className="ms-2">
                    <p className="text text-md fw-bold mb-0">
                      My Property Offer
                    </p>
                    <Link
                      to={"/booking"}
                      className="btn btn-outline-primary px-4"
                    >
                      View Offer
                    </Link>
                  </div>
                  <div className="ms-4">
                    <p className="text text-md fw-bold mb-0">
                      Other Property Offer
                    </p>
                    <Link
                      to={"/bookings/customer"}
                      className="btn btn-outline-primary px-4"
                    >
                      View Offer
                    </Link>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
