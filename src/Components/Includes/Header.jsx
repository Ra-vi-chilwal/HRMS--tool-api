import React from 'react'
import Search from './Search';
import { Link } from 'react-router-dom';
import config from '../../config';
function Header(props) {
  const user = props && props.user;
  return (
    <>
      <header className="header">
        <div className="top-header-section">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-sm-3 col-6">
                <div className="logo my-3 my-sm-0">
                  <a href="index.html">
                    <img src="assets/img/logoi.png" alt="logo image" className="img-fluid" width={100} />
                  </a>
                </div>
              </div>
              <div className="col-lg-9 col-md-9 col-sm-9 col-6 text-right">
                <div className="user-block d-none d-lg-block">
                  <div className="row align-items-center">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      {/* <Search /> */}
                      <div className="user-notification-block align-right d-inline-block">
                        <ul className="list-inline m-0">
                          <li className="list-inline-item" data-toggle="tooltip" data-placement="top" title="Apply Leave">
                            <Link to="/" className="font-23 menu-style text-white align-middle">
                              <span className="lnr lnr-briefcase position-relative" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <div className="user-info align-right dropdown d-inline-block header-dropdown">
                        <Link to="javascript:void(0)" data-toggle="dropdown" className=" menu-style dropdown-toggle">
                          <div className="user-avatar d-inline-block">
                            <img src={config.API_URL + "/" + user.profile} alt="user avatar" className="rounded-circle img-fluid" width={55} />
                          </div>
                        </Link>
                        <div className="dropdown-menu notification-dropdown-menu shadow-lg border-0 p-3 m-0 dropdown-menu-right">
                          <Link className="dropdown-item p-2" to="/profile">
                            <span className="media align-items-center">
                              <span className="lnr lnr-user mr-3" />
                              <span className="media-body text-truncate">
                                <span className="text-truncate">Profile</span>
                              </span>
                            </span>
                          </Link>
                          {/* <Link className="dropdown-item p-2" to="#">
                            <span className="media align-items-center">
                              <span className="lnr lnr-cog mr-3" />
                              <span className="media-body text-truncate">
                                <span className="text-truncate">Settings</span>
                              </span>
                            </span>
                          </Link> */}
                          <Link className="dropdown-item p-2" to="/login">
                            <span className="media align-items-center">
                              <span className="lnr lnr-power-switch mr-3" />
                              <span className="media-body text-truncate">
                                <span className="text-truncate">Logout</span>
                              </span>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;