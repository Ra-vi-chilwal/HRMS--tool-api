import React from 'react'
import { Route, Routes,Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import App from './App';
import Login from './Components/Authentication/Login';
import { verifyUserInfo } from "./Redux/Action/user";
import Logout from './Components/Authentication/Logout';
function Root() {
  const { loading, userInfo, error } = useSelector((state) => state.userInfo);
  let navigate = useNavigate();
  const dispatch = useDispatch();


      // dispatch(verifyUserInfo({ token: userInfo.token }));
   
  
  return (
<Routes>
      <Route exact path="/login" element={<Login />}></Route>
      <Route exact path="/logout" element={<Logout />}></Route>
      <Route exact path='*' element={<App />}></Route>
    </Routes>
  )
}

export default Root