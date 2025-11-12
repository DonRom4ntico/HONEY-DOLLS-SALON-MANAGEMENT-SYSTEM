import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Custapp from "./pages/custapp";
import ProdDetails from "./pages/prodDetails";
import CustomerProd from "./pages/customerProd";
import CustomerMyOrder from "./pages/customerMyOrder";
import CustomerReturnForm from "./pages/CustomerReturnForm";
import StaffSchedule from "./pages/staffSchedule";
import StaffProdUsage from "./pages/staffProdUsage";
import StaffPOS from "./pages/staffPos";
import CustomerTransaction from "./pages/customerTransaction"
import CustomerOR from "./pages/customerOR"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/custapp" element={<Custapp />} />
        <Route path="/customerTransaction" element={<CustomerTransaction />} />
        <Route path="/prodDetails" element={<ProdDetails />} />
        <Route path="/customerProd" element={<CustomerProd />} />
        <Route path="/customerMyOrder" element={<CustomerMyOrder/>} />
        <Route path="/customerReturnForm" element={<CustomerReturnForm />} />
        <Route path="/staffSchedule" element={<StaffSchedule />} />
        <Route path="/staffProdUsage" element={<StaffProdUsage />} />
        <Route path="/staffPos" element={<StaffPOS />} />
        <Route path="/customerOR" element={<CustomerOR />} />
        
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;


