"use client"

import React, { useEffect, useState } from "react";
import "react-image-lightbox/style.css";
import { MdVerified } from "react-icons/md";
import HotelGallary from "./Galleries/HotelGallary";
import { post } from "@/app/utils/api";
import { showErrorToast } from "@/app/utils/tost";

const RoadMap = () => {
  const [mainHotelData, setMainHotelData] = useState([]);

  const sendData = {
    AccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY,
    id: 12,
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetchData function called");
      try {
        const response = await post("tour_details", sendData);
        setMainHotelData(response.Tour_Details.tour_hotels);
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

  // Separate the hotels by type
  const makkahHotels = mainHotelData.filter(hotel => hotel.hotel_type === "2");
  const madinaHotels = mainHotelData.filter(hotel => hotel.hotel_type === "1");

  return (
    <>
      {makkahHotels.map((elm, ind) => (
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

      {madinaHotels.map((elm, ind) => (
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
