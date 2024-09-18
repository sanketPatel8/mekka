import React from "react";
import PageData from "./pageData";

// Dynamically generate metadata
export async function generateMetadata({ params }) {
  const id = params.id;

  return {
    title: ` MekkaBooking - ${id}  `,
    description: "MekkaBooking ",
  };
}

const page = () => {
  return (
    <div>
      <PageData />
    </div>
  );
};

export default page;
