"use client"

import React, { useState, useEffect } from 'react';

const HotelAndFlightSelection = ({ SidebarData }) => {
  const [HotelSelect, setHotelSelect] = useState({
    mekka: null,
    madina: null,
    mekkaPrice: 0,
    madinaPrice: 0,
    mekkaId: null,
    madinaId: null,
  });
  const [selectedFlights, setSelectedFlights] = useState(null);

  useEffect(() => {
    // Set default selection for Mekka and Madina hotels if available
    const defaultMekkaHotel = SidebarData?.tour_hotels?.mekka_hotels?.[0];
    const defaultMadinaHotel = SidebarData?.tour_hotels?.medina_hotels?.[0];

    if (defaultMekkaHotel) {
      const mekkaValue = JSON.stringify({
        hotel_name: defaultMekkaHotel.hotel_name,
        hotel_id: defaultMekkaHotel.id,
      });

      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        mekka: mekkaValue,
        mekkaPrice: defaultMekkaHotel.hotel_price || 0,
        mekkaId: defaultMekkaHotel.id,
      }));
    }

    if (defaultMadinaHotel) {
      const madinaValue = JSON.stringify({
        hotel_name: defaultMadinaHotel.hotel_name,
        hotel_id: defaultMadinaHotel.id,
      });

      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        madina: madinaValue,
        madinaPrice: defaultMadinaHotel.hotel_price || 0,
        madinaId: defaultMadinaHotel.id,
      }));
    }

    // Set default flight selection if available
    const defaultFlight = SidebarData?.flights?.[0];
    if (defaultFlight) {
      setSelectedFlights({
        id: defaultFlight.id,
        name: defaultFlight.airline_name,
      });
    }
  }, [SidebarData]);


  const handleHotelChange = (e, elm) => {
    const selectedHotel = JSON.parse(e.target.value);

    if (e.target.name === 'mekka') {
      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        mekka: e.target.value,
        mekkaPrice: elm.hotel_price || 0,
        mekkaId: elm.id,
      }));
    } else if (e.target.name === 'madina') {
      setHotelSelect((prevSelect) => ({
        ...prevSelect,
        madina: e.target.value,
        madinaPrice: elm.hotel_price || 0,
        madinaId: elm.id,
      }));
    }
  };

  const handleFlightChange = (e, flight) => {
    setSelectedFlights(flight); // Replace with the selected flight object
  };

  return (
    <div>
      {/* Mekka Hotels */}
      <h5 className="text-18 fw-500 mb-20 mt-20">Hotel For Mekka</h5>
      {SidebarData?.tour_hotels?.mekka_hotels?.map((elm, ind) => (
        <div key={ind}>
          <div className="d-flex items-center justify-between my-1">
            <div className="d-flex items-center">
              <div className="form-radio d-flex items-center">
                <label className="radio d-flex items-center">
                  <input
                    type="radio"
                    name="mekka"
                    value={JSON.stringify({
                      hotel_name: elm.hotel_name,
                      hotel_id: elm.id,
                    })}
                    checked={
                      HotelSelect.mekka &&
                      JSON.parse(HotelSelect.mekka).hotel_name === elm.hotel_name
                    }
                    onChange={(e) => handleHotelChange(e, elm)}
                    disabled
                  />
                  <span className="radio__mark">
                    <span className="radio__icon"></span>
                  </span>
                  <span className="text-14 lh-1 ml-10">
                    {elm.hotel_name || 'not found'} ({elm.hotel_stars} star)
                  </span>
                </label>
              </div>
            </div>
            <div className="text-14">{elm.hotel_price} €</div>
          </div>
        </div>
      ))}

      <hr />

      {/* Madina Hotels */}
      <h5 className="text-18 fw-500 mb-20 mt-20">Hotel For Madina</h5>
      {SidebarData?.tour_hotels?.medina_hotels?.map((elm) => (
        <div key={elm.id}>
          <div className="d-flex items-center justify-between my-1">
            <div className="d-flex items-center">
              <div className="form-radio d-flex items-center">
                <label className="radio d-flex items-center">
                  <input
                    type="radio"
                    name="madina"
                    value={JSON.stringify({
                      hotel_name: elm.hotel_name,
                      hotel_id: elm.id,
                    })}
                    checked={
                      HotelSelect.madina &&
                      JSON.parse(HotelSelect.madina).hotel_name === elm.hotel_name
                    }
                    onChange={(e) => handleHotelChange(e, elm)}
                    disabled
                  />
                  <span className="radio__mark">
                    <span className="radio__icon"></span>
                  </span>
                  <span className="text-14 lh-1 ml-10">
                    {elm.hotel_name || 'not found'} ({elm.hotel_stars} star)
                  </span>
                </label>
              </div>
            </div>
            <div className="text-14">{elm.hotel_price} €</div>
          </div>
        </div>
      ))}

      {/* Flight Selection */}
      <div>
        <h5 className="text-18 fw-500 mb-20 mt-20">Select Flight</h5>
        {SidebarData?.flights?.map((flight) => (
          <div key={flight.id} className="d-flex items-center justify-between my-1">
            <div className="d-flex items-center">
              <div className="form-radio d-flex items-center">
                <label className="radio d-flex items-center">
                  <input
                    type="radio"
                    name="flight"
                    value={flight.id}
                    checked={selectedFlights?.id === flight.id}
                    onChange={(e) => handleFlightChange(e, flight)}
                  />
                  <span className="radio__mark">
                    <span className="radio__icon"></span>
                  </span>
                  <span className="text-14 lh-1 ml-10">
                    {flight.airline_name || 'not found'} ({flight.price} €)
                  </span>
                </label>
              </div>
            </div>
            <div className="text-14">{flight.price} €</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelAndFlightSelection;
