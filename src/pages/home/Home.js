import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import "./home.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { PropertyContext } from '../../context/propertyContext'
const Home = () => {
  const navigate = useNavigate();
  // const { property_value, loading_value } = React.useContext(PropertyContext);
  const [property, setProperty] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const [query, setQuery] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  const config = {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };

  // const searchResult = () => {
  //   navigate("/search-property/" + query);
  // };

  const getProperty = async () => {
    const properties = await axios.get("property");
    setProperty(properties.data.data);
    setIsloading(false);   
    // properties.data.data.filter(data=>{
    //   if(data._id !==){
    //     return data;
    //   }
    // })

  };

  const filter = property.filter((data) => {
    if (data.category === "land") {
      return data;
    }
  });
  const filter1 = property.filter((data) => {
    if (data.category === "apartment") {
      return data;
    }
  });
  const filter2 = property.filter((data) => {
    if (data.category === "building") {
      return data;
    }
  });

  useEffect(() => {
    axios.get("recommendations-properties").then(function (res) {
      console.log(res.data);
      setSuggestion(res.data.data);
      setIsloading(false);
    });
  }, []);

  useEffect(() => {
    getProperty();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container-fluid p-0 m-0">

        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="landing-section">
                <div className="img-sec">
                  <img
                    style={{
                      height: "50ch",
                      width: "100vw",
                      objectFit: "cover",
                      filter: "brightness(0.5)",
                    }}
                    src={`/images/realstate.jpg`}
                    alt=""
                    className="img-fluid"
                  />
                  <div className="info ms-5">
                    <p className="text-light my-0 py-0">
                      Find Your
                      <span className="text-primary"> Real</span>
                    </p>
                    <p className="text-light my-0 py-0">State Business</p>
                    <button className="btn btn-primary rounded btn-lg px-5 mt-2 d-block my-2 py-2">
                      <small className="text-md text-light">Explore</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="landing-section">
                <div className="img-sec">
                  <img
                    style={{
                      height: "50ch",
                      width: "100vw",
                      objectFit: "cover",
                      filter: "brightness(0.5)",
                    }}
                    src={`/images/homePageImage.jpg`}
                    alt=""
                    className="img-fluid"
                  />
                  <div className="info ms-5">
                    <p className="text-light my-0 py-0">
                      Find Your
                      <span className="text-primary"> Real</span>
                    </p>
                    <p className="text-light my-0 py-0">State Business</p>
                    <button className="btn btn-primary rounded btn-lg px-5 mt-2 d-block my-2 py-2">
                      <small className="text-md text-light">Explore</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="landing-section">
                <div className="img-sec">
                  <img
                    style={{
                      height: "50ch",
                      width: "100vw",
                      objectFit: "cover",
                      filter: "brightness(0.5)",
                    }}
                    src={`/images/categories/flat.jpg`}
                    alt=""
                    className="img-fluid"
                  />
                  <div className="info ms-5">
                    <p className="text-light my-0 py-0">
                      Find Your
                      <span className="text-primary"> Real</span>
                    </p>
                    <p className="text-light my-0 py-0">State Business</p>
                    <button className="btn btn-primary rounded btn-lg px-5 mt-2 d-block my-2 py-2">
                      <small className="text-md text-light">Explore</small>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="sr-only">Next</span>
          </a>
        </div>


        <div
          className="container col-md-9 my-3 mx-auto"
          style={{ position: "relative" }}
        >
          <p className="h5 mx-2" style={{ fontWeight: "600" }}>
            New Listings
          </p>
          <div
            className="row  property-slider"
            style={{ position: "relative" }}
          >
            {isloading ? (
              <>Loading...</>
            ) : (
              <>
                {property?.length !== 0 ? (
                  property?.map((val, ind) => {
                    return (
                      <div key={ind} className="col-md-3 p-0 my-3 px-2">
                        <div className="border property-box">
                          <div className="img-sec ">
                            <img
                              className=""
                              style={{
                                width: "100%",
                                height: "22ch",
                                objectFit: "cover",
                              }}
                              src={`http://localhost:5000/${val.images[0]}`}
                              alt=""
                            />
                          </div>
                          <div className=" property-description  px-2 m-0">
                            <div className="" style={{ height: "20ch" }}>
                              <div className="title">
                                <p
                                  style={{
                                    fontWeight: "600",
                                    fontSize: "1rem",
                                  }}
                                  className="m-0 p-0"
                                >
                                  {val.title}
                                </p>
                              </div>

                              <div className="d-flex p-0 m-0">
                                <i style={{ fontSize: "1rem" }} className="">
                                  {" "}
                                  <ion-icon
                                    style={{ color: "gray" }}
                                    name="location-outline"
                                  ></ion-icon>
                                </i>
                                <p
                                  className="text-xs"
                                  style={{ fontSize: ".9rem" }}
                                >
                                  {val?.address?.address}, {val?.address?.city}
                                </p>
                              </div>
                              <div className="features p-0 m-0">
                                <div
                                  style={{ fontSize: ".8rem" }}
                                  className="d-flex flex-wrap p-0">
                                  <span>
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Voluptatum labore
                                    impedit pariatur quas recusandae aut!
                                  </span>
                                </div>
                              </div>
                            </div>
                            <hr />
                            <div
                              style={{ fontSize: "1rem" }}
                              className="d-flex justify-content-between "
                            >
                              <p className="text-s">NRP {val.price}</p>
                              <Link
                                to={`/view-details/${val._id}`}
                                state={property}
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  border: "none",
                                }}
                                className="rounded-circle arrow-right bg-primary border-none"
                              >
                                <ion-icon
                                  style={{ color: "white" }}
                                  name="arrow-forward-outline"
                                ></ion-icon>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>Loading Date...</>
                )}
              </>
            )}
          </div>

        </div>
      </div>
      <div className="container col-md-9 mx-auto">
        <h6 className="fw-bold mx-2">Popular Category</h6>
        <div className="row mx-2">
          <div
            className="flex-column me-1 col-md-3 p-0 my-3 px-2 d-flex justify-content-center align-items-center"
            style={{ width: "32.95%", background: "#e8f2ff", height: "25vh" }}
          >
            <div
              className="circle bg-light d-flex justify-content-center align-items-center rounded-circle"
              style={{ height: "80px", width: "80px" }}
            >
              <i class="fa-solid h2 fa-landmark"></i>
            </div>
            <small className="fw-bold mt-2">Land</small>
            <small className="mt-2">{filter?.length}</small>
          </div>
          <div
            className="flex-column me-1 col-md-3  p-0 my-3 px-2 d-flex justify-content-center align-items-center"
            style={{ width: "32.95%", background: "#e8f2ff", height: "25vh" }}
          >
            <div
              className="circle bg-light d-flex justify-content-center align-items-center rounded-circle"
              style={{ height: "80px", width: "80px" }}
            >
              <i class="fa-solid h2 fa-building"></i>
            </div>
            <small className="fw-bold mt-2">Appartment</small>
            <small className="mt-2">{filter1?.length}</small>
          </div>
          <div
            className="flex-column me-1 col-md-3  p-0 my-3 px-2 d-flex justify-content-center align-items-center"
            style={{ width: "32.95%", background: "#e8f2ff", height: "25vh" }}
          >
            <div
              className="circle bg-light d-flex justify-content-center align-items-center rounded-circle"
              style={{ height: "80px", width: "80px" }}
            >
              <i class="fa-solid h2 fa-building"></i>
            </div>
            <small className="fw-bold mt-2">Building</small>
            <small className="mt-2">{filter2?.length}</small>
          </div>
        </div>
      </div>
      <div
        className="container col-md-9 my-3 mx-auto"
        style={{ position: "relative" }}
      >
        <p className="h5 m-0 px-2" style={{ fontWeight: "600" }}>
          Lands
        </p>
        <div
          className="d-flex property-slider"
          style={{ position: "relative" }}
        >
          {isloading ? (
            <>Loading...</>
          ) : (
            <>
              {filter?.length !== 0 ? (
                filter?.map((val, ind) => {
                  return (
                    <div key={ind} className="col-md-3 p-0 my-3 px-2">
                      <div className="border property-box">
                        <div className="img-sec ">
                          <img
                            className=""
                            style={{
                              width: "100%",
                              height: "22ch",
                              objectFit: "cover",
                            }}
                            src={`http://localhost:5000/${val.images[0]}`}
                            alt=""
                          />
                        </div>
                        <div className=" property-description  px-2 m-0">
                          <div className="" style={{ height: "20ch" }}>
                            <div className="title">
                              <p
                                style={{ fontWeight: "600", fontSize: "1rem" }}
                                className="m-0 p-0"
                              >
                                {val.title}
                              </p>
                            </div>

                            <div className="d-flex p-0 m-0">
                              <i style={{ fontSize: "1rem" }} className="">
                                {" "}
                                <ion-icon
                                  style={{ color: "gray" }}
                                  name="location-outline"
                                ></ion-icon>
                              </i>
                              <p
                                className="text-xs"
                                style={{ fontSize: ".9rem" }}
                              >
                                {val?.address?.address}, {val?.address?.city}
                              </p>
                            </div>
                            <div className="features p-0 m-0">
                              <div
                                style={{ fontSize: ".8rem" }}
                                className="d-flex flex-wrap p-0"
                              >

                                <span>
                                  Lorem ipsum dolor sit amet consectetur
                                  adipisicing elit. Voluptatum labore impedit
                                  pariatur quas recusandae aut!
                                </span>

                              </div>
                            </div>
                          </div>
                          <hr />
                          <div
                            style={{ fontSize: "1rem" }}
                            className="d-flex justify-content-between "
                          >
                            <p className="text-s">NRP {val.price}</p>
                            <Link
                              to={`/view-details/${val._id}`}
                              style={{
                                width: "25px",
                                height: "25px",
                                border: "none",
                              }}
                              className="rounded-circle arrow-right bg-primary border-none"
                            >
                              <ion-icon
                                style={{ color: "white" }}
                                name="arrow-forward-outline"
                              ></ion-icon>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <>Loading Date...</>
              )}
            </>
          )}
        </div>
        <div
          className="rounded-circle d-flex justify-content-center align-items-center border shadow bg-light"
          style={{
            position: "absolute",
            top: "25ch",
            zIndex: "1",
            height: "5ch",
            width: "5ch",
            right: "0",
          }}
        >
          {" "}
          <span>
            <i className="fa-solid fa-angle-right"></i>
          </span>{" "}
        </div>
      </div>
    </>
  );
};

export default Home;
