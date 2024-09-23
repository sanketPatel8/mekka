"use client"
import React, { useState, useEffect } from "react";
import Header from "@/components/dasboard/Header";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import DataTable from "react-data-table-component";
import { bookingData } from "@/data/dashboard";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { MdError } from "react-icons/md";
import DocumentStatusManager from "@/components/dasboard/DocumentStatusManager";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";
import { useTranslation } from "@/app/context/TranslationContext";
import { IoClose } from "react-icons/io5";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";
import {
  // Adult1Data,
  // ReservationData,
  // Adult2InfoData,
  // TotalData,
  // BabyData,
  ViewTicketsForVandor,
  ViewCustomerDocument,
} from "@/data/CustomerBookingData";
import Modal from "react-modal";
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

const tabs = ["All", "Completed", "In Progress", "Cancelled"];

export default function DbBooking({ params }) {

  const {user} = useAuthContext();
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [currentTab, setcurrentTab] = useState("All");
  const [filteredData, setFilteredData] = useState([]);
  const [bookings, setBookings] = useState({});
  const [radioValue, setRadioValue] = useState("");
  const [reservationHeader, setReservationHeader] = useState([]);
  const [reservationData, setReservationData] = useState({});
  const [totalData, setTotalData] = useState([]);
  const [totalHeaders, setTotalHeaders] = useState([]);
  const [adultBookings, setAdultBookings] = useState([]);
  const [childBookings, setChildBookings] = useState([]);
  const [babyBookings, setBabyBookings] = useState([]);
  const [adultHeaders, setAdultHeaders] = useState([]);
  const [image1, setImage1] = useState("");
  const [uploadFileisOpen, setuploadFileisOpen] = useState(false);
  const { translate } = useTranslation();
  const [personId, setPersonId] = useState(0);
  const VandorDoc = [
    { value: "Visa", label: "Visa" },
    { value: "Hotel Booking Voucher", label: "Hotel Booking Voucher" },
    { value: "Flight Ticket", label: "Flight Ticket" },
  ];
  const [viewData,setViewData] = useState([]);
  const [viewDetails,setViewDetails] = useState([]);
  const [downloadData,setDownloadData] = useState([]);
  const [downloadDetails,setDownloadDetails] = useState([]);

  const id = params.id[0];
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const [rows, setRows] = useState([{ document: "", type: null }]); // State to manage rows

  const addRow = () => {
    setRows([...rows, { document: "", type: null }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  

  
  const handleDocumentChange = (selectedOption, index) => {
    const newRows = [...rows];
    newRows[index].type = selectedOption;
    setRows(newRows);
  };

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
          base64: reader.result
        };
        const newRows = [...rows];
        newRows[index].document = fileInfo;
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageChange2 = (event) => {
    const files = event.target.files;
    const promises = [];
    const uploadedImages = [...image2];
  
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const promise = new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          uploadedImages.push(reader.result);
          resolve();
        };
        reader.readAsDataURL(file);
      });
      promises.push(promise);
    }
  
    Promise.all(promises).then(() => {
      setImage2(uploadedImages);
    });
  };
  // useEffect(() => {
  //   // Filter data based on currentTab
  //   let filtered = [];
  //   if (currentTab === "All") {
  //     filtered = bookingData;
  //   } else {
  //     filtered = bookingData.filter((item) => item.Status === currentTab);
  //   }
  //   setFilteredData(filtered);

    
  // }, [currentTab]);
  function openUploadFileModal(personId,reservationId) {
    setuploadFileisOpen(true);
    setPersonId(personId);
    console.log(personId,reservationId)
  }

  
  const formatDateToDDMMYYYY = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
};

