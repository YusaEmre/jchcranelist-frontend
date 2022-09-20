import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserGrid } from './UserGrid';
import { AdminGrid } from './AdminGrid';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';
import 'react-datepicker/dist/react-datepicker.css';
import SlideSettings from './SlideSettingsModal';

function CustomGrid() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [fetchedData, setFetchedData] = useState([]);
  const [speed, setSpeed] = useState(1);
  const [slideStart, setSlideStart] = useState(new Date('07-01-2022'));
  const [slideEnd, setSlideEnd] = useState(new Date('06-01-2023'));
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

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const Loop = async (e) => {
    if (e.target.checked) {
      for (
        let index = new Date(slideStart.getFullYear(), slideStart.getMonth());
        index <= slideEnd;

      ) {
        if (e.target.checked) {
          setDate(new Date(index.getFullYear(), index.getMonth()));
        } else {
          break;
        }
        if (index.getTime() === slideEnd.getTime()) {
          index = new Date(slideStart.getFullYear(), slideStart.getMonth());
        } else {
          index.setMonth(index.getMonth() + 1);
        }
        if (fetchedData.length > 0) {
          await sleep(speed * 1000);
        }
      }
    }
  };

  return (
    <div className="container">
      <h3 className="p-3 text-center">List of Vehicles</h3>
      <div className="d-flex row-reverse mb-2">
        <div className="col-md-5 col-5">
          {' '}
          <div className="form-check form-switch">
            <label
              className="form-check-label mt-1"
              htmlFor="flexSwitchCheckDefault"
            >
              Table Slide
            </label>
            <input
              className="form-check-input mt-2"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
              onChange={(e) => Loop(e)}
            />

            <i
              className="bi btn bi-gear-fill ms-2 p-0"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></i>

            <SlideSettings
              slideEnd={slideEnd}
              slideStart={slideStart}
              setSlideStart={setSlideStart}
              setSlideEnd={setSlideEnd}
              speed={speed}
              setSpeed={setSpeed}
            />
          </div>
        </div>
        <div className="col-md-5"></div>
        <div className="col-md-2">
          <DatePicker
            selected={date}
            minDate={new Date('07-01-2022')}
            onChange={(date) => setDate(date)}
            selectsStart
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
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
