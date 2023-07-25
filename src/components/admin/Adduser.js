import axios from "axios";
import React from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
const Adduser = () => {
  const data = useLocation()?.state?.data;
  const [formdata, setFormdata] = useState({
    firstName: data?.firstName ? data?.firstName : "",
    lastName: data?.lastName ? data?.lastName : "",
    username: data?.username ? data?.username : "",
    email: data?.email ? data?.email : "",
    address: data?.address ? data?.address : "",
    phone: data?.phone ? data?.phone : "",
    password: "",
    password2: "",
    admin: data?.admin ? data?.admin : false,
    verified: data?.verified ? data?.verified : false,
  });

  const onInputChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      if (!data) {
        if (
          !formdata.firstName ||!formdata.lastName ||!formdata.email ||!formdata.address ||!formdata.phone) {
          toast.warn("Fill All The Fields!!!");
        } else if (formdata.password !== formdata.password2) {
          toast.warn("Password Not Match!!!");
        } else if (formdata.password.length < 8) {
          toast.warn("Password Must Contain At Lest 8 Character!!!");
        } else {
          var res = await axios.post("/register", formdata);
          toast.success(res.data.message);
        }
      } else {
        var res = await axios.put(`/profileUpdate/${data?._id}`, formdata);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container-fluid">
      <div className="container" style={{ height: "100vh" }}>
        <Sidebar tab={"add-user"}></Sidebar>
        <div className="container mx-3">
          <div className="container col-md-10 mx-auto">
            <h4 className="fw-bold mx-2 pt-2"></h4>

            {/*  */}
            <div className="mt-5 mx-2">
              <h6 className="mx-4 fw-bold">
                {!data ? "ADD NEW USER" : "UPDATE USER INFROMATION"}
              </h6>
              <div className="container mt-5">
                <div className="row mx-auto">
                  <div className="form-group col-md-6 mb-4">
                    <label htmlFor="">Firstname</label>
                    <div>
                      <input
                        onChange={(e) => onInputChange(e)}
                        name="firstName"
                        value={formdata.firstName}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 ">
                    <label htmlFor="">Lastname</label>
                    <div>
                      <input
                        onChange={(e) => onInputChange(e)}
                        name="lastName"
                        value={formdata.lastName}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 ">
                    <label htmlFor="">Username</label>
                    <div>
                      <input
                        onChange={(e) => onInputChange(e)}
                        value={formdata.username}
                        name="username"
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 mb-4">
                    <label htmlFor="">Email</label>
                    <div>
                      <input
                        onChange={(e) => onInputChange(e)}
                        name="email"
                        value={formdata.email}
                        className="form-control"
                        type="email"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 ">
                    <label htmlFor="">Address</label>
                    <div>
                      <input
                        onChange={(e) => onInputChange(e)}
                        name="address"
                        value={formdata.address}
                        className="form-control"
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 mb-4">
                    <label htmlFor="">Contact</label>
                    <div>
                      <input
                        onChange={(e) => onInputChange(e)}
                        name="phone"
                        value={formdata.phone}
                        className="form-control"
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 ">
                    <label htmlFor="">Admin</label>
                    <div>
                      <select
                        onChange={(e) => onInputChange(e)}
                        name="admin"
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>
                          {formdata.admin ? "Admin" : "Open this select menu"}
                        </option>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-md-6 mb-4">
                    <label htmlFor="">Verify</label>
                    <div>
                      <select
                        onChange={(e) => onInputChange(e)}
                        name="verified"
                        class="form-select"
                        aria-label="Default select example"
                      >
                        <option selected>
                          {" "}
                          {formdata.verified
                            ? "Verified"
                            : "Open this select menu"}
                        </option>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-group col-md-6 ">
                    <label htmlFor="">Password</label>
                    <div>
                      <input
                        onChange={(e) => onInputChange(e)}
                        name="password"
                        className="form-control"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-6 ">
                    <label htmlFor="">Confrim Password</label>
                    <div>
                      <input
                        onChange={(e) => onInputChange(e)}
                        name="password2"
                        className="form-control"
                        type="password"
                      />
                    </div>
                  </div>
                  <div className="btn d-flex justify-content-end mt-2">
                    <button
                      onClick={addUser}
                      className="btn btn-sm btn-outline-primary px-4"
                    >
                      {!data ? "Add" : "Update"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
