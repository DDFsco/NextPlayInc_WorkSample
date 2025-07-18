import { fetchAuthorizationToken } from "./authProvider";
import { Navigate } from "react-router-dom";


function RequireLogout({ children })
 {
    const token = fetchAuthorizationToken();

   //  token!="" && alert("Please log out before using this route")

    return token=="" ? children : <Navigate to="/contest-lobby" replace />;
 }

  export default RequireLogout