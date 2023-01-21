import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import Unauthorize from "./Unauthorize";
import permission from "./src/permission"
function ProtectedRoute(props) {
    console.log(permission)
//   const { loading, userInfo } = useSelector((state) => state.userInfo);
//   const { component: Component, permission, path, ...rest } = props;
//   let userPermission = [];
//   if (userInfo && userInfo.token != "" && userInfo.permission) {
//     console.log(userInfo.permission,'sdh')
//     userPermission = [
//       { label: "home", value: "home" },
//       { label: "search-result", value: "search-result" },
//       ...userInfo.permission,
//     ];
//   }
  return (
    <>
      {userInfo && userInfo.verified && (
        <Route
          path={path}
          render={(props) =>
            userPermission.some((ele) => ele.value === permission) ? (
              <>
                <Component {...props} {...rest}></Component>
              </>
            ) : (
              <Unauthorize />
            )
          }
        />
      )}
    </>
  );
}

export default ProtectedRoute;
