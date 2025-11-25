// src/pages/Settings.jsx
import React from "react";
import CustomerLayout from "../../layout/customerLayout";
import {
  Mail,
  Lock,
  Smartphone,
  Shield,
  Globe,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Settings() {
  return (
    <CustomerLayout>
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-orange-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Manage your account and preferences
            </p>
          </div>

          <div className="space-y-6">
            {/* Account & Security */}
            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] px-8 py-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Shield className="w-6 h-6" />
                  Account & Security
                </h2>
              </div>

              <div className="p-6 space-y-5">
                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-pink-50 transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">
                        Email Address
                      </p>
                      <p className="text-sm text-gray-500">
                        alita.angel@gmail.com
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition" />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-pink-50 transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Lock className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">
                        Change Password
                      </p>
                      <p className="text-sm text-gray-500">
                        Secure your account
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition" />
                </button>

                <button className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-pink-50 transition group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">
                        Phone Number
                      </p>
                      <p className="text-sm text-gray-500">+63 917 123 4567</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition" />
                </button>
              </div>
            </div>

            {/* App Info */}
            <div className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden">
              <div className="bg-gradient-to-r from-teal-400 to-cyan-500 px-8 py-5">
                <h2 className="text-xl font-bold text-white flex items-center gap-3">
                  <Globe className="w-6 h-6" />
                  App Information
                </h2>
              </div>
              <div className="p-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">App Version</span>
                  <span className="font-medium">2.4.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-medium">November 2025</span>
                </div>
              </div>
            </div>

            {/* Log Out */}
            <div className="pt-12 text-center">
              <button className="inline-flex items-center gap-3 px-12 py-4 bg-red-500 hover:bg-red-600 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transition transform hover:scale-105">
                <LogOut className="w-6 h-6" />
                Log Out
              </button>
            </div>
          </div>
        </div>
      </main>
    </CustomerLayout>
  );
}
