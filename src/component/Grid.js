import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';
import { UserGrid } from './UserGrid';
import { AdminGrid } from './AdminGrid';
import SlideSettings from './SlideSettingsModal';
import CreateOption from './CreateOptionModal';
import 'react-datepicker/dist/react-datepicker.css';

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

  const options = [
    { id: 1, label: '0', color: '#A1231A' },
    { id: 2, label: 'JO', color: '#A1231A' },
    { id: 3, label: 'AV', color: '#A1231A' },
    { id: 4, label: 'P90', color: '#A1231A' },
    { id: 5, label: 'LT', color: '#A1231A' },
    { id: 6, label: 'QT', color: '#A1231A' },
    { id: 7, label: 'P50', color: '#A1231A' },
    { id: 8, label: 'P75', color: '#A1231A' },
    { id: 9, label: 'SE', color: '#A1231A' },
    { id: 10, label: 'BD', color: '#A1231A' },
  ];

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

        await sleep(speed * 1000);
      }
    }
  };

  return (
    <div className="mt-4">
      <div className="d-flex row-reverse mb-2 justify-content-center">
        <div className="col-md-5 col-5 ms-4">
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
              className="bi btn bi-gear-fill ms-2 p-0 mb-1"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            ></i>
            <div class="vr ms-2"></div>
            <button
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              Vehicle Status <i className="bi bi-gear-fill"></i>
            </button>
            <CreateOption options={options} />
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
        <div className="col-md-5"> </div>
        <div className="col-md-2 ">
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
      {!token ? (
        <UserGrid date={date} fetchedData={fetchedData} />
      ) : (
        <AdminGrid
          options={options}
          token={token}
          date={date}
          fetchedData={fetchedData}
        />
      )}
    </div>
  );
}

export { CustomGrid };
