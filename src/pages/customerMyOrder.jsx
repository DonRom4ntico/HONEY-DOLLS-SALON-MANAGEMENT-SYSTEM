import React, { useState } from "react";
import { Bell, X, Star, Minus, Plus } from "lucide-react";

const CustomerMyOrder = () => {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1 });

  const products = [
    {
      id: 1,
      name: "Honey Glow Facial Serum",
      category: "Skin Care",
      rating: 4.8,
      reviews: 5,
      price: 899.0,
      description:
        "An AHA/BHA exfoliating night serum that is clinically proven to reduce the look of fine lines and pores revealing smooth, glowing skin by morning.",
      image: "/images/honeyglow.png",
    },
    {
      id: 2,
      name: "Silky Smooth Shampoo",
      category: "Hair Care",
      rating: 4.7,
      reviews: 12,
      price: 499.0,
      description:
        "A nourishing shampoo formulated to give you silky, frizz-free, and smooth hair all day long with honey and argan extracts.",
      image: "/images/shampoo.png",
    },
  ];

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  return (
    <div className="min-h-screen bg-[#fff7f2] flex flex-col">
      {/* ================= NAVBAR ================= */}
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
              Welcome, Keoski 👋
            </span>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTENT ================= */}
      <main className="flex-1 px-8 py-8 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl font-bold text-[#4b3b2b] mb-8">MY ORDER</h2>

        <div className="flex flex-col gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-sm border border-pink-100 p-6 flex flex-col md:flex-row items-center gap-6 relative"
            >
              {/* Close (X) button */}
              <button className="absolute top-4 right-4 w-7 h-7 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 transition">
                <X className="w-4 h-4 text-pink-600" />
              </button>

              {/* Product Image */}
              <div className="w-full md:w-1/3 flex justify-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-contain rounded-lg"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 space-y-3">
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  Category: {product.category}
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">
                    ({product.rating} / 5)
                  </span>
                </div>
                <p className="font-bold text-orange-600">
                  ₱{product.price.toFixed(2)}
                </p>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-1">
                    Description
                  </h4>
                  <p className="text-sm text-gray-600 bg-pink-50 rounded-lg p-3 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Quantity Section */}
                <div className="flex items-center gap-4 mt-2">
                  <span className="text-sm font-medium text-gray-700">
                    Quantity
                  </span>
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(product.id, -1)}
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="text"
                      value={quantities[product.id] || 1}
                      readOnly
                      className="w-10 text-center font-medium border-x border-gray-300 py-1"
                    />
                    <button
                      onClick={() => handleQuantityChange(product.id, 1)}
                      className="p-2 hover:bg-gray-100 transition"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3 mt-4 justify-end">
                  <button className="px-5 py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition">
                    Return/Refund
                  </button>
                  <button className="px-6 py-2 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-semibold rounded-full shadow hover:shadow-md transition">
                    View Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="bg-white/80 py-3 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Open Daily 9:00AM–9:00PM
            | Call (0994) 912 6618
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CustomerMyOrder;
