// src/pages/ProductDisplay.jsx
import {
  Search,
  ChevronDown,
  Plus,
  X,
  Upload,
  Edit,
  Trash2,
} from "lucide-react";
import AdminLayout from "../layout/adminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function ProductDisplay() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("created-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const itemsPerPage = 6;

  const categories = [
    "Hair Care",
    "Skincare",
    "Body Care",
    "Nail Care",
    "Makeup",
    "Fragrance",
  ];

  const [newProduct, setNewProduct] = useState({
    prodname: "",
    prodcat: "",
    price: "",
    prodimage: null,
  });

  const [products, setProducts] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/products`);
      setProducts(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter & Sort
  const filtered = products
    .filter(
      (item) =>
        item.prodname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prodcat.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "created-desc")
        return new Date(b.createdat) - new Date(a.createdat);
      if (sortOrder === "created-asc")
        return new Date(a.createdat) - new Date(b.createdat);
      return 0;
    });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewProduct((prev) => ({ ...prev, prodimage: file }));
  };

  // Add or Update product
  const handleSaveProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("prodname", newProduct.prodname);
      formData.append("prodcat", newProduct.prodcat);
      formData.append("price", newProduct.price);
      if (newProduct.prodimage)
        formData.append("prodimage", newProduct.prodimage);

      if (editProduct) {
        // UPDATE
        const { data } = await axios.put(
          `${API_BASE}/products/${editProduct.productid}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setProducts((prev) =>
          prev.map((p) =>
            p.productid === data.product.productid ? data.product : p
          )
        );
      } else {
        // CREATE
        const { data } = await axios.post(`${API_BASE}/products`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts((prev) => [...prev, data.product]);
      }

      setNewProduct({ prodname: "", prodcat: "", price: "", prodimage: null });
      setEditProduct(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product. Check console for details.");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`${API_BASE}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.productid !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product. Check console for details.");
    }
  };

  // Open modal for editing
  const handleEdit = (product) => {
    setEditProduct(product);
    setNewProduct({
      prodname: product.prodname,
      prodcat: product.prodcat,
      price: product.price,
      prodimage: null, // optional to upload new image
    });
    setIsModalOpen(true);
  };

  return (
    <AdminLayout title="Product Display">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full mx-auto">
        {/* Header + Add Button */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
              Honey Dolls • Brilliant Beauty Hub
            </h1>
            <p className="text-sm text-gray-600 mt-2">
              Product Display <br />
              View and manage all products in inventory
            </p>
          </div>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setEditProduct(null);
              setNewProduct({
                prodname: "",
                prodcat: "",
                price: "",
                prodimage: null,
              });
            }}
            style={{
              background: "linear-gradient(to right, #ec4899, #f97316)",
              boxShadow: "0 10px 30px rgba(236, 72, 153, 0.5)",
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
              placeholder="Search by name or category..."
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
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-pink-50">
                <th className="text-left py-4 px-6 font-semibold">ID</th>
                <th className="text-left py-4 px-6 font-semibold">
                  Product Name
                </th>
                <th className="text-center py-4 px-6 font-semibold">Price</th>
                <th className="text-center py-4 px-6 font-semibold">
                  Category
                </th>
                <th className="text-center py-4 px-6 font-semibold">Image</th>
                <th className="text-center py-4 px-6 font-semibold">
                  Created At
                </th>
                <th className="text-center py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.productid} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 font-mono text-orange-700 font-medium">
                    {item.productid}
                  </td>
                  <td className="py-4 px-6 font-medium">{item.prodname}</td>
                  <td className="text-center py-4 px-6 text-orange-700 font-semibold">
                    ₱{item.price.toFixed(2)}
                  </td>
                  <td className="text-center py-4 px-6">{item.prodcat}</td>
                  <td className="text-center py-4 px-6">
                    {item.prodimage && (
                      <img
                        src={`${API_BASE}/uploads/${item.prodimage}`}
                        alt={item.prodname}
                        className="mx-auto max-h-12 rounded-xl object-cover"
                      />
                    )}
                  </td>
                  <td className="text-center py-4 px-6">
                    {item.createdat
                      ? new Date(item.createdat).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="text-center py-4 px-6 flex justify-center gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center gap-1"
                    >
                      <Edit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.productid)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-6">
          <div className="flex items-center gap-4 text-sm">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="font-medium">
              Page {currentPage} of {totalPages || 1}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Product Image
                </label>
                <label htmlFor="image-upload" className="cursor-pointer block">
                  <div className="border-2 border-dashed border-orange-300 rounded-2xl p-8 text-center hover:border-orange-500 transition-all bg-gradient-to-br from-pink-50 to-orange-50">
                    {newProduct.prodimage ? (
                      <img
                        src={URL.createObjectURL(newProduct.prodimage)}
                        alt="Preview"
                        className="mx-auto max-h-48 rounded-xl object-cover shadow-lg"
                      />
                    ) : editProduct && editProduct.prodimage ? (
                      <img
                        src={`${API_BASE}/uploads/${editProduct.prodimage}`}
                        alt="Current"
                        className="mx-auto max-h-48 rounded-xl object-cover shadow-lg"
                      />
                    ) : (
                      <>
                        <Upload className="mx-auto w-12 h-12 text-orange-600 mb-3" />
                        <p className="text-gray-600 font-medium">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG up to 5MB
                        </p>
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
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={newProduct.prodname}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, prodname: e.target.value })
                    }
                    placeholder="e.g. Argan Oil Serum"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Category
                  </label>
                  <select
                    value={newProduct.prodcat}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, prodcat: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400"
                  >
                    <option value="">Select category...</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₱)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    placeholder="350.00"
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
                  onClick={handleSaveProduct}
                  disabled={
                    !newProduct.prodname ||
                    !newProduct.prodcat ||
                    !newProduct.price
                  }
                  style={{
                    background:
                      newProduct.prodname &&
                      newProduct.prodcat &&
                      newProduct.price
                        ? "linear-gradient(to right, #ec4899, #f97316)"
                        : "#cccccc",
                  }}
                  className="flex-1 px-6 py-3 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:cursor-not-allowed"
                >
                  {editProduct ? "Update Product" : "Add Product"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
