// src/pages/CustomerMyOrder.jsx
import React, { useState } from "react";
import CustomerLayout from "../layout/customerLayout";
import { X, Star, Minus, Plus } from "lucide-react";

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
      image: "/images/honeyglow.png",
    },
    {
      id: 2,
      name: "Silky Smooth Shampoo",
      category: "Hair Care",
      rating: 4.7,
      reviews: 12,
      price: 499.0,
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
    <CustomerLayout>
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">

          <h1 className="text-4xl font-bold text-orange-900 text-center mb-10">
            My Orders
          </h1>

          <div className="space-y-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-lg border border-pink-100 overflow-hidden flex flex-col sm:flex-row hover:shadow-xl transition-shadow duration-300"
              >
                {/* FIXED IMAGE CONTAINER — NO MORE GLITCHING */}
                <div className="w-full sm:w-56 sm:h-56 bg-gradient-to-br from-pink-50 to-orange-50 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
                    loading="lazy"
                    onError={(e) => (e.target.src = "/images/placeholder-product.jpg")}
                  />
                </div>

                {/* CONTENT — Perfectly stable */}
                <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between">
                  <div className="relative">
                    <button className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-pink-100 hover:bg-pink-200 flex items-center justify-center transition z-10 shadow-md">
                      <X className="w-5 h-5 text-pink-600" />
                    </button>

                    <h3 className="text-2xl font-bold text-gray-900 pr-12">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{product.category}</p>

                    <div className="flex items-center gap-2 mt-3">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-600 font-medium">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    <p className="text-3xl font-bold text-orange-600 mt-5">
                      ₱{product.price.toFixed(2)}
                    </p>

                    {/* Quantity — Stable layout */}
                    <div className="flex items-center gap-5 mt-6">
                      <span className="text-gray-700 font-semibold">Quantity:</span>
                      <div className="flex items-center border-2 border-gray-300 rounded-full bg-white">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="p-3 hover:bg-gray-50 transition rounded-l-full"
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        <span className="w-20 text-center text-xl font-bold">
                          {quantities[product.id] || 1}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="p-3 hover:bg-gray-50 transition rounded-r-full"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Buttons — Full width, stable */}
                  <div className="flex gap-4 mt-8">
                    <button className="flex-1 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-50 transition text-lg">
                      Return / Refund
                    </button>
                    <button className="flex-1 py-4 bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition transform hover:scale-105 text-lg">
                      View Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {products.length === 0 && (
            <div className="text-center py-24">
              <p className="text-2xl text-gray-600 mb-6">No orders yet</p>
              <button className="px-10 py-4 bg-gradient-to-r from-[#FFD36E] to-[#F59E9E] text-white font-bold text-xl rounded-full shadow-xl hover:shadow-2xl transition">
                Shop Now
              </button>
            </div>
          )}
        </div>
      </main>
    </CustomerLayout>
  );
};

export default CustomerMyOrder;