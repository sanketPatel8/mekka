"use client";

import Hero1 from "@/components/homes/heros/Hero1";
import FooterTwo from "@/components/layout/footers/FooterTwo";
import Header1 from "@/components/layout/header/Header1";
import TourList4 from "@/components/tours/TourList4";
import React, { useEffect, useState } from "react";
import { post } from "../utils/api";
import { showErrorToast } from "../utils/tost";
import { useGlobalState } from "../context/GlobalStateContext";
import { useSearchParams } from "next/navigation";
import { POST } from "../utils/api/post";

export default function Page() {
  const searchParams = useSearchParams();

  const [count, setCount] = useState(0);
  const [TourListIndex, setTourListIndex] = useState(0);
  const [FliterData, setFliterData] = useState([]);
  const [Route, setRoute] = useState("");
  const [TourData, setTourData] = useState([]);
  const [Page, setPage] = useState(0);
  const [isTourDataFetched, setIsTourDataFetched] = useState(false);



  const [range, setRange] = useState(1);

  const fetchListing = async (pageIndex) => {
    const formData = new FormData();

    formData.append("start", pageIndex || 0);

    try {
      const response = await POST.request({
        form: formData,
        url: "tourlist",
      });
      console.log(response);
      setTourData(response.Tours);
      setRange(response.Total_Page);
    } catch (e) {
      console.log(e);
    }
  };

  const onPageChange = async(pageIndex) => {

    const tourType =
      searchParams.get("TourType") === undefined
        ? ""
        : searchParams.get("TourType");
    const startDate =
      searchParams.get("StartDate") === undefined
        ? ""
        : searchParams.get("StartDate");
    const endDate =
      searchParams.get("enddate") === undefined
        ? ""
        : searchParams.get("enddate");
    const person =
      searchParams.get("person") === undefined
        ? ""
        : searchParams.get("person");

        if (tourType || startDate || endDate || person) {
          await fetchSearch1Data({ tourType, startDate, endDate, person });
        } else {
          await fetchListing(pageIndex);
        }
      };

  useEffect(() => {
    fetchListing();
  }, []);

  // const currentResults = Array.isArray(TourData)
  //   ? TourData.slice((TourIndex - 1) * 10, TourIndex * 10)
  //   : [];

  // const fetchData = async (PageIndex) => {
  //   const sendData = {
  //     AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
  //     start: PageIndex,
  //   };

  //   try {
  //     const response = await post("tourlist", sendData);
  //     if (response.Tours) {
  //       setTourData(response.Tours);
  //       setCount(response.Count);
  //       setPage(response.Total_Page);
  //       setRoute("Tourlist data");
  //       setIsTourDataFetched(true);
  //     } else {
  //       console.error("Tours data is undefined in the response.");
  //     }
  //   } catch (error) {
  //     console.error("Error caught:", error);
  //     showErrorToast("An error occurred during registration.");
  //   }
  // };

  const FetchTourDataAPi = async () => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    };

    try {
      const response = await post("tour_data", sendData);
      setFliterData(response.Tours);
    } catch (error) {
      console.error("Error caught:", error);
      showErrorToast("An error occurred during registration.");
    }
  };

  const fetchSearch1Data = async ({ tourType, startDate, endDate, person }) => {
    const sendData = {
      AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
      Keyword: "",
      type: tourType,
      start_date: startDate,
      end_date: endDate,
      person: person,
    };
    try {
      const response = await post("search_tour", sendData);
      setTourData(response.Tour_List);
      setRange(response.Total_Page);
      setRoute("search data");
    } catch (error) {
      console.error("Error caught:", error);

      showErrorToast("An error occurred during registration.");
    }
  };

  useEffect(() => {
    FetchTourDataAPi();
  }, []);

  useEffect(() => {
    const tourType =
      searchParams.get("TourType") === undefined
        ? ""
        : searchParams.get("TourType");
    const startDate =
      searchParams.get("StartDate") === undefined
        ? ""
        : searchParams.get("StartDate");
    const endDate =
      searchParams.get("enddate") === undefined
        ? ""
        : searchParams.get("enddate");
    const person =
      searchParams.get("person") === undefined
        ? ""
        : searchParams.get("person");
    if (
      tourType !== null ||
      startDate !== null ||
      endDate !== null ||
      person !== null
    ) {
      fetchSearch1Data({ tourType, startDate, endDate, person });
    } else {
      // fetchData();
      fetchListing()
    }
  }, [searchParams]);
  

  return (
    <main>
      <Header1 />
      <Hero1 />
      <div className="mt-50">
        <TourList4
          TourData={TourData}
          setTourIndex={setTourListIndex}
          FliterData={FliterData}
          Route={Route}
          setTourData={setTourData}
          setRoute={setRoute}
          Page={Page}
          count={count}
          TourListIndex={TourListIndex}
          // forpagination
          isTourDataFetched={isTourDataFetched}
          setisTourDataFetched={setIsTourDataFetched}
          range={range}
          setRange={setRange}
          onPageChange={onPageChange}
        />
      </div>
      <FooterTwo />
    </main>
  );
}
