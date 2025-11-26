import { useState } from "react";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard";
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
import CustomerTransaction from "./pages/customerTransaction";
import CustomerOR from "./pages/customerOR";
import Branches from "./pages/branches";
import AdminDashboard from "./pages/adminDashboard";
import AdminStaffSchedule from "./pages/adminStaffSchedule";
import AdminProductTransfer from "./pages/adminProductTransfer";
import AdminProductSold from "./pages/adminProductSold";
import AdminProductWaste from "./pages/adminProductWaste";
import AdminProductUsage from "./pages/adminProductUsage";
import RecordProductWaste from "./pages/recordProductWaste";
import CustomerReturnedProducts from "./pages/customerReturnedProducts";
import AdminProductDamage from "./pages/adminProductDamage";
import AdminAnnouncement from "./pages/adminAnnouncement";
import AdminDisplayProduct from "./pages/adminDisplayProduct";
import MyAppointment from "./pages/myAppointment";
import About from "./pages/about";
import Profile from "./pages/profile";
import Settings from "./pages/settings";
import Transaction from "./pages/Transaction";
import Inventory from "./pages/inventory";
import SupplierPurchases from "./pages/supplierPurchases";
import SupplierReturn from "./pages/supplierReturn";
import BranchReturn from "./pages/branchReturn";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/custapp" element={<Custapp />} />
        <Route path="/customerTransaction" element={<CustomerTransaction />} />
        <Route path="/prodDetails" element={<ProdDetails />} />
        <Route path="/customerProd" element={<CustomerProd />} />
        <Route path="/customerMyOrder" element={<CustomerMyOrder />} />
        <Route path="/customerReturnForm" element={<CustomerReturnForm />} />
        <Route path="/staffSchedule" element={<StaffSchedule />} />
        <Route path="/staffProdUsage" element={<StaffProdUsage />} />
        <Route path="/staffPos" element={<StaffPOS />} />
        <Route path="/customerOR" element={<CustomerOR />} />
        <Route path="/branches" element={<Branches />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/adminStaffSchedule" element={<AdminStaffSchedule />} />
        <Route
          path="/adminProductTransfer"
          element={<AdminProductTransfer />}
        />
        <Route path="/adminProductSold" element={<AdminProductSold />} />
        <Route path="/adminProductWaste" element={<AdminProductWaste />} />
        <Route path="/adminProductUsage" element={<AdminProductUsage />} />
        <Route path="/recordProductWaste" element={<RecordProductWaste />} />
        <Route
          path="/customerReturnedProducts"
          element={<CustomerReturnedProducts />}
        />
        <Route path="/adminProductDamage" element={<AdminProductDamage />} />
        <Route path="/adminAnnouncement" element={<AdminAnnouncement />} />
        <Route path="/adminDisplayProduct" element={<AdminDisplayProduct />} />
        <Route path="/myAppointment" element={<MyAppointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/adminProductUsage" element={<AdminProductUsage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/supplierPurchases" element={<SupplierPurchases />} />
        <Route path="/supplierReturn" element={<SupplierReturn />} />
        <Route path="/branchReturn" element={<BranchReturn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
