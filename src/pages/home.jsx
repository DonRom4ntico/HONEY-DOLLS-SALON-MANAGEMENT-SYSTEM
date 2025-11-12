import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <nav style={{ padding: "1rem", background: "#eee" }}>
      <Link to="/dashboard" style={{ marginRight: "1rem" }}>
        Dashboard
      </Link>
      <Link to="/login" style={{ marginRight: "1rem" }}>
        Login
      </Link>
      <Link to="/Register" style={{ marginRight: "1rem" }}>
        Register
      </Link>
      <Link to="/Custapp" style={{ marginRight: "1rem" }}>
        Customer Appointment
      </Link>
      <Link to="/CustomerTransaction" style={{ marginRight: "1rem" }}>
        Customer Transaction
      </Link>
      <Link to="/ProdDetails" style={{ marginRight: "1rem" }}>
        Customer Product Details
      </Link>
      <Link to="/CustomerProd" style={{ marginRight: "1rem" }}>
        Customer Product 
      </Link>
      <Link to="/CustomerMyOrder" style={{ marginRight: "1rem" }}>
        Customer Order
      </Link>
      <Link to="/CustomerReturnForm" style={{ marginRight: "1rem" }}>
        Customer Return
      </Link>
      <Link to="/StaffSchedule" style={{ marginRight: "1rem" }}>
        Staff Schedule
      </Link>
      <Link to="/StaffProdUsage" style={{ marginRight: "1rem" }}>
        Staff Product Usage
      </Link>
      <Link to="/StaffPos" style={{ marginRight: "1rem" }}>
        Staff POS
      </Link>
      <Link to="/CustomerOR" style={{ marginRight: "1rem" }}>
        CustomerOR
      </Link>
    </nav>
  );
};

export default Home;
