import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../component/Input';
import '../App.css';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [serverError, setServerError] = useState();

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://localhost:8080/api/user/login', {
        email: username,
        password: password,
      });
      localStorage.setItem('token', resp.data.token);
      navigate('/');
      window.location.reload();
    } catch (error) {
      if(error.response.data.status == 401){
        toast.error("failed login, Unauthorized")
      }
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
      <ToastContainer position='bottom-right'
          autoClose={3000}
      />
    </div>
  );
};

export default Login;
