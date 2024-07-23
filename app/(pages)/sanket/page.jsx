"use client";

import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Modal from "react-modal";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import {
  Adult2InfoData,
  ViewTicketsForVandor,
  ViewCustomerDocument,
} from "@/data/CustomerBookingData";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Select from "react-select";

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

const DocumentStatusManager = () => {
  const [uploadFileisOpen, setuploadFileisOpen] = useState(false);
  const [rows, setRows] = useState([{ id: 1, image: "", document: null }]); // State to manage rows

  useEffect(() => {
    Modal.setAppElement("#upload_file");
  }, []);

  const columnAduInfo_2 = [
    { name: "DOB", selector: (row) => row.DOB },
    { name: "Nationality", selector: (row) => row.Nationality },
    {
      name: "Additional Services",
      selector: (row) => row.additional_services,
      width: "150px",
    },
    { name: "Total", selector: (row) => row.Amount },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex_center">
          <button
            className="button -sm -accent-1 bg-info-2 text-white my-2 col-12 mx-1 text-13 doc-px-5"
            onClick={openUploadFileModal}
          >
            Document
          </button>
        </div>
      ),
      width: "200px",
    },
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

  function openUploadFileModal() {
    setuploadFileisOpen(true);
  }

  function closeUploadFileModal() {
    setuploadFileisOpen(false);
  }

  const VandorDoc = [
    { value: "Visa", label: "Visa" },
    { value: "Hotel Booking Voucher", label: "Hotel Booking Voucher" },
    { value: "Flight Ticket", label: "Flight Ticket" },
  ];

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

  const addRow = () => {
    setRows([...rows, { id: rows.length + 1, image: "", document: null }]);
  };

  const removeRow = (index) => {
    if (rows.length > 1) {
      const newRows = rows.filter((_, i) => i !== index);
      setRows(newRows);
    }
  };

  return (
    <div>
      <DataTable
        title="Children : Children Name (Gender)"
        columns={columnAduInfo_2}
        data={Adult2InfoData}
        highlightOnHover
      />

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

          <div className="ml-lg-20 ml-0 ">
            <Tabs>
              <TabList>
                <Tab>Upload</Tab>
                <Tab>View</Tab>
                <Tab>Download</Tab>
              </TabList>

              <TabPanel>
                <div className="overflow-hidden overflow-lg-auto">
                  {rows.map((row, index) => (
                    <div className="row item-center my-3" key={row.id}>
                      <div className="col-md-4 px-0 mx-0 pl-lg-50">
                        <Select
                          options={VandorDoc}
                          value={row.document}
                          onChange={(selectedOption) =>
                            handleDocumentChange(selectedOption, index)
                          }
                          className="dd-vendor"
                          isClearable
                        />
                      </div>
                      <div className="col-md-4 px-0 mx-2">
                        <div className="row my-2 ">
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
                                  Upload Document
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
                      SUBMIT
                    </button>
                    <button
                      className="button -sm -info-2 bg-accent-1 text-dark my-4 mx-md-3 mx-2"
                      onClick={closeUploadFileModal}
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="Your Documents"
                  columns={FileDeta}
                  data={ViewTicketsForVandor}
                  highlightOnHover
                />
              </TabPanel>
              <TabPanel>
                <DataTable
                  title="Customer Documents"
                  columns={DownloadData}
                  data={ViewCustomerDocument}
                  highlightOnHover
                />
              </TabPanel>
            </Tabs>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default DocumentStatusManager;
