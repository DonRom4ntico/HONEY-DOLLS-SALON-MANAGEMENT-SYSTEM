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
        setProducts(prodRes.data.products);
        setServices(servRes.data.services);
      } catch (err) {
        console.error("Failed to fetch products/services:", err);
      }
    };
    fetchData();
  }, []);

  // ---------------- Cart Helpers ----------------
  const subtotal = cart.reduce(
    (sum, item) => sum + item.unit_price * item.quantity,
    0
  );

  // VAT + Total
  const VAT_RATE = 0.12;
  const vat = subtotal * VAT_RATE;
  const total = subtotal + vat;

  const change = amountPaid ? Number(amountPaid) - total : 0;

  const addToCart = (item, type) => {
    const existing = cart.find(
      (i) => i.id === (item.serviceid || item.productid) && i.type === type
    );
    if (existing) {
      setCart(
        cart.map((i) =>
          i.id === (item.serviceid || item.productid) && i.type === type
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: item.serviceid || item.productid,
          name: item.servicename || item.prodname,
          unit_price: Number(item.amount || item.price),
          type,
          quantity: 1,
        },
      ]);
    }
  };

  const updateQty = (id, delta) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // ---------------- CONFIRM & PAY (Order + Payment) ----------------
  const handleConfirmPay = async () => {
    if (cart.length === 0) return alert("Cart is empty!");

    if (!amountPaid || Number(amountPaid) < total) {
      return alert("Amount paid is not enough!");
    }

    try {
      const token = localStorage.getItem("token");

      // 1️⃣ Create order
      const orderPayload = {
        items: cart.map((i) => ({
          productid: i.type === "product" ? i.id : null,
          serviceid: i.type === "service" ? i.id : null,
          quantity: i.quantity,
          unit_price: i.unit_price,
        })),
      };

      const orderRes = await axios.post(`${API_BASE}/orders`, orderPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const orderId = orderRes.data.orderid;

      // 2️⃣ Insert Payment
      const paymentPayload = {
        orderid: orderId,
        reference_code: Date.now(),
        partialamountpaid: total,
        method: paymentMethod,
      };

      await axios.post(`${API_BASE}/customerpayment`, paymentPayload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert(
        `Payment Successful!\nOrder ID: ${orderId}\nChange: ₱${change.toFixed(
          2
        )}`
      );

      clearCart();
      setAmountPaid("");
    } catch (err) {
      console.error(err);
      alert("Payment failed. " + (err.response?.data?.message || err.message));
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
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 h-[calc(100vh-100px)]">
          {/* LEFT: Products & Services */}
          <div className="overflow-y-auto pr-2">
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

            {/* Grid 2 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                  const added = cart.reduce((acc, i) => {
                    if (i.id === (item.serviceid || item.productid))
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
                          onClick={() => addToCart(item, type)}
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

          {/* RIGHT: Cart/Receipt */}
          <div className="bg-gray-50 rounded-2xl p-5 flex flex-col h-full overflow-y-auto">
            <h3 className="font-bold text-gray-900 mb-4">Cart / Receipt</h3>

            {/* CART ITEMS */}
            <div className="flex-1 space-y-2 mb-4">
              {cart.length === 0 ? (
                <p className="text-center text-gray-500 text-sm py-8">
                  Cart is empty
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-3 flex items-center justify-between text-sm"
                  >
                    <div className="flex-1">
                      <p className="font-medium">
                        {item.quantity} x {item.name}
                      </p>
                      <p className="text-gray-600">
                        ₱{(item.quantity * item.unit_price).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center">{item.quantity}</span>
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

            {/* TOTALS */}
            <div className="border-t pt-3 mb-4 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₱{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>VAT (12%)</span>
                <span>₱{vat.toFixed(2)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg pt-1">
                <span>Total</span>
                <span>₱{total.toFixed(2)}</span>
              </div>
            </div>

            {/* AMOUNT PAID */}
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

            {/* CHANGE */}
            {amountPaid && (
              <div className="flex justify-between text-md font-semibold text-green-700 mb-4">
                <span>Change</span>
                <span>₱{change.toFixed(2)}</span>
              </div>
            )}

            {/* PAYMENT METHOD */}
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

            {/* BUTTONS */}
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
