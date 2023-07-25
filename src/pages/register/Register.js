import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import './register.css'
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import OAuth2Login from "react-simple-oauth2-login";

const Register = () => {
    const navigation = useNavigate();

    const [firstName, setFname] = useState('');
    const [lastName, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        const res = await axios.post('/register', { firstName, lastName, email, username, password });
        console.log(res.data)
        if (res.data.success) {
            toast.success(res.data.message, { position: toast.POSITION_TOP_RIGHT })
            navigation("/login");
        } else {
            toast.error(res.data.message, { position: toast.POSITION_TOP_RIGHT })
        }
    }

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

        console.log(userData);

        // backend url
        axios.post("/google-signin", userData).then((result) => {
            if (result.data.success) {
                localStorage.setItem("token", result.data.token);
                // navigation("/profile");
                window.location.href = "http://localhost:3000/dashboard";
            } else {
                toast.error("Something's wrong.");
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
            <div className='container col-md-10 mx-auto'>
                <div className='box py-3 px-5 col-md-4 mx-auto my-4 rounded'>
                    <div>
                        <p className='fw-bold fs-5'>Sign in or create an account</p>
                        <form>
                            <div className='row my-4'>
                                <div className='form-group col-md-6'>
                                    <label className='fw-bold' htmlFor="" style={{ fontSize: "0.8em" }}>First Name</label>
                                    <div>
                                        <input onChange={(e) => { setFname(e.target.value) }} className='form-control' type="text" />
                                    </div>
                                </div>
                                <div className='form-group col-md-6'>
                                    <label className='fw-bold' htmlFor="" style={{ fontSize: "0.8em" }}>Last Name</label>
                                    <div>
                                        <input onChange={(e) => { setLname(e.target.value) }} className='form-control' type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className='form-group my-4'>
                                <label className='fw-bold' htmlFor="" style={{ fontSize: "0.8em" }}>Email</label>
                                <div>
                                    <input onChange={(e) => { setEmail(e.target.value) }} className='form-control' type="email" />
                                </div>
                            </div>
                            <div className='form-group my-4'>
                                <label className='fw-bold' htmlFor="" style={{ fontSize: "0.8em" }}>Username</label>
                                <div>
                                    <input onChange={(e) => { setUsername(e.target.value) }} className='form-control' type="text" />
                                </div>
                            </div>
                            <div className='form-group my-4'>
                                <label className='fw-bold' htmlFor="" style={{ fontSize: "0.8em" }}>Password</label>
                                <div>
                                    <input onChange={(e) => { setPassword(e.target.value) }} className='form-control' type="password" />
                                </div>
                            </div>
                            <div>
                                <button type='button' onClick={register} className='btn button w-100 text-light'><small className='text-light'>Create Account</small></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register

