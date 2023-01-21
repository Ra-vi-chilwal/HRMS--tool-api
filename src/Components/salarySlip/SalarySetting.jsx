import React from 'react'
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import config from "../../config";
function SalarySetting() {
  var token = localStorage.getItem("token") || "";
  const [info, setInfo] = useState("");
 const onSubmit =(values)=>{
  console.log(values)
  axios
      .post(`${config.API_URL}/salary-setting/add`,{...values} ,{
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((result) => {
        setInfo(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
}
  const initialValues = {
   da:"",
   hra:"",
   employeeShare:"",
   organizationShare:"",
   conveyance:"",
   allowance:'',
  };
  return (
    <>
      <ToastContainer />
      <div className='row'>
        <div className="col-xl-12 col-lg-12 col-md-12">
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="card ctm-border-radius shadow-sm grow">
                <div className="card-header">
                  <h4 className="card-title mb-0 d-inline-block">Salary Settings</h4>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className='col-md-12'>
                      <h6 className='font-weight'>DA and HRA</h6>
                    </div>
                    <div className="col-6 form-group">
                      <Field type="number" name="da" className="form-control datetimepicker" placeholder="DA (%)" />
                    </div>
                    <div className="col-6 form-group">
                      <Field type="number" name="hra" className="form-control datetimepicker" placeholder="HRA (%)" />
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-md-12'>
                      <h6 className='font-weight'>Provident Fund Settings</h6>
                    </div>
                    <div className="col-6 form-group">
                      <Field type="number" name="employeeShare" className="form-control datetimepicker" placeholder="Employee Share (%)" />
                    </div>
                    <div className="col-6 form-group">
                      <Field type="number" name="organizationShare" className="form-control datetimepicker" placeholder="Organization Share (%)" />
                    </div>
                  </div>
                  <div className="row">
                    <div className='col-md-12'>
                      <h6 className='font-weight'>Conveyance Allowance</h6>
                    </div>
                    <div className="col-6 form-group">
                      <Field type="number" name="conveyance" className="form-control datetimepicker" placeholder="Conveyance (%)" />
                    </div>
                    <div className="col-6 form-group">
                      <Field type="number" name="allowance" className="form-control datetimepicker" placeholder="Other Allowance (%)" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row grow">
                <div className="col-12">
                  <div className="submit-section text-center btn-add">
                  <button
                        className="btn btn-theme button-1 text-white ctm-border-radius mt-4 ml-3"
                        type="submit"
                        
                      >
                       Add
                      </button>

                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

export default SalarySetting;