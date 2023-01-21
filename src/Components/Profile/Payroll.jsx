
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../Includes/Loader"
import config from "../../config";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router';
function Payroll(props) {
  let navigate = useNavigate();
  const id = props.props._id
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("")
  const [query,setQuery] = useState("")
  var token = localStorage.getItem("token") || "";
  const getSalary = () => {
    setLoader(true)
    axios.post(`${config.API_URL}/salary/get`, query, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((result) => {
      setLoader(false)
      setData(result.data.data);
    }).catch((error) => {
      console.log(error)
      setLoader(false)
    })
  } 
  const deletebutton = (row) => {
    setLoader(true)
    axios
      .post(`${config.API_URL}/salary/delete`, row, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setLoader(false)
        toast.success("Salary Slip deleted ", {
          position: "top-right",
          autoClose: 1000,
          onClose: () => {
            navigate("/")
          }
      })
   
  
       
      }).catch((error) => {
        console.log(error)
        setLoader(false)
      })
  }
  //delete function 

  const handleSubmit = (row) => {
    console.log(row)
    setLoader(true)
    axios
      .post(`${config.API_URL}/generate`, row, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "arraybuffer"
      })
      .then((result) => {
        setLoader(false)
        var blob = new Blob([result.data], { type: "application/pdf", });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Salaryslip.pdf`);
        document.body.appendChild(link, "_blank");
        link.click();

      }).catch((error) => {
        console.log(error)
        setLoader(false)
      })
  }


  return (
    <>
      <ToastContainer />
      <div className="row">
        <div className="col-xl-12 col-lg-12  col-md-12">
          <div className="card shadow-sm ctm-border-radius grow">
            <div className="card-body align-center">
              <div className="row filter-row">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4">
                  <div className="form-group mb-xl-0 mb-md-2 mb-sm-2">
                    <select className="form-control select" onChange={(e) => { setQuery({ ...query, month: e.target.value }) }}>
                      <option selected>--Select Month--</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4">
                  <div className="form-group mb-xl-0 mb-md-2 mb-sm-2">
                    <select className="form-control select" onChange={(e) => { setQuery({ ...query, year: e.target.value }) }}>
                      <option selected>--Select Year--</option>
                      <option>2022</option>
                      <option>2023</option>
                      <option>2024</option>
                      <option>2025</option>
                      <option>2026</option>
                      <option>2027</option>
                      <option>2028</option>
                      <option>2029</option>
                    </select>
                  </div>
                </div>
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4">
                  <button className="btn btn-theme button-1 text-white btn-block p-2 mb-md-0 mb-sm-0 mb-lg-0 mb-0"onClick={getSalary} disabled={query.month == "" || query.year == "" ? true : false}> Apply Filter </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-12 d-flex">
              <div className="card flex-fill office-card-last ctm-border-radius shadow-sm grow mb-3">

                <div className="card-header ">
                  <h4 className="card-title mb-1">Payslip</h4>


                  {data && data.map((row) => {
           
                    return (
                      <>
                        {loader === true ? <Loader /> :
                          <div className="card-header bg-light">

                            <h6 className="card-title mb-0 text-dark ">{row.month}  <button style={{ border: "none" }} className="float-right text-primary" onClick={() => { handleSubmit(row) }}><i className="fa fa-solid fa-download"></i></button></h6>

                          </div>
                        }
                      </>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payroll