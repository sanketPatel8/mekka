import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';

function Useauthredirect() {
    const authContext = useContext(AuthContext);


    const handleRedirect = (status) => {
        if (status === 404) {
            if (authContext.user) {
                // window.location.href = "/vendor/login";
                window.location.href = "/login";
            } 
            // else if (authContext.customer) {
            //     window.location.href = "/login";
            // }
        } else if (status === 401 && window.location.pathname !== "/login") {
            window.location.href = "/login";
        } 
        if (!authContext.user) {
            window.location.href = "/login";
          }

    };

    // const handlePaidRedirect = (isPaid) => {
    //     if (isPaid === 0) {
    //         window.location.href = "/vendor/unauthorised";
    //     }
    // };


    return { handleRedirect };

}

export default Useauthredirect
