import React, { useState } from "react";
import { Bell } from "lucide-react";
import logo from "../assets/logos.png";

const Custapp = () => {
  const [formData, setFormData] = useState({
    date: "2025-10-25",
    time: "10:30",
    services: ["Haircut & Styling", "Manicure / Pedicure"],
    staff: "Anna (preferred)",
    recurrence: "None", // Changed to match screenshot
    smsReminder: true,
    agree: false,
  });

  const servicesList = [
    "Haircut & Styling",
    "Manicure / Pedicure",
    "Facial / Spa",
    "Eyelash Extension",
  ];

  const toggleService = (service) => {
    const updatedServices = formData.services.includes(service)
      ? formData.services.filter((s) => s !== service)
      : [...formData.services, service];
    setFormData({ ...formData, services: updatedServices });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  // Format recurrence to match screenshot
  const formatRecurrence = () => {
    if (formData.recurrence === "None") return "None — One-time appointment";
    if (formData.recurrence === "Weekly") return "Weekly — Every Sat (4x)";
    return formData.recurrence;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="Honey Dolls Logo"
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
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-yellow-600" />
            <span className="text-orange-900 font-medium text-sm hidden sm:inline">
              Welcome, Keoski <span className="text-yellow-600">Hand Wave</span>
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 px-6 py-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          {/* LEFT FORM - 2/3 width */}
          <section className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Schedule Your Visit
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Date
                </label>
                <select
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                >
                  <option value="2025-10-25">Oct 25, 2025</option>
                  {/* Add more dates as needed */}
                </select>
              </div>

              {/* Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Time
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                >
                  <option value="10:30">10:30 AM</option>
                  {/* Add more times */}
                </select>
              </div>
            </div>

            {/* Services */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Choose Services
              </label>
              <div className="space-y-2">
                {servicesList.map((service) => (
                  <label key={service} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => toggleService(service)}
                      className="w-4 h-4 text-orange-500 rounded"
                    />
                    {service}
                  </label>
                ))}
              </div>
            </div>

            {/* Staff & Recurrence */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Staff
                </label>
                <select
                  name="staff"
                  value={formData.staff}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                >
                  <option>Select Staff</option>
                  <option>Anna (preferred)</option>
                  <option>Mariel</option>
                  <option>Jessa</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recurrence
                </label>
                <select
                  name="recurrence"
                  value={formData.recurrence}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-700"
                >
                  <option value="None">None</option>
                  <option value="Daily">Daily — Every day at chosen time</option>
                  <option value="Weekly">Weekly — Every week (e.g. Saturday)</option>
                  <option value="Monthly">Monthly — Same day each month</option>
                  <option value="Custom">Custom — Repeat N times</option>
                </select>
              </div>
            </div>

            {/* Repeat Options Info */}
            <div className="bg-orange-50 border border-orange-200 text-sm text-gray-700 p-4 rounded-lg mb-6">
              <p className="font-semibold mb-1">Repeat options</p>
              <ul className="list-disc list-inside space-y-0.5 text-xs">
                <li>None — One-time appointment</li>
                <li>Daily — Every day at chosen time</li>
                <li>Weekly — Every week (e.g. Saturday)</li>
                <li>Monthly — Same day each month</li>
                <li>Custom — Repeat N times</li>
              </ul>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-col sm:flex-row gap-4 text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="smsReminder"
                  checked={formData.smsReminder}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                Send SMS reminder (24h before)
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                  className="w-4 h-4 text-orange-500 rounded"
                />
                Agree to policies
              </label>
            </div>
          </section>

          {/* RIGHT SUMMARY - STICKY & FIXED WIDTH */}
          <aside className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 h-fit sticky top-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment Summary
            </h2>

            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Service(s):</strong>{" "}
                {formData.services.join(", ")}
              </p>
              <p>
                <strong>Date:</strong> {formatDate(formData.date)}
              </p>
              <p>
                <strong>Time:</strong> {formData.time} AM
              </p>
              <p>
                <strong>Staff:</strong> {formData.staff}
              </p>
              <p>
                <strong>Recurrence:</strong> {formatRecurrence()}
              </p>
              <p>
                <strong>Branch:</strong> Gaisano Mall of Davao
              </p>
              <p>
                <strong>Reminder:</strong> SMS 24h before
              </p>
              <p>
                <strong>Notes:</strong> No metallic hair products
              </p>
              <p className="font-semibold text-right text-gray-800 mt-4 pt-2 border-t border-gray-200">
                Estimated Total:{" "}
                <span className="text-gray-900 font-bold text-lg">₱1,200</span>
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <button className="w-full py-2.5 rounded-md bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-medium shadow-sm hover:shadow-md transition-all">
                Edit Details
              </button>
              <button className="w-full py-2.5 rounded-md bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all">
                Finalize Booking
              </button>
            </div>
          </aside>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white/80 py-3 border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Open Daily 9:00AM–9:00PM | Call (0934) 912 6618
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Custapp;