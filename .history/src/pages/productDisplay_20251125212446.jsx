// src/pages/ProductDisplay.jsx
import { Search, ChevronDown, Plus, X, Upload } from "lucide-react";
import AdminLayout from "../layout/adminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE; // make sure .env has VITE_API_BASE=http://localhost:4000/api

export default function ProductDisplay() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("created-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    unitCost: "",
    image: null,
  });
  const itemsPerPage = 6;

  const categories = [
    "Hair Care",
    "Skincare",
    "Body Care",
    "Nail Care",
    "Makeup",
    "Fragrance",
  ];

  // Fetch products from backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE}/products`);
      // map backend product IDs to PRD-<id>
      const mapped = res.data.products.map((p) => ({
        ...p,
        id: `PRD-${p.productid || p.id || ""}`,
        unitCost: parseFloat(p.price || 0),
        name: p.prodname || p.name,
        category: p.prodcat || p.category,
        createdAt:
          p.createdat ||
          new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        updatedAt:
          p.updatedat ||
          new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
        image: p.prodimage
          ? `${API_BASE.replace("/api", "")}/uploads/${p.prodimage}`
          : null,
      }));
      setProducts(mapped);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Filter & Sort
  let filtered = products.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filtered.sort((a, b) => {
    if (sortOrder === "created-desc")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortOrder === "created-asc")
      return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortOrder === "updated-desc")
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    return new Date(a.updatedAt) - new Date(b.updatedAt);
  });

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setNewProduct((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  // Add Product
  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.category || !newProduct.unitCost)
      return;

    try {
      const formData = new FormData();
      formData.append("prodname", newProduct.name);
      formData.append("prodcat", newProduct.category);
      formData.append("price", newProduct.unitCost);
      if (newProduct.image) {
        // convert base64 to Blob for upload
        const res = await fetch(newProduct.image);
        const blob = await res.blob();
        formData.append("prodimage", blob, "product.png");
      }

      await axios.post(`${API_BASE}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setNewProduct({ name: "", category: "", unitCost: "", image: null });
      setIsModalOpen(false);
      fetchProducts();
    } catch (err) {
      console.error("Failed to add product:", err);
    }
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
              Product Display
              <br />
              View and manage all products in inventory
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
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
                <th className="text-left py-4 px-6 font-semibold">
                  Product ID
                </th>
                <th className="text-left py-4 px-6 font-semibold">
                  Product Name
                </th>
                <th className="text-center py-4 px-6 font-semibold">
                  Unit Cost
                </th>
                <th className="text-center py-4 px-6 font-semibold">
                  Category
                </th>
                <th className="text-center py-4 px-6 font-semibold">
                  Created At
                </th>
                <th className="text-center py-4 px-6 font-semibold">
                  Updated At
                </th>
                <th className="text-center py-4 px-6 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="py-4 px-6 font-mono text-orange-700 font-medium">
                    {item.id}
                  </td>
                  <td className="py-4 px-6 font-medium">{item.name}</td>
                  <td className="text-center py-4 px-6 text-orange-700 font-semibold">
                    ₱{item.unitCost.toFixed(2)}
                  </td>
                  <td className="text-center py-4 px-6">
                    <span className="inline-block px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-full border border-gray-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="text-center py-4 px-6 text-gray-600">
                    {item.createdAt}
                  </td>
                  <td className="text-center py-4 px-6 text-gray-600">
                    {item.updatedAt}
                  </td>
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

        {/* Modal code remains same as your previous implementation */}
        {/* ... */}
      </div>
    </AdminLayout>
  );
}
