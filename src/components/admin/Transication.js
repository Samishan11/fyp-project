import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Sidebar from "./Sidebar";
const Transication = () => {
  const navigate = useNavigate();
  const [transicaton, setTransication] = useState([]);
  const [loading, setloading] = useState(true);

  const getTransicationHistory = async (id) => {
    try {
      var res = await axios.get(`transication-history`);
      setloading(true);
      if (res.data) {
        setloading(false);
        setTransication(res.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getTransicationHistory();
  }, []);

  return (
    <div className="container-fluid">
      <div className="container" style={{ height: "100vh" }}>
        <Sidebar tab={"transication"}></Sidebar>
        <div className="container mx-3">
          <div className="container col-md-10 mx-auto">
            <h4 className="fw-bold mx-2 pt-2"></h4>
            <div className="mt-5 mx-2">
              <h6 className="m-0">Transications</h6>
              {loading && <p>Loading...</p>}
              {transicaton?.records?.slice(0, 6)?.map((data) => {
                return (
                  <div
                    // key={ind}
                    className="border rounded shadow-sm row align-items-center my-2 mx-0 py-2 job-row"
                  >
                    <div className="col d-flex align-items-center">
                      <div className="no-img-avatar-sm me-4">
                        {data?.user?.name?.slice(0, 1).toUpperCase()}
                      </div>
                      <div className="col">
                        <p className="m-0 text-s"></p>
                      </div>
                    </div>

                    <div className="col">
                      <p className="m-0 text-xs">Username</p>
                      <p className="m-0 text-s">{data?.user?.name}</p>
                    </div>
                    <div className="col">
                      <p className="m-0 text-xs">Product Id</p>
                      <p className="m-0 text-s">{data?.product_identity}</p>
                    </div>
                    <div className="col">
                      <p className="m-0 text-xs">Payment Type</p>
                      <p className="m-0 text-sm">{data?.type?.name}</p>
                    </div>
                    <div className="col">
                      <p className="m-0 text-xs">Amount</p>
                      <p className="m-0 text-sm">{data?.amount}</p>
                    </div>
                    <div className="col">
                      <button className="btn badge">
                        <i className="fas text-danger fa-trash"></i>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transication;
