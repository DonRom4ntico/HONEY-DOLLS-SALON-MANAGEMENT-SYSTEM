import { Bell, Search, Plus, Minus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function StaffPOS() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([
    { id: 1, name: 'Haircut', price: 350, duration: '45 min', qty: 1 },
    { id: 3, name: 'Shampoo', price: 250, duration: 'Product', qty: 1 },
    { id: 4, name: 'Manicure', price: 450, duration: '60 min', qty: 1 },
  ]);
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  // Sample services & products
  const items = [
    { id: 1, name: 'Haircut', price: 350, duration: '45 min', image: '/api/placeholder/120/80', added: 1 },
    { id: 2, name: 'Blowdry', price: 250, duration: '30 min', image: '/api/placeholder/120/80', added: 0 },
    { id: 3, name: 'Manicure', price: 450, duration: '60 min', image: '/api/placeholder/120/80', added: 1 },
    { id: 4, name: 'Facial — Glow', price: 600, duration: '60 min', image: '/api/placeholder/120/80', added: 0 },
    { id: 5, name: 'Shampoo — Hydrate+', price: 250, duration: 'Product', image: '/api/placeholder/120/80', added: 1 },
    { id: 6, name: 'Nail Polish — Rose', price: 180, duration: 'Product', image: '/api/placeholder/120/80', added: 0 },
  ];

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (item) => {
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
      setCart(cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* ====================== HEADER ====================== */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/honeydolls.jpg"  
              alt="Honey Dolls"
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
              Logged in: <span className="text-yellow-600">Anna (Staff)</span>
            </span>
          </div>
        </div>
      </header>

      {/* ====================== MAIN ====================== */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* LEFT: Services & Products */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Honey Dolls • Staff POS</h2>
                  <p className="text-sm text-gray-600">Services & Products</p>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search services or products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-3 w-64 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                  />
                </div>
              </div>

              {/* Grid of Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items
                  .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow transition cursor-pointer"
                    >
                      <div className="relative">
                        <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-20" />
                        {item.added > 0 && (
                          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                            Added: {item.added}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">₱{item.price} • {item.duration}</p>
                        <button
                          onClick={() => addToCart(item)}
                          className="mt-2 w-full bg-yellow-400 text-gray-900 font-medium py-2 rounded-full hover:bg-yellow-500 transition text-sm"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* RIGHT: Cart / Receipt */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-2xl p-5 h-full flex flex-col">
                <h3 className="font-bold text-gray-900 mb-4">Cart / Receipt</h3>

                {/* Cart Items */}
                <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-96">
                  {cart.length === 0 ? (
                    <p className="text-center text-gray-500 text-sm py-8">Cart is empty</p>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl p-3 flex items-center justify-between text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.qty} x {item.name}</p>
                          <p className="text-gray-600">₱{item.price * item.qty}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQty(item.id, -1)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center">{item.qty}</span>
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-2 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Subtotal */}
                <div className="border-t pt-3 mb-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Subtotal</span>
                    <span>₱{subtotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Amount Paid */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Paid</label>
                  <input
                    type="number"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-orange-400 text-sm"
                  />
                </div>

                {/* Payment Method */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['Cash', 'GCash'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`py-2 rounded-xl border text-sm font-medium transition ${
                          paymentMethod === method
                            ? 'bg-orange-500 text-white border-orange-500'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => alert(`Payment confirmed: ₱${subtotal}`)}
                    disabled={cart.length === 0}
                    className="w-full bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] text-white font-bold py-3 rounded-full shadow hover:shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Confirm & Pay
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-full hover:bg-gray-50 transition font-medium text-sm"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ====================== FOOTER ====================== */}
      <footer className="bg-white/80 py-3 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs text-gray-600 text-center">
            Honey Dolls • Brilliant Beauty Hub — Davao | Open Daily 9:00AM–9:00PM
          </p>
        </div>
      </footer>
    </div>
  );
}