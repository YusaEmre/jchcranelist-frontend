import React, { useState } from 'react';
import CustomAxios from '../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import Input from '../component/Input';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();

  const token = localStorage.getItem('token');

  const handleRegister = async () => {
    try {
      await CustomAxios.post(
        'user/register',
        {
          name: name,
          surname: surname,
          email: email,
          phoneNumber: phoneNumber,
          password: password,
          role: 1,
        },
      );
      toast.success(`register success`);
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  const disabled = name && surname && email && phoneNumber && password;
  return (
    <div className="container mt-5 w-50  d-flex justify-content-center text-center">
      <div>
        <h4 className="text-center" style={{ color: 'rgb(22 41 227)' }}>
          New User
        </h4>
        <form>
          <Input
            name="name"
            label="Name"
            onChange={(change) => setName(change.target.value)}
          ></Input>
          <Input
            name="surname"
            label="Surname"
            onChange={(change) => setSurname(change.target.value)}
          ></Input>
          <Input
            name="email"
            label="Email"
            onChange={(change) => setEmail(change.target.value)}
          ></Input>
          <Input
            name="phoneNumber"
            label="Phone Number"
            onChange={(change) => setPhoneNumber(change.target.value)}
          ></Input>
          <Input
            name="password"
            type="password"
            label="Password"
            onChange={(change) => setPassword(change.target.value)}
          ></Input>
          <button
            type="submit"
            className="btn btn-primary mt-4"
            disabled={!disabled}
            onClick={handleRegister}
          >
            Create a user
          </button>
        </form>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};
export default Register;
