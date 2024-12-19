"use client"

import React, { useEffect, useState } from "react";
import "react-image-lightbox/style.css";
import { MdVerified } from "react-icons/md";
import HotelGallary from "./Galleries/HotelGallary";



const RoadMap = ({ PAckageData }) => {
  const [mainHotelData, setMainHotelData] = useState({});

  useEffect(() => {
    setMainHotelData(PAckageData?.Tour_Details?.tour_hotels)
  }, [PAckageData])


  return (
    <>
      {mainHotelData?.mekka_hotels?.map((elm, ind) => (
        <div key={ind}>
          <h4>Hotel for Makkah</h4>
          <p>{elm.hotel_info}</p>
          <br />
          <p>Distance to the Kaaba</p>
          <p>The distance to the Kaaba is {elm.km}</p>
          <br />
          <p>Food included:</p>
          <p className="text-danger">Not included</p>

          <HotelGallary name="makka" />

          <br />
          <div>
            <h4>Hotel Options</h4>
            <div className="row">
              <span className="col">
                <MdVerified className="mx-2" />
                Restaurant
              </span>
              <span className="col">
                <MdVerified className="mx-2" />
                Wäsche
              </span>
              <span className="col">
                <MdVerified className="mx-2" />
                Friseur
              </span>
              <span className="col">
                <MdVerified className="mx-2" />
                Wi-Fi
              </span>
            </div>
            <span className="col">
              <MdVerified className="mx-2" />
              Fernseher
            </span>
          </div>
        </div>
      ))}

      {mainHotelData?.medina_hotels?.map((elm, ind) => (
        <div key={ind} className="mt-50">
          <h4>Hotel for Madina</h4>
          <p>{elm.hotel_info}</p>
          <br />
          <p>Distance to the Mescid</p>
          <p>The distance to the Mescid is {elm.km}</p>
          <br />
          <p>Food included:</p>
          <p className="text-danger">Breakfast</p>

          <HotelGallary name="madina" />
          <div>
            <br />
            <h4>Hotel Options</h4>
            <div className="row">
              <span className="col">
                <MdVerified className="mx-2" />
                Restaurant
              </span>
              <span className="col">
                <MdVerified className="mx-2" />
                Wäsche
              </span>
              <span className="col">
                <MdVerified className="mx-2" />
                Friseur
              </span>
              <span className="col">
                <MdVerified className="mx-2" />
                Wi-Fi
              </span>
            </div>
            <span className="col">
              <MdVerified className="mx-2" />
              Fernseher
            </span>
            <br />
          </div>
        </div>
      ))}
    </>
  );
};

export default RoadMap;
