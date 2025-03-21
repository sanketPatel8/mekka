"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Select from "react-select";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useTranslation } from "@/app/context/TranslationContext";
import { showErrorToast, showSuccessToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import { POST } from "@/app/utils/api/post";
import { nationalities } from "@/data/nationalities";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ClipLoader } from "react-spinners";
import { useCurrency } from "@/app/context/currencyContext";
import Stripeform from "../stripe/stripeform";
import { set } from "lodash";

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
    maxWidth: "750px",
    height: "80vh",
    overflowY: "auto",
    backgroundColor: "#fff",
    overflowX: "hidden",
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
  const [installmentChecked, setInstallmentChecked] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState({
    name: "",
    surname: "",
    gender: "",
    birthday: "",
    nationality: "",
    id: "",
    res_id: "",
  });
  const [paidData, setPaidData] = useState({});
  const [showStripeModal, setShowStripeModal] = useState(false);
  const [PersonalUserID, setPersonalUserID] = useState(0);
  const [UploadDocID, setUploadDocID] = useState({});
  const [BookingDetails, setBookingDetails] = useState([]);
  const [PaymentColumns, setPaymentColumns] = useState([]);
  const [PaymentCheckbox, setPaymentCheckbox] = useState(0);
  const [viewData, setViewData] = useState([]);
  const [downloadData, setDownloadData] = useState([]);
  const [viewDetails, setViewDetails] = useState([]);
  const [downloadDetails, setDownloadDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedpaymentOption, setSelectedOption] = useState("adPay");
  const [firstAmount, setFirstAmount] = useState("");
  const [secondAmount, setSecondAmount] = useState("");
  const [thirdAmount, setThirdAmount] = useState(0);
  const [dateBegin, setDateBegin] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [seconddate, setSecondDate] = useState("");
  const [minEndDate, setMinEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [EditUserData, setEditUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [AddPersonAmount, setAddPersonAmount] = useState("");
  const [PandingAmount, setPandingAmount] = useState("");
  const [pendingPaymentValue, setPendingPaymentValue] = useState({
    firstAmount: "",
    firstDate: "",
    secondAmount: "",
    secondDate: "",
    thirdAmount: "",
    thirdDate: "",
    id: "",
    transaction_id: "",
  });
  const [GetHotelData, setGetHotelData] = useState(null);
  const [GetFlightData, setGetFlightData] = useState(null);
  const [AddpersonTotal, setAddpersonTotal] = useState(null);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const router = useRouter();
  const { formatPrice } = useCurrency();

  useEffect(() => {
    Modal.setAppElement("#modelopen");
    Modal.setAppElement("#pendingpayment");
    Modal.setAppElement("#CanclePop_up");
    Modal.setAppElement("#upload_file");
    Modal.setAppElement("#editData");
    Modal.setAppElement("#Adult1Data");
  }, []);

  const paymentColumn = [
    {
      name: translate("Date"),
      selector: (row) => ` ${row.date}`,
      sortable: true,
    },
    {
      name: translate("Amount"),
      selector: (row) => `${row.amount} €`,
      sortable: true,
    },
    {
      name: translate("Paid Date"),
      selector: (row) => row.paidDate,
      sortable: true,
    },
    {
      name: translate("Paid Method"),
      selector: (row) => row.paidMethod,
      sortable: true,
    },
  ];

  const ColumnReservation_details = [
    ...(BookingDetails?.reservation?.airlines
      ? [
          {
            name: translate("Airline"),
            selector: (row) => BookingDetails?.reservation?.airlines,
          },
        ]
      : []),

    ...(BookingDetails?.reservation?.departure_names
      ? [
          {
            name: translate("Departure"),
            selector: (row) => BookingDetails?.reservation?.departure_names,
          },
        ]
      : []),

    ...(BookingDetails?.reservation?.arrival
      ? [
          {
            name: translate("Arrival"),
            selector: (row) => BookingDetails?.reservation?.arrival,
          },
        ]
      : []),
    {
      name: translate("Departure Date"),
      selector: (row) => row?.date_begin,
      // width: "100px",
    },
    { name: translate("Return Date"), selector: (row) => row.date_end },
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
    { name: translate("House No"), selector: (row) => row.houseNumber },
    { name: translate("Zip Code"), selector: (row) => row.plz },
    { name: translate("Street"), selector: (row) => row.street },
  ];

  const columnAduInfo_2 = [
    {
      name: translate("Name"),
      selector: (row) => row.personName,
      // width: "10%",
    },
    {
      name: translate("Surname"),
      selector: (row) => row.personSurName,
      // width: "10%"
    },
    {
      name: translate("Gender"),
      selector: (row) => row.gender,
      // width: "8%"
    },
    {
      name: translate("DOB"),
      selector: (row) => row.personBirthDay,
      // width: "8%"
    },
    {
      name: translate("Nationality"),
      selector: (row) => row.personNationality,
      // width: "10%"
    },
    {
      name: translate("Total"),
      selector: (row) => `${row.adult_price} €`,
      // width: "15%"
    },
    {
      name: translate("Action"),
      selector: (row) => (
        <div
          className={
            BookingDetails?.reservation?.reservation_status === "Cancelled"
              ? "d-none"
              : "d-block"
          }
        >
          <div className="flex_center">
            <button
              className="button py-10 px-10 -info-2 f12 bg-accent-1 text-white col-5 my-2 mx-2 text-end"
              onClick={() => openEditData(row)}
            >
              {translate("Edit")}
            </button>
            <button
              className="button px-20 py-10 -info-2 bg-accent-1 text-white col-5 my-2 mx-2 text-end"
              onClick={() => openUploadFileModal(row.id, Tourid)}
            >
              {translate("Document")}
            </button>
          </div>
        </div>
      ),
      width: "30%",
    },
  ];

  const Child = [
    {
      name: translate("Name"),
      selector: (row) => row.personName,
      width: "100px",
    },
    { name: translate("Surname"), selector: (row) => row.personSurName },
    { name: translate("Gender"), selector: (row) => row.gender },
    { name: translate("DOB"), selector: (row) => row.personBirthDay },
    {
      name: translate("Nationality"),
      selector: (row) => row.personNationality,
    },

    {
      name: translate("Total"),
      selector: (row) => `${row.child_price} €`,
    },
    {
      name: translate("Action"),
      selector: (row) => (
        <div
          className={
            BookingDetails?.reservation?.reservation_status === "Cancelled"
              ? "d-none"
              : "d-block"
          }
        >
          <div className="flex_center">
            <button
              className="button px-10 py-10 -info-2 bg-accent-1 text-white col-5 my-2 mx-2 text-end"
              onClick={() => openEditData(row)} // Pass the current row
            >
              {translate("Edit")}
            </button>
            <button
              className="button px-20 py-10 -info-2 bg-accent-1 text-white col-5 my-2 mx-2 text-end"
              onClick={() => openUploadFileModal(row.id, Tourid)}
            >
              {translate("Document")}
            </button>
          </div>
        </div>
      ),
      width: "30%", // Set a custom width for the button column
      // Set a custom width for the button column
    },
  ];

  const baby = [
    {
      name: translate("Name"),
      selector: (row) => row.personName,
      width: "100px",
    },
    { name: translate("Surname"), selector: (row) => row.personSurName },
    { name: translate("Gender"), selector: (row) => row.gender },
    { name: translate("DOB"), selector: (row) => row.personBirthDay },
    {
      name: translate("Nationality"),
      selector: (row) => row.personNationality,
    },
    {
      name: translate("Total"),
      selector: (row) => `${row.baby_price} €`,
    },
    {
      name: translate("Action"),
      selector: (row) => (
        <div
          className={
            BookingDetails?.reservation?.reservation_status === "Cancelled"
              ? "d-none"
              : "d-block"
          }
        >
          <div className="flex_center">
            <button
              className="button px-10 py-10 -info-2 bg-accent-1 text-white col-5 my-2 mx-2 text-end"
              onClick={() => openEditData(row)} // Pass the current row
            >
              {translate("Edit")}
            </button>
            <button
              className="button px-20 py-10 -info-2 bg-accent-1 text-white col-5 my-2 mx-2 text-end"
              onClick={() => openUploadFileModal(row.id, Tourid)}
            >
              {translate("Document")}
            </button>
          </div>
        </div>
      ),
      width: "30%",
    },
  ];

  const ServicesColumn = [
    {
      name: translate("Name"),
      selector: (row) => `${row.name} ${row.surname}`,
      width: "300px",
    },
    {
      name: translate("Services"),
      selector: (row) => row.title,
      width: "300px",
    },
    {
      name: translate("Amount"),
      selector: (row) =>
        row.price == 0 ? translate("inclusive") : `${row.price} €`,
    },
  ];

  const Total = [
    {
      name: translate("Subtotal"),
      selector: (row) => `${row.subtotal} €`,
      cell: (row) => `${row.subtotal} €`,
    },
    // { name: "Tax", selector: (row) => row.Total },
    {
      name: translate("Discount"),
      selector: (row) => row.discount,
      cell: (row) => `${row.discount} €`,
    },
    {
      name: translate("Total"),
      selector: (row) => row.total,
      cell: (row) => `${row.total} €`,
    },
    {
      name: translate("Amount Paid"),
      selector: (row) => `${row.amount_paid} €`,
    },
    {
      name: translate("Amount Due"),
      selector: (row) => row.amount_due,
      cell: (row) => `${row.amount_due} €`,
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
  function closeUploadFileModal() {
    setuploadFileisOpen(false);
  }
  function openEditData(row) {
    setPersonalUserID(row.id);

    setEditUserData(row);

    setEditCustomerData({
      name: row.personName,
      surname: row.personSurName,
      gender: row.gender, // Default value
      birthday: row.personBirthDay,
      nationality: row.personNationality, // Default value
      id: row.main_person,
      res_id: row.reservation_id,
    });

    setEditData(true);
  }
  function closeEditData() {
    setEditData(false);
  }
  function closeAdult1Deta() {
    setAdult1Deta(false);
  }

  // for add document row and remove row

  // for booking details

  const [personId, setPersonId] = useState(0);
  const [AdditionalService, setAdditionalService] = useState([]);
  const [AdultPrice, setAdultPrice] = useState([]);
  const [PaymentData, setPaymentData] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const searchParams = useSearchParams();
  const Tourid = searchParams.get("id");
  const CustomerID = searchParams.get("customerID");
  const TourID = searchParams.get("TourID");

  function openUploadFileModal(personId, reservationId) {
    setuploadFileisOpen(true);
    setPersonId(personId);
    filterData(personId);
  }

  const filterData = async (personId) => {
    const formData = new FormData();
    formData.append("user_id", CustomerID);
    formData.append("id", Tourid);
    const response = await POST.request({
      form: formData,
      url: "booking_details",
    });

    if (response.Bookings) {
      const filteredData = response.Bookings.adultData.concat(
        response.Bookings.childData,
        response.Bookings.babyData
      );

      const matchedData = filteredData.filter((data) => data.id === personId);

      if (matchedData.length > 0) {
        const docs = matchedData.map((doc) => {
          if (doc.documets.length > 0) {
            const docFiles = doc.documets.map((doc) => ({
              type: doc.document_type,
              Name: doc.file_url_orginal_name,
              fileLink: doc.full_path,
            }));

            setViewDetails(docFiles);
          } else {
            setViewDetails([]);
          }
        });

        const downloads = matchedData.map((doc) => {
          if (doc.download_documets && doc.download_documets.length > 0) {
            const download = doc.download_documets.map((doc) => ({
              type: doc.document_type,

              Name: doc.file_url_orginal_name,
              fileLink: doc.full_path,
            }));

            setDownloadDetails(download);
          }
        });
      }
    }
  };

  const fetchBookingDetails = async () => {
    setLoading(true);
    const formData = new FormData();

    formData.append("user_id", CustomerID);
    formData.append("id", Tourid);

    try {
      const response = await POST.request({
        form: formData,
        url: "booking_details",
      });
      setLoading(false);
      setBookingDetails(response?.Bookings);
      setGetFlightData(response?.Bookings?.flightInfo);
      setGetHotelData(response?.Bookings?.hotelInfo);
      if (response?.Bookings?.paymentData) {
        setPendingPaymentValue({
          firstAmount: response.Bookings.paymentData.payment_plan_1 || "", // Default to empty if null/undefined
          secondAmount: response.Bookings.paymentData.payment_plan_2 || "",
          thirdAmount: response.Bookings.paymentData.payment_plan_3 || "",
          firstDate: response.Bookings.paymentData.payment_plan_date_1 || "",
          secondDate: response.Bookings.paymentData.payment_plan_date_2 || "",
          thirdDate: response.Bookings.paymentData.payment_plan_date_3 || "",
          id: response.Bookings.paymentData.id || "",
          transaction_id: response.Bookings.paymentData.payment_intent_id || "",
        });
      } else {
        console.warn("paymentData not found in response");
      }

      const paymentDetails = [
        {
          date: response.Bookings.paymentData.payment_plan_date_1,
          amount: response.Bookings.paymentData.payment_plan_1,
          paidDate: response.Bookings.paymentData.paid_date_1,
          paidMethod: ` ${
            response.Bookings.paymentData.payment_intent_id[0] == undefined
              ? " "
              : `Via Stripe - ${response.Bookings.paymentData.payment_intent_id[0]}`
          }`,
        },
        {
          date: response.Bookings.paymentData.payment_plan_date_2,
          amount: response.Bookings.paymentData.payment_plan_2,
          paidDate: response.Bookings.paymentData.paid_date_2,
          paidMethod: ` ${
            response.Bookings.paymentData.payment_intent_id[1] == undefined
              ? " "
              : `Via Stripe - ${response.Bookings.paymentData.payment_intent_id[1]}`
          }`,
        },
        {
          date: response.Bookings.paymentData.payment_plan_date_3,
          amount: response.Bookings.paymentData.payment_plan_3,
          paidDate: response.Bookings.paymentData.paid_date_3,
          paidMethod: ` ${
            response.Bookings.paymentData.payment_intent_id[2] == undefined
              ? " "
              : `Via Stripe - ${response.Bookings.paymentData.payment_intent_id[2]}`
          }`,
        },
      ];

      setPaymentData(paymentDetails);

      const FileDeta = [
        { name: translate("Document Type"), selector: (row) => row.type },

        { name: translate("Document Name"), selector: (row) => row.Name },
        {
          name: translate("Action"),
          selector: (row) => (
            <Link
              href={row.fileLink}
              target="_blank"
              className="button -sm -accent-1 bg-info-2 text-white my-2"
            >
              {translate("View")}{" "}
            </Link>
          ),
        },
      ];

      setViewData(FileDeta);

      const DownloadData = [
        {
          name: translate("Document Type"),
          selector: (row) => row.type,
          width: "20%",
        },

        { name: "Document Name", selector: (row) => row.Name, width: "40%" },
        {
          name: "Action",
          selector: (row) => (
            <a
              href={row.fileLink}
              download={row.Name} // Ensure the file gets downloaded with the correct name
              target="_blank" // Open the link in a new tab if needed
              rel="noopener noreferrer" // Security measure for external links
              className="button -sm -accent-1 bg-info-2 text-white my-2" // Button-like styles for the anchor tag
            >
              {translate("Download")}
            </a>
          ),
          width: "20%",
        },
      ];

      setDownloadData(DownloadData);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    fetchBookingDetails();
  }, [Tourid, CustomerID]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const additional = localStorage.getItem("additionalfordashboard");
      const AdultsPrice = localStorage.getItem("priceObjectwithlab");

      if (additional && additional !== "undefined") {
        try {
          const copyadditional = JSON.parse(additional);
          setAdditionalService(copyadditional);
        } catch (error) {
          console.error("Error parsing userData:", error);
        }
      }
    }
  }, []);

  const [PdfData, setPdfData] = useState("");

  useEffect(() => {
    const fetchPayments = async () => {
      const formData = new FormData();
      formData.append("reservation_id", BookingDetails?.reservation?.id);

      const response = await POST.request({
        form: formData,
        url: "invoicegenerate",
      });

      if (response) {
        setPdfData(response.pdf_url);
      }
    };
    if (BookingDetails?.reservation?.id) {
      fetchPayments();
    }
  }, [BookingDetails]);

  useEffect(() => {
    if (!editCustomerData.nationality) {
      setEditCustomerData({
        ...editCustomerData,
        nationality: nationalities[0],
      }); // Default to the first nationality
    }
  }, [editCustomerData, nationalities]);

  // for edit customer data

  const handleDateFocus = (e) => {
    // Ensure this is a user gesture
    if (e.target === document.activeElement) {
      e.target.showPicker();
    }
  };

  const convertDotToDashDate = (dateString) => {
    if (!dateString) return "";
    // Split the date string by "."
    const [day, month, year] = dateString.split(".");
    // Return the date in "DD-MM-YYYY" format
    const days = `${day}-${month}-${year}`;

    return `${year}-${month}-${day}`;
  };

  const convertGermanToISO = (germanDate) => {
    if (!germanDate) return "";
    const [day, month, year] = germanDate.split(".");
    return `${day}.${month}.${year}`; // Return in German format
  };

  // Function to convert ISO date (YYYY-MM-DD) to German format (DD.MM.YYYY)
  const convertISOToGerman = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}.${month}.${year}`; // Return in German format
  };

  const FetchEditData = async () => {
    setIsLoading(true);

    const formData = new FormData();

    formData.append("reservation_person_id", PersonalUserID);
    formData.append("name", editCustomerData.name);
    formData.append("surname", editCustomerData.surname);
    formData.append(
      "birthday",
      convertDotToDashDate(editCustomerData.birthday)
    );
    formData.append("gender", editCustomerData.gender);
    formData.append("nationality", editCustomerData.nationality);
    formData.append("main_person", editCustomerData.id);
    formData.append("reservation_id", editCustomerData.res_id);

    try {
      const response = await POST.request({
        form: formData,
        url: "edit_person",
      });
      showSuccessToast(translate, "Updated successfully");
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  };

  const HandleEditData = (e) => {
    e.preventDefault();
    FetchEditData();
    setTimeout(() => {
      closeEditData();
      fetchBookingDetails();
    }, 2000);
  };

  // for Add New Person

  const [AddpersonDetails, setAddpersonDetails] = useState([]);

  useEffect(() => {
    const FatchUserDetails = async () => {
      const formData = new FormData();

      formData.append("tour_id", TourID);

      try {
        const response = await POST.request({
          form: formData,
          url: "pricedetail",
        });
        setAddpersonDetails(response?.Tour_Details);
      } catch (e) {
        console.error(e);
      }
    };
    FatchUserDetails();
  }, [TourID]);

  const [AddpersonData, setAddpersonData] = useState({
    name: "",
    surname: "",
    gender: "male",
    birthDate: "",
    nationality: "",
    roomType: "1",
  });
  const [RadioValue, setRadioValue] = useState({});
  const dateInputRef = useRef(null);

  useEffect(() => {
    setAdultPrice(AddpersonDetails?.tour_price);
  }, [AddpersonDetails]);

  useEffect(() => {
    setPaymentCheckbox(BookingDetails?.reservation?.paymentType);
  }, [BookingDetails]);

  useEffect(() => {
    // Ensure AddpersonData, AdultPrice, and RadioValue are defined before using them
    if (AddpersonData && AddpersonData.roomType && Array.isArray(AdultPrice)) {
      const total = AdultPrice.reduce((total, e) => {
        // Check if price_type matches the room type
        return e.price_type == AddpersonData.roomType
          ? total + parseFloat(e.price)
          : total;
      }, 0);

      // Safely parse RadioValue.price and conditionally add to subtotal
      const totalPrice = selectedOptions.reduce((total, current) => {
        return total + Number(current.price); // Convert price to number
      }, 0);

      setSubtotal(total + totalPrice);
    } else {
      setSubtotal(0); // Reset subtotal if conditions aren't met
    }
  }, [AdultPrice, AddpersonData, selectedOptions]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddpersonData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e, idx, price, order, title, optid) => {
    const selectedValue = e.target.value;

    // Update only the last selected radio button's value and associated properties
    setRadioValue({
      selectedValue: selectedValue,
      price: price,
      order: order,
      title: title,
      optid: optid,
    });
  };

  const handleAddPersong = () => {
    if (
      AddpersonData.name !== "" ||
      AddpersonData.surname !== "" ||
      AddpersonData.gender !== "" ||
      AddpersonData.birthDate !== "" ||
      AddpersonData.nationality !== ""
    ) {
      handlePayment();
    } else {
      showErrorToast(translate, "All fields are required");
    }
    // setTimeout(() => {
    //   closeModal();
    // }, 2000);
  };

  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0];
    if (BookingDetails?.reservation?.date_begin) {
      const startDateString = BookingDetails?.reservation?.date_begin;

      if (startDateString) {
        try {
          const [day, month, year] = startDateString.split(".").map(Number);

          // Create a new Date object (months are 0-indexed in JavaScript)
          const startDate = new Date(year, month - 1, day); // month - 1 because months are 0-indexed

          // Check if the date is valid
          if (isNaN(startDate.getTime())) {
            throw new Error("Invalid start date");
          }

          // Calculate six days before
          const sixDaysBefore = new Date(
            startDate.getTime() - 5 * 24 * 60 * 60 * 1000
          );

          // Check if sixDaysBefore is valid
          if (isNaN(sixDaysBefore.getTime())) {
            throw new Error("Invalid date for sixDaysBefore");
          }

          const sixDaysBeforeString = sixDaysBefore.toISOString().split("T")[0];

          if (sixDaysBeforeString > todayString) {
            setDateEnd(sixDaysBeforeString);
          } else {
            const nextDay = today.setDate(today.getDate() + 1);
            const nextDayString = new Date(nextDay).toISOString().split("T")[0];
            setDateEnd(nextDayString);
          }
        } catch (error) {
          console.error("Error parsing date string:", error);
        }
      }
    }

    setDateBegin(todayString);
    setMinEndDate(todayString);
  }, [BookingDetails?.reservation?.date_begin]);

  useEffect(() => {
    if (secondAmount) {
      calculateThirdAmount();
    }
  }, [secondAmount]);

  const calculateThirdAmount = () => {
    const firstAmountValue = parseFloat(firstAmount);
    const secondAmountValue = parseFloat(secondAmount);

    const totalAmount = subtotal;
    const total = firstAmountValue + secondAmountValue;

    if (total < totalAmount) {
      const thirdAmountValue = parseFloat(totalAmount - total).toFixed(2);
      setThirdAmount(thirdAmountValue);
    } else {
      setThirdAmount(0);
    }
  };

  const handleDateChange = useCallback(
    (event) => {
      const selectedDate = event.target.value;
      const maxDateValue = dateEnd;

      if (selectedDate > maxDateValue) {
        setSecondDate(maxDateValue);
      } else {
        setSecondDate(selectedDate);
      }
    },
    [dateEnd]
  );

  const handleClose = () => {
    setShowStripeModal(false);
    setTimeout(() => {
      fetchBookingDetails();
    }, 2000);
  };

  useEffect(() => {
    if (dateInputRef.current) {
      dateInputRef.current.addEventListener("change", handleDateChange);
    }

    return () => {
      if (dateInputRef.current) {
        dateInputRef.current.removeEventListener("change", handleDateChange);
      }
    };
  }, [handleDateChange]);

  const [PersonData, setPersonData] = useState();

  const [ServiceTitle, setServiceTitle] = useState();
  const [ServiceOrder, setServiceOrder] = useState();
  const [ServicePrice, setServicePrice] = useState();

  useEffect(() => {
    const serviceTitle = selectedOptions.map((option) => {
      return option.title;
    });

    const ServiceOrder = selectedOptions.map((option) => {
      return option.addition_order;
    });

    const ServicePrice = selectedOptions.map((option) => {
      return option.price;
    });

    setServiceTitle(serviceTitle);
    setServiceOrder(ServiceOrder);
    setServicePrice(ServicePrice);
  }, [selectedOptions]);

  const FetchAddperson = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("reservation_id", BookingDetails.reservation?.id);
    formData.append("name", AddpersonData.name);
    formData.append("surname", AddpersonData.surname);
    formData.append("birthday", AddpersonData.birthDate);
    formData.append("gender", AddpersonData.gender);
    formData.append("nationality", AddpersonData.nationality);
    formData.append(
      "person_type",
      AddpersonData.roomType == "1"
        ? "adult"
        : AddpersonData.roomType == "2"
        ? "child"
        : "baby"
    );
    // formData.append("title", ServiceTitle);
    // formData.append("price", ServicePrice || "");
    // formData.append("additional_order", ServiceOrder);

    formData.append("services", JSON.stringify(selectedOptions));
    formData.append("total", subtotal);

    try {
      const response = await POST.request({
        form: formData,
        url: "addperson",
      });
      if (response) {
        setIsLoading(false);
        showSuccessToast(translate, "Person was added successfully");
        closeModal();
        handleClose();
        fetchBookingDetails();
        setAddpersonData({
          name: "",
          surname: "",
          gender: "male",
          birthDate: "",
          nationality: "",
          roomType: "1",
        });
        setRadioValue({});
        setSelectedOptions([]);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handlePayment = () => {
    if (PaymentCheckbox == 1) {
      FetchAddperson();
    }

    if (PaymentCheckbox == 3) {
      FetchAddperson();
    }

    if (PaymentCheckbox == 4) {
      FetchAddperson();
    }

    if (PaymentCheckbox == 2) {
      setAddPersonAmount(subtotal);
      setShowStripeModal(true);
    }
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
    { value: "Permanent Resident(PR)", label: "Permanent Resident (PR)" },
    { value: "Vaccination Card", label: "Vaccination Card" },
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

  const handleDocumentSubmit = async () => {
    const formData = new FormData();
    formData.append("reservation_person_id", personId);
    formData.append("reservation_id", BookingDetails?.reservation?.id);
    formData.append("vendor_id", CustomerID);
    const documentData = rows.map((row) => {
      return {
        document: row?.document,
        type: row.type?.value,
      };
    });

    formData.append("documents_data", JSON.stringify(documentData));
    setIsLoading(true);
    const response = await POST.request({
      form: formData,
      url: "upload_bookingdocuments",
    });

    if (response.Status == 1) {
      setIsLoading(false);
      showSuccessToast(translate, "Document Uploaded Successfully");
      setTimeout(() => {
        setuploadFileisOpen(false);
      }, 3000);
      setRows([{ document: "", type: null }]);
    } else {
      setIsLoading(false);
      showErrorToast(translate, "Document Upload Failed");
    }
  };

  // for pending payment

  // Function to handle input changes

  const handlePaymentPending = (e) => {
    const { name, value } = e.target;
    setPendingPaymentValue((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // for cancel booking

  function CloseCancelPopUp() {
    setCanclePopUp(false);
  }

  const fatchCancelBooking = async () => {
    const formData = new FormData();
    formData.append("reservation_id", BookingDetails?.reservation?.id);
    formData.append("refund_amount", TotalRefundinCancel);

    try {
      const response = await POST.request({
        form: formData,
        url: "cancelBooking",
      });
      if (response) {
        showSuccessToast(translate, "Booking Cancelled Successfully");
        setTimeout(() => {
          window.location.reload();
        }, 5000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // to pay instalment payment

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const stripeModalClose = () => {
    setShowStripeModal(false);
  };

  const HandleInstallmentPay = (payable, type) => {
    setAmount(payable);

    console.log(pendingPaymentValue, "pendingPaymentValue");
    console.log(type, "installment number");

    setPandingAmount(payable);

    if (payable === pendingPaymentValue.secondAmount && type == "2") {
      const data = {
        plan_id: pendingPaymentValue.id,
        payment_plan: 2,
        plan_date: getTodayDate(),
        reservation_id: BookingDetails.reservation?.id,
        // transaction_id: pendingPaymentValue.transaction_id,
      };
      console.log("payment 2");

      setPaidData(data);
    } else {
      const data = {
        plan_id: pendingPaymentValue.id,
        payment_plan: 3,
        plan_date: getTodayDate(),
        reservation_id: BookingDetails.reservation?.id,
        transaction_id: pendingPaymentValue.transaction_id,
      };
      setPaidData(data);
      console.log("payment 3");
    }

    setShowStripeModal(true);
  };

  // for cancel booking

  const [RefundData, setRefundData] = useState({});

  const today = new Date();

  // Format the date in German format (dd.mm.yyyy)
  const formattedDate = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(today);

  const fatchRefund = async () => {
    setIsLoading(true);
    const formData = new FormData();

    formData.append("reservation_id", BookingDetails.reservation?.id);

    try {
      const response = await POST.request({
        form: formData,
        url: "getRefundAmount",
      });
      if (response) {
        setIsLoading(false);
        setRefundData(response);
      }
    } catch (e) {
      console.error(e);
    }
  };

  function openCancelPopUp() {
    setCanclePopUp(true);
    fatchRefund();
  }

  const [CancelStripCommision, setCancelStripCommision] = useState(0);
  const [TotalRefundinCancel, setTotalRefundinCancel] = useState(0);

  useEffect(() => {
    if (RefundData?.Refund_Amount) {
      const commission = RefundData?.Refund_Amount * 0.05;
      setCancelStripCommision(commission);
      if (BookingDetails?.reservation?.paymentType === "2") {
        setTotalRefundinCancel(RefundData?.Refund_Amount - commission);
      } else {
        setTotalRefundinCancel(RefundData?.Refund_Amount);
      }
    }
  }, [RefundData]);

  const shouldHideButton =
    BookingDetails?.reservation?.reservation_status === "Payment Completed" &&
    BookingDetails?.reservation?.paymentType === "3";

  useEffect(() => {
    if (GetHotelData !== null || GetFlightData !== null) {
      const ConvertHotelData = Object?.values(GetHotelData);
      const HotelPrices = ConvertHotelData.map((hotel) =>
        parseFloat(hotel?.hotel_price)
      );
      const FlightPrices = GetFlightData?.map((Flight) =>
        parseFloat(Flight?.flight_amount)
      );
      const ConformPrice = HotelPrices[0] + HotelPrices[1] + FlightPrices[0];

      setAddpersonTotal(ConformPrice);
    }
  }, [GetHotelData, GetFlightData]);

  const handleCheckboxChange = (option, isChecked) => {
    if (isChecked) {
      // Add selected option to the array
      setSelectedOptions((prev) => [
        ...prev,
        {
          title: option.title,
          price: option.price,
          additional_order: option.additinoal_order,
        },
      ]);
    } else {
      // Remove the option from the array
      setSelectedOptions((prev) =>
        prev.filter((item) => item.title !== option.title)
      );
    }
  };

  console.log(selectedOptions, "selectedOptions");

  return (
    <div>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "200px" }}
        >
          <ClipLoader color="#DAC04F" size={50} />
        </div>
      ) : (
        <>
          <ToastContainer />

          <h3 className="t_center">
            {" "}
            {translate("Booking Number")} :{" "}
            {BookingDetails?.reservation?.reservationNumber}
          </h3>
          <div className="row px-0 pb-10 mt-20 ">
            <div className="col-lg-6">
              <p className="t_center">
                {" "}
                {translate("Booked Date")} :{" "}
                {BookingDetails?.reservation?.booking_date}
              </p>
              <p className="t_center">
                {" "}
                {translate("Booking Status")} :{" "}
                {BookingDetails?.reservation?.reservation_status}
              </p>
              <p className="text-red t_center">
                {translate("Available")}{" "}
                {BookingDetails?.reservation?.capacity_empty}{" "}
                {translate("seats")}
              </p>
            </div>
            {BookingDetails?.reservation?.reservation_status != "Cancelled" && (
              <div
                className={`col-lg-6 ${
                  shouldHideButton ? "d-none" : "d-block"
                }`}
              >
                <div className={` flex small-flex-center `}>
                  <div
                    className={
                      BookingDetails?.reservation?.paymentType === "3"
                        ? "d-block"
                        : "d-none"
                    }
                  >
                    <button
                      className="button -sm -accent-1 bg-info-2 text-white "
                      onClick={openPaymentModal}
                    >
                      {translate("Pay")}
                    </button>
                    <span>{BookingDetails?.reservation?.amount_due} €</span>
                  </div>

                  {BookingDetails?.reservation?.capacity_empty != "0" && (
                    <div className="">
                      <button
                        className="button -sm -info-2 bg-accent-1 text-white "
                        onClick={openModal}
                      >
                        {translate("Add Person")}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Reservation Details Table */}
          {BookingDetails?.reservation ? (
            <DataTable
              title={translate("Reservation Details")}
              columns={ColumnReservation_details}
              data={[BookingDetails.reservation]}
              highlightOnHover
            />
          ) : (
            <p></p>
          )}

          <br />

          {/* Adult Data Table */}
          {BookingDetails?.reservation ? (
            <DataTable
              title={translate("Contact Information")}
              columns={columnAdu_1}
              data={[BookingDetails.reservation]}
              highlightOnHover
            />
          ) : (
            <p></p>
          )}

          <br />

          {/* Adult Data List */}
          <DataTable
            title={translate("Adult Information")}
            columns={columnAduInfo_2}
            data={
              BookingDetails?.adultData?.length ? BookingDetails.adultData : []
            } // Change data dynamically
            highlightOnHover
          />

          <br />

          {/* Child Data Table */}
          <DataTable
            title={translate("Child Information")}
            columns={Child}
            data={
              BookingDetails?.childData?.length ? BookingDetails.childData : []
            } // Change data dynamically
            highlightOnHover
          />

          <br />

          {/* Baby Data Table */}
          <DataTable
            title={translate("Baby Information")}
            columns={baby}
            data={
              BookingDetails?.babyData?.length ? BookingDetails.babyData : []
            } // Change data dynamically
            highlightOnHover
          />

          <br />
          <DataTable
            title={translate("Services Per Person")}
            columns={ServicesColumn}
            data={BookingDetails?.extraServices}
            pagination
            highlightOnHover
          />

          <br />
          {/* <DataTable
                    title={translate("AmountPaid")}
                    columns={AmountPaid}
                    data={[BookingDetails.paymentData]}
                    highlightOnHover
                  /> */}

          {BookingDetails?.reservation?.paymentType === "3" && (
            <DataTable
              title={translate("Payment Information")}
              columns={paymentColumn}
              data={PaymentData}
              highlightOnHover
            />
          )}

          <br />

          {BookingDetails?.reservation ? (
            <DataTable
              title={translate("Total")}
              columns={Total}
              data={[BookingDetails.reservation]}
              highlightOnHover
            />
          ) : (
            <p></p>
          )}

          <br />
          {BookingDetails?.reservation?.reservation_status != "Cancelled" && (
            <button
              className="button -sm -red-2 bg-red-3 text-white col-lg-2 mx-2"
              onClick={openCancelPopUp}
            >
              {translate("Cancel")}
            </button>
          )}

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
                          {/* <option value="">{translate("Select Gender")}</option> */}
                          <option value="male">{translate("Male")}</option>
                          <option value="female">{translate("Female")}</option>
                          <option value="other">{translate("Other")}</option>
                        </select>
                        <label className="lh-1 text-16 text-light-1 dd_l_top10">
                          {translate("Gender")}
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
                          onFocus={handleDateFocus}
                          max={getTodayDate()}
                          required
                        />
                        <label className="lh-1 text-16 text-light-1">
                          {translate("Birthday Date")}
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

                        <label className="lh-1 text-16 text-light-1 dd_l_top10">
                          {translate("Nationality")}
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-input spacing">
                        <select
                          name="roomType"
                          value={AddpersonData.roomType}
                          onChange={handleInputChange}
                          required
                          className="form-control"
                        >
                          {/* <option value="">{translate("Select Type")}</option> */}
                          <option value="1">{translate("Adult")}</option>
                          <option value="2">{translate("Child")}</option>
                          <option value="3">{translate("Baby")}</option>
                        </select>
                        <label className="lh-1 text-16 text-light-1 dd_l_top10">
                          {translate("Adult Type")}
                        </label>
                      </div>
                    </div>
                  </div>
                  {AddpersonData.length !== 0 &&
                    AddpersonData.roomType !== "3" && (
                      <div className="my-3 border_b px-md-40">
                        <h5 className="text-18 fw-500 my-2">
                          {translate("Possible additional services per person")}{" "}
                          :
                        </h5>

                        <div>
                          {AddpersonDetails?.addtional_price?.map(
                            (option, idx) => (
                              <div
                                key={option.id}
                                className="d-flex items-center justify-between radio_hight"
                              >
                                <div className="flex items-center">
                                  <div className="form-checkbox flex items-center">
                                    <input
                                      type="checkbox"
                                      id={`checkbox-${idx}`}
                                      name={`checkboxGroup-${idx}`}
                                      onChange={(e) =>
                                        handleCheckboxChange(
                                          option,
                                          e.target.checked
                                        )
                                      }
                                    />
                                    <label
                                      htmlFor={`checkbox-${idx}`}
                                      className="form-checkbox__mark"
                                    >
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
                                    </label>
                                  </div>
                                  <label
                                    htmlFor={`checkbox-${idx}`}
                                    className="lh-16"
                                  >
                                    {option.title}
                                  </label>
                                </div>
                                <div className="text-14">
                                  + {formatPrice(option.price)}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>
              </div>

              <div className="px-20">
                {BookingDetails?.reservation?.paymentType && (
                  <>
                    {/* Payment Type 1: Payment in Advance */}
                    {BookingDetails.reservation.paymentType === "1" && (
                      <div>
                        <div className="d-flex items-center pointer-check py-3">
                          <label htmlFor="1" className="lh-16 ">
                            {translate(
                              "Please make payment on following bank detail"
                            )}
                          </label>
                        </div>

                        <div className="row">
                          <div className="col-md-6 col-12">
                            <div
                              className={`p-2 ${
                                selectedpaymentOption === "adPay"
                                  ? "bg_dark"
                                  : "bg_dark_1"
                              }`}
                            >
                              <p>
                                <span>
                                  <b>{translate("Account holder")}:</b>
                                </span>{" "}
                                Mekka Booking GmbH
                              </p>
                              <p>
                                <span>
                                  <b>IBAN:</b>
                                </span>{" "}
                                DE71 5125 0000 0002 2282 11
                              </p>
                              <p>
                                <span>
                                  <b>BIC:</b>
                                </span>{" "}
                                HELADEF1TSK
                              </p>
                              <p>
                                <span>
                                  <b>Bank:</b>
                                </span>{" "}
                                Taunus Sparkasse
                              </p>
                            </div>
                          </div>
                          <div className="col-md-6 col-12 my-md-0 my-3">
                            <div className="p-2 border-5 d-inline-block">
                              <p className="py-2">
                                {translate(
                                  "You will get an order number after you completed the reservation. The Order number you will need to enter in the “Purpose Code” when you make the payment via bank. You will also get email with all the detail as well."
                                )}
                              </p>
                              <p className="text-red">
                                {translate(
                                  "Note: Please make the payment within next 7 days. Post that the order will be cancelled."
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Payment Type 2: Online Payment */}
                    {BookingDetails.reservation.paymentType === "2" && (
                      <div>
                        <div className="d-flex items-center pointer-check py-3">
                          <label htmlFor="2" className="lh-16 ">
                            {translate(
                              "Online Payment (Visa, Mastercard, American Express, Japan Credit Bureau (JCB), Discover)"
                            )}
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Payment Type 3: Installment Payment */}
                    {BookingDetails.reservation.paymentType === "3" && (
                      <div>
                        <div className="d-flex items-center pointer-check py-3">
                          <label htmlFor="3" className="lh-16">
                            {translate(
                              "Your amount will be added to the last installment amount"
                            )}
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="col-12 px-20">
                <div className="row items-center">
                  <button
                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                    onClick={handleAddPersong}
                  >
                    {isLoading ? (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "30px", width: "100%" }}
                      >
                        <ClipLoader color="#ffffff" size={30} />
                      </div>
                    ) : (
                      translate("ADD PERSON")
                    )}
                  </button>
                  <button
                    className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 col-sm-6 mx-10 mx-md-3"
                    onClick={closeModal}
                  >
                    {translate("CANCEL")}
                  </button>

                  <h6 className="booking-form-price col-4 mx-4">
                    {translate("Subtotal")}:
                    <span>{formatPrice(subtotal + AddpersonTotal)}</span>
                  </h6>
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
              <div
                className="d-flex justify-content-between p-2"
                id="modelopen"
              >
                <h2 className="px-20">{translate("PENDING PAYMENT")}</h2>
                <button onClick={closePaymentModal}>
                  <IoClose size={25} />
                </button>
              </div>
              <div className=" y-gap-30 contactForm px-20 py-10">
                <div className="col-md-12">
                  <h5 className="mb-3 t_center mt-3">
                    {translate("Total Amount")} :{" "}
                    <b>{BookingDetails?.reservation?.subtotal} €</b>
                  </h5>
                </div>

                <div className="row">
                  <div className="col-md-5 col-12">
                    <div className="form-input spacing">
                      <input
                        type="text"
                        name="firstAmount"
                        value={pendingPaymentValue.firstAmount}
                        onChange={handlePaymentPending}
                        disabled
                      />
                      <label className="lh-1 text-16 text-light-1">
                        1st Amount
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5 col-12">
                    <div className="form-input spacing">
                      <input
                        type="text"
                        name="firstDate"
                        value={pendingPaymentValue.firstDate}
                        disabled
                      />
                      <label className="lh-1 text-16 text-light-1">Date</label>
                    </div>
                  </div>
                  <div className="col-md-2 col-12">
                    <button
                      className="button -sm -green-2 bg-green-3 text-dark my-4 mx-0 full_width text-white"
                      disabled
                    >
                      {translate("PAID")}
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 col-12">
                    <div className="form-input spacing">
                      <input
                        type="text"
                        name="firstAmount"
                        value={pendingPaymentValue.secondAmount}
                        onChange={handlePaymentPending}
                        disabled
                      />
                      <label className="lh-1 text-16 text-light-1">
                        2st Amount
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5 col-12">
                    <div className="form-input spacing">
                      <input
                        type="text"
                        name="firstDate"
                        value={pendingPaymentValue.secondDate}
                        disabled
                      />
                      <label className="lh-1 text-16 text-light-1">Date</label>
                    </div>
                  </div>
                  <div
                    className="col-md-2"
                    onClick={() => {
                      BookingDetails?.paymentData?.type_payment_2 == 1
                        ? stripeModalClose()
                        : HandleInstallmentPay(
                            pendingPaymentValue.secondAmount,
                            2
                          );
                    }}
                    disabled={BookingDetails?.paymentData?.type_payment_2 === 1}
                  >
                    <button
                      className={`${
                        BookingDetails?.paymentData?.type_payment_2 == 1
                          ? "button -sm -green-2 bg-green-3 text-dark my-4 mx-0 full_width text-white"
                          : "button -sm -info-2 bg-accent-1 text-dark my-4 mx-0 full_width text-white"
                      }`}
                    >
                      {BookingDetails?.paymentData?.type_payment_2 == 1
                        ? translate("PAID")
                        : translate("PAY")}
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 col-12">
                    <div className="form-input spacing">
                      <input
                        type="text"
                        name="firstAmount"
                        value={pendingPaymentValue.thirdAmount}
                        onChange={handlePaymentPending}
                        disabled
                      />
                      <label className="lh-1 text-16 text-light-1">
                        3st Amount
                      </label>
                    </div>
                  </div>
                  <div className="col-md-5 col-12">
                    <div className="form-input spacing">
                      <input
                        type="text"
                        name="firstDate"
                        value={pendingPaymentValue.thirdDate}
                        disabled
                      />
                      <label className="lh-1 text-16 text-light-1">Date</label>
                    </div>
                  </div>
                  <div
                    className="col-md-2"
                    onClick={() => {
                      BookingDetails?.paymentData?.type_payment_3 == 1
                        ? stripeModalClose()
                        : HandleInstallmentPay(
                            pendingPaymentValue.thirdAmount,
                            3
                          );
                    }}
                    disabled={BookingDetails?.paymentData?.type_payment_3 === 1}
                  >
                    <button
                      className={`${
                        BookingDetails?.paymentData?.type_payment_3 == 1
                          ? "button -sm -green-2 bg-green-3 text-dark my-4 mx-0 full_width text-white"
                          : "button -sm -info-2 bg-accent-1 text-dark my-4 mx-0 full_width text-white"
                      }`}
                    >
                      {BookingDetails?.paymentData?.type_payment_3 == 1
                        ? translate("PAID")
                        : translate("PAY")}
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
                <h2 className="">{translate("Cancel Trip")}</h2>
                <button onClick={CloseCancelPopUp}>
                  <IoClose size={25} />
                </button>
              </div>

              <div className=" y-gap-30 contactForm px-10 py-10">
                {RefundData && (
                  <table className="ttable table-success table-striped my-3 custom-table-bordered full_width">
                    <thead>
                      <tr>
                        <th scope="col" className="px-1 py-2">
                          <b>{translate("Item Details")}</b>
                        </th>
                        <th
                          scope="col"
                          className="px-1 py-2"
                          style={{ width: "40%" }}
                        >
                          <b>{translate("Fee")} </b>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-1 py-2">
                          {translate("Booking Date")}
                        </td>
                        <td className="px-1 py-2">
                          {BookingDetails?.reservation?.booking_date}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-1 py-2">
                          {translate("Cancel Date")}
                        </td>
                        <td className="px-1 py-2">{formattedDate}</td>
                      </tr>
                      <tr>
                        <td className="px-1 py-2">{translate("Tour Date")}</td>
                        <td className="px-1 py-2">{RefundData?.tour_date}</td>
                      </tr>

                      {BookingDetails?.reservation?.paymentType === "2" ? (
                        <tr>
                          <td className="px-1 py-2">
                            {translate("Strip Commision 5%")}
                          </td>
                          <td className="px-1 py-2">
                            {CancelStripCommision} €
                          </td>
                        </tr>
                      ) : (
                        ""
                      )}

                      <tr>
                        <td className="px-1 py-2">
                          {translate("Total Refund Amount")} (
                          {RefundData?.percentage}%)
                        </td>
                        <td className="px-1 py-2">{TotalRefundinCancel} €</td>
                      </tr>
                    </tbody>
                  </table>
                )}

                <hr />
                {BookingDetails?.reservation?.paymentType != "4" && (
                  <p>
                    <span className="text-red">*</span>
                    {translate(
                      "Amount will be credited within 7 days in your bank account"
                    )}
                  </p>
                )}

                <div
                  className="border-1 rounded-12 shadow-1 overflow-hidden mt-20 mb-20"
                  id="ref"
                >
                  <p className="text-center py-3 bg-color-accent-1 bg-accent-1">
                    <b> {translate("Cancellation Rules")}</b>
                  </p>
                  <div className="px-3">
                    <ul className="">
                      <li className="text-center py-1">
                        {translate(
                          "15% if canceled before 90 days of the trip"
                        )}
                      </li>
                      <li className="text-center py-1">
                        {translate(
                          "60% if canceled before 30 days of the trip"
                        )}
                      </li>
                      <li className="text-center py-1">
                        {translate(
                          "100% if canceled before 7 days of the trip"
                        )}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="col-lg-12 d-flex justify-content-center">
                  <button
                    className="button -sm -red-2 bg-red-3 text-white"
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        "Are you sure you want to Cancel this Booking ?"
                      );
                      if (confirmDelete) {
                        // Proceed with the delete operation

                        fatchCancelBooking();
                        setTimeout(() => {
                          CloseCancelPopUp();
                        }, 2000);
                      } else {
                        setTimeout(() => {
                          CloseCancelPopUp();
                        }, 2000);
                      }
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
              id="DocumentModal"
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
                        height: "40vh",
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
                                    onChange={(e) =>
                                      handleImageChange(e, index)
                                    }
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
                            {isLoading ? (
                              <div
                                className="d-flex justify-content-center align-items-center"
                                style={{ height: "30px", width: "100%" }}
                              >
                                <ClipLoader color="#ffffff" size={30} />
                              </div>
                            ) : (
                              translate("SUBMIT")
                            )}
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
                      title={translate("Documents")}
                      columns={viewData}
                      data={viewDetails}
                      highlightOnHover
                    />
                  </TabPanel>
                  <TabPanel>
                    <DataTable
                      title={translate("Download Your Tickets and Visa")}
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
                            className="form-control"
                          >
                            <option value="male">{translate("Male")}</option>
                            <option value="female">
                              {translate("Female")}
                            </option>
                            <option value="other">{translate("Other")}</option>
                          </select>
                          <label className="lh-1 text-16 text-light-1 dd_l_top10">
                            {translate("Gender")}
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-input spacing">
                          {/* <input
                                  type="date"
                                  required
                                  value={editCustomerData.birthday}
                                  // onChange={(e) =>
                                  //   setEditCustomerData({
                                  //     ...editCustomerData,
                                  //     birthday: e.target.value,
                                  //   })
                                  // }
                                  onChange={(e) => {
                                    const newValue = e.target.value.trim();
                                  
                                    // Ensure that the nationality field is not empty
                                    if (newValue !== '') {
                                      const formattedValue = newValue.charAt(0).toUpperCase() + newValue.slice(1).toLowerCase();
                                      setEditCustomerData({
                                        ...editCustomerData,
                                        birthday: formattedValue, // Set the formatted nationality
                                      });
                                    } else {
                                      console.error("Nationality cannot be empty");
                                    }
                                  }}
                                  
                                /> */}
                          <input
                            type="date"
                            required
                            value={convertDotToDashDate(
                              editCustomerData.birthday
                            )} // Convert German date to ISO for input
                            onChange={(e) => {
                              const newDate = e.target.value; // Get the new date input
                              // Convert back to "DD.MM.YYYY" format before saving
                              const [day, month, year] = newDate.split("-");
                              setEditCustomerData({
                                ...editCustomerData,
                                birthday: `${year}.${month}.${day}`, // Save in the original format
                              });
                            }}
                            max={getTodayDate()}
                            onFocus={handleDateFocus}
                            onKeyDown={(e) => e.preventDefault()}
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
                            className="form-control"
                          >
                            <option value="">
                              {/* {translate("Select Nationality")} */}
                              {editCustomerData.nationality}
                            </option>
                            {nationalities.map((e) => (
                              <option key={e} value={e}>
                                {translate(e)}
                              </option>
                            ))}
                          </select>

                          <label className="lh-1 text-16 text-light-1 dd_l_top10">
                            {translate("Nationality")}
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
                          {isLoading ? (
                            <div
                              className="d-flex justify-content-center align-items-center"
                              style={{ height: "30px", width: "100%" }}
                            >
                              <ClipLoader color="#ffffff" size={30} />
                            </div>
                          ) : (
                            translate("UPDATE")
                          )}
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
                        <label className="lh-1 text-16 text-light-1 dd_l_top10">
                          {translate("Gender")}
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
                          <option value="canadian">
                            {" "}
                            {translate("Canadian")}
                          </option>
                        </select>
                        <label className="lh-1 text-16 text-light-1">
                          {translate("Nationality")}
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
                        <label className="lh-1 text-16 text-light-1">
                          {From}
                        </label>
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

          {showStripeModal && (
            <Stripeform
              payableAmount={amount}
              showStripeModal={showStripeModal}
              handleClose={handleClose}
              closeModal={closeModal}
              paidData={paidData}
              fetchBookingDetails={fetchBookingDetails}
              closePaymentModal={closePaymentModal}
              AddPersonAmount={AddPersonAmount}
              AddpersonData={AddpersonData}
              RadioValue={RadioValue}
              reservation_id={BookingDetails.reservation?.id}
              subtotal={subtotal}
              PandingAmount={PandingAmount}
              AddpersonselectedOptions={selectedOptions}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CustomerDetaTable;
