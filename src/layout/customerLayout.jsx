// src/layout/CustomerLayout.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  User,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  ChevronDown,
  Calendar,
  Menu,
  Bell,
  X,
} from "lucide-react";

export default function CustomerLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userName, setUserName] = useState(""); // dynamic
  const [loading, setLoading] = useState(true); // loading state

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/customerProd" },
    { name: "Appointment", path: "/custapp" },
  ];

  // Fetch logged-in user info
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

        setUserName(res.data.fullName);
      } catch (err) {
        console.error(
          "Failed to fetch user:",
          err.response?.data || err.message,
        );
        setUserName("Guest");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Close dropdowns & mobile menu
    setDropdownOpen(false);
    setMobileMenuOpen(false);

    // Redirect to login page
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen text-gray-900 font-sans">
      <nav className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-md sticky top-0 z-50">
        <div className="max-w-8xl px-4 sm:px-6 py-4 flex items-center relative">
          {/* LOGO + BRAND */}
          <div className="flex items-center sm:mr-64 gap-3 flex-shrink-0">
            <div className="w-10 h-10 sm:w-16 sm:h-16 bg-white rounded-full flex items-center justify-start shadow-md">
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

          {/* DESKTOP NAV LINKS */}
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

          {/* PROFILE + MOBILE MENU */}
          <div className="ml-auto flex items-center gap-4">
            <Bell className="w-6 h-6 text-yellow-600 cursor-pointer" />

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
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80/ffcdd2/000000?text=U";
                    }}
                  />
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
                <p className="hidden sm:flex font-bold text-pink-900">
                  {loading ? "Loading..." : userName}
                </p>
              </button>

              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-pink-100 z-50 overflow-hidden">
                    <div className="bg-gradient-to-r from-pink-50 to-pink-100 px-5 py-3 border-b border-pink-200 flex-col sm:flex ">
                      <p className="text-xs text-pink-700 font-medium">
                        Signed in as
                      </p>
                      <p className="font-bold text-pink-900">
                        {loading ? "Loading..." : userName}
                      </p>
                    </div>
                    <div className="py-2">
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-2 hover:bg-pink-50 text-gray-800 transition text-sm"
                      >
                        <User className="w-4 h-4" /> Profile
                      </Link>
                      <Link
                        to="/myAppointment"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-2 hover:bg-pink-50 text-gray-800 transition text-sm"
                      >
                        <Calendar className="w-4 h-4" /> My Appointments
                      </Link>
                      <Link
                        to="/customerTransaction"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-2 hover:bg-pink-50 text-gray-800 transition text-sm"
                      >
                        <ShoppingCart className="w-4 h-4" /> My Cart
                      </Link>
                      <Link
                        to="/customerMyOrder"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-2 hover:bg-pink-50 text-gray-800 transition text-sm"
                      >
                        <Package className="w-4 h-4" /> Orders
                      </Link>
                      <Link
                        to="/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-5 py-2 hover:bg-pink-50 text-gray-800 transition text-sm"
                      >
                        <Settings className="w-4 h-4" /> Settings
                      </Link>
                      <hr className="my-2 border-pink-100" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-2 hover:bg-red-50 text-red-600 font-medium text-sm text-left"
                      >
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-orange-900"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6 -ml-4" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE NAV MENU */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white bg-opacity-95 border-t border-orange-200">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-semibold text-sm transition ${
                    isActive(link.path)
                      ? "bg-orange-100 text-orange-900"
                      : "text-gray-800 hover:bg-orange-50"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-0">{children}</main>
    </div>
  );
}
