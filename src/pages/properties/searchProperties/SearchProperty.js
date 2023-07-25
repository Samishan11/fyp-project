import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import $ from "jquery"

const SearchProperty = (props) => {
  const { query } = useParams();

  const [results, setResults] = useState();
  const [category, setCategory] = useState()
  const [minPrice, setMinPrice] = useState()
  const [maxPrice, setMaxPrice] = useState()
  const [rating, setRating] = useState()
  const [search, setSearch] = useState(query)

  const fetchData = async () => {
    const res = await axios.get("/search/" + query);
    console.log("this is fetch data ")
    return res;
  };

  const getData = async () => {
    const res = await fetchData();
    console.log(res.data);
    if (res.data.success) {
      setResults(res.data);
    } else {
      setResults(false)
    }
  };

  const navigate = useNavigate()

  const searchResult = () => {
    navigate("/search-property/" + search);
  };


  const property_types = [
    {
      "id": 1,
      "name": "hostel",
      "title": "Hostel"
    },
    {
      "id": 2,
      "name": "room",
      "title": "Room"
    },
    {
      "id": 3,
      "name": "hotel",
      "title": "Hotel"
    },
    {
      "id": 4,
      "name": "apartment",
      "title": "Apartment"
    }
  ]


  useEffect(() => {
    getData();
  }, []);

  const applyFilter = async () => {
    var options = { category: category }
    if (minPrice && maxPrice) {
      options.price = { minPrice, maxPrice }
    }
    if (rating) {
      options.rating = rating
    }
    const res = await axios.post("/filter/" + query, options)
    setResults(res.data)
    $("html, body").animate({ scrollTop: 0 }, "fast");
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container col-md-10">
        <section id="searchResultSection" className="my-4">
          <div>
            <p className="text text-secondary text-md text-start ms-3">
              {/* Search Results for "<span className="text-danger">Hostel</span>" */}
              Showing results for <b>{query}</b>
            </p>
          </div>
          <hr />
          <div className="container col-md-12 col-12">
            <div className="row">
              <div className="col-md-3 mb-3">
                <div className="p-1">
                  <div
                    className="border py-2 pb-4 px-3 rounded mb-3 border-muted"
                    style={{ background: "#fcfcfc" }}
                  >
                    <p className="text-md fw-bold">Search</p>
                    <hr />
                    <form>
                      <div className="mb-2 text-s">
                        <label htmlFor="destination" className="mb-1 text-sm">
                          Location
                        </label>
                        <div className="d-flex justify-content-start align-items-center border bg-white px-2">
                          <ion-icon name="search"></ion-icon>
                          <input
                            type="text"
                            className="form-control text-sm"
                            id="adults"
                            defaultValue={query}
                            style={{
                              outline: "none",
                              border: "0px solid white",
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="mb-2 w-100 text-s">
                        <button onClick={searchResult} className="btn btn-primary px-4 w-100">
                          Search
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="border rounded border-1 border-muted">



                    <div className="pt-2 px-3 mb-0">
                      <p className="text text-secondary text-s w700 mb-0">
                        Filter By:
                      </p>
                    </div>
                    <hr className="my-2 bg-secondary" />
                    <div className="form-group row px-2 my-4">
                      <small>Price Range</small>
                      <div className="col">
                        <label className="text-xs" htmlFor="">From</label>
                        <input onChange={(e) => setMinPrice(e.target.value)} className="form-control form-control-sm" type="number" />
                      </div>
                      <div className="col">
                        <label className="text-xs" htmlFor="">To</label>
                        <input onChange={(e) => setMaxPrice(e.target.value)} className="form-control form-control-sm" type="number" />
                      </div>
                    </div>



                    <hr className="my-2 bg-dark" />
                    <div className="py-2 px-3">
                      <p className="text text-secondary text-s fw-bold mb-2">
                        Rating Score:
                      </p>
                      <div className="">
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name='rating'
                              defaultValue={0}
                              id="rating0to1"
                              onChange={() => setRating(0)}
                            />
                            <label
                              className="form-check-label text-sm"
                              htmlFor="rating0to1"
                            >
                              0 to 1
                            </label>
                          </div>
                          {/* <p className="text text-xs mb-0">60</p> */}
                        </div>
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rating"
                              defaultValue={1}
                              id="rating1to2"
                              onChange={() => setRating(1)}
                            />
                            <label
                              className="form-check-label text-sm"
                              htmlFor="rating1to2"
                            >
                              Between 1-2
                            </label>
                          </div>
                          {/* <p className="text text-xs mb-0">60</p> */}
                        </div>
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rating"
                              defaultValue={2}
                              id="rating2to3"
                              onChange={() => setRating(2)}
                            />
                            <label
                              className="form-check-label text-sm"
                              htmlFor="rating2to3"
                            >
                              Between 2-3
                            </label>
                          </div>
                          {/* <p className="text text-xs mb-0">60</p> */}
                        </div>
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rating"
                              defaultValue={3}
                              id="rating3to4"
                              onChange={() => setRating(3)}
                            />
                            <label
                              className="form-check-label text-sm"
                              htmlFor="rating3to4"
                            >
                              Between 3-4
                            </label>
                          </div>
                          {/* <p className="text text-xs mb-0">60</p> */}
                        </div>
                        <div className="mb-2 d-flex justify-content-between align-items-center">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="rating"
                              defaultValue={4}
                              id="rating4to5"
                              onChange={() => setRating(4)}
                            />
                            <label
                              className="form-check-label text-sm"
                              htmlFor="rating4to5"
                            >
                              Between 4-5
                            </label>
                          </div>
                          {/* <p className="text text-xs mb-0">60</p> */}
                        </div>
                      </div>
                    </div>
                    <hr className="my-2 bg-dark" />
                    <div className="py-2 px-3">
                      <p className="text text-secondary text-s w700 mb-2">
                        Property type:
                      </p>
                      {
                        property_types.map((val, ind) => {
                          return (
                            <div key={ind} className="property_types">
                              <div className="mb-2 d-flex justify-content-between align-items-center">
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="category"
                                    id={val.id}
                                    value={val.name}
                                    onChange={(e) => setCategory(e.target.value)}
                                  />
                                  <label className="form-check-label text-sm" htmlFor={val.id}>
                                    {val.title}
                                  </label>
                                </div>
                                {/* <p className="text text-xs mb-0">60</p> */}
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="mx-2 my-3">
                      <button onClick={applyFilter} className="btn w-100 btn-primary">Apply Filter</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-9">
                {
                  results ?
                    <>
                      {console.log(results)}
                      {
                        results.success ?
                          results.data.map((result, ind) => {
                            return (
                              <>
                                <div key={ind} className="row">
                                  <div className="col-md-4">
                                    <div className="p-0 rounded mb-3">
                                      <img
                                        src={`http://localhost:5000/${result.images[0]}`}
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
                                        {result.title}
                                      </p>
                                      <div className="d-flex flex-wrap justify-content-start align-items-center mb-2">
                                        <Link
                                          to="#"
                                          className="text-decoration-none text-primary"
                                        >
                                          <div className="d-flex justify-content-start align-items-center me-2">
                                            <ion-icon
                                              name="location"
                                              style={{ fontSize: "0.92rem", color: "#0275d8" }}
                                            ></ion-icon>
                                            <p className="text-xs mb-0 ms-1 text-primary">
                                              {result.address.address} - {result.address.city}
                                            </p>
                                          </div>
                                        </Link>
                                        <ion-icon
                                          name="ellipse"
                                          style={{ color: "#707070", fontSize: "0.4rem" }}
                                        ></ion-icon>
                                        <Link to="#" className="text-decoration-none">
                                          <p
                                            className="text-xs mb-0 mx-2 text-primary"
                                          // style={{ color: "#707070" }}
                                          >
                                            View on Map
                                          </p>
                                        </Link>
                                      </div>
                                      <div className="features p-0 m-0">
                                        {result.features.map((val, index) => {
                                          return (
                                            <span className="text-xs badge my-2">
                                              <li>{val}</li>
                                            </span>
                                          );
                                        })}
                                      </div>
                                      <div className="d-flex justify-content-start align-items-center">
                                        <img
                                          src={`http://localhost:5000/${result.owner.image}`} alt=""
                                          style={{
                                            width: "35px",
                                            height: "35px",
                                            objectFit: "cover",
                                            borderRadius: "50%",
                                          }}
                                        />
                                        <div className="ms-2 my-3">
                                          <p className="text text-secondary mb-0 text-xs w700">
                                            Hosted By:
                                          </p>
                                          <small className="d-block mt-0 text-xs">
                                            {result.owner.firstName} {result.owner.lastName}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-md-3">
                                    <div className="p-1 text-md-end text-start">
                                      <div className="d-flex justify-content-md-end justify-content-start align-items-center mb-3">
                                        <Link to="#" className="text-decoration-none">
                                          <div className="d-flex justify-content-start align-items-center me-2">
                                            <i className="fa-solid fa-star text-warning"></i>
                                            <p className="text mb-0 ms-1">{result.rating}</p>
                                          </div>
                                        </Link>
                                        <ion-icon
                                          name="ellipse"
                                          style={{ color: "#575757", fontSize: "6px" }}
                                        ></ion-icon>
                                        <Link to="#" className="text-decoration-none mb-0">
                                          <p
                                            className="text ms-2 mb-0"
                                          >
                                            19 Reviews
                                          </p>
                                        </Link>
                                      </div>
                                      <div className="mb-3">
                                        <p
                                          className="text text-secondary mb-0"
                                          style={{ fontSize: "13px" }}
                                        >
                                          {/* 4 nights, 2 adults, 2 children */}
                                        </p>
                                        <div>
                                          <p
                                            className="text text-secondary mb-0 fs-6 fw-bold"
                                          >
                                            NPR {result.price} <small>{result.payment_type === "on-sale" ? "" : result.payment_type === "monthly" ? "per month" : "per night"}</small>
                                          </p>
                                          {
                                            result.category === "hotel" ?
                                              <p
                                                className="text text-secondary mb-0"
                                                style={{ fontSize: "13px" }}
                                              >
                                              </p> : <></>
                                          }
                                        </div>
                                      </div>
                                      <div className="d-flex justify-content-md-end justify-content-start align-items-center py-0">
                                        <Link to={`/view-details/${result._id}`} className="btn btn-primary px-3">
                                          See Availability
                                        </Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </>
                            )
                          }) :
                          <>
                            <p>No Results Found</p>
                          </>
                      }
                    </> :
                    <>
                      <p>Loading...</p>
                    </>
                }
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SearchProperty;
