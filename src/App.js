import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './component/Navbar';
import { HomePage } from './Pages/HomePage';
import { UpNav } from './component/UpNav';
import Login from './Pages/Logins';
import Register from './Pages/Register';
import AddVehiclePage from './Pages/AddVehiclePage';
import { useState } from 'react';
const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <div className="">
      <UpNav />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />

        {!token && <Route path="/login" element={<Login />} />}
        {token && <Route path="/register" element={<Register />} />}
        {token && <Route path="/addVehicle" element={<AddVehiclePage />} />}
      </Routes>
    </div>
  );
};

export default App;
