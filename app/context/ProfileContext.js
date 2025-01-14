import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { POST } from "../utils/api/post";

// Create separate contexts for user and customer
const UserProfileContext = createContext();

// Export the contexts
export const useUserProfile = () => useContext(UserProfileContext);

// Create a provider for each context
export const UserProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState("");

  const { customer } = useAuthContext();


  useEffect(() => {
    const fetchProfile = async () => {
      const url = "my_profile";
      const response = await POST.request({
        url: url,
        token: `${customer?.authorisation.token}`,
      });


      // Handle case where response.user is a single object
      if (response.user && typeof response.user === "object") {
        const userProfile = response.user;

     
        setProfileImage(response?.user?.profile_image);

       } else {
        console.error("Unexpected response structure:", response);
      }

      return response.user ? [response.user] : [];
    };

    if(customer){

      fetchProfile();
    } 
    else{
      setProfileImage("");

    }
  }, [customer]);


  return (
    <UserProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserProfileContext.Provider>
  );
};
