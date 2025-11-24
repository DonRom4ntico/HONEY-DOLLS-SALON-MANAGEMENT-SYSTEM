// src/pages/AdminProductUsage.jsx
import { useState } from 'react';
import { Search, Plus, Trash2, X } from 'lucide-react';
import Select from 'react-select';
import AdminLayout from '../layout/adminLayout';

export default function AdminProductUsage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Modal state
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantityUsed, setQuantityUsed] = useState(1);
  const [remarks, setRemarks] = useState('');

  // Sample recorded usage
  const [usageRecords, setUsageRecords] = useState([
    {
      id: 1,
      product: 'Hair Serum',
      quantity: 5,
      date: 'Nov 17, 2025',
      time: '10:30 AM',
      staff: 'Maria Santos',
      remarks: 'Used for client treatment',
    },
    {
      id: 2,
      product: 'Nail Polish Set',
      quantity: 3,
      date: 'Nov 16, 2025',
      time: '2:15 PM',
      staff: 'Anna Reyes',
      remarks: 'Manicure service',
    },
  ]);

  // Product catalog for dropdown
  const availableProducts = [
    { value: 'Hair Serum', label: 'Hair Serum', stock: 115 },
    { value: 'Nail Polish Set', label: 'Nail Polish Set', stock: 72 },
    { value: 'Shampoo 500ml', label: 'Shampoo 500ml', stock: 195 },
    { value: 'Conditioner 500ml', label: 'Conditioner 500ml', stock: 178 },
    { value: 'Hair Mask', label: 'Hair Mask', stock: 87 },
    { value: 'Facial Cream', label: 'Facial Cream', stock: 148 },
    { value: 'Lip Tint', label: 'Lip Tint', stock: 297 },
  ];

  const filteredRecords = usageRecords.filter(record =>
    record.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.staff.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUsage = () => {
    if (!selectedProduct || quantityUsed < 1) {
      alert('Please select a product and enter valid quantity');
      return;
    }

    if (quantityUsed > selectedProduct.stock) {
      alert(`Only ${selectedProduct.stock} units available in stock`);
      return;
    }

    const newRecord = {
      id: Date.now(),
      product: selectedProduct.value,
      quantity: parseInt(quantityUsed),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      staff: 'Current Admin',
      remarks: remarks || 'No remarks',
    };

    setUsageRecords([newRecord, ...usageRecords]);
    setShowAddModal(false);
    setSelectedProduct(null);
    setQuantityUsed(1);
    setRemarks('');
  };

  return (
    <AdminLayout title="Record Product Usage" currentPath="/admin/product-usage">
      <div className="min-h-screen bg-white pb-32">
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Record Product Usage</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-medium rounded-xl hover:shadow-md transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Record Usage
            </button>
          </div>

          {/* SEARCH */}
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by product or staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
          </div>

          {/* USAGE TABLE */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-pink-50">
                  <th className="text-left py-4 px-4 font-semibold">Product</th>
                  <th className="text-center py-4 px-4 font-semibold">Quantity Used</th>
                  <th className="text-center py-4 px-4 font-semibold">Date & Time</th>
                  <th className="text-left py-4 px-4 font-semibold">Recorded By</th>
                  <th className="text-left py-4 px-4 font-semibold">Remarks</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4 font-medium">{record.product}</td>
                    <td className="text-center py-4 px-4">
                      <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
                        {record.quantity}
                      </span>
                    </td>
                    <td className="text-center py-4 px-4 text-gray-600">
                      {record.date}<br />
                      <span className="text-xs">{record.time}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{record.staff}</td>
                    <td className="py-4 px-4 text-gray-600">{record.remarks}</td>
                    <td className="py-4 px-4 text-center">
                      <button
                        onClick={() => setUsageRecords(usageRecords.filter(r => r.id !== record.id))}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ADD USAGE MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Record Product Usage</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Product *</label>
                <Select
                  options={availableProducts}
                  value={selectedProduct}
                  onChange={setSelectedProduct}
                  placeholder="Search product..."
                  isSearchable
                  className="text-sm"
                  styles={{ control: base => ({ ...base, borderRadius: '0.5rem', padding: '0.25rem' }) }}
                />
              </div>

              {selectedProduct && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Available Stock: <span className="font-bold text-orange-600">{selectedProduct.stock}</span>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity Used * (Max: {selectedProduct.stock})
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={selectedProduct.stock}
                      value={quantityUsed}
                      onChange={(e) => setQuantityUsed(Math.max(1, Math.min(selectedProduct.stock, parseInt(e.target.value) || 1)))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
                    <input
                      type="text"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="e.g. Used for keratin treatment"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUsage}
                disabled={!selectedProduct}
                className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-medium hover:shadow-md disabled:opacity-50"
              >
                Record Usage
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}