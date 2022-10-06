import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import Input from '../component/Input';
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
      localStorage.setItem('token', resp.data.accessToken);
      localStorage.setItem('refreshToken', resp.data.refreshToken);
      localStorage.setItem('user', resp.data.userName);
      
      window.location.replace('/');
    } catch (error) {
      if (error.response.data.status == 401) {
        toast.error('failed login, Unauthorized');
      }
      setServerError(error);
    }
  };

  const disabled = username && password;
  return (
    <div className="container text-center mt-5 w-50 d-flex justify-content-center">
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
            className="btn btn-primary mt-4"
            disabled={!disabled}
          >
            Sign In
          </button>
        </div>
      </form>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </div>
  );
};

export default Login;
