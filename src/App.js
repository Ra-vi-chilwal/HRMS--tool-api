import logo from './logo.svg';
import './App.css';
import Loader from './Components/Includes/Loader';
import Header from './Components/Includes/Header';
import { Navigate, Routes, Route } from 'react-router-dom';
import EmployeeDashboard from './Components/Dashboard/EmployeeDashboard';
import axios from 'axios';
import config from "./config";
import { useEffect, useState } from 'react';
import SideBar from './Components/Includes/SideBar';
import Profile from './Components/Profile/Profile';
import Leaves from "./Components/Leave/Leaves"
import EmployeeDetails from './Components/Dashboard/EmployeeDetails';
import Salary from './Components/salarySlip/Salary';
import AddEmployee from './Components/Dashboard/AddEmployee';
import Attendance from './Components/Attendance/Attendance';
import UnAuthorized from './Components/Shared/UnAuthorized';
import ViewDetail from './Components/Dashboard/ViewDetail';
import {useDispatch,useSelector} from "react-redux";
import { verifyUserInfo } from "./Redux/Action/user";
import { setAutoFreeze } from 'immer';
function App(){
const [user,setUser]=useState(null)

const dispatch = useDispatch();
const { loading, userInfo } = useSelector((store) => store.userInfo);
dispatch(verifyUserInfo({token: userInfo.token}));
console.log(userInfo)
  return (

    <div className="App">
      <>
      <h1>dfdj</h1>
      </>
      {userInfo === "dk" ? <Loader /> : user === false ? (<Navigate to={{ pathname: "/login" }} />) : (
        <div className="inner-wrapper">
      
           <Header user={user} />
          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
                  <SideBar user={user} />
                </div>
                <Routes>
                  <Route path='/leaves' element={<Leaves user={user} />}></Route>
                  <Route path='/profile' element={<Profile props={user} />}></Route>
                  <Route path='/employee' element={user.role !== "user" ? <EmployeeDetails /> : <UnAuthorized />}></Route>
                  <Route path='/salary' element={user.role !== "user" ? <Salary props={user} /> : <UnAuthorized />}></Route>
                  <Route path="/attendance" element={<Attendance props={user} />}></Route>
                  <Route path='/add-employee' element={<AddEmployee />}></Route>
                  <Route path='/viewdetail' element={user.role !== "user" ? <ViewDetail  props={user} /> : <UnAuthorized />}></Route>
                  <Route path='/' element={<EmployeeDashboard props={user} />}></Route>
                </Routes>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </div >






    // <div className="App">
    //    {user === null ? <Loader/>: user === false ? (<Navigate to={{ pathname: "/login" }} />) : (







    //   <div className="inner-wrapper">

    //     <Header/>
    //     <div className="page-wrapper">

    //  <div className="col-xl-3 col-lg-4 col-md-12 theiaStickySidebar">
    //<SideBar />
    //</div>
    //       <Routes>
    //         <Route path='/employee' element={<EmployeeDashboard props ={{user:user}}/>}></Route>
    //       </Routes>
    //     </div>
    //   </div>
    //    )}
    // </div>
  );
}

export default App;
