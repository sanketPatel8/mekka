import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const PeopleContext = createContext();

// Hook to use the People context
export const usePeople = () => useContext(PeopleContext);

// Provider component
export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState({
    adults: [],
    children: [],
    babies: [],
  });

  const clearSpecificType = (type) => {
    // Retrieve the current data
    const storedPeople =
      typeof window !== "undefined" ? localStorage.getItem("people") : null;

    if (storedPeople) {
      const people = JSON.parse(storedPeople);

      // Clear the specific type
      if (people[type]) {
        people[type] = [];
      }

      // Save the modified data back to local storage
      localStorage.setItem("people", JSON.stringify(people));
    }
  };

  const removeSpecificValueFromArray = (key, valueToRemove) => {
    // Retrieve the current data from local storage
    const storedData =
      typeof window !== "undefined" ? localStorage.getItem(key) : null;

    if (storedData) {
      // Parse the JSON data
      const data = JSON.parse(storedData);

      // Check if the data is an array
      if (Array.isArray(data)) {
        // Remove the specific value from the array
        const updatedData = data.filter((item) => item !== valueToRemove);

        // Save the modified data back to local storage
        localStorage.setItem(key, JSON.stringify(updatedData));
      }
    }
  };

  // Load data from local storage on component mount
  useEffect(() => {
    const storedPeople =
      typeof window !== "undefined" ? localStorage.getItem("people") : "";
    if (storedPeople) {
      setPeople(JSON.parse(storedPeople));
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("people", JSON.stringify(people));
  }, [people]);

  // Function to add people
  // const addPeople = (personType, peopleArray) => {
  //   setPeople((prev) => ({
  //     ...prev,
  //     [personType]: Array.isArray(prev[personType])
  //       ? [...prev[personType], ...peopleArray]
  //       : peopleArray,
  //   }));
  // };

  const addPeople = (personType, peopleArray) => {
    setPeople(prev => ({
      ...prev,
      [personType]: Array.isArray(prev[personType])
        ? [...prev[personType], ...(Array.isArray(peopleArray) ? peopleArray : [])]
        : (Array.isArray(peopleArray) ? peopleArray : []),
    }));
  };
  

  // Function to edit a person
  const editPerson = (personType, index, updatedPerson) => {
    setPeople((prev) => {
      const list = Array.isArray(prev[personType]) ? [...prev[personType]] : [];
      list[index] = updatedPerson;
      return { ...prev, [personType]: list };
    });
  };

  // Function to remove a person
  const removePerson = (personType, index) => {
    setPeople((prev) => {
      const list = Array.isArray(prev[personType]) ? prev[personType] : [];
      const updatedList = list.filter((_, i) => i !== index);
      return { ...prev, [personType]: updatedList };
    });
  };

  return (
    <PeopleContext.Provider
      value={{ people, addPeople, editPerson, removePerson }}
    >
      {children}
    </PeopleContext.Provider>
  );
};
