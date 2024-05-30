import DBMain from "@/components/dasboard/main";
import AgentDb from "@/components/dasboard/main/Agent";
import React from "react";

export const metadata = {
  title: "Dashboard-main || ViaTour - Travel & Tour React NextJS Template",
  description: "ViaTour - Travel & Tour React NextJS Template",
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
