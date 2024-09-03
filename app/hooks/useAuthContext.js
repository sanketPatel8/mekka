import { useRouter } from "next/router";
import {  useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {  
    

    const context = useContext(AuthContext)

    const [user, setUser] = useState(null);

    useEffect(() => {
      const existingUser = localStorage.getItem('user');
      if (existingUser) {
        setUser(JSON.parse(existingUser));
      }
    }, []);
  
    return { user, ...context };
  
}