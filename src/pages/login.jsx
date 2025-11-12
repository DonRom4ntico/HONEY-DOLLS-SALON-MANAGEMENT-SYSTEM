import React from "react";
import { Bell } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* ====================== HEADER ====================== */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e]">
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

      {/* ====================== MAIN ====================== */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-8">
            Login to Your Account
          </h2>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md text-gray-700 placeholder-gray-400 focus:outline-none focus:border-orange-400"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-400"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
                Forgot password?
              </a>
            </div>

            <button
              type="button"
              className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition-all duration-200"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-pink-500 hover:text-pink-600 font-medium">
              Register here
            </a>
          </p>
        </div>
      </main>

      <footer className="bg-white/80 py-3 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Visit us at Gaisano Mall | Open Daily 9:00AM – 9:00PM
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Login;
