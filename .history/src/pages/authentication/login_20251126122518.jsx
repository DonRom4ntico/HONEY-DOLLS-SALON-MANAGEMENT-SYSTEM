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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE}/user/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
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

          {/* Right Side: Bell + Staff + Admin Buttons */}
          <div className="flex items-center gap-3">

            <Bell className="w-7 h-7 text-yellow-600" />

            {/* Staff Login Button */}
            <div className="relative group">
              <button
                onClick={() => navigate("/staffLogin")}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-orange-900 font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-white/30"
              >
                <Users className="w-5 h-5" />
                <span className="hidden sm:inline">Staff Login</span>
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Staff Portal Access
              </div>
            </div>

            {/* Admin Login Button */}
            <div className="relative group">
              <button
                onClick={() => navigate("/adminLogin")}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-orange-900 font-semibold px-4 py-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-white/30"
              >
                <Shield className="w-5 h-5" />
                <span className="hidden sm:inline">Admin Login</span>
              </button>
              <div className="absolute right-0 top-full mt-2 bg-gray-800 text-white text-xs rounded px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                Admin Portal (Restricted)
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* ====================== MAIN - Customer Login ====================== */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md border border-pink-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Customer Login</h2>
            <p className="text-gray-600 mt-2">Welcome back! Sign in to book your appointment</p>
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
                <input type="checkbox" className="w-4 h-4 text-pink-500 rounded" />
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
              Login as Customer
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              New here?{" "}
              <a href="/register" className="text-pink-600 font-semibold hover:underline">
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
            Honey Dolls • Brilliant Beauty Hub — Davao | Gaisano Mall | Open Daily 9:00AM – 9:00PM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;