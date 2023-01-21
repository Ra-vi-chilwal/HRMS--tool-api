import React from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';
import config from '../../config';

function ChangePassword() {

  var token = localStorage.getItem("token") || "";

  const initialValues = {
    password: "",
    newpassword: "",
    confirmPassword: ""

  }

  const onSubmit = (values) => {
   if (values.newpassword != values.confirmPassword) {
      toast.error("Both Password are not match", {
        position: "top-right",
        autoclose: 1000,
      });
    } else {
      axios.post(`${config.API_URL}/auth/changepassword`, values, { headers: { Authorization: `Bearer ${token}` } })
        .then((result) => {
          console.log(result)
          if (result.data.code === "UPDATED") {
            toast.success("Password changed successfully", {
              autoClose: 1000,
            })
            window.location.replace("/profile");
          }
           else if (result.data.code === "PASSWORDMISMATCHED") {
            toast.warning("Your current password is incorrect", {
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
  }


  return (
    <>
      < ToastContainer />
      <div className="row">
        <div className="col-lg-12 d-flex">
          <div className="card ctm-border-radius shadow-sm grow flex-fill">
            <div className="card-header">
              <h4 className="card-title mb-0">Change Password</h4>
              <span className="ctm-text-sm">Your password needs to be at least 8 characters long.</span>
            </div>
            <Formik
              // validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={onSubmit}
            >
              <Form>
                <div className="card-body">
                  <div className="form-group">
                    <label> Current Password<span className="text-danger">*</span></label>
                    <Field type="password" className="form-control" placeholder="Current Password" name="password" />
                    <ErrorMessage
                      name="password"
                      render={(msg) => (
                        <small className="text-danger">{msg}</small>
                      )} />
                  </div>
                  <div className="form-group">
                    <label> New Password<span className="text-danger">*</span></label>
                    <Field type="password" className="form-control" placeholder="New Password" id="pwd" name="newpassword" />
                    <ErrorMessage
                      name="newpassword"
                      render={(msg) => (
                        <small className="text-danger">{msg}</small>
                      )} />
                  </div>
                  <div className="form-group">
                    <label> Confirm Password<span className="text-danger">*</span></label>
                    <Field type="password" className="form-control" placeholder="Confirm Password" name="confirmPassword" />
                    <ErrorMessage
                      name="confirmPassword"
                      render={(msg) => (
                        <small className="text-danger">{msg}</small>
                      )} />
                  </div>

                  <div className="text-center">
                    <button type="submit"
                     className="btn btn-theme button-1 ctm-border-radius text-white text-center">Change My Password</button>
                  </div>

                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;