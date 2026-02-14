// src/pages/AdminDashboard.jsx
import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import AdminLayout from "../../layout/adminLayout";

/* ────────────────────────────
   STAT CARD
───────────────────────────── */
function StatCard({ title, value, percent, icon, color, bg, data }) {
  const isPositive = percent >= 0;

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 w-full">
      <div className="flex items-center gap-3 mb-3">
        <div className={`${bg} p-2.5 rounded-lg`}>
          <span className={`${color} text-xl`}>{icon}</span>
        </div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
      </div>

      {/* Percent below title */}
      <div className="mb-4">
        <span
          className={`text-sm font-semibold ${
            isPositive ? color : "text-red-600"
          }`}
        >
          {isPositive ? "↑" : "↓"} {percent}%
        </span>
      </div>

      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>

        <div className="w-24 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.map((v) => ({ v }))}>
              <Bar
                dataKey="v"
                fill="currentColor"
                className={color}
                barSize={4}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ────────────────────────────
   DASHBOARD
───────────────────────────── */
export default function AdminDashboard() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const visitorsData = months.map((month) => ({
    month,
    current: Math.floor(Math.random() * 70) + 20,
    previous: Math.floor(Math.random() * 60) + 15,
  }));

  const revenueData = [
    { day: "S", value: 400 },
    { day: "M", value: 520 },
    { day: "T", value: 730 },
    { day: "W", value: 610 },
    { day: "T", value: 680 },
    { day: "F", value: 500 },
    { day: "S", value: 420 },
  ];

  const bookings = [
    {
      name: "Devon Lane",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
      service: "Hair Cut",
      time: "09:02 am",
      employee: "Henry Arthur",
      status: "Complete",
    },
    {
      name: "Guy Hawkins",
      avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=150",
      service: "Hair Trimming",
      time: "09:32 am",
      employee: "Cooper Kristin",
      status: "Complete",
    },
    {
      name: "Jerome Bell",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      service: "Hair Styling",
      time: "10:00 am",
      employee: "Black Marvin",
      status: "Pending",
    },
  ];

  const sparklineClients = [12, 18, 14, 22, 16, 28, 20, 30];
  const sparklineServices = [20, 26, 22, 30, 28, 35, 32, 38];
  const sparklineEmployees = [6, 8, 7, 10, 9, 12, 11, 14];
  const sparklineRevenue = [15, 22, 18, 28, 24, 35, 30, 40];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="px-4 sm:px-6 lg:px-8 py-4 space-y-6 w-full">
        {/* ── TOP STAT CARDS ── */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px]">
            <StatCard
              title="Total Clients"
              value="22"
              percent={75}
              icon="👤"
              color="text-green-600"
              bg="bg-green-100"
              data={sparklineClients}
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <StatCard
              title="Total Services"
              value="12"
              percent={60}
              icon="✂️"
              color="text-amber-600"
              bg="bg-amber-100"
              data={sparklineServices}
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <StatCard
              title="Total Employees"
              value="05"
              percent={45}
              icon="👥"
              color="text-blue-600"
              bg="bg-blue-100"
              data={sparklineEmployees}
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <StatCard
              title="Clients"
              value="03"
              percent={35}
              icon="📊"
              color="text-red-600"
              bg="bg-red-100"
              data={sparklineRevenue}
            />
          </div>
        </div>

        {/* ── CHARTS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border min-w-0">
            <h3 className="font-semibold mb-4 text-lg">Total Visitors</h3>
            <div className="h-[280px] sm:h-[320px] lg:h-[360px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorsData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11 }}
                    angle={-45}
                    textAnchor="end"
                    height={80}
                    interval={0}
                    dy={12}
                  />
                  <YAxis tick={{ fontSize: 11 }} width={35} />
                  <Tooltip />
                  <Line
                    dataKey="current"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                    dot={false}
                  />
                  <Line
                    dataKey="previous"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border min-w-0">
            <h3 className="font-semibold mb-4 text-lg">Revenue</h3>
            <div className="h-64 sm:h-72 lg:h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                  <YAxis hide />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── BOOKINGS ── */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border">
          <h3 className="font-semibold mb-5 text-lg">Upcoming Bookings</h3>
          <div className="space-y-4">
            {bookings.map((b, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-3 sm:p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <img
                    src={b.avatar}
                    alt={b.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-gray-900 truncate">
                      {b.name}
                    </div>
                    <div className="text-sm text-gray-600 truncate">
                      {b.service}
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col sm:items-end gap-2 text-sm">
                  <div className="font-medium text-gray-700 whitespace-nowrap">
                    {b.time}
                  </div>
                  <div className="text-gray-500 hidden sm:block">
                    {b.employee}
                  </div>
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${b.status === "Complete" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                  >
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tiny screen tweaks */}
      <style jsx global>{`
        @media (max-width: 400px) {
          .recharts-xAxis .recharts-cartesian-axis-tick-value tspan {
            font-size: 10px !important;
            dy: 14px !important;
          }
        }
      `}</style>
    </AdminLayout>
  );
}
