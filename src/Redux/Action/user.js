import {
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_LOG_OUT,
} from "../Constant/user";
import axios from "axios";
import config from "../../config";

const   fetchUserInfo = (values) => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_REQUEST });
    const data = await axios.post(`${config.API_URL}/auth/login`, values);
    const userInfo = data.data;

    if (userInfo.code === "FETCHED") {

      localStorage.setItem("token",(userInfo.token));
      dispatch({ type: USER_INFO_SUCCESS, payload: userInfo });
   
    } else {
   
      dispatch({ type: USER_INFO_SUCCESS, payload: userInfo });
      setTimeout(() => {
       
      }, 3000);
    }
  } catch (err) {
    dispatch({ type: USER_INFO_FAIL, payload: err });
  }
};

const verifyUserInfo = (values) => async (dispatch) => {
  try {
    dispatch({ type: USER_INFO_REQUEST });
    const data = await axios.post(`${config.API_URL}/verify`, values);
    if (data.data && data.data.code === "JWT") {
      dispatch({ type: USER_INFO_FAIL, payload: data.data.message });
    } 
    else {
      const userInfo = data.data && data.data.body;
      localStorage.setItem("token", JSON.stringify(userInfo.token));
      dispatch({ type: USER_INFO_SUCCESS, payload: userInfo });
    }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      dispatch({ type: USER_INFO_FAIL, payload: "401" });
    } else {
      dispatch({ type: USER_INFO_FAIL, payload: err });
    }
  }
};

const logOut = (values) => async (dispatch) => {
  axios
    .post(
      `${config.API_URL}/event`,
      {
        actionType: "LoggedOut",
        data: { email: values.email },
      },
      {
        headers: { Authorization: `Bearer ${values.token}` },
      }
    )
    .then((result) => {
      localStorage.removeItem("token");
      dispatch({ type: USER_LOG_OUT });
    })
    .catch((error) => {
      localStorage.removeItem("token");
    });
};

export { fetchUserInfo, verifyUserInfo, logOut };