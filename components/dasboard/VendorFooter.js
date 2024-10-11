import React from 'react'

function VendorFooter() {
  return (
    <div className="text-center   pt-30">
    © {translate("Copyright MekkaBooking.com")} {new Date().getFullYear()}
  </div>
  )
}

export default VendorFooter