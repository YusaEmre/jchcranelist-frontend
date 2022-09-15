import React, { useState } from 'react';
import Input from '../component/Input';
import axios from 'axios';
import '../App.css';

const Register = () => {
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [email, setEmail] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();

  const handleRegister = async () => {
    const resp = await axios.post('http://localhost:8080/api/user/register', {
      name: name,
      surname: surname,
      email: email,
      phoneNumber: phoneNumber,
      password: password,
      role: 1,
    });
  };

  const disabled = name && surname && email && phoneNumber && password;
  return (
    <div className="container text-center">
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
      </form>
      <div className="button-right-margin">
        <button
          type="submit"
          className="button-background mt-4"
          disabled={!disabled}
          onClick={handleRegister}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
export default Register;
