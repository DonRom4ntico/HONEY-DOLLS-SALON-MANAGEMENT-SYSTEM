// src/pages/supplierReturn.jsx
import React, { useState } from "react";
import { Search, ChevronDown, Eye, Package, Plus, X } from "lucide-react";
import AdminLayout from "../../../layout/adminLayout";
export default function SupplierReturn() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const supplierReturns = [
    {
      id: "SUP-RET-2025-001",
      supplier: "L'Oréal Philippines",
      reason: "Damaged in transit",
      evidence: "damage_01.jpg",
      quantity: 15,
      amount: 12750.0,
      date: "Nov 01, 2025",
      status: "Pending",
    },
    {
      id: "SUP-RET-2025-002",
      supplier: "Revlon Asia",
      reason: "Expired batch",
      evidence: "expiry_02.jpg",
      quantity: 8,
      amount: 6800.0,
      date: "Oct 30, 2025",
      status: "Returned",
    },
    {
      id: "SUP-RET-2025-003",
      supplier: "Beauty Essentials Inc.",
      reason: "Wrong shade delivered",
      evidence: "wrong_shade.jpg",
      quantity: 20,
      amount: 17000.0,
      date: "Nov 02, 2025",
      status: "Pending",
    },
  ];

  const filteredReturns = supplierReturns.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) =>
    status === "Returned"
      ? "bg-green-500 text-white"
      : "bg-orange-500 text-white";

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Supplier Returns
            </h1>
          </div>
          {/* Search + Filters + New Return Button */}
          <div className="flex items-center gap-4 flex-wrap justify-between">
            {/* Left side: Search + Filters */}
            <div className="flex items-center gap-4 flex-wrap">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search order or supplier..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-300 w-[350px]"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                />
              </div>
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 pl-3 pr-10 rounded-full border border-gray-300 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer z-[100]"
                >
                  <option>All</option>
                  <option>Pending</option>
                  <option>Returned</option>
                </select>
                <ChevronDown className="mt-2.5 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-[110]" />
              </div>
              {/* Date Filter */}
              <div className="relative">
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-4 py-2 pl-3 pr-10 rounded-full border border-gray-300 appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer z-[100]"
                >
                  <option>All</option>
                  <option>Oct 2025</option>
                  <option>Sep 2025</option>
                </select>
                <ChevronDown className="mt-2.5 absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none z-[110]" />
              </div>
            </div>
            {/* Right side: New Return Button */}
            <div>
              <button
                style={{
                  background: "linear-gradient(to right,  #ec4899, #f97316)",
                  padding: "10px 20px",
                  borderRadius: "9999px",
                  boxShadow: "0 4px 15px rgba(34, 211, 238, 0.3)",
                }}
                onClick={() => setIsModalOpen(true)}
                className="hover:scale-103 flex items-center gap-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg hover:shadow-xl transition transform"
              >
                <Plus size={20} />
                New Return
              </button>
            </div>
          </div>
          {/* Table */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-orange-50 border-b-2 border-orange-200">
                  <tr className="text-left text-sm font-bold text-gray-700">
                    <th className="px-6 py-5">RETURN ID</th>
                    <th className="px-6 py-5">SUPPLIER NAME</th>
                    <th className="px-6 py-5">REASON</th>
                    <th className="px-6 py-5">EVIDENCE</th>
                    <th className="px-6 py-5 text-center">QTY</th>
                    <th className="px-6 py-5 text-right">TOTAL AMOUNT</th>
                    <th className="px-6 py-5">RETURN DATE</th>
                    <th className="px-6 py-5 text-center">STATUS</th>
                    <th className="px-6 py-5 text-center">ACTION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredReturns.map((ret) => (
                    <tr key={ret.id} className="hover:bg-orange-50 transition">
                      <td className="px-6 py-5 font-bold text-orange-700">
                        {ret.id}
                      </td>
                      <td className="px-6 py-5 font-medium text-gray-900">
                        {ret.supplier}
                      </td>
                      <td className="px-6 py-5 text-gray-700">{ret.reason}</td>
                      <td className="px-6 py-5">
                        <span className="inline-flex items-center gap-2 text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                          <Eye className="w-4 h-4" />
                          {ret.evidence}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-block w-12 h-12 bg-red-100 text-red-700 rounded-full font-bold text-lg flex items-center justify-center">
                          {ret.quantity}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right font-bold text-gray-900">
                        ₱{ret.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-5 text-gray-600">{ret.date}</td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`inline-block px-6 py-2 rounded-full text-white font-bold text-sm ${getStatusColor(
                            ret.status,
                          )}`}
                        >
                          {ret.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        {ret.status === "Pending" ? (
                          <button
                            style={{
                              background:
                                "linear-gradient(to right,  #ec4899, #f97316)",
                              padding: "1px 24px",
                              borderRadius: "9999px",
                              boxShadow: "0 4px 15px rgba(34, 211, 238, 0.3)",
                            }}
                            className="hover:scale-103 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-6 py-2.5 rounded-full text-sm font-bold shadow hover:shadow-lg transition"
                          >
                            Process Return
                          </button>
                        ) : (
                          <button className="hover:scale-103 bg-gray-300 text-gray-700 px-6 py-3 rounded-full text-sm">
                            View
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Add Return Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8">
                {/* Modal content remains the same */}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
