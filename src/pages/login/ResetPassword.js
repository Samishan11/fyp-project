import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { parseJwt } from '../../utils/parseJWT'

const ResetPassword = () => {
    const token = useParams().token
    const user = parseJwt(token)

    const [password, setPassword] = useState()
    const [cPassword, setCPassword] = useState()

    const navigate = useNavigate()

    const confirm = async()=>{

        if(password === cPassword){
            const res = await axios.put('/reset-password', {userId: user.userId, password: password})
  
            if(res.data.success){
                toast.success(res.data.message, {position: toast.POSITION.TOP_RIGHT})
                localStorage.clear()
                navigate('/login')
            }else{
                toast.error("Something went wrong", {position: toast.POSITION.TOP_RIGHT})
            }
        }else{
            toast.error("Password did not match", {position: toast.POSITION.TOP_RIGHT})
        }
    }
    return (
        <div className='col-md-10 mx-auto py-5'>
            <div className='col-3 mx-auto py-5'>
                <div>
                    <div className='my-2'>
                        <span className='d-flex justify-content-center'><i className='fa-solid fa-circle-user' style={{ fontSize: "2em" }}></i></span>
                    </div>
                    <p className='text-center'>Reset your password</p>
                </div>
                <div className='border rounded px-2 py-3'>
                    <div className='my-2'>
                        <label className='text-sm' htmlFor="n-password">New Password</label>
                        <input onChange={(e)=>setPassword(e.target.value)} className='form-control' type="password" placeholder='' />
                    </div>
                    <div className='my-2'>
                        <label className='text-sm' htmlFor="c-password">Confirm Password</label>
                        <input onChange={(e)=>setCPassword(e.target.value)} className='form-control' type="password" placeholder='' />
                    </div>
                    <div>
                        <button onClick={confirm} className='btn btn-sm btn-primary rounded d-block w-100'>Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword