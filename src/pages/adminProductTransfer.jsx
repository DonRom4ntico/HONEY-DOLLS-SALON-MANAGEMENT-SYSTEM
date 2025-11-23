// src/pages/AdminProductTransfer.jsx
import { useState } from 'react';
import { Search, Plus, Trash2, X } from 'lucide-react';
import Select from 'react-select';
import AdminLayout from '../layout/adminLayout'; // Fixed typo: was adminLayout

export default function AdminProductTransfer() {
  const [fromBranch, setFromBranch] = useState('Gaisano Mall (Branch 1)');
  const [toBranch, setToBranch] = useState('SM Lanang (Branch 2)');
  const [remarks, setRemarks] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [transferQty, setTransferQty] = useState(1);
  const [productRemarks, setProductRemarks] = useState('');

  const [products, setProducts] = useState([
    { id: 1, name: 'Hair Serum', available: 120, qty: 20, unitPrice: 180, remarks: 'Fast-moving item', status: 'added' },
    { id: 2, name: 'Nail Polish Set', available: 75, qty: 15, unitPrice: 250, remarks: 'Popular at SM Lanang', status: 'returned' },
  ]);

  const availableProducts = [
    { value: 'Hair Serum', label: 'Hair Serum', available: 120, price: 180 },
    { value: 'Nail Polish Set', label: 'Nail Polish Set', available: 75, price: 250 },
    { value: 'Shampoo 500ml', label: 'Shampoo 500ml', available: 200, price: 299 },
    { value: 'Conditioner 500ml', label: 'Conditioner 500ml', available: 180, price: 320 },
    { value: 'Hair Mask', label: 'Hair Mask', available: 90, price: 450 },
    { value: 'Facial Cream', label: 'Facial Cream', available: 150, price: 599 },
    { value: 'Lip Tint', label: 'Lip Tint', available: 300, price: 149 },
    { value: 'Eyeliner Pen', label: 'Eyeliner Pen', available: 80, price: 199 },
  ];

  const filtered = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const removeProduct = id => setProducts(products.filter(p => p.id !== id));

  const changeQty = (id, val) => {
    const product = products.find(p => p.id === id);
    const n = Math.max(0, Math.min(parseInt(val) || 0, product.available));
    setProducts(products.map(p => (p.id === id ? { ...p, qty: n } : p)));
  };

  const handleAddProduct = () => {
    if (!selectedProduct) return alert('Please select a product');
    if (transferQty < 1 || transferQty > selectedProduct.available) return alert(`Quantity must be between 1 and ${selectedProduct.available}`);
    if (products.some(p => p.name === selectedProduct.value)) return alert('This product is already in the transfer list!');

    setProducts(prev => [...prev, {
      id: Date.now(),
      name: selectedProduct.value,
      available: selectedProduct.available,
      qty: parseInt(transferQty),
      unitPrice: selectedProduct.price,
      remarks: productRemarks,
      status: 'added',
    }]);

    setShowAddModal(false);
    setSelectedProduct(null);
    setTransferQty(1);
    setProductRemarks('');
  };

  const handleProductChange = (option) => {
    setSelectedProduct(option);
    setTransferQty(1);
  };

  return (
    <AdminLayout title="Transfer Products" currentPath="/admin/transfer">
      {/* Only added pb-32 to the main container so buttons are never cut off */}
      <div className="min-h-screen bg-white pb-32">
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">

          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transfer Products</h2>

          {/* BRANCH SELECTION */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Branch</label>
              <select value={fromBranch} onChange={e => setFromBranch(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300">
                <option>Gaisano Mall (Branch 1)</option>
                <option>SM Lanang (Branch 2)</option>
                <option>Abreeza Mall (Branch 3)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To Branch</label>
              <select value={toBranch} onChange={e => setToBranch(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300">
                <option>SM Lanang (Branch 2)</option>
                <option>Gaisano Mall (Branch 1)</option>
                <option>Abreeza Mall (Branch 3)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reference Code</label>
              <div className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-xl text-gray-600 font-medium">
                TR-20251027-001
              </div>
            </div>
          </div>

          {/* SEARCH + ADD PRODUCT — now visible */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search product..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              />
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-orange-400 to-pink-400 text-white font-medium rounded-xl hover:shadow-md transition flex items-center gap-2 whitespace-nowrap"
            >
              <Plus className="w-5 h-5" /> Add Product
            </button>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-pink-50">
                  <th className="text-left py-3 px-4 font-semibold">Product</th>
                  <th className="text-center py-3 px-4 font-semibold">Available (From Branch)</th>
                  <th className="text-center py-3 px-4 font-semibold">Quantity to Transfer</th>
                  <th className="text-center py-3 px-4 font-semibold">Unit Price</th>
                  <th className="text-left py-3 px-4 font-semibold">Remarks</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{p.name}</td>
                    <td className="text-center py-3 px-4">{p.available}</td>
                    <td className="text-center py-3 px-4">
                      <input
                        type="number"
                        min="0"
                        max={p.available}
                        value={p.qty}
                        onChange={e => changeQty(p.id, e.target.value)}
                        className="w-20 text-center border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-300"
                      />
                    </td>
                    <td className="text-center py-3 px-4">₱{p.unitPrice}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${p.status === 'added' ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'}`}>
                        {p.remarks}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button onClick={() => removeProduct(p.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* REMARKS */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Remarks / Notes</label>
            <textarea
              value={remarks}
              onChange={e => setRemarks(e.target.value)}
              placeholder="Optional reason for transfer..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-300 text-sm"
              rows="3"
            />
          </div>

          {/* SUBMIT BUTTONS — now fully visible */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button className="px-8 py-3 border border-gray-300 rounded-full font-medium text-gray-700 hover:bg-gray-50 transition">
              Cancel
            </button>
            <button className="px-10 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-full font-bold hover:shadow-lg transition shadow-md">
              Submit Transfer
            </button>
          </div>
        </div>
      </div>

      {/* MODAL — unchanged */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-900">Add Product to Transfer</h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                <Select
                  options={availableProducts}
                  value={selectedProduct}
                  onChange={handleProductChange}
                  placeholder="Search and select product..."
                  isSearchable
                  className="text-sm"
                  styles={{ control: base => ({ ...base, borderRadius: '0.5rem', borderColor: '#d1d5db', padding: '0.25rem' }) }}
                />
              </div>

              {selectedProduct && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available Qty</label>
                      <input type="number" value={selectedProduct.available} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price (₱)</label>
                      <input type="number" value={selectedProduct.price} readOnly className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Quantity to Transfer * (Max: {selectedProduct.available})
                    </label>
                    <input
                      type="number"
                      min="1"
                      max={selectedProduct.available}
                      value={transferQty}
                      onChange={(e) => setTransferQty(Math.max(1, Math.min(selectedProduct.available, parseInt(e.target.value) || 1)))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Remarks (Optional)</label>
                    <input
                      type="text"
                      value={productRemarks}
                      onChange={e => setProductRemarks(e.target.value)}
                      placeholder="e.g. For promo display"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button onClick={() => setShowAddModal(false)} className="px-6 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50">
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                disabled={!selectedProduct}
                className="px-6 py-2 bg-gradient-to-r from-orange-400 to-pink-400 text-white rounded-lg font-medium hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Transfer
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}