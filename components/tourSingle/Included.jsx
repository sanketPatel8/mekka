
import React from "react";

export default function Included({PAckageData}) {
  return (
    <div className="row x-gap-130 y-gap-20 pt-20">
      <div className="col-lg-12">
        <div className="row">
          {PAckageData?.Tour_Details?.tour_details?.tour_included?.en_tour_included?.map((elm, i) => (
            <div key={i} className="d-flex gap-5 col-lg-3 col-md-4 col-6 my-3">
            <i className="icon-check flex-center text-10 size-24 rounded-full text-green-2 bg-green-1 mr-15"></i>
            <p>{elm}</p>
          </div>          
          ))}
        </div>
      </div>

    </div>
  );
}
