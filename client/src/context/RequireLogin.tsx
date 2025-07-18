import { fetchAuthorizationToken } from "./authProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";


function RequireLogin({ children })
 {
    //const navigate=useNavigate();
    //console.log("AuthChecked!");
    const token = fetchAuthorizationToken();
    //const location = useLocation();
    //navigate('/home');
    //console.log(token);
    
    return token!="" ? children : <Navigate to="/login" replace />;
  }

  export default RequireLogin