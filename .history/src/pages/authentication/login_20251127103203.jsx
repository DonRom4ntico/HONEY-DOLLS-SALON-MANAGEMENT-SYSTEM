import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, Shield, Users } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("customer"); // customer, staff, admin

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let endpoint = "/user/login"; // default customer
      if (userType === "staff") endpoint = "/staff/login";
      if (userType === "admin") endpoint = "/admin/login";

      const res = await axios.post(`${API_BASE}${endpoint}`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate based on role
      if (userType === "customer") navigate("/dashboard");
      if (userType === "staff") navigate("/staffDashboard");
      if (userType === "admin") navigate("/adminDashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* ====================== HEADER ====================== */}
      <header className="relative bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-md">
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

          {/* Right Side: Bell + Login Type Toggle */}
          <div className="flex items-center gap-3">
            <Bell className="w-7 h-7 text-yellow-600" />

            {/* Customer */}
            <button
              onClick={() => setUserType("customer")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                userType === "customer"
                  ? "bg-white text-orange-900 shadow-lg"
                  : "bg-white/20 text-orange-800"
              }`}
            >
              Customer
            </button>

            {/* Staff */}
            <button
              onClick={() => setUserType("staff")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                userType === "staff"
                  ? "bg-white text-orange-900 shadow-lg"
                  : "bg-white/20 text-orange-800"
              }`}
            >
              Staff
            </button>

            {/* Admin */}
            <button
              onClick={() => setUserType("admin")}
              className={`px-4 py-2 rounded-full font-semibold transition ${
                userType === "admin"
                  ? "bg-white text-orange-900 shadow-lg"
                  : "bg-white/20 text-orange-800"
              }`}
            >
              Admin
            </button>
          </div>
        </div>
      </header>

      {/* ====================== MAIN LOGIN FORM ====================== */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md border border-pink-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
            </h2>
            <p className="text-gray-600 mt-2">
              Welcome back! Sign in to continue
            </p>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center bg-red-50 py-2 rounded mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-400 transition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-400 transition"
                required
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-pink-500 rounded"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-pink-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New here?{" "}
              <a
                href="/register"
                className="text-pink-600 font-semibold hover:underline"
              >
                Create an account
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 py-4 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-xs text-gray-600">
            Honey Dolls • Brilliant Beauty Hub — Davao | Gaisano Mall | Open
            Daily 9:00AM – 9:00PM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
