'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md"
import { TbWorld } from "react-icons/tb";
import { FaLuggageCart } from "react-icons/fa";
import { IoIosBed } from "react-icons/io";
import { FaHotel } from "react-icons/fa6";
import '@/public/css/index.css';


export default function Payment() {
  const [roomType, setRoomType] = useState("");
  const [bookingStage, setBookingStage] = useState(1)
  const [adPay, setAdPay] = useState(false);
  const [onlinePayment, setOnlinePayment] = useState(false);
  const [Flight, setFlight] = useState(false);
  const [check, setCheck] = useState(false);
  const [InstallMent, setInstallMent] = useState(false);


//   const handleChange = (e) => {
//     const selectedRoomType = e.target.value;
//     setRoomType(selectedRoomType);
//     alert(`Selected room type:  € {selectedRoomType}`);
// };

const checkInstallment = () => {
     setInstallMent(!InstallMent)
    //  console.log(InstallMent);
}

useEffect(() => {
    console.log('Selected room type:', roomType);
}, [roomType]);

  return (
    <section className="layout-pt-md layout-pb-lg mt-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">

            <h2 className="text-30 md:text-24 fw-700 bg-Primary ml-40">
            Payment options
              </h2>

            <div className="bg-white rounded  py-30 px-30 md:py-20 md:px-20 mt-30">

              {bookingStage == 1 &&
            <div style={{ borderRadius : "10px" , overflow : "hidden" , border : "1px solid black"}} className="" >
             <p className="text-center py-3 bg -color-blue-1" style={{backgroundColor : "#163749" , color:"white"}}><b>Payment Methods</b></p>
            <div className="px-3">

                <div className="d-flex items-center justify-between py-3">
                <div className="d-flex items-center">
                <div className="form-checkbox">
                    <input
                    checked={adPay ? true : false}
                    onChange={() => setAdPay((pre) => !pre)}
                    type="checkbox"
                    />
                    <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon">
                        <Image
                        width="10"
                        height="8"
                        src="/img/icons/check.svg"
                        alt="icon"
                        />
                    </div>
                    </div>
                </div>
                <div className="ml-10"> Payment in advance (you will also find these bank details in your reservation confirmation)
Payment instalment is possible.</div>
                </div>
                </div>

                <div className="p-2" style={{backgroundColor:'#80808075' , display:"inline-block"}}>
                    <p><span><b>Kontoinhaber:</b></span>Mekka Booking GmbH</p>
                    <p><span><b>IBAN:</b></span>DE71 5125 0000 0002 2282 11</p>
                    <p><span><b>BIC:</b></span>HELADEF1TSK</p>
                    <p><span><b>Bank:</b></span>Taunus Sparkasse</p>
                </div>

                <div className="d-flex items-center justify-between py-3">
                <div className="d-flex items-center">
                <div className="form-checkbox">
                    <input
                    checked={Flight ? true : false}
                    onChange={() => setFlight((pre) => !pre)}
                    type="checkbox"
                    />
                    <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon">
                        <Image
                        width="10"
                        height="8"
                        src="/img/icons/check.svg"
                        alt="icon"
                        />
                    </div>
                    </div>
                </div>
                <div className="ml-10"> Online Payment (Visa, Mastercard, American Express, Japan Credit Bureau (JCB), Discover)</div>
                </div>

                    {/* <div className="text-14">40 €</div> */}
                </div>

                <div className="d-flex items-center justify-between py-3">
                <div className="d-flex items-center">
                <div className="form-checkbox">
                    <input
                    checked={InstallMent ? true : false}
                    // onChange={() => setInstallMent((pre) => !pre)}
                    onChange={checkInstallment}
                    type="checkbox"
                    />
                    <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon">
                        <Image
                        width="10"
                        height="8"
                        src="/img/icons/check.svg"
                        alt="icon"
                        />
                    </div>
                    </div>
                </div>
                <div className="ml-10">Click for Installment Payment</div>
                </div>

                    {/* <div className="text-14">40 €</div> */}
                </div>

                                        <div className={`${InstallMent === false ? 'd-none' : 'd-block'}`}>
                                                <div className="row y-gap-30 contactForm px-50 py-10 ">
                                                  
                                                <div className="col-md-12">
                                                <div className="form-input ">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Total Amount
                                                  </label>
                                                </div>
                                              </div>

                                                <div className="col-md-6">
                                                <div className="form-input ">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    1st Amount
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input ">
                                                  <input type="date" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {/* Birthday */}
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input ">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">2nd Amount</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input ">
                                                  <input type="date" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {/* Birthday */}
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input ">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">3rd Amount</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input ">
                                                  <input type="date" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {/* Birthday */}
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-12">
                                               <div className="mt-0">
                                                    <button className="button -md -info-2 bg-accent-1 text-white col-12">
                                                    Save And Share
                                                    </button>
                                               </div>
                                              </div>
                                            
                                                </div> 
                                            </div>

                <div className="d-flex items-center justify-between py-1">
                <div className="d-flex items-center">
                <div className="form-checkbox">
                    <input
                    checked={onlinePayment ? true : false}
                    onChange={() => setOnlinePayment((pre) => !pre)}
                    type="checkbox"
                    />
                    <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon">
                        <Image
                        width="10"
                        height="8"
                        src="/img/icons/check.svg"
                        alt="icon"
                        />
                    </div>
                    </div>
                </div>
                <div className="ml-10">  Yes, I declare my consent to the <Link href='https://uat.mekkabooking.com/Datenschutz'>data protection</Link> and accept the Declaration of Consent of mekkabooking GmbH</div>
                </div>
                </div>

                <div className="d-flex items-center justify-between py-1">
                <div className="d-flex items-center">
                <div className="form-checkbox">
                    <input
                    checked={check ? true : false}
                    onChange={() => setCheck((pre) => !pre)}
                    type="checkbox"
                    />
                    <div className="form-checkbox__mark">
                    <div className="form-checkbox__icon">
                        <Image
                        width="10"
                        height="8"
                        src="/img/icons/check.svg"
                        alt="icon"
                        />
                    </div>
                    </div>
                </div>
                <div className="ml-10">I have read the AGB (mekkabooking) and I accept the conditions. This trip is operated by the IDEALGATE.</div>
                </div>
                </div>

            </div>
         </div>
              }



{bookingStage == 3 &&
              <div >
              <div className="d-flex flex-column items-center text-center">
                <div className="size-80 rounded-full flex-center bg-accent-1 text-white">
                  <i className="icon-check text-26"></i>
                </div>

                <h2 className="text-30 md:text-24 fw-700 mt-20">
                  System, your order was submitted successfully!
                </h2>
                <div className="mt-10">
                  Booking details has been sent to: booking@tourz.com
                </div>
              </div>

              <div className="border-dashed-1 py-30 px-50 rounded-12 mt-30">
                <div className="row y-gap-15">
                  <div className="col-md-3 col-6">
                    <div>Order Number</div>
                    <div className="text-accent-2">13119</div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div>Date</div>
                    <div className="text-accent-2">27/07/2021</div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div>Total</div>
                    <div className="text-accent-2">40.10 €</div>
                  </div>

                  <div className="col-md-3 col-6">
                    <div>Payment Method</div>
                    <div className="text-accent-2">Direct Bank Transfer</div>
                  </div>
                </div>
              </div>

              <h2 className="text-30 md:text-24 fw-700 mt-60 md:mt-30">
                Order Details
              </h2>

              <div className="d-flex item-center justify-between y-gap-5 pt-30">
                <div className="text-18 fw-500">
                  Westminster Walking Tour & Westminster Abbey Entry
                </div>
                <div className="text-18 fw-500"> 182 € </div>
              </div>

              <div className="mt-25">
                <div className="d-flex items-center justify-between">
                  <div className="fw-500">Date:</div>
                  <div className="">06 April 2023</div>
                </div>

                <div className="d-flex items-center justify-between">
                  <div className="fw-500">Time:</div>
                  <div className="">10:00 am</div>
                </div>

                <div className="d-flex items-center justify-between">
                  <div className="fw-500">Duration:</div>
                  <div className="">12 Days</div>
                </div>

                <div className="d-flex items-center justify-between">
                  <div className="fw-500">Tickets:</div>
                  <div className="">
                    Adult x2 =  98 € - Youth x3 =  383 € - Children x6 =  394 €
                  </div>
                </div>
              </div>

              <div className="line mt-30 mb-30"></div>

              <div className="d-flex item-center justify-between y-gap-5">
                <div className="text-18 fw-500">Service per booking</div>
                <div className="text-18 fw-500"> € 43</div>
              </div>

              <div className="line mt-30 mb-30"></div>

              <div className="d-flex item-center justify-between y-gap-5">
                <div className="text-18 fw-500">
                  Service per person 1 Adult, 2 Youth, 4 Children
                </div>
                <div className="text-18 fw-500"> € 125</div>
              </div>

              <div className="line mt-30 mb-30"></div>

              <div className="row justify-end">
                <div className="col-md-4">
                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500">Subtotal</div>
                    <div className="text-18 fw-500"> 182 € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500">Total</div>
                    <div className="text-18 fw-500"> 23 € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500">Amount Paid</div>
                    <div className="text-18 fw-500"> 3.482 € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="text-18 fw-500">Amount Due</div>
                    <div className="text-18 fw-500"> 43,242 € </div>
                  </div>
                </div>
              </div>
            </div>
}
            </div>
          </div>

          <div className="col-lg-5">
            <div className="pl-50 md:pl-0">
              <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20">
                <h2 className="text-20 fw-500">Reservation Details</h2>

                <div className="d-flex mt-30">
                     <Image
                    width={90}
                    height={84}
                    src="/img/tourCards/1/13.jpeg"
                    alt="image"
                  />
                  <div className="ml-20">
                  Umrah - SOMMER
                  </div>
                </div>

                <div className="line mt-20 mb-20"></div>

                <div className="px-1">
                  <div className="d-flex items-center justify-content-space-arround ">
                    <div className="mr-5"><FaTelegramPlane size={25} color="#DAC04F"/></div>
                    <div className="text-start">Airline: Saudia, Turkish Airlines</div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">From: Berlin (BER)</div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightLand  htTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">Ankunft: Medina</div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">Date of departure: 08.09.2024</div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightLand   size={25} color="#DAC04F" /></div>
                    <div className="text-start">Date of return flight: 16.09.2024</div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><TbWorld  size={25} color="#DAC04F" /></div>
                    <div className="text-start">Offered languages: German, Turkish, Arabic</div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaLuggageCart   size={25} color="#DAC04F" /></div>
                    <div className="text-start">max. Gepäck pro Person: 30 kg</div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaHotel size={20} color="#DAC04F" /></div>
                    <div className="text-start">Makka - (hotel name)</div>
                  </div>

                  <div className="line mt-5 mb-5"></div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaUser size={20} color="#DAC04F" /></div>
                    <div className="text-start flex items-center justify-between"><span> 1 Adult / Multi-bed Room - </span><span><b>1.339,00 €</b></span></div>
                  </div>

                  <br />

                  <p className="my-1">(The standard offer may include a multi-bed room.)</p>


                    <p><b>Selected additional services per person:</b></p>

                  <div className="line mt-20 mb-20"></div>

                  <div className="row">
                    <p className="col-lg-1"><IoIosBed color="#dabf4f" size={20} /></p>
                    <p className="col-lg-6">4 Bettzimmer (Standard)</p>
                    <p className="col-lg-4">+0,00 € x1</p>
                    <p className="col-lg-1">0,0€</p>
                  </div>

                  <div className="row">
                    <p className="col-lg-1"><IoIosBed color="#dabf4f" size={20} /></p>
                    <p className="col-lg-6">3 Bettzimmer</p>
                    <p className="col-lg-4">+ 100,00 € x0 </p>
                    <p className="col-lg-1">0,0€</p>
                  </div>

                  <div className="row">
                    <p className="col-lg-1"><IoIosBed color="#dabf4f" size={20} /></p>
                    <p className="col-lg-6">2 Bettzimmer</p>
                    <p className="col-lg-4">+ 230,00 € x0</p>
                    <p className="col-lg-1">0,0€</p>
                  </div>

                  <div className="row">
                    <p className="col-lg-1"><IoIosBed color="#dabf4f" size={20} /></p>
                    <p className="col-lg-6">1 Bettzimmer</p>
                    <p className="col-lg-4">+ 450,00 € x0</p>
                    <p className="col-lg-1">0,0€</p>
                  </div>


                </div>

                <div className="line mt-20 mb-20"></div>

                {/* <div className="line mt-20 mb-20"></div> */}

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Subtotal</div>
                    <div className=""> 182 € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Total</div>
                    <div className=""> 23 € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Amount Paid</div>
                    <div className=""> 3.482 € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Amount Due</div>
                    <div className=""> 43,242 € </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-12 shadow-2 py-5 px-10 md:py-20 md:px-20 mt-30">
                <h2 className="text-20 fw-500">Do you have a promo code?</h2>

                <div className="contactForm mt-25">
                  <div className="form-input ">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      Promo code
                    </label>
                  </div>
                </div>

                <Link href='/booking-pages'>
                <button className="button -md -outline-accent-1 text-accent-1 mt-30">
                  Back
                </button>
                </Link>
              </div>

              <div className="mt-30">
                <button className="button -md -info-2 bg-accent-1 text-white col-12">
                  Complete Reservation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
