import React from 'react';
import axios from 'axios';

function AdminGrid({ fetchedData, month }) {
  const handleChange = (e) => {};

  return (
    <div>
      {fetchedData ? (
        <table className="table-sm table-striped table-bordered table-responsive overflow-y: hidden">
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
                  <td>
                    <select
                      value={data.fleetNo}
                      name="fleetNo"
                      onChange={handleChange}
                    ></select>
                  </td>
                  <td>
                    <select
                      value={data.vehicleModel}
                      name="vehicleModel"
                      onChange={handleChange}
                    ></select>
                  </td>
                  <td>
                    {' '}
                    <select
                      value={data.size}
                      name="size"
                      onChange={handleChange}
                    ></select>
                  </td>
                  <td>
                    {' '}
                    <select
                      value={data.operator}
                      name="operator"
                      onChange={handleChange}
                    ></select>
                  </td>
                  {data.workingStatusList.map((status) => (
                    <td>{status.workingStatus.statusName}</td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <></>
      )}
    </div>
  );
}

export { AdminGrid };
