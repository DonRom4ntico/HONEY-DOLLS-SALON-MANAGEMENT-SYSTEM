// src/pages/ProductDisplay.jsx
import { Search, ChevronDown, Plus, X, Upload } from "lucide-react";
import AdminLayout from "../layout/adminLayout";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE; // http://localhost:3000/api

export default function ProductDisplay() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("created-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Load all products from backend
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_BASE}/products`);
      setProducts(data.products || []);
    } catch (err) {
      console.error("Fetch products error:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter + Sort
  const filtered = products
    .filter(
      (item) =>
        item.prodname.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.prodcat.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (!a.createdat || !b.createdat) return 0;
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

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewProduct((prev) => ({ ...prev, prodimage: file }));
  };

  // ADD PRODUCT — WORKS WITH YOUR BACKEND
  const handleAddProduct = async () => {
    if (!newProduct.prodname || !newProduct.prodcat || !newProduct.price)
      return;

    try {
      const formData = new FormData();
      formData.append("prodname", newProduct.prodname);
      formData.append("prodcat", newProduct.prodcat);
      formData.append("price", newProduct.price);
      if (newProduct.prodimage) {
        formData.append("prodimage", newProduct.prodimage);
      }

      const { data } = await axios.post(`${API_BASE}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setProducts((prev) => [...prev, data.product]);
      setNewProduct({ prodname: "", prodcat: "", price: "", prodimage: null });
      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      console.error("Failed to add product:", error);
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <AdminLayout title="Product Display">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-full mx-auto">
        {/* Header */}
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
            }}
            className="text-white font-bold text-lg px-8 py-4 rounded-full shadow-2xl flex items-center gap-3"
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
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-5 py-4 border rounded-xl"
            />
          </div>

          <div className="relative min-w-[200px]">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full pl-4 pr-10 py-4 border rounded-xl bg-white"
            >
              <option value="created-desc">Created: Newest</option>
              <option value="created-asc">Created: Oldest</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full min-w-[900px] text-sm">
            <thead>
              <tr className="bg-gradient-to-r from-orange-50 to-pink-50">
                <th className="text-left py-4 px-6">ID</th>
                <th className="text-left py-4 px-6">Product Name</th>
                <th className="text-center py-4 px-6">Price</th>
                <th className="text-center py-4 px-6">Category</th>
                <th className="text-center py-4 px-6">Image</th>
                <th className="text-center py-4 px-6">Created At</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((item) => (
                <tr key={item.productid} className="border-t">
                  <td className="py-4 px-6">{item.productid}</td>
                  <td className="py-4 px-6">{item.prodname}</td>
                  <td className="text-center py-4 px-6">
                    ₱{Number(item.price).toFixed(2)}
                  </td>
                  <td className="text-center py-4 px-6">{item.prodcat}</td>
                  <td className="text-center py-4 px-6">
                    {item.prodimage && (
                      <img
                        src={`http://localhost:3000/uploads/${item.prodimage}`}
                        alt={item.prodname}
                        className="mx-auto max-h-12 rounded-xl"
                      />
                    )}
                  </td>
                  <td className="text-center py-4 px-6">
                    {item.createdat
                      ? new Date(item.createdat).toLocaleDateString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="px-4 py-2 border rounded-lg"
          >
            Previous
          </button>

          <span className="font-medium">
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="px-4 py-2 border rounded-lg"
          >
            Next
          </button>
        </div>

        {/* MODAL */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md">
              <div className="flex justify-between mb-6">
                <h2 className="text-2xl font-bold">Add New Product</h2>
                <button onClick={() => setIsModalOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Upload */}
              <div className="mb-6">
                <label className="block mb-2">Product Image</label>
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer block border-2 border-dashed rounded-xl p-6 text-center"
                >
                  {newProduct.prodimage ? (
                    <img
                      src={URL.createObjectURL(newProduct.prodimage)}
                      className="mx-auto max-h-40 rounded-xl"
                    />
                  ) : (
                    <>
                      <Upload className="mx-auto w-10 h-10 mb-2" />
                      <p>Click to upload</p>
                    </>
                  )}
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={newProduct.prodname}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, prodname: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl"
                />

                <select
                  value={newProduct.prodcat}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, prodcat: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option value="">Select category...</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({ ...newProduct, price: e.target.value })
                  }
                  className="w-full px-4 py-3 border rounded-xl"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 border py-3 rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={handleAddProduct}
                  className="flex-1 py-3 rounded-xl text-white font-bold"
                  style={{
                    background:
                      newProduct.prodname &&
                      newProduct.prodcat &&
                      newProduct.price
                        ? "linear-gradient(to right, #ec4899, #f97316)"
                        : "#ccc",
                  }}
                  disabled={
                    !newProduct.prodname ||
                    !newProduct.prodcat ||
                    !newProduct.price
                  }
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
