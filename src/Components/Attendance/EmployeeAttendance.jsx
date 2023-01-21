import React, { useEffect, useState } from 'react'
import config from "../../config";
import axios from "axios";
import Loader from "../Includes/Loader"
import DataTable from "react-data-table-component"
import Calender from '../Calender/Calender';

function EmployeeAttendance(props) {
  const biometricId = props.props.biometricId;
  return (
    <>
      <div className="col-xl-12 col-lg-8  col-md-12">
        <div className="card shadow-sm ctm-border-radius grow">
          <div className="card-header d-flex align-items-center justify-content-between">
            <h4 className="card-title mb-0 d-inline-block">Attendance Calender</h4>
            {/* <Link to="/addsalary" className="btn btn-theme button-1 ctm-border-radius text-white float-right"><span /> Add Salary</Link> */}
          </div>
          <div className="card-body align-center react-calendar">
            <Calender biometricId={biometricId} />
          </div>
        </div>
      </div>
    </>
  )
}

export default EmployeeAttendance