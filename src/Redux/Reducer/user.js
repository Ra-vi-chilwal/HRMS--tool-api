import {
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_LOG_OUT,
} from "../Constant/user";

const token = localStorage.getItem("token") || " ";
const userInfoReducer = (state = { userInfo: { token: token } }, action) => {
  switch (action.type) {
    case USER_INFO_REQUEST:
      return { loading: true };
    case USER_INFO_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_INFO_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOG_OUT:
      return { loading: false, logout: "loggedOut" };
    default:
      return state;
  }
};
export { userInfoReducer };