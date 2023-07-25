import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import $ from 'jquery'
import { UserContext } from '../../../context/userContext'
import { toast } from 'react-toastify'
const ShowComments = (props) => {
    const [comments, setComments] = useState()
    const [reportTitle, setReportTitle] = useState()
    const [report, setReport] = useState()
    const [user] = useContext(UserContext)
    useEffect(() => {
        axios.get('/show-comments/' + props.propertyId.toString()).then(function (res) {
            console.log(res.data)
            setComments(res.data)
        })
    }, [props.load])

    const likeComment = async (comment) => {
        $(`#likeInp${comment}`).click()
        const checked = $(`#likeInp${comment}`).is(":checked")
        const res = await axios.put('/like-comment', { comment, liked: checked })
        if (checked) {
            $(`#heart${comment}`).addClass('text-primary')
            $(`#like${comment}`).html(res.data.likes)
        } else {
            $(`#heart${comment}`).removeClass('text-primary')
            $(`#like${comment}`).html(res.data.likes)
        }
    }
    
    const reportComment = async (comment) => {
        const res = await axios.post('/report', { comment: comment, subject: reportTitle, report: report })
        if (res.data.success) {
            toast.success(res.data.message, { position: toast.POSITION.TOP_RIGHT })
        }
    }

    return (
        <div>
            {
                comments ?
                    <>
                        {
                            comments.length > 0 ?
                                <>
                                    {
                                        comments.map((val, ind) => {
                                            return (
                                                <div key={val} className='d-flex flex-wrap my-3 rounded px-2 py-2' style={{ background: "#e9e9e9" }}>

                                                    <div className='mx-2'>
                                                        <small className='text-xs fw-bold'>{val.user.firstName} {val.user.lastName}</small>
                                                        <small className='text-xs mx-1 text-muted'>{new Date(val?.date).toDateString()} {new Date(val?.date).toLocaleTimeString()}</small>
                                                        <p>{val.comment}</p>
                                                        <div className='d-flex'>
                                                            {
                                                                val.likedBy.indexOf(user?._id) !== -1 ?
                                                                    <>
                                                                        < div >
                                                                            <input id={`likeInp${val._id}`} defaultChecked={true} type="checkbox" hidden />
                                                                        </div>
                                                                        <button onClick={likeComment.bind(this, val._id, val.likes)} style={{ outline: "none", border: "none" }} className='rounded bg-light '><small id={`like${val._id}`} className='text-sm'>{val.likes}</small><i id={`heart${val._id}`} className={`fa-solid fa-heart mx-1 text-sm text-primary`} style={{ color: "#afafaf" }}></i></button>
                                                                    </> :
                                                                    <>
                                                                        < div >
                                                                            <input id={`likeInp${val._id}`} defaultChecked={false} type="checkbox" hidden />
                                                                        </div>
                                                                        <button onClick={likeComment.bind(this, val._id, val.likes)} style={{ outline: "none", border: "none" }} className='rounded bg-light '><small id={`like${val._id}`} className='text-sm'>{val.likes}</small><i id={`heart${val._id}`} className={`fa-solid fa-heart mx-1 text-sm`} style={{ color: "#afafaf" }}></i></button>
                                                                    </>
                                                            }

                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </> :
                                <p>No Reviews Yet</p>
                        }
                    </> :
                    <p>Loading...</p>
            }
        </div >
    )
}
export default ShowComments;