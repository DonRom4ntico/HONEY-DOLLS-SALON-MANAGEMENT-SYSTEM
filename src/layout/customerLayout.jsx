// src/layout/CustomerLayout.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  User, 
  ShoppingCart, 
  Package, 
  Settings, 
  LogOut, 
  ChevronDown,
  Calendar, 
  Menu,
  X
} from "lucide-react";

export default function CustomerLayout({ children }) {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const userName = "Jana Mae";

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Home", path: "/dashboard" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/customerProd" },
  ];

  return (
    <div className="min-h-screen text-gray-900 font-sans">

      {/* NAVBAR */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">

          {/* LEFT: LOGO + TITLE */}
          <div className="flex items-center gap-4">
            {/* MOBILE BURGER */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden text-orange-900"
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>

            {/* LOGO + BRAND */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <span className="text-orange-600 font-bold text-xl">HD</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-orange-900">Honey Dolls & Brilliant</h1>
                <p className="text-sm text-orange-800 font-medium">Beauty Hub — Davao</p>
              </div>
            </div>
          </div>

          {/* DESKTOP NAV */}
          <nav className="flex items-center gap-10 text-base font-semibold text-orange-900">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative transition-all ${isActive(link.path) ? "text-yellow-700 font-bold" : "hover:text-yellow-600"}`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-500 rounded-full"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* PROFILE + DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src="/src/assets/nigga.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.src = "https://via.placeholder.com/80/ffcdd2/000000?text=U"; }}
                />
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-white transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} 
              />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-4 -mr-3 w-64 bg-white rounded-xl shadow-2xl border border-pink-100 z-50 overflow-hidden">
                  <div className="py-4 px-5 bg-gradient-to-r from-pink-50 to-pink-100 border-b border-pink-200">
                    <p className="text-sm text-pink-700 font-medium">Signed in as</p>
                    <p className="text-lg font-bold text-pink-900">{userName}</p>
                  </div>
                  <div className="py-2">
                    <Link to="/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-4 px-6 py-3 hover:bg-pink-50 text-gray-800 transition">
                      <User className="w-5 h-5" /> <span>Profile</span>
                    </Link>
                    <Link to="/myAppointment" onClick={() => setDropdownOpen(false)} className="flex items-center gap-4 px-6 py-3 hover:bg-pink-50 text-gray-800 transition">
                      <Calendar className="w-5 h-5" /> <span>My Appointments</span>
                    </Link>
                    <Link to="/customerTransaction" onClick={() => setDropdownOpen(false)} className="flex items-center gap-4 px-6 py-3 hover:bg-pink-50 text-gray-800 transition">
                      <ShoppingCart className="w-5 h-5" /> <span>My Cart</span>
                    </Link>
                    <Link to="/customerMyOrder" onClick={() => setDropdownOpen(false)} className="flex items-center gap-4 px-6 py-3 hover:bg-pink-50 text-gray-800 transition">
                      <Package className="w-5 h-5" /> <span>Orders</span>
                    </Link>
                    <Link to="/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-4 px-6 py-3 hover:bg-pink-50 text-gray-800 transition">
                      <Settings className="w-5 h-5" /> <span>Settings</span>
                    </Link>

                    <hr className="my-3 border-pink-100" />

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        alert("Logged out successfully!");
                      }}
                      className="w-full flex items-center gap-4 px-6 py-3 hover:bg-red-50 text-red-600 font-medium transition text-left"
                    >
                      <LogOut className="w-5 h-5" /> <span>Log out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] px-6 pb-4">
            <nav className="flex flex-col gap-4 text-base font-semibold text-orange-900 mt-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`relative transition-all ${isActive(link.path) ? "text-yellow-700 font-bold" : "hover:text-yellow-600"}`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-1 bg-yellow-500 rounded-full"></span>
                  )}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="pt-0">
        {children}
      </main>
    </div>
  );
}
