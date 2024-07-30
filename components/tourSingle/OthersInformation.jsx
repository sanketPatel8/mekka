import { useTranslation } from "@/app/context/TranslationContext";
import React from "react";

export default function OthersInformation() {
  const { translate } = useTranslation();
  return (
    <>
      <div className="col-lg-3 col-6 my-2">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-clock"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
 {translate("Duration") || "Find Latest Packages"}</div>
            <div className="text-14 text-light-2 lh-16">8 days</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6 my-2">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-teamwork"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
 {translate("Travel") || "Find Latest Packages"}</div>
            <div className="text-14 text-light-2 lh-16">Umrah</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6 my-2">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-birthday-cake"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
 {translate("Start Date") || "Find Latest Packages"}</div>
            <div className="text-14 text-light-2 lh-16">23 Apr 2024</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6 my-2">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-translate"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
 {translate("Languages") || "Find Latest Packages"}</div>
            <div className="text-14 text-light-2 lh-16">German, Turkish, Arabic</div>
          </div>
        </div>
      </div>
    </>
  );
}
