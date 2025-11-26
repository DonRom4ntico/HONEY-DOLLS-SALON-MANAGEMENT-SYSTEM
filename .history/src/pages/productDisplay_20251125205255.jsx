// src/pages/ProductDisplay.jsx
import { Search, ChevronDown, Plus, X, Upload } from 'lucide-react';
import AdminLayout from '../layout/adminLayout';
import { useState } from 'react';

export default function ProductDisplay() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('created-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 6;

  const categories = ['Hair Care', 'Skincare', 'Body Care', 'Nail Care', 'Makeup', 'Fragrance'];

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    unitCost: '',
    image: null // will hold base64 string or null
  });

  const [products, setProducts] = useState([
    { id: 'PRD-001', name: 'Argan Oil Serum', unitCost: 350.00, category: 'Hair Care', createdAt: 'Oct 25, 2025', updatedAt: 'Nov 10, 2025' },
    { id: 'PRD-002', name: 'Keratin Shampoo', unitCost: 220.00, category: 'Hair Care', createdAt: 'Oct 27, 2025', updatedAt: 'Nov 08, 2025' },
    { id: 'PRD-003', name: 'Vitamin C Toner', unitCost: 250.00, category: 'Skincare', createdAt: 'Oct 28, 2025', updatedAt: 'Nov 12, 2025' },
    { id: 'PRD-004', name: 'Moisture Cream', unitCost: 410.00, category: 'Skincare', createdAt: 'Oct 29, 2025', updatedAt: 'Nov 15, 2025' },
    { id: 'PRD-005', name: 'Aloe Gel', unitCost: 190.00, category: 'Skincare', createdAt: 'Oct 30, 2025', updatedAt: 'Nov 05, 2025' },
    { id: 'PRD-006', name: 'Whitening Lotion', unitCost: 310.00, category: 'Body Care', createdAt: 'Nov 01, 2025', updatedAt: 'Nov 18, 2025' },
  ]);

  // Filter & Sort
  let filtered = products.filter(item =>
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filtered.sort((a, b) => {
    if (sortOrder === 'created-desc') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === 'created-asc') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === 'updated-desc') return new Date(b.updatedAt) - new Date(a.updatedAt);
    return new Date(a.updatedAt) - new Date(b.updatedAt);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle Image Upload - Fixed & Clean
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Add Product
  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.category || !newProduct.unitCost) return;

    const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const newId = `PRD-${String(products.length + 1).padStart(3, '0')}`;

    setProducts(prev => [...prev, {
      id: newId,
      name: newProduct.name,
      unitCost: parseFloat(newProduct.unitCost),
      category: newProduct.category,
      createdAt: today,
      updatedAt: today,
      image: newProduct.image
    }]);

    setNewProduct({ name: '', category: '', unitCost: '', image: null });
    setIsModalOpen(false);
  };

  return (
    <AdminLayout title="Product Display">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full mx-auto">

        {/* Header + Add Button */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Honey Dolls • Brilliant Beauty Hub</h1>
            <p className="text-sm text-gray-600 mt-2">
              Product Display<br />
              View and manage all products in inventory
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            style={{
              background: 'linear-gradient(to right, #ec4899, #f97316)',
              boxShadow: '0 10px 30px rgba(236, 72, 153, 0.5)',
            }}
            className="text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-pink-500/50 transition-all duration-300 flex items-center gap-3 hover:scale-105"
          >
            <Plus className="w-7 h-7" />
            Add New Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8 items-center">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, name, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm"
            />
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border border-gray-300 rounded-xl appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white cursor-pointer"
            >
              <option value="created-desc">Created: Newest</option>
              <option value="created-asc">Created: Oldest</option>
              <option value="updated-desc">Updated: Recent</option>
              <option value="updated-asc">Updated: Oldest</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-pink-50">
                <th className="text-left py-4 px-6 font-semibold">Product ID</th>
                <th className="text-left py-4 px-6 font-semibold">Product Name</th>
                <th className="text-center py-4 px-6 font-semibold">Unit Cost</th>
                <th className="text-center py-4 px-6 font-semibold">Category</th>
                <th className="text-center py-4 px-6 font-semibold">Created At</th>
                <th className="text-center py-4 px-6 font-semibold">Updated At</th>
                <th className="text-center py-4 px-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 font-mono text-orange-700 font-medium">{item.id}</td>
                  <td className="py-4 px-6 font-medium">{item.name}</td>
                  <td className="text-center py-4 px-6 text-orange-700 font-semibold">₱{item.unitCost.toFixed(2)}</td>
                  <td className="text-center py-4 px-6">
                    <span className="inline-block px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="text-center py-4 px-6 text-gray-600">{item.createdAt}</td>
                  <td className="text-center py-4 px-6 text-gray-600">{item.updatedAt}</td>
                  <td className="py-4 px-6">
                    <div className="flex justify-center gap-3">
                      <button className="px-6 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FFD873] to-[#FF9B52] shadow-sm hover:brightness-110 transition-all">
                        Edit
                      </button>
                      <button className="px-6 py-2 rounded-lg text-white font-semibold text-xs bg-gradient-to-r from-[#FF8A80] to-[#FF5252] shadow-sm hover:brightness-110 transition-all">
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-6">
          <div className="flex items-center gap-4 text-sm">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50">
              Previous
            </button>
            <span className="font-medium">Page {currentPage} of {totalPages || 1}</span>
            <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>

        {/* MODAL WITH IMAGE UPLOAD */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Image Upload */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Product Image</label>
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <div className="border-2 border-dashed border-orange-300 rounded-2xl p-8 text-center hover:border-orange-500 transition-all bg-gradient-to-br from-pink-50 to-orange-50">
                    {newProduct.image ? (
                      <img src={newProduct.image} alt="Preview" className="mx-auto max-h-48 rounded-xl object-cover shadow-lg" />
                    ) : (
                      <>
                        <Upload className="mx-auto w-12 h-12 text-orange-600 mb-3" />
                        <p className="text-gray-600 font-medium">Click to upload or drag & drop</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {newProduct.image && (
                  <button
                    onClick={() => setNewProduct(prev => ({ ...prev, image: null }))}
                    className="mt-3 text-sm text-red-600 hover:text-red-800"
                  >
                    Remove Image
                  </button>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Rose Quartz Moisturizer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Select category...</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Unit Cost (₱)</label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={newProduct.unitCost}
                    onChange={(e) => setNewProduct({ ...newProduct, unitCost: e.target.value })}
                    placeholder="299.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProduct}
                  disabled={!newProduct.name || !newProduct.category || !newProduct.unitCost}
                  style={{
                    background: newProduct.name && newProduct.category && newProduct.unitCost
                      ? 'linear-gradient(to right, #ec4899, #f97316)'
                      : '#cccccc',
                  }}
                  className="flex-1 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}