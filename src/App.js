import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './component/Navbar';
import { HomePage } from './Pages/HomePage';
import { UpNav } from './component/UpNav';
import Login from './Pages/Logins';
import AdminPage from './Pages/AdminPage';
<<<<<<< HEAD
<<<<<<< HEAD
import Register from './Pages/Register';
import AddVehiclePage from './Pages/AddVehiclePage';
function App(props) {
=======
=======
>>>>>>> c834d40 (sad)
function App() {
>>>>>>> c834d40 (sad)
  return (
    <div className="">
      <UpNav />
      <Navbar />
      <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route exact path="/dashboard" element={<AdminPage/>} />
      <Route path="/" element={<Navigate replace to="/"/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/addVehicle' element={<AddVehiclePage/>}/>
    </Routes>
    </div>
  );
}

export default App;
