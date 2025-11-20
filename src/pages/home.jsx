// src/pages/home.jsx
import React from "react";
import { Link } from "react-router-dom";

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
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
          <Link to="/custapp" className="nav-link">Customer Appointment</Link>
          <Link to="/customerTransaction" className="nav-link">Customer Transaction</Link>
          <Link to="/prodDetails" className="nav-link">Product Details</Link>
          <Link to="/customerProd" className="nav-link">Customer Product</Link>
          <Link to="/customerMyOrder" className="nav-link">My Orders</Link>
          <Link to="/customerReturnForm" className="nav-link">Return Form</Link>
          <Link to="/customerOR" className="nav-link">Official Receipt</Link>
        </div>

        {/* STAFF */}
        <div>
          <h3 style={{ color: "#27ae60", margin: "0.5rem 0" }}>Staff</h3>
          <Link to="/staffSchedule" className="nav-link">Staff Schedule</Link>
          <Link to="/staffProdUsage" className="nav-link">Product Usage</Link>
          <Link to="/staffPos" className="nav-link">POS</Link>
        </div>

        {/* ADMIN */}
        <div>
          <h3 style={{ color: "#8e44ad", margin: "0.5rem 0" }}>Admin</h3>
          <Link to="/adminDashboard" className="nav-link">Dashboard</Link>
          <Link to="/branches" className="nav-link">Branches</Link>
        </div>

        {/* AUTH */}
        <div>
          <h3 style={{ color: "#34495e", margin: "0.5rem 0" }}>Auth</h3>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </nav>

      <style jsx>{`
        .nav-link {
          display: block;
          padding: 0.75rem 1rem;
          background: white;
          color: #2c3e50;
          text-decoration: none;
          border-radius: 8px;
          margin-bottom: 0.5rem;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.2s;
        }
        .nav-link:hover {
          background: #f39c12;
          color: white;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
};

export default Home;