"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import { hotelDAta } from "@/data/tours";
import React, { useEffect, useState } from "react";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";

export default function OthersInformation() {
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
      <div className="row my-2">
        <div className="col-lg-3 col-6 my-2">
          <div className="d-flex items-center">
            <div className="flex-center size-50 rounded-12 border-1">
              <i className="text-20 icon-clock"></i>
            </div>

            <div className="ml-10">
              <div className="lh-16">{translate("Duration")}</div>
              <div className="text-14 text-light-2 lh-16">
                {tourDAta.travel_duration} days
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-6 my-2">
          <div className="d-flex items-center">
            <div className="flex-center size-50 rounded-12 border-1">
              <i className="text-20 icon-teamwork"></i>
            </div>

            <div className="ml-10">
              <div className="lh-16">{translate("Travel")}</div>
              <div className="text-14 text-light-2 lh-16">
                {tourDAta.travel}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-6 my-2">
          <div className="d-flex items-center">
            <div className="flex-center size-50 rounded-12 border-1">
              <i className="text-20 icon-birthday-cake"></i>
            </div>

            <div className="ml-10">
              <div className="lh-16">{translate("Start Date")}</div>
              <div className="text-14 text-light-2 lh-16">
                {tourDAta.date_begin}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-6 my-2">
          <div className="d-flex items-center">
            <div className="flex-center size-50 rounded-12 border-1">
              <i className="text-20 icon-translate"></i>
            </div>

            <div className="ml-10">
              <div className="lh-16">{translate("Languages")}</div>
              <div className="text-14 text-light-2 lh-16">
                German, Turkish, Arabic
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
