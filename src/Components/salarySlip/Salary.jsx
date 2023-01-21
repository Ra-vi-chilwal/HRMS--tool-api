import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DataTable from "react-data-table-component";
import config from "../../config";
import axios from "axios";
import EmployeeSalary from './EmployeeSalary';
import SalarySetting from './SalarySetting';
import AddSalary from './AddSalary';
function Salary(props) {

  const user = props.props

  const [components, setComponents] = useState("employeesalary")

  return (
    <>
  
      <div className="col-xl-9 col-lg-8  col-md-12">
        <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm grow bg-white p-4 mb-4 card">
          <ul className="list-group list-group-horizontal-lg" style={{ cursor: "pointer" }}>
            <li className={`list-group-item text-center ${components === "employeesalary" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("employeesalary") }} >Salary</li>
            <li className={`list-group-item text-center ${components === "addsalary" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("addsalary") }}>Add Salary</li>
            {/* <li className={`list-group-item text-center ${components === "salarysetting" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("salarysetting") }}
            >Setting</li> */}
          </ul>
        </div>
        {components === "employeesalary" ? <EmployeeSalary props={user} /> : components === "salarysetting" ? <SalarySetting /> : <AddSalary user={user}/>}

      </div>
    </>
  );
}

export default Salary;