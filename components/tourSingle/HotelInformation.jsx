"use client";

import React, { useEffect, useState } from "react";
import "react-image-lightbox/style.css";
import { MdVerified } from "react-icons/md";
import HotelGallary from "./Galleries/HotelGallary";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "@/app/context/TranslationContext";

const RoadMap = ({ PAckageData, hotelData, isLoading, setisLoading }) => {
  // const [mainHotelData, setMainHotelData] = useState({});

  // useEffect(() => {
  //   setMainHotelData(PAckageData?.Tour_Details?.tour_hotels)
  // }, [PAckageData])

  console.log("hotelData", hotelData);

  const { translate } = useTranslation();

  return (
    <>
      
      {isLoading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "30px", width: "100%" }}
        >
          <ClipLoader color="#DAC04F" size={30} />
        </div>
      ) : (
        <>
          {hotelData && hotelData.mekka_hotel ? (
            <div>
              <h4>{translate('Hotel for Makkah')}</h4>
              <h5>
                {hotelData.mekka_hotel.hotel_name} (
                {hotelData.mekka_hotel.hotel_stars} star)
              </h5>
              <p>{hotelData.mekka_hotel.hotel_info}</p>
              <br />
              <p>{translate('The distance to the Kaaba is')} {hotelData.mekka_hotel.km} km</p>
              <br />
              {/* Display Gallery */}
              <HotelGallary
                mekkaHotel={hotelData.mekka_hotel.mekka_hotels_imgs}
              />
            </div>
          ) : (
            <p>No hotel information available for Makkah.</p>
          )}

          {hotelData && hotelData.madina_hotel ? (
            <div className="mt-50">
              <h4>{translate('Hotel for Madina')}</h4>
              <h5>
                {hotelData.madina_hotel.hotel_name} (
                {hotelData.madina_hotel.hotel_stars} star)
              </h5>
              <p>{hotelData.madina_hotel.hotel_info}</p>
              <br />
              {/* Display Gallery */}
              <HotelGallary
                madinaHotel={hotelData.madina_hotel.medina_hotels_imgs}
              />
            </div>
          ) : (
            <p>No hotel information available for Madina.</p>
          )}
        </>
      )}
    </>
  );
};

export default RoadMap;
