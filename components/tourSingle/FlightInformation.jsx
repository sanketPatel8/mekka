import React from "react";

const FlightInformation = ({ PAckageData }) => {
  return (
    <div>
      <p
        className=""
        dangerouslySetInnerHTML={{
          __html: PAckageData?.Tour_Details?.flight_info,
        }}
      />
    </div>
  );
};

export default FlightInformation;
