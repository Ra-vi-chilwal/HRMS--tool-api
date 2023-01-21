import React, { useState } from "react";
import config from "../../config";
import axios from "axios";
import { useNavigate } from 'react-router';
import * as XLSX from "xlsx";

import { ToastContainer, toast } from "react-toastify";
function AddCalender() {
  const [items, setItems] = useState([]);

  let navigate = useNavigate();
  const readExcel = (event) => {
  let workBook = null;
  let jsonData = null;
  const reader = new FileReader();
  const file = event;
  reader.onload = (event) => {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' , cellDates: true });
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      console.log(sheet)
      initial[name] = XLSX.utils.sheet_to_json(sheet); 
      setItems(initial[name])
      return initial;
    }, {}); 
  }
  reader.readAsBinaryString(file);
}

  var token = localStorage.getItem("token") || "";
  const handleSubmit = () => {

    axios
      .post(`${config.API_URL}/calender`, items, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
      
        if (result.data.code==="CREATED") {
          toast.success("Uploaded", {
              position: "top-right",
              autoClose: 1000,
              onClose: () => {
                 navigate(0)
              }
          })
      }else if (result.data.code==="DUPLICATION"){
        toast.warning("Already Exists ! please Delete First", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            navigate(0)
          }
      })
      }
      else{
        toast.danger("Somathing Wrong ! Please Check", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            navigate(0)
          }
        })    
      }
      })
      .catch((err) => {
        toast.error("NO ! Somthing wrong", {
          position: "top-right",
          autoClose: 2000,
          onClose: () => {
            navigate(0)
          }
      })
      });

  }
  return (
    <div>
      <ToastContainer />
      <div className="col-md-8 mx-auto card shadow-sm ctm-border-radius grow salary-mrgn ">
      <div className="card-header d-flex align-items-center justify-content-between bg-dark">
              <h4 className="card-title mb-0 d-inline-block text-light">Add Calender</h4>
              {/* <Link to="/addsalary" className="btn btn-theme button-1 ctm-border-radius text-white float-right"><span /> Add Salary</Link> */}
            </div>
        <div className="slryfile">
        <input className="form-control"
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />
      <button className=" btn btn-success" onClick={() => { handleSubmit() }}>Save</button>
        </div>
      </div>
      
 
    </div>
  );
}

export default AddCalender;