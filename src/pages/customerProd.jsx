// src/pages/CustomerProd.jsx
import React, { useState } from "react";
import CustomerLayout from "../layout/customerLayout";
import { Bell, X, Star, Minus, Plus } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Honey Glow Serum",
    price: 450,
    category: "Skin Care",
    rating: 4.8,
    reviews: 120,
    image: "/images/honeyglow.png",
    description: "An AHA/BHA exfoliating night serum that is clinically proven to reduce the look of fine lines and pores revealing smooth, glowing skin by morning."
  },
  {
    id: 2,
    name: "Silky Smooth Shampoo",
    price: 350,
    category: "Hair Care",
    rating: 4.6,
    reviews: 98,
    image: "/images/shampoo.png",
    description: "A nourishing shampoo formulated to give you silky, frizz-free, and smooth hair all day long with honey and argan extracts."
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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
      {/* ====================== ORIGINAL CONTENT (unchanged) ====================== */}
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20">
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
                    {product.rating} ({product.reviews})
                  </p>
                  <button 
                    onClick={() => {
                      setSelectedProduct(product);
                      setQuantity(1);
                    }}
                    className="mt-2 bg-[#fca9a9] hover:bg-[#fb8d8d] text-white text-sm py-1 px-4 rounded">
                    View Product
                  </button>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* MODAL — ONLY ADDED PART */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden">
            <div className="relative">
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-pink-100 hover:bg-pink-200 rounded-full flex items-center justify-center transition"
              >
                <X className="w-6 h-6 text-pink-600" />
              </button>

              <div className="grid md:grid-cols-2">
                {/* Image */}
                <div className="bg-gradient-to-br from-pink-50 to-orange-50 p-10 flex items-center justify-center">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="max-w-full max-h-96 object-contain rounded-xl"
                  />
                </div>

                {/* Details */}
                <div className="p-8">
                  <h2 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h2>
                  <p className="text-gray-600 mt-1">Category: {selectedProduct.category}</p>

                  <div className="flex items-center gap-2 mt-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">
                      {selectedProduct.rating} ({selectedProduct.reviews} reviews)
                    </span>
                  </div>

                  <p className="text-4xl font-bold text-orange-600 mt-6">
                    ₱{selectedProduct.price}.00
                  </p>

                  {selectedProduct.description && (
                    <>
                      <h3 className="font-bold text-gray-800 mt-8 mb-3">Description</h3>
                      <p className="text-gray-600 bg-pink-50 rounded-xl p-5 leading-relaxed">
                        {selectedProduct.description}
                      </p>
                    </>
                  )}

                  <div className="flex items-center gap-6 mt-8">
                    <span className="font-medium text-gray-700">Quantity</span>
                    <div className="flex items-center border border-gray-300 rounded-xl">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100">
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="w-16 text-center font-bold text-lg">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-10">
                    <button className="flex-1 py-4 bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition">
                      Add to Cart
                    </button>
                    <button className="flex-1 py-4 bg-white border-2 border-gray-300 text-gray-800 font-bold rounded-2xl hover:bg-gray-50 transition">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </CustomerLayout>
  );
};

export default CustomerProd;