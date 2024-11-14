import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from 'react';
import './App.css';

import Home from "./pages/Home";
import Orders from "./pages/Orders";
import OrderValidation from "./pages/OrderValidation";
import Admin from "./pages/Admin";
import CreateUser from "./pages/CreateUser";
import CreateProduct from "./pages/CreateProduct";
import UpdatePrice from "./pages/UpdatePrice";
import OrderHistory from "./pages/OrderHistory";
import Navbar from "./components/specificPageComponents/Navbar";
//import Test from "./pages/test";


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

  const showNavbar = location.pathname !== "/" && location.pathname !== "/Order" && location.pathname !== "/Order-validation";
  return (
    <>
       {showNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={<Orders />} />
        <Route path="/Order-validation" element={<OrderValidation />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin-createuser" element={<CreateUser />} />
        <Route path="/admin-createproduct" element={<CreateProduct />} />
        <Route path="/admin-updateprice" element={<UpdatePrice />} />
        <Route path="/admin-orderhistory" element={<OrderHistory />} />
        {/*<Route path="/test" element={<Test />} />*/}
      </Routes>
    </>
  );
}

export default App;
