// src/pages/CustomerProd.jsx
import React, { useState } from "react";
import CustomerLayout from "../layout/customerLayout"; // ← Adjust path if needed
import { Bell } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Honey Glow Serum",
    price: 450,
    category: "Skin Care",
    rating: 4.8,
    reviews: 120,
    image: "/images/honeyglow.png",
  },
  {
    id: 2,
    name: "Silky Smooth Shampoo",
    price: 350,
    category: "Hair Care",
    rating: 4.6,
    reviews: 98,
    image: "/images/shampoo.png",
  },
  {
    id: 3,
    name: "Luxe Nail Polish Set",
    price: 299,
    category: "Nails",
    rating: 4.9,
    reviews: 210,
    image: "/images/nailset.png",
  },
  {
    id: 4,
    name: "Body Glow Lotion",
    price: 290,
    category: "Body",
    rating: 4.7,
    reviews: 84,
    image: "/images/lotion.png",
  },
  {
    id: 5,
    name: "Hydra Mist Toner",
    price: 420,
    category: "Skin Care",
    rating: 4.5,
    reviews: 75,
    image: "/images/toner.png",
  },
  {
    id: 6,
    name: "Honey Spa Scrub",
    price: 560,
    category: "Body",
    rating: 4.8,
    reviews: 133,
    image: "/images/scrub.png",
  },
  {
    id: 7,
    name: "Luxe Nail Polish Set",
    price: 299,
    category: "Nails",
    rating: 4.9,
    reviews: 210,
    image: "/images/nailset.png",
  },
  {
    id: 8,
    name: "Luxe Nail Polish Set",
    price: 299,
    category: "Nails",
    rating: 4.9,
    reviews: 210,
    image: "/images/nailset.png",
  },
];

const CustomerProd = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredProducts =
    selectedCategories.length > 0
      ? products.filter((p) => selectedCategories.includes(p.category))
      : products;

  return (
    <CustomerLayout>
      {/* Your original content starts here — completely unchanged */}
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20">
        {/* ====================== MAIN CONTENT ====================== */}
        <div className="flex flex-1 px-8 py-6 gap-6 max-w-7xl mx-auto">
          {/* FILTER SECTION */}
          <aside className="w-56 bg-white rounded-xl p-4 shadow-sm h-fit">
            <h2 className="font-semibold text-lg text-gray-800 mb-2">Filters</h2>
            <hr className="border-gray-200 mb-3" />
            <label className="block text-sm mb-1">Sort By</label>
            <select className="w-full border rounded p-2 mb-3 text-sm">
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
            <label className="block text-sm mb-1">Price</label>
            <select className="w-full border rounded p-2 mb-3 text-sm">
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
              onClick={() => setSelectedCategories([])}
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
                  key={product.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 text-center"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-28 h-28 object-contain mx-auto mb-2"
                  />
                  <h3 className="font-medium text-gray-800 text-sm">
                    {product.name}
                  </h3>
                  <p className="text-[#f97316] font-semibold mt-1">
                    ₱{product.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    Category: {product.category}
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
      </div>
    </CustomerLayout>
  );
};

export default CustomerProd;