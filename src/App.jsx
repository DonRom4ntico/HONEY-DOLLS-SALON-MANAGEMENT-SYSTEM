import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import "./App.css";

import Dashboard from "./pages/customer/dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/authentication/login";
import Register from "./pages/authentication/register";
import Custapp from "./pages/customer/custapp";
import ProdDetails from "./pages/customer/prodDetails";
import CustomerProd from "./pages/customer/customerProd";
import CustomerMyOrder from "./pages/customer/customerMyOrder";
import CustomerReturnForm from "./pages/customer/customerReturnForm";
import StaffSchedule from "./pages/staff/staffSchedule";
import StaffProdUsage from "./pages/staff/staffProdUsage";
import StaffPOS from "./pages/staff/staffPos";
import CustomerTransaction from "./pages/customer/CustomerTransaction";
import CustomerOR from "./pages/customer/customerOR";
import Branches from "./pages/branches";

import AdminDashboard from "./pages/admin/adminDashboard";
import AdminStaffSchedule from "./pages/admin/adminStaffSchedule";
import AdminProductTransfer from "./pages/admin/adminProductTransfer";
import AdminProductSold from "./pages/admin/adminProductSold";
import AdminProductWaste from "./pages/admin/adminProductWaste";
import AdminProductUsage from "./pages/admin/adminProductUsage";   
import RecordProductWaste from "./pages/recordProductWaste";
import CustomerReturnedProducts from "./pages/admin/Return/customerReturnedProducts";
import AdminProductDamage from "./pages/admin/adminProductDamage";
import AdminAnnouncement from "./pages/admin/adminAnnouncement";

import SupplierPurchaseRecord from "./pages/supplierPurRecord";
import MyAppointment from "./pages/customer/myAppointment";
import About from "./pages/customer/about";
import Profile from "./pages/account/profile";
import Settings from "./pages/account/settings";
import Transaction from "./pages/admin/actions/Transaction";
import SupplierPurchases from "./pages/admin/actions/supplierPurchases";
import ProductDisplay from "./pages/productDisplay";

import Inventory from "./pages/admin/actions/inventory"; // keep only once
import ServiceDisplay from "./pages/serviceDisplay";
import SupplierReturn from "./pages/admin/Return/supplierReturn";
import BranchReturn from "./pages/admin/Return/branchReturn";

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
        <Route path="/adminProductTransfer" element={<AdminProductTransfer />} />
        <Route path="/adminProductSold" element={<AdminProductSold />} />
        <Route path="/adminProductWaste" element={<AdminProductWaste />} />
        <Route path="/adminProductUsage" element={<AdminProductUsage />} />

        <Route path="/recordProductWaste" element={<RecordProductWaste />} />
        <Route path="/customerReturnedProducts" element={<CustomerReturnedProducts />} />
        <Route path="/adminProductDamage" element={<AdminProductDamage />} />
        <Route path="/adminAnnouncement" element={<AdminAnnouncement />} />

        <Route path="/supplierPurRecord" element={<SupplierPurchaseRecord />} />
        <Route path="/myAppointment" element={<MyAppointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/Transaction" element={<Transaction />} />
        <Route path="/supplierPurchases" element={<SupplierPurchases />} />

        <Route path="/productDisplay" element={<ProductDisplay />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/serviceDisplay" element={<ServiceDisplay />} />
        <Route path="/supplierReturn" element={<SupplierReturn />} />
        <Route path="/branchReturn" element={<BranchReturn />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
