import React, { useState } from 'react'
import EmployeeAttendance from './EmployeeAttendance';
import AdminAttendance from './AdminAttendance';

function Attendance(props) {
 const user = props.props


 const [components, setComponents] = useState("EmployeeAttendance")
    return (
        <>

        <div className='col-xl-9 col-lg-8 col-md-12'>
            <div className='quicklink-sidebar-menu ctm-border-radius shadow-sm grow bg-white p-4 mb-4 card'>
                <ul className="list-group list-group-horizontal-lg" style={{ cursor: "pointer" }}>
                    <li className={`list-group-item text-center ${components === "EmployeeAttendance"? "active button-5" : "button-6"}`}onClick={() => { setComponents("EmployeeAttendance") }}>My Attendance</li>
                  {user &&  user.role !=="user"? <li className={`list-group-item text-center ${components === "AdminAttendence" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("AdminAttendence") }}>Employee Attendence</li>:null}
                </ul>
            </div>
        {components === "AdminAttendence" ? <AdminAttendance props={user} />:<EmployeeAttendance props={user} />}
        </div>

        </>
    )
}

export default Attendance