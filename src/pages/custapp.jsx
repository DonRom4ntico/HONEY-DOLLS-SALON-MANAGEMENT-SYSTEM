// src/pages/Custapp.jsx
import React, { useState } from "react";
import CustomerLayout from "../layout/customerLayout";
import logo from "../assets/logos.png";
import DatePicker from "react-datepicker";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

const Custapp = () => {
  const [formData, setFormData] = useState({
    date: new Date("2025-10-25"),
    time: "10:30",
    services: ["Haircut & Styling", "Manicure / Pedicure"],
    staff: "Anna (preferred)",
    recurrence: "None",
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

  const formatDate = (dateObj) =>
    dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const formatRecurrence = () => {
    if (formData.recurrence === "None") return "None — One-time appointment";
    if (formData.recurrence === "Weekly") return "Weekly — Every Sat (4x)";
    return formData.recurrence;
  };

  return (
    <CustomerLayout>
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 py-10">

          {/* Page Title */}
          <div className="mb-10 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-orange-900">
              Book Your Appointment
            </h1>
            <p className="text-lg text-gray-700 mt-3">
              Choose your preferred date, time, and services
            </p>
          </div>

          {/* Two-column layout */}
          <div className="grid md:grid-cols-3 gap-8">

            {/* LEFT FORM */}
            <section className="md:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-8">
                Schedule Your Visit
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

                {/* Preferred Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date
                  </label>

                  <div className="relative w-full">
                    <DatePicker
                      selected={formData.date}
                      onChange={(date) => setFormData({ ...formData, date })}
                      placeholderText="Select a date"
                      className="!w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800
                                 focus:border-orange-400 focus:outline-none shadow-sm block"
                      calendarClassName="shadow-lg border rounded-lg"
                      popperPlacement="right-start"
                    />

                    {/* Calendar Icon */}
                    <button
                      type="button"
                      onClick={() =>
                        document
                          .querySelector(".react-datepicker__input-container input")
                          .focus()
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                    >
                      <Calendar className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Time
                  </label>
                  <select
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:border-orange-400 focus:outline-none shadow-sm"
                  >
                    <option value="10:30">10:30 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Services */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  Choose Services
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicesList.map((service) => (
                    <label
                      key={service}
                      className="flex items-center gap-3 p-4 bg-orange-50 rounded-xl border border-orange-200 cursor-pointer hover:bg-orange-100 transition"
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service)}
                        onChange={() => toggleService(service)}
                        className="w-5 h-5 text-orange-600 rounded focus:ring-orange-400"
                      />
                      <span className="font-medium text-gray-800">{service}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Staff + Recurrence */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Staff
                  </label>
                  <select
                    name="staff"
                    value={formData.staff}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:border-orange-400 focus:outline-none shadow-sm"
                  >
                    <option>Select Staff</option>
                    <option>Anna (preferred)</option>
                    <option>Mariel</option>
                    <option>Jessa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Recurrence
                  </label>
                  <select
                    name="recurrence"
                    value={formData.recurrence}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:border-orange-400 focus:outline-none shadow-sm"
                  >
                    <option value="None">None</option>
                    <option value="Weekly">Weekly — Every week</option>
                    <option value="Monthly">Monthly — Same day each month</option>
                  </select>
                </div>
              </div>

              {/* Agree Checkbox */}
              <div className="space-y-4 text-sm">
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={formData.agree}
                    onChange={handleChange}
                    className="w-5 h-5 text-orange-600 rounded"
                  />
                  <span className="text-gray-700">
                    I agree to the salon policies and cancellation terms
                  </span>
                </label>
              </div>
            </section>

            {/* RIGHT-SIDE SUMMARY */}
            <aside className="bg-white rounded-2xl shadow-xl border border-pink-100 p-8 h-fit sticky top-24">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Appointment Summary
              </h2>

              <div className="space-y-4 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Services</p>
                  <p className="font-semibold">{formData.services.join(", ")}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-semibold">{formatDate(formData.date)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="font-semibold">{formData.time} AM</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Staff</p>
                  <p className="font-semibold">{formData.staff}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Recurrence</p>
                  <p className="font-semibold text-sm">{formatRecurrence()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Branch</p>
                  <p className="font-semibold">Gaisano Mall of Davao</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t-2 border-pink-100">
                <p className="text-right text-3xl font-bold text-orange-900">
                  ₱1,200
                </p>
                <p className="text-right text-sm text-gray-600">
                  Estimated Total
                </p>
              </div>

              <div className="mt-8 space-y-4">
                <button className="w-full bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold py-4 rounded-full shadow-lg hover:shadow-xl transition text-lg">
                  Confirm Booking
                </button>
                <button className="w-full bg-gray-100 text-gray-700 font-medium py-3 rounded-full hover:bg-gray-200 transition">
                  Save as Draft
                </button>
              </div>
            </aside>

          </div>
        </div>
      </main>
    </CustomerLayout>
  );
};

export default Custapp;
