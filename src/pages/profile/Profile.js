import React, { useContext, useState } from "react";
import Navbar from "../../components/Navbar";
import PopupModal from "../../components/PopupModal";
import { UserContext } from "../../context/userContext";
import PasswordChange from "../../components/ChangePassword";
import axios from "axios";
import { Link } from "react-router-dom";
import $ from 'jquery'
const Profile = () => {
  const [user, setUser] = useContext(UserContext);
  const [messages, setMessage] = useState("");


  const logout = () => {
    localStorage.clear()
    window.location.href = "/"
  }
 

  console.log(Boolean(0))

  const verifyEmail = (e) => {
    e.preventDefault();
    axios
      .post("/send-email", { email: user?.email })
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.success);
          setMessage(result.data.message);
          window.location = "/";
        } else {
          console.log("Error Occured!!!");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };



  const deleteAccount = () => {
    // e.preventDefault();
    // const config = {
    //   headers: {
    //     Authorization: "Bearer " + localStorage.getItem("token"),
    //   },
    // };

    axios.delete("/delete-account/" + user?._id)
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.message);
          setMessage(result.data.message);
          localStorage.clear();
          window.location = '/'
        } else {
          console.log(result.data.message);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateImage = async(file)=>{
    console.log(file)
    var fd = new FormData
    fd.append('image', file)
    const res = await axios.put('/update-profile', fd)
    console.log(res.data.profile)
    if(res.data.success){
      setUser(res.data.profile)
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container my-4">
        <div className="row justify-content-center">
        
          {/* profile section */}
          <div className="profile-detail-section col-md-6 mx-5 col-12 mt-5 ">
            <div className="d-flex items-center justify-content-between">
              <div className="">
                <p className="text-secondary fw-bold p-0 m-0 text-lg">
                  Personal Details
                </p>
                <p className="small text-secondary">
                  Update your personal informations
                </p>
              </div>
              <div>
                <div id="personal-information" className="">
                 
                  <div
                    className="d-flex items-center justify-content-center h4 text-white"
                    style={{ position: "relative", bottom: "2ch" }}
                  >
                    <div>
                      <input onChange={(e)=>updateImage(e.target.files[0])} id="image-select" type="file" accept="image/*" hidden />
                      <button style={{border: "none", outline: "none", background: "none"}} onClick={()=>$('#image-select').click()} className="text-light m-0 p-0">
                        {" "}
                        <i className="mt-1 text-xl">
                          <ion-icon
                            name="camera-outline"
                            style={{ color: "#ffffff" }}
                          ></ion-icon>
                        </i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <hr className="mb-3" />
            <div className="">
              <div className="d-flex justify-content-between px-3">
                <p className="text-secondary small" style={{ width: "20%" }}>
                  Fullname
                </p>
                <p className="text-secondary small " style={{ width: "40%" }}>
                  {user?.firstName} {user?.lastName}
                </p>
                <small>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#firstName"
                    className="link-btn link-btn-sm text-primary p-0"
                  >
                    Edit
                  </button>
                </small>
              </div>

              <PopupModal
                title={"Change Your Name"}
                fieldName={"First Name"}
                field={"firstName"}
                fieldData={user?.firstName}
              ></PopupModal>

              <hr className="m-0 mb-3" />

              <div className="d-flex justify-content-between px-3">
                <p className="text-secondary small" style={{ width: "20%" }}>
                  Username
                </p>
                <p className="text-secondary small" style={{ width: "40%" }}>
                  {user?.username}
                </p>
                <small>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#username"
                    className="link-btn link-btn-sm text-primary p-0"
                  >
                    Edit
                  </button>
                </small>
              </div>
              <PopupModal
                title={"Change Username"}
                fieldName={"Username"}
                field={"username"}
                fieldData={user?.username}
              ></PopupModal>

              <hr className="m-0 mb-3" />

              <div className="d-flex justify-content-between px-3">
                <p className="text-secondary small" style={{ width: "20%" }}>
                  Email
                </p>
                <p
                  className="text-secondary px-3 small"
                  style={{ width: "45%" }}
                >
                  {user?.email} <br />
                </p>
                <small>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#email"
                    className="link-btn link-btn-sm text-primary p-0"
                  >
                    Edit
                  </button>
                </small>
              </div>
              <PopupModal
                title={"Change Email"}
                fieldName={"Email"}
                field={"email"}
                fieldData={user?.email}
              ></PopupModal>

              <hr className="m-0 mb-3" />

              <div className="d-flex justify-content-between px-3">
                <p className="text-secondary small" style={{ width: "20%" }}>
                  Contact
                </p>
                <p className="text-secondary small " style={{ width: "40%" }}>
                  {user?.phone ? user.phone : "---------"}
                </p>
                <small>
                  <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#phone"
                    className="link-btn link-btn-sm text-primary p-0"
                  >
                    Edit
                  </button>
                </small>
              </div>
              <PopupModal
                title={"Change Contact"}
                fieldName={"Contact"}
                field={"phone"}
                fieldData={user?.phone}
              ></PopupModal>

              <hr className="m-0 mb-3" />

              {/* address */}
              <div className="d-flex justify-content-between px-3">
                <p className="text-secondary small" style={{ width: "20%" }}>
                  Address
                </p>
                <p className="text-secondary small " style={{ width: "40%" }}>
                  {user?.address ? user.address : "Enter your address..."}
                </p>
                <button
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#address"
                  className="link-btn link-btn-sm text-primary p-0"
                >
                  Edit
                </button>
                {/* <small className="link-btn link-btn-sm text-primary">
                  Edit
                </small> */}
              </div>
              <PopupModal
                title={"Address"}
                fieldName={"Address"}
                field={"address"}
                fieldData={user?.address}
              ></PopupModal>
              {/* address */}
             
              <hr className="m-0 mb-3" />
            </div>

            {/*  */}
          
            <div className="pt-5" id="Security">
              <div>
                <p
                  className=" text-secondary fw-bold p-0 m-0"
                  style={{ fontSize: "1.2rem" }}
                >
                  Security
                </p>
                <p className=" small text-secondary">
                  Update your password and manage your account
                </p>
              </div>
              <hr className="m-0 mb-3" />

              <div className="d-flex justify-content-between px-3">
                <p className="text-secondary small" style={{ width: "20%" }}>
                  Password
                </p>
                <p className="text-secondary small" style={{ width: "40%" }}>
                  Change your password regurlarly
                </p>
                <small
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#password"
                  className="link-btn link-btn-sm text-primary"
                >
                  Edit
                </small>
              </div>
              <PasswordChange></PasswordChange>
              <hr className="m-0 mb-3" />

              <div className="d-flex justify-content-between px-3">
                <p className="text-secondary small" style={{ width: "20%" }}>
                  Device
                </p>
                <p className="text-secondary small" style={{ width: "36%" }}>
                  Sign out from this site
                </p>
                <small onClick={logout} className="link-btn link-btn-sm text-primary">
                  Sign out
                </small>
              </div>
              <hr className="m-0 mb-3" />

              <div className="d-flex justify-content-between px-3">
                <p className="text-secondary small" style={{ width: "20%" }}>
                  Delete Account
                </p>
                <p className="text-secondary small" style={{ width: "38%" }}>
                  Permanently delete accound and information
                </p>
                <small
                  className="link-btn link-btn-sm text-primary text-danger"
                  onClick={deleteAccount}
                >
                  Delete
                </small>
              </div>
              <hr className="m-0 mb-3" />
            </div>
            {/*  */}
        
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
