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
  });

  const [showStripeModal, setShowStripeModal] = useState(false);
  const [PersonalUserID, setPersonalUserID] = useState(0);
  const [UploadDocID, setUploadDocID] = useState({});
  const [BookingDetails, setBookingDetails] = useState([]);
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

  const [pendingPaymentValue, setPendingPaymentValue] = useState({
    firstAmount: "",
    firstDate: "",
    secondAmount: "",
    secondDate: "",
    thirdAmount: "",
    thirdDate: "",
  });
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
      width: "100px",
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
    { name: translate("Street"), selector: (row) => row.street },
  ];

  const columnAduInfo_2 = [
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
      name: translate("Additional Services"),
      selector: (row) =>
        row?.extra_data?.title == "undefined" ? 0 : row?.extra_data?.title, // Return null if the length is 0
      width: "150px",
    },
    {
      name: translate("Total"),
      selector: (row) => formatPrice(row.adult_price),
    },
    {
      name: translate("Action"),
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={() => openEditData(row)} // Pass the current row
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
      name: translate("Additional Services"),
      selector: (row) =>
        row?.extra_data?.title == "undefined" ? 0 : row?.extra_data?.title, // Return null if the length is 0
      width: "150px",
    },
    {
      name: translate("Total"),
      selector: (row) => formatPrice(row.child_price),
    },
    {
      name: translate("Action"),
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={() => openEditData(row)} // Pass the current row
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
      selector: (row) => formatPrice(row.baby_price),
    },
    {
      name: translate("Action"),
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-5 mx-1"
            onClick={() => openEditData(row)} // Pass the current row
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
    {
      name: translate("Subtotal"),
      selector: (row) => row.total,
      cell: (row) => formatPrice(row.total),
    },
    // { name: "Tax", selector: (row) => row.Total },
    {
      name: translate("Discount"),
      selector: (row) => row.discount,
      cell: (row) => formatPrice(row.discount),
    },
    {
      name: translate("Total"),
      selector: (row) => row.subtotal,
      cell: (row) => formatPrice(row.subtotal),
    },
    { name: "Amount Paid", selector: (row) => row.amount_paid },
    {
      name: translate("Amount Due"),
      selector: (row) => row.amount_due,
      cell: (row) => formatPrice(row.amount_due),
    },
  ];

  // const AmountPaid = [
  //   {
  //     name: translate("Date"),
  //     selector: (row) => row?.payment_plan_date_1 || "N/A", // Use null check and fallback
  //   },
  //   {
  //     name: translate("Amount"),
  //     selector: (row) => row?.payment_plan_1 || 0, // Use null check and fallback
  //     cell: (row) => formatPrice(row?.payment_plan_1 || 0), // Avoid undefined values in formatPrice
  //   },
  // ];

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
    console.log("row data ", row);
    setEditUserData(row);
    setEditCustomerData({
      name: row.personName,
      surname: row.personSurName,
      gender: row.gender, // Default value
      birthday: row.personBirthDay,
      nationality: row.personNationality, // Default value
    });

    setEditData(true);
  }

  function closeEditData() {
    setEditData(false);
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
  const [AdditionalService, setAdditionalService] = useState([]);
  const [AdultPrice, setAdultPrice] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const searchParams = useSearchParams();
  const Tourid = searchParams.get("id");
  const CustomerID = searchParams.get("customerID");
  const TourID = searchParams.get("TourID");

  function openUploadFileModal(personId, reservationId) {
    setuploadFileisOpen(true);
    setPersonId(personId);

    const newObject = { personId, reservationId };

    setUploadDocID(newObject);

    filterData(personId, reservationId);
  }
  //  Create a new object with name and id

  const filterData = async (personId, reservationId) => {
    const formData = new FormData();
    formData.append("user_id", CustomerID);
    formData.append("id", reservationId);

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
          if (doc.documets && doc.documets.length > 0) {
            const docFiles = doc.documets.map((doc) => ({
              type: doc.document_type,
              Name: doc.file_url_orginal_name,
              fileLink: doc.full_path,
            }));

            setViewDetails(docFiles);
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
        if (response?.Bookings?.paymentData) {
          setPendingPaymentValue({
            firstAmount: response.Bookings.paymentData.payment_plan_1 || "", // Default to empty if null/undefined
            secondAmount: response.Bookings.paymentData.payment_plan_2 || "",
            thirdAmount: response.Bookings.paymentData.payment_plan_3 || "",
            firstDate: response.Bookings.paymentData.payment_plan_date_1 || "",
            secondDate: response.Bookings.paymentData.payment_plan_date_2 || "",
            thirdDate: response.Bookings.paymentData.payment_plan_date_3 || "",
          });
        } else {
          console.warn("paymentData not found in response");
        }

        const FileDeta = [
          { name: translate("Document Type"), selector: (row) => row.type },

          { name: "Document Name", selector: (row) => row.Name },
          {
            name: "Action",
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
          { name: translate("Document Type"), selector: (row) => row.type },

          { name: "Document Name", selector: (row) => row.Name },
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
          },
        ];

        setDownloadData(DownloadData);
      } catch (e) {
        console.error(e);
      }
    };

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
      // if (AdultsPrice && AdultsPrice !== "undefined") {
      //   try {
      //     const addiPrice = JSON.parse(AdultsPrice);
      //     setAdultPrice(addiPrice);
      //   } catch (error) {
      //     console.error("Error parsing userData:", error);
      //   }
      // }
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

  const FetchEditData = async () => {
    setLoading(true);

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
      showSuccessToast(translate, "Updated successfully");
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };

  const HandleEditData = (e) => {
    e.preventDefault();
    FetchEditData();
    setTimeout(() => {
      closeEditData();
      window.location.reload();
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
    gender: "",
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
      console.log("AdultPrice in function", AdultPrice);
      console.log("AddpersonData.roomType", AddpersonData.roomType);

      const total = AdultPrice.reduce((total, e) => {
        // Check if price_type matches the room type
        return e.price_type == AddpersonData.roomType
          ? total + parseFloat(e.price)
          : total;
      }, 0);

      console.log("total", total); // This will log the total price for the matching room type

      // Safely parse RadioValue.price and conditionally add to subtotal
      const radioPrice =
        RadioValue &&
        RadioValue.price &&
        !isNaN(parseFloat(RadioValue.price)) &&
        AddpersonData.roomType !== "3"
          ? parseFloat(RadioValue.price)
          : 0;

      setSubtotal(total + radioPrice);
    } else {
      setSubtotal(0); // Reset subtotal if conditions aren't met
    }
  }, [AdultPrice, AddpersonData, RadioValue]); // Dependency array

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
      console.log("AddpersonData", AddpersonData);

      showErrorToast("All Fields are Require");
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
          const startDate = new Date(startDateString);

          console.log("startDate", startDate);

          const sixDaysBefore = new Date(
            startDate.getTime() - 5 * 24 * 60 * 60 * 1000
          );
          const sixDaysBeforeString = sixDaysBefore.toISOString().split("T")[0];

          console.log("sixDaysBeforeString", sixDaysBeforeString);

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

  const handleCheckboxChange = (index) => {
    // setPaymentCheckbox(index);

    if (index === 3) {
      setInstallmentChecked(true);
    } else {
      setInstallmentChecked(false);
    }
  };

  const handleFirstAmountChange = (e) => {
    setFirstAmount(e.target.value);
  };

  const handleSecondAmountChange = (e) => {
    const totalAmount = subtotal;
    const total = totalAmount - firstAmount;
    const secondAmount = e.target.value;
    if (secondAmount < total) {
      setSecondAmount(secondAmount);
    } else {
      setSecondAmount(0);
      setThirdAmount(0);
    }
  };

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
    formData.append("title", RadioValue.title);
    formData.append("price", RadioValue.price);
    formData.append("additional_order", RadioValue.order);
    formData.append("total", subtotal);

    try {
      const response = await POST.request({
        form: formData,
        url: "addperson",
      });
      if (response) {
        setIsLoading(false);
        showSuccessToast("Person was added successfully !!");
        closeModal();
        handleClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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

    if (PaymentCheckbox == 2) {
      console.log("payment checkbox ", PaymentCheckbox);
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

  console.log("rows", rows);

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
    setIsLoading(true);
    const response = await POST.request({
      form: formData,
      url: "upload_bookingdocuments",
    });

    if (response.Status == 1) {
      setIsLoading(false);
      showSuccessToast("Document Uploaded Successfully");
      setTimeout(() => {
        setuploadFileisOpen(false);
      }, 3000);
      setRows([{ document: "", type: null }]);
    } else {
      setIsLoading(false);
      showErrorToast("Document Upload Failed");
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

    try {
      const response = await POST.request({
        form: formData,
        url: "cancelBooking",
      });
      if (response) {
        showSuccessToast(response.Message);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // to pay instalment payment

  const HandleInstallmentPay = (e) => {
    setShowStripeModal(true);
  };

  // for cancel booking

  const [RefundData, setRefundData] = useState({});

  const today = new Date();

  // Format the date in German format (dd.mm.yyyy)
  const formattedDate = today.toLocaleDateString('de-DE'); 

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

  console.log(RefundData, "RefundData");

  return (
    <div>
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
            {BookingDetails?.reservation?.capacity_empty} {translate("seats")}
          </p>
        </div>
        {BookingDetails?.reservation?.reservation_status != "Cancelled" && (
          <div className="col-lg-6 flex small-flex-center">
            <div className="">
              {/* <button
     className="button -sm -info-2 bg-accent-1 text-white "
   
   > */}
              {PdfData !== "undefined" && (
                <a
                  href={PdfData}
                  target="_blank"
                  className="button -sm -info-2 bg-accent-1 text-white"
                >
                  {translate("Show Invoice")}
                </a>
              )}

              {/* </button> */}
            </div>

            <div
              className={`${
                BookingDetails?.reservation?.paymentType == "3"
                  ? "d-block"
                  : "d-none"
              }`}
            >
              <button
                className="button -sm -accent-1 bg-info-2 text-white "
                onClick={openPaymentModal}
              >
                {translate("Pay")}
              </button>
              <span>{`(${formatPrice(
                BookingDetails?.reservation?.amount_due
              )})`}</span>
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
        data={BookingDetails?.adultData?.length ? BookingDetails.adultData : []} // Change data dynamically
        highlightOnHover
      />

      <br />

      {/* Child Data Table */}
      <DataTable
        title={translate("Child Information")}
        columns={Child}
        data={BookingDetails?.childData?.length ? BookingDetails.childData : []} // Change data dynamically
        highlightOnHover
      />

      <br />

      {/* Baby Data Table */}
      <DataTable
        title={translate("Baby Information")}
        columns={baby}
        data={BookingDetails?.babyData?.length ? BookingDetails.babyData : []} // Change data dynamically
        highlightOnHover
      />

      <br />

      {/* <DataTable
          title={translate("AmountPaid")}
          columns={AmountPaid}
          data={[BookingDetails.paymentData]}
          highlightOnHover
        /> */}

      {BookingDetails.reservation?.paymentType !== "1" && BookingDetails.reservation?.paymentType !== "2"  && (
        <div className="row bg-white mx-0">
          <div className="col-12 row">
            <p className="pt-10 pb-0 table-font-20 ">Payment Information</p>
            <table class="table bg-light col-12">
              <thead>
                <tr className="row">
                  <th className="col-4 pb-1">Date</th>
                  <th className="col-4 pb-1">Amount</th>
                  <th className="col-4 pb-1">Paid Date</th>
                </tr>
              </thead>
              <tbody>
                <tr className="row">
                  <td className="col-4">
                    {BookingDetails.paymentData?.payment_plan_date_1}
                  </td>
                  <td className="col-4">
                    {BookingDetails.paymentData?.payment_plan_1}
                  </td>
                  <td className="col-4">
                    {BookingDetails.paymentData?.paid_date_1}
                  </td>
                </tr>
                <tr className="row">
                  <td className="col-4">
                    {BookingDetails.paymentData?.payment_plan_date_2}
                  </td>
                  <td className="col-4">
                    {BookingDetails.paymentData?.payment_plan_2}
                  </td>
                  <td className="col-4">
                    {BookingDetails.paymentData?.paid_date_2}
                  </td>
                </tr>
                <tr className="row">
                  <td className="col-4">
                    {BookingDetails.paymentData?.payment_plan_date_3}
                  </td>
                  <td className="col-4">
                    {BookingDetails.paymentData?.payment_plan_3}
                  </td>
                  <td className="col-4">
                    {BookingDetails.paymentData?.paid_date_3}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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

                    <label className="lh-1 text-16 text-light-1 dd_l_top10">
                      {translate("Nationality ")}
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
              {AddpersonData.length !== 0 && AddpersonData.roomType !== "3" && (
                <div className="my-3 border_b px-md-40">
                  <h5 className="text-18 fw-500 my-2">
                    {translate("Possible additional services per person")} :
                  </h5>

                  <div>
                    {AddpersonDetails?.addtional_price?.map((option, idx) => (
                      <div
                        key={option.id}
                        className="d-flex items-center justify-between radio_hight"
                      >
                        <div className="d-flex items-center">
                          <div className="form-radio d-flex items-center">
                            <label className="radio d-flex items-center">
                              <input
                                type="radio"
                                name={`radioGroup-${idx}`} // Group radio by idx for unique selection within the same service
                                value={`${idx}-ad-${option.id}-${option.title}`} // Unique value for the radio
                                // Check if the current option matches the stored value in RadioValue
                                checked={
                                  RadioValue.selectedValue ===
                                  `${idx}-ad-${option.id}-${option.title}`
                                }
                                onChange={(e) =>
                                  handleRadioChange(
                                    e,
                                    idx,
                                    option.price,
                                    option.additinoal_order,
                                    option.title,
                                    option.id
                                  )
                                }
                              />
                              <span className="radio__mark">
                                <span className="radio__icon"></span>
                              </span>
                              <span className="text-14 lh-1 ml-10">
                                {option.title}
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className="text-14">+ {option.price}</div>
                      </div>
                    ))}
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
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          id="1"
                          name="1"
                          checked={
                            BookingDetails?.reservation?.paymentType === "1"
                          }
                          onChange={() => handleCheckboxChange(1)}
                        />
                        <label htmlFor="1" className="form-checkbox__mark">
                          <div className="form-checkbox__icon">
                            {/* SVG Icon */}
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
                      <label htmlFor="1" className="lh-16 ml-15">
                        {translate(
                          "Payment in advance. Payment installment is possible."
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
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          id="2"
                          name="2"
                          checked={
                            BookingDetails?.reservation?.paymentType === "2"
                          }
                          onChange={() => handleCheckboxChange(2)}
                        />
                        <label htmlFor="2" className="form-checkbox__mark">
                          <div className="form-checkbox__icon">
                            {/* SVG Icon */}
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
                      <label htmlFor="2" className="lh-16 ml-15">
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
                      <div className="form-checkbox">
                        <input
                          type="checkbox"
                          id="3"
                          name="3"
                          checked={
                            BookingDetails?.reservation?.paymentType === "3"
                          }
                          onChange={() => handleCheckboxChange(3)}
                        />
                        <label htmlFor="3" className="form-checkbox__mark">
                          <div className="form-checkbox__icon">
                            {/* SVG Icon */}
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
                      <label htmlFor="3" className="lh-16 ml-15">
                        {translate("Click for Installment Payment")}
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

              <h6 className="booking-form-price col-4">
                {translate("Subtotal")}:<span>{subtotal}€</span>
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
          <div className="d-flex justify-content-between p-2" id="modelopen">
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
                    value={formatPrice(pendingPaymentValue.firstAmount)}
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
                    value={new Date(
                      pendingPaymentValue.firstDate
                    ).toLocaleDateString("de-DE")}
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
                    value={formatPrice(pendingPaymentValue.secondAmount)}
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
                    value={new Date(
                      pendingPaymentValue.secondDate
                    ).toLocaleDateString("de-DE")}
                    disabled
                  />
                  <label className="lh-1 text-16 text-light-1">Date</label>
                </div>
              </div>
              <div
                className="col-md-2"
                onClick={() => {
                  HandleInstallmentPay(pendingPaymentValue.secondAmount);
                }}
              >
                <button className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-0 full_width text-white ">
                  {translate("PAY")}
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-md-5 col-12">
                <div className="form-input spacing">
                  <input
                    type="text"
                    name="firstAmount"
                    value={formatPrice(pendingPaymentValue.thirdAmount)}
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
                    value={new Date(
                      pendingPaymentValue.thirdDate
                    ).toLocaleDateString("de-DE")}
                    disabled
                  />
                  <label className="lh-1 text-16 text-light-1">Date</label>
                </div>
              </div>
              <div
                className="col-md-2"
                onClick={() => {
                  HandleInstallmentPay(pendingPaymentValue.thirdAmount);
                }}
              >
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
                      <b>Type of fee</b>
                    </th>
                    <th
                      scope="col"
                      className="px-1 py-2"
                      style={{ width: "40%" }}
                    >
                      <b>Fee </b>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-1 py-2">{translate("Booking Date")}</td>
                    <td className="px-1 py-2">
                      {BookingDetails?.reservation?.booking_date}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-1 py-2">{translate("Cancle Date")}</td>
                    <td className="px-1 py-2">
                      {formattedDate}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-1 py-2">{translate("Tour Date")}</td>
                    <td className="px-1 py-2">
                      {RefundData?.tour_date}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-1 py-2">{translate("Amount Refund")} ({RefundData?.percentage}%)</td>
                    <td className="px-1 py-2">
                      {RefundData?.Refund_Amount} €
                    </td>
                  </tr>
                </tbody>
              </table>
            )}

            <hr />

            <p>
              <span className="text-red">*</span>
              {translate(
                "Amount will be credited within 7 days in your bank account"
              )}
            </p>

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
                    {translate("15% if canceled before 90 days of the trip")}
                  </li>
                  <li className="text-center py-1">
                    {translate("60% if canceled before 30 days of the trip")}
                  </li>
                  <li className="text-center py-1">
                    {translate("100% if canceled before 7 days of the trip")}
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
                    console.log("Item deleted");
                    fatchCancelBooking();
                    setTimeout(() => {
                      CloseCancelPopUp();
                    }, 2000);
                  } else {
                    console.log("Delete operation canceled");
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
                      <label className="lh-1 text-16 text-light-1 dd_l_top10">
                        {translate("Gender")}
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
                  {/* <div className="col-md-6">
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
                      <label className="lh-1 text-16 text-light-1 dd_l_top10">
                        {translate("Nationality")}
                      </label>
                    </div>
                  </div> */}
                  <div className="col-md-6">
                    <div className="form-input spacing">
                      {/* <select
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
                      </select> */}
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
                      {loading ? (
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
                      <option value="canadian"> {translate("Canadian")}</option>
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

      {showStripeModal && (
        <Stripeform
          amount={amount ? amount : subtotal}
          subtotal={subtotal}
          showStripeModal={showStripeModal}
          handleClose={handleClose}
          AddpersonData={AddpersonData}
          reservation_id={BookingDetails.reservation?.id}
          RadioValue={RadioValue}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default CustomerDetaTable;
