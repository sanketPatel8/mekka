// import { states } from "@/data/dashboard";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";

export default function States({data,loading}) {

  console.log(data,"data")
  const [states, setStates] = useState([
    {
      id: 1,
      title: "Total Earnings",
      amount: `${data?.Total_Earnings}`,
      today: "50 €",
      iconClass: "icon-wallet text-accent-1",
    },
    {
      id: 2,
      title: "Total Pending",
      amount: `${data?.Total_Pending}`,
      today: "40+",
      iconClass: "icon-payment text-accent-1",
    },
    {
      id: 3,
      title: "Total Booking",
      amount: `${data?.Total_Bookings}`,
      today: "90+",
      iconClass: "icon-booking text-accent-1",
    },
  ]);

  console.log(states,"states")

  return (
    <>
    { loading ?       
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <ClipLoader color="#DAC04F" size={50} />
      </div>
      :
        <div className="row y-gap-30 pt-30 md:pt-30 pt-30">
          {states.map((elm, i) => (
            <div key={i} className="col-xl-3 col-sm-6 py-3 py-lg-1">
              <div className="rounded-12 bg-white shadow-2 px-30 py-30 h-full">
                <div className="row y-gap-20 items-center justify-between">
                  <div className="col-auto">
                    <div>{elm.title}</div>
                    <div className="text-30 fw-700">{elm.amount}</div>

                    <div>
                      {/* <span className="text-accent-1">{elm.today}</span> Today */}
                    </div>
                  </div>

                  <div className="col-auto">
                    <div className="size-80 flex-center bg-accent-1-05 rounded-full">
                      <i className={`text-30 ${elm.iconClass}`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    }
  </>
  );
}
