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
  TicketsForVandor,
  ViewTicketsForVandor,
  ViewCustomerDocument,
} from "@/data/CustomerBookingData";
import { VandorSideBookingStatus } from "@/data/tourSingleContent";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";

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

const DocumentStatusManager = ({ Customerid }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [uploadFileisOpen, setuploadFileisOpen] = useState(false);
  const [invoice, setinvoice] = useState(false);
  const [EditData, setEditData] = useState(false);
  const [Adult1Deta, setAdult1Deta] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const [activeTimeDD, setActiveTimeDD] = useState(false);
  const [activeTimeDD1, setActiveTimeDD1] = useState(false);
  const [activeTimeDD2, setActiveTimeDD2] = useState(false);
  const [activeTimeDD3, setActiveTimeDD3] = useState(false);
  const [image1, setImage1] = useState("");
  const [BookingStatus, setBookingStatus] = useState(false);
  const [selectedBookingStatus, setselectedBookingStatus] = useState("");

  // Function to set selected time
  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    Modal.setAppElement("#upload_file");
    Modal.setAppElement("#invoice");
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
    { name: "Name", selector: (row) => row.name, width: "100px" },
    { name: "Surname", selector: (row) => row.surname },
    { name: "Email", selector: (row) => row.email, width: "150px" },
    { name: "Phone", selector: (row) => row.phone, width: "150px" },
    { name: "City", selector: (row) => row.city, width: "150px" },
    { name: "Gender", selector: (row) => row.gender },
    { name: "DOB", selector: (row) => row.DOB },
    { name: "Nationality", selector: (row) => row.Nationality },
    { name: "House No.", selector: (row) => row.House_No },
    { name: "Zip Code", selector: (row) => row.Zip_code },
    { name: "Street", selector: (row) => row.Strect },
    { name: "FRA", selector: (row) => row.FRA },
    {
      name: "Additional Services",
      selector: (row) => row.additional_services,
      width: "150px",
    },
    { name: "Total", selector: (row) => row.Amount },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex_center">
          {/* <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={openAdult1Deta}
          >
            Edit
          </button> */}
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-12 mx-1 text-13 doc-px-5"
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
    { name: "Name", selector: (row) => row.name, width: "100px" },
    { name: "Surname", selector: (row) => row.surname },
    { name: "Gender", selector: (row) => row.gender },
    { name: "DOB", selector: (row) => row.DOB },
    { name: "Nationality", selector: (row) => row.Nationality },
    {
      name: "Additional Services",
      selector: (row) => row.additional_services,
      width: "150px",
    },
    { name: "Total", selector: (row) => row.Amount },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex_center">
          {/* <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={openEditData}
          >
            Edit
          </button> */}
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-12 mx-1 text-13 doc-px-5"
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
    { name: "Name", selector: (row) => row.name, width: "100px" },
    { name: "Surname", selector: (row) => row.surname },
    { name: "Gender", selector: (row) => row.gender },
    { name: "DOB", selector: (row) => row.DOB },
    { name: "Nationality", selector: (row) => row.Nationality },
    { name: "Total", selector: (row) => row.Amount },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex_center">
          {/* <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={openEditData}
          >
            Edit
          </button> */}
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-12 mx-1 text-13 doc-px-5"
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

  function openUploadFileModal() {
    setuploadFileisOpen(true);
  }

  function closeUploadFileModal() {
    setuploadFileisOpen(false);
  }

  function openInvoice() {
    setinvoice(true);
  }

  function closeInvoice() {
    setinvoice(false);
  }

  // for update booking status dropdown

  const [status, setStatus] = useState(null); // Initialize status as null or an object from your options array
  const [Document, setDocument] = useState(null); // Initialize status as null or an object from your options array

  const options = [
    { value: "Cancelled", label: "Cancelled" },
    { value: "Completed", label: "Completed" },
    { value: "In Progress", label: "In Progress" },
  ];

  const VandorDoc = [
    { value: "Visa", label: "Visa" },
    { value: "Hotel Booking Voucher", label: "Hotel Booking Voucher" },
    { value: "Flight Ticket", label: "Flight Ticket" },
  ];

  const handleChange = (selectedOption) => {
    setStatus(selectedOption);
  };

  const handleDocumentChange = (selectedOption) => {
    setDocument(selectedOption);
  };

  return (
    <div>
      <div className="row px-0 py-3 ">
        <div className="col-lg-6">
          <h1 className="text-30">Booking Id : #{Customerid.id}</h1>
          <p className="t_center">Booking Date : 12.08.2024</p>
          <p className="t_center"> Booking Status : Cancelled</p>
        </div>

        <div className="col-lg-6 flex small-flex-center items-center">
          <div className="">
            <button
              className="button -sm -info-2 bg-accent-1 text-white "
              onClick={openInvoice}
            >
              Send Invoice
            </button>
          </div>

          <div className="">
            <div>
              <Select
                options={options}
                value={status}
                onChange={handleChange}
                className="dd-statusChange"
                isClearable
              />
            </div>
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
                      <Select
                        options={VandorDoc}
                        value={Document}
                        onChange={handleDocumentChange}
                        className="dd-vendor"
                        isClearable
                      />
                    </div>
                    <div className="col-md-4 px-0 mx-2">
                      <div className="row my-2 ">
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
                          <button
                            type="button"
                            className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                          >
                            +
                          </button>
                        </div>
                        <div className="mx-1">
                          <button
                            type="button"
                            className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row item-center my-3">
                    <div className="col-md-4 px-0 mx-0">
                      <Select
                        options={VandorDoc}
                        value={Document}
                        onChange={handleDocumentChange}
                        className="dd-vendor"
                        isClearable
                      />
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
                          <button
                            type="button"
                            className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                          >
                            +
                          </button>
                        </div>
                        <div className="mx-1">
                          <button
                            type="button"
                            className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row item-center my-3">
                    <div className="col-md-4 px-0 mx-0">
                      <Select
                        options={VandorDoc}
                        value={Document}
                        onChange={handleDocumentChange}
                        className="dd-vendor"
                        isClearable
                      />
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
                          <button
                            type="button"
                            className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                          >
                            +
                          </button>
                        </div>
                        <div className="mx-1">
                          <button
                            type="button"
                            className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                          >
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
                  data={ViewTicketsForVandor}
                  highlightOnHover
                />
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="Your Documents"
                  columns={DownloadData}
                  data={ViewCustomerDocument}
                  highlightOnHover
                />
              </TabPanel>
            </Tabs>
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
          <h4>Your invoice Number Is : #123216 </h4>
        </Modal>
      </div>
    </div>
  );
};

export default DocumentStatusManager;
