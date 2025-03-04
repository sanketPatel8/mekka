"use client";

import Pagination from "@/components/common/Pagination";
import Header from "@/components/dasboard/Header";
import { tourDataTwoOne } from "@/data/tours";
import Stars from "@/components/common/Stars";
import { useEffect, useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import {
  faCalendar,
  faHotel,
  faPlaneArrival,
  faPlaneDeparture,
  faQuoteRight,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import AgentDBsideBar from "@/components/dasboard/AgentDBsideBar";
import Link from "next/link";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import { useTranslation } from "@/app/context/TranslationContext";
import { useAuthContext } from "@/app/hooks/useAuthContext";
import { POST } from "@/app/utils/api/post";
import { useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import VendorFooter from "@/components/dasboard/VendorFooter";
import { showSuccessToast } from "@/app/utils/tost";
import { ToastContainer } from "react-toastify";
import Useauthredirect from "@/app/hooks/useAuthRedirect";
import { FaCalendar } from "react-icons/fa";

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
    height: "30vh",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
};

export default function DBListing() {
  const router = useRouter();
  const { user } = useAuthContext();
  const { translate } = useTranslation();

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const startParam = "start";
  const [range, setRange] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [tourList, setTourList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [invoice, setinvoice] = useState(false);

  const [note, setNote] = useState("");
  useEffect(() => {
    Modal.setAppElement("#invoice");
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.title = "My Listings - MekkaBooking";
    }
  }, []);

  const handleClick = (id) => {
    if (id) {
      const confirmResult = window.confirm(
        "Are you sure you want to duplicate this tour?"
      );
      if (confirmResult) {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("vendor_id", user?.user.id);
        setLoading(true);
        POST.request({ form: formData, url: "duplicatetour" })
          .then((response) => {
            if (response) {
              showSuccessToast(translate, "Tour Duplicated Successfully");
              setTimeout(() => {
                router.push(`/vendor/edit-tour/${response.tour_id}`);
                setLoading(true);
              }, 1000);
            } else {
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      } else {
        return;
      }
    }
  };
  const openInvoice = (note) => {
    setinvoice(true);
    setNote(note);
  };

  function closeInvoice() {
    setinvoice(false);
  }

  const fetchListing = async (pageIndex) => {
    const formData = new FormData();
    formData.append("company_id", user?.user.company_id);
    formData.append("start", pageIndex || 0);

    try {
      setLoading(true);
      const response = await POST.request({
        form: formData,
        url: "my_tourlist",
      });
      setLoading(false);
      setTourList(response.Tours);
      setRange(response.Total_Page);
    } catch (e) {}
  };

  const { handleRedirect } = Useauthredirect();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        if (window.innerWidth >= 1000) {
          setSideBarOpen(true);
        } else {
          setSideBarOpen(false);
        }
      };

      handleResize();
      handleRedirect();
      setLoading(false);
      fetchListing();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const onPageChange = (pageIndex) => {
    fetchListing(pageIndex);
  };

  const FetchDeleteTour = async (id) => {
    if (id) {
      const confirmResult = window.confirm(
        "Are you sure you want to delete this tour?"
      );
      if (confirmResult) {
        const formData = new FormData();

        formData.append("id", id);
        formData.append("vendor_id", user?.user.id);
        setLoading(true);
        POST.request({ form: formData, url: "delete_tour" })
          .then((response) => {
            if (response) {
              showSuccessToast(translate, "Tour Deleted Successfully");
              fetchListing();
            } else {
              setLoading(false);
            }
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
      } else {
        return;
      }
    }
  };

  const HandleDelete = (id) => {
    FetchDeleteTour(id);
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`dashboard ${
          sideBarOpen ? "-is-sidebar-visible" : ""
        } js-dashboard`}
      >
        <AgentDBsideBar setSideBarOpen={setSideBarOpen} />

        <div className="dashboard__content">
          <Header setSideBarOpen={setSideBarOpen} />

          <div className="dashboard__content_content">
            <h1 className="text-30"> {translate("My Listings")}</h1>

            <div className="row y-gap-30 mt-20">
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "200px" }}
                >
                  <ClipLoader color="#DAC04F" size={50} />
                </div>
              ) : (
                <>
                  {tourList?.length === 0 && (
                    <div className="text-center">
                      <h3>{translate("No Tours Found")}</h3>
                    </div>
                  )}
                  {tourList?.map((elm, i) => (
                    <div className="col-lg-12 mb-15" key={i}>
                      <div
                        className={`tourCard -type-2 bg-white ${
                          elm.company_id === "0" ? "pointer-none" : ""
                        }`}
                      >
                        <div className="tourCard__image">
                          <Image
                            width={420}
                            height={390}
                            src={
                              elm.tour_image
                                ? elm.tour_image
                                : "/img/404/imgnotFound.png"
                            }
                            alt="image"
                            style={{ aspectRatio: "1" }}
                          />
                          {elm.direct_flight && (
                            <button className="tourCard__favorite">
                              {elm.direct_flight}
                            </button>
                          )}
                        </div>

                        <div className="tourCard__content">
                          <h3 className="tourCard__title mt-5">
                            <span>{elm.type}</span>
                          </h3>

                          <div className="tourCard__title">
                            {translate("Tour Name")}: {elm.name}
                          </div>

                          {elm.departures && (
                            <div className="Location">
                              <span>
                                <FontAwesomeIcon
                                  icon={faPlaneDeparture}
                                  className=" text-accent-1"
                                  style={{ fontSize: "14px" }}
                                />
                                <span style={{ marginLeft: "5px" }}>
                                  {translate("Departure")} :{" "}
                                  {elm.departures.join("   ,  ")}
                                </span>
                              </span>
                            </div>
                          )}

                          <div className="Location">
                            <FontAwesomeIcon
                              icon={faPlaneArrival}
                              className=" text-accent-1"
                              style={{ fontSize: "14px" }}
                            />
                            <span>
                              {" "}
                              {translate("Arrival")} :{" "}
                              {elm?.arrival.join(" , ")}
                            </span>
                          </div>

                          {elm.tour_commission !== null && (
                            <div className="row x-gap-20 y-gap-5 ">
                              <div className="col-auto">
                                <div className="text-14 ">
                                  {translate("Commision")} :{" "}
                                  {elm.tour_commission}
                                  {elm.commission_type == "1" ? " €" : "%"}
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="row x-gap-20 y-gap-5 ">
                            {elm.features?.map((elm2, i2) => (
                              <div key={i2} className="col-auto">
                                <div className="text-14 ">{elm2.name}</div>
                              </div>
                            ))}
                          </div>

                          <div className="row x-gap-20 y-gap-5 ">
                            <div className="col-auto">
                              <div className="d-flex text-14 items-center">
                                <FontAwesomeIcon
                                  icon={faCalendar}
                                  className="me-1  text-accent-1"
                                  style={{ fontSize: "18px" }}
                                />
                                <p className="mx-1">
                                  {elm?.date_begin} to {elm?.date_end}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="tourCard__info tourCard__info_Dash ">
                          <div className="">
                            <button
                              className={
                                elm.tour_status === "Pending"
                                  ? "badge-orange"
                                  : elm.tour_status === "Active"
                                  ? "badge-green"
                                  : elm.tour_status === "Rejected" ||
                                    elm.tour_status === "Cancelled"
                                  ? "badge-red"
                                  : ""
                              }
                              disabled={
                                elm.tour_status === "Rejected" ||
                                elm.tour_status === "Cancelled"
                                  ? false
                                  : true
                              }
                              onClick={(note) =>
                                openInvoice(`${elm?.reject_note}`)
                              }
                            >
                              <b>{translate(elm.tour_status)}</b>
                            </button>

                            <div className="d-flex items-center text-14 ">
                              <i className="icon-clock mr-10"></i>
                              {elm.days_of_stay}
                            </div>

                            <p className="text-cente text-Danger">
                              {translate("Available Seats")} :{" "}
                              {elm.capacity_empty === null
                                ? 0
                                : elm.capacity_empty}{" "}
                              / {elm.capacity}
                            </p>
                            <p className="text-center">
                              {translate("Total")} : {elm.tour_price} €
                            </p>
                          </div>

                          <label className="badge bg-secondary"></label>
                          {elm?.Bookings == 0 ? (
                            <button
                              className={`button -sm -outline-red-3 w-100 -red-3 mb-10 ${
                                elm.company_id === "0" ? "d-none" : "d-block"
                              }`}
                              onClick={(id) => HandleDelete(`${elm?.id}`)}
                            >
                              <div>{translate("DELETE TOUR")}</div>
                            </button>
                          ) : null}

                          <Link
                            href={`/vendor/edit-tour/${elm.id}`}
                            className={`${
                              elm.company_id === "0" ? "d-none" : "d-block"
                            }`}
                          >
                            <button className="button -sm -outline-accent-1 w-100 text-accent-1">
                              <div>{translate("EDIT TOUR")}</div>
                            </button>
                          </Link>

                          <button
                            onClick={(id) => handleClick(`${elm?.id}`)}
                            className="mt-5 text-center"
                          >
                            {/* <span>{translate("Duplicate Tour")}</span> */}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>

            <div id="invoice">
              <Modal
                isOpen={invoice}
                onRequestClose={closeInvoice}
                style={customStyles}
                contentLabel="Pending Payment Modal"
              >
                <div className="d-flex justify-content-between" id="modelopen">
                  <h2 className="px-20">Reason for Rejected</h2>
                  <button onClick={closeInvoice}>
                    <IoClose size={25} />
                  </button>
                </div>

                <p className="mx-3">{note}</p>
              </Modal>
            </div>
          </div>
          <VendorFooter />
        </div>
      </div>
    </>
  );
}
