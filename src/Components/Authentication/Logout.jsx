import React from "react";
import { Navigate } from "react-router-dom";

function Logout() {
  var token =(localStorage.getItem("token")) || " ";
  console.log(token)
  localStorage.removeItem("token");
  const auth = "LoggedOut";
  return (
    <div>
      {auth === "LoggedOut" ? (
        <Navigate
          replace
          to={{
            pathname: "/login",
          }}
        />
      ) : null}
    </div>
  );
}
export default Logout;