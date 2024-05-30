'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from 'react';
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import { FaTelegramPlane } from "react-icons/fa";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md"
import { TbWorld } from "react-icons/tb";
import { FaLuggageCart } from "react-icons/fa";
import { FaHotel } from "react-icons/fa6";
import '@/public/css/index.css';


export default function BookingPages() {
  const [roomType, setRoomType] = useState("");
  const [hotelMakka, setHotelMakka] = useState("");
  const [bookingStage, setBookingStage] = useState(1)
  const [gender, setGender] = useState('Gender');
  const [Nationality, setNationality] = useState('Nationality');
  const [From, setFrom] = useState('Frankfurt(FRA)');
  

//   const handleChange = (e) => {
//     const selectedRoomType = e.target.value;
//     setRoomType(selectedRoomType);
//     alert(`Selected room type:  € {selectedRoomType}`);
// };

useEffect(() => {
    console.log('Selected room type:', roomType);
}, [roomType]);

  return (
    <section className="layout-pt-md layout-pb-lg mt-header">
      <div className="container">
        <div className="row">

        

          <div className="col-lg-8">
            <div className="bg-white rounded-12 shadow-2 py-15 px-20">
              <Link href="/login" className="text-accent-1">
                Sign in
              </Link>{" "}
              to book with your saved details or
              <Link href="/register" className="text-accent-1">
                {" "}
                register
              </Link>{" "}
              to manage your bookings on the go!
            </div>
            <h2 className="text-30 md:text-24 fw-700 bg-Primary ml-30">
              Steps to reserve
              </h2>

            <div className="bg-white rounded-12  py-30 px-30 md:py-20 md:px-20 mt-10">

              {bookingStage == 1 &&
                                      <div style={{ borderRadius : "20px" , overflow : "hidden" , border : "1px solid black"}} >
                                    
                                            <div className="form_1" >
                                            <div style={{backgroundColor : "#DAC04F"}} className="px-50 py-5">
                                              <p><span><FaUser /></span><span> <b>1. Adult information</b></span></p>
                                              <p><span><MdError /></span><span> Is also the contact person for the reservation.</span></p>
                                            </div>

                                            <div className="row y-gap-30 contactForm px-50 py-20  ">
                                              <div className="my-3 row">

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Name
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">Surname</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">Email</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Phone
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">City</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={gender} 
                                                              onChange={(e) => {setGender(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Select Gender</option> */}
                                                              <option value="male">Male</option>
                                                              <option value="female">Female</option>
                                                              <option value="other">Other</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                              {gender}
                                                          </label>
                                                      </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="date" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    {/* Birthday */}
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={Nationality} 
                                                              onChange={(e)=>{setNationality(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Nationality</option> */}
                                                              <option value="indian">Indian</option>
                                                              <option value="german">German</option>
                                                              <option value="canadian">Canadian</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                          {Nationality}
                                                          </label>
                                                      </div>
                                              </div>

                                              <div className="col-lg-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    House No
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-lg-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    ZIP code
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-lg-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Street
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={From} 
                                                              onChange={(e)=>{setFrom(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Nationality</option> */}
                                                              <option value="Frankfurt">Frankfurt(FRA)</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                          {From}
                                                          </label>
                                                      </div>
                                              </div> 

                                              </div> 

                                            
                                              <div className="col-12">
                                                <div className="row y-gap-20 items-center justify-between">
                                                  <div className="col-12" style={{borderTop : "2px solid black", borderBottom : "2px solid black"}}>
                                                    <div className="text-14 ">
                                                    <p className="d-flex justify-content-between"><span>Tour price per person</span> <span>1.339,00 €</span></p>
                                                    </div>
                                                  </div>
                              
                                                </div>
                                              </div>

                                              <div style={{borderBottom : "2px solid black"}}>
                                              <h5 className="text-18 fw-500 mb-20 mt-10">Possible additional services per person:</h5>

                                              <div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="4Bettzimmer"
                                                                  // checked={roomType === "4Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">4 Bettzimmer (Standard)</div>
                                                      </div>
                                                      <div className="text-14">0,00 €</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="3Bettzimmer"
                                                                  // checked={roomType === "3Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">3 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+100,00€</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="2Bettzimmer"
                                                                  // checked={roomType === "2Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">2 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+230,00€</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="1Bettzimmer"
                                                                  // checked={roomType === "1Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">1 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+450,00€</div>
                                                  </div>
                                                  
                                              </div>
                                                 
                                              </div>

                                              <div>
                                                <p className="text-right text-20">Subtotal <span style={{color : "#DAC04F"}}><b>1.789,00 €</b></span></p>
                                                <p className="text-right text-15">including taxes and fee</p>
                                              </div>
                                            </div>
                                            </div>
                                            
                                            <div className="form_2">
                                                <div style={{backgroundColor : "#DAC04F"}} className="px-50 py-5">
                                                  <p><span><FaUser /></span><span> <b>2 . Adult Information</b></span></p>
                                                </div>
                                                <div className="row y-gap-30 contactForm px-50 py-20 ">
                                                  
                                             <div className="row my-3">
                                             <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Name
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">Surname</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={gender} 
                                                              onChange={(e) => {setGender(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Select Gender</option> */}
                                                              <option value="male">Male</option>
                                                              <option value="female">Female</option>
                                                              <option value="other">Other</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                              {gender}
                                                          </label>
                                                      </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="date" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Birthday
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={Nationality} 
                                                              onChange={(e)=>{setNationality(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Nationality</option> */}
                                                              <option value="indian">Indian</option>
                                                              <option value="german">German</option>
                                                              <option value="canadian">Canadian</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                          {Nationality}
                                                          </label>
                                                      </div>
                                              </div>
                                             </div>

                                              <div className="col-12">
                                                <div className="row y-gap-20 items-center justify-between">
                                                  <div className="col-12" style={{borderTop : "2px solid black", borderBottom : "2px solid black"}}>
                                                    <div className="text-14 ">
                                                    <p className="d-flex justify-content-between"><span>Tour price per person</span> <span>1.339,00 €</span></p>
                                                    </div>
                                                  </div>
                              
                                                </div>
                                              </div>

                                              <div style={{borderBottom : "2px solid black"}}>
                                              <h5 className="text-18 fw-500 mb-20 mt-10">Possible additional services per person:</h5>

                                              <div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="4Bettzimmer"
                                                                  // checked={roomType === "4Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">4 Bettzimmer (Standard)</div>
                                                      </div>
                                                      <div className="text-14">0,00 €</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="3Bettzimmer"
                                                                  // checked={roomType === "3Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">3 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+100,00€</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="2Bettzimmer"
                                                                  // checked={roomType === "2Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">2 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+230,00€</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="1Bettzimmer"
                                                                  // checked={roomType === "1Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">1 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+450,00€</div>
                                                  </div>

                                                  </div>
                                              </div>

                                              <div>
                                                <p className="text-right text-20">Subtotal <span style={{color : "#DAC04F"}}><b>1.789,00 €</b></span></p>
                                                <p className="text-right text-15">including taxes and fee</p>
                                              </div>

                                                </div> 
                                            </div>

                                            <div className="form_3">
                                                <div style={{backgroundColor : "#DAC04F"}} className="px-50 py-5">
                                                  <p><span><FaUser /></span><span> <b>3 . Adult Information</b></span></p>
                                                </div>
                                                <div className="row y-gap-30 contactForm px-50 py-20 ">
                                                  
                                               <div className="row my-3">
                                               <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Name
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">Surname</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={gender} 
                                                              onChange={(e) => {setGender(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Select Gender</option> */}
                                                              <option value="male">Male</option>
                                                              <option value="female">Female</option>
                                                              <option value="other">Other</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                              {gender}
                                                          </label>
                                                      </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="date" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Birthday
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={Nationality} 
                                                              onChange={(e)=>{setNationality(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Nationality</option> */}
                                                              <option value="indian">Indian</option>
                                                              <option value="german">German</option>
                                                              <option value="canadian">Canadian</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                          {Nationality}
                                                          </label>
                                                      </div>
                                              </div>
                                               </div>

                                              <div className="col-12">
                                                <div className="row y-gap-20 items-center justify-between">
                                                  <div className="col-12" style={{borderTop : "2px solid black", borderBottom : "2px solid black"}}>
                                                    <div className="text-14 ">
                                                    <p className="d-flex justify-content-between"><span>Tour price per person</span> <span>1.339,00 €</span></p>
                                                    </div>
                                                  </div>
                              
                                                </div>
                                              </div>

                                              <div style={{borderBottom : "2px solid black"}}>
                                              <h5 className="text-18 fw-500 mb-20 mt-10">Possible additional services per person:</h5>

                                              <div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="4Bettzimmer"
                                                                  // checked={roomType === "4Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">4 Bettzimmer (Standard)</div>
                                                      </div>
                                                      <div className="text-14">0,00 €</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="3Bettzimmer"
                                                                  // checked={roomType === "3Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">3 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+100,00€</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="2Bettzimmer"
                                                                  // checked={roomType === "2Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">2 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+230,00€</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="1Bettzimmer"
                                                                  // checked={roomType === "1Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">1 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+450,00€</div>
                                                  </div>

                                              </div>
                                              </div>

                                              <div>
                                                <p className="text-right text-20">Subtotal <span style={{color : "#DAC04F"}}><b>1.789,00 €</b></span></p>
                                                <p className="text-right text-15">including taxes and fee</p>
                                              </div>

                                                </div> 
                                            </div>

                                            <div className="form_4">
                                                <div style={{backgroundColor : "#DAC04F"}} className="px-50 py-5">
                                                  <p><span><FaUser /></span><span> <b>1 . Child Information</b></span></p>
                                                </div>
                                                <div className="row y-gap-30 contactForm px-50 py-20 ">
                                                  
                                                <div className="row my-3">
                                                <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Name
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">Surname</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={gender} 
                                                              onChange={(e) => {setGender(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Select Gender</option> */}
                                                              <option value="male">Male</option>
                                                              <option value="female">Female</option>
                                                              <option value="other">Other</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                              {gender}
                                                          </label>
                                                      </div>
                                                  </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="date" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Birthday
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={Nationality} 
                                                              onChange={(e)=>{setNationality(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Nationality</option> */}
                                                              <option value="indian">Indian</option>
                                                              <option value="german">German</option>
                                                              <option value="canadian">Canadian</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                          {Nationality}
                                                          </label>
                                                      </div>
                                                  </div>
                                                </div>

                                              <div className="col-12">
                                                <div className="row y-gap-20 items-center justify-between">
                                                  <div className="col-12" style={{borderTop : "2px solid black", borderBottom : "2px solid black"}}>
                                                    <div className="text-14 ">
                                                    <p className="d-flex justify-content-between"><span>Tour price per child</span> <span>1.339,00 €</span></p>
                                                    </div>
                                                  </div>
                              
                                                </div>
                                              </div>

                                              <div style={{borderBottom : "2px solid black"}}>
                                              <h5 className="text-18 fw-500 mb-20 mt-10">Possible additional services per person:</h5>

                                              <div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="4Bettzimmer"
                                                                  // checked={roomType === "4Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">4 Bettzimmer (Standard)</div>
                                                      </div>
                                                      <div className="text-14">0,00 €</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="3Bettzimmer"
                                                                  // checked={roomType === "3Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">3 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+100,00€</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="2Bettzimmer"
                                                                  // checked={roomType === "2Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">2 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+230,00€</div>
                                                  </div>

                                                  <div className="d-flex items-center justify-between radio_hight">
                                                      <div className="d-flex items-center">
                                                          <div className="form-radio">
                                                              <input
                                                                  type="radio"
                                                                  name="roomType"
                                                                  className="radio-label"
                                                                  value="1Bettzimmer"
                                                                  // checked={roomType === "1Bettzimmer"}
                                                                  // onChange={handleChange}
                                                              />
                                                              <div className="form-radio__mark">
                                                                  <div className="form-radio__icon">
                                                                      <Image
                                                                          width="10"
                                                                          height="8"
                                                                          src="/img/icons/check.svg"
                                                                          alt="icon"
                                                                      />
                                                                  </div>
                                                              </div>
                                                          </div>
                                                          <div className="ml-10">1 Bettzimmer</div>
                                                      </div>
                                                      <div className="text-14">+450,00€</div>
                                                  </div>

                                              </div>

                                              </div>

                                              <div>
                                                <p className="text-right text-20">Subtotal <span style={{color : "#DAC04F"}}><b>1.789,00 €</b></span></p>
                                                <p className="text-right text-15">including taxes and fee</p>
                                              </div>

                                                </div> 
                                            </div>

                                            <div className="form_5">
                                                <div style={{backgroundColor : "#DAC04F"}} className="px-50 py-5">
                                                  <p><span><FaUser /></span><span> <b>1 . Baby Information</b></span></p>
                                                </div>
                                                <div className="row y-gap-30 contactForm px-50 py-20 ">
                                                  
                                                <div className="row my-3">
                                                  <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Name
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="text" required />
                                                  <label className="lh-1 text-16 text-light-1">Surname</label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={gender} 
                                                              onChange={(e) => {setGender(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Select Gender</option> */}
                                                              <option value="male">Male</option>
                                                              <option value="female">Female</option>
                                                              <option value="other">Other</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                              {gender}
                                                          </label>
                                                      </div>
                                                  </div>

                                              <div className="col-md-6">
                                                <div className="form-input spacing">
                                                  <input type="date" required />
                                                  <label className="lh-1 text-16 text-light-1">
                                                    Birthday
                                                  </label>
                                                </div>
                                              </div>

                                              <div className="col-md-6">
                                                      <div className="form-input spacing">
                                                          <select 
                                                              value={Nationality} 
                                                              onChange={(e)=>{setNationality(e.target.value)}} 
                                                              required 
                                                              className="form-control"
                                                          >
                                                              {/* <option value="" disabled>Nationality</option> */}
                                                              <option value="indian">Indian</option>
                                                              <option value="german">German</option>
                                                              <option value="canadian">Canadian</option>
                                                          </select>
                                                          <label className="lh-1 text-16 text-light-1">
                                                          {Nationality}
                                                          </label>
                                                      </div>
                                                  </div>
                                                </div>

                                              <div className="col-12">
                                                <div className="row y-gap-20 items-center justify-between">
                                                  <div className="col-12" style={{borderTop : "2px solid black", borderBottom : "2px solid black"}}>
                                                    <div className="text-14 ">
                                                    <p className="d-flex justify-content-between"><span>Tour price per Baby</span> <span>1.339,00 €</span></p>
                                                    <p className="text-right text-15">including taxes and fee</p>
                                                    </div>
                                                  </div>
                              
                                                </div>
                                              </div>

                                            

                                            
                                                </div> 
                                            </div>

                                      </div>
              }


            </div>
          </div>

          <div className="col-lg-4 ">
            <div className="pl-50 md:pl-0 ">
              <div className="bg-white rounded-12 shadow-2 py-30 px-30 md:py-20 md:px-20 tourSingleSidebar">
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

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">From: Berlin (BER)</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightLand  htTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">Ankunft: Medina</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">Date of departure: 08.09.2024</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightLand   size={25} color="#DAC04F" /></div>
                    <div className="text-start">Date of return flight: 16.09.2024</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><TbWorld  size={25} color="#DAC04F" /></div>
                    <div className="text-start">Offered languages: German, Turkish, Arabic</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaLuggageCart   size={25} color="#DAC04F" /></div>
                    <div className="text-start">max. Gepäck pro Person: 30 kg</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaHotel size={20} color="#DAC04F" /></div>
                    <div className="text-start">Makka - (hotel name)</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaHotel size={20} color="#DAC04F" /></div>
                    <div className="text-start">Madina - (hotel name)</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaUser size={20} color="#DAC04F" /></div>
                    <div className="text-start flex items-center justify-between"><span> 1 Adult / Multi-bed Room - </span><span><b>1.339,00 €</b></span></div>
                  </div>

                  <p>(The standard offer may include a multi-bed room.)</p>

                 
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
                <div className="bg-white rounded-12 shadow-2 py-0 px-0 md:py-10 md:px-20 mt-30">
                <h2 className="text-20 fw-500">Do you have a promo code?</h2>

                <div className="contactForm mt-25">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-2 text-16 text-light-1">
                      Promo code
                    </label>
                  </div>
                </div>

                <Link href='/payment'>
                <button className="button -md -outline-accent-1 text-accent-1 mt-30">
                  Apply
                  <i className="icon-arrow-top-right text-16 ml-10"></i>
                </button>
                </Link>
              </div>

              {/* <div className="mt-30">
                <button onClick={()=>setBookingStage(pre=>pre+1)} style={{alignSelf:'end'}}  className={`button -md -info-2 bg-accent-1 text-white col-12  € {bookingStage == 2 ? 'hiddenButtonBooking ButtonBooking' : 'ButtonBooking'} `}>
                Complete Reservation</button>
              </div> */}

              <div className="mt-30">
              <Link href='/payment'>
                <button  style={{alignSelf:'end'}}  className={`button -md -info-2 bg-accent-1 text-white col-12 } `}>
                Complete Reservation</button>
                </Link>
              </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
