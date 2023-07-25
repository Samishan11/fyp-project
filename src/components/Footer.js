import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='container-fluid pt-5 pb-3' style={{ background:"#ebebeb" }}>
                <div className='container d-flex flex-wrap mx-auto col-md-9'>
                    <div className='col-md-3'>
                        <p className='fw-bold'>Realstate</p>
                        <a href='#' className='d-block text-sm text-secondary my-2'>About</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Team</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Contact Us</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Terms</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Conditions</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Support</a>
                    </div>

                 
                    <div className='col-md-3'>
                        <p className='fw-bold'>Locations</p>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Kathmandu</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Pokhara</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Biratnagar</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Lalitpur</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Bhaktapur</a>
                    </div>

                    <div className='col-md-3'>
                        <p className='fw-bold'>Become a host</p>
                        <a href='#' className='d-block text-sm text-secondary my-2'>List property</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Advertisment</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>Security</a>
                        <a href='#' className='d-block text-sm text-secondary my-2'>FAQs</a>
                    </div>

                    <div className='col-md-3 my-3'>
                        <p className='fw-bold'>Contact Us</p>
                        <a href="#" className='me-2'>
                            <span><i class="fa-brands fa-facebook-square fs-1"></i></span>
                        </a>
                        <a href="#" className='mx-2'>
                            <span><i class="fa-brands fa-instagram fs-1"></i></span>
                        </a>
                        <a href="#" className='mx-2'>
                            <span><i class="fa-brands fa-twitter fs-1"></i></span>
                        </a>
                    </div>


                </div>
               
            </div>
        </>
    )
}

export default Footer