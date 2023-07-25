import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import OAuth2Login from "react-simple-oauth2-login";
import Navbar from "../../components/Navbar";
import $ from 'jquery'


const Login = () => {
  const navigation = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const facebook = () => {
    window.open("http://localhost:5000/auth/facebook", "_self");
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/login", { username, password });
      console.log(res.data)
      if (res.data.success) {
        if (res.data.admin) {
          toast.success(res.data.message, { position: toast.POSITION_TOP_RIGHT });
          localStorage.setItem("token", res.data.token);
          window.location ='/admin'
          // navigation('/admin')
        } else {
          toast.success(res.data.message, { position: toast.POSITION_TOP_RIGHT });
          localStorage.setItem("token", res.data.token);
          window.location = '/'
          // navigation('/')
        }

      } else {
        toast.error(res.data.message, { position: toast.POSITION_TOP_RIGHT });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // google login code start here
  useEffect(() => {
    gapi.load("client:auth2", () => {
      gapi.client.init({
        // retrieve clientid from your .env file
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        plugin_name: "chat",
      });
    });
  }, []);

  const responseErrorGoogle = (result) => {
    console.log("this is error message", result);
  };

  const responseSuccessGoogle = (googleData) => {
    console.log(googleData);
    // you can see the available data on console
    const userData = {
      googleData: googleData.profileObj.googleId,
      firstname: googleData.profileObj.givenName,
      lastname: googleData.profileObj.familyName,
      email: googleData.profileObj.email,
    };


    // backend url
    axios.post("/google-signin", userData).then((result) => {
      if (result.data.admin) {
        localStorage.setItem("token", result.data.token);
        window.location.href = "http://localhost:3000/admin";
      } else {
        window.location.href = "http://localhost:3000/dashboard";
      }
    });
  };
  // 
  const onSuccess = async (res) => {
    const accessToken = res.access_token;
    const result = await fetch(
      `https://graph.facebook.com/me?fields=id,name,email,picture.type(large)&access_token=${accessToken}`
    );
    const profile = await result.json();
    console.log(profile);
    const { id, name } = profile;
    const avatar = profile.picture.data.url;
    axios
      .post("/facebook-signin", {
        id,
        name,
        avatar,
      })
      .then((docs) => {
        localStorage.setItem("token", docs.data.token);
        window.location.href = "http://localhost:3000";
      });
  };
  const onFailure = (response) => {
    console.log(response);
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="container col-md-10 mx-auto">
        <div className="box py-3 px-5 col-md-4 mx-auto my-4 rounded">
          <div>
            <p className="fw-bold fs-5">Sign in to your account</p>
            <form>
              <div className="form-group my-4">
                <label
                  className="fw-bold"
                  htmlFor=""
                  style={{ fontSize: "0.8em" }}
                >
                  Username
                </label>
                <div>
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    className="form-control"
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group my-4">
                <label
                  className="fw-bold"
                  htmlFor=""
                  style={{ fontSize: "0.8em" }}
                >
                  Password
                </label>
                <div>
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    className="form-control"
                    type="password"
                  />
                </div>

                <div className="d-flex">
                  <Link to={`/reset-password-link`} className="nav-link m-0 px-0 text-sm">Forgot Password?</Link>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={login}
                  className="btn button w-100 text-light"
                >
                  <small className="text-light">Login</small>
                </button>
              </div>
            </form>

            <div className="d-flex my-2">
              <hr className="container" />
              <small className="container mt-1">
                <small>or sign in with</small>
              </small>
              <hr className="container" />
            </div>
            <div className="" id="google-login">
              <GoogleLogin
                className="mb-3 p-0 border shadow-sm text-center w-100 text-sm"
                clientId="470860521011-6lqumeljssnl4m1t5sojfmodo70fv9bc.apps.googleusercontent.com"
                // buttonText="Login with Google"
                onSuccess={responseSuccessGoogle}
                onFailure={responseErrorGoogle}
                cookiePolicy={"single_host_origin"}
                style={{ padding: "0px", margin: "0px" }}
              >
                {/* <span className="text-white fw-bold"> Login with Google</span> */}
              </GoogleLogin>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
