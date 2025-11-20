// src/pages/recordProductWaste.jsx
import { ChevronDown } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';

export default function RecordProductWaste() {
  const [product, setProduct] = useState('Hair Spa Mask');
  const [reason, setReason] = useState('Expired – Product reached shelf life date (Oct 25, 2025)');
  const [date] = useState('Oct 27, 2025');
  const [time] = useState('4:30 PM');
  const [user, setUser] = useState('Jessa Mae');

  return (
    <AdminLayout title="Product Waste Record">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Product Waste Record</h2>
          <p className="text-sm text-gray-600 mt-1">Record Details</p>
        </div>

        <form className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <div className="relative">
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 appearance-none bg-white text-sm"
              >
                <option>Hair Spa Mask</option>
                <option>Honey Glow Serum</option>
                <option>Silky Smooth Shampoo</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 resize-none text-sm"
            />
          </div>

          {/* Date & Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <div className="relative">
                <input
                  type="text"
                  value={date}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm cursor-default"
                />
                <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <div className="relative">
                <input
                  type="text"
                  value={time}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl bg-white text-sm cursor-default"
                />
                <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">User Name</label>
            <div className="relative">
              <select
                value={user}
                onChange={(e) => setUser(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 appearance-none bg-white text-sm"
              >
                <option>Jessa Mae</option>
                <option>Anna</option>
                <option>Keoski</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-4 pt-6">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold rounded-full shadow hover:shadow-md transition text-sm"
            >
              Save Record
            </button>
            <button
              type="button"
              className="px-8 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}