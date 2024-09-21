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
  ViewCustomerDocument,
} from "@/data/CustomerBookingData";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "@/app/context/TranslationContext";
import { showSuccessToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { POST } from "@/app/utils/api/post";

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
    width: "100%",
    maxWidth: "700px",
    height: "80vh",
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
    width: "70%",
    maxWidth: "70%",
    height: "80vh",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
};

const CustomerDetaTable = ({ BookingDetails }) => {
  const { translate } = useTranslation();

  const [modalIsOpen, setIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [uploadFileisOpen, setuploadFileisOpen] = useState(false);
  const [invoice, setinvoice] = useState(false);
  const [EditData, setEditData] = useState(false);
  const [Adult1Deta, setAdult1Deta] = useState(false);
  const [CanclePopUp, setCanclePopUp] = useState(false);
  const [gender, setGender] = useState("");
  const [Nationality, setNationality] = useState("");
  const [radioValue, setRadioValue] = useState("");
  const [From, setFrom] = useState("Frankfurt(FRA)");
  const [editCustomerData, setEditCustomerData] = useState({
    name: "",
    surname: "",
    gender: "male", // Default value
    birthday: "",
    nationality: "indian", // Default value
  });
  const [PersonalUserID, setPersonalUserID] = useState(0);

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  useEffect(() => {
    Modal.setAppElement("#modelopen");
    Modal.setAppElement("#pendingpayment");
    Modal.setAppElement("#CanclePop_up");
    Modal.setAppElement("#upload_file");
    Modal.setAppElement("#editData");
    Modal.setAppElement("#Adult1Data");
    Modal.setAppElement("#invoice");
  }, []);

  const ColumnReservation_details = [
    {
      name: translate("Airline"),
      selector: (row) => row?.airlines,
    },
    // {
    //   name: translate("From"),
    //   selector: (row) => "aa column rakhva ni che k nai",
    // },
    {
      name: translate("To"),
      selector: (row) => (row?.type == "Umrah" ? "Madina" : "Hajj"),
    },
    {
      name: translate("Departure"),
      selector: (row) =>
        row?.departures
          ?.map((departureItem) => departureItem?.departure)
          .join(", ") || "N/A",
      width: "200px",
    },

    { name: translate("Return"), selector: (row) => row.date_end },
    { name: translate("Mekka"), selector: (row) => row.mekka_hotel },
    { name: translate("Madina"), selector: (row) => row.madina_hotel },
    { name: translate("Adult"), selector: (row) => row.adults },
    { name: translate("Child"), selector: (row) => row.child },
    { name: translate("Baby"), selector: (row) => row.baby },
  ];

  const columnAdu_1 = [
    // { name: "Name", selector: (row) => row.name , width : "100px" },
    // { name: "Surname", selector: (row) => row.surname },
    { name: translate("Email"), selector: (row) => row.email, width: "150px" },
    { name: translate("Phone"), selector: (row) => row.mobile, width: "150px" },
    { name: translate("City"), selector: (row) => row.city, width: "150px" },
    // { name: "Gender", selector: (row) => row.gender },
    { name: translate("DOB"), selector: (row) => row.birthday },
    { name: translate("Nationality"), selector: (row) => row.nationality },
    { name: translate("House No."), selector: (row) => row.houseNumber },
    { name: translate("Zip Code"), selector: (row) => row.plz },
    { name: translate("Street"), selector: (row) => row.Strect },
    {
      name: translate("Additional Services"),
      selector: (row) => row.title,
      width: "150px",
    },
    { name: translate("Total"), selector: (row) => row.price },
    {
      name: translate("Action"),
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={() => openEditData(row?.id)} // Pass the current row
          >
            {translate("Edit")}
          </button>
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
            {translate("Document")}
          </button>
        </div>
      ),
      width: "200px", // Set a custom width for the button column
    },
  ];

  const columnAduInfo_2 = [
    { name: "Name", selector: (row) => row.personName, width: "100px" },
    { name: "Surname", selector: (row) => row.personSurName },
    { name: "Gender", selector: (row) => row.gender },
    { name: translate("DOB"), selector: (row) => row.personBirthDay },
    {
      name: translate("Nationality"),
      selector: (row) => row.personNationality,
    },
    {
      name: translate("Additional Services"),
      selector: (row) => row.additional_services,
      width: "150px",
    },
    { name: translate("Total"), selector: (row) => row.adult_price },
    {
      name: translate("Action"),
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={() => openEditData(row?.id)} // Pass the current row
          >
            {translate("Edit")}
          </button>
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
            {translate("Document")}
          </button>
        </div>
      ),
      width: "200px", // Set a custom width for the button column
    },
  ];

  const Baby = [
    { name: "Name", selector: (row) => row.personName, width: "100px" },
    { name: "Surname", selector: (row) => row.personSurName },
    { name: "Gender", selector: (row) => row.gender },
    { name: translate("DOB"), selector: (row) => row.personBirthDay },
    {
      name: translate("Nationality"),
      selector: (row) => row.personNationality,
    },
    { name: translate("Total"), selector: (row) => row.baby_price },
    {
      name: translate("Action"),
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={() => openEditData(row?.id)} // Pass the current row
          >
            {translate("Edit")}
          </button>
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
            {translate("Document")}
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

  function openEditData(id) {
    console.log("id", id);
    setPersonalUserID(id);
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

  const [CustomerDoc, setCustomerDoc] = useState(null); // Initialize status as null or an object from your options array

  const CustomeDocoptions = [
    { value: "Passport", label: "Passport" },
    { value: "Photo", label: "Photo" },
    { value: "Permanent Resident (PR)", label: "Permanent Resident (PR)" },
    { value: "Vaccination Card", label: "Vaccination Card" },
  ];

  const handleCustomerDocumentChange = (selectedOption) => {
    setCustomerDoc(selectedOption);
  };

  // for add document row and remove row



  // FOR CANGE LANGAUGE

  // for edit customer data

  const FetchEditData = async () => {
    const formData = new FormData();

    formData.append("reservation_person_id", PersonalUserID);
    formData.append("name", editCustomerData.name);
    formData.append("surname", editCustomerData.surname);
    formData.append("birthday", editCustomerData.birthday);
    formData.append("gender", editCustomerData.gender);
    formData.append("nationality", editCustomerData.nationality);

    try {
      const response = await POST.request({
        form: formData,
        url: "edit_person",
      });
      showSuccessToast(response?.Message);
    } catch (e) {
      console.log(e);
    }
  };

  const HandleEditData =  (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Submitting data:", editCustomerData); // Debugging line
    FetchEditData()
    // Add your submission logic here
    // e.g., API call to save data
    setTimeout(() => {
      closeEditData(); // Close modal after submission
    }, 2000);
  };

  // for upload documrnt 

  const [rows, setRows] = useState([
    {
      id: 1,
      document: null,
      image: "",
    },
  ]);
  
  const [UploadedDocument, setUploadedDocument] = useState([]); // State for storing uploaded documents
  
  // Handle document change
  const handleDocumentChange = (selectedOption, index) => {
    const newRows = [...rows];
    newRows[index].document = selectedOption;
    setRows(newRows);
  };
  
  // Handle image change
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    const newRows = [...rows];
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        newRows[index].image = reader.result;
        setRows(newRows);
  
        // Update UploadedDocument state
        const updatedDocuments = [...UploadedDocument];
        updatedDocuments[index] = {
          document: newRows[index].document,
          image: reader.result,
        };
        setUploadedDocument(updatedDocuments);
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Function to add a new row
  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, document: null, image: "" }]);
  };
  
  // Function to remove a row
  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  
    // Also update the UploadedDocument state
    const updatedDocuments = UploadedDocument.filter((_, i) => i !== index);
    setUploadedDocument(updatedDocuments);
  };

  console.log("UploadedDocument" , UploadedDocument);
  
  

  return (
    <div>
      <ToastContainer />
      <h3 className="t_center">
        {" "}
        {translate("Booking Details")} :{" "}
        {BookingDetails?.reservation?.reservationNumber}
      </h3>
      <div className="row px-0 pb-10 mt-20 ">
        <div className="col-lg-6">
          <p className="t_center"> {translate("Booked Date")} : 12.08.2024</p>
          <p className="t_center">
            {" "}
            {translate("Booking Status")} :{" "}
            {BookingDetails?.reservation?.reservation_status}
          </p>
          <p className="text-red t_center">Available 10 seats</p>
        </div>

        <div className="col-lg-6 flex small-flex-center">
          <div className="">
            <button
              className="button -sm -info-2 bg-accent-1 text-white "
              onClick={openInvoice}
            >
              {translate("Print Invoice")}
            </button>
          </div>

          <div className="">
            <button
              className="button -sm -accent-1 bg-info-2 text-white "
              onClick={openPaymentModal}
            >
              {translate("Pay")}
            </button>
            <span>(10,00 €)</span>
          </div>

          <div className="">
            <button
              className="button -sm -info-2 bg-accent-1 text-white "
              onClick={openModal}
            >
              {translate("Add Person")}
            </button>
          </div>
        </div>
      </div>

      {/* Reservation Details Table */}
      {BookingDetails?.reservation ? (
        <DataTable
          title="Reservation Details"
          columns={ColumnReservation_details}
          data={[BookingDetails.reservation]}
          highlightOnHover
        />
      ) : (
        <p>No Reservation Details Found</p>
      )}

      <br />

      {/* Adult Data Table */}
      {BookingDetails?.reservation ? (
        <DataTable
          title={`Adult: ${BookingDetails.reservation.bookingName} (${BookingDetails.reservation.gender})`}
          columns={columnAdu_1}
          data={[BookingDetails.reservation]}
          highlightOnHover
        />
      ) : (
        <p>No Adult Details Found</p>
      )}

      <br />

      {/* Adult Data List */}
      <DataTable
        title="Adult Information"
        columns={columnAduInfo_2}
        data={BookingDetails?.adultData?.length ? BookingDetails.adultData : []} // Change data dynamically
        highlightOnHover
      />

      {/* Show a fallback message when there's no data */}
      {!BookingDetails?.adultData?.length && <p>No Adult Data Found</p>}

      <br />

      {/* Child Data Table */}
      <DataTable
        title="Child Information"
        columns={columnAduInfo_2}
        data={BookingDetails?.childData?.length ? BookingDetails.childData : []} // Change data dynamically
        highlightOnHover
      />

      {/* Show a fallback message when there's no child data */}
      {!BookingDetails?.childData?.length && <p>No Child Data Found</p>}

      <br />

      {/* Baby Data List */}
      {/* Baby Data Table */}
      <DataTable
        title="Baby Information"
        columns={Baby}
        data={BookingDetails?.babyData?.length ? BookingDetails.babyData : []} // Change data dynamically
        highlightOnHover
      />

      {/* Show a fallback message when there's no baby data */}
      {!BookingDetails?.babyData?.length && <p>No Baby Data Found</p>}

      <br />

      {/* Total Data Table */}
      {TotalData?.length ? (
        <DataTable
          title="Total"
          columns={Total}
          data={TotalData}
          highlightOnHover
        />
      ) : (
        <p>No Total Data Found</p>
      )}

      <br />

      <button
        className="button -sm -red-2 bg-red-3 text-white col-lg-2 mx-2"
        onClick={openCancelPopUp}
      >
        {translate("Cancel")}
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
            <h2 className="t_center px-20">{translate("ADD PERSON")}</h2>
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
                    <label className="lh-1 text-16 text-light-1">
                      {" "}
                      {translate("Name")}
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      {" "}
                      {translate("Surname")}
                    </label>
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
                      <option value="male">{translate("Male")}</option>
                      <option value="female">{translate("Female")}</option>
                      <option value="other">{translate("Other")}</option>
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
                      <option value="indian">{translate("Indian")}</option>
                      <option value="german">{translate("German")}</option>
                      <option value="canadian">{translate("Canadian")}</option>
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
                        <span>
                          {" "}
                          {translate("Tour price per person") ||
                            "Find Latest Packages"}
                        </span>{" "}
                        <span>1.339,00 €</span>
                      </p>
                      {/* <p className="text-right text-15">including taxes and fee</p> */}
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-3 border_b px-md-40">
                <h5 className="text-18 fw-500 my-2">
                  {translate("  Possible additional services per person:") ||
                    "Find Latest Packages"}
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
                    {translate("ADD PERSON")}
                  </button>
                  <button
                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                    onClick={closeModal}
                  >
                    {translate("CANCEL")}
                  </button>
                </div>
              </div>
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
                  {translate("PAID")}
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
                  {translate("PAY")}
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
                  {translate("PAY")}
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
                {translate("Cancel Booking")}
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

          <div className="ml-lg-20 ml-0">
            <Tabs>
              <TabList>
                <Tab> {translate("Upload")}</Tab>
                <Tab> {translate("View")}</Tab>
                <Tab> {translate("Download")}</Tab>
              </TabList>

              <TabPanel>
                <div className="overflow-hidden overflow-lg-auto">
                  {rows.map((row, index) => (
                    <div className="row item-center my-3" key={row.id}>
                      <div className="col-md-4 px-0 mx-0 pl-lg-50">
                        <Select
                          options={CustomeDocoptions}
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
                                  {translate("Upload Document") ||
                                    "Find Latest Packages"}
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
                      {translate("SUBMIT")}
                    </button>
                    <button
                      className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-3 mx-2"
                      onClick={closeUploadFileModal}
                    >
                      {translate("CANCEL")}
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="View Your Documents"
                  columns={FileDeta}
                  data={ViewCustomerDocument}
                  highlightOnHover
                />
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="Download Your Tickets and Visa"
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
            <h2 className="px-20"> {translate("Edit Your Details")}</h2>
            <button onClick={closeEditData}>
              <IoClose size={25} />
            </button>
          </div>

          <div className="form_2">
            <div className="y-gap-30 contactForm px-20 py-20">
              <form onSubmit={HandleEditData}>
                <div className="row my-3">
                  <div className="col-md-6">
                    <div className="form-input spacing">
                      <input
                        type="text"
                        required
                        value={editCustomerData.name}
                        onChange={(e) =>
                          setEditCustomerData({
                            ...editCustomerData,
                            name: e.target.value,
                          })
                        }
                      />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Name")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input spacing">
                      <input
                        type="text"
                        required
                        value={editCustomerData.surname}
                        onChange={(e) =>
                          setEditCustomerData({
                            ...editCustomerData,
                            surname: e.target.value,
                          })
                        }
                      />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Surname")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input spacing">
                      <select
                        value={editCustomerData.gender}
                        onChange={(e) =>
                          setEditCustomerData({
                            ...editCustomerData,
                            gender: e.target.value,
                          })
                        }
                        required
                        className="form-control"
                      >
                        <option value="male">{translate("Male")}</option>
                        <option value="female">{translate("Female")}</option>
                        <option value="other">{translate("Other")}</option>
                      </select>
                      <label className="lh-1 text-16 text-light-1">
                        {editCustomerData.gender}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input spacing">
                      <input
                        type="date"
                        required
                        value={editCustomerData.birthday}
                        onChange={(e) =>
                          setEditCustomerData({
                            ...editCustomerData,
                            birthday: e.target.value,
                          })
                        }
                      />
                      <label className="lh-1 text-16 text-light-1">
                        {translate("Birthday Date")}
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-input spacing">
                      <select
                        value={editCustomerData.nationality}
                        onChange={(e) =>
                          setEditCustomerData({
                            ...editCustomerData,
                            nationality: e.target.value,
                          })
                        }
                        required
                        className="form-control"
                      >
                        <option value="indian">{translate("Indian")}</option>
                        <option value="german">{translate("German")}</option>
                        <option value="canadian">
                          {translate("Canadian")}
                        </option>
                      </select>
                      <label className="lh-1 text-16 text-light-1">
                        {editCustomerData.nationality}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-12">
                  <div className="row">
                    <button
                      type="submit" // Ensure this is a submit button
                      className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                    >
                      {translate("UPDATE")}
                    </button>
                  </div>
                </div>
              </form>
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
            <h2 className="px-20"> {translate("Edit Your Details")}</h2>
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
                    <label className="lh-1 text-16 text-light-1">
                      {" "}
                      {translate("Name")}
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      {" "}
                      {translate("Surname")}{" "}
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      {" "}
                      {translate("Email")}
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      {" "}
                      {translate("Email")}
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      {" "}
                      {translate("City")}
                    </label>
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
                      <option value="male"> {translate("Male")}</option>
                      <option value="female"> {translate("Female")}</option>
                      <option value="other"> {translate("Other")}</option>
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
                      <option value="indian"> {translate("Indian")}</option>
                      <option value="german"> {translate("German")}</option>
                      <option value="canadian"> {translate("Canadian")}</option>
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
                      {translate("House No")}
                    </label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      {translate("ZIP code")}
                    </label>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-input spacing">
                    <input type="text" required />
                    <label className="lh-1 text-16 text-light-1">
                      {" "}
                      {translate("Street")}
                    </label>
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
                      <option value="Frankfurt">
                        Frankfurt(FRA) {translate("Email")}
                      </option>
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
                {translate("SAVE")}
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
            <h2 className="px-20"> {translate("Invoice")}</h2>
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
