import React, { useState, useEffect } from "react";
import CustomerLayout from "../../layout/customerLayout";
import { X, Minus, Plus, SlidersHorizontal } from "lucide-react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

const CustomerProd = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ["Skin Care", "Hair Care", "Body Care", "Cosmetics"];

  // 👉 Fetch products
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

  // 👉 Category Filter Logic
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

  return (
    <CustomerLayout>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20 px-4 md:px-10">
        {/* ⭐ FILTERS BUTTON */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="bg-white border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 text-sm shadow hover:bg-gray-100 transition"
          >
            <SlidersHorizontal size={18} />
            Filters
          </button>
        </div>

        {/* ⭐ PRODUCT GRID */}
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

              {/* VIEW PRODUCT BUTTON */}
              <button
                onClick={() => {
                  setSelectedProduct(product);
                  setQuantity(1);
                }}
                className="mt-3 w-full bg-[#fca9a9] hover:bg-[#fb8d8d] text-white py-2 rounded-lg text-sm font-semibold transition"
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ⭐ SIDEBAR FILTER PANEL ⭐ */}
      {isFilterOpen && (
        <div className="fixed inset-0 flex z-50">
          {/* Dark overlay */}
          <div
            className="flex-1 bg-black bg-opacity-40"
            onClick={() => setIsFilterOpen(false)}
          ></div>

          {/* Sidebar */}
          <div className="w-64 bg-white p-5 shadow-xl animate-slide-left">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Filters</h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <X />
              </button>
            </div>

            <h3 className="font-semibold mb-2">Category</h3>

            {/* Category checkboxes */}
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="accent-[#f97316]"
                  />
                  <span className="text-gray-700">{category}</span>
                </label>
              ))}
            </div>

            {/* Reset Button */}
            <button
              className="mt-6 w-full bg-gray-200 hover:bg-gray-300 py-2 rounded-lg text-sm font-semibold"
              onClick={() => setSelectedCategories([])}
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* ⭐ PRODUCT MODAL ⭐ */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md relative shadow-lg">
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X />
            </button>

            {/* Product Image */}
            <img
              src={`${API_BASE}/upload/${selectedProduct.prodimage}`}
              alt={selectedProduct.prodname}
              className="w-full h-52 object-contain mb-4 rounded-lg"
            />

            {/* Name */}
            <h2 className="text-lg font-bold text-gray-900">
              {selectedProduct.prodname}
            </h2>

            {/* Price */}
            <p className="mt-2 text-[#f97316] font-bold text-2xl">
              ₱{selectedProduct.price}
            </p>

            {/* Description */}
            <p className="text-sm text-gray-600 mt-2">
              {selectedProduct.description || "No description available."}
            </p>

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mt-5 justify-center">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                <Minus />
              </button>

              <span className="text-lg font-semibold w-6 text-center">
                {quantity}
              </span>

              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                <Plus />
              </button>
            </div>

            {/* ⭐ ACTION BUTTONS */}
            <div className="mt-6 flex gap-3">
              <button className="w-1/2 bg-[#fca9a9] hover:bg-[#fb8d8d] text-white py-3 rounded-lg font-semibold transition">
                Add to Cart
              </button>

              <button className="w-1/2 bg-[#f97316] hover:bg-[#fb7c1d] text-white py-3 rounded-lg font-semibold transition">
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
};

export default CustomerProd;
