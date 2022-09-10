import './App.css';
import { Route, Routes, Navigate} from "react-router-dom";
import { Navbar } from './component/Navbar';
import { HomePage } from './Pages/HomePage';
import Login from './Pages/Logins';
function App() {
  return (
    <div className=''>
      <Navbar/>
      <Routes>
      <Route exact path="/" element={HomePage} />
      <Route path="/login" element={<Login/>} />
      <Route path="/" element={<Navigate replace to="/"/>}/>
    </Routes>
    </div>
      );
}

export default App;
