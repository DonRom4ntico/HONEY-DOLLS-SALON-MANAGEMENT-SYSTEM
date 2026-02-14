// src/layout/StaffLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
  Bell,
  ShoppingCart,
  Package,
  Calendar,
  Menu,
  X,
} from "lucide-react";

export default function StaffLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [loading, setLoading] = useState(true);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Schedule", path: "/staffSchedule" },
    { name: "Usage", path: "/staffProdUsage" },
    { name: "POS", path: "/staffPOS" },
  ];

  // 🔥 FETCH STAFF NAME FROM API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:3000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setStaffName(res.data.fullName);
      } catch (err) {
        console.error(
          "Failed to fetch staff:",
          err.response?.data || err.message,
        );
        setStaffName("Staff");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const goTo = (path) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans">
      <nav className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            <div className="flex items-center sm:mr-64 gap-3 flex-shrink-0">
              <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-full shadow-md">
                <img
                  src="/src/assets/mainlogo.jpg"
                  alt="Logo"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="sm:flex flex-col">
                <h1 className="font-bold text-m sm:text-xl text-orange-900">
                  Honey Dolls & Brilliant
                </h1>
                <p className="text-xs text-orange-800">Beauty Hub — Davao</p>
              </div>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-semibold text-m transition-all ${
                  isActive(link.path)
                    ? "text-white border-b-2 border-white"
                    : "text-white hover:text-yellow-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-10">
            <Bell className="w-6 h-6 text-yellow-600" />

            {/* PROFILE DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md">
                  <img
                    src="/src/assets/nigga.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
                <p className="hidden sm:flex font-bold text-pink-900">
                  {loading ? "Loading..." : staffName}
                </p>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-4 w-64 bg-white rounded-xl shadow-2xl border border-pink-100 z-50 overflow-hidden">
                    <div className="py-4 px-5 bg-gradient-to-r from-pink-50 to-pink-100 border-b border-pink-200">
                      <p className="text-sm text-pink-700 font-medium">
                        Signed in as
                      </p>
                      <p className="text-lg font-bold text-pink-900">
                        {loading ? "Loading..." : staffName}
                      </p>
                    </div>

                    <div className="py-2">
                      <Link
                        to="/staffProfile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-4 px-6 py-3 hover:bg-pink-50"
                      >
                        <User className="w-5 h-5" /> Profile
                      </Link>

                      <Link
                        to="/staffAppointments"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-4 px-6 py-3 hover:bg-pink-50"
                      >
                        <Calendar className="w-5 h-5" /> Appointments
                      </Link>

                      <hr className="my-3 border-pink-100" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-6 py-3 hover:bg-red-50 text-red-600 font-medium text-left"
                      >
                        <LogOut className="w-5 h-5" /> Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}
