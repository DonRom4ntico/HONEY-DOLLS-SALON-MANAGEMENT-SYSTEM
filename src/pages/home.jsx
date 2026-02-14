// src/pages/home.jsx
import React from "react";
import { Link } from "react-router-dom";

const navLinkStyle = {
  display: "block",
  padding: "0.75rem 1rem",
  background: "white",
  color: "#2c3e50",
  textDecoration: "none",
  borderRadius: "8px",
  marginBottom: "0.5rem",
  fontWeight: 500,
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
  transition: "all 0.2s",
  cursor: "pointer",
};

const Home = () => {
  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#d35400", marginBottom: "1.5rem" }}>
        Honey Dolls & Brilliant — Beauty Hub
      </h1>
      <nav
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          background: "#fdf2e9",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        {/* CUSTOMER */}
        <div>
          <h3 style={{ color: "#e67e22", margin: "0.5rem 0" }}>Customer</h3>
          <Link to="/dashboard" style={navLinkStyle}>
            Dashboard
          </Link>
          <Link to="/custapp" style={navLinkStyle}>
            Customer Appointment
          </Link>
          <Link to="/customerTransaction" style={navLinkStyle}>
            Customer Transaction
          </Link>
          <Link to="/prodDetails" style={navLinkStyle}>
            Product Details
          </Link>
          <Link to="/customerProd" style={navLinkStyle}>
            Customer Product
          </Link>
          <Link to="/customerMyOrder" style={navLinkStyle}>
            My Orders
          </Link>
          <Link to="/customerReturnForm" style={navLinkStyle}>
            Return Form
          </Link>
          <Link to="/customerOR" style={navLinkStyle}>
            Official Receipt
          </Link>
        </div>

        {/* STAFF */}
        <div>
          <h3 style={{ color: "#27ae60", margin: "0.5rem 0" }}>Staff</h3>
          <Link to="/staffSchedule" style={navLinkStyle}>
            Staff Schedule
          </Link>
          <Link to="/staffProdUsage" style={navLinkStyle}>
            Product Usage
          </Link>
          <Link to="/staffPos" style={navLinkStyle}>
            POS
          </Link>
        </div>

        {/* ADMIN */}
        <div>
          <h3 style={{ color: "#8e44ad", margin: "0.5rem 0" }}>Admin</h3>
          <Link to="/adminDashboard" style={navLinkStyle}>
            Dashboard
          </Link>
        </div>

        {/* AUTH */}
        <div>
          <h3 style={{ color: "#34495e", margin: "0.5rem 0" }}>Auth</h3>
          <Link to="/login" style={navLinkStyle}>
            Login
          </Link>
          <Link to="/register" style={navLinkStyle}>
            Register
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;
