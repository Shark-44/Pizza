import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import './App.css';
import Banner from "./components/specificPageComponents/Banner";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import OrderValidation from "./pages/OrderValidation";
import Admin from "./pages/Admin";
import CreateUser from "./pages/CreateUser";

function App() {
  const [, setAdminVisible] = useState(false);
  const navigate = useNavigate();  
  const location = useLocation();  
  useEffect(() => {
    const handleKeydown = (e: { altKey: any; shiftKey: any; key: string; }) => {
      if (e.altKey && e.shiftKey && e.key === 'B') {
        setAdminVisible(true);
        navigate("/admin");  
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [navigate]);

  return (
    <>
      {location.pathname !== "/admin" && <Banner />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={<Orders />} />
        <Route path="/Order-validation" element={<OrderValidation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-createuser" element={<CreateUser />} />
      </Routes>
    </>
  );
}

export default App;
