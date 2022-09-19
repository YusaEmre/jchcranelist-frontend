import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserGrid } from './UserGrid';
import { AdminGrid } from './AdminGrid';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';
import 'react-datepicker/dist/react-datepicker.css';
import { wait } from '@testing-library/user-event/dist/utils';

function CustomGrid() {
  const [date, setDate] = useState();
  const [loop, setLoop] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const fetchData = async (token) => {
    const month = moment(date).format('MM-YYYY');
    const resp = await axios.get(
      `http://localhost:8080/api/vehicle?date=${month}`
    );
    setFetchedData(resp.data);
  };
  useEffect(() => {
    setToken(localStorage.getItem('token'));
    fetchData(token);
  }, [date]);

  const Loop = (e) => {
    const year = moment(date).format('YYYY');

    for (let index = 0; index < 12; index++) {
      setDate(new Date(date).setMonth(index));
      if (fetchData.length > 0) {
        wait(100);
      } else {
        wait();
      }
    }
  };

  return (
    <div className="container">
      <h3 className="p-3 text-center">List of Vehicles</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginBottom: 30,
        }}
      >
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
            onChange={(e) => Loop(e.target.checked)}
          />
          <label class="form-check-label" for="flexSwitchCheckDefault">
            {moment(date).format('YYYY')} Slide
          </label>
        </div>
        <DatePicker
          selected={date}
          minDate={new Date('07-01-2022')}
          onChange={(date) => setDate(date)}
          selectsStart
          dateFormat="MM/yyyy"
          showMonthYearPicker
        />
      </div>

      {/* <DropDown month={month} setMonth={setMonth} /> */}
      {!token ? (
        <UserGrid date={date} fetchedData={fetchedData} />
      ) : (
        <AdminGrid token={token} date={date} fetchedData={fetchedData} />
      )}
    </div>
  );
}

export { CustomGrid };
