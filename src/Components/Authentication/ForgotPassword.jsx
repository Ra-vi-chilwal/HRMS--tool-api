import React from 'react'
import { Link } from 'react-router-dom';
function ForgotPassword() {
  return (
    <div>
        <div className="inner-wrapper login-body grow">
        <div className="login-wrapper">
          <div className="container">
            <div className="loginbox shadow-sm">
              <div className="login-left">
                <img className="img-fluid w-50" src="assets/img/logo.png" alt="Logo" />
              </div>
              <div className="login-right">
                <div className="login-right-wrap">
                  <h1>Forgot Password?</h1>
                  <p className="account-subtitle">Enter your email to get a reset link</p>
                  <form action="">
                    <div className="form-group">
                      <input className="form-control" type="text" placeholder="Email" />
                    </div>
                    <div className="form-group mb-0">
                      <button className="btn btn-theme ctm-border-radius text-white btn-block button-1" type="submit">Reset Password</button>
                    </div>
                  </form>
                  <div className="text-center dont-have">Remember your password? <Link to="/login">Login</Link></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;