import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';

function Useauthredirect() {
    const authContext = useContext(AuthContext);

    const handleRedirect = (status) => {
        if (status === 404) {
            if (authContext.user) {
                // window.location.href = "/vendor/login";
                window.location.href = "/partner-login";
            } 
           
        } else if (status === 401  && window.location.pathname !== "/partner-login") {
            if (authContext.user) {
                // window.location.href = "/vendor/login";
                window.location.href = "/partner-login";
            } 
      
        }

        if (authContext.user === null ) {
            console.log(authContext.user , "user not found")
            window.location.href = "/partner-login";
          }
          
      
    };

  

    return { handleRedirect };

}

export default Useauthredirect
