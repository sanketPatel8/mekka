import ForgotPasswordPartner from "@/components/dasboard/forgotpassword";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import ForgotPassword from "@/components/pages/ForgotPassword";
import React from "react";

const page = () => {
  return (
    <div>
      <main>
        <Header1 />

        <ForgotPasswordPartner />

        <FooterTwo />
      </main>
    </div>
  );
};

export default page;
