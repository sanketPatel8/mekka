"use client"


import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState(null); // State to store API response
  const [error, setError] = useState(null); // State to store error messages

  useEffect(() => {
    // Define the async function
    const fetchData = async () => {
      try {
        const response = await axios.post('https://xcoder.a2hosted.com/mekkabooking/api/tourlist', {
          AccessKey: "Mekka@24",
          email: 'sanket.xceptive+123@gmail.com',
        });
        setData(response.data); // Update state with API response
        console.log(response.data); // Log the response data
      } catch (err) {
        console.error(err);
        setError('An error occurred while fetching the data.'); // Update state with error message
      }
    };

    // Call the async function
    fetchData();
  }, []); // Empty dependency array means this runs once after the initial render

  return (
    <div>
      <h1>Page</h1>
      {error && <p>{error}</p>} {/* Show error message if there's an error */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre> // Display the API response data
      ) : (
        <p>Loading...</p> // Show a loading message while fetching
      )}
    </div>
  );
};

export default Page;
