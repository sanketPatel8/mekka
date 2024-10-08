import React, { useEffect, useState } from "react";
import { PiBuildingApartmentFill } from "react-icons/pi";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
} from "react-share";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "@/app/context/TranslationContext";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";

export default function MainInformation({ PAckageData }) {
  const { translate } = useTranslation();

  const [InformationData, setInformationData] = useState({});
  const [copySuccess, setCopySuccess] = useState("");
  const [invoice, setinvoice] = useState(false);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

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
      maxWidth: "500px",
      height: "40vh",
      overflowY: "auto",
      backgroundColor: "#fff",
      overflowX: "hidden",
    },
  };

  // Define the URL you want to share
  const shareUrl = `https://mekkabooking.vercel.app/package/${name}?id=${id}&name=${name}`; // Change this to your actual URL

  useEffect(() => {
    setInformationData(PAckageData);
  }, [PAckageData]);

  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => setCopySuccess("URL copied to clipboard!"))
      .catch(() => setCopySuccess("Failed to copy URL."));
  };

  const ratingCountStr =
    InformationData?.Tour_Details?.tour_details?.rating_count?.toString();

  function openInvoice() {
    setinvoice(true);
  }

  function closeInvoice() {
    setinvoice(false);
  }

  useEffect(() => {
    Modal.setAppElement("#invoice");
  }, []);

  return (
    <>
      <div className="row y-gap-20 justify-between items-end">
        <div className="col-auto">
          <h2 className="text-40 sm:text-30 lh-14 mt-20">
            {InformationData?.Tour_Details?.tour_details?.type} -{" "}
            {InformationData?.Tour_Details?.tour_details?.name}
          </h2>

          <div className="row x-gap-20 y-gap-20 items-center pt-20">
            <div className="col-auto mr-10 px-0">
              <div className="d-flex items-center">
                <div className="d-flex items-center x-gap-5 mx-2">
                <PiBuildingApartmentFill   color="#dabf4f" className="" size={25} />
                </div>
                {/* {InformationData?.Tour_Details?.tour_details?.rating} (
                {InformationData?.Tour_Details?.tour_details?.rating_count}) -{" "} */}
                {InformationData?.Tour_Details?.tour_details?.company_code}
              </div>
            </div>

            <div
              className={`col-auto ${
                !InformationData?.Tour_Details?.tour_details?.distance_to_hotel
                  ? "d-none"
                  : "d-block"
              }`}
            >
              <div className="d-flex items-center">
                <i className="icon-pin text-16 mr-5"></i>
                zu Kaaba{" "}
                {
                  InformationData?.Tour_Details?.tour_details?.distance_to_hotel
                }{" "}
                km
              </div>
            </div>

            <div className="col-auto">
              <div className="d-flex items-center" style={{ color: "red" }}>
                <i className="icon-reservation text-16 mr-5"></i>
                {
                  InformationData?.Tour_Details?.tour_details?.capacity_empty
                }{" "}
                {InformationData?.Tour_Details?.tour_details?.capacity_empty ==
                0
                  ? "No seat available"
                  : InformationData?.Tour_Details?.tour_details
                      ?.capacity_empty == 1
                  ? "Seat available"
                  : InformationData?.Tour_Details?.tour_details
                      ?.capacity_empty > 1
                  ? "Seats available"
                  : null}
              </div>
            </div>
          </div>
        </div>

        <div className="col-auto">
          <div className="d-flex x-gap-30 y-gap-10">
            <div className="">
              <button className=" d-flex items-center " onClick={openInvoice}>
                <i className="icon-share flex-center text-16 mr-10"></i>
                Share
              </button>
            </div>
          </div>
        </div>

        <div id="invoice">
          <Modal
            isOpen={invoice}
            onRequestClose={closeInvoice}
            style={customStyles}
            contentLabel="Pending Payment Modal"
          >
            <div className="d-flex justify-content-between" id="modelopen">
              <h2 className="px-20"> Share This Package</h2>
              <button onClick={closeInvoice}>
                <IoClose size={25} />
              </button>
            </div>

            <div className="share-buttons  gap-4 mt-4 row">
              <div className="row col-8" style={{ justifyContent: "center" }}>
                <FacebookShareButton
                  url={shareUrl}
                  className="flex items-center justify-center rounded-full bg-blue-600 p-2 col-2"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <TwitterShareButton
                  url={shareUrl}
                  className="flex items-center justify-center rounded-full bg-blue-400 p-2 col-2"
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>
                <LinkedinShareButton
                  url={shareUrl}
                  className="flex items-center justify-center rounded-full bg-blue-700 p-2 col-2"
                >
                  <LinkedinIcon size={32} round />
                </LinkedinShareButton>
                <WhatsappShareButton
                  url={shareUrl}
                  className="flex items-center justify-center rounded-full bg-green-500 p-2 col-2"
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>
                <TelegramShareButton
                  url={shareUrl}
                  className="flex items-center justify-center rounded-full bg-blue-500 p-2 col-2"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
              <div className="mt-4 col-12">
                <div className="contactForm row items-center">
                  <div className="col-8">
                    <input type="text" readOnly value={shareUrl} />
                  </div>

                  <div className="col-3">
                    <button
                      type="submit"
                      className="button -sm -info-2 bg-accent-1 text-white "
                      onClick={handleCopyClick}
                    >
                      Copy
                    </button>
                  </div>
                  <p>
                    {copySuccess && (
                      <p className="mt-2 text-green-600">{copySuccess}</p>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
