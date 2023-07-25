import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { UserContext } from '../context/userContext';

const PopupModal = (props) => {

    const [user, setUser] = useContext(UserContext);
    const [field, setField] = useState(props.fieldData);
    const [fieldS, setFieldS] = useState(user?.lastName);

    const update = async () => {
        const fieldName = props.field;
        var res;
        if (fieldName === "username") {
            const update = await axios.put(`/profileUpdate/${user._id}`, { username: field });
            setUser(update.data.profile)
            res = update.data
            console.log(update.data)

        } else if (fieldName === "email") {
            const update = await axios.put(`/profileUpdate/${user._id}`, { email: field });
            setUser(update.data.profile)
            res = update.data
            console.log(update)

        }
        else if (fieldName === "phone") {
            const update = await axios.put(`/profileUpdate/${user._id}`, { phone: field });
            setUser(update.data.profile)
            res = update.data
            console.log(update)

        }
        else if (fieldName === "address") {
            const update = await axios.put(`/profileUpdate/${user._id}`, { address: field });
            res = update.data
            setUser(update.data.profile)
            console.log(update)

        }
        else if (fieldName === "firstName") {
            const update = await axios.put(`/profileUpdate/${user._id}`, { firstName: field, lastName: fieldS });
            res = update.data
            setUser(update.data.profile)
            console.log(update)

        }

        if(res.success){
            toast.success(res.message, {position: toast.POSITION_TOP_RIGHT})
        }else{
            toast.error(res.message, {position: toast.POSITION_TOP_RIGHT})
        }
    }

    return (
        <div>
            <div className="modal fade" id={props.field} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <p className="modal-title text-md fw-bold" id="exampleModalLabel">{props.title}</p>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="form-group my-2">
                                <label className="fw-bold"
                                    htmlFor="" style={{ fontSize: "0.8em" }} >
                                    {props.fieldName}
                                </label>
                                <div>
                                    <input
                                        onChange={(e) => {
                                            setField(e.target.value);
                                        }}
                                        className="form-control"
                                        type="text" 
                                        placeholder={props.fieldData}
                                    />
                                </div>
                            </div>
                            {
                                props.field === "firstName" ?
                                    <>
                                        <div className="form-group my-2">
                                            <label className="fw-bold"
                                                htmlFor="" style={{ fontSize: "0.8em" }} >
                                                Last Name
                                            </label>
                                            <div>
                                                <input
                                                    onChange={(e) => {
                                                        setFieldS(e.target.value);
                                                    }}
                                                    className="form-control"
                                                    type="text"
                                                    placeholder={user?.lastName}
                                                />
                                            </div>
                                        </div>
                                    </> :
                                    <>
                                    </>

                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button onClick={update} type="button" className="btn btn-sm btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupModal