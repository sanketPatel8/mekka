"use client"

import { useTranslation } from "@/app/context/TranslationContext";
import { hotelDAta } from "@/data/tours";
import React, { useEffect, useState } from "react";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";

const OtherInformation2 = ({ PAckageData }) => {
  const [OtherInfo, setOtherInfo] = useState({});
  const [TourList, setTourList] = useState(null);

  useEffect(() => {
    setOtherInfo(PAckageData);
    const foundTour = OtherInfo?.Tour_List?.find(tour => tour.id === "1");
    setTourList(foundTour);
  }, [PAckageData]);

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
            <div className="text-14 text-light-2 lh-16">{TourList?.baggage}</div>
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
            <div className="text-14 text-light-2 lh-16">{TourList?.flight_included == 1 ? "Included" : "Not Included"} </div>
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
            <div className="text-14 text-light-2 lh-16">
              {TourList?.hotel_included !== 1 ? "Not Included" : "Included"}
              </div>
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
            <div className="text-14 text-light-2 lh-16">{TourList?.free_cancellation}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtherInformation2;
