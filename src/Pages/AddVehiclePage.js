import React from 'react';
import '../App.css';
import Input from '../component/Input';
import { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import moment from 'moment/moment';
import 'react-datepicker/dist/react-datepicker.css';
import { authHeader, URL } from '../service/LoginService';

const AddVehiclePage = () => {
  const [vehicleModel, setVehicleModel] = useState();
  const [fleetNo, setFleetNo] = useState();
  const [operator, setOperator] = useState();
  const [size, setSize] = useState();
  const [creationDate, setCreationDate] = useState();
  const [message, setMessage] = useState();

  const disabled = vehicleModel && fleetNo && operator && size && creationDate;
  const [token, setToken] = useState(localStorage.getItem('token'));

  const onClick = async (event) => {
    setMessage(undefined);
    event.preventDefault();
    let monthYear = moment(creationDate).format('MM-YYYY');
    const data = {
      vehicleModel,
      fleetNo,
      operator,
      size,
      monthYear,
    };
    try {
      const response = await axios.post(
        'http://localhost:8080/api/vehicle/save',
        data,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      );
      toast.info(`${data.vehicleModel} added`, 1);
      setMessage('Successfully added a vehicle');
    } catch (er) {
      console.log(er.message);
      setMessage('Unauthorized');
    }
  };
  return (
    <div className="container">
      <h4 className="text-center">Add Vehicle</h4>
      <p className="text-center">{message}</p>

      <div className="vehicle-page">
        <form>
          <Input
            name="vehicleModel"
            label="Vehicle Model"
            onChange={(change) => setVehicleModel(change.target.value)}
          ></Input>
          <Input
            name="fleetNo"
            label="Fleet No"
            onChange={(change) => setFleetNo(change.target.value)}
          ></Input>
          <Input
            name="operator"
            label="Operator"
            onChange={(change) => setOperator(change.target.value)}
          ></Input>
          <Input
            name="size"
            minnum="0"
            label="Size"
            type="number"
            onChange={(change) => setSize(change.target.value)}
          ></Input>
          <DatePicker
            className="mt-2"
            selected={creationDate}
            minDate={new Date('07-01-2022')}
            onChange={(date) => setCreationDate(date)}
            selectsStart
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
          {/* <Input
            name="date"
            type="Date"
            label="Date"
            onChange={(change) => setDate(change.target.value)}
          ></Input> */}
        </form>
        <div className="button-rigth-margin text-center">
          <button
            type="submit"
            onClick={onClick}
            className="button-background mt-4"
            disabled={!disabled}
          >
            Create a Vehicle
          </button>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default AddVehiclePage;
