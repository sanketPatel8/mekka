"use client"

import { usePeople } from '@/app/context/PeopleContext';
import { useState } from 'react';

const PeopleManager = () => {
  const { people, addPerson, editPerson, removePerson } = usePeople();
  const [personType, setPersonType] = useState('adults'); // Can be 'adults', 'children', or 'babies'
  const [newPerson, setNewPerson] = useState('');

  const handleAdd = () => {
    if (newPerson.trim()) {
      addPerson(personType, { name: newPerson });
      setNewPerson('');
    }
  };

  const handleEdit = (type, index) => {
    const updatedName = prompt('Enter new name:');
    if (updatedName) {
      editPerson(type, index, { name: updatedName });
    }
  };

  const handleRemove = (type, index) => {
    removePerson(type, index);
  };

  return (
    <div>
      <h2>Manage People</h2>
      
      {/* Add a new person */}
      <select value={personType} onChange={e => setPersonType(e.target.value)}>
        <option value="adults">Adults</option>
        <option value="children">Children</option>
        <option value="babies">Babies</option>
      </select>
      
      <input
        type="text"
        value={newPerson}
        onChange={e => setNewPerson(e.target.value)}
        placeholder="Enter name"
      />
      <button onClick={handleAdd}>Add</button>

      {/* Display people list */}
      {['adults', 'children', 'babies'].map(type => (
        <div key={type}>
          <h3>{type.charAt(0).toUpperCase() + type.slice(1)}</h3>
          <ul>
            {people[type].map((person, index) => (
              <li key={index}>
                {person.name}
                <button onClick={() => handleEdit(type, index)}>Edit</button>
                <button onClick={() => handleRemove(type, index)}>Remove</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PeopleManager;
