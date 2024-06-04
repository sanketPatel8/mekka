import DBMain from "@/components/dasboard/main";
import CustomerDb from "@/components/dasboard/main/Customer";
import React from "react";

export const metadata = {
  title: "Dashboard-main || Travel & Tour React NextJS Template",
  description: " Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
      <main>
        {/* <DBMain /> */}
        <CustomerDb />
      </main>
    </>
  );
}
