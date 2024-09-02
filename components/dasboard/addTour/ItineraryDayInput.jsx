import React, { useState } from "react";

const ItineraryDayInput = ({ dayNumber }) => {
  const [dayDescription, setDayDescription] = useState("");

  return (
    <div className="row">
      <div className="col-md-6">
        <div className="form-input my-1">
          <input
            type="text"
            required
            value={dayNumber}
            disabled
            className=""
          />
          <label className="lh-1 text-16 text-light-1">Day {dayNumber} :</label>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-input my-1">
          <textarea
            type="text"
            required
            rows="1"
            cols="80"
            value={dayDescription}
            onChange={(e) => setDayDescription(e.target.value)}
          />
          <label className="lh-1 text-16 text-light-1">Description :</label>
        </div>
      </div>
    </div>
  );
};

export default ItineraryDayInput;