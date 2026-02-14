import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/customer/dashboard";

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
import StaffLogin from "./pages/staff/staffLogin";

import AddAdmin from "./pages/admin/Actions/addAdmin";
import AddStaff from "./pages/admin/Actions/addStaff";
import AdminLogin from "./pages/admin/adminLogin";
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
import AdminSales from "./pages/admin/adminSales";

import SupplierPurchaseRecord from "./pages/admin/Actions/supplierPurRecord";

import MyAppointment from "./pages/customer/myAppointment";
import About from "./pages/customer/about";
import Profile from "./pages/account/profile";
import Settings from "./pages/account/settings";
import Transaction from "./pages/admin/actions/Transaction";
import SupplierPurchases from "./pages/admin/Actions/supplierPurchases";
import ProductDisplay from "./pages/productDisplay";

import Inventory from "./pages/admin/actions/inventory"; // keep only once
import ServiceDisplay from "./pages/admin/Actions/serviceDisplay";
import SupplierReturn from "./pages/admin/Return/supplierReturn";
import BranchReturn from "./pages/admin/Return/branchReturn";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/custapp"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <Custapp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customerTransaction"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerTransaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prodDetails"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <ProdDetails />
            </ProtectedRoute>
          }
        />
        <Route path="/customerProd" element={<CustomerProd />} />
        <Route
          path="/customerMyOrder"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerMyOrder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customerReturnForm"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerReturnForm />
            </ProtectedRoute>
          }
        />

        <Route path="/staffLogin" element={<StaffLogin />} />
        <Route
          path="/staffSchedule"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staffProdUsage"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffProdUsage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/staffPos"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffPOS />
            </ProtectedRoute>
          }
        />

        <Route
          path="/customerOR"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerOR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/branches"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <Branches />
            </ProtectedRoute>
          }
        />

        <Route
          path="/addAdmin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/addStaff"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AddStaff />
            </ProtectedRoute>
          }
        />
        <Route path="/adminLogin" element={<AdminLogin />} />
        <Route
          path="/adminDashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminStaffSchedule"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminStaffSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminProductTransfer"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProductTransfer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminProductSold"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProductSold />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminProductWaste"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProductWaste />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminProductUsage"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProductUsage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recordProductWaste"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <RecordProductWaste />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customerReturnedProducts"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CustomerReturnedProducts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminProductDamage"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminProductDamage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminAnnouncement"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminAnnouncement />
            </ProtectedRoute>
          }
        />

        <Route path="/supplierPurrecord" element={<SupplierPurchaseRecord />} />
        <Route path="/myAppointment" element={<MyAppointment />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["customer", "staff", "admin"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["customer", "staff", "admin"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Transaction"
          element={
            <ProtectedRoute allowedRoles={["customer", "staff", "admin"]}>
              <Transaction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplierPurchases"
          element={
            <ProtectedRoute allowedRoles={["customer", "staff", "admin"]}>
              <SupplierPurchases />
            </ProtectedRoute>
          }
        />

        <Route
          path="/productDisplay"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ProductDisplay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Inventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/serviceDisplay"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ServiceDisplay />
            </ProtectedRoute>
          }
        />
        <Route
          path="/supplierReturn"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <SupplierReturn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/branchReturn"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <BranchReturn />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminSales"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSales />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
