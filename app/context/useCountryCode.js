import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const CountryCodeContext = createContext();

// Create a provider component
export const CountryCodeProvider = ({ children }) => {
    const [countryCode, setCountryCode] = useState('');

    useEffect(() => {
        // Fetch the country code based on user's IP

        
        const fetchCountryCode = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/'); // You can use another API if you prefer
                const data = await response.json();
                setCountryCode(data.country_code.toLowerCase()); // Set the country code
            } catch (error) {
                console.error('Error fetching country code:', error);
            }
        };

        fetchCountryCode();
        
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <CountryCodeContext.Provider value={{ countryCode, setCountryCode }}>
            {children}
        </CountryCodeContext.Provider>
    );
};

// Create a custom hook for easy access to the context
export const useCountryCode = () => {
    return useContext(CountryCodeContext);
};
