import { Route, Routes } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { Navbar } from './component/Navbar';
import Login from './Pages/Logins';
import Register from './Pages/Register';
import AddVehiclePage from './Pages/AddVehiclePage';
const App = () => {
  const token = localStorage.getItem('token');
  return (
    <div>
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
