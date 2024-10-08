import { createContext, useContext, useEffect, useState } from 'react';
import { GET } from '@/pages/api/get';
import { useAuthContext } from '@/hooks/useAuthContext';
import { useRouter } from 'next/router';
import { POST } from '../utils/api/post';

// Create separate contexts for user and customer
const UserProfileContext = createContext();

// Export the contexts
export const useUserProfile = () => useContext(UserProfileContext);

// Create a provider for each context
export const UserProfileProvider = ({ children }) => {
  const router = useRouter();
//   const { user, dispatch } = useAuthContext();
  const [profileImage, setProfileImage] = useState({});

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
          setProfileImage(userProfile.profile_image)
        } else {
          console.error("Unexpected response structure:", response);
        }
    
        return response.user ? [response.user] : [];
      };

      fetchProfile();
  }, [customer]);

  return (
    <UserProfileContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </UserProfileContext.Provider>
  );
};