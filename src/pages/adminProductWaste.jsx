// src/pages/adminProductWaste.jsx
import { useState } from 'react';
import { Search, Printer, Plus, X } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import Select from 'react-select';

export default function AdminProductWaste() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const productOptions = [
    { value: 'Keratin Smooth Oil', label: 'Keratin Smooth Oil' },
    { value: 'Honey Glow Serum', label: 'Honey Glow Serum' },
    { value: 'Hair Color Cream', label: 'Hair Color Cream' },
    { value: 'Shampoo 500ml', label: 'Shampoo 500ml' },
    { value: 'Conditioner 500ml', label: 'Conditioner 500ml' },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [reason, setReason] = useState('');
  const [remarks, setRemarks] = useState('');

  const [records, setRecords] = useState([
    {
      product: 'Keratin Smooth Oil',
      user: 'Anna Cruz',
      quantity: 5,
      reason: 'Expired',
      dateTime: '2025-10-27 09:45',
    },
  ]);

  const filteredRecords = records.filter(
    r =>
      r.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddWaste = () => {
    if (!selectedProduct || !quantity || !reason) return alert('Fill required fields');

    const newRecord = {
      product: selectedProduct.label,
      user: 'Current Admin',
      quantity: parseInt(quantity),
      reason,
      dateTime: new Date().toLocaleString('en-PH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).replace(',', ''),
    };

    setRecords([newRecord, ...records]);
    setShowAddModal(false);
    setSelectedProduct(null);
    setQuantity('');
    setReason('');
    setRemarks('');
  };

  return (
    <AdminLayout title="Product Waste Records">
      <div className="space-y-8">
        {/* Header */}
      {/* BLACK LINE SEPARATOR */}
        <div className="w-full h-[1px] bg-gray-300 mb-6"></div>

        {/* Controls: Search, Add, Print */}
        <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
          {/* Search Bar */}
          <div className="relative w-[250px]">
            <Search className="mt-2.5 absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* Add Waste Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-medium px-4 py-2 rounded-full flex items-center gap-2 shadow-lg transition whitespace-nowrap h-[40px] hover:scale-103"
          style={{
      background: 'linear-gradient(to right, #ec4899, #f97316)',
      padding: '10px 24px',
      borderRadius: '9999px',
      boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
    }}  
          
          >
            <Plus className="w-5 h-5" />
            Add Waste
          </button>

          {/* Flexible space */}
          <div className="flex-1"></div>

          {/* Print Button */}
          <button
            onClick={() => window.print()}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6 py-2 rounded-full flex items-center gap-2 shadow-lg transition whitespace-nowrap h-[40px]"
          >
            <Printer className="w-5 h-5" />
            Print
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-100 to-yellow-100 border-b-2 border-orange-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Product Name</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-700">Quantity</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Reason</th>
                  <th className="text-left py-4 px-6 font-semibold text-gray-700">Date/Time</th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-gray-500">
                      No records found
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((r, i) => (
                    <tr key={i} className="border-b hover:bg-orange-50">
                      <td className="py-5 px-6 font-medium text-gray-800">{r.product}</td>
                      <td className="py-5 px-6 text-gray-700">{r.user}</td>
                      <td className="text-center py-5 px-6">
                        <span className="inline-block px-5 py-2 bg-red-100 text-red-700 rounded-full font-bold">
                          {r.quantity}
                        </span>
                      </td>
                      <td className="py-5 px-6">
                        <span className="inline-block px-5 py-2 bg-orange-100 text-orange-700 rounded-full font-medium">
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
        </div>
      </div>

      {/* Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Record Product Waste</h3>
              <button onClick={() => setShowAddModal(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <Select
                  options={productOptions}
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                  placeholder="Search and select product..."
                  isSearchable
                  styles={{
                    control: base => ({ ...base, borderRadius: '0.75rem', padding: '0.25rem' }),
                  }}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity *</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason *</label>
                <select
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400"
                >
                  <option value="">Select reason</option>
                  <option>Expired</option>
                  <option>Damaged</option>
                  <option>Contaminated</option>
                  <option>Leakage</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
                <textarea
                  value={remarks}
                  onChange={e => setRemarks(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-400 resize-none"
                  placeholder="Additional details..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleAddWaste}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-medium rounded-xl shadow hover:shadow-lg hover:scale-103"
              style={{
      background: 'linear-gradient(to right, #ec4899, #f97316)',
      padding: '10px 24px',
      borderRadius: '9999px',
      boxShadow: '0 4px 15px rgba(236, 72, 153, 0.4)',
    }}  
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
