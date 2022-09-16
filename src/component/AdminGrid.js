import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function AdminGrid({ token, fetchedData, month }) {
  const [data, setData] = useState();
  const [count,setCount] = useState();

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
  const handleEdit = async (e) => {
    e.preventDefault();
    try{
      const resp = await axios.put(
        `http://localhost:8080/api/vehicle/edit`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.info(`${data.vehicleModel} updated`,1)
    }    
    catch(error){
      toast.error(`not updated ${error}`)
    }
  
  };

  return (
    <div>
      {fetchedData.length > 0 ? (
        <table className="table table-sm table-striped table-bordered table-responsive overflow-y: hidden">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th colSpan={fetchedData[0].workingStatusList.length + 5}>
                {month}
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
              fetchedData.map((data) => (
                <tr key={data.id}>
                  <td>{data.fleetNo}</td>
                  <td>{data.vehicleModel}</td>
                  <td>{data.size}</td>
                  <td>{data.operator}</td>
                  {data.workingStatusList.map((status, index) => (
                    <td>
                      <select
                        className="select"
                        id="mySelect"
                        defaultValue={status.workingStatus.statusName}
                        style={{ width: 30, backgroundColor:"blue"}}
                        onChange={(e) => handleChange(e, data, index)}
                      >
                        {options.map((option) => (
                          <option>{option.label}</option>
                        ))}
                      </select>
                    </td>
                  ))}
                  <td>0</td>
                  <td style={{ textAlign: 'center' }}>
                    <button
                      onClick={handleEdit}
                      type="submit"
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
        <></>
      )}
              <ToastContainer position="bottom-right"
              autoClose={3000}
              />
    </div>
  );
      }
export { AdminGrid };