const formatDateToMMDDYYYY = (date) => {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
};
  const fetchDetails = async () => {
    const formData = new FormData();
    formData.append("user_id", user?.user?.id);
    formData.append("id", id);

    const response = await POST.request({form:formData, url: "booking_details"});
    if(response){
      setBookings(response.Bookings)
    }

    if(response.Bookings){
      const formatTotal = (value) => `${value} €`;
      const formatDiscount = (value) => {value > 0 ? `-${value}` : 0};

      const columnAdu_1 = [
        { name: "id", selector: (row) => row.id, width: "10%" },
        { name: "Name", selector: (row) => row.name, width: "20%" },
        { name: "Surname", selector: (row) => row.surname,width: "20%" },
        
        { name: "Country", selector: (row) => row.country, width: "10%" },
        { name: "DOB", selector: (row) => row.DOB,width: "10%" },
        { name: "Nationality", selector: (row) => row.Nationality,width:"10%" },
      
        { name: "Total", selector: (row) => formatTotal(row.price),width: "10%" },
        {
          name: "Action",
          selector: (row) => (
            <div className="flex_center">
           
              <button
                className="button -sm -accent-1 bg-info-2 text-white my-2 col-12 mx-1 text-13 doc-px-5"
                onClick={() => openUploadFileModal(row.id, id)}
              >
                 {translate("Document") }
              </button> 
            </div>
          ),
          width: "10%", // Set a custom width for the button column
        },
      ];

      setAdultHeaders(columnAdu_1);

      const ColumnReservation_details = [
        { name: "Airline", selector: (row) => row.Airline },
        { name: "From", selector: (row) => row.From },
        { name: "To", selector: (row) => row.To },
        { name: "Departure", selector: (row) => row.date_begin },
        { name: "Return", selector: (row) => row.date_end },
        // { name: 'Offered languages', selector: (row) => row.Offered_languages },
        // { name: 'Max Luggage', selector: (row) => row.max_luggage },
        { name: "Mekka", selector: (row) => row.Mekka_hotel },
        { name: "Madina", selector: (row) => row.Madina_hotel },
        { name: "Adult", selector: (row) => row.adult },
        { name: "Child", selector: (row) => row.child },
        { name: "Baby", selector: (row) => row.baby },
        { name: "Total", selector: (row) => formatTotal(row.total) },
      ];

      setReservationHeader(ColumnReservation_details);
      const FileDeta = [
        { name: "Document Name", selector: (row) => row.Name },
        {
          name: "Action",
          selector: (row) => (
            <Link href={row.fileLink} target="_blank" className="button -sm -accent-1 bg-info-2 text-white my-2">
              View {translate(" ") }
            </Link>
          ),
        },
      ];
  
      setViewData(FileDeta);
      
      // if(response.Bookings.reservation){
      //   const reservation = response.Bookings.reservation.map((res) => ({
      //     id: res.reservation_id,
      //     name: res.personName,
      //     surname: res.personSurName,
      //     DOB: res.personBirthDay,
      //     country: res.countryName,
      //   }));
      // }
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


      const downloadFile = (fileLink, fileName) => {
        const link = document.createElement("a");
        link.href = fileLink;
        link.download = fileName;
        link.click();
      };

      if(response.Bookings.adultData.length > 0){
        const documents = response.Bookings.adultData.map((adult) =>  {
          if(adult.documets && adult.documets.length > 0){

            const docs = adult.documets.map((doc) => {

              if(personId === doc.reservation_person_id ){
                console.log("hi")
                return {
                  Name: doc.file_url_orginal_name,
                  fileLink: doc.full_path,
                }
              }
            }
             )

            setViewDetails(docs);

            // const download = adult.documets.map((doc) => ({
            //   Name: doc.file_url_orginal_name,
            //   fileLink: doc.full_path,
            // }))
            // setDownloadDetails(download);
          }


        })
  

      const adults = response.Bookings.adultData.map((adult) => ({
        id: adult.id,
        name: adult.personName,
        surname: adult.personSurName,
        DOB: formatDateToDDMMYYYY(adult.personBirthDay),
        country: adult.countryName,
        Nationality: adult.personNationality,
        price: adult.adult_price,

      }));

      setAdultBookings(adults);

      
      }

      if(response.Bookings.reservation){
        const reservation = {
          Airline: response.Bookings.reservation.airlines,
          From: response.Bookings.reservation.from,
          To: response.Bookings.reservation.to,
          date_begin: formatDateToDDMMYYYY(response.Bookings.reservation.date_begin),
          date_end: formatDateToDDMMYYYY(response.Bookings.reservation.date_end),
          Mekka_hotel : response.Bookings.reservation.mekka_hotel,
          Madina_hotel : response.Bookings.reservation.madina_hotel,
          adult : response.Bookings.reservation.adults,
          child : response.Bookings.reservation.child,
          baby : response.Bookings.reservation.baby,
          total : response.Bookings.reservation.total,

        }

        setReservationData(reservation);
      }

      if(response.Bookings.childData.length > 0){
        const children = response.Bookings.childData.map((child) => ({
          id: child.id,
          name: child.personName,
          surname: child.personSurName,
          DOB: formatDateToDDMMYYYY(child.personBirthDay),
          country: child.countryName,
          Nationality: child.personNationality,
          price: child.child_price,
        }));
        setChildBookings(children);

        const documents = response.Bookings.childData.map((child) =>  {
          if(child.documets && child.documets.length > 0){
            const docs = child.documets.map((doc) => ({
              Name: doc.file_url_orginal_name,
              fileLink: doc.full_path,
            }))

            setViewDetails(docs);
          }
        })
      }


      if(response.Bookings.babyData.length > 0){
        const babies = response.Bookings.babyData.map((baby) => ({
          id: baby.id,
          name: baby.personName,
          surname: baby.personSurName,
          DOB: formatDateToDDMMYYYY(baby.personBirthDay),
          country: baby.countryName,
          Nationality: baby.personNationality,
          price: baby.baby_price,
        }));
        setBabyBookings(babies);
      }

     

      const Total = [
        { name: "Subtotal", selector: (row) => formatTotal(row.Subtotal) },
        { name: "Tax", selector: (row) => formatTotal(row.Total) },
        { name: "Discount", selector: (row) => formatDiscount(row.Discount) },
        { name: 'Amount Paid', selector: (row) => formatTotal(row.Amount_Paid) },
        { name: "Total", selector: (row) => formatTotal(row.Total) },
        { name: "Amount Due", selector: (row) => formatTotal(row.Amount_Due) },
      ];

      setTotalHeaders(Total);

      if(response.Bookings.reservation){
        const total = {
          Subtotal: response.Bookings.reservation.subtotal,
          Total: response.Bookings.reservation.tax,
          Discount: response.Bookings.reservation.discount,
          Amount_Paid: response.Bookings.reservation.amount_paid,
          Total: response.Bookings.reservation.total,
          Amount_Due: response.Bookings.reservation.amount_due,
        }

        setTotalData(total);
      } 
      
      
  

    
    }
  }

  useEffect(()=>{
      fetchDetails();
  },[user])

  

 
  function afterOpenModal() {
    // No need to change subtitle color as it's not being used in this context
  }

  // function openUploadFileModal() {
  //   setuploadFileisOpen(true);
  // }

  function closeUploadFileModal() {
    setuploadFileisOpen(false);
  }

  const StatusCell = ({ row }) => {
    const statusStyles = {
      color:
        row.Status === "Cancelled"
          ? "red"
          : row.Status === "Completed"
          ? "green"
          : row.Status === "Pending"
          ? "orange"
          : "orange",
    };
    return <span style={statusStyles}>{row.Status}</span>;
  };

  const VandorBookings = [
    { name: "Booking No.", selector: (row) => row.BookingNo, width: "170px" },
    {
      name: "Status",
      selector: (row) => row.Status,
      cell: (row) => <StatusCell row={row} />,
      sortable: true,
    },
    { name: "Full Name", selector: (row) => row.Full_Name, width: "190px" },
    { name: "Tour Name", selector: (row) => row.Tour_name, width: "150px" },
    { name: "Total (€) ", selector: (row) => row.Total_Payment },
    { name: "Pending (€) ", selector: (row) => row.Pending_Payment },
    { name: "Terms ", selector: (row) => row.Payment_Terms },
    { name: "Method ", selector: (row) => row.Payment_Method },
    { name: "Visas", selector: (row) => row.Visas },
    { name: "Flight", selector: (row) => row.Flight },
    {
      name: "Initiated By",
      selector: (row) => row.Initiated_By_Admin,
      width: "150px",
    },
    {
      name: "Action",
      selector: (row) => (
        <Link href="/vendor/db-edit-booking">
          {" "}
          <button
            className="button -md py-1 -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            // onClick={openAdult1Deta}
          >
             {translate("Edit") }
          </button>
        </Link>
      ),
      width: "110px",
    },
  ];

 

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Indicate that the component has mounted
      // setMounted(true);

      const handleResize = () => {
        if (window.innerWidth >= 1000) {
          setSideBarOpen(true);
        } else {
          setSideBarOpen(false);
        }
      };

      // Set the initial state based on the screen size
      handleResize();

      // Add event listener to update state on resize
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on component unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }

 
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = 'Booking Deatils - MekkaBooking';
    }
  }, []);



  const handleDocumentSubmit = async() => {
    const formData = new FormData();
    formData.append("reservation_person_id", personId );
    formData.append("reservation_id", id);
    formData.append("vendor_id", user?.user?.id);
    const documentData = rows.map((row) => {
     return {
       document: row.document,
       type: row.type.value,
     }
    })
    formData.append("documents_data", JSON.stringify(documentData));


    const response = await POST.request({form:formData, url: "upload_bookingdocuments"});
    // if(response){
    //   setuploadFileisOpen(false);
    // }
  }

  return (
    <>
   
    <div
      className={`dashboard ${
        sideBarOpen ? "-is-sidebar-visible" : ""
      } js-dashboard`}
    >
      <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

      <div className="dashboard__content">
        <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
          

              <DocumentStatusManager Customerid = {params} bookings={bookings}  adultHeaders={adultHeaders}  reservationData={reservationData} reservationHeader={reservationHeader} babyBookings={babyBookings} childBookings={childBookings} adultBookings={adultBookings} setuploadFileisOpen={setuploadFileisOpen} uploadFileisOpen={uploadFileisOpen} totalData={totalData} totalHeaders={totalHeaders}  />

            <div className="text-center pt-30">
              © Copyright MekkaBooking.com {new Date().getFullYear()}
            </div>
          </div>
      </div>
      {
        uploadFileisOpen && (

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
                <div className="" style={{height:"60vh",overflowX:"hidden",overflowY:"auto"}}>
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
                                   {translate("Upload Document") }
                                </div>
                              </label>
                              <input
                                onChange={(e) => handleImageChange(e, index)}
                                accept="image/*, application/*"
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
                </div>
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="Your Documents"
                  columns={viewData}
                  data={viewDetails}
                  highlightOnHover
                />
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="Customer Documents"
                  columns={downloadData}
                  data={downloadDetails}
                  highlightOnHover
                />
              </TabPanel>
            </Tabs>
          </div>
        </Modal>
      </div>
        )
      }
    </div>
    </>
  );
}
