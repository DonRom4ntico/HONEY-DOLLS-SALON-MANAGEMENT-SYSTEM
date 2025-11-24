import AdminLayout from "../layout/adminLayout";
import { Search, Printer, Menu, X, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AdminProductsSold() {
  return (
    <AdminLayout title="">
      <ProductsSoldContent />
    </AdminLayout>
  );
}

function ProductsSoldContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('Davao');

  const sales = [
    { id: 1, product: 'Honey Glow Serum', customer: 'Maria Santos', qty: 2, subtotal: 1200, date: '2025-10-27', time: '10:30' },
    { id: 2, product: 'Keratin Smooth Oil', customer: 'Alyssa Cruz', qty: 1, subtotal: 650, date: '2025-10-27', time: '11:15' },
    { id: 3, product: 'Lash Nourish Set', customer: 'Bea Dela Cruz', qty: 3, subtotal: 900, date: '2025-10-27', time: '12:40' },
    { id: 4, product: 'Silky Shampoo', customer: 'Jessa Mae', qty: 1, subtotal: 450, date: '2025-10-27', time: '14:20' },
  ];

  const filteredSales = sales.filter(sale =>
    sale.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sale.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePrint = () => window.print();

  return (
    <>
      {/* PRINT STYLES */}
      <style jsx>{`
        @media print {
          .no-print, .hamburger, .sidebar, .overlay { 
            display: none !important; 
          }
          .print-only { 
            display: block !important; 
          }
          body { background: white !important; }
          .shadow-lg { box-shadow: none !important; }
          .rounded-2xl { border: 1px solid #ddd; }
        }
        .print-only { display: none; }
      `}</style>

      {/* HEADER */}
      <header className=" shadow- no-print sticky top-0 z-50">
        <div className="px-6 py-4 flex items-center justify-between">
          <h1 className="text-lg md:text-xl font-bold text-gray-800">Products Sold</h1>



          {/* MOBILE HAMBURGER */}
          <button
            className="hamburger md:hidden bg-white p-2 rounded-full shadow-md"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>
    {/* BLACK LINE SEPARATOR */}
        <div className="w-full h-[1px] bg-gray-300 mb-6"></div>
      {/* SIDEBAR OVERLAY */}
      {isSidebarOpen && (
        <div
          className="overlay fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SLIDE-IN SIDEBAR */}
      <aside className={`
        sidebar fixed top-0 left-0 h-full w-72 bg-white shadow-xl transform z-50 md:hidden transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="p-4 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            <li className="p-3 rounded-lg bg-gray-100 font-semibold">Dashboard</li>
            <li className="p-3 rounded-lg hover:bg-gray-100">Products</li>
            <li className="p-3 rounded-lg hover:bg-gray-100">Products Sold</li>
            <li className="p-3 rounded-lg hover:bg-gray-100">Products Wasted</li>
            <li className="p-3 rounded-lg hover:bg-gray-100">Branches</li>
          </ul>
        </nav>
      </aside>

      {/* CONTENT WRAPPER */}
      <div className="p-6">

        {/* SEARCH + BRANCH + PRINT IN ONE LINE */}
        <div className="no-print flex items-center justify-between bg-white p-3 rounded-xl shadow mb-6">

          {/* LEFT SIDE: SEARCH + DROPDOWN */}
          <div className="flex items-center gap-3">

            {/* SMALL SEARCH BAR */}
            <div className="flex items-center gap-2 bg-gray-50 border px-3 py-2 rounded-full w-[220px]">
              <Search size={18} className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* DROPDOWN */}
            <button className="flex items-center gap-2 bg-gray-50 border px-4 py-2 rounded-full text-sm shadow-sm">
              {selectedBranch} Branch <ChevronDown size={16} />
            </button>

          </div>

          {/* RIGHT SIDE: PRINT BUTTON */}
          <button
            onClick={handlePrint}
            className="no-print bg-gray-50 flex items-center gap-2 px-4 py-2 rounded-full border shadow text-gray-700 hover:bg-gray-100 transition text-sm"
          >
            <Printer size={18} /> Print
          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white p-6 rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-left text-gray-600">
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
                  <td className="text-right">₱{sale.subtotal.toLocaleString()}</td>
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
