import React, { useState } from "react";
import { Search, Printer, Plus, X } from "lucide-react";
import AdminLayout from "../../layout/adminLayout";
import Select from "react-select";

export default function AdminProductWaste() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const productOptions = [
    { value: "Keratin Smooth Oil", label: "Keratin Smooth Oil" },
    { value: "Honey Glow Serum", label: "Honey Glow Serum" },
    { value: "Hair Color Cream", label: "Hair Color Cream" },
    { value: "Shampoo 500ml", label: "Shampoo 500ml" },
    { value: "Conditioner 500ml", label: "Conditioner 500ml" },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [remarks, setRemarks] = useState("");

  const [records, setRecords] = useState([
    {
      product: "Keratin Smooth Oil",
      user: "Anna Cruz",
      quantity: 5,
      reason: "Expired",
      dateTime: "2025-10-27 09:45",
    },
  ]);

  const filteredRecords = records.filter(
    (r) =>
      r.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddWaste = () => {
    if (!selectedProduct || !quantity || !reason) {
      alert("Fill required fields");
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
    <AdminLayout title="Product Waste Records">
      <div className="space-y-6">
        {/* DIVIDER */}
        <div className="w-full h-[1px] bg-gray-300" />

        {/* SEARCH + ADD (same row) */}
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

          {/* Add Waste */}
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center justify-center gap-2 px-[16px] py-[10px] rounded-full font-medium text-white hover:scale-103 transition-all duration-200 hover:shadow-xl text-sm whitespace-nowrap"
            style={{
              background: "linear-gradient(to right, #ec4899, #f97316)",
              boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
            }}
          >
            <Plus className="w-5 h-5" />
            Add Waste
          </button>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead className="bg-gradient-to-r from-orange-100 to-yellow-100 border-b-2 border-orange-200">
                <tr>
                  <th className="text-left py-4 px-6">Product</th>
                  <th className="text-left py-4 px-6">User</th>
                  <th className="text-center py-4 px-6">Qty</th>
                  <th className="text-left py-4 px-6">Reason</th>
                  <th className="text-left py-4 px-6">Date / Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r, i) => (
                    <tr key={i} className="border-b hover:bg-orange-50">
                      <td className="py-5 px-6 font-medium">{r.product}</td>
                      <td className="py-5 px-6">{r.user}</td>
                      <td className="py-5 px-6 text-center">
                        <span className="px-4 py-1.5 bg-red-100 text-red-700 rounded-full font-bold">
                          {r.quantity}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full">
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

          {/* TABLE FOOTER – PRINT */}
          <div className="no-print flex justify-end p-4 border-t">
            <button
              onClick={() => window.print()}
              style={{
                background: "linear-gradient(to right, #ec4899, #f97316)",
                boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
              }}
              className="
                flex items-center gap-2
                px-6 py-2.5 rounded-full
                text-white font-medium
                transition hover:scale-[1.03]
              "
            >
              <Printer className="w-5 h-5" />
              Print
            </button>
          </div>
        </div>
      </div>

      {/* MODAL (UNCHANGED STYLE) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Record Product Waste</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-5">
              <Select
                options={productOptions}
                value={selectedProduct}
                onChange={setSelectedProduct}
                placeholder="Select product..."
              />

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                className="w-full px-4 py-3 border rounded-xl"
              />

              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full px-4 py-3 border rounded-xl"
              >
                <option value="">Select reason</option>
                <option>Expired</option>
                <option>Damaged</option>
                <option>Contaminated</option>
                <option>Leakage</option>
                <option>Other</option>
              </select>

              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Remarks (optional)"
                className="w-full px-4 py-3 border rounded-xl resize-none"
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 border rounded-xl"
              >
                Cancel
              </button>

              <button
                onClick={handleAddWaste}
                style={{
                  background: "linear-gradient(to right, #ec4899, #f97316)",
                  boxShadow: "0 4px 15px rgba(236, 72, 153, 0.4)",
                }}
                className="px-8 py-3 rounded-full text-white font-medium hover:scale-[1.03]"
              >
                Record Waste
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
