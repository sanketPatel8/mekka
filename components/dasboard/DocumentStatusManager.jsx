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
  ViewTicketsForVandor,
  ViewCustomerDocument,
} from "@/data/CustomerBookingData";
import { VandorSideBookingStatus } from "@/data/tourSingleContent";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import { useTranslation } from "@/app/context/TranslationContext";

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

const DocumentStatusManager = ({ Customerid, bookings,adultHeaders,adultBookings,uploadFileisOpen, setuploadFileisOpen }) => {
  console.log(adultBookings, "adultBookings");
  const [invoice, setinvoice] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");


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

  

  const columnAduInfo_2 = [
    // { name: "Name", selector: (row) => row.name, width: "100px" },
    // { name: "Surname", selector: (row) => row.surname },
    // { name: "Gender", selector: (row) => row.gender },
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
          {/* <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-12 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
             {translate("Document") }
          </button> */}
        </div>
      ),
      width: "200px", // Set a custom width for the button column
    },
  ];

  const Baby = [
    // { name: "Name", selector: (row) => row.name, width: "100px" },
    // { name: "Surname", selector: (row) => row.surname },
    // { name: "Gender", selector: (row) => row.gender },
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
          {/* <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-12 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
             {translate("Document") }
          </button> */}
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
          View {translate(" ") }
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
          Download {translate(" ") }
        </button>
      ),
    },
  ];

  function afterOpenModal() {
    // No need to change subtitle color as it's not being used in this context
  }

  // function openUploadFileModal() {
  //   setuploadFileisOpen(true);
  // }

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



  // for add document row and remove row 

  // const [uploadFileisOpen, setuploadFileisOpen] = useState(false);
  const [rows, setRows] = useState([{ id: 1, image: "", document: null }]); // State to manage rows

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, image: "", document: null }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  const handleDocumentChange = (selectedOption, index) => {
    const newRows = [...rows];
    newRows[index].document = selectedOption;
    setRows(newRows);
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const newRows = [...rows];
      newRows[index].image = reader.result;
      setRows(newRows);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const { translate } = useTranslation();
  return (
    <div>
       <h1 className="text-30"> {translate("Booking Id") } : #{Customerid.id}</h1>
      <div className="row px-0 pb-10 mt-20">
        <div className="col-lg-6">
          <p className="t_center"> {translate("Booking Date") } : 12.08.2024</p>
         
        </div>

        <div className="col-lg-6 flex small-flex-center items-center">
          <div className="">
            <button
              className="button -sm -info-2 bg-accent-1 text-white "
              onClick={openInvoice}
            >
               {translate("Send Invoice") }
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
      {/* {
        bookings.flightInfo.length > 0 &&  
        <>
        
        </>
      } */}
      
      <DataTable
        title="Reservation Details"
        columns={ColumnReservation_details}
        data={ReservationData}
        highlightOnHover
      />
      <br />

      {
        adultBookings &&
        <>
        
        <DataTable
          title="Adult : Adult Name (Gender)"
          columns={adultHeaders}
          data={adultBookings}
          highlightOnHover
        />
        <br />
        </>
      }
     
      <DataTable
        title="Children : Children Name (Gender)"
        columns={columnAduInfo_2}
        data={Adult2InfoData}
        highlightOnHover
      />
      <br />
      <DataTable title="Baby : Baby Name (Gender)" columns={Baby} data={BabyData} highlightOnHover />
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
            <h2 className="ml-20 my-3"> {translate("Document") }</h2>
            <button onClick={closeUploadFileModal}>
              <IoClose size={25} />
            </button>
          </div>

          <div className="ml-lg-20 ml-0 ">
            <Tabs>
              <TabList>
                <Tab> {translate("Upload") }</Tab>
                <Tab> {translate("View") }</Tab>
                <Tab> {translate("Download") }</Tab>
              </TabList>

              <TabPanel>
                <div className="overflow-hidden overflow-lg-auto">
                  {rows.map((row, index) => (
                    <div className="row item-center my-3" key={row.id}>
                      <div className="col-md-4 px-0 mx-0 pl-lg-50">
                        <Select
                          options={VandorDoc}
                          value={row.document}
                          onChange={(selectedOption) =>
                            handleDocumentChange(selectedOption, index)
                          }
                          className="dd-vendor"
                          isClearable
                        />
                      </div>
                      <div className="col-md-4 px-0 mx-2">
                        <div className="row my-2 flex_center ">
                          {row.image ? (
                            <div className="col-auto my-3">
                              <div className="relative">
                                <Image
                                  width={200}
                                  height={200}
                                  src={row.image}
                                  alt="image"
                                  className="size-200 rounded-12 object-cover my-3"
                                />
                                <button
                                  onClick={() => {
                                    const newRows = [...rows];
                                    newRows[index].image = "";
                                    setRows(newRows);
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
                                htmlFor={`imageInp-${index}`}
                                className="size_50 rounded-12 border-dash-1 bg-accent-1-05 flex-center flex-column item-center"
                              >
                                <div className="text-16 fw-500 text-accent-1">
                                   {translate("Upload Document") }
                                </div>
                              </label>
                              <input
                                onChange={(e) => handleImageChange(e, index)}
                                accept="image/*"
                                id={`imageInp-${index}`}
                                type="file"
                                style={{ display: "none" }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-2 px-0 mx-0">
                        <div className="px-0 py-0 d-flex justify-content-center justify-content-lg-start">
                          <div className="mx-1">
                            <button
                              type="button"
                              className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40"
                              onClick={addRow}
                            >
                              +
                            </button>
                          </div>
                          {index > 0 && (
                            <div className="mx-1">
                              <button
                                type="button"
                                className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40"
                                onClick={() => removeRow(index)}
                              >
                                -
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className="d-flex justify-content-center gap-md-2">
                    <button
                      className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-3 mx-2"
                      onClick={() => {
                        alert("submited");
                      }}
                    >
                       {translate("SUBMIT") }
                    </button>
                    <button
                      className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-3 mx-2"
                      onClick={closeUploadFileModal}
                    >
                       {translate("CANCEL") }
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
                  title="Customer Documents"
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
            <h2 className="px-20"> {translate("Invoice") }</h2>
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
