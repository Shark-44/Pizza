import { Route, Routes } from "react-router-dom";
import './App.css'

import Home from "./pages/Home";
import Orders from "./pages/Orders";

function App() {


  return (
    <>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Order" element={< Orders />} />
      </Routes>
    </>
  )
}

export default App
