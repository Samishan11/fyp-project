import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ResetPasswordLink = () => {

    const [email, setEmail] = useState()
    const [sent, setSent] = useState(false)

    const verify = async()=>{
        const res = await axios.post('/reset-password-link', {email: email})
        if(res.data.success){
            setSent(true)
        }else{
            toast.error(res.data.message, {position: toast.POSITION.TOP_RIGHT})
        }
    }

    return (
        <div className='col-md-10 mx-auto py-5'>
            <div className='col-3 mx-auto py-5'>
                <div>
                    <div className='my-2'>
                        <span className='d-flex justify-content-center'><i className='fa-solid fa-circle-user' style={{fontSize:"2em"}}></i></span>
                    </div>
                    <p className='text-center'>Reset your password</p>
                </div>
                <div className='border rounded px-2 py-3'>
                    {
                        sent ?
                            <>
                                <p className='text-sm'>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
                                <Link className='btn btn-sm btn-secondary rounded d-block' to={'/login'}>Back to login</Link>
                            </> :
                            <div className='my-2'>
                                <p className='text-sm'>Please verify your email first in order to get access to reset password link.</p>
                                <input onChange={(e) => setEmail(e.target.value)} className='form-control' type="text" name="" id="" placeholder='Enter your email...' />
                                <button onClick={verify} className='btn btn-sm btn-primary rounded d-block mt-4 w-100'>Verify</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordLink