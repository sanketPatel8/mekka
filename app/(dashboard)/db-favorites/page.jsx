import Favorites from "@/components/dasboard/Fevorite";
import React from "react";

export const metadata = {
  title: "Dashboard-favorites || mekkaBooking - Travel & Tour React NextJS Template",
  description: "mekkaBooking - Travel & Tour React NextJS Template",
};

export default function page() {
  return (
    <>
      <main>
        <Favorites />
      </main>
    </>
  );
}
