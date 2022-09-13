import React, { useState,useEffect } from 'react';
import DropDown from './Dropdown';
import axios from 'axios';

function CustomGrid() {

  const [month, setMonth] = useState('January');
  const [fetchedData, setFetchedData] = useState();
  const fetchData = async () => {
   const resp =  await axios.get(`http://localhost:8080/api/vehicle?month=${month}`,{headers: {
    'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5dXNhMUBnbWFpbC5jb20iLCJpYXQiOjE2NjMwNzMwNDEsImV4cCI6MTY2MzEwOTA0MX0.DeER81BztT0t3iAMr7ODeMcKTZ63bmaEGlXk20-LdODvphbSrAutx9wKOsCGFWDA4FtNw_gYP1AE2YmsLQd_YQ'
  }})
   setFetchedData(resp)
  }
  useEffect(() => {
    fetchData();
    console.log(fetchData);
  },[month])
  
  

  const data = [
    {
      start: "1",
      state: "JO"
    },
    {
      start: "2",
      state: "AV"
    },
    {
      start: "3",
      state: "0"
    },
    {
      start: "4",
      state: "JO"
    },
    {
      start: "5",
      state: "AV"
    },
    {
      start: "6",
      state: "0"
    },
    {
      start: "7",
      state: "JO"
    },
    {
      start: "8",
      state: "AV"
    },
    {
      start: "9",
      state: "0"
    },
    {
      start: "10",
      state: "JO"
    },
    {
      start: "11",
      state: "AV"
    },
    {
      start: "12",
      state: "0"
    }, {
      start: "13",
      state: "JO"
    },
    {
      start: "14",
      state: "AV"
    },
    {
      start: "15",
      state: "0"
    }, {
      start: "16",
      state: "JO"
    },
    {
      start: "17",
      state: "AV"
    },
    {
      start: "18",
      state: "0"
    }, {
      start: "19",
      state: "JO"
    },
    {
      start: "20",
      state: "AV"
    },
    {
      start: "21",
      state: "0"
    },
    {
      start: "22",
      state: "JO"
    },
    {
      start: "23",
      state: "AV"
    },
    {
      start: "24",
      state: "0"
    },
    {
      start: "25",
      state: "JO"
    },
    {
      start: "26",
      state: "AV"
    },
    {
      start: "27",
      state: "0"
    },
    {
      start: "28",
      state: "JO"
    },
    {
      start: "29",
      state: "AV"
    },
    {
      start: "30",
      state: "0"
    }
  ];
  
    const [users, setUsers] = useState([
        { id: 1, firstName: 'LH136', lastName: 'LTM 1250-5.1', email: '250t', role: 'Welcome' },
        { id: 1, firstName: 'LH129', lastName: 'LTM 1250-6.1', email: '250t', role: 'Immanuel' },
    ]);
    

    return (
        <div className="container">
            <h3 className="p-3 text-center">List of Vehicles</h3>
            <DropDown month={month} setMonth={setMonth}/>
            {fetchedData ? <table className="table-sm table-striped table-bordered table-responsive overflow-y: hidden">
            <thead>
              <tr style={{textAlign: "center"}} >
                <th colSpan={data.length+5}>
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
                        {data.map((i) => (
                        <th  key={i}>{i?.start}</th>
                                    ))}
                        <th>Total Working Days</th>
                    </tr>
                </thead>
                <tbody>

                    {users && users.map(user =>
                        <tr key={user.id}>
                            <td >{user.firstName}</td>
                            <td >{user.lastName}</td>
                            <td >{user.email}</td>
                            <td >{user.role}</td>
                            {data.map((i) => (
                            <td   key={i}>{i?.state}</td>
                                           ))}
                            <td >15</td>
                        </tr>
                    )}
                </tbody>
            </table> : <></>}
        </div>
    );
}

export { CustomGrid };