"use client"

import React, { useEffect, useState } from "react";
import "react-image-lightbox/style.css";
import { MdVerified } from "react-icons/md";
import HotelGallary from "./Galleries/HotelGallary";


const RoadMap = ({ PAckageData,hotelData }) => {
  // const [mainHotelData, setMainHotelData] = useState({});

  // useEffect(() => {
  //   setMainHotelData(PAckageData?.Tour_Details?.tour_hotels)
  // }, [PAckageData])


  return (
    <>
      {hotelData?.mekka_hotel &&  (
        <div >
          <h4>Hotel for Makkah</h4>
          <h5>{hotelData?.mekka_hotel.hotel_name} ({hotelData?.mekka_hotel?.hotel_stars} star)</h5>
          <p>{hotelData?.mekka_hotel.hotel_info}</p>
          <br />
          {/* <p>The distance is {hotelData?.mekka_hotel.km}</p> */}
          <br />
            
          {/* <p>Food included:</p>
          <p className="text-danger">{hotelData?.mekka_hotel.meals_included == 1 ? "Included" : "Not Included"}</p> */}
            
          

          <HotelGallary  mekkaHotel={hotelData?.mekka_hotel?.mekka_hotels_imgs} />

          
        </div>
      )}

      {hotelData?.madina_hotel && (
        <div  className="mt-50">
          <h4>Hotel for Madina</h4>
          <h5>{hotelData?.madina_hotel.hotel_name} ({hotelData?.madina_hotel?.hotel_stars} star)</h5>
          <p>{hotelData?.madina_hotel.hotel_info}</p>
          <br />
          {/* <p>The distance to the Kaaba is {hotelData?.madina_hotel.km}</p> */}
          <br />
          {/* <p>Food included:</p>
          <p className="text-danger">{hotelData?.madina_hotel.meals_included == 1 ? "Included" : "Not Included"}</p> */}
            

          <HotelGallary  madinaHotel={hotelData?.madina_hotel?.medina_hotels_imgs}/>

         
        </div>
      )}
    </>
  );
};

export default RoadMap;
