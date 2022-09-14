import React, { useState, useEffect } from 'react';
import DropDown from './Dropdown';
import axios from 'axios';
import { UserGrid } from './UserGrid';
import { AdminGrid } from './AdminGrid';

function CustomGrid({ currentUser }) {
  const [month, setMonth] = useState('January');
  const [fetchedData, setFetchedData] = useState();
  const [token, setToken] = useState();
  const fetchData = async (token) => {
    const resp = await axios.get(
      `http://localhost:8080/api/vehicle?month=${month}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );
    setFetchedData(resp.data);
  };
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    fetchData(token);
  }, [month]);

  return (
    <div className="container">
      <h3 className="p-3 text-center">List of Vehicles</h3>
      <DropDown month={month} setMonth={setMonth} />
      {!token ? (
        <UserGrid month={month} fetchedData={fetchedData} />
      ) : (
        <AdminGrid month={month} fetchedData={fetchedData} />
      )}
    </div>
  );
}

export { CustomGrid };
