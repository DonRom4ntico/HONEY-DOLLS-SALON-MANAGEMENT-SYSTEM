import React from "react";
import { Bell } from "lucide-react";

const register = () => {
 return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">

      {/* ====================== HEADER – #ffd36e → #f59e9e ====================== */}
      <header className="bg-gradient-to-r from-[#FFD36E] via-[#FFC0A0] to-[#F59E9E] shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo + Title */}
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

      {/* ====================== MAIN – REGISTER CARD ====================== */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl">

          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Register an Account
          </h2>

          <form className="space-y-5">

            {/* First Name, Last Name, M.I. */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  placeholder="Enter first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">M.I.</label>
                <input
                  type="text"
                  placeholder="M.I."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                placeholder="Address"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
              />
            </div>

            {/* Password + Confirm Password */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
              />
              <label className="text-sm text-pink-500 cursor-pointer">
                I agree to the Terms & Services
              </label>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition-all duration-200"
            >
              Create Account
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
              Login here
            </a>
          </p>

        </div>
      </main>

      {/* ====================== FOOTER ====================== */}
      <footer className="bg-white/80 py-3 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Visit us at Gaisano Mall | Open Daily 9:00AM – 9:00PM
          </p>
        </div>
      </footer>

    </div>
  );
}


export default register;
