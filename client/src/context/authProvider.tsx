import axios from "axios";
import {createContext, useContext, useEffect, useMemo, useState, Context} from "react";

//They got rid of explicit parameterless createContext so I have to do this
const AuthContext : Context<{ token: string; setToken: (newToken: string) => void;}> = createContext({token: "error",setToken: (newToken:string)=>{console.log("error in setting");}});


const AuthProvider = ({children}:any) => 
{
    //useContext(AuthContext);
    //console.log("AuthProvider called");
    let [token, setToken_] = useState(localStorage.getItem("token"));
    if(!token)
        token = "";

    const setToken = (newToken : string) => 
    {
        setToken_(newToken);
    };
  
    useEffect(() => {
        //console.log("Token Changed");
        if (token && token != "") 
        {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token',token);
        }  
        else 
        {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token')
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
          token,
          setToken,
        }),
        [token]
      );
    
      //return contextValue;


    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};
  
export function fetchAuthorizationToken() : string
{ 
    const [token, setToken] = useState(localStorage.getItem("token"));
    if(!token)
        return "";
    return token;
};

export const useAuth = () => 
    {
    return useContext(AuthContext);
  };

export default AuthProvider;
