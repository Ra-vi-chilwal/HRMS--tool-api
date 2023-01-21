import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
import * as Yup from 'yup';
import config from "../../config";
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserInfo } from "../../Redux/Action/user";
const  Login=() =>{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auth, setAuth] = useState(false);
  var token = localStorage.getItem("token") || " ";
  const { loading, userInfo, error } = useSelector((store) => store.userInfo);

  const initialValues = {
    email: "",
    password: ""
  }
  const validationSchema = Yup.object({
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().required().min(6, 'password is too short -should be 6 chars minimum'),
  });

  const onSubmit = (values) => {
    dispatch(fetchUserInfo(values));
  };

  return (
    <div>
      <ToastContainer />
      {userInfo && userInfo.code ==="FETCHED"?
      <Navigate replace to={{ pathname: "/" }} /> : (
        <div className="inner-wrapper login-body">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox shadow-sm grow">
              <div className="login-left">
                {/* <img className="img-fluid" src="assets/img/logoo.png" alt="Logo" /> */}
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Login</h1>
                  <p className="account-subtitle">Access to our dashboard</p>
                  {userInfo && userInfo.code === "NOTFOUND" ?
                    <div class="alert alert-danger" role="alert">
                    YOUR EMAIL & PASSWORD IS NOT FOUND
                  </div> : ""}
                  {userInfo && userInfo.code === "UNAUTHORISED" ?
                        <div class="alert alert-danger" role="alert">
                          INVALID CREDENTIALS . PLEASE CHECK!
                        </div> : ""}
                        {userInfo && userInfo.code === "ERROROCCURED" ?
                        <div class="alert alert-danger" role="alert">
                          SOMTHING WENT TO BE WRONG
                        </div> : ""}
                        <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}>
                           <Form action="/">
                           <div className="form-group">
                            <label>Email Address</label>
                            <Field className="form-control" type="text"
                              defaultValue="admin@dreamguys.in" placeholder="Email Address" name="email" />
                            <ErrorMessage
                              name="email"
                              render={(msg) => (
                                <small style={{ color: "red" }}>{msg}</small>
                              )} />
                          </div>
                          <div className="form-group">
                            <div className="row">
                              <div className="col">
                                <label>Password</label>
                              </div>
                              <div className="col-auto">
                              </div>
                            </div>
                            <div className="position-relative">
                              <Field className="form-control"
                                type="password" defaultValue={123456} id="password" placeholder="Password" name="password" />
                              <ErrorMessage
                                name="password"
                                render={(msg) => (
                                  <small style={{ color: "red" }}>{msg}</small>
                                )} />
                           
                            </div>
                          </div>
                    <div className="form-group">
                      <button className="btn btn-theme button-1 text-white ctm-border-radius btn-block" type="submit">Login</button>
                    </div>
                    </Form>
                  </Formik>
               
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}

export default Login;