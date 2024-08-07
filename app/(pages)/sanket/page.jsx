"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [apiData, setApiData] = useState([]);
  const [customData, setCustomData] = useState(['custom1', 'custom2', 'custom3']);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch data from API
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setApiData(response.data);
      })
      .catch(error => {
        console.error('Error fetching API data:', error);
      });
  }, []);

  // Calculate the indexes of the first and last items on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Slice the data to get only the items for the current page
  const currentItems = apiData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(apiData.length / itemsPerPage);

  const handleClick = (event) => {
    setCurrentPage(Number(event.target.id));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map(number => (
      <button
        key={number}
        id={number}
        onClick={handleClick}
        className={currentPage === number ? 'active' : null}
      >
        {number}
      </button>
    ));
  };

  return (
    <div>
      {currentItems.length > 0 && customData.length > 0 ? (
        currentItems.map((item, index) => (
          <div key={item.id}>
            <p>API Data:</p>
            <p>User ID: {item.userId}</p>
            <p>ID: {item.id}</p>
            <p>Title: {item.title}</p>
            <p>Body: {item.body}</p>
            <p>Custom Data: {customData[(indexOfFirstItem + index) % customData.length]}</p>
            <br />
            <hr />
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
      <div className="pagination">
        {renderPageNumbers()}
      </div>
    </div>
  );
};

export default MyComponent;
