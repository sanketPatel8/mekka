import DBListing from "@/components/dasboard/DBListing";
import React from "react";

export const metadata = {
  title: "Dashboard-listing || mekkaBooking - Travel & Tour React NextJS Template",
  description: "mekkaBooking - Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
      <main>
        <DBListing />
      </main>
    </>
  );
}
