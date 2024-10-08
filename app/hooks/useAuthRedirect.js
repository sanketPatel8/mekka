import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';

function Useauthredirect() {
    const authContext = useContext(AuthContext);
    console.log(authContext , "authContext")

    const handleRedirect = (status) => {
        if (status === 404) {
            console.log(status , "404")
            if (authContext.user) {
                // window.location.href = "/vendor/login";
                window.location.href = "/partner-login";
            } 
            else if (authContext.customer) {
                window.location.href = "/login";
            }
        } else if (status === 401 && window.location.pathname !== "/login" && window.location.pathname !== "/partner-login") {
       
      
        }

        if (authContext.user === null ) {
            console.log(authContext.user , "user not found")
            window.location.href = "/partner-login";
          }
          
        // if (!authContext.user) {
        //     console.log(authContext.user , "user not found")
        //     window.location.href = "/partner-login";
        //   }
        //   if(!authContext.customer) {
        //     console.log(authContext.customer , "customer not found")
        //     window.location.href = "/login";
        //   }
    };

    // const handlePaidRedirect = (isPaid) => {
    //     if (isPaid === 0) {
    //         window.location.href = "/vendor/unauthorised";
    //     }
    // };


    return { handleRedirect };

}

export default Useauthredirect
