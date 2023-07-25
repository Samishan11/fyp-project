import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
const AdminDash = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const [load, aa] = useState(false);
  useEffect(() => {
    axios
      .get("/users")
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {});
  }, [load]);

  const [property, setProperty] = useState([]);
  const getProperty = async () => {
    const properties = await axios.get("property");
    setProperty(properties.data.data);
  };

  useEffect(() => {
    getProperty();
  }, []);

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

  const deleteUsder = async (id) => {
    console.log(id);
    try {
      var res = await axios.delete(`delete-account/${id}`);
      load ? aa(false) : aa(true);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container" style={{ height: "100vh" }}>
      <Sidebar tab={"admin"}></Sidebar>
      <div className="container mx-3">
        <div className="container col-md-10 mx-auto">
          <h4 className="fw-bold mx-2 pt-2">Dashboard Overview</h4>
          <div className="row mx-2">
            <div
              className="flex-column me-1 col-md-3 p-0 my-3 px-2 d-flex justify-content-center align-items-center"
              style={{
                width: "32%",
                background: "#e8f2ff",
                height: "30vh",
              }}
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
              style={{
                width: "32%",
                background: "#e8f2ff",
                height: "30vh",
              }}
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
              style={{
                width: "32%",
                background: "#e8f2ff",
                height: "30vh",
              }}
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
          {/*  */}
          <div className="mt-5 mx-2">
            <h6 className="m-0">RECENT USERS</h6>
            {user?.slice(0, 6)?.map((data) => {
              return (
                <div
                  // key={ind}
                  className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                >
                  <div className="col d-flex align-items-center">
                    <div className="no-img-avatar-sm me-4">
                      {data?.firstName?.slice(0, 1).toUpperCase()}
                      {data?.lastName?.slice(0, 1).toUpperCase()}
                    </div>
                    <div className="col">
                      <p className="m-0 text-s">
                        {data?.firstName}
                        {data?.lastName}
                      </p>
                    </div>
                  </div>

                  <div className="col">
                    <p className="m-0 text-xs">Username</p>
                    <p className="m-0 text-s"> {data?.username}</p>
                  </div>
                  <div className="col">
                    <p className="m-0 text-xs">Email</p>
                    <p className="m-0 text-sm">{data?.email}</p>
                  </div>
                  <div className="col">
                    <button
                      onClick={() => {
                        navigate("/add-user", { state: { data: data } });
                      }}
                      className="btn badge"
                    >
                      <i className="fas text-primary fa-pen"></i>
                    </button>
                    <button
                      onClick={deleteUsder.bind(this, data._id)}
                      className="btn badge"
                    >
                      <i className="fas text-danger fa-trash"></i>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
