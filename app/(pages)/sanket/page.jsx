"use client";

import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const MyComponent = () => {
  const options2 = [
    {
      value: "voco Makkah an IHG HotelOpens",
      label: "voco Makkah an IHG HotelOpens (4 Star)",
    },
    { value: "Arayik ResortOpens", label: "Arayik ResortOpens (3 Star)" },
    { value: "WA HotelOpen", label: "WA HotelOpen (5 Star)" },
    {
      value: "JOUDYAN Red Sea Mall Jeddah By ELAF",
      label: "JOUDYAN Red Sea Mall Jeddah By ELAF (5 Star)",
    },
    {
      value: "Park Inn by Radisson Makkah Aziziyah",
      label: "Park Inn by Radisson Makkah Aziziyah (3 Star)",
    },
  ];

  const Madina = [
    { value: "Madinah Hilton", label: "Madinah Hilton (4 Star)" },
    {
      value: "Dar Al-Taqwa Hotel Madinah",
      label: "Dar Al-Taqwa Hotel Madinah (5 Star)",
    },
    {
      value: "Leader Al-Muna Kareem Hotel",
      label: "Leader Al-Muna Kareem Hotel (4 Star)",
    },
    {
      value: "Meshal Hotel Al Madina",
      label: "Meshal Hotel Al Madina (3 Star)",
    },
  ];

  const [mekkaRows, setMekkaRows] = useState([
    { hotel: null, price: "", customGender: "", gender: null },
  ]);

  const [madinaRows, setMadinaRows] = useState([
    { hotel: null, price: "", customGender: "", gender: null },
  ]);

  const handleAddMekkaRow = () => {
    setMekkaRows([
      ...mekkaRows,
      { hotel: null, price: "", customGender: "", gender: null },
    ]);
  };

  const handleRemoveMekkaRow = (index) => {
    const newRows = mekkaRows.filter((_, rowIndex) => rowIndex !== index);
    setMekkaRows(newRows);
  };

  const handleAddMadinaRow = () => {
    setMadinaRows([
      ...madinaRows,
      { hotel: null, price: "", customGender: "", gender: null },
    ]);
  };

  const handleRemoveMadinaRow = (index) => {
    const newRows = madinaRows.filter((_, rowIndex) => rowIndex !== index);
    setMadinaRows(newRows);
  };

  const handleMekkaChange = (value, index) => {
    const newRows = [...mekkaRows];
    newRows[index].hotel = value;
    setMekkaRows(newRows);
  };

  const handleMadinaChange = (value, index) => {
    const newRows = [...madinaRows];
    newRows[index].hotel = value;
    setMadinaRows(newRows);
  };

  const handleMekkaCustomGenderChange = (e, index) => {
    const newRows = [...mekkaRows];
    newRows[index].customGender = e.target.value;
    setMekkaRows(newRows);
  };

  const handleMadinaCustomGenderChange = (e, index) => {
    const newRows = [...madinaRows];
    newRows[index].customGender = e.target.value;
    setMadinaRows(newRows);
  };

  const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
  };

  const handleInputChange = (index, field, value) => {
    if (field === "price") {
      const newMekkaRows = [...mekkaRows];
      newMekkaRows[index][field] = value;
      setMekkaRows(newMekkaRows);

      const newMadinaRows = [...madinaRows];
      newMadinaRows[index][field] = value;
      setMadinaRows(newMadinaRows);
    }
  };

  return (
    <>
      <ul className="">
        {mekkaRows.map((row, index) => (
          <li key={index}>
            <div className="col-md-12 row">
              <div className="col-4 form-input spacing d-flex flex-column align-items-center hotel-mekka">
                <CreatableSelect
                  value={row.hotel}
                  onChange={(value) => handleMekkaChange(value, index)}
                  options={options2}
                  className="custom-select"
                  placeholder="Select Hotel For Mekka"
                  classNamePrefix="react-select"
                  isClearable
                  formatCreateLabel={(inputValue) =>
                    `Create custom hotel: "${inputValue}"`
                  }
                  styles={customStyles}
                />
                {row.hotel && row.hotel.__isNew__ && (
                  <input
                    type="text"
                    value={row.customGender}
                    onChange={(e) => handleMekkaCustomGenderChange(e, index)}
                    placeholder="Enter custom gender"
                    className="form-control mt-2 custom-input"
                  />
                )}
              </div>
              <div className="col-md-4">
                <div className="form-input spacing">
                  <input
                    type="text"
                    value={row.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Hotel Price
                  </label>
                </div>
              </div>
              <div className="col-2 d-flex">
                <button
                  type="button"
                  className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                  onClick={handleAddMekkaRow}
                >
                  +
                </button>
                <button
                  type="button"
                  className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                  onClick={() => handleRemoveMekkaRow(index)}
                >
                  -
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ul className="">
        {madinaRows.map((row, index) => (
          <li key={index}>
            <div className="col-md-12 row">
              <div className="col-4 form-input spacing d-flex flex-column align-items-center">
                <CreatableSelect
                  value={row.hotel}
                  onChange={(value) => handleMadinaChange(value, index)}
                  options={Madina}
                  className="custom-select"
                  placeholder="Select Hotel For Madina"
                  classNamePrefix="react-select"
                  isClearable
                  formatCreateLabel={(inputValue) =>
                    `Create custom hotel: "${inputValue}"`
                  }
                  styles={customStyles}
                />
                {row.hotel && row.hotel.__isNew__ && (
                  <input
                    type="text"
                    value={row.customGender}
                    onChange={(e) => handleMadinaCustomGenderChange(e, index)}
                    placeholder="Enter custom gender"
                    className="form-control mt-2 custom-input"
                  />
                )}
              </div>
              <div className="col-md-4">
                <div className="form-input spacing">
                  <input
                    type="text"
                    value={row.price}
                    onChange={(e) =>
                      handleInputChange(index, "price", e.target.value)
                    }
                    required
                  />
                  <label className="lh-1 text-16 text-light-1">
                    Hotel Price
                  </label>
                </div>
              </div>
              <div className="col-2 d-flex">
                <button
                  type="button"
                  className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                  onClick={handleAddMadinaRow}
                >
                  +
                </button>
                <button
                  type="button"
                  className="button -sm -info-2 bg-accent-1 text-white col-lg-3 my-4 text-40 mx-10 mx-md-3"
                  onClick={() => handleRemoveMadinaRow(index)}
                >
                  -
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MyComponent;
