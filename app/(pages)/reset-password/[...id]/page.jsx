"use client";
import { useTranslation } from '@/app/context/TranslationContext';
import { POST } from '@/app/utils/api/post';
import { showErrorToast, showSuccessToast } from '@/app/utils/tost';
import FooterTwo from '@/components/layout/footers/FooterTwo';
import Header1 from '@/components/layout/header/Header1';
import { responsiveFontSizes } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify';

function ResetPassword({params}) {

    const router = useRouter();

    const id = params.id[0];

    const encryptedId = id.split('_')[1];;
    console.log(encryptedId, 'encryptedString');
    const {translate} = useTranslation();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState("");

    const [error, setError] = useState("");

    const handlePasswordChange = (e) => {
        const { value } = e.target;
        setConfirmPassword(value);
        if (value !== password) {
          setError("Passwords do not match");
          }else{
            setError("");
          }
      }
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      
      const handlePassword = (e) => {
        const passwordValue = e.target.value;
        setPassword(passwordValue);
        if (!passwordRegex.test(passwordValue)) {
          setPasswordError("Invalid password. ");
        }  else {
          setPasswordError("");
        }
        if(!passwordValue){
          setPasswordError("");
        }
      };
 
      const handleSubmit = async(e) => {
        e.preventDefault();
        if (!password || !confirmPassword) {
            showErrorToast("Please fill all fields");
            return;
        }

       
 
      
        
        const formData = new FormData();
        formData.append("password", password);
        formData.append("id", encryptedId);

        const response = await POST.request({form:formData, url:"reset_password"})
        console.log(response, 'response')
        if(response){
            showSuccessToast(response.message);
            setPassword("");
            setConfirmPassword("");
        }
      }
  return (
    <>
        <ToastContainer/>
         <main>
        <Header1 />
        <section className="mt-header layout-pt-lg layout-pb-lg">
            <div className="container">
            <div className="text-center ">
              <h1 className="text-30"> Reset Password</h1>
              
            </div>
                <form 
                className='contactForm  rounded-12 px-60 py-30 md:px-25 '
                onSubmit={handleSubmit}
                >

                <div className="row justify-center">

                <div className="col-xl-6 col-lg-6 col-md-6">
                <div className="form-input my-1">
                <input
                  type="password"
                  
                    value={password}
                    onChange={handlePassword}
                  name="newpassword"
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {translate("New Password")}
                </label>
                <span>
                     {translate("At least 8 characters include uppercase and lowercase letters, numbers and special characters")}
                          </span>

                          {passwordError && <div className="text-red">{passwordError}</div>}

              </div>

              <div className="form-input my-1">
                <input
                  type="password"
                    value={confirmPassword}
                    onChange={handlePasswordChange}
                  name="confirmpassword"
                  required
                />
                <label className="lh-1 text-16 text-light-1">
                  {translate(" Confirm Password")}
                </label>
                {error && <div className="text-red">{error}</div>}

              </div>


                  <button
                    type="submit"
                    className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                  >
                    {translate("Reset Password")}
                  </button>
                
                </div>
            
                </div>
                </form>
            </div>
        </section>
        <FooterTwo />
      </main>
    </>
  )
}

export default ResetPassword