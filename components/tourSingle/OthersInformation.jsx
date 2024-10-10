"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import { hotelDAta } from "@/data/tours";
import React, { useEffect, useState } from "react";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";
import Image from "next/image";

export default function OthersInformation({ PAckageData, id }) {
  const [OtherInfo, setOtherInfo] = useState({});
  const [TourList, setTourList] = useState(null);

  useEffect(() => {
    // setOtherInfo(PAckageData);
    // const foundTour = OtherInfo?.Tour_List?.find(tour => tour.id === id);
    setTourList(PAckageData?.Tour_Details);
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
              <div className="text-14 text-light-2 lh-16">
                {TourList?.tour_details?.travel_duration} days
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-6 my-2">
          <div className="d-flex items-center">
            <div className="flex-center size-50 rounded-12 border-1">
              <Image
                width={20}
                height={20}
                src="/img/tourSingle/booking/start date.svg"
                alt="image"
              />
            </div>

            <div className="ml-10">
              <div className="lh-16">{translate("Start Date")}</div>
              <div className="text-14 text-light-2 lh-16">
                {TourList?.tour_details?.date_begin}
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-6 my-2">
          <div className="d-flex items-center">
            <div className="flex-center size-50 rounded-12 border-1">
              <Image
                width={20}
                height={20}
                src="/img/tourSingle/booking/end date.svg"
                alt="image"
              />
            </div>

            <div className="ml-10">
              <div className="lh-16">{translate("End Date")}</div>
              <div className="text-14 text-light-2 lh-16">
                {TourList?.tour_details?.date_end}
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
                <div className="row">
                  {/* {TourList?.en_language?.map((elm, index) => (
                    <div className="col-6" key={index}>
                      {elm}
                    </div>
                  ))} */}
                  {TourList?.en_language?.length > 0 && (
                    <>
                      {/* Join the first 3 elements */}
                      <div className="col-12">
                        {TourList?.en_language.slice(0, 2).join(", ")}
                      </div>

                      {/* Check if there are more than 3 elements and display the rest */}
                      {TourList?.en_language.length > 3 && (
                        <div className="col-12">
                          {TourList?.en_language.slice(2).join(", ")}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
