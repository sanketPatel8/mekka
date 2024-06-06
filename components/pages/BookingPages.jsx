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
import Modal from 'react-modal';
import { FaFacebookF } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { FaApple } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)', 
    zIndex: 1000 
  },
  content: {
    top: '50%',
    left: '40%',
    right: 'auto',
    bottom: 'auto',
    marginLeft: '10%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    // borderRadius: '10px',
    width: '40%', // Adjust width as needed
    maxWidth: '80%', // Adjust max-width as needed
    height: '80vh', // Set a specific height for the modal
    overflowY: 'auto', // Make content scrollable if it exceeds the height
    backgroundColor: '#fff' 
  },
};


export default function BookingPages() {

  const [roomType, setRoomType] = useState("");
  const [bookingStage, setBookingStage] = useState(1)
  const [gender, setGender] = useState('Gender');
  const [Nationality, setNationality] = useState('Nationality');
  const [From, setFrom] = useState('Frankfurt(FRA)');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  let subtitle;

useEffect(() => {
    console.log('Selected room type:', roomType);
}, [roomType]);

useEffect(() => {
  Modal.setAppElement('#openSignIn');
}, []);


const getModalStyles = () => {
  if (windowWidth < 480) {
    return {
      ...customStyles,
      content: {
        ...customStyles.content,
        width: '90%', // full width for small screens
      }
    };
  } else if (windowWidth < 768) {
    return {
      ...customStyles,
      content: {
        ...customStyles.content,
        width: '80%', // medium width for tablet screens
      }
    };
  } else {
    return customStyles;
  }
};

const handleResize = () => {
  setWindowWidth(window.innerWidth);
};

useEffect(() => {
  window.addEventListener('resize', handleResize);
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);





function openModal() {
  setIsOpen(true);
}

function afterOpenModal() {

}

function closeModal() {
  setIsOpen(false);
}




  return (
    <>
    <section className="layout-pt-md layout-pb-lg mt-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 ">
            <div className="bg-white rounded-12  py-15">
             <button  onClick={()=>{
              openModal()
             }}><a className="text-accent-1 px-1">Sign in </a> </button>book with your saved details or continue as a guest to book your travel.
            </div>
            <h2 className="text-30 md:text-24 fw-700 bg-Primary">
              Steps to reserve
              </h2>

            <div className="bg-white rounded-12 md:py-20 md:px-20 mt-10">

              {bookingStage == 1 &&
            <div className="border-1 rounded-12 overflow-hidden shadow-1">
                                        
                <div className="form_1" >
                <div  className="px-50 py-5 yellow_bg">
                  <p><span><FaUser /></span><span> <b>1. Adult information</b></span></p>
                  <p><span><MdError /></span><span> Is also the contact person for the reservation.</span></p>
                </div>

                <div className="row y-gap-30 contactForm px-10 py-20 ml-10">
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

                
                  <div className="col-12 px-40">
                    <div className="row y-gap-20 items-center justify-between ">
                      <div className="col-12 tb-border">
                        <div className="text-14 ">
                        <p className="d-flex justify-content-between"><span>Tour price per person</span> <span>1.339,00 €</span></p>
                        </div>
                      </div>
  
                    </div>
                  </div>

                  <div className="my-3 border_b px-40">
                  <h5 className="text-18 fw-500 my-2">Possible additional services per person:</h5>

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

                  <div className="px-40">
                    <p className="text-right text-20">Subtotal <span className='text-accent-1'><b>1.789,00 €</b></span></p>
                    <p className="text-right text-15">including taxes and fee</p>
                  </div>
                </div>
                </div>
                                                
                <div className="form_2">
                    <div className="px-50 py-5 yellow_bg">
                      <p><span><FaUser /></span><span> <b>2 . Adult Information</b></span></p>
                    </div>
                    <div className="row y-gap-30 contactForm px-10 py-20 ml-10">
                      
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

                  <div className="col-12 px-40">
                    <div className="row y-gap-20 items-center justify-between">
                      <div className="col-12 tb-border">
                        <div className="text-14">
                        <p className="d-flex justify-content-between"><span>Tour price per person</span> <span>1.339,00 €</span></p>
                        </div>
                      </div>

                    </div>
                  </div>

                  <div className="my-3 border_b px-40">
                  <h5 className="text-18 fw-500 my-2">Possible additional services per person:</h5>

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

                  <div className="px-40">
                    <p className="text-right text-20">Subtotal <span className='text-accent-1'><b>1.789,00 €</b></span></p>
                    <p className="text-right text-15">including taxes and fee</p>
                  </div>

                    </div> 
                </div>

                <div className="form_3">
                    <div  className="px-50 py-5 yellow_bg">
                      <p><span><FaUser /></span><span> <b>3 . Adult Information</b></span></p>
                    </div>
                    <div className="row y-gap-30 contactForm px-10 py-20 ml-10">
                      
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

                  <div className="col-12 px-40">
                    <div className="row y-gap-20 items-center justify-between">
                      <div className="col-12 tb-border">
                        <div className="text-14 ">
                        <p className="d-flex justify-content-between"><span>Tour price per person</span> <span>1.339,00 €</span></p>
                        </div>
                      </div>
  
                    </div>
                  </div>

                  <div className="my-3 border_b px-40">
                  <h5 className="text-18 fw-500 my-2">Possible additional services per person:</h5>

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

                  <div className="px-40">
                    <p className="text-right text-20">Subtotal <span className='text-accent-1'><b>1.789,00 €</b></span></p>
                    <p className="text-right text-15">including taxes and fee</p>
                  </div>

                    </div> 
                </div>

                <div className="form_4">
                    <div  className="px-50 py-5 yellow_bg">
                      <p><span><FaUser /></span><span> <b>1 . Child Information</b></span></p>
                    </div>
                    <div className="row y-gap-30 contactForm px-10 py-20 ml-10">
                      
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

                  <div className="col-12 px-40">
                    <div className="row y-gap-20 items-center justify-between">
                      <div className="col-12 tb-border">
                        <div className="text-14 ">
                        <p className="d-flex justify-content-between"><span>Tour price per child</span> <span>1.339,00 €</span></p>
                        </div>
                      </div>
  
                    </div>
                  </div>

                  <div className="my-3 border_b px-40">
                  <h5 className="text-18 fw-500 my-2">Possible additional services per person:</h5>

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

                  <div className="px-40">
                    <p className="text-right text-20">Subtotal <span className='text-accent-1'><b>1.789,00 €</b></span></p>
                    <p className="text-right text-15">including taxes and fee</p>
                  </div>

                    </div> 
                </div>

                <div className="form_5">
                    <div className="px-50 py-5 yellow_bg">
                      <p><span><FaUser /></span><span> <b>1 . Baby Information</b></span></p>
                    </div>
                    <div className="row y-gap-30 contactForm px-10 py-20 ml-10">
                      
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

                  <div className="col-12 px-40">
                    <div className="row y-gap-20 items-center justify-between">
                      <div className="col-12 tb-border">
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
              <div className="bg-white border-1 rounded-12 shadow-2 py-20 px-20 md:py-20 md:px-20 tourSingleSidebar">
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

                <div className="line mt-10 mb-2"></div>

                <div className="px-1">
                  <div className="d-flex items-center justify-content-space-arround ">
                    <div className="mr-5"><FaTelegramPlane size={25} color="#DAC04F"/></div>
                    <div className="text-start">Airline: Royal Jordanian, Egyptair</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">From: Frankfurt (FRA)</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightLand  htTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">To: Medina</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightTakeoff size={25} color="#DAC04F" /></div>
                    <div className="text-start">Departure : 26.06.2024 18:00</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><MdFlightLand   size={25} color="#DAC04F" /></div>
                    <div className="text-start">Return : 05.07.2024 23:00</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><TbWorld  size={25} color="#DAC04F" /></div>
                    <div className="text-start">Offered languages: German, Arabic</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaLuggageCart   size={25} color="#DAC04F" /></div>
                    <div className="text-start">Max Luggage per person: 30 kg</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaHotel size={20} color="#DAC04F" /></div>
                    <div className="text-start">Mekka - (hotel name)</div>
                  </div>

                  <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaHotel size={20} color="#DAC04F" /></div>
                    <div className="text-start">Madina - (hotel name)</div>
                  </div>

                  {/* <div className="d-flex items-center justify-content-space-arround">
                    <div className="mr-5"><FaUser size={20} color="#DAC04F" /></div>
                    <div className="text-start flex items-center justify-between"><span> 1 Adult / Multi-bed Room - </span><span><b>1.339,00 €</b></span></div>
                  </div> */}

                  <p className="text-12">(The standard offer may include a multi-bed room.)</p>

                 
                </div>

                <div className="line mt-10 mb-10"></div>

                {/* <div className="line mt-20 mb-20"></div> */}

                <div className="">
                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Subtotal</div>
                    <div className=""> 182 € </div>
                  </div>

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Tax</div>
                    <div className=""> 23 € </div>
                  </div>

                  {/* <div className="d-flex items-center justify-between">
                    <div className="fw-500">Amount Paid</div>
                    <div className=""> 3.482 € </div>
                  </div> */}

                  <div className="d-flex items-center justify-between">
                    <div className="fw-500">Amount Due</div>
                    <div className=""> 43,242 € </div>
                  </div>
                </div>
                <div className="bg-white rounded-12 shadow-2 py-0 px-0 md:py-10 md:px-20 mt-10 ">
                <h2 className="text-20 fw-500 ">Do you have a promo code?</h2>

                <div className="contactForm mt-10">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-2 text-16 text-light-1 top-29">
                      Promo code
                    </label>
                  </div>
                </div>

              </div>

              {/* <div className="mt-30">
                <button onClick={()=>setBookingStage(pre=>pre+1)} style={{alignSelf:'end'}}  className={`button -md -info-2 bg-accent-1 text-white col-12  € {bookingStage == 2 ? 'hiddenButtonBooking ButtonBooking' : 'ButtonBooking'} `}>
                Complete Reservation</button>
              </div> */}

              <div className="mt-2">
              <Link href='/payment'>
                <button className={`button -md -info-2 bg-accent-1 text-white col-12 text-end} `}>
                Proceed to Payment</button>
                </Link>
              </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>
      
    </section>
    <div id="openSignIn">
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={getModalStyles()}
      contentLabel="Example Modal"
    >

          <section className="">

          <div className="d-flex justify-content-between my-3 px-2" id="">
          <h2 className='ml-10'></h2>
          <button onClick={closeModal}><IoClose size={25} /></button>
        </div>
            
            <form
              onSubmit={(e) => e.preventDefault()}
              className="contactForm border-1  rounded-12 px-40 py-3 "
            >
          <h2 className='text-center'>LOG IN</h2>
              <div className="form-input spacing">
                <input type="email" required />
                <label className="lh-1 text-16 text-light-1">
                  Email Address
                </label>
              </div>

              <div className="form-input spacing">
                <input type="email" required />
                <label className="lh-1 text-16 text-light-1">Password</label>
              </div>

              <div className="row y-ga-10 justify-between items-center pt-30 spacing">
                <div className="col-auto">
                  <div className="d-flex items-center">
                    <div className="form-checkbox ">
                      <input type="checkbox" name="name" />
                      <div className="form-checkbox__mark">
                        <div className="form-checkbox__icon">
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.29082 0.971021C9.01235 0.692189 8.56018 0.692365 8.28134 0.971021L3.73802 5.51452L1.71871 3.49523C1.43988 3.21639 0.987896 3.21639 0.709063 3.49523C0.430231 3.77406 0.430231 4.22604 0.709063 4.50487L3.23309 7.0289C3.37242 7.16823 3.55512 7.23807 3.73783 7.23807C3.92054 7.23807 4.10341 7.16841 4.24274 7.0289L9.29082 1.98065C9.56965 1.70201 9.56965 1.24984 9.29082 0.971021Z"
                              fill="white"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="lh-11 ml-10">Remember me</div>
                  </div>
                </div>

                <div className="col-auto">
                  <a href="#">Lost your password?</a>
                </div>
              </div>

             <div className="row y-gap-15">
                <div className="col">
                <Link href='/customer/db-booking'>
                      <button
                        type="submit"
                        className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                      >
                        Customer Log In
                      </button>
                  </Link>
                </div>

                <div className="col">
                <Link href='/vendor/db-main'>
                      <button
                        type="submit"
                        className="button -md -info-2 bg-accent-1 text-white col-12 mt-30"
                      >
                        Agent Log in
                      </button>
                  </Link>
                </div>
              </div>

              <div className="relative line mt-50 mb-30">
                <div className="line__word fw-500">OR</div>
              </div>

               <div className="row y-gap-15">
                <div className="col">
                  <button
                    type="submit"
                    className="button -md -outline-blue-1 text-blue-1 col-12"
                  >
                   <FaFacebookF size={15} className="mx-1"/>
                    Facebook
                  </button>
                </div>

                <div className="col">
                  <button className="button -md -outline-red-1 text-red-1 col-12">
                  <FaGoogle size={15} className="mx-1" />
                  Google
                  </button>
                </div>
              </div><br />
              <div className="row y-gap-15">
                <div className="col">
                  <button className="button -md -outline-dark-1 text-dark-1 col-12">
                  <FaApple size={15} className="mx-1" />
                    Sign in With Apple
                  </button>
                </div>
              </div>
            </form>
        
    </section>

    </Modal>
    </div>
    </>
  );
}
