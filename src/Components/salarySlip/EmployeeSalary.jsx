import React, { useEffect, useState } from 'react'
import DataTable from "react-data-table-component";
import config from "../../config";
import Loader from "../Includes/Loader"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router';
function EmployeeSalary(props) {
  let navigate = useNavigate();
  const deletebutton = (row) => {
    if(window.confirm("Are You sure you want to delete this Data ?")){

      setLoader(true)
      axios
      .post(`${config.API_URL}/salary/delete`, row, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setLoader(false)
        if(result.data.code==="DELETE"){
          console.log(true)
          toast.success("Delete", {
            position: "top-right",
            autoClose: 1000,
            onClose: () => {
              navigate(0)
            }
        })
        
        }else{
          toast.error("Somthing Wrong ", {
            position: "top-right",
            autoClose: 1000,
            onClose: () => {
              navigate("/")
            }
        })
        
        }
      }).catch((error) => {
        console.log(error)
        setLoader(false)
      })
    }else{
      navigate(0)
    }
   
  }
  const columns = [
    {
      name: "Payslip",
      selector: (row) => row.Action,
      sortable: true,
      // right: true,
      wrap:false,
      grow: 5,
      cell: (row) => {

        return (
          <>
<ToastContainer/>
            <button className="btn btn-sm btn-primary text-weight-bold p-2 m-1" onClick={() => { handleSubmit(row) }}>
            <i className="fa fa-solid fa-download"></i></button>
               <button style={{ border: "none" }} className="float-right text-primary btn btn-danger p-1 m-1" onClick={() => { deletebutton(row) }} ><i class="fa fa-trash-o"></i></button> 
          </>
        );
      },
    },

    {
      name: <strong className=''>Employee Id</strong>,
      sortable: true,
      selector: "email",
      sortable: true,
      format: row => `${row.email.slice(0, 10)}...`,
      cell: (row) => <span>{row && row.empId}</span>,
    },
    {
      name: <strong>Employee</strong>,
      sortable: true,
      selector: "email",
      sortable: true,
      format: row => `${row.email.slice(0, 10)}...`,
      cell: (row) => <span>{row && row.user && row.user.firstName} {row && row.user && row.user.lastName}</span>,
    },
 
 
    {
      name: <strong>Payable Days</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.Payabledays 
      }</span>,
    },
    {
      name: <strong>Paid Days</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.Paiddays}</span>,
    },
    {
      name: <strong>Basic</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.basic}</span>,
    },
    {
      name: <strong>HRA</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.hra}</span>,
    },

    {
      name: <strong>DA</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.da}</span>,
    },
    {
      name: <strong>Conv.All.</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.convAll}</span>,
    },
    {
      name: <strong>Spcl. All.</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.specialAll}</span>,
    },
    {
      name: <strong>Acad. All.</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.academicAll}</span>,
    },
    {
      name: <strong>Med.Rem.</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.medRem}</span>,
    }, {
      name: <strong>Food All.</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.foodAll}</span>,
    },
    {
      name: <strong>Unif. All.</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.uniformAll}</span>,
    },
    {
      name: <strong>oth. All.</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.othAll}</span>,
    },
    {
      name: <strong>PF</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.pf}</span>,
    },
    {
      name: <strong>LOP</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.lopDays}</span>,
    },
    {
      name: <strong>Bonus/PL</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.bonus}</span>,
    },
    {
      name: <strong>Arrear</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.arrear}</span>,
    },
    {
      name: <strong> PF Ded</strong>,
      sortable: true,
      cell: (row) => <span>{row && row.pfDeduction}</span>,
    },
    {
      name: <strong>Net Salary</strong>,
      sortable: true,
      cell: (row) => <span>{row.netSalary}</span>,
    },
  ];

  const [data, setData] = useState([])
  const [query, setQuery] = useState({ month: "", year: "" });
  const [loader, setLoader] = useState(false);
  const handleSubmit = (row) => {
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
        link.setAttribute('download', `${query.month}-${query.year}-Salaryslip.pdf`);
        document.body.appendChild(link, "_blank");
        link.click();

      }).catch((error) => {
        console.log(error)
        setLoader(false)
      })
  }

  var token = localStorage.getItem("token") || "";
  const getSalary = () => {
    setLoader(true)
    axios.post(`${config.API_URL}/salary/monthly`, query, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((result) => {
      setLoader(false)
      setData(result.data.data);
    }).catch((error) => {
      console.log(error)
      setLoader(false)
    })
  }
 
  return (
    <>
      <div className='row'>
        <div className="col-xl-12 col-lg-12  col-md-12">
          <div className="card shadow-sm ctm-border-radius grow">
            <div className="card-body align-center">
              <div className="row filter-row">
                <div className="col-sm-6 col-md-6 col-lg-6 col-xl-4">
                  <div className="form-group mb-xl-0 mb-md-2 mb-sm-2">
                    <select className="form-control select" onChange={(e) => { setQuery({ ...query, month: e.target.value }) }}>
                      <option selected value="">Select Month</option>
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
                      <option selected value="">Select Year</option>
                      <option>2021</option>
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
                  <button className="btn btn-theme button-1 text-white btn-block p-2 mb-md-0 mb-sm-0 mb-lg-0 mb-0"
                   onClick={getSalary} disabled={query.month == "" || query.year == "" ? true : false}> Apply Filter </button>
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow-sm ctm-border-radius grow">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h4 className="card-title mb-0 d-inline-block">Employee Salary</h4>
              {/* <button style={{ border: "none" }} className="float-right text-primary" onClick={() => { deletebutton(row) }} ><i class="fa fa-trash-o"></i></button> */}
            </div>
            <div className="card-body align-center">
              <div className="row">
               
                {loader === true ? <Loader /> :
                  <div className="col-md-12 react-table">
                    <DataTable
                      columns={columns}
                      data={data}
                      defaultSortFieldId={1}
                      pagination
                  
                      striped 
                      dense
                      highlightOnHover
                      subHeaderWrap={false}	
                      //
                     
                    
                      
                    /> 
                    </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeSalary;