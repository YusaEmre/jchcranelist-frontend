import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';

function AdminGrid({ token, fetchedData, date, workingStatus }) {
  const [data, setData] = useState();
  const [selectValue, setSelectValue] = useState([]);
  const [totalWorkingDays, setTotalWorkingDays] = useState(0);
  console.log(workingStatus);
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
    workingStatus.map((option) => {
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
        <table className="table table-bordered table-striped">
          <thead className="bg-light">
            <tr>
              <th
                className="text-center "
                colSpan={100}
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
              <th>Working Days</th>
            </tr>
          </thead>
          <tbody>
            {fetchedData &&
              workingStatus &&
              fetchedData.map((data, dataIndex) => (
                <tr key={data.id}>
                  <td>{data.fleetNo}</td>
                  <td>{data.vehicleModel}</td>
                  <td>{data.size}</td>
                  <td>{data.operator}</td>
                  {data.workingStatusList.map((status, index) => (
                    <td className="pt-2 p-0">
                      <select
                        key={index}
                        className={`${status.workingStatus.statusName} w-100 text-center`}
                        id={`${dataIndex} + ${index}`}
                        defaultValue={status.workingStatus.statusName}
                        style={{ width: 30 }}
                        onChange={(e) => handleChange(e, data, index, this)}
                      >
                        {workingStatus.map((option) => (
                          <option className={option.statusName}>
                            {option.statusName}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                  {handleTotalWorkingDays(data.workingStatusList)}

                  <div className="row row-actions p-0 m-0">
                    <div className="col-md-6 p-0 m-0">
                      {' '}
                      <button
                        onClick={(e) => handleEdit(e, dataIndex)}
                        type="submit"
                        id={dataIndex}
                        className="btn"
                        title="Edit Confirm Button"
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                    </div>
                    <div className="col-md-6 p-0 m-0">
                      {' '}
                      <button
                        onClick={(e) => handleEdit(e, dataIndex)}
                        type="submit"
                        id={dataIndex}
                        className="btn text-danger"
                        title="Delete Button"
                      >
                        <i class="bi bi-trash"></i>{' '}
                      </button>
                    </div>
                  </div>
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
