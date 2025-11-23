// src/pages/MyAppointment.jsx
import React, { useState } from "react";
import CustomerLayout from "../layout/customerLayout";
import { Calendar, Clock, User, CheckCircle, AlertCircle, Search } from "lucide-react";

export default function MyAppointment() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const appointments = [
    {
      id: 1001,
      date: "Oct 25, 2025",
      time: "04:00 PM – 05:00 PM",
      staff: "Anna",
      services: ["Haircut & Styling", "Hair Treatment"],
      status: "Completed",
    },
    {
      id: 1002,
      date: "Oct 26, 2025",
      time: "04:30 PM – 05:30 PM",
      staff: "Mariel",
      services: ["Gel Manicure", "Pedicure"],
      status: "Upcoming",
    },
    {
      id: 1003,
      date: "Oct 27, 2025",
      time: "05:00 PM – 05:45 PM",
      staff: "Jessa",
      services: ["Hair Color (Full)"],
      status: "Pending",
    },
    {
      id: 1004,
      date: "Oct 28, 2025",
      time: "05:30 PM – 06:15 PM",
      staff: "Anna",
      services: ["Facial – Brightening", "Diamond Peel"],
      status: "Completed",
    },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.id.toString().includes(searchTerm) ||
      apt.date.includes(searchTerm) ||
      apt.staff.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.services.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      apt.time.includes(searchTerm);
    const matchesFilter = filterStatus === "All" || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const canModify = (status) => ["Upcoming", "Pending"].includes(status);

  return (
    <CustomerLayout>
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <h1 className="text-4xl font-bold text-orange-900 text-center mb-10">
            My Appointments
          </h1>

          {/* Search */}
          <div className="max-w-3xl mx-auto mb-10">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ID, date, staff, or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-16 pr-8 py-5 text-lg bg-white rounded-full border border-gray-200 focus:outline-none focus:border-orange-400 shadow-md"
              />
            </div>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

            {/* Header */}
            <div className="px-10 py-6 border-b border-gray-200">
              <div className="flex items-center text-sm font-bold text-gray-600 uppercase tracking-wider">
                <div className="w-28 text-left">ID</div>
                <div className="w-40 text-left">Date</div>
                <div className="w-52 text-left">Time</div>
                <div className="w-36 text-left">Staff</div>
                <div className="flex-1 text-left">Service(s)</div>
                <div className="w-40 text-center">Status</div>
                <div className="w-64 text-center">Action</div>
              </div>
            </div>

            {/* Rows – Perfectly Clean Alignment */}
            <div className="divide-y divide-gray-100">
              {filteredAppointments.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-xl">No appointments found</div>
              ) : (
                filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className={`px-10 py-7 flex items-center rounded-2xl mx-6 my-4 ${
                      apt.status === "Completed" ? "bg-teal-50" : "bg-amber-50"
                    }`}
                  >
                    {/* ID */}
                    <div className="w-28 font-bold text-orange-800">#{apt.id}</div>

                    {/* Date */}
                    <div className="w-40 flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-800">{apt.date}</span>
                    </div>

                    {/* Time */}
                    <div className="w-52 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-800">{apt.time}</span>
                    </div>

                    {/* Staff */}
                    <div className="w-36 flex items-center gap-3">
                      <User className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-800">{apt.staff}</span>
                    </div>

                    {/* Services – Clean pills */}
                    <div className="flex-1 flex items-center gap-2 flex-wrap">
                      {apt.services.map((service, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-white text-gray-700 text-xs font-medium rounded-full border border-gray-300 shadow-sm whitespace-nowrap"
                        >
                          {service}
                        </span>
                      ))}
                    </div>

                    {/* Status – Perfectly centered */}
                    <div className="w-40 flex justify-center">
                      <div className="flex items-center gap-2">
                        {apt.status === "Completed" ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-orange-600" />
                        )}
                        <span className={`font-bold ${apt.status === "Completed" ? "text-green-700" : "text-orange-700"}`}>
                          {apt.status}
                        </span>
                      </div>
                    </div>

                    {/* Action – Clean, spacious, perfectly centered */}
                    <div className="w-64 flex justify-center gap-4">
                      {canModify(apt.status) && (
                        <>
                          <button className="px-6 py-2.5 bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold text-xs rounded-full hover:shadow-lg transition">
                            Reschedule
                          </button>
                          <button className="px-6 py-2.5 bg-red-600 text-white font-bold text-xs rounded-full hover:bg-red-700 transition">
                            Cancel
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Filters */}
            <div className="flex justify-center gap-4 px-8 py-6 bg-gray-50 flex-wrap">
              {["All", "Upcoming", "Pending", "Completed", "Cancelled"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-8 py-3 rounded-full font-medium text-sm transition-all shadow-sm ${
                    filterStatus === status
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    </CustomerLayout>
  );
}