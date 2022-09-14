import React from 'react';
import axios from 'axios';
import '../App.css';

function AdminGrid({ fetchedData, month }) {
  const handleChange = (e) => {
  };


  const options = [
    { value: '0', label: '0' },
    { value: 'AV', label: 'AV' },
    { value: 'JO', label: 'JO' },
    { value: 'P90', label: '90' } 
  ];
  return (
    <div>
      {fetchedData ? (
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
                  <td>
                    {data.fleetNo}
                  </td>
                  <td>
                    {data.vehicleModel}
                  </td>
                  <td>
                    {data.size}
                  </td>
                  <td>
                  {data.operator}
                  </td>
                  {data.workingStatusList.map((status) => (
                    <td><select className='select' style={{width:30}}>
                     {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
                  </select></td>
                                     
                  ))}
                   <td>0</td>
                   <td style={{textAlign: "center"}} >
                   <button
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
    </div>
  );
}

export { AdminGrid };
