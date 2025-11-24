import React, { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE;

const CustomerProd = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [priceFilter, setPriceFilter] = useState("All Prices");

  // Fetch products from backend
  useEffect(() => {
    fetch(`${API_BASE}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Filter products by category
  let filteredProducts = selectedCategories.length
    ? products.filter((p) => selectedCategories.includes(p.category))
    : products;

  // Filter by price
  filteredProducts = filteredProducts.filter((p) => {
    switch (priceFilter) {
      case "₱100 - ₱300":
        return p.price >= 100 && p.price <= 300;
      case "₱301 - ₱500":
        return p.price >= 301 && p.price <= 500;
      case "₱501+":
        return p.price >= 501;
      default:
        return true;
    }
  });

  // Sort products
  filteredProducts.sort((a, b) => {
    switch (sortBy) {
      case "Price: Low to High":
        return a.price - b.price;
      case "Price: High to Low":
        return b.price - a.price;
      default:
        return 0; // Relevance or default order from backend
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* ====================== NAVIGATION BAR ====================== */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/images/logos.png"
              alt="Honey Dolls Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-orange-900">
                Honey Dolls & Brilliant
              </h1>
              <p className="text-sm text-orange-800 font-medium">
                Beauty Hub — Davao
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-yellow-600" />
            <span className="text-orange-900 font-medium text-sm hidden sm:inline">
              Welcome, Keoski{" "}
              <span className="text-yellow-600">Philippines</span>
            </span>
          </div>
        </div>
      </header>

      {/* ====================== MAIN CONTENT ====================== */}
      <div className="flex flex-1 px-8 py-6 gap-6">
        {/* FILTER SECTION */}
        <aside className="w-56 bg-white rounded-xl p-4 shadow-sm h-fit">
          <h2 className="font-semibold text-lg text-gray-800 mb-2">Filters</h2>
          <hr className="border-gray-200 mb-3" />

          <label className="block text-sm mb-1">Sort By</label>
          <select
            className="w-full border rounded p-2 mb-3 text-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option>Relevance</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>

          <label className="block text-sm mb-1">Price</label>
          <select
            className="w-full border rounded p-2 mb-3 text-sm"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option>All Prices</option>
            <option>₱100 - ₱300</option>
            <option>₱301 - ₱500</option>
            <option>₱501+</option>
          </select>

          <p className="text-sm font-semibold text-gray-800 mb-2">
            Filter by Category
          </p>
          <div className="flex flex-col gap-1 mb-4 text-sm">
            {["Hair Care", "Skin Care", "Body", "Nails"].map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => handleCategoryChange(category)}
                  checked={selectedCategories.includes(category)}
                />
                {category}
              </label>
            ))}
          </div>
          <button
            onClick={() => {
              setSelectedCategories([]);
              setSortBy("Relevance");
              setPriceFilter("All Prices");
            }}
            className="w-full bg-[#fca9a9] hover:bg-[#fb8d8d] text-white py-2 rounded font-semibold"
          >
            Clear Filters
          </button>
        </aside>

        {/* PRODUCT GRID */}
        <main className="flex-1">
          <h2 className="text-lg font-semibold text-[#4b3b2b] mb-4">
            Our Products
          </h2>
          <div className="grid grid-cols-4 gap-5">
            {filteredProducts.map((product) => (
              <div
                key={product.productid} // backend uses productid
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 text-center"
              >
                <img
                  src={product.prodimage || "/images/default.png"}
                  alt={product.prodname}
                  className="w-28 h-28 object-contain mx-auto mb-2"
                />
                <h3 className="font-medium text-gray-800 text-sm">
                  {product.name}
                </h3>
                <p className="text-[#f97316] font-semibold mt-1">
                  ₱{product.price}
                </p>
                <p className="text-xs text-gray-500">
                  Category: {product.prodcat}
                </p>
                <p className="text-xs text-yellow-500">
                  ⭐ {product.rating} ({product.reviews})
                </p>
                <button className="mt-2 bg-[#fca9a9] hover:bg-[#fb8d8d] text-white text-sm py-1 px-4 rounded">
                  View Product
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* ====================== FOOTER ====================== */}
      <footer className="bg-white/80 py-3 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Open Daily
            9:00AM–9:00PM | Call (0994) 912 6618
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerProd;
