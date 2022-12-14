import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';

function AdminGrid({ token, fetchedData, date }) {
  const [data, setData] = useState();
  const [selectValue, setSelectValue] = useState([]);
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);
  const options = [
    { id: 1, label: '0' },
    { id: 2, label: 'JO' },
    { id: 3, label: 'AV' },
    { id: 4, label: 'P90' },
    { id: 5, label: 'LT' },
    { id: 6, label: 'QT' },
    { id: 7, label: 'P50' },
    { id: 8, label: 'P75' },
    { id: 9, label: 'SE' },
    { id: 10, label: 'BD' },
  ];

  const handleChange = (e, data, index) => {
    setSelectValue([
      ...selectValue,
      { id: e.target.id, value: e.target.value },
    ]);
    setData(data);
    let copyData = data;
    const value = e.target.value;
    e.preventDefault();
    copyData.workingStatusList[index].workingStatus.statusName = value;
    options.map((option) => {
      if (option.label === value) {
        copyData.workingStatusList[index].workingStatus.id = option.id;
      }
    });
    setData(copyData);
  };
  const handleEdit = async (e, dataIndex) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8080/api/vehicle/edit`,
        fetchedData[dataIndex],
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.info(`${fetchedData[dataIndex].vehicleModel} updated`, 1);
    } catch (error) {
      toast.error(`not updated ${error}`);
    }
  };
  const handleTotalWorkingDays = (data) => {
    let totalWorkingDays = 0;
    data.map((item) => {
      if (
        item.workingStatus.statusName !== '0' &&
        item.workingStatus.statusName !== 'BD' &&
        item.workingStatus.statusName !== 'AV'
      ) {
        totalWorkingDays++;
      }
    });
    return <td className="text-center">{totalWorkingDays}</td>;
  };

  return (
    <div>
      {fetchedData.length > 0 ? (
        <table className="table table-sm table-striped table-bordered table-responsive overflow-y: hidden">
          <thead className="bg-light">
            <tr>
              <th
                className="text-center "
                colSpan={fetchedData[0].workingStatusList.length}
                style={{ color: '#ec6e00' }}
              >
                <h5>{moment(date).format('MMMM')}</h5>
              </th>
            </tr>
          </thead>
          <thead>
            <tr>
              <th>Fleet No</th>
              <th>Crane Model</th>
              <th>Size</th>
              <th>Operator</th>
              {fetchedData[0].workingStatusList.map((status) => (
                <th>{status.day + 1}</th>
              ))}
              <th>Total Working Days</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData &&
              fetchedData.map((data, dataIndex) => (
                <tr key={data.id}>
                  <td>{data.fleetNo}</td>
                  <td>{data.vehicleModel}</td>
                  <td>{data.size}</td>
                  <td>{data.operator}</td>
                  {data.workingStatusList.map((status, index) => (
                    <td>
                      <select
                        key={index}
                        className={status.workingStatus.statusName}
                        id={`${dataIndex} + ${index}`}
                        defaultValue={status.workingStatus.statusName}
                        style={{ width: 30 }}
                        onChange={(e) => handleChange(e, data, index, this)}
                      >
                        {options.map((option) => (
                          <option className={option.label}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                  {handleTotalWorkingDays(data.workingStatusList)}
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={(e) => handleEdit(e, dataIndex)}
                      type="submit"
                      id={dataIndex}
                      className="edit-button"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">
          <h3>
            There is no vehicle created for{' '}
            <span style={{ color: '#ec6e00' }}>
              {moment(date).format('MMMM')}
            </span>
          </h3>
        </div>
      )}
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
}
export { AdminGrid };

//className={selectValue.some(e => e.id === `${dataIndex} + ${index}`) ? "JO" : ""
