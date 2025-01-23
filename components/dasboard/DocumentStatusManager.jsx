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
import { POST } from "@/app/utils/api/post";
import { showSuccessToast } from "@/app/utils/tost";
import { toast, ToastContainer } from "react-toastify";

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

const DocumentStatusManager = ({ Customerid,serviceHeaders,serviceData,reservationData,reservationHeader,options, bookingDate,bookingStatus, totalHeaders,totalData, bookings,adultHeaders,adultBookings,uploadFileisOpen,childBookings,babyBookings, setuploadFileisOpen }) => {

  const [invoice, setinvoice] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");
  const reservationDataArray = [reservationData];
  const totalDataArray = [totalData];
  const {translate} = useTranslation();

  // Function to set selected time
  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };



 

  

  function closeUploadFileModal() {
    setuploadFileisOpen(false);
  }
  const openInvoice = async() => {
    const formData = new FormData();
    formData.append("reservation_id", Customerid?.id);
    const response = await POST.request({form:formData, url: "sendInvoice"});
    if(response){
      toast.success(response.Message)
    }
  }

  function closeInvoice() {
    setinvoice(false);
  }

  // for update booking status dropdown

  const [status, setStatus] = useState(null); // Initialize status as null or an object from your options array
  const [Document, setDocument] = useState(null); // Initialize status as null or an object from your options array





  const handleChange = async(selectedOption) => {
    setStatus(selectedOption);
    const formData = new FormData();
    formData.append("reservation_id", Customerid.id);
    formData.append("status", selectedOption.value);

    const response = await POST.request({ form: formData, url: "changeBookingStatus" });
   
    if(response){
      toast.success("Status Updated Successfully");
    }
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

  return (
    <div>
      <ToastContainer/>
       <h1 className="text-30"> {translate("Booking Number") } : {bookings?.reservation?.reservationNumber}</h1>
      <div className="row px-0 pb-10 mt-20">
        <div className="col-lg-6">
          <p className="t_center"> {translate("Booking Date") } : {bookingDate}</p>
          <p className="t_center"> {translate("Booking Status") } : {bookingStatus}</p>
         
        </div>

        <div className="col-lg-6 flex small-flex-center items-center">
          {/* <div className="">
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
                placeholder={translate("Select Status")}
              />
            </div>
          </div> */}
        </div>
      </div>
      {/* {
        bookings.flightInfo.length > 0 &&  
        <>
        
        </>
      } */}
      {
        reservationData && 
        <>
        <DataTable
          title={translate("Reservation Details")}
          columns={reservationHeader}
          data={reservationDataArray}
          highlightOnHover
        />
        <br />
        </>
      }

      {
        adultBookings &&
        <>
        
        <DataTable
          title={translate("Adult")}
          columns={adultHeaders}
          data={adultBookings}
          highlightOnHover
        />
        <br />
        </>
      }

      {
        childBookings &&
        <>
        <DataTable
          title={translate("Children")}
          columns={adultHeaders}
          data={childBookings}
          highlightOnHover
        />
        <br />
        </>
      }

      {
        babyBookings &&
        <>
          <DataTable title="Baby" columns={adultHeaders} data={babyBookings} highlightOnHover />
          <br />
        </>

      }
      {
        adultBookings &&
        <>
        
        <DataTable
          title={translate("Services Per Person")}
          columns={serviceHeaders}
          data={serviceData}
          highlightOnHover
        />
        <br />
        </>
      }

      {
        totalData && 
        <>
        
        <DataTable
          title={translate("Total")}
          columns={totalHeaders}
          data={totalDataArray}
          highlightOnHover
        />
        <br />
        </>
      }
     

     

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
