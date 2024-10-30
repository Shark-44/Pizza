import { Route, Routes } from "react-router-dom";
import './App.css';
import Banner from "./components/specificPageComponents/Banner";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import OrderValidation from "./pages/OrderValidation";

function App() {
  return (
    <>
      <Banner />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Order" element={<Orders />} />
        <Route path="/Order-validation" element={<OrderValidation />} />
      </Routes>
    </>
  );
}

export default App;
