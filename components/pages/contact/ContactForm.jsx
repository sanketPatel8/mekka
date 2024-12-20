"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import { POST } from "@/app/utils/api/post";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ContactForm() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const {translate} = useTranslation()

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setPhone(value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hi")

    if(name == "" || phone == "" || email == "" || message == ""){
      showErrorToast(translate, "All fields are required")
      return;
    }

      const formData = new FormData();
    formData.append("Name", name);
    formData.append("Phone", phone);
    formData.append("Email", email);
    formData.append("Message", message);

    const response = await POST.request({form: formData, url: "contact_mail"});
    if(response.Status === "1"){
      showSuccessToast(translate, "Message sent successfully");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");

    }else{
      showErrorToast(translate, "Message not sent");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");

    }
  }

 
  return (
    <>
      <ToastContainer/>
      <section className="layout-pt-lg layout-pb-lg">
        <div className="container mt-10">
          <div className="row justify-center">
            <div className="col-lg-8">
              <h2 className="text-30 fw-700 text-center mb-30 mt-30">
                {translate('Leave us your info')}
              </h2> 

              <div className="contactForm">
                <form
                  onSubmit={handleSubmit}
                  className="row y-gap-30"
                >
                  <div className="col-md-6 ">
                    <input type="text" placeholder={`${translate("Name")}`} value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" placeholder={`${translate("Phone")}`} min={0} max={10} pattern="[0-9]{10}"
                        maxLength={10} value={phone} onChange={handleMobileChange} required />
                  </div>
                  <div className="col-12">
                    <input type="email" placeholder={`${translate("Email")}`} value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="col-12">
                    <textarea placeholder={`${translate("Message")}`} rows="6" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                  </div>
                  <div className="col-12">
                    <button
                      type="submit"
                      className="button -md -info-2 bg-accent-1 text-white col-12"
                    >
                      {translate("Send Message")}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
