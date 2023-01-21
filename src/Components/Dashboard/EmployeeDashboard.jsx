import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import config from '../../config';
function EmployeeDashboard(props) {
  const leavestime = props.props.remainLeaves;
  const biometricId = props.props.biometricId;
  var token = localStorage.getItem("token") || "";
  const [data, setData] = useState([])
  useEffect(() => {
    axios.post(`${config.API_URL}/attendance`, { biometricId: biometricId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).then((result) => {
      setData(result.data);
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  const firstPunch = new Date(data[0] && data[0].LogDateTime).toUTCString();
  const dateObj = new Date();
  var d = new Date();
  const currentHour = d.getTime();
  const startHour = new Date(firstPunch).getTime() - 19800000;
  const spendTime = new Date(currentHour - startHour).toUTCString().substring(17, 22)
  console.log(spendTime)
  console.log(startHour)
  return (
    <>

      <div className="col-xl-9 col-lg-8 col-md-12">
        <div className="quicklink-sidebar-menu ctm-border-radius shadow-sm bg-white card grow">
          <div className="card-body">

            <ol className="breadcrumb no-bg-color d-inline-block p-0 m-0 mb-2">
              <li className="breadcrumb-item d-inline-block"><Link to="/employee" className="text-dark">Home</Link></li>
              <li className="breadcrumb-item d-inline-block active">Dashboard</li>
            </ol>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 d-flex">
            <div className="card shadow-sm flex-fill grow">
              <div className="card-header">
                <h4 className="card-title mb-0 d-inline-block">Timesheet </h4>
              </div>
              <div className="card-body">
                <div className="punch-det">
                  <h6 className='font-weight-bold'>Punch In at</h6>
                  <p>{firstPunch}</p>
                </div>
                <div className="punch-info">
                  <div className="punch-hours">
                    <span>{spendTime.replace(":", ".")} Hrs</span>
                  </div>
                </div>


                <div className="statistics">
                  <div className="row">
                    <div className="col-md-12 col-12 text-center">
                      <div className="stats-box font-weight-bold">
                        <p>Break</p>
                        <p>30 min</p>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card shadow-sm flex-fill grow">
              <div className="card-header">
                <h4 className="card-title mb-0 d-inline-block">Today Activity</h4>
              </div>
              <div className="card-body">
                <ul className="res-activity-list">

                  {data && data.map((items) => {
                    var date = items.LogDateTime;
                    const dt = new Date(date).toUTCString()
                    return (
                      <>
                        <li>
                          <p className="mb-0 font-weight-bold">Punch {items.Direction} at</p>
                          <p className="res-activity-time">
                            <i className="fa fa-clock-o"></i>
                            {dt}
                          </p>
                        </li>
                      </>
                    )

                  })}


                </ul>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card shadow-sm flex-fill grow">
              <div className="card-header">
                <h4 className="card-title mb-0 d-inline-block">Total Leaves You Have</h4>
              </div>
              <div className="card-body">
                <div class="alert alert-primary" role="alert">
                  <p><strong>Sick Leaves (SKL)</strong>-{leavestime.SKL}</p>
                </div>
                <div class="alert alert-danger" role="alert">
                  <p><strong>Casual Leaves (CSL)</strong>-{leavestime.CSL}</p>
                </div>
                <div class="alert alert-success" role="alert">
                  <p><strong>Privilege Leaves (PVL)</strong>-{leavestime.PVL}</p>
                  <span>(Confirmed Employee)</span>
                </div>
                <div class="alert alert-warning" role="alert">
                  <p><strong>Maternity Leaves (MTL)</strong>-{leavestime.MTL}</p>
                  <span>(Married Women)</span>
                </div>
                <div class="alert alert-dark" role="alert">
                  <p><strong>Marriage Leaves (MGL)</strong>-{leavestime.MGL}</p>
                </div>
              </div>
            </div>
          </div>






        </div>
      </div>
    </>
  );
}

export default EmployeeDashboard;