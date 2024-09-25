"use client";

import { useTranslation } from "@/app/context/TranslationContext";
// import { tabContentStaticties } from "@/data/dashboard";
import { useState } from "react";
import {
  LineChart,
  Tooltip,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function Statistics({data}) {


  function concatTime(date) {
    const getTime  = new Date(date)
    const getHours = getTime.getHours()
    const getMinutes = getTime.getMinutes().toString().length === 1 ? "0" + getTime.getMinutes() : getTime.getMinutes()
    return getHours + ":" + getMinutes
  }
  const [tabs,setTabs] = useState([
    {
      id: 1,
      label: "Hours",
      data: data.Today_Reservation.map((item) => {
        return { name: concatTime(item.created_at), value: item.total };
      })
    },
    {
      id: 2,
      label: "Weekly",
      data: data.Weekly_Reservation.map((item) => {
        return { name: item.created_at, value: item.total };
      })
    },
    {
      id: 3,
      label: "Monthly",
      data: data.Monthly_Reservation.map((item) => {
        return { name: item.created_at, value: item.total };
      })
    },
  ]);
  console.log(data, "data")
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const chart = (interval) => (
    <ResponsiveContainer height={500} width="100%">
      <LineChart data={activeTab.data}>
        <CartesianGrid strokeDasharray="" />
        <XAxis tick={{ fontSize: 12 }} dataKey="name" interval={interval} />
        <YAxis
          tick={{ fontSize: 12 }}
          domain={[0, 300]}
          tickCount={7}
          interval={interval}
        />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          strokeWidth={2}
          stroke="#336CFB"
          fill="#336CFB"
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </LineChart>
    </ResponsiveContainer>
  );

  const { translate } = useTranslation();
  return (
    <div className="col-12 my-3">
      <div className="rounded-12 bg-white shadow-2 h-full">
        <div className="pt-20 px-30">
          <div className="tabs -underline-2 js-tabs">
            <div className="d-flex items-center justify-between">
              <div className="text-18 fw-500"> {translate("Earning Statistics") }</div>

              <div className="tabs__controls row x-gap-20 y-gap-10 lg:x-gap-20 js-tabs-controls">
                {tabs.map((elm, i) => (
                  <div
                    onClick={() => setActiveTab(elm)}
                    key={i}
                    className="col-auto"
                  >
                    <button
                      className={`tabs__button fw-500 px-5 pb-5 lg:pb-0 js-tabs-button ${
                        activeTab.label == elm.label ? "is-tab-el-active" : ""
                      }`}
                    >
                      {elm.label}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="tabs__content pt-30 js-tabs-content">
              <div className="tabs__pane -tab-item-1 is-tab-el-active">
                {chart("preserveEnd")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
