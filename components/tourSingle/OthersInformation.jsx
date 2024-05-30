import React from "react";

export default function OthersInformation() {
  return (
    <>
      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-clock"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Duration</div>
            <div className="text-14 text-light-2 lh-16">8 days</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-teamwork"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Travel</div>
            <div className="text-14 text-light-2 lh-16">Umrah</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-birthday-cake"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Start Date</div>
            <div className="text-14 text-light-2 lh-16">23 Apr 2024</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-translate"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">Languages</div>
            <div className="text-14 text-light-2 lh-16">German, Turkish, Arabic</div>
          </div>
        </div>
      </div>
    </>
  );
}
