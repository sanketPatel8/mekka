// import { states } from "@/data/dashboard";
import { useCurrency } from "@/app/context/currencyContext";
import { useTranslation } from "@/app/context/TranslationContext";
import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export default function States({data,loading}) {
  const { translate } = useTranslation();

  const [states, setStates] = useState([]);

  const {formatPrice} = useCurrency();

  useEffect(() => {
    const newStateItems = [
      {
        id: 1,
        title: translate("Total Received"),
        amount: `${data?.Total_Earnings} €`,
        today: "50 €",
        iconClass: "icon-wallet text-accent-1",
      },
      {
        id: 2,
        title: translate("Total Pending"),
        amount: `${data?.Total_Pending} €`,
        today: "40+",
        iconClass: "icon-payment text-accent-1",
      },
      {
        id: 3,
        title: translate("Total Booking"),
        amount: `${data?.Total_Bookings} `,
        today: "90+",
        iconClass: "icon-booking text-accent-1",
      },
    ];
    setStates(newStateItems);
  }, [translate]);


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
            <div key={i} className="col-xl-4 col-sm-6 py-3 py-lg-1">
              <div className="rounded-12 bg-white shadow-2 px-20 py-30 h-full">
                <div className="row y-gap-20 items-center justify-between">
                  <div className="col-9">
                    <div>{elm.title}</div>
                    <div className="text-20 fw-700">{elm.amount}</div>

                    <div>
                      {/* <span className="text-accent-1">{elm.today}</span> Today */}
                    </div>
                  </div>

                  <div className="col-3 d-flex justify-content-end">
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
