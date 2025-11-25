import { Bell, X, Star, Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import CustomerLayout from '../layout/customerLayout';

export default function App() {
  const [quantity, setQuantity] = useState(1);

  const product = {
    name: 'Honey Glow Facial Serum',
    category: 'Skin Care',
    rating: 4.8,
    reviews: 5,
    price: 899.00,
    description: 'An AHA/BHA exfoliating night serum that is clinically proven to reduce the look of fine lines and pores revealing smooth, glowing skin by morning',
  };

  return (
    <CustomerLayout>
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">

      {/* ====================== HEADER ====================== */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="src/assets/honeydolls.jpg"
              alt="Honey Dolls Logo"
              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div>
              <h1 className="text-xl font-bold text-orange-900">Honey Dolls & Brilliant</h1>
              <p className="text-sm text-orange-800 font-medium">Beauty Hub — Davao</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-yellow-600" />
            <span className="text-orange-900 font-medium text-sm hidden sm:inline">
              Welcome, Keoski <span className="text-yellow-600">Philippines</span>
            </span>
          </div>
        </div>
      </header>

      {/* ====================== MAIN ====================== */}
      <main className="flex-1 flex justify-center items-start px-6 py-10 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl w-full relative">

          {/* Close Button */}
          <button className="absolute top-4 right-4 w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center hover:bg-pink-200 transition">
            <X className="w-5 h-5 text-pink-600" />
          </button>

          <div className="grid md:grid-cols-2 gap-8">

            {/* LEFT: Product Image */}
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <img
                  src="src/assets/XXL_p0116218936.webp"
                  alt={product.name}
                  className="w-full h-auto rounded-xl shadow-md"
                />
              </div>
            </div>

            {/* RIGHT: Product Info */}
            <div className="space-y-6">
              {/* Title & Category */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                <p className="text-sm text-gray-600 mt-1">Category: {product.category}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-700">({product.rating}/5) • {product.reviews} reviews</span>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold text-orange-600">₱{product.price.toFixed(2)}</p>

              {/* Description */}
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Description</h3>
                <p className="text-sm text-gray-600 leading-relaxed bg-pink-50 p-4 rounded-lg">
                  {product.description}
                </p>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Quantity</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    readOnly
                    className="w-12 text-center font-medium border-x border-gray-300 py-1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition">
                  Add to Cart
                </button>
                <button className="flex-1 border-2 border-gray-300 text-gray-800 font-bold py-3 rounded-full hover:bg-gray-50 transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ====================== FOOTER ====================== */}
      <footer className="bg-white/80 py-3 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Open Daily 9:00AM–9:00PM | Call (0934) 912 6618
          </p>
        </div>
      </footer>
    </div>
    </CustomerLayout>
  );
}
