// src/pages/AdminDashboard.jsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import AdminLayout from '../layout/adminLayout';

export default function AdminDashboard() {
  // ── Sample data (replace with API later) ───────────────────────────────
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const salesData = months.map((m) => ({
    month: m,
    productSales: Math.floor(Math.random() * 4000) + 800,
    serviceSales: Math.floor(Math.random() * 3500) + 600,
  }));

  const lossData = months.map((m) => ({
    month: m,
    damaged: Math.floor(Math.random() * 800) + 100,
    wasted: Math.floor(Math.random() * 600) + 80,
  }));

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-10">
        {/* ── SALES CHART ───────────────────────────────────────────────────── */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-green-600">Up</span> Sales Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 5000]} ticks={[0, 1000, 2000, 3000, 4000, 5000]} />
              <Tooltip formatter={(v) => `₱${v}`} />
              <Legend />
              <Line type="monotone" dataKey="productSales" stroke="#ef4444" name="Product Sales" strokeWidth={2} />
              <Line type="monotone" dataKey="serviceSales" stroke="#3b82f6" name="Service Sales" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── LOSS CHART ────────────────────────────────────────────────────── */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <span className="text-red-600">Down</span> Loss Overview
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lossData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 2500]} ticks={[0, 500, 1000, 1500, 2000, 2500]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="damaged" stroke="#ef4444" name="Product Damaged" strokeWidth={2} />
              <Line type="monotone" dataKey="wasted" stroke="#3b82f6" name="Product Wasted" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminLayout>
  );
}