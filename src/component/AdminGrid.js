import React, { useState, useEffect } from 'react';
import CustomAxios from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

function AdminGrid({ token, fetchedData, date, workingStatus }) {
  const [listData,setListData] = useState(fetchedData);
  
  const [selectValue, setSelectValue] = useState([]);


  useEffect(() => { setListData(fetchedData)}, [fetchedData])


  const remove_from_list = (id) => {     
    setListData(listData.filter(item=> item.id != id)); 
  }

  const handleChange = (e, data, index) => {
    setSelectValue([
      ...selectValue,
      { id: e.target.id, value: e.target.value },
    ]);
    
    const value = e.target.value;
    e.preventDefault();
    data.workingStatusList[index].workingStatus.statusName = value; 
    
    
    workingStatus.map((option) => {
      if (option.statusName === value) {
        data.workingStatusList[index].workingStatus.id = option.id;
        data.workingStatusList[index].workingStatus.color = option.color; 
      }
    });
    
  };
  const handleEdit = async (e, dataIndex) => {
    e.preventDefault();
    try {
      await CustomAxios.put(
        `vehicle/edit`,
        listData[dataIndex]
      );
      toast.info(`${listData[dataIndex].vehicleModel} updated`, 1);
    } catch (error) {
      toast.error(`not updated ${error}`);
    }
  };
  const handleDelete = async (e, dataIndex) => {
    e.preventDefault();
    try {
      await CustomAxios.delete(
        `http://localhost:8080/api/vehicle/delete/id/`+listData[dataIndex].id
      );
      toast.info(`${listData[dataIndex].vehicleModel} deleted`, 1);
      remove_from_list(listData[dataIndex].id);
    
    } catch (error) {
      toast.error(`Vehicle delete failed  ${error}`);
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
  
  const handleFleetNoChange = ({ name, value}) => {
    
    listData[name].fleetNo = value;
    console.log(listData[name])

  };
  const handleModelChange = ({ name, value}) => {
    
    listData[name].vehicleModel = value;
    console.log(listData[name])

  };
  
  const handleSizeChange = ({ name, value}) => {
    
    listData[name].size = value;
    console.log(listData[name])

  };
  
  const handleOperatorChange = ({ name, value}) => {
    
    listData[name].operator = value;
    console.log(listData[name])

  };
  
  return (
   
    <div className="mt-2">
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
            {listData &&
              workingStatus &&
              listData.map((data, dataIndex) => (
                
                <tr key={data.id}>
                  <td>
                    <EditText
                       name={dataIndex}
                      defaultValue={data.fleetNo} 
                      onSave={handleFleetNoChange}    
                      placeholder='Fleet No'     
                      /></td>
                  <td><EditText
                       name={dataIndex}
                       onSave={handleModelChange}         
                       placeholder='Vehicle Model'
                      defaultValue={data.vehicleModel}
                      /></td>
                  <td><EditText
                       name={dataIndex}
                       placeholder='Size'
                       type='number'
                       onSave={handleSizeChange}         

                       defaultValue={data.size}
                      /></td>
                  <td><EditText
                       name={dataIndex}
                       placeholder='Operator'
                       onSave={handleOperatorChange}         

                      defaultValue={data.operator}
                      /></td>
                  {data.workingStatusList.map((status, index) => (
                    <td className="pt-2 p-0">
                      <select
                        key={index}
                        className={`w-100 text-center`}
                        id={`${dataIndex} + ${index}`}
                        defaultValue={status.workingStatus.statusName}
                        style={{ backgroundColor:status.workingStatus.color}}
                        onChange={(e) => handleChange(e, data, index)}
                      >
                        {workingStatus.map((option) => (
                          
                          <option style={{backgroundColor:option.color}}>
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
                        onClick={(e) => handleDelete(e, dataIndex)}
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
