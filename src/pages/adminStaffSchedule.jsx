// src/pages/AdminStaffSchedule.jsx
import { CheckCircle, Clock, XCircle } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';

export default function AdminStaffSchedule() {
  // ── Sample appointments (replace with API later) ───────────────────────
  const appointments = [
    { time: '09:00 AM — 11:00 AM', customer: 'Alfa Angel Panganiiban', service: 'Haircut & Styling', staff: 'Anna', status: 'completed' },
    { time: '09:00 AM — 10:00 AM', customer: 'Jean Marie Bolivar', service: 'Gel Manicure', staff: 'Maya', status: 'pending' },
    { time: '05:00 PM — 05:45 PM', customer: 'Rico Santos', service: 'Hair Color (Full)', staff: 'Lia', status: 'pending' },
    { time: '05:30 PM — 06:15 PM', customer: 'Maricar Dizon', service: 'Facial — Brightening', staff: 'Anna', status: 'cancelled' },
    { time: '05:30 PM — 06:15 PM', customer: 'Maricar Dizon', service: 'Facial — Brightening', staff: 'Anna', status: 'cancelled' },
    { time: '05:30 PM — 06:15 PM', customer: 'Maricar Dizon', service: 'Facial — Brightening', staff: 'Anna', status: 'cancelled' },
    { time: '05:00 PM — 05:45 PM', customer: 'Rico Santos', service: 'Hair Color (Full)', staff: 'Lia', status: 'pending' },
    { time: '05:00 PM — 05:45 PM', customer: 'Rico Santos', service: 'Hair Color (Full)', staff: 'Lia', status: 'pending' },
  ];

  return (
    <AdminLayout title="Honey Dolls — Admin Staff Schedule">
      {/* ── Search + Calendar + Table ─────────────────────────────────────── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* ── LEFT: Calendar ─────────────────────────────────────────────── */}
        <div className="space-y-4">
          {/* Search */}
          <div className="bg-gray-50 rounded-xl p-4">
            <input
              type="text"
              placeholder="Search by date, client, or service"
              className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Calendar */}
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-800">October 2025</h3>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                <div key={day} className="font-medium text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 28 }, (_, i) => i + 1).map((d) => (
                <div
                  key={d}
                  className={`py-2 rounded-lg ${d === 11 ? 'bg-orange-500 text-white font-bold' : 'hover:bg-gray-100'}`}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>

          {/* View My Schedule Button */}
          <button className="w-full bg-linear-to-r from-yellow-400 to-pink-400 text-white font-medium py-3 rounded-xl hover:from-yellow-500 hover:to-pink-500 transition">
            View My Schedule
          </button>

          {/* Legend */}
          <div className="bg-gray-50 rounded-xl p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Pending Appointments</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-200 rounded-full"></div>
                <span>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
                <span>Pending</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-200 rounded-full"></div>
                <span>Cancelled</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Appointments Table ───────────────────────────────────── */}
        <div className="space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="pb-3">Time</th>
                  <th className="pb-3">Customer Name</th>
                  <th className="pb-3">Service</th>
                  <th className="pb-3">Staff</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((apt, i) => (
                  <tr
                    key={i}
                    className={`border-b ${
                      apt.status === 'completed'
                        ? 'bg-green-50'
                        : apt.status === 'pending'
                        ? 'bg-yellow-50'
                        : 'bg-red-50'
                    }`}
                  >
                    <td className="py-3">{apt.time}</td>
                    <td className="py-3 font-medium">{apt.customer}</td>
                    <td className="py-3">{apt.service}</td>
                    <td className="py-3">{apt.staff}</td>
                    <td className="py-3">
                      <span className="flex items-center gap-1">
                        {apt.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
                        {apt.status === 'pending' && <Clock className="w-4 h-4 text-yellow-600" />}
                        {apt.status === 'cancelled' && <XCircle className="w-4 h-4 text-red-600" />}
                        <span className="capitalize">{apt.status}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button className="px-4 py-2 bg-pink-500 text-white rounded-lg font-medium">All</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Pending</button>
            <button className="px-4 py-2 bg-gray-200 text-Beige-700 rounded-lg">Completed</button>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg">Cancelled</button>
          </div>

          <p className="text-xs text-gray-500">
            Click a row to view appointment details, reschedule, or mark complete.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}