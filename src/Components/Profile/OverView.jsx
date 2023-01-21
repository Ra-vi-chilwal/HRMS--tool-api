
import React, { useEffect, useState } from 'react'
import config from "../../config";
import axios from "axios";
function OverView(props) {
  var token = localStorage.getItem("token") || "";
  const [loader, setLoader] = useState(false);
  const [data, setData] = useState("")
  useEffect(() => {
    axios.get(`${config.API_URL}/auth/get`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    ).then((result) => {
      setLoader(false)
      setData(result.data.data)
    }).catch((error) => {
      console.log(error)
      setLoader(false)
    })

  }, [])


  const user = props.props

  const filterData = data && data.filter(items => items.empId === user.reportingManager);


  return (
    <>
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-6 d-flex">
          <div className="card flex-fill ctm-border-radius shadow-sm grow">
            <div className="card-header">
              <h4 className="card-title mb-0">Basic Information</h4>
            </div>
            <div className="card-body ">

              <p className="card-text mb-3"><span className="text-primary font-weight-bold">First Name : </span>{user && user.firstName}</p>
              <p className="card-text mb-3"><span className="text-primary font-weight-bold">Last Name : </span>{user && user.lastName}</p>
              <p className="card-text mb-3"><span className="text-primary font-weight-bold">Employee Id : </span>{user && user.empId}</p>
              <p className="card-text mb-3"><span className="text-primary font-weight-bold">Designation :  </span>{user && user.designation.designation}</p>
              <p className="card-text mb-3"><span className="text-primary font-weight-bold">Department : </span>{user && user.department.departmentName}</p>
              {/* <p className="card-text mb-3"><span className="text-primary font-weight-bold">Blood Group : </span> NA</p> */}
              <p className="card-text mb-3"><span className="text-primary font-weight-bold">Date of Joining : </span> {user.doj}</p>

            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 d-flex">
          <div className="card flex-fill  ctm-border-radius shadow-sm grow">
            <div className="card-header">
              <h4 className="card-title mb-0">Contact</h4>
            </div>
            <div className="card-body ">

              <p className="card-text mb-3"><span className="text-primary font-weight-bold">Email : </span>{user && user.email}</p>


              <p className="card-text mb-3"><span className="text-primary font-weight-bold">Office Location : </span>{user.officeLocation}</p>
              <p className="card-text mb-3"><span className="text-primary font-weight-bold">Reporting Manager : </span>{filterData && filterData[0] && filterData[0].firstName}  {filterData && filterData[0] && filterData[0].lastName}</p>
            </div>
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 d-flex">
          <div class="card flex-fill ctm-border-radius shadow-sm grow">
            <div class="card-header">
              <h4 class="card-title mb-0">Bank Details : </h4>
            </div>
            <div class="card-body ">
              <p class="card-text mb-3"><span class="text-primary font-weight-bold">Name :  </span>{user.bankName}</p>
              <p class="card-text mb-3"><span class="text-primary font-weight-bold">Account Number :  </span>{user.accountNumber}</p>
              <p class="card-text mb-3"><span class="text-primary font-weight-bold">IFSC code : </span>{user.ifscCode}</p>
              <p class="card-text mb-3"><span class="text-primary font-weight-bold">Pan card :  </span>{user.pancard}</p>

            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default OverView;