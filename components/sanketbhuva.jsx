"use client"

import { useState } from "react";

export default function Sanketbhuva() {
  const [LocalData, setLocalData] = useState([
    { label: "Adult", totalCount: 2, grandTotal: 300, price_type: "1", price: 150 },
    { label: "Child", totalCount: 1, grandTotal: 100, price_type: "2", price: 100 },
    { label: "Baby", totalCount: 0, grandTotal: 0, price_type: "3", price: 50 },
  ]);
  const [Render, setRender] = useState(false)


  const handleIncrement = (price_type) => {
    setLocalData((prevData) =>
      prevData.map((group) => {
        if (group.price_type === price_type) {
          const newTotalCount = group.totalCount + 1;
          return {
            ...group,
            totalCount: newTotalCount,
            grandTotal: newTotalCount * group.price,
          };
        }
        return group;
      })
    );
  };

  const handleDecrement = (price_type) => {
    setLocalData((prevData) =>
      prevData.map((group) => {
        if (group.price_type === price_type && group.totalCount > 0) {
          const newTotalCount = group.totalCount - 1;
          return {
            ...group,
            totalCount: newTotalCount,
            grandTotal: newTotalCount * group.price,
          };
        }
        return group;
      })
    );
  };

  // Helper function to render group details
  const renderGroup = (group, count, label, grandTotal) => (
    <div key={group.price_type} className="mt-15">
      <div className="d-flex items-center justify-between">
        <div className="text-14 col-8">
          {label === "Adult"
            ? "Adult (18+ Years)"
            : label === "Child"
            ? "Child (13-17 Years)"
            : "Baby (0-12 Years)"}
          <span className="fw-500"> {grandTotal.toFixed(2)} € </span>
        </div>

        <div className="d-flex items-center js-counter col-3">
          <button
            onClick={() => handleDecrement(group.price_type)}
            className="button size-30 border-1 rounded-full js-down col-2"
          >
            <i className="icon-minus text-10 col-3"></i>
          </button>

          <div className="flex-center ml-10 mr-10 col-2">
            <div className="text-14 size-20 js-count">{count}</div>
          </div>

          <button
            onClick={() => handleIncrement(group.price_type)}
            className="button size-30 border-1 rounded-full js-up"
          >
            <i className="icon-plus text-10"></i>
          </button>
        </div>
      </div>
    </div>
  );

  // Main rendering logic
  return (
    <>
      {Render === true
        ? SidebarData?.tour_price?.map((group, index) => {
            let count, label;

            if (group.price_type === "1") {
              count = adultNumber;
              label = "Adult";
            } else if (group.price_type === "2") {
              count = youthNumber;
              label = "Child";
            } else if (group.price_type === "3") {
              count = childrenNumber;
              label = "Baby";
            } else {
              return null;
            }

            const grandTotal = group.price * count;
            return renderGroup(group, count, label, grandTotal);
          })
        : LocalData.map((group, index) => {
            const { totalCount, grandTotal, label } = group;
            return renderGroup(group, totalCount, label, grandTotal);
          })}

          <button onClick={() => setRender(true)}>Click</button>
    </>
  );
}
