import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import config from "../../config";
import axios from "axios";
import Loader from '../Includes/Loader';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditEmployee from './EditEmployee';
import { useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
function EmployeeDetails(props) {
    const location = useLocation();
    const user = location.state;
console.log(user)
    let navigate = useNavigate();
    const [item, setItem]=useState("")
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState("")
    var token = localStorage.getItem("token") || "";
    useEffect(() => {
        deleteList()
    }, [])
    const deleteList = () => {
        setLoader(true)
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
    }
   
    const deleteUser = (_id) => {
        if(window.confirm("Are You sure you want to delete this Data ?")){
        // console.log(_id);
        axios.delete(`${config.API_URL}/auth/delete/` + _id, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                if (result.data.code === "FETCHED") {
                    toast.success("Employee deleted successfully", {
                        position: "top-right",
                        autoClose: 1000
                    });
                    deleteList()
                } else {
                    toast.error("Somthing went wrong.")
                }
            }
            )
            .catch((err) => {
                console.log(err);
            });
        }
        else{
            navigate(0)
        }
    }
    const editUser = (item) => {
        setItem(item)
    }
     const filterData = data && data.filter(items => items.empId ===user);
     console.log(filterData)
    return (
        <>
        <ToastContainer />
        <div class="col-xl-9 col-lg-8 col-md-12">
            <div class="quicklink-sidebar-menu ctm-border-radius shadow-sm grow bg-white card">
                <div class="card-body">
                    <ul class="list-group list-group-horizontal-lg">
                        <li class="list-group-item text-center active button-5"><a href="employees.html" class="text-white">All</a></li>
                    </ul>
                </div>
            </div>
            <div class="card shadow-sm grow ctm-border-radius">
                <div class="card-body align-center">
                    <h4 class="card-title float-left mb-0 mt-2">{data && data.length} People</h4>
                    <ul class="nav nav-tabs float-right border-0 tab-list-emp">

                        <li class="nav-item pl-3">
                            <Link to="/add-employee" state={data} class="btn btn-theme button-1 text-white ctm-border-radius p-2 add-person ctm-btn-padding"><i class="fa fa-plus"></i> Add Person</Link>
                        </li>
                    </ul>
                </div>
            </div>
            {loader === true ? <Loader /> :
            <div class="ctm-border-radius shadow-sm grow card">
                <div class="card-body">
                    <div class="row people-grid-row">
                        
                        {data && data.map((item) => {
                        
                            return (
                                <>
                                    <div class="col-md-6 col-lg-6 col-xl-4">
                                        <div class="card widget-profile last-card-row">
                                            <div class="card-body">

                                                <div class="pro-widget-content text-center">
                                                    <div class="profile-info-widget">
                                                    <div className="dropdown action-label drop-active edt">
                                                                    <a href="javascript:void(0)" data-toggle="dropdown"> <i class="fa fa-ellipsis-v text-info"></i></a>
                                                                    <div className="dropdown-menu edt1">

                                                                        <button className="dropdown-item small" data-toggle="modal" data-target="#largeModal" 
                                                                        onClick={() => editUser(item)}> <i class="fa fa-pencil-square-o text-success"></i>
                                                                        {/* <i  class="fa fa-square-o m-r-5 text-danger"></i>  */}
                                                             
                                                                             Edit</button>

                                                                        <button
                                                                            className="dropdown-item small"
                                                                            onClick={() => deleteUser(item._id)} >
                                                                            <i className="fa fa-trash-o m-r-5 text-danger" />
                                                                            Delete
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                        <Link to="" class="booking-doc-img">
                                                            <img src={item.profile && config.API_URL + "/" + item.profile} alt="User Image" />
                                                        </Link>
                                                        <div class="profile-det-info">
                                                            <h6 class="text-primary">{item.firstName}   {item.lastName} </h6>
                                                                <p class="mb-0 ctm-text-sm text-primary">{item.email}</p>
                                                            <div>
                                                                <Link to="/viewdetail" state={{item,filterData}} className='btn btn-outline-primary padding'>View</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>


                                </>
                            )
                        })}
                    </div>
                </div>
            </div>
}
        </div>
        <EditEmployee props={item}  />
        </>



    )
}

export default EmployeeDetails