'use client'

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
import { Adult1Data, ReservationData, Adult2InfoData, TotalData, BabyData } from '@/data/CustomerBookingData';

const customStyles = {
  content: {
    marginLeft: '20%',
    // other styles here
  },
  '@media (max-width: 768px)': {
    content: {
      marginLeft: '0%',
    },
  },
  '@media (max-width: 480px)': {
    content: {
      marginLeft: '0%',
    },
  },
};



const CustomerDetaTable = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [Nationality, setNationality] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const ColumnReservation_details = [
    { name: 'Airline', selector: (row) => row.Airline },
    { name: 'From', selector: (row) => row.From },
    { name: 'To', selector: (row) => row.To },
    { name: 'Date of departure', selector: (row) => row.Date_of_departure },
    { name: 'Date of return flight', selector: (row) => row.Date_of_return_flight },
    { name: 'Offered languages', selector: (row) => row.Offered_languages },
    { name: 'Max. Luggage Per Person', selector: (row) => row.max_luggage },
    { name: 'Mekka - (hotel name)', selector: (row) => row.Mekka_hotel },
    { name: 'Madina - (hotel name)', selector: (row) => row.Madina_hotel },
    { name: 'Adult', selector: (row) => row.Adult },
  ];

  const columnAdu_1 = [
    { name: 'name', selector: (row) => row.name },
    { name: 'Surname', selector: (row) => row.surname },
    { name: 'Email', selector: (row) => row.email },
    { name: 'Phone', selector: (row) => row.phone },
    { name: 'City', selector: (row) => row.city },
    { name: 'Gender', selector: (row) => row.gender },
    { name: 'DOB', selector: (row) => row.DOB },
    { name: 'Nationality', selector: (row) => row.Nationality },
    { name: 'House_No', selector: (row) => row.House_No },
    { name: 'Zip_code', selector: (row) => row.Zip_code },
    { name: 'Strect', selector: (row) => row.Strect },
    { name: 'FRA', selector: (row) => row.FRA },
    { name: 'Additional_services', selector: (row) => row.additional_services },
  ];

  const columnAduInfo_2 = [
    { name: 'Name', selector: (row) => row.name },
    { name: 'Surname', selector: (row) => row.surname },
    { name: 'Gender', selector: (row) => row.gender },
    { name: 'DOB', selector: (row) => row.DOB },
    { name: 'Nationality', selector: (row) => row.Nationality },
    { name: 'Additional services', selector: (row) => row.additional_services },
  ];

  const Baby = [
    { name: 'Name', selector: (row) => row.name },
    { name: 'Surname', selector: (row) => row.surname },
    { name: 'Gender', selector: (row) => row.gender },
    { name: 'DOB', selector: (row) => row.DOB },
    { name: 'Nationality', selector: (row) => row.Nationality },
  ];

  const Total = [
    { name: 'Subtotal', selector: (row) => row.Subtotal },
    { name: 'Total', selector: (row) => row.Total },
    { name: 'Amount Paid', selector: (row) => row.Amount_Paid },
    { name: 'Amount Due', selector: (row) => row.Amount_Due },
  ];

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // No need to change subtitle color as it's not being used in this context
  }

  function openPaymentModal() {
    setPaymentModalIsOpen(true);
  }

  function closePaymentModal() {
    setPaymentModalIsOpen(false);
  }

  function closeModal() {
    setIsOpen(false);
    
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  Modal.setAppElement('#modelopen');

  Modal.setAppElement('#pandingPayment');
  return (
    <div>
      <div className="row px-0 py-3 ">
        <h3 className='col-lg-7'>Per Person Details and Price</h3>
        <button className="button -sm -info-2 bg-accent-1 text-white col-lg-2 mx-2" onClick={openPaymentModal}>
          PANDING PAYMENT
        </button>
        <button className="button -sm -info-2 bg-accent-1 text-white col-lg-2 mx-2" onClick={openModal}>
          ADD PERSON
        </button>
      </div>
      <DataTable title='Reservation Details' columns={ColumnReservation_details} data={ReservationData} highlightOnHover />
      <br />
      <DataTable title='Adult-1' columns={columnAdu_1} data={Adult1Data} highlightOnHover />
      <br />
      <DataTable title='Adult-2' columns={columnAduInfo_2} data={Adult2InfoData} highlightOnHover />
      <br />
      <DataTable title='Adult-3' columns={columnAduInfo_2} data={Adult2InfoData} highlightOnHover />
      <br />
      <DataTable title='Child' columns={columnAduInfo_2} data={Adult2InfoData} highlightOnHover />
      <br />
      <DataTable title='Baby' columns={Baby} data={BabyData} highlightOnHover />
      <br />
      <DataTable title='Total' columns={Total} data={TotalData} highlightOnHover />

      
      <div id="modelopen">
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex justify-content-between" id="">
          <h2 className='ml-50'>ADD PERSON</h2>
          <button onClick={closeModal}><IoClose size={25} /></button>
        </div>
        <div className="form_2">
          <div className="row y-gap-30 contactForm px-50 py-20 ">
            <div className="row my-3">
              <div className="col-md-6">
                <div className="form-input spacing">
                  <input type="text" required />
                  <label className="lh-1 text-16 text-light-1">Name</label>
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
                    onChange={(e) => setGender(e.target.value)}
                    required
                    className="form-control"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  <label className="lh-1 text-16 text-light-1">{gender}</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input spacing">
                  <input type="date" required />
                  <label className="lh-1 text-16 text-light-1"></label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-input spacing">
                  <select
                    value={Nationality}
                    onChange={(e) => setNationality(e.target.value)}
                    required
                    className="form-control"
                  >
                    <option value="indian">Indian</option>
                    <option value="german">German</option>
                    <option value="canadian">Canadian</option>
                  </select>
                  <label className="lh-1 text-16 text-light-1">{Nationality}</label>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="row y-gap-20 items-center justify-between">
                <div className="col-12" style={{ borderTop: "2px solid black", borderBottom: "2px solid black" }}>
                  <div className="text-14">
                    <p className="d-flex justify-content-between"><span>Tour price per person</span> <span>1.339,00 €</span></p>
                    {/* <p className="text-right text-15">including taxes and fee</p> */}
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

            <div className="col-12">
           <div className="row">
           <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-3" onClick={() => {alert('person added'); setTimeout(()=>{
              closeModal()
            },2000)}}>
                ADD PERSON
            </button>
            <button className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-3" onClick={closeModal} >
                CANCEL
            </button>
           </div>
            </div>
            {/* <div className='my-3'>
              <p className="text-right text-20">Subtotal <span style={{ color: "#DAC04F" }}><b>1.789,00 €</b></span></p>
              <p className="text-right text-15">including taxes and fee</p>
            </div> */}
          </div>
        </div>
      </Modal>
      </div>

      <div id="pandingPayment">
      <Modal
        isOpen={paymentModalIsOpen}
        onRequestClose={closePaymentModal}
        style={customStyles}
        contentLabel="Pending Payment Modal"
      >
        <div className="d-flex justify-content-between" id="modelopen">
          <h2 className='ml-50'>PENDING PAYMENT</h2>
          <button onClick={closePaymentModal}><IoClose size={25} /></button>
        </div>
        <div className="row y-gap-30 contactForm px-50 py-10">
          <div className="col-md-12">
            <h5 className="text-center">Total Amount - <b>2,55.50 €</b></h5>
          </div>

          <div className="row my-3">

          <div className="col-md-6">
            <div className="form-input spacing">
              <input type="text" required />
              <label className="lh-1 text-16 text-light-1">1st Amount</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-input spacing">
              <input type="date" required />
              <label className="lh-1 text-16 text-light-1"></label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-input spacing">
              <input type="text" required />
              <label className="lh-1 text-16 text-light-1">2nd Amount</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-input spacing">
              <input type="date" required />
              <label className="lh-1 text-16 text-light-1"></label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-input spacing">
              <input type="text" required />
              <label className="lh-1 text-16 text-light-1">3rd Amount</label>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-input spacing">
              <input
                type="date"
                required
                value={selectedDate}
                onChange={handleDateChange}
                disabled={isDisabled}
              />
              <label className="lh-1 text-16 text-light-1"></label>
            </div>
          </div>
          
          </div>

          
        </div>
      </Modal>
      </div>

    </div>
  );
}

export default CustomerDetaTable;