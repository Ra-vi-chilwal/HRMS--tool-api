import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import config from '../../config';
import PageHeader from './PageHeader';
function SideBar(props) {
  const user = props && props.user

  return (
    <aside className="sidebar sidebar-user">
      <PageHeader title="dashboard" />
      <div className="user-card card shadow-sm bg-white text-center ctm-border-radius grow">
        <div className="user-info card-body">
          <div className="user-avatar mb-4">
            <img src={user.profile && config.API_URL + "/" + user.profile} alt="User Avatar" className="img-fluid rounded-circle" width={100} />
          </div>
          <div className="user-details">
            <h4><b>{user && user.firstName}</b></h4>
            <b>{user && user.email}</b>
          </div>
        </div>
      </div>
      <div className="sidebar-wrapper d-lg-block d-md-none d-none">
        <div className="card ctm-border-radius shadow-sm border-none grow">
          <div className="card-body">
            <div className="row no-gutters">
              <div className="col-6 align-items-center text-center">
                <NavLink to="/" className="text-dark p-4 first-slider-btn ctm-border-right ctm-border-left ctm-border-top"><span className="lnr lnr-home pr-0 pb-lg-2 font-23" /><span>Dashboard</span></NavLink>
              </div>
              <div className="col-6 align-items-center shadow-none text-center">
                <NavLink to="/attendance" state={{ user: user }} className="text-dark p-4 second-slider-btn ctm-border-right ctm-border-top"><span className="lnr lnr-users pr-0 pb-lg-2 font-23" /><span>Attendence</span></NavLink>
              </div>

              <div className="col-6 align-items-center shadow-none text-center">
                <NavLink to="/leaves" className="text-dark p-4 ctm-border-right ctm-border-left"><span className="lnr lnr-briefcase pr-0 pb-lg-2 font-23" /><span>Leave</span></NavLink>
              </div>

              {(user && user && user.role !== "user") ?
                <div className="col-6 align-items-center shadow-none text-center">
                  <NavLink to="/salary" className="text-dark p-4 ctm-border-right ctm-border-left"><span className="lnr lnr-rocket pr-0 pb-lg-2 font-23" /><span>Salary</span></NavLink>
                </div> : ""}
              {(user && user && user.role !== "user") ?
                <div className="col-6 align-items-center shadow-none text-center">
                  <NavLink to="/employee" state={{ user: user }} className="text-dark p-4 ctm-border-right"><span className="lnr lnr-sync pr-0 pb-lg-2 font-23" /><span>Employee</span></NavLink>
                </div> : ""}
              <div className="col-6 align-items-center shadow-none text-center">
                <NavLink to="/profile" state={{ user: user }} className="text-dark p-4 last-slider-btn ctm-border-right"><span className="lnr lnr-user pr-0 pb-lg-2 font-23" /><span>Profile</span></NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}

export default SideBar;