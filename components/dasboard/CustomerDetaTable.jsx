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
import { nationalities } from "@/data/nationalities";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

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

const CustomerDetaTable = () => {
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
  const [From, setFrom] = useState("Frankfurt(FRA)");
  const [editCustomerData, setEditCustomerData] = useState({
    name: "",
    surname: "",
    gender: "male", // Default value
    birthday: "",
    nationality: "indian", // Default value
  });
  const [PersonalUserID, setPersonalUserID] = useState(0);
  const [UploadDocID, setUploadDocID] = useState({});
  const [BookingDetails, setBookingDetails] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [viewDetails, setViewDetails] = useState([]);
  const [downloadDetails, setDownloadDetails] = useState([]);

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
            onClick={() => openUploadFileModal(row.id, row.reservation_id)}
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
            onClick={() => openUploadFileModal(row.id, row.reservation_id)}
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
    // { name: "Tax", selector: (row) => row.Total },
    { name: "Discount", selector: (row) => row.Discount },
    // { name: 'Amount Paid', selector: (row) => row.Amount_Paid },
    { name: "Total", selector: (row) => row.Total },
    { name: "Amount Due", selector: (row) => row.Amount_Due },
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

  function closeUploadFileModal() {
    setuploadFileisOpen(false);
  }

  function openEditData(id) {
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

  // for add document row and remove row

  // for booking details

  const [personId, setPersonId] = useState(0);

  const searchParams = useSearchParams();
  const Tourid = searchParams.get("id");
  const CustomerID = searchParams.get("customerID");
  

  const filterData = async (personId) => {
    const formData = new FormData();
    formData.append("user_id", CustomerID);
    formData.append("id", UploadDocID.reservationId);
    
    console.log("personId" , personId);
    
    const response = await POST.request({
      form: formData,
      url: "booking_details",
    });

    if (response.Bookings) {
      const filteredData = response.Bookings.adultData.concat(
        response.Bookings.childData,
        response.Bookings.babyData
      );
      console.log(filteredData , "filterData");
      const matchedData = filteredData.filter((data) => data.id === personId);
      console.log(matchedData , "matchedData");
      if (matchedData.length > 0) {
        const docs = matchedData.map((doc) => {
          if (doc.documets && doc.documets.length > 0) {
            const docFiles = doc.documets.map((doc) => ({
              Name: doc.file_url_orginal_name,
              fileLink: doc.full_path,
            }));

            setViewDetails(docFiles);

            const download = doc.documets.map((doc) => ({
              Name: doc.file_url_orginal_name,
              fileLink: doc.full_path,
            }));

            setDownloadDetails(download);
          }
        });
      }
    }
  };

  function openUploadFileModal(personId, reservationId) {
    setuploadFileisOpen(true);
    setPersonId(personId);
    filterData(personId);

    //  Create a new object with name and id
    const newObject = { personId , reservationId };

    setUploadDocID(newObject);
  }

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const formData = new FormData();

      formData.append("user_id", CustomerID);
      formData.append("id", Tourid);

      try {
        const response = await POST.request({
          form: formData,
          url: "booking_details",
        });
        setBookingDetails(response?.Bookings);
        const FileDeta = [
          { name: "Document Name", selector: (row) => row.Name },
          {
            name: "Action",
            selector: (row) => (
              <Link
                href={row.fileLink}
                target="_blank"
                className="button -sm -accent-1 bg-info-2 text-white my-2"
              >
                View {translate(" ")}
              </Link>
            ),
          },
        ];

        setViewData(FileDeta);

        const DownloadData = [
          { name: "Document Name", selector: (row) => row.Name },
          {
            name: "Action",
            selector: (row) => (
              <button
                className="button -sm -accent-1 bg-info-2 text-white my-2"
                onClick={() => downloadFile(row.fileLink, row.Name)}
              >
                Download
              </button>
            ),
          },
        ];

        setDownloadData(DownloadData);
      } catch (e) {
        console.error(e);
      }
    };

    fetchBookingDetails();
  }, [Tourid, CustomerID]);

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
      console.error(e);
    }
  };

  const HandleEditData = (e) => {
    e.preventDefault(); 
    FetchEditData();
    setTimeout(() => {
      closeEditData(); 
    }, 2000);
  };

  // for Add New Person

  const [AddpersonData, setAddpersonData] = useState({
    name: "",
    surname: "",
    gender: "",
    birthDate: "",
    nationality: "",
    roomType: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddpersonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e) => {
    setAddpersonData((prevData) => ({
      ...prevData,
      roomType: e.target.value,
    }));
  };

  const handleAddPersong = () => {
   
    alert("Person added");
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  // for upload documnet

  const [rows, setRows] = useState([
    {
      id: 1,
      document: null,
      image: "",
    },
  ]);

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, document: null, image: "" }]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);

    // Also update the UploadedDocument state
    const updatedDocuments = UploadedDocument.filter((_, i) => i !== index);
    setUploadedDocument(updatedDocuments);
  };

  const VandorDoc = [
    { value: "Passport", label: "Passport" },
    { value: "Photo", label: "Photo" },
    { value: "Permanent Resident (PR)", label: "Permanent Resident (PR)" },
    { value: "Vaccination Card ", label: "Vaccination Card" },
  ];

  const handleImageChange = (e, index) => {
    const files = e.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: file.size,
          base64: reader.result,
        };
        const newRows = [...rows];
        newRows[index].document = fileInfo;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentChange = (selectedOption, index) => {
    const newRows = [...rows];
    newRows[index].type = selectedOption;
    setRows(newRows);
  };

  const downloadFile = (fileLink, fileName) => {
    alert()
    const xhr = new XMLHttpRequest();
    xhr.open("GET", fileLink, true);
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Error downloading file:", xhr.statusText);
      }
    };
    xhr.send();
  };

  const handleDocumentSubmit = async () => {
    const formData = new FormData();
    formData.append("reservation_person_id", UploadDocID?.personId);
    formData.append("reservation_id", UploadDocID?.reservationId);  
    formData.append("vendor_id", CustomerID);
    const documentData = rows.map((row) => {
      return {
        document: row?.document,
        type: row.type?.value,
      };
    });

    formData.append("documents_data", JSON.stringify(documentData));

    const response = await POST.request({
      form: formData,
      url: "upload_bookingdocuments",
    });
    if (response) {
      showSuccessToast(response.Message)
      setTimeout(() => {
        setuploadFileisOpen(false);
      }, 3000);
    }
  };

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

      <br />

      {/* Child Data Table */}
      <DataTable
        title="Child Information"
        columns={columnAduInfo_2}
        data={BookingDetails?.childData?.length ? BookingDetails.childData : []} // Change data dynamically
        highlightOnHover
      />

      <br />

      {/* Baby Data Table */}
      <DataTable
        title="Baby Information"
        columns={columnAduInfo_2}
        data={BookingDetails?.babyData?.length ? BookingDetails.babyData : []} // Change data dynamically
        highlightOnHover
      />

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
            <div className="y-gap-30 contactForm px-20 py-20">
              <div className="row my-3">
                <div className="col-md-6">
                  <div className="form-input spacing">
                    <input
                      type="text"
                      name="name"
                      value={AddpersonData.name}
                      onChange={handleInputChange}
                      required
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
                      name="surname"
                      value={AddpersonData.surname}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="lh-1 text-16 text-light-1">
                      {translate("Surname")}
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-input spacing">
                    <select
                      name="gender"
                      value={AddpersonData.gender}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    >
                      <option value="">{translate("Select Gender")}</option>
                      <option value="male">{translate("Male")}</option>
                      <option value="female">{translate("Female")}</option>
                      <option value="other">{translate("Other")}</option>
                    </select>
                    <label className="lh-1 text-16 text-light-1">
                      {AddpersonData.gender}
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-input spacing">
                    <input
                      type="date"
                      name="birthDate"
                      value={AddpersonData.birthDate}
                      onChange={handleInputChange}
                      required
                    />
                    <label className="lh-1 text-16 text-light-1">
                      {translate("Birth Date")}
                    </label>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-input spacing">
                    <select
                      name="nationality"
                      value={AddpersonData.nationality}
                      onChange={handleInputChange}
                      required
                      className="form-control"
                    >
                      <option value="">
                        {translate("Select Nationality")}
                      </option>
                      {nationalities.map((e) => (
                        <option key={e} value={e}>
                          {translate(e)}
                        </option>
                      ))}
                    </select>

                    <label className="lh-1 text-16 text-light-1">
                      {AddpersonData.nationality}
                    </label>
                  </div>
                </div>
              </div>

              <div className="my-3 border_b px-md-40">
                <h5 className="text-18 fw-500 my-2">
                  {translate("Possible additional services per person:")}
                </h5>

                <div>
                  <div className="d-flex items-center justify-between radio_hight">
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio d-flex items-center">
                          <input
                            type="radio"
                            name="roomType"
                            value="f-1-bed-4"
                            checked={AddpersonData.roomType === "f-1-bed-4"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          <span className="ml-10">4 Bettzimmer (Standard)</span>{" "}
                          {/* Label inside */}
                        </label>
                      </div>
                    </div>
                    <div className="text-14">0,00 €</div>
                  </div>

                  <div className="d-flex items-center justify-between radio_hight">
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio d-flex items-center">
                          <input
                            type="radio"
                            name="roomType"
                            value="f-1-bed-3"
                            checked={AddpersonData.roomType === "f-1-bed-3"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          <span className="ml-10">3 Bettzimmer</span>{" "}
                          {/* Label inside */}
                        </label>
                      </div>
                    </div>
                    <div className="text-14">0,00 €</div>
                  </div>

                  <div className="d-flex items-center justify-between radio_hight">
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio d-flex items-center">
                          <input
                            type="radio"
                            name="roomType"
                            value="f-1-bed-2"
                            checked={AddpersonData.roomType === "f-1-bed-2"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          <span className="ml-10">2 Bettzimmer</span>{" "}
                          {/* Label inside */}
                        </label>
                      </div>
                    </div>
                    <div className="text-14">0,00 €</div>
                  </div>

                  <div className="d-flex items-center justify-between radio_hight">
                    <div className="d-flex items-center">
                      <div className="form-radio d-flex items-center">
                        <label className="radio d-flex items-center">
                          <input
                            type="radio"
                            name="roomType"
                            value="f-1-bed-1"
                            checked={AddpersonData.roomType === "f-1-bed-1"}
                            onChange={handleRadioChange}
                          />
                          <span className="radio__mark">
                            <span className="radio__icon"></span>
                          </span>
                          <span className="ml-10">1 Bettzimmer</span>{" "}
                          {/* Label inside */}
                        </label>
                      </div>
                    </div>
                    <div className="text-14">0,00 €</div>
                  </div>

                  {/* Repeat for other room options */}
                </div>
              </div>

              <div className="col-12">
                <div className="row">
                  <button
                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                    onClick={handleAddPersong}
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

      {/* <div id="upload_file">
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
                      onClick={handleSubmit}
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
      </div> */}

      <div id="upload_file">
        <Modal
          isOpen={uploadFileisOpen}
          onRequestClose={closeUploadFileModal}
          style={customStyles}
          contentLabel="Pending Payment Modal"
        >
          <div className="d-flex justify-content-between" id="modelopen">
            <h2 className="ml-20 my-3"> {translate("Document")}</h2>
            <button onClick={closeUploadFileModal}>
              <IoClose size={25} />
            </button>
          </div>

          <div className="ml-lg-20 ml-0 ">
            <Tabs>
              <TabList>
                <Tab> {translate("Upload")}</Tab>
                <Tab> {translate("View")}</Tab>
                <Tab> {translate("Download")}</Tab>
              </TabList>

              <TabPanel>
                <div
                  className=""
                  style={{
                    height: "60vh",
                    overflowX: "hidden",
                    overflowY: "auto",
                  }}
                >
                  {rows.map((row, index) => (
                    <div className="row item-center my-3" key={row.id}>
                      <div className="col-md-4 px-0 mx-0 pl-lg-50">
                        <Select
                          options={VandorDoc}
                          value={row.type}
                          onChange={(selectedOption) =>
                            handleDocumentChange(selectedOption, index)
                          }
                          className="dd-vendor"
                          isClearable
                        />
                      </div>
                      <div className="col-md-4 px-0 mx-2">
                        <div className="row my-2 flex_center ">
                          {rows.document ? (
                            <div className="col-auto my-3">
                              <div className="relative">
                                <Image
                                  width={200}
                                  height={200}
                                  src={rows.document}
                                  alt="image"
                                  className="size-200 rounded-12 object-cover my-3"
                                />
                                <button
                                  onClick={() => {
                                    const newRows = [...rows];
                                    newRows[index].document = "";
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
                                  {translate("Upload Document")}
                                </div>
                              </label>
                              <input
                                onChange={(e) => handleImageChange(e, index)}
                                accept="image/*, application/pdf"
                                id={`imageInp-${index}`}
                                type="file"
                                name="image2"
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

                  <div className="row ">
                    <div className="col-12 d-flex justify-content-center gap-md-2">
                      <button
                        className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-3 mx-2"
                        type="submit"
                        onClick={handleDocumentSubmit}
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
                </div>
              </TabPanel>
              <TabPanel>
                <DataTable
                  title=" Documents"
                  columns={viewData}
                  data={viewDetails}
                  highlightOnHover
                />
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="Download Your Tickets and Visa"
                  columns={downloadData}
                  data={downloadDetails}
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
                        {nationalities.map((e) => (
                          <option key={e} value={e}>
                            {translate(e)}
                          </option>
                        ))}
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
