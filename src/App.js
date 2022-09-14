import './App.css';
import { Route, Routes, Navigate} from "react-router-dom";
import { Navbar } from './component/Navbar';
import { HomePage } from './Pages/HomePage';
import { UpNav } from './component/UpNav';
import Login from './Pages/Logins';
import AdminPage from './Pages/AdminPage';
function App() {
  return (
    <div className=''>
      <UpNav/>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={<HomePage/>} />
      <Route path="/login" element={<Login/>} />
      <Route exact path="/dashboard" element={<AdminPage/>} />
      <Route path="/" element={<Navigate replace to="/"/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </div>
      );
}

export default App;
