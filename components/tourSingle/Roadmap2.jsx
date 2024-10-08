"use client";

import { roadmapData2 } from "@/data/tourSingleContent";
import React, { useEffect, useState } from "react";

export default function RoadMap2({ PAckageData }) {
  const [activeRoadmap, setActiveRoadmap] = useState(0);
  const [RoadMap, setRoadMap] = useState([]);

  useEffect(() => {
    setRoadMap(PAckageData?.Tour_Details?.itinerary || []);
  }, [PAckageData]);


  

  // Combine RoadMap and roadmapData2
  const combinedRoadMap = RoadMap.map((item, index) => ({
    ...item,
    ...roadmapData2[index] // Merge the objects from both arrays
  }));


  return (
    <div className="roadmap roadMap2">
      {combinedRoadMap.map((elm, i) => (
        <div key={i} className="roadmap__item">
          {elm.icon ? (
            <div
              className="roadmap__iconBig"
              onClick={() => setActiveRoadmap((pre) => (pre === i ? -1 : i))}
            >
              <i className={elm.icon}></i>
            </div>
          ) : (
            <div
              className="roadmap__icon"
              onClick={() => setActiveRoadmap((pre) => (pre === i ? -1 : i))}
            ></div>
          )}
          <div className="roadmap__wrap">
            <div
              className="roadmap__title"
              onClick={() => setActiveRoadmap((pre) => (pre === i ? -1 : i))}
            >
             {elm.day}
            </div>
            {elm.description && (
              <div
                className={`roadmap__content ${activeRoadmap === i ? "active" : ""}`}
              >
                {elm.description}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
