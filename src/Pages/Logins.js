import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../component/Input';
import '../App.css';
import axios from 'axios';
const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [serverError, setServerError] = useState();

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const resp = await axios.post('http://localhost:8080/api/user/login', {
        email: username,
        password: password,
      });
      localStorage.setItem('token', resp.data.token);
      navigate('/');
    } catch (error) {
      setServerError(error);
    }
  };

  const disabled = username && password;
  return (
    <div className="container text-center">
      <form>
        <Input
          name="username"
          label="Username"
          onChange={(change) => {
            setUsername(change.target.value);
          }}
        ></Input>
        <Input
          name="password"
          label="Password"
          type="password"
          onChange={(change) => {
            setPassword(change.target.value);
          }}
        ></Input>
        <div className="button-rigth-margin">
          <button
            onClick={handleLogin}
            type="submit"
            className="button-background mt-4"
            disabled={!disabled}
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
