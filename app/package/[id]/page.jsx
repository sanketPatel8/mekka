"use client";

import { useGlobalState } from "@/app/context/GlobalStateContext";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourSlider from "@/components/tourSingle/TourSlider";
import SingleFour from "@/components/tourSingle/pages/SingleFour";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [PAckageData, setPAckageData] = useState({});

  const { SharePackageData, setSharePackageData } = useGlobalState();

  const fetchData = async (id) => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      id: id,
    };

    try {
      const response = await post("tour_details", sendData);
      if (response) {
        setPAckageData(response);
        setSharePackageData(response);
      } else {
        console.error("Tours data is undefined in the response.");
      }
    } catch (error) {
      console.error("Error caught:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showErrorToast("Please verify your email");
      } else {
        showErrorToast("An error occurred during registration.");
      }
    }
  };

  useEffect(() => {
    if (id) {
      fetchData(id);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Package ~ Mekkabooking</title>
        <meta name="description" content="mekkabooking - Ihr Hajj & Umra Portal" />
        {/* Add other metadata tags here */}
      </Head>
      <main>
        <Header1 />
        <SingleFour PAckageData={PAckageData} />
        <TourSlider PAckageData={PAckageData} />
        <FooterTwo />
      </main>
    </>
  );
}
