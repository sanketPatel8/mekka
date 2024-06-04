import DBMain from "@/components/dasboard/main";
import AgentDb from "@/components/dasboard/main/Agent";
import React from "react";

export const metadata = {
  title: "Dashboard-main || mekkaBooking - Travel & Tour React NextJS Template",
  description: "mekkaBooking - Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
      <main>
        {/* <DBMain /> */}
        <AgentDb />
      </main>
    </>
  );
}
