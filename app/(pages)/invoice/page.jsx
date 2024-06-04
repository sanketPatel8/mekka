import Invoice from "@/components/Invoice";
import React from "react";

export const metadata = {
  title: "Invoice || mekkaBooking - Travel & Tour React NextJS Template",
  description: "mekkaBooking - Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
      <main>
        <Invoice />
      </main>
    </>
  );
}
