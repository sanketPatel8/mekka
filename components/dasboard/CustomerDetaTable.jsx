"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import {
  Adult1Data,
  ReservationData,
  Adult2InfoData,
  TotalData,
  BabyData,
  documentData,
  documentDataFile,
} from "@/data/CustomerBookingData";
import { collapseClasses } from "@mui/material";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "40%",
    right: "auto",
    bottom: "auto",
    marginLeft: "10%",
    transform: "translate(-50%, -50%)",
    padding: "10px",
    // borderRadius: '10px',
    width: "100%", // Adjust width as needed
    maxWidth: "700px", // Adjust max-width as needed
    height: "80vh", // Set a specific height for the modal
    overflowY: "auto",
    backgroundColor: "#fff",
  },
};

const customStylesForPendingPayment = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: 1000,
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginLeft: "10%",
    transform: "translate(-50%, -50%)",
    padding: "20px",
    // borderRadius: '10px',
    width: "70%", // Adjust width as needed
    maxWidth: "70%", // Adjust max-width as needed
    height: "80vh", // Set a specific height for the modal
    overflowY: "auto", // Make content scrollable if it exceeds the height
    backgroundColor: "#fff",
  },
};

const CustomerDetaTable = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [uploadFileisOpen, setuploadFileisOpen] = useState(false);
  const [invoice, setinvoice] = useState(false)
  const [EditData, setEditData] = useState(false);
  const [Adult1Deta, setAdult1Deta] = useState(false);
  const [CanclePopUp, setCanclePopUp] = useState(false);
  const [gender, setGender] = useState("");
  const [Nationality, setNationality] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTimeDD, setActiveTimeDD] = useState(false);
  const [activeTimeDD1, setActiveTimeDD1] = useState(false);
  const [activeTimeDD2, setActiveTimeDD2] = useState(false);
  const [image1, setImage1] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [From, setFrom] = useState("Frankfurt(FRA)");

  const handleRadioChange = (event) => {
    console.log(event.target.value);
    setRadioValue(event.target.value);
  };

  useEffect(() => {
    Modal.setAppElement("#modelopen");
    Modal.setAppElement("#pendingpayment");
    Modal.setAppElement("#CanclePop_up");
    Modal.setAppElement("#upload_file");
    Modal.setAppElement("#editData");
    Modal.setAppElement("#Adult1Data");
    Modal.setAppElement('#invoice')
  }, []);

  const ColumnReservation_details = [
    { name: "Airline", selector: (row) => row.Airline },
    { name: "From", selector: (row) => row.From },
    { name: "To", selector: (row) => row.To },
    { name: "Departure", selector: (row) => row.Date_of_departure },
    { name: "Return", selector: (row) => row.Date_of_return_flight },
    // { name: 'Offered languages', selector: (row) => row.Offered_languages },
    // { name: 'Max Luggage', selector: (row) => row.max_luggage },
    { name: "Mekka", selector: (row) => row.Mekka_hotel },
    { name: "Madina", selector: (row) => row.Madina_hotel },
    { name: "Adult", selector: (row) => row.Adult },
  ];

  const columnAdu_1 = [
    { name: "Name", selector: (row) => row.name , width : "100px" },
    { name: "Surname", selector: (row) => row.surname },
    { name: "Email", selector: (row) => row.email , width : "150px" },
    { name: "Phone", selector: (row) => row.phone , width : "150px"},
    { name: "City", selector: (row) => row.city , width : "150px"},
    { name: "Gender", selector: (row) => row.gender },
    { name: "DOB", selector: (row) => row.DOB },
    { name: "Nationality", selector: (row) => row.Nationality },
    { name: "House No.", selector: (row) => row.House_No },
    { name: "Zip Code", selector: (row) => row.Zip_code },
    { name: "Street", selector: (row) => row.Strect },
    { name: "FRA", selector: (row) => row.FRA },
    { name: "Additional Services", selector: (row) => row.additional_services , width : "150px" },
    { name: "Total", selector: (row) => row.Amount },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={openAdult1Deta}
          >
            Edit
          </button>
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
            Document
          </button>
        </div>
      ),
      width: "200px", // Set a custom width for the button column
    },
  ];

  const columnAduInfo_2 = [
    { name: "Name", selector: (row) => row.name , width : "100px" },
    { name: "Surname", selector: (row) => row.surname },
    { name: "Gender", selector: (row) => row.gender },
    { name: "DOB", selector: (row) => row.DOB },
    { name: "Nationality", selector: (row) => row.Nationality },
    { name: "Additional Services", selector: (row) => row.additional_services , width : "150px" },
    { name: "Total", selector: (row) => row.Amount },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={openEditData}
          >
            Edit
          </button>
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
            Document
          </button>
        </div>
      ),
      width: "200px", // Set a custom width for the button column
    },
  ];

  const Baby = [
    { name: "Name", selector: (row) => row.name , width : "100px" },
    { name: "Surname", selector: (row) => row.surname },
    { name: "Gender", selector: (row) => row.gender },
    { name: "DOB", selector: (row) => row.DOB },
    { name: "Nationality", selector: (row) => row.Nationality },
    { name: "Total", selector: (row) => row.Amount },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={openEditData}
          >
            Edit
          </button>
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
            Document
          </button>
        </div>
      ),
      width: "200px", // Set a custom width for the button column
    },
  ];

  const Total = [
    { name: "Subtotal", selector: (row) => row.Subtotal },
    { name: "Tax", selector: (row) => row.Total },
    { name: "Discount", selector: (row) => row.Discount },
    // { name: 'Amount Paid', selector: (row) => row.Amount_Paid },
    { name: "Total", selector: (row) => row.Total },
    { name: "Amount Due", selector: (row) => row.Amount_Due },
  ];

  const FileDeta = [
    { name: "Document Name", selector: (row) => row.Name },
    {
      name: "Action",
      selector: (row) => (
        <button className="button -sm -accent-1 bg-info-2 text-white my-2">
          View
        </button>
      ),
    },
  ];

  const DownloadData = [
    { name: "Document Name", selector: (row) => row.Name },
    {
      name: "Action",
      selector: (row) => (
        <button className="button -sm -accent-1 bg-info-2 text-white my-2">
          Download
        </button>
      ),
    },
  ];

  function afterOpenModal() {
    // No need to change subtitle color as it's not being used in this context
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openPaymentModal() {
    setPaymentModalIsOpen(true);
  }

  function closePaymentModal() {
    setPaymentModalIsOpen(false);
  }

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  function openCancelPopUp() {
    setCanclePopUp(true);
  }

  function CloseCancelPopUp() {
    setCanclePopUp(false);
  }

  function openUploadFileModal() {
    setuploadFileisOpen(true);
  }

  function closeUploadFileModal() {
    setuploadFileisOpen(false);
  }

  function openEditData() {
    setEditData(true);
  }

  function closeEditData() {
    setEditData(false);
  }

  function openAdult1Deta() {
    setAdult1Deta(true);
  }

  function closeAdult1Deta() {
    setAdult1Deta(false);
  }

  function openInvoice() {
    setinvoice(true);
  }

  function closeInvoice() {
    setinvoice(false);
  }

  return (
    <div>
      <div className="row px-0 py-3 ">
        <div className="col-lg-6">
          <h3 className="t_center">Booking Details : #123216</h3>
          <p className="t_center">Booked Date : 12.08.2024</p>
          <p className="t_center">Booking Status : Pending</p>
          <p className="text-red t_center">Available 10 seats</p>
        </div>

        <div className="col-lg-6 flex small-flex-center">
          <div className="">
            <button
              className="button -sm -info-2 bg-accent-1 text-white "
              onClick={openInvoice}
            >
              Print Invoice
            </button>
          </div>

          <div className="">
            <button
              className="button -sm -accent-1 bg-info-2 text-white "
              onClick={openPaymentModal}
            >
              Pay
            </button>
            <span>(10,00 €)</span>
          </div>

          <div className="">
            <button
              className="button -sm -info-2 bg-accent-1 text-white "
              onClick={openModal}
            >
              Add Person
            </button>
          </div>
        </div>
      </div>
      <DataTable
        title="Reservation Details"
        columns={ColumnReservation_details}
        data={ReservationData}
        highlightOnHover
      />
      <br />
      <DataTable
        title="Adult-1"
        columns={columnAdu_1}
        data={Adult1Data}
        highlightOnHover
      />
      <br />
      <DataTable
        title="Adult-2"
        columns={columnAduInfo_2}
        data={Adult2InfoData}
        highlightOnHover
      />
      <br />
      <DataTable
        title="Adult-3"
        columns={columnAduInfo_2}
        data={Adult2InfoData}
        highlightOnHover
      />
      <br />
      <DataTable
        title="Child"
        columns={columnAduInfo_2}
        data={Adult2InfoData}
        highlightOnHover
      />
      <br />
      <DataTable title="Baby" columns={Baby} data={BabyData} highlightOnHover />
      <br />
      <DataTable
        title="Total"
        columns={Total}
        data={TotalData}
        highlightOnHover
      />
      <br />

      <button
        className="button -sm -red-2 bg-red-3 text-white col-lg-2 mx-2"
        onClick={openCancelPopUp}
      >
        Cancel
      </button>

      <div id="modelopen">
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div className="d-flex justify-content-between" id="">
            <h2 className="t_center px-20">ADD PERSON</h2>
            <button onClick={closeModal}>
              <IoClose size={25} />
            </button>
          </div>
          <div className="form_2">
            <div className=" y-gap-30 contactForm px-20 py-20 ">
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
                    <label className="lh-1 text-16 text-light-1">
                      {gender}
                    </label>
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
                    <label className="lh-1 text-16 text-light-1">
                      {Nationality}
                    </label>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row y-gap-20 items-center justify-between">
                  <div className="col-12 tb-border">
                    <div className="text-14">
                      <p className="d-flex justify-content-between">
                        <span>Tour price per person</span>{" "}
                        <span>1.339,00 €</span>
                      </p>
                      {/* <p className="text-right text-15">including taxes and fee</p> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-3 border_b px-md-40">
                <h5 className="text-18 fw-500 my-2">
                  Possible additional services per person:
                </h5>

                <div>
                  <div className="d-flex items-center justify-between radio_hight">
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio">
                          <input
                            type="radio"
                            name="radioGroup"
                            value="f-1-bed-4"
                            checked={radioValue === "f-1-bed-4"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          {/* <span className="text-14 lh-1 ml-10"></span> */}
                        </label>
                      </div>
                      <div className="ml-10">4 Bettzimmer (Standard)</div>
                    </div>
                    <div className="text-14">0,00 €</div>
                  </div>

                  <div className="d-flex items-center justify-between radio_hight">
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio">
                          <input
                            type="radio"
                            name="radioGroup"
                            value="f-1-bed-3"
                            checked={radioValue === "f-1-bed-3"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                        </label>
                      </div>
                      <div className="ml-10">3 Bettzimmer</div>
                    </div>
                    <div className="text-14">+100,00€</div>
                  </div>

                  <div className="d-flex items-center justify-between radio_hight">
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio">
                          <input
                            type="radio"
                            name="radioGroup"
                            value="f-1-bed-2"
                            checked={radioValue === "f-1-bed-2"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                        </label>
                      </div>
                      <div className="ml-10">2 Bettzimmer</div>
                    </div>
                    <div className="text-14">+230,00€</div>
                  </div>

                  <div className="d-flex items-center justify-between radio_hight">
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio">
                          <input
                            type="radio"
                            name="radioGroup"
                            value="f-1-bed-1"
                            checked={radioValue === "f-1-bed-1"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          {/* <span className="text-14 lh-1 ml-10">Item 1</span> */}
                        </label>
                      </div>
                      <div className="ml-10">1 Bettzimmer</div>
                    </div>
                    <div className="text-14">+450,00€</div>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row">
                  <button
                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                    onClick={() => {
                      alert("person added");
                      setTimeout(() => {
                        closeModal();
                      }, 2000);
                    }}
                  >
                    ADD PERSON
                  </button>
                  <button
                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                    onClick={closeModal}
                  >
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

      <div id="pendingpayment">
        <Modal
          isOpen={paymentModalIsOpen}
          onRequestClose={closePaymentModal}
          style={customStyles}
          contentLabel="Pending Payment Modal"
        >
          <div className="d-flex justify-content-between p-2" id="modelopen">
            <h2 className="px-20">PENDING PAYMENT</h2>
            <button onClick={closePaymentModal}>
              <IoClose size={25} />
            </button>
          </div>
          <div className=" y-gap-30 contactForm px-20 py-10">
            <div className="col-md-12">
              <h5 className="mb-3 t_center mt-3">
                Total Amount : <b>2,55.50 €</b>
              </h5>
            </div>

            <div className="row">
              <div className="col-md-5 col-12">
                <div className="form-input spacing">
                  <input type="text" value="85,17 €" />
                  <label className="lh-1 text-16 text-light-1">
                    1st Amount
                  </label>
                </div>
              </div>

              <div className="col-md-5 col-12">
                <div className="form-input spacing">
                  <input
                    type="text"
                    value="31.05.2024"
                    placeholder=""
                    disabled
                  />
                  <label className="lh-1 text-16 text-light-1 ">Date</label>
                </div>
              </div>

              <div className="col-md-2 col-12">
                <button
                  className="button -sm -green-2 bg-green-3 text-dark my-4 mx-0 full_width text-white "
                  disabled
                >
                  PAID
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-5">
                <div className="form-input spacing">
                  <input type="text" required value="85,17 €" />
                  <label className="lh-1 text-16 text-light-1">
                    2nd Amount
                  </label>
                </div>
              </div>

              <div className="col-md-5">
                <div className="row">
                  <div className="form-input spacing">
                    <input
                      type="text"
                      value="31.05.2024"
                      placeholder=""
                      required
                    />
                    <label className="lh-1 text-16 text-light-1 ">Date</label>
                  </div>
                </div>
              </div>

              <div className="col-md-2">
                <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-0 full_width text-white  ">
                  PAY
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-5">
                <div className="form-input spacing">
                  <input type="text" required value="85,17 €" />
                  <label className="lh-1 text-16 text-light-1">
                    3rd Amount
                  </label>
                </div>
              </div>

              <div className="col-md-5">
                <div className="row">
                  <div className="form-input spacing">
                    <input
                      type="text"
                      value="31.05.2024"
                      placeholder=""
                      required
                    />
                    <label className="lh-1 text-16 text-light-1 ">Date</label>
                  </div>
                </div>
              </div>

              <div className="col-md-2">
                <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-0 full_width text-white ">
                  PAY
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <div id="CanclePop_up">
        <Modal
          isOpen={CanclePopUp}
          onRequestClose={CloseCancelPopUp}
          style={customStyles}
          contentLabel="Pending Payment Modal"
        >
          <div className="d-flex justify-content-between" id="modelopen">
            <h2 className="">Cancel Trip</h2>
            <button onClick={CloseCancelPopUp}>
              <IoClose size={25} />
            </button>
          </div>

          <div className=" y-gap-30 contactForm px-10 py-10">
            <table className="ttable table-success table-striped my-3 custom-table-bordered full_width">
              <thead>
                <tr>
                  <th scope="col" className="px-1 py-2">
                    <b>Type of fee</b>
                  </th>
                  <th scope="col" className="px-1 py-2">
                    <b>Fee (gross)</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-1 py-2">Total Package Fees</td>
                  <td className="px-1 py-2">300.00 €</td>
                </tr>
                <tr>
                  <td className="px-1 py-2">Mekka Fees</td>
                  <td className="px-1 py-2">0.00 €</td>
                </tr>
                <tr>
                  <td className="px-1 py-2">Total Tax Amount</td>
                  <td className="px-1 py-2">-13.00 €</td>
                </tr>
                <tr>
                  <td className="px-1 py-2">Agent Payable</td>
                  <td className="px-1 py-2">1.000,00 €</td>
                </tr>
              </tbody>
            </table>

            <hr />

            <table className="table table-success table-striped my-3 custom-table-bordered full_width">
              <thead>
                <tr>
                  <th scope="col" className="px-1 py-2">
                    <b>Time frame</b>
                  </th>
                  <th scope="col" className="px-1 py-2">
                    <b>MekkaBooking Fee</b>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-1 py-2">0 hours to 3 hours*</td>
                  <td className="px-1 py-2 ">ADULT : Non Refundable</td>
                </tr>
                <tr>
                  <td className="px-1 py-2">3 hours to 4 days*</td>
                  <td className="px-1 py-2">ADULT : 3,500 € + 300 € </td>
                </tr>
                <tr>
                  <td className="px-1 py-2">4 days to 365 days*</td>
                  <td className="px-1 py-2">ADULT : 3,000 € + 300 €</td>
                </tr>
              </tbody>
            </table>

            <div className="col-lg-12 d-flex justify-content-center">
              <button
                className="button -sm -red-2 bg-red-3 text-white"
                onClick={() => {
                  alert("Your Booking Is canceled !!");
                  setTimeout(() => {
                    CloseCancelPopUp();
                  }, 2000);
                }}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <div id="upload_file">
        <Modal
          isOpen={uploadFileisOpen}
          onRequestClose={closeUploadFileModal}
          style={customStyles}
          contentLabel="Pending Payment Modal"
        >
          <div className="d-flex justify-content-between" id="modelopen">
            <h2 className="ml-20 my-3">Document</h2>
            <button onClick={closeUploadFileModal}>
              <IoClose size={25} />
            </button>
          </div>

          <div className="ml-20">
            <Tabs>
              <TabList>
                <Tab>Upload</Tab>
                <Tab>View</Tab>
                <Tab>Download</Tab>
              </TabList>

              <TabPanel>
                <div className="">
                  <div className="row item-center my-3 ">
                    <div className="col-md-4 px-0 mx-0">
                      <div className="searchForm -type-1 -sidebar my-2">
                        <div className="searchForm__form">
                          <div className="searchFormItem js-select-control js-form-dd">
                            <div
                              className="searchFormItem__button"
                              onClick={() => setActiveTimeDD((pre) => !pre)}
                              data-x-click="time"
                            >
                              <div className="searchFormItem__content">
                                <h5>Document</h5>
                                <div className="js-select-control-chosen">
                                  {selectedTime
                                    ? selectedTime
                                    : "Choose Document"}
                                </div>
                              </div>
                              <div className="searchFormItem__icon_chevron">
                                <i className="icon-chevron-down d-flex text-18"></i>
                              </div>
                            </div>

                            <div
                              className={`searchFormItemDropdown -tour-type ${
                                activeTimeDD ? "is-active" : ""
                              }`}
                              data-x="time"
                              data-x-toggle="is-active"
                            >
                              <div className="searchFormItemDropdown__container">
                                <div className="searchFormItemDropdown__list sroll-bar-1">
                                  {documentData.map((elm, i) => (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        setSelectedTime((pre) =>
                                          pre == elm ? "" : elm
                                        );
                                        setActiveTimeDD(false);
                                      }}
                                      className="searchFormItemDropdown__item"
                                    >
                                      <button className="js-select-control-button">
                                        <span className="js-select-control-choice">
                                          {elm}
                                        </span>
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 px-0 mx-2">
                      <div className="row my-2 ">
                        {image1 ? (
                          <div className="col-auto my-3" >
                            <div className="relative">
                              <Image
                                width={200}
                                height={200}
                                src={image1}
                                alt="image"
                                className="size-200 rounded-12 object-cover my-3"
                              />
                              <button
                                onClick={() => {
                                  setImage1("");
                                }}
                                className="absoluteIcon1 button -dark-1"
                              >
                                <i className="icon-delete text-18"></i>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="col-auto  pl-20-doc-img">
                            <label
                              htmlFor="imageInp1"
                              className="size_50 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column item-center"
                            >
                              <div className="text-16 fw-500 text-accent-1">
                                Upload Document
                              </div>
                            </label>
                            <input
                              onChange={(e) => handleImageChange(e, setImage1)}
                              accept="image/*"
                              id="imageInp1"
                              type="file"
                              style={{ display: "none" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3 px-0 mx-0">
                      <div className="px-0 py-0 d-flex justify-content-start">
                        <div className="mx-1">
                          <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-1 mx-0 full_width ">
                            +
                          </button>
                        </div>
                        <div className="mx-1" >
                          <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-1 mx-0 full_width">
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row item-center my-3">
                    <div className="col-md-4 px-0 mx-0">
                      <div className="searchForm -type-1 -sidebar my-2">
                        <div className="searchForm__form">
                          <div className="searchFormItem js-select-control js-form-dd">
                            <div
                              className="searchFormItem__button"
                              onClick={() => setActiveTimeDD1((pre) => !pre)}
                              data-x-click="time"
                            >
                              <div className="searchFormItem__content">
                                <h5>Document</h5>
                                <div className="js-select-control-chosen">
                                  {selectedTime
                                    ? selectedTime
                                    : "Choose Document"}
                                </div>
                              </div>
                              <div className="searchFormItem__icon_chevron">
                                <i className="icon-chevron-down d-flex text-18"></i>
                              </div>
                            </div>

                            <div
                              className={`searchFormItemDropdown -tour-type ${
                                activeTimeDD1 ? "is-active" : ""
                              }`}
                              data-x="time"
                              data-x-toggle="is-active"
                            >
                              <div className="searchFormItemDropdown__container">
                                <div className="searchFormItemDropdown__list sroll-bar-1">
                                  {documentData.map((elm, i) => (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        setSelectedTime((pre) =>
                                          pre == elm ? "" : elm
                                        );
                                        setActiveTimeDD1(false);
                                      }}
                                      className="searchFormItemDropdown__item"
                                    >
                                      <button className="js-select-control-button">
                                        <span className="js-select-control-choice">
                                          {elm}
                                        </span>
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 px-0 mx-2">
                      <div className="row my-2 flex_center">
                        {image1 ? (
                          <div className="col-auto my-3">
                            <div className="relative">
                              <Image
                                width={200}
                                height={200}
                                src={image1}
                                alt="image"
                                className="size-200 rounded-12 object-cover my-3"
                              />
                              <button
                                onClick={() => {
                                  setImage1("");
                                }}
                                className="absoluteIcon1 button -dark-1"
                              >
                                <i className="icon-delete text-18"></i>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="col-auto  pl-20-doc-img">
                            <label
                              htmlFor="imageInp1"
                              className="size_50 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column item-center"
                            >
                              <div className="text-16 fw-500 text-accent-1 ">
                                Upload Document
                              </div>
                            </label>
                            <input
                              onChange={(e) => handleImageChange(e, setImage1)}
                              accept="image/*"
                              id="imageInp1"
                              type="file"
                              style={{ display: "none" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3 px-0 mx-0">
                      <div className="px-0 py-0 d-flex justify-content-start">
                        <div className="mx-1">
                          <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-1 mx-0 full_width ">
                            +
                          </button>
                        </div>
                        <div className="mx-1" >
                          <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-1 mx-0 full_width">
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row item-center my-3">
                    <div className="col-md-4 px-0 mx-0">
                      <div className="searchForm -type-1 -sidebar my-2">
                        <div className="searchForm__form">
                          <div className="searchFormItem js-select-control js-form-dd">
                            <div
                              className="searchFormItem__button"
                              onClick={() => setActiveTimeDD2((pre) => !pre)}
                              data-x-click="time"
                            >
                              {/* <div className="searchFormItem__icon size-50 rounded-12 bg-light-1 flex-center">
                    <i className="text-20 icon-clock"></i>
                  </div> */}
                              <div className="searchFormItem__content">
                                <h5>Document</h5>
                                <div className="js-select-control-chosen">
                                  {selectedTime
                                    ? selectedTime
                                    : "Choose Document"}
                                </div>
                              </div>
                              <div className="searchFormItem__icon_chevron">
                                <i className="icon-chevron-down d-flex text-18"></i>
                              </div>
                            </div>

                            <div
                              className={`searchFormItemDropdown -tour-type ${
                                activeTimeDD2 ? "is-active" : ""
                              }`}
                              data-x="time"
                              data-x-toggle="is-active"
                            >
                              <div className="searchFormItemDropdown__container">
                                <div className="searchFormItemDropdown__list sroll-bar-1">
                                  {documentData.map((elm, i) => (
                                    <div
                                      key={i}
                                      onClick={() => {
                                        setSelectedTime((pre) =>
                                          pre == elm ? "" : elm
                                        );
                                        setActiveTimeDD2(false);
                                      }}
                                      className="searchFormItemDropdown__item"
                                    >
                                      <button className="js-select-control-button">
                                        <span className="js-select-control-choice">
                                          {elm}
                                        </span>
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 px-0 mx-2">
                      <div className="row my-2">
                        {image1 ? (
                          <div className="col-auto my-3">
                            <div className="relative">
                              <Image
                                width={200}
                                height={200}
                                src={image1}
                                alt="image"
                                className="size-200 rounded-12 object-cover my-3"
                              />
                              <button
                                onClick={() => {
                                  setImage1("");
                                }}
                                className="absoluteIcon1 button -dark-1"
                              >
                                <i className="icon-delete text-18"></i>
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="col-auto  pl-20-doc-img">
                            <label
                              htmlFor="imageInp1"
                              className="size_50 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column item-center"
                            >
                              <div className="text-16 fw-500 text-accent-1">
                                Upload Document
                              </div>
                            </label>
                            <input
                              onChange={(e) => handleImageChange(e, setImage1)}
                              accept="image/*"
                              id="imageInp1"
                              type="file"
                              style={{ display: "none" }}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-3 px-0 mx-0">
                      <div className="px-0 py-0 d-flex justify-content-start">
                        <div className="mx-1">
                          <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-1 mx-0 full_width ">
                            +
                          </button>
                        </div>
                        <div className="mx-1" >
                          <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-1 mx-0 full_width">
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-center gap-md-2">
                    <button
                      className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-3 mx-2"
                      onClick={() => {
                        alert("submited");
                      }}
                    >
                      SUBMIT
                    </button>
                    <button
                      className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-3 mx-2"
                      onClick={closeUploadFileModal}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="Your Documents"
                  columns={FileDeta}
                  data={documentDataFile}
                  highlightOnHover
                />
              </TabPanel>
              <TabPanel>
              <DataTable
                  title="Your Documents"
                  columns={DownloadData}
                  data={documentDataFile}
                  highlightOnHover
                />
              </TabPanel>
            </Tabs>
          </div>
        </Modal>
      </div>

      <div id="editData">
        <Modal
          isOpen={EditData}
          onRequestClose={closeEditData}
          style={customStyles}
          contentLabel="Pending Payment Modal"
        >
          <div className="d-flex justify-content-between" id="modelopen">
            <h2 className="px-20">Edit Your Details</h2>
            <button onClick={closeEditData}>
              <IoClose size={25} />
            </button>
          </div>

          <div className="form_2">
            <div className=" y-gap-30 contactForm px-20 py-20 ">
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
                    <label className="lh-1 text-16 text-light-1">
                      {gender}
                    </label>
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
                    <label className="lh-1 text-16 text-light-1">
                      {Nationality}
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="row">
                  <button
                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                    onClick={() => {
                      alert("Edit successfully !!");
                      setTimeout(() => {
                        closeEditData();
                      }, 2000);
                    }}
                  >
                    SAVE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>

      <div id="Adult1Data">
        <Modal
          isOpen={Adult1Deta}
          onRequestClose={closeAdult1Deta}
          style={customStyles}
          contentLabel="Pending Payment Modal"
        >
          <div className="d-flex justify-content-between" id="modelopen">
            <h2 className="px-20">Edit You Details</h2>
            <button onClick={closeAdult1Deta}>
              <IoClose size={25} />
            </button>
          </div>

          <div className="form_1">
            <div className=" y-gap-30 contactForm px-20 py-20 ">
              <div className="my-3 row">
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
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">Email</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">Phone</label>
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
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
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
                      onChange={(e) => {
                        setNationality(e.target.value);
                      }}
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
                    <label className="lh-1 text-16 text-light-1">Street</label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input spacing">
                    <select
                      value={From}
                      onChange={(e) => {
                        setFrom(e.target.value);
                      }}
                      required
                      className="form-control"
                    >
                      {/* <option value="" disabled>Nationality</option> */}
                      <option value="Frankfurt">Frankfurt(FRA)</option>
                    </select>
                    <label className="lh-1 text-16 text-light-1">{From}</label>
                  </div>
                </div>
              </div>
              <button
                className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                onClick={() => {
                  alert("Edit successfully !!");
                  setTimeout(() => {
                    closeAdult1Deta();
                  }, 2000);
                }}
              >
                SAVE
              </button>
            </div>
          </div>
        </Modal>
      </div>

      <div id="invoice">
      <Modal
          isOpen={invoice}
          onRequestClose={closeInvoice}
          style={customStyles}
          contentLabel="Pending Payment Modal"
        >
          <div className="d-flex justify-content-between" id="modelopen">
            <h2 className="px-20">Invoice</h2>
            <button onClick={closeInvoice}>
              <IoClose size={25} />
            </button>
          </div>

          <h1>Your invoice Here ......</h1>
          </Modal>
      </div>

    </div>
  );
};

export default CustomerDetaTable;
