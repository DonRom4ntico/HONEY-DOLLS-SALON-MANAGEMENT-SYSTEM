// src/pages/AdminStaffSchedule.jsx
import { Bell, Search, Calendar, Clock, User, Scissors, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';

export default function AdminStaffSchedule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Your original admin appointments (unchanged)
  const appointments = [
    { id: 1, time: '09:00 AM — 11:00 AM', customer: 'Alfa Angel Panganiiban', service: 'Haircut & Styling', staff: 'Anna', status: 'Completed' },
    { id: 2, time: '09:00 AM — 10:00 AM', customer: 'Jean Marie Bolivar', service: 'Gel Manicure', staff: 'Maya', status: 'Pending' },
    { id: 3, time: '05:00 PM — 05:45 PM', customer: 'Rico Santos', service: 'Hair Color (Full)', staff: 'Lia', status: 'Pending' },
    { id: 4, time: '05:30 PM — 06:15 PM', customer: 'Maricar Dizon', service: 'Facial — Brightening', staff: 'Anna', status: 'Cancelled' },
    { id: 5, time: '05:30 PM — 06:15 PM', customer: 'Maricar Dizon', service: 'Facial — Brightening', staff: 'Anna', status: 'Cancelled' },
    { id: 6, time: '05:30 PM — 06:15 PM', customer: 'Maricar Dizon', service: 'Facial — Brightening', staff: 'Anna', status: 'Cancelled' },
    { id: 7, time: '05:00 PM — 05:45 PM', customer: 'Rico Santos', service: 'Hair Color (Full)', staff: 'Lia', status: 'Pending' },
    { id: 8, time: '05:00 PM — 05:45 PM', customer: 'Rico Santos', service: 'Hair Color (Full)', staff: 'Lia', status: 'Pending' },
  ];

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch =
      apt.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.staff.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'All' || apt.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calendar: October 2025 (same compact style as StaffSchedule)
  const firstDay = 3; // Wednesday
  const today = 11;

  return (
    <AdminLayout title="Staff Schedule">
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">

        {/* ====================== MAIN ====================== */}
        <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-3 gap-6">

            {/* LEFT: Calendar & Filters */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Honey Dolls — Staff Schedule</h2>
                <p className="text-sm text-gray-600">Admin View</p>

                {/* Search */}
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by client, service, or staff"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                  />
                </div>

                {/* Compact Calendar */}
                <div className="mt-6">
                  <div className="text-center mb-3">
                    <h3 className="font-semibold text-gray-800">October 2025</h3>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-gray-600">
                    <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mt-2 text-sm">
                    {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`} />)}
                    {[...Array(31)].map((_, i) => {
                      const day = i + 1;
                      const isToday = day === today;
                      return (
                        <div
                          key={day}
                          className={`aspect-square flex items-center justify-center rounded-lg ${
                            isToday
                              ? 'bg-orange-500 text-white font-bold'
                              : 'bg-gray-50 hover:bg-gray-100'
                          } cursor-pointer transition`}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* View My Schedule Button */}
                <button className="mt-6 w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition">
                  View My Schedule
                </button>

                {/* Pending Count */}
                <div className="mt-6">
                  <h3 className="font-semibold text-gray-800 mb-3">Pending Appointments</h3>
                  <div className="bg-gray-100 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-orange-600">
                      {appointments.filter(a => a.status === 'Pending').length}
                    </p>
                    <p className="text-xs text-gray-600">Today</p>
                  </div>
                </div>

                {/* Legend */}
                <div className="mt-6 bg-gray-50 rounded-xl p-4">
                  <h4 className="font-semibold text-gray-700 mb-2">Legend</h4>
                  <div className="flex flex-wrap items-center gap-4 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                      <span>Completed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                      <span>Pending</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-red-200 rounded-full"></div>
                      <span>Cancelled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: Appointments List (exact same card style as StaffSchedule) */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">

                {/* Filter Tabs */}
                <div className="mt-6 flex gap-2 justify-center flex-wrap mb-6">
                  {['All', 'Pending', 'Completed', 'Cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        filterStatus === status
                          ? 'bg-orange-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                {/* Appointments */}
                <div className="space-y-3">
                  {filteredAppointments.map((apt) => {
                    const statusColor =
                      apt.status === 'Completed'
                        ? 'bg-green-100 text-green-700'
                        : apt.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700';

                    const statusIcon =
                      apt.status === 'Completed' ? <CheckCircle className="w-4 h-4" /> :
                      apt.status === 'Pending' ? <AlertCircle className="w-4 h-4" /> :
                      <XCircle className="w-4 h-4" />;

                    return (
                      <div
                        key={apt.id}
                        className={`grid grid-cols-5 items-center p-4 rounded-xl ${statusColor} transition hover:shadow-sm`}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Clock className="w-4 h-4" />
                          {apt.time}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <User className="w-4 h-4" />
                          {apt.customer}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Scissors className="w-4 h-4" />
                          {apt.service}
                        </div>
                        <div className="text-sm font-medium text-gray-700">
                          {apt.staff}
                        </div>
                        <div className="flex items-center gap-1 text-sm font-medium">
                          {statusIcon}
                          {apt.status}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* ====================== FOOTER ====================== */}
        <footer className="bg-white/80 py-3 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-xs text-gray-600 text-center">
              Admin view • Honey Dolls — Brilliant Beauty Hub
            </p>
          </div>
        </footer>
      </div>
    </AdminLayout>
  );
}