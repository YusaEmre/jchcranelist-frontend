import React, { useState,useEffect } from 'react';
import DropDown from './Dropdown';
import axios from 'axios';

function CustomGrid() {

  const [month, setMonth] = useState('January');
  const [fetchedData, setFetchedData] = useState();





  const fetchData = async () => {
   const resp =  await axios.get(`http://localhost:8080/api/vehicle?month=${month}`,{headers: {
    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5dXNhMUBnbWFpbC5jb20iLCJpYXQiOjE2NjMxNDMyMjksImV4cCI6MTY2MzE3OTIyOX0.MvIo4jdGN_U5u9jXTB4NTYoBsXXJxc_0oYrnw6LLX18rXd_R9W93aojrT5x_Q4EX0eY64DKatD2LBm3J6ul5mQ'
  }})
   setFetchedData(resp.data);
   
  }
  useEffect(() => {
    fetchData();
  },[month])


  

    

    return (
        <div className="container">
            <h3 className="p-3 text-center">List of Vehicles</h3>
            <DropDown month={month} setMonth={setMonth}/>
            {fetchedData ? <table className="table-sm table-striped table-bordered table-responsive overflow-y: hidden">
            <thead>
              <tr style={{textAlign: "center"}} >
                <th colSpan={fetchedData[0].workingStatusList.length+5}>
                  {month}
                </th>
              </tr>
            </thead>
                <thead>
                    <tr>
                      
                        <th >Fleet No</th>
                        <th >Crane Model</th>
                        <th >Size</th>
                        <th >Operator</th>
                        {fetchedData[0].workingStatusList.map(status=>
                          <th>{status.day+1}</th>)}
                        <th>Total Working Days</th>
                    </tr>
                </thead>
                <tbody>

                    {fetchedData && fetchedData.map(data =>
                        <tr key={data.id}>
                            <td >{data.fleetNo}</td>
                            <td >{data.vehicleModel}</td>
                            <td >{data.size}</td>
                            <td >{data.operator}</td>
                            {data.workingStatusList.map(status=>
                              <td>{status.workingStatus.statusName}</td>
                              )}
                        </tr>
                    )}
                </tbody>
            </table> : <></>}
        </div>
    );
}

export { CustomGrid };