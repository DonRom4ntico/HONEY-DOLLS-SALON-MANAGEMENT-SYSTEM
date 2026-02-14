import React, { useState } from "react";
import { Search, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import AdminLayout from "../../../layout/adminLayout";

export default function PaymentsDashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("Last 30 days");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const payments = [
    {
      id: "ORD-2025-1001",
      status: "Paid",
      customer: "Maria Santos",
      service: "Haircut & Blowdry",
      qty: 1,
      unitPrice: 350.0,
      subtotal: 350.0,
      paymentMethod: "Card",
      total: 350.0,
      updatedAt: "Oct 29, 2025 14:42",
    },
    {
      id: "ORD-2025-1002",
      status: "Pending",
      customer: "Julian Reyes",
      service: "Keratin Treatment",
      qty: 1,
      unitPrice: 1800.0,
      subtotal: 1800.0,
      paymentMethod: "GCash",
      total: 1800.0,
      updatedAt: "Oct 30, 2025 09:12",
    },
    {
      id: "ORD-2025-1003",
      status: "Cancelled",
      customer: "Analyn Velasco",
      service: "Gel Manicure - Full Set",
      qty: 1,
      unitPrice: 650.0,
      subtotal: 650.0,
      paymentMethod: "Cash",
      total: 650.0,
      updatedAt: "Oct 28, 2025 16:05",
    },
    {
      id: "ORD-2025-1004",
      status: "Paid",
      customer: "Samantha Cruz",
      service: "Shampoo (2) + Haircut",
      qty: 3,
      unitPrice: 250.0,
      subtotal: 750.0,
      paymentMethod: "Card",
      total: 750.0,
      updatedAt: "Oct 30, 2025 11:20",
    },
  ];

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || payment.status === statusFilter;
    const matchesPayment =
      paymentFilter === "All" || payment.paymentMethod === paymentFilter;
    const matchesDate = dateFilter === "Last 30 days";

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const formatPrice = (price) =>
    `₱${price.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

  const getStatusBadge = (status) => {
    const styles = {
      Paid: "bg-green-100 text-green-700 border border-green-300",
      Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
      Cancelled: "bg-red-100 text-red-700 border border-red-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <AdminLayout title="">
      <div className="max-w-7xl mx-auto space-y-8 px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-orange-900">
            Honey Dolls • Payments
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Track orders, payment status, totals and last updated time.
          </p>
        </div>

        {/* Filters: Search + Status + Payment + Date */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-[160px] max-w-md w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search order, customer, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm shadow-sm"
            />
          </div>

          {/* Status */}
          <div className="relative flex-1 min-w-[120px]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-full px-5 py-2.5 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-sm"
            >
              <option>All</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Cancelled</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Payment Method */}
          <div className="relative flex-1 min-w-[120px]">
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-full px-5 py-2.5 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-sm"
            >
              <option>All</option>
              <option>Card</option>
              <option>GCash</option>
              <option>Cash</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          {/* Date */}
          <div className="relative flex-1 min-w-[140px]">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="appearance-none w-full bg-white border border-gray-300 rounded-full px-5 py-2.5 pr-9 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer shadow-sm"
            >
              <option>Last 30 days</option>
              <option>Last 7 days</option>
              <option>Today</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-x-auto">
          <table className="w-full text-sm min-w-[800px] sm:min-w-full">
            <thead className="bg-orange-50 border-b-2 border-orange-200">
              <tr className="text-left font-bold text-gray-700">
                <th className="px-4 sm:px-6 py-3">ORDER ID</th>
                <th className="px-4 sm:px-6 py-3">STATUS</th>
                <th className="px-4 sm:px-6 py-3">CUSTOMER</th>
                <th className="px-4 sm:px-6 py-3">SERVICE</th>
                <th className="px-4 sm:px-6 py-3 text-center">QTY</th>
                <th className="px-4 sm:px-6 py-3 text-right">UNIT PRICE</th>
                <th className="px-4 sm:px-6 py-3 text-right">SUBTOTAL</th>
                <th className="px-4 sm:px-6 py-3">METHOD</th>
                <th className="px-4 sm:px-6 py-3 text-right">TOTAL</th>
                <th className="px-4 sm:px-6 py-3 text-right">UPDATED</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-orange-50 transition">
                  <td className="px-4 sm:px-6 py-3 font-bold text-orange-700">
                    {payment.id}
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    {getStatusBadge(payment.status)}
                  </td>
                  <td className="px-4 sm:px-6 py-3">{payment.customer}</td>
                  <td className="px-4 sm:px-6 py-3 text-gray-700">
                    {payment.service}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-center">
                    {payment.qty}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-right">
                    {formatPrice(payment.unitPrice)}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-right">
                    {formatPrice(payment.subtotal)}
                  </td>
                  <td className="px-4 sm:px-6 py-3">
                    <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {payment.paymentMethod}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-right font-bold text-gray-900">
                    {formatPrice(payment.total)}
                  </td>
                  <td className="px-4 sm:px-6 py-3 text-right text-xs text-gray-500">
                    {payment.updatedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 py-4 border-t border-gray-200 text-sm gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg font-medium">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-600">
            Showing {paginatedPayments.length} of {filteredPayments.length}{" "}
            payments
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}
