"use client";

import Pagination from "@/components/common/Pagination";
import Header from "@/components/dasboard/Header";
import { tourDataTwoOne } from "@/data/tours";
import Stars from "@/components/common/Stars";
import { useEffect, useState } from "react";
import { FaPersonWalking } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaStar } from "react-icons/fa";
import { faHotel, faQuoteRight } from "@fortawesome/free-solid-svg-icons";
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

  const [sideBarOpen, setSideBarOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const startParam = "start";
  const [range, setRange] = useState(1);
  const [pageStart, setPageStart] = useState(1);
  const [tourList, setTourList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [invoice, setinvoice] = useState(false);
  const [note, setNote] = useState("");
  useEffect(() => {
    Modal.setAppElement("#invoice");
  }, []);

  const handleClick = (id) => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("vendor_id", user?.user.id);
    setLoading(true);
    const response = POST.request({ form: formData, url: "duplicatetour" });
    if (response) {
      fetchListing();
      setLoading(false);
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
    } catch (e) {
    }
  };

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

  const { translate } = useTranslation();

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
                  {tourList.length === 0 && (
                    <div className="text-center">
                      <h3>{translate("No Tours Found")}</h3>
                    </div>
                  )}
                  {tourList.map((elm, i) => (
                    <div className="col-lg-12 mb-15" key={i}>
                      <div className="tourCard -type-2 bg-white">
                        <div className="tourCard__image">
                          <Image
                            width={420}
                            height={390}
                            src={elm.tour_image}
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
                            {translate("Tour Name:")} {elm.name}
                          </div>

                        
                          {elm.departures && (
                            <div className="Location">
                              <span>
                                {translate("Departure")} : {elm.departures}
                              </span>
                            </div>
                          )}

                          <div className="row x-gap-20 y-gap-5 pt-30">
                            {elm.features?.map((elm2, i2) => (
                              <div key={i2} className="col-auto">
                                <div className="text-14 ">{elm2.name}</div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="tourCard__info tourCard__info_Dash ">
                          <div className="">
                            <button
                              className={
                                elm.tour_status === "Pending"
                                  ? "badge-orange"
                                  : elm.tour_status === "Approved"
                                  ? "badge-green"
                                  : elm.tour_status === "Rejected"
                                  ? "badge-red"
                                  : ""
                              }
                              disabled={
                                elm.tour_status === "Rejected" ? false : true
                              }
                              onClick={(note) =>
                                openInvoice(`${elm?.reject_note}`)
                              }
                            >
                              <b>{elm.tour_status}</b>
                            </button>

                            <div className="d-flex items-center text-14 ">
                              <i className="icon-clock mr-10"></i>
                              {elm.days_of_stay}
                            </div>

                            <p className="text-cente text-Danger">
                              {translate("Available Seats :")}{" "}
                              {elm.capacity_empty === null
                                ? 0
                                : elm.capacity_empty}{" "}
                              / {elm.capacity}
                            </p>
                            <p className="text-center">
                              {translate("Total")} : €{elm.tour_price}{" "}
                            </p>
                          </div>

                          <label className="badge bg-secondary"></label>
                          <button className="button -sm -outline-accent-1 text-accent-1">
                            <Link href={`/vendor/edit-tour/${elm.id}`}>
                              <div>{translate("EDIT TOUR")}</div>
                            </Link>
                          </button>

                          <button
                            onClick={(id) => handleClick(`${elm?.id}`)}
                            className="mt-5 text-center"
                          >
                            <span>{translate("Duplicate Tour")}</span>
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
