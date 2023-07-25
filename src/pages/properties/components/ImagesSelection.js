import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "../style.css";
import { toast } from 'react-toastify';

const ImageSelection = () => {

    const navigate = useNavigate()
    const propertyId = useParams().propertyId

    const [image, setImage] = useState()
    const [uploadedImages, setUploadedImages] = useState()

    const uploadImage = (file) => {

        file.url = URL.createObjectURL(file)
        setImage(file)
    }

    const upload = () => {
        var data = new FormData;
        data.append("image", image)
        axios.put(`/listings/add-image/${propertyId}`, data).then(function (res) {
            if (res.data.success) {
                toast.success(res.data.message, { position: toast.POSITION_TOP_RIGHT })
                setUploadedImages(res.data.result.images)
            } else {
                toast.error(res.data.message, { position: toast.POSITION_TOP_RIGHT })
            }
        })
    }

    console.log(uploadedImages)

    useEffect(() => {
        axios.get(`/get-property-listing/${propertyId}`).then(function (res) {
            setUploadedImages(res.data.result.images)
        })
    }, [])


    return (
        <>
            <div className='container mx-auto my-4 col-9 mx-auto'>
                <div className="container row">
                    <div className='col-md-6'>
                        <div className='border rounded py-3 px-2'>
                            <p className='m-0'>Images</p>
                            <small className='text-xs'>Your can upload at least 6 images.</small>

                            <div className='my-2'>
                                <input onChange={(e) => uploadImage(e.target.files[0])} type="file" accept='image/*' />
                                <button onClick={upload.bind(this)} className='btn btn-primary btn-sm'>Upload</button>
                                <div className='image-preview my-2'>
                                    <img className='img img-fluid' style={{ height: "10ch", width: "10ch", objectFit: "cover" }} src={image?.url} alt="" />
                                </div>
                            </div>
                            <hr />

                            <div className='my-4'>
                                <p>Uploaded Images</p>
                                {
                                    uploadedImages ?
                                        <div className='row'>
                                            {
                                                uploadedImages.map((val, ind) => {
                                                    return (
                                                        <div key={ind} className='col-md-3 my-2'>
                                                            <img key={ind+1} className='img img-fluid' style={{ height: "10ch", width: "10ch", objectFit: "cover" }} src={`http://localhost:5000/${val}`} alt="" />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div> :
                                        <p>Loading...</p>
                                }
                            </div>
                        </div>
                        <div className='d-flex my-2'>
                            <button onClick={() => navigate(-1)} className='btn btn-outline-primary rounded' type='button'>Back</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ImageSelection