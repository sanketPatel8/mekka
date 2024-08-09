"use client"

import { useTranslation } from "@/app/context/TranslationContext";
import { hotelDAta } from "@/data/tours";
import React, { useEffect, useState } from "react";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";

const OtherInformation2 = () => {
  const [tourDAta, settourDAta] = useState([]);

  const sendData = {
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    id: 12,
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData function called");
      try {
        const response = await post("tour_details", sendData);
        settourDAta(response.Tour_Details.tour_details);
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

    fetchData();
  }, []);

  const { translate } = useTranslation();
  
  return (
    <>
      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-clock"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
              {translate("Luggages") }
            </div>
            <div className="text-14 text-light-2 lh-16">Included</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-teamwork"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
              {translate("Flight Included") }
            </div>
            <div className="text-14 text-light-2 lh-16">{tourDAta?.flight_included == 1 ? "Included" : "Not Included"} </div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-birthday-cake"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
              {translate("Hotels Included") }
            </div>
            <div className="text-14 text-light-2 lh-16">{tourDAta?.hotel_included !== 1 ? "Not Included" : "Included"}</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-12">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-translate"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
              {translate("Free Cancellation") }
              {translate("(Up to 14 Days Before Travel Date)") ||
                "Find Latest Packages"}
            </div>
            <div className="text-14 text-light-2 lh-16">{tourDAta?.free_cancellation}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherInformation2;
