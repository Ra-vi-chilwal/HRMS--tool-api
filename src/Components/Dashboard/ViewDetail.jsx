import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import config from "../../config";
import axios from "axios";
const ViewDetail = (props) => {
    const [data, setData] = useState("")
    var token = localStorage.getItem("token") || "";
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        axios.get(`${config.API_URL}/auth/get`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        ).then((result) => {
            console.log(result)
            setLoader(false)
            setData(result.data.data)
        }).catch((error) => {
            console.log(error)
            setLoader(false)
        })

    }, [])
    const location = useLocation();
    const user = location.state.item;
    console.log(user)
    console.log(data)
    const filterData = data && data.filter(items => items.empId == user.reportingManager);
   console.log(filterData)
    return (
        <>
            <div className="col-md-9">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card ctm-border-radius shadow-sm grow">
                            <div className="card-header">
                                <h4 className="card-title mb-0">View Detail</h4>
                            </div><br />
                            <div className="row">
                                <div className="col-md-4 col-md-4 col-md-6 d-flex ">
                                    <div className="card flex-fill ctm-border-radius shadow-sm grow ">
                                        <div className="card-header">
                                            <h6 className="card-title mb-0">Basic Information</h6>
                                        </div>
                                        <div className="card-body ">

                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">First Name : </span>{user && user.firstName} </p>
                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Last Name :</span> {user && user.lastName} </p>

                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Designation
                                                : </span>{user && user.designation && user.designation.designation}</p>
                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Department : </span>{user && user.department && user.department.departmentName}</p>

                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Date of Birth : </span> {user && user.dob}</p>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-md-4 col-md-6 d-flex">
                                    <div className="card flex-fill  ctm-border-radius shadow-sm grow">
                                        <div className="card-header">
                                            <h6 className="card-title mb-0">Contact</h6>
                                        </div>
                                        <div className="card-body ">

                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Official Email :</span>{user && user.email} </p>


                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Office Location : </span>{user && user.officeLocation}</p>
                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Employee Id : </span>{user && user.empId}</p>
                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Date of Joining : </span> {user && user.doj}</p>
                                            <p className="card-text mb-3"><span className="text-primary font-weight-bold">Reporting Manager : </span> {filterData && filterData[0] && filterData[0].firstName}  {filterData && filterData[0] && filterData[0].lastName}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 col-md-4 col-md-6 d-flex">
                                    <div class="card flex-fill ctm-border-radius shadow-sm grow">
                                        <div class="card-header">
                                            <h6 class="card-title mb-0">Bank Details</h6>
                                        </div>
                                        <div class="card-body ">
                                            <p class="card-text mb-3"><span class="text-primary font-weight-bold">Name :  </span>{user && user.bankName}</p>
                                            <p class="card-text mb-3"><span class="text-primary font-weight-bold">Account Number :  </span>{user && user.accountNumber}</p>
                                            <p class="card-text mb-3"><span class="text-primary font-weight-bold">IFSC code : </span>{user && user.ifscCode}</p>
                                            <p class="card-text mb-3"><span class="text-primary font-weight-bold">Pan card :  </span>{user && user.pancard}</p>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>





    )
}

export default ViewDetail;