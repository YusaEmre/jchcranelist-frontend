import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Navbar } from './component/Navbar';
import { HomePage } from './Pages/HomePage';
import { UpNav } from './component/UpNav';
import Login from './Pages/Logins';
import Register from './Pages/Register';
function App() {
  const token = localStorage.getItem('token');
  console.log(token);
  return (
    <div className="">
      <UpNav />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
