import { useTranslation } from '@/app/context/TranslationContext';
import React from 'react'

const OtherInformation2 = () => {
  const { translate } = useTranslation();
  return (
    <>
      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-clock"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
 {translate("Languages") || "Find Latest Packages"}</div>
            <div className="text-14 text-light-2 lh-16">Included</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-teamwork"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
 {translate("Flight Included") || "Find Latest Packages"}</div>
            <div className="text-14 text-light-2 lh-16"> Included</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-6">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-birthday-cake"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
 {translate("Hotels Included") || "Find Latest Packages"}</div>
            <div className="text-14 text-light-2 lh-16">Included</div>
          </div>
        </div>
      </div>

      <div className="col-lg-3 col-12">
        <div className="d-flex items-center">
          <div className="flex-center size-50 rounded-12 border-1">
            <i className="text-20 icon-translate"></i>
          </div>

          <div className="ml-10">
            <div className="lh-16">
 {translate("Free Cancellation") || "Find Latest Packages"} 
 {translate("(Up to 14 Days Before Travel Date)") || "Find Latest Packages"}</div>
            <div className="text-14 text-light-2 lh-16">Not included</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default OtherInformation2