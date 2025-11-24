import React, { useState, useEffect } from "react";
import CustomerLayout from "../layout/customerLayout";
import { Bell, X, Star, Minus, Plus, Filter } from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const CustomerProd = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/products`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Failed to load products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Category filter
  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) => selectedCategories.includes(p.prodcat))
      : products;

  const FilterSidebar = () => (
    <aside className="w-56 bg-white rounded-xl p-6 shadow-sm h-fit">
      <h2 className="font-semibold text-lg text-gray-800 mb-4">Filters</h2>
      <hr className="border-gray-200 mb-4" />

      <label className="block text-sm font-medium mb-2">Sort By</label>
      <select className="w-full border rounded-lg p-3 mb-5 text-sm">
        <option>Relevance</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
      </select>

      <label className="block text-sm font-medium mb-2">Price</label>
      <select className="w-full border rounded-lg p-3 mb-6 text-sm">
        <option>All Prices</option>
        <option>₱100 - ₱300</option>
        <option>₱301 - ₱500</option>
        <option>₱501+</option>
      </select>

      <p className="text-sm font-semibold text-gray-800 mb-3">
        Filter by Category
      </p>
      <div className="flex flex-col gap-3 mb-6">
        {["Hair Care", "Skin Care", "Body", "Nails"].map((category) => (
          <label
            key={category}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="w-4 h-4 accent-pink-500"
            />
            <span className="text-sm">{category}</span>
          </label>
        ))}
      </div>

      <button
        onClick={() => setSelectedCategories([])}
        className="w-full bg-[#fca9a9] hover:bg-[#fb8d8d] text-white py-3 rounded-lg font-semibold transition"
      >
        Clear Filters
      </button>
    </aside>
  );

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.productid}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 text-center group"
            >
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src={`${API_BASE}/upload/${product.prodimage}`}
                  alt={product.prodname}
                  className="w-full h-40 sm:h-48 object-contain mx-auto transition-transform group-hover:scale-105"
                />
              </div>

              <h3 className="font-semibold text-gray-800 text-sm sm:text-base line-clamp-2">
                {product.prodname}
              </h3>

              <p className="text-[#f97316] font-bold text-lg mt-2">
                ₱{product.price}
              </p>

              {/* ⭐ VIEW PRODUCT BUTTON (ADDED) */}
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setQuantity(1);
                  setIsFilterOpen(false);
                }}
                className="mt-3 w-full bg-[#fca9a9] hover:bg-[#fb8d8d] text-white py-2 rounded-lg text-sm font-semibold transition"
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ================= PRODUCT MODAL (unchanged, your original modal) ================= */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X />
            </button>

            <img
              src={`${API_BASE}/upload/${selectedProduct.prodimage}`}
              alt={selectedProduct.prodname}
              className="w-full h-52 object-contain mb-4"
            />

            <h2 className="text-lg font-bold">{selectedProduct.prodname}</h2>

            <p className="mt-2 text-[#f97316] font-bold text-xl">
              ₱{selectedProduct.price}
            </p>

            <p className="text-sm text-gray-600 mt-2">
              {selectedProduct.description || "No description available."}
            </p>

            {/* quantity selector */}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-gray-200 rounded-lg"
              >
                <Minus />
              </button>

              <span className="text-lg font-semibold">{quantity}</span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 bg-gray-200 rounded-lg"
              >
                <Plus />
              </button>
            </div>

            <button className="mt-5 w-full bg-[#fb8d8d] hover:bg-[#f97373] text-white py-3 rounded-lg font-semibold">
              Add to Cart
            </button>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
};

export default CustomerProd;
