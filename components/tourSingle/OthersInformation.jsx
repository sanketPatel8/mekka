"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import { hotelDAta } from "@/data/tours";
import React, { useEffect, useState } from "react";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";

export default function OthersInformation({ PAckageData , id }) {
  const [OtherInfo, setOtherInfo] = useState({});
  const [TourList, setTourList] = useState(null);

  useEffect(() => {
    setOtherInfo(PAckageData);
    const foundTour = OtherInfo?.Tour_List?.find(tour => tour.id === id);
    setTourList(foundTour);
    
  }, [PAckageData]);

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
              <div className="text-14 text-light-2 lh-16">{TourList?.travel_duration} days</div>
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
                {TourList?.travel}
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
                {TourList?.date_begin}
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
