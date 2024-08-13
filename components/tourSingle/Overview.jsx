"use client";

import { useTranslation } from "@/app/context/TranslationContext";
import React from "react";

export default function Overview({ PAckageData }) {
  const { translate } = useTranslation();

  return (
    <>
      <h2 className="text-30">{translate("Tour Overview")}</h2>
      <div className="mt-20">
        {/* Render the HTML content from tour_info */}
        <div
          dangerouslySetInnerHTML={{ __html: PAckageData?.Tour_Details?.tour_details?.tour_info }}
          
        />
      </div>

      <h3 className="text-20 fw-500 mt-20">{translate("Tour Highlights")}</h3>
      <ul className="ulList mt-20">
        <li>
          Experience the thrill of a speedboat to the stunning Phi Phi Islands
        </li>
        <li>Be amazed by the variety of marine life in the archipelago</li>
        <li>
          Enjoy relaxing in paradise with white sand beaches and azure turquoise
          water
        </li>
        <li>Feel the comfort of a tour limited to 35 passengers</li>
        <li>Catch a glimpse of the wild monkeys around Monkey Beach</li>
      </ul>
    </>
  );
}
