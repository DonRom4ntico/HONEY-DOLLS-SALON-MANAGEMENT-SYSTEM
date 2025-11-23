// src/pages/AdminProductWaste.jsx
import { useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import AdminLayout from "../layout/adminLayout";

export default function AdminProductWaste() {
  const [wasteList, setWasteList] = useState([]);
  const [formData, setFormData] = useState({
    productName: "",
    quantity: 1,
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const increaseQty = () =>
    setFormData({ ...formData, quantity: formData.quantity + 1 });

  const decreaseQty = () =>
    setFormData({
      ...formData,
      quantity: formData.quantity > 1 ? formData.quantity - 1 : 1,
    });

  const handleAddWaste = () => {
    if (!formData.productName || !formData.reason) return;

    setWasteList([...wasteList, formData]);
    setFormData({ productName: "", quantity: 1, reason: "" });
  };

  return (
    <AdminLayout title="Record Product Waste">

      {/* FORM */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm mb-8">
        <h3 className="text-lg font-bold text-orange-800 mb-4 flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-orange-600" />
          Add Waste Record
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full border rounded-lg p-2 focus:ring-orange-400"
              placeholder="Enter product name"
            />
          </div>

          {/* QUANTITY */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                type="button"
                onClick={decreaseQty}
                className="p-2 hover:bg-gray-100"
              >
                <Minus />
              </button>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full text-center p-2"
              />
              <button
                type="button"
                onClick={increaseQty}
                className="p-2 hover:bg-gray-100"
              >
                <Plus />
              </button>
            </div>
          </div>

          {/* REASON */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Reason
            </label>
            <select
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Select reason...</option>
              <option value="Expired">Expired</option>
              <option value="Opened/Contaminated">Opened / Contaminated</option>
              <option value="Unsalable">Unsalable</option>
              <option value="Incorrect Handling">Incorrect Handling</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleAddWaste}
          className="mt-4 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2"
        >
          <Plus className="w-5 h-5" /> Add to Waste List
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Waste Records
        </h3>

        {wasteList.length === 0 ? (
          <p className="text-gray-500 italic">No waste recorded yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-100 text-orange-900">
                  <th className="p-3 border">Product</th>
                  <th className="p-3 border">Quantity</th>
                  <th className="p-3 border">Reason</th>
                </tr>
              </thead>
              <tbody>
                {wasteList.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-3 border">{item.productName}</td>
                    <td className="p-3 border">{item.quantity}</td>
                    <td className="p-3 border">{item.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
