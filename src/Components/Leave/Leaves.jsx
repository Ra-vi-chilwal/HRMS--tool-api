import React, { useState } from 'react'
import Apply from "./Apply";
import LeaveDetails from './LeaveDetails';

import AddLeaves from './AddLeaves';
import Calender from "../Calender/AddCalender";
export default function Leaves(props) {
  const user = props && props.user;

  const [components, setComponents] = useState("Apply")
  return (
    <>

      <div className="col-xl-9 col-lg-8  col-md-12">
        <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm grow bg-white p-4 mb-4 card">
          <ul className="list-group list-group-horizontal-lg" style={{ cursor: "pointer" }}>
            <li className={`list-group-item text-center ${components === "Apply" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("Apply") }} >Apply</li>
            <li className={`list-group-item text-center ${components === "LeaveDetails" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("LeaveDetails") }}>Team Leaves</li>
           {user.role =="hr"? <><li className={`list-group-item text-center ${components === "AddLeaves" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("AddLeaves") }}
            >Add Leaves</li>
            <li className={`list-group-item text-center ${components === "Calender" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("Calender") }}>Calender</li></>:null}
          </ul>
        </div>
        {components === "Apply" ? <Apply props={user} /> : components === "LeaveDetails" ? <LeaveDetails /> :components === "AddLeaves" ? <AddLeaves props={user} />:<Calender /> }

      </div>
    </>
  );
}
