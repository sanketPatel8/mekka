import { useRouter } from "next/router";
import {  useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {  
    

    const context = useContext(AuthContext)

    const existingUser = typeof window != 'undefined' && (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) || "{}";
    const [user, setUser] = useState(existingUser);

    useEffect(() => {
      if (existingUser) {
        setUser(existingUser);
      }
    }, []);
  
    return { user, ...context };
  
}