'use client'

import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";
import Image from 'next/image';
import { Adult1Data, ReservationData, Adult2InfoData, TotalData, BabyData } from '@/data/CustomerBookingData';

const customStyles = {
  content: {
    // top: '50%',
    // left: '50%',
    // right: 'auto',
    // bottom: 'auto',
    marginLeft: '20%',
    // transform: 'translate(-50%, -50%)',
  },
};

// Assuming you have an element with ID 'root' in your main HTML file
Modal.setAppElement('#root');

const CustomerDetaTable = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState('');
  const [Nationality, setNationality] = useState('');

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

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div id="root">
      <div className="row px-3 py-3">
        <h3 className='col-lg-10'>Per Person Details and Price</h3>
        <button className="button -md -info-2 bg-accent-1 text-white col-lg-2" onClick={openModal}>
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

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="d-flex justify-content-between">
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
                    <p className="text-right text-15">including taxes and fee</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12">
            <button className="button -md -info-2 bg-accent-1 text-white col-lg-2 my-4" onClick={() => {alert('person added'); setTimeout(()=>{
              closeModal()
            },2000)}}>
                ADD PERSON
            </button>
            </div>
            {/* <div className='my-3'>
              <p className="text-right text-20">Subtotal <span style={{ color: "#DAC04F" }}><b>1.789,00 €</b></span></p>
              <p className="text-right text-15">including taxes and fee</p>
            </div> */}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CustomerDetaTable;
