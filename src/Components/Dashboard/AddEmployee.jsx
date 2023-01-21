import React, { useState } from 'react'
import Employee from "./Employee";
import AddDepartment from './AddDepartment';
import AddDesignation from './AddDesignation';
function AddEmployee(props) {
console.log(props)
    const [components, setComponents] = useState("department")
  return (
    <>
       <div className="col-xl-9 col-lg-8  col-md-12">
      <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm grow bg-white p-4 mb-4 card">
          <ul className="list-group list-group-horizontal-lg" style={{ cursor: "pointer" }}>
            <li className={`list-group-item text-center ${components === "department" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("department") }} >Department</li>
            <li className={`list-group-item text-center ${components === "designation" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("designation") }}>Designation</li>
            <li className={`list-group-item text-center ${components === "employeeDetails" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("employeeDetails") }}
            >Employee Details</li>
          </ul>
        </div>
        {components === "department" ? <AddDepartment /> : components === "designation" ? <AddDesignation /> : <Employee />}
        </div>
       
    </>
  )
}

export default AddEmployee