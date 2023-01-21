import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import config from '../../config';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import AddDesignation from './AddDesignation';
function AddDepartment() {
    let navigate = useNavigate();
    const initialValues = {
        departmentName: ""
    }
    const validationSchema = Yup.object({
        departmentName: Yup.string().required('Department is required'),
    })

    var token = localStorage.getItem("token") || "";
    const onSubmit = (values) => {
        axios.post(`${config.API_URL}/department`, { ...values }, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {

                if (result.data.code == "CREATED") {
                    toast.success("Created", {
                        position: "top-right",
                        autoClose: 1000,
                       
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
                // resetForm({ values: "" })
            }).catch((err) => {
                console.log(err)
            })
    }

    return (
        <>

            <ToastContainer />
            <div className="col-xl-12 col-lg-8  col-md-12">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >

                    <Form>
                        <div className="accordion add-employee" id="accordion-details">
                            <div className="card shadow-sm grow ctm-border-radius">
                                <div className="card-header" id="basic1">
                                    <h4 className="cursor-pointer mb-0">
                                        <a className=" coll-arrow d-block text-dark" href="javascript:void(0)" data-toggle="collapse" data-target="#basic-one" aria-expanded="true">
                                            Depatment Details
                                            <br /><span className="ctm-text-sm">Fill me First</span>
                                        </a>
                                    </h4>
                                </div>
                                <div className="card-body p-0">
                                    <div id="basic-one" className="collapse show ctm-padding" aria-labelledby="basic1" data-parent="#accordion-details">
                                        <div className="row">
                                            <div className="col-md-12 form-group">
                                                <label>
                                                    Department
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="Enter Your Department" name="departmentName" />
                                                <ErrorMessage
                                                    name="departmentName"
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
    )
}

export default AddDepartment