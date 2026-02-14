import React, { useState } from "react";
import { Search, Printer, Plus, X } from "lucide-react";
import AdminLayout from "../../layout/adminLayout";
import Select from "react-select";

export default function AdminProductDamage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  // Product dropdown options
  const productOptions = [
    { value: "Honey Glow Serum", label: "Honey Glow Serum", stock: 58 },
    { value: "Keratin Smooth Oil", label: "Keratin Smooth Oil", stock: 45 },
    { value: "Hair Color Cream", label: "Hair Color Cream", stock: 72 },
    { value: "Shampoo 500ml", label: "Shampoo 500ml", stock: 120 },
    { value: "Conditioner 500ml", label: "Conditioner 500ml", stock: 95 },
  ];

  // Form state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  // Damage records (mock data)
  const [records, setRecords] = useState([
    {
      product: "Honey Glow Serum",
      user: "Maria Santos",
      quantity: 3,
      reason: "Broken bottle",
      dateTime: "2025-10-27 08:30",
    },
  ]);

  const filteredRecords = records.filter(
    (r) =>
      r.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddDamage = () => {
    if (!selectedProduct || !quantity || !reason) {
      alert("Please fill all required fields");
      return;
    }

    const newRecord = {
      product: selectedProduct.label,
      user: "Current Admin",
      quantity: parseInt(quantity),
      reason,
      dateTime: new Date()
        .toLocaleString("en-PH", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })
        .replace(",", ""),
    };

    setRecords([newRecord, ...records]);
    setShowAddModal(false);
    setSelectedProduct(null);
    setQuantity("");
    setReason("");
    setRemarks("");
  };

  return (
    <AdminLayout title="Product Damage Records">
      {/* Divider */}
      <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

      <div className="space-y-6">
        {/* SEARCH + RECORD DAMAGE BUTTON (same row) */}
        <div className="flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] sm:max-w-xs">
            <Search className="absolute left-4 top-8 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-[10px] border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
            />
          </div>

          {/* Record Damage Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 px-[16px] py-[10px] rounded-full font-medium text-white hover:scale-103 transition-all duration-200 hover:shadow-xl text-sm whitespace-nowrap"
            style={{
              background: "linear-gradient(to right, #ec4899, #f97316)",
              boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
            }}
          >
            <Plus className="w-5 h-5" />
            Record Damage
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pink-100 border-b-2 border-pink-300">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Product Name
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    User
                  </th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Reason
                  </th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">
                    Date/Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-10 text-gray-500">
                      No damage records found.
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                      <td className="py-5 px-6 font-medium">{r.product}</td>
                      <td className="py-5 px-6 text-gray-700">{r.user}</td>
                      <td className="text-center py-5 px-6">
                        <span className="inline-block px-5 py-2 bg-red-100 text-red-700 rounded-full font-bold">
                          {r.quantity}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-block px-5 py-2 bg-pink-100 text-pink-700 rounded-full font-medium">
                          {r.reason}
                        </span>
                      </td>
                      <td className="py-5 px-6 text-gray-600">{r.dateTime}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* TABLE FOOTER – PRINT BUTTON */}
          <div className="flex justify-end p-4 border-t">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center gap-2 px-[16px] py-[10px] rounded-full font-medium text-white hover:scale-103 transition-all duration-200 hover:shadow-xl text-sm whitespace-nowrap"
              style={{
                background: "linear-gradient(to right, #ec4899, #f97316)",
                boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
              }}
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* ADD DAMAGE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Record Product Damage
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <Select
                  options={productOptions}
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                  placeholder="Search and select product..."
                  isSearchable
                  className="text-sm"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderRadius: "0.5rem",
                      padding: "0.25rem",
                    }),
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity *
                </label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                  <option value="">Select reason</option>
                  <option>Broken bottle</option>
                  <option>Leakage</option>
                  <option>Dropped</option>
                  <option>Manufacturing defect</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remarks (Optional)
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
                  placeholder="Additional details..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddDamage}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white font-medium rounded-full shadow hover:shadow-lg transition hover:scale-103"
                style={{
                  background: "linear-gradient(to right, #ec4899, #f97316)",
                  padding: "10px 24px",
                  borderRadius: "9999px",
                  boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
                }}
              >
                Record Damage
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
