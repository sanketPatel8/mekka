
import { useContext } from "react"
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  console.log("context" , context);
  

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }
  return context;
}