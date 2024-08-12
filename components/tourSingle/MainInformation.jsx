"use client"

import React, { useEffect, useState } from "react";
import Stars from "../common/Stars";

export default function MainInformation({ PAckageData }) {
  const [InformationData, setInformationData] = useState({});

  useEffect(() => {
    setInformationData(PAckageData);
  }, [PAckageData]);


  


  return (
    <>
      <div className="row y-gap-20 justify-between items-end">
        <div className="col-auto">
          <div className="row x-gap-10 y-gap-10 items-center">
            <div className="col-auto">
              <button 
                className={`button -accent-1 text-14 py-5 px-15 bg-accent-1-05 text-accent-1 rounded-200 ${InformationData?.Tour_Details?.tour_details?.bestseller === 0 ? 'd-block' : 'd-none'}`}
              >
                Bestseller
              </button>
            </div>
            <div className="col-auto">
              <button className="button -accent-1 text-14 py-5 px-15 bg-light-1 rounded-200">
                Free cancellation
              </button>
            </div>
          </div>

          <h2 className="text-40 sm:text-30 lh-14 mt-20">
            {InformationData?.Tour_Details?.tour_details?.type} - {InformationData?.Tour_Details?.tour_details?.name}
          </h2>

          <div className="row x-gap-20 y-gap-20 items-center pt-20">
            <div className="col-auto">
              <div className="d-flex items-center">
                <div className="d-flex x-gap-5 pr-10">
                  <Stars star={`${InformationData?.Tour_Details?.tour_details?.rating == null ? '2' : InformationData?.Tour_Details?.tour_details?.rating}`} font={12} />
                </div>
                {InformationData?.Tour_Details?.tour_details?.rating} ({InformationData?.Tour_Details?.tour_details?.rating_count}) - {InformationData?.Tour_Details?.tour_details?.company_name}
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center">
                <i className="icon-pin text-16 mr-5"></i>
                zu Kaaba {InformationData?.Tour_Details?.tour_details?.distance_to_hotel} km
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center" style={{color : "red"}}>
                <i className="icon-reservation text-16 mr-5"></i>
                {InformationData?.Tour_Details?.tour_details?.capacity_empty} Places Still Available
              </div>
            </div>
          </div>
        </div>

        <div className="col-auto">
          <div className="d-flex x-gap-30 y-gap-10">
            <a href="#" className="d-flex items-center">
              <i className="icon-share flex-center text-16 mr-10"></i>
              Share
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
