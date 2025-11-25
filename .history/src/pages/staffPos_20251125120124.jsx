import { Bell, Search, Plus, Minus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE;

export default function StaffPOS() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [amountPaid, setAmountPaid] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  // ---------------- Fetch Products & Services ----------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, servRes] = await Promise.all([
          axios.get(`${API_BASE}/products`),
          axios.get(`${API_BASE}/services`),
        ]);

        setProducts(prodRes.data.products || []);
        setServices(servRes.data.services || []);
      } catch (err) {
        console.error("Failed to fetch products/services:", err);
      }
    };

    fetchData();
  }, []);

  // ---------------- Cart Helpers ----------------
  const subtotal = cart.reduce(
    (sum, item) => sum + (item.unit_price || item.price) * item.quantity,
    0
  );

  const addToCart = (item, type) => {
    const existing = cart.find((i) => i.id === item.id && i.type === type);
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === item.id && i.type === type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1, type }]);
    }
  };

  const updateQty = (id, type, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id && item.type === type) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id, type) => {
    setCart(cart.filter((item) => !(item.id === id && item.type === type)));
  };

  const clearCart = () => setCart([]);

  // ---------------- Submit Order ----------------
  const handleConfirmPay = async () => {
    if (cart.length === 0) return;

    try {
      const token = localStorage.getItem("token"); // JWT token from login
      const payload = {
        items: cart.map((i) => ({
          productid: i.type === "product" ? i.id : null,
          serviceid: i.type === "service" ? i.id : null,
          quantity: i.quantity,
          unit_price: i.unit_price || i.price,
        })),
      };

      const res = await axios.post(`${API_BASE}/orders`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(`Order created successfully! Order ID: ${res.data.orderid}`);
      clearCart();
      setAmountPaid("");
    } catch (err) {
      console.error(err);
      alert(
        "Failed to create order: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  // ---------------- Render ----------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-pink-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-gradient-to-r from-[#ffd36e] to-[#f59e9e] shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/honeydolls.jpg"
              alt="Honey Dolls"
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
              Logged in: <span className="text-yellow-600">Anna (Staff)</span>
            </span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-[3fr_1fr] gap-8">
          {/* LEFT: Products & Services */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Honey Dolls • Staff POS
                </h2>
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

            {/* Grid 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...services, ...products]
                .filter((item) => {
                  const name = item.servicename || item.prodname;
                  return name.toLowerCase().includes(searchTerm.toLowerCase());
                })
                .map((item) => {
                  const type = item.serviceid ? "service" : "product";
                  const name = item.servicename || item.prodname;
                  const price = item.amount || item.price;
                  const duration = item.servicetype || "Product";

                  // calculate added quantity
                  const added = cart.reduce((acc, i) => {
                    if (
                      i.id === (item.serviceid || item.productid) &&
                      i.type === type
                    )
                      return i.quantity;
                    return acc;
                  }, 0);

                  return (
                    <div
                      key={`${type}-${item.serviceid || item.productid}`}
                      className="bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow transition cursor-pointer"
                    >
                      <div className="relative">
                        <div className="bg-gray-200 border-2 border-dashed rounded-t-2xl w-full h-20" />
                        {added > 0 && (
                          <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                            Added: {added}
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-600">
                          ₱{price} • {duration}
                        </p>
                        <button
                          onClick={() =>
                            addToCart(
                              {
                                ...item,
                                id: item.serviceid || item.productid,
                                price,
                              },
                              type
                            )
                          }
                          className="mt-2 w-full bg-yellow-400 text-gray-900 font-medium py-2 rounded-full hover:bg-yellow-500 transition text-sm"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* RIGHT: Cart */}
          <div className="bg-gray-50 rounded-2xl p-5 flex flex-col h-full">
            <h3 className="font-bold text-gray-900 mb-4">Cart / Receipt</h3>
            <div className="flex-1 space-y-2 mb-4 overflow-y-auto max-h-[calc(100vh-250px)]">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 text-sm py-8">
                  Cart is empty
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="bg-white rounded-xl p-3 flex items-center justify-between text-sm"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.quantity} x{" "}
                        {item.name || item.servicename || item.prodname}
                      </p>
                      <p className="text-gray-600">
                        ₱{item.quantity * (item.unit_price || item.price)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQty(item.id, item.type, -1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.id, item.type, 1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id, item.type)}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount Paid
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment
              </label>
              <div className="grid grid-cols-2 gap-2">
                {["Cash", "GCash"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 rounded-xl border text-sm font-medium transition ${
                      paymentMethod === method
                        ? "bg-orange-500 text-white border-orange-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
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
                onClick={handleConfirmPay}
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
      </main>
    </div>
  );
}
