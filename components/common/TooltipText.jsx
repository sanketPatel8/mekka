"use client";

import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import Modal from "react-modal";
import ReactTooltip from "react-tooltip";

import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const TooltipText = ({ elm, page }) => {
  const [invoice, setInvoice] = useState(false);

  if (!elm || !elm.highlight) return null;

  const color = elm.color;

  const text = elm.highlight;
  const wordCount = text.trim().split(/\s+/).length;
  const shouldShowPopup = wordCount > 2;

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
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

  function openInvoice() {
    setInvoice(true);
  }

  function closeInvoice() {
    setInvoice(false);
  }

  // Set app element to 'body' to prevent the error
  useEffect(() => {
    Modal.setAppElement("body");
  }, []);

  return (
    <>
      {page == "Package" ? (
        <p style={{ color }}>{text}</p>
      ) : (
        <div className="relative">
          {!shouldShowPopup ? (
            <p style={{ color }}>{text}</p>
          ) : (
            <>
              {/* <p style={{ color, cursor: "pointer" }} onClick={openInvoice}>
                {text.split(" ").slice(0, 6).join(" ")}...
              </p>
              
              <Modal
                isOpen={invoice}
                onRequestClose={closeInvoice}
                style={customStyles}
                contentLabel="Full Text Modal"
              >
                <div className="d-flex justify-content-between">
                  <button onClick={closeInvoice}>
                    <IoClose size={25} />
                  </button>
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2 text-center">
                    Full Text
                  </h2>
                  <p className="text-gray-700">{text}</p>
                </div>
              </Modal> */}
              {/* <button
                id="my-button"
                style={{
                  color,
                }}
              >
                {" "}
                {text.split(" ").slice(0, 6).join(" ")}...
              </button> */}

              {/* Tooltip binds to the element with matching id */}
              {/* <Tooltip
                anchorSelect="#my-button"
                place="top"
                style={{
                  color,
                }}
              >
                {text}
              </Tooltip> */}
              <button id={`tooltip-${elm.id}`} style={{ color }}>
                {text.split(" ").slice(0, 6).join(" ")}...
              </button>

              <Tooltip
                anchorSelect={`#tooltip-${elm.id}`}
                place="top"
                style={{
                  color,
                  backgroundColor: "#E7E6E6",
                  width: "100%",
                }}
              >
                {text}
              </Tooltip>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default TooltipText;
