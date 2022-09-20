import './App.css';
import { BrowserRouter, Route, Routes, } from 'react-router-dom';
import Login from "./page/Login/LogIn";
import Home from "./page/Home/Home";
import '@progress/kendo-theme-default/dist/all.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {
            localStorage.getItem("token") !== null && localStorage.getItem('token')!=='' ?
              
                <Route path="/home" element={<Home />} />
              :
              <Route path="*" element={<Login />} />
          }
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
