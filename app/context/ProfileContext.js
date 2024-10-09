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

      console.log("Response received:", response); // Log the API response

      // Handle case where response.user is a single object
      if (response.user && typeof response.user === "object") {
        const userProfile = response.user;
        setProfileImage(response?.user?.profile_image);

        console.log("Fetched profile image:", userProfile.profile_image); // Log profile image
      } else {
        console.error("Unexpected response structure:", response);
      }

      return response.user ? [response.user] : [];
    };

    fetchProfile();
  }, [customer]);

  console.log("Current profile image state:", profileImage); // Log the current state

  return (
    <UserProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserProfileContext.Provider>
  );
};
