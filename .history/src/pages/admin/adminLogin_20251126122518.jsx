// src/pages/AdminLogin.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Bell, Shield, ArrowLeft } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(`${API_BASE}/user/login`, {
        email,
        password,
        role: "admin",
      });

      if (res.data.user.role !== "admin") {
        setError("Access denied. Admin privileges required.");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "Invalid admin credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 flex flex-col">
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

          <div className="flex items-center gap-5">
            <Bell className="w-7 h-7 text-yellow-700" />
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 bg-white/25 hover:bg-white/40 text-orange-900 font-medium px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/40 transition-all hover:shadow-md"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Customer Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-10">
            {/* Title + Shield */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full shadow-xl mb-5">
                <Shield className="w-14 h-14 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800">Admin Login</h1>
              <p className="text-gray-600 mt-2 text-lg">Management Portal Access</p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-xl text-center font-medium">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-7">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Admin Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@honeybrilliant.com"
                  className="w-full px-5 py-4 bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all placeholder-gray-400 font-medium"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-5 py-4 bg-white/70 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition-all placeholder-gray-400 font-medium"
                  required
                  disabled={loading}
                />
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="text-pink-600 hover:text-pink-700 font-medium text-sm hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* SAME COLOR LOGIN BUTTON AS CUSTOMER */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Logging in...
                  </span>
                ) : (
                  "Login as Administrator"
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-xs text-gray-500">
              <p>Only authorized salon administrators can access this portal.</p>
            </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white/70 backdrop-blur-sm py-5 border-t">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-gray-700 font-medium">
            © 2025 Honey Dolls • Brilliant Beauty Hub — Davao
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;