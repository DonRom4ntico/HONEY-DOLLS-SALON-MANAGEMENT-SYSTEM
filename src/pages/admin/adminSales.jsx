import React, { useMemo } from "react";
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
  Legend,
} from "recharts";
import AdminLayout from "../../layout/adminLayout";

/* ────────────────────────────
   STAT CARD WITH SPARKLINE
───────────────────────────── */
function StatCard({ title, value, percent, icon, color, bg, data }) {
  const isPositive = percent >= 0;
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 min-w-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`${bg} p-2.5 rounded-lg`}>
            <span className={`${color} text-xl`}>{icon}</span>
          </div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
        </div>
        <span
          className={`text-sm font-semibold ${
            isPositive ? "text-green-600" : "text-red-600"
          }`}
        >
          {isPositive ? "↑" : "↓"} {Math.abs(percent)}%
        </span>
      </div>

      <div className="flex items-end justify-between">
        <h2 className="text-3xl font-bold text-gray-900">{value}</h2>

        <div className="w-24 h-10">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.map((v) => ({ v }))}>
              <Bar
                dataKey="v"
                fill={color.replace("text-", "fill-").replace("-600", "-400")}
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
   SALES DASHBOARD
───────────────────────────── */
export default function AdminSales() {
  // Sparkline data
  const sparklineSales = [200, 450, 300, 700, 500, 900, 650, 1200];
  const sparklineOrders = [5, 12, 8, 20, 15, 28, 22, 40];
  const sparklineRevenue = [800, 1400, 1100, 2200, 1800, 3200, 2500, 4500];
  const sparklineVisitors = [120, 180, 150, 240, 200, 320, 280, 400];

  // Order Statistics data
  const orderStatsData = [
    { day: "2 Jan", orders: 980, sales: 22000 },
    { day: "3 Jan", orders: 450, sales: 14000 },
    { day: "4 Jan", orders: 820, sales: 18500 },
    { day: "5 Jan", orders: 620, sales: 12000 },
    { day: "6 Jan", orders: 380, sales: 9500 },
    { day: "7 Jan", orders: 750, sales: 21000 },
    { day: "8 Jan", orders: 520, sales: 16500 },
  ];

  // Sales Overview data
  const salesOverviewData = [
    { day: "SAT", sales: 5000, profit: 8 },
    { day: "SUN", sales: 12000, profit: 14 },
    { day: "MON", sales: 8000, profit: 6 },
    { day: "TUE", sales: 18500, profit: 18 },
    { day: "WED", sales: 11000, profit: 11 },
    { day: "THU", sales: 7000, profit: 5 },
    { day: "FRI", sales: 14000, profit: 12 },
  ];

  // Top products
  const topProducts = [
    {
      name: "Computer paper",
      sku: "FG7584949",
      sold: 120,
      total: 4567,
      status: "Active",
      price: 56.99,
    },
    {
      name: "Linen paper",
      sku: "FHBS1940",
      sold: 356,
      total: 16785,
      status: "In stock",
      price: null,
    },
    {
      name: "Smooth cardstock",
      sku: "W7468939",
      sold: 446,
      total: 125000,
      status: "Out of stock",
      price: 74.799,
    },
    {
      name: "Marble cardstock",
      sku: "GFD7890",
      sold: 1623,
      total: 35000,
      status: "In stock",
      price: 34.78,
    },
    {
      name: "Canvas cardstock",
      sku: "BK849035",
      sold: 164,
      total: 233800,
      status: "Low stock",
      price: 345.45,
    },
    {
      name: "Vellum stock",
      sku: "L743895",
      sold: 456,
      total: 10000,
      status: "In stock",
      price: 34.0,
    },
  ];

  // Real-time date range: yesterday → today
  const dateRange = (() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const format = (date) => {
      const d = date.getDate().toString().padStart(2, "0");
      const m = (date.getMonth() + 1).toString().padStart(2, "0");
      const y = date.getFullYear().toString().slice(-2);
      return `${d}/${m}/${y}`;
    };

    return `${format(yesterday)} - ${format(today)}`;
  })();

  // Trigger browser print dialog
  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout title="Sales Report">
      <div className="p-6 space-y-8 print:hidden">
        {/* HEADER */}
        <div className="flex items-center justify-end gap-4 mb-6">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors cursor-pointer text-sm font-medium"
          >
            {/* Print icon SVG */}
            Print Report
          </button>

          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm font-medium">
            {dateRange}
          </div>
        </div>

        {/* ── STAT CARDS ── */}
        <div className="flex flex-wrap gap-5">
          <div className="flex-1 min-w-[250px]">
            <StatCard
              title="Today's sale"
              value="$35,546"
              percent={16}
              icon="💵"
              color="text-green-600"
              bg="bg-green-100"
              data={sparklineSales}
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <StatCard
              title="Today's total orders"
              value="467"
              percent={13}
              icon="📦"
              color="text-purple-600"
              bg="bg-purple-100"
              data={sparklineOrders}
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <StatCard
              title="Today's Revenue"
              value="$1,679"
              percent={14}
              icon="💰"
              color="text-orange-600"
              bg="bg-orange-100"
              data={sparklineRevenue}
            />
          </div>
          <div className="flex-1 min-w-[250px]">
            <StatCard
              title="Today's visitors"
              value="3,290"
              percent={2.9}
              icon="👥"
              color="text-blue-600"
              bg="bg-blue-100"
              data={sparklineVisitors}
            />
          </div>
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Statistics */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-lg mb-4">Order Statistics</h3>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={orderStatsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="orders"
                  fill="#3b82f6"
                  name="Order"
                  barSize={20}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  yAxisId="right"
                  dataKey="sales"
                  fill="#10b981"
                  name="Sales"
                  barSize={12}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Sales Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Sales overview</h3>
              <div className="text-right">
                <p className="text-sm text-gray-600">
                  $68,873.24 <span className="text-green-600">↑20%</span>
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={salesOverviewData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  unit="%"
                  domain={[0, 30]}
                />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="sales"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  dot={false}
                  name="Sales"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="profit"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={false}
                  name="Profit %"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Selling Products and other sections remain unchanged */}
      </div>
    </AdminLayout>
  );
}
