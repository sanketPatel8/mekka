import { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const PeopleContext = createContext();

// Hook to use the People context
export const usePeople = () => useContext(PeopleContext);

// Provider component
export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState({
    adults: [],
    children: [],
    babies: []
  });

  // Load data from local storage on component mount
  useEffect(() => {
    const storedPeople = typeof window != 'undefined' ? localStorage.getItem("people") : '';
    if (storedPeople) {
      setPeople(JSON.parse(storedPeople));
    }
  }, []);

  // Save data to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('people', JSON.stringify(people));
  }, [people]);

  // Function to add a person
  const addPerson = (personType, person) => {
    setPeople(prev => ({
      ...prev,
      [personType]: [...prev[personType], person]
    }));
  };

  // Function to edit a person
  const editPerson = (personType, index, updatedPerson) => {
    setPeople(prev => {
      const updatedList = [...prev[personType]];
      updatedList[index] = updatedPerson;
      return { ...prev, [personType]: updatedList };
    });
  };

  // Function to remove a person
  const removePerson = (personType, index) => {
    setPeople(prev => ({
      ...prev,
      [personType]: prev[personType].filter((_, i) => i !== index)
    }));
  };

  return (
    <PeopleContext.Provider value={{ people, addPerson, editPerson, removePerson }}>
      {children}
    </PeopleContext.Provider>
  );
};
