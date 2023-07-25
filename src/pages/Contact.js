import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Navbar from "../components/Navbar";
const Contact = () => {

  const [username , setusername] = useState('');
  const [email , setemail] = useState('');
  const [message , setmessage] = useState('');

  const post = async () => {
    try {
    if(!username || !email || !message){
      toast.error('All fields required!!')
    }else{
      var res = await axios.post('/contact', {
        username,
        email,
        message
      });
      setemail("")
      setusername("")
      setmessage("")
      toast.success("Sucessfully Post Message")
    }
    } catch (error) {
      toast.error('Something went wrong!!')
    }
  }
  return (
    <>
      <Navbar />
      <div className="container p-2">
        <div className="row border my-3 py-4">
          <h5 className="fw-bold mb-4 text-center position-relative">
            Contact Us
          </h5>
        
          <div className="col-md-8 mx-auto">
            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="">Username</label>
                <input value={username} onChange={e => setusername(e.target.value)} type="text" className="form-control" />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="">Email</label>
                <input value={email} onChange={e => setemail(e.target.value)} type="email" className="form-control" />
              </div>
            </div>
            <div className="form-group col-md-12 my-2">
              <label htmlFor="">Message</label>
              <textarea value={message} onChange={e => setmessage(e.target.value)} type="description" className="form-control" />
            </div>
            <div className="col-md-12 d-flex justify-content-end mt-4">
              <button onClick={post} className="btn btn-outline-primary">Send</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
