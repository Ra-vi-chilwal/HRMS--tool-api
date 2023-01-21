import React, { useState } from 'react'
import OverView from './OverView';
import Payroll from './Payroll';
import ChangePassword from './ChangePassword';

function Profile(props) {
    const user = props.props
    const [components, setComponents] = useState("overview")
    return (
        <>
            <div className="col-xl-9 col-lg-8  col-md-12">
                <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm grow bg-white p-4 mb-4 card">
                    <ul className="list-group list-group-horizontal-lg" style={{ cursor: "pointer" }}>
                        <li className={`list-group-item text-center ${components === "overview" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("overview") }} >Detail</li>
                        <li className={`list-group-item text-center ${components === "payroll" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("payroll") }}
                        >PaySlip</li>
                         <li className={`list-group-item text-center ${components === "changepassword" ? "active button-5" : "button-6"}`} onClick={() => { setComponents("changepassword") }}>Change Password</li>
                    </ul>
                </div>

                {components === "overview" ? <OverView  props={user}/> : components === "payroll" ? <Payroll props={user}/> : <ChangePassword/>}

            </div>
        </>
    );
}
export default Profile;
