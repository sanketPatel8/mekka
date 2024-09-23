import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/authContext";

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }
  return context;
}