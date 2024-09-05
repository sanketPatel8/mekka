
import React from "react";

export default function Included({PAckageData}) {
  return (
    <div className="row x-gap-130 y-gap-20 pt-20">
      <div className="col-lg-6">
        <div className="y-gap-15">
          {PAckageData?.Tour_Details?.tour_details?.tour_included?.en_tour_included.map((elm, i) => (
            <div key={i} className="d-flex">
              <i className="icon-check flex-center text-10 size-24 rounded-full text-green-2 bg-green-1 mr-15"></i>
              {elm}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
