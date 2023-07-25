import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
 
const PasswordChange = () => {
 
    const [oldPassword, setOld] = useState("")
    const [newPassword, setNew] = useState("")
    const [conPassword, setCon] = useState("")
 
    const updatePassword = ()=>{
        axios.put('/change-password', {oldPassword, newPassword, conPassword}).then(function(res){
            if(res.data.success){
                toast.success(res.data.message, {position: toast.POSITION_TOP_RIGHT})
            }else{
                toast.error(res.data.message, {position: toast.POSITION_TOP_RIGHT})
            }
        })
    }
 
 
    return (
        <div>
            <div className="modal fade" id="password" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title text-md fw-bold" id="exampleModalLabel">Change Password</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className=''>
                                <div className="form-group my-2">
                                    <label className="fw-bold"
                                        htmlFor="" style={{ fontSize: "0.8em" }} >
                                        Old Password
                                    </label>
                                    <input onChange={(e)=>{setOld(e.target.value)}} type="password" className='form-control' autoComplete="off"/>
                                </div>
 
                                <div className='form-group my-2'>
                                    <label className="fw-bold"
                                        htmlFor="" style={{ fontSize: "0.8em" }} >
                                        New Password
                                    </label>
                                    <input onChange={(e)=>{setNew(e.target.value)}} type="password" className='form-control' autoComplete="off"/>
                                </div>
 
                                <div className="form-group my-2">
                                    <label className="fw-bold"
                                        htmlFor="" style={{ fontSize: "0.8em" }} >
                                        Confirm New Password
                                    </label>
                                    <input onChange={(e)=>{setCon(e.target.value)}} type="password" className='form-control' autoComplete="off"/>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={updatePassword} type="button" className="btn btn-sm btn-primary">Save</button>
                        </div>
 
 
                    </div>
                </div>
            </div>
        </div>
    )
}
 
export default PasswordChange
