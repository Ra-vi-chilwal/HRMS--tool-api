import React, { useEffect, useState } from 'react'

import { Formik, Field, Form, ErrorMessage } from "formik";
import { useNavigate } from 'react-router';
import * as Yup from "yup";
import axios from 'axios';
import config from '../../config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from 'react-router-dom';
const Employee = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const user = location.state;
 console.log(user)
    const [data, setData] = useState([])
    const [con, setConfig] = useState([])
    const [role, setRole] = useState([])
    var token = localStorage.getItem("token") || "";
    useEffect(() => {
        axios.get(`${config.API_URL}/department`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            setData(result.data.data);
           
         
        }).catch((error) => {
            console.log(error)

        })
    }, [token])
    useEffect(() => {
        axios.get(`${config.API_URL}/designation`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            setConfig(result.data.data);
        }).catch((error) => {
            console.log(error)

        })
    }, [token])
    useEffect(() => {
        axios.get(`${config.API_URL}/role`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((result) => {
            setRole(result.data.data);
        }).catch((error) => {
            console.log(error)

        })
    }, [token])

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        empId: "",
        ifscCode: "",
        role: "",
        doj: "",
        empId: "",
        salary: "",
        officeLocation: "",
        reportingManager: "",
        designation: "",
        department: "",
        bankName: "",
        accountNumber: "",
        ifscCode: "",
        biometricId: "",
        pancard: "",
        gender: "",
        dob: ""
    }




    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        email: Yup.string().email("Must be an email").required('Email id is required'),
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string().required('Confirm password is required'),
        empId: Yup.string().required('Employee id is required'),
        dob: Yup.string().required('Date of Birth is required'),
        doj: Yup.string().required('Date of Joining is required'),
        empId: Yup.string().required('EmpId is required'),
        salary: Yup.string().required('Salary is required'),
        officeLocation: Yup.string().required('Office-Location  is required'),
        reportingManager: Yup.string().required('Reportmanager is required'),
        designation: Yup.string().required('Designation is required'),
        department: Yup.string().required('Department is required'),
        bankName: Yup.string().required('Bank Name is required'),
        accountNumber: Yup.string().required('Account Number  is required'),
        ifscCode: Yup.string().required('Bank IFSC code  is required'),
        biometricId: Yup.string().required('BiometricId  is required'),
        role: Yup.string().required('Role  is required'),
        pancard: Yup.string().required('Pan Number  is required'),
        gender: Yup.string().required("Gender is required"),
    })


    const onSubmit = (values, { resetForm }) => {
        if (values.password != values.confirmPassword) {
            toast.error("Both Password are not match", {
                position: "top-right",
                autoClose: 2000,
            });
        } else {
            axios.post(`${config.API_URL}/auth/register`, { ...values }, { headers: { Authorization: `Bearer ${token}` } })
                .then((result) => {
                    
                    if (result.data.code==="CREATED") {
                        toast.success("Created", {
                            position: "top-right",
                            autoClose: 1000,
                            onClose: () => {
                              navigate("/employee")
                            }
                        })
                    }
                    else if (result.data.code === "DUPLICATION") {
                        toast.warning("Data already exists", {
                            autoClose: 1000,
                        })
                    }
                    else {
                        toast.error("Somthing went wrong.")
                    }
                    resetForm({ values: "" })
                }).catch((err) => {
                    console.log(err)
                })
        }

    }

    return (
        <>

            <ToastContainer />
            <div className="col-xl-12 col-lg-8  col-md-12">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>

                    <Form>
                        <div className="accordion add-employee" id="accordion-details">
                            <div className="card shadow-sm grow ctm-border-radius">
                                <div className="card-header" id="basic1">
                                    <h4 className="cursor-pointer mb-0">
                                        <a className=" coll-arrow d-block text-dark" href="javascript:void(0)" data-toggle="collapse" data-target="#basic-one" aria-expanded="true">
                                            Basic Details
                                            <br /><span className="ctm-text-sm">Organized and secure.</span>
                                        </a>
                                    </h4>
                                </div>
                                <div className="card-body p-0">
                                    <div id="basic-one" className="collapse show ctm-padding" aria-labelledby="basic1" data-parent="#accordion-details">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    First Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="First Name" name="firstName" />
                                                <ErrorMessage
                                                    name="firstName"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Last Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="Last Name" name="lastName" />
                                                <ErrorMessage
                                                    name="lastName"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Email
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="email" className="form-control" placeholder="Email" name="email" />
                                                <ErrorMessage
                                                    name="email"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Password
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="password" className="form-control" placeholder="Password" name="password" />
                                                <ErrorMessage
                                                    name="password"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Confirm Password
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" />
                                                <ErrorMessage
                                                    name="confirmPassword"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Joining Date
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field className="form-control" type="date" placeholder="Joining Date" name="doj" />
                                                <ErrorMessage
                                                    name="doj"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-6 form-group mb-0">
                                                <label>
                                                    Gender
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field className="form-control select" name="gender" as="select">
                                                    <option selected>select gender</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>

                                                </Field>
                                                <ErrorMessage
                                                    name="gender"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-6 form-group mb-0">
                                                <label>
                                                    Date Of Birth
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field className="form-control select" type="date" name="dob" placeholder="Enter Your Date Of Birth" >


                                                </Field>
                                                <ErrorMessage
                                                    name="dob"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-sm grow ctm-border-radius">
                                <div className="card-header" id="headingTwo">
                                    <h4 className="cursor-pointer mb-0">
                                        <a className="coll-arrow d-block text-dark" href="javascript:void(0)" data-toggle="collapse" data-target="#employee-det">
                                            Employee Details
                                            <br /><span className="ctm-text-sm">Let everyone know the essentials so they're fully prepared.</span>
                                        </a>
                                    </h4>
                                </div>
                                <div className="card-body p-0">
                                    <div id="employee-det" className="collapse show ctm-padding" aria-labelledby="headingTwo" data-parent="#accordion-details">
                                        <div className="row">

                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Employee Id
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="Employee Id" name="empId" />
                                                <ErrorMessage
                                                    name="empId"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Select Department
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field className="form-control select" name="department" as="select">
                                                    <option selected>Department </option>
                                                    {data && data.map((items) => {
                                                        return (
                                                            <>
                                                                < option value={items._id}>{items.departmentName}</option>
                                                            </>
                                                        )
                                                    })}

                                                </Field>
                                                <ErrorMessage
                                                    name="department"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>


                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Biometric Id
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="Biometric Id" name="biometricId" />
                                                <ErrorMessage
                                                    name="biometricId"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Salary Amount
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="Salary Amount" name="salary" />
                                                <ErrorMessage
                                                    name="salary"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Designation
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field className="form-control select" name="designation" as="select">

                                                    <option selected> Select Designation </option>
                                                    {con && con.map((items) => {
                                                        return (
                                                            <>
                                                                < option value={items._id}>{items.designation}</option>
                                                            </>
                                                        )
                                                    })}

                                                </Field>
                                                <ErrorMessage
                                                    name="designation"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>

                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Role
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field className="form-control select" name="role" as="select">
                                                    <option selected>Select Role </option>
                                                    {role && role.map((items) => {
                                                        return (
                                                            <>
                                                                < option value={items._id}>{items.role}</option>
                                                            </>
                                                        )
                                                    })}

                                                </Field>
                                                <ErrorMessage
                                                    name="role"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-sm grow ctm-border-radius">
                                <div className="card-header" id="headingThree">
                                    <h4 className="cursor-pointer mb-0">

                                        <a className="coll-arrow d-block text-dark" href="javascript:void(0)" data-toggle="collapse" data-target="#term-office">
                                            Teams and Offices
                                            <br /><span className="ctm-text-sm">Keep things tidy — and save time setting approvers and public holidays.</span>
                                        </a>
                                    </h4>
                                </div>
                                <div className="card-body p-0">
                                    <div id="term-office" className="collapse show ctm-padding" aria-labelledby="headingThree" data-parent="#accordion-details">
                                        <div className="row">
                                            <div className="col-6 form-group mb-0">
                                                <label>
                                                    Office Location
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field className="form-control select" name="officeLocation" as="select">
                                                    <option selected>Office Location</option>
                                                    <option value="Gurugram">Gurgaon</option>
                                                    <option value="mumbai">Mumbai</option>
                                                    <option value="hyderabad">hyderabad</option>
                                                </Field>
                                                <ErrorMessage
                                                    name="officeLocation"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>                                       
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Reporting Manager
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field className="form-control" placeholder="Enter your Reporting Manager" name="reportingManager" as="select" >
                                                <option selected>--Select Reporting Manager--</option>
                                                    {user && user.map((items) => {
                                                        return (
                                                            <>
                                                                < option value={items.empId}>{items.firstName}  {items.lastName}</option>
                                                            </>
                                                        )
                                                    })}
                                                    </Field>
                                                <ErrorMessage
                                                    name="reportingManager"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card shadow-sm grow ctm-border-radius">
                                <div className="card-header" id="headingFour">
                                    <h4 className="cursor-pointer mb-0">
                                        <a className="coll-arrow d-block text-dark" href="javascript:void(0)" data-toggle="collapse" data-target="#salary_det">
                                            Salary Details
                                            <br /><span className="ctm-text-sm">Stored securely</span>
                                        </a>
                                    </h4>
                                </div>
                                <div className="card-body p-0">
                                    <div id="salary_det" className="collapse show ctm-padding" aria-labelledby="headingFour" data-parent="#accordion-details">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    PAN Card Number
                                                    <span className="text-danger"></span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="PAN number" name="pancard" />
                                                <ErrorMessage
                                                    name="pancard"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Bank Name
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="Bank Name" name="bankName" />
                                                <ErrorMessage
                                                    name="bankName"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Account Number
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="Account Number" name="accountNumber" />
                                                <ErrorMessage
                                                    name="accountNumber"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    IFSC Code
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="IFSC Code" name="ifscCode" />
                                                <ErrorMessage
                                                    name="ifscCode"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="submit-section text-center btn-add">
                                    <button type='reset' className="btn btn-theme text-white ctm-border-radius button-1 mr-2">Reset</button>
                                    <button type="submit" className="btn btn-theme text-white ctm-border-radius button-1 mr-2" >Submit</button>

                                </div>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        </>
    );
}

export default Employee;