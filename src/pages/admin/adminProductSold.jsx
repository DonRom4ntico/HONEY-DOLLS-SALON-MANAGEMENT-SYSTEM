import AdminLayout from "../../layout/adminLayout";
import { Search, Printer, ChevronDown } from "lucide-react";
import React, { useState } from "react";

export default function AdminProductsSold() {
  return (
    <AdminLayout title="">
      <ProductsSoldContent />
    </AdminLayout>
  );
}

function ProductsSoldContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("Davao");

  const sales = [
    {
      id: 1,
      product: "Honey Glow Serum",
      customer: "Maria Santos",
      qty: 2,
      subtotal: 1200,
      date: "2025-10-27",
      time: "10:30",
    },
    {
      id: 2,
      product: "Keratin Smooth Oil",
      customer: "Alyssa Cruz",
      qty: 1,
      subtotal: 650,
      date: "2025-10-27",
      time: "11:15",
    },
    {
      id: 3,
      product: "Lash Nourish Set",
      customer: "Bea Dela Cruz",
      qty: 3,
      subtotal: 900,
      date: "2025-10-27",
      time: "12:40",
    },
    {
      id: 4,
      product: "Silky Shampoo",
      customer: "Jessa Mae",
      qty: 1,
      subtotal: 450,
      date: "2025-10-27",
      time: "14:20",
    },
  ];

  const filteredSales = sales.filter(
    (sale) =>
      sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handlePrint = () => window.print();

  return (
    <>
      {/* PRINT STYLES */}
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
          }
          .shadow-lg {
            box-shadow: none !important;
          }
          .rounded-2xl {
            border: 1px solid #ddd;
          }
        }
      `}</style>

      {/* MAIN CONTENT */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* HEADER */}
        <header className="mb-6">
          <h1 className="text-xl lg:text-2xl font-bold text-gray-800">
            Products Sold
          </h1>
        </header>

        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

        {/* SEARCH + PRINT */}
        <div className="no-print flex items-center justify-between gap-4 mb-6">
          {/* SEARCH */}
          <div
            className="flex items-center gap-2 bg-gray-50 border px-4 py-2 rounded-full
                       w-full sm:w-[260px] lg:w-[380px]"
          >
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full outline-none text-sm bg-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={handlePrint}
            style={{
              background: "linear-gradient(to right, #ec4899, #f97316)",
              boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
            }}
            className="
    flex items-center gap-2
    rounded-full text-white font-medium
    px-4 py-2 text-sm
    sm:px-5 sm:py-2.5
    lg:px-6 lg:py-3 lg:text-base
    transition hover:scale-[1.02]
    whitespace-nowrap flex-shrink-0
  "
          >
            <Printer className="w-4 h-4 sm:w-5 sm:h-5" />
            Print
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="pb-3">
                  <button className="flex items-center gap-2 bg-gray-50 border px-4 py-2 rounded-full text-sm shadow-sm">
                    {selectedBranch} Branch <ChevronDown size={16} />
                  </button>
                </th>
                <th colSpan="5"></th>
              </tr>
              <tr className="border-b text-gray-600">
                <th className="pb-3">Product</th>
                <th className="pb-3">Customer</th>
                <th className="pb-3 text-center">Qty</th>
                <th className="pb-3 text-right">Subtotal</th>
                <th className="pb-3 text-right">Date</th>
                <th className="pb-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="border-b last:border-0">
                  <td className="py-3">{sale.product}</td>
                  <td>{sale.customer}</td>
                  <td className="text-center">{sale.qty}</td>
                  <td className="text-right">
                    ₱{sale.subtotal.toLocaleString()}
                  </td>
                  <td className="text-right">{sale.date}</td>
                  <td className="text-right">{sale.time}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredSales.length === 0 && (
            <p className="text-center text-gray-500 py-6">No results found.</p>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer className="no-print bg-white/80 py-3 border-t text-center text-sm text-gray-500">
        © 2025 D'Savonne Beauty Essentials — Admin Panel
      </footer>
    </>
  );
}
