import React from 'react'

const Viewcontact = () => {
    return (
        <div className="container-fluid">
            <div className="container" style={{ height: "100vh" }}>
                <Sidebar tab={'manage-user'}></Sidebar>
                <div className="container mx-3">
                    <div className="container col-md-10 mx-auto">
                        <h4 className="fw-bold mx-2 pt-2"></h4>

                        {/*  */}
                        <div className="mt-5 mx-2">
                            <h6 className="m-0">RECENT USERS</h6>
                            {
                                user?.map(data => {
                                    return (

                                        <div
                                            // key={ind}
                                            className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                                        >
                                            <div className="col d-flex align-items-center">
                                                <div className="no-img-avatar-sm me-4">{data?.firstName?.slice(0, 1).toUpperCase()}{data?.lastName?.slice(0, 1).toUpperCase()}</div>
                                                <div className="col">
                                                    <p className="m-0 text-s">{data?.firstName}{data?.lastName}</p>
                                                </div>
                                            </div>

                                            <div className="col">
                                                <p className="m-0 text-xs">Username</p>
                                                <p className="m-0 text-s"> {data?.username}</p>
                                            </div>
                                            <div className="col">
                                                <p className="m-0 text-xs">Email</p>
                                                <p className="m-0 text-sm">{data?.email}</p>
                                            </div>
                                            <div className="col">
                                                <button onClick={() => {
                                                    navigate('/add-user', { state: { data: data } })
                                                }} className="btn badge"><i className="fas text-primary fa-pen"></i></button>
                                                <button onClick={deleteUsder.bind(this, data._id)} className="btn badge"><i className="fas text-danger fa-trash"></i></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Viewcontact;