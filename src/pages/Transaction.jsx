// src/pages/PaymentsDashboard.jsx
import { useState } from 'react';
import {
  Search,
  ChevronLeft,
  ChevronRight,
  Printer,
} from 'lucide-react';
import AdminLayout from '../layout/adminLayout';

export default function PaymentsDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [paymentFilter, setPaymentFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('Last 30 days');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Full dataset
  const payments = [
    {
      id: 'ORD-2025-1001',
      status: 'Paid',
      customer: 'Maria Santos',
      service: 'Haircut & Blowdry',
      qty: 1,
      unitPrice: 350.00,
      subtotal: 350.00,
      paymentMethod: 'Card',
      total: 350.00,
      updatedAt: 'Oct 29, 2025 14:42',
    },
    {
      id: 'ORD-2025-1002',
      status: 'Pending',
      customer: 'Julian Reyes',
      service: 'Keratin Treatment',
      qty: 1,
      unitPrice: 1800.00,
      subtotal: 1800.00,
      paymentMethod: 'GCash',
      total: 1800.00,
      updatedAt: 'Oct 30, 2025 09:12',
    },
    {
      id: 'ORD-2025-1003',
      status: 'Cancelled',
      customer: 'Analyn Velasco',
      service: 'Gel Manicure - Full Set',
      qty: 1,
      unitPrice: 650.00,
      subtotal: 650.00,
      paymentMethod: 'Cash',
      total: 650.00,
      updatedAt: 'Oct 28, 2025 16:05',
    },
    {
      id: 'ORD-2025-1004',
      status: 'Paid',
      customer: 'Samantha Cruz',
      service: 'Shampoo (2) + Haircut',
      qty: 3,
      unitPrice: 250.00,
      subtotal: 750.00,
      paymentMethod: 'Card',
      total: 750.00,
      updatedAt: 'Oct 30, 2025 11:20',
    },
  ];

  // Filter logic (unchanged)
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.service.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || payment.status === statusFilter;
    const matchesPayment = paymentFilter === 'All' || payment.paymentMethod === paymentFilter;
    const matchesDate = dateFilter === 'Last 30 days';

    return matchesSearch && matchesStatus && matchesPayment && matchesDate;
  });

  // Pagination (unchanged)
  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);
  const paginatedPayments = filteredPayments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatPrice = (price) => `₱${price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`;

  const getStatusBadge = (status) => {
    const styles = {
      Paid: 'bg-green-100 text-green-700 border border-green-300',
      Pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
      Cancelled: 'bg-red-100 text-red-700 border border-red-300',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <AdminLayout title="Payments Dashboard">
      {/* Print Styles - Preserved */}
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          .print-only { display: block !important; }
          body { background: white !important; }
          .shadow-lg { box-shadow: none !important; }
          .rounded-2xl, .rounded-3xl { border: 1px solid #ddd !important; }
        }
        .print-only { display: none; }
      `}</style>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-orange-900">Honey Dolls • Payments</h1>
          <p className="text-sm text-gray-600 mt-1">
            Track orders, payment status, totals and last updated time.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order, customer, product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option>Status: All</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option>Payment: All</option>
            <option>Card</option>
            <option>GCash</option>
            <option>Cash</option>
          </select>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
          >
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Today</option>
          </select>
        </div>

        {/* Table Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-orange-100 overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 font-medium border-b">
                    <th className="pb-3">ORDER ID</th>
                    <th className="pb-3">STATUS</th>
                    <th className="pb-3">CUSTOMER</th>
                    <th className="pb-3">PRODUCT / SERVICE</th>
                    <th className="pb-3 text-center">QTY</th>
                    <th className="pb-3 text-right">UNIT PRICE</th>
                    <th className="pb-3 text-right">SUBTOTAL</th>
                    <th className="pb-3">PAYMENT METHOD</th>
                    <th className="pb-3 text-right">TOTAL</th>
                    <th className="pb-3 text-right">UPDATED AT</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {paginatedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50 transition">
                      <td className="py-3 font-medium text-orange-700">{payment.id}</td>
                      <td className="py-3">{getStatusBadge(payment.status)}</td>
                      <td className="py-3">{payment.customer}</td>
                      <td className="py-3">{payment.service}</td>
                      <td className="py-3 text-center">{payment.qty}</td>
                      <td className="py-3 text-right">{formatPrice(payment.unitPrice)}</td>
                      <td className="py-3 text-right">{formatPrice(payment.subtotal)}</td>
                      <td className="py-3">{payment.paymentMethod}</td>
                      <td className="py-3 text-right font-medium">{formatPrice(payment.total)}</td>
                      <td className="py-3 text-right text-xs text-gray-500">{payment.updatedAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600">
                Showing {paginatedPayments.length} of {filteredPayments.length} payments
              </p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}