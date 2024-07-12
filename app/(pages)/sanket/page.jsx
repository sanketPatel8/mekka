"use client"

import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';

const data = [
  { id: 1, name: 'John Doe', age: 30, gender: 'Male', role: 'Admin' },
  { id: 2, name: 'Jane Smith', age: 25, gender: 'Female', role: 'User' },
  { id: 3, name: 'Sara Wilson', age: 35, gender: 'Female', role: 'User' },
  { id: 4, name: 'Michael Brown', age: 45, gender: 'Male', role: 'User' },
  { id: 5, name: 'Emily Johnson', age: 40, gender: 'Female', role: 'Admin' },
  // Add more data as needed
];

const columns = [
  {
    name: 'Name',
    selector: row => row.name,
    sortable: true,
  },
  {
    name: 'Age',
    selector: row => row.age,
    sortable: true,
  },
  {
    name: 'Gender',
    selector: row => row.gender,
    sortable: true,
  },
  {
    name: 'Role',
    selector: row => row.role,
    sortable: true,
    cell: row => (
      <select
        value={row.role}
        onChange={(e) => handleRoleChange(row.id, e.target.value)}
      >
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Guest">Guest</option>
      </select>
    ),
  },
  {
    name: 'Action',
    cell: row => (
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    ),
  },
];

const App = () => {
  const [filterText, setFilterText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [tableData, setTableData] = useState(data);

  const handleRoleChange = (id, newRole) => {
    const updatedData = tableData.map(item => {
      if (item.id === id) {
        return { ...item, role: newRole };
      }
      return item;
    });
    setTableData(updatedData);
  };

  const filteredItems = tableData.filter(
    item =>
      item.name.toLowerCase().includes(filterText.toLowerCase()) &&
      (selectedRole === '' || item.role === selectedRole)
  );

  // Ensure client-side specific code only runs after hydration
  useEffect(() => {
    import('jquery').then(($) => {
      import('select2').then(() => {
        $('#my-select').select2({
          placeholder: 'Select an option',
          width: '100%',
        });

        return () => {
          $('#my-select').select2('destroy');
        };
      });
    });
  }, []);

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Filter By Name"
          value={filterText}
          onChange={e => setFilterText(e.target.value)}
        />
        <select
          value={selectedRole}
          onChange={e => setSelectedRole(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Guest">Guest</option>
        </select>
      </div>
      <DataTable
        title="Contact List"
        columns={columns}
        data={filteredItems}
        pagination
      />
    </div>
  );
};

export default App;
