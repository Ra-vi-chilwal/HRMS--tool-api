import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import config from '../../config';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AddDesignation() {
    const [data,setData]=useState("")
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
    const initialValues = {
        department: "",
        designation:"",
        
    }
    
    const validationSchema = Yup.object({
        department:Yup.string().required('Department is required'),
        designation:Yup.string().required('Designation is required'),

    })

    var token = localStorage.getItem("token") || "";
    const onSubmit = (values) => {
        console.log(values)
        axios.post(`${config.API_URL}/designation`, { ...values }, { headers: { Authorization: `Bearer ${token}` } })
        .then((result) => {

            if (result.data.code=="CREATED") {
                toast.success("Designation added successfully", {
                     autoClose: 1000,
                })
                // window.location.replace("/add-employee");
            }

            else if (result.data.code === "DUPLICATION") {
                toast.warning("Data already exists", {
                    autoClose: 1000,
                })
            }
            else {
                toast.error("Somthing went wrong.")
            }
         
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
                                                    Designation
                                                    <span className="text-danger">*</span>
                                                </label>
                                                <Field type="text" className="form-control" placeholder="Designation" name="designation" />
                                                <ErrorMessage
                                                    name="designation"
                                                    render={(msg) => (
                                                        <small className="text-danger">{msg}</small>
                                                    )} />
                                            </div>
                                            <div className="col-md-6 form-group">
                                                <label>
                                                    Department
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

export default AddDesignation;