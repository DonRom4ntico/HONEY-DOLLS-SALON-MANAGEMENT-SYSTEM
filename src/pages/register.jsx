// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    firstname: "",
    lastname: "",
    contact: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${API_BASE}/customer/register`,
        formData
      );
      const { user, token } = response.data;

      // Save JWT and user info to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#FFD36E] via-[#FFC0A0] to-[#F59E9E] shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="./src/assets/logos.png"
              alt="Honey Dolls & Brilliant Beauty Hub"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-orange-900">
                Honey Dolls & Brilliant
              </h1>
              <p className="text-sm text-orange-800 font-medium">
                Beauty Hub — Davao
              </p>
            </div>
          </div>
          <Bell className="w-7 h-7 text-yellow-600" />
        </div>
      </header>

      {/* Main Register Form */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Register an Account
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
              <input
                type="text"
                name="contact"
                placeholder="Contact"
                value={formData.contact}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md"
              />
            </div>

            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md"
            />

            <button
              type="submit"
              g
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition-all duration-200"
            >
              {loading ? "Registering..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-500 hover:text-pink-600 font-medium"
            >
              Login here
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
